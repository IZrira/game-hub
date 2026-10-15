export const normalizeWwGuideName = name => String(name || '')
  .replace(/_?세팅_?공략|_?공략|_?세팅/g, '')
  .replace(/[()（）\s]/g, '').replace(/[•·]/g, '').toLowerCase().normalize('NFC');

/** Preserve the existing route-guide priority and legacy character-ID fallback. */
export function resolveWwGuideRoute(route, characters, guides, summary) {
  const cleanParam = String(route || '').replace(/_?세팅_?공략|_?공략|_?세팅/g, '').trim();
  const normalized = normalizeWwGuideName(cleanParam);
  const routeGuide = guides.find(guide => {
    const id = (guide.id || '').replace(/_세팅_공략|_공략/g, '').trim();
    return guide.id === route || id === cleanParam || normalizeWwGuideName(id) === normalized
      || normalizeWwGuideName(guide.name) === normalized;
  });
  let character = characters.find(character => character.id === route || character.id === cleanParam
    || character.name === route || character.name === cleanParam
    || normalizeWwGuideName(character.name) === normalizeWwGuideName(route)
    || normalizeWwGuideName(character.name) === normalized);
  if (!character && routeGuide) {
    const entry = summary.find(character => character.id === routeGuide.id);
    character = characters.find(character => normalizeWwGuideName(character.name) === normalizeWwGuideName(routeGuide.name)
      || normalizeWwGuideName(character.folderName) === normalizeWwGuideName(routeGuide.name)
      || (entry?.name && normalizeWwGuideName(character.name) === normalizeWwGuideName(entry.name))
      || (entry?.folderName && normalizeWwGuideName(character.folderName) === normalizeWwGuideName(entry.folderName)));
  }
  const guide = routeGuide || guides.find(guide => {
    const id = (guide.id || '').replace(/_세팅_공략|_공략/g, '').trim();
    const characterId = character?.id || route;
    const name = normalizeWwGuideName(character?.name || route);
    const folder = normalizeWwGuideName(character?.folderName);
    return guide.id === characterId || guide.id === route || id === characterId
      || (id && (normalizeWwGuideName(id) === name || normalizeWwGuideName(id) === folder))
      || (guide.name && (normalizeWwGuideName(guide.name) === name || normalizeWwGuideName(guide.name) === folder));
  });
  return { character, guide };
}
