import notionSearch from './notion-search.json';

const mergeByName = (baseItems: any[], addedItems: any[]) => {
  const merged = new Map<string, any>();
  baseItems.forEach(item => merged.set(item.name, item));
  addedItems.forEach(item => merged.set(item.name, item));
  return Array.from(merged.values());
};

export const loadNteSearchData = () => ({
  CHARACTER_DB: notionSearch.nteCharacters,
  WEAPON_DATA: mergeByName([], notionSearch.nteArcs),
  GUIDES: []
});
