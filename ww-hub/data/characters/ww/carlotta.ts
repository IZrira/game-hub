import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const carlotta: WuwaCharacter = {
  id: "carlotta",
  gameId: "ww",
  name: "character.carlotta.name",
  folderName: "카를로타",
  attribute: "응결",
  weaponType: "권총",
  rarity: 5,
  affiliation: "몬텔리 가문",
  briefInfo: "character.carlotta.briefInfo",
  metadata: {
    name: "character.carlotta.name",
    brief: "character.carlotta.briefInfo",
    element: "응결",
    weapon: "권총",
    rarity: 5,
  },
  releaseVersion: "2.0",
  languageNames: "🇰🇷 카를로타 / 🇺🇸 Carlotta / 🇨🇳 珂莱塔 / 🇯🇵 カルロッタ",
  voiceActors: "🇰🇷 김순미 / 🇺🇸 제니퍼 잉글리시 / 🇨🇳 웨예차오 / 🇯🇵 우에다 카나",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" }
  ],
  baseStats: createWwBaseStats(
    [996, 37, 98, 0],
    [2591, 96, 251, 0],
    [4094, 155, 396, 0],
    [4933, 186, 476, 0],
    [6437, 245, 621, 0],
    [7940, 304, 765, 0],
    [9443, 363, 909, 0],
    [10947, 413, 1054, 0],
    [12450, 463, 1198, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 취합 성핵", 4, 2),
      createMaterial("중주파수 취합 성핵", 12, 3),
      createMaterial("고주파수 취합 성핵", 12, 4),
      createMaterial("전주파수 취합 성핵", 4, 5),
      createMaterial("백금 기계의 심장", 46, 4),
      createMaterial("검창포꽃", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 5),
      createMaterial("헤테로 결정화 연소", 28, 2),
      createMaterial("조추출 결정화 연소", 28, 3),
      createMaterial("정류 결정화 연소", 55, 4),
      createMaterial("고순도 결정화 연소", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.carlotta.skills.0.name", "기본 공격", "character.carlotta.skills.0.description", "basic_1"),
    createWwSkill("character.carlotta.skills.1.name", "공명 스킬", "character.carlotta.skills.1.description", "skill_1"),
    createWwSkill("character.carlotta.skills.2.name", "공명 회로", "character.carlotta.skills.2.description", "talent_1"),
    createWwSkill("character.carlotta.skills.3.name", "공명 해방", "character.carlotta.skills.3.description", "ultimate_1"),
    createWwSkill("character.carlotta.skills.4.name", "변주 스킬", "character.carlotta.skills.4.description", "intro_1"),
    createWwSkill("character.carlotta.skills.5.name", "반주 스킬", "character.carlotta.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.carlotta.additionalAbilities.0.name", description: "character.carlotta.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.carlotta.additionalAbilities.1.name", description: "character.carlotta.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.carlotta.eidolons.0.name", description: "character.carlotta.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.carlotta.eidolons.1.name", description: "character.carlotta.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.carlotta.eidolons.2.name", description: "character.carlotta.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.carlotta.eidolons.3.name", description: "character.carlotta.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.carlotta.eidolons.4.name", description: "character.carlotta.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.carlotta.eidolons.5.name", description: "character.carlotta.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.carlotta.concertDissipation.name",
    description: "character.carlotta.concertDissipation.description"
  },
  terms: [
    { name: "character.carlotta.terms.0.name", description: "character.carlotta.terms.0.description" },
    { name: "character.carlotta.terms.1.name", description: "character.carlotta.terms.1.description" },
    { name: "character.carlotta.terms.2.name", description: "character.carlotta.terms.2.description" },
    { name: "character.carlotta.terms.3.name", description: "character.carlotta.terms.3.description" },
    { name: "character.carlotta.terms.4.name", description: "character.carlotta.terms.4.description" }
  ],
  skillInput: {
    overview: "character.carlotta.skillInput.overview",
    inputs: [
      "character.carlotta.skillInput.inputs.0",
      "character.carlotta.skillInput.inputs.1",
      "character.carlotta.skillInput.inputs.2"
    ]
  }
};

export default carlotta;
