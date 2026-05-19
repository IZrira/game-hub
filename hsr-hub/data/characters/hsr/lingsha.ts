
import { Character } from '../../../../common-hub/types';

const lingsha: Character = {
  id: "lingsha",
  name: "영사",
  folderName: "영사",
  gameId: "hsr",
  attribute: "화염",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 단정사의 신임 사정으로, 영리하고 아름다운 비디아다라 의사이다.\n후각이 예민하여 종종 냄새로 질병을 식별하고, 향을 사용해 타인의 심신을 안정시킨다.\n복잡한 인간관계 처리에 능숙하며, 마음속에서 불같이 화가 나더라도 겉으로는 여전히 빈틈을 보이지 않는다.",
  version: "2.5",
  releaseVersion: "2.5",
  languageNames: "🇰🇷 영사 / 🇺🇸 Lingsha / 🇨🇳 灵砂 / 🇯🇵 霊砂",
  voiceActors: "🇰🇷 장예나 / 🇺🇸 휘트니 홀랜드 / 🇨🇳 라오쯔쥔 / 🇯🇵 마에다 카오리",
  metadata: {
    name: "영사",
    language: "🇰🇷 영사 / 🇺🇸 Lingsha / 🇨🇳 灵砂 / 🇯🇵 霊砂",
    element: "화염",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 장예나 / 🇺🇸 휘트니 홀랜드 / 🇨🇳 라오쯔쥔 / 🇯🇵 마에다 카오리",
    releaseVersion: "2.5",
    brief: "선주 「나부」 단정사의 신임 사정으로, 영리하고 아름다운 비디아다라 의사이다.\n후각이 예민하여 종종 냄새로 질병을 식별하고, 향을 사용해 타인의 심신을 안정시킨다.\n복잡한 인간관계 처리에 능숙하며, 마음속에서 불같이 화가 나더라도 겉으로는 여전히 빈틈을 보이지 않는다."
  },
  baseStats: {
    lv1: { "기초 HP": 185, "기초 공격력": 92, "기초 방어력": 59 },
    lv20: { "기초 HP": 360, "기초 공격력": 180, "기초 방어력": 116 },
    lv30: { "기초 HP": 527, "기초 공격력": 263, "기초 방어력": 169 },
    lv40: { "기초 HP": 693, "기초 공격력": 347, "기초 방어력": 223 },
    lv50: { "기초 HP": 859, "기초 공격력": 430, "기초 방어력": 276 },
    lv60: { "기초 HP": 1026, "기초 공격력": 513, "기초 방어력": 330 },
    lv70: { "기초 HP": 1192, "기초 공격력": 596, "기초 방어력": 383 },
    lv80: { "기초 HP": 1358, "기초 공격력": 679, "기초 방어력": 437 },
    speed: 98,
    taunt: 100,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "격분한 심장", count: "65", rarity: 4 },
      { name: "영생의 새싹", count: "15", rarity: 2 },
      { name: "영생의 꽃", count: "15", rarity: 3 },
      { name: "영생의 가지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "길광편우", count: "9", rarity: 4 },
      { name: "보리인의 송곳니", count: "12", rarity: 2 },
      { name: "이계 나무의 씨앗", count: "53", rarity: 3 },
      { name: "생장의 꽃꿀", count: "101", rarity: 4 },
      { name: "만상의 과실", count: "33", rarity: 2 },
      { name: "공조 톱니바퀴", count: "46", rarity: 3 },
      { name: "공조 환류 심장", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "공향",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 영사 공격력 100%만큼 화염 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "연무 속 솟구치는 빛깔",
      tag: "전투 스킬 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 범위 10",
      spRecovery: "-1",
      description: "모든 적에게 영사 공격력의 80%만큼 화염 속성 피해를 가하고, 모든 아군의 HP를 영사 공격력의 14%+420만큼 회복하며, [부원]의 행동 게이지를 20% 증가 시킨다",
      icon: "skill_1"
    },
    {
      name: "천포를 가로지르는 홍연",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적을 [감취] 상태에 빠트린다. [감취] 상태에서는 목표가 받는격파 피해가 25%증가한다, 지속 시간: 2턴.\n모든 적에게 영사 공격력의 150%만큼 화염 속성 피해를 가하고, 모든 아군의 HP를 영사 공격력의 12%+360만큼 회복하며, [부원]의 행동 게이지를 100% 증가시킨다",
      icon: "ultimate_1"
    },
    {
      name: "자욱한 연무, 화생의 향훈",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "약점 격파 범위 10",
      description: "전투 스킬 발동 시 [부원]을 소환하며, 기본 상태에서 속도를 90pt, 행동 횟수를 3회 보유한다.\n[부원] 행동 시 추가 공격을 발동하고, 모든 적에게 영사 공격력의75%만큼 화염 속성 피해를 가한다. \n추가로 랜덤 단일 적에게 영사 공격력의 75%만큼 화염 속성 피해를 가하고, \n이번 피해는 강인성 수치가 0을 초과하고 화염 속성 약점을 보유한 목표를 우선으로 선택한다. \n모든 아군의 디버프 효과를 1개 해제하고 영사 공격력의 12%+360만큼 HP를 회복한다.\n[부원]은 행동 횟수를 최대 5회 누적 하며, 행동 횟수가 소진되거나 영사가 전투 불능 상태에 빠질 시 [부원]은 사라진다.\n[부원]이 필드에 있을 때 전투 스킬을 발동하면 [부원]의 행동 횟수가 3회 증가한다",
      icon: "talent_1"
    },
    {
      name: "흩어지는 연무의 색체",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 다음 전투 시작 시 즉시 [부원]을 소환하고, 모든 적을 [감취] 상태에 빠트린다, 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "적향", description: "자신의 공격력/치유량이 격파 특수효과의 25%/10%만큼 증가하며, 공격력/치유량은 최대 50%/20% 증가한다", icon: "bonus_1" },
    { name: "향연", description: "일반 공격 발동 시 추가로 에너지를 10pt 회복한다", icon: "bonus_2" },
    { name: "여향", description: "임의의 단일 아군이 피해를 받거나 HP를 소모할 시 현재 HP 백분율이 60% 이하일 경우, [부원]은 즉시 특성의 추가 공격을 발동하고, 이번 발동은 [부원]의 행동 횟수를 소모하지 않으며, 해당 효과는 2턴 후 다시 발동할 수 있다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "격파 특수효과", value: "37.3%", icon: "break_effect" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "공격력", value: "10%", icon: "atk" }
  ],
  eidolons: [
    { rank: "E01", name: "파사의 향기", description: "영사의 약점 격파 효율이 50% 증가한다. 적 유닛의 약점이 격파될 시 해당 적의 방어력이 20% 감소한다", icon: "eidolon_1" },
    { rank: "E02", name: "붉은 향로에 기대어", description: "필살기 발동 시 모든 아군의 격파 특수효과가 40% 증가한다. 지속 시간: 3턴", icon: "eidolon_2" },
    { rank: "E03", name: "새싹처럼 돋은 심지, 타오르는 꽃술", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "장막 너머 불어오는 향취", description: "[부원] 행동 시 현재 HP가 가장 낮은 아군의 HP를 영사 공격력의 40%만큼 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "둥글게 피어나는 향, 기울지 않는 중심", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "새벽녘 짙게 밴 난초향", description: "[부원]이 필드에 있을 시 모든 적의 모든 속성 저항이 20% 감소한다. [부원]이 공격 시 추가로 피해를 4회 가하고, 피해를 가할 때마다 랜덤 단일 적에게 영사 공격력의 50%만큼 화염 속성 피해와 5pt의 강인성 감소 수치를 가한다. 강인성 수치가 0을 초과하고 화염 속성 약점을 보유한 목표를 우선으로 선택한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 20% 또는 100% 증가하여 행동 순서가 앞당겨진다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "[부원]": "영사가 전투 스킬로 소환하는 특수 개체. 독자적인 속도와 행동 횟수를 가지며 아군을 치유하고 적을 공격한다.",
    "[감취]": "영사가 적에게 부여하는 디버프 상태. 해당 상태의 적은 받는 격파 피해가 증가한다."
  }
};

export default lingsha;
