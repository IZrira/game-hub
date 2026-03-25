
import { Character } from '../../../../common-hub/types';

const jingYuan: Character = {
  id: "jing_yuan",
  name: "경원",
  folderName: "경원",
  gameId: "hsr",
  attribute: "번개",
  path: "지식",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 연맹 천궁의 7대 장군 중 하나로 나부 운기군을 통솔하는 「신책 장군」\n전대 「나부」 검술의 일인자를 스승으로 모셨으나, 무예로 이름을 날리지는 않았다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 경원 / 🇺🇸 Jing Yuan / 🇨🇳 景元 / 🇯🇵 景元",
  voiceActors: "🇰🇷 류승곤 / 🇺🇸 알레한드로 사브 / 🇨🇳 쑨예 / 🇯🇵 오노 다이스케",
  metadata: {
    name: "경원",
    language: "🇰🇷 경원 / 🇺🇸 Jing Yuan / 🇨🇳 景元 / 🇯🇵 景元",
    element: "번개",
    path: "지식",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 류승곤 / 🇺🇸 알레한드로 사브 / 🇨🇳 쑨예 / 🇯🇵 오노 다이스케",
    releaseVersion: "1.0",
    brief: "선주 연맹 천궁의 7대 장군 중 하나로 나부 운기군을 통솔하는 「신책 장군」\n전대 「나부」 검술의 일인자를 스승으로 모셨으나, 무예로 이름을 날리지는 않았다"
  },
  baseStats: {
    lv1: { "기초 HP": 158, "기초 공격력": 95, "기초 방어력": 66 },
    lv20: { "기초 HP": 309, "기초 공격력": 185, "기초 방어력": 129 },
    lv30: { "기초 HP": 451, "기초 공격력": 271, "기초 방어력": 188 },
    lv40: { "기초 HP": 594, "기초 공격력": 356, "기초 방어력": 248 },
    lv50: { "기초 HP": 737, "기초 공격력": 442, "기초 방어력": 307 },
    lv60: { "기초 HP": 879, "기초 공격력": 528, "기초 방어력": 366 },
    lv70: { "기초 HP": 1022, "기초 공격력": 613, "기초 방어력": 426 },
    lv80: { "기초 HP": 1164, "기초 공격력": 699, "기초 방어력": 485 },
    speed: 99,
    taunt: 75,
    energy: 130
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "조형자의 번개 지팡이", count: "65", rarity: 4 },
      { name: "영생의 새싹", count: "15", rarity: 2 },
      { name: "영생의 꽃", count: "15", rarity: 3 },
      { name: "영생의 가지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "영감의 열쇠", count: "18", rarity: 2 },
      { name: "계몽의 열쇠", count: "69", rarity: 3 },
      { name: "지식의 열쇠", count: "139", rarity: 4 },
      { name: "영생의 새싹", count: "41", rarity: 2 },
      { name: "영생의 꽃", count: "56", rarity: 3 },
      { name: "영생의 가지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "전광석화",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 경원 공격력 100%만큼의 번개 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "고공을 가르는 뇌전",
      tag: "전투 스킬 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "-1",
      description: "모든 적에게 경원 공격력 100%만큼의 번개 속성 피해를 가하고, 다음 턴 [신군]의 공격 단수가 2단 증가한다",
      icon: "skill_1"
    },
    {
      name: "내가 곧 빛이니",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "모든 적에게 경원 공격력 200%만큼의 번개 속성 피해를 가하고, 다음 턴 [신군]의 공격 단수가 3단 증가한다",
      icon: "ultimate_1"
    },
    {
      name: "퇴마의 형신",
      tag: "특성 | 바운스",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 5",
      spRecovery: "0",
      description: "전투 시작 시 [신군]을 소환한다. [신군]은 기본 상태에서 속도 60pt 및 공격 단수 3단을 보유하며, 행동 시 추가 공격을 발동한다. \n공격 단수마다 임의의 단일 적에게 경원 공격력 66% 만큼의 번개 속성 피해를 주고, 인접한 목표에게 주목표 25%만큼의 번개 속성 피해를 가한다.\n[신군]은 최대 10단의 공격 단수를 누적할 수 있으며 공격 단수가 1단 증가할 때마다 속도가 10pt 증가하고, 행동 종료 후 속도와 공격 단수가 기본 상태로 회복된다.\n경원이 전투 불능 상태에 빠지면 [신군]은 사라진다. 경원이 제어류 디버프 상태에 빠지면 [신군]도 행동할 수 없다",
      icon: "talent_1"
    },
    {
      name: "위령 소환",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술을 발동하면 다음 전투 시작 시 [신군]의 첫 번째 턴 공격 단수가 3단 증가한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "적진 격파", description: "다음 턴에서 [신군]의 공격 단수가 6단 이상일 경우, 신군의 치명타 피해가 25% 증가한다", icon: "bonus_1" },
    { name: "사전 대비", description: "전투 시작 시 즉시 에너지를 15pt 회복한다", icon: "bonus_2" },
    { name: "열광", description: "전투 스킬 발동 후 치명타 확률이 10% 증가한다. 지속 시간: 2턴", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "곤륜을 파괴하는 성류 뇌격", description: "[신군]이 공격 발동 시 지정된 단일 적에 인접한 목표에게 가하는 피해 배율이 추가로 증가한다. 증가 수치는 주목표에게 가한 피해 배율의 25%이다", icon: "eidolon_1" },
    { rank: "E02", name: "천지를 뒤흔드는 하늘의 창", description: "[신군]이 행동한 후 경원은 일반 공격, 전투 스킬, 필살기로 가하는 피해가 20% 증가한다. 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "하늘을 꿰뚫는 번개", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "백사에 떨어진 칼날에 감긴 구름", description: "[신군]의 공격은 단마다 경원의 에너지를 2pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "목숨을 아끼지 않는 백전 장군", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "적을 격멸하는 위령(威霊)", description: "[신군]의 공격은 단마다 지정된 적을 추가로 취약 상태에 빠트린다.\n취약 상태의 적은 받는 피해가 12% 증가하며, 이번 [신군] 공격 종료까지 지속된다. 해당 효과 최대 중첩수: 3스택", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "[신군]": "경원의 특성으로 소환되는 개체. 고유의 속도와 행동 순서를 가지며, 단수가 누적될수록 공격력이 강력해진다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상."
  }
};

export default jingYuan;
