import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([^#][^=]*)=(.*)$/);
    if (!match) continue;
    const key = match[1].trim();
    if (process.env[key]) continue;
    process.env[key] = match[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
}

loadEnvFile(path.join(process.cwd(), '.env'));
loadEnvFile(path.join(process.cwd(), '.env.local'));

const baseUrl = (process.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const anonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
if (!baseUrl || !anonKey) {
  console.error('FAIL: VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY가 없습니다.');
  process.exit(1);
}

const outputFile = path.join(os.tmpdir(), `rira-supabase-${process.pid}.json`);
const endpoint = `${baseUrl}/rest/v1/party_recommendations?select=game_id,party_id,name,description,category,element_synergy,main_dps,tags,pros,cons,members,display_order,updated_at&game_id=eq.aniimo&limit=1`;

try {
  const status = execFileSync('curl.exe', [
    '--silent', '--show-error', '--output', outputFile, '--write-out', '%{http_code}',
    endpoint,
    '--header', `apikey: ${anonKey}`,
    '--header', `Authorization: Bearer ${anonKey}`,
  ], { encoding: 'utf8', windowsHide: true }).trim();

  const body = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : '';
  if (status !== '200') {
    let message = body;
    try { message = JSON.parse(body).message || body; } catch {}
    console.error(`FAIL: Supabase REST HTTP ${status} - ${message}`);
    process.exit(1);
  }

  const rows = JSON.parse(body);
  if (!Array.isArray(rows)) throw new Error('응답이 JSON 배열이 아닙니다.');
  console.log(`PASS: Supabase party_recommendations 공개 읽기 정상 (aniimo rows: ${rows.length})`);
} catch (error) {
  if (error.status) console.error(`FAIL: curl 실행 실패 (${error.status})`);
  else console.error(`FAIL: ${error.message}`);
  process.exit(1);
} finally {
  if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
}
