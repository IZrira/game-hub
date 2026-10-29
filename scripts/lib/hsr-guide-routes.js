// Normalize display-name spacing only; never infer a guide from a route ID.
const normalizeGuideName = value => String(value ?? '').normalize('NFC').replace(/\s+/gu, '');

/**
 * Only explicitly imported guides are eligible; characterName is authoritative.
 * @param {string} indexSource
 * @param {(filename: string) => string} readGuideSource
 * @returns {Map<string, string>}
 */
export function getHsrGuideRegistry(indexSource, readGuideSource) {
  const registry = new Map();
  const imports = /import\s+.*?\s+from\s+['"]\.\/(.*?)['"]/g;
  for (const match of indexSource.matchAll(imports)) {
    const filename = match[1].trim();
    if (!filename || filename === 'index') continue;
    const source = readGuideSource(filename);
    const characterName = source.match(/["']?characterName["']?\s*:\s*["'](.*?)["']/)?.[1];
    if (!characterName) throw new Error(`Missing HSR guide characterName: ${filename}`);
    const key = normalizeGuideName(characterName);
    if (registry.has(key) && registry.get(key) !== filename) {
      throw new Error(`Ambiguous HSR guide registration: ${filename}`);
    }
    registry.set(key, filename);
  }
  return registry;
}

/**
 * Return the actual imported basename, preserving its spelling for file lastmod.
 * @param {{ folderName?: string | null, name?: string | null }} character
 * @param {Map<string, string>} registry
 * @returns {string | undefined}
 */
export function findRegisteredHsrGuide(character, registry) {
  return registry.get(normalizeGuideName(character.folderName)) ||
    registry.get(normalizeGuideName(character.name));
}
