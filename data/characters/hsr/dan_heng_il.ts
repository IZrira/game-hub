
import { Character } from '../../../types';

const danHengIL: Character = {
  id: "dan_heng_il",
  name: "단항•음월",
  folderName: "단항•음월",
  gameId: "hsr",
  attribute: "허수",
  path: "파멸",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "단항의 비디아다라족으로서의 본모습, 전생의 「음월군」이 남긴 힘. 이마의 각관을 받으면 그 죄인의 모든 공과를 이어받아야 한다",
  version: "1.3",
  releaseVersion: "1.3",
  languageNames: "🇰🇷 단항·음월 / 🇺🇸 Dan Heng·Imbibitor Lunae / 🇨🇳 丹恒 · 饮月 / 🇯🇵  丹恒 · 饮月",
  voiceActors: "🇰🇷 김혜성 / 🇺🇸 니콜라스 렁 / 🇨🇳 위둥 / 🇯🇵 이토 켄토",
  metadata: {
    name: "단항•음월",
    language: "🇰🇷 단항·음월 / 🇺🇸 Dan Heng·Imbibitor Lunae / 🇨🇳 丹恒 · 饮月 / 🇯🇵  丹恒 · 饮月",
    element: "허수",
    path: "파멸",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 김혜성 / 🇺🇸 니콜라스 렁 / 🇨🇳 위둥 / 🇯🇵 이토 켄토",
    releaseVersion: "1.3",
    brief: "단항의 비디아다라족으로서의 본모습, 전생의 「음월군」이 남긴 힘. 이마의 각관을 받으면 그 죄인의 모든 공과를 이어받아야 한다"
  },
  baseStats: {
    lv1: { "기초 HP": 169, "기초 공격력": 95, "기초 방어력": 50 },
    lv20: { "기초 HP": 329, "기초 공격력": 185, "기초 방어력": 97 },
    lv30: { "기초 HP": 482, "기초 공격력": 271, "기초 방어력": 141 },
    lv40: { "기초 HP": 634, "기초 공격력": 356, "기초 방어력": 186 },
    lv50: { "기초 HP": 786, "기초 공격력": 442, "기초 방어력": 230 },
    lv60: { "기초 HP": 938, "기초 공격력": 528, "기초 방어력": 275 },
    lv70: { "기초 HP": 1090, "기초 공격력": 613, "기초 방어력": 319 },
    lv80: { "기초 HP": 1242, "기초 공격력": 699, "기초 방어력": 364 },
    speed: 102,
    taunt: 125,
    energy: 140
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "진령칙부", count: "65", rarity: 4 },
      { name: "영생의 새싹", count: "15", rarity: 2 },
      { name: "영생의 꽃", count: "15", rarity: 3 },
      { name: "영생의 가지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "부서진 칼날", count: "18", rarity: 2 },
      { name: "무생의 칼날", count: "69", rarity: 3 },
      { name: "정화의 칼날", count: "139", rarity: 4 },
      { name: "영생의 새싹", count: "41", rarity: 2 },
      { name: "영생의 꽃", count: "56", rarity: 3 },
      { name: "영생의 가지", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "연화",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 2단 공격을 발동하여 단항•음월 공격력의 100%만큼 허수 속성 피해를 준다",
      icon: "basic_atk_1"
    },
    {
      name: "순간",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "0",
      description: "지정된 단일 적에게 3단 공격을 발동하여 단항•음월 공격력의 260%만큼 허수 속성 피해를 준다",
      icon: "basic_atk_2"
    },
    {
      name: "신성의 창",
      tag: "일반 공격 | 확산",
      energyRegen: "에너지 회복 35",
      toughnessDMG: "약점 격파 단일 30 확산 10",
      spRecovery: "0",
      description: "지정된 단일 적에게 5단 공격을 발동해 단항•음월 공격력의 380%만큼 허수 속성 피해를 준다. \n4번째 공격부터 인접한 목표에게 단항•음월 공격력의 60%만큼 허수 속성 피해를 준다",
      icon: "basic_atk_3"
    },
    {
      name: "빛나는 도약",
      tag: "일반 공격 | 확산",
      energyRegen: "에너지 회복 40",
      toughnessDMG: "약점 격파 단일 40 확산 20",
      spRecovery: "0",
      description: "지정된 단일 적에게 7단 공격을 발동해 단항•음월 공격력의 500%만큼 허수 속성 피해를 준다. \n4번째 공격부터 인접한 목표에게 단항•음월 공격력의 180%만큼 허수 속성 피해를 준다",
      icon: "basic_atk_4"
    },
    {
      name: "자유로운 용의 힘",
      tag: "전투 스킬 | 강화",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "0",
      description: "일반 공격의 효과가 강화되며, 최대 3회 연속 강화할 수 있다. 해당 스킬 발동 시 전투 스킬 포인트가 소모되지 않으며, 전투 스킬을 사용하지 않은 것으로 간주한다.\n강화 1회: [연화]에서 [순간]으로 전환\n강화 2회: [연화]에서 [신성의 창]으로 전환\n강화 3회: [연화]에서 [빛나는 도약]으로 전환\n[신성의 창] 또는 [빛나는 도약] 발동 시, 4단 공격부터 공격 단수마다 공격하기 전에 [노호]를 1스택 획득한다. \n[노호] 1스택마다 단항•음월의 치명타 피해가 12% 증가한다. 해당 효과는 최대 4스택 중첩 가능하며, 자신의 턴이 종료될 때까지 지속된다",
      icon: "skill_1"
    },
    {
      name: "취소",
      tag: "전투 스킬 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "강화를 취소한다",
      icon: "skill_2"
    },
    {
      name: "창룡의 굽어살핌, 정화된 세상",
      tag: "필살기 | 확산",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 20 확산 20",
      description: "지정된 단일 적에게 3단 공격을 발동하여 단항•음월 공격력의 300% 만큼 허수 속성 피해를 주고, \n인접한 목표에게 단항•음월 공격력의 140% 만큼 허수 속성 피해를 주며 동시에 [역린]을 2개 획득한다.\n[역린]은 최대 3개 보유할 수 있으며, 단항•음월의 전투 스킬 포인트를 대체하여 소모할 수 있다. [역린] 소모는 전투 스킬 포인트 소모로 간주한다",
      icon: "ultimate_1"
    },
    {
      name: "긍지",
      tag: "특성 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "단항•음월의 공격 단수마다 [긍지] 효과를 1스택 획득하고, 스택당 자신이 가하는 피해가 10% 증가한다. \n해당 효과는 6스택 중첩 가능하며, 자신의 턴이 종료될 때까지 지속된다",
      icon: "talent_1"
    },
    {
      name: "천공을 가르는 용오름",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술을 사용하면 20초 동안 [용의 도약] 상태에 진입한다. \n[용의 도약] 상태에서 공격을 사용하면 빠른 속도로 전방을 향해 일정 거리 이동하고 접촉한 적을 공격한다. \n빠른 이동 중에는 적의 모든 공격을 막을 수 있다. \n[용의 도약] 상태에서 적을 공격해 전투에 진입하면 모든 적에게 단항•음월 공격력의 120%만큼 허수 속성 피해를 주고, [역린]을 1개 획득한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "자취를 감춘 성신", description: "전투 시작 시 즉시 에너지를 15pt 회복한다", icon: "bonus_1" },
    { name: "치수", description: "제어류 디버프 상태 저항 확률이 35% 증가한다", icon: "bonus_2" },
    { name: "계칩(啓蟄)", description: "허수 속성 약점을 보유한 적에게 피해를 가할 시 치명타 피해가 24% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "허수 속성 피해", value: "22.4%", icon: "imaginary_dmg" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "HP", value: "10%", icon: "hp" }
  ],
  eidolons: [
    { rank: "E01", name: "휘감긴 하늘", description: "[긍지]의 중첩 가능 스택 수가 4스택 증가하며, 공격 단수마다 [긍지]를 1스택 추가로 획득한다", icon: "eidolon_1" },
    { rank: "E02", name: "구유(九斿)", description: "필살기 발동 후 단항•음월의 행동 게이지가 100% 증가하고 추가로 [역린] 1개를 획득한다", icon: "eidolon_2" },
    { rank: "E03", name: "구름 깃발", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "조풍(嘲風)", description: "[노호]의 버프 효과가 자신의 다음 턴이 종료될 때까지 지속된다", icon: "eidolon_4" },
    { rank: "E05", name: "오만한 기세", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "용의 강림", description: "다른 아군 캐릭터가 필살기를 발동하면 단항•음월이 다음 번에 [빛나는 도약] 발동 시 허수 속성 저항 관통이 20% 증가한다. 해당 효과 최대 중첩수: 3스택", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "[역린]": "단항•음월이 스킬 등을 통해 획득하는 자원으로 전투 스킬 포인트를 대체하여 소모할 수 있다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상."
  }
};

export default danHengIL;
