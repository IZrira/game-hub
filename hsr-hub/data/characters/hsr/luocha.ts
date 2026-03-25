
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
  briefInfo: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 의술이 뛰어난 화외 행상",
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
    brief: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 의술이 뛰어난 화외 행상"
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
      { name: "과거 그림자의 황금 장식", count: "65", rarity: 4 },
      { name: "공조 기계 부품", count: "15", rarity: 2 },
      { name: "공조 톱니바퀴", count: "15", rarity: 3 },
      { name: "공조 환류 심장", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "풍요의 씨앗", count: "18", rarity: 2 },
      { name: "생명의 새싹", count: "69", rarity: 3 },
      { name: "영원의 꽃", count: "139", rarity: 4 },
      { name: "공조 기계 부품", count: "41", rarity: 2 },
      { name: "공조 톱니바퀴", count: "56", rarity: 3 },
      { name: "공조 환류 심장", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "흑연의 가시",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정한 단일 적에게 나찰 공격력의 100%만큼 허수 속성 피해를 준다",
      icon: "basic_atk_1"
    },
    {
      name: "백화의 기원",
      tag: "전투 스킬 | 회복",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "전투 스킬 발동 후 지정한 단일 아군의 HP를 즉시 나찰 공격력의 60% + 800만큼 회복시키고, 나찰은 [백화의 순간]을 1스택 획득한다.\n임의의 단일 아군의 현재 HP 백분율이 50% 이하가 되면, 나찰은 즉시 해당 아군에게 전투 스킬과 동일한 효과를 1회 발동한다.\n해당 효과 발동 시 전투 스킬 포인트를 소모하지 않고, 2턴 후 다시 발동할 수 있다",
      icon: "skill_1"
    },
    {
      name: "망자의 숙원",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적의 버프 효과를 1개 해제하고, 모든 적에게 나찰 공격력의 200%만큼 허수 속성 피해를 준다. 동시에 나찰은 [백화의 순간]을 1스택 획득한다",
      icon: "ultimate_1"
    },
    {
      name: "생명의 윤회",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "[백화의 순간]이 2스택이 되면 나찰은 모든 [백화의 순간]을 소모해 결계를 펼친다.\n결계에 있는 임의의 적이 피격되면 공격을 발동한 아군은 즉시 나찰 공격력 18% + 240만큼의 HP를 회복한다. 결계 효과 지속 시간: 2턴. \n나찰이 전투 불능 상태에 빠지면 결계도 해제된다",
      icon: "talent_1"
    },
    {
      name: "우인의 연민",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 발동 후 다음 전투 시작 시 특성을 바로 발동한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "침지 소생", description: "전투 스킬 효과 발동 시 지정한 단일 아군의 디버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "쇄신의 몸", description: "결계 안에 있는 임의의 적이 아군에게 피격되면 공격자가 아닌 아군도 나찰 공격력의 7%+93만큼 HP를 회복한다", icon: "bonus_2" },
    { name: "유곡을 걷다", description: "제어류 디버프 상태 저항 확률이 70% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "생자 정화", description: "결계 효과 발동 시 모든 아군의 공격력이 20% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "정토의 선물", description: "전투 스킬 효과 발동 시 지정한 아군의 현재 HP 백분율이 50% 미만일 경우 나찰이 제공하는 치유량이 30% 증가하고, 현재 HP 백분율이 50% 이상일 경우 나찰 공격력의 18%+240만큼 피해를 상쇄할 수 있는 실드를 제공한다. 실드 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "우인의 모색", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "가시관의 심판", description: "결계 효과 발동 시 적은 허약 상태에 빠지고, 가하는 피해가 12% 감소한다", icon: "eidolon_4" },
    { rank: "E05", name: "수난의 흔적", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "모두가 먼지로 돌아가리", description: "필살기 발동 시 100%의 고정 확률로 모든 적의 모든 속성 저항이 20% 감소한다. 지속 시간: 2턴", icon: "eidolon_6" }
  ],
  specialTerms: {
    "고정 확률": "어떤 요인에도 영향을 받지 않는 고정 확률이다.",
    "[백화의 순간]": "나찰의 전투 스킬 또는 필살기를 통해 획득하는 스택. 2스택 도달 시 특성 결계가 전개된다.",
    "결계": "나찰의 특성으로 생성되는 특수 영역. 영역 내 적 피격 시 아군의 HP를 회복한다."
  }
};

export default luocha;
