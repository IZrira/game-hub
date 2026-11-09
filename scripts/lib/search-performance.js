// Pure helpers for scripts/check-search-performance.js (search recovery R4).
// No network or file access here so they can be unit tested.

export const SITE_URL = 'https://riragamehub.com/';
const ORIGIN = 'https://riragamehub.com';

/** Decoded pathname without query or hash, or null for other hosts. */
export function pagePath(url) {
  try {
    const parsed = new URL(url);
    if (parsed.origin !== ORIGIN) return null;
    return decodeURIComponent(parsed.pathname).normalize('NFC');
  } catch {
    return null;
  }
}

/** Monday (UTC) of the week that contains an ISO date (YYYY-MM-DD). */
export function weekStart(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const offset = (date.getUTCDay() + 6) % 7;
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
}

/** Search Analytics rows with dimensions ['date'] -> weekly totals, oldest first. */
export function summarizeWeeks(rows) {
  const weeks = new Map();
  for (const row of rows) {
    const week = weekStart(row.keys[0]);
    const total = weeks.get(week) || { week, days: 0, clicks: 0, impressions: 0 };
    total.days += 1;
    total.clicks += row.clicks;
    total.impressions += row.impressions;
    weeks.set(week, total);
  }
  return [...weeks.values()].sort((a, b) => a.week.localeCompare(b.week));
}

/** Page group used in the recovery plan, e.g. "hsr 캐릭터 가이드", "nte 공략". */
export function pageGroup(path) {
  if (!path) return '기타';
  const parts = path.split('/').filter(Boolean);
  if (parts[0] !== 'gallery') return parts[0] ? `기타 /${parts[0]}` : '홈';
  const [, game, section, , sub] = parts;
  if (!section) return `${game} 허브`;
  if (section === 'character') return sub === 'guide' ? `${game} 캐릭터 가이드` : `${game} 캐릭터 상세`;
  if (section === 'guides') return parts[3] ? `${game} 공략` : `${game} 공략 목록`;
  const labels = {
    lightcone: '광추', relic: '유물', ornament: '장신구', weapon: game === 'nte' ? '아크' : '무기', echo: '에코',
    location: '서식지', locations: '서식지 목록', characters: '도감 목록', parties: '파티', tierlist: '티어표',
  };
  return `${game} ${labels[section] || section}`;
}

/** Sum page rows ({ keys: [url] }) by decoded path. */
export function totalsByPath(rows) {
  const totals = new Map();
  for (const row of rows) {
    const path = pagePath(row.keys[0]);
    if (!path) continue;
    const total = totals.get(path) || { clicks: 0, impressions: 0 };
    total.clicks += row.clicks;
    total.impressions += row.impressions;
    totals.set(path, total);
  }
  return totals;
}

/** Per group: sitemap URLs, URLs with impressions, impressions and clicks. */
export function groupCoverage(sitemapPaths, totals) {
  const groups = new Map();
  for (const path of sitemapPaths) {
    const group = pageGroup(path);
    const entry = groups.get(group) || { group, urls: 0, withImpressions: 0, impressions: 0, clicks: 0 };
    const total = totals.get(path);
    entry.urls += 1;
    if (total?.impressions > 0) entry.withImpressions += 1;
    entry.impressions += total?.impressions || 0;
    entry.clicks += total?.clicks || 0;
    groups.set(group, entry);
  }
  return [...groups.values()].sort((a, b) => b.urls - a.urls);
}

export const SETTING_QUERY = /세팅|종결|공략|빌드|추천/;

/**
 * Decision D2 check: impressions and clicks for setting-intent queries on
 * character pages versus setting pages. Rows have dimensions ['page', 'query'].
 */
export function settingIntentSplit(rows) {
  const split = {};
  for (const row of rows) {
    const path = pagePath(row.keys[0]);
    if (!path || !SETTING_QUERY.test(row.keys[1])) continue;
    let kind = null;
    let game = null;
    const character = path.match(/^\/gallery\/(hsr|ww|nte)\/character\/[^/]+(\/guide)?$/);
    if (character) { game = character[1]; kind = character[2] ? 'guide' : 'detail'; }
    else if (/^\/gallery\/nte\/guides\/[^/]+-build-guide$/.test(path)) { game = 'nte'; kind = 'guide'; }
    if (!kind) continue;
    const entry = (split[game] ||= { detail: { clicks: 0, impressions: 0 }, guide: { clicks: 0, impressions: 0 } });
    entry[kind].clicks += row.clicks;
    entry[kind].impressions += row.impressions;
  }
  return split;
}

/** <loc> paths of one sitemap XML string. */
export function sitemapPaths(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => pagePath(match[1])).filter(Boolean);
}
