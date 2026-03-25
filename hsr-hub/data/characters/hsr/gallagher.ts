
import { Character } from '../../../../common-hub/types';

const gallagher: Character = {
  id: "gallagher",
  gameId: "hsr",
  name: "갤러거",
  folderName: "갤러거",
  attribute: "화염",
  path: "풍요",
  rarity: 4,
  affiliation: "페나코니",
  briefInfo: "페나코니 사냥개 가문의 보안관. 손님에게 예의를 차리지만 경계심이 있다. 복잡한 과거가 있는 것 같지만, 절대 먼저 이야기를 꺼내지 않는다",
  version: "2.1",
  releaseVersion: "2.1",
  languageNames: "🇰🇷 갤러거 / 🇺🇸 Gallagher / 🇨🇳 加拉赫 / 🇯🇵 ギャラガー",
  voiceActors: "🇰🇷 박상훈 / 🇺🇸 에릭 브라 / 🇨🇳 마어페이(马语非) / 🇯🇵 미카미 사토시",
  metadata: {
    name: "갤러거",
    language: "🇰🇷 갤러거 / 🇺🇸 Gallagher / 🇨🇳 加拉赫 / 🇯🇵 ギャラガー",
    element: "화염",
    path: "풍요",
    rarity: 4,
    affiliation: "페나코니",
    cv: "🇰🇷 박상훈 / 🇺🇸 에릭 브라 / 🇨🇳 마어페이(马语非) / 🇯🇵 미카미 사토시",
    releaseVersion: "2.1",
    brief: "페나코니 사냥개 가문의 보안관. 손님에게 예의를 차리지만 경계심이 있다. 복잡한 과거가 있는 것 같지만, 절대 먼저 이야기를 꺼내지 않는다"
  },
  baseStats: {
    lv1: { "기초 HP": 178, "기초 공격력": 72, "기초 방어력": 60 },
    lv20: { "기초 HP": 346, "기초 공격력": 140, "기초 방어력": 117 },
    lv30: { "기초 HP": 506, "기초 공격력": 205, "기초 방어력": 171 },
    lv40: { "기초 HP": 666, "기초 공격력": 270, "기초 방어력": 225 },
    lv50: { "기초 HP": 826, "기초 공격력": 335, "기초 방어력": 279 },
    lv60: { "기초 HP": 986, "기초 공격력": 400, "기초 방어력": 333 },
    lv70: { "기초 HP": 1146, "기초 공격력": 464, "기초 방어력": 387 },
    lv80: { "기초 HP": 1305, "기초 공격력": 529, "기초 방어력": 441 },
    speed: 98,
    taunt: 100,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "격분한 심장", count: "50", rarity: 4 },
      { name: "꿈 저장 부품", count: "12", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "13", rarity: 3 },
      { name: "꿈 제조 모터", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "12", rarity: 4 },
      { name: "이계 나무의 씨앗", count: "12", rarity: 2 },
      { name: "생장의 꽃꿀", count: "54", rarity: 3 },
      { name: "만상의 과실", count: "105", rarity: 4 },
      { name: "꿈 저장 부품", count: "28", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "42", rarity: 3 },
      { name: "꿈 제조 모터", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "콜키지",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 갤러거 공격력의 100%만큼 화염 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "솟구치는 거품",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 30",
      spRecovery: "0",
      description: "지정된 단일 적에게 갤러거 공격력의 250%만큼 화염 속성 피해를 가하고, 목표의 공격력을 15% 감소시킨다. 지속 시간: 2턴",
      icon: "basic_atk_2"
    },
    {
      name: "특제 캔 음료",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "즉시 지정된 단일 아군의 HP를 1600pt 회복한다",
      icon: "skill_1"
    },
    {
      name: "샴페인 에티켓",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적을 [만취] 상태에 빠트린다. 지속 시간: 2턴. \n동시에 모든 적에게 갤러거 공격력의 150%만큼 화염 속성 피해를 가하고, 다음번 일반 공격을 [솟구치는 거품]으로 강화한다",
      icon: "ultimate_1"
    },
    {
      name: "통쾌한 전투",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "[만취]는 목표가 받는 격파 피해를 12% 증가시킨다. [만취] 상태의 목표가 아군 캐릭터의 공격을 받을 때마다 공격자는 HP를 640pt 회복한다",
      icon: "talent_1"
    },
    {
      name: "빈티지 개봉",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "적을 바로 공격하며, 전투 진입 후 모든 적을 [만취] 상태에 빠트린다. 지속 시간: 2턴. 또한, 모든 적에게 갤러거 공격력의 50%만큼 화염 속성 피해를 가한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "새로운 레시피", description: "자신이 제공하는 치유량이 격파 특수효과의 50%만큼 증가한다. 제공하는 치유량은 최대 75% 증가한다", icon: "bonus_1" },
    { name: "천연 효모", description: "필살기 발동 후 즉시 자신의 행동 게이지가 100% 증가한다", icon: "bonus_2" },
    { name: "위하여!", description: "갤러거가 [솟구치는 거품]을 발동하여 [만취] 상태에 빠진 목표를 공격하면 이번에 특성이 제공하는 HP 회복 효과가 아군 동료에게도 적용된다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "효과 저항", value: "28%", icon: "res" },
    { type: "격파 특수효과", value: "13.3%", icon: "break_effect" },
    { type: "HP", value: "18%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "솔티 도그", description: "갤러거가 전투 진입 후 에너지를 20pt 회복하고, 효과 저항이 50% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "라이온스 테일", description: "전투 스킬 발동 시 지정된 단일 아군의 디버프 효과를 1개 해제하고, 해당 아군의 효과 저항을 30% 증가시킨다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "코프스 리바이버", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "라스트 워드", description: "갤러거가 필살기로 가하는 [만취] 상태의 지속 시간이 1턴 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "데스 인 디 애프터눈", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.1", icon: "eidolon_5" },
    { rank: "E06", name: "블러드 앤 샌드", description: "갤러거의 격파 특수효과가 20% 증가하고, 약점 격파 효율이 20% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "[만취]": "갤러거의 필살기로 적에게 부여되는 디버프. 해당 상태의 적을 공격한 아군은 HP를 회복한다."
  }
};

export default gallagher;
