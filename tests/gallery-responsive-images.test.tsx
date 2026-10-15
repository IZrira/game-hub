import React from 'react';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { CharacterPremiumCard, ItemPremiumCard } from '../common-hub/components/GalleryCards';
import thumbnails from '../ww-hub/data/generated/card-thumbnails.json';
import gallery from '../ww-hub/data/generated/gallery.json';
import { CDN_URL, resolveRoverImageInfo, safeEncodeURIComponent, withAssetVersion } from '../common-hub/utils/assetManager';
import { onRequest } from '../functions/_middleware';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
afterEach(cleanup);
const manifest = thumbnails as Record<string, { small: string; large: string; smallWidth: number; largeWidth: number }>;
const renderCard = (index = 0, menu = '캐릭터', char: any = gallery.characters[0]) => render(
  <MemoryRouter initialEntries={[`/gallery/ww?menu=${encodeURIComponent(menu)}`]}><Routes><Route path="/gallery/:gameId" element={<CharacterPremiumCard char={char} index={index} />} /></Routes></MemoryRouter>
);

it('covers every WW character and both Rover genders using the existing canonical image resolver', () => {
  for (const character of gallery.characters) {
    const name = character.folderName || character.name;
    const rover = resolveRoverImageInfo(name, character.attribute, 'f');
    const sources = rover ? [rover.url, resolveRoverImageInfo(name, character.attribute, 'm')!.url]
      : [`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(name)}/${safeEncodeURIComponent(name)}.webp`];
    for (const source of sources) expect(manifest[source.split('?')[0]], name).toBeDefined();
  }
});

it('has valid, correctly sized WebP files with matching content-hash filenames', async () => {
  for (const item of Object.values(manifest)) {
    for (const [file, width, expectedWidth] of [[item.small, item.smallWidth, 192], [item.large, item.largeWidth, 384]] as const) {
      const buffer = fs.readFileSync(`public${file}`);
      const metadata = await sharp(buffer).metadata();
      expect(metadata.format).toBe('webp');
      expect(metadata.width).toBe(width);
      expect(width).toBeLessThanOrEqual(expectedWidth);
      expect(file).toContain(createHash('sha256').update(buffer).digest('hex').slice(0, 20));
    }
  }
});

it.each([0, 1, 3, 4])('prioritizes only the first list image and defers below-fold cards: %s', index => {
  renderCard(index);
  const image = screen.getByRole('img');
  expect(image.getAttribute('loading')).toBe(index < 4 ? 'eager' : 'lazy');
  expect(image.getAttribute('fetchpriority')).toBe(index === 0 ? 'high' : 'auto');
  expect(image.getAttribute('srcset')).toMatch(/192w, .*384w/);
  expect(image.getAttribute('sizes')).toContain('180px');
});

it('keeps hub previews lazy rather than making them high-priority', () => {
  renderCard(0, '홈');
  const image = screen.getByRole('img');
  expect(image.getAttribute('loading')).toBe('lazy');
  expect(image.getAttribute('fetchpriority')).toBe('auto');
});

it.each([false, true])('defers inventory art including gender-split images: %s', split => {
  render(<MemoryRouter><ItemPremiumCard item={{ name: '아이템', gameId: 'ww', itemAttribute: split ? '남녀 분리' : '' }} /></MemoryRouter>);
  const images = screen.getAllByRole('img');
  expect(images).toHaveLength(split ? 2 : 1);
  for (const image of images) {
    expect(image.getAttribute('loading')).toBe('lazy');
    expect(image.getAttribute('decoding')).toBe('async');
  }
});

it('clears responsive candidates before falling back to the original and then the next CDN', () => {
  renderCard();
  const image = screen.getByRole('img') as HTMLImageElement;
  fireEvent.error(image);
  const name = gallery.characters[0].folderName || gallery.characters[0].name;
  expect(image.src).toBe(withAssetVersion(`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(name)}/${safeEncodeURIComponent(name)}.webp`));
  expect(image.hasAttribute('srcset')).toBe(false);
  expect(image.hasAttribute('sizes')).toBe(false);
  fireEvent.error(image);
  expect(image.src).toContain('fastly.jsdelivr.net');
});

it('keeps the original URL for a character without a generated thumbnail', () => {
  renderCard(0, '캐릭터', { id: 'missing', name: '없는캐릭터', folderName: '없는캐릭터' });
  const image = screen.getByRole('img');
  expect(image.getAttribute('src')).toContain('cdn.jsdelivr.net');
  expect(image.hasAttribute('srcset')).toBe(false);
});

it('replaces inherited no-cache only for successful hashed WebP thumbnails', async () => {
  const url = Object.values(manifest)[0].small;
  for (const [status, type, expected] of [[200, 'image/webp', true], [304, 'image/webp', true], [404, 'image/webp', false], [200, 'text/html', false]] as const) {
    const result = await onRequest({ request: new Request(`https://riragamehub.com${url}`), next: async () => new Response(status === 304 ? null : 'image', { status, headers: { 'Content-Type': type, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' } }) });
    expect(result.headers.get('Cache-Control')).toBe(expected ? 'public, max-age=31536000, immutable' : 'no-cache');
    expect(result.headers.get('X-Content-Type-Options')).toBe('nosniff');
  }
});
