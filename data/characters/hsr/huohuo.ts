
import { Character } from '../../../types';

const huohuo: Character = {
  id: "huohuo",
  name: "곽향",
  folderName: "곽향",
  gameId: "hsr",
  attribute: "바람",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 나부 시왕사의 견습 판관, 세양에게 빙의된 여우족 여자아이.\n겁 많은 성격에 연약하고 여러 괴상한 일들을 두려워하지만, 악귀를 처리하는 직책을 맡고 있다",
  version: "1.5",
  releaseVersion: "1.5",
  languageNames: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
  voiceActors: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
  metadata: {
    name: "곽향",
    language: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
    element: "바람",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
    releaseVersion: "1.5",
    brief: "선주 나부 시왕사의 견습 판관, 세양에게 빙의된 여우족 여자아이.\n겁 많은 성격에 연약하고 여러 괴상한 일들을 두려워하지만, 악귀를 처리하는 직책을 맡고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 185, "기초 공격력": 82, "기초 방어력": 69 },
    lv20: { "기초 HP": 360, "기초 공격력": 160, "기초 방어력": 135 },
    lv30: { "기초 HP": 527, "기초 공격력": 233, "기초 방어력": 198 },
    lv40: { "기초 HP": 693, "기초 공격력": 307, "기초 방어력": 260 },
    lv50: { "기초 HP": 859, "기초 공격력": 381, "기초 방어력": 322 },
    lv60: { "기초 HP": 1026, "기초 공격력": 454, "기초 방어력": 385 },
    lv70: { "기초 HP": 1192, "기초 공격력": 528, "기초 방어력": 447 },
    lv80: { "기초 HP": 1358, "기초 공격력": 602, "기초 방어력": 509 },
    speed: 98,
    taunt: 100,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "천인의 유해", count: "65", rarity: 4 },
      { name: "영생의 새싹", count: "15", rarity: 2 },
      { name: "영생의 꽃", count: "15", rarity: 3 },
      { name: "영생의 가지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "풍요의 씨앗", count: "18", rarity: 2 },
      { name: "생명의 새싹", count: "69", rarity: 3 },
      { name: "영원의 꽃", count: "139", rarity: 4 },
      { name: "영생의 새싹", count: "41", rarity: 2 },
      { name: "영생의 꽃", count: "56", rarity: 3 },
      { name: "영생의 가지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "깃발·풍우 소환",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 곽향 HP 최대치의 50%만큼 바람 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "부적• 생명 부지",
      tag: "전투 스킬 | 회복",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "지정된 단일 아군의 디버프 효과를 1개 해제하고, 지정된 단일 아군의 HP를 즉시 곽향의 HP 최대치 21%+560만큼 회복시킨다. \n동시에 인접한 목표의 HP를 곽향의 HP 최대치 16.8%+448만큼 회복시킨다",
      icon: "skill_1"
    },
    {
      name: "꼬리•접신 구마",
      tag: "필살기 | 회복",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "자신 이외의 동료에게 각자의 에너지 최대치의 20%만큼 에너지를 회복시키고, 동시에 공격력을 40% 증가시킨다. 지속 시간: 2턴",
      icon: "ultimate_1"
    },
    {
      name: "빙의·천기합일",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "전투 스킬 발동 후 곽향은 [양명]을 획득한다. 지속 시간: 2턴. 곽향이 턴을 시작할 때마다 지속 시간이 1턴 감소한다. \n곽향이 [양명]을 보유하고 있으면 아군 턴 시작 또는 필살기 발동 시, 자신의 HP를 곽향의 HP 최대치 4.5%+120만큼 회복한다. \n동시에 HP가 50% 이하인 아군에게 회복 효과를 1회 생성한다.\n[양명]을 발동하여 아군에게 치료를 제공하면, 해당 목표의 디버프 효과를 1개 제거한다. 해당 효과는 6회만 발동한다. \n다음번에 전투 스킬을 발동하면 효과 발동 횟수를 갱신한다.",
      icon: "talent_1"
    },
    {
      name: "악귀•귀물 제압",
      tag: "비술 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "곽향이 주위의 적을 위협하고 [백산] 상태에 빠트린다. [백산] 상태의 적은 곽향에게서 도망친다. 지속 시간: 10초. \n[백산] 상태의 적과 전투에 진입하면 100%의 기본 확률로 모든 단일 적의 공격력을 25% 감소시킨다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "나서지 못하는 마음", description: "전투 시작 시, 곽향이 [양명]을 획득한다. 지속 시간: 1턴", icon: "bonus_1" },
    { name: "불운의 명", description: "제어류 디버프 상태 저항 확률이 35% 증가한다", icon: "bonus_2" },
    { name: "두려움의 압박", description: "특성을 발동해 아군에게 치유 제공 시 곽향이 에너지를 1pt 회복한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "세양의 기생, 요괴의 숙주", description: "특성으로 발동한 [양명]의 지속 시간이 1턴 연장되고, 곽향이 [양명]을 보유할 시 모든 아군의 속도가 12% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "판관의 부적, 영혼의 속박", description: "곽향이 [양명] 보유 시, 아군은 치명적인 공격을 받아도 전투 불능 상태에 빠지지 않으며, 즉시 자신의 HP 최대치의 50%만큼 HP를 회복하고 [양명]의 지속 턴 수를 1회 감소시킨다. 해당 효과는 단일 전투에서 2회 발동할 수 있다", icon: "eidolon_2" },
    { rank: "E03", name: "불운의 체질, 반딧불이를 부르는 촛불", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "떠나지 않는 악귀, 불안정한 갈등", description: "전투 스킬 또는 특성을 발동해 아군에게 치유 제공 시, 목표의 현재 HP가 낮을수록 치유량이 증가하며, 곽향이 제공하는 치유량이 최대 80% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "요괴 사냥, 시왕의 칙령", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "동고동락, 언제나 함께", description: "아군에게 치유 제공 시, 목표가 가하는 피해가 50% 증가한다. 지속 시간: 2턴", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "피격자에게 디버프 효과를 부여하는 기본 확률. 최종 확률은 공격자의 효과 명중과 적의 효과 저항의 영향을 받는다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상.",
    "[양명]": "곽향이 전투 스킬 발동 시 획득하는 효과. 아군의 턴 시작 시 또는 필살기 발동 시 HP를 회복시키고 디버프를 해제한다.",
    "[백산]": "곽향의 비술로 부여되는 특수 상태. 적이 곽향에게서 도망치며, 해당 상태의 적과 전투 진입 시 공격력이 감소한다."
  }
};

export default huohuo;
