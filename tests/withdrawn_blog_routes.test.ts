import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../functions/_middleware';

const withdrawnPaths = [
  '/blog',
  '/blog/hsr-4-3-meta-analysis',
  '/blog/hsr-firefly-build-guide',
  '/blog/ww-shorekeeper-guide',
  '/blog/ww-jiyan-combat-guide',
  '/blog/hsr-acheron-analysis',
  '/blog/nte-starter-guide',
  '/blog/ww-changli-build-guide',
  '/blog/hsr-feixiao-fua-meta',
  '/blog/nte-party-building-synergy',
];

describe('withdrawn blog routes', () => {
  it.each(withdrawnPaths)('returns an explicit 410 for %s', async path => {
    const next = vi.fn(async () => new Response('SPA fallback'));
    const response = await onRequest({
      request: new Request(`https://riragamehub.com${path}`),
      next,
    });

    expect(response.status).toBe(410);
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(await response.text()).toContain('검수 종료된 공략');
    expect(next).not.toHaveBeenCalled();
  });

  it('keeps active application routes in the downstream pipeline', async () => {
    const next = vi.fn(async () => new Response('active route', { status: 200 }));
    const response = await onRequest({
      request: new Request('https://riragamehub.com/gallery/hsr'),
      next,
    });

    expect(response.status).toBe(200);
    expect(await response.text()).toBe('active route');
    expect(next).toHaveBeenCalledOnce();
  });

  it('returns a real 404 for an unknown application route', async () => {
    const next = vi.fn(async () => new Response('SPA fallback', { status: 200 }));
    const response = await onRequest({
      request: new Request('https://riragamehub.com/__missing_route__'),
      next,
    });

    expect(response.status).toBe(404);
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
    expect(await response.text()).toContain('페이지를 찾을 수 없습니다');
    expect(next).not.toHaveBeenCalled();
  });

  it('allows generated notice detail routes', async () => {
    const next = vi.fn(async () => new Response('notice', { status: 200 }));
    const response = await onRequest({
      request: new Request('https://riragamehub.com/notices/update-2026-07-25'),
      next,
    });

    expect(response.status).toBe(200);
    expect(next).toHaveBeenCalledOnce();
  });
});
