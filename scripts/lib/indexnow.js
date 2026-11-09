// IndexNow submission for scripts/generate-sitemap.js.
// Submit only from the production Pages build, and only URLs that are new or
// whose lastmod changed compared with the live sitemaps. Submitting every URL
// on every build (and again from CI) goes against IndexNow's guidance.

export const INDEXNOW_KEY = 'b6be7d1e8c7c4b2ca559a4bc5ef4d89a';

export function shouldSubmitIndexNow(env = process.env) {
  return env.INDEXNOW_FORCE === 'true' || (env.CF_PAGES === '1' && env.CF_PAGES_BRANCH === 'main');
}

/** <loc> -> <lastmod> (or null) for one sitemap XML string. */
export function parseSitemapEntries(xml) {
  const entries = new Map();
  for (const match of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = match[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    entries.set(loc.replace(/&amp;/g, '&'), match[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() || null);
  }
  return entries;
}

/** URLs that are not in the live sitemaps or whose lastmod differs. */
export function changedUrls(entries, live) {
  return entries
    .filter(({ url, lastmod }) => !live.has(url) || (live.get(url) || null) !== (lastmod || null))
    .map(({ url }) => url);
}

/** Live sitemap entries, or null if any sitemap could not be read. */
export async function fetchLiveSitemapEntries(baseUrl, names, fetchImpl = fetch) {
  const live = new Map();
  for (const name of names) {
    try {
      const response = await fetchImpl(`${baseUrl}/${name}`);
      const type = response.headers.get('content-type') || '';
      if (response.status !== 200 || !type.includes('xml')) return null;
      for (const [url, lastmod] of parseSitemapEntries(await response.text())) live.set(url, lastmod);
    } catch {
      return null;
    }
  }
  return live;
}

export async function submitChangedUrlsToIndexNow({ baseUrl, sitemaps, env = process.env, fetchImpl = fetch, log = console.log }) {
  if (!shouldSubmitIndexNow(env)) {
    log('Skipping IndexNow submission: only the production Pages build submits (INDEXNOW_FORCE=true to force).');
    return [];
  }
  const live = await fetchLiveSitemapEntries(baseUrl, sitemaps.map(s => s.name), fetchImpl);
  if (!live) {
    log('Skipping IndexNow submission: the live sitemaps could not be read. Changes are submitted with the next deploy.');
    return [];
  }
  const urls = changedUrls(sitemaps.flatMap(s => s.entries), live);
  if (urls.length === 0) {
    log('IndexNow: no new or changed URLs.');
    return [];
  }
  const host = new URL(baseUrl).host;
  try {
    const response = await fetchImpl('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host, key: INDEXNOW_KEY, keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`, urlList: urls }),
    });
    log(response.ok
      ? `IndexNow: submitted ${urls.length} new or changed URLs.`
      : `IndexNow submission returned status ${response.status}.`);
  } catch (error) {
    log(`IndexNow submission failed: ${error.message}`);
  }
  return urls;
}
