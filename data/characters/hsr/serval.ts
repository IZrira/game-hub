
import { Character } from '../../../types';

const serval: Character = {
  id: "serval",
  gameId: "hsr",
  name: "서벌",
  folderName: "서벌",
  attribute: "번개",
  path: "지식",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "랜도 가문의 장녀. 취미는 락앤롤인 기계공. 실버메인 철위대의 연구원이었으나 지금은 기계공방 「네버윈터」를 운영하고 있다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 서벌 / 🇺🇸 Serval / 🇨🇳 希露瓦 / 🇯🇵 セーバル",
  voiceActors: "🇰🇷 민아 / 🇺🇸 나탈리 반 시스틴 / 🇨🇳 무페이 / 🇯🇵 아이미",
  baseStats: {
    lv1: { "기초 HP": 124, "기초 공격력": 88, "기초 방어력": 51 },
    lv20: { "기초 HP": 243, "기초 공격력": 173, "기초 방어력": 99 },
    lv30: { "기초 HP": 355, "기초 공격력": 252, "기초 방어력": 145 },
    lv40: { "기초 HP": 466, "기초 공격력": 331, "기초 방어력": 191 },
    lv50: { "기초 HP": 578, "기초 공격력": 411, "기초 방어력": 236 },
    lv60: { "기초 HP": 690, "기초 공격력": 490, "기초 방어력": 282 },
    lv70: { "기초 HP": 801, "기초 공격력": 570, "기초 방어력": 328 },
    lv80: { "기초 HP": 912, "기초 공격력": 649, "기초 방어력": 374 },
    speed: 104,
    taunt: 75,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "과거 그림자의 번개 왕관", count: "50", rarity: 4 },
      { name: "철위대 배지", count: "12", rarity: 2 },
      { name: "철위대 표식", count: "13", rarity: 3 },
      { name: "철위대 훈장", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "영감의 열쇠", count: "12", rarity: 2 },
      { name: "계몽의 열쇠", count: "54", rarity: 3 },
      { name: "지식의 열쇠", count: "105", rarity: 4 },
      { name: "철위대 배지", count: "28", rarity: 2 },
      { name: "철위대 표식", count: "42", rarity: 3 },
      { name: "철위대 훈장", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "천둥 소리", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 서벌 공격력 100%만큼의 번개 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "스파크 붐", tag: "전투 스킬 | 확산", energyRegen: "에너지 회복 30", toughnessDMG: "약점 격파 확산 20", spRecovery: "-1", description: "지정된 단일 적에게 서벌 공격력 140%만큼의 번개 속성 피해를 가하고, 인접한 목표에게 서벌 공격력 60%만큼의 번개 속성 피해를 가한다. 80%의 기본 확률로 피격된 적은 감전 상태에 빠진다. 지속 시간: 2턴. 감전 상태의 적은 턴이 시작될 때마다 서벌 공격력 104%만큼의 번개 속성 지속 피해를 받는다", icon: "skill_1" },
    { name: "기계 열병", tag: "필살기 | 범위 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 서벌 공격력 180%만큼의 번개 속성 피해를 가하고, 피격된 적의 감전 상태 지속 시간을 2턴 연장시킨다", icon: "ultimate_1" },
    { name: "열정적인 코드", tag: "특성 | 단일 공격", energyRegen: "0", toughnessDMG: "0", description: "공격 발동 후 모든 감전 상태의 적에게 서벌 공격력 72%만큼의 번개 속성 추가 피해를 가한다", icon: "talent_1" },
    { name: "굿나잇, 벨로보그", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 임의의 단일 적에게 서벌 공격력 50%만큼의 번개 속성 피해를 가하고, 모든 적을 100%의 기본 확률로 감전 상태에 빠트린다. 지속 시간: 3턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "로큰롤", description: "전투 스킬 발동 시 피격된 적이 감전 상태일 확률이 20% 증가한다", icon: "bonus_1" },
    { name: "일렉트릭", description: "전투 시작 시 즉시 에너지를 15pt 회복한다", icon: "bonus_2" },
    { name: "광열", description: "적 처치 시 공격력이 20% 증가한다. 지속 시간: 2턴", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "18.7%", icon: "crit_rate" },
    { type: "효과 명중", value: "18.0%", icon: "effect_hit_rate" },
    { type: "효과 저항", value: "10.0%", icon: "effect_res" }
  ],
  eidolons: [
    { rank: "E01", name: "잔향의 방", description: "일반 공격 발동 시 지정된 단일 적과 인접한 임의의 목표 1기에게 일반 공격 피해 60%만큼의 번개 속성 피해를 가한다", icon: "eidolon_1" },
    { rank: "E02", name: "앙코르!", description: "특성으로 추가 피해를 발동할 때마다 서벌은 에너지를 4pt 회복한다", icon: "eidolon_2" },
    { rank: "E03", name: "톱니바퀴의 심장 소리", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "소음 제조", description: "필살기 발동 시 100%의 기본 확률로 감전 상태가 아닌 적을 전투 스킬과 동일한 감전 상태에 빠트린다", icon: "eidolon_4" },
    { rank: "E05", name: "벨로보그의 가장 큰 소리!", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "이 노래는 하늘까지!", description: "감전 상태의 적에게 가하는 피해가 30% 증가한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 피해": "피격자에게 추가로 1회 피해를 가한다. 이번 피해는 1회 공격을 가한 것으로 간주하지 않는다"
  }
};

export default serval;
