
import { Character } from '../../../../common-hub/types';

const archer: Character = {
  id: "archer",
  name: "아처",
  folderName: "아처",
  gameId: "hsr",
  attribute: "양자",
  path: "수렵",
  rarity: 5,
  affiliation: "이세계",
  briefInfo: "절망이 과거와 미래 사이에서 번갈아 펼쳐지고, 무수한 이상이 붉은색 성해포 사이에서 불타버렸다. 하지만, 그 잿더미에 속지 말라——\n만약 누군가 이상의 이름을 핑계로 허황된 좋은꿈을 만들어 낸다면, 그는 반드시 다시 불타올라 세상의 위선과 끝까지 싸울 것이니.\n어디에 있든 그는 언제나 정의의 사자다.",
  version: "3.4",
  releaseVersion: "3.4",
  languageNames: "🇰🇷 아처 / 🇺🇸  Archer / 🇨🇳 Archer / 🇯🇵 アーチャー",
  voiceActors: "🇰🇷 임채헌 / 🇺🇸 없음 / 🇨🇳 우레이 / 🇯🇵 스와베 준이치",
  metadata: {
    name: "아처",
    language: "🇰🇷 아처 / 🇺🇸  Archer / 🇨🇳 Archer / 🇯🇵 アーチャー",
    element: "양자",
    path: "수렵",
    rarity: 5,
    affiliation: "이세계",
    cv: "🇰🇷 임채헌 / 🇺🇸 없음 / 🇨🇳 우레이 / 🇯🇵 스와베 준이치",
    releaseVersion: "3.4",
    brief: "절망이 과거와 미래 사이에서 번갈아 펼쳐지고, 무수한 이상이 붉은색 성해포 사이에서 불타버렸다. 하지만, 그 잿더미에 속지 말라——\n만약 누군가 이상의 이름을 핑계로 허황된 좋은꿈을 만들어 낸다면, 그는 반드시 다시 불타올라 세상의 위선과 끝까지 싸울 것이니.\n어디에 있든 그는 언제나 정의의 사자다."
  },
  baseStats: {
    lv1: { "기초 HP": 158, "기초 공격력": 85, "기초 방어력": 66 },
    lv20: { "기초 HP": 309, "기초 공격력": 165, "기초 방어력": 129 },
    lv30: { "기초 HP": 451, "기초 공격력": 241, "기초 방어력": 188 },
    lv40: { "기초 HP": 594, "기초 공격력": 317, "기초 방어력": 248 },
    lv50: { "기초 HP": 737, "기초 공격력": 393, "기초 방어력": 307 },
    lv60: { "기초 HP": 879, "기초 공격력": 469, "기초 방어력": 366 },
    lv70: { "기초 HP": 1022, "기초 공격력": 545, "기초 방어력": 426 },
    lv80: { "기초 HP": 1164, "기초 공격력": 621, "기초 방어력": 485 },
    speed: 105,
    taunt: 75,
    energy: 220
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "어두운 장막의 달빛", count: "65", rarity: 4 },
      { name: "소멸된 코어", count: "15", rarity: 2 },
      { name: "희미한 빛의 코어", count: "15", rarity: 3 },
      { name: "꿈틀대는 코어", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "9", rarity: 4 },
      { name: "운철 탄환", count: "12", rarity: 2 },
      { name: "숙명적인 사인", count: "53", rarity: 3 },
      { name: "시간을 역행하는 일격", count: "101", rarity: 4 },
      { name: "소멸된 코어", count: "33", rarity: 2 },
      { name: "희미한 빛의 코어", count: "46", rarity: 3 },
      { name: "꿈틀대는 코어", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "간장•막야",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 아처 공격력의 100%만큼 양자 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "거짓•나선검",
      tag: "전투 스킬 | 확산",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-2",
      description: "[회로접속] 상태에 진입한다. 지정된 단일 적에게 아처 공격력의 360%만큼 양자 속성 피해를 가한다. \n[회로접속] 상태에서 전투 스킬 발동 시 이번 턴이 종료되지 않으며, 아처의 전투 스킬이 가하는 피해가 [회로접속] 상태가 종료될 때까지 100% 증가한다. 최대 중첩수: 2스택. 전투 스킬을 5회 직접 발동하거나 전투 스킬 포인트가 부족해 전투 스킬을 다시 발동할 수 없을 경우 [회로접속] 상태가 종료된다. 각 웨이브의 모든 적이 처치되면 [회로접속] 상태가 종료된다",
      icon: "skill_1"
    },
    {
      name: "무한의 검제",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "지정된 단일 적에게 아처 공격력의 1000%만큼 양자 속성 피해를 가하고 충전을 2pt 획득하며, 충전은 최대 4pt 보유할 수 있다",
      icon: "ultimate_1"
    },
    {
      name: "심안(진)",
      tag: "특성 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 10",
      description: "아처의 동료가 적에게 공격을 발동하면 아처는 충전을 1pt 소모하고, 즉시 주목표에게 추가 공격을 발동하여 아처 공격력의 200%만큼 양자 속성 피해를 가하며, 전투 스킬 포인트를 1pt 회복한다. 이번 추가 공격 발동 전에 목표가 처치된 경우 랜덤 단일 적에게 추가 공격을 발동한다",
      icon: "talent_1"
    },
    {
      name: "천리안",
      tag: "비술",
      energyRegen: "0",
      toughnessDMG: "약점 격파 단일 공격 20",
      description: "즉시 적을 공격하며, 전투 진입 후 모든 적에게 아처 공격력의 200%만큼 양자 속성 피해를 가하고, 충전을 1pt 획득한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "투영 마술", description: "아처가 필드에 있을 시 전투 스킬 포인트 최대치가 추가로 2pt 증가한다", icon: "bonus_1" },
    { name: "정의의 사자", description: "아처가 전투 진입 시 충전을 1pt 획득한다", icon: "bonus_2" },
    { name: "수호자", description: "아군이 전투 스킬 포인트 획득 후 전투 스킬 포인트가 4pt 이상일 경우 아처의 치명타 피해가 120% 증가한다, 지속 시간: 1턴", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "양자 속성 피해 증가", value: "22.4%", icon: "quantum_dmg" },
    { type: "공격력", value: "18%", icon: "atk" },
    { type: "치명타 확률", value: "6.7%", icon: "crit_rate" }
  ],
  eidolons: [
    { rank: "E01", name: "닿지 못한 이상", description: "단일 턴 내에 전투 스킬을 3회 발동하면 아군의 전투 스킬 포인트를 2pt 회복한다", icon: "eidolon_1" },
    { rank: "E02", name: "이루지 못한 행복", description: "필살기 발동 시 적의 양자 속성 저항을 20% 감소시키며, 대상에게 양자 속성 약점을 부여한다, 지속 시간: 2턴", icon: "eidolon_2" },
    { rank: "E03", name: "평범함을 거부하는 기개", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "영웅이라 불릴 수 없는 삶", description: "가하는 필살기 피해가 150% 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "고독한 무명의 수호", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "끝없는 배회의 순례", description: "턴 시작 시 아군의 전투 스킬 포인트를 1pt 회복한다. 자신의 전투 스킬이 제공하는 피해 증가 효과의 중첩 가능 스택 최대치가 1스택 증가한다. 가하는 전투 스킬 피해가 방어력을 20% 무시한다", icon: "eidolon_6" }
  ],
  specialTerms: {
    "[회로접속]": "아처의 전투 스킬 발동 시 진입하는 상태. 턴이 종료되지 않으며 연속으로 전투 스킬을 사용하여 피해량을 폭발적으로 증가시킬 수 있다.",
    "추가 공격": "조건을 만족하면 자동으로 발동되는 효과. 목표에게 추가로 공격을 발동한다."
  }
};

export default archer;
