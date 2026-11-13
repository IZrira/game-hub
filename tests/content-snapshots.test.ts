import { describe, expect, it } from 'vitest';
import { partyFromRow, sortedTierRows, tierGroupsFromRows } from '../scripts/lib/content-snapshots.js';
import { HSR_PARTIES } from '../hsr-hub/data/parties';
import { HSR_TIER_DATA, HSR_TIER_CATEGORIES } from '../hsr-hub/data/tiers';
import { WW_TIER_DATA } from '../ww-hub/data/tiers';
import { WW_PARTY_COMBINATIONS } from '../ww-hub/data/parties';
import { NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';
import { mergeAdminTiers } from '../nte-hub/data/adminData';
import nteTierRows from '../nte-hub/data/generated/tier-rows.json';

describe('tier and party snapshots from the admin DB', () => {
  it('groups tier rows by category and grade in the order the tier pages use', () => {
    const groups = tierGroupsFromRows([
      { category_id: 'chaos', character_name: '제레', tier: 'B', role: '메인 딜러', change: 'down', display_order: 2 },
      { category_id: 'chaos', character_name: '아처', tier: 'OP', role: '메인 딜러', change: 'up', display_order: 1 },
      { category_id: 'chaos', character_name: '개척자 (환락)', tier: 'SS', role: null, change: null, display_order: null },
      { category_id: 'fiction', character_name: '아처', tier: 'S', role: '메인 딜러', change: 'stay', display_order: 1 },
    ]);
    expect(groups.chaos.map(group => group.tier)).toEqual(['OP', 'SS', 'B']);
    expect(groups.chaos[1].characters[0]).toMatchObject({ id: 'char_개척자 (환락)', role: '메인 딜러', change: 'stay', displayOrder: 100, isTrailblazer: true });
    expect(groups.fiction[0].characters[0].name).toBe('아처');
  });

  it('keeps one entry when two rows name the same character with different dot marks', () => {
    const groups = tierGroupsFromRows([
      { category_id: 'chaos', character_name: '히메코·노바', tier: 'S', display_order: 1 },
      { category_id: 'chaos', character_name: '히메코•노바', tier: 'SS', display_order: 2 },
    ]);
    expect(groups.chaos.flatMap(group => group.characters)).toHaveLength(1);
  });

  it('maps a party row to the shape the site data uses', () => {
    const party = partyFromRow({
      party_id: 'p1', name: '파티', description: null, main_dps: '아처', category: '단일', tags: [], pros: [], cons: [],
      members: [{ characterId: 'archer', characterName: '아처', folderName: '아처', role: '메인 딜러',
        substitutes: [{ characterId: 'x', characterName: '트리비', folderName: '트리비', role: '서포터', breakthrough: '1돌+' }] }],
    });
    expect(party).toEqual({
      id: 'p1', name: '파티', description: '', mainDPS: '아처', category: '단일', tags: [],
      members: [{ id: 'archer', name: '아처', role: '메인 딜러', folderName: '아처',
        substitutes: [{ name: '트리비', folderName: '트리비', role: '서포터', breakthrough: '1돌+' }] }],
    });
  });

  it('ships non-empty snapshots for every HSR tier category, WW tiers and HSR parties', () => {
    HSR_TIER_CATEGORIES.forEach(category => expect(HSR_TIER_DATA[category.id]?.length, category.id).toBeGreaterThan(0));
    expect(Object.keys(WW_TIER_DATA).length).toBeGreaterThan(0);
    expect(HSR_PARTIES.length).toBeGreaterThan(40);
  });

  it('keeps a member attribute and orders raw tier rows stably', () => {
    const party = partyFromRow({ party_id: 'n1', name: 'p', members: [{ characterId: 'a', characterName: '구원', role: '메인 딜러', attribute: '령' }] });
    expect(party.members[0]).toMatchObject({ name: '구원', attribute: '령' });
    const rows = sortedTierRows([
      { id: 'x', game_id: 'nte', category_id: 'overall', character_name: '나', tier: 'S', display_order: 2, updated_at: 't' },
      { id: 'y', game_id: 'nte', category_id: 'overall', character_name: '가', tier: 'A', display_order: 1 },
    ]);
    expect(rows.map(row => row.character_name)).toEqual(['가', '나']);
    expect(Object.keys(rows[0])).toEqual(['category_id', 'character_name', 'tier', 'role', 'change', 'display_order']);
  });

  it('ships the WW and NTE parties and NTE tiers from the admin DB with unique ids', () => {
    for (const parties of [WW_PARTY_COMBINATIONS, NTE_PARTY_COMBINATIONS, HSR_PARTIES]) {
      expect(parties.length).toBeGreaterThan(20);
      expect(new Set(parties.map(party => party.id)).size).toBe(parties.length);
      parties.forEach(party => expect(party.members.length).toBeGreaterThan(0));
    }
    WW_PARTY_COMBINATIONS.forEach(party => { expect(Array.isArray(party.pros)).toBe(true); expect(Array.isArray(party.cons)).toBe(true); });
    const categories = mergeAdminTiers(nteTierRows);
    categories.forEach(category => expect(category.tiers.flatMap(group => group.characters).length, category.id).toBeGreaterThan(0));
  });
});
