import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { normalizeWwGuideName, resolveWwGuideRoute } from './lib/ww-guide-route.js';
import { sanitizePublicGuideData } from './lib/public-guide-links.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

export function writeWwGuideRuntime() {
  const characters = read('ww-hub/data/generated/guide-characters.json');
  const guides = read('ww-hub/data/generated/guides.json');
  const summary = read('ww-hub/data/generated/character-summary.json');
  const echoes = read('ww-hub/data/generated/echoes.json');
  const analyses = read('ww-hub/data/guide-analysis.json');
  const candidates = new Set([...characters, ...guides, ...summary].flatMap(entry => [entry.id, entry.name, entry.folderName]).filter(Boolean));
  const directory = path.join(root, 'public/assets/data/ww/guides');
  fs.mkdirSync(directory, { recursive: true });
  const aliases = {};
  const normalizedAliases = {};
  const files = new Set();
  for (const candidate of candidates) {
    const { character, guide } = resolveWwGuideRoute(candidate, characters, guides, summary);
    if (!character || !guide) continue;
    const guideText = normalizeWwGuideName(JSON.stringify(guide));
    const data = sanitizePublicGuideData({
      guide,
      analysis: analyses[guide.id] || analyses[character.id] || analyses[candidate],
      echoes: echoes.filter(echo => guideText.includes(normalizeWwGuideName(echo.name))
        || (echo.folderName && guideText.includes(normalizeWwGuideName(echo.folderName))))
        .map(({ name, folderName, cost }) => ({ name, folderName, cost }))
    });
    const json = `${JSON.stringify(data)}\n`;
    const hash = createHash('sha256').update(json).digest('hex').slice(0, 12);
    const filename = `guide.${hash}.json`;
    fs.writeFileSync(path.join(directory, filename), json, 'utf8');
    const url = `/assets/data/ww/guides/${filename}`;
    aliases[candidate] = url;
    normalizedAliases[normalizeWwGuideName(candidate)] ||= url;
    files.add(filename);
  }
  fs.writeFileSync(path.join(root, 'ww-hub/data/generated/guide-runtime-manifest.json'), `${JSON.stringify({ aliases, normalizedAliases }, null, 2)}\n`, 'utf8');
  console.log(`[WW] Generated ${files.size} guide runtime files for ${Object.keys(aliases).length} existing route aliases.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) writeWwGuideRuntime();
