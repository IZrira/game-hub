// Shape Supabase rows the way the site's data modules expect them. These mirror what the
// tier list and party pages do when they load the same rows at runtime.

const TIER_ORDER = ['OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', 'E', 'F'];
const normalizeName = name => String(name || '').normalize('NFC').replace(/[•·\s()]/g, '').trim();
const defined = entries => Object.fromEntries(entries.filter(([, value]) => value !== undefined && value !== null && value !== ''));

/** tier_lists rows of one game -> { [categoryId]: TierGroup[] }, ordered like the pages order them. */
export function tierGroupsFromRows(rows) {
  const byCategory = new Map();
  const sorted = [...rows].sort((a, b) => String(a.category_id).localeCompare(String(b.category_id))
    || (a.display_order ?? 100) - (b.display_order ?? 100)
    || String(a.character_name).localeCompare(String(b.character_name), 'ko'));
  for (const row of sorted) {
    if (!row.category_id || !row.character_name || !row.tier) continue;
    if (!byCategory.has(row.category_id)) byCategory.set(row.category_id, new Map());
    // One entry per character per category: names that differ only by a dot variant are the same character.
    byCategory.get(row.category_id).set(normalizeName(row.character_name), row);
  }
  const result = {};
  for (const [category, characters] of byCategory) {
    const groups = new Map();
    for (const row of characters.values()) {
      if (!groups.has(row.tier)) groups.set(row.tier, { tier: row.tier, label: row.tier, color: '#ffffff', characters: [] });
      groups.get(row.tier).characters.push(defined([
        ['id', `char_${row.character_name}`],
        ['name', row.character_name],
        ['folderName', row.character_name],
        ['role', row.role || '메인 딜러'],
        ['change', row.change || 'stay'],
        ['displayOrder', row.display_order ?? 100],
        ['isTrailblazer', row.character_name.includes('개척자') ? true : undefined],
      ]));
    }
    const rank = tier => (TIER_ORDER.includes(tier) ? TIER_ORDER.indexOf(tier) : TIER_ORDER.length);
    result[category] = [...groups.values()].sort((a, b) => rank(a.tier) - rank(b.tier) || a.tier.localeCompare(b.tier));
  }
  return result;
}

/** tier_lists rows in a stable order with only the fields the pages read, so regenerated files don't churn. */
export function sortedTierRows(rows) {
  return [...rows]
    .sort((a, b) => String(a.category_id).localeCompare(String(b.category_id))
      || (a.display_order ?? 100) - (b.display_order ?? 100)
      || String(a.character_name).localeCompare(String(b.character_name), 'ko'))
    .map(row => ({ category_id: row.category_id, character_name: row.character_name, tier: row.tier,
      role: row.role ?? null, change: row.change ?? null, display_order: row.display_order ?? null }));
}

const memberFromRow = member => defined([
  ['id', member.characterId || member.id],
  ['name', member.characterName || member.name],
  ['role', member.role],
  ['folderName', member.folderName || member.characterName || member.name],
  ['isTrailblazer', (member.characterName || member.name || '').includes('개척자') ? true : undefined],
  ['breakthrough', member.breakthrough],
  ['description', member.description],
  ['attribute', member.attribute],
]);

/** party_recommendations row -> PartyCombination. */
function partyShape(row) {
  return defined([
    ['id', row.party_id || row.id],
    ['name', row.name],
    ['description', row.description || ' '],
    ['mainDPS', row.main_dps || ''],
    ['category', row.category || '기타'],
    ['members', (row.members || []).map(member => {
      const mapped = memberFromRow(member);
      if (!mapped.role) mapped.role = '서포터';
      const { id: _id, ...rest } = mapped;
      // Fixed key order, so regenerated files and the guide data built from them stay stable.
      const substitutes = (member.substitutes || []).map(substitute => {
        const sub = memberFromRow(substitute);
        return defined([['name', sub.name], ['folderName', sub.folderName], ['role', sub.role],
          ['isTrailblazer', sub.isTrailblazer], ['breakthrough', sub.breakthrough], ['description', sub.description]]);
      });
      return substitutes.length ? { id: mapped.id, ...rest, substitutes } : { id: mapped.id, ...rest };
    })],
    ['tags', row.tags || []],
    ['pros', row.pros?.length ? row.pros : undefined],
    ['cons', row.cons?.length ? row.cons : undefined],
  ]);
}

/** Like partyFromRow, but a party without a description keeps an empty string (the pages expect the field). */
export function partyFromRow(row) {
  const party = partyShape(row);
  if (!row.description) party.description = '';
  return party;
}
