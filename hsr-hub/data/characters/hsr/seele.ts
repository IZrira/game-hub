
import { Character } from '../../../../common-hub/types';

const seele: Character = {
  id: "seele",
  gameId: "hsr",
  name: "제레",
  folderName: "제레",
  attribute: "양자",
  path: "수렵",
  rarity: 5,
  affiliation: "벨로보그",
  briefInfo: "지하 저항 조직 「와일드 파이어」의 핵심 인물이자 별칭 「나비」.\n솔직하고 시원시원하지만, 내면에 섬세함과 예리함을 숨기고 있다",
  version: "1.0",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 제레 / 🇺🇸 Seele / 🇨🇳 希儿 / 🇯🇵 ゼーレ",
  voiceActors: "🇰🇷 송하림 / 🇺🇸 몰리 장 / 🇨🇳 탕야징 / 🇯🇵 나카하라 마이",
  hasASBuff: true,
  metadata: {
    name: "제레",
    language: "🇰🇷 제레 / 🇺🇸 Seele / 🇨🇳 希儿 / 🇯🇵 ゼーレ",
    element: "양자",
    path: "수렵",
    rarity: 5,
    affiliation: "벨로보그",
    cv: "🇰🇷 송하림 / 🇺🇸 몰리 장 / 🇨🇳 탕야징 / 🇯🇵 나카하라 마이",
    releaseVersion: "1.0",
    brief: "지하 저항 조직 「와일드 파이어」의 핵심 인물이자 별칭 「나비」.\n솔직하고 시원시원하지만, 내면에 섬세함과 예리함을 숨기고 있다"
  },
  baseStats: {
    lv1: { "기초 HP": 127, "기초 공격력": 87, "기초 방어력": 50 },
    lv20: { "기초 HP": 247, "기초 공격력": 170, "기초 방어력": 96 },
    lv30: { "기초 HP": 361, "기초 공격력": 248, "기초 방어력": 141 },
    lv40: { "기초 HP": 475, "기초 공격력": 327, "기초 방어력": 186 },
    lv50: { "기초 HP": 589, "기초 공격력": 405, "기초 방어력": 230 },
    lv60: { "기초 HP": 703, "기초 공격력": 484, "기초 방어력": 275 },
    lv70: { "기초 HP": 817, "기초 공격력": 562, "기초 방어력": 320 },
    lv80: { "기초 HP": 931, "기초 공격력": 640, "기초 방어력": 364 },
    speed: 115,
    energy: 120,
    taunt: 75
  },
  materials_v2: {
    ascension: [
      { name: "신용 포인트", count: "308,000", rarity: 3 },
      { name: "환영의 무쇠", count: "65", rarity: 4 },
      { name: "약탈의 본능", count: "15", rarity: 2 },
      { name: "변조된 야망", count: "15", rarity: 3 },
      { name: "짓밟힌 의지", count: "15", rarity: 4 }
    ],
    traces: [
      { name: "신용 포인트", count: "2,197,500", rarity: 3 },
      { name: "운명의 발자취", count: "6", rarity: 5 },
      { name: "수호자의 비원(悲願)", count: "9", rarity: 4 },
      { name: "짐승 사냥용 화살", count: "12", rarity: 2 },
      { name: "악마 사냥용 화살", count: "53", rarity: 3 },
      { name: "별 쫓는 화살", count: "101", rarity: 4 },
      { name: "약탈의 본능", count: "33", rarity: 2 },
      { name: "변조된 야망", count: "46", rarity: 3 },
      { name: "짓밟힌 의지", count: "28", rarity: 4 }
    ]
  },
  skills: [
    {
      name: "강습",
      tag: "일반 공격 | 단일 공격",
      energyRegen: "에너지 회복 20",
      toughnessDMG: "약점 격파 단일 공격 10",
      spRecovery: "+1",
      description: "지정된 단일 적에게 제레 공격력 100%만큼의 양자 속성 피해를 가한다",
      icon: "basic_atk_1"
    },
    {
      name: "귀인(歸刃)",
      tag: "전투 스킬 | 단일 공격",
      energyRegen: "에너지 회복 30",
      toughnessDMG: "약점 격파 단일 공격 20",
      spRecovery: "-1",
      description: "제레의 속도가 25% 증가하고, 지정된 단일 적에게 제레 공격력 220%만큼의 양자 속성 피해를 준다. 속도 증가 효과 지속 시간: 2턴",
      icon: "skill_1"
    },
    {
      name: "혼란의 나비",
      tag: "필살기 | 단일 공격",
      energyRegen: "에너지 회복 5",
      toughnessDMG: "약점 격파 단일 공격 30",
      description: "즉시 증폭 상태에 진입하여 지정된 단일 적에게 제레 공격력 425%만큼의 양자 속성 피해를 가한다",
      icon: "ultimate_1"
    },
    {
      name: "재현",
      tag: "특성 | 단일 공격",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "일반 공격, 전투 스킬, 필살기를 발동해 적을 처치한 후 즉시 보너스 턴을 1턴 획득하고 증폭 상태에 진입한다. 증폭 상태의 제레는 공격 발동으로 가하는 피해가 80% 증가한다. 지속 시간: 1턴. 제레가 특성 [재현]으로 획득한 보너스 턴에서 적 처치 시 해당 특성은 적용되지 않는다",
      icon: "talent_1"
    },
    {
      name: "환신(幻身)",
      tag: "비술 | 강화",
      energyRegen: "0",
      toughnessDMG: "0",
      description: "비술 사용 후 20초 동안 은신 상태에 진입한다. 은신 상태에선 적에게 들키지 않으며, 선공을 가해 적과의 전투 진입 시 제레는 즉시 증폭 상태에 진입한다",
      icon: "technique_1"
    }
  ],
  additionalAbilities: [
    { name: "야행", description: "현재 HP 백분율이 50% 이하인 경우, 적에게 피격될 확률이 감소한다", icon: "bonus_1" },
    { name: "절단", description: "증폭 상태일 때 제레의 양자 속성 저항 관통이 20% 증가한다", icon: "bonus_2" },
    { name: "파문", description: "일반 공격 발동 후 제레의 다음 행동 게이지가 20% 증가한다", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "방어력", value: "12.5%", icon: "def" },
    { type: "치명타 피해", value: "24%", icon: "crit_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "몰살", description: "현재 HP 백분율이 80% 이하인 적에게 피해를 가할 시 치명타 확률이 15% 증가한다", icon: "eidolon_1" },
    { rank: "E02", name: "나비춤", description: "전투 스킬의 가속 효과가 최대 2스택 중첩된다", icon: "eidolon_2" },
    { rank: "E03", name: "요란", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
    { rank: "E04", name: "스쳐가는 그림자", description: "제레가 적을 처치할 경우 자신의 에너지를 15pt 회복한다", icon: "eidolon_4" },
    { rank: "E05", name: "예리", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
    { rank: "E06", name: "분열", description: "필살기 발동 후 피격된 단일 적은 [혼란의 나비] 상태에 빠진다, 지속 시간: 1턴. [혼란의 나비] 상태의 적은 피격 후 추가로 제레 필살기 피해의 15%만큼 양자 속성 추가 피해를 1회 받는다. 다른 아군의 공격으로 [혼란의 나비] 상태의 추가 피해가 발동되어 해당 적이 처치되면 제레의 특성이 발동하지 않는다.\n제레가 전투 불능 상태에 빠지면 적의 [혼란의 나비] 상태는 해제된다", icon: "eidolon_6" }
  ],
  asBuffData: {
    skills: [
      {
        name: "강습",
        tag: "일반 공격 | 단일 공격",
        energyRegen: "에너지 회복 20",
        toughnessDMG: "약점 격파 단일 10",
        spRecovery: "+1",
        description: "지정된 단일 적에게 제레 공격력의 100%만큼 양자 속성 피해를 가한다",
        icon: "basic_atk_1"
      },
      {
        name: "귀인(歸刃)",
        tag: "전투 스킬 | 단일 공격",
        energyRegen: "에너지 회복 30",
        toughnessDMG: "약점 격파 단일 20",
        spRecovery: "-1",
        description: "제레의 속도가 25% 증가하고, 지정된 단일 적에게 제레 공격력의 360%만큼 양자 속성 피해를 가한다. 속도 증가 효과 지속 시간: 3턴\n아군이 공격한 후, 피격된 목표의 현재 HP 백분율이 50% 이하일 경우, 제레가 자동으로 대상에게 전투 스킬을 1회 발동한다. 이번 전투 스킬은 전투 스킬 포인트를 소모하지 않고 에너지를 회복하지 않으며, 해당 효과는 턴마다 최대 1회 발동한다. 제레의 턴 시작 시 발동 가능 횟수가 초기화된다. 공격할 수 있는 목표가 존재하지 않을 경우, HP가 가장 낮은 단일 적을 공격한다",
        icon: "skill_1"
      },
      {
        name: "혼란의 나비",
        tag: "필살기 | 단일 공격",
        energyRegen: "에너지 회복 5",
        toughnessDMG: "약점 격파 단일 30",
        spRecovery: "0",
        description: "즉시 증폭 상태에 진입하며, 지정된 단일 적에게 제레 공격력의 720%만큼 양자 속성 피해를 가한다",
        icon: "ultimate_1"
      },
      {
        name: "재현",
        tag: "특성 | 강화",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "일반 공격, 전투 스킬, 필살기를 발동해 적을 처치한 후 즉시 보너스 턴을 1개 획득하고 증폭 상태에 진입한다. 증폭 상태의 제레는 가하는 피해가 80%증가한다, 지속 시간: 3턴\n제레가 특성 [재현]으로 획득한 보너스 턴에서 적 처치 시 해당 특성은 적용되지 않는다",
        icon: "talent_1"
      },
      {
        name: "환신",
        tag: "비술 | 강화",
        energyRegen: "0",
        toughnessDMG: "0",
        spRecovery: "0",
        description: "비술 사용 후 20초 동안 지속되는 은신 상태에 진입한다. 은신 상태에서는 적에게 발견되지 않으며, 적을 선공하여 전투 진입 시 제레는 즉시 증폭 상태에 진입하고, 랜덤 적에게 제레 전투 스킬 피해 배율만큼 양자 속성 피해를 1회 가한다. 해당 피해는 반드시 치명타이다",
        icon: "technique_1"
      }
    ],
    additionalAbilities: [
      { name: "야행", description: "적 처치 시 자신이 가하는 피해가 50% 증가한다, 해당 효과 최대 중첩수: 3스택, 지속 시간: 3턴", icon: "bonus_1" },
      { name: "절단", description: "증폭 상태일 때 제레의 양자 속성 저항 관통이 25% 증가한다", icon: "bonus_2" },
      { name: "파문", description: "일반 공격 발동 후 제레의 다음 행동 게이지가 20% 증가한다", icon: "bonus_3" }
    ],
    attributeBonuses: [
      { type: "공격력", value: "28%", icon: "atk" },
      { type: "방어력", value: "12.5%", icon: "def" },
      { type: "치명타 피해", value: "24%", icon: "crit_dmg" }
    ],
    eidolons: [
      { rank: "E01", name: "몰살", description: "현재 HP 백분율이 80% 이하인 적에게 피해를 가할 시 치명타 확률이 15% 증가하고, 적의 방어력을 20% 무시한다", icon: "eidolon_1" },
      { rank: "E02", name: "나비춤", description: "전투 스킬의 가속 효과가 최대 2스택 중첩된다", icon: "eidolon_2" },
      { rank: "E03", name: "요란", description: "전투 스킬 레벨+2, 최대 Lv.15. 특성 레벨+2, 최대 Lv.15", icon: "eidolon_3" },
      { rank: "E04", name: "스쳐가는 그림자", description: "제레가 적을 처치할 경우 자신의 에너지를 15pt 회복한다", icon: "eidolon_4" },
      { rank: "E05", name: "예리", description: "필살기 레벨+2, 최대 Lv.15. 일반 공격 레벨+1, 최대 Lv.10", icon: "eidolon_5" },
      { rank: "E06", name: "분열", description: "필살기 발동 후 목표를 [혼란의 나비] 상태에 빠트린다, 지속 시간: 3턴. [혼란의 나비] 상태의 적이 피격 후, 추가로 이번 제레 필살기 피해의 30%만큼 확정 피해를 1회 받는다. [혼란의 나비] 상태의 적이 임의의 유닛에게 처치될 시에도 제레의 특성이 발동한다.\n제레가 전투 불능 상태에 빠지면 적의 [혼란의 나비] 상태는 해제된다", icon: "eidolon_6" }
    ]
  },
  specialTerms: {
    "보너스 턴": "턴 횟수를 소모하지 않는 보너스 턴 1개를 획득한다. 해당 턴에서는 필살기를 발동할 수 없다",
    "저항 관통": "피해를 가할 시 적의 일부 대응 피해 속성의 저항 수치를 무시한다",
    "행동 게이지 증가": "목표의 다음 행동 전 대기 간격을 줄인다",
    "전투 불능 상태": "아군의 현재 HP가 소모되어 0이 됐을 시 진입하는 특수한 상태. 해당 상태에 있으면 목표는 전투를 계속할 수 없다",
    "확정 피해": "어떤 효과에도 영향을 받지 않는 무속성 피해, 이번 피해는 공격을 1회 가한 것으로 간주하지 않는다"
  }
};

export default seele;
