import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const evernight: Character = {
  id: "evernight",
  name: "에버나이트",
  folderName: "에버나이트",
  gameId: "hsr",
  attribute: "얼음",
  path: "기억",
  rarity: 5,
  affiliation: "앰포리어스",
  briefInfo: "세상과 단절된 기억의 영역, 촛불은 과거를 비추고 안개 속에서 조용히 사그라든다.\n그 그림자 속에서 온 기억의 아이 에버나이트, 「세월」의 불씨를 은닉한 황금의 후예여, 「망각」의 물결을 일으켜 거울 속 존재의 염원을 지켜라.\n——「걱정하지 마. 내가 『개척』의 앞길을 지켜줄게…. 그 어떤 대가를 치르더라도♭」",
  releaseVersion: "3.6",
  languageNames: "🇰🇷 에버나이트 / 🇺🇸 Evernight / 🇨🇳 长夜月 / 🇯🇵 長夜月 ",
  voiceActors: "🇰🇷 정혜원 / 🇺🇸 스카일러 데이븐포트 / 🇨🇳 노아 / 🇯🇵 오구라 유이",
  metadata: {
    name: "에버나이트",
    language: "🇰🇷 에버나이트 / 🇺🇸 Evernight / 🇨🇳 长夜月 / 🇯🇵 長夜月 ",
    element: "얼음",
    path: "기억",
    rarity: 5,
    affiliation: "앰포리어스",
    cv: "🇰🇷 정혜원 / 🇺🇸 스카일러 데이븐포트 / 🇨🇳 노아 / 🇯🇵 오구라 유이",
    releaseVersion: "3.6",
    brief: "세상과 단절된 기억의 영역, 촛불은 과거를 비추고 안개 속에서 조용히 사그라든다.\n그 그림자 속에서 온 기억의 아이 에버나이트, 「세월」의 불씨를 은닉한 황금의 후예여, 「망각」의 물결을 일으켜 거울 속 존재의 염원을 지켜라.\n——「걱정하지 마. 내가 『개척』의 앞길을 지켜줄게…. 그 어떤 대가를 치르더라도♭」"
  },
  baseStats: createHsrBaseStats(
    [180, 350, 512, 673, 835, 996, 1158, 1319],
    [74, 144, 211, 277, 344, 410, 477, 543],
    [79, 154, 226, 297, 368, 440, 511, 582],
    99, 100, 240
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "308,000", 3),
      createMaterial("세이렌의 지느러미 잔해", 65, 4),
      createMaterial("있는 듯 없는 듯한 조짐", 15, 2),
      createMaterial("점점 가까워지는 비명", 15, 3),
      createMaterial("끝없는 탄식", 15, 4)
    ],
    traces: [
      createMaterial("신용 포인트", "2,221,500", 3),
      createMaterial("운명의 발자취", 8, 5),
      createMaterial("태양과 번개의 회상", 12, 4),
      createMaterial("사량의 씨앗", 18, 2),
      createMaterial("말나 새싹", 69, 3),
      createMaterial("아뢰야 꽃", 139, 4),
      createMaterial("있는 듯 없는 듯한 조짐", 41, 2),
      createMaterial("점점 가까워지는 비명", 56, 3),
      createMaterial("끝없는 탄식", 58, 4)
    ]
  },
  skills: [
    createSkill("evernight.skill.basic.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "evernight.skill.basic.desc", "basic_atk_1"),
    createSkill("evernight.skill.skill.name", "전투 스킬 | 소환", "에너지 회복 30", "0", "-1", "evernight.skill.skill.desc", "skill_1"),
    createSkill("evernight.skill.ultimate.name", "필살기 | 범위 공격", "에너지 회복 5", "약점 격파 범위 30", "0", "evernight.skill.ultimate.desc", "ultimate_1"),
    createSkill("evernight.skill.talent.name", "특성 | 강화", "0", "0", "0", "evernight.skill.talent.desc", "talent_1"),
    createSkill("evernight.skill.technique.name", "비술 | 서포트", "0", "0", "0", "evernight.skill.technique.desc", "technique_1"),
    createSkill("evernight.skill.memo.name", "기억 정령 | 정보", "0", "0", "0", "evernight.skill.memo.desc", "memo"),
    createSkill("evernight.skill.memo_skill_1.name", "기억 정령 스킬 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "0", "evernight.skill.memo_skill_1.desc", "memo_skill_1"),
    createSkill("evernight.skill.memo_skill_2.name", "기억 정령 스킬 | 범위 공격", "에너지 회복 10", "약점 격파 단일 30 범위 20", "0", "evernight.skill.memo_skill_2.desc", "memo_skill_2"),
    createSkill("evernight.skill.memo_talent_1.name", "기억 정령 특성 | 서포트", "0", "0", "0", "evernight.skill.memo_talent_1.desc", "memo_talent_1"),
    createSkill("evernight.skill.memo_talent_2.name", "기억 정령 특성 | 강화", "0", "0", "0", "evernight.skill.memo_talent_2.desc", "memo_talent_1"),
    createSkill("evernight.skill.memo_talent_3.name", "기억 정령 특성 | 강화", "0", "0", "0", "evernight.skill.memo_talent_3.desc", "memo_talent_1")
  ],
  additionalAbilities: [
    { name: "evernight.bonus.1.name", description: "evernight.bonus.1.desc", icon: "bonus_1" },
    { name: "evernight.bonus.2.name", description: "evernight.bonus.2.desc", icon: "bonus_2" },
    { name: "evernight.bonus.3.name", description: "evernight.bonus.3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "18.7%", icon: "crit_rate" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "치명타 피해", value: "13.3%", icon: "crit_dmg" }
  ],
  eidolons: [
    { rank: "E01", name: "evernight.eidolon.1.name", description: "evernight.eidolon.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "evernight.eidolon.2.name", description: "evernight.eidolon.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "evernight.eidolon.3.name", description: "evernight.eidolon.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "evernight.eidolon.4.name", description: "evernight.eidolon.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "evernight.eidolon.5.name", description: "evernight.eidolon.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "evernight.eidolon.6.name", description: "evernight.eidolon.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기억 정령": "기억의 운명의 길 캐릭터가 소환하는 독립적인 개체. 자체적인 속도와 스킬을 보유하고 행동 서열에 등록되어 행동한다.",
    "제어류 디버프": "빙결, 얽힘, 속박, 도발, 강제, 제어불가 등 캐릭터의 행동을 직접적으로 방해하는 상태 이상.",
    "즉시 행동": "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.",
    "[기억 물질]": "에버나이트의 고유 자원. 누적량에 따라 제어 면역 효과를 제공하고, 기억 정령 스킬의 피해량을 강화한다.",
    "[가장 어두운 수수께끼]": "에버나이트가 필살기 발동 시 진입하는 상태. 적이 받는 피해가 증가하고 아군이 가하는 피해가 증가한다."
  }
};

export default evernight;
