import { NTEPartyCombination, NTEPartyMember } from './parties';
import { NTE_TIER_CATEGORIES, NTETierCategory, NTETierCharacter } from './tiers';

export function toPublicParty(item: any): NTEPartyCombination {
  const member = (m: any): NTEPartyMember => ({
    id: m.characterId || m.id || m.characterName || m.name,
    name: m.characterName || m.name,
    folderName: m.folderName || m.characterName || m.name,
    role: m.role || '서포터',
    attribute: m.attribute,
    substitutes: m.substitutes?.map(member),
  });
  return {
    id: item.party_id || item.id,
    name: item.name,
    description: item.description || '',
    category: item.element_synergy || item.elementSynergy || item.category || '범용',
    mainDPS: item.main_dps || item.mainDPS || '',
    tags: item.tags || [],
    pros: item.pros || [],
    cons: item.cons || [],
    members: (item.members || item.slots || []).map(member),
  };
}

export function mergeAdminTiers(rows: any[]): NTETierCategory[] {
  const categories = NTE_TIER_CATEGORIES.map(c => ({ ...c, tiers: c.tiers.map(g => ({ ...g, characters: [...g.characters] })) }));
  const normalize = (name: string) => name.normalize('NFC').replace(/\s+/g, '');
  const rankOrder = ['OP', 'SS', 'S+', 'S', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', '?'];
  const ordered = normalizeAdminTierRows(rows);
  const orders = new Map<string, number>();
  for (const row of ordered) {
    const category = categories.find(c => c.id === row.category_id);
    if (!category || !row.character_name || !row.tier) continue;
    const name = normalize(row.character_name);
    const existing = category.tiers.flatMap(g => g.characters).find(c => normalize(c.name) === name)
      || NTE_TIER_CATEGORIES.flatMap(c => c.tiers.flatMap(g => g.characters)).find(c => normalize(c.name) === name);
    category.tiers.forEach(g => { g.characters = g.characters.filter(c => normalize(c.name) !== name); });
    let group = category.tiers.find(g => g.tier === row.tier);
    if (!group) {
      group = { tier: row.tier, description: '', color: '#ffffff', characters: [] };
      category.tiers.push(group);
    }
    group.characters.push({
      ...existing,
      id: existing?.id || row.character_name,
      name: row.character_name,
      attribute: row.attribute || existing?.attribute || '',
      role: (row.role === '탱커·힐러' ? '탱커/힐러' : row.role) || existing?.role || '서포터',
      change: row.change || existing?.change || 'stay',
      note: row.note ?? existing?.note,
    } as NTETierCharacter);
    orders.set(category.id + ':' + name, row.display_order ?? 100);
  }
  for (const c of categories) {
    c.tiers.sort((a, b) => rankOrder.indexOf(a.tier) - rankOrder.indexOf(b.tier));
    c.tiers.forEach(g => g.characters.sort((a, b) => (orders.get(c.id + ':' + normalize(a.name)) ?? 100) - (orders.get(c.id + ':' + normalize(b.name)) ?? 100)));
  }
  return categories;
}

export function normalizeAdminTierRows<T extends { category_id: string; character_name: string }>(rows: T[]): T[] {
  const aliases: Record<string, string> = { endgame1: 'overall', endgame2: 'distortion' };
  const ordered = [...rows].sort((a, b) => Number(!aliases[a.category_id]) - Number(!aliases[b.category_id]));
  const result = new Map<string, T>();
  for (const row of ordered) {
    const category_id = aliases[row.category_id] || row.category_id;
    result.set(category_id + ':' + row.character_name.normalize('NFC').replace(/\s+/g, ''), { ...row, category_id });
  }
  return [...result.values()];
}
