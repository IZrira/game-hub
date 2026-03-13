import { Character } from '../../types';

const trailblazerHarmony: Character = {
  id: "trailblazer_harmony",
  name: "개척자 (화합)",
  folderName: "개척자 (화합)",
  gameId: "hsr",
  attribute: "허수",
  path: "화합",
  rarity: 5,
  affiliation: "은하열차",
  briefInfo: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다",
  version: "2.2",
  releaseVersion: "2.2",
  languageNames: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
  voiceActors: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
  metadata: {
    name: "개척자 (화합)",
    language: "🇰🇷 개척자 / 🇺🇸 Trailblazer / 🇨🇳 开拓者 / 🇯🇵 開拓者",
    element: "허수",
    path: "화합",
    rarity: 5,
    affiliation: "은하열차",
    cv: "🇰🇷 김명준 & 김하루 / 🇺🇸 케일럽 옌 & 레이첼 차우 / 🇨🇳 친체거 & 천팅팅 / 🇯🇵 에노키 준야 & 이시카와 유이",
    releaseVersion: "2.2",
    brief: "은하열차에 탑승한 {F#소녀}{M#소년}.\n스텔라론이 가져온 위기를 해결하기 위해, 은하열차와의 동행을 선택한다"
  },
  baseStats: {
    lv1: { "기초 HP": 148, "기초 공격력": 61, "기초 방어력": 92 },
    lv20: { "기초 HP": 288, "기초 공격력": 118, "기초 방어력": 180 },
    lv30: { "기초 HP": 421, "기초 공격력": 173, "기초 방어력": 263 },
    lv40: { "기초 HP": 554, "기초 공격력": 228, "기초 방어력": 347 },
    lv50: { "기초 HP": 687, "기초 공격력": 282, "기초 방어력": 430 },
    lv60: { "기초 HP": 821, "기초 공격력": 337, "기초 방어력": 513 },
    lv70: { "기초 HP": 954, "기초 공격력": 392, "기초 방어력": 596 },
    lv80: { "기초 HP": 1087, "기초 공격력": 446, "기초 방어력": 679 },
    speed: 105,
    taunt: 100,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "깊은 별의 외형질", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "12", rarity: 4 },
      { name: "구름 위 음표", count: "18", rarity: 2 },
      { name: "천상의 소절", count: "69", rarity: 3 },
      { name: "천외의 악장", count: "139", rarity: 4 },
      { name: "약탈의 본능", count: "41", rarity: 2 },
      { name: "변조된 야망", count: "56", rarity: 3 },
      { name: "짓밟힌 의지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "스윙 댄스 에티켓",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 개척자 공격력의 100%만큼 허수 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "인터미션에 내리는 비",
      tag: "전투 스킬 | 바운스",
      energyRegen: "에너지 회복 6",
      toughnessDMG: "약점 격파 10 확산 10",
      spRecovery: "-1",
      description: "지정된 단일 적에게 개척자 공격력의 50%만큼 허수 속성 피해를 가하며, 추가로 피해를 4회 가한다. 피해를 가할 때마다 랜덤 단일 적에게 개척자 공격력의 50%만큼 허수 속성 피해를 가한다",
      icon: "skill_1"
    },
    {
      name: "떠들썩한 풋라이트 퍼레이드",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "모든 아군에게 [댄스 파트너] 효과를 부여한다. 지속 시간: 3턴. 개척자의 턴이 시작될 때마다 지속 턴 수가 1 감소한다. [댄스 파트너]를 보유한 아군의 격파 특수효과가 30% 증가하고, 약점 격파 상태의 적을 공격하면 이번 공격의 강인성 감소 수치가 1회의 슈퍼 격파 피해로 전환된다",
      icon: "ultimate_1"
    },
    {
      name: "올 채널 에어리얼 댄스",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "적의 약점이 격파되면 개척자는 즉시 에너지를 10pt 회복한다",
      icon: "talent_1"
    },
    {
      name: "원맨 밴드, 출격!",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 발동 후 다음 전투 시작 시 모든 아군의 격파 특수효과가 30% 증가한다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "나와 함께 춤을", description: "필드 위 적이 5기 이상/4기/3기/2기/1기일 때, [댄스 파트너] 효과로 발동되는 슈퍼 격파 피해가 20%/30%/40%/50%/60% 증가한다", icon: "bonus_1" },
    { name: "흐름에 몸을 맡기고", description: "전투 스킬 발동 시, 첫 번째 피해의 강인성 감소 수치가 추가로 100% 증가한다", icon: "bonus_2" },
    { name: "극장의 모자", description: "아군이 약점 격파를 가한 후 추가로 적의 행동 게이지가 30% 감소한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "격파 특수효과", value: "37.3%", icon: "break_effect" },
    { type: "허수 속성 피해 증가", value: "14.4%", icon: "imaginary_dmg" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "최고의 관중석", description: "처음으로 전투 스킬을 발동한 후 즉시 전투 스킬 포인트를 1pt 회복한다", icon: "eidolon_1", icon_f: "eidolon_1_f", icon_m: "eidolon_1_m" },
    { rank: "E02", name: "탈옥의 레인보우 스텝", description: "전투 시작 시 개척자의 에너지 회복효율이 25% 증가한다. 지속 시간: 3턴", icon: "eidolon_2", icon_f: "eidolon_2_f", icon_m: "eidolon_2_m" },
    { rank: "E03", name: "쉼표의 요양원", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3", icon_f: "eidolon_3_f", icon_m: "eidolon_3_m" },
    { rank: "E04", name: "비둘기를 감춘 모자", description: "개척자가 필드에 있을 시, 자신을 제외한 동료의 격파 특수효과를 개척자의 격파 특수효과의 15%만큼 증가시킨다", icon: "eidolon_4", icon_f: "eidolon_4_f", icon_m: "eidolon_4_m" },
    { rank: "E05", name: "오래된 리듬을 간직한 시", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5", icon_f: "eidolon_5_f", icon_m: "eidolon_5_m" },
    { rank: "E06", name: "내일은 스포트라이트 아래서 휴식을", description: "전투 스킬의 피해 횟수가 추가로 2회 증가한다", icon: "eidolon_6", icon_f: "eidolon_6_f", icon_m: "eidolon_6_m" }
  ],
  specialTerms: {
    "행동 게이지 감소": "목표의 다음 행동 전 대기 간격을 연장한다.",
    "슈퍼 격파 피해": "약점 격파 상태인 적에게 공격 시, 이번 공격의 강인성 감소 수치와 공격자의 격파 특수효과에 비례하여 가하는 추가 피해.",
    "[댄스 파트너]": "개척자가 필살기 발동 시 아군에게 부여하는 효과. 격파 특수효과가 증가하고 슈퍼 격파 피해를 가할 수 있게 된다."
  },
  isTrailblazer: true
};

export default trailblazerHarmony;
