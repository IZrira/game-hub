import React from 'react';
import fs from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import CharacterDetail from '../ww-hub/pages/CharacterDetail';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value, i18n: { language: 'ko' } }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/AdPlaceholder', () => ({ default: () => null }));
vi.mock('../ww-hub/components/WuwaSkillSection', () => ({ default: () => null }));
vi.mock('../ww-hub/components/WuwaResonanceChain', () => ({ default: () => null }));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe('WW character attribute asset and text fallback', () => {
  it('uses the verified attribute file and keeps the attribute readable after an image error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(fs.readFileSync('public/assets/data/ww/characters/baizhi.json', 'utf8'))));
    const { container } = render(<MemoryRouter initialEntries={['/gallery/ww/character/baizhi']}><Routes><Route path="/gallery/:gameId/character/:charName" element={<CharacterDetail />} /></Routes></MemoryRouter>);
    await screen.findByRole('heading', { name: '설지', level: 1 });
    const icon = container.querySelector<HTMLImageElement>('img[src*="%EC%9D%91%EA%B2%B0%20%ED%94%BC%ED%95%B4%20%EB%B6%80%EC%8A%A4%ED%8A%B8.webp"]')!;
    expect(icon).toBeTruthy();
    expect(icon.alt).toBe('');
    const label = icon.parentElement!;
    expect(label.textContent).toContain('증폭기 | 응결');
    const originalSrc = icon.src;
    fireEvent.error(icon);
    await waitFor(() => expect(icon.hidden).toBe(true));
    expect(label.textContent).toContain('증폭기 | 응결');
    expect(icon.src).toBe(originalSrc);
  });
});
