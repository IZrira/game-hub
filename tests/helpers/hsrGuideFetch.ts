import fs from 'node:fs';
import { vi } from 'vitest';

export const mockGuideFetch = () => vi.fn(async (input: string | URL | Request) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.pathname : input.url;
  if (!/^\/assets\/data\/(?:(hsr|ww)\/guides|articles\/[a-z0-9_-]+)\/[a-z0-9_.-]+\.json$/.test(url)) throw new Error(`Unexpected request: ${url}`);
  return new Response(fs.readFileSync(`public${url}`, 'utf8'), { headers: { 'Content-Type': 'application/json' } });
});

export const mockHsrGuideFetch = mockGuideFetch;
