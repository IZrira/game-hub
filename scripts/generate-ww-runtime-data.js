import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'generated', 'characters.json');
const SUMMARY_FILE = path.join(ROOT_DIR, 'ww-hub', 'data', 'generated', 'character-summary.json');
const DETAIL_DIR = path.join(ROOT_DIR, 'public', 'assets', 'data', 'ww', 'characters');

export function writeWwRuntimeData() {
  const characters = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const summary = characters.map(character => ({
    id: character.id,
    name: character.name,
    originalName: character.originalName
  }));

  fs.mkdirSync(DETAIL_DIR, { recursive: true });
  fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  characters.forEach(character => {
    fs.writeFileSync(
      path.join(DETAIL_DIR, `${character.id}.json`),
      `${JSON.stringify(character)}\n`,
      'utf8'
    );
  });

  console.log(`[WW] Generated ${characters.length} character detail files and lightweight summary data.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeWwRuntimeData();
}
