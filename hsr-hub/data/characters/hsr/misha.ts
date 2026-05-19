
import { Character } from '../../../../common-hub/types';

const misha: Character = {
  id: "misha",
  gameId: "hsr",
  name: "미샤",
  folderName: "미샤",
  attribute: "얼음",
  path: "파멸",
  rarity: 4,
  affiliation: "페나코니",
  briefInfo: "페나코니 호텔의 벨보이이자 영리한 남자아이. 무명객에 동경을 가지고 있으며 언젠가 여행길에 오르겠다는 꿈이 있다.",
  version: "2.0",
  releaseVersion: "2.0",
  languageNames: "🇰🇷 미샤 / 🇺🇸 Misha / 🇨🇳 米沙 / 🇯🇵 ミーシャ",
  voiceActors: "🇰🇷 박신희 / 🇺🇸 캣 프로타노 / 🇨🇳 류쯔샤오 / 🇯🇵 마츠이 에리코",
  metadata: {
    name: "미샤",
    language: "🇰🇷 미샤 / 🇺🇸 Misha / 🇨🇳 米沙 / 🇯🇵 ミーシャ",
    element: "얼음",
    path: "파멸",
    rarity: 4,
    affiliation: "페나코니",
    cv: "🇰🇷 박신희 / 🇺🇸 캣 프로타노 / 🇨🇳 류쯔샤오 / 🇯🇵 마츠이 에리코",
    releaseVersion: "2.0",
    brief: "페나코니 호텔의 벨보이이자 영리한 남자아이. 무명객에 동경을 가지고 있으며 언젠가 여행길에 오르겠다는 꿈이 있다."
  },
  baseStats: {
    lv1: { "기초 HP": 173, "기초 공격력": 82, "기초 방어력": 54 },
    lv20: { "기초 HP": 337, "기초 공격력": 159, "기초 방어력": 105 },
    lv30: { "기초 HP": 492, "기초 공격력": 233, "기초 방어력": 154 },
    lv40: { "기초 HP": 648, "기초 공격력": 306, "기초 방어력": 203 },
    lv50: { "기초 HP": 804, "기초 공격력": 379, "기초 방어력": 251 },
    lv60: { "기초 HP": 959, "기초 공격력": 453, "기초 방어력": 300 },
    lv70: { "기초 HP": 1115, "기초 공격력": 526, "기초 방어력": 348 },
    lv80: { "기초 HP": 1270, "기초 공격력": 600, "기초 방어력": 397 },
    speed: 96,
    taunt: 125,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "아이스박스", count: "50", rarity: 4 },
      { name: "꿈 저장 부품", count: "12", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "13", rarity: 3 },
      { name: "꿈 제조 모터", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "9", rarity: 4 },
      { name: "보리인의 송곳니", count: "8", rarity: 2 },
      { name: "늑대 독 송곳니", count: "42", rarity: 3 },
      { name: "달의 광기 이빨", count: "77", rarity: 4 },
      { name: "꿈 저장 부품", count: "22", rarity: 2 },
      { name: "꿈 흐름 밸브", count: "35", rarity: 3 },
      { name: "꿈 제조 모터", count: "20", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "지…지나갈게요!",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 미샤 공격력의 100%만큼 얼음 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "룸…룸서비스입니다!",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "-1",
      description: "미샤의 다음 필살기 공격 단수가 1단 증가한다. \n지정된 단일 적에게 미샤 공격력의 200%만큼 얼음 속성 피해를 가하고 인접한 목표에게 미샤 공격력의 80%만큼 얼음 속성 피해를 가한다",
      icon: "skill_1"
    },
    {
      name: "지…지각하겠어!",
      tag: "필살기 | 바운스",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 10",
      description: "기본 상태에서 공격 단수를 3단 보유한다. \n우선 1단 공격을 발동하여 지정된 단일 적에게 미샤 공격력의 60% 만큼 얼음 속성 피해를 가하고 \n나머지 단수별 공격은 랜덤 단일 적에게 미샤 공격력의 60%만큼 얼음 속성 피해를 가한다. \n단수별 공격 전 20%의 기본 확률로 목표를 빙결 상태에 빠뜨린다. 지속 시간: 1턴\n빙결 상태에서 적은 행동할 수 없으며, 턴이 시작될 때마다 미샤 공격력의 30% 만큼 얼음 속성 추가 피해를 받는다.\n필살기 공격 단수는 최대 10단까지 누적되며, 필살기 발동 후 공격 단수는 기본 상태로 복구된다",
      icon: "ultimate_1"
    },
    {
      name: "탈진기",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "모든 아군이 전투 스킬 포인트를 1pt 소모할 때마다 미샤의 다음 필살기 공격 단수가 1단 증가하고, 미샤의 에너지가 2pt 회복된다",
      icon: "talent_1"
    },
    {
      name: "멈추어라, 너 정말 아름답구나!",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "비술 사용 후 15초 동안 지속되는 특수 영역을 만든다. 특수 영역 내에 있는 적은 [꿈세계 감옥] 상태에 빠진다. \n[꿈세계 감옥] 상태에 빠진 적은 모든 행동을 중지한다. \n[꿈세계 감옥] 상태의 적과 전투 진입 후 미샤의 다음 필살기 공격 단수는 2단 증가한다. \n아군이 만든 영역 효과는 최대 1개만 존재할 수 있다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "릴리즈", description: "필살기의 첫 1단 공격 전 목표가 빙결 상태에 빠질 기본 확률이 80% 증가한다", icon: "bonus_1" },
    { name: "인터로크", description: "필살기 발동 시 해당 필살기 행동이 종료될 때까지 효과 명중이 60% 증가한다", icon: "bonus_2" },
    { name: "트랜스미션", description: "빙결 상태에 빠진 적에게 피해를 가할 시 치명타 피해가 30% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "얼음 속성 피해 증가", value: "22.4%", icon: "ice_dmg" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "치명타 확률", value: "6.7%", icon: "crit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "흔들리는 환영", description: "필살기 발동 시 필드 위 적 1명당 해당 필살기 공격 단수가 추가로 1단 증가하며, 최대 추가로 5단까지 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "청춘의 창연한 눈빛", description: "필살기의 단수별 공격 전 24%의 기본 확률로 목표의 방어력을 16% 감소시킨다. 지속 시간: 3턴", icon: "eidolon_2" },
    { rank: "E03", name: "행복한 세월의 그림자", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "다정한 모습", description: "필살기의 단수별 공격 피해 배율이 6% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "최초의 사랑과 우정", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "오랫동안 잊고 있던 동경", description: "필살기 발동 시, 자신이 가하는 피해가 자신의 턴이 종료될 때까지 30% 증가하며, 다음 전투 스킬 발동 후 아군이 전투 스킬 포인트를 1pt 회복한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "추가 피해": "피격자에게 추가로 피해를 가한다. 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다."
  }
};

export default misha;
