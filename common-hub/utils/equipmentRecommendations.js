// Single source for "which characters recommend this equipment", shared by the
// detail pages, the prerender script and the sitemap generator. Pages whose item
// no character recommends carry only official data, so they are kept reachable
// but marked noindex and left out of the sitemap.

const nameOf = item => (typeof item === 'string' ? item : item?.name || '');
const squash = value => String(value || '').normalize('NFC').replace(/[「」『』\s]/g, '').toLowerCase();

function addMatch(map, itemName, entry) {
  const key = String(itemName || '').normalize('NFC').trim();
  if (!key) return;
  if (!map.has(key)) map.set(key, []);
  const list = map.get(key);
  if (!list.some(existing => existing.charId === entry.charId)) list.push(entry);
}

function sortByRank(map) {
  map.forEach(list => list.sort((a, b) => (a.rank || 99) - (b.rank || 99)));
  return map;
}

/**
 * HSR light cones, relics and ornaments from the public guide catalog.
 * @param {any[]} guides public-guide-catalog.json
 * @param {any[]} characters character-summary.json
 */
export function buildHsrEquipmentRecommendations(guides, characters) {
  const lightcone = new Map();
  const relic = new Map();
  const ornament = new Map();

  for (const guide of guides || []) {
    const charName = guide?.characterName;
    const char = (characters || []).find(c => c.name === charName || c.id === charName || c.folderName === charName);
    if (!char) continue;
    const base = { charId: char.id, charName: char.name };
    const firstVariant = guide.variants?.[0] || {};
    const pick = key => [...(Array.isArray(guide[key]) ? guide[key] : []), ...(Array.isArray(firstVariant[key]) ? firstVariant[key] : [])];

    pick('bestLightCones').forEach((item, index) => {
      addMatch(lightcone, nameOf(item).trim(), { ...base, rank: index + 1, note: typeof item === 'object' ? item?.note || '' : '' });
    });
    pick('bestRelics').forEach(item => {
      addMatch(relic, nameOf(item).trim(), { ...base, note: typeof item === 'object' ? item?.note || '' : '' });
    });
    pick('bestOrnaments').forEach(item => {
      addMatch(ornament, nameOf(item).trim(), { ...base, note: typeof item === 'object' ? item?.note || '' : '' });
    });
  }

  return { lightcone: sortByRank(lightcone), relic: sortByRank(relic), ornament: sortByRank(ornament) };
}

/**
 * WW weapons and main echoes from the generated recommendation data.
 * @param {{ characters: any[], guides: any[] }} data recommendations.json
 */
export function buildWwEquipmentRecommendations(data) {
  const weapon = new Map();
  const echo = new Map();
  const characters = data?.characters || [];

  for (const guide of data?.guides || []) {
    const cleanId = String(guide.id || '').replace(/_세팅_공략|_공략/g, '').trim();
    const char = characters.find(c => c.id === guide.id || c.name === guide.name || c.id === cleanId || c.name === cleanId || c.folderName === guide.name);
    const charId = char?.id || cleanId || guide.id;
    if (!charId) continue;
    const base = { charId, charName: char?.name || guide.name || charId };

    (Array.isArray(guide.weapons) ? guide.weapons : []).forEach((item, index) => {
      const name = nameOf(item).replace(/[:：].*$/, '').trim();
      addMatch(weapon, name, { ...base, rank: typeof item === 'object' && item.rank ? item.rank : index + 1, note: typeof item === 'object' ? item?.note || '' : '' });
    });
    [...(Array.isArray(guide.mainEchoes) ? guide.mainEchoes : []), ...(Array.isArray(guide.variantMainEchoes) ? guide.variantMainEchoes : [])]
      .forEach((item, index) => {
        addMatch(echo, nameOf(item).trim(), { ...base, rank: index + 1, note: typeof item === 'object' ? item?.reason || '' : '' });
      });
  }

  return { weapon: sortByRank(weapon), echo: sortByRank(echo) };
}

/**
 * NTE arcs from the "아크" block of each published build guide, e.g.
 * "영원한 왈츠 1순위 : 파디아의 전용 아크로 …".
 * @param {{ characterId?: string, content?: string }[]} guides published NTE guides with their character
 * @param {any[]} characters nte character-summary.json
 * @param {any[]} arcs arc list (names as shown on arc pages)
 */
export function buildNteArcRecommendations(guides, characters, arcs) {
  const arc = new Map();
  const arcBySquashed = new Map((arcs || []).map(item => [squash(item.name), item.name]));

  for (const entry of guides || []) {
    const char = (characters || []).find(c => c.id === entry?.characterId);
    if (!char) continue;
    const block = String(entry.content || '').match(/(?:^|\n)#*\s*아크\s*\n([\s\S]*?)(?:\n\s*\n\s*\n|\n#*\s*콘솔|$)/);
    if (!block) continue;
    for (const line of block[1].split('\n')) {
      const match = line.match(/^\s*(.+?)\s+(\d+)\s*순위\s*[:：]\s*(.*)$/);
      if (!match) continue;
      const arcName = arcBySquashed.get(squash(match[1]));
      if (!arcName) continue;
      addMatch(arc, arcName, { charId: char.id, charName: char.name, rank: Number(match[2]), note: match[3].trim() });
    }
  }

  return { weapon: sortByRank(arc) };
}

// Pages kept indexable despite having no recommendation, because people already
// reach them from search (Search Console clicks, 2026-10-04 ~ 10-31).
export const SEARCH_TRAFFIC_EXCEPTIONS = {
  echo: ['절식백'],
};

/**
 * @param {Map<string, any[]>} map recommendations for this equipment kind
 * @param {'lightcone'|'relic'|'ornament'|'weapon'|'echo'|'arc'} kind
 * @param {string} name
 */
export function isIndexableEquipment(map, kind, name) {
  const key = String(name || '').normalize('NFC').trim();
  return map.has(key) || (SEARCH_TRAFFIC_EXCEPTIONS[kind] || []).includes(key);
}

/** @param {Record<string, any[]>} json a map serialized with Object.fromEntries */
export function recommendationMapFromJson(json) {
  return new Map(Object.entries(json || {}));
}

/** @param {Map<string, any[]>} map @param {string} name */
export function getRecommendations(map, name) {
  return map.get(String(name || '').normalize('NFC').trim()) || [];
}
