// @vitest-environment node
import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import { onRequest } from '../functions/_middleware';
import { SECURITY_HEADERS, withSecurityHeaders } from '../functions/security-headers';

describe('Pages Function security response policy', () => {
  it.each(['/search', '/search?q=설지'])('keeps the real search route %s reachable', async path => {
    const next = vi.fn(async () => new Response('<main>앱 화면</main>', { status: 200 }));
    const response = await onRequest({ request: new Request(`https://riragamehub.com${path}`), next });
    expect(response.status).toBe(200);
    expect(next).toHaveBeenCalledOnce();
  });
  it('matches every global security header in public/_headers without changing CSP', () => {
    const block = readFileSync('public/_headers', 'utf8').split(/\r?\n\s*\r?\n/)[0];
    const entries = Object.fromEntries(block.split(/\r?\n/).slice(1).map(line => {
      const separator = line.indexOf(':');
      return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
    }));
    const { 'Cache-Control': _cache, ...security } = entries;
    expect(SECURITY_HEADERS).toEqual(security);
  });

  it.each([
    ['https://riragamehub.com/about/', 301, '/about'],
    ['https://rira-game-hub.pages.dev/gallery/nte?menu=test', 301, '/gallery/nte?menu=test'],
    ['https://riragamehub.com/__missing_security_route__', 404, null],
    ['https://riragamehub.com/blog', 410, null],
  ] as const)('secures edge-generated %s while preserving status, location and noindex', async (url, status, target) => {
    const next = vi.fn(async () => new Response('downstream'));
    const response = await onRequest({ request: new Request(url), next });
    expect(response.status).toBe(status);
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) expect(response.headers.get(name)).toBe(value);
    expect(next).not.toHaveBeenCalled();
    if (target) expect(response.headers.get('Location')).toBe(`https://riragamehub.com${target}`);
    else {
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      expect(response.headers.get('Cache-Control')).toBe(`public, max-age=${status === 404 ? 60 : 300}`);
      expect(await response.text()).toContain('<main>');
    }
  });

  it('preserves downstream cookies, private cache, body, content type and stricter CSP', async () => {
    const response = withSecurityHeaders(new Response('private body', { status: 200, headers: {
      'Content-Security-Policy': "default-src 'none'", 'Cache-Control': 'private, no-store',
      'Content-Type': 'text/plain', 'Set-Cookie': 'test=value; HttpOnly; Secure',
    } }));
    expect(response.headers.get('Content-Security-Policy')).toBe("default-src 'none'");
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
    expect(response.headers.get('Set-Cookie')).toContain('HttpOnly');
    expect(response.headers.get('Content-Type')).toBe('text/plain');
    expect(await response.text()).toBe('private body');
  });

  it.each([
    [200, '/assets/data/hsr/guides/feixiao.abcdef123456.json'],
    [304, '/assets/data/hsr/guides/feixiao.abcdef123456.json'],
    [200, '/assets/data/hsr/characters/feixiao.abcdef123456.json'],
    [304, '/assets/data/hsr/characters/feixiao.abcdef123456.json'],
  ] as const)('preserves immutable successful hashed data cache for %s %s', async (status, path) => {
    const response = await onRequest({
      request: new Request(`https://riragamehub.com${path}`),
      next: async () => new Response(status === 200 ? '{}' : null, { status, headers: { 'Content-Type': 'application/json' } }),
    });
    expect(response.status).toBe(status);
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
  });

  it.each([
    [404, 'application/json', '/assets/data/hsr/characters/feixiao.abcdef123456.json'],
    [200, 'text/html', '/assets/data/hsr/characters/feixiao.abcdef123456.json'],
    [200, 'application/json', '/assets/data/hsr/characters/feixiao.json'],
  ] as const)('does not give immutable caching to errors, fallback HTML or unhashed data (%s %s %s)', async (status, type, path) => {
    const response = await onRequest({ request: new Request(`https://riragamehub.com${path}`),
      next: async () => new Response('not immutable', { status, headers: { 'Content-Type': type, 'Cache-Control': 'no-store' } }),
    });
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  it.each(['private, max-age=0', 'no-store'])('never replaces downstream %s with a public immutable cache', async cache => {
    const response = await onRequest({ request: new Request('https://riragamehub.com/assets/data/hsr/characters/feixiao.abcdef123456.json'),
      next: async () => new Response('{}', { headers: { 'Content-Type': 'application/json', 'Cache-Control': cache } }),
    });
    expect(response.headers.get('Cache-Control')).toBe(cache);
  });
});
