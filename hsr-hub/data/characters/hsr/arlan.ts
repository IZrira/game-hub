
import { Character } from '../../../../common-hub/types';

const arlan: Character = {
  id: "arlan",
  gameId: "hsr",
  name: "아를란",
  folderName: "아를란",
  attribute: "번개",
  path: "파멸",
  rarity: 4,
  affiliation: "우주정거장 「헤르타」",
  briefInfo: "우주정거장 「헤르타」 방위과 책임자. 이해심이 많으며, 자신보다 남을 더 소중히 여긴다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 아를란 / 🇺🇸 Arlan / 🇨🇳 阿兰 / 🇯🇵 アーラン",
  voiceActors: "🇰🇷 김사랑 / 🇺🇸 다니 J. 에드워즈 / 🇨🇳 타오뎬 / 🇯🇵 시라이시 료코",
  baseStats: {
    lv1: { "기초 HP": 163, "기초 공격력": 81, "기초 방어력": 45 },
    lv20: { "기초 HP": 319, "기초 공격력": 159, "기초 방어력": 88 },
    lv30: { "기초 HP": 466, "기초 공격력": 233, "기초 방어력": 129 },
    lv40: { "기초 HP": 614, "기초 공격력": 307, "기초 방어력": 170 },
    lv50: { "기초 HP": 761, "기초 공격력": 380, "기초 방어력": 211 },
    lv60: { "기초 HP": 909, "기초 공격력": 454, "기초 방어력": 252 },
    lv70: { "기초 HP": 1056, "기초 공격력": 528, "기초 방어력": 292 },
    lv80: { "기초 HP": 1203, "기초 공격력": 600, "기초 방어력": 330 },
    speed: 102,
    taunt: 125,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "번개의 눈", count: "50", rarity: 4 },
      { name: "소멸된 코어", count: "12", rarity: 2 },
      { name: "희미한 빛의 코어", count: "13", rarity: 3 },
      { name: "꿈틀대는 코어", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "부서진 칼날", count: "12", rarity: 2 },
      { name: "무생의 칼날", count: "54", rarity: 3 },
      { name: "정화의 칼날", count: "105", rarity: 4 },
      { name: "소멸된 코어", count: "28", rarity: 2 },
      { name: "희미한 빛의 코어", count: "42", rarity: 3 },
      { name: "꿈틀대는 코어", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "전광석화", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 아를란 공격력 100%만큼의 번개 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "족쇄 풀기", tag: "전투 스킬 | 단일 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 단일 공격 20", spRecovery: "0", description: "아를란 HP 최대치 15%만큼의 HP를 소모하여 지정된 단일 적에게 아를란 공격력 240%만큼의 번개 속성 피해를 가한다. 현재 HP가 부족할 경우 전투 스킬 발동 시 아를란의 현재 HP는 1pt로 감소한다", icon: "skill_1" },
    { name: "광란의 징벌자", tag: "필살기 | 확산", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 확산 20", description: "지정된 단일 적에게 아를란 공격력 320%만큼의 번개 속성 피해를 가하고, 인접한 목표에게 아를란 공격력 140%만큼의 번개 속성 피해를 가한다", icon: "ultimate_1" },
    { name: "고통과 분노", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "아를란은 잃은 HP 백분율에 따라 자신의 가하는 피해가 증가한다. 최대 72% 증가한다", icon: "talent_1" },
    { name: "극속 수확", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 모든 적에게 아를란 공격력 80%만큼의 번개 속성 피해를 가한다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "소생", description: "현재 HP 백분율이 30% 이하일 시, 적을 처치하면 즉시 HP 최대치의 20%만큼 HP를 회복한다", icon: "bonus_1" },
    { name: "견인불발", description: "지속 피해류 디버프 상태 저항 확률이 50% 증가한다", icon: "bonus_2" },
    { name: "항거", description: "전투 진입 시, HP가 50% 이하일 경우 피해를 1회 막아낼 수 있다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "효과 저항", value: "18.0%", icon: "effect_res" },
    { type: "HP", value: "10.0%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "만물의 끝", description: "HP 백분율이 50% 이하일 시 전투 스킬이 가하는 피해가 10% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "속박 해제", description: "전투 스킬, 필살기 발동 시 자신에게 걸린 디버프 효과를 1개 해제한다", icon: "eidolon_2" },
    { rank: "E03", name: "중검 강타", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "절체절명", description: "전투 진입 후 치명적인 피해를 받아도 전투 불능 상태가 되지 않으며 즉시 자신의 HP를 HP 최대치의 25%만큼 회복한다. 해당 효과는 1회 발동 후 해제되거나, 2턴 지속 후 해제된다", icon: "eidolon_4" },
    { rank: "E05", name: "전력 개방", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "나를 대신해 타오르라", description: "HP가 50% 이하일 시 필살기가 가하는 피해가 20% 증가하며, 인접한 목표에게 가하는 피해 배율이 지정된 단일 적에 대한 피해 배율과 동일해진다", icon: "eidolon_6" }
  ]
};

export default arlan;
