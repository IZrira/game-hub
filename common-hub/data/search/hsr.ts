import notionSearch from './notion-search.json';

const ENGLISH_CHARACTER_NAMES: Record<string, string> = {
  ashveil: 'Ashveil',
  castorice: 'Castorice'
};

const mergeByName = (baseItems: any[], addedItems: any[]) => {
  const merged = new Map<string, any>();
  baseItems.forEach(item => merged.set(item.name, item));
  addedItems.forEach(item => merged.set(item.name, { ...item, gameId: 'hsr' }));
  return Array.from(merged.values());
};

export const loadHsrSearchData = (language: string) => {
  let characters = notionSearch.hsrCharacters;
  if (language === 'en') {
    characters = notionSearch.hsrCharacters.map(character => {
      const englishName = ENGLISH_CHARACTER_NAMES[character.id];
      return englishName ? { ...character, name: englishName, originalName: character.name } : character;
    });
  }

  return {
    CHARACTER_DB: characters,
    LIGHTCONE_DB: mergeByName(notionSearch.hsrStaticLightcones, notionSearch.hsrLightcones),
    GUIDES: notionSearch.hsrGuides
  };
};
