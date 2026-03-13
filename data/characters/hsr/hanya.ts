
import { Character } from '../../../types';

const hanya: Character = {
  id: "hanya",
  gameId: "hsr",
  name: "한아",
  folderName: "한아",
  attribute: "물리",
  path: "화합",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 시왕사의 판관. 시왕의 명을 받아 명참천필을 관장하고 여러 가지 죄업을 판독하고 업보를 판결한다",
  version: "1.5",
  releaseVersion: "1.5",
  languageNames: "🇰🇷 한아/ 🇺🇸 Hanya / 🇨🇳 寒鸦 / 🇯🇵 寒鴉",
  voiceActors: "🇰🇷 윤은서 / 🇺🇸 수지 영 / 🇨🇳 장위씨 / 🇯🇵 스즈시로 사유미",
  metadata: {
    name: "한아",
    language: "🇰🇷 한아/ 🇺🇸 Hanya / 🇨🇳 寒鸦 / 🇯🇵 寒鴉",
    element: "물리",
    path: "화합",
    rarity: 4,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 윤은서 / 🇺🇸 수지 영 / 🇨🇳 장위씨 / 🇯🇵 스즈시로 사유미",
    releaseVersion: "1.5",
    brief: "선주 「나부」 시왕사의 판관. 시왕의 명을 받아 명참천필을 관장하고 여러 가지 죄업을 판독하고 업보를 판결한다"
  },
  baseStats: {
    lv1: { "기초 HP": 125, "기초 공격력": 77, "기초 방어력": 48 },
    lv20: { "기초 HP": 243, "기초 공격력": 150, "기초 방어력": 94 },
    lv30: { "기초 HP": 356, "기초 공격력": 219, "기초 방어력": 137 },
    lv40: { "기초 HP": 468, "기초 공격력": 288, "기초 방어력": 180 },
    lv50: { "기초 HP": 580, "기초 공격력": 357, "기초 방어력": 223 },
    lv60: { "기초 HP": 693, "기초 공격력": 426, "기초 방어력": 266 },
    lv70: { "기초 HP": 805, "기초 공격력": 495, "기초 방어력": 310 },
    lv80: { "기초 HP": 917, "기초 공격력": 564, "기초 방어력": 353 },
    speed: 110,
    taunt: 100,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "명부 명령", count: "50", rarity: 4 },
      { name: "공조 기계 부품", count: "12", rarity: 2 },
      { name: "공조 톱니바퀴", count: "13", rarity: 3 },
      { name: "공조 환류 심장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "12", rarity: 2 },
      { name: "가족의 찬가", count: "54", rarity: 3 },
      { name: "별들의 악장", count: "105", rarity: 4 },
      { name: "공조 기계 부품", count: "28", rarity: 2 },
      { name: "공조 톱니바퀴", count: "42", rarity: 3 },
      { name: "공조 환류 심장", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "명참천필(冥讖天筆)",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 한아 공격력 100%만큼의 물리 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "생멸속박",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적에게 한아 공격력의 240%만큼 물리 속성 피해를 주고, [부담] 상태에 빠트린다.\n아군이 [부담] 상태의 적에게 일반 공격, 전투 스킬, 필살기를 2회 발동할 때마다 즉시 아군의 전투 스킬 포인트를 1pt 회복한다. \n[부담]은 가장 최근에 부여된 목표에게만 적용되고, 전투 스킬 포인트 회복 효과를 2회 발동하면 자동으로 해제된다",
      icon: "skill_1"
    },
    {
      name: "시왕의 칙령, 모두 복종하라",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "지정된 단일 아군의 속도를 한아 속도의 20%만큼 증가시키고, 해당 목표의 공격력을 60% 증가시킨다. 지속 시간: 2턴",
      icon: "ultimate_1"
    },
    {
      name: "벌악",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "아군이 [부담] 상태에 빠진 적에게 일반 공격, 전투 스킬, 필살기 발동 시, 가하는 피해가 30% 증가한다. 지속 시간: 2턴",
      icon: "talent_1"
    },
    {
      name: "판명(判冥)",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "적을 바로 공격하며, 전투 진입 후 랜덤 단일 적에게 전투 스킬 효과와 동일한 [부담]을 부여한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "서기", description: "[부담]의 전투 스킬 포인트 회복 효과를 발동하는 단일 아군의 공격력이 10% 증가한다. 지속 시간: 1턴", icon: "bonus_1" },
    { name: "명부", description: "전투 스킬 발동 시 지정된 단일 아군의 디버프 효과를 1개 해제한다", icon: "bonus_2" },
    { name: "환생", description: "[부담]의 전투 스킬 포인트 회복 효과가 발동되면 자신의 에너지가 2pt 회복된다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "속도", value: "9", icon: "spd" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "일심(一心)", description: "필살기 효과를 보유한 아군이 적 처치 시, 한아의 행동 게이지가 15% 증가한다. 해당 효과는 턴마다 1회만 발동한다", icon: "eidolon_1" },
    { rank: "E02", name: "이관(二觀)", description: "전투 스킬 발동 후 속도가 20% 증가한다. 지속 시간: 1턴", icon: "eidolon_2" },
    { rank: "E03", name: "삼진(三塵)", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "사제(四諦)", description: "필살기 지속 시간이 추가로 1턴 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "오음(五陰)", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "육정(六正)", description: "특성의 피해 증가 효과가 추가로 10% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 15% 증가하여 행동 순서가 앞당겨진다.",
    "[부담]": "한아의 전투 스킬로 부여되는 디버프 상태. 해당 상태의 적을 공격하면 전투 스킬 포인트를 회복할 수 있다."
  }
};

export default hanya;
