
import { Character } from '../../../../common-hub/types';

const lynx: Character = {
  id: "lynx",
  gameId: "hsr",
  name: "링스",
  folderName: "링스",
  attribute: "양자",
  path: "풍요",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "벨로보그의 설원 탐험가, 랜도 가문의 막내 여동생.\n담담한 성격에 행동력이 매우 강하다. 종종 홀로 설원을 탐험한다",
  releaseVersion: "1.3",
  languageNames: "🇰🇷 링스 / 🇺🇸 Lynx / 🇨🇳 玲可 / 🇯🇵 リンクス",
  voiceActors: "🇰🇷 이은조 / 🇺🇸 리사 메이 / 🇨🇳 미호 / 🇯🇵 테루이 하루카",
  baseStats: {
    lv1: { "기초 HP": 144, "기초 공격력": 67, "기초 방어력": 75 },
    lv20: { "기초 HP": 281, "기초 공격력": 131, "기초 방어력": 146 },
    lv30: { "기초 HP": 410, "기초 공격력": 191, "기초 방어력": 213 },
    lv40: { "기초 HP": 540, "기초 공격력": 252, "기초 방어력": 281 },
    lv50: { "기초 HP": 669, "기초 공격력": 312, "기초 방어력": 348 },
    lv60: { "기초 HP": 799, "기초 공격력": 373, "기초 방어력": 416 },
    lv70: { "기초 HP": 928, "기초 공격력": 433, "기초 방어력": 483 },
    lv80: { "기초 HP": 1058, "기초 공격력": 494, "기초 방어력": 551 },
    speed: 100,
    taunt: 100,
    energy: 100
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "괴수의 못", count: "50", rarity: 4 },
      { name: "소멸된 코어", count: "12", rarity: 2 },
      { name: "희미한 빛의 코어", count: "13", rarity: 3 },
      { name: "꿈틀대는 코어", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "9", rarity: 4 },
      { name: "풍요의 씨앗", count: "8", rarity: 2 },
      { name: "생명의 새싹", count: "42", rarity: 3 },
      { name: "영원의 꽃", count: "77", rarity: 4 },
      { name: "소멸된 코어", count: "22", rarity: 2 },
      { name: "희미한 빛의 코어", count: "35", rarity: 3 },
      { name: "꿈틀대는 코어", count: "20", rarity: 4 }
    ]
  },
  skills: [
    { name: "얼음 등반 갈고리 기술", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 링스 최대 HP의 65%만큼 양자 속성 피해를 가한다.", icon: "basic_atk_1" },
    { name: "실외 생존법", tag: "전투 스킬 | 회복", energyRegen: "에너지 회복 30", toughnessDMG: "0", spRecovery: "-1", description: "지정된 단일 아군에게 [생존 반응]을 부여하며, HP 최대치가 링스 HP 최대치의 7.5%+200만큼 증가하고 해당 목표가 「파멸」 혹은 「보존」 운명의 길이면 적에게 피격될 확률이 대폭 증가한다. [생존 반응]은 2턴간 지속된다. 해당 목표의 HP를 링스 HP 최대치의 12%+320만큼 회복시킨다", icon: "skill_1" },
    { name: "설원 구급 방안", tag: "필살기 | 회복", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "모든 아군의 디버프를 1개 해제하고 즉시 모든 아군의 HP를 링스 최대 HP의 13.5% + 360만큼 회복시킨다.", icon: "ultimate_1" },
    { name: "야외 생존 경험", tag: "특성 | 지속 회복", energyRegen: "0", toughnessDMG: "0", description: "전투 스킬 혹은 필살기 발동 시 목표 아군에게 2턴간 지속 회복 효과를 부여한다. 목표의 턴이 시작될 때마다 링스 HP 최대치의 3.6%+96만큼 회복한다. 해당 목표가 [생존 반응]을 보유하고 있으면 지속 치유되는 HP가 추가로 링스 HP 최대치의 4.5%+120만큼 증가한다.", icon: "talent_1" },
    { name: "초콜릿 에너지 바", tag: "비술 | 회복", energyRegen: "0", toughnessDMG: "0", description: "비술 사용 후 다음 전투 시작 시 모든 아군에게 2턴 동안 링스 특성과 동일한 지속 회복 효과를 부여한다.", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "사전 탐측", description: "[생존 반응] 상태의 아군이 피격 시 링스가 에너지를 2pt 회복한다.", icon: "bonus_1" },
    { name: "탐험 스킬", description: "제어류 디버프에 대한 저항 확률이 35% 증가한다.", icon: "bonus_2" },
    { name: "극한 생존", description: "특성의 지속 회복 효과가 1턴 연장된다.", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28.0%", icon: "hp" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "효과 저항", value: "10.0%", icon: "effect_res" }
  ],
  eidolons: [
    { rank: "E01", name: "새벽의 아침 이슬", description: "HP 백분율이 50% 이하인 아군 치유 시 링스의 치유량이 20% 증가한다.", icon: "eidolon_1" },
    { rank: "E02", name: "휴대용 버너의 정오", description: "[생존 반응]을 보유한 목표가 디버프를 받을 시 1회 저항한다.", icon: "eidolon_2" },
    { rank: "E03", name: "눈사태 비콘의 오후", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10.", icon: "eidolon_3" },
    { rank: "E04", name: "모닥불 가의 저녁", description: "[생존 반응] 획득 시 해당 아군의 공격력이 링스 최대 HP의 3%만큼 증가한다.", icon: "eidolon_4" },
    { rank: "E05", name: "오로라 홍차의 밤", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15.", icon: "eidolon_5" },
    { rank: "E06", name: "설계도의 새벽", description: "[생존 반응]의 최대 HP 증가 효과가 추가로 링스 최대 HP의 6%만큼 증가하고 효과 저항이 30% 증가한다.", icon: "eidolon_6" }
  ]
};

export default lynx;
