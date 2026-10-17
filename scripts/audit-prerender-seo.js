import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { auditGoogleVerification } from './lib/google-verification.js';
import { inspectPrerenderContent } from './lib/prerender-content-checks.js';
import { inspectPrerenderHead } from './lib/prerender-head-checks.js';
import { NTE_PARTY_SEO } from '../common-hub/data/ntePartySeo.js';

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
  if (/\/gallery\/(?:hsr|ww|nte|aniimo)\/guides$/.test(routePath)) return 450;
  if (routePath === '/gallery/aniimo/party-builder') return 450;
  if (/\/(lightcone|relic|ornament|weapon|echo)\//.test(routePath)) return 240;
  if (/\/location\//.test(routePath)) return 400;
  if (/\/gallery\/(hsr|ww|nte)\/(tierlist|parties|terminology)$/.test(routePath)) return 450;
  return 120;
};

const routes = SITEMAP_FILES.flatMap((fileName) => {
  const filePath = path.join(PUBLIC_DIR, fileName);
  if (!fs.existsSync(filePath)) throw new Error(`Missing sitemap: ${fileName}`);
  const xml = fs.readFileSync(filePath, 'utf8');
  return [...xml.matchAll(/<loc>https:\/\/riragamehub\.com([^<]*)<\/loc>/g)]
    .map((match) => decodeURI(match[1] || '/'));
});

const hubLinkAudits = [
  {
    game: 'HSR',
    hubPath: path.join(DIST_DIR, 'gallery', 'hsr', 'index.html'),
    routePattern: /^\/gallery\/hsr\/(?:character\/[^/]+(?:\/guide)?|lightcone\/[^/]+|relic\/[^/]+|ornament\/[^/]+)$/,
  },
  {
    game: 'WW',
    hubPath: path.join(DIST_DIR, 'gallery', 'ww', 'index.html'),
    routePattern: /^\/gallery\/ww\/(?:character\/[^/]+(?:\/guide)?|weapon\/[^/]+|echo\/[^/]+)$/,
  },
  {
    game: 'NTE',
    hubPath: path.join(DIST_DIR, 'gallery', 'nte', 'index.html'),
    routePattern: /^\/gallery\/nte\/(?:character|weapon)\/[^/]+$/,
  },
  {
    game: 'Aniimo',
    hubPath: path.join(DIST_DIR, 'gallery', 'aniimo', 'characters', 'index.html'),
    routePattern: /^\/gallery\/aniimo\/character\/[^/]+$/,
  },
];

const hubAuditStats = hubLinkAudits.map(({ game, hubPath, routePattern }) => {
  if (!fs.existsSync(hubPath)) throw new Error(`${game} hub prerendered index.html missing`);

  const hubHtml = fs.readFileSync(hubPath, 'utf8');
  const hubLinks = new Set(
    [...hubHtml.matchAll(/<a\s+[^>]*href="([^"]+)"/g)]
      .map((match) => decodeURI(match[1]))
  );
  const detailRoutes = routes.filter((routePath) => routePattern.test(routePath));
  const missingHubLinks = detailRoutes.filter((routePath) => !hubLinks.has(routePath));
  if (missingHubLinks.length > 0) {
    throw new Error(`${game} detail routes missing from hub prerender links: ${missingHubLinks.join(', ')}`);
  }
  return { game, count: detailRoutes.length };
});

// Search Console에서 실제로 Soft 404 또는 크롤링 후 미색인으로 보고된
// 핵심 URL입니다. 해당 문서가 삭제되거나 얇은 셸로 퇴행하면 배포 전에 막습니다.
const searchConsolePriorityRoutes = [
  '/gallery/nte/parties',
  '/gallery/nte/character/감정사',
  '/gallery/hsr/character/feixiao/guide',
  '/gallery/hsr/lightcone/풍작',
  '/gallery/ww/character/baizhi',
  '/gallery/ww/character/rover_aero',
  '/gallery/hsr/character/boothill/guide',
  '/gallery/ww/character/chisa',
  '/gallery/ww/character/chaconne/guide',
  '/gallery/nte/weapon/봄을 심는 바보',
  '/gallery/hsr/guides/damage-formula-guide',
  '/gallery/aniimo/character/싹크랩',
  '/gallery/ww/weapon/41형 대검 · 무거운 책임',
  '/gallery/ww/weapon/전우의 의리',
  '/gallery/ww/weapon/태초의 권갑',
  '/gallery/aniimo/type-chart',
  '/gallery/hsr/character/misha',
  '/gallery/hsr/character/trailblazer_destruction',
];

const problems = [];
problems.push(...auditGoogleVerification(
  fs.readFileSync(path.join(ROOT_DIR, 'index.html'), 'utf8'),
  fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8')
));
const warnings = [];
const titleRoutes = new Map();
const descriptionRoutes = new Map();
const stats = [];

for (const routePath of searchConsolePriorityRoutes) {
  if (!routes.includes(routePath)) {
    problems.push(`${routePath}: Search Console priority route missing from sitemap`);
  }
}

for (const routePath of routes) {
  const segments = routePath.split('/').filter(Boolean).map((segment) => decodeURI(segment));
  const htmlPath = path.join(DIST_DIR, ...segments, 'index.html');
  if (!fs.existsSync(htmlPath)) {
    problems.push(`${routePath}: prerendered index.html missing`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const contentCheck = inspectPrerenderContent(html, routePath);
  problems.push(...contentCheck.problems.map(problem => `${routePath}: ${problem}`));
  const { title, description, canonical, problems: headProblems } = inspectPrerenderHead(html);
  problems.push(...headProblems.map(problem => `${routePath}: ${problem}`));
  if (routePath === NTE_PARTY_SEO.url) {
    if (title !== `${NTE_PARTY_SEO.title} | RIRA ARCHIVE`) problems.push(`${routePath}: shared party title mismatch`);
    if (description !== NTE_PARTY_SEO.description) problems.push(`${routePath}: shared party description mismatch`);
    if (!html.includes(`<h1>${NTE_PARTY_SEO.heading}</h1>`)) problems.push(`${routePath}: shared party heading mismatch`);
  }
  const textLength = extractText(html).length;
  const internalLinks = [...html.matchAll(/<a\s+[^>]*href="\/(?!\/)/g)].length;

  if (!title) problems.push(`${routePath}: title missing`);
  if (!description) problems.push(`${routePath}: description missing`);
  else if (description.length < 45) warnings.push(`${routePath}: description too short (${description.length})`);
  if (!canonical) problems.push(`${routePath}: canonical missing`);
  else {
    const encodedPath = routePath
      .split('/')
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join('/');
    const expectedCanonical = `https://riragamehub.com${encodedPath}`;
    if (canonical !== expectedCanonical) {
      problems.push(`${routePath}: canonical mismatch (${canonical})`);
    }
    if (canonical.includes('?lng=')) {
      problems.push(`${routePath}: language query leaked into canonical`);
    }
  }
  if (textLength < getMinimumTextLength(routePath)) {
    problems.push(`${routePath}: prerendered text too short (${textLength})`);
  }
  if (internalLinks < 5) problems.push(`${routePath}: too few internal links (${internalLinks})`);

  if (title) titleRoutes.set(title, [...(titleRoutes.get(title) || []), routePath]);
  if (description) descriptionRoutes.set(description, [...(descriptionRoutes.get(description) || []), routePath]);
  stats.push({ routePath, textLength, internalLinks, articleBodyLength: contentCheck.bodyLength });
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
hubAuditStats.forEach(({ game, count }) => {
  console.log(`${game} hub crawl links: ${count} detail routes`);
});
console.log(`Average prerendered text: ${averageTextLength} characters`);
const guideBodies = stats.filter(item => item.articleBodyLength !== undefined);
console.log(`Guide article bodies: ${guideBodies.length} checked; minimum ${guideBodies.length ? Math.min(...guideBodies.map(item => item.articleBodyLength)) : 0} chars (navigation/footer excluded)`);
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
