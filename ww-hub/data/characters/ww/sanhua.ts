import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const sanhua: WuwaCharacter = {
  id: "sanhua",
  gameId: "ww",
  name: "character.sanhua.name",
  folderName: "산화",
  attribute: "응결",
  weaponType: "직검",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.sanhua.briefInfo",
  metadata: {
    name: "character.sanhua.name",
    brief: "character.sanhua.briefInfo",
    element: "응결",
    weapon: "직검",
    rarity: 4,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 산화 / 🇺🇸 Sanhua / 🇨🇳 散华 / 🇯🇵 散華",
  voiceActors: "🇰🇷 유영 / 🇺🇸 제니퍼 아머 / 🇨🇳 송위엔위엔 / 🇯🇵 마츠다 리사에",
  roles: [
    { label: "빠른 협주", description: "짭은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해 부스트", description: "파티 내 특정 캐릭터의 일반 공격 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [805, 22, 77, 0],
    [2094, 57, 198, 0],
    [3309, 92, 311, 0],
    [3987, 111, 374, 0],
    [5202, 146, 488, 0],
    [6417, 181, 601, 0],
    [7632, 216, 714, 0],
    [8847, 245, 828, 0],
    [10062, 275, 941, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("음향의 성핵", 46, 4),
      createMaterial("인동국화", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("끊임없는 파괴", 26, 5),
      createMaterial("비활성 금속 액적", 28, 2),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.sanhua.skills.0.name", "일반 공격", "character.sanhua.skills.0.description", "basic_1"),
    createWwSkill("character.sanhua.skills.1.name", "공명 스킬", "character.sanhua.skills.1.description", "skill_1"),
    createWwSkill("character.sanhua.skills.2.name", "공명 회로", "character.sanhua.skills.2.description", "talent_1"),
    createWwSkill("character.sanhua.skills.3.name", "공명 해방", "character.sanhua.skills.3.description", "ultimate_1"),
    createWwSkill("character.sanhua.skills.4.name", "변주 스킬", "character.sanhua.skills.4.description", "intro_1"),
    createWwSkill("character.sanhua.skills.5.name", "반주 스킬", "character.sanhua.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.sanhua.additionalAbilities.0.name", description: "character.sanhua.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.sanhua.additionalAbilities.1.name", description: "character.sanhua.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.sanhua.eidolons.0.name", description: "character.sanhua.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.sanhua.eidolons.1.name", description: "character.sanhua.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.sanhua.eidolons.2.name", description: "character.sanhua.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.sanhua.eidolons.3.name", description: "character.sanhua.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.sanhua.eidolons.4.name", description: "character.sanhua.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.sanhua.eidolons.5.name", description: "character.sanhua.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.sanhua.concertDissipation.name",
    description: "character.sanhua.concertDissipation.description"
  },
  terms: [
    { name: "character.sanhua.terms.0.name", description: "character.sanhua.terms.0.description" },
    { name: "character.sanhua.terms.1.name", description: "character.sanhua.terms.1.description" },
    { name: "character.sanhua.terms.2.name", description: "character.sanhua.terms.2.description" }
  ],
  skillInput: {
    overview: "character.sanhua.skillInput.overview",
    inputs: [
      "character.sanhua.skillInput.inputs.0",
      "character.sanhua.skillInput.inputs.1",
      "character.sanhua.skillInput.inputs.2"
    ]
  }
};

export default sanhua;
