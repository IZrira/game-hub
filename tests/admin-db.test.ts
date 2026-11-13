// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { planChanges } from '../scripts/admin-db.js';

const tiers = [
  { game_id: 'hsr', category_id: 'chaos', character_name: '아케론', tier: 'SS', role: '메인 딜러', change: 'stay', display_order: 1 },
  { game_id: 'hsr', category_id: 'chaos', character_name: '제레', tier: 'B', role: '메인 딜러', change: 'stay', display_order: 2 },
];

describe('admin DB change planning', () => {
  it('splits upserts into inserts, field-level updates and unchanged rows by the table key', () => {
    const plan = planChanges({
      table: 'tier_lists',
      upsert: [
        { game_id: 'hsr', category_id: 'chaos', character_name: '아케론', tier: 'S', change: 'down' },
        { game_id: 'hsr', category_id: 'chaos', character_name: '제레', tier: 'B' },
        { game_id: 'hsr', category_id: 'fiction', character_name: '제레', tier: 'A' },
      ],
    }, tiers);
    expect(plan.updates).toHaveLength(1);
    expect(plan.updates[0].fields).toEqual(['tier', 'change']);
    expect(plan.unchanged).toHaveLength(1);
    expect(plan.inserts.map(item => item.row.category_id)).toEqual(['fiction']);
  });

  it('deletes only rows that exist, matched on every key field', () => {
    const plan = planChanges({ table: 'tier_lists', delete: [{ game_id: 'hsr', category_id: 'chaos', character_name: '제레' }] }, tiers);
    expect(plan.deletes[0].current.tier).toBe('B');
    expect(() => planChanges({ table: 'tier_lists', delete: [{ game_id: 'ww', category_id: 'chaos', character_name: '제레' }] }, tiers)).toThrow(/no such row/);
    expect(() => planChanges({ table: 'tier_lists', delete: [{ game_id: 'hsr', character_name: '제레' }] }, tiers)).toThrow(/key field/);
  });

  it('refuses unknown tables, empty change sets, duplicates, incomplete new rows and bad notice categories', () => {
    expect(() => planChanges({ table: 'characters', upsert: [{ id: 'x' }] }, [])).toThrow(/Unknown table/);
    expect(() => planChanges({ table: 'tier_lists' }, tiers)).toThrow(/Nothing to change/);
    const row = { game_id: 'hsr', category_id: 'chaos', character_name: '아케론', tier: 'S' };
    expect(() => planChanges({ table: 'tier_lists', upsert: [row], delete: [row] }, tiers)).toThrow(/more than once/);
    expect(() => planChanges({ table: 'party_recommendations', upsert: [{ game_id: 'ww', party_id: 'new', name: 'p' }] }, [])).toThrow(/missing members/);
    expect(() => planChanges({ table: 'notices', upsert: [{ id: 'n1', title: 't', content: '- a', category: 'Event', game_id: 'ww' }] }, [])).toThrow(/category/);
  });
});
