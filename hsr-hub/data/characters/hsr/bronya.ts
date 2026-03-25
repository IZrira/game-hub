
import { Character } from '../../../../common-hub/types';

const bronya: Character = {
  id: "bronya",
  name: "브로냐",
  folderName: "브로냐",
  gameId: "hsr",
  attribute: "바람",
  path: "화합",
  rarity: 5,
  affiliation: "벨로보그",
  briefInfo: "벨로보그 「수호자」의 계승자. 공주의 고고함과 군인의 꿋꿋함이 공존한다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 브로냐 / 🇺🇸 Bronya / 🇨🇳 布洛妮娅 / 🇯🇵 ブローニャ",
  voiceActors: "🇰🇷 이보희 / 🇺🇸 매들린 리터 / 🇨🇳 셰잉 / 🇯🇵 아스미 카나",
  metadata: {
    name: "브로냐",
    language: "🇰🇷 브로냐 / 🇺🇸 Bronya / 🇨🇳 布洛妮娅 / 🇯🇵 ブローニャ",
    element: "바람",
    path: "화합",
    rarity: 5,
    affiliation: "벨로보그",
    cv: "🇰🇷 이보희 / 🇺🇸 매들린 리터 / 🇨🇳 셰잉 / 🇯🇵 아스미 카나",
    releaseVersion: "1.0",
    brief: "벨로보그 「수호자」의 계승자. 공주의 고고함과 군인의 꿋꿋함이 공존한다"
  },
  baseStats: {
    lv1: { "기초 HP": 169, "기초 공격력": 79, "기초 방어력": 73 },
    lv20: { "기초 HP": 329, "기초 공격력": 154, "기초 방어력": 142 },
    lv30: { "기초 HP": 482, "기초 공격력": 226, "기초 방어력": 207 },
    lv40: { "기초 HP": 634, "기초 공격력": 297, "기초 방어력": 272 },
    lv50: { "기초 HP": 786, "기초 공격력": 368, "기초 방어력": 338 },
    lv60: { "기초 HP": 938, "기초 공격력": 440, "기초 방어력": 403 },
    lv70: { "기초 HP": 1090, "기초 공격력": 511, "기초 방어력": 468 },
    lv80: { "기초 HP": 1242, "기초 공격력": 582, "기초 방어력": 534 },
    speed: 99,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "폭풍의 눈", count: "65", rarity: 4 },
      { name: "철위대 배지", count: "15", rarity: 2 },
      { name: "철위대 표식", count: "15", rarity: 3 },
      { name: "철위대 훈장", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "18", rarity: 2 },
      { name: "가족의 찬가", count: "69", rarity: 3 },
      { name: "별들의 악장", count: "139", rarity: 4 },
      { name: "철위대 배지", count: "41", rarity: 2 },
      { name: "철위대 표식", count: "56", rarity: 3 },
      { name: "철위대 훈장", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "바람의 탄환",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 브로냐 공격력 100%만큼의 바람 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "작전 재배치",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "지정된 단일 아군의 디버프 효과를 1개 해제하며, 해당 목표는 즉시 행동하고, 가하는 피해가 66% 증가한다. 지속 시간: 1턴\n자신에게 해당 스킬을 발동하면 즉시 행동 효과는 발동되지 않는다",
      icon: "skill_1"
    },
    {
      name: "벨로보그 행진곡",
      tag: "필살기 | 강화",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "모든 아군의 공격력이 55% 증가하고, 동시에 브로냐 치명타 피해 16%+20%만큼의 치명타 피해가 증가한다. 지속 시간: 2턴",
      icon: "ultimate_1"
    },
    {
      name: "앞선 한 발",
      tag: "특성 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 10",
      description: "일반 공격 발동 후 브로냐의 다음번 행동 게이지가 30% 증가한다",
      icon: "talent_1"
    },
    {
      name: "깃발 아래",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "비술 발동 후 다음 전투 시작 시 모든 아군의 공격력이 15% 증가한다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "호령", description: "일반 공격의 치명타 확률이 100%까지 증가한다", icon: "bonus_1" },
    { name: "진영", description: "전투 시작 시 모든 아군의 방어력이 20% 증가한다. 지속 시간: 2턴", icon: "bonus_2" },
    { name: "두려움의 압박", description: "브로냐가 필드에 있으면 모든 아군이 가하는 피해가 10% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "바람 속성 피해 증가", value: "22.4%", icon: "wind_dmg" },
    { type: "치명타 피해", value: "24%", icon: "crit_dmg" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "정신 무장, 전투력 비축", description: "전투 스킬 발동 시 50%의 고정 확률로 전투 스킬 포인트를 1pt 회복한다. 해당 효과의 재발동 대기시간은 1턴이다", icon: "eidolon_1" },
    { rank: "E02", name: "빠른 행군", description: "전투 스킬 발동 시 지정된 아군은 행동 후 속도가 30% 증가한다. 지속 시간: 1턴", icon: "eidolon_2" },
    { rank: "E03", name: "포격 개시", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "허점 공격", description: "다른 아군 캐릭터가 바람 속성 약점을 보유한 적에게 일반 공격을 발동하면, 브로냐는 즉시 추가 공격을 1회 발동하여 해당 목표에게 일반 공격 피해의 80%만큼 바람 속성 피해를 가한다. 해당 효과는 턴마다 1회 발동할 수 있다", icon: "eidolon_4" },
    { rank: "E05", name: "승승장구", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "드높은 기세", description: "전투 스킬이 지정한 아군이 가하는 피해 증가 효과 지속 시간이 1턴 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "행동 게이지 증가": "행동 게이지가 30% 증가하여 행동 순서가 앞당겨진다.",
    "고정 확률": "어떤 요인에도 영향을 받지 않는 고정 확률이다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다."
  }
};

export default bronya;
