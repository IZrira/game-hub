import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const lucilla: WuwaCharacter = {
  id: "lucilla",
  gameId: "ww",
  name: "character.lucilla.name",
  folderName: "루실라",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.lucilla.briefInfo",
  metadata: {
    name: "character.lucilla.name",
    brief: "character.lucilla.briefInfo",
    element: "응결",
    weapon: "증폭기",
    rarity: 5,
  },
  releaseVersion: "3.4",
  languageNames: "🇰🇷 루실라 / 🇺🇸 Lucilla / 🇨🇳 洛瑟菈 / 🇯🇵 ルシラー",
  voiceActors: "🇰🇷 민아 / 🇺🇸 루시 피시 / 🇨🇳 류이눠 / 🇯🇵 이토 시즈카",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "에코 어빌리티 피해 부스트", description: "파티 내 특정 캐릭터의 에코 어빌리티 피해를 부스트 시킨다" },
    { label: "서리", description: "서리 효과 사용 가능" },
    { label: "에코 어빌리티 피해", description: "에코 어빌리티 피해 비교적 높음" }
  ],
  baseStats: createWwBaseStats(
    [979, 30, 98, 10],
    [2546, 78, 251, 0],
    [4024, 155, 367, 0],
    [4849, 126, 476, 0],
    [6327, 151, 621, 0],
    [7804, 247, 765, 0],
    [9282, 294, 909, 0],
    [10760, 335, 1054, 0],
    [12238, 375, 1198, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 메카 성핵", 4, 2),
      createMaterial("중주파수 메카 성핵", 12, 3),
      createMaterial("고주파수 메카 성핵", 12, 4),
      createMaterial("전주파수 메카 성핵", 4, 5),
      createMaterial("태양을 노리는 손끝", 46, 4),
      createMaterial("물망초", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 메카 성핵", 25, 2),
      createMaterial("중주파수 메카 성핵", 28, 3),
      createMaterial("고주파수 메카 성핵", 40, 4),
      createMaterial("전주파수 메카 성핵", 57, 5),
      createMaterial("되묻는 우리", 26, 5),
      createMaterial("긁어모은 현", 25, 2),
      createMaterial("끊어진 현", 28, 3),
      createMaterial("응고된 현", 55, 4),
      createMaterial("노래하는 현", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.lucilla.skills.0.name", "일반 공격", "character.lucilla.skills.0.description", "basic_1"),
    createWwSkill("character.lucilla.skills.1.name", "공명 스킬", "character.lucilla.skills.1.description", "skill_1"),
    createWwSkill("character.lucilla.skills.2.name", "공명 회로", "character.lucilla.skills.2.description", "talent_1"),
    createWwSkill("character.lucilla.skills.3.name", "공명 해방", "character.lucilla.skills.3.description", "ultimate_1"),
    createWwSkill("character.lucilla.skills.4.name", "변주 스킬", "character.lucilla.skills.4.description", "intro_1"),
    createWwSkill("character.lucilla.skills.5.name", "반주 스킬", "character.lucilla.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.lucilla.additionalAbilities.0.name", description: "character.lucilla.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.lucilla.additionalAbilities.1.name", description: "character.lucilla.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.lucilla.eidolons.0.name", description: "character.lucilla.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.lucilla.eidolons.1.name", description: "character.lucilla.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.lucilla.eidolons.2.name", description: "character.lucilla.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.lucilla.eidolons.3.name", description: "character.lucilla.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.lucilla.eidolons.4.name", description: "character.lucilla.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.lucilla.eidolons.5.name", description: "character.lucilla.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.lucilla.concertDissipation.name",
    description: "character.lucilla.concertDissipation.description"
  },
  terms: [
    { name: "character.lucilla.terms.0.name", description: "character.lucilla.terms.0.description" },
    { name: "character.lucilla.terms.1.name", description: "character.lucilla.terms.1.description" },
    { name: "character.lucilla.terms.2.name", description: "character.lucilla.terms.2.description" },
    { name: "character.lucilla.terms.3.name", description: "character.lucilla.terms.3.description" },
    { name: "character.lucilla.terms.4.name", description: "character.lucilla.terms.4.description" },
    { name: "character.lucilla.terms.5.name", description: "character.lucilla.terms.5.description" }
  ],
  skillInput: {
    overview: "character.lucilla.skillInput.overview",
    inputs: [
      "character.lucilla.skillInput.inputs.0",
      "character.lucilla.skillInput.inputs.1",
      "character.lucilla.skillInput.inputs.2"
    ]
  }
};

export default lucilla;
