
import { Character } from '../../../../common-hub/types';

const ruanMei: Character = {
  id: "ruan_mei",
  name: "완•매",
  folderName: "완•매",
  gameId: "hsr",
  attribute: "얼음",
  path: "화합",
  rarity: 5,
  affiliation: "우주정거장 「헤르타」",
  briefInfo: "지니어스 클럽 회원이자 생명과학 분야의 전문가로, 헤르타 일행과 함께 시뮬레이션 우주를 연구하고 있다",
  version: "1.6",
  releaseVersion: "1.6",
  languageNames: "🇰🇷 완·매 / 🇺🇸 Ruan Mei / 🇨🇳 阮·梅 / 🇯🇵 ルアン・メェイ",
  voiceActors: "🇰🇷 윤여진 / 🇺🇸 에미 로 / 🇨🇳 장원위 / 🇯🇵 오오니시 사오리",
  metadata: {
    name: "완•매",
    language: "🇰🇷 완·매 / 🇺🇸 Ruan Mei / 🇨🇳 阮·梅 / 🇯🇵 ルアン・メェイ",
    element: "얼음",
    path: "화합",
    rarity: 5,
    affiliation: "우주정거장 「헤르타」",
    cv: "🇰🇷 윤여진 / 🇺🇸 에미 로 / 🇨🇳 장원위 / 🇯🇵 오오니시 사오리",
    releaseVersion: "1.6",
    brief: "지니어스 클럽 회원이자 생명과학 분야의 전문가로, 헤르타 일행과 함께 시뮬레이션 우주를 연구하고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 148, "기초 공격력": 90, "기초 방어력": 66 },
    lv20: { "기초 HP": 288, "기초 공격력": 175, "기초 방어력": 129 },
    lv30: { "기초 HP": 421, "기초 공격력": 256, "기초 방어력": 188 },
    lv40: { "기초 HP": 554, "기초 공격력": 337, "기초 방어력": 248 },
    lv50: { "기초 HP": 687, "기초 공격력": 417, "기초 방어력": 307 },
    lv60: { "기초 HP": 821, "기초 공격력": 498, "기초 방어력": 366 },
    lv70: { "기초 HP": 954, "기초 공격력": 579, "기초 방어력": 426 },
    lv80: { "기초 HP": 1087, "기초 공격력": 660, "기초 방어력": 485 },
    speed: 104,
    taunt: 100,
    energy: 130
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "혹한 갑각", count: "65", rarity: 4 },
      { name: "영생의 새싹", count: "15", rarity: 2 },
      { name: "영생의 꽃", count: "15", rarity: 3 },
      { name: "영생의 가지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "18", rarity: 2 },
      { name: "가족의 찬가", count: "69", rarity: 3 },
      { name: "별들의 악장", count: "139", rarity: 4 },
      { name: "영생의 새싹", count: "41", rarity: 2 },
      { name: "영생의 꽃", count: "56", rarity: 3 },
      { name: "영생의 가지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "그윽한 일침",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 완•매 공격력의 100%만큼의 얼음 속성 피해를 준다",
      icon: "basic_atk_1"
    },
    {
      name: "우아한 연주",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "전투 스킬 발동 후 완•매는 [현의 여음]을 획득한다. 지속 시간: 3턴.\n완•매의 턴이 시작될 때마다 지속 턴 수가 1 감소한다. 완•매가 [현의 여음]을 보유하면 모든 아군의 피해가 32% 증가하며 약점 격파 효율이 50% 증가한다.",
      icon: "skill_1"
    },
    {
      name: "꽃잎에 인 물결, 옷을 물들인 꽃",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "완•매가 2턴간 결계를 펼치고, 자신의 턴이 시작될 때마다 지속 턴 수가 1 감소한다.\n결계 안에 있는 모든 아군의 모든 속성 저항 관통이 25% 증가하고, 공격 시 적에게 [다시 핀 매화]를 부여한다.\n[다시 핀 매화]는 적이 약점 격파 상태에서 회복하려고 할 때 발동하며, 목표의 약점 격파 상태를 연장하고 행동 게이지를 감소시킨다.\n감소 수치는 완•매 격파 특수효과의 20%에 10%를 더한 값이며, 해당 목표에게 격파 피해를 완•매의 얼음 속성 격파 피해의 50%만큼 가한다.\n적이 약점 격파 상태에서 회복하기 전까지는 [다시 핀 매화]를 추가로 부여할 수 없다.",
      icon: "ultimate_1"
    },
    {
      name: "프랙탈 나선",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "자신을 제외한 동료의 속도가 10% 증가한다. 모든 아군이 적의 약점을 격파하면 완•매는 해당 목표에게 자신의 얼음 속성 격파 피해의 120%만큼 격파 피해를 가한다.",
      icon: "talent_1"
    },
    {
      name: "매무새를 가다듬으며",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술을 사용하면 [매무새를 가다듬으며]를 획득하고 다음 전투가 시작될 때 자동으로 전투 스킬을 1회 발동하며, 이번 발동은 전투 스킬 포인트를 소모하지 않는다.\n시뮬레이션 우주 및 차분화 우주에서 완•매가 [매무새를 가다듬으며]를 보유했을 때 아군이 적을 선공하면 약점을 이용해 전투에 진입한 것으로 간주되며, 이번 공격은 약점 속성을 무시하고 모든 적의 강인성을 감소시킨다. 약점을 격파하면 공격자 속성의 약점 격파 효과를 발동한다. \n축복을 1개 보유할 때마다 이번 공격의 강인성 감소 수치가 추가로 100% 증가하고, 적의 약점을 격파한 후 해당 적에게 격파 피해를 완•매의 얼음 속성 격파 피해의 100%만큼 가한다 (최대 20개의 축복까지 계산)",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "물체 호흡 중", description: "모든 아군의 격파 특수효과가 20% 증가한다", icon: "bonus_1" },
    { name: "해가 질수록 늘어나는 생각", description: "완•매의 턴 시작 시 자신의 에너지를 5pt 회복한다", icon: "bonus_2" },
    { name: "수면에 일렁이는 촛불", description: "전투 중 완•매의 격파 특수효과가 120%를 초과할 시 10% 초과할 때마다 전투 스킬로 인한 모든 아군의 피해 증가 효과가 추가로 6% 증가한다. (최대 36%까지 증가)", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "격파 특수효과", value: "37.3%", icon: "break_effect" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "신경망 자수", description: "필살기로 펼친 결계가 활성화되는 동안 모든 아군이 가하는 피해는 목표의 방어력을 20% 무시한다", icon: "eidolon_1" },
    { rank: "E02", name: "갈대밭을 거닐며", description: "완•매가 필드에 있으면 모든 아군이 약점 격파 상태의 적에게 피해를 가할 때 공격력이 40% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "아른대는 담록빛", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "청동거울 앞에서 신을 찾네", description: "적의 약점이 격파될 시 완•매의 격파 특수효과가 100% 증가한다. 지속 시간: 3턴", icon: "eidolon_4" },
    { rank: "E05", name: "비녀로 단정히 다듬은 머리", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "반쯤 내린 면사, 땅에 떨군 부채", description: "필살기로 펼친 결계의 지속 시간이 1턴 연장된다. 특성이 가하는 격파 피해 배율이 추가로 200% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다.",
    "약점 속성 무시": "적의 약점 속성과 무관하게 강인성을 소모시킬 수 있다.",
    "결계": "특정 스킬을 통해 생성되는 특수 영역. 영역 내 적에게 지속적인 디버프나 피해 효과를 부여하거나 아군을 강화한다.",
    "[현의 여음]": "완•매가 전투 스킬 발동 시 획득하는 버프. 모든 아군의 피해와 약점 격파 효율을 증가시킨다.",
    "[다시 핀 매화]": "완•매가 결계 전개 중 공격 시 적에게 부여하는 상태. 적의 약점 격파 상태를 연장하고 행동 게이지를 감소시킨다."
  }
};

export default ruanMei;
