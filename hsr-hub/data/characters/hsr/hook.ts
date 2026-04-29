
import { Character } from '../../../../common-hub/types';

const hook: Character = {
  id: "hook",
  gameId: "hsr",
  name: "후크",
  folderName: "후크",
  attribute: "화염",
  path: "파멸",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "지하 모험단 「두더지파」의 대장(자칭)\n자유를 사랑하며 인생을 끊이지 않는 모험이라고 생각한다",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 후크 / 🇺🇸 Hook / 🇨🇳 虎克 / 🇯🇵 フック",
  voiceActors: "🇰🇷 이재현 / 🇺🇸 펠리시아 앤젤 / 🇨🇳 왕야촨 / 🇯🇵 토쿠이 소라",
  baseStats: {
    lv1: { "기초 HP": 182, "기초 공격력": 84, "기초 방어력": 48 },
    lv20: { "기초 HP": 357, "기초 공격력": 164, "기초 방어력": 94 },
    lv30: { "기초 HP": 521, "기초 공격력": 240, "기초 방어력": 137 },
    lv40: { "기초 HP": 686, "기초 공격력": 316, "기초 방어력": 181 },
    lv50: { "기초 HP": 850, "기초 공격력": 391, "기초 방어력": 224 },
    lv60: { "기초 HP": 1015, "기초 공격력": 467, "기초 방어력": 268 },
    lv70: { "기초 HP": 1179, "기초 공격력": 543, "기초 방어력": 311 },
    lv80: { "기초 HP": 1344, "기초 공격력": 617, "기초 방어력": 352 },
    speed: 94,
    taunt: 125,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "상온 갑각", count: "50", rarity: 4 },
      { name: "고대 부속품", count: "12", rarity: 2 },
      { name: "고대 전동축", count: "13", rarity: 3 },
      { name: "고대 엔진", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "9", rarity: 4 },
      { name: "부서진 칼날", count: "8", rarity: 2 },
      { name: "무생의 칼날", count: "42", rarity: 3 },
      { name: "정화의 칼날", count: "77", rarity: 4 },
      { name: "고대 부속품", count: "22", rarity: 2 },
      { name: "고대 전동축", count: "35", rarity: 3 },
      { name: "고대 엔진", count: "20", rarity: 4 }
    ]
  },
  skills: [
    { name: "헤이! 봐주지 않아!", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 후크 공격력 100%만큼의 화염 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "헤이! 불 맛 좀 봐!", tag: "전투 스킬 | 단일 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 단일 공격 20", spRecovery: "-1", description: "지정된 단일 적에게 후크 공격력 240%만큼의 화염 속성 피해를 가하고, 100%의 기본 확률로 피격된 적을 연소 상태에 빠트린다. 지속 시간: 2턴. 연소 상태의 적은 턴이 시작될 때마다 후크 공격력 65%만큼의 화염 속성 지속 피해를 받는다", icon: "skill_1" },
    { name: "쾅! 날아가는 불꽃!", tag: "필살기 | 단일 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 단일 공격 30", description: "지정된 단일 적에게 후크 공격력 400%만큼의 화염 속성 피해를 가한다. 필살기 발동 후 다음번 전투 스킬이 강화되어 지정된 단일 적 및 인접한 목표에게 피해를 준다", icon: "ultimate_1" },
    { name: "하! 불장난이나 해볼까?", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "연소 상태의 적을 공격하면 추가로 후크 공격력 100%만큼의 화염 속성 추가 피해를 가하고 에너지를 5pt 추가 회복한다", icon: "talent_1" },
    { name: "윽! 난장판이잖아!", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 임의의 단일 적에게 후크 공격력 50%만큼의 화염 속성 피해를 가하고, 100%의 기본 확률로 모든 적을 연소 상태에 빠트린다. 지속 시간: 3턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "천진난만", description: "특성 발동 시 HP를 HP 최대치의 5%만큼 회복한다", icon: "bonus_1" },
    { name: "이해", description: "제어류 디버프 상태 저항 확률이 35% 증가한다", icon: "bonus_2" },
    { name: "불장난", description: "필살기 발동 후 후크의 행동 게이지가 20% 증가하고 에너지를 5pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "HP", value: "18.0%", icon: "hp" },
    { type: "치명타 피해", value: "24.0%", icon: "crit_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "일찍 자고 일찍 일어나기", description: "강화된 전투 스킬이 가하는 피해가 20% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "잘 먹고 쑥쑥 크기", description: "전투 스킬의 연소 상태 지속 시간이 1턴 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "고르지 않고 다 먹기", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "건드리면 알지?", description: "특성 발동 시 100%의 기본 확률로 지정된 적과 인접한 목표를 연소 상태에 빠트린다", icon: "eidolon_4" },
    { rank: "E05", name: "이름 날리기", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "악당은 언제나 뒤에서 준비하지", description: "연소 상태의 적에게 가하는 피해가 20% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 20% 증가하여 행동 순서가 앞당겨진다."
  }
};

export default hook;
