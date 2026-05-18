import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const chixia: WuwaCharacter = {
  id: "chixia",
  gameId: "ww",
  name: "character.chixia.name",
  folderName: "치샤",
  attribute: "용융",
  weaponType: "권총",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.chixia.briefInfo",
  metadata: {
    name: "character.chixia.name",
    brief: "character.chixia.briefInfo",
    element: "용융",
    weapon: "권총",
    rarity: 4,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 치샤 / 🇺🇸 Chixia / 🇨🇳 炽霞 / 🇯🇵 熾霞",
  voiceActors: "🇰🇷 강은애 / 🇺🇸 해리엇 카마이클 / 🇨🇳 차이나 / 🇯🇵 나가세 안나",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" }
  ],
  baseStats: createWwBaseStats(
    [727, 24, 78, 0],
    [1891, 62, 200, 0],
    [2988, 101, 315, 0],
    [3601, 121, 379, 0],
    [4698, 159, 494, 0],
    [5796, 197, 609, 0],
    [6893, 236, 724, 0],
    [7990, 268, 839, 0],
    [9088, 300, 953, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("분노의 성핵", 46, 4),
      createMaterial("개양귀비", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("비문 고종", 26, 4),
      createMaterial("헤테로 결정화 연소", 28, 2),
      createMaterial("조추출 결정화 연소", 28, 3),
      createMaterial("정류 결정화 연소", 55, 4),
      createMaterial("고순도 결정화 연소", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.chixia.skills.0.name", "기본 공격", "character.chixia.skills.0.description", "basic_1"),
    createWwSkill("character.chixia.skills.1.name", "공명 스킬", "character.chixia.skills.1.description", "skill_1"),
    createWwSkill("character.chixia.skills.2.name", "공명 회로", "character.chixia.skills.2.description", "talent_1"),
    createWwSkill("character.chixia.skills.3.name", "공명 해방", "character.chixia.skills.3.description", "ultimate_1"),
    createWwSkill("character.chixia.skills.4.name", "변주 스킬", "character.chixia.skills.4.description", "intro_1"),
    createWwSkill("character.chixia.skills.5.name", "반주 스킬", "character.chixia.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.chixia.additionalAbilities.0.name", description: "character.chixia.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.chixia.additionalAbilities.1.name", description: "character.chixia.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.chixia.eidolons.0.name", description: "character.chixia.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.chixia.eidolons.1.name", description: "character.chixia.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.chixia.eidolons.2.name", description: "character.chixia.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.chixia.eidolons.3.name", description: "character.chixia.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.chixia.eidolons.4.name", description: "character.chixia.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.chixia.eidolons.5.name", description: "character.chixia.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.chixia.concertDissipation.name",
    description: "character.chixia.concertDissipation.description"
  },
  terms: [
    { name: "character.chixia.terms.0.name", description: "character.chixia.terms.0.description" },
    { name: "character.chixia.terms.1.name", description: "character.chixia.terms.1.description" }
  ],
  skillInput: {
    overview: "character.chixia.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.chixia.skillInput.inputs.0"
    ]
  }
};

export default chixia;
