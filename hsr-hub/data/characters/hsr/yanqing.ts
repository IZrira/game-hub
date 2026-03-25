
import { Character } from '../../../../common-hub/types';

const yanqing: Character = {
  id: "yanqing",
  gameId: "hsr",
  name: "연경",
  folderName: "연경",
  attribute: "얼음",
  path: "수렵",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」의 최강 검객이자 경원의 호위무사. 어리지만 검술 천재로 명성이 자자하다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 연경 / 🇺🇸 Yanqing / 🇨🇳 彦卿 / 🇯🇵 彦卿",
  voiceActors: "🇰🇷 이새벽 / 🇺🇸 앰버 메이 / 🇨🇳 먀오장 / 🇯🇵 이노우에 마리나",
  baseStats: {
    lv1: { "기초 HP": 121, "기초 공격력": 92, "기초 방어력": 56 },
    lv20: { "기초 HP": 236, "기초 공격력": 180, "기초 방어력": 109 },
    lv30: { "기초 HP": 345, "기초 공격력": 263, "기초 방어력": 159 },
    lv40: { "기초 HP": 453, "기초 공격력": 346, "기초 방어력": 209 },
    lv50: { "기초 HP": 562, "기초 공격력": 430, "기초 방어력": 259 },
    lv60: { "기초 HP": 671, "기초 공격력": 513, "기초 방어력": 309 },
    lv70: { "기초 HP": 779, "기초 공격력": 596, "기초 방어력": 359 },
    lv80: { "기초 HP": 892, "기초 공격력": 679, "기초 방어력": 412 },
    speed: 109,
    taunt: 75,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "혹한 갑각", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "짐승 사냥용 화살", count: "18", rarity: 2 },
      { name: "악마 사냥용 화살", count: "69", rarity: 3 },
      { name: "별 쫓는 화살", count: "139", rarity: 4 },
      { name: "약탈의 본능", count: "41", rarity: 2 },
      { name: "변조된 야망", count: "56", rarity: 3 },
      { name: "짓밟힌 의지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    { name: "상운의 검결", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 연경 공격력 100%만큼의 얼음 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "요동치는 옥검", tag: "전투 스킬 | 단일 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 단일 공격 20", spRecovery: "-1", description: "지정된 단일 적에게 연경 공격력 220%만큼의 얼음 속성 피해를 주고, 연경에게 [신검합일]을 부여한다. 지속 시간: 1턴", icon: "skill_1" },
    { name: "쾌우 사나운 제비", tag: "필살기 | 단일 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 단일 공격 30", description: "자신의 치명타 확률이 60% 증가한다. 연경이 [신검합일] 상태면 치명타 피해가 50% 증가한다. 버프 효과는 1턴간 지속되며, 그 후 지정된 단일 적에게 연경 공격력 350%만큼의 얼음 속성 피해를 가한다", icon: "ultimate_1" },
    { name: "예리한 짝", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "연경이 [신검합일] 상태일 때 피격될 확률이 감소하고, 자신의 치명타 확률이 20%, 치명타 피해가 30% 증가한다. 적 공격 후 60%의 고정 확률로 추가 공격을 발동해 연경 공격력 50%만큼의 얼음 속성 피해를 가하고, 65%의 기본 확률로 적을 빙결 상태에 빠트린다. 지속 시간: 1턴. 빙결 상태의 적은 턴이 시작될 때마다 연경 공격력 50%만큼의 얼음 속성 피해를 받는다. 연경이 피격되면 [신검합일] 효과는 사라진다", icon: "talent_1" },
    { name: "어검진결", tag: "비술 | 강화", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 다음번 전투 시작 시, 현재 HP 백분율이 50% 이상인 적에게 가하는 연경의 피해가 30% 증가한다. 지속 시간: 2턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "서리 칼날", description: "공격 발동 시 적의 약점이 얼음 속성이면 20%의 얼음 속성 추가 피해를 가한다", icon: "bonus_1" },
    { name: "능공", description: "[신검합일] 상태일 때 효과 저항이 20% 증가한다", icon: "bonus_2" },
    { name: "신속", description: "치명타 발동 시 2턴간 속도가 10% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "얼음 속성 피해 증가", value: "14.4%", icon: "ice_dmg" },
    { type: "HP", value: "10.0%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "티끌 없는 검심", description: "연경이 빙결 상태의 적을 공격하면 즉시 얼음 속성 60%의 추가 피해를 가한다", icon: "eidolon_1" },
    { rank: "E02", name: "청공을 가르는 검", description: "[신검합일] 상태일 때 에너지 회복효율이 10% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "검술의 으뜸", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "서리를 꿰뚫는 검", description: "현재 HP 백분율이 80% 이상일 때 자신의 얼음 속성 저항 관통이 12% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "천강을 베는 검", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "자재로운 움직임", description: "적 처치 시 필살기 버프 효과의 지속 시간이 1턴 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 공격. 턴을 소모하지 않는다."
  }
};

export default yanqing;
