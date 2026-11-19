// Keep the previous deploys' hashed JS and CSS available for a while.
//
// Cloudflare Pages serves only the files of the current deploy. Google fetches a
// page's HTML first and renders it later, sometimes after another deploy; a
// browser tab opened before a deploy is in the same position. The old chunk
// names then 404 and the page renders the error screen, which Search Console
// reported as soft 404 on normal content pages (2026-11-07).
//
// On a production Pages build this script downloads the hashed files listed in
// the live site's manifest (or, the first time, found by following the live
// home page's chunk references) into dist/assets, and writes a new manifest.
// A file is kept for RETAIN_DAYS after it was last part of a live deploy.
//
// Runs as the last build step so the bundle audits only see the current build.
// Old chunks also fetch the hashed data JSON they were built with (guides,
// character and light cone details, articles). Those names change whenever the
// data does, so the data files that the kept chunks reference are kept with
// them; a missing one showed the "could not load" screen (Soft 404, 2026-11-19).
//
// Elsewhere it only writes the manifest. RETAIN_ASSETS=1 forces a download run
// (RETAIN_ASSETS_ORIGIN picks the site, default https://riragamehub.com).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MANIFEST_NAME = 'retained-assets.json';
export const RETAIN_DAYS = 7;
// 4000 filled up in about 6 days of deploys (2026-11-19); Pages allows 20,000 files.
export const MAX_RETAINED_FILES = 8000;
export const MAX_RETAINED_DATA_FILES = 3000;
// Stop downloading after this long so a slow network cannot stall the deploy.
export const TIME_BUDGET_MS = 180000;
const NAME = /^[A-Za-z0-9_-]+\.(?:js|css)$/;
const REFERENCE = /(?:\/assets\/|\.\/)([A-Za-z0-9_-]+\.(?:js|css))\b/g;
// Content-hashed data files only: "<name>.<12 hex>.json" or "<16 hex>.json". Stable
// names (Aniimo entries, WW character ids) are rewritten in place and need no copy.
const DATA_PATH = /^data\/(?:[a-z]+\/)+(?:[A-Za-z0-9_-]+\.[0-9a-f]{12}|[0-9a-f]{16})\.json$/;
const DATA_REFERENCE = /\/assets\/(data\/(?:[a-z]+\/)+(?:[A-Za-z0-9_-]+\.[0-9a-f]{12}|[0-9a-f]{16})\.json)/g;
const DAY_MS = 86400000;

export const isAssetName = name => typeof name === 'string' && NAME.test(name);
export const isDataPath = name => typeof name === 'string' && DATA_PATH.test(name);

/**
 * Files to keep from the previous deploy. Files that were live in it count as
 * last seen now; files it already retained keep their date.
 * Returns [name, lastLiveIso] pairs, newest first.
 */
export function selectRetained(previous, currentNames, nowIso, { days = RETAIN_DAYS, max = MAX_RETAINED_FILES } = {}) {
  const current = new Set(currentNames);
  const cutoff = Date.parse(nowIso) - days * DAY_MS;
  const candidates = new Map();
  for (const name of previous?.current || []) {
    if (isAssetName(name) && !current.has(name)) candidates.set(name, nowIso);
  }
  for (const [name, lastLive] of Object.entries(previous?.retained || {})) {
    if (!isAssetName(name) || current.has(name) || candidates.has(name)) continue;
    const time = Date.parse(lastLive);
    if (Number.isFinite(time) && time >= cutoff) candidates.set(name, new Date(time).toISOString());
  }
  return [...candidates].sort((a, b) => b[1].localeCompare(a[1]) || a[0].localeCompare(b[0])).slice(0, max);
}

/** Hashed asset names referenced from HTML, JS or CSS text. */
export function findAssetReferences(text) {
  return [...new Set([...text.matchAll(REFERENCE)].map(match => match[1]))];
}

/** Hashed data JSON paths (relative to /assets/) referenced from JS text. */
export function findDataReferences(text) {
  return [...new Set([...text.matchAll(DATA_REFERENCE)].map(match => match[1]))];
}

const expectedType = name => (name.endsWith('.css') ? 'text/css' : name.endsWith('.json') ? 'json' : 'javascript');

async function fetchWithTimeout(url, ms = 20000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, headers: { 'user-agent': 'rira-build-asset-retention' } });
  } finally {
    clearTimeout(timer);
  }
}

async function fetchAsset(origin, name, deadline = Infinity) {
  if (Date.now() > deadline) return null;
  const response = await fetchWithTimeout(`${origin}/assets/${name}`);
  if (response.status !== 200 || !(response.headers.get('content-type') || '').includes(expectedType(name))) return null;
  return Buffer.from(await response.arrayBuffer());
}

/** Copies the data files the kept chunks fetch and that this build no longer has. */
async function retainReferencedData(origin, assetsDir, bodies, deadline) {
  const wanted = new Set();
  for (const body of bodies) {
    for (const reference of findDataReferences(body.toString('utf8'))) {
      if (isDataPath(reference) && !fs.existsSync(path.join(assetsDir, reference))) wanted.add(reference);
    }
  }
  const kept = [];
  await mapLimit([...wanted].sort().slice(0, MAX_RETAINED_DATA_FILES), 8, async name => {
    const body = await fetchAsset(origin, name, deadline).catch(() => null);
    if (!body) return;
    const target = path.join(assetsDir, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, body);
    kept.push(name);
  });
  return kept.sort();
}

async function loadPreviousManifest(origin) {
  const response = await fetchWithTimeout(`${origin}/assets/${MANIFEST_NAME}`);
  if (response.status !== 200 || !(response.headers.get('content-type') || '').includes('json')) return null;
  const manifest = await response.json();
  return manifest && Array.isArray(manifest.current) ? manifest : null;
}

/** First run: the live home page's chunks and everything they import. */
async function crawlLiveAssets(origin, deadline, limit = MAX_RETAINED_FILES) {
  const html = await (await fetchWithTimeout(`${origin}/`)).text();
  let level = findAssetReferences(html);
  const seen = new Set(level);
  const files = new Map();
  while (level.length && files.size < limit) {
    const next = [];
    await mapLimit(level.slice(0, limit - files.size), 16, async name => {
      const body = await fetchAsset(origin, name, deadline).catch(() => null);
      if (!body) return;
      files.set(name, body);
      for (const reference of findAssetReferences(body.toString('utf8'))) {
        if (!seen.has(reference)) { seen.add(reference); next.push(reference); }
      }
    });
    level = next;
  }
  return files;
}

async function mapLimit(items, limit, fn) {
  const results = [];
  let index = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (index < items.length) {
      const item = items[index++];
      results.push(await fn(item));
    }
  });
  await Promise.all(workers);
  return results;
}

export async function retainPreviousAssets({ assetsDir, origin, download, now = new Date().toISOString(), log = console.log, timeBudgetMs = TIME_BUDGET_MS }) {
  const deadline = Date.now() + timeBudgetMs;
  const currentNames = fs.readdirSync(assetsDir).filter(name => isAssetName(name) && fs.statSync(path.join(assetsDir, name)).isFile()).sort();
  const retained = {};
  let data = [];

  if (download) {
    try {
      const previous = await loadPreviousManifest(origin).catch(() => null);
      let downloaded = 0;
      if (previous) {
        const wanted = selectRetained(previous, currentNames, now);
        const bodies = [];
        const results = await mapLimit(wanted, 8, async ([name, lastLive]) => {
          const body = await fetchAsset(origin, name, deadline).catch(() => null);
          if (!body) return false;
          fs.writeFileSync(path.join(assetsDir, name), body);
          retained[name] = lastLive;
          if (name.endsWith('.js')) bodies.push(body);
          return true;
        });
        downloaded = results.filter(Boolean).length;
        data = await retainReferencedData(origin, assetsDir, bodies, deadline);
        log(`[retain-assets] previous manifest: ${wanted.length} candidates, ${downloaded} kept, ${data.length} data files kept`);
      } else {
        const current = new Set(currentNames);
        const live = await crawlLiveAssets(origin, deadline);
        const bodies = [];
        for (const [name, body] of live) {
          if (current.has(name)) continue;
          fs.writeFileSync(path.join(assetsDir, name), body);
          retained[name] = now;
          downloaded += 1;
          if (name.endsWith('.js')) bodies.push(body);
        }
        data = await retainReferencedData(origin, assetsDir, bodies, deadline);
        log(`[retain-assets] no previous manifest; kept ${downloaded} files and ${data.length} data files from the live site`);
      }
    } catch (error) {
      log(`[retain-assets] warning: previous assets were not kept (${error.message})`);
    }
  } else {
    log('[retain-assets] not a production Pages build; writing the manifest only');
  }

  const manifest = { version: 1, generatedAt: now, current: currentNames, retained, data };
  fs.writeFileSync(path.join(assetsDir, MANIFEST_NAME), `${JSON.stringify(manifest)}\n`);
  return manifest;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const download = process.env.RETAIN_ASSETS === '1' ||
    (process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH === 'main');
  await retainPreviousAssets({
    assetsDir: path.join(root, 'dist', 'assets'),
    origin: (process.env.RETAIN_ASSETS_ORIGIN || 'https://riragamehub.com').replace(/\/+$/, ''),
    download,
  });
}
