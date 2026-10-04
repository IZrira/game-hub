import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo.json');
const SUMMARY_FILE = path.join(ROOT_DIR, 'aniimo-hub', 'data', 'aniimo-summary.json');
const DETAIL_DIR = path.join(ROOT_DIR, 'public', 'assets', 'data', 'aniimo');

const evolutionStages = new Set(['유년기', '성장기', '성숙기']);
const getEvolutionStage = (entry, form) => {
  const evolution = form?.evolution?.length ? form.evolution : entry.evolution || [];
  const node = evolution.find(candidate => candidate.number === entry.number && (!form || candidate.formKey === form.key))
    || evolution.find(candidate => candidate.number === entry.number);
  return evolutionStages.has(node?.stage) ? node.stage : '특수 개체';
};

const summarizeForm = (entry, form) => ({
  key: form.key,
  label: form.label,
  imageUrl: form.imageUrl,
  elements: form.elements,
  positions: form.positions,
  locations: form.locations,
  stats: form.stats,
  evolutionStage: getEvolutionStage(entry, form),
  traits: form.traits.map(({ name, description }) => ({ name, description })),
  combatSkills: form.combatSkills.map(({ name, description }) => ({ name, description })),
  uniqueSkills: form.uniqueSkills.map(({ name, description }) => ({ name, description })),
  hasDescription: Boolean(form.description)
});

const summarizeEntry = entry => ({
  number: entry.number,
  name: entry.name,
  imageUrl: entry.imageUrl,
  elements: entry.elements,
  positions: entry.positions,
  habitats: entry.habitats,
  detailLocations: entry.detailLocations,
  checkedAt: entry.checkedAt,
  sourceUrl: entry.sourceUrl,
  hasDescription: Boolean(entry.description),
  evolutionStage: getEvolutionStage(entry, entry.forms[0]),
  forms: entry.forms.map(form => summarizeForm(entry, form))
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
