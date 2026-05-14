import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const aalto: WuwaCharacter = {
  id: "aalto",
  gameId: "ww",
  name: "character.aalto.name",
  folderName: "알토",
  attribute: "기류",
  weaponType: "권총",
  rarity: 4,
  affiliation: "검은 해안",
  briefInfo: "character.aalto.briefInfo",
  metadata: {
    name: "character.aalto.name",
    brief: "character.aalto.briefInfo",
    element: "기류",
    weapon: "권총",
    rarity: 4,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 알토 / 🇺🇸 Aalto / 🇨🇳 秋水 / 🇯🇵 アール토",
  voiceActors: "🇰🇷 임채빈 / 🇺🇸 제임스 데이 / 🇨🇳 량다웨이 / 🇯🇵 이와사키 료타",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "기류 피해 부스트", description: "파티 내 특정 캐릭터의 기류 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [788, 21, 88, 0],   // 1
    [2050, 55, 226, 0],  // 20
    [3239, 88, 355, 0],  // 30
    [3903, 106, 428, 0], // 40
    [5092, 139, 557, 0], // 50
    [6282, 173, 687, 0], // 60
    [7471, 206, 816, 0], // 70
    [8661, 234, 946, 0], // 80
    [9850, 263, 1076, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("울부짖는 바위주먹", 46, 4),
      createMaterial("등롱초", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("비문 고종", 26, 5),
      createMaterial("헤테로 결정화 연소", 28, 2),
      createMaterial("조추출 결정화 연소", 28, 3),
      createMaterial("정류 결정화 연소", 55, 4),
      createMaterial("고순도 결정화 연소", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.aalto.skills.0.name", "일반 공격", "character.aalto.skills.0.description", "basic_1"),
    createWwSkill("character.aalto.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.aalto.skills.1.description", "skill_1"),
    createWwSkill("character.aalto.skills.2.name", "공명 회로", "character.aalto.skills.2.description", "talent_1"),
    createWwSkill("character.aalto.skills.3.name", "공명 해방", "character.aalto.skills.3.description", "ultimate_1"),
    createWwSkill("character.aalto.skills.4.name", "변주 스킬", "character.aalto.skills.4.description", "intro_1"),
    createWwSkill("character.aalto.skills.5.name", "반주 스킬", "character.aalto.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.aalto.additionalAbilities.0.name", description: "character.aalto.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.aalto.additionalAbilities.1.name", description: "character.aalto.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.aalto.eidolons.0.name", description: "character.aalto.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.aalto.eidolons.1.name", description: "character.aalto.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.aalto.eidolons.2.name", description: "character.aalto.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.aalto.eidolons.3.name", description: "character.aalto.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.aalto.eidolons.4.name", description: "character.aalto.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.aalto.eidolons.5.name", description: "character.aalto.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    description: "character.aalto.concertDissipation.description"
  },
  terms: [
    { name: "character.aalto.terms.0.name", description: "character.aalto.terms.0.description" },
    { name: "character.aalto.terms.1.name", description: "character.aalto.terms.1.description" },
    { name: "character.aalto.terms.2.name", description: "character.aalto.terms.2.description" }
  ],
  skillInput: {
    overview: "character.aalto.skillInput.overview",
    inputs: [
      "character.aalto.skillInput.inputs.0"
    ]
  }
};

export default aalto;
