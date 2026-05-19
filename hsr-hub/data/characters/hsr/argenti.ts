
import { Character } from '../../../../common-hub/types';

const argenti: Character = {
  id: "argenti",
  name: "아젠티",
  folderName: "아젠티",
  gameId: "hsr",
  attribute: "물리",
  path: "지식",
  rarity: 5,
  affiliation: "미(美)의 기사단",
  briefInfo: "「미의 기사단」의 고전적인 기사. 실종된 「미(美)」의 에이언즈 이드릴라를 경건한 마음으로 흠모하고 있다.\n정직하고 당당하며, 우주를 유람하면서 이드릴라의 명성을 널리 알린다",
  version: "1.5",
  releaseVersion: "1.5",
  languageNames: "🇰🇷 아젠티 / 🇺🇸 Argenti / 🇨🇳 银枝 / 🇯🇵 アルジェンティ",
  voiceActors: "🇰🇷 최승훈 / 🇺🇸 탤런 워버튼 / 🇨🇳 량다웨이 / 🇯🇵 타치바나 신노스케",
  metadata: {
    name: "아젠티",
    language: "🇰🇷 아젠티 / 🇺🇸 Argenti / 🇨🇳 银枝 / 🇯🇵 アルジェンティ",
    element: "물리",
    path: "지식",
    rarity: 5,
    affiliation: "미(美)의 기사단",
    cv: "🇰🇷 최승훈 / 🇺🇸 탤런 워버튼 / 🇨🇳 량다웨이 / 🇯🇵 타치바나 신노스케",
    releaseVersion: "1.5",
    brief: "「미의 기사단」의 고전적인 기사. 실종된 「미(美)」의 에이언즈 이드릴라를 경건한 마음으로 흠모하고 있다.\n정직하고 당당하며, 우주를 유람하면서 이드릴라의 명성을 널리 알린다"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 100, "기초 방어력": 50 },
    lv20: { "기초 HP": 278, "기초 공격력": 196, "기초 방어력": 97 },
    lv30: { "기초 HP": 406, "기초 공격력": 286, "기초 방어력": 141 },
    lv40: { "기초 HP": 535, "기초 공격력": 376, "기초 방어력": 186 },
    lv50: { "기초 HP": 663, "기초 공격력": 467, "기초 방어력": 230 },
    lv60: { "기초 HP": 791, "기초 공격력": 557, "기초 방어력": 275 },
    lv70: { "기초 HP": 920, "기초 공격력": 647, "기초 방어력": 319 },
    lv80: { "기초 HP": 1048, "기초 공격력": 737, "기초 방어력": 364 },
    speed: 103,
    taunt: 75,
    energy: 180
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "명부 명령", count: "65", rarity: 4 },
      { name: "소멸된 코어", count: "15", rarity: 2 },
      { name: "희미한 빛의 코어", count: "15", rarity: 3 },
      { name: "꿈틀대는 코어", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "9", rarity: 4 },
      { name: "영감의 열쇠", count: "12", rarity: 2 },
      { name: "계몽의 열쇠", count: "53", rarity: 3 },
      { name: "지식의 열쇠", count: "101", rarity: 4 },
      { name: "소멸된 코어", count: "33", rarity: 2 },
      { name: "희미한 빛의 코어", count: "46", rarity: 3 },
      { name: "꿈틀대는 코어", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "덧없는 향기",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 아젠티 공격력 100%만큼의 물리 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "공정, 이곳에 피어나다",
      tag: "전투 스킬 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "-1",
      description: "모든 적에게 아젠티 공격력의 120%만큼 물리 속성 피해를 준다",
      icon: "skill_1"
    },
    {
      name: "정원에서 선사하는 극한의 미",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "에너지를 90pt 소모하고, 모든 적에게 아젠티 공격력의 160%만큼 물리 속성 피해를 준다",
      icon: "ultimate_1"
    },
    {
      name: "정원에서 「내」가 수여한 공훈",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 5 범위 20",
      description: "에너지를 180pt 소모하고 모든 적에게 아젠티 공격력의 280%만큼 물리 속성 피해를 준다. \n추가로 피해를 6회 주며, 피해를 가할 때마다 랜덤 단일 적에게 아젠티 공격력의 95%만큼 물리 속성 피해를 준다",
      icon: "ultimate_2"
    },
    {
      name: "숭고한 객체",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "일반 공격, 전투 스킬, 필살기 발동 시 적을 1기 명중할 때마다 아젠티의 에너지가 3pt 회복되고, [승격] 1스택을 획득하며, 아젠티의 치명타 확률이 2.5% 증가한다. 해당 효과 최대 중첩수: 10스택",
      icon: "talent_1"
    },
    {
      name: "순수하고 고결한 선언",
      tag: "비술 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 일정 구역 내의 적을 10초 동안 현기증 상태에 빠트린다. 현기증 상태인 적은 아군을 선공할 수 없다.\n현기증 상태에 빠진 적을 선공해 전투 진입 시, 모든 적에게 아젠티 공격력의 80%만큼 물리 속성 피해를 가하고, 아젠티의 에너지가 15pt 회복된다.",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "경건", description: "턴 시작 시 즉시 [승격]을 1스택 획득한다", icon: "bonus_1" },
    { name: "너그러움", description: "적이 전투 진입 시 자신의 에너지를 즉시 2pt 회복한다", icon: "bonus_2" },
    { name: "용기", description: "현재 HP 백분율이 50% 이하인 적에게 주는 피해가 15% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "물리 속성 피해 증가", value: "14.4%", icon: "physical_dmg" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "심미왕국의 결함", description: "[승격] 스택마다 추가로 치명타 피해가 4% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "아게이트의 겸손", description: "필살기 발동 시 적이 3기 이상일 경우 공격력이 40% 증가한다. 지속 시간: 1턴", icon: "eidolon_2" },
    { rank: "E03", name: "가시밭길의 영광", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "나팔의 헌신", description: "전투 시작 시 [승격]을 2스택 획득하고, 특성의 효과 최대 중첩수가 2스택 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "우주 어딘가의 눈", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "「그분」의 빛", description: "필살기 발동 시 적의 방어력을 30% 무시한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[승격]": "아젠티가 공격 명중 또는 턴 시작 시 획득하는 고유 스택. 중첩될수록 치명타 확률(돌파 시 치명타 피해)이 증가한다."
  }
};

export default argenti;
