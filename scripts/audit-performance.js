import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Budgets are regression limits, not Lighthouse scores or real-user timings.
export const budgets = {
  entryGzip: 32_000, initialJsGzip: 170_000, cssGzip: 34_000, chunkGzip: 250_000,
  articleSummariesRaw: 24_000,
  guideRaw: 40_000, labelsRaw: 28_000, smallImageRaw: 40_000, largeImageRaw: 110_000,
};
export function checkBudgets(records) {
  return records.filter(({ metric, bytes }) => bytes > budgets[metric]);
}
export function auditPerformance() {
  const records = [];
  const add = (file, metric, gzip = false) => {
    const buffer = fs.readFileSync(path.join(root, file));
    records.push({ file, metric, bytes: gzip ? gzipSync(buffer).length : buffer.length });
  };
  const html = fs.readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  add('common-hub/data/generated/guide-summaries.json', 'articleSummariesRaw');
  const entry = html.match(/<script\b[^>]*type="module"[^>]*src="([^"]+)"/);
  if (!entry) throw new Error('Built module entry missing; run npm run build first.');
  add(`dist${entry[1]}`, 'entryGzip', true);
  const initialFiles = new Set([entry[1], ...Array.from(html.matchAll(/<link\b[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g), match => match[1])]);
  records.push({ file: 'entry + HTML modulepreloads', metric: 'initialJsGzip', bytes: [...initialFiles].reduce((sum, file) => sum + gzipSync(fs.readFileSync(path.join(root, `dist${file}`))).length, 0) });
  for (const file of fs.readdirSync(path.join(root, 'dist/assets'))) {
    if (file.endsWith('.js')) add(`dist/assets/${file}`, 'chunkGzip', true);
    if (file.endsWith('.css')) add(`dist/assets/${file}`, 'cssGzip', true);
  }
  for (const scope of ['hsr', 'ww']) {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, `${scope}-hub/data/generated/guide-runtime-manifest.json`), 'utf8'));
    for (const url of new Set(Object.values(scope === 'ww' ? manifest.aliases : manifest))) add(`public${url}`, 'guideRaw');
    for (const language of ['ko', 'en']) add(`common-hub/locales/${scope}/guide_labels_${language}.json`, 'labelsRaw');
  }
  const images = JSON.parse(fs.readFileSync(path.join(root, 'ww-hub/data/generated/card-thumbnails.json'), 'utf8'));
  for (const item of Object.values(images)) {
    add(`public${item.small}`, 'smallImageRaw');
    add(`public${item.large}`, 'largeImageRaw');
  }
  const failures = checkBudgets(records);
  for (const metric of Object.keys(budgets)) {
    const selected = records.filter(item => item.metric === metric);
    console.log(`${metric}: max ${Math.max(...selected.map(item => item.bytes))} / ${budgets[metric]} bytes (${selected.length} checked)`);
  }
  if (failures.length) throw new Error(`Performance budgets exceeded:\n${failures.map(item => `${item.file}: ${item.bytes} > ${budgets[item.metric]}`).join('\n')}`);
  console.log('Performance budgets passed. Gzip sizes are local estimates, not measured CDN transfers.');
  return records;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) auditPerformance();
