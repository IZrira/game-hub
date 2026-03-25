import { Character } from '../../../../common-hub/types';

const tribbie: Character = {
  id: "tribbie",
  name: "트리비",
  folderName: "트리비",
  gameId: "hsr",
  attribute: "양자",
  path: "화합",
  rarity: 5,
  affiliation: "엠포리어스",
  briefInfo: "삼상의 신탁의 자비를 받은 성지에서, 전달자는 수많은 몸으로 나뉘어 먼 길을 떠났다.\n야누소폴리스의 성녀 트리스비오스, 「통로」의 불씨를 훔친 황금의 후예. 모든 생명을 위해 세상을 구할 소식을 온 땅에 전달한다.\n——황금 피가 흐르는 사람의 아이를 찾아 세상의 어둠을 뚫고 별과 달이 가득한 내일을 향해 나아가길",
  version: "3.1",
  releaseVersion: "3.1",
  languageNames: "🇰🇷 트리비 / 🇺🇸 Tribbie / 🇨🇳 缇宝 / 🇯🇵 トリビー",
  voiceActors: "🇰🇷 방연지 / 🇺🇸 헤이든 다비오 / 🇨🇳 차이슈진 / 🇯🇵 토오노 히카루",
  metadata: {
    name: "트리비",
    language: "🇰🇷 트리비 / 🇺🇸 Tribbie / 🇨🇳 缇宝 / 🇯🇵 トリビー",
    element: "양자",
    path: "화합",
    rarity: 5,
    affiliation: "엠포리어스",
    cv: "🇰🇷 방연지 / 🇺🇸 헤이든 다비오 / 🇨🇳 차이슈진 / 🇯🇵 토오노 히카루",
    releaseVersion: "3.1",
    brief: "삼상의 신탁의 자비를 받은 성지에서, 전달자는 수많은 몸으로 나뉘어 먼 길을 떠났다.\n야누소폴리스의 성녀 트리스비오스, 「통로」의 불씨를 훔친 황금의 후예. 모든 생명을 위해 세상을 구할 소식을 온 땅에 전달한다.\n——황금 피가 흐르는 사람의 아이를 찾아 세상의 어둠을 뚫고 별과 달이 가득한 내일을 향해 나아가길"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 71, "기초 방어력": 99 },
    lv20: { "기초 HP": 278, "기초 공격력": 139, "기초 방어력": 193 },
    lv30: { "기초 HP": 406, "기초 공격력": 203, "기초 방어력": 282 },
    lv40: { "기초 HP": 535, "기초 공격력": 267, "기초 방어력": 371 },
    lv50: { "기초 HP": 663, "기초 공격력": 332, "기초 방어력": 460 },
    lv60: { "기초 HP": 791, "기초 공격력": 396, "기초 방어력": 550 },
    lv70: { "기초 HP": 920, "기초 공격력": 460, "기초 방어력": 639 },
    lv80: { "기초 HP": 1048, "기초 공격력": 524, "기초 방어력": 728 },
    speed: 96,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "어두운 장막의 달빛", count: "65", rarity: 4 },
      { name: "공포에 짓밟힌 육신", count: "15", rarity: 2 },
      { name: "용기에 찢긴 가슴", count: "15", rarity: 3 },
      { name: "영광의 세례를 받은 육신", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "공동의 염원의 유음", count: "12", rarity: 4 },
      { name: "구름 위 음표", count: "18", rarity: 2 },
      { name: "천상의 소절", count: "69", rarity: 3 },
      { name: "천외의 악장", count: "139", rarity: 4 },
      { name: "공포에 짓밟힌 육신", count: "41", rarity: 2 },
      { name: "용기에 찢긴 가슴", count: "56", rarity: 3 },
      { name: "영광의 세례를 받은 육신", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "100층짜리 미니 로켓",
      tag: "일반 공격 | 확산",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10 확산 5",
      spRecovery: "+1",
      description: "지정된 단일 적에게 트리비 HP 최대치의 30%만큼 양자 속성 피해를 가하고, 인접한 목표에게 트리비 HP 최대치의 15%만큼 양자 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "선물이 다 어디 갔지?",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "3턴 동안 지속되는 [신의 계시]를 획득하며, 자신의 턴이 시작될 때마다 지속 턴 수가 1 감소한다. 트리비가 [신의 계시]를 보유할 시 모든 아군의 모든 속성 저항 관통이 24% 증가한다",
      icon: "skill_1"
    },
    {
      name: "여기에 누가 살고 있게?",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "결계를 활성화하고, 모든 적에게 트리비 HP 최대치의 30%만큼 양자 속성 피해를 가한다.\n결계 지속 시간 동안 적이 받는 피해가 30% 증가한다. 아군에게 피격 후, 피격된 목표가 1기 있을 때마다 피격된 목표 중 현재 HP가 가장 높은 목표에게 트리비 HP 최대치의 12%만큼 양자 속성 추가 피해를 1회 가한다.\n결계는 2턴 동안 지속되며, 자신의 턴이 시작될 때마다 결계 지속 턴 수가 1 감소한다",
      icon: "ultimate_1"
    },
    {
      name: "트리비는 너무 바빠",
      tag: "특성 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 5",
      spRecovery: "0",
      description: "다른 아군 캐릭터가 필살기를 발동하면 트리비가 추가 공격을 발동하여 모든 적에게 트리비 HP 최대치의 18%만큼 양자 속성 피해를 가한다. 해당 효과는 캐릭터마다 최대 1회 발동하며, 트리비가 필살기를 발동할 시 다른 아군 캐릭터의 발동 가능 횟수가 초기화된다. 추가 공격 발동 전에 목표가 처치되면 필드에 새로 등장한 적에게 추가 공격을 발동한다",
      icon: "talent_1"
    },
    {
      name: "모두 다 같이 손뼉을",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후 전투 진입 시 [신의 계시]를 획득한다, 지속 시간: 3턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "성벽 밖의 어린양...", description: "특성의 추가 공격 발동 후, 트리비가 가하는 피해가 72% 증가한다, 해당 효과 최대 중첩수: 3스택, 지속 시간: 3턴", icon: "bonus_1" },
    { name: "날개 달린 유리구슬!", description: "결계 지속 시간 동안 트리비의 HP 최대치가 모든 아군 캐릭터 HP 최대치 총합의 9%만큼 증가한다", icon: "bonus_2" },
    { name: "갈림길 옆 돌멩이?", description: "전투 시작 시 트리비의 에너지가 30pt 회복된다. 다른 아군이 공격 후 목표를 1기 명중할 때마다 트리비의 에너지가 1.5pt 회복된다.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 피해", value: "37.3%", icon: "crit_dmg" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "설탕을 줍는 축제", description: "결계 지속 시간 동안 아군이 적을 공격하면 결계가 추가 피해를 가하는 목표에게 추가로 이번 공격 총 피해량의 24%만큼 확정 피해를 가한다", icon: "eidolon_1" },
    { rank: "E02", name: "좋은 꿈을 탐방하는 길잡이", description: "결계가 가하는 추가 피해가 기존 피해의 120%로 증가한다. 결계가 추가 피해를 가할 시 추가 피해를 1회 추가로 가한다", icon: "eidolon_2" },
    { rank: "E03", name: "아침 햇살이 가득한 보물", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "마음이 통하는 평안", description: "[신의 계시] 지속 시간 동안, 모든 아군이 피해를 가할 시 목표의 방어력을 18% 무시한다", icon: "eidolon_4" },
    { rank: "E05", name: "기적을 여는 시계", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "별과 달이 가득한 내일", description: "트리비가 필살기 발동 후, 모든 적에게 특성의 추가 공격을 발동한다. 특성의 추가 공격이 가하는 피해가 729% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "추가 피해": "피격자에게 추가로 피해를 가한다. 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다.",
    "결계": "특정 스킬을 통해 생성되는 특수 영역. 영역 내 아군을 강화하거나 적에게 효과를 부여한다.",
    "[신의 계시]": "트리비가 전투 스킬 발동 시 획득하는 버프. 보유 시 모든 아군의 모든 속성 저항 관통이 증가한다."
  }
};

export default tribbie;
