// @vitest-environment node
import { expect, it } from 'vitest';
import { loadWwSearchData } from '../common-hub/data/search/ww';
import summary from '../ww-hub/data/generated/character-summary.json';

it('uses canonical character IDs rather than Notion page UUIDs for WW search and guide results', () => {
  const chars = loadWwSearchData().CHARACTER_DB;
  expect(chars.find(c => c.name === '설지')?.id).toBe('baizhi');
  const validIds = new Set(summary.map(c => c.id));
  for (const character of chars) expect(validIds.has(character.id)).toBe(true);
  expect(chars.find(c => c.name === '설지')?.searchUrl).toBe('/gallery/ww/character/baizhi');
  for (const character of chars.filter(c => !c.hasDetailRoute)) {
    expect(character.searchUrl).toBe(`/gallery/ww?menu=${encodeURIComponent('캐릭터')}&search=${encodeURIComponent(character.name)}`);
  }
});
