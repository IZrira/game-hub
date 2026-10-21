import notionSearch from './notion-search.json';
import characterSummary from '../../../ww-hub/data/generated/character-summary.json';

// Notion record IDs are not public character slugs. Keep runtime IDs authoritative.
const normalizeName = (value: string) => value.replace(/\s+/g, '').toLowerCase();
const searchableCharacters = characterSummary.map(character => {
  const aliases = [character.name, character.folderName, character.originalName].filter(Boolean).map(normalizeName);
  const record = notionSearch.wwCharacters.find(item => aliases.includes(normalizeName(item.name)));
  const hasDetailRoute = !/^[a-f0-9]{8}-[a-f0-9-]{27}$/i.test(character.id);
  return { ...character, ...record, id: character.id, name: character.name, gameId: 'ww',
    hasDetailRoute,
    searchUrl: hasDetailRoute ? `/gallery/ww/character/${encodeURIComponent(character.id)}`
      : `/gallery/ww?menu=${encodeURIComponent('캐릭터')}&search=${encodeURIComponent(character.name)}` };
});

const mergeByName = (baseItems: any[], addedItems: any[]) => {
  const merged = new Map<string, any>();
  baseItems.forEach(item => merged.set(item.name, { ...item, gameId: 'ww' }));
  addedItems.forEach(item => merged.set(item.name, item));
  return Array.from(merged.values());
};

export const loadWwSearchData = () => ({
  CHARACTER_DB: searchableCharacters,
  WEAPON_DATA: mergeByName([], notionSearch.wwWeapons),
  GUIDES: notionSearch.wwGuides
});
