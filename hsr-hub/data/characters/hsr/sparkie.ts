import { Character } from '../../../../common-hub/types';

const sparkie: Character = {
  id: "sparkie",
  name: "스파키",
  folderName: "스파키",
  gameId: "hsr",
  attribute: "화염",
  path: "환락",
  rarity: 5,
  affiliation: "환락의 무대",
  briefInfo: "진실과 거짓이 뒤섞인 환락의 무대 위, 그녀의 발걸음은 깃털처럼 가볍다.\n「모두의 마음은 잘 받았어~ 가장 뜨거운 방식으로 보답해줄게~♡」\n그녀가 웃으면 팬들도 웃고, 그녀가 슬퍼하면 팬들도 눈물을 흘린다. 그녀는 모두가 되고 싶어 하는 모습이자, 동시에 가장 위험한 독약이다.",
  version: "3.1",
  releaseVersion: "3.1",
  languageNames: "🇰🇷 스파키 / 🇺🇸 Sparkie / 🇨🇳 帕키 / 🇯🇵 ス퍼키",
  voiceActors: "🇰🇷 미정 / 🇺🇸 미정 / 🇨🇳 미정 / 🇯🇵 미정",
  metadata: {
    name: "스파키",
    language: "🇰🇷 스파키 / 🇺🇸 Sparkie / 🇨🇳 帕키 / 🇯🇵 스퍼키",
    element: "화염",
    path: "환락",
    rarity: 5,
    affiliation: "환락의 무대",
    cv: "🇰🇷 미정 / 🇺🇸 미정 / 🇨🇳 미정 / 🇯🇵 미정",
    releaseVersion: "3.1",
    brief: "진실과 거짓이 뒤섞인 환락의 무대 위, 그녀의 발걸음은 깃털처럼 가볍다.\n「모두의 마음은 잘 받았어~ 가장 뜨거운 방식으로 보답해줄게~♡」\n그녀가 웃으면 팬들도 웃고, 그녀가 슬퍼하면 팬들도 눈물을 흘린다. 그녀는 모두가 되고 싶어 하는 모습이자, 동시에 가장 위험한 독약이다."
  },
  baseStats: {
    lv1: { "기초 HP": 156, "기초 공격력": 84, "기초 방어력": 62 },
    lv20: { "기초 HP": 304, "기초 공격력": 164, "기초 방어력": 121 },
    lv30: { "기초 HP": 445, "기초 공격력": 240, "기초 방어력": 177 },
    lv40: { "기초 HP": 586, "기초 공격력": 316, "기초 방어력": 233 },
    lv50: { "기초 HP": 726, "기초 공격력": 392, "기초 방어력": 289 },
    lv60: { "기초 HP": 867, "기초 공격력": 468, "기초 방어력": 345 },
    lv70: { "기초 HP": 1007, "기초 공격력": 544, "기초 방어력": 401 },
    lv80: { "기초 HP": 1148, "기초 공격력": 620, "기초 방어력": 457 },
    speed: 106,
    taunt: 75,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "지옥의 늑대 이빨", count: "65", rarity: 4 },
      { name: "천진난만 크레파스", count: "15", rarity: 2 },
      { name: "꿈을 만드는 딥 펜", count: "15", rarity: 3 },
      { name: "꿈을 그리는 붓", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "과거 악의 유해", count: "12", rarity: 4 },
      { name: "≪복슬복슬호≫ 수작업 스토리보드", count: "18", rarity: 2 },
      { name: "≪복슬복슬호≫ 연재 기념호", count: "69", rarity: 3 },
      { name: "≪복슬복슬호≫ 소장판 합본", count: "139", rarity: 4 },
      { name: "천진난만 크레파스", count: "41", rarity: 2 },
      { name: "꿈을 만드는 딥 펜", count: "56", rarity: 3 },
      { name: "꿈을 그리는 붓", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "무대 위의 깜빡임",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 스파키 공격력의 100%만큼 화염 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "가장 뜨거운 보답",
      tag: "전투 스킬 | 범위 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 범위 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 스파키 공격력의 120%만큼 화염 속성 피해를 가하고, 인접한 목표에게 스파키 공격력의 60%만큼 화염 속성 피해를 가한다. 공격 발동 후 웃음 포인트를 2pt 획득한다. 만약 이번 공격으로 전투 스킬 포인트를 소모했다면, 추가로 웃음 포인트를 1pt 획득한다",
      icon: "skill_1"
    },
    {
      name: "스파키의 타오르는 밤",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "모든 적에게 스파키 공격력의 200%만큼 화염 속성 피해를 가하고, 웃음 포인트를 5pt 획득한다. 이후 모든 아군에게 [방송 지원] 상태를 부여한다, 지속 시간: 2턴.\n[방송 지원] 상태의 아군은 환락 수치가 20% 증가하며, 환락 피해를 가할 시 목표의 방어력을 15% 무시한다",
      icon: "ultimate_1"
    },
    {
      name: "거짓 속에 핀 진실",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "스파키가 필드에 있을 시, 모든 아군이 전투 스킬 포인트를 1pt 소모할 때마다 스파키가 가하는 환락 피해가 적의 방어력을 6% 무시한다. 해당 효과는 최대 5회 중첩되며, 아하 타임 종료 시 초기화된다.\n아하 타임 동안 스파키의 치명타 피해가 40% 증가한다",
      icon: "talent_1"
    },
    {
      name: "팬들을 위한 앵콜",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후 다음 전투 시작 시, 모든 아군이 즉시 웃음 포인트를 3pt 획득한다",
      icon: "technique_1"
    },
    {
      name: "화려한 피날레",
      tag: "환락 스킬 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "모든 적에게 화염 속성 환락 피해를 120% 가한다. 이번 아하 타임 동안 소모된 전투 스킬 포인트 1pt당 해당 피해 배율이 추가로 20% 증가한다(최대 100% 증가)",
      icon: "elation_skill_1"
    }
  ],
  additionalAbilities: [
    { name: "독약 같은 매력", description: "전투 스킬 발동 시, 지정된 목표가 [연소] 상태일 경우 가하는 피해가 30% 증가한다", icon: "bonus_1" },
    { name: "실시간 소통", description: "아군이 전투 스킬 포인트를 소모하여 공격을 발동한 후, 스파키의 행동 게이지가 10% 증가한다", icon: "bonus_2" },
    { name: "영원한 파키", description: "아하 타임 종료 시, 스파키는 소모된 웃음 포인트 5pt당 에너지를 5pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "화염 속성 피해", value: "22.4%", icon: "fire_dmg" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "공격력", value: "18%", icon: "atk" }
  ],
  eidolons: [
    { rank: "E01", name: "가면 뒤의 미소", description: "[방송 지원]의 지속 시간이 1턴 증가한다. [방송 지원] 상태인 아군의 공격력이 40% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "열광적인 환호", description: "아하 타임 동안 모든 아군이 가하는 환락 피해가 목표의 방어력을 추가로 20% 무시한다", icon: "eidolon_2" },
    { rank: "E03", name: "무대 위의 여왕", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "끝나지 않는 방송", description: "필살기 발동 시 전투 스킬 포인트를 1pt 회복한다. 만약 현재 전투 스킬 포인트가 최대치라면, 대신 모든 아군의 에너지를 10pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "거짓말쟁이의 진심", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15. 환락 스킬 레벨+1, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "완벽한 피날레", description: "환락 스킬의 치명타 피해가 100% 증가한다. 환락 스킬 발동 후, 스파키가 즉시 행동 게이지를 100% 획득한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "환락 스킬": "환락 운명의 길 캐릭터가 사용하는 특수한 스킬. 전용 자원이나 기믹을 통해 발동된다.",
    "웃음 포인트": "환락 캐릭터들이 공유하는 자원. 일정 수치 도달 시 아하 타임이 발동된다.",
    "[방송 지원]": "스파키가 아군에게 부여하는 강화 상태. 환락 수치와 방어력 무시 효과를 제공한다."
  }
};

export default sparkie;
