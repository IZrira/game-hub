import { REPOSITORY_IMAGE_BASE } from '../../common-hub/utils/imageSources';
import summaryData from '../data/generated/summary.json';
import GF2_SKIN_PARTS from '../data/generated/skin-parts.json';
import type { Gf2Doll, Gf2DollSummary } from '../types';

/** 출시 순서(오래된 것 → 최신) */
export const GF2_DOLLS = (summaryData as Gf2DollSummary[]).slice().sort((a, b) => a.releaseOrder - b.releaseOrder);
export const GF2_JOBS = ['불워크', '센티널', '뱅가드', '서포트'] as const;
export const GF2_ELEMENTS = ['물리', '산성', '연소', '탁류', '전도', '공진', '빙결'] as const;
export const GF2_AMMO = ['경량탄', '표준탄', '중량탄', '산탄', '근접'] as const;

export const gf2DollPath = (name: string) => `/gallery/gf2/character/${encodeURIComponent(name)}`;
export const findGf2Doll = (name: string) => GF2_DOLLS.find(doll => doll.name === name);

const image = (path: string) => encodeURI(`${REPOSITORY_IMAGE_BASE}/gf2 images/${path}`);
export const gf2Portrait = (doll: Pick<Gf2DollSummary, 'imageFolder'>) => image(`skills/${doll.imageFolder}/${doll.imageFolder}.webp`);
/** 파츠 교체 스킨은 저장소에 `skins/<스킨>/대표.webp`로 들어 있다. 단일 파일이 없을 때 쓴다. */
export const gf2SkinFallbackImage = (doll: Pick<Gf2DollSummary, 'imageFolder'>, skin: string) => image(`skills/${doll.imageFolder}/skins/${skin}/대표.webp`);
export const gf2SkinPartImage = (doll: Pick<Gf2DollSummary, 'imageFolder'>, skin: string, part: string) => image(`skills/${doll.imageFolder}/skins/${skin}/${part}.webp`);
/** 파츠 교체 스킨의 파츠 파일 이름 목록(npm run generate:gf2-skin-parts로 저장소에서 만든다). */
export const gf2SkinParts = (doll: Pick<Gf2DollSummary, 'imageFolder'>, skin: string): string[] =>
  (GF2_SKIN_PARTS as Record<string, Record<string, string[]>>)[doll.imageFolder]?.[skin] || [];
export const gf2SkillImage = (doll: Pick<Gf2DollSummary, 'imageFolder'>, file: string) => image(`skills/${doll.imageFolder}/${file}.webp`);
export const gf2JobIcon = (job: string) => image(`common/class/${job}.webp`);
export const gf2ElementIcon = (element: string) => image(`common/damage-types/${element}.webp`);
export const gf2StatIcon = (stat: string) => image(`common/stats/${stat}.webp`);
export const gf2CommonKeyImage = (name: string) => image(`common/keys/공용키/${name}.webp`);

const detailModules = import.meta.glob<{ default: Omit<Gf2Doll, 'id'> }>('../data/generated/dolls/*.json');

/** 인형별 상세 파일은 상세 페이지에서만 불러온다. */
export async function loadGf2Doll(name: string): Promise<Gf2Doll | null> {
  const doll = findGf2Doll(name);
  if (!doll) return null;
  const loader = detailModules[`../data/generated/dolls/${String(doll.releaseOrder).padStart(3, '0')}.json`];
  if (!loader) return null;
  return (await loader()).default as Gf2Doll;
}

/* ---------- Notion 원문 텍스트 파서 ----------
 * 인형마다 입력 시기에 따라 형식이 다르다(빈 줄 유무, "턴 쿨타임 2"와 "턴 쿨타임: 2",
 * "중추·Ⅰ — 결전기: …" 한 줄 표기 등). 화면은 아래 파서가 정리한 구조만 쓴다. */

export const splitLines = (value: string) => value.split('\n').map(line => line.trim()).filter(Boolean);

export interface Gf2SkillPart {
  /** skill: 스킬, unit: 소환물·조립체 같은 개체 이름과 능력치 */
  kind: 'skill' | 'unit';
  name: string;
  /** 스킬 유형(액티브 등) */
  type?: string;
  tags: string[];
  meta: Array<{ label: string; value: string }>;
  lines: string[];
}

const SKILL_TYPE = /^(일반\s?공격|액티브|패시브|결전기)/;
const TAG_LINE = /^(일반\s?공격|액티브|패시브|결전기)(\s*\/.*)?$/;
const TYPE_PREFIXED = /^(일반\s?공격|액티브|패시브|결전기)\s*:\s*(.+)$/;
const META = /^(턴 쿨타임|리몰딩 소모|안정 피해)\s*:?\s*(\d+)(?:점)?\.?\s*(.*)$/;
const AMMO_LINE = /^(경량탄|표준탄|중량탄|산탄|근접)(\s*\/\s*\S+)?$/;
const isShortTitle = (line: string) => line.length <= 26 && !/[.。]$/.test(line) && !META.test(line);
const normalizeType = (type: string) => (type.replace(/\s+/g, '') === '일반공격' ? '일반 공격' : type);

/** 스킬 원문을 본 스킬 + 하위 항목(교체 스킬, 소환물과 그 스킬)으로 나눈다. */
export function parseSkillText(value: string): Gf2SkillPart[] {
  const parts: Gf2SkillPart[] = [];
  const blocks = value.split(/\n\s*\n/).map(block => splitLines(block)).filter(lines => lines.length);
  const start = (part: Pick<Gf2SkillPart, 'kind' | 'name'> & Partial<Gf2SkillPart>) => {
    const next: Gf2SkillPart = { tags: [], meta: [], lines: [], ...part };
    parts.push(next);
    return next;
  };
  const setTags = (part: Gf2SkillPart, tagLine: string) => {
    const tags = tagLine.split('/').map(tag => tag.trim()).filter(Boolean);
    if (SKILL_TYPE.test(tags[0] || '')) part.type = normalizeType(tags.shift()!);
    part.tags.push(...tags);
  };
  const addLine = (part: Gf2SkillPart, line: string) => {
    const meta = line.match(META);
    if (meta) {
      part.meta.push({ label: meta[1], value: meta[2] });
      if (meta[3]) part.lines.push(meta[3]);
    } else if (!part.lines.length && AMMO_LINE.test(line)) {
      part.tags.push(...line.split('/').map(tag => tag.trim()));
    } else {
      part.lines.push(line);
    }
  };
  /** 블록 안 i번째 줄이 새 스킬의 시작이면 그 스킬을 만들고 다음에 읽을 위치를, 아니면 -1을 돌려준다. */
  const tryStartSkill = (lines: string[], i: number): number => {
    const line = lines[i];
    const prefixed = line.match(TYPE_PREFIXED);
    if (prefixed && isShortTitle(prefixed[2])) {
      const part = start({ kind: 'skill', name: prefixed[2].trim(), type: normalizeType(prefixed[1]) });
      if (TAG_LINE.test(lines[i + 1] || '')) { setTags(part, lines[i + 1]); return i + 2; }
      return i + 1;
    }
    const dashed = line.match(/^(.+?)\s+[—–]\s+(.+)$/);
    if (dashed && dashed[1].length <= 20) {
      const isSkill = TAG_LINE.test(dashed[2]);
      // "보안 감시 — 중추·Ⅴ에서 추가되는 패시브"처럼 설명 끝에 유형이 붙은 경우
      const trailingType = dashed[2].match(/(일반\s?공격|액티브|패시브|결전기)$/)?.[1];
      const part = start({ kind: isSkill || trailingType ? 'skill' : 'unit', name: dashed[1].trim(), type: trailingType && normalizeType(trailingType) });
      if (isSkill) setTags(part, dashed[2]);
      else part.lines.push(dashed[2]);
      return i + 1;
    }
    if (isShortTitle(line) && TAG_LINE.test(lines[i + 1] || '')) {
      const part = start({ kind: 'skill', name: line });
      setTags(part, lines[i + 1]);
      return i + 2;
    }
    return -1;
  };

  blocks.forEach((lines, blockIndex) => {
    let i = 0;
    if (blockIndex === 0) {
      const part = start({ kind: 'skill', name: lines[0] });
      const hasTagLine = lines[1] !== undefined && !META.test(lines[1]) && !AMMO_LINE.test(lines[1]);
      if (hasTagLine) setTags(part, lines[1]);
      i = hasTagLine ? 2 : 1;
    } else if (!META.test(lines[0]) && isShortTitle(lines[0])) {
      const next = tryStartSkill(lines, 0);
      if (next >= 0) i = next;
      else { start({ kind: 'unit', name: lines[0] }); i = 1; }
    }
    // 그 밖의 블록(안정 피해·설명이 빈 줄 뒤에 온 경우)은 바로 앞 항목에 붙인다.
    for (; i < lines.length; i++) {
      const next = blockIndex > 0 ? tryStartSkill(lines, i) : -1;
      if (next >= 0) { i = next - 1; continue; }
      addLine(parts[parts.length - 1], lines[i]);
    }
  });
  return parts;
}

/** "공격 : 955" 줄 목록 */
export const parseStats = (value: string) => splitLines(value).map(line => line.match(/^(.+?)\s*:\s*(.+)$/)).filter(Boolean).map(match => ({ label: match![1].trim(), value: match![2].trim() }));

const ROMAN = '[ⅠⅡⅢⅣⅤⅥ]';
const MIND_TITLE = new RegExp(`^중추\\s*·\\s*(${ROMAN})\\s*(?:[—–-]\\s*(.+))?$`);

/** 마인드 보강(중추 Ⅰ~Ⅵ). 빈 줄이 없거나 "중추·Ⅰ — 결전기: … Lv.2" 한 줄 형식도 받는다. */
export function parseMind(value: string) {
  const out: Array<{ title: string; upgrade: string; lines: string[] }> = [];
  for (const line of splitLines(value)) {
    const title = line.match(MIND_TITLE);
    if (title) { out.push({ title: `중추 ${title[1]}`, upgrade: title[2]?.trim() || '', lines: [] }); continue; }
    const current = out[out.length - 1];
    if (!current) continue;
    if (!current.upgrade && !current.lines.length && (/Lv\.\s?\d+$/.test(line) || TYPE_PREFIXED.test(line))) current.upgrade = line;
    else current.lines.push(line);
  }
  return out;
}

export interface Gf2HelixKey { kind: string; name: string; stats: string[]; lines: string[] }

/** 뉴럴 헬릭스: 고유키 N-NN·도약키·공용키 */
export function parseHelix(value: string): Gf2HelixKey[] {
  const out: Gf2HelixKey[] = [];
  const lines = splitLines(value);
  for (let i = 0; i < lines.length; i++) {
    const head = lines[i].match(/^(고유키 \d-\d{2}|도약키|공용키|고유키 활성 시 능력치)(?:\s*[/—–]\s*(.+))?$/);
    if (head) {
      const name = head[1] === '고유키 활성 시 능력치' ? '' : head[2]?.trim() || lines[++i] || '';
      out.push({ kind: head[1], name, stats: [], lines: [] });
      continue;
    }
    const current = out[out.length - 1];
    if (!current) continue;
    if (!current.lines.length && /^[가-힣 ]+\s*\+?\d+(\.\d+)?%$/.test(lines[i])) current.stats.push(lines[i]);
    else current.lines.push(lines[i]);
  }
  return out;
}

const STAGE = /^(배아|떡잎|꽃눈|꽃봉오리|꽃망울|꽃)\s*(?:[/(]?\s*Lv\.\s?(\d+)\s*\)?)?\s*(?::\s*(.*))?$/;

/** 리몰딩 코어: 레벨 업 재화, Lv.60 능력치, 현상 단계(배아~꽃), 성장 데이터 슬롯 */
export function parseCore(value: string) {
  const costs: Array<{ label: string; value: string }> = [];
  const stats: Array<{ label: string; value: string }> = [];
  const stages: Array<{ name: string; level: string; text: string }> = [];
  let slots = '';
  let mode: 'costs' | 'stats' | 'stages' | 'slots' | '' = '';
  for (const line of splitLines(value)) {
    if (/소모 재화$/.test(line)) { mode = 'costs'; continue; }
    if (/^(리몰딩 코어 )?Lv\.?\s?\d+ 능력치$/.test(line)) { mode = 'stats'; continue; }
    if (line === '현상 이미지') { mode = 'stages'; continue; }
    if (line === '성장 데이터 슬롯') { mode = 'slots'; continue; }
    const inlineStats = line.match(/^Lv\.?\s?\d+ 능력치\s*:\s*(.+)$/)?.[1] ?? (mode === 'stats' && line.includes('/') ? line : '');
    if (inlineStats) {
      for (const part of inlineStats.split('/')) {
        const match = part.trim().match(/^(\S+)\s*\+?(\d[\d,.]*)$/);
        if (match) stats.push({ label: match[1], value: match[2] });
      }
      continue;
    }
    const stage = line.match(STAGE);
    if (stage) { stages.push({ name: stage[1], level: stage[2] || '', text: stage[3]?.trim() || '' }); mode = 'stages'; continue; }
    const pair = line.match(/^(.+?)\s*:\s*(.+)$/);
    if (mode === 'costs' && pair) { costs.push({ label: pair[1], value: pair[2] }); continue; }
    if (mode === 'stats' && pair) { stats.push({ label: pair[1], value: pair[2] }); continue; }
    if (mode === 'slots') { slots = slots ? `${slots}, ${line}` : line; continue; }
    const last = stages[stages.length - 1];
    if (mode === 'stages' && last) last.text = last.text ? `${last.text} ${line}` : line;
  }
  return { costs, stats, stages, slots };
}

/** 용어 표기는 "이동_감소Ⅱ"처럼 밑줄이 섞여 있어 본문 표기(공백)에 맞춘다. */
export const normalizeTerm = (term: string) => term.replace(/_/g, ' ').replace(/\s+/g, ' ').trim();

const TERM_LINE = /^(.{1,30}?)\s+:\s+(.+)$/;
const TERM_LINE_TIGHT = /^(.{1,30}?):\s+(.+)$/;

/** "용어 : 설명" 또는 "용어: 설명". 빈 줄이 없어도 새 용어 줄에서 나눈다. */
export function parseTerms(value: string) {
  const entries: Array<{ term: string; description: string }> = [];
  const seen = new Set<string>();
  for (const block of value.split(/\n\s*\n/)) {
    for (const line of splitLines(block)) {
      const match = line.match(TERM_LINE) || line.match(TERM_LINE_TIGHT);
      if (match) {
        const term = normalizeTerm(match[1]);
        if (seen.has(term)) { entries.push({ term: '', description: '' }); continue; }
        seen.add(term);
        entries.push({ term, description: match[2].trim() });
      } else if (entries.length && entries[entries.length - 1].term) {
        entries[entries.length - 1].description += ` ${line}`;
      }
    }
  }
  return entries.filter(entry => entry.term);
}
