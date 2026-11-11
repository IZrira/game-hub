// HSR character guides: Notion "HSR 캐릭터 공략 DB" against hsr-hub/data/guides.
// The guide parser and comparison rules live in scripts/fetch-notion-data.js (the sync script).
// That file runs the sync when imported, so the helper functions are read out of its source and
// evaluated on their own; the comparison then uses exactly the sync's rules.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pageMarkdown, pause } from '../../lib/notion.js';

function loadSyncHelpers(root) {
  const src = fs.readFileSync(path.join(root, 'scripts', 'fetch-notion-data.js'), 'utf8');
  const start = src.indexOf('function cleanMd(');
  const end = src.indexOf('function registerHsrGuideInIndex');
  if (start < 0 || end < 0) throw new Error('fetch-notion-data.js: HSR guide helpers not found (was the file reorganised?)');
  const ctx = { fs, path, ROOT_DIR: root, console, module: { exports: {} } };
  vm.createContext(ctx);
  vm.runInContext(`${src.slice(start, end)}\nmodule.exports = { parseHsrGuideMarkdown, readLocalHsrGuide, normalizeHsrGuideForComparison };`, ctx);
  return ctx.module.exports;
}

const LABELS = [
  [/bestOrnaments/g, '추천 장신구'], [/bestLightCones/g, '추천 광추'], [/bestRelics/g, '추천 유물'],
  [/targetStats/g, '목표 스탯'], [/mainStats/g, '주옵션'], [/subStats/g, '부옵션'], [/skillPriority/g, '스킬 우선순위'],
  [/synergyCharacters/g, '추천 파티'], [/patchVersion/g, '버전'], [/variants/g, '세팅'],
  [/\.note/g, ' 설명'], [/\.name/g, ' 이름'], [/\.value/g, ' 값'], [/\.body/g, ' 몸통'], [/\.feet/g, ' 신발'], [/\.sphere/g, ' 구체'], [/\.rope/g, ' 매듭'],
];
const label = p => LABELS.reduce((s, [re, to]) => s.replace(re, to), p);
const show = v => (typeof v === 'string' ? v : JSON.stringify(v));

function diffDeep(a, b, p, out) {
  if (JSON.stringify(a) === JSON.stringify(b)) return;
  if (Array.isArray(a) || Array.isArray(b)) {
    const A = a || [], B = b || [];
    for (let i = 0; i < Math.max(A.length, B.length); i++) diffDeep(A[i], B[i], `${p}[${i + 1}]`, out);
    return;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffDeep(a[k], b[k], p ? `${p}.${k}` : k, out);
    return;
  }
  out.push({ path: p, site: a === undefined ? '(없음)' : show(a), notion: b === undefined ? '(없음)' : show(b) });
}

export async function compareGuides({ root, notion, rows, add }) {
  const { parseHsrGuideMarkdown, readLocalHsrGuide, normalizeHsrGuideForComparison } = loadSyncHelpers(root);
  const seen = new Set();
  for (const row of rows) {
    await pause();
    const guide = parseHsrGuideMarkdown(row.title, await pageMarkdown(notion, row.id));
    const keyName = (guide.fileName || guide.characterName || row.id).trim().toLocaleLowerCase('ko-KR');
    if (seen.has(keyName)) { add({ db: '공략', target: guide.characterName || row.title, cat: 'Notion 형식', text: `같은 캐릭터 공략 페이지가 두 개 이상 있음 ("${row.title}")`, hint: 'Notion만 정리' }); continue; }
    seen.add(keyName);
    const file = guide.fileName && path.join(root, 'hsr-hub', 'data', 'guides', guide.fileName);
    const target = guide.characterName || row.title;
    if (!file || !fs.existsSync(file)) {
      add({ db: '공략', target, sub: guide.fileName, cat: '사이트에 없음', text: `Notion 공략 "${row.title}"에 맞는 사이트 공략 파일이 없음`, hint: '동기화하면 새로 추가됨' });
      continue;
    }
    const local = normalizeHsrGuideForComparison(readLocalHsrGuide(file));
    const remote = normalizeHsrGuideForComparison(guide, true);
    const diffs = [];
    diffDeep(local, remote, '', diffs);
    for (const d of diffs) {
      const typo = /피헤|\s{2,}|\s:$/.test(d.notion);
      add({ db: '공략', target, sub: guide.fileName, cat: label(d.path), notion: d.notion, site: d.site, hint: typo ? 'Notion 오타 의심' : undefined });
    }
  }
}
