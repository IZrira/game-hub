import { Character } from '../../../../common-hub/types';

const yukong: Character = {
  id: "yukong",
  gameId: "hsr",
  name: "어공",
  folderName: "어공",
  attribute: "허수",
  path: "화합",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 천박사(天舶司)의 수장이다. 수많은 전장을 거쳐온 노련한 비행사이자 궁수다.\n지금은 쏟아져 내리는 공무 때문에 몸을 빼기 어려운 상태다.",
  version: "1.1",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 어공 / 🇺🇸 Yukong / 🇨🇳 驭空 / 🇯🇵 御空",
  voiceActors: "🇰🇷 전숙경 / 🇺🇸 던 M. 베넷 / 🇨🇳 쫑커 / 🇯🇵 토마 유미",
  metadata: {
    name: "어공",
    language: "🇰🇷 어공 / 🇺🇸 Yukong / 🇨🇳 驭空 / 🇯🇵 御空",
    element: "허수",
    path: "화합",
    rarity: 4,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 전숙경 / 🇺🇸 던 M. 베넷 / 🇨🇳 쫑커 / 🇯🇵 토마 유미",
    releaseVersion: "1.1",
    brief: "선주 「나부」 천박사(天舶司)의 수장이다. 수많은 전장을 거쳐온 노련한 비행사이자 궁수다.\n지금은 쏟아져 내리는 공무 때문에 몸을 빼기 어려운 상태다."
  },
  baseStats: {
    lv1: { "기초 HP": 125, "기초 공격력": 82, "기초 방어력": 51 },
    lv20: { "기초 HP": 243, "기초 공격력": 159, "기초 방어력": 99 },
    lv30: { "기초 HP": 356, "기초 공격력": 233, "기초 방어력": 145 },
    lv40: { "기초 HP": 468, "기초 공격력": 306, "기초 방어력": 191 },
    lv50: { "기초 HP": 580, "기초 공격력": 379, "기초 방어력": 237 },
    lv60: { "기초 HP": 693, "기초 공격력": 453, "기초 방어력": 283 },
    lv70: { "기초 HP": 805, "기초 공격력": 526, "기초 방어력": 329 },
    lv80: { "기초 HP": 917, "기초 공격력": 600, "기초 방어력": 375 },
    speed: 107,
    taunt: 100,
    energy: 130
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "과거 그림자의 황금 장식", count: "50", rarity: 4 },
      { name: "공조 기계 부품", count: "12", rarity: 2 },
      { name: "공조 톱니바퀴", count: "13", rarity: 3 },
      { name: "공조 환류 심장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "파멸자의 말로", count: "9", rarity: 4 },
      { name: "조화의 가락", count: "8", rarity: 2 },
      { name: "가족의 찬가", count: "42", rarity: 3 },
      { name: "별들의 악장", count: "77", rarity: 4 },
      { name: "공조 기계 부품", count: "22", rarity: 2 },
      { name: "공조 톱니바퀴", count: "35", rarity: 3 },
      { name: "공조 환류 심장", count: "20", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "떠도는 화살",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 어공 공격력 100%만큼의 허수 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "천궁에 울리는 활",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "[활시위 호령] 2스택을 획득한다. (최대 2스택 보유) 어공이 [활시위 호령] 효과를 보유할 경우 모든 아군의 공격력이 80% 증가한다. 아군의 턴이 종료될 때마다 어공의 [활시위 호령] 효과가 1스택 감소한다. 어공이 전투 스킬을 발동해 [활시위 호령]을 획득한 턴은 [활시위 호령]이 감소하지 않는다.",
      icon: "skill_1"
    },
    {
      name: "창공 꿰뚫기",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "필살기 발동 시, 어공이 [활시위 호령]을 보유 중이면 추가로 모든 아군의 치명타 확률이 28%, 치명타 피해가 65% 증가한다. 동시에 지정된 단일 적에게 어공 공격력 380%만큼의 허수 속성 피해를 가한다",
      icon: "ultimate_1"
    },
    {
      name: "7겹 관통화살",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "일반 공격 발동이 어공 공격력 80%만큼의 허수 속성 피해를 추가로 가한다. 이번 공격의 강인성 감소 피해가 100% 증가한다. 해당 효과는 1턴 후 다시 발동할 수 있다.",
      icon: "talent_1"
    },
    {
      name: "바람을 가르는 연",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "비술 사용 후 20초 동안 질주 상태에 진입한다. 질주 상태에선 자신의 이동 속도가 35% 증가하며, 선공을 가해 적과의 전투 진입 시 어공은 [활시위 호령]을 2스택 획득한다.",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "양보", description: "어공에게 디버프 효과가 부여될 시 디버프 효과에 1회 저항할 수 있다. 해당 효과는 2턴 후 다시 발동할 수 있다", icon: "bonus_1" },
    { name: "전승의 활", description: "어공이 필드에 있으면 모든 아군이 가하는 허수 속성 피해가 12% 증가한다", icon: "bonus_2" },
    { name: "기개", description: "[활시위 호령] 효과 보유 시 아군이 행동할 때마다 어공은 추가로 에너지를 2pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "허수 속성 피해 증가", value: "22.4%", icon: "imaginary_dmg" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "공격력", value: "10%", icon: "atk" }
  ],
  eidolons: [
    { rank: "E01", name: "침과대단(枕戈待旦)의 각오", description: "전투 진입 시 모든 아군의 속도가 10% 증가한다. 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "창공을 휘모는 질주", description: "임의의 단일 아군의 현재 에너지가 에너지 최대치일 시 어공은 추가로 에너지를 5pt 회복한다. 해당 효과는 단일 아군마다 1회만 발동되며, 어공이 필살기를 발동한 후 해당 효과의 발동 횟수는 초기화된다", icon: "eidolon_2" },
    { rank: "E03", name: "맹렬한 집중 사격", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "효시의 울림", description: "[활시위 호령] 효과 보유 시 어공이 가하는 피해가 30% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "관록의 명사수", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "뇌성벽력의 활시위", description: "어공이 필살기를 발동할 경우 먼저 즉시 [활시위 호령] 1스택을 획득한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "활시위 호령": "어공이 전투 스킬 발동 시 획득하는 특수 버프. 보유 중일 때 모든 아군의 공격력이 대폭 증가한다.",
    "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다."
  }
};

export default yukong;
