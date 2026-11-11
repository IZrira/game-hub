// HSR characters: Notion "사이트 업로드용 HSR 캐릭터 DB" pages against hsr-hub/data/characters.
// Notion keeps everything in paragraph text ("이름 : …", "성장 스탯 …" rows, "name x count" lines).
// Pages titled "… (AS)" are the AS Remake version and are compared with the site's asBuffData,
// never with the original kit.
import { nameKey as key, norm, textKind, parseMaterialLines, materialDiffs, onlyRoundingDiffs } from '../../lib/text.js';

const SKILL_TYPE = /^(일반 공격|전투 스킬|필살기|특성|비술|환락 스킬|기억 정령 스킬|기억 정령 특성|강화 일반 공격|강화 전투 스킬)(?=\s|$)/;
const cutGlossary = s => s.split(/\n용어(?:\n|$)/)[0].trim();

function siteVersion(characters, title) {
  const isAs = /\(AS\)\s*$/.test(title);
  const base = title.replace(/\s*\(AS\)\s*$/, '');
  const c = characters.find(x => key(x.name) === key(base));
  if (!c || !isAs) return c;
  if (!c.asBuffData) return { ...c, asMissing: true };
  const a = c.asBuffData;
  return {
    ...c,
    skills: a.skills || c.skills,
    baseStats: a.baseStats || c.baseStats,
    additionalAbilities: a.additionalAbilities || c.additionalAbilities || c.bonusAbilities,
    attributeBonuses: a.attributeBonuses || c.attributeBonuses,
    eidolons: a.eidolons || c.eidolons,
    materials_v2: a.materials_v2 || c.materials_v2,
  };
}

/** Rows of Notion's stat block: [level, a, b, c, speed, taunt, energy]. */
function statRows(block) {
  return block.split('\n').slice(1)
    .map(r => r.trim().split(/\s+/).map(x => Number(x.replace(/,/g, ''))))
    .filter(r => r.length >= 4);
}

const siteTriple = s => [s['기초 공격력'], s['기초 방어력'], s['기초 HP']];
const sameSet = (a, b) => [...a].sort((x, y) => x - y).join() === [...b].sort((x, y) => x - y).join();

export function compareCharacters({ pages, characters, locale, add }) {
  const tr = v => (typeof v === 'string' && v.startsWith('character.') ? (locale[v] ?? v) : v);
  const trDesc = (n, d) => {
    if (typeof d === 'string' && d.startsWith('character.')) return locale[d] ?? d;
    if (d === undefined && typeof n === 'string' && n.startsWith('character.')) return locale[n.replace(/\.name$/, '.desc')];
    return d;
  };

  for (const page of pages) {
    const target = page.title;
    const isAs = /\(AS\)\s*$/.test(target);
    const c = siteVersion(characters, target);
    const base = { db: '캐릭터', target, sub: isAs ? '사이트 AS Remake 데이터와 비교' : undefined, siteRef: c ? `${c.name} (${c.id})` : undefined };
    const push = f => add({ ...base, ...f });
    if (!c) { push({ cat: '사이트에 없음', text: `사이트에 "${target.replace(/\s*\(AS\)\s*$/, '')}" 캐릭터가 없음`, hint: '새 항목 추가 대상' }); continue; }
    if (c.asMissing) { push({ cat: '사이트에 없음', text: '사이트 캐릭터 파일에 AS 데이터(asBuffData)가 없음', hint: '새 항목 추가 대상' }); continue; }

    const texts = page.blocks.filter(b => b.type !== 'divider').map(b => norm(b.text));
    const after = label => { const t = texts.find(x => x.startsWith(label + '\n')); return t ? t.slice(label.length + 1) : undefined; };

    // 1. basic fields
    const kv = {};
    for (const line of (texts[0] || '').split('\n')) { const m = line.match(/^(.+?)\s*[:：]\s*(.+)$/); if (m) kv[m[1].trim()] = m[2].trim(); }
    const field = (label, n, s) => { if (n !== undefined && key(n) !== key(s)) push({ cat: '기본 정보', text: `${label}: Notion "${n}" / 사이트 "${s ?? ''}"` }); };
    field('이름', kv['이름'], c.name);
    field('운명의 길', kv['운명의 길'], c.path);
    field('속성', kv['속성'], c.attribute);
    field('소속', kv['소속'], c.affiliation);
    field('버전', kv['버전 정보'], c.releaseVersion);
    if (kv['희귀도'] && parseInt(kv['희귀도'], 10) !== c.rarity) push({ cat: '기본 정보', text: `희귀도: Notion ${kv['희귀도']} / 사이트 ${c.rarity}` });
    for (const [label, cat, siteText] of [['언어별 표기', '언어별 표기', c.languageNames], ['성우', '성우', c.voiceActors], ['캐릭터 간단 정보', '간단 정보', c.briefInfo]]) {
      const n = after(label);
      if (n === undefined) continue;
      const kind = textKind(n, siteText);
      if (kind) push({ cat, kind, notion: n, site: siteText });
    }

    // 2. stats (Notion header says 공격력, 방어력, HP; many pages actually put HP first)
    const statBlock = texts.find(x => x.startsWith('성장 스탯'));
    if (statBlock) {
      const rows = statRows(statBlock);
      const diffs = [];
      let rotated = 0;
      for (const r of rows) {
        const s = c.baseStats?.['lv' + r[0]];
        if (!s) { diffs.push(`Lv${r[0]} 사이트에 없음`); continue; }
        const n = [r[1], r[2], r[3]];
        const site = siteTriple(s);
        if (n.join() === site.join()) continue;
        if (sameSet(n, site)) rotated++;
        else diffs.push(`Lv${r[0]} Notion ${n.join('/')} · 사이트 ${site.join('/')}`);
      }
      const last = rows[rows.length - 1] || [];
      const extra = [['속도', last[4], c.baseStats?.speed], ['도발', last[5], c.baseStats?.taunt], ['에너지', last[6], c.baseStats?.energy]]
        .filter(([, a, b]) => a !== undefined && a !== b).map(([k, a, b]) => `${k} Notion ${a} · 사이트 ${b}`);
      if (rotated) push({ cat: 'Notion 형식', text: `성장 스탯 ${rotated}개 행은 값은 같고 열 순서만 머리글(공격력, 방어력, HP)과 다름 — 실제로는 HP가 앞에 있음`, hint: 'Notion만 정리' });
      if (diffs.length || extra.length) {
        const text = '(공격력/방어력/HP) ' + [...diffs, ...extra].join('; ');
        push({ cat: '성장 스탯', text, hint: statHint(rows, c, characters, text) });
      }
      const levels = rows.map(r => r[0]);
      if (!levels.includes(80)) push({ cat: '성장 스탯', text: `Notion에 있는 레벨: ${levels.join(', ')} (Lv80 행 없음)` });
    }

    // 3. materials
    const siteMats = list => Object.fromEntries((list || []).map(i => [i.name, Number(String(i.count).replace(/,/g, ''))]));
    const compareMats = (cat, lines, list) => {
      if (!lines) { push({ cat, text: 'Notion에 해당 문단 없음' }); return; }
      const d = materialDiffs(parseMaterialLines(lines), siteMats(list));
      if (d.length) push({ cat, text: d.join(', '), hint: matHint(d) });
    };
    const ascension = texts.find(x => x.startsWith('승급 재료\n'));
    compareMats('승급 재료', ascension ? ascension.split('\n').slice(1) : null, c.materials_v2?.ascension);
    const traces = texts.find(x => /운명의 발자취\s*[x×]/.test(x));
    if (traces?.startsWith('신용 포인트\n')) push({ cat: 'Notion 형식', text: '행적 재료 문단 제목이 "신용 포인트"로 적혀 있음', hint: 'Notion만 정리' });
    if (traces && /^[^\n]*[x×]\s*[\d,]+/.test(traces)) push({ cat: 'Notion 형식', text: '행적 재료 문단에 제목이 없음', hint: 'Notion만 정리' });
    compareMats('행적 재료', traces ? traces.split('\n') : null, c.materials_v2?.traces);

    // 4. skills, bonus abilities, eidolons: by name first, by position when the name is not in Notion
    const lines = texts.map(t => t.split('\n'));
    const findDesc = name => {
      for (let bi = 0; bi < lines.length; bi++) {
        const i = lines[bi].findIndex(x => key(x) === key(name));
        if (i < 0) continue;
        let desc = lines[bi].slice(i + 1).join('\n');
        if (!desc.trim()) {
          const parts = [];
          for (let j = bi + 1; j < lines.length; j++) {
            const t = lines[j].join('\n');
            if (/^용어/.test(t)) break;
            if (parts.length && !/^•/.test(t)) break;
            parts.push(t);
          }
          desc = parts.join('\n');
        }
        return cutGlossary(desc);
      }
      return undefined;
    };
    const ordered = { '스킬': [], '추가 능력': [], '성혼': [] };
    let zone = null;
    for (const t of texts) {
      const body = t.replace(/^스킬 정보\n/, '');
      if (SKILL_TYPE.test(body)) { const ls = body.split('\n'); ordered['스킬'].push({ name: ls[1], desc: cutGlossary(ls.slice(2).join('\n')) }); zone = null; continue; }
      if (/^추가 능력\n/.test(t)) { const ls = t.split('\n'); ordered['추가 능력'].push({ name: ls[1], desc: cutGlossary(ls.slice(2).join('\n')) }); zone = '추가 능력'; continue; }
      if (/^속성 보너스/.test(t)) { zone = null; continue; }
      if (/^(성흔|성혼)$/.test(t.trim())) { zone = '성혼'; continue; }
      if (zone && t && !/^용어/.test(t) && !/^에너지 회복/.test(t)) { const ls = t.split('\n'); if (ls.length >= 2) ordered[zone].push({ name: ls[0], desc: cutGlossary(ls.slice(1).join('\n')) }); }
    }
    const named = [
      ...(c.skills || []).map(s => ({ cat: '스킬', name: tr(s.name), desc: trDesc(s.name, s.description) })),
      ...(c.additionalAbilities || c.bonusAbilities || []).map(s => ({ cat: '추가 능력', name: tr(s.name), desc: trDesc(s.name, s.description) })),
      ...(c.eidolons || []).map(s => ({ cat: '성혼', name: tr(s.name), desc: trDesc(s.name, s.description) })),
    ];
    const index = { '스킬': 0, '추가 능력': 0, '성혼': 0 };
    const used = new Set();
    const missingInNotion = [];
    for (const e of named) {
      const i = index[e.cat]++;
      let desc = findDesc(e.name);
      if (desc === undefined) {
        const alt = ordered[e.cat][i];
        if (!alt) { missingInNotion.push(`${e.cat} "${e.name}"`); continue; }
        push({ cat: `${e.cat} 이름`, text: `${i + 1}번째: 사이트 "${e.name}" / Notion "${alt.name}"` });
        used.add(key(alt.name));
        desc = alt.desc;
      }
      used.add(key(e.name));
      const kind = textKind(desc, e.desc);
      if (kind) push({ cat: `${e.cat} 문구`, label: e.name, kind, notion: desc, site: e.desc });
    }
    const missingInSite = [];
    for (const t of texts) {
      const body = t.replace(/^스킬 정보\n/, '');
      if (!SKILL_TYPE.test(body)) continue;
      const name = body.split('\n')[1];
      if (name && !used.has(key(name))) missingInSite.push(`스킬 "${name}" (${body.split('\n')[0]})`);
    }

    // 5. attribute bonuses
    const bonus = after('속성 보너스');
    if (bonus !== undefined) {
      const n = Object.fromEntries(bonus.split('\n').map(x => x.match(/^(.+?)\s*[:：]?\s*([\d.]+%?)$/)).filter(Boolean).map(m => [m[1].trim(), m[2]]));
      const s = Object.fromEntries((c.attributeBonuses || c.statBonuses || []).map(a => [a.type, String(a.value)]));
      const d = [...new Set([...Object.keys(n), ...Object.keys(s)])].filter(k => n[k] !== s[k]).map(k => `${k} Notion ${n[k] ?? '없음'} · 사이트 ${s[k] ?? '없음'}`);
      if (d.length) push({ cat: '속성 보너스', text: d.join(', ') });
    }
    for (const m of missingInNotion) push({ cat: 'Notion에 없음', text: m });
    for (const m of missingInSite) push({ cat: '사이트에 없음', text: m });
  }
}

function matHint(diffs) {
  if (diffs.length === 1 && /^신용 포인트 Notion 없음/.test(diffs[0])) return 'Notion 줄 누락';
  if (diffs.some(d => /^운명의 발자취 Notion [\d]{4,}/.test(d))) return 'Notion 오타 의심';
  return undefined;
}

/** Explain a stat difference when the data itself shows which side slipped. */
function statHint(rows, c, characters, text) {
  if (onlyRoundingDiffs(text)) return '반올림 차이';
  const lv1 = c.baseStats?.lv1;
  const lv80 = c.baseStats?.lv80;
  if (lv1 && lv80 && siteTriple(lv1).join() === siteTriple(lv80).join()) return '사이트 Lv1 칸에 Lv80 값';
  // Notion rows identical to another character's site stats: likely pasted from that page.
  const sample = rows.find(r => r[0] === 50) || rows[rows.length - 1];
  if (sample) {
    const other = characters.find(o => o.id !== c.id && o.baseStats?.['lv' + sample[0]] && sameSet(siteTriple(o.baseStats['lv' + sample[0]]), [sample[1], sample[2], sample[3]]));
    if (other) return `Notion이 ${other.name} 스탯을 붙여 넣은 것으로 보임`;
  }
  return undefined;
}
