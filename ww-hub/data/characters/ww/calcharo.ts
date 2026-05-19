import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const calcharo: WuwaCharacter = {
  id: "calcharo",
  gameId: "ww",
  name: "character.calcharo.name",
  folderName: "카카루",
  attribute: "전도",
  weaponType: "대검",
  rarity: 5,
  affiliation: "유령사냥단 용병단",
  briefInfo: "character.calcharo.briefInfo",
  metadata: {
    name: "character.calcharo.name",
    brief: "character.calcharo.briefInfo",
    element: "전도",
    weapon: "대검",
    rarity: 5,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 카카루 / 🇺🇸 Calcharo / 🇨🇳 卡卡罗 / 🇯🇵 カカロ",
  voiceActors: "🇰🇷 박민기 / 🇺🇸 벤 큐라 / 🇨🇳 쉬샹 / 🇯🇵 모리카와 토시유키",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" }
  ],
  baseStats: createWwBaseStats(
    [840, 35, 97, 0],   // 1
    [2185, 91, 249, 0],  // 20
    [3453, 147, 392, 0], // 30
    [4161, 176, 472, 0], // 40
    [5429, 232, 614, 0], // 50
    [6696, 288, 757, 0], // 60
    [7964, 344, 900, 0], // 70
    [9232, 391, 1043, 0], // 80
    [10500, 438, 1186, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("번개의 성핵", 46, 4),
      createMaterial("붓꽃", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("비문 고종", 26, 5),
      createMaterial("비명 이상 키메라 210", 28, 2),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.calcharo.skills.0.name", "일반 공격", "character.calcharo.skills.0.description", "basic_1"),
    createWwSkill("character.calcharo.skills.1.name", "공명 스킬", "character.calcharo.skills.1.description", "skill_1"),
    createWwSkill("character.calcharo.skills.2.name", "공명 회로", "character.calcharo.skills.2.description", "talent_1"),
    createWwSkill("character.calcharo.skills.3.name", "공명 해방", "character.calcharo.skills.3.description", "ultimate_1"),
    createWwSkill("character.calcharo.skills.4.name", "변주 스킬", "character.calcharo.skills.4.description", "intro_1"),
    createWwSkill("character.calcharo.skills.5.name", "반주 스킬", "character.calcharo.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.calcharo.additionalAbilities.0.name", description: "character.calcharo.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.calcharo.additionalAbilities.1.name", description: "character.calcharo.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.calcharo.eidolons.0.name", description: "character.calcharo.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.calcharo.eidolons.1.name", description: "character.calcharo.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.calcharo.eidolons.2.name", description: "character.calcharo.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.calcharo.eidolons.3.name", description: "character.calcharo.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.calcharo.eidolons.4.name", description: "character.calcharo.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.calcharo.eidolons.5.name", description: "character.calcharo.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    description: "character.calcharo.concertDissipation.description"
  },
  terms: [
    { name: "character.calcharo.terms.0.name", description: "character.calcharo.terms.0.description" }
  ],
  skillInput: {
    overview: "character.calcharo.skillInput.overview",
    inputs: [
      { description: "character.calcharo.skillInput.inputs.0" },
      { description: "character.calcharo.skillInput.inputs.1" }
    ]
  }
};

export default calcharo;
