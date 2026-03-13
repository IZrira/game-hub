
import { Character } from '../../../types';

const fuXuan: Character = {
  id: "fu_xuan",
  name: "부현",
  folderName: "부현",
  gameId: "hsr",
  attribute: "양자",
  path: "보존",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "선주 「나부」 태복사(太卜司)의 수뇌. 제3의 눈과 궁관진을 통해 선주의 항로와 일의 길흉을 점친다",
  version: "1.3",
  releaseVersion: "1.3",
  languageNames: "🇰🇷 부현 / 🇺🇸 Fu Xuan / 🇨🇳 符玄 / 🇯🇵 符玄",
  voiceActors: "🇰🇷 이지현 / 🇺🇸 세라 위든헤프트 / 🇨🇳 화링 / 🇯🇵 이토 미쿠",
  hasASBuff: true,
  metadata: {
    name: "부현",
    language: "🇰🇷 부현 / 🇺🇸 Fu Xuan / 🇨🇳 符玄 / 🇯🇵 符玄",
    element: "양자",
    path: "보존",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 이지현 / 🇺🇸 세라 위든헤프트 / 🇨🇳 화링 / 🇯🇵 이토 미쿠",
    releaseVersion: "1.3",
    brief: "선주 「나부」 태복사(太卜司)의 수뇌. 제3의 눈과 궁관진을 통해 선주의 항로와 일의 길흉을 점친다"
  },
  baseStats: {
    lv1: { "기초 HP": 201, "기초 공격력": 63, "기초 방어력": 83 },
    lv20: { "기초 HP": 391, "기초 공격력": 124, "기초 방어력": 161 },
    lv30: { "기초 HP": 572, "기초 공격력": 181, "기초 방어력": 235 },
    lv40: { "기초 HP": 752, "기초 공격력": 238, "기초 방어력": 309 },
    lv50: { "기초 HP": 933, "기초 공격력": 295, "기초 방어력": 384 },
    lv60: { "기초 HP": 1114, "기초 공격력": 352, "기초 방어력": 458 },
    lv70: { "기초 HP": 1294, "기초 공격력": 409, "기초 방어력": 532 },
    lv80: { "기초 HP": 1475, "기초 공격력": 466, "기초 방어력": 606 },
    speed: 100,
    taunt: 150,
    energy: 135
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "괴수의 못", count: "65", rarity: 4 },
      { name: "공조 기계 부품", count: "15", rarity: 2 },
      { name: "공조 톱니바퀴", count: "15", rarity: 3 },
      { name: "공조 환류 심장", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "3,000,000", rarity: 3 },
      { name: "운명의 발자취", count: "8", rarity: 5 },
      { name: "무한한 가짜의 여한", count: "12", rarity: 4 },
      { name: "청동의 집념", count: "18", rarity: 2 },
      { name: "한철의 맹세", count: "69", rarity: 3 },
      { name: "앰버의 수호", count: "139", rarity: 4 },
      { name: "공조 기계 부품", count: "41", rarity: 2 },
      { name: "공조 톱니바퀴", count: "56", rarity: 3 },
      { name: "공조 환류 심장", count: "58", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "태세(太歲) 진격",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 부현 HP 최대치의 50%만큼 양자 속성 피해를 준다.",
      icon: "basic_atk_1"
    },
    {
      name: "별의 움직임, 미래의 그림자",
      tag: "전투 스킬 | 방어",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "[궁관진]을 활성화하여, 부현의 동료가 실드로 막기 전에 받은 피해의 65%를 부현이 분담한다. 지속 시간: 3턴. [궁관진] 상태의 모든 아군이 [감식] 효과를 획득한다.\n[감식]: 아군 HP 최대치가 부현 HP 최대치의 6%만큼 증가하고, 치명타 확률이 12% 증가한다. 부현이 전투 불능 상태가 되면 [궁관진]도 해제된다.",
      icon: "skill_1"
    },
    {
      name: "천률의 규칙, 돌고 도는 역겁",
      tag: "필살기 | 범위 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 범위 20",
      spRecovery: "0",
      description: "모든 적에게 부현 HP 최대치의 100%만큼 양자 속성 피해를 주고, 부현 특성의 HP 회복 효과 발동 횟수를 1회 획득한다",
      icon: "ultimate_1"
    },
    {
      name: "건청곤이, 불행 끝 행운 시작",
      tag: "특성 | 회복",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "부현이 전투 가능 상태일 때 모든 아군에게 [피액(避厄)] 효과를 부여한다. [피액]: 아군이 받는 피해가 18% 감소한다.\n부현의 현재 HP 백분율이 50% 이하가 되면 HP를 자신이 손실한 HP의 90%만큼 회복한다. 치명적인 공격을 받을 경우 해당 효과는 발동되지 않는다.\n해당 효과는 기본 상태에서 1회의 발동 횟수를 보유하며, 최대 2회의 발동 횟수를 보유할 수 있다",
      icon: "talent_1"
    },
    {
      name: "길흉화복, 성좌의 영역",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "0",
      spRecovery: "0",
      description: "비술 사용 후 모든 아군이 20초간 지속되는 배리어를 획득한다. 해당 배리어는 적의 모든 공격을 막으며, 공격을 받아도 전투에 진입하지 않는다.\n배리어가 지속되는 동안 전투에 진입하면 부현은 자동으로 [궁관진]을 활성화한다. 지속 시간: 2턴",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "태을(太乙) 점술판", description: "[궁관진] 활성화 시 부현이 전투 스킬을 발동하면 에너지를 추가로 20pt 회복한다", icon: "bonus_1" },
    { name: "성반(星盤) 둔갑", description: "필살기 발동 시 다른 아군의 HP를 부현 HP 최대치의 5%+133만큼 회복한다.", icon: "bonus_2" },
    { name: "육임(六壬) 점괘", description: "[궁관진] 활성화 시 적이 아군에게 제어류 디버프 상태를 부여하면, 모든 아군이 이번 행동에서 적이 부여한 모든 제어류 디버프 상태에 저항한다. 해당 효과 발동 횟수: 1회. \n[궁관진]을 다시 활성화하면 효과 발동 횟수가 갱신된다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "18.7%", icon: "crit_rate" },
    { type: "HP", value: "10%", icon: "hp" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "사위(司危)", description: "[감식]은 치명타 피해를 30% 증가시킨다", icon: "eidolon_1" },
    { rank: "E02", name: "유조(柔兆)", description: "[궁관진] 활성화 시 아군이 치명적인 피해를 받을 경우, 모든 아군이 이번 행동에서 전투 불능 상태에 빠지지 않으며, 즉시 HP를 자신의 HP 최대치의 70%만큼 회복한다. 해당 효과는 단일 전투에서 1회만 발동한다", icon: "eidolon_2" },
    { rank: "E03", name: "직부(直符)", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "격택(格澤)", description: "[궁관진] 활성화 시 다른 아군이 피격되면 부현의 에너지를 5pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "계신(計神)", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "종릉(種陵)", description: "[궁관진] 활성화 시 모든 아군의 이번 전투에서 누적 손실한 HP를 기록한다. 부현이 필살기로 가하는 피해가 이번 전투에서 누적 손실한 HP의 200%만큼 증가한다.\n이번 전투에서 기록되는 누적 손실 HP는 부현 HP 최대치의 120%를 넘지 않으며, 필살기를 발동하면 리셋하고 다시 누적된다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "태세(太歲) 진격",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 부현 HP 최대치의 50%만큼 양자 속성 피해를 준다.",
        icon: "basic_atk_1"
      },
      {
        name: "별의 움직임, 미래의 그림자",
        tag: "전투 스킬 | 방어",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "-1",
        description: "[궁관진]을 활성화하여, 부현의 동료가 실드로 막기 전에 받은 피해의 65%를 부현이 분담한다. 지속 시간: 3턴. [궁관진] 상태의 모든 아군이 [감식] 효과를 획득한다.\n[감식]: 아군 HP 최대치가 부현 HP 최대치의 6%만큼 증가하고, 치명타 확률이 12% 증가한다. 부현이 전투 불능 상태가 되면 [궁관진]도 해제된다.",
        icon: "skill_1"
      },
      {
        name: "천률의 규칙, 돌고 도는 역겁",
        tag: "필살기 | 범위 공격",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 범위 20",
        spRecovery: "0",
        description: "모든 적에게 부현 HP 최대치의 100%만큼 양자 속성 피해를 주고, 부현 특성의 HP 회복 효과 발동 횟수를 1회 획득한다",
        icon: "ultimate_1"
      },
      {
        name: "건청곤이, 불행 끝 행운 시작",
        tag: "특성 | 회복",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "부현이 전투 가능 상태일 때 모든 아군에게 [피액(避厄)] 효과를 부여한다. [피액]: 아군이 받는 피해가 18% 감소한다.\n부현의 현재 HP 백분율이 50% 이하가 되면 HP를 자신이 손실한 HP의 90%만큼 회복한다. 치명적인 공격을 받을 경우 해당 효과는 발동되지 않는다.\n해당 효과는 기본 상태에서 1회의 발동 횟수를 보유하며, 최대 2회의 발동 횟수를 보유할 수 있다",
        icon: "talent_1"
      },
      {
        name: "길흉화복, 성좌의 영역",
        tag: "비술",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "비술 사용 후 모든 아군이 20초간 지속되는 배리어를 획득한다. 해당 배리어는 적의 모든 공격을 막으며, 공격을 받아도 전투에 진입하지 않는다.\n배리어가 지속되는 동안 전투에 진입하면 부현은 자동으로 [궁관진]을 활성화한다. 지속 시간: 2턴",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "태을(太乙) 점술판", description: "[궁관진] 활성화 시 부현이 전투 스킬을 발동하면 에너지를 추가로 20pt 회복한다", icon: "bonus_1" },
      { name: "성반(星盤) 둔갑", description: "필살기 발동 시 다른 아군의 HP를 부현 HP 최대치의 5%+133만큼 회복한다.", icon: "bonus_2" },
      { name: "육임(六壬) 점괘", description: "특성으로 발동된 추가 공격 피해가 20% 증가하고 에너지를 추가로 15pt 회복한다", icon: "bonus_3" }
    ],
    eidolons: [
      { rank: "E01", name: "사위(司危)", description: "[감식]은 치명타 피해를 30% 증가시킨다", icon: "eidolon_1" },
      { rank: "E02", name: "유조(柔兆)", description: "[궁관진] 활성화 시 아군이 치명적인 피해를 받을 경우, 모든 아군이 이번 행동에서 전투 불능 상태에 빠지지 않으며, 즉시 HP를 자신의 HP 최대치의 70%만큼 회복한다. 해당 효과는 단일 전투에서 1회만 발동한다", icon: "eidolon_2" },
      { rank: "E03", name: "직부(直符)", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
      { rank: "E04", name: "격택(格澤)", description: "[궁관진] 활성화 시 다른 아군이 피격되면 부현의 에너지를 5pt 회복한다", icon: "eidolon_4" },
      { rank: "E05", name: "계신(計神)", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
      { rank: "E06", name: "종릉(種陵)", description: "[궁관진] 활성화 시 모든 아군의 이번 전투에서 누적 손실한 HP를 기록한다. 부현이 필살기로 가하는 피해가 이번 전투에서 누적 손실한 HP의 200%만큼 증가한다.\n이번 전투에서 기록되는 누적 손실 HP는 부현 HP 최대치의 120%를 넘지 않으며, 필살기를 발동하면 리셋하고 다시 누적된다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "[궁관진]": "부현의 전투 스킬로 활성화되는 진법. 아군이 받는 피해를 부현이 분담하며 아군의 HP 최대치와 치명타 확률을 증가시킨다.",
    "[감식]": "[궁관진] 상태에서 아군이 획득하는 버프. HP 최대치와 치명타 확률이 증가한다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상."
  }
};

export default fuXuan;
