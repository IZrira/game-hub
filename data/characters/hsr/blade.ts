import { Character } from '../../../types';

const blade: Character = {
  id: "blade",
  name: "블레이드",
  folderName: "블레이드",
  gameId: "hsr",
  attribute: "바람",
  path: "파멸",
  rarity: 5,
  affiliation: "스텔라론 헌터",
  briefInfo: "선「스텔라론 헌터」의 멤버, 전장에 몸을 내던지는 검객.「운명의 노예」에 충성을 다하며 무서운 자가 치유 능력을 가지고 있다",
  version: "1.2",
  releaseVersion: "1.2",
  languageNames: "🇰🇷 블레이드 / 🇺🇸 Blade / 🇨🇳 刃 / 🇯🇵 刃",
  voiceActors: "🇰🇷 곽윤상 / 🇺🇸 데이먼 밀스 / 🇨🇳 류이자 / 🇯🇵 미키 신이치로",
  hasASBuff: true,
  metadata: {
    name: "블레이드",
    language: "🇰🇷 블레이드 / 🇺🇸 Blade / 🇨🇳 刃 / 🇯🇵 刃",
    element: "바람",
    path: "파멸",
    rarity: 5,
    affiliation: "스텔라론 헌터",
    cv: "🇰🇷 곽윤상 / 🇺🇸 데이먼 밀스 / 🇨🇳 류이자 / 🇯🇵 미키 신이치로",
    releaseVersion: "1.2",
    brief: "선「스텔라론 헌터」의 멤버, 전장에 몸을 내던지는 검객.「운명의 노예」에 충성을 다하며 무서운 자가 치유 능력을 가지고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 185, "기초 공격력": 74, "기초 방어력": 66 },
    lv20: { "기초 HP": 360, "기초 공격력": 144, "기초 방어력": 129 },
    lv30: { "기초 HP": 527, "기초 공격력": 211, "기초 방어력": 188 },
    lv40: { "기초 HP": 693, "기초 공격력": 277, "기초 방어력": 248 },
    lv50: { "기초 HP": 859, "기초 공격력": 344, "기초 방어력": 307 },
    lv60: { "기초 HP": 1026, "기초 공격력": 410, "기초 방어력": 366 },
    lv70: { "기초 HP": 1192, "기초 공격력": 477, "기초 방어력": 426 },
    lv80: { "기초 HP": 1358, "기초 공격력": 543, "기초 방어력": 485 },
    speed: 97,
    taunt: 125,
    energy: 130
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
      name: "지리검(支離劍)",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 블레이드 공격력의 100%만큼 바람 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "무간검수(無間劍樹)",
      tag: "일반 공격 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      spRecovery: "0",
      description: "블레이드 HP 최대치의 10%만큼 HP를 소모해 지정된 단일 적에게 블레이드 공격력의 40%+HP 최대치의 100% 만큼 바람 속성 피해를 가한다. \n동시에 인접한 목표에 블레이드 공격력의 16%+HP 최대치의 40%만큼 바람 속성 피해를 가한다. 현재 HP가 부족할 때 [무간검수(無間劍樹)]를 발동하면 블레이드의 현재 HP가 1pt까지 감소한다.\n[무간검수]로 전투 스킬 포인트를 회복할 수 없다",
      icon: "basic_atk_2"
    },
    {
      name: "지옥변(地獄變)",
      tag: "전투 스킬 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "블레이드가 HP를 자신 HP 최대치의 30%만큼 소모해 [지옥변(地獄變)] 상태에 진입한다. [지옥변] 상태에서는 전투 스킬을 발동할 수 없으며, 자신이 가하는 피해가 40% 증가하고, 일반 공격 [지리검(支離劍)]이 [무간검수(無間劍樹)]로 강화된다, 지속 시간: 3턴\n블레이드의 현재 HP가 부족하면 전투 스킬 발동 시 HP가 1pt까지 감소한다.\n해당 전투 스킬로 에너지를 회복할 수 없으며, 발동 후 이번 턴은 종료되지 않는다",
      icon: "skill_1"
    },
    {
      name: "사형선고",
      tag: "필살기 | 확산",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 20 확산 10",
      description: "블레이드의 현재 HP가 최대치의 50%로 전환되고 단일 적에게 블레이드 공격력의 40%+HP 최대치의 100%+이번 전투에서 누적 손실한 HP의 100% 만큼 바람 속성 피해를 가한다. \n또한 인접한 목표에 블레이드 공격력의 16%+HP 최대치의 40%+이번 전투에서 누적 손실한 HP의 40%만큼 바람 속성 피해를 가한다.\n이번 전투에서 누적 손실한 HP는 블레이드 HP 최대치의 90%를 넘을 수 없다. 필살기 발동 후 리셋하고 다시 누적된다",
      icon: "ultimate_1"
    },
    {
      name: "찰나의 선물",
      tag: "특성 | 범위 공격",
      energyRegen: "에너지 회복 10",
      toughnessDMG: "약점 격파 범위 10",
      description: "블레이드가 피해를 받거나 HP를 소모하면 충전을 1스택 획득한다. 최대 중첩수: 5스택. 해당 효과는 피격될 때마다 최대 1스택 중첩된다.\n최대치까지 중첩되면 즉시 모든 적에게 추가 공격을 1회 발동한다. 블레이드 공격력의 44%+HP 최대치의 110%만큼 바람 속성 피해를 가하고 블레이드 HP 최대치의 25%만큼 HP를 회복한다. 추가 공격 발동 후 모든 충전을 소모한다",
      icon: "talent_1"
    },
    {
      name: "업도(業道)의 바람",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "적을 즉시 공격하며, 전투 진입 후 블레이드 HP 최대치의 20%만큼 HP를 소모하고, 모든 적에게 블레이드 HP 최대치의 40%만큼 바람 속성 피해를 가한다. 현재 HP가 부족하면 비술 발동 시 블레이드의 현재 HP가 1pt까지 감소한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "무한한 수명", description: "블레이드의 현재 HP 백분율이 HP 최대치의 50% 이하인 경우, 치유 받을 때의 회복량이 20% 증가한다", icon: "bonus_1" },
    { name: "견디고 견딘 죽음", description: "[무간검수] 발동 후 약점 격파 상태인 적을 명중하면, 블레이드는 자신의 HP를 HP 최대치의 5%+100만큼 회복한다", icon: "bonus_2" },
    { name: "괴겁의 폐망", description: "특성으로 발동된 추가 공격 피해가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "검록의 끝, 지옥변상", description: "필살기로 지정된 단일 적에게 가하는 피해가 이번 전투에서 누적 손실한 블레이드 HP의 150%만큼 추가로 증가한다.\n이번 전투에서 누적 손실한 HP는 블레이드 HP 최대치의 90%를 넘지 않는다. 필살기 발동 후 리셋하고 다시 누적된다", icon: "eidolon_1" },
    { rank: "E02", name: "흩어진 옛 꿈, 갖가지 여한", description: "블레이드가 [지옥변] 상태일 때 치명타 확률이 15% 증가한다", icon: "eidolon_2" },
    { rank: "E03", name: "제련한 현철, 서늘한 빛", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "황천의 기로, 육신의 회생", description: "현재 HP 백분율이 50%를 초과한 상태에서 50% 이하로 떨어지면 HP 최대치가 20% 증가한다. 해당 효과 최대 중첩수: 2스택", icon: "eidolon_4" },
    { rank: "E05", name: "시왕의 사형 선고, 마주한 업경", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "죽음의 끝, 돌아온 영혼", description: "충전 스택 수 상한이 4스택으로 감소한다. 특성으로 발동되는 추가 공격으로 가하는 피해가 블레이드 HP 최대치의 50%만큼 추가로 증가한다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "지리검(支離劍)",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 블레이드 HP 최대치의 50%만큼 바람 속성 피해를 가한다",
        icon: "basic_atk_1"
      },
      {
        name: "무간검수(無間劍樹)",
        tag: "일반 공격 | 확산",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "약점 격파 단일 20 확산 10",
        spRecovery: "0",
        description: "블레이드 HP 최대치의 10%만큼 HP를 소모해 지정된 단일 적에게 블레이드 HP 최대치의 130% 만큼 바람 속성 피해를 가하고, 인접한 목표에게 블레이드 HP 최대치의 52% 만큼 바람 속성 피해를 가한다.\n현재 HP가 부족하면 [무간검수(無間劍樹)] 발동 시 블레이드의 현재 HP가 1pt까지 감소한다.\n[무간검수]로 전투 스킬 포인트를 회복할 수 없다",
        icon: "basic_atk_2"
      },
      {
        name: "지옥변(地獄變)",
        tag: "전투 스킬 | 강화",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "-1",
        description: "블레이드가 HP를 자신의 HP 최대치의 30%만큼 소모해 [지옥변(地獄變)] 상태에 진입한다. [지옥변] 상태에서는 전투 스킬을 발동할 수 없으며, 자신이 가하는 피해가 40% 증가하고, 적에게 피격될 확률이 대폭 증가하며 일반 공격 [지리검(支離劍)]이 [무간검수(無間劍樹)]로 강화된다, 지속 시간: 3턴\n블레이드의 현재 HP가 부족하면 전투 스킬 발동 시 HP가 1pt까지 감소한다.\n해당 전투 스킬로 에너지를 회복할 수 없으며, 발동 후 이번 턴은 종료되지 않는다",
        icon: "skill_1"
      },
      {
        name: "사형선고",
        tag: "필살기 | 확산",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 단일 20 확산 10",
        description: "블레이드의 현재 HP가 HP 최대치의 50%로 전환되고 단일 적에게 블레이드 HP 최대치의 150%+이번 전투에서 누적 손실한 HP의 120% 만큼 바람 속성 피해를 가한다. \n또한 인접한 목표에게 블레이드 HP 최대치의 60%+이번 전투에서 누적 손실한 HP의 60% 만큼 바람 속성 피해를 가한다.\n이번 전투에서 누적 손실한 HP는 블레이드 HP 최대치의 90%를 넘을 수 없으며, 필살기 발동 후 리셋하고 다시 누적된다",
        icon: "ultimate_1"
      },
      {
        name: "찰나의 선물",
        tag: "특성 | 범위 공격",
        energyRegen: "에너지 회복 10",
        toughnessDMG: "약점 격파 범위 10",
        description: "블레이드가 피해를 받거나 HP를 소모하면 충전을 1스택 획득한다, 최대 중첩수: 5스택. 해당 효과는 피격될 때마다 최대 1스택 중첩된다.\n최대치까지 중첩되면 즉시 모든 적에게 추가 공격을 1회 발동한다. 블레이드 HP 최대치의 130% 만큼 바람 속성 피해를 가하고 블레이드 HP 최대치의 25%만큼 HP를 회복한다. 추가 공격 발동 후 모든 충전을 소모한다",
        icon: "talent_1"
      },
      {
        name: "업도(業道)의 바람",
        tag: "비술",
        energyRegen: "0",
        toughnessDMG: "0",
        description: "적을 즉시 공격하며, 전투 진입 후 블레이드 HP 최대치의 20%만큼 HP를 소모하고, 모든 적에게 블레이드 HP 최대치의 40%만큼 바람 속성 피해를 가한다. 현재 HP가 부족하면 비술 발동 시 블레이드의 현재 HP가 1pt까지 감소한다",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "무한한 수명", description: "블레이드의 현재 HP 백분율이 HP 최대치의 50% 이하인 경우, 치유 받을 때의 회복량이 20% 증가한다", icon: "bonus_1" },
      { name: "견디고 견딘 죽음", description: "치유 받을 시 회복량이 20% 증가한다. 치유를 받은 후 치유 수치의 25%가 필살기의 누적 손실한 HP로 전환된다", icon: "bonus_2" },
      { name: "괴겁의 폐망", description: "특성으로 발동된 추가 공격 피해가 20% 증가하고 에너지를 추가로 15pt 회복한다", icon: "bonus_3" }
    ],
    eidolons: [
      { rank: "E01", name: "검록의 끝, 지옥변상", description: "강화된 일반 공격과 필살기가 지정된 단일 적에게 가하는 피해가 필살기의 누적 손실한 HP의 150%만큼 추가로 증가한다", icon: "eidolon_1" },
      { rank: "E02", name: "흩어진 옛 꿈, 갖가지 여한", description: "블레이드가 [지옥변] 상태일 때 치명타 확률이 15% 증가한다", icon: "eidolon_2" },
      { rank: "E03", name: "제련한 현철, 서늘한 빛", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
      { rank: "E04", name: "황천의 기로, 육신의 회생", description: "현재 HP 백분율이 50%를 초과한 상태에서 50% 이하로 떨어지면 HP 최대치가 20% 증가한다. 해당 효과 최대 중첩수: 2스택", icon: "eidolon_4" },
      { rank: "E05", name: "시왕의 사형 선고, 마주한 업경", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
      { rank: "E06", name: "죽음의 끝, 돌아온 영혼", description: "충전 스택 수 상한이 4스택으로 감소한다. 특성으로 발동되는 추가 공격으로 가하는 피해가 블레이드 HP 최대치의 50%만큼 추가로 증가한다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다.",
    "[무간검수(無間劍樹)]": "블레이드의 전투 스킬로 강화된 일반 공격. HP를 소모하여 주변 적에게까지 피해를 입힌다.",
    "[지옥변(地獄變)]": "블레이드의 전투 스킬로 발동되는 상태. 가하는 피해가 증가하며 일반 공격이 강화된다."
  }
};

export default blade;
