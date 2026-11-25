// GF2(소녀전선2: 망명) 인형 데이터를 Notion "소녀전선2 캐릭터 도감 DB"에서 읽어
// gf2-hub/data/dolls.json으로 저장한다. 읽기 전용이며 Notion을 수정하지 않는다.
// 실행: npm run sync:gf2  (빌드·sync:notion에는 포함하지 않는다)
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = path.join(ROOT_DIR, 'gf2-hub', 'data', 'dolls.json');
const DATA_SOURCE_ID = process.env.NOTION_GF2_DOLL_DATA_SOURCE_ID || '3f895fae-3dc7-80bf-b25a-000b5cae216d';

function loadEnv() {
  for (const envFile of ['.env', '.env.local']) {
    const envPath = path.join(ROOT_DIR, envFile);
    if (!fs.existsSync(envPath)) continue;
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const match = line.match(/^\s*([^=#\s]+)\s*=\s*(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

const text = prop => {
  if (!prop) return '';
  if (prop.type === 'title') return prop.title.map(t => t.plain_text).join('').trim();
  if (prop.type === 'rich_text') return prop.rich_text.map(t => t.plain_text).join('').trim();
  if (prop.type === 'select') return prop.select?.name || '';
  if (prop.type === 'number') return prop.number;
  return '';
};

// Notion 속성 이름 → JSON 키
const FIELDS = {
  name: '이름', releaseOrder: '출시 순서', rarity: '레어도', job: '직업', element: '속성', weakness: '약점',
  affiliation: '소속', weapon: '무기', model: '모델', names: '언어별 표기', voice: '성우', description: '설명',
  stats: '능력치', basicAttack: '일반 공격', active1: '액티브 1', active2: '액티브 2', ultimate: '결전기',
  passive: '패시브', mind: '마인드 보강', helix: '뉴럴 헬릭스', bondKey: '결합키', bondReward: '결합도 보상',
  core: '리몰딩 코어', gifts: '선호 선물', skins: '스킨', terms: '용어',
};

// 이미지 저장소(riragameinfo) 폴더 이름이 Notion 표기와 다른 인형
const IMAGE_FOLDER = { '사이엔': '샤이엔', '엘바': '앨바' };

async function main() {
  loadEnv();
  if (!process.env.NOTION_TOKEN) throw new Error('NOTION_TOKEN이 없습니다(.env).');
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const pages = [];
  let cursor;
  do {
    const res = await notion.dataSources.query({ data_source_id: DATA_SOURCE_ID, start_cursor: cursor, page_size: 100 });
    pages.push(...res.results);
    cursor = res.has_more ? res.next_cursor : undefined;
  } while (cursor);

  const dolls = pages.map(page => {
    const doll = { id: page.id };
    for (const [key, prop] of Object.entries(FIELDS)) doll[key] = text(page.properties[prop]);
    doll.imageFolder = IMAGE_FOLDER[doll.name] || doll.name;
    return doll;
  }).filter(doll => doll.name);

  const missingOrder = dolls.filter(doll => typeof doll.releaseOrder !== 'number').map(doll => doll.name);
  if (missingOrder.length) throw new Error(`출시 순서가 없는 인형: ${missingOrder.join(', ')}`);
  dolls.sort((a, b) => a.releaseOrder - b.releaseOrder);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(dolls, null, 2)}\n`, 'utf8');
  console.log(`[GF2] ${dolls.length}명 저장: ${path.relative(ROOT_DIR, OUT_FILE)}`);
  splitRuntimeData(dolls);
}

// 화면용 데이터: 목록·허브는 가벼운 요약만, 상세는 인형별 파일을 필요할 때 불러온다.
const SUMMARY_FIELDS = ['name', 'releaseOrder', 'rarity', 'job', 'element', 'weakness', 'weapon', 'affiliation', 'imageFolder'];
const RUNTIME_DIR = path.join(ROOT_DIR, 'gf2-hub', 'data', 'generated');

export function runtimeFileName(doll) {
  return `${String(doll.releaseOrder).padStart(3, '0')}.json`;
}

function splitRuntimeData(dolls) {
  fs.rmSync(path.join(RUNTIME_DIR, 'dolls'), { recursive: true, force: true });
  fs.mkdirSync(path.join(RUNTIME_DIR, 'dolls'), { recursive: true });
  const summary = dolls.map(doll => Object.fromEntries(SUMMARY_FIELDS.map(key => [key, doll[key]])));
  fs.writeFileSync(path.join(RUNTIME_DIR, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  for (const doll of dolls) {
    const { id, ...detail } = doll;
    fs.writeFileSync(path.join(RUNTIME_DIR, 'dolls', runtimeFileName(doll)), `${JSON.stringify(detail, null, 2)}\n`, 'utf8');
  }
  console.log(`[GF2] 화면용 데이터: summary.json + 인형별 ${dolls.length}개`);
}

if (process.argv.includes('--split-only')) {
  splitRuntimeData(JSON.parse(fs.readFileSync(OUT_FILE, 'utf8')));
} else main().catch(error => {
  console.error('[GF2] 실패:', error.message);
  process.exitCode = 1;
});
