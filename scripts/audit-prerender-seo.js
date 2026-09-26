import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const SITEMAP_FILES = [
  'sitemap-main.xml',
  'sitemap-hsr.xml',
  'sitemap-ww.xml',
  'sitemap-nte.xml',
  'sitemap-aniimo.xml',
  'sitemap-blog.xml',
];

const decodeEntities = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

const extractText = (html) => {
  const prerenderMatch = html.match(/<div class="prerender-shell"[\s\S]*?<!-- PRERENDER_CONTENT_END -->/);
  const content = prerenderMatch?.[0] || '';
  return decodeEntities(content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
};

const getMinimumTextLength = (routePath) => {
  if (/\/character\/[^/]+\/guide$/.test(routePath)) return 450;
  if (/\/character\/[^/]+$/.test(routePath)) return 650;
  if (/\/(lightcone|relic|ornament|weapon|echo)\//.test(routePath)) return 240;
  if (/\/location\//.test(routePath)) return 400;
  return 120;
};

const routes = SITEMAP_FILES.flatMap((fileName) => {
  const filePath = path.join(PUBLIC_DIR, fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Missing sitemap: ${fileName}`);
  const xml = fs.readFileSync(filePath, 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/riragamehub\.com([^<]*)<\/loc>/g)]
    .map((match) => decodeURI(match[1] || '/'));
});

const problems = [];
const warnings = [];
const titleRoutes = new Map();
const descriptionRoutes = new Map();
const stats = [];

for (const routePath of routes) {
  const segments = routePath.split('/').filter(Boolean).map((segment) => decodeURI(segment));
  const htmlPath = path.join(DIST_DIR, ...segments, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    problems.push(`${routePath}: prerendered index.html missing`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]?.trim() || '';
  const description = html.match(/<meta name="description" content="(.*?)"\s*\/>/s)?.[1]?.trim() || '';
  const canonical = html.match(/<link rel="canonical" href="(.*?)"\s*\/>/s)?.[1]?.trim() || '';
  const textLength = extractText(html).length;
  const internalLinks = [...html.matchAll(/<a\s+[^>]*href="\/(?!\/)/g)].length;

  if (!title) problems.push(`${routePath}: title missing`);
  if (!description) problems.push(`${routePath}: description missing`);
  else if (description.length < 45) warnings.push(`${routePath}: description too short (${description.length})`);
  if (!canonical) problems.push(`${routePath}: canonical missing`);
  if (textLength < getMinimumTextLength(routePath)) {
    problems.push(`${routePath}: prerendered text too short (${textLength})`);
  }
  if (internalLinks < 5) problems.push(`${routePath}: too few internal links (${internalLinks})`);

  if (title) titleRoutes.set(title, [...(titleRoutes.get(title) || []), routePath]);
  if (description) descriptionRoutes.set(description, [...(descriptionRoutes.get(description) || []), routePath]);
  stats.push({ routePath, textLength, internalLinks });
}

for (const [title, matchedRoutes] of titleRoutes) {
  if (matchedRoutes.length > 1) warnings.push(`Duplicate title (${matchedRoutes.length}): ${title}`);
}
for (const [description, matchedRoutes] of descriptionRoutes) {
  if (matchedRoutes.length > 1) warnings.push(`Duplicate description (${matchedRoutes.length}): ${description.slice(0, 80)}`);
}

const sorted = [...stats].sort((a, b) => a.textLength - b.textLength);
const averageTextLength = stats.length
  ? Math.round(stats.reduce((sum, item) => sum + item.textLength, 0) / stats.length)
  : 0;

console.log(`SEO prerender audit: ${routes.length} sitemap routes`);
console.log(`Average prerendered text: ${averageTextLength} characters`);
console.log('Thinnest routes:');
sorted.slice(0, 10).forEach((item) => {
  console.log(`- ${item.routePath}: ${item.textLength} chars, ${item.internalLinks} internal links`);
});

if (warnings.length > 0) {
  console.warn(`\nSEO audit warnings: ${warnings.length}`);
  warnings.slice(0, 30).forEach((warning) => console.warn(`- ${warning}`));
  if (warnings.length > 30) console.warn(`- ...and ${warnings.length - 30} more`);
}

if (problems.length > 0) {
  console.error(`\nSEO audit failed with ${problems.length} issue(s):`);
  problems.slice(0, 100).forEach((problem) => console.error(`- ${problem}`));
  if (problems.length > 100) console.error(`- ...and ${problems.length - 100} more`);
  process.exit(1);
}

console.log('SEO prerender audit passed.');
