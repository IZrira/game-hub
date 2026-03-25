
import { Character } from '../../../../common-hub/types';

const guinaifen: Character = {
  id: "guinaifen",
  gameId: "hsr",
  name: "계네빈",
  folderName: "계네빈",
  attribute: "화염",
  path: "공허",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」에 방문한 행위 예술가——혹은 길거리 예술가. 삼시세끼가 보장된 상황에서 자신의 새로운 삶을 나부에서 추구하고 있다",
  version: "1.4",
  releaseVersion: "1.4",
  languageNames: "🇰🇷 계네빈 / 🇺🇸 Guinaifen / 🇨🇳 桂乃芬 / 🇯🇵 桂乃芬",
  voiceActors: "🇰🇷 김수영 / 🇺🇸 모건 개릿 / 🇨🇳 샤오간 / 🇯🇵 스구타 히나",
  metadata: {
    name: "계네빈",
    language: "🇰🇷 계네빈 / 🇺🇸 Guinaifen / 🇨🇳 桂乃芬 / 🇯🇵 桂乃芬",
    element: "화염",
    path: "공허",
    rarity: 4,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 김수영 / 🇺🇸 모건 개릿 / 🇨🇳 샤오간 / 🇯🇵 스구타 히나",
    releaseVersion: "1.4",
    brief: "선주 「나부」에 방문한 행위 예술가——혹은 길거리 예술가. 삼시세끼가 보장된 상황에서 자신의 새로운 삶을 나부에서 추구하고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 120, "기초 공격력": 79, "기초 방어력": 60 },
    lv20: { "기초 HP": 234, "기초 공격력": 154, "기초 방어력": 117 },
    lv30: { "기초 HP": 342, "기초 공격력": 226, "기초 방어력": 171 },
    lv40: { "기초 HP": 450, "기초 공격력": 297, "기초 방어력": 225 },
    lv50: { "기초 HP": 558, "기초 공격력": 368, "기초 방어력": 279 },
    lv60: { "기초 HP": 666, "기초 공격력": 440, "기초 방어력": 333 },
    lv70: { "기초 HP": 774, "기초 공격력": 511, "기초 방어력": 387 },
    lv80: { "기초 HP": 882, "기초 공격력": 582, "기초 방어력": 441 },
    speed: 106,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "과열된 강철 칼날", count: "50", rarity: 4 },
      { name: "공조 기계 부품", count: "12", rarity: 2 },
      { name: "공조 톱니바퀴", count: "13", rarity: 3 },
      { name: "공조 환류 심장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "54", rarity: 3 },
      { name: "타락의 흑요", count: "105", rarity: 4 },
      { name: "공조 기계 부품", count: "28", rarity: 2 },
      { name: "공조 톱니바퀴", count: "42", rarity: 3 },
      { name: "공조 환류 심장", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "박수갈채",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 계네빈 공격력 100%만큼의 화염 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "좋은 출발",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 계네빈 공격력 120%만큼의 화염 속성 피해를 가하고, 인접한 목표에게 계네빈 공격력 40%만큼의 화염 속성 피해를 가하고, 100%의 기본 확률로 목표와 인접한 목표를 연소 상태에 빠트린다. 연소 상태에서 적은 턴이 시작될 때마다 계네빈 공격력 218.21%만큼의 화염 속성 지속 피해를 받는다. 지속 시간: 2턴",
      icon: "skill_1"
    },
    {
      name: "훌륭한 공연을 보여드리겠습니다!",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적에게 계네빈 공격력 120%만큼의 화염 속성 피해를 가하고, 목표가 연소 상태면 현재 받는 연소 상태는 즉시 기존 피해 92%만큼의 피해를 생성한다.",
      icon: "ultimate_1"
    },
    {
      name: "군자가 예술가를 키운다",
      tag: "특성 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "계네빈이 필드에 있을 때 적이 받은 연소 상태가 피해를 발동하면 100%의 기본 확률로 [불쇼] 상태에 빠지고 [불쇼] 상태에서 적이 받는 피해가 7% 증가한다. 지속 시간: 3턴. 최대 중첩수: 3스택",
      icon: "talent_1"
    },
    {
      name: "재주 선보이기",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "적을 바로 공격하며, 전투 진입 후 피해를 4회 가한다. 피해를 가할 때마다 임의의 적에게 계네빈 공격력 50%만큼의 화염 속성 피해를 가하고 목표를 [불쇼] 상태에 빠뜨린다.",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "장대 타기", description: "일반 공격이 80%의 기본 확률로 적을 전투 스킬과 동일한 연소 상태에 빠트린다", icon: "bonus_1" },
    { name: "장애물 통과", description: "전투 시작 시 계네빈의 행동 게이지가 25% 증가한다", icon: "bonus_2" },
    { name: "칼날 위 걷기", description: "연소 상태에 빠진 적에게 가하는 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "화염 속성 피해 증가", value: "22.4%", icon: "fire_dmg" },
    { type: "격파 특수효과", value: "24%", icon: "break_effect" },
    { type: "효과 명중", value: "10%", icon: "effect_hit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "거꾸로 서서 국수 먹기", description: "전투 스킬 발동 시 100%의 기본 확률로 피격된 적의 효과 저항이 10% 감소한다. 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "양치질하면서 휘파람 불기", description: "적이 연소 상태면 계네빈의 일반 공격과 전투 스킬이 해당 적에게 부여하는 연소 상태의 피해 배율이 40% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "가슴에 얹은 바위 깨기", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "창으로 목 찌르기", description: "계네빈이 부여한 연소 상태 피해가 발동할 때마다 자신의 에너지를 2pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "허리까지 검 삼키기", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "맨손으로 총알 받기", description: "[불쇼]의 중첩 가능 스택 수가 1스택 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 25% 증가하여 행동 순서가 앞당겨진다.",
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "[불쇼]": "계네빈 특성으로 인해 적이 받는 피해가 증가하는 디버프 상태."
  }
};

export default guinaifen;
