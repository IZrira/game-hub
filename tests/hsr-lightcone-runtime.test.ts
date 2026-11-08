// @vitest-environment node
import fs from 'node:fs';
import { expect, it } from 'vitest';
import { SORTED_LIGHTCONE_DATA } from '../hsr-hub/data/lightcones';
import manifest from '../hsr-hub/data/generated/lightcone-runtime-manifest.json';
import { onRequest } from '../functions/_middleware';

const urls = manifest as Record<string, string>;

it('ships every light cone as its own hashed runtime file with unchanged data', () => {
  expect(Object.keys(urls).sort()).toEqual(SORTED_LIGHTCONE_DATA.map(lc => lc.name).sort());
  for (const lightcone of SORTED_LIGHTCONE_DATA) {
    const url = urls[lightcone.name];
    expect(url, lightcone.name).toMatch(/^\/assets\/data\/hsr\/lightcones\/[a-f0-9]{16}\.json$/);
    const runtime = JSON.parse(fs.readFileSync(`public${url}`, 'utf8'));
    expect(runtime.lightcone, lightcone.name).toEqual(JSON.parse(JSON.stringify({ ...lightcone, gameId: 'hsr' })));
  }
});

it('keeps full light cone and character data out of the light cone detail bundle', () => {
  const page = fs.readFileSync('hsr-hub/pages/LightConeDetail.tsx', 'utf8');
  expect(page).not.toMatch(/common-hub\/data\/games|data\/lightcones['"]/);
  const section = fs.readFileSync('hsr-hub/components/HsrRecommendedCharactersSection.tsx', 'utf8');
  expect(section).not.toMatch(/common-hub\/data\/games/);
});

it('serves light cone runtime files with immutable caching', async () => {
  const path = Object.values(urls)[0];
  const response = await onRequest({
    request: new Request(`https://riragamehub.com${path}`),
    next: async () => new Response('{}', { headers: { 'Content-Type': 'application/json' } }),
  });
  expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
});
