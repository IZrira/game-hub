// Search recovery R4: read-only Search Console check for https://riragamehub.com/.
// Prints weekly clicks and impressions, sitemap groups with impressions, the D2
// setting-query split, noindexed equipment that still gets impressions (D1), and
// optionally URL Inspection results. It never writes files or changes Search Console.
//
// Usage: npm run seo:check -- [--weeks 8] [--days 28] [--inspect]
// Credentials: GOOGLE_APPLICATION_CREDENTIALS or google-credentials.json (gitignored).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';
import {
  SITE_URL, groupCoverage, pageGroup, settingIntentSplit, sitemapPaths, summarizeWeeks, totalsByPath,
} from './lib/search-performance.js';
import { loadEquipmentRecommendations } from './lib/equipment-recommendations.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITEMAPS = ['main', 'hsr', 'ww', 'nte', 'aniimo', 'blog'].map(name => `public/sitemap-${name}.xml`);
const INSPECT_PATHS = [
  '/',
  '/gallery/hsr/character/acheron',
  '/gallery/hsr/character/acheron/guide',
  '/gallery/nte/guides/잔홍-build-guide',
  '/gallery/aniimo/location/붓꽃-바다',
];

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? Number(args[index + 1]) : fallback;
};
const weeks = option('weeks', 8);
const days = option('days', 28);
const inspect = args.includes('--inspect');

const isoDaysAgo = n => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
// Search Console data is usually complete about three days later.
const endDate = isoDaysAgo(3);

function credentialsPath() {
  const candidates = [process.env.GOOGLE_APPLICATION_CREDENTIALS, path.join(ROOT_DIR, 'google-credentials.json')];
  return candidates.find(candidate => candidate && fs.existsSync(candidate)) || null;
}

async function query(searchconsole, requestBody) {
  const rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const response = await searchconsole.searchanalytics.query({ siteUrl: SITE_URL, requestBody: { ...requestBody, rowLimit: 25000, startRow } });
    const page = response.data.rows || [];
    rows.push(...page);
    if (page.length < 25000) return rows;
  }
}

const pad = (value, width) => String(value).padEnd(width);
const num = (value, width) => String(Math.round(value)).padStart(width);

async function main() {
  const keyFile = credentialsPath();
  if (!keyFile) {
    console.error('Search Console 인증 파일이 없습니다. GOOGLE_APPLICATION_CREDENTIALS를 설정하거나 google-credentials.json을 프로젝트 루트에 두세요(Git에 올리지 않음).');
    process.exitCode = 1;
    return;
  }
  const auth = new google.auth.GoogleAuth({ keyFile, scopes: ['https://www.googleapis.com/auth/webmasters.readonly'] });
  const searchconsole = google.searchconsole({ version: 'v1', auth });
  const windowStart = isoDaysAgo(3 + days - 1);

  console.log(`Search Console 점검 (${SITE_URL}, 읽기 전용) — 기준일 ${endDate}`);

  // 1. Weekly totals
  const dateRows = await query(searchconsole, { startDate: isoDaysAgo(3 + weeks * 7 + 6), endDate, dimensions: ['date'] });
  console.log(`\n[1] 주별 클릭·노출 (월요일 시작, 최근 ${weeks}주)`);
  for (const week of summarizeWeeks(dateRows).slice(-weeks)) {
    console.log(`  ${week.week}  클릭 ${num(week.clicks, 5)}  노출 ${num(week.impressions, 6)}${week.days < 7 ? `  (${week.days}일치)` : ''}`);
  }

  // 2. Sitemap groups
  const pageRows = await query(searchconsole, { startDate: windowStart, endDate, dimensions: ['page'] });
  const totals = totalsByPath(pageRows);
  const sitemap = SITEMAPS.flatMap(file => sitemapPaths(fs.readFileSync(path.join(ROOT_DIR, file), 'utf8')));
  const sitemapSet = new Set(sitemap);
  const groups = groupCoverage(sitemap, totals);
  const withImpressions = groups.reduce((sum, group) => sum + group.withImpressions, 0);
  console.log(`\n[2] 사이트맵 그룹별 실적 (${windowStart} ~ ${endDate})`);
  console.log(`  사이트맵 URL ${sitemap.length}개 중 노출 있는 URL ${withImpressions}개`);
  console.log(`  ${pad('그룹', 18)} ${'URL'.padStart(5)} ${'노출URL'.padStart(7)} ${'노출'.padStart(7)} ${'클릭'.padStart(5)}`);
  for (const group of groups) {
    console.log(`  ${pad(group.group, 18)} ${num(group.urls, 5)} ${num(group.withImpressions, 7)} ${num(group.impressions, 7)} ${num(group.clicks, 5)}`);
  }

  // 3. D2: setting-intent queries, character page vs setting page
  const queryRows = await query(searchconsole, { startDate: windowStart, endDate, dimensions: ['page', 'query'] });
  console.log('\n[3] D2 세팅 검색어(세팅·종결·공략·빌드·추천) 노출 분포 — 상세가 줄고 가이드가 늘면 의도대로');
  const split = settingIntentSplit(queryRows);
  for (const game of ['hsr', 'ww', 'nte']) {
    const entry = split[game];
    if (!entry) { console.log(`  ${game}: 해당 검색어 데이터 없음`); continue; }
    console.log(`  ${game}: 상세 노출 ${entry.detail.impressions}·클릭 ${entry.detail.clicks} / 세팅 페이지 노출 ${entry.guide.impressions}·클릭 ${entry.guide.clicks}`);
  }
  console.log('  (검색량이 적은 검색어는 Google이 숨기므로 실제보다 적게 잡힌다)');

  // 4. D1: noindexed equipment still getting impressions
  const equipment = loadEquipmentRecommendations();
  const kinds = [[/^\/gallery\/hsr\/lightcone\/(.+)$/, 'lightcone'], [/^\/gallery\/hsr\/relic\/(.+)$/, 'relic'], [/^\/gallery\/hsr\/ornament\/(.+)$/, 'ornament'],
    [/^\/gallery\/ww\/weapon\/(.+)$/, 'weapon'], [/^\/gallery\/ww\/echo\/(.+)$/, 'echo'], [/^\/gallery\/nte\/weapon\/(.+)$/, 'arc']];
  const noindexedWithTraffic = [];
  for (const [pagePathValue, total] of totals) {
    if (sitemapSet.has(pagePathValue) || total.impressions === 0) continue;
    for (const [pattern, kind] of kinds) {
      const match = pagePathValue.match(pattern);
      if (match && !equipment.isIndexable(kind, match[1])) noindexedWithTraffic.push({ kind, name: match[1], ...total });
    }
  }
  console.log('\n[4] D1 noindex 장비 중 노출이 있는 페이지 — SEARCH_TRAFFIC_EXCEPTIONS 추가 후보');
  if (noindexedWithTraffic.length === 0) console.log('  없음');
  for (const item of noindexedWithTraffic.sort((a, b) => b.impressions - a.impressions)) {
    console.log(`  ${item.kind} ${item.name}: 노출 ${item.impressions}, 클릭 ${item.clicks}`);
  }

  // 5. Top pages outside the sitemap (redirects, noindex, old URLs)
  const outside = [...totals].filter(([pagePathValue, total]) => !sitemapSet.has(pagePathValue) && total.impressions > 0)
    .sort((a, b) => b[1].impressions - a[1].impressions).slice(0, 10);
  console.log('\n[5] 사이트맵 밖에서 노출된 상위 주소');
  if (outside.length === 0) console.log('  없음');
  for (const [pagePathValue, total] of outside) console.log(`  ${pageGroup(pagePathValue)} | ${pagePathValue}: 노출 ${total.impressions}, 클릭 ${total.clicks}`);

  // 6. URL Inspection (optional; counts against the daily inspection quota)
  if (inspect) {
    console.log('\n[6] 대표 URL 검사');
    for (const pagePathValue of INSPECT_PATHS) {
      const inspectionUrl = new URL(encodeURI(pagePathValue), SITE_URL).href;
      try {
        const result = (await searchconsole.urlInspection.index.inspect({ requestBody: { inspectionUrl, siteUrl: SITE_URL } })).data.inspectionResult?.indexStatusResult || {};
        console.log(`  ${pagePathValue}: ${result.coverageState || '-'} | 판정 ${result.verdict || '-'} | 마지막 크롤링 ${result.lastCrawlTime || '-'}${result.googleCanonical && result.googleCanonical !== inspectionUrl ? ` | Google canonical ${decodeURI(result.googleCanonical)}` : ''}`);
      } catch (error) {
        console.log(`  ${pagePathValue}: 검사 실패 (${error.message})`);
      }
    }
  } else {
    console.log('\n[6] 대표 URL 검사는 --inspect 옵션을 줄 때만 실행한다.');
  }
  console.log('\n색인됨·발견됨-미색인 수는 API로 제공되지 않으므로 Search Console 화면(페이지 색인 보고서)에서 확인한다.');
}

main().catch(error => {
  console.error(`Search Console 조회 실패: ${error.message}`);
  process.exitCode = 1;
});
