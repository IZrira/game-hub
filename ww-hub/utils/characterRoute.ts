import characterSummary from '../data/generated/character-summary.json';

// Character detail URLs use the English slug (/gallery/ww/character/aalto).
// Characters known only from Notion carry a UUID id and have no detail page,
// and a Korean name in the path is not a published route either: both return
// 404 at the edge, so they resolve to no link.
const normalize = (value: string) => value.normalize('NFC').replace(/\s+/g, '').replace(/[•·]/g, '').toLowerCase();
const isRouteSlug = (id: string) => /^[a-z0-9_]+$/.test(id);

const idByName = new Map<string, string>();
for (const character of characterSummary) {
  if (!isRouteSlug(character.id)) continue;
  for (const key of [character.id, character.name, character.originalName, character.folderName]) {
    if (key && !idByName.has(normalize(key))) idByName.set(normalize(key), character.id);
  }
}

export function getWwCharacterId(nameOrId: string | undefined): string | undefined {
  return nameOrId ? idByName.get(normalize(nameOrId)) : undefined;
}

export function getWwCharacterPath(nameOrId: string | undefined): string | undefined {
  const id = getWwCharacterId(nameOrId);
  return id ? `/gallery/ww/character/${encodeURIComponent(id)}` : undefined;
}
