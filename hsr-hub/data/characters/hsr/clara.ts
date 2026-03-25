
import { Character } from '../../../../common-hub/types';

const clara: Character = {
  id: "clara",
  gameId: "hsr",
  name: "클라라",
  folderName: "클라라",
  attribute: "물리",
  path: "파멸",
  rarity: 5,
  affiliation: "벨로보그",
  briefInfo: "로봇 스바로그와 함께 사는 소녀. 내성적이고 여리지만, 가족을 지키기 위해 강해지기로 결심했다.",
  version: "4.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 클라라 / 🇺🇸 Clara / 🇨🇳 克拉拉 / 🇯🇵 クラーラ",
  voiceActors: "🇰🇷 김서영&최한 / 🇺🇸 에밀리 선&D.C. 더글라스 / 🇨🇳 쯔쑤주&펑위 / 🇯🇵 히다카 리나&야스모토 히로키",
  baseStats: {
    lv1: { "기초 HP": 169, "기초 공격력": 99, "기초 방어력": 66 },
    lv20: { "기초 HP": 329, "기초 공격력": 195, "기초 방어력": 128 },
    lv30: { "기초 HP": 482, "기초 공격력": 285, "기초 방어력": 187 },
    lv40: { "기초 HP": 634, "기초 공격력": 376, "기초 방어력": 246 },
    lv50: { "기초 HP": 786, "기초 공격력": 466, "기초 방어력": 305 },
    lv60: { "기초 HP": 938, "기초 공격력": 556, "기초 방어력": 364 },
    lv70: { "기초 HP": 1090, "기초 공격력": 646, "기초 방어력": 423 },
    lv80: { "기초 HP": 1242, "기초 공격력": 737, "기초 방어력": 485 },
    speed: 90,
    taunt: 125,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "강철 늑대의 깨진 이빨", count: "65", rarity: 4 },
      { name: "고대 부속품", count: "15", rarity: 2 },
      { name: "고대 전동축", count: "15", rarity: 3 },
      { name: "고대 엔진", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "부서진 칼날", count: "18", rarity: 2 },
      { name: "무생의 칼날", count: "69", rarity: 3 },
      { name: "정화의 칼날", count: "139", rarity: 4 },
      { name: "고대 부속품", count: "41", rarity: 2 },
      { name: "고대 전동축", count: "56", rarity: 3 },
      { name: "고대 엔진", count: "58", rarity: 4 }
    ]
  },
  skills: [
    { name: "나도 도와줄게", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 클라라 공격력 100%만큼의 물리 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "스바로그가 지켜봐", tag: "전투 스킬 | 범위 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 범위 공격 10", spRecovery: "-1", description: "모든 적에게 클라라 공격력 120%만큼의 물리 속성 피해를 가한다. 또한 [스바로그의 표식]이 있는 적에게 가하는 피해가 2배로 증가한다. 이번 전투 스킬 발동 후 모든 [스바로그의 표식]은 사라진다", icon: "skill_1" },
    { name: "명령은 옥좌가 아닌 약속", tag: "필살기 | 강화", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "필살기 발동 후 클라라가 받는 피해가 25% 감소하고 적에게 피격될 확률이 대폭 증가한다. 지속 시간: 2턴. 동시에 스바로그의 [반격]이 강화된다. 아군이 피격되면 스바로그의 [반격]이 발동하고, 적에게 가하는 피해 계수가 160% 증가하며, 인접한 목표에게 주 목표에 가하는 피해의 50%만큼 피해를 준다. 강화된 [반격]은 2회 발동할 수 있다", icon: "ultimate_1" },
    { name: "가족이니까", tag: "특성 | 단일 공격", energyRegen: "0", toughnessDMG: "0", description: "스바로그의 보호 아래 클라라가 받는 피해가 10% 감소한다. 클라라를 공격한 적은 [스바로그의 표식]이 부여되고 스바로그가 [반격]을 발동해 클라라 공격력 160%만큼의 물리 속성 피해를 가한다", icon: "talent_1" },
    { name: "승리의 대가", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "0", description: "즉시 적을 공격하며, 전투 진입 후 2턴 동안 클라라가 적에게 피격될 확률이 증가한다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "가족", description: "피격 시 35%의 고정 확률로 자신의 디버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "수호", description: "제어류 디버프 상태 저항 확률이 35% 증가한다", icon: "bonus_2" },
    { name: "복수", description: "스바로그의 [반격]으로 가하는 피해가 30% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "물리 속성 피해 증가", value: "14.4%", icon: "physical_dmg" },
    { type: "HP", value: "10.0%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "거대한 뒷모습", description: "전투 스킬 발동 후 적의 [스바로그의 표식]이 사라지지 않는다", icon: "eidolon_1" },
    { rank: "E02", name: "따뜻한 포옹", description: "필살기 발동 후 공격력이 30% 증가한다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "차가운 강철 갑옷", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "가족의 따뜻함", description: "피격 후 클라라가 받는 피해가 30% 감소한다. 지속 시간: 1턴", icon: "eidolon_4" },
    { rank: "E05", name: "작은 약속", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "오랜 동반자", description: "다른 아군이 피격되어도 50%의 고정 확률로 스바로그의 [반격]이 발동하고 공격한 적에게 [스바로그의 표식]을 부여한다. 필살기 발동 시 강화된 [반격] 횟수가 1회 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "반격": "피격된 후, 공격자에게 자동으로 발동하는 공격."
  }
};

export default clara;
