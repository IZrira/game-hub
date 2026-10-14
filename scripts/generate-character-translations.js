import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Keep the authoring JSON intact. These files are build artifacts for detail routes.
export function writeCharacterTranslationPacks(catalogs) {
  const manifest = {};
  for (const scope of ['hsr', 'ww']) {
    const characters = catalogs[scope];
    const ids = new Set(characters.map(character => character.id));
    const aliases = {};
    for (const character of characters) {
      for (const alias of [character.id, character.name, character.originalName, character.folderName]) {
        if (alias) aliases[alias] = character.id;
      }
    }
    const packs = {};
    const sourceDir = path.join(root, 'common-hub/locales', scope);
    const outputDir = path.join(sourceDir, 'characters');
    fs.mkdirSync(outputDir, { recursive: true });
    for (const language of ['ko', 'en', 'ja']) {
      const source = path.join(sourceDir, `${scope}_characters_${language}.json`);
      if (!fs.existsSync(source)) continue;
      const translations = JSON.parse(fs.readFileSync(source, 'utf8'));
      const buckets = { shared: {} };
      for (const [key, value] of Object.entries(translations)) {
        const candidate = key.startsWith('character.') ? key.split('.')[1] : key.split('.')[0];
        const owner = ids.has(candidate) ? candidate : 'shared';
        (buckets[owner] ||= {})[key] = value;
      }
      packs[language] = Object.keys(buckets);
      for (const [owner, entries] of Object.entries(buckets)) {
        fs.writeFileSync(path.join(outputDir, `${owner}_${language}.json`), `${JSON.stringify(entries)}\n`, 'utf8');
      }
    }
    manifest[scope] = { aliases, packs };
  }
  fs.writeFileSync(path.join(root, 'common-hub/data/search/character-translations.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log('[i18n] Generated per-character detail translation packs.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeCharacterTranslationPacks(Object.fromEntries(['hsr', 'ww'].map(scope => [scope,
    JSON.parse(fs.readFileSync(path.join(root, `${scope}-hub/data/generated/character-summary.json`), 'utf8'))
  ])));
}
