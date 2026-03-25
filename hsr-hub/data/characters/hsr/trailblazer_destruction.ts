import { Character } from '../../../../common-hub/types';

const trailblazerDestruction: Character = {
  id: "trailblazer_physical",
  gameId: "hsr",
  name: "개척자 (파멸)",
  folderName: "개척자 (파멸)",
  attribute: "물리",
  path: "파멸",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "은하열차에 탑승한 {F#소녀}{M#소년}. 스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다.",
  releaseVersion: "1.0",
  isTrailblazer: true,
  languageNames: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
  voiceActors: "🇰🇷 김명준·방연지 / 🇺🇸 케일럽 옌 / 🇨🇳 秦且歌 / 🇯🇵 에노키 쥰야·이시카와 유이",
  baseStats: {
    lv1: { "기초 HP": 163, "기초 공격력": 84, "기초 방어력": 62 },
    lv20: { "기초 HP": 319, "기초 공격력": 164, "기초 방어력": 121 },
    lv30: { "기초 HP": 466, "기초 공격력": 240, "기초 방어력": 177 },
    lv40: { "기초 HP": 614, "기초 공격력": 316, "기초 방어력": 233 },
    lv50: { "기초 HP": 761, "기초 공격력": 391, "기초 방어력": 289 },
    lv60: { "기초 HP": 909, "기초 공격력": 467, "기초 방어력": 345 },
    lv70: { "기초 HP": 1056, "기초 공격력": 543, "기초 방어력": 401 },
    lv80: { "기초 HP": 1203, "기초 공격력": 620, "기초 방어력": 460 },
    speed: 100,
    taunt: 125,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "깊은 별의 외형질", count: "28", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "부서진 칼날", count: "18", rarity: 2 },
      { name: "무생의 칼날", count: "69", rarity: 3 },
      { name: "정화의 칼날", count: "139", rarity: 4 },
      { name: "약탈의 본능", count: "41", rarity: 2 },
      { name: "변조된 야망", count: "56", rarity: 3 },
      { name: "짓밟힌 의지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    { name: "안녕, 견제타", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 개척자 공격력 100%만큼의 물리 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "안타, 홈런", tag: "전투 스킬 | 범위 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 범위 공격 20", spRecovery: "-1", description: "지정된 단일 적 및 인접한 목표에게 개척자 공격력 125%만큼의 물리 속성 피해를 준다.", icon: "skill_1" },
    { name: "스타더스트 에이스", tag: "필살기 | 강화", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "즉시 [전면 승부] 혹은 [범위 강타] 중 1개의 공격 모드를 선택해 전력을 다한 타격을 가한다. [전면 승부]: 지정된 단일 적에게 개척자 공격력 450%만큼의 물리 속성 피해를 가한다. [범위 강타]: 지정된 단일 적에게 개척자 공격력 270%만큼의 물리 속성 피해를 가하고, 인접한 목표에게 개척자 공격력 162%만큼의 물리 속성 피해를 가한다.", icon: "ultimate_1" },
    { name: "퍼펙트 픽업", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "적의 약점을 격파할 때마다 공격력이 20% 증가한다. 최대 중첩수: 2스택.", icon: "talent_1" },
    { name: "불멸의 삼진", tag: "비술 | 회복", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 즉시 모든 아군의 HP를 각자 HP 최대치의 15%만큼 회복한다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "축포", description: "필살기 발동 시, [전면 승부]를 발동하면 소모된 HP 비율에 따라 가하는 피해가 증가한다.", icon: "bonus_1" },
    { name: "굳건한 투지", description: "공격 발동 후 현재 HP 백분율이 10% 이하일 경우, 즉시 HP 최대치의 5%만큼 HP를 회복한다.", icon: "bonus_2" },
    { name: "투지", description: "전투 스킬 발동 시, 지정된 적의 HP 백분율이 높을수록 가하는 피해가 증가한다.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "HP", value: "18.0%", icon: "hp" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "추락하는 별을 위한 만가", description: "필살기로 적 처치 시 개척자는 에너지를 10pt 회복한다. 해당 효과는 공격 1회당 1회만 발동한다", icon_f: "eidolon_1_f", icon_m: "eidolon_1_m" },
    { rank: "E02", name: "타의에 의한 불행한 가장자리", description: "공격 발동 시, 지정된 적의 약점이 물리 속성이면 개척자 공격력 5%만큼의 HP를 회복한다", icon_f: "eidolon_2_f", icon_m: "eidolon_2_m" },
    { rank: "E03", name: "속삭이는 징조", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon_f: "eidolon_3_f", icon_m: "eidolon_3_m" },
    { rank: "E04", name: "파괴적인 응시", description: "약점이 격파된 적을 공격할 시 치명타 확률이 25% 증가한다", icon_f: "eidolon_4_f", icon_m: "eidolon_4_m" },
    { rank: "E05", name: "희망을 품은 생존", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon_f: "eidolon_5_f", icon_m: "eidolon_5_m" },
    { rank: "E06", name: "토플리스의 의지", description: "적 처치 시 특성 또한 발동한다", icon_f: "eidolon_6_f", icon_m: "eidolon_6_m" }
  ]
};

export default trailblazerDestruction;