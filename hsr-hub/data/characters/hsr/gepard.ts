
import { Character } from '../../../../common-hub/types';

const gepard: Character = {
  id: "gepard",
  name: "게파드",
  folderName: "게파드",
  gameId: "hsr",
  attribute: "얼음",
  path: "보존",
  rarity: 5,
  affiliation: "벨로보그",
  briefInfo: "실버메인 철위대의 방위관, 벨로보그 최고의 전사 중 하나. 겉과 속이 같고 빈틈없이 항상 성실하다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 게파드 / 🇺🇸 Gepard / 🇨🇳 杰帕德 / 🇯🇵 ジェパード",
  voiceActors: "🇰🇷 민승우 / 🇺🇸 브라이슨 바우거스 / 🇨🇳 마양 / 🇯🇵 후루카와 마코토",
  metadata: {
    name: "게파드",
    language: "🇰🇷 게파드 / 🇺🇸 Gepard / 🇨🇳 杰帕德 / 🇯🇵 ジェパード",
    element: "얼음",
    path: "보존",
    rarity: 5,
    affiliation: "벨로보그",
    cv: "🇰🇷 민승우 / 🇺🇸 브라이슨 바우거스 / 🇨🇳 마양 / 🇯🇵 후루카와 마코토",
    releaseVersion: "1.0",
    brief: "실버메인 철위대의 방위관, 벨로보그 최고의 전사 중 하나. 겉과 속이 같고 빈틈없이 항상 성실하다"
  },
  baseStats: {
    lv1: { "기초 HP": 190, "기초 공격력": 74, "기초 방어력": 89 },
    lv20: { "기초 HP": 371, "기초 공격력": 144, "기초 방어력": 174 },
    lv30: { "기초 HP": 542, "기초 공격력": 211, "기초 방어력": 254 },
    lv40: { "기초 HP": 713, "기초 공격력": 277, "기초 방어력": 334 },
    lv50: { "기초 HP": 884, "기초 공격력": 344, "기초 방어력": 414 },
    lv60: { "기초 HP": 1055, "기초 공격력": 411, "기초 방어력": 495 },
    lv70: { "기초 HP": 1226, "기초 공격력": 477, "기초 방어력": 575 },
    lv80: { "기초 HP": 1397, "기초 공격력": 544, "기초 방어력": 655 },
    speed: 92,
    taunt: 150,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "눈보라의 뿔", count: "65", rarity: 4 },
      { name: "철위대 배지", count: "15", rarity: 2 },
      { name: "철위대 표식", count: "15", rarity: 3 },
      { name: "철위대 훈장", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "조화의 가락", count: "18", rarity: 2 },
      { name: "가족의 찬가", count: "69", rarity: 3 },
      { name: "별들의 악장", count: "139", rarity: 4 },
      { name: "철위대 배지", count: "41", rarity: 2 },
      { name: "철위대 표식", count: "56", rarity: 3 },
      { name: "철위대 훈장", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "의지의 주먹",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 2단 공격을 발동하여, 게파드 공격력의 100%만큼 얼음 속성 피해를 준다.",
      icon: "basic_atk_1"
    },
    {
      name: "위협의 일격",
      tag: "전투 스킬 | 방해",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "지정된 단일 적에게 게파드 공격력 200%만큼의 얼음 속성 피해를 가하며 피격된 적은 65%의 기본 확률로 빙결 상태에 빠진다. 지속 시간: 1턴.\n빙결 상태의 적은 행동할 수 없으며 턴이 시작될 때마다 게파드 공격력 60%만큼의 얼음 속성 추가 피해를 받는다",
      icon: "skill_1"
    },
    {
      name: "영원의 벽",
      tag: "필살기 | 방어",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "모든 아군에게 게파드 방어력 45%+600만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 3턴",
      icon: "ultimate_1"
    },
    {
      name: "불굴의 몸",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "게파드는 치명적인 공격을 받아도 전투 불능 상태에 빠지지 않으며 자신의 HP 최대치 50%만큼의 HP를 즉시 회복한다. 해당 효과는 단일 전투에서 1회만 발동한다",
      icon: "talent_1"
    },
    {
      name: "감정의 증표",
      tag: "비술 | 방어",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "비술 사용 후 다음 전투 시작 시 모든 아군에게 게파드 방어력 24%+150만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "강직", description: "게파드가 적에게 피격될 확률이 증가한다", icon: "bonus_1" },
    { name: "지휘관", description: "[불굴의 몸] 발동 후 게파드의 에너지가 즉시 100%까지 회복된다", icon: "bonus_2" },
    { name: "전의", description: "게파드의 공격력이 현재 방어력의 35%만큼 증가하며, 턴이 시작될 때마다 갱신된다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "얼음 속성 피해 증가", value: "22.4%", icon: "ice_dmg" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "근면 성실", description: "전투 스킬 발동 시 피격된 적이 빙결 상태에 빠질 기본 확률이 35% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "남은 추위", description: "전투 스킬로 적에게 부여한 빙결 상태가 해제된 후 목표의 속도가 20% 감소한다. 지속 시간: 1턴", icon: "eidolon_2" },
    { rank: "E03", name: "난공불락", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "지성이면 감천", description: "게파드가 필드에 있으면 모든 아군의 효과 저항이 20% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "강철 같은 주먹", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "불굴의 결의", description: "특성 발동 시 게파드가 즉시 행동하고, 현재 HP의 회복량이 자신 HP 최대치의 50%만큼 추가로 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "추가 피해": "피격자에게 추가로 피해를 가한다. 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다."
  }
};

export default gepard;
