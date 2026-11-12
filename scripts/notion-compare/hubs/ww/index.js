// Wuthering Waves hub.
//
// WW data flows Notion → common-hub/data/notion-data.json (sync) → merged with ww-hub files at
// runtime (common-hub/data/dataManager.ts). Notion wins for most fields, local files win for a few
// (profile text of full local character files) and fill gaps where Notion is empty. So three
// questions are checked:
//   1. 동기화 대기: Notion now differs from the last synced snapshot (notion-data.json).
//   2. 사이트가 로컬 값 표시: the site shows a local value although Notion has a different one.
//   3. 로컬 파일만 다름: a local file disagrees with Notion but the site already shows Notion's value.
// Entities that exist only locally are summarised once per DB.
import fs from 'node:fs';
import path from 'node:path';
import { fetchFromDB, fetchWwGuidesFromDB } from '../../../fetch-notion-data.js';
import { withViteModules } from '../../lib/vite-data.js';
import { reportSyncPending, PENDING_GROUP } from '../../lib/sync-pending.js';
import { norm, textKind, KIND } from '../../lib/text.js';

export const WW_DATABASES = {
  weapons: { env: 'NOTION_DATABASE_ID', label: '무기', snapshot: x => x.dbSource === 'weapons' },
  characters: { env: 'NOTION_WW_CHARACTER_DB_ID', label: '캐릭터', snapshot: x => !x.dbSource, isCharacter: true },
  items: { env: 'NOTION_WW_ITEM_DB_ID', label: '아이템', snapshot: x => x.dbSource === 'ww_items' },
  echoes: { env: 'NOTION_WW_ECHOES_DB_ID', label: '에코', snapshot: x => x.dbSource === 'ww_echoes' },
  guides: { env: 'NOTION_WW_GUIDES_DB_ID', label: '공략', snapshot: x => x.dbSource === 'ww_guides', fallback: '37495fae3dc780ce95fffd47cfb611f6' },
};

const GROUP = { pending: PENDING_GROUP, localShown: '사이트가 로컬 값 표시', localFile: '로컬 파일만 다름', missing: '누락' };
const CHARACTER_FIELDS = { name: '이름', attribute: '속성', weaponType: '무기 종류', rarity: '희귀도', releaseVersion: '출시 버전', unlockCondition: '개방 조건', affiliation: '소속', briefInfo: '간단 정보', voiceActors: '성우', roles: '역할' };
const LOCAL_FILE_FIELDS = {
  characters: { attribute: '속성', weaponType: '무기 종류', rarity: '희귀도', releaseVersion: '출시 버전', unlockCondition: '개방 조건' },
  weapons: { type: '무기 종류', rarity: '희귀도', releaseVersion: '출시 버전' },
};
const key = x => String(x?.folderName || x?.name || '').trim();
const empty = v => v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length) || (typeof v === 'object' && !Array.isArray(v) && !Object.keys(v).length);
const show = v => (typeof v === 'string' ? v : JSON.stringify(v));
const stripFlags = s => String(s).replace(/[\u{1F1E6}-\u{1F1FF}]/gu, '').replace(/\s+/g, ' ').trim();

function loadLocale(root) {
  const dir = path.join(root, 'common-hub', 'locales', 'ww');
  const files = [];
  const walk = d => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (f.name.endsWith('_ko.json')) files.push(p); } };
  if (fs.existsSync(dir)) walk(dir);
  return Object.assign({}, ...files.map(f => JSON.parse(fs.readFileSync(f, 'utf8'))));
}

/** Site value as a reader sees it: translation keys resolved, flag emoji and spacing ignored. */
function readable(value, locale) {
  if (typeof value === 'string' && /^(character|weapon|echo)\./.test(value)) return locale[value] ?? value;
  return value;
}
// Line breaks and spacing are layout, not content.
const comparable = v => (typeof v === 'string' ? norm(stripFlags(v)).replace(/\s+/g, ' ') : JSON.stringify(v));
const versionLike = v => /^\d+(\.\d+)?$/.test(String(v ?? '').trim());
const valueHint = (field, notionValue, fallback) => (field === 'releaseVersion' && !versionLike(notionValue) ? 'Notion 값 형식 이상 (출시 버전 칸에 다른 내용)' : fallback);

async function loadViews(root) {
  const pick = d => ({ characters: d.CHARACTER_DB, weapons: d.WEAPON_DB, echoes: d.ECHO_DB });
  const full = await withViteModules(root, async load => {
    const { getGameData } = await load('/common-hub/data/dataManager.ts');
    const { WW_DATA_ALL } = await load('/ww-hub/data/index.ts');
    return { site: pick(getGameData('ww')), local: { characters: WW_DATA_ALL.CHARACTER_DB, weapons: WW_DATA_ALL.WEAPON_DATA, echoes: WW_DATA_ALL.ECHO_DATA } };
  });
  // Same merge with the local WW lists emptied: what the site would show from Notion alone.
  const hideLocal = (code, id) => (id.split('\\').join('/').split('?')[0].endsWith('/ww-hub/data/index.ts')
    ? `${code}\nWW_DATA_ALL.CHARACTER_DB = []; WW_DATA_ALL.WEAPON_DATA = []; WW_DATA_ALL.ECHO_DATA = []; WW_DATA_ALL.GUIDES = [];\n`
    : undefined);
  const notionOnly = await withViteModules(root, async load => pick((await load('/common-hub/data/dataManager.ts')).getGameData('ww')), hideLocal);
  return { ...full, notionOnly };
}

export const ww = {
  id: 'ww',
  name: '명조',
  async compare({ root, notion, list, log }) {
    const add = list.add;
    const locale = loadLocale(root);
    const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'common-hub', 'data', 'notion-data.json'), 'utf8'));
    const databases = {};

    // 1. Notion now vs the synced snapshot, parsed by the sync script's own parser.
    for (const [name, cfg] of Object.entries(WW_DATABASES)) {
      const id = process.env[cfg.env] || cfg.fallback;
      if (!id) { log(`  ${cfg.label}: ${cfg.env} 없음, 건너뜀`); continue; }
      log(`  Notion ${cfg.label} 읽는 중…`);
      const live = name === 'guides' ? await fetchWwGuidesFromDB(notion.client, notion.n2m, id) : await fetchFromDB(notion.client, id, notion.n2m, !!cfg.isCharacter);
      databases[name] = { pages: live.length };
      reportSyncPending({ live, snapshot, isSnapshotItem: cfg.snapshot, label: cfg.label, add });
    }

    // 2–3. Site view vs Notion-only view vs local files.
    log('  사이트 데이터 합치는 중…');
    const views = await loadViews(root);
    for (const [kind, label] of [['characters', '캐릭터'], ['weapons', '무기'], ['echoes', '에코']]) {
      const notionView = new Map((views.notionOnly[kind] || []).map(x => [key(x), x]));
      const localByKey = new Map((views.local[kind] || []).map(x => [key({ ...x, name: readable(x.name, locale) }), x]));
      const siteOnly = [];
      for (const s of views.site[kind] || []) {
        const k = key(s);
        const n = notionView.get(k);
        if (!n) { siteOnly.push(k); continue; }
        if (kind === 'characters') {
          for (const [field, fieldLabel] of Object.entries(CHARACTER_FIELDS)) {
            if (empty(n[field])) continue;
            const siteValue = readable(s[field], locale);
            if (comparable(siteValue) === comparable(n[field])) continue;
            const textual = typeof n[field] === 'string' && typeof siteValue === 'string';
            add({ db: label, target: k, cat: fieldLabel, group: GROUP.localShown, kind: textual ? textKind(n[field], siteValue) || KIND.spacing : undefined, notion: show(n[field]), site: show(siteValue), hint: valueHint(field, n[field], '사이트는 로컬 파일 값 표시') });
          }
        }
        const local = localByKey.get(k);
        for (const [field, fieldLabel] of Object.entries(LOCAL_FILE_FIELDS[kind] || {})) {
          if (!local || empty(local[field]) || empty(n[field])) continue;
          if (comparable(local[field]) === comparable(n[field])) continue;
          if (comparable(readable(s[field], locale)) !== comparable(n[field])) continue; // already reported as 2
          add({ db: label, target: k, cat: fieldLabel, group: GROUP.localFile, notion: show(n[field]), site: show(local[field]), hint: valueHint(field, n[field], '사이트는 Notion 값 표시 · 로컬 파일만 낡음') });
        }
      }
      if (siteOnly.length) add({ db: label, target: `${label} 전체`, cat: 'Notion에 없음', group: GROUP.missing, text: `사이트에만 있는 ${label} ${siteOnly.length}개: ${siteOnly.join(', ')}` });
    }
    return { databases };
  },
};
