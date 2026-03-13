
import { Character } from '../../../types';

const pela: Character = {
  id: "pela",
  gameId: "hsr",
  name: "페라",
  folderName: "페라",
  attribute: "얼음",
  path: "공허",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "실버메인 철위대의 정보관. 빈틈없고 똑똑하다. 본명은 페라게야 세르게예브나. 나이는 어리지만 머리 회전이 빠르고 업무 능력도 뛰어나다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 페라 / 🇺🇸 Pela / 🇨🇳 佩拉 / 🇯🇵 ペラ",
  voiceActors: "🇰🇷 이다은 / 🇺🇸 잰시 윈 / 🇨🇳 옌닝 / 🇯🇵 모로호시 스미레",
  baseStats: {
    lv1: { "기초 HP": 134, "기초 공격력": 74, "기초 방어력": 63 },
    lv20: { "기초 HP": 263, "기초 공격력": 145, "기초 방어력": 123 },
    lv30: { "기초 HP": 384, "기초 공격력": 212, "기초 방어력": 179 },
    lv40: { "기초 HP": 505, "기초 공격력": 279, "기초 방어력": 236 },
    lv50: { "기초 HP": 626, "기초 공격력": 346, "기초 방어력": 292 },
    lv60: { "기초 HP": 747, "기초 공격력": 413, "기초 방어력": 349 },
    lv70: { "기초 HP": 868, "기초 공격력": 480, "기초 방어력": 405 },
    lv80: { "기초 HP": 989, "기초 공격력": 546, "기초 방어력": 463 },
    speed: 105,
    taunt: 100,
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
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "54", rarity: 3 },
      { name: "타락의 흑요", count: "105", rarity: 4 },
      { name: "소멸된 코어", count: "28", rarity: 2 },
      { name: "희미한 빛의 코어", count: "42", rarity: 3 },
      { name: "꿈틀대는 코어", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "빙점 사격", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 페라 공격력 100%만큼의 얼음 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "저온 방해", tag: "전투 스킬 | 방해", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 단일 공격 20", spRecovery: "-1", description: "지정된 단일 적의 버프 효과를 1개 해제하고 페라 공격력 210%만큼의 얼음 속성 피해를 준다", icon: "skill_1" },
    { name: "영역 제압", tag: "필살기 | 방해", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 페라 공격력 100%만큼의 얼음 속성 피해를 주고, 100%의 기본 확률로 모든 적을 [분석] 상태에 빠트린다. [분석] 상태의 적은 방어력이 40% 감소한다. 지속 시간: 2턴", icon: "ultimate_1" },
    { name: "데이터 채집", tag: "특성 | 서포트", energyRegen: "0", toughnessDMG: "0", description: "공격 발동 후 적이 디버프 상태라면 페라는 에너지를 10pt 회복한다. 해당 효과는 공격 1회당 1회만 발동한다", icon: "talent_1" },
    { name: "선제 타격", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 임의의 단일 적에게 페라 공격력 80%만큼의 얼음 속성 피해를 가하고, 100%의 기본 확률로 모든 적의 방어력이 20% 감소한다. 지속 시간: 2턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "통증 전이", description: "디버프 상태의 적에게 가하는 피해가 20% 증가한다", icon: "bonus_1" },
    { name: "비책", description: "전투 진입 후 페라의 효과 명중이 10% 증가한다", icon: "bonus_2" },
    { name: "추격", description: "전투 스킬 발동 시 버프 효과를 해제하면 다음번 공격이 가하는 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "얼음 속성 피해 증가", value: "22.4%", icon: "ice_dmg" },
    { type: "효과 명중", value: "10.0%", icon: "effect_hit_rate" },
    { type: "공격력", value: "18.0%", icon: "atk" }
  ],
  eidolons: [
    { rank: "E01", name: "승리 피드백", description: "적 처치 시 페라는 에너지를 5pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "질풍신뢰", description: "전투 스킬 발동 시 버프 효과를 해제하면 속도가 10% 증가한다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "진압 업그레이드", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "완전 분석", description: "전투 스킬 발동 시 100%의 기본 확률로 적의 얼음 속성 저항이 12% 감소한다. 지속 시간: 2턴", icon: "eidolon_4" },
    { rank: "E05", name: "영점 제약", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "허약 추격", description: "공격 발동 후 적이 디버프 상태라면 페라 공격력 40%만큼의 얼음 속성 추가 피해를 가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 피해": "피격자에게 추가로 1회 피해를 가한다. 이번 피해는 1회 공격을 가한 것으로 간주하지 않는다"
  }
};

export default pela;
