
import { Character } from '../../../../common-hub/types';

const himeko: Character = {
  id: "himeko",
  gameId: "hsr",
  name: "히메코",
  folderName: "히메코",
  attribute: "화염",
  path: "지식",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "은하열차의 복원가. 광활한 별하늘을 보기 위해 은하열차와 함께하는 것을 택했다. 취미는 핸드메이드 커피 만들기",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 히메코 / 🇺🇸 Himeko / 🇨🇳 姬子 / 🇯🇵 姬子",
  voiceActors: "🇰🇷 김보나 / 🇺🇸 치아 코트 / 🇨🇳 린스 / 🇯🇵 타나카 리에",
  metadata: {
    name: "히메코",
    language: "🇰🇷 히메코 / 🇺🇸 Himeko / 🇨🇳 姬子 / 🇯🇵 姬子",
    element: "화염",
    path: "지식",
    rarity: 5,
    affiliation: "은하열차",
    cv: "🇰🇷 김보나 / 🇺🇸 치아 코트 / 🇨🇳 린스 / 🇯🇵 타나카 리에",
    releaseVersion: "1.0",
    brief: "은하열차의 복원가. 광활한 별하늘을 보기 위해 은하열차와 함께하는 것을 택했다. 취미는 핸드메이드 커피 만들기"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 103, "기초 방어력": 59 },
    lv20: { "기초 HP": 278, "기초 공격력": 201, "기초 방어력": 116 },
    lv30: { "기초 HP": 406, "기초 공격력": 293, "기초 방어력": 169 },
    lv40: { "기초 HP": 535, "기초 공격력": 386, "기초 방어력": 223 },
    lv50: { "기초 HP": 663, "기초 공격력": 479, "기초 방어력": 276 },
    lv60: { "기초 HP": 791, "기초 공격력": 571, "기초 방어력": 330 },
    lv70: { "기초 HP": 920, "기초 공격력": 664, "기초 방어력": 383 },
    lv80: { "기초 HP": 1048, "기초 공격력": 757, "기초 방어력": 437 },
    speed: 96,
    taunt: 75,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "상온 갑각", count: "65", rarity: 4 },
      { name: "소멸된 코어", count: "15", rarity: 2 },
      { name: "희미한 빛의 코어", count: "15", rarity: 3 },
      { name: "꿈틀대는 코어", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "영감의 열쇠", count: "18", rarity: 2 },
      { name: "계몽의 열쇠", count: "69", rarity: 3 },
      { name: "지식의 열쇠", count: "139", rarity: 4 },
      { name: "소멸된 코어", count: "41", rarity: 2 },
      { name: "희미한 빛의 코어", count: "56", rarity: 3 },
      { name: "꿈틀대는 코어", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "무장 조율",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 히메코 공격력 100%만큼의 화염 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "융핵 폭파",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 히메코 공격력 200%만큼의 화염 속성 피해를 주고, 인접한 목표에게 히메코 공격력 80%만큼의 화염 속성 피해를 가한다",
      icon: "skill_1"
    },
    {
      name: "하늘이 내린 불꽃",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적에게 히메코 공격력 230%만큼의 화염 속성 피해를 주고, 적 1기를 처치할 때마다 히메코는 에너지를 추가로 5pt 회복한다",
      icon: "ultimate_1"
    },
    {
      name: "기세 몰이",
      tag: "특성 | 강화",
      energyRegen: "에너지 회복 10",
      toughnessDMG: "약점 격파 범위 10",
      description: "적의 약점이 격파될 경우 히메코는 충전을 획득한다. 최대 3pt까지 충전된다.\n아군이 공격 발동 후 히메코의 충전이 최대치가 될 경우 바로 추가 공격을 1회 발동하고, \n모든 적에게 히메코 공격력 140%만큼의 화염 속성 피해를 주고 충전을 모두 소모한다.\n전투 시작 시 충전을 1pt 획득한다",
      icon: "talent_1"
    },
    {
      name: "불완전 연소",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 15초 동안 지속되는 특수영역을 하나 만든다. \n특수 영역 안에 있는 적은 전투 진입 후 100%의 기본 확률로 받는 화염 속성 피해가 10% 증가한다. 지속 시간: 2턴. \n아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "불티", description: "공격 발동 후 50%의 기본 확률로 적을 연소 상태에 빠트린다. 지속 시간: 2턴\n연소 상태의 적은 턴이 시작될 때마다 히메코 공격력의 30%만큼 화염 속성 지속 피해를 받는다", icon: "bonus_1" },
    { name: "작열", description: "전투 스킬이 연소 상태의 적에게 가하는 피해가 20% 증가한다", icon: "bonus_2" },
    { name: "도표", description: "현재 HP 백분율이 80% 이상이면, 치명타 확률이 15% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "화염 속성 피해 증가", value: "24.4%", icon: "fire_dmg" },
    { type: "공격력", value: "18%", icon: "atk" },
    { type: "효과 저항", value: "+10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "어린 시절", description: "[기세 몰이] 발동 후 히메코의 속도가 20% 증가한다. 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "우연한 만남", description: "현재 HP 백분율이 50% 이하인 적에게 가하는 피해가 15% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "자아", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "몰입", description: "전투 스킬을 발동하여 적의 약점을 격파할 시 히메코는 추가로 1pt의 충전을 획득한다", icon: "eidolon_4" },
    { rank: "E05", name: "몽상", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "개척!", description: "필살기는 추가로 2회 피해를 주고, 임의의 적에게 각각 기존 피해 40%만큼의 화염 속성 피해를 준다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다."
  }
};

export default himeko;
