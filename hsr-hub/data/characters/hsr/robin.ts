import { Character } from '../../../../common-hub/types';

const robin: Character = {
  id: "robin",
  name: "로빈",
  folderName: "로빈",
  gameId: "hsr",
  attribute: "물리",
  path: "화합",
  rarity: 5,
  affiliation: "페나코니",
  briefInfo: "페나코니에서 태어난 은하에서 유명한 헤일로족 가수. 차분하고 우아한 분위기의 소녀다.\n이번에 가족의 초대를 받고 고향으로 돌아와 「조화의 축제」에서 손님들을 위해 노래를 부르게 되었다.\n「화합」의 힘을 빌려 노랫소리를 전하고, 팬들뿐만 아니라 만계의 생령들에게 「공명」을 일으킬 수 있다",
  version: "2.1",
  releaseVersion: "2.1",
  languageNames: "🇰🇷 로빈 / 🇺🇸 Robin / 🇨🇳 知更鸟 / 🇯🇵 ロビン",
  voiceActors: "🇰🇷 신온유 / 🇺🇸 앨리스 히모라 / 🇨🇳 첸천 / 🇯🇵 나즈카 카오리 // 보컬(vocal) : Chevy",
  metadata: {
    name: "로빈",
    language: "🇰🇷 로빈 / 🇺🇸 Robin / 🇨🇳 知更鸟 / 🇯🇵 ロビン",
    element: "물리",
    path: "화합",
    rarity: 5,
    affiliation: "페나코니",
    cv: "🇰🇷 신온유 / 🇺🇸 앨리스 히모라 / 🇨🇳 첸천 / 🇯🇵 나즈카 카오리 // 보컬(vocal) : Chevy",
    releaseVersion: "2.1",
    brief: "페나코니에서 태어난 은하에서 유명한 헤일로족 가수. 차분하고 우아한 분위기의 소녀다.\n이번에 가족의 초대를 받고 고향으로 돌아와 「조화의 축제」에서 손님들을 위해 노래를 부르게 되었다.\n「화합」의 힘을 빌려 노랫소리를 전하고, 팬들뿐만 아니라 만계의 생령들에게 「공명」을 일으킬 수 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 174, "기초 공격력": 87, "기초 방어력": 66 },
    lv20: { "기초 HP": 340, "기초 공격력": 170, "기초 방어력": 129 },
    lv30: { "기초 HP": 497, "기초 공격력": 248, "기초 방어력": 188 },
    lv40: { "기초 HP": 653, "기초 공격력": 327, "기초 방어력": 24 },
    lv50: { "기초 HP": 810, "기초 공격력": 405, "기초 방어력": 307 },
    lv60: { "기초 HP": 967, "기초 공격력": 484, "기초 방어력": 366 },
    lv70: { "기초 HP": 1124, "기초 공격력": 562, "기초 방어력": 426 },
    lv80: { "기초 HP": 1281, "기초 공격력": 640, "기초 방어력": 485 },
    speed: 102,
    taunt: 100,
    energy: 160
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "스타피스 사원증", count: "65", rarity: 4 },
      { name: "꿈 저장 부품", count: "15", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "15", rarity: 3 },
      { name: "꿈 제조 모터", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "9", rarity: 4 },
      { name: "구름 위 음표", count: "12", rarity: 2 },
      { name: "천상의 소절", count: "53", rarity: 3 },
      { name: "천외의 악장", count: "101", rarity: 4 },
      { name: "꿈 저장 부품", count: "33", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "46", rarity: 3 },
      { name: "꿈 제조 모터", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "날갯짓으로 전해지는 노랫소리",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 로빈 공격력의 100%만큼 물리 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "깃털의 아리아",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "모든 아군이 가하는 피해를 50% 증가시킨다. 지속 시간: 3턴. 로빈 턴이 시작될 때마다 지속 턴 수가 1 감소한다",
      icon: "skill_1"
    },
    {
      name: "천음의 합주, 뭇별의 푸가",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "로빈이 [협주] 상태에 진입하고, 자신 이외의 동료를 즉시 행동하게 한다.\n[협주] 상태일 시 모든 아군의 공격력이 증가한다. 증가 수치는 로빈 공격력의 22.8%+200pt이며, 아군이 공격을 발동할 때마다 로빈은 추가로 자신의 공격력의 120%만큼 물리 속성 추가 피해를 1회 가한다. 해당 피해의 치명타 확률은 100%, 치명타 피해는 150%로 고정된다.\n[협주] 상태일 시 로빈은 제어류 디버프 상태에 면역되고, [협주] 상태 종료 전에는 자신의 턴에 진입하지 않으며 행동할 수 없다.\n행동 서열에 [협주] 카운트다운이 나타나고, 카운트다운 턴 시작 시 로빈은 [협주] 상태를 종료하고 즉시 행동한다. 카운트다운이 보유한 고정 속도는 90pt이다",
      icon: "ultimate_1"
    },
    {
      name: "조성의 합창",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "모든 아군의 치명타 피해가 20% 증가하고, 아군이 적 공격 후 로빈이 추가로 자신의 에너지를 2pt 회복한다",
      icon: "talent_1"
    },
    {
      name: "심취의 서곡",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 발동 후 자기 주변에 15초 동안 지속되는 특수 영역을 펼친다.\n영역 내의 적은 로빈을 공격하지 않고, 영역이 전개되어 있는 동안 로빈을 따라다닌다. 영역이 전개되어 있는 동안 전투에 진입하면, 웨이브가 시작될 때마다 로빈은 에너지를 5pt 회복한다. 아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "콜로라투라 카덴차", description: "전투 시작 시 자신의 행동 게이지가 25% 증가한다", icon: "bonus_1" },
    { name: "즉흥 꾸밈음", description: "[협주] 상태일 시 모든 아군이 추가 공격을 발동하여 가하는 치명타 피해가 25% 증가한다", icon: "bonus_2" },
    { name: "시퀀스 악절", description: "전투 스킬 발동 시 추가로 에너지를 5pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "미소의 국가", description: "[협주] 상태일 시 모든 아군의 모든 속성 저항 관통이 24% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "두 사람의 애프터눈 티", description: "[협주] 상태일 시 모든 아군의 속도가 16% 증가한다. 특성의 에너지 회복 효과가 추가로 1pt 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "뒤집힌 현의 궁전", description: "전투 스킬 레벨+2, 최대 Lv.15. 필살기 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "빗방울의 열쇠", description: "필살기 발동 시 모든 아군의 제어류 디버프 상태를 해제하고, 모든 아군은 로빈이 [협주] 상태일 동안 효과 저항이 50% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "고독한 별의 눈물", description: "일반 공격 레벨+1, 최대 Lv.10. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "달이 숨은 자정", description: "[협주] 상태일 시 필살기로 가하는 물리 속성 추가 피해의 치명타 피해가 추가로 450% 증가한다. [달이 숨은 자정] 효과는 최대 8회 발동되며, 필살기를 발동할 때마다 발동 횟수가 초기화된다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "행동 게이지 증가": "행동 게이지가 일정 비율 증가하여 행동 순서가 앞당겨진다.",
    "추가 피해": "피격자에게 추가로 피해를 가한다. 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상.",
    "[협주]": "로빈이 필살기 발동 시 진입하는 상태. 아군 전체의 공격력을 증가시키고 공격 시 로빈이 추가 피해를 가한다."
  }
};

export default robin;
