import { Character } from '../../../../common-hub/types';

const sushang: Character = {
  id: "sushang",
  gameId: "hsr",
  name: "소상",
  folderName: "소상",
  attribute: "물리",
  path: "수렵",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「요청(曜青)」출생, 「나부」의 운기군을 찾아가 수련을 받은 신병 어머니가 주신 가문의 검을 몸에 지니고 앞으로의 미래를 동경하고 있다",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 소상 / 🇺🇸 Sushang / 🇨🇳 素裳 / 🇯🇵 素裳",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 앤젯 가르시아 / 🇨🇳 첸팅팅 / 🇯🇵 후쿠엔 미사토",
  metadata: {
    name: "소상",
    language: "🇰🇷 소상 / 🇺🇸 Sushang / 🇨🇳 素裳 / 🇯🇵 素裳",
    element: "물리",
    path: "수렵",
    rarity: 4,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 박시윤 / 🇺🇸 앤젯 가르시아 / 🇨🇳 첸팅팅 / 🇯🇵 후쿠엔 미사토",
    releaseVersion: "1.0",
    brief: "선주 「요청(曜青)」출생, 「나부」의 운기군을 찾아가 수련을 받은 신병 어머니가 주신 가문의 검을 몸에 지니고 앞으로의 미래를 동경하고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 124, "기초 공격력": 76, "기초 방어력": 57 },
    lv20: { "기초 HP": 243, "기초 공격력": 150, "기초 방어력": 111 },
    lv30: { "기초 HP": 355, "기초 공격력": 219, "기초 방어력": 162 },
    lv40: { "기초 HP": 466, "기초 공격력": 287, "기초 방어력": 213 },
    lv50: { "기초 HP": 578, "기초 공격력": 356, "기초 방어력": 264 },
    lv60: { "기초 HP": 690, "기초 공격력": 425, "기초 방어력": 315 },
    lv70: { "기초 HP": 801, "기초 공격력": 494, "기초 방어력": 366 },
    lv80: { "기초 HP": 917, "기초 공격력": 564, "기초 방어력": 419 },
    speed: 107,
    taunt: 75,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "강철 늑대의 깨진 이빨", count: "50", rarity: 4 },
      { name: "공조 기계 부품", count: "12", rarity: 2 },
      { name: "공조 톱니바퀴", count: "13", rarity: 3 },
      { name: "공조 환류 심장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "9", rarity: 4 },
      { name: "짐승 사냥용 화살", count: "8", rarity: 2 },
      { name: "악마 사냥용 화살", count: "42", rarity: 3 },
      { name: "별 쫓는 화살", count: "77", rarity: 4 },
      { name: "공조 기계 부품", count: "22", rarity: 2 },
      { name: "공조 톱니바퀴", count: "35", rarity: 3 },
      { name: "공조 환류 심장", count: "20", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "운기검경 • 소예",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 소상 공격력 100%만큼의 물리 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "운기검경 • 산경",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적에게 소상 공격력 210%만큼의 물리 속성 피해를 준다. 공격 종료 후 33% 확률로 [검세]를 발동하여 대상에게 소상 공격력 100%만큼의 물리 속성 부가 피해를 가한다. 대상이 약점 격파 상태일 경우 [검세]는 반드시 발동한다",
      icon: "skill_1"
    },
    {
      name: "태허형온 • 촉야",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적에게 소상 공격력 320%만큼의 물리 속성 피해를 가하고 소상은 즉시 행동한다. 동시에 소상의 공격력이 30% 증가하며 전투 스킬 발동 시 [검세]의 추가 발동 판정을 2회 획득한다. 지속 시간: 2턴. 추가 판정으로 발동된 [검세]의 피해는 기존 피해의 50%이다",
      icon: "ultimate_1"
    },
    {
      name: "자유자재의 칼날",
      tag: "특성 | 가속",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "필드 위에 적이 약점 격파 상태가 될 때마다 소상의 속도가 20% 증가한다. 지속 시간: 2턴",
      icon: "talent_1"
    },
    {
      name: "운기검경 • 함성",
      tag: "비술 | 단일 공격",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "적을 즉시 공격하며, 전투 진입 후 모든 적에게 소상 공격력 80%만큼의 물리 속성 피해를 가한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "순수함", description: "현재 HP 백분율이 50% 이하일 경우 적에게 피격될 확률이 감소한다", icon: "bonus_1" },
    { name: "응수", description: "[검세]를 발동할 때마다 [검세]가 가하는 피해가 2% 증가한다. 해당 효과 최대 중첩수: 10스택", icon: "bonus_2" },
    { name: "파멸", description: "일반 공격 혹은 전투 스킬 발동 후 필드 위에 약점 격파 상태의 적이 존재하면 소상의 행동 게이지가 15% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "방어력", value: "12.5%", icon: "def" },
    { type: "HP", value: "10.0%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "여유만만", description: "전투 스킬의 공격 대상이 약점 격파 상태일 경우, 전투 스킬 발동 후 전투 스킬 포인트를 1pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "넓은 아량", description: "[검세] 발동 후 소상이 받는 피해가 20% 감소한다. 지속 시간: 1턴", icon: "eidolon_2" },
    { rank: "E03", name: "전설의 검보", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "쾌검연속", description: "소상의 격파 특수가 40% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "무명공훈", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "상선약수", description: "특성의 속도 증가 효과가 중첩될 수 있다. 최대 중첩수: 2스택. 또한 전투 진입 후 소상은 즉시 특성의 속도 증가 효과를 1스택 획득한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[검세]": "전투 스킬 발동 시 추가로 가하는 부가 피해 효과",
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다."
  }
};

export default sushang;
