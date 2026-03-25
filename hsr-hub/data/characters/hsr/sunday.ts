import { Character } from '../../../../common-hub/types';

const sunday: Character = {
  id: "sunday",
  name: "선데이",
  folderName: "선데이",
  gameId: "hsr",
  attribute: "허수",
  path: "화합",
  rarity: 5,
  affiliation: "페나코니",
  briefInfo: "「질서」의 좋은꿈은 이미 사라졌지만 여전히 초심을 버리지 않는 사람도 있다.\n——날개가 꺾여 추락한 여행자, 그의 발걸음은 어디로 향할 것인가?",
  version: "2.7",
  releaseVersion: "2.7",
  languageNames: "🇰🇷 선데이 / 🇺🇸 Sunday / 🇨🇳 星期日 / 🇯🇵 サンデー",
  voiceActors: "🇰🇷 강성우 / 🇺🇸 그리핀 푸아투 / 🇨🇳 쉬샹 / 🇯🇵 오오츠카 타케오",
  metadata: {
    name: "선데이",
    language: "🇰🇷 선데이 / 🇺🇸 Sunday / 🇨🇳 星期日 / 🇯🇵 サンデー",
    element: "허수",
    path: "화합",
    rarity: 5,
    affiliation: "페나코니",
    cv: "🇰🇷 강성우 / 🇺🇸 그리핀 푸아투 / 🇨🇳 쉬샹 / 🇯🇵 오오츠카 타케오",
    releaseVersion: "2.7",
    brief: "「질서」의 좋은꿈은 이미 사라졌지만 여전히 초심을 버리지 않는 사람도 있다.\n——날개가 꺾여 추락한 여행자, 그의 발걸음은 어디로 향할 것인가?"
  },
  baseStats: {
    lv1: { "기초 HP": 111, "기초 공격력": 71, "기초 방어력": 106 },
    lv20: { "기초 HP": 216, "기초 공격력": 139, "기초 방어력": 206 },
    lv30: { "기초 HP": 316, "기초 공격력": 203, "기초 방어력": 301 },
    lv40: { "기초 HP": 416, "기초 공격력": 267, "기초 방어력": 396 },
    lv50: { "기초 HP": 516, "기초 공격력": 332, "기초 방어력": 491 },
    lv60: { "기초 HP": 615, "기초 공격력": 396, "기초 방어력": 586 },
    lv70: { "기초 HP": 715, "기초 공격력": 460, "기초 방어력": 681 },
    lv80: { "기초 HP": 815, "기초 공격력": 524, "기초 방어력": 776 },
    speed: 104,
    taunt: 125,
    energy: 240
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "한 곡으로 어우러진 환상", count: "65", rarity: 4 },
      { name: "생각의 가루", count: "15", rarity: 2 },
      { name: "인상의 파편", count: "15", rarity: 3 },
      { name: "욕망의 거울 조각", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "12", rarity: 4 },
      { name: "구름 위 음표", count: "18", rarity: 2 },
      { name: "천상의 소절", count: "69", rarity: 3 },
      { name: "천외의 악장", count: "139", rarity: 4 },
      { name: "생각의 가루", count: "41", rarity: 2 },
      { name: "인상의 파편", count: "56", rarity: 3 },
      { name: "욕망의 거울 조각", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "번쩍이는 권계",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 선데이 공격력의 100%만큼 허수 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "종이와 의전의 은혜",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "지정된 단일 아군 캐릭터 및 해당 캐릭터의 소환물을 즉시 행동하게 하고, 대상이 가하는 피해를 30% 증가시키며, 목표가 소환물을 보유하면 가하는 피해 증가 효과가 추가로 50% 증가한다, 지속 시간: 2턴.\n[은혜 입은 자]에게 전투 스킬 발동 후 전투 스킬 포인트를 1pt 회복한다.\n선데이가 「화합」 운명의 길 캐릭터에게 해당 스킬을 발동하면 즉시 행동 효과는 발동되지 않는다",
      icon: "skill_1"
    },
    {
      name: "깃과 상흔의 찬송",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "지정된 단일 아군 캐릭터의 에너지를 에너지 최대치의 20%만큼 회복하고, 목표 및 목표의 소환물을 [은혜 입은 자]로 만든다. [은혜 입은 자]의 치명타 피해는 선데이 치명타 피해의 30%에 12%를 더한 값만큼 증가한다.\n선데이 자신의 턴이 시작될 때마다 [은혜 입은 자] 상태의 지속 턴 수가 1 감소하고, 총 3턴 지속되며, 선데이를 제외한 최근 필살기의 대상이 된 목표에게만 적용된다. 선데이가 전투 불능 상태에 빠질 시 [은혜 입은 자] 효과도 해제된다",
      icon: "ultimate_1"
    },
    {
      name: "고해의 육신",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "전투 스킬 발동 시 목표의 치명타 확률이 20% 증가한다, 지속 시간: 3턴",
      icon: "talent_1"
    },
    {
      name: "영광의 신비",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 다음 전투에서 선데이가 처음으로 아군에게 스킬을 발동하면 목표가 가하는 피해가 50% 증가한다, 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "주일을 향한 갈망", description: "필살기 발동 시 목표에게 회복한 에너지가 40pt 미만일 시, 회복하는 에너지가 40pt까지 증가한다", icon: "bonus_1" },
    { name: "먼지를 털어내는 숭고함", description: "전투 시작 시 선데이의 에너지를 25pt 회복한다", icon: "bonus_2" },
    { name: "손바닥 위 안식처", description: "전투 스킬 발동 시 목표의 디버프 효과를 1개 해제한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 피해", value: "37.3%", icon: "crit_dmg" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "천년의 고요한 끝", description: "선데이가 전투 스킬 발동 시 목표 캐릭터가 피해를 가하면 목표의 방어력을 16% 무시하고, 소환물이 피해를 가하면 목표의 방어력을 40% 무시한다, 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "부족함을 메우는 믿음", description: "처음 필살기 발동 후 전투 스킬 포인트를 2pt 회복한다. [은혜 입은 자]가 가하는 피해가 30% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "가시의 은둔처", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "조각의 머리말", description: "턴 시작 시 에너지를 8pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "은하를 표류하는 종이배", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "뭇별의 떠들썩한 첫걸음", description: "특성의 치명타 확률 증가 효과가 최대 3스택 중첩되며, 특성의 지속 시간이 1턴 증가한다. 선데이가 필살기 발동 시 목표에게 특성의 치명타 확률 증가 효과를 부여할 수 있다. 특성의 치명타 확률 증가 효과 발동 시 목표의 치명타 확률이 100%를 초과하면, 1%를 초과할 때마다 치명타 피해가 2% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다.",
    "[은혜 입은 자]": "선데이의 필살기로 지정된 아군 및 소환물이 획득하는 특수 상태. 치명타 피해가 크게 증가한다."
  }
};

export default sunday;
