import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const changli: WuwaCharacter = {
  id: "changli",
  gameId: "ww",
  name: "character.changli.name",
  folderName: "장리",
  attribute: "용융",
  weaponType: "직검",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.changli.briefInfo",
  metadata: {
    name: "character.changli.name",
    brief: "character.changli.briefInfo",
    element: "용융",
    weapon: "직검",
    rarity: 5,
  },
  releaseVersion: "1.1",
  languageNames: "🇰🇷 장리 / 🇺🇸 Changli / 🇨🇳 长离 / 🇯🇵 チョ우리",
  voiceActors: "🇰🇷 신나리 / 🇺🇸 애슐리 해대드 / 🇨🇳 무페이 / 🇯🇵 사이토 치와",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" },
    { label: "용융 피해 부스트", description: "파티 내 특정 캐릭터의 용융 피해 부스트 가능" },
    { label: "공명 해방 피해 부스트", description: "파티 내 특정 캐릭터의 공명 해방 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [831, 37, 90, 0],    // 1
    [2162, 96, 231, 0],   // 20
    [3416, 155, 363, 0],  // 30
    [4116, 186, 438, 0],  // 40
    [5370, 245, 570, 0],  // 50
    [6625, 304, 703, 0],  // 60
    [7879, 363, 835, 0],  // 70
    [9133, 413, 968, 0],  // 80
    [10388, 463, 1100, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("분노의 성핵", 46, 4),
      createMaterial("작령 열매", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("사계의 단검", 26, 4),
      createMaterial("비활성 금속 액적", 28, 2),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.changli.skills.0.name", "기본 공격", "character.changli.skills.0.description", "basic_1"),
    createWwSkill("character.changli.skills.1.name", "공명 스킬", "character.changli.skills.1.description", "skill_1"),
    createWwSkill("character.changli.skills.2.name", "공명 회로", "character.changli.skills.2.description", "talent_1"),
    createWwSkill("character.changli.skills.3.name", "공명 해방", "character.changli.skills.3.description", "ultimate_1"),
    createWwSkill("character.changli.skills.4.name", "변주 스킬", "character.changli.skills.4.description", "intro_1"),
    createWwSkill("character.changli.skills.5.name", "반주 스킬", "character.changli.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.changli.additionalAbilities.0.name", description: "character.changli.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.changli.additionalAbilities.1.name", description: "character.changli.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.changli.eidolons.0.name", description: "character.changli.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.changli.eidolons.1.name", description: "character.changli.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.changli.eidolons.2.name", description: "character.changli.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.changli.eidolons.3.name", description: "character.changli.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.changli.eidolons.4.name", description: "character.changli.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.changli.eidolons.5.name", description: "character.changli.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.changli.concertDissipation.name",
    description: "character.changli.concertDissipation.description"
  },
  terms: [
    { name: "character.changli.terms.0.name", description: "character.changli.terms.0.description" },
    { name: "character.changli.terms.1.name", description: "character.changli.terms.1.description" },
    { name: "character.changli.terms.2.name", description: "character.changli.terms.2.description" }
  ],
  skillInput: {
    overview: "character.changli.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.changli.skillInput.inputs.0",
      "character.changli.skillInput.inputs.1",
      "character.changli.skillInput.inputs.2"
    ]
  }
};

export default changli;
