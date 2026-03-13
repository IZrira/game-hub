
import { Character } from '../../../types';

const kafka: Character = {
  id: "kafka",
  name: "카프카",
  folderName: "카프카",
  gameId: "hsr",
  attribute: "번개",
  path: "공허",
  rarity: 5,
  affiliation: "스텔라론 헌터",
  briefInfo: "「스텔라론 헌터」의 멤버, 시크하고 차분한 분위기의 오피스룩 미녀. 언령술을 사용하며, 개척자이/가 스텔라론을 흡수할 수 있도록 설계한다. 취미는 코트 구매 및 정리하기",
  version: "1.2",
  releaseVersion: "1.2",
  languageNames: "🇰🇷 카프카 / 🇺🇸 Kafka / 🇨🇳 卡芙卡 / 🇯🇵 カフカ",
  voiceActors: "🇰🇷 사문영 / 🇺🇸 셰릴 텍시에라 / 🇨🇳 쑤훼이 / 🇯🇵 이토 시즈카",
  hasASBuff: true,
  metadata: {
    name: "카프카",
    language: "🇰🇷 카프카 / 🇺🇸 Kafka / 🇨🇳 卡芙卡 / 🇯🇵 カフカ",
    element: "번개",
    path: "공허",
    rarity: 5,
    affiliation: "스텔라론 헌터",
    cv: "🇰🇷 사문영 / 🇺🇸 셰릴 텍시에라 / 🇨🇳 쑤훼이 / 🇯🇵 이토 시즈카",
    releaseVersion: "1.2",
    brief: "「스텔라론 헌터」의 멤버, 시크하고 차분한 분위기의 오피스룩 미녀. 언령술을 사용하며, 개척자이/가 스텔라론을 흡수할 수 있도록 설계한다. 취미는 코트 구매 및 정리하기"
  },
  baseStats: {
    lv1: { "기초 HP": 148, "기초 공격력": 92, "기초 방어력": 66 },
    lv20: { "기초 HP": 288, "기초 공격력": 180, "기초 방어력": 129 },
    lv30: { "기초 HP": 421, "기초 공격력": 263, "기초 방어력": 188 },
    lv40: { "기초 HP": 554, "기초 공격력": 347, "기초 방어력": 248 },
    lv50: { "기초 HP": 687, "기초 공격력": 430, "기초 방어력": 307 },
    lv60: { "기초 HP": 821, "기초 공격력": 513, "기초 방어력": 366 },
    lv70: { "기초 HP": 954, "기초 공격력": 596, "기초 방어력": 426 },
    lv80: { "기초 HP": 1087, "기초 공격력": 679, "기초 방어력": 485 },
    speed: 100,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "조형자의 번개 지팡이", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "어두운 흑요", count: "18", rarity: 2 },
      { name: "허공의 흑요", count: "69", rarity: 3 },
      { name: "타락의 흑요", count: "139", rarity: 4 },
      { name: "약탈의 본능", count: "41", rarity: 2 },
      { name: "변조된 야망", count: "56", rarity: 3 },
      { name: "짓밟힌 의지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "소란스러운 밤",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 카프카 공격력 100%만큼의 번개 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "달빛의 어루만짐",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 카프카 공격력의 160%만큼 번개 속성 피해를 가하고, 인접한 목표에게 카프카 공격력의 60%만큼 번개 속성 피해를 가한다.\n지정된 단일 적이 지속 피해 상태인 경우, 현재 해당 적이 받는 모든 지속 피해는 즉시 기존 피해 75%만큼의 피해르 생성한다.",
      icon: "skill_1"
    },
    {
      name: "비극 끝의 떨리는 소리",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      description: "모든 적에게 카프카 공격력의 80%만큼 번개 속성 피해를 가하고, 피격된 적을 100%의 기본 확률로 감전 상태에 빠트리며, 현재 대상이 받는 감전 상태는 즉시 기존 피해 100%만큼의 피해를 생성한다. 감전 상태 지속 시간: 2턴\n감전 상태이 적은 턴이 시작될 때마다 카프카 공격력의 290% 만큼 번개 속성 지속 피해를 받는다.",
      icon: "ultimate_1"
    },
    {
      name: "상냥함이 곧 잔혹함",
      tag: "특성 | 단일 공격",
      energyRegen: "에너지 회복 10",
      toughnessDMG: "약점 격파 단일 10",
      description: "카프카의 동료가 적에게 일반 공격을 발동하면 카프카는 즉시 추가 공격을 발동하고 해당 목표에게 카프카 공격력의 140%만큼 번개 속성 피해를 가하며, 100%의 기본 확률로 피격된 적을 필살기와 동일한 감전 상태에 빠트린다. 감전 상태 지속 시간: 2턴.\n해당 효과는 턴마다 1회만 발동한다.",
      icon: "talent_1"
    },
    {
      name: "자비와 무관한 용서",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 20",
      description: "일정 범위 내 모든 적을 즉시 공격하며, 전투 진입 후 모든 적에게 카프카 공격력의 50%만큼 번개 속성 피해를 가하고, 100%의 기본 확률로 각 단일 적을 필살기와 동일한 감전 상태에 빠트린다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "고통", description: "필살기 발동 시 적은 「현재 받는 감전 상태가 즉시 피해를 생성」에서 「현재 받는 모든 지속 피해류 디버프 상태가 즉시 피해를 생성」으로 변경된다", icon: "bonus_1" },
    { name: "약탈", description: "필살기, 비술, 특성으로 발동한 추가 공격이 적을 감전 상태에 빠트릴 기본 확률이 30% 증가한다", icon: "bonus_2" },
    { name: "가시", description: "약점이 격파된 적에게 가하는 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "효과 명중", value: "18%", icon: "effect_hit_rate" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "다카포", description: "특성으로 추가 공격 발동 시 100%의 기본 확률로 목표가 받는 지속 피해가 30% 증가한다. 지속 시간: 2턴", icon: "eidolon_1" },
    { rank: "E02", name: "포르티시시모", description: "카프카가 필드에 있으면 모든 아군이 가하는 지속 피해가 25% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "카프리치오", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "레치타티보", description: "적이 카프카가 부여한 감전 상태로 인해 피해를 받으면 카프카는 에너지 2pt를 추가로 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "돌로로소", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "레지에로", description: "필살기, 비술, 특성으로 발동한 추가 공격은 적이 빠진 감전 상태의 피해 배율을 156% 증가시키고, 감전 상태의 지속 시간을 1턴 증가시킨다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "소란스러운 밤",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 카프카 공격력 100%만큼의 번개 속성 피해를 가한다.",
        icon: "basic_atk_1"
      },
      {
        name: "달빛의 어루만짐",
        tag: "전투 스킬 | 확산",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "약점 격파 단일 20 확산 10",
        spRecovery: "-1",
        description: "지정된 단일 적에게 카프카 공격력의 160%만큼 번개 속성 피해를 가하고, 인접한 목표에게 카프카 공격력의 60%만큼 번개 속성 피해를 가한다.\n지정된 단일 적 또는 인접한 목표가 지속 피해 상태인 경우, 현재 대상이 받는 모든 지속 피해는 즉시 기존 피해의 75%/50%만큼 피해를 생성한다.",
        icon: "skill_1"
      },
      {
        name: "비극 끝의 떨리는 소리",
        tag: "필살기 | 범위 공격",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 범위 20",
        description: "모든 적에게 카프카 공격력의 80%만큼 번개 속성 피해를 가하고, 피격된 적을 120%의 기본 확률로 감전 상태에 빠트리며, 현재 대상이 받는 지속 피해류 디버프 상태는 즉시 기존 피해의 130%만큼의 피해를 생성한다. 감전 상태 지속 시간: 2턴\n감전 상태이 적은 턴이 시작될 때마다 카프카 공격력의 290% 만큼 번개 속성 지속 피해를 받는다.",
        icon: "ultimate_1"
      },
      {
        name: "상냥함이 곧 잔혹함",
        tag: "특성 | 단일 공격",
        energyRegen: "에너지 회복 10",
        toughnessDMG: "약점 격파 단일 10",
        description: "카프카의 동료가 적에게 공격을 발동하면 카프카는 즉시 추가 공격을 발동하고 주목표에게 카프카 공격력의 140%만큼 번개 속성 피해를 가하며, 피격된 적을 100%의 기본 확률로 필살기와 동일한 감전 상태에 빠트린다. 감전 상태 지속 시간: 2턴.\n해당 효과는 최대 2회 발동하며, 카프카의 턴 종료 시 1회 회복한다.",
        icon: "talent_1"
      },
      {
        name: "자비와 무관한 용서",
        tag: "비술",
        energyRegen: "0",
        toughnessDMG: "약점 격파 단일 20",
        description: "일정 범위 내 모든 적을 즉시 공격하며, 전투 진입 후 모든 적에게 카프카 공격력의 50%만큼 번개 속성 피해를 가하고, 100%의 기본 확률로 각 단일 적을 필살기와 동일한 감전 상태에 빠트린다. 지속 시간: 2턴",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "고통", description: "아군의 효과 명중이 75% 이상일 시, 카프카가 해당 목표의 공격력을 100% 증가시킨다", icon: "bonus_1" },
      { name: "약탈", description: "필살기, 비술, 특성으로 발동한 추가 공격이 적을 감전 상태에 빠트릴 기본 확률이 30% 증가한다", icon: "bonus_2" },
      { name: "가시", description: "필살기 발동 후 특성의 추가 공격 발동 가능 횟수가 1회 회복되며, 특성의 추가 공격은 대상이 현재 받는 모든 지속 피해류 디버프 상태가 즉시 기존 피해의 80%만큼 피해를 생성하게 한다", icon: "bonus_3" }
    ],
    eidolons: [
      { rank: "E01", name: "다카포", description: "공격 발동 시 100%의 기본 확률로 목표가 받는 지속 피해가 30% 증가한다, 지속 시간: 2턴", icon: "eidolon_1" },
      { rank: "E02", name: "포르티시시모", description: "카프카가 필드에 있으면 모든 아군이 가하는 지속 피해가 33% 증가한다", icon: "eidolon_2" },
      { rank: "E03", name: "카프리치오", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
      { rank: "E04", name: "레치타티보", description: "적이 카프카가 부여한 감전 상태로 인해 피해를 받으면 카프카는 에너지 2pt를 추가로 회복한다", icon: "eidolon_4" },
      { rank: "E05", name: "돌로로소", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
      { rank: "E06", name: "레지에로", description: "필살기, 비술, 특성으로 발동한 추가 공격은 적이 빠진 감전 상태의 피해 배율을 156% 증가시키고, 감전 상태의 지속 시간을 1턴 증가시킨다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다."
  }
};

export default kafka;
