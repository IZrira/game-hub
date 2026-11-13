import { describe, expect, it } from 'vitest';
import { partyFromRow, tierGroupsFromRows } from '../scripts/lib/content-snapshots.js';
import { HSR_PARTIES } from '../hsr-hub/data/parties';
import { HSR_TIER_DATA, HSR_TIER_CATEGORIES } from '../hsr-hub/data/tiers';
import { WW_TIER_DATA } from '../ww-hub/data/tiers';

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
});
