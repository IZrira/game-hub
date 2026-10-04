import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
const SUMMARY_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo-summary.json');
const DETAIL_DIR = path.join(ROOT_DIR, 'public', 'assets', 'data', 'aniimo');

const summarizeForm = form => ({
  key: form.key,
  label: form.label,
  imageUrl: form.imageUrl,
  elements: form.elements,
  positions: form.positions,
  locations: form.locations
});

const summarizeEntry = entry => ({
  number: entry.number,
  name: entry.name,
  imageUrl: entry.imageUrl,
  elements: entry.elements,
  positions: entry.positions,
  forms: entry.forms.map(summarizeForm)
});

export function writeAniimoRuntimeData() {
  const entries = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf8'));
  const summary = entries.map(summarizeEntry);

  fs.mkdirSync(DETAIL_DIR, { recursive: true });
  fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  entries.forEach(entry => {
    fs.writeFileSync(
      path.join(DETAIL_DIR, `${entry.number}.json`),
      `${JSON.stringify(entry)}\n`,
      'utf8'
    );
  });

  console.log(`[Aniimo] Generated ${entries.length} detail files and lightweight summary data.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeAniimoRuntimeData();
}
