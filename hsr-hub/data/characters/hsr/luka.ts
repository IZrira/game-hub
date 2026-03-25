
import { Character } from '../../../../common-hub/types';

const luka: Character = {
  id: "luka",
  gameId: "hsr",
  name: "루카",
  folderName: "루카",
  attribute: "물리",
  path: "공허",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "벨로보그 하층 구역의 챔피언 격투선수, 「와일드 파이어」의 실력파 멤버 중 하나. 격투 클럽의 연속 디펜딩 챔피언, 자신의 열정으로 하층 구역의 꿈이 있는 아이들을 격려한다",
  releaseVersion: "1.2",
  version: "1.2",
  languageNames: "🇰🇷 루카 / 🇺🇸 Luka / 🇨🇳 卢卡 / 🇯🇵 ルカ",
  voiceActors: "🇰🇷 이주승 / 🇺🇸 하워드 웡 / 🇨🇳 샤오자이 / 🇯🇵 카지와라 가쿠토",
  metadata: {
    name: "루카",
    language: "🇰🇷 루카 / 🇺🇸 Luka / 🇨🇳 卢卡 / 🇯🇵 ルカ",
    element: "물리",
    path: "공허",
    rarity: 4,
    affiliation: "벨로보그",
    cv: "🇰🇷 이주승 / 🇺🇸 하워드 웡 / 🇨🇳 샤오자이 / 🇯🇵 카지와라 가쿠토",
    releaseVersion: "1.2",
    brief: "벨로보그 하층 구역의 챔피언 격투선수, 「와일드 파이어」의 실력파 멤버 중 하나. 격투 클럽의 연속 디펜딩 챔피언, 자신의 열정으로 하층 구역의 꿈이 있는 아이들을 격려한다"
  },
  baseStats: {
    lv1: { "기초 HP": 125, "기초 공격력": 79, "기초 방어력": 66 },
    lv20: { "기초 HP": 243, "기초 공격력": 154, "기초 방어력": 129 },
    lv30: { "기초 HP": 356, "기초 공격력": 226, "기초 방어력": 188 },
    lv40: { "기초 HP": 468, "기초 공격력": 297, "기초 방어력": 248 },
    lv50: { "기초 HP": 580, "기초 공격력": 368, "기초 방어력": 307 },
    lv60: { "기초 HP": 693, "기초 공격력": 440, "기초 방어력": 366 },
    lv70: { "기초 HP": 805, "기초 공격력": 511, "기초 방어력": 426 },
    lv80: { "기초 HP": 917, "기초 공격력": 582, "기초 방어력": 485 },
    speed: 103,
    taunt: 100,
    energy: 130
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "강철 늑대의 깨진 이빨", count: "50", rarity: 4 },
      { name: "고대 부속품", count: "12", rarity: 2 },
      { name: "고대 전동축", count: "13", rarity: 3 },
      { name: "고대 엔진", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "54", rarity: 3 },
      { name: "타락의 흑요", count: "105", rarity: 4 },
      { name: "고대 부속품", count: "28", rarity: 2 },
      { name: "고대 전동축", count: "42", rarity: 3 },
      { name: "고대 엔진", count: "42", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "돌격 펀치",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 루카 공격력 100%만큼의 물리 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "돌격 어퍼컷",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "0",
      description: "[투지] 2스택을 소모하여 먼저 [돌격 펀치]를 사용해 3단 공격을 발동한다. 공격 단수마다 지정된 단일 적에게 루카 공격력 20% 만큼의 물리 속성 피해를 가한다. 그리고 [어퍼컷]을 사용하여 1단 공격을 발동하고, 지정된 단일 적에게 루카 공격력 80% 만큼의 물리 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "열상 펀치",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적에게 루카 공격력 120% 만큼의 물리 속성 피해를 가하고, 100%의 기본 확률로 목표를 열상 상태에 빠트린다. 지속 시간: 3턴\n열상 상태인 적은 턴이 시작될 때마다 자신의 HP 최대치 24%만큼의 물리 속성 지속 피해를 받으며, 최대 루카 공격력의 338%를 초과하지 않는다",
      icon: "skill_1"
    },
    {
      name: "승리의 일격",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "[투지]를 2스택 획득하고 100%의 기본 확률로 지정된 단일 적이 받는 피해가 20% 증가한다. 지속 시간: 3턴.\n그 후 해당 목표에게 루카 공격력 330%만큼의 물리 속성 피해를 가한다",
      icon: "ultimate_1"
    },
    {
      name: "생기발랄",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "루카는 일반 공격 [돌격 펀치]와 전투 스킬 [열상 펀치]를 발동하면 [투지]를 1스택 획득한다. [투지]는 최대 4스택 보유할 수 있다. \n보유한 [투지]가 2스택 이상일 시 일반 공격 [돌격 펀치]는 [돌격 어퍼컷]으로 강화된다. \n강화된 일반 공격의 [어퍼컷]으로 열상 상태에 빠진 적을 명중하면 현재 받는 열상 상태는 기존 피해 85%만큼의 피해를 즉시 1회 생성한다.",
      icon: "talent_1"
    },
    {
      name: "앞서는 자",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "적을 바로 공격하며, 전투 진입 후 임의의 단일 적에게 루카 공격력 50%만큼의 물리 속성 피해를 가하고, \n100%의 기본 확률로 목표를 전투 스킬과 동일한 열상 상태에 빠트린다. 그 후 루카는 [투지]를 1스택 추가로 획득한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "투지 분쇄", description: "전투 스킬 발동 시 즉시 적의 버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "순환 제동", description: "[투지]를 1스택 획득할 때마다 추가로 에너지를 3pt 회복한다", icon: "bonus_2" },
    { name: "동력 에너지 과부하", description: "강화된 일반 공격 발동 시, [돌격 펀치]의 공격 단수마다 50%의 고정 확률로 루카가 1단 공격을 추가로 발동한다. 해당 효과는 추가 발동된 공격에는 적용되지 않는다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "효과 저항", value: "18%", icon: "effect_res" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "끊임없는 싸움", description: "루카 행동 시 지정된 적이 열상 상태이면 루카가 가하는 피해는 15% 증가한다. 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "약한 적, 강한 나", description: "전투 스킬을 명중한 적의 약점이 물리 속성이면 [투지]를 1스택 획득한다", icon: "eidolon_2" },
    { rank: "E03", name: "링을 위해 태어난 자", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "칠전팔기", description: "[투지]를 1스택 획득할 때마다 공격력이 5% 증가한다. 해당 효과 최대 중첩수: 4스택", icon: "eidolon_4" },
    { rank: "E05", name: "와일드 파이어 스피릿", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "챔피언의 영광", description: "강화된 일반 공격의 [어퍼컷]을 발동해 열상 상태에 빠진 적을 명중하면 이번 강화된 일반 공격에 사용한 [돌격 펀치] 공격 단수마다 적이 현재 받는 열상 상태가 기존 피해 8%의 피해를 추가로 즉시 1회 생성한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "고정 확률": "어떤 요인에도 영향을 받지 않는 고정 확률이다."
  }
};

export default luka;
