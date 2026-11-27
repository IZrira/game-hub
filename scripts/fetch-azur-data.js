// 아주르 프로밀리아 캐릭터 데이터를 Notion "아주르 캐릭터 DB"에서 읽어
// azur-hub/data/characters.json으로 저장한다. 읽기 전용이며 Notion을 수정하지 않는다.
// 실행: npm run sync:azur  (빌드·sync:notion에는 포함하지 않는다)
import { Client } from '@notionhq/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_FILE = path.join(ROOT_DIR, 'azur-hub', 'data', 'characters.json');
const DATA_SOURCE_ID = process.env.NOTION_AZUR_CHARACTER_DATA_SOURCE_ID || '41f95fae-3dc7-81dc-86fa-000bed688828';

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

const value = prop => {
  if (!prop) return '';
  if (prop.type === 'title') return prop.title.map(t => t.plain_text).join('').trim();
  if (prop.type === 'rich_text') return prop.rich_text.map(t => t.plain_text).join('').trim();
  if (prop.type === 'select') return prop.select?.name || '';
  if (prop.type === 'multi_select') return prop.multi_select.map(option => option.name);
  if (prop.type === 'number') return prop.number;
  return '';
};

// Notion 속성 이름 → JSON 키. 「자료 기준」은 내부 메모라 화면 데이터에 넣지 않는다.
const FIELDS = {
  name: '이름', releaseOrder: '출시 순서', rarity: '등급', elements: '속성', job: '직업', positions: '전투 포지션',
  weapon: '무기', race: '종족', affiliation: '소속', birthday: '생일', releaseVersion: '출시 버전',
  names: '언어별 표기', voice: '성우', description: '캐릭터 간단 정보',
  basicAttack: '기본 공격', skill: '성명기', ultimate: '성결기', switchSkill: '성휴기', passive: '성사',
};

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

  const characters = pages.map(page => {
    const character = {};
    for (const [key, prop] of Object.entries(FIELDS)) character[key] = value(page.properties[prop]);
    if (!Array.isArray(character.elements)) character.elements = character.elements ? [character.elements] : [];
    return character;
  }).filter(character => character.name);

  const missingOrder = characters.filter(c => typeof c.releaseOrder !== 'number').map(c => c.name);
  if (missingOrder.length) throw new Error(`출시 순서가 없는 캐릭터: ${missingOrder.join(', ')}`);
  characters.sort((a, b) => a.releaseOrder - b.releaseOrder);

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
  fs.writeFileSync(OUT_FILE, `${JSON.stringify(characters, null, 2)}\n`, 'utf8');
  console.log(`[Azur] ${characters.length}명 저장: ${path.relative(ROOT_DIR, OUT_FILE)}`);
}

main().catch(error => {
  console.error(`[Azur] 실패: ${error.code || ''} ${error.message}`);
  process.exitCode = 1;
});
