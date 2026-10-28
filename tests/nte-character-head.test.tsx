// @vitest-environment-options {"settings":{"disableCSSFileLoading":true,"disableJavaScriptFileLoading":true,"handleDisabledFileLoadingAsSuccess":true}}
import React, { StrictMode } from 'react';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Link, MemoryRouter, useLocation } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';
import { getNteCharacterSeo } from '../common-hub/utils/nteCharacterSeo.js';
import { NTE_CHARACTER_DATA } from '../nte-hub/data/characterData';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'ko' } }) }));
afterEach(() => cleanup());

it('keeps NTE metadata identical through static-head handoff and SPA character navigation', async () => {
  const first = getNteCharacterSeo('감정사');
  document.head.innerHTML = `<title>${first.title} | RIRA ARCHIVE</title>
    <meta name="description" content="${first.description}">
    <meta name="google-site-verification" content="test-ownership">
    <link rel="canonical" href="https://riragamehub.com${first.url}">`;
  const { default: SEO } = await import('../common-hub/components/SEO');
  const second = getNteCharacterSeo('아카네 린');
  function MetadataRoute() {
    const location = useLocation();
    const name = decodeURIComponent(location.pathname.split('/').at(-1)!);
    return <><SEO {...getNteCharacterSeo(name)} gameCategory="이환 (Neverness to Everness)" />
      <Link to={`${second.url}?lng=en`}>다음 캐릭터</Link></>;
  }
  render(<StrictMode><MemoryRouter initialEntries={[`${first.url}?lng=ko`]}><MetadataRoute /></MemoryRouter></StrictMode>);
  const assertHead = async (metadata: ReturnType<typeof getNteCharacterSeo>) => {
    await waitFor(() => expect(document.title).toBe(`${metadata.title} | RIRA ARCHIVE`));
    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(metadata.description);
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(`https://riragamehub.com${metadata.url}`);
    expect(document.head.querySelector('meta[name="google-site-verification"]')?.getAttribute('content')).toBe('test-ownership');
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      const schemas = JSON.parse(script.textContent || '[]');
      expect([schemas].flat().some(schema => schema['@type'] === 'FAQPage')).toBe(false);
    }
  };
  await assertHead(first);
  fireEvent.click(screen.getByRole('link', { name: '다음 캐릭터' }));
  await assertHead(second);
});

it.each(NTE_CHARACTER_DATA.map(character => character.name))('keeps the shared metadata game-correct for %s', (name) => {
  const metadata = getNteCharacterSeo(name);
  expect(metadata.description).toContain(`이환(NTE) ${name}`);
  expect(metadata.description).not.toMatch(/스타레일|광추|유물|운명의 길|undefined|---/);
  expect(metadata.url).toBe(`/gallery/nte/character/${encodeURIComponent(name)}`);
});
