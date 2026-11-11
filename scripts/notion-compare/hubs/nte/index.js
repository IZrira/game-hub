// Neverness to Everness hub.
//
// Characters, arcs and items come from Notion through notion-data.json; local nte-hub lists are
// nearly empty, so the site shows Notion's values. Guides are synced as whole Markdown bodies into
// common-hub/data/guideArticles.json (scripts/lib/sync-nte-guides.js) and may be edited locally.
// Checked here:
//   1. 동기화 대기 for characters, arcs and items (live Notion vs notion-data.json).
//   2. 공략: live Notion guide Markdown vs the stored article, paragraph by paragraph.
//   3. 로컬 파일만 다름: local nte-hub entries that disagree with the Notion value the site shows.
import fs from 'node:fs';
import path from 'node:path';
import { fetchFromDB } from '../../../fetch-notion-data.js';
import { listRows, pageMarkdown, pause } from '../../lib/notion.js';
import { reportSyncPending } from '../../lib/sync-pending.js';
import { withViteModules } from '../../lib/vite-data.js';
import { diffDeep } from '../../lib/diff.js';
import { textKind } from '../../lib/text.js';
import { lineHunks } from '../../lib/lines.js';

export const NTE_DATABASES = {
  characters: { env: 'NOTION_NTE_CHARACTER_DB_ID', fallback: '38095fae3dc7802aa4abf9ab1977e687', label: '캐릭터', snapshot: x => x.dbSource === 'nte_characters', isCharacter: true, format: x => ({ ...x, type: '캐릭터' }) },
  arcs: { env: 'NOTION_NTE_ARC_DB_ID', fallback: '38095fae3dc780c3a7c4d901cbe9411c', label: '아크', snapshot: x => x.dbSource === 'nte_arcs', format: x => ({ ...x, type: x.type || '결합' }) },
  items: { env: 'NOTION_NTE_ITEM_DB_ID', fallback: '38095fae3dc780a29fffe0381071580d', label: '아이템', snapshot: x => x.dbSource === 'nte_items', format: x => ({ ...x, type: x.type || '아이템' }) },
};
// format(): the defaults fetchNotionData() adds before saving each NTE list.
const GUIDE_DB = { env: 'NOTION_NTE_GUIDES_DB_ID', fallback: '3f695fae3dc7801f936ce549d8fefeef' };

async function compareGuides({ root, notion, add, log }) {
  const id = process.env[GUIDE_DB.env] || GUIDE_DB.fallback;
  log('  Notion 공략 읽는 중…');
  const rows = await listRows(notion, id);
  const articles = JSON.parse(fs.readFileSync(path.join(root, 'common-hub', 'data', 'guideArticles.json'), 'utf8'));
  const byPage = new Map(articles.filter(a => a.gameId === 'nte' && a.notionPageId).map(a => [a.notionPageId, a]));
  for (const row of rows) {
    await pause();
    const target = row.title.replace(/\s*세팅\s*공략\s*$/, '').trim() || row.title;
    const article = byPage.get(row.id);
    if (!article) { add({ db: '공략', target, cat: '사이트에 없음', text: `Notion 공략 "${row.title}"이 사이트 공략에 없음`, hint: '동기화하면 추가됨' }); continue; }
    const base = { db: '공략', target, sub: article.slug };
    const content = await pageMarkdown(notion, row.id);
    if (article.title !== row.title) add({ ...base, cat: '제목', notion: row.title, site: article.title });
    const edited = row.edited.slice(0, 10);
    if (article.reviewedAt !== edited) add({ ...base, cat: '검수일', text: `Notion 마지막 수정 ${edited} · 사이트 검수일 ${article.reviewedAt}`, hint: content === article.content ? '본문은 같음' : undefined });
    for (const h of lineHunks(article.content, content)) {
      const kind = textKind(h.b, h.a);
      if (!kind) continue;
      add({ ...base, cat: '본문', label: h.heading ? `${h.heading} (${h.n})` : `${h.n}번째 차이`, kind, notion: h.b, site: h.a });
    }
    byPage.delete(row.id);
  }
  for (const a of byPage.values()) add({ db: '공략', target: a.title, sub: a.slug, cat: 'Notion에 없음', text: '사이트 공략에 연결된 Notion 페이지가 공략 DB에 없음' });
  return rows.length;
}

async function compareLocalFiles(root, add) {
  const pick = d => ({ characters: d.CHARACTER_DB, arcs: d.WEAPON_DB });
  const local = await withViteModules(root, async load => {
    const { NTE_DATA_ALL } = await load('/nte-hub/data/index.ts');
    return { characters: NTE_DATA_ALL.CHARACTER_DB, arcs: NTE_DATA_ALL.WEAPON_DATA };
  });
  const hideLocal = (code, id) => (id.split('\\').join('/').split('?')[0].endsWith('/nte-hub/data/index.ts')
    ? `${code}\nNTE_DATA_ALL.CHARACTER_DB = []; NTE_DATA_ALL.WEAPON_DATA = [];\n`
    : undefined);
  const notionOnly = await withViteModules(root, async load => pick((await load('/common-hub/data/dataManager.ts')).getGameData('nte')), hideLocal);
  for (const [kind, label] of [['characters', '캐릭터'], ['arcs', '아크']]) {
    const byName = new Map((notionOnly[kind] || []).map(x => [String(x.name || '').trim(), x]));
    for (const l of local[kind] || []) {
      const n = byName.get(String(l.name || '').trim());
      if (!n) continue;
      for (const d of diffDeep(l, n, '', [], { ignore: [/^(id|gameId|isNotion|dbSource)$/] })) {
        if (d.a === '(없음)') continue; // Notion-only fields are not a local disagreement
        if (d.b !== '' && !textKind(d.a, d.b)) continue; // line breaks only
        add({ db: label, target: l.name, cat: d.path, group: '로컬 파일만 다름', notion: d.b, site: d.a, hint: d.b === '' ? 'Notion 빈 칸이 로컬 값을 덮음' : '사이트는 Notion 값 표시 · 로컬 파일만 낡음' });
      }
    }
  }
}

export const nte = {
  id: 'nte',
  name: '이환',
  async compare({ root, notion, list, log }) {
    const add = list.add;
    const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'common-hub', 'data', 'notion-data.json'), 'utf8'));
    const databases = {};
    for (const [name, cfg] of Object.entries(NTE_DATABASES)) {
      const id = process.env[cfg.env] || cfg.fallback;
      log(`  Notion ${cfg.label} 읽는 중…`);
      const live = (await fetchFromDB(notion.client, id, notion.n2m, !!cfg.isCharacter, 'NTE')).map(cfg.format);
      databases[name] = { pages: live.length };
      reportSyncPending({ live, snapshot, isSnapshotItem: cfg.snapshot, label: cfg.label, add });
    }
    databases.guides = { pages: await compareGuides({ root, notion, add, log }) };
    log('  로컬 파일 확인 중…');
    await compareLocalFiles(root, add);
    return { databases };
  },
};
