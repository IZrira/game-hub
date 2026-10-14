import fs from 'node:fs';
import { vi } from 'vitest';

export const mockHsrGuideFetch = () => vi.fn(async (input: string | URL | Request) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.pathname : input.url;
  if (!url.startsWith('/assets/data/hsr/guides/')) throw new Error(`Unexpected request: ${url}`);
  return new Response(fs.readFileSync(`public${url}`, 'utf8'), { headers: { 'Content-Type': 'application/json' } });
});
