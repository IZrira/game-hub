
import { Character } from '../../../types';

const herta: Character = {
  id: "herta",
  gameId: "hsr",
  name: "헤르타",
  folderName: "헤르타",
  attribute: "얼음",
  path: "지식",
  rarity: 4,
  affiliation: "우주정거장 「헤르타」",
  briefInfo: "지니어스 클럽 #83. 우주정거장의 진정한 주인. 콧대 높은 천재 소녀.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 헤르타 / 🇺🇸 Herta / 🇨🇳 黑塔 / 🇯🇵 ヘルタ",
  voiceActors: "🇰🇷 김서영 / 🇺🇸 PJ 마트모스 / 🇨🇳 허우샤오페이 / 🇯🇵 야마자키 하루카",
  baseStats: {
    lv1: { "기초 HP": 129, "기초 공격력": 79, "기초 방어력": 54 },
    lv20: { "기초 HP": 253, "기초 공격력": 154, "기초 방어력": 105 },
    lv30: { "기초 HP": 370, "기초 공격력": 225, "기초 방어력": 154 },
    lv40: { "기초 HP": 487, "기초 공격력": 296, "기초 방어력": 203 },
    lv50: { "기초 HP": 604, "기초 공격력": 367, "기초 방어력": 251 },
    lv60: { "기초 HP": 721, "기초 공격력": 438, "기초 방어력": 300 },
    lv70: { "기초 HP": 838, "기초 공격력": 509, "기초 방어력": 348 },
    lv80: { "기초 HP": 952, "기초 공격력": 582, "기초 방어력": 397 },
    speed: 100,
    taunt: 75,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "눈보라의 뿔", count: "50", rarity: 4 },
      { name: "소멸된 코어", count: "12", rarity: 2 },
      { name: "희미한 빛의 코어", count: "13", rarity: 3 },
      { name: "꿈틀대는 코어", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "영감의 열쇠", count: "12", rarity: 2 },
      { name: "계몽의 열쇠", count: "54", rarity: 3 },
      { name: "지식의 열쇠", count: "105", rarity: 4 },
      { name: "소멸된 코어", count: "28", rarity: 2 },
      { name: "희미한 빛의 코어", count: "42", rarity: 3 },
      { name: "꿈틀대는 코어", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "뭘 봐", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 헤르타 공격력 100%만큼의 얼음 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "한 번에 입찰해", tag: "전투 스킬 | 범위 공격", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 범위 공격 10", spRecovery: "-1", description: "모든 적에게 헤르타 공격력 100%만큼의 얼음 속성 피해를 가한다. 적의 HP 백분율이 50% 이상일 경우 해당 적에게 가하는 피해가 20% 증가한다", icon: "skill_1" },
    { name: "내가 마법을 걸었어", tag: "필살기 | 범위 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 헤르타 공격력 200%만큼의 얼음 속성 피해를 가한다", icon: "ultimate_1" },
    { name: "내가 뭘 좀 해볼게", tag: "특성 | 범위 공격", energyRegen: "0", toughnessDMG: "0", description: "임의의 아군의 공격으로 적의 HP 백분율이 50% 이하가 되면, 헤르타는 즉시 추가 공격을 발동해 모든 적에게 공격력 40%만큼의 얼음 속성 피해를 가한다", icon: "talent_1" },
    { name: "최적화 가능", tag: "비술 | 강화", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 다음 전투 시작 시 헤르타의 공격력이 40% 증가한다. 지속 시간: 3턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "효율", description: "전투 스킬 발동 시, 타깃의 현재 HP 백분율이 50% 이상이면 전투 스킬의 효과 명중이 25% 증가한다", icon: "bonus_1" },
    { name: "인형", description: "제어류 디버프 상태에 저항할 확률이 35% 증가한다", icon: "bonus_2" },
    { name: "빙결", description: "필살기 발동 시 빙결 상태의 적에게 가하는 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "얼음 속성 피해 증가", value: "22.4%", icon: "ice_dmg" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "치명타 확률", value: "6.7%", icon: "crit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "세상이 부서져도 난 몰라", description: "일반 공격 발동 시 지정된 적의 HP 백분율이 50% 이하일 경우, 일반 공격 40%만큼의 얼음 속성 추가 피해를 가한다", icon: "eidolon_1" },
    { rank: "E02", name: "승리하고도 추격하지 않음은 없어", description: "특성이 1회 발동할 때마다 헤르타의 치명타 확률이 3% 증가한다. 최대 중첩수: 5스택", icon: "eidolon_2" },
    { rank: "E03", name: "내가 바로 그런 여자", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "때리는 곳만 골라 때려", description: "특성 발동 시 가하는 피해가 10% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "욕해도 좋고 때려도 좋아", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "나를 배신하는 자는 없어", description: "필살기 발동 후 공격력이 25% 증가한다. 지속 시간: 1턴", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 공격. 턴을 소모하지 않는다."
  }
};

export default herta;
