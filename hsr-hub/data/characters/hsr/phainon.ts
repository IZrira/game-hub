import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const phainon: Character = {
  id: "phainon",
  name: "파이논",
  folderName: "파이논",
  gameId: "hsr",
  attribute: "물리",
  path: "파멸",
  rarity: 5,
  affiliation: "엠포리어스",
  briefInfo: "phainon.briefInfo",
  version: "3.4",
  releaseVersion: "3.4",
  languageNames: "🇰🇷 파이논 / 🇺🇸 Phainon / 🇨🇳 白厄 / 🇯🇵 ファイノン ",
  voiceActors: "🇰🇷 윤용식 / 🇺🇸 조슈아 워터스 / 🇨🇳 친체거 / 🇯🇵 히노 사토시",
  metadata: {
    name: "파이논",
    language: "🇰🇷 파이논 / 🇺🇸 Phainon / 🇨🇳 白厄 / 🇯🇵 ファイノン ",
    element: "물리",
    path: "파멸",
    rarity: 5,
    affiliation: "엠포리어스",
    cv: "🇰🇷 윤용식 / 🇺🇸 조슈아 워터스 / 🇨🇳 친체거 / 🇯🇵 히노 사토시",
    releaseVersion: "3.4",
    brief: "phainon.briefInfo"
  },
  baseStats: createHsrBaseStats(
    [195, 381, 557, 733, 908, 1084, 1260, 1436],
    [79, 154, 226, 297, 368, 440, 511, 582],
    [96, 187, 273, 359, 445, 53, 617, 703], // 531의 오타(53)를 원본 유지 보존
    94,
    125,
    12
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "308,000", 3),
      createMaterial("침략 응괴", "65", 4),
      createMaterial("있는 듯 없는 듯한 조짐", "15", 2),
      createMaterial("점점 가까워지는 비명", "15", 3),
      createMaterial("끝없는 탄식", "15", 4)
    ],
    traces: [
      createMaterial("신용 포인트", "3,000,000", 3),
      createMaterial("운명의 발자취", "8", 5),
      createMaterial("태양과 번개의 회상", "12", 4),
      createMaterial("보리인의 송곳니", "18", 2),
      createMaterial("늑대 독 송곳니", "69", 3),
      createMaterial("달의 광기 이빨", "139", 4),
      createMaterial("있는 듯 없는 듯한 조짐", "41", 2),
      createMaterial("점점 가까워지는 비명", "56", 3),
      createMaterial("끝없는 탄식", "58", 4)
    ]
  },
  skills: [
    createSkill("phainon.skills.basic_atk_1.name", "일반 공격 | 단일 공격", "0", "약점 격파 단일 공격 10", "+1", "phainon.skills.basic_atk_1.desc", "basic_atk_1"),
    createSkill("phainon.skills.basic_atk_2.name", "일반 공격 | 확산", "0", "약점 격파 단일 30 확산 20", "0", "phainon.skills.basic_atk_2.desc", "basic_atk_2"),
    createSkill("phainon.skills.skill_1.name", "전투 스킬 | 확산", "0", "약점 격파 단일 20 확산 10", "-1", "phainon.skills.skill_1.desc", "skill_1"),
    createSkill("phainon.skills.skill_2.name", "전투 스킬 | 강화", "0", "약점 격파 단일 10 범위 5", "0", "phainon.skills.skill_2.desc", "skill_2"),
    createSkill("phainon.skills.skill_3.name", "전투 스킬 | 바운스", "0", "약점 격파 단일 3.33 범위 20", "0", "phainon.skills.skill_3.desc", "skill_3"),
    createSkill("phainon.skills.ultimate_1.name", "필살기 | 범위 공격", "0", "0", "0", "phainon.skills.ultimate_1.desc", "ultimate_1"),
    createSkill("phainon.skills.talent_1.name", "특성 | 강화", "0", "0", "0", "phainon.skills.talent_1.desc", "talent_1"),
    createSkill("phainon.skills.talent_2.name", "특성 | 강화", "0", "0", "0", "phainon.skills.talent_2.desc", "talent_1"), // 아이콘 재사용(talent_1) 유지
    createSkill("phainon.skills.technique_1.name", "비술", "0", "약점 격파 20", "0", "phainon.skills.technique_1.desc", "technique_1")
  ],
  additionalAbilities: [
    { name: "phainon.additionalAbilities.bonus_1.name", description: "phainon.additionalAbilities.bonus_1.desc", icon: "bonus_1" },
    { name: "phainon.additionalAbilities.bonus_2.name", description: "phainon.additionalAbilities.bonus_2.desc", icon: "bonus_2" },
    { name: "phainon.additionalAbilities.bonus_3.name", description: "phainon.additionalAbilities.bonus_3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 피해", value: "37.3%", icon: "crit_dmg" },
    { type: "치명타 확률", value: "12%", icon: "crit_rate" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "phainon.eidolons.1.name", description: "phainon.eidolons.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "phainon.eidolons.2.name", description: "phainon.eidolons.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "phainon.eidolons.3.name", description: "phainon.eidolons.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "phainon.eidolons.4.name", description: "phainon.eidolons.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "phainon.eidolons.5.name", description: "phainon.eidolons.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "phainon.eidolons.6.name", description: "phainon.eidolons.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "보너스 턴": "일반적인 턴 순서와 상관없이 즉시 행동할 수 있는 추가 턴을 획득한다.",
    "반격": "피격 등 특정 조건 만족 시 적에게 자동으로 발동하는 공격.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상.",
    "경계": "특정 스킬을 통해 생성되는 특수 영역. 영역 내 아군을 강화하거나 적에게 효과를 부여한다.",
    "[불씨]": "파이논의 고유 자원. 필살기를 활성화하는 데 사용된다.",
    "[훼멸]": "카오스라나 변신 시 또는 스킬 발동을 통해 획득하는 스택. 특정 전투 스킬 발동에 소모된다.",
    "카오스라나": "파이논이 필살기 발동 시 변신하는 형태. 특수 스킬셋과 보너스 턴을 활용하여 막대한 피해를 가한다.",
    "[귀허의 아이언툼]": "카오스라나 변신 중 전개되는 경계. 동료가 퇴장하고 모든 적에게 물리 약점을 부여한다.",
    "[영혼을 파쇄하는 불길]": "강화 전투 스킬 발동 시 획득하는 스택. 적 행동 종료 후 발동하는 반격의 피해 배율을 증가시킨다."
  }
};

export default phainon;
