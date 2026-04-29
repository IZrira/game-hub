
import { Character } from '../../../../common-hub/types';

const silverWolf: Character = {
  id: "silver_wolf",
  name: "은랑",
  folderName: "은랑",
  gameId: "hsr",
  attribute: "양자",
  path: "공허",
  rarity: 5,
  affiliation: "스텔라론 헌터",
  briefInfo: "「스텔라론 헌터」의 멤버, 프로 해커\n우주를 몰입감 넘치는 대형 시뮬레이션 게임으로 여기며 즐기고 있다\n현실 데이터를 수정할 수 있는 「에테르 편집」을 마스터했다",
  version: "1.1",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 은랑 / 🇺🇸 Silver Wolf / 🇨🇳 银狼 / 🇯🇵 銀狼",
  voiceActors: "🇰🇷 장미 / 🇺🇸 멜리사 판 / 🇨🇳 Hanser / 🇯🇵 아스미 카나",
  hasASBuff: true,
  metadata: {
    name: "은랑",
    language: "🇰🇷 은랑 / 🇺🇸 Silver Wolf / 🇨🇳 银狼 / 🇯🇵 銀狼",
    element: "양자",
    path: "공허",
    rarity: 5,
    affiliation: "스텔라론 헌터",
    cv: "🇰🇷 장미 / 🇺🇸 멜리사 판 / 🇨🇳 Hanser / 🇯🇵 아스미 카나",
    releaseVersion: "1.1",
    brief: "「스텔라론 헌터」의 멤버, 프로 해커\n우주를 몰입감 넘치는 대형 시뮬레이션 게임으로 여기며 즐기고 있다\n현실 데이터를 수정할 수 있는 「에테르 편집」을 마스터했다"
  },
  baseStats: {
    lv1: { "기초 HP": 143, "기초 공격력": 87, "기초 방어력": 63 },
    lv20: { "기초 HP": 278, "기초 공격력": 170, "기초 방어력": 122 },
    lv30: { "기초 HP": 406, "기초 공격력": 248, "기초 방어력": 179 },
    lv40: { "기초 HP": 535, "기초 공격력": 327, "기초 방어력": 235 },
    lv50: { "기초 HP": 663, "기초 공격력": 405, "기초 방어력": 292 },
    lv60: { "기초 HP": 791, "기초 공격력": 484, "기초 방어력": 348 },
    lv70: { "기초 HP": 920, "기초 공격력": 562, "기초 방어력": 404 },
    lv80: { "기초 HP": 1048, "기초 공격력": 640, "기초 방어력": 461 },
    speed: 107,
    taunt: 100,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "환영의 무쇠", count: "65", rarity: 4 },
      { name: "고대 부속품", count: "15", rarity: 2 },
      { name: "고대 전동축", count: "15", rarity: 3 },
      { name: "고대 엔진", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "파멸자의 말로", count: "9", rarity: 4 },
      { name: "어두운 흑요", count: "12", rarity: 2 },
      { name: "허공의 흑요", count: "53", rarity: 3 },
      { name: "타락의 흑요", count: "101", rarity: 4 },
      { name: "고대 부속품", count: "33", rarity: 2 },
      { name: "고대 전동축", count: "46", rarity: 3 },
      { name: "고대 엔진", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "[시스템 경고]",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 은랑 공격력의 100%만큼 양자 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "수정하시겠습니까?",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 필드 위 아군이 보유한 속성의 약점을 85%의 기본 확률로 1개 부여하고, 해당 약점에 대응하는 속성의 저항이 20% 감소한다, 지속 시간: 2턴. \n적이 보유한 속성과 동일한 약점이 부여되면 대응하는 속성 저항 감소 효과가 발동되지 않는다.\n은랑은 단일 적에게 1개의 약점만 부여할 수 있고, 약점 재부여 시 새로 부여된 약점만 존재한다.\n100%의 기본 확률로 해당 목표의 모든 속성 저항이 추가로 10% 감소한다. 지속 시간: 2턴\n해당 목표에게 은랑 공격력의 196% 만큼 양자 속성 피해를 가한다",
      icon: "skill_1"
    },
    {
      name: "[계정 정지]",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적의 방어력이 100%의 기본 확률로 45% 감소한다. 지속 시간: 3턴. 동시에 해당 목표에게 은랑 공격력의 380%만큼 양자 속성 피해를 준다",
      icon: "ultimate_1"
    },
    {
      name: "프로그램 응답 대기 중…",
      tag: "특성 | 방해",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "은랑은 다음 3가지의 [결함]을 생성할 수 있다: 공격력 10% 감소, 방어력 8% 감소, 속도 6% 감소.\n은랑은 매번 공격 발동 후 피격된 적에게 72%의 기본 확률로 랜덤 [결함]을 1개 이식한다. 지속 시간: 3턴",
      icon: "talent_1"
    },
    {
      name: "[프로세스 강제 종료]",
      tag: "비술 | 공격",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 20",
      description: "적을 즉시 공격하며, 전투 진입 후 모든 적에게 은랑 공격력의 80%만큼 양자 속성 피해를 가하고, 약점 속성을 무시하며 모든 적의 강인성을 감소시킨다. \n약점 격파 시 양자 속성의 약점 격파 효과를 발동한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "생성", description: "[결함]의 지속 시간이 1턴 증가하며, 적의 약점이 격파될 때마다 은랑은 65%의 기본 확률로 해당 목표에게 랜덤 [결함]을 1개 이식한다", icon: "bonus_1" },
    { name: "주입", description: "전투 스킬 발동 시 적에게 부여하는 약점의 지속 시간이 1턴 증가한다", icon: "bonus_2" },
    { name: "주석", description: "전투 스킬 발동 시 적의 디버프 효과 수량이 3개 이상일 경우, 전투 스킬로 인한 목표의 모든 속성 저항 감소 효과가 추가로 3% 감소한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "효과 명중", value: "18%", icon: "effect_hit_rate" },
    { type: "양자 속성 피해 증가", value: "8%", icon: "quantum_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "소셜 엔지니어링", description: "필살기를 발동해 적 공격 후 목표가 보유한 디버프 효과 1개당 은랑은 에너지를 7pt 회복한다. 해당 효과는 필살기 공격마다 최대 5회 적용된다", icon: "eidolon_1" },
    { rank: "E02", name: "좀비 네트워크", description: "적이 전투 진입 시 효과 저항이 20% 감소한다", icon: "eidolon_2" },
    { rank: "E03", name: "페이로드", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "바운스 공격", description: "필살기를 발동해 적 공격 후 목표가 보유한 디버프 효과 1개당 추가로 은랑 공격력의 20%만큼 양자 속성 추가 피해를 가한다. 해당 효과는 필살기 공격마다 최대 5회 발동된다.", icon: "eidolon_4" },
    { rank: "E05", name: "무차별 대입 공격", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "오버레이 네트워크", description: "적이 보유한 디버프 효과 1개당 은랑이 대상에게 가하는 피해가 20% 증가하며, 최대 100% 증가한다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "[시스템 경고]",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 은랑 공격력의 100%만큼 양자 속성 피해를 가한다",
        icon: "basic_atk_1"
      },
      {
        name: "수정하시겠습니까?",
        tag: "전투 스킬 | 단일 공격",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "약점 격파 단일 20 확산 10",
        spRecovery: "-1",
        description: "지정된 단일 적에게 필드 위 아군이 보유한 속성의 약점을 120%의 기본 확률로 1개 부여하고\n(아군 파티 편성의 첫 번째 캐릭터가 보유한 속성의 약점을 우선으로 부여), 해당 약점에 대응하는 속성의 저항이 20% 감소한다, 지속 시간: 3턴. \n적이 보유한 속성과 동일한 약점이 부여되면 대응하는 속성의 저항 감소 효과가 발동되지 않는다.\n은랑은 단일 적에게 1개의 약점만 부여할 수 있고, 약점 재부여 시 새로 부여된 약점만 존재한다.\n100%의 기본 확률로 해당 목표의 모든 속성 저항이 추가로 13% 감소한다, 지속 시간: 2턴\n해당 목표에게 은랑 공격력의 196% 만큼 양자 속성 피해를 가한다",
        icon: "skill_1"
      },
      {
        name: "[계정 정지]",
        tag: "필살기 | 범위 공격",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 범위 20",
        description: "모든 적의 방어력이 120%의 기본 확률로 45% 감소한다, 지속 시간: 3턴. 동시에 모든 적에게 은랑 공격력의 380%만큼 양자 속성 피해를 가한다",
        icon: "ultimate_1"
      },
      {
        name: "프로그램 응답 대기 중…",
        tag: "특성 | 방해",
        energyRegen: "0",
        toughnessDMG: "0",
        description: "은랑은 다음 3가지의 결함을 생성할 수 있다. 공격력 10% 감소, 방어력 12% 감소, 속도 6% 감소. \n은랑은 매번 공격을 발동한 후 피격된 적에게 100%의 기본 확률로 랜덤 [결함]을 1개 이식한다, 지속 시간: 3턴\n적이 처치될 시, 은랑이 대상에게 부여한 약점은 필드 위 생존한 적 중 은랑에게 약점이 부여되지 않은 적에게로 이전되며, 정예급 이상의 목표에게 우선 이전된다",
        icon: "talent_1"
      },
      {
        name: "[프로세스 강제 종료]",
        tag: "비술 | 공격",
        energyRegen: "0",
        toughnessDMG: "약점 격파 단일 20",
        description: "적을 즉시 공격하며, 전투 진입 후 모든 적에게 은랑 공격력의 80%만큼 양자 속성 피해를 가하고, 약점 속성을 무시하며 모든 적의 강인성을 감소시킨다. \n약점 격파 시 양자 속성의 약점 격파 효과를 발동한다",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "생성", description: "[결함]의 지속 시간이 1턴 증가하며, 적의 약점이 격파될 때마다 은랑은 100%의 기본 확률로 해당 목표에게 랜덤 [결함]을 1개 이식한다", icon: "bonus_1" },
      { name: "주입", description: "전투 시작 시 즉시 에너지를 20pt 회복한다. 은랑의 턴 시작 시 자신의 에너지를 5pt 회복한다", icon: "bonus_2" },
      { name: "주석", description: "은랑이 보유한 효과 명중 10%당 추가로 공격력이 10% 증가한다. (최대 50% 증가)", icon: "bonus_3" }
    ],
    eidolons: [
      { rank: "E01", name: "소셜 엔지니어링", description: "필살기를 발동해 적 공격 후 목표가 보유한 디버프 효과 1개당 은랑은 에너지를 7pt 회복한다. 해당 효과는 필살기 공격마다 최대 5회 적용된다 ", icon: "eidolon_1" },
      { rank: "E02", name: "좀비 네트워크", description: "적이 전투 진입 시 대상이 받는 피해가 20% 증가한다. 적이 아군에게 피격 시 은랑은 100%의 기본 확률로 피격된 적에게 랜덤 [결함]을 1개 이식한다", icon: "eidolon_2" },
      { rank: "E03", name: "페이로드", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
      { rank: "E04", name: "바운스 공격", description: "필살기를 발동해 적 공격 후 목표가 보유한 디버프 효과 1개당 추가로 은랑 공격력의 20%만큼 양자 속성 추가 피해를 가한다. 해당 효과는 필살기 공격마다 각 목표에게 최대 5회 발동된다", icon: "eidolon_4" },
      { rank: "E05", name: "무차별 대입 공격", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
      { rank: "E06", name: "오버레이 네트워크", description: "적이 보유한 디버프 효과 1개당 은랑이 대상에게 가하는 피해가 20% 증가하며, 최대 100% 증가한다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "디버프 효과": "전투 중 디버프 효과가 있는 모든 지속 상태는 특별 설명이 없다면 해제할 수 있다.",
    "약점 속성 무시": "적의 약점 속성과 무관하게 강인성을 소모시킬 수 있다."
  }
};

export default silverWolf;
