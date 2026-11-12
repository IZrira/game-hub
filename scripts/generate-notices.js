// Snapshot the public notices from Supabase so the sitemap, edge routes and prerendered
// pages know every notice posted from /admin. Read-only (anon key, the same public read
// the site does). If the fetch fails the previous snapshot is kept, so an offline build
// still knows the notices from the last successful run.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NOTICE_SNAPSHOT_RELATIVE, noticeFromRow } from './lib/notices.js';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT_FILE = path.join(ROOT_DIR, NOTICE_SNAPSHOT_RELATIVE);

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  try {
    const line = fs.readFileSync(path.join(ROOT_DIR, '.env'), 'utf8').split(/\r?\n/).find(l => l.startsWith(`${name}=`));
    return line ? line.slice(name.length + 1).trim().replace(/^["']|["']$/g, '') : '';
  } catch {
    return '';
  }
}

async function main() {
  const url = readEnv('VITE_SUPABASE_URL');
  const key = readEnv('VITE_SUPABASE_ANON_KEY');
  if (!url || !key) {
    console.warn('[Notices] Supabase URL or anon key is not set; keeping the existing notice snapshot.');
    return;
  }
  try {
    const response = await fetch(`${url}/rest/v1/notices?select=id,category,title,content,version,game_id,created_at,updated_at&order=created_at.desc`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows = await response.json();
    if (!Array.isArray(rows) || rows.length === 0) throw new Error('no rows returned');
    const notices = rows.filter(row => row?.id && row?.title).map(noticeFromRow);
    fs.mkdirSync(path.dirname(SNAPSHOT_FILE), { recursive: true });
    fs.writeFileSync(SNAPSHOT_FILE, `${JSON.stringify(notices, null, 2)}\n`, 'utf8');
    console.log(`[Notices] Snapshot of ${notices.length} notices written.`);
  } catch (error) {
    console.warn(`[Notices] Could not fetch notices (${error.message}); keeping the existing snapshot.`);
  }
}

main();
