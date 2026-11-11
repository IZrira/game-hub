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
    if (formList(officialForms) !== formList(localForms)) add({ db, target, cat: '형태 목록', notion: formList(officialForms), site: formList(localForms) });
    for (const form of officialForms) {
      const lf = localForms.find(f => f.key === form.key);
      if (!lf) continue;
      const detail = parse(form.href === card.sourcePath ? baseHtml : await fetchHtml(form.href), form.href);
      const site = comparable(lf);
      const official = comparable(detail);
      for (const section of Object.keys(official)) {
        if (!diffDeep(site[section], official[section], '', []).length) continue;
        const a = sectionText(section, site[section]);
        const b = sectionText(section, official[section]);
        const kind = textKind(b, a);
        if (kind === null) continue;
        add({ db, target, cat: `${form.label} · ${section}`, kind, notion: b, site: a });
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
    log('  공식 도감 목록 읽는 중…');
    const index = parseIndex(await fetchHtml('/ko'));
    log(`  기존 지역 ${index.legacy.length}종, 웨이브 군도 ${index.wave.length}종`);
    await compareRegion({ db: '기존 지역', roster: index.legacy, stored: read('aniimo.json'), parse: html => parseLegacyDetail(html), add: list.add, log });
    await compareRegion({ db: '웨이브 군도', roster: index.wave, stored: read('wave-archipelago.json'), parse: (html, href) => parseWaveDetail(html, href).detail, add: list.add, log });
    return { databases: { legacy: { pages: index.legacy.length }, wave: { pages: index.wave.length } } };
  },
};
