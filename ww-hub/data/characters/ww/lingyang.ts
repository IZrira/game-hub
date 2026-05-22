import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const lingyang: WuwaCharacter = {
  id: "lingyang",
  gameId: "ww",
  name: "character.lingyang.name",
  folderName: "능양",
  attribute: "응결",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.lingyang.briefInfo",
  metadata: {
    name: "character.lingyang.name",
    brief: "character.lingyang.briefInfo",
    element: "응결",
    weapon: "권갑",
    rarity: 5
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 능양 / 🇺🇸 Lingyang / 🇨🇳 凌阳 / 🇯🇵 凌陽",
  voiceActors: "🇰🇷 이상호 / 🇺🇸 알렉산더 바라디안 / 🇨🇳 진리 / 🇯🇵 하나에 나츠키",
    roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" }
  ],
  baseStats: createWwBaseStats(
    [831, 35, 99, 0],
    [2162, 91, 254, 0],
    [3416, 147, 400, 0],
    [4116, 176, 481, 0],
    [5370, 232, 627, 0],
    [6625, 288, 773, 0],
    [7879, 344, 919, 0],
    [9133, 391, 1064, 0],
    [10388, 438, 1210, 0]
  ),
    materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("음향의 성핵", 46, 4),
      createMaterial("구름버섯", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("끊임없는 파괴", 26, 4),
      createMaterial("음률의 배주", 28, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.lingyang.skills.0.name", "일반 공격", "character.lingyang.skills.0.description", "basic_1"),
    createWwSkill("character.lingyang.skills.1.name", "공명 스킬", "character.lingyang.skills.1.description", "skill_1"),
    createWwSkill("character.lingyang.skills.2.name", "공명 회로", "character.lingyang.skills.2.description", "talent_1"),
    createWwSkill("character.lingyang.skills.3.name", "공명 해방", "character.lingyang.skills.3.description", "ultimate_1"),
    createWwSkill("character.lingyang.skills.4.name", "변주 스킬", "character.lingyang.skills.4.description", "intro_1"),
    createWwSkill("character.lingyang.skills.5.name", "반주 스킬", "character.lingyang.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.lingyang.additionalAbilities.0.name", description: "character.lingyang.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.lingyang.additionalAbilities.1.name", description: "character.lingyang.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.lingyang.eidolons.0.name", description: "character.lingyang.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.lingyang.eidolons.1.name", description: "character.lingyang.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.lingyang.eidolons.2.name", description: "character.lingyang.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.lingyang.eidolons.3.name", description: "character.lingyang.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.lingyang.eidolons.4.name", description: "character.lingyang.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.lingyang.eidolons.5.name", description: "character.lingyang.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.lingyang.concertDissipation.name",
    description: "character.lingyang.concertDissipation.description"
  },
    terms: [
    { name: "character.lingyang.terms.0.name", description: "character.lingyang.terms.0.description" },
    { name: "character.lingyang.terms.1.name", description: "character.lingyang.terms.1.description" },
    { name: "character.lingyang.terms.2.name", description: "character.lingyang.terms.2.description" }
  ],
    skillInput: {
    overview: "character.lingyang.skillInput.overview",
    inputs: [
      "character.lingyang.skillInput.inputs.0",
      "character.lingyang.skillInput.inputs.1",
      "character.lingyang.skillInput.inputs.2"
    ]
  }
};

export default lingyang;
