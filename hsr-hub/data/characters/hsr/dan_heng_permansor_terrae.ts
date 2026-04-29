import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const danHengPermansorTerrae: Character = {
  id: "dan_heng_permansor_terrae",
  name: "character.dan_heng_permansor_terrae.name",
  folderName: "단항•등황",
  gameId: "hsr",
  attribute: "물리",
  path: "보존",
  rarity: 5,
  affiliation: "엠포리어스",
  briefInfo: "지오리오스의 가슴, 복룡의 몸은 부서진 대지를 지탱하며 천 년의 고통을 견딘다.\n무명객 단항, 「대지」의 불씨를 수호하는 황금의 후예. 기울어가는 팔황을 바로잡고, 지상의 생령들을 머나먼 세계로 인도하라.\n——모든 강물이 바다로 흘러 들어가고 뭇산이 함께 화답하니, 불멸의 길이 만 리에 걸쳐 이어지리라",
  version: "3.6",
  releaseVersion: "3.6",
  languageNames: "🇰🇷 단항•등황 / 🇺🇸 Dan Heng•Permansor Terrae / 🇨🇳 丹恒 • 騰 荒 / 🇯🇵 丹恒 • 騰 荒 ",
  voiceActors: "🇰🇷 김혜성 / 🇺🇸 니콜라스 렁 / 🇨🇳 위둥 / 🇯🇵 이토 켄토",
  metadata: {
    name: "character.dan_heng_permansor_terrae.metadata.name",
    language: "🇰🇷 단항•등황 / 🇺🇸 Dan Heng•Permansor Terrae / 🇨🇳 丹恒 • 騰 荒 / 🇯🇵 丹恒 • 騰 荒 ",
    element: "물리",
    path: "보존",
    rarity: 5,
    affiliation: "엠포리어스",
    cv: "🇰🇷 김혜성 / 🇺🇸 니콜라스 렁 / 🇨🇳 위둥 / 🇯🇵 이토 켄토",
    releaseVersion: "3.6",
    brief: "지오리오스의 가슴, 복룡의 몸은 부서진 대지를 지탱하며 천 년의 고통을 견딘다.\n무명객 단항, 「대지」의 불씨를 수호하는 황금의 후예. 기울어가는 팔황을 바로잡고, 지상의 생령들을 머나먼 세계로 인도하라.\n——모든 강물이 바다로 흘러 들어가고 뭇산이 함께 화답하니, 불멸의 길이 만 리에 걸쳐 이어지리라"
  },
  baseStats: createHsrBaseStats(
    [143, 278, 406, 535, 663, 791, 920, 1048], // HP
    [79, 154, 226, 297, 368, 440, 511, 582],   // ATK
    [106, 206, 301, 396, 491, 586, 681, 776],  // DEF
    97, 150, 135 // SPD, Taunt, Energy
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "308,000", 3),
      createMaterial("침략 응괴", 65, 4),
      createMaterial("공포에 짓밟힌 육신", 15, 2),
      createMaterial("용기에 찢긴 가슴", 15, 3),
      createMaterial("영광의 세례를 받은 육신", 15, 4)
    ],
    traces: [
      createMaterial("신용 포인트", "2,197,500", 3),
      createMaterial("운명의 발자취", 8, 5),
      createMaterial("태양과 번개의 회상", 12, 4),
      createMaterial("흩어진 별모래", 18, 2),
      createMaterial("유성 결정", 69, 3),
      createMaterial("신성한 앰버", 139, 4),
      createMaterial("공포에 짓밟힌 육신", 41, 2),
      createMaterial("용기에 찢긴 가슴", 56, 3),
      createMaterial("영광의 세례를 받은 육신", 58, 4)
    ]
  },
  skills: [
    createSkill("character.dan_heng_permansor_terrae.skills.0.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "character.dan_heng_permansor_terrae.skills.0.description", "basic_atk_1"),
    createSkill("character.dan_heng_permansor_terrae.skills.1.name", "전투 스킬 | 방어", "에너지 회복 30", "0", "-1", "character.dan_heng_permansor_terrae.skills.1.description", "skill_1"),
    createSkill("character.dan_heng_permansor_terrae.skills.2.name", "필살기 | 범위 공격", "에너지 회복 5", "약점 격파 범위 20", "0", "character.dan_heng_permansor_terrae.skills.2.description", "ultimate_1"),
    createSkill("character.dan_heng_permansor_terrae.skills.3.name", "특성 | 방어", "0", "약점 격파 범위 20", "0", "character.dan_heng_permansor_terrae.skills.3.description", "talent_1"),
    createSkill("character.dan_heng_permansor_terrae.skills.4.name", "비술 | 방해", "0", "0", "0", "character.dan_heng_permansor_terrae.skills.4.description", "technique_1")
  ],
  additionalAbilities: [
    { name: "character.dan_heng_permansor_terrae.additionalAbilities.0.name", description: "character.dan_heng_permansor_terrae.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.dan_heng_permansor_terrae.additionalAbilities.1.name", description: "character.dan_heng_permansor_terrae.additionalAbilities.1.description", icon: "bonus_2" },
    { name: "character.dan_heng_permansor_terrae.additionalAbilities.2.name", description: "character.dan_heng_permansor_terrae.additionalAbilities.2.description", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "방어력", value: "22.5%", icon: "def" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "character.dan_heng_permansor_terrae.eidolons.0.name", description: "character.dan_heng_permansor_terrae.eidolons.0.description", icon: "eidolon_1" },
    { rank: "E02", name: "character.dan_heng_permansor_terrae.eidolons.1.name", description: "character.dan_heng_permansor_terrae.eidolons.1.description", icon: "eidolon_2" },
    { rank: "E03", name: "character.dan_heng_permansor_terrae.eidolons.2.name", description: "character.dan_heng_permansor_terrae.eidolons.2.description", icon: "eidolon_3" },
    { rank: "E04", name: "character.dan_heng_permansor_terrae.eidolons.3.name", description: "character.dan_heng_permansor_terrae.eidolons.3.description", icon: "eidolon_4" },
    { rank: "E05", name: "character.dan_heng_permansor_terrae.eidolons.4.name", description: "character.dan_heng_permansor_terrae.eidolons.4.description", icon: "eidolon_5" },
    { rank: "E06", name: "character.dan_heng_permansor_terrae.eidolons.5.name", description: "character.dan_heng_permansor_terrae.eidolons.5.description", icon: "eidolon_6" }
  ],
  specialTerms: {
    "행동 게이지 증가": "character.dan_heng_permansor_terrae.specialTerms.0",
    "추가 공격": "character.dan_heng_permansor_terrae.specialTerms.1",
    "추가 피해": "character.dan_heng_permansor_terrae.specialTerms.2",
    "디버프 효과": "character.dan_heng_permansor_terrae.specialTerms.3",
    "[전우]": "character.dan_heng_permansor_terrae.specialTerms.4",
    "[용령]": "character.dan_heng_permansor_terrae.specialTerms.5"
  }
};

export default danHengPermansorTerrae;
