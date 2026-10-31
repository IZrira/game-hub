import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { aniimoAssetId, parseWaveRoster, parseWaveDetail } from './lib/aniimo-wave-parser.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const legacyPath = path.join(root, 'aniimo-hub/data/aniimo.json');
const legacyHash = () => createHash('sha256').update(fs.readFileSync(legacyPath)).digest('hex');
const before = legacyHash();
const origin = 'https://wiki.aniimo.com';
async function fetchHtml(sourcePath) {
  const url = new URL(sourcePath, origin);
  if (url.origin !== origin) throw new Error('Unexpected official source origin');
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'error', headers: { 'user-agent': 'RiraGameHub/1.0 (+https://riragamehub.com)' } });
  if (!response.ok) throw new Error(`Official source HTTP ${response.status}: ${url}`);
  return response.text();
}
const roster = parseWaveRoster(await fetchHtml('/ko'));
const checkedAt = new Date().toISOString().slice(0, 10);
const entries = [];
for (const item of roster) {
  const parsed = parseWaveDetail(await fetchHtml(item.sourcePath), item.sourcePath);
  const forms = [];
  for (const form of parsed.forms) {
    const detail = form.href === item.sourcePath ? parsed.detail : parseWaveDetail(await fetchHtml(form.href), form.href).detail;
    forms.push({ key: form.href.split('/')[4], label: form.label, ...detail, habitats: detail.locations, sourceUrl: origin + form.href });
  }
  entries.push({ ...item, ...parsed.detail, habitats: [...new Set(forms.flatMap(form => form.locations))], forms, sourceUrl: origin + item.sourcePath, checkedAt });
  console.log(`[Aniimo Wave] ${entries.length}/${roster.length} ${item.name}: ${forms.length} forms`);
}
const assets = new Map();
const legacy = JSON.parse(fs.readFileSync(legacyPath, 'utf8'));
for (const item of [...legacy, ...entries]) for (const form of item.forms) {
  const asset = aniimoAssetId(form.imageUrl);
  if (!asset) continue;
  const target = { id: item.id || item.number, regionId: item.regionId, name: item.name, number: item.number, formKey: form.key, formLabel: form.label };
  const candidates = assets.get(asset) || [];
  candidates.push(target);
  assets.set(asset, candidates);
}
let unresolved = 0;
const enrich = nodes => nodes.map(node => {
  const candidates = assets.get(aniimoAssetId(node.imageUrl)) || [];
  // Shared artwork cannot establish a form. Keep only an unambiguous species identity.
  const species = new Set(candidates.map(candidate => `${candidate.regionId || 'legacy'}:${candidate.number}`));
  const target = candidates.length === 1 ? candidates[0] : species.size === 1 ? { ...candidates[0], formKey: null, formLabel: null } : null;
  if (!target) unresolved++;
  return { ...node, ...target };
});
for (const item of entries) {
  for (const detail of [item, ...item.forms]) {
    detail.evolution = enrich(detail.evolution);
    detail.evolutionRoutes = detail.evolutionRoutes.map(enrich);
  }
}
if (legacyHash() !== before) throw new Error('Legacy data changed during collection');
const output = path.join(root, 'aniimo-hub/data/wave-archipelago.json');
fs.writeFileSync(output, JSON.stringify(entries, null, 2) + '\n', 'utf8');
console.log(JSON.stringify({ entries: entries.length, forms: entries.reduce((sum, item) => sum + item.forms.length, 0), unresolvedEvolutionNodes: unresolved, legacySha256: before, output }));
