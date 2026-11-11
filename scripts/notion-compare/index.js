// Notion ↔ site data comparison. Reads Notion only; never writes to Notion or to project data.
//
//   npm run compare:notion              all registered hubs
//   npm run compare:notion -- hsr       one hub
//   npm run compare:notion -- --page-only   rebuild review.html from the last items.json
//
// Output (Git-ignored): .tmp/notion-compare/items.json and review.html.
// review.html is the page published as the "RIRA 데이터 대조표" artifact; decisions made on that page
// live in the artifact's own database, not in this repository.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv, createNotion } from './lib/notion.js';
import { createItemList } from './lib/items.js';
import { buildReviewPage } from './lib/page.js';
import { hsr } from './hubs/hsr/index.js';
import { ww } from './hubs/ww/index.js';
import { nte } from './hubs/nte/index.js';
import { aniimo } from './hubs/aniimo/index.js';

const HUBS = [hsr, ww, nte, aniimo];
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

async function main() {
  const outDir = path.join(root, '.tmp', 'notion-compare');
  const template = () => fs.readFileSync(path.join(root, 'scripts', 'notion-compare', 'review-page.html'), 'utf8');
  if (process.argv.includes('--page-only')) {
    // Rebuild review.html from the last items.json without reading Notion (after a template change).
    const payload = JSON.parse(fs.readFileSync(path.join(outDir, 'items.json'), 'utf8'));
    fs.writeFileSync(path.join(outDir, 'review.html'), buildReviewPage(template(), payload));
    console.log(`[compare] rebuilt review.html from items.json (${payload.items.length} items)`);
    return;
  }
  const wanted = process.argv.slice(2).filter(a => !a.startsWith('-'));
  const hubs = wanted.length ? HUBS.filter(h => wanted.includes(h.id)) : HUBS;
  if (!hubs.length) throw new Error(`Unknown hub: ${wanted.join(', ')} (available: ${HUBS.map(h => h.id).join(', ')})`);
  loadEnv(root);
  const notion = createNotion();
  fs.mkdirSync(outDir, { recursive: true });

  const items = [];
  const hubInfo = [];
  for (const hub of hubs) {
    console.log(`[compare] ${hub.name}`);
    const list = createItemList(hub.id);
    const info = await hub.compare({ root, notion, list, log: m => console.log(m) });
    items.push(...list.items);
    hubInfo.push({ id: hub.id, name: hub.name, sourceLabel: hub.sourceLabel || 'Notion', count: list.items.length, ...info });
    const byDb = {};
    for (const it of list.items) byDb[it.db] = (byDb[it.db] || 0) + 1;
    console.log(`[compare] ${hub.id}: ${list.items.length} differences`, byDb);
  }

  const payload = { generatedAt: new Date().toISOString(), hubs: hubInfo, items };
  fs.writeFileSync(path.join(outDir, 'items.json'), JSON.stringify(payload, null, 1));
  fs.writeFileSync(path.join(outDir, 'review.html'), buildReviewPage(template(), payload));
  console.log(`[compare] wrote ${path.relative(root, path.join(outDir, 'review.html'))} (${items.length} items)`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(err); process.exitCode = 1; });
}
