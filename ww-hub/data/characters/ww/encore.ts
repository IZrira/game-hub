import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const encore: WuwaCharacter = {
  id: "encore",
  gameId: "ww",
  name: "character.encore.name",
  folderName: "앙코",
  attribute: "용융",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "검은 해안",
  briefInfo: "character.encore.briefInfo",
  metadata: {
    name: "character.encore.name",
    brief: "character.encore.briefInfo",
    element: "용융",
    weapon: "증폭기",
    rarity: 5,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 앙코 / 🇺🇸 Encore / 🇨🇳 安可 / 🇯🇵 アン코",
  voiceActors: "🇰🇷 이세레나 / 🇺🇸 카리나 리브스 / 🇨🇳 하오시바이 / 🇯🇵 이부키 치카노",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" }
  ],
  baseStats: createWwBaseStats(
    [841, 34, 102, 0],
    [2188, 88, 262, 0],
    [3457, 143, 412, 0],
    [4166, 171, 496, 0],
    [5435, 225, 646, 0],
    [6704, 280, 796, 0],
    [7974, 334, 946, 0],
    [9243, 379, 1097, 0],
    [10513, 425, 1247, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("분노의 성핵", 46, 4),
      createMaterial("공작화", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("끊임없는 파괴", 26, 4),
      createMaterial("렌토 와전류", 28, 2),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 4),
      createMaterial("프레스토 와전류", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.encore.skills.0.name", "기본 공격", "character.encore.skills.0.description", "basic_1"),
    createWwSkill("character.encore.skills.1.name", "공명 스킬", "character.encore.skills.1.description", "skill_1"),
    createWwSkill("character.encore.skills.2.name", "공명 회로", "character.encore.skills.2.description", "talent_1"),
    createWwSkill("character.encore.skills.3.name", "공명 해방", "character.encore.skills.3.description", "ultimate_1"),
    createWwSkill("character.encore.skills.4.name", "변주 스킬", "character.encore.skills.4.description", "intro_1"),
    createWwSkill("character.encore.skills.5.name", "반주 스킬", "character.encore.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.encore.additionalAbilities.0.name", description: "character.encore.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.encore.additionalAbilities.1.name", description: "character.encore.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.encore.eidolons.0.name", description: "character.encore.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.encore.eidolons.1.name", description: "character.encore.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.encore.eidolons.2.name", description: "character.encore.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.encore.eidolons.3.name", description: "character.encore.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.encore.eidolons.4.name", description: "character.encore.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.encore.eidolons.5.name", description: "character.encore.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.encore.concertDissipation.name",
    description: "character.encore.concertDissipation.description"
  },
  terms: [
    { name: "character.encore.terms.0.name", description: "character.encore.terms.0.description" }
  ],
  skillInput: {
    overview: "character.encore.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.encore.skillInput.inputs.0",
      "character.encore.skillInput.inputs.1",
      "character.encore.skillInput.inputs.2",
      "character.encore.skillInput.inputs.3"
    ]
  }
};

export default encore;
