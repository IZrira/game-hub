import { Character } from '../../../../common-hub/types';

const sparkle: Character = {
  id: "sparkle",
  name: "스파클",
  folderName: "스파클",
  gameId: "hsr",
  attribute: "양자",
  path: "화합",
  rarity: 5,
  affiliation: "가면의 우인",
  briefInfo: "「가면의 우인」 중 하나, 종잡을 수 없으며 목적을 이루기 위해 수단과 방법을 가리지 않는다. 역할에 심취하는 위험한 연극 대가. 천의 얼굴을 지닌 그녀는 수많은 모습을 가지고 있다. 스파클에게 재물, 지위, 권력 따위는 중요하지 않다. 그녀를 움직일 수 있는 건 오직 「즐거움」 뿐이다",
  version: "2.0",
  releaseVersion: "2.0",
  languageNames: "🇰🇷 스파클 / 🇺🇸 Sparkle / 🇨🇳 花火 / 🇯🇵 花火",
  voiceActors: "🇰🇷 성예원 / 🇺🇸 리지 프리먼 / 🇨🇳 자오솽 / 🇯🇵 우에다 레이나",
  hasASBuff: true,
  metadata: {
    name: "스파클",
    language: "🇰🇷 스파클 / 🇺🇸 Sparkle / 🇨🇳 花火 / 🇯🇵 花火",
    element: "양자",
    path: "화합",
    rarity: 5,
    affiliation: "가면의 우인",
    cv: "🇰🇷 성예원 / 🇺🇸 리지 프리먼 / 🇨🇳 자오솽 / 🇯🇵 우에다 레이나",
    releaseVersion: "2.0",
    brief: "「가면의 우인」 중 하나, 종잡을 수 없으며 목적을 이루기 위해 수단과 방법을 가리지 않는다. 역할에 심취하는 위험한 연극 대가. 천의 얼굴을 지닌 그녀는 수많은 모습을 가지고 있다. 스파클에게 재물, 지위, 권력 따위는 중요하지 않다. 그녀를 움직일 수 있는 건 오직 「즐거움」 뿐이다"
  },
  baseStats: {
    lv1: { "기초 HP": 190, "기초 공격력": 71, "기초 방어력": 66 },
    lv20: { "기초 HP": 371, "기초 공격력": 139, "기초 방어력": 129 },
    lv30: { "기초 HP": 542, "기초 공격력": 203, "기초 방어력": 188 },
    lv40: { "기초 HP": 713, "기초 공격력": 267, "기초 방어력": 248 },
    lv50: { "기초 HP": 884, "기초 공격력": 332, "기초 방어력": 307 },
    lv60: { "기초 HP": 1055, "기초 공격력": 396, "기초 방어력": 366 },
    lv70: { "기초 HP": 1226, "기초 공격력": 460, "기초 방어력": 426 },
    lv80: { "기초 HP": 1397, "기초 공격력": 524, "기초 방어력": 485 },
    speed: 101,
    taunt: 100,
    energy: 110
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "꿈 토치", count: "65", rarity: 4 },
      { name: "생각의 가루", count: "15", rarity: 2 },
      { name: "인상의 파편", count: "15", rarity: 3 },
      { name: "욕망의 거울 조각", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "별을 갉아먹고 재앙을 낳는 구악", count: "9", rarity: 4 },
      { name: "구름 위 음표", count: "12", rarity: 2 },
      { name: "천상의 소절", count: "53", rarity: 3 },
      { name: "천외의 악장", count: "101", rarity: 4 },
      { name: "생각의 가루", count: "33", rarity: 2 },
      { name: "인상의 파편", count: "46", rarity: 3 },
      { name: "욕망의 거울 조각", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "모노드라마",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 스파클 공격력의 100%만큼 양자 속성 피해를 가한다.",
      icon: "basic_atk_1"
    },
    {
      name: "꿈을 헤엄치는 물고기",
      tag: "전투 스킬 | 서포트",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "0",
      spRecovery: "-1",
      description: "지정된 단일 아군의 치명타 피해가 스파클의 치명타 피해의 24%에 45%를 더한 값만큼 증가한다. 지속 시간: 1턴. 또한 ,해당 목표의 행동 게이지가 50% 증가한다. \n스파클이 자신에게 해당 스킬을 발동하면 행동 게이지 증가 효과가 발동하지 않는다.",
      icon: "skill_1"
    },
    {
      name: "천의 얼굴",
      tag: "필살기 | 서포트",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "0",
      description: "아군의 전투 스킬 포인트를 4pt 회복하고 모든 아군이 [기이한 수수께끼] 효과를 획득한다. [기이한 수수께끼]를 보유한 아군은 스파클 특성으로 발동되는 피해 증가 효과가 스택당 추가로 10% 증가한다. 지속 시간: 2턴",
      icon: "ultimate_1"
    },
    {
      name: "서술 트릭",
      tag: "특성 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "스파클이 필드에 있을 시 전투 스킬 포인트 최대치가 추가로 2pt 증가한다. 아군이 전투 스킬 포인트를 1pt 소모할 때마다 모든 아군이 가하는 피해가 6% 증가한다. 해당 효과 지속 시간: 2턴, 최대 중첩수: 3스택",
      icon: "talent_1"
    },
    {
      name: "믿을 수 없는 화자",
      tag: "비술 | 서포트",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 모든 아군이 20초 동안 [미혹] 상태에 진입한다. [미혹] 상태에선 적에게 들키지 않으며, [미혹] 중에 전투 진입 시 아군이 전투 스킬 포인트를 3pt 회복하고, 스파클이 에너지를 20pt 회복한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "세시기", description: "일반 공격 발동 시 추가로 에너지를 10pt 회복한다", icon: "bonus_1" },
    { name: "인조화", description: "전투 스킬이 제공하는 치명타 피해 증가 효과가 목표의 다음 턴 시작까지 연장된다", icon: "bonus_2" },
    { name: "야상곡", description: "모든 아군의 공격력이 15% 증가한다. 아군 파티 중 양자 속성 캐릭터가 1명/2명/3명 존재 시 아군 양자 속성 캐릭터의 공격력이 추가로 5%/15%/30% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "치명타 피해", value: "24%", icon: "crit_dmg" },
    { type: "효과 저항", value: "10%", icon: "res" }
  ],
  eidolons: [
    { rank: "E01", name: "불신의 정지", description: "필살기가 부여하는 [기이한 수수께끼]의 지속 시간이 추가로 1턴 증가하며, [기이한 수수께끼]를 보유한 아군의 공격력이 40% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "실없는 허구", description: "특성의 각 스택 효과는 추가로 아군이 피해를 가할 시 목표의 방어력을 8% 무시하게 한다", icon: "eidolon_2" },
    { rank: "E03", name: "몽환의 포영", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
    { rank: "E04", name: "유희적 인간", description: "필살기가 전투 스킬 포인트를 추가로 1pt 회복시키고, 특성의 전투 스킬 포인트 최대치 증가 효과가 추가로 1pt 증가한다", icon: "eidolon_4" },
    { rank: "E05", name: "양면의 진실", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
    { rank: "E06", name: "다중 해답", description: "전투 스킬의 치명타 피해 증가 효과가 스파클 치명타 피해의 30%만큼 추가로 증가한다. 스파클이 전투 스킬을 발동하면, 전투 스킬의 치명타 피해 증가 효과는 [기이한 수수께끼]를 보유한 모든 동료에게 적용된다. 스파클이 필살기 발동 시 단일 아군 중 전투 스킬의 치명타 피해 증가 효과를 보유한 목표가 있으면, 해당 효과는 [기이한 수수께끼]를 보유한 동료에게까지 확산된다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "모노드라마",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 공격 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 스파클 공격력의 100%만큼 양자 속성 피해를 가한다.",
        icon: "basic_atk_1"
      },
      {
        name: "꿈을 헤엄치는 물고기",
        tag: "전투 스킬 | 서포트",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "0",
        spRecovery: "-1",
        description: "지정된 단일 아군의 치명타 피해가 스파클의 치명타 피해의 24%에 45%를 더한 값만큼 증가한다. 지속 시간: 2턴. 또한 ,해당 목표의 행동 게이지가 50% 증가한다. \n스파클이 자신에게 해당 스킬을 발동하면 행동 게이지 증가 효과가 발동하지 않는다.",
        icon: "skill_1"
      },
      {
        name: "천의 얼굴",
        tag: "필살기 | 서포트",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "0",
        description: "아군의 전투 스킬 포인트를 6pt 회복한다. 회복 시 전투 스킬 포인트가 최대치를 초과하면 초과한 전투 스킬 포인트 수를 기록한다(최대 10pt).\n아군 캐릭터 턴 종료 후 전투 스킬 포인트가 최대치보다 낮으면 스파클이 기록 수치를 소모해 아군의 전투 스킬 포인트르 회복하고, 해당 효과는 최대치에 도달할 때까지 반복한다. 이후 모든 아군이 [기이한 수수께끼]를 획득한다.\n[기이한 수수께끼]를 보유한 아군은 스파클 특성이 발동하는 적이 받는 피해 증가 효과가 스택마다 추가로 6% 증가한다. 지속 시간: 3턴.",
        icon: "ultimate_1"
      },
      {
        name: "서술 트릭",
        tag: "특성 | 서포트",
        energyRegen: "0",
        toughnessDMG: "0",
        description: "스파클이 필드에 있을 시 전투 스킬 포인트 최대치가 추가로 2pt 증가한다. 아군이 전투 스킬 포인트를 1pt 소모할 때마다 스파클이 [환상] 1스택을 획득하며, [환상] 스택당 모든 적이 받는 피해가 5% 증가한다, 해당 효과 지속 시간: 2턴, 최대 중첩수: 3스택",
        icon: "talent_1"
      },
      {
        name: "믿을 수 없는 화자",
        tag: "비술 | 서포트",
        energyRegen: "0",
        toughnessDMG: "0",
        description: "비술 사용 후 모든 아군이 20초 동안 [미혹] 상태에 진입한다. [미혹] 상태에선 적에게 들키지 않으며, [미혹] 중에 전투 진입 시 아군이 전투 스킬 포인트를 3pt 회복하고, 스파클이 에너지를 20pt 회복한다",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "세시기", description: "일반 공격 발동 시 추가로 에너지를 10pt 회복한다. 전투 스킬의 치명타 피해 증가 효과를 보유한 아군 캐릭터가 전투 스킬 포인트 소모 시, 스파클이 추가로 에너지를 1pt 회복한다", icon: "bonus_1" },
      { name: "인조화", description: "아군 캐릭터가 단일 턴 동안 소모한 전투 스킬 포인트가 3pt 이상일 시, 스파클이 다음에 전투 스킬 발동 시 전투 스킬 포인트를 소모하지 않는다", icon: "bonus_2" },
      { name: "야상곡", description: "모든 아군의 공격력이 45% 증가한다. 아군 캐릭터가 전투 스킬의 치명타 피해 증가 효과 보유 시, 모든 속성 저항 관통이 10% 증가한다", icon: "bonus_3" }
    ],
    eidolons: [
      { rank: "E01", name: "불신의 정지", description: "[기이한 수수께끼]를 보유한 아군의 공격력이 40% 증가하고, 전투 시작 시 또는 전투 스킬 발동 시 스파클의 속도가 15% 증가한다, 지속 시간: 2턴", icon: "eidolon_1" },
      { rank: "E02", name: "실없는 허구", description: "특성의 각 스택 효과는 추가로 적의 방어력을 10% 감소시킨다", icon: "eidolon_2" },
      { rank: "E03", name: "몽환의 포영", description: "전투 스킬 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_3" },
      { rank: "E04", name: "유희적 인간", description: "필살기가 전투 스킬 포인트를 추가로 1pt 회복시키고, 특성의 전투 스킬 포인트 최대치 증가 효과가 추가로 1pt 증가한다", icon: "eidolon_4" },
      { rank: "E05", name: "양면의 진실", description: "필살기 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_5" },
      { rank: "E06", name: "다중 해답", description: "전투 스킬의 치명타 피해 증가 효과가 스파클 치명타 피해의 30%만큼 추가로 증가한다. 스파클이 전투 스킬을 발동하면, 전투 스킬의 치명타 피해 증가 효과는 [기이한 수수께끼]를 보유한 모든 동료에게 적용된다. 스파클이 필살기 발동 시 단일 아군 중 전투 스킬의 치명타 피해 증가 효과를 보유한 목표가 있으면, 해당 효과는 [기이한 수수께끼]를 보유한 동료에게까지 확산된다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "행동 게이지 증가": "행동 게이지가 50% 증가하여 행동 순서가 앞당겨진다.",
    "[기이한 수수께끼]": "스파클의 필살기로 아군 전체가 획득하는 버프. 특성의 피해 증가 효과를 추가로 증폭시킨다.",
    "[환상]": "스파클의 AS 특성으로 획득하는 스택. 중첩될수록 모든 적이 받는 피해가 증가한다.",
    "[미혹]": "스파클의 비술로 진입하는 은신 상태. 적에게 발각되지 않으며 전투 진입 시 추가 전투 스킬 포인트와 에너지를 회복한다."
  }
};

export default sparkle;
