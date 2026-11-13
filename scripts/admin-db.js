// Edit the admin DB (Supabase) the way /admin does: notices, tier lists and party recommendations.
// The DB is the only source for these three; repo files are build-time copies (see AGENTS.md).
//
//   node scripts/admin-db.js get <table> [--game <id>] [--out <file>]
//       Read rows (anon key). Prints JSON, or writes it to --out.
//   node scripts/admin-db.js apply <changes.json> [--apply]
//       Preview by default: shows field changes per row and backs up the rows it would touch to
//       .tmp/admin-db/. With --apply it writes with SUPABASE_SERVICE_ROLE_KEY and reads every row
//       back to confirm. changes.json:
//         { "table": "tier_lists", "upsert": [ { ...row } ], "delete": [ { ...key fields } ] }
//       Rows are matched by the table's key fields. An upsert of an existing row changes only the
//       fields it lists; a new row needs every required field.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT_DIR, '.tmp', 'admin-db');

export const TABLES = {
  notices: { key: ['id'], required: ['id', 'title', 'content', 'category', 'game_id'], order: 'created_at.desc' },
  tier_lists: { key: ['game_id', 'category_id', 'character_name'], required: ['game_id', 'category_id', 'character_name', 'tier'], order: 'game_id.asc,category_id.asc,display_order.asc' },
  party_recommendations: { key: ['game_id', 'party_id'], required: ['game_id', 'party_id', 'name', 'members'], order: 'game_id.asc,display_order.asc' },
};
const NOTICE_CATEGORIES = ['Update', 'Notice'];

function readEnv(name) {
  if (process.env[name]) return process.env[name];
  for (const file of ['.env', '.env.local']) {
    try {
      const line = fs.readFileSync(path.join(ROOT_DIR, file), 'utf8').split(/\r?\n/).find(l => l.startsWith(`${name}=`));
      if (line) return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, '');
    } catch { /* next file */ }
  }
  return '';
}

const keyOf = (spec, row) => spec.key.map(field => row[field]).join(' / ');
const keyFilter = (spec, row) => spec.key.map(field => `${field}=eq.${encodeURIComponent(row[field])}`).join('&');
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** Check a changes file and work out what it would do against the current rows. Pure, so it is testable. */
export function planChanges(changes, currentRows) {
  const spec = TABLES[changes?.table];
  if (!spec) throw new Error(`Unknown table "${changes?.table}". Use one of: ${Object.keys(TABLES).join(', ')}`);
  const upserts = changes.upsert || [];
  const deletes = changes.delete || [];
  if (!Array.isArray(upserts) || !Array.isArray(deletes)) throw new Error('"upsert" and "delete" must be arrays');
  if (!upserts.length && !deletes.length) throw new Error('Nothing to change: add rows to "upsert" or "delete"');

  const seen = new Set();
  const find = row => currentRows.find(current => spec.key.every(field => current[field] === row[field]));
  const plan = { spec, table: changes.table, inserts: [], updates: [], unchanged: [], deletes: [] };
  for (const row of [...upserts, ...deletes]) {
    const missing = spec.key.filter(field => row[field] === undefined || row[field] === null || row[field] === '');
    if (missing.length) throw new Error(`Row is missing key field(s) ${missing.join(', ')}: ${JSON.stringify(row).slice(0, 120)}`);
    const key = keyOf(spec, row);
    if (seen.has(key)) throw new Error(`"${key}" appears more than once`);
    seen.add(key);
  }
  for (const row of upserts) {
    if (changes.table === 'notices' && row.category !== undefined && !NOTICE_CATEGORIES.includes(row.category)) {
      throw new Error(`Notice category must be ${NOTICE_CATEGORIES.join(' or ')}: "${row.category}"`);
    }
    const current = find(row);
    if (!current) {
      const missing = spec.required.filter(field => row[field] === undefined || row[field] === null || row[field] === '');
      if (missing.length) throw new Error(`New row "${keyOf(spec, row)}" is missing ${missing.join(', ')}`);
      plan.inserts.push({ row });
      continue;
    }
    const fields = Object.keys(row).filter(field => !spec.key.includes(field) && field !== 'updated_at' && !same(row[field], current[field]));
    if (fields.length) plan.updates.push({ row, current, fields });
    else plan.unchanged.push({ row });
  }
  for (const row of deletes) {
    const current = find(row);
    if (!current) throw new Error(`Cannot delete "${keyOf(spec, row)}": no such row`);
    plan.deletes.push({ row, current });
  }
  return plan;
}

const short = value => {
  const text = typeof value === 'string' ? value : JSON.stringify(value);
  return text === undefined ? 'null' : text.length > 160 ? `${text.slice(0, 160)}…` : text;
};

function printPlan(plan) {
  const { spec } = plan;
  console.log(`[${plan.table}] insert ${plan.inserts.length}, update ${plan.updates.length}, delete ${plan.deletes.length}, unchanged ${plan.unchanged.length}`);
  plan.inserts.forEach(({ row }) => console.log(`  + ${keyOf(spec, row)}`));
  plan.updates.forEach(({ row, current, fields }) => {
    console.log(`  ~ ${keyOf(spec, row)}`);
    fields.forEach(field => console.log(`      ${field}: ${short(current[field])}\n        -> ${short(row[field])}`));
  });
  plan.deletes.forEach(({ row }) => console.log(`  - ${keyOf(spec, row)}`));
}

async function main() {
  const [command, target, ...rest] = process.argv.slice(2);
  const flag = name => { const index = rest.indexOf(name); return index >= 0 ? rest[index + 1] : undefined; };
  const url = readEnv('VITE_SUPABASE_URL');
  const anonKey = readEnv('VITE_SUPABASE_ANON_KEY');
  if (!url || !anonKey) throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
  const request = async (resource, key, init = {}) => {
    const response = await fetch(`${url}/rest/v1/${resource}`, {
      ...init,
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...init.headers },
      signal: AbortSignal.timeout(20000),
    });
    const text = await response.text();
    if (!response.ok) throw new Error(`HTTP ${response.status} ${text.slice(0, 300)}`);
    return text ? JSON.parse(text) : null;
  };
  const readTable = (table, key = anonKey) => request(`${table}?select=*&order=${TABLES[table].order}`, key);

  if (command === 'get') {
    if (!TABLES[target]) throw new Error(`Usage: get <${Object.keys(TABLES).join('|')}> [--game <id>] [--out <file>]`);
    const game = flag('--game');
    const rows = (await readTable(target)).filter(row => !game || row.game_id === game);
    const json = `${JSON.stringify(rows, null, 2)}\n`;
    const out = flag('--out');
    if (out) { fs.writeFileSync(out, json); console.log(`${rows.length} ${target} rows -> ${out}`); } else process.stdout.write(json);
    return;
  }

  if (command !== 'apply' || !target) {
    console.log('Usage:\n  node scripts/admin-db.js get <table> [--game <id>] [--out <file>]\n  node scripts/admin-db.js apply <changes.json> [--apply]');
    process.exit(command ? 1 : 0);
  }

  const changes = JSON.parse(fs.readFileSync(target, 'utf8'));
  const current = await readTable(changes.table);
  const plan = planChanges(changes, current);
  printPlan(plan);

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const touched = [...plan.updates, ...plan.deletes].map(item => item.current);
  const backup = path.join(OUT_DIR, `backup-${changes.table}-${stamp}.json`);
  fs.writeFileSync(backup, `${JSON.stringify({ table: changes.table, rows: touched }, null, 2)}\n`);
  console.log(`Backup of ${touched.length} row(s) that would change: ${path.relative(ROOT_DIR, backup)}`);

  if (!process.argv.includes('--apply')) { console.log('Preview only. Nothing was written. Add --apply to write.'); return; }
  if (!plan.inserts.length && !plan.updates.length && !plan.deletes.length) { console.log('Nothing to write.'); return; }
  const serviceKey = readEnv('SUPABASE_SERVICE_ROLE_KEY');
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set in .env');

  const now = new Date().toISOString();
  const { spec } = plan;
  for (const { row } of plan.inserts) {
    const insert = { ...row };
    if (changes.table === 'party_recommendations' && insert.display_order === undefined) {
      insert.display_order = current.filter(other => other.game_id === row.game_id)
        .reduce((max, other) => Math.max(max, other.display_order || 0), 0) + 1;
    }
    // A new notice has no "updated" date, like the admin form.
    if (insert.updated_at === undefined) insert.updated_at = changes.table === 'notices' ? null : now;
    await request(changes.table, serviceKey, { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(insert) });
  }
  for (const { row, fields } of plan.updates) {
    const patch = Object.fromEntries(fields.map(field => [field, row[field]]));
    patch.updated_at = row.updated_at ?? now;
    await request(`${changes.table}?${keyFilter(spec, row)}`, serviceKey, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(patch) });
  }
  for (const { row } of plan.deletes) {
    await request(`${changes.table}?${keyFilter(spec, row)}`, serviceKey, { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
  }

  const after = await readTable(changes.table);
  const problems = [];
  for (const { row } of [...plan.inserts, ...plan.updates]) {
    const saved = after.find(other => spec.key.every(field => other[field] === row[field]));
    if (!saved) { problems.push(`${keyOf(spec, row)} is missing`); continue; }
    Object.keys(row).filter(field => field !== 'updated_at' && !same(row[field], saved[field]))
      .forEach(field => problems.push(`${keyOf(spec, row)}.${field} did not save`));
  }
  for (const { row } of plan.deletes) {
    if (after.some(other => spec.key.every(field => other[field] === row[field]))) problems.push(`${keyOf(spec, row)} still exists`);
  }
  if (problems.length) throw new Error(`Read-back check failed:\n  ${problems.join('\n  ')}\nBackup: ${path.relative(ROOT_DIR, backup)}`);
  console.log(`Written and read back: ${plan.inserts.length} inserted, ${plan.updates.length} updated, ${plan.deletes.length} deleted.`);
  console.log('Next: npm run generate:content-snapshots (tiers/parties) or npm run generate:notices (notices), then commit the regenerated files.');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(error => { console.error(error.message); process.exit(1); });
}
