import { REPOSITORY_IMAGE_BASE } from '../../common-hub/utils/imageSources';
import characterData from '../data/characters.json';
import kiboData from '../data/kibo.json';
import type { AzurCharacter, AzurKibo } from '../types';

export const AZUR_ACCENT = '#38bdf8';
export const AZUR_CHARACTERS = (characterData as AzurCharacter[]).slice().sort((a, b) => a.releaseOrder - b.releaseOrder);
export const AZUR_KIBO = (kiboData as AzurKibo[]).slice().sort((a, b) => a.no - b.no);
export const AZUR_JOBS = ['폭발', '파괴', '강공', '증폭', '부여'] as const;
export const AZUR_ELEMENTS = ['불', '얼음', '나무', '바람', '땅', '번개', '물', '빛', '어둠', '무'] as const;

/** 스킬·직업이 채워진 캐릭터만 「정리됨」으로 본다. */
export const isFilled = (character: AzurCharacter) => Boolean(character.job && character.basicAttack);
export const findAzurCharacter = (name: string) => AZUR_CHARACTERS.find(character => character.name === name);
export const azurCharacterPath = (name: string) => `/gallery/azur/character/${encodeURIComponent(name)}`;

const image = (path: string) => encodeURI(`${REPOSITORY_IMAGE_BASE}/azur images/${path}`);
export const azurPortrait = (name: string) => image(`skills/${name}/${name}.webp`);
export const azurSkillImage = (name: string, file: string) => image(`skills/${name}/${file}.webp`);
export const azurElementIcon = (element: string) => image(`common/attribute/${element}.webp`);
export const azurJobIcon = (job: string) => image(`common/class/${job}.webp`);
export const azurRarityIcon = (rarity: string) => image(`common/rarity/${rarity}.webp`);
export const azurKiboImage = (file: string) => image(`kibo/${file}`);
export const azurGuideImage = (file: string) => image(`guides/attribute/${file}.webp`);

export const splitLines = (value: string) => value.split('\n').map(line => line.trim()).filter(Boolean);

/** "제목\n설명…\n\n제목\n설명…" 형식의 스킬 원문을 블록으로 나눈다. */
export const parseSkillBlocks = (value: string) => value.split(/\n\s*\n/).map(block => splitLines(block)).filter(lines => lines.length).map(([title, ...lines]) => ({ title, lines }));

/** "이름: 설명" 줄 목록 (전투 포지션) */
export const parsePositions = (value: string) => splitLines(value).map(line => {
  const index = line.indexOf(':');
  return index > 0 ? { name: line.slice(0, index).trim(), text: line.slice(index + 1).trim() } : { name: line, text: '' };
});

/* ---------- 원소 상성 (공격하는 쪽 기준) ---------- */
export const ELEMENT_MATCHUPS: Record<string, { strong: string[]; weak: string[] }> = {
  불: { strong: ['얼음', '나무'], weak: ['땅', '물'] },
  얼음: { strong: ['나무', '번개'], weak: ['불', '바람'] },
  나무: { strong: ['바람', '물'], weak: ['불', '얼음'] },
  바람: { strong: ['얼음', '땅'], weak: ['나무', '번개'] },
  땅: { strong: ['불', '번개'], weak: ['바람', '물'] },
  번개: { strong: ['바람', '물'], weak: ['얼음', '땅'] },
  물: { strong: ['불', '땅'], weak: ['나무', '번개'] },
  빛: { strong: ['어둠'], weak: [] },
  어둠: { strong: ['빛'], weak: [] },
  무: { strong: [], weak: [] },
};

/** 실서 인장(1~2개) → 실서 초과(3개) 효과 */
export const ELEMENT_SEALS: Array<{ element: string; seal: string; sealText: string; overload: string; overloadText: string }> = [
  { element: '불', seal: '작열', sealText: '인장 수만큼 불 지속 피해를 주고, 적이 받는 피해 비율을 높인다.', overload: '열염', overloadText: '불 피해를 한 번 주고, 일정 시간 불 지속 피해를 준다.' },
  { element: '얼음', seal: '한랭', sealText: '인장 수만큼 물리·마법 방어력을 낮춘다.', overload: '취약', overloadText: '얼음 피해를 한 번 주고 적을 빙결시킨다.' },
  { element: '나무', seal: '기생', sealText: '인장 수만큼 나무 지속 피해를 주고 이동 속도를 낮춘다.', overload: '만개', overloadText: '대상과 주변 적에게 나무 피해를 한 번 주고, 자신의 체력을 일정 비율 회복한다.' },
  { element: '바람', seal: '풍절', sealText: '인장 수만큼 바람 지속 피해를 주고, 적이 받는 일반 공격·스킬 피해를 높인다.', overload: '풍와', overloadText: '바람 피해를 한 번 주고 범위 안의 적을 끌어당긴다.' },
  { element: '땅', seal: '중압', sealText: '인장 수만큼 땅 지속 피해를 주고, 적이 받는 강공·낙공·특수 스킬 피해를 높인다.', overload: '초중', overloadText: '대상과 주변 적에게 땅 피해를 한 번 주고, 적이 받는 브레이크 게이지 피해를 높인다.' },
  { element: '번개', seal: '뇌명', sealText: '적이 피해를 받을 때마다 인장 수만큼 번개 추가 피해를 준다.', overload: '뇌폭', overloadText: '대상과 주변 적에게 번개 피해를 한 번 주고 연쇄 번개를 만든다.' },
  { element: '물', seal: '교란', sealText: '인장 수만큼 적이 주는 피해량을 일정 비율 낮춘다.', overload: '침수', overloadText: '물 피해를 한 번 주고, 아군 전원의 스킬 재사용 대기시간을 줄인다.' },
  { element: '빛', seal: '노출', sealText: '인장 수만큼 일정 주기마다 빛 피해를 준다.', overload: '폭사', overloadText: '빛 고정 피해를 한 번 준다.' },
  { element: '어둠', seal: '침식', sealText: '인장 수만큼 모든 원소 피해 저항을 낮춘다.', overload: '붕괴', overloadText: '어둠 피해를 한 번 주고, 모든 원소 피해 저항을 더 낮춘다.' },
];

export const JOB_DESCRIPTIONS: Record<string, string> = {
  폭발: '폭발적인 딜링으로 큰 피해를 준다. 속성 각인을 소모하지 않아도 높은 피해가 나온다.',
  파괴: '아머 파괴 전문. 속성 각인을 안정적으로 소모해 적의 아머 게이지를 크게 깎는다.',
  강공: '꾸준히 높은 피해를 주면서, 속성 각인을 빠르게 소모해 피해를 더 끌어올린다.',
  증폭: '속성 각인을 효율적으로 쌓아 아군이 딜하기 좋은 상황을 만든다.',
  부여: '여러 지원 능력으로 동료에게 버프를 주고, 속성 각인을 소모해 그 버프를 키운다.',
};
