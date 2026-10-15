import fs from 'node:fs';
import { expect, it } from 'vitest';
import guides from '../ww-hub/data/generated/guides.json';
import characters from '../ww-hub/data/generated/guide-characters.json';
import summary from '../ww-hub/data/generated/character-summary.json';
import echoes from '../ww-hub/data/generated/echoes.json';
import analyses from '../ww-hub/data/guide-analysis.json';
import manifest from '../ww-hub/data/generated/guide-runtime-manifest.json';
import { normalizeWwGuideName as normalize, resolveWwGuideRoute } from '../scripts/lib/ww-guide-route.js';
import { sanitizePublicGuideData } from '../common-hub/utils/publicGuideLinks';
import { onRequest } from '../functions/_middleware';
import type { WwGuideRuntime } from '../ww-hub/utils/guideRuntime';

const aliases = manifest.aliases as Record<string, string>;
const readRuntime = (url: string): WwGuideRuntime => JSON.parse(fs.readFileSync(`public${url}`, 'utf8'));

it('preserves every WW guide including variants, conditions, synergy and analysis', () => {
  const covered = new Set<string>();
  for (const [route, url] of Object.entries(aliases)) {
    const { guide, character } = resolveWwGuideRoute(route, characters, guides, summary);
    const data = readRuntime(url);
    expect(data.guide, route).toEqual(sanitizePublicGuideData(guide));
    const analysis = (analyses as Record<string, unknown>)[guide.id] || (analyses as Record<string, unknown>)[character.id] || (analyses as Record<string, unknown>)[route];
    expect(data.analysis, route).toEqual(sanitizePublicGuideData(analysis));
    covered.add(guide.id);
    for (const variant of [guide, ...(guide.variants || [])]) {
      for (const echo of variant.mainEchoes || []) {
        const name = (echo.name || '').split(/[:：]/)[0].trim();
        const find = (entry: { name: string; folderName?: string }) => entry.name === name || normalize(entry.name) === normalize(name) || Boolean(entry.folderName && normalize(entry.folderName) === normalize(name));
        const original = echoes.find(find);
        const actual = data.echoes.find(find);
        expect(actual, `${route}/${name}`).toEqual(original ? { name: original.name, folderName: original.folderName, cost: original.cost } : undefined);
      }
    }
  }
  expect([...covered].sort()).toEqual(guides.map(guide => guide.id).sort());
});

it('retains canonical IDs, source database IDs, Korean aliases and separate Yangyang forms', () => {
  for (const route of ['camellya', '카멜리아', '3be95fae-3dc7-809a-848d-cf54b30c697b', 'yangyang', '양양', 'yangyang_magistrate']) {
    expect(aliases[route], route).toBeDefined();
    expect(readRuntime(aliases[route]).guide).toBeTruthy();
  }
  expect(aliases.yangyang).not.toBe(aliases.yangyang_magistrate);
  expect(resolveWwGuideRoute('존재하지않는캐릭터', characters, guides, summary).guide).toBeUndefined();
});

it('does not import complete guide, analysis or echo descriptions into the WW guide page', () => {
  const page = fs.readFileSync('ww-hub/pages/WuwaCharacterGuideDetail.tsx', 'utf8');
  expect(page).not.toMatch(/from ['"]\.\.\/data\/(guideData|guide-analysis\.json|echoData)['"]/);
});

it('applies immutable caching to hashed WW guide data without affecting unhashed character data', async () => {
  for (const [url, expected] of [[aliases.camellya, 'public, max-age=31536000, immutable'], ['/assets/data/ww/characters/camellya.json', 'no-cache']] as const) {
    const result = await onRequest({ request: new Request(`https://riragamehub.com${url}`), next: async () => new Response('{}', { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } }) });
    expect(result.headers.get('Cache-Control')).toBe(expected);
  }
});
