import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { sanitizePublicGuideData } from './lib/public-guide-links.js';
import { attachNteGuideAnalysis } from './lib/nte-guide-analysis.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function writeGuideSummaries() {
  const analyses = JSON.parse(fs.readFileSync(path.join(root, 'nte-hub/data/guideAnalysis.json'), 'utf8'));
  const articles = sanitizePublicGuideData(JSON.parse(fs.readFileSync(path.join(root, 'common-hub/data/guideArticles.json'), 'utf8')).map(article => attachNteGuideAnalysis(article, analyses)));
  const summaries = articles.map(({ content, sources, analysis, ...summary }) => summary);
  fs.writeFileSync(path.join(root, 'common-hub/data/generated/guide-summaries.json'), `${JSON.stringify(summaries, null, 2)}\n`);
  const manifest = {};
  for (const article of articles.filter(item => item.status === 'published')) {
    if (!/^[a-z0-9_-]+$/.test(article.gameId)) throw new Error('Unsafe guide runtime path');
    const data = `${JSON.stringify(article)}\n`;
    const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
    const filename = /^[a-z0-9_-]+$/.test(article.slug) ? article.slug : 'article';
    const url = `/assets/data/articles/${article.gameId}/${filename}.${hash}.json`;
    fs.mkdirSync(path.dirname(path.join(root, 'public', url)), { recursive: true });
    fs.writeFileSync(path.join(root, 'public', url), data);
    manifest[`${article.gameId}/${article.slug}`] = url;
  }
  fs.writeFileSync(path.join(root, 'common-hub/data/generated/article-runtime-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`[Guides] Generated ${summaries.length} metadata-only article summaries.`);
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) writeGuideSummaries();
