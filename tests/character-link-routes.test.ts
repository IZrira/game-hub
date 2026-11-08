// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { INDEXABLE_AND_APP_PATHS } from '../functions/generated-routes';
import { onRequest } from '../functions/_middleware';
import { HSR_PARTIES } from '../hsr-hub/data/parties';
import { WW_PARTY_COMBINATIONS } from '../ww-hub/data/parties';
import { HSR_TIER_DATA } from '../hsr-hub/data/tiers';
import { WW_TIER_DATA } from '../ww-hub/data/tiers';
import hsrSummary from '../hsr-hub/data/generated/character-summary.json';
import wwSummary from '../ww-hub/data/generated/character-summary.json';
import { getHsrCharacterId, getHsrCharacterPath } from '../hsr-hub/utils/characterRoute';
import { getWwCharacterPath } from '../ww-hub/utils/characterRoute';

const partyNames = (parties: { members: { name: string; substitutes?: { name: string }[] }[] }[]) =>
  [...new Set(parties.flatMap(party => party.members.flatMap(member => [member.name, ...(member.substitutes || []).map(sub => sub.name)])))];
const tierNames = (tiers: Record<string, { characters: { name: string }[] }[]>) =>
  [...new Set(Object.values(tiers).flat().flatMap(group => group.characters.map(character => character.name)))];
const isPublished = (path: string | undefined) => Boolean(path && INDEXABLE_AND_APP_PATHS.has(decodeURIComponent(path)));

describe('character links resolve to published detail pages', () => {
  it.each([
    ['HSR parties', partyNames(HSR_PARTIES)],
    ['HSR tier list', tierNames(HSR_TIER_DATA as never)],
  ])('%s link every character to a published page', (_label, names) => {
    expect(names.length).toBeGreaterThan(0);
    for (const name of names) expect(isPublished(getHsrCharacterPath(name)), name).toBe(true);
  });

  it.each([
    ['WW parties', partyNames(WW_PARTY_COMBINATIONS)],
    ['WW tier list', tierNames(WW_TIER_DATA as never)],
  ])('%s link only to published pages and leave characters without one unlinked', (_label, names) => {
    const withoutPage = new Set(wwSummary.filter(character => !/^[a-z0-9_]+$/.test(character.id)).map(character => character.name));
    for (const name of names) {
      const path = getWwCharacterPath(name);
      if (withoutPage.has(name)) expect(path, name).toBeUndefined();
      else expect(isPublished(path), name).toBe(true);
    }
  });

  it('maps every HSR character summary entry to its published URL and back to its data id', () => {
    for (const character of hsrSummary as { id: string; routeId?: string }[]) {
      const path = getHsrCharacterPath(character.id);
      expect(isPublished(path), character.id).toBe(true);
      expect(getHsrCharacterId(path!.split('/').pop()), character.id).toBe(character.id);
    }
  });

  it.each((hsrSummary as { id: string; routeId?: string }[]).filter(character => character.routeId))(
    'redirects the data id URL of $id to its published URL', async ({ id, routeId }) => {
      for (const suffix of ['', '/guide']) {
        const response = await onRequest({ request: new Request(`https://riragamehub.com/gallery/hsr/character/${id}${suffix}`), next: async () => new Response('app') });
        expect(response.status).toBe(301);
        expect(new URL(response.headers.get('Location')!).pathname).toBe(`/gallery/hsr/character/${routeId}${suffix}`);
      }
    });
});
