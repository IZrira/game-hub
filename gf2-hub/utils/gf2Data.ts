import { REPOSITORY_IMAGE_BASE } from '../../common-hub/utils/imageSources';
import summaryData from '../data/generated/summary.json';
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
export const gf2SkillImage = (doll: Pick<Gf2DollSummary, 'imageFolder'>, file: string) => image(`skills/${doll.imageFolder}/${file}.webp`);
export const gf2JobIcon = (job: string) => image(`common/class/${job}.webp`);
export const gf2ElementIcon = (element: string) => image(`common/damage-types/${element}.webp`);
export const gf2StatIcon = (stat: string) => image(`common/stats/${stat}.webp`);

const detailModules = import.meta.glob<{ default: Omit<Gf2Doll, 'id'> }>('../data/generated/dolls/*.json');

/** 인형별 상세 파일은 상세 페이지에서만 불러온다. */
export async function loadGf2Doll(name: string): Promise<Gf2Doll | null> {
  const doll = findGf2Doll(name);
  if (!doll) return null;
  const loader = detailModules[`../data/generated/dolls/${String(doll.releaseOrder).padStart(3, '0')}.json`];
  if (!loader) return null;
  return (await loader()).default as Gf2Doll;
}

/* ---------- Notion 원문 텍스트 파서 ---------- */

const blocks = (value: string) => value.split(/\n\s*\n/).map(block => block.split('\n').map(line => line.trim()).filter(Boolean)).filter(lines => lines.length);

export interface Gf2Skill {
  name: string;
  tags: string[];
  meta: Array<{ label: string; value: string }>;
  lines: string[];
}

const META = /^(턴 쿨타임|리몰딩 소모|안정 피해)\s*:\s*(.+)$/;
const AMMO_LINE = /^(경량탄|표준탄|중량탄|산탄|근접)(\s*\/\s*\S+)?$/;

/** "이름\n유형 / 태그\n턴 쿨타임: 1\n설명…" 형식. 빈 줄로 나뉜 뒤 블록은 소환물·교체 스킬이다. */
export function parseSkills(value: string): Gf2Skill[] {
  return blocks(value).map(([name, tagLine = '', ...rest]) => {
    const tags = tagLine.split('/').map(tag => tag.trim()).filter(Boolean);
    const meta: Gf2Skill['meta'] = [];
    const lines: string[] = [];
    for (const line of rest) {
      const match = line.match(META);
      if (match) meta.push({ label: match[1], value: match[2] });
      else if (!lines.length && AMMO_LINE.test(line)) tags.push(...line.split('/').map(tag => tag.trim()));
      else lines.push(line);
    }
    return { name, tags, meta, lines };
  });
}

/** "공격 : 955" 줄 목록 */
export const parseStats = (value: string) => value.split('\n').map(line => line.match(/^(.+?)\s*:\s*(.+)$/)).filter(Boolean).map(match => ({ label: match![1].trim(), value: match![2].trim() }));

/** 제목 줄 + 설명 줄로 된 블록 (마인드 보강·뉴럴 헬릭스·리몰딩 코어) */
export const parseTitledBlocks = (value: string) => blocks(value).map(([title, ...lines]) => ({ title, lines }));

/** "용어 : 설명" 블록 */
export const parseTerms = (value: string) => blocks(value).map(lines => lines.join(' ')).map(line => line.match(/^(.+?)\s+:\s+(.+)$/)).filter(Boolean).map(match => ({ term: match![1], description: match![2] }));

export const splitLines = (value: string) => value.split('\n').map(line => line.trim()).filter(Boolean);
