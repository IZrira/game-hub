import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const brant: WuwaCharacter = {
  id: "brant",
  gameId: "ww",
  name: "character.brant.name",
  folderName: "브렌트",
  attribute: "용융",
  weaponType: "직검",
  rarity: 5,
  affiliation: "우인 극단",
  briefInfo: "character.brant.briefInfo",
  metadata: {
    name: "character.brant.name",
    brief: "character.brant.briefInfo",
    element: "용융",
    weapon: "직검",
    rarity: 5,
  },
  releaseVersion: "2.1",
  languageNames: "🇰🇷 브렌트 / 🇺🇸 Brant / 🇨🇳 布兰트 / 🇯🇵 ブラント",
  voiceActors: "🇰🇷 이주승 / 🇺🇸 효이 오그레이디 / 🇨🇳 莫然 / 🇯🇵 키시오 다이스케",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "용융 피해 부스트", description: "파티 내 특정 캐릭터의 용융 피해 부스트 가능" },
    { label: "공명 스킬 피해 부스트", description: "파티 내 특정 캐릭터의 공명 스킬 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [934, 30, 107, 0],    // 1
    [2429, 78, 275, 0],   // 20
    [3839, 126, 432, 0],  // 30
    [4626, 151, 520, 0],  // 40
    [6036, 199, 678, 0],  // 50
    [7446, 247, 835, 0],  // 60
    [8855, 294, 993, 0],  // 70
    [10265, 335, 1150, 0],// 80
    [11675, 375, 1308, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 침식 선형 구조물", 4, 2),
      createMaterial("중주파수 침식 선형 구조물", 12, 3),
      createMaterial("고주파수 침식 선형 구조물", 12, 4),
      createMaterial("전주파수 침식 선형 구조물", 4, 5),
      createMaterial("화염의 용뼈", 46, 4),
      createMaterial("「황금 양모」", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 침식 선형 구조물", 25, 2),
      createMaterial("중주파수 침식 선형 구조물", 28, 3),
      createMaterial("고주파수 침식 선형 구조물", 40, 4),
      createMaterial("전주파수 침식 선형 구조물", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("비활성 금속 액적", 28, 2),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.brant.skills.0.name", "기본 공격", "character.brant.skills.0.description", "basic_1"),
    createWwSkill("character.brant.skills.1.name", "공명 스킬", "character.brant.skills.1.description", "skill_1"),
    createWwSkill("character.brant.skills.2.name", "공명 회로", "character.brant.skills.2.description", "talent_1"),
    createWwSkill("character.brant.skills.3.name", "공명 해방", "character.brant.skills.3.description", "ultimate_1"),
    createWwSkill("character.brant.skills.4.name", "변주 스킬", "character.brant.skills.4.description", "intro_1"),
    createWwSkill("character.brant.skills.5.name", "반주 스킬", "character.brant.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.brant.additionalAbilities.0.name", description: "character.brant.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.brant.additionalAbilities.1.name", description: "character.brant.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.brant.eidolons.0.name", description: "character.brant.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.brant.eidolons.1.name", description: "character.brant.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.brant.eidolons.2.name", description: "character.brant.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.brant.eidolons.3.name", description: "character.brant.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.brant.eidolons.4.name", description: "character.brant.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.brant.eidolons.5.name", description: "character.brant.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.brant.concertDissipation.name",
    description: "character.brant.concertDissipation.description"
  },
  terms: [
    { name: "character.brant.terms.0.name", description: "character.brant.terms.0.description" },
    { name: "character.brant.terms.1.name", description: "character.brant.terms.1.description" },
    { name: "character.brant.terms.2.name", description: "character.brant.terms.2.description" },
    { name: "character.brant.terms.3.name", description: "character.brant.terms.3.description" },
    { name: "character.brant.terms.4.name", description: "character.brant.terms.4.description" }
  ],
  skillInput: {
    overview: "character.brant.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.brant.skillInput.inputs.0",
      "character.brant.skillInput.inputs.1"
    ]
  }
};

export default brant;
