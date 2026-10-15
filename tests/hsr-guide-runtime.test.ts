import fs from 'node:fs';
import { expect, it } from 'vitest';
import { HSR_CHARACTER_GUIDES } from '../hsr-hub/data/guides';
import { SORTED_LIGHTCONE_DATA } from '../hsr-hub/data/lightcones';
import { RELIC_DATA } from '../hsr-hub/data/relics';
import { ORNAMENT_DATA } from '../hsr-hub/data/ornaments';
import { HSR_PARTIES } from '../hsr-hub/data/parties';
import summary from '../hsr-hub/data/generated/character-summary.json';
import manifest from '../hsr-hub/data/generated/guide-runtime-manifest.json';
import { sanitizePublicGuideData } from '../common-hub/utils/publicGuideLinks';
import type { HsrGuideRuntime } from '../hsr-hub/utils/guideRuntime';
import { onRequest } from '../functions/_middleware';

const normalize = (name: string) => name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
const clean = (entry: string | { name: string }) => (typeof entry === 'string' ? entry : entry.name)
  .split(/[:：]/)[0].replace(/\s*\d+순위.*$/, '').replace(/유성을\s*쫒는\s*괴도/g, '유성을 쫓는 괴도').trim();
const paths = manifest as Record<string, string>;

it('preserves each original HSR guide and its related party order', () => {
  expect(Object.keys(paths)).toHaveLength(HSR_CHARACTER_GUIDES.length);
  for (const character of summary) {
    const runtime = JSON.parse(fs.readFileSync(`public${paths[character.id]}`, 'utf8')) as HsrGuideRuntime;
    const original = HSR_CHARACTER_GUIDES.find(guide => guide.characterName === character.name
      || guide.characterName === character.folderName || normalize(guide.characterName) === normalize(character.name)
      || normalize(guide.characterName) === normalize(character.id));
    expect(runtime.guide, character.id).toEqual(sanitizePublicGuideData(original));
    const parties = HSR_PARTIES.filter(party => party.members.some(member => normalize(member.name) === normalize(character.folderName || character.name)));
    expect(runtime.parties, character.id).toEqual(sanitizePublicGuideData(parties));
  }
});

it('keeps every equipment lookup and image field across all guide variants and alternatives', () => {
  for (const [id, url] of Object.entries(paths)) {
    const runtime = JSON.parse(fs.readFileSync(`public${url}`, 'utf8')) as HsrGuideRuntime;
    const variants = [runtime.guide, ...(runtime.guide.variants || [])];
    for (const variant of variants) {
      for (const item of variant.bestLightCones || []) {
        const name = clean(item);
        const original = SORTED_LIGHTCONE_DATA.find(entry => entry.name === name);
        const actual = runtime.lightcones.find(entry => entry.name === name);
        expect(actual, `${id}/lightcone/${name}`).toEqual(original ? {
          name: original.name, path: original.path, fileName: original.fileName, folderName: original.folderName
        } : undefined);
      }
      for (const [items, full, selected] of [
        [variant.bestRelics, RELIC_DATA, runtime.relics],
        [variant.bestOrnaments, ORNAMENT_DATA, runtime.ornaments]
      ] as const) {
        for (const item of items || []) {
          const name = clean(item);
          const baseName = name.replace(/\s*[24]세트/g, '').replace(/쫒/g, '쫓').trim();
          const original = full.find(entry => entry.name === name || entry.name === baseName || normalize(entry.name) === normalize(baseName));
          const actual = selected.find(entry => entry.name === name || entry.name === baseName || normalize(entry.name) === normalize(baseName));
          expect(actual, `${id}/set/${name}`).toEqual(original ? { name: original.name, type: original.type } : undefined);
          const alternatives = typeof item === 'object' && 'alternatives' in item ? item.alternatives : [];
          for (const alternativeName of Array.isArray(alternatives) ? alternatives : []) {
            const alternative = full.find(entry => entry.name === alternativeName);
            expect(selected.find(entry => entry.name === alternativeName)).toEqual(alternative ? { name: alternative.name, type: alternative.type } : undefined);
          }
        }
      }
    }
  }
});

it('does not statically import the complete guide, equipment or party catalogs in the page', () => {
  const page = fs.readFileSync('hsr-hub/pages/CharacterGuideDetail.tsx', 'utf8');
  expect(page).not.toMatch(/from ['"]\.\.\/data\/(guides|lightcones|relics|ornaments|parties)['"]/);
});

it('replaces inherited no-cache only for successful hashed guide JSON, retaining other headers', async () => {
  for (const status of [200, 304]) {
    const response = await onRequest({
      request: new Request(`https://riragamehub.com${paths.cyrene}`),
      next: async () => new Response(status === 304 ? null : '{}', { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', ETag: 'guide-version', 'X-Content-Type-Options': 'nosniff' } })
    });
    expect(response.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable');
    expect(response.headers.get('ETag')).toBe('guide-version');
    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(response.status).toBe(status);
  }
  for (const [url, status, type] of [[paths.cyrene, 404, 'application/json'], [paths.cyrene, 200, 'text/html'], ['/assets/data/ww/characters/camellya.json', 200, 'application/json']] as const) {
    const response = await onRequest({ request: new Request(`https://riragamehub.com${url}`), next: async () => new Response('{}', { status, headers: { 'Content-Type': type, 'Cache-Control': 'no-cache' } }) });
    expect(response.headers.get('Cache-Control')).toBe('no-cache');
  }
});
