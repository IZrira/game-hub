// Aniimo hub: no Notion DB. The source of truth is the official wiki (wiki.aniimo.com), so this hub
// compares the official pages with the stored dex files, read-only:
//   aniimo-hub/data/aniimo.json            first region (86 species), parsed by fetch-aniimo-data.js
//   aniimo-hub/data/wave-archipelago.json  Wave Archipelago, parsed by scripts/lib/aniimo-wave-parser.js
// Each region is parsed with the parser that produced its file (the two map some labels
// differently, e.g. rock → 바위 vs 땅), so only real changes on the official site show up.
import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { parseDetail as parseLegacyDetail } from '../../../fetch-aniimo-data.js';
import { parseWaveDetail, aniimoAssetId } from '../../../lib/aniimo-wave-parser.js';
import { diffDeep } from '../../lib/diff.js';
import { textKind } from '../../lib/text.js';
import { pause } from '../../lib/notion.js';

const ORIGIN = 'https://wiki.aniimo.com';

/** The first region stores habitat names through LEGACY_HABITAT_NAME_MAP (e.g. 바다끝 구릉 → 바다끝 구름). */
function legacyHabitatMap(root) {
  const src = fs.readFileSync(path.join(root, 'aniimo-hub', 'data', 'habitats.ts'), 'utf8');
  const block = src.slice(src.indexOf('LEGACY_HABITAT_NAME_MAP')).split('};')[0];
  return Object.fromEntries([...block.matchAll(/'([^']+)':\s*'([^']+)'/g)].map(m => [m[1], m[2]]));
}
const withHabitatNames = (detail, map) => ({ ...detail, locations: [...new Set((detail.locations || []).map(l => map[l.trim()] || l.trim()))] });
const clean = s => String(s ?? '').replace(/\s+/g, ' ').trim();

async function fetchHtml(sourcePath) {
  const url = new URL(sourcePath, ORIGIN);
  if (url.origin !== ORIGIN) throw new Error(`Unexpected official source origin: ${url}`);
  await pause(250);
  const response = await fetch(url, { signal: AbortSignal.timeout(30000), redirect: 'error', headers: { 'user-agent': 'RiraGameHub/1.0 (+https://riragamehub.com)' } });
  if (!response.ok) throw new Error(`Official source HTTP ${response.status}: ${url}`);
  return response.text();
}

/** All species cards on the official index, split by region (legacy paths have no region suffix). */
export function parseIndex(html) {
  const $ = cheerio.load(html);
  const legacy = [];
  const wave = [];
  $('a[href^="/ko/item/"]').each((_, e) => {
    const href = $(e).attr('href') || '';
    const number = clean($(e).find('span').first().text().replace('NO.', ''));
    const name = clean($(e).find('div.text-center span').text());
    if (!number || !name) return;
    if (/^\/ko\/item\/\d{3}\/[^/]+\/300301$/.test(href)) { if (!wave.some(x => x.sourcePath === href)) wave.push({ number, name, sourcePath: href }); }
    else if (/^\/ko\/item\/\d{3}\/[^/]+$/.test(href)) { if (!legacy.some(x => x.sourcePath === href)) legacy.push({ number, name, sourcePath: href }); }
  });
  return { legacy, wave };
}

const formLinks = html => {
  const $ = cheerio.load(html);
  return $('.morphology-tab').map((_, e) => ({ href: $(e).attr('href'), label: clean($(e).text()) })).get().filter(f => f.href && f.label);
};

/** The parts of a form worth comparing: no image hosts, no locally enriched evolution names. */
function comparable(form) {
  const skills = list => (list || []).map(s => ({ name: s.name, description: s.description, skillType: s.skillType ?? '', energyCost: s.energyCost ?? null, power: s.power ?? null }));
  return {
    그림: aniimoAssetId(form.imageUrl),
    속성: form.elements,
    역할: form.positions,
    능력치: form.stats,
    설명: form.description,
    '출현 지역': form.locations,
    '홈 능력': (form.homeAbilities || []).map(h => ({ 종류: h.name, 수치: h.value })),
    '탐사 스킬': skills(form.explorationSkills),
    특성: skills(form.traits),
    '전투 스킬': skills(form.combatSkills),
    '고유 스킬': skills(form.uniqueSkills),
    '진화 단계': (form.evolution || []).map(n => `${n.stage}:${aniimoAssetId(n.imageUrl) || '없음'}`),
    '공명 단계': (form.resonanceLevels || []).map(r => ({ 단계: r.level, 조건: r.requirement, 재료: r.material })),
  };
}

const STAT_LABEL = { total: '합계', hp: 'HP', break: '무력화', attack: '공격', magicDefense: '마법 방어', physicalDefense: '물리 방어', energyRecovery: '에너지 회복' };

/** One section as reader-friendly text, so a whole section can be compared side by side. */
export function sectionText(section, value) {
  if (value === null || value === undefined) return '';
  if (section === '능력치') return Object.entries(value).map(([k, v]) => `${STAT_LABEL[k] || k} ${v ?? '-'}`).join(' · ');
  if (!Array.isArray(value)) return String(value);
  return value.map(v => {
    if (typeof v !== 'object' || v === null) return String(v);
    if ('description' in v) {
      const meta = [v.skillType, v.energyCost !== null && v.energyCost !== undefined ? `에너지 ${v.energyCost}` : '', v.power !== null && v.power !== undefined ? `위력 ${v.power}` : ''].filter(Boolean).join(' · ');
      return `■ ${v.name}${meta ? ` (${meta})` : ''}\n${v.description}`;
    }
    return Object.entries(v).map(([k, x]) => `${k} ${x ?? '-'}`).join(' · ');
  }).join('\n');
}

const SKILL_SECTIONS = new Set(['탐사 스킬', '특성', '전투 스킬', '고유 스킬']);
const SKILL_FIELD = { name: '이름', description: '설명', skillType: '종류', energyCost: '에너지', power: '위력' };
const shown = v => (v === undefined || v === null || v === '' ? '(없음)' : Array.isArray(v) ? v.join(', ') : String(v));
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null);

/** Pair list entries by a key first, then the leftovers by position. */
function pairBy(A, B, key) {
  const pairs = [];
  const restB = [...B];
  const restA = [];
  for (const a of A) {
    const j = restB.findIndex(b => key(b) === key(a));
    if (j >= 0) pairs.push([a, restB.splice(j, 1)[0]]); else restA.push(a);
  }
  for (let i = 0; i < Math.max(restA.length, restB.length); i++) pairs.push([restA[i], restB[i]]);
  return pairs;
}

/**
 * Every single difference inside one section, so each can be decided on its own:
 * a stat, one field of one skill, one resonance level's requirement, one location, ...
 * Returns `{ label, site, official }` with display strings.
 */
export function fieldDiffs(section, site, official) {
  const out = [];
  const push = (label, a, b) => { if (!same(a, b)) out.push({ label, site: shown(a), official: shown(b) }); };
  if (section === '능력치') {
    for (const k of new Set([...Object.keys(site || {}), ...Object.keys(official || {})])) push(STAT_LABEL[k] || k, site?.[k], official?.[k]);
    return out;
  }
  if (SKILL_SECTIONS.has(section)) {
    for (const [a, b] of pairBy(site || [], official || [], s => s.name)) {
      const base = (b || a).name || '이름 없음';
      if (!a || !b) { push(base, a ? sectionText(section, [a]) : undefined, b ? sectionText(section, [b]) : undefined); continue; }
      for (const k of Object.keys(SKILL_FIELD)) push(`${base} · ${SKILL_FIELD[k]}`, a[k], b[k]);
    }
    return out;
  }
  if (section === '홈 능력') {
    for (const [a, b] of pairBy(site || [], official || [], h => h.종류)) push((b || a).종류, a ? a.수치 : undefined, b ? b.수치 : undefined);
    return out;
  }
  if (section === '공명 단계') {
    for (const [a, b] of pairBy(site || [], official || [], r => r.단계)) {
      const base = (b || a).단계;
      if (!a || !b) { push(base, a && `${a.조건} · ${a.재료}`, b && `${b.조건} · ${b.재료}`); continue; }
      push(`${base} · 조건`, a.조건, b.조건);
      push(`${base} · 재료`, a.재료, b.재료);
    }
    return out;
  }
  if (section === '진화 단계') {
    const A = site || [];
    const B = official || [];
    for (let i = 0; i < Math.max(A.length, B.length); i++) push(`${i + 1}단계`, A[i], B[i]);
    return out;
  }
  if (Array.isArray(site) || Array.isArray(official)) {
    const A = site || [];
    const B = official || [];
    for (const x of A) if (!B.includes(x)) push(String(x), x, undefined);
    for (const x of B) if (!A.includes(x)) push(String(x), undefined, x);
    if (!out.length) push('순서', A, B);
    return out;
  }
  push('', site, official);
  return out;
}

async function compareRegion({ db, roster, stored, parse, add, log }) {
  const byPath = new Map(stored.map(x => [x.sourcePath, x]));
  const seen = new Set();
  for (let i = 0; i < roster.length; i++) {
    const card = roster[i];
    const local = byPath.get(card.sourcePath);
    const target = `${card.number} ${card.name}`;
    if (!local) { add({ db, target, cat: '사이트에 없음', text: `공식 도감에 있는 애니모 (${ORIGIN}${card.sourcePath})`, hint: '새 항목 추가 대상' }); continue; }
    seen.add(card.sourcePath);
    if (local.name !== card.name || local.number !== card.number) add({ db, target, cat: '이름·번호', notion: `${card.number} ${card.name}`, site: `${local.number} ${local.name}` });
    const baseHtml = await fetchHtml(card.sourcePath);
    const links = formLinks(baseHtml);
    const officialForms = links.map(l => ({ key: l.href.split('/')[4], label: l.label, href: l.href }));
    const localForms = local.forms || [];
    const formList = list => list.map(f => `${f.key} ${f.label}`).join('\n');
    if (formList(officialForms) !== formList(localForms)) {
      for (const [a, b] of pairBy(localForms, officialForms, f => f.key)) {
        if (a && b && a.label === b.label) continue;
        add({ db, target, cat: '형태 목록', label: (b || a).key, notion: b ? `${b.key} ${b.label}` : '(없음)', site: a ? `${a.key} ${a.label}` : '(없음)' });
      }
    }
    for (const form of officialForms) {
      const lf = localForms.find(f => f.key === form.key);
      if (!lf) continue;
      const detail = parse(form.href === card.sourcePath ? baseHtml : await fetchHtml(form.href), form.href);
      const site = comparable(lf);
      const official = comparable(detail);
      for (const section of Object.keys(official)) {
        if (!diffDeep(site[section], official[section], '', []).length) continue;
        for (const d of fieldDiffs(section, site[section], official[section])) {
          const kind = textKind(d.official, d.site);
          if (kind === null) continue;
          add({ db, target, cat: `${form.label} · ${section}`, label: d.label || undefined, kind, notion: d.official, site: d.site });
        }
      }
    }
    if ((i + 1) % 10 === 0) log(`    ${db} ${i + 1}/${roster.length}`);
  }
  for (const x of stored) if (!seen.has(x.sourcePath)) add({ db, target: `${x.number} ${x.name}`, cat: '공식 도감에 없음', text: '사이트에 있지만 공식 도감 목록에서 찾을 수 없는 애니모', hint: '공식 경로 변경 확인' });
}

export const aniimo = {
  id: 'aniimo',
  name: '애니모',
  sourceLabel: '공식 도감',
  async compare({ root, list, log }) {
    const read = f => JSON.parse(fs.readFileSync(path.join(root, 'aniimo-hub', 'data', f), 'utf8'));
    const habitatMap = legacyHabitatMap(root);
    log('  공식 도감 목록 읽는 중…');
    const index = parseIndex(await fetchHtml('/ko'));
    log(`  기존 지역 ${index.legacy.length}종, 웨이브 군도 ${index.wave.length}종`);
    await compareRegion({ db: '기존 지역', roster: index.legacy, stored: read('aniimo.json'), parse: html => withHabitatNames(parseLegacyDetail(html), habitatMap), add: list.add, log });
    await compareRegion({ db: '웨이브 군도', roster: index.wave, stored: read('wave-archipelago.json'), parse: (html, href) => parseWaveDetail(html, href).detail, add: list.add, log });
    return { databases: { legacy: { pages: index.legacy.length }, wave: { pages: index.wave.length } } };
  },
};
