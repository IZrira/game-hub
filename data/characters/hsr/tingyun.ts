
import { Character } from '../../../types';

const tingyun: Character = {
  id: "tingyun",
  gameId: "hsr",
  name: "정운",
  folderName: "정운",
  attribute: "번개",
  path: "화합",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 천박사의 상단 접대 담당. 겉으로는 부드러워 보이지만 속은 아주 영리하다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 정운 / 🇺🇸 Tingyun / 🇨🇳 停云 / 🇯🇵 停雲",
  voiceActors: "🇰🇷 이명호 / 🇺🇸 라시 매컬리 / 🇨🇳 장잉 / 🇯🇵 타카다 유우키",
  baseStats: {
    lv1: { "기초 HP": 115, "기초 공격력": 72, "기초 방어력": 54 },
    lv20: { "기초 HP": 225, "기초 공격력": 141, "기초 방어력": 105 },
    lv30: { "기초 HP": 329, "기초 공격력": 206, "기초 방어력": 154 },
    lv40: { "기초 HP": 433, "기초 공격력": 271, "기초 방어력": 203 },
    lv50: { "기초 HP": 537, "기초 공격력": 337, "기초 방어력": 251 },
    lv60: { "기초 HP": 641, "기초 공격력": 402, "기초 방어력": 300 },
    lv70: { "기초 HP": 745, "기초 공격력": 467, "기초 방어력": 348 },
    lv80: { "기초 HP": 846, "기초 공격력": 529, "기초 방어력": 397 },
    speed: 112,
    taunt: 100,
    energy: 130
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "조형자의 번개 지팡이", count: "50", rarity: 4 },
      { name: "영생의 새싹", count: "12", rarity: 2 },
      { name: "영생의 꽃", count: "13", rarity: 3 },
      { name: "영생의 가지", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "12", rarity: 2 },
      { name: "가족의 찬가", count: "54", rarity: 3 },
      { name: "별들의 악장", count: "105", rarity: 4 },
      { name: "영생의 새싹", count: "28", rarity: 2 },
      { name: "영생의 꽃", count: "42", rarity: 3 },
      { name: "영생의 가지", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "축객령", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 정운 공격력 100%만큼의 번개 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "상서로운 구름의 평안", tag: "전투 스킬 | 서포트", energyRegen: "에너지 회복 30", toughnessDMG: "0", spRecovery: "-1", description: "지정된 단일 아군에게 [축복]을 제공하고 공격력을 50% 증가시킨다. 최대 정운의 현재 공격력의 25%를 초과하지 않는다. [축복]을 받은 아군이 공격 발동 시 추가로 자신의 공격력 40%만큼의 번개 속성 추가 피해를 1회 가한다. [축복]은 3턴간 지속된다", icon: "skill_1" },
    { name: "경운의 길조", tag: "필살기 | 서포트", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "지정된 단일 아군의 에너지를 50pt 회복하고, 목표가 가하는 피해를 50% 증가시킨다. 지속 시간: 2턴", icon: "ultimate_1" },
    { name: "자전의 비호", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "정운이 적에게 피해를 가할 시 추가로 [축복]을 받은 아군 공격력 60%만큼의 번개 속성 추가 피해를 가한다", icon: "talent_1" },
    { name: "부드러운 미풍", tag: "비술 | 서포트", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 즉시 자신의 에너지를 50pt 회복한다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "숨 고르기", description: "전투 스킬 발동 시 정운의 속도가 20% 증가한다. 지속 시간: 1턴", icon: "bonus_1" },
    { name: "지액 방지", description: "일반 공격 발동 시 가하는 피해가 40% 증가한다", icon: "bonus_2" },
    { name: "형통", description: "정운의 턴이 시작될 때 에너지를 5pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "번개 속성 피해 증가", value: "8.0%", icon: "lightning_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "봄바람에 흩날리는 꽃잎", description: "[축복]을 받은 아군이 필살기 발동 후 속도가 20% 증가한다. 지속 시간: 1턴", icon: "eidolon_1" },
    { rank: "E02", name: "군자의 은혜", description: "[축복]을 받은 아군이 적 처치 시 에너지를 5pt 회복한다. 해당 효과는 턴마다 1회 발동한다", icon: "eidolon_2" },
    { rank: "E03", name: "푸른 언덕의 유산", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "천둥과 불의 위세", description: "[축복]이 제공하는 피해 배율이 20% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "평온을 위한 안주", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "화평과 안녕", description: "필살기가 아군 대상에게 회복하는 에너지가 10pt 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 피해": "피격자에게 추가로 1회 피해를 가한다. 이번 피해는 1회 공격을 가한 것으로 간주하지 않는다"
  }
};

export default tingyun;
