
import { Character } from '../../../../common-hub/types';

const natasha: Character = {
  id: "natasha",
  gameId: "hsr",
  name: "나타샤",
  folderName: "나타샤",
  attribute: "물리",
  path: "풍요",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "벨로보그 하층 구역의 의사이자 아이들의 보호자\n상냥하고 친근한 성격 이면에 위험한 모습도 숨겨져 있다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 나타샤 / 🇺🇸 Natasha / 🇨🇳 娜塔莎 / 🇯🇵 ナターシャ",
  voiceActors: "🇰🇷 강시현 / 🇺🇸 엘리자베스 맥스웰 / 🇨🇳 친쯔이 / 🇯🇵 우치야마 유미",
  baseStats: {
    lv1: { "기초 HP": 158, "기초 공격력": 62, "기초 방어력": 69 },
    lv20: { "기초 HP": 309, "기초 공격력": 121, "기초 방어력": 135 },
    lv30: { "기초 HP": 451, "기초 공격력": 177, "기초 방어력": 196 },
    lv40: { "기초 HP": 593, "기초 공격력": 233, "기초 방어력": 258 },
    lv50: { "기초 HP": 735, "기초 공격력": 288, "기초 방어력": 320 },
    lv60: { "기초 HP": 877, "기초 공격력": 344, "기초 방어력": 381 },
    lv70: { "기초 HP": 1019, "기초 공격력": 400, "기초 방어력": 443 },
    lv80: { "기초 HP": 1164, "기초 공격력": 461, "기초 방어력": 507 },
    speed: 98,
    taunt: 100,
    energy: 90
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
      { name: "신용 포인트", count: "1,758,000", rarity: 3 },
      { name: "운명의 발자취", count: "3", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "9", rarity: 4 },
      { name: "풍요의 씨앗", count: "8", rarity: 2 },
      { name: "생명의 새싹", count: "42", rarity: 3 },
      { name: "영원의 꽃", count: "77", rarity: 4 },
      { name: "고대 부속품", count: "22", rarity: 2 },
      { name: "고대 전동축", count: "35", rarity: 3 },
      { name: "고대 엔진", count: "20", rarity: 4 }
    ]
  },
  skills: [
    { name: "자비의 뒷면", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 나타샤 공격력 100%만큼의 물리 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "사랑, 구원과 선택", tag: "전투 스킬 | 회복", energyRegen: "에너지 회복 30", toughnessDMG: "0", spRecovery: "-1", description: "지정된 단일 아군의 HP를 나타샤 최대 HP의 10.5%+280만큼 회복시키고, 목표는 턴이 시작될 때마다 나타샤 최대 HP의 7.2%+192만큼 HP를 회복한다. 지속 시간: 2턴", icon: "skill_1" },
    { name: "신생의 예찬", tag: "필살기 | 회복", energyRegen: "에너지 회복 5", toughnessDMG: "0", description: "모든 아군의 HP를 나타샤 최대 HP의 13.8%+368만큼 회복시킨다", icon: "ultimate_1" },
    { name: "수습", tag: "특성 | 회복", energyRegen: "0", toughnessDMG: "0", description: "HP 백분율이 30% 이하인 아군에게 치유 제공 시, 나타샤의 치유량이 50% 증가한다", icon: "talent_1" },
    { name: "최면 연구", tag: "비술 | 단일 공격", energyRegen: "0", toughnessDMG: "약점 격파 단일 공격 20", description: "즉시 적을 공격하며, 전투 진입 후 임의의 단일 적에게 나타샤 공격력 80%만큼의 물리 속성 피해를 가하고, 100%의 기본 확률로 모든 적을 허약 상태에 빠트린다. 허약 상태의 적은 아군에게 가하는 피해가 30% 감소한다. 지속 시간: 1턴", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "서지", description: "전투 스킬 발동 시 지정된 아군 단일의 디버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "의사", description: "나타샤의 치유량이 10% 증가한다", icon: "bonus_2" },
    { name: "회복", description: "피격 후 전투 스킬의 지속 회복 효과 지속 시간이 1턴 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28.0%", icon: "hp" },
    { type: "효과 저항", value: "18.0%", icon: "effect_res" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "편람 기재", description: "피격 후 현재 HP 백분율이 30% 이하라면 자신에게 1회 치유를 발동하여 나타샤 HP 최대치의 15%+400만큼 HP를 회복한다. 해당 효과는 단일 전투에서 1회만 발동한다", icon: "eidolon_1" },
    { rank: "E02", name: "임상 연구", description: "필살기 발동 시 HP 백분율이 30% 이하인 아군에게 1턴 동안 지속 치유 효과를 부여한다. 목표의 턴이 시작될 때마다 나타샤 HP 최대치의 6%+160만큼 HP를 회복한다", icon: "eidolon_2" },
    { rank: "E03", name: "대증 요법", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "묘수회춘", description: "피격 시 에너지를 5pt 추가 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "예방 치료", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "의사의 은혜", description: "일반 공격 발동 시 추가로 나타샤 HP 최대치의 40%만큼 물리 속성 피해를 가한다", icon: "eidolon_6" }
  ]
};

export default natasha;
