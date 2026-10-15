import React from 'react';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, render, renderHook, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import GuideArticlePage from '../common-hub/pages/GuideArticle';
import { GUIDE_ARTICLES } from '../common-hub/data/guideArticles';
import manifest from '../common-hub/data/generated/article-runtime-manifest.json';
import { useGuideArticle } from '../common-hub/hooks/useGuideArticle';
import { onRequest } from '../functions/_middleware';

vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/GallerySidebar', () => ({ default: () => null }));
vi.mock('../aniimo-hub/components/AniimoNavigation', () => ({ AniimoMobileNav: () => null, AniimoSidebar: () => null }));

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
const published = GUIDE_ARTICLES.filter(article => article.status === 'published');
const first = published[0];
const second = published[1];
const urlFor = (article: typeof first) => (manifest as Record<string, string>)[`${article.gameId}/${article.slug}`];
const read = (url: string) => fs.readFileSync(`public${url}`, 'utf8');

it('preserves every published article exactly with content-hashed filenames, including Korean slugs', () => {
  expect(Object.keys(manifest)).toHaveLength(published.length);
  for (const article of published) {
    const url = urlFor(article);
    const data = read(url);
    expect(JSON.parse(data)).toEqual(article);
    expect(url).toContain(createHash('sha256').update(data).digest('hex').slice(0, 12));
  }
});

it('does not fetch missing routes', () => {
  const fetcher = vi.fn(); vi.stubGlobal('fetch', fetcher);
  const { result } = renderHook(() => useGuideArticle('missing', 'missing'));
  expect(result.current.article).toBeUndefined();
  expect(result.current.loading).toBe(false);
  expect(fetcher).not.toHaveBeenCalled();
});

it('renders the existing article heading and full markdown after its single request', async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response(read(urlFor(first))));
  vi.stubGlobal('fetch', fetcher);
  render(<MemoryRouter initialEntries={[`/gallery/${first.gameId}/guides/${first.slug}`]}><Routes><Route path="/gallery/:gameId/guides/:slug" element={<GuideArticlePage />} /></Routes></MemoryRouter>);
  expect(await screen.findByRole('heading', { level: 1, name: first.title })).toBeTruthy();
  expect(screen.getByRole('article').textContent).toContain(first.excerpt);
  expect(screen.getByRole('article').textContent).toContain('현재 데이터에 조건이 표시되지 않는 진화');
  expect(fetcher).toHaveBeenCalledOnce();
});

it('retries failed responses and loads only the requested article', async () => {
  const fetcher = vi.fn().mockResolvedValueOnce(new Response('', { status: 503 })).mockResolvedValueOnce(new Response(read(urlFor(first))));
  vi.stubGlobal('fetch', fetcher);
  const { result } = renderHook(() => useGuideArticle(first.gameId, first.slug));
  await waitFor(() => expect(result.current.failed).toBe(true));
  act(() => result.current.retry());
  await waitFor(() => expect(result.current.article).toEqual(first));
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(fetcher.mock.calls.every(([url]) => url === urlFor(first))).toBe(true);
});

it('ignores a late response and aborts the previous request on navigation', async () => {
  let finish!: (response: Response) => void;
  const fetcher = vi.fn().mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve; })).mockResolvedValueOnce(new Response(read(urlFor(second))));
  vi.stubGlobal('fetch', fetcher);
  const { result, rerender } = renderHook(({ article }) => useGuideArticle(article.gameId, article.slug), { initialProps: { article: first } });
  rerender({ article: second });
  await waitFor(() => expect(result.current.article).toEqual(second));
  expect(fetcher.mock.calls[0][1].signal.aborted).toBe(true);
  await act(async () => finish(new Response(read(urlFor(first)))));
  expect(result.current.article).toEqual(second);
});

it('rejects a response for another article', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(read(urlFor(second)))));
  const { result } = renderHook(() => useGuideArticle(first.gameId, first.slug));
  await waitFor(() => expect(result.current.failed).toBe(true));
  expect(result.current.article).toBeUndefined();
});

it('caches only successful hashed JSON responses without removing security headers', async () => {
  for (const [status, type, cached] of [[200, 'application/json', true], [304, 'application/json', true], [404, 'application/json', false], [200, 'text/html', false]] as const) {
    const response = await onRequest({ request: new Request(`https://riragamehub.com${urlFor(first)}`), next: async () => new Response(status === 304 ? null : '{}', { status, headers: { 'Content-Type': type, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' } }) });
    expect(response.headers.get('Cache-Control')).toBe(cached ? 'public, max-age=31536000, immutable' : 'no-cache');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  }
});
