// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
import {
  changedUrls, parseSitemapEntries, shouldSubmitIndexNow, submitChangedUrlsToIndexNow,
} from '../scripts/lib/indexnow.js';

const xml = (rows: [string, string | null][]) => `<?xml version="1.0"?><urlset>${rows.map(([loc, lastmod]) =>
  `<url><loc>${loc.replace(/&/g, '&amp;')}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<image:image><image:loc>https://cdn/x.webp</image:loc></image:image></url>`).join('')}</urlset>`;

describe('IndexNow submits only new or changed URLs from production', () => {
  it('runs only on the production Pages build unless forced', () => {
    expect(shouldSubmitIndexNow({ CF_PAGES: '1', CF_PAGES_BRANCH: 'main' })).toBe(true);
    expect(shouldSubmitIndexNow({ CF_PAGES: '1', CF_PAGES_BRANCH: 'dev' })).toBe(false);
    expect(shouldSubmitIndexNow({ GITHUB_ACTIONS: 'true' })).toBe(false);
    expect(shouldSubmitIndexNow({ NODE_ENV: 'production' })).toBe(false);
    expect(shouldSubmitIndexNow({ INDEXNOW_FORCE: 'true' })).toBe(true);
  });

  it('reads page locs and lastmod, not image locs', () => {
    expect([...parseSitemapEntries(xml([['https://s/a?x=1&y=2', '2026-11-01'], ['https://s/b', null]]))]).toEqual([
      ['https://s/a?x=1&y=2', '2026-11-01'],
      ['https://s/b', null],
    ]);
  });

  it('picks new URLs and URLs whose lastmod changed', () => {
    const live = new Map([['https://s/same', '2026-11-01'], ['https://s/newer', '2026-11-01'], ['https://s/nodate', null], ['https://s/gone', null]]);
    expect(changedUrls([
      { url: 'https://s/same', lastmod: '2026-11-01' },
      { url: 'https://s/newer', lastmod: '2026-11-09' },
      { url: 'https://s/nodate', lastmod: null },
      { url: 'https://s/added', lastmod: null },
    ], live)).toEqual(['https://s/newer', 'https://s/added']);
  });

  const env = { CF_PAGES: '1', CF_PAGES_BRANCH: 'main' };
  const sitemaps = [{ name: 'sitemap-a.xml', entries: [{ url: 'https://s/same', lastmod: '2026-11-01' }, { url: 'https://s/added', lastmod: null }] }];

  it('posts only the changed URLs', async () => {
    const fetchImpl = vi.fn(async (url: string, init?: RequestInit) => (init?.method === 'POST'
      ? new Response('', { status: 200 })
      : new Response(xml([['https://s/same', '2026-11-01']]), { headers: { 'content-type': 'application/xml' } })));
    const urls = await submitChangedUrlsToIndexNow({ baseUrl: 'https://s', sitemaps, env, fetchImpl, log: () => {} });
    expect(urls).toEqual(['https://s/added']);
    const post = fetchImpl.mock.calls.find(([, init]) => init?.method === 'POST')!;
    expect(JSON.parse(post[1]!.body as string)).toMatchObject({ host: 's', urlList: ['https://s/added'] });
  });

  it('submits nothing when the live sitemaps cannot be read', async () => {
    const fetchImpl = vi.fn(async (_url: string, _init?: RequestInit) => new Response('<!doctype html>', { headers: { 'content-type': 'text/html' } }));
    expect(await submitChangedUrlsToIndexNow({ baseUrl: 'https://s', sitemaps, env, fetchImpl, log: () => {} })).toEqual([]);
    expect(fetchImpl.mock.calls.some(([, init]) => init?.method === 'POST')).toBe(false);
  });

  it('does nothing outside production', async () => {
    const fetchImpl = vi.fn();
    expect(await submitChangedUrlsToIndexNow({ baseUrl: 'https://s', sitemaps, env: { GITHUB_ACTIONS: 'true' }, fetchImpl, log: () => {} })).toEqual([]);
    expect(fetchImpl).not.toHaveBeenCalled();
  });
});
