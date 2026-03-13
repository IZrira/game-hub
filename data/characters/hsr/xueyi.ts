
import { Character } from '../../../types';

const xueyi: Character = {
  id: "xueyi",
  gameId: "hsr",
  name: "설의",
  folderName: "설의",
  attribute: "양자",
  path: "파멸",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」에서 생사를 관찰하는 「시왕사」의 판관. 이미 죽은 지 오래지만, 만든 몸을 빌려 「환생」하여 사명을 이행한다",
  version: "1.6",
  releaseVersion: "1.6",
  languageNames: "🇰🇷 설의 / 🇺🇸 Xueyi / 🇨🇳 雪衣 / 🇯🇵 雪衣",
  voiceActors: "🇰🇷 박리나 / 🇺🇸 제니 요코보리 / 🇨🇳 쑤쉰 / 🇯🇵 카와세 마키",
  metadata: {
    name: "설의",
    language: "🇰🇷 설의 / 🇺🇸 Xueyi / 🇨🇳 雪衣 / 🇯🇵 雪衣",
    element: "양자",
    path: "파멸",
    rarity: 4,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 박리나 / 🇺🇸 제니 요코보리 / 🇨🇳 쑤쉰 / 🇯🇵 카와세 마키",
    releaseVersion: "1.6",
    brief: "선주 「나부」에서 생사를 관찰하는 「시왕사」의 판관. 이미 죽은 지 오래지만, 만든 몸을 빌려 「환생」하여 사명을 이행한다"
  },
  baseStats: {
    lv1: { "기초 HP": 144, "기초 공격력": 82, "기초 방어력": 54 },
    lv20: { "기초 HP": 281, "기초 공격력": 159, "기초 방어력": 105 },
    lv30: { "기초 HP": 410, "기초 공격력": 233, "기초 방어력": 154 },
    lv40: { "기초 HP": 540, "기초 공격력": 306, "기초 방어력": 203 },
    lv50: { "기초 HP": 670, "기초 공격력": 379, "기초 방어력": 251 },
    lv60: { "기초 HP": 799, "기초 공격력": 453, "기초 방어력": 300 },
    lv70: { "기초 HP": 929, "기초 공격력": 526, "기초 방어력": 348 },
    lv80: { "기초 HP": 1058, "기초 공격력": 600, "기초 방어력": 397 },
    speed: 103,
    taunt: 125,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "괴수의 못", count: "50", rarity: 4 },
      { name: "소멸된 코어", count: "12", rarity: 2 },
      { name: "희미한 빛의 코어", count: "13", rarity: 3 },
      { name: "꿈틀대는 코어", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "12", rarity: 4 },
      { name: "부서진 칼날", count: "12", rarity: 2 },
      { name: "무생의 칼날", count: "54", rarity: 3 },
      { name: "정화의 칼날", count: "105", rarity: 4 },
      { name: "소멸된 코어", count: "28", rarity: 2 },
      { name: "희미한 빛의 코어", count: "42", rarity: 3 },
      { name: "꿈틀대는 코어", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "파마추",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 설의 공격력의 100%만큼 양자 속성 피해를 준다",
      icon: "basic_atk_1"
    },
    {
      name: "죄악 진압",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 설의 공격력의 140%만큼 양자 속성 피해를 주고, 동시에 인접한 목표에게 설의 공격력의 70%만큼 양자 속성 피해를 준다",
      icon: "skill_1"
    },
    {
      name: "관통하는 천벌",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 40",
      description: "지정된 단일 적에게 설의 공격력의 250%만큼 양자 속성 피해를 준다. 이번 공격은 약점 속성을 무시하고 단일 적의 강인성을 소모시킨다. 약점 격파 시 양자 속성의 약점 격파 효과가 발동된다. 이번 공격에서 소모된 강인성이 많을수록 가하는 피해가 증가하며, 최대 60% 증가한다",
      icon: "ultimate_1"
    },
    {
      name: "시왕의 심판, 업보 불변",
      tag: "특성 | 바운스",
      energyRegen: "에너지 회복 2",
      toughnessDMG: "약점 격파 단일 공격 5",
      description: "설의의 공격으로 적의 강인성을 소모하면, [업보] 스택 수를 중첩한다. 소모된 강인성이 많을수록 중첩되는 [업보] 스택 수가 증가한다. 최대 중첩수: 8스택\n설의 동료의 공격으로 적의 강인성을 소모하면, 설의는 [업보]를 1스택 중첩한다.\n[업보]를 최대치까지 중첩하면 현재 모든 [업보]를 소모하고 즉시 적에게 추가 공격을 발동해 피해를 3회 주고, 피해를 줄 때마다 랜덤 단일 적에게 설의 공격력의 90%만큼 양자 속성 피해를 준다. 해당 추가 공격은 [업보]를 중첩할 수 없다",
      icon: "talent_1"
    },
    {
      name: "즉참",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "적을 바로 공격하며, 전투 진입 후 모든 적에게 설의 공격력의 80%만큼 양자 속성 피해를 준다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "예지 장치", description: "자신이 가하는 피해를 격파 특수효과의 100%만큼 증가시킨다. 최대 240% 증가한다", icon: "bonus_1" },
    { name: "서슬 축수", description: "적의 현재 강인성이 본인 강인성 최대치의 50% 이상일 경우, 필살기로 가하는 피해가 10% 증가한다", icon: "bonus_2" },
    { name: "분석 중추", description: "설의는 초과한 [업보] 스택을 누적한다. 최대 누적수: 6스택. 설의는 특성 발동 후 초과한 스택의 [업보]를 획득한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "격파 특수효과", value: "37.3%", icon: "break_effect" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "양자 속성 피해 증가", value: "8%", icon: "quantum_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "심마 속박", description: "특성의 추가 공격으로 가하는 피해가 40% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "오진(五塵) 극복", description: "특성의 추가 공격이 약점 속성을 무시하고 적의 강인성을 소모시키며, 동시에 설의 HP 최대치의 5%만큼 HP를 회복한다. 약점 격파 시 양자 속성의 약점 격파 효과가 발동된다", icon: "eidolon_2" },
    { rank: "E03", name: "고제(苦諦) 알절", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "악업 단절", description: "필살기 발동 시 격파 특수효과가 40% 증가한다. 지속 시간: 2턴", icon: "eidolon_4" },
    { rank: "E05", name: "영신(靈神) 인도", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "생사 주관", description: "[업보]의 스택 수 상한이 6스택으로 감소한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "약점 속성 무시": "적의 약점 속성과 무관하게 강인성을 소모시킬 수 있다."
  }
};

export default xueyi;
