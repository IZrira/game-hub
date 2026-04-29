import { Character } from '../../../../common-hub/types';

const luocha: Character = {
  id: "luocha",
  name: "나찰",
  folderName: "나찰",
  gameId: "hsr",
  attribute: "허수",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 화외 행상. 뛰어난 의술을 가지고 있다.\n그는 정체를 알 수 없는 관을 짊어지고 다니며, 생명과 죽음 사이의 경계를 걷는 자이다.",
  version: "1.1",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 나찰 / 🇺🇸 Luocha / 🇨🇳 罗刹 / 🇯🇵 羅刹",
  voiceActors: "🇰🇷 신용우 / 🇺🇸 크레이그 리 토머스 / 🇨🇳 자오루 / 🇯🇵 이시다 아키라",
  metadata: {
    name: "나찰",
    language: "🇰🇷 나찰 / 🇺🇸 Luocha / 🇨🇳 罗刹 / 🇯🇵 羅刹",
    element: "허수",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 신용우 / 🇺🇸 크레이그 리 토머스 / 🇨🇳 자오루 / 🇯🇵 이시다 아키라",
    releaseVersion: "1.1",
    brief: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 화외 행상. 뛰어난 의술을 가지고 있다.\n그는 정체를 알 수 없는 관을 짊어지고 다니며, 생명과 죽음 사이의 경계를 걷는 자이다."
  },
  baseStats: {
    lv1: { "기초 HP": 174, "기초 공격력": 103, "기초 방어력": 50 },
    lv20: { "기초 HP": 340, "기초 공격력": 201, "기초 방어력": 97 },
    lv30: { "기초 HP": 497, "기초 공격력": 293, "기초 방어력": 141 },
    lv40: { "기초 HP": 653, "기초 공격력": 386, "기초 방어력": 186 },
    lv50: { "기초 HP": 810, "기초 공격력": 479, "기초 방어력": 230 },
    lv60: { "기초 HP": 967, "기초 공격력": 571, "기초 방어력": 275 },
    lv70: { "기초 HP": 1124, "기초 공격력": 664, "기초 방어력": 319 },
    lv80: { "기초 HP": 1281, "기초 공격력": 757, "기초 방어력": 364 },
    speed: 101,
    taunt: 100,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "과거 그림자의 황금 왕관", count: "65", rarity: 4 },
      { name: "기교의 부품", count: "15", rarity: 2 },
      { name: "기교의 톱니바퀴", count: "15", rarity: 3 },
      { name: "기교의 구동기", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원", count: "12", rarity: 4 },
      { name: "풍요의 씨앗", count: "18", rarity: 2 },
      { name: "생명의 싹", count: "69", rarity: 3 },
      { name: "영원한 꽃", count: "139", rarity: 4 },
      { name: "기교의 부품", count: "41", rarity: 2 },
      { name: "기교의 톱니바퀴", count: "56", rarity: 3 },
      { name: "기교의 구동기", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "흑연의 가시",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 나찰 공격력의 100%만큼 허수 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "백화의 기원",
      tag: "전투 스킬 | 회복",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "지정된 아군 단일의 HP를 나찰 공격력의 60% + 800만큼 즉시 회복시키고, 나찰은 [백화의 순간]을 1스택 획득한다.\n임의의 아군 현재 HP 백분율이 50% 이하일 때, 나찰은 해당 아군에게 즉시 전투 스킬을 1회 발동하며, 전투 스킬 포인트를 소모하지 않는다. 해당 효과는 나찰이 2회 행동 후 다시 발동할 수 있다",
      icon: "skill_1"
    },
    {
      name: "망자의 숙원",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "모든 적의 버프 효과를 1개 해제하고, 모든 적에게 나찰 공격력의 120%만큼 허수 속성 피해를 가한다. 동시에 나찰은 [백화의 순간]을 1스택 획득한다",
      icon: "ultimate_1"
    },
    {
      name: "생명의 윤회",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "[백화의 순간]이 2스택에 도달하면 나찰은 모든 충전을 소모해 적에게 결계를 펼친다.\n결계 내의 임의의 적이 공격을 받으면, 공격을 발동한 아군은 즉시 나찰 공격력의 18% + 240만큼 HP를 회복한다.\n결계는 2턴 동안 지속된다. 나찰이 전투 불능 상태가 되면 결계는 해제된다",
      icon: "talent_1"
    },
    {
      name: "우매한 자의 자비",
      tag: "비술 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후 다음 전투 시작 시 즉시 특성을 발동한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "쇄신의 몸", description: "전투 스킬 발동 시 지정된 아군의 디버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "성역", description: "결계 내의 임의의 적이 공격받으면, 공격자 외의 아군도 나찰 공격력의 7% + 93만큼의 HP를 회복한다", icon: "bonus_2" },
    { name: "유곡을 걷다", description: "제어류 디버프 상태에 빠질 기본 확률이 70% 감소한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "정토의 선물", description: "결계가 활성화되어 있는 동안 모든 아군의 공격력이 20% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "우인의 모색", description: "전투 스킬 발동 시 지정된 아군의 현재 HP가 50% 미만이면 나찰의 치유량이 30% 증가한다. 현재 HP가 50% 이상이면 대상에게 나찰 공격력의 18% + 240만큼의 피해를 흡수하는 보호막을 제공한다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "우인의 연민", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "가시 돋친 가시", description: "결계 활성화 시 적이 허약 상태에 빠지며, 적이 가하는 피해가 12% 감소한다", icon: "eidolon_4" },
    { rank: "E05", name: "생명의 순환", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "모두가 먼지로 돌아가리", description: "필살기 발동 시 100%의 기본 확률로 모든 적의 모든 속성 저항이 20% 감소한다. 지속 시간: 2턴", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[백화의 순간]": "나찰의 스킬 발동 시 쌓이는 스택. 2스택 도달 시 결계를 펼친다.",
    "결계": "나찰의 특성으로 생성되는 영역. 아군이 적을 공격할 때마다 HP를 회복시킨다.",
    "디버프 해제": "아군에게 걸린 해로운 효과를 1개 제거한다."
  }
};

export default luocha;
