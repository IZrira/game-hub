import { Character } from '../../../../common-hub/types';

const drRatio: Character = {
  id: "dr_ratio",
  name: "Dr. 레이시오",
  folderName: "Dr. 레이시오",
  gameId: "hsr",
  attribute: "허수",
  path: "수렵",
  rarity: 5,
  affiliation: "지식학회",
  briefInfo: "지식학회 학자.\n성격이 기괴하고 말이 거칠지만 품위가 있다.\n기이한 석고 마스크 아래의 용모는 의외로 준수하다",
  version: "2.1",
  releaseVersion: "2.1",
  languageNames: "🇰🇷 Dr. 레이시오 / 🇺🇸 Dr. Ratio / 🇨🇳 真理医生 / 🇯🇵 Dr.レイシオ",
  voiceActors: "🇰🇷 이동훈 / 🇺🇸 조던 폴 하로 / 🇨🇳 상위쩌 / 🇯🇵 타케우치 슌스케",
  metadata: {
    name: "Dr. 레이시오",
    language: "🇰🇷 Dr. 레이시오 / 🇺🇸 Dr. Ratio / 🇨🇳 真理医生 / 🇯🇵 Dr.レイシオ",
    element: "허수",
    path: "수렵",
    rarity: 5,
    affiliation: "지식학회",
    cv: "🇰🇷 이동훈 / 🇺🇸 조던 폴 하로 / 🇨🇳 상위쩌 / 🇯🇵 타케우치 슌스케",
    releaseVersion: "2.1",
    brief: "지식학회 학자.\n성격이 기괴하고 말이 거칠지만 품위가 있다.\n기이한 석고 마스크 아래의 용모는 의외로 준수하다"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 106, "기초 방어력": 63 },
    lv20: { "기초 HP": 278, "기초 공격력": 206, "기초 방어력": 122 },
    lv30: { "기초 HP": 406, "기초 공격력": 301, "기초 방어력": 179 },
    lv40: { "기초 HP": 535, "기초 공격력": 396, "기초 방어력": 235 },
    lv50: { "기초 HP": 663, "기초 공격력": 491, "기초 방어력": 292 },
    lv60: { "기초 HP": 791, "기초 공격력": 586, "기초 방어력": 348 },
    lv70: { "기초 HP": 920, "기초 공격력": 681, "기초 방어력": 404 },
    lv80: { "기초 HP": 1048, "기초 공격력": 776, "기초 방어력": 461 },
    speed: 103,
    taunt: 75,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "진령칙부", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "9", rarity: 4 },
      { name: "짐승 사냥용 화살", count: "12", rarity: 2 },
      { name: "악마 사냥용 화살", count: "53", rarity: 3 },
      { name: "별 쫓는 화살", count: "101", rarity: 4 },
      { name: "약탈의 본능", count: "33", rarity: 2 },
      { name: "변조된 야망", count: "46", rarity: 3 },
      { name: "짓밟힌 의지", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "아는 것이 힘",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 Dr. 레이시오 공격력의 100%만큼 허수 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "지적 산파술",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적에게 Dr. 레이시오 공격력의 150%만큼 허수 속성 피해를 가한다.",
      icon: "skill_1"
    },
    {
      name: "삼단논법의 역설",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적에게 Dr. 레이시오 공격력의 240%만큼 허수 속성 피해를 가하고 [현자의 짧은 생각]을 부여한다.\nDr. 레이시오의 동료가 [현장의 짧은 생각]을 보유한 목표를 공격하면 Dr. 레이시오는 해당 목표에게 특성 추가 공격 1회 발동한다.\n[현자 짧은 생각] 효과는 최대 2회 발동되며, 가장 최근 Dr. 레이시오가 필살기를 발동한 목표에게만 적용된다. 필살기 발동 후 해당 효과 발동 횟수는 초기화된다.",
      icon: "ultimate_1"
    },
    {
      name: "나는 생각한다, 고로 존재한다",
      tag: "특성 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 10",
      description: "전투 스킬 발동 시 40%의 고정 확률로 해당 목표에게 추가 공격을 1회 발동하며, Dr. 레이시오 공격력의 270%만큼 허수 속성 피해를 가한다. 목표가 디버프 효과를 1개 보유 할 때마다 추가 공격을 발동할 고정 확률이 20% 증가한다.\n만약 추가 공격 발동 전에 목표가 처치되면 랜덤의 단일 적에게 추가 공격을 발동한다.",
      icon: "talent_1"
    },
    {
      name: "우상 형상화",
      tag: "비술 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 특수 영역을 만들어 주변의 적을 도발한다. 지속 시간: 10초. \n특수 영역 내의 적은 전투 진입 후 100%의 기본 확률로 각 단일 적의 속도를 15% 감소한다. 지속 시간: 2턴.\n아군이 생성한 영역 효과는 최대 1개만 존재할 수 있다.",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "귀납", description: "전투 스킬 발동 시 목표가 보유한 디버프 효과 1개당 Dr. 레이시오의 치명타 확률이 2.5% 증가하고, 치명타 피해가 5% 증가한다. 최대 중첩수: 6스택", icon: "bonus_1" },
    { name: "연역", description: "전투 스킬을 발동하여 적을 공격하면 100%의 기본 확률로 피격된 적의 효과 저항이 10% 감소한다. 지속 시간: 2턴", icon: "bonus_2" },
    { name: "추리", description: "피해를 가할 시 목표의 디버프 상태가 3개 이상일 경우, 목표가 보유한 디버프 효과 1개당 Dr. 레이시오가 해당 목표에게 가하는 피해가 10% 증가하며, 최대 50% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "방어력", value: "12.5%", icon: "def" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "교만은 재앙을 낳는다", description: "행적 [귀납]의 중첩 스택 수 상한이 4스택 증가한다. 전투 시작 시 [귀납] 4스택을 즉시 획득한다. 먼저 행적 [귀납]을 개방해야 한다", icon: "eidolon_1" },
    { rank: "E02", name: "작은 것에 숨겨진 진리", description: "특성의 추가 공격이 목표를 명중할 시, 목표가 디버프 효과를 1개 보유할 때마다 추가로 Dr. 레이시오 공격력의 20%만큼 허수 속성 추가 피해를 가한다. 해당 효과는 추가 공격을 할 때마다 최대 4회 발동된다", icon: "eidolon_2" },
    { rank: "E03", name: "너 자신을 알라", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "맹목은 미련을 낳는다", description: "특성 발동 시 Dr. 레이시오가 추가로 에너지를 15pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "노 없는 배는 바다를 건널 수 없다", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "영원한 것은 진리뿐", description: "[현자의 짧은 생각]의 발동 효과가 추가로 1회 증가하고, 특성의 추가 공격으로 가하는 피해가 50% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "고정 확률": "어떤 요인에도 영향을 받지 않는 고정 확률이다.",
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다.",
    "도발": "적의 공격 목표가 자신으로 고정된다.",
    "[현자의 짧은 생각]": "Dr. 레이시오가 필살기로 부여하는 특수 효과. 동료가 해당 목표를 공격 시 Dr. 레이시오가 추가 공격을 발동한다."
  }
};

export default drRatio;
