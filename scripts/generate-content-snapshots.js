// Snapshot the tier lists and party recommendations from Supabase, the single source of
// truth edited in /admin. The site's first paint, character pages and prerendered HTML
// read these files, so they match what the live pages show after loading the DB.
// Read-only (anon key). A game with no rows, or a failed fetch, keeps its previous file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { partyFromRow, tierGroupsFromRows } from './lib/content-snapshots.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TIER_GAMES = ['hsr', 'ww'];
const PARTY_GAMES = ['hsr'];

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const line = fs.readFileSync(path.join(ROOT_DIR, '.env'), 'utf8').split(/\r?\n/).find(l => l.startsWith(`${name}=`));
    return line ? line.slice(name.length + 1).trim().replace(/^["']|["']$/g, '') : '';
  } catch {
    return '';
  }
}

function writeJson(relative, value) {
  const file = path.join(ROOT_DIR, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

async function main() {
  const url = readEnv('VITE_SUPABASE_URL');
  const key = readEnv('VITE_SUPABASE_ANON_KEY');
  if (!url || !key) {
    console.warn('[Snapshots] Supabase URL or anon key is not set; keeping the existing tier and party snapshots.');
    return;
  }
  const query = async resource => {
    const response = await fetch(`${url}/rest/v1/${resource}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error('unexpected response');
    return rows;
  };

  try {
    const tiers = await query('tier_lists?select=game_id,category_id,character_name,tier,role,change,display_order');
    for (const game of TIER_GAMES) {
      const rows = tiers.filter(row => row.game_id === game);
      if (!rows.length) { console.warn(`[Snapshots] No ${game} tier rows; keeping the existing snapshot.`); continue; }
      writeJson(`${game}-hub/data/generated/tiers.json`, tierGroupsFromRows(rows));
      console.log(`[Snapshots] ${game} tiers: ${rows.length} rows.`);
    }
  } catch (error) {
    console.warn(`[Snapshots] Could not fetch tier lists (${error.message}); keeping the existing snapshots.`);
  }

  try {
    const parties = await query('party_recommendations?select=*&order=display_order.asc');
    for (const game of PARTY_GAMES) {
      const rows = parties.filter(row => row.game_id === game);
      if (!rows.length) { console.warn(`[Snapshots] No ${game} party rows; keeping the existing snapshot.`); continue; }
      writeJson(`${game}-hub/data/generated/parties.json`, rows.map(partyFromRow));
      console.log(`[Snapshots] ${game} parties: ${rows.length} rows.`);
    }
  } catch (error) {
    console.warn(`[Snapshots] Could not fetch party recommendations (${error.message}); keeping the existing snapshots.`);
  }
}

main();
