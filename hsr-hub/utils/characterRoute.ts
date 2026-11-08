import characterSummary from '../data/generated/character-summary.json';

// Character detail URLs use the English id (/gallery/hsr/character/acheron).
// A Korean name in the path is not a published route and returns 404 at the edge.
const normalize = (value: string) => value.normalize('NFC').replace(/\s+/g, '').replace(/[•·]/g, '').toLowerCase();

// The URL segment is the data file name, which differs from the data id for two
// Trailblazers (routeId trailblazer_preservation, id trailblazer_fire).
type SummaryEntry = { id: string; routeId?: string; name: string; folderName?: string };
const characters = characterSummary as SummaryEntry[];

const entryByKey = new Map<string, SummaryEntry>();
for (const character of characters) {
  for (const key of [character.id, character.routeId, character.name, character.folderName]) {
    if (key && !entryByKey.has(normalize(key))) entryByKey.set(normalize(key), character);
  }
}

/** Data id (the key of the runtime manifests) for a name, URL segment or id. */
export function getHsrCharacterId(nameOrId: string | undefined): string | undefined {
  return nameOrId ? entryByKey.get(normalize(nameOrId))?.id : undefined;
}

/** Published detail URL, or undefined when the character has no page. */
export function getHsrCharacterPath(nameOrId: string | undefined): string | undefined {
  const entry = nameOrId ? entryByKey.get(normalize(nameOrId)) : undefined;
  return entry ? `/gallery/hsr/character/${encodeURIComponent(entry.routeId || entry.id)}` : undefined;
}
