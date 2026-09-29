import notionSearch from './notion-search.json';

const mergeByName = (baseItems: any[], addedItems: any[]) => {
  const merged = new Map<string, any>();
  baseItems.forEach(item => merged.set(item.name, { ...item, gameId: 'ww' }));
  addedItems.forEach(item => merged.set(item.name, item));
  return Array.from(merged.values());
};

export const loadWwSearchData = () => ({
  CHARACTER_DB: mergeByName([], notionSearch.wwCharacters),
  WEAPON_DATA: mergeByName([], notionSearch.wwWeapons),
  GUIDES: notionSearch.wwGuides
});
