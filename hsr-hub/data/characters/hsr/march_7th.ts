
import { Character } from '../../../../common-hub/types';

const march7th: Character = {
  id: "march_7th",
  gameId: "hsr",
  name: "Mar. 7th",
  folderName: "Mar. 7th",
  attribute: "얼음",
  path: "보존",
  rarity: 4,
  affiliation: "은하열차",
  briefInfo: "한 번의 표류 후 깨어난 소녀. 자신의 이름조차 잊어버린 채 은하열차와 함께하게 된다. 밝고 긍정적이며 사진 찍기를 좋아한다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 Mar. 7th / 🇺🇸 March 7th / 🇨🇳 三月七 / 🇯🇵 三月なのか",
  voiceActors: "🇰🇷 정혜원 / 🇺🇸 앤디 깁슨 / 🇨🇳 눠야 / 🇯🇵 오구라 유이",
  baseStats: {
    lv1: { "기초 HP": 144, "기초 공격력": 69, "기초 방어력": 78 },
    lv20: { "기초 HP": 281, "기초 공격력": 136, "기초 방어력": 152 },
    lv30: { "기초 HP": 410, "기초 공격력": 198, "기초 방어력": 222 },
    lv40: { "기초 HP": 540, "기초 공격력": 261, "기초 방어력": 292 },
    lv50: { "기초 HP": 669, "기초 공격력": 323, "기초 방어력": 362 },
    lv60: { "기초 HP": 799, "기초 공격력": 386, "기초 방어력": 432 },
    lv70: { "기초 HP": 928, "기초 공격력": 448, "기초 방어력": 502 },
    lv80: { "기초 HP": 1058, "기초 공격력": 511, "기초 방어력": 573 },
    speed: 101,
    taunt: 150,
    energy: 120
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "246,400", rarity: 3 },
      { name: "눈보라의 뿔", count: "50", rarity: 4 },
      { name: "약탈의 본능", count: "12", rarity: 2 },
      { name: "변조된 야망", count: "13", rarity: 3 },
      { name: "짓밟힌 의지", count: "12", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,400,000", rarity: 3 },
      { name: "운명의 발자취", count: "5", rarity: 5 },
      { name: "파멸자의 말로", count: "12", rarity: 4 },
      { name: "청동의 집념", count: "12", rarity: 2 },
      { name: "한철의 맹세", count: "54", rarity: 3 },
      { name: "앰버의 수호", count: "105", rarity: 4 },
      { name: "약탈의 본능", count: "28", rarity: 2 },
      { name: "변조된 야망", count: "42", rarity: 3 },
      { name: "짓밟힌 의지", count: "42", rarity: 4 }
    ]
  },
  skills: [
    { name: "극한의 화살", tag: "일반 공격 | 단일 공격", energyRegen: "에너지 회복 20", toughnessDMG: "약점 격파 단일 공격 10", spRecovery: "+1", description: "지정된 단일 적에게 Mar. 7th 공격력 100%만큼의 얼음 속성 피해를 가한다", icon: "basic_atk_1" },
    { name: "귀여움이 곧 정의", tag: "전투 스킬 | 방어", energyRegen: "에너지 회복 30", toughnessDMG: "0", spRecovery: "-1", description: "지정된 단일 아군에게 Mar. 7th 방어력 57%+760만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 3턴. 해당 아군의 현재 HP 백분율이 30% 이상일 경우 적에게 피격될 확률이 대폭 증가한다", icon: "skill_1" },
    { name: "빙하 화살비", tag: "필살기 | 범위 공격", energyRegen: "에너지 회복 5", toughnessDMG: "약점 격파 범위 공격 20", description: "모든 적에게 Mar. 7th 공격력 150%만큼의 얼음 속성 피해를 준다. 피격된 적은 50%의 기본 확률로 빙결 상태에 빠진다. 지속 시간: 1턴. 빙결 상태의 적은 행동할 수 없으며 턴이 시작될 때마다 Mar. 7th 공격력 50%만큼의 얼음 속성 추가 피해를 받는다", icon: "ultimate_1" },
    { name: "소녀의 특권", tag: "특성 | 단일 공격", energyRegen: "0", toughnessDMG: "0", description: "실드를 보유한 아군이 적에게 피격되면 Mar. 7th는 즉시 반격을 발동해 공격자에게 Mar. 7th 공격력 100%만큼의 얼음 속성 피해를 가한다. 해당 효과는 턴마다 2회 발동할 수 있다", icon: "talent_1" },
    { name: "동결의 순간", tag: "비술 | 방해", energyRegen: "0", toughnessDMG: "0", description: "즉시 적을 공격하며, 전투 진입 후 100%의 기본 확률로 임의의 단일 적을 빙결 상태에 빠트린다. 지속 시간: 1턴. 빙결 상태의 적은 행동할 수 없으며 턴이 시작될 때마다 Mar. 7th 공격력 50%만큼의 얼음 속성 피해를 받는다", icon: "technique_1" }
  ],
  additionalAbilities: [
    { name: "순결", description: "전투 스킬 발동 시 지정된 아군 단일의 디버프 효과를 1개 해제한다", icon: "bonus_1" },
    { name: "가호", description: "전투 스킬이 제공하는 실드의 지속 시간이 1턴 증가한다", icon: "bonus_2" },
    { name: "얼음의 주박", description: "필살기 발동 시 적을 빙결 상태에 빠트릴 기본 확률이 15% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "얼음 속성 피해 증가", value: "22.4%", icon: "ice_dmg" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "효과 저항", value: "10.0%", icon: "effect_res" }
  ],
  eidolons: [
    { rank: "E01", name: "기억 속의 그대", description: "필살기로 적 1기를 빙결 상태로 만들 때마다 Mar. 7th는 에너지를 6pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "기억 속의 그것", description: "전투 진입 시 HP 백분율이 가장 낮은 아군에게 Mar. 7th 방어력 24%+320만큼의 피해를 상쇄할 수 있는 실드를 제공한다. 지속 시간: 3턴", icon: "eidolon_2" },
    { rank: "E03", name: "기억 속의 모든 것", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "더 이상 잃고 싶지 않아", description: "턴마다 발동 가능한 특성의 반격 효과 횟수가 1회 증가한다. 반격으로 가하는 피해가 Mar. 7th 방어력의 30%만큼 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "더 이상 잊고 싶지 않아", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "이대로 계속...", description: "전투 스킬이 제공하는 실드의 가호를 받는 아군은 턴이 시작될 때마다 각자 HP 최대치의 4%+106만큼 HP를 회복한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다."
  }
};

export default march7th;
