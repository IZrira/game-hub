
import { Character } from '../../../../common-hub/types';

const qingque: Character = {
  id: "qingque",
  gameId: "hsr",
  name: "청작",
  folderName: "청작",
  attribute: "양자",
  path: "지식",
  rarity: 4,
  affiliation: "선주 「나부」",
  briefInfo: "태복사의 일반 점술가. 일을 땡땡이치고 마작을 하러 다닌다. 승진에는 관심이 없다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 청작 / 🇺🇸 Qingque / 🇨🇳 青雀 / 🇯🇵 青雀",
  voiceActors: "🇰🇷 서다혜 / 🇺🇸 브린 아프릴 / 🇨🇳 류스쓰 / 🇯🇵 다테 아리사",
  baseStats: {
    lv1: { "기초 HP": 139, "기초 공격력": 88, "기초 방어력": 60 },
    lv20: { "기초 HP": 271, "기초 공격력": 173, "기초 방어력": 117 },
    lv30: { "기초 HP": 396, "기초 공격력": 252, "기초 방어력": 171 },
    lv40: { "기초 HP": 521, "기초 공격력": 331, "기초 방어력": 225 },
    lv50: { "기초 HP": 647, "기초 공격력": 411, "기초 방어력": 279 },
    lv60: { "기초 HP": 772, "기초 공격력": 490, "기초 방어력": 333 },
    lv70: { "기초 HP": 898, "기초 공격력": 570, "기초 방어력": 387 },
    lv80: { "기초 HP": 1023, "기초 공격력": 652, "기초 방어력": 441 },
    speed: 98,
    taunt: 75,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "허공의 흑요", count: "50", rarity: 4 },
      { name: "약탈의 본능", count: "12", rarity: 2 },
      { name: "변조된 야망", count: "13", rarity: 3 },
      { name: "짓밟힌 의지", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "12", rarity: 4 },
      { name: "영감의 열쇠", count: "12", rarity: 2 },
      { name: "계몽의 열쇠", count: "54", rarity: 3 },
      { name: "지식의 열쇠", count: "105", rarity: 4 },
      { name: "약탈의 본능", count: "28", rarity: 2 },
      { name: "변조된 야망", count: "42", rarity: 3 },
      { name: "짓밟힌 의지", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "문전청소", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 청작 공격력 100%만큼의 양자 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "울타리 끝의 패", tag: "전투 스킬 | 강화", energyRegen: "0", toughnessDMG: "0", spRecovery: "-1", description: "즉시 패를 1개 뽑고 자신이 가하는 피해가 28% 증가한다. 지속 시간: 1턴. 해당 효과는 중첩할 수 있다. 전투 스킬 발동 후 이번 턴은 종료되지 않는다", icon: "skill_1" },
    { name: "사공이 모인 위기?", tag: "필살기 | 범위 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 청작 공격력 200%만큼의 양자 속성 피해를 가하고, 손에 있는 패를 [물고기 벽]으로 바꾼다", icon: "ultimate_1" },
    { name: "제패", tag: "특성 | 강화", energyRegen: "0", toughnessDMG: "0", description: "아군 턴이 시작될 때마다 청작은 3종류의 수트 중 랜덤으로 패 1개를 뽑는다. 패는 최대 4개까지 보유할 수 있다. 턴 시작 시 청작이 같은 수트의 패 4개를 보유하고 있으면, 모든 패를 소모하고 [암깡] 상태에 진입한다. [암깡] 상태에서는 공격력이 72% 증가하고 일반 공격 [문전청소]가 [가로놓인 벽돌]로 강화된다. [암깡] 상태는 [가로놓인 벽돌] 발동 후 종료된다", icon: "talent_1" },
    { name: "나랑 놀자", tag: "비술 | 강화", energyRegen: "0", toughnessDMG: "0", description: "비술 발동 후 다음번 전투 시작 시 청작은 패를 2개 뽑는다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "승부수", description: "전투 스킬 발동 시 전투 스킬 포인트를 1pt 회복한다. 해당 효과는 단일 전투에서 1회만 발동한다", icon: "bonus_1" },
    { name: "청의", description: "전투 스킬을 발동할 때마다 다음번 공격이 가하는 피해가 추가로 10% 증가한다", icon: "bonus_2" },
    { name: "깡", description: "[가로놓인 벽돌] 발동 후 속도가 10% 증가한다. 지속 시간: 1턴", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28.0%", icon: "atk" },
    { type: "양자 속성 피해 증가", value: "14.4%", icon: "quantum_dmg" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "지피지기", description: "필살기 발동 시 가하는 피해가 10% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "침착한 대국", description: "패를 뽑을 때마다 에너지를 1pt 회복한다", icon: "eidolon_2" },
    { rank: "E03", name: "관전불어", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "신중한 패 확인", description: "전투 스킬 발동 후 24%의 고정 확률로 [불구인] 상태에 진입한다. 지속 시간: 1턴. [불구인] 상태에서 일반 공격 또는 강화된 일반 공격 발동 후 즉시 추가 공격을 1회 발동한다. 해당 추가 공격은 해당 일반 공격 또는 강화된 일반 공격 피해의 100%만큼 양자 속성 피해를 가한다", icon: "eidolon_4" },
    { rank: "E05", name: "낙장불입", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "유유자적", description: "강화된 일반 공격 발동 후 전투 스킬 포인트를 1pt 회복한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 공격. 턴을 소모하지 않는다."
  }
};

export default qingque;
