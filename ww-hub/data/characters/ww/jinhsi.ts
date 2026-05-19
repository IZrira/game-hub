import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const jinhsi: WuwaCharacter = {
  id: "jinhsi",
  gameId: "ww",
  name: "character.jinhsi.name",
  folderName: "금희",
  attribute: "회절",
  weaponType: "대검",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.jinhsi.briefInfo",
  metadata: {
    name: "character.jinhsi.name",
    brief: "character.jinhsi.briefInfo",
    element: "회절",
    weapon: "대검",
    rarity: 5,
  },
  baseStats: createWwBaseStats(
    [866, 33, 103, 0],
    [2253, 86, 264, 0],
    [3560, 138, 416, 0],
    [4289, 166, 501, 0],
    [5597, 219, 652, 0],
    [6904, 271, 804, 0],
    [8211, 324, 956, 0],
    [9518, 368, 1107, 0],
    [10825, 413, 1259, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("애가의 성핵", 46, 4),
      createMaterial("클레로덴드론", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("사계의 단검", 26, 4),
      createMaterial("비명 이상 키메라 210", 25, 3),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.jinhsi.skills.0.name", "기본 공격", "character.jinhsi.skills.0.description", "basic_1"),
    createWwSkill("character.jinhsi.skills.1.name", "공명 스킬", "character.jinhsi.skills.1.description", "skill_1"),
    createWwSkill("character.jinhsi.skills.2.name", "공명 회로", "character.jinhsi.skills.2.description", "talent_1"),
    createWwSkill("character.jinhsi.skills.3.name", "공명 해방", "character.jinhsi.skills.3.description", "ultimate_1"),
    createWwSkill("character.jinhsi.skills.4.name", "변주 스킬", "character.jinhsi.skills.4.description", "intro_1"),
    createWwSkill("character.jinhsi.skills.5.name", "반주 스킬", "character.jinhsi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.jinhsi.additionalAbilities.0.name", description: "character.jinhsi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.jinhsi.additionalAbilities.1.name", description: "character.jinhsi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.jinhsi.eidolons.0.name", description: "character.jinhsi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.jinhsi.eidolons.1.name", description: "character.jinhsi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.jinhsi.eidolons.2.name", description: "character.jinhsi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.jinhsi.eidolons.3.name", description: "character.jinhsi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.jinhsi.eidolons.4.name", description: "character.jinhsi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.jinhsi.eidolons.5.name", description: "character.jinhsi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.jinhsi.concertDissipation.description"
  },
  terms: [
    { name: "character.jinhsi.terms.0.name", description: "character.jinhsi.terms.0.description" },
    { name: "character.jinhsi.terms.1.name", description: "character.jinhsi.terms.1.description" },
    { name: "character.jinhsi.terms.2.name", description: "character.jinhsi.terms.2.description" }
  ],
  skillInput: {
    overview: "character.jinhsi.skillInput.overview",
    inputs: [
      "character.jinhsi.skillInput.inputs.0",
      "character.jinhsi.skillInput.inputs.1",
      "character.jinhsi.skillInput.inputs.2"
    ]
  },
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" }
  ],
  releaseVersion: "1.1",
  voiceActors: "박하진 / 애나 데블린 / 장위에 / 아오야마 요시노",
  languageNames: "금희 / Jinhsi / 今汐 / 今汐"
};

export default jinhsi;
