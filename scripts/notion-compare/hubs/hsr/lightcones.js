// HSR light cones: Notion "광추 데이터 피드" (one page per path, entries split by dividers)
// against hsr-hub/data/lightcones.
import { norm, textKind, KIND, parseMaterialRun, materialDiffs, onlyRoundingDiffs } from '../../lib/text.js';

const loose = s => norm(s).replace(/\s+/g, '');
const LEVELS = [1, 20, 30, 40, 50, 60, 70, 80];

/** Split every path page into light cone entries. */
export function parseLightconePages(pages) {
  const entries = [];
  for (const page of pages) {
    let cur = null;
    let mode = null;
    const flush = () => { if (cur?.name) entries.push(cur); };
    for (const b of page.blocks) {
      if (b.type === 'divider') { flush(); cur = null; mode = null; continue; }
      const t = (b.text || '').trim();
      if (!cur) cur = { page: page.title, story: [] };
      let m;
      if ((m = t.match(/^이름\s*[:：]\s*(.+)$/m))) { const [ko, en] = m[1].split(/\s*\/\s*/); cur.name = ko.trim(); cur.en = (en || '').trim(); mode = null; continue; }
      if (!cur.name && t && !/[:：\n]/.test(t) && t.length < 40) { cur.name = t; cur.noLabel = true; continue; }
      if ((m = t.match(/^운명의 길\s*[:：]\s*(.+)$/))) { cur.pathRaw = m[1].trim(); cur.path = cur.pathRaw.split(/\s+/)[0]; continue; }
      if ((m = t.match(/^출시 버전\s*[:：]\s*(.+)$/))) { cur.version = m[1].trim(); continue; }
      if ((m = t.match(/^성급\s*[:：]\s*(\d)/))) { cur.rarity = Number(m[1]); continue; }
      if (t.startsWith('성장 스탯')) { cur.stats = t.split('\n').slice(1); mode = 'stats'; continue; }
      if ((m = t.match(/^효과\s*[:：]\s*([^\n]+)\n?([\s\S]*)$/))) { cur.skillName = m[1].trim(); cur.skillDesc = m[2].trim(); mode = 'effect'; continue; }
      if (t === '스토리') { mode = 'story'; continue; }
      if (/^스토리\s*\n/.test(t)) { mode = 'story'; cur.story.push(t.replace(/^스토리\s*\n/, '')); continue; }
      if (mode === 'stats' && /^\d/.test(t)) { cur.stats.push(...t.split('\n')); continue; }
      if (mode === 'effect' && t && !cur.skillDesc) { cur.skillDesc = t; continue; }
      if (mode === 'story' && t) { cur.story.push(t); continue; }
      if (t) (cur.extra = cur.extra || []).push(t);
    }
    flush();
  }
  return entries;
}

/** Notion keeps every superimposition value ("12%/14%/…"); some site descriptions keep only S1. */
function effectKind(notionDesc, site) {
  let kind = textKind(notionDesc, site.description);
  if (kind !== KIND.number || /\d%?\/\d/.test(site.description || '')) return kind;
  const pick = (s, i) => s.replace(/(\d+(?:\.\d+)?)(%|pt)?((?:\/\d+(?:\.\d+)?(?:%|pt)?){4})/g, (all, a, u, rest) => [a + (u || ''), ...rest.split('/').slice(1)][i]);
  const s1 = textKind(pick(notionDesc || '', 0), site.description);
  const s5 = site.descriptions?.[4] ? textKind(pick(notionDesc || '', 4), site.descriptions[4]) : '없음';
  if (s1 !== KIND.number && s5 !== KIND.number) {
    kind = s1 && s1 !== '없음' ? `${s1}, 사이트는 1중첩 수치만 표기` : (s5 && s5 !== '없음' ? `${s5}, 사이트는 1중첩 수치만 표기` : null);
  }
  if (s1 === null && (s5 === null || s5 === '없음')) kind = null;
  return kind;
}

export function compareLightcones({ pages, lightcones, add }) {
  const entries = parseLightconePages(pages);
  const byName = new Map(lightcones.map(l => [l.name, l]));
  const matched = new Set();
  const seenNotion = new Map();

  for (const e of entries) {
    seenNotion.set(e.name, (seenNotion.get(e.name) || 0) + 1);
    let l = byName.get(e.name);
    const found = [];
    if (!l) {
      const alt = lightcones.find(x => e.name.startsWith(x.name + ' ') || x.name.startsWith(e.name + ','));
      if (alt) {
        found.push({ cat: '이름', text: `Notion "${e.name}" / 사이트 "${alt.name}"`, hint: e.name.startsWith(alt.name + ' ') ? 'Notion 오타 의심' : '공식 이름 확인 필요' });
        l = alt;
      }
    }
    if (!l) {
      add({ db: '광추', target: e.name, sub: `${e.path || '?'} · ${e.rarity || '?'}성`, cat: '사이트에 없음', text: `Notion "${e.page}" 페이지에만 있는 광추`, hint: '새 항목 추가 대상' });
      continue;
    }
    matched.add(l.name);
    if (e.pathRaw && e.pathRaw !== e.path) found.push({ cat: '운명의 길', text: `Notion 표기 "${e.pathRaw}" (사이트 ${l.path})`, hint: 'Notion만 정리' });
    else if (e.path !== l.path) found.push({ cat: '운명의 길', text: `Notion ${e.path} / 사이트 ${l.path} (Notion 페이지 "${e.page}")`, hint: e.page.startsWith(l.path) ? 'Notion 오류 의심' : undefined });
    if (e.rarity !== l.rarity) found.push({ cat: '성급', text: `Notion ${e.rarity} / 사이트 ${l.rarity}` });
    if (e.version && e.version !== l.releaseVersion) found.push({ cat: '출시 버전', text: `Notion ${e.version} / 사이트 ${l.releaseVersion}` });
    if (loose(e.skillName) !== loose(l.skill?.name)) found.push({ cat: '효과 이름', text: `Notion "${e.skillName}" / 사이트 "${l.skill?.name}"` });
    const kind = effectKind(e.skillDesc, l.skill || {});
    if (kind) found.push({ cat: '효과 문구', kind, notion: e.skillDesc, site: l.skill?.description, hint: /1중첩/.test(kind) ? '사이트는 1중첩 표기' : undefined });
    if (e.noLabel) found.push({ cat: 'Notion 형식', text: '"이름 :" 표시 없이 이름만 적혀 있음', hint: 'Notion만 정리' });

    const rows = (e.stats || []).map(r => r.trim()).filter(Boolean).map(r => r.split(/\s+/));
    const statDiffs = [];
    const matDiffs = [];
    for (const lv of LEVELS) {
      const r = rows.find(x => Number(x[0]) === lv);
      const s = l.baseStats?.['lv' + lv];
      if (!r) { statDiffs.push(`Lv${lv} Notion에 행 없음`); continue; }
      const n = r.slice(1, 4).map(x => Number(x.replace(/,/g, '')));
      const site = [s?.['기초 HP'], s?.['기초 공격력'], s?.['기초 방어력']];
      if (n.join() !== site.join()) statDiffs.push(`Lv${lv} Notion ${n.join('/')} · 사이트 ${site.join('/')}`);
      if (lv > 1) {
        const siteMats = Object.fromEntries(((l.ascensionMaterials || []).find(a => a.level === lv)?.items || []).map(i => [i.name, Number(String(i.count).replace(/,/g, ''))]));
        const d = materialDiffs(parseMaterialRun(r.slice(4).join(' ')), siteMats);
        if (d.length) matDiffs.push(`Lv${lv}: ${d.join(', ')}`);
      }
    }
    if (statDiffs.length) {
      const text = '(HP/공격력/방어력) ' + statDiffs.join('; ');
      found.push({ cat: '성장 스탯', text, hint: onlyRoundingDiffs(text) ? '반올림 차이' : undefined });
    }
    if (matDiffs.length) found.push({ cat: '돌파 재료', text: matDiffs.join('; ') });
    if (e.story.length) {
      const sk = textKind(e.story.join('\n'), l.story);
      if (sk) found.push({ cat: '스토리', kind: sk, notion: e.story.join('\n'), site: l.story });
    }
    for (const f of found) add({ db: '광추', target: l.name, sub: `${l.path} · ${l.rarity}성`, ...f });
  }

  for (const [name, n] of seenNotion) {
    if (n > 1) add({ db: '광추', target: name, cat: 'Notion 형식', text: `Notion에 같은 광추가 ${n}번 들어 있음`, hint: 'Notion만 정리' });
  }
  for (const l of lightcones) {
    if (!matched.has(l.name)) add({ db: '광추', target: l.name, sub: `${l.path} · ${l.rarity}성`, cat: 'Notion에 없음', text: `사이트에만 있는 광추 (${l.releaseVersion})` });
  }
  return { notionCount: entries.length };
}
