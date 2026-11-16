import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { INDEXABLE_AND_APP_PATHS } from '../functions/generated-routes';
import { onRequest } from '../functions/_middleware';
import NteEntityGraphSection from '../nte-hub/components/NteEntityGraphSection';

vi.mock('../nte-hub/data/arcData', () => ({ NTE_ARC_DATA: [{
  id: 'internal-arc-id', name: '연결음이 흐르는 동안', dedicatedChar: '잔홍', rarityGrade: 'S',
}] }));
vi.mock('../common-hub/utils/synergyManager', () => ({ getRecommendedParties: () => [{
  name: '회귀 검사 파티', members: [
    { id: 'nte-잔홍', name: '잔홍', role: '메인 딜러' },
    { id: 'nte-사키리', name: '사키리', role: '서포터' },
    { id: 'nte-일로이', name: '일로이', role: '서포터' },
    { id: 'nte-나나리', name: '나나리', role: '딜러' },
  ],
}] }));

describe('NTE entity graph public links', () => {
  it('renders published character and weapon URLs rather than internal ids', () => {
    const html = renderToStaticMarkup(<MemoryRouter><NteEntityGraphSection
      character={{ name: '잔홍', id: 'nte-잔홍' }} theme={{ primary: '#44aaff' }}
    /></MemoryRouter>);
    const container = document.createElement('div');
    container.innerHTML = html;
    const links = [...container.querySelectorAll('a')].map(a => decodeURIComponent(a.getAttribute('href')!));
    expect(links).toHaveLength(5);
    expect(links).toContain('/gallery/nte/weapon/연결음이 흐르는 동안');
    for (const name of ['잔홍', '사키리', '일로이', '나나리']) {
      expect(links).toContain(`/gallery/nte/character/${name}`);
    }
    for (const path of links) expect(INDEXABLE_AND_APP_PATHS.has(path), path).toBe(true);
  });
});

describe('legacy NTE party character ids', () => {
  const details = [...INDEXABLE_AND_APP_PATHS].filter(path => /^\/gallery\/nte\/character\/[^/]+$/.test(path));
  it.each(details)('redirects the internal id alias to %s', async destination => {
    const name = destination.split('/').pop()!;
    const next = vi.fn(async () => new Response('app'));
    const response = await onRequest({ request: new Request(`https://riragamehub.com/gallery/nte/character/${encodeURIComponent('nte-' + name)}/?ref=party`), next });
    expect(response.status).toBe(301);
    const location = new URL(response.headers.get('Location')!);
    expect(decodeURIComponent(location.pathname)).toBe(destination);
    expect(location.search).toBe('?ref=party');
    expect(location.origin).toBe('https://riragamehub.com');
    expect(next).not.toHaveBeenCalled();
  });
  it.each(['없는캐릭터', '%2F%2Fevil', '잔홍/guide'])('keeps unknown or invalid alias %s as 404', async suffix => {
    const response = await onRequest({ request: new Request(`https://riragamehub.com/gallery/nte/character/nte-${suffix}`), next: async () => new Response('app') });
    expect(response.status).toBe(404);
    expect(response.headers.has('Location')).toBe(false);
  });
  it('serves a public name without an alias redirect', async () => {
    const next = vi.fn(async () => new Response('app'));
    const response = await onRequest({ request: new Request('https://riragamehub.com/gallery/nte/character/' + encodeURIComponent('잔홍')), next });
    expect(response.status).toBe(200);
    expect(next).toHaveBeenCalledOnce();
  });
});
