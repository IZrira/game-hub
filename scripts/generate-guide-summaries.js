import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { sanitizePublicGuideData } from './lib/public-guide-links.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function writeGuideSummaries() {
  const articles = sanitizePublicGuideData(JSON.parse(fs.readFileSync(path.join(root, 'common-hub/data/guideArticles.json'), 'utf8')));
  const summaries = articles.map(({ content, sources, ...summary }) => summary);
  fs.writeFileSync(path.join(root, 'common-hub/data/generated/guide-summaries.json'), `${JSON.stringify(summaries, null, 2)}\n`);
  console.log(`[Guides] Generated ${summaries.length} metadata-only article summaries.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) writeGuideSummaries();
