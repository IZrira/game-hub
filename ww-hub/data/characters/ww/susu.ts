import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const susu: WuwaCharacter = {
  id: "susu",
  gameId: "ww",
  name: "character.susu.name",
  folderName: "수수",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.susu.briefInfo",
  metadata: {
    name: "character.susu.name",
    brief: "character.susu.briefInfo",
    element: "응결",
    weapon: "증폭기",
    rarity: 5,
  },
  releaseVersion: "3.5",
  languageNames: "🇰🇷 수수 / 🇺🇸 Yangyang / 🇨🇳 秧秧 / 🇯🇵 秧秧",
  voiceActors: "🇰🇷 이유리 / 🇺🇸 리베카 요 / 🇨🇳 충충 / 🇯🇵 이시카와 유이",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "공명 해방 차지", description: "파티 내 특정 캐릭터의 공명 에너지 회복 가능" }
  ],
  baseStats: createWwBaseStats(
    [816, 20, 90, 0],    // 1
    [2122, 52, 231, 0],  // 20
    [3354, 84, 363, 0],  // 30
    [4042, 101, 438, 0], // 40
    [5273, 133, 570, 0], // 50
    [6505, 164, 703, 0], // 60
    [7737, 196, 835, 0], // 70
    [8968, 223, 968, 0], // 80
    [10200, 250, 1100, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("울부짖는 바위주먹", 46, 4),
      createMaterial("인동국화", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("끊임없는 파괴", 26, 5),
      createMaterial("비활성 금속 액적", 28, 2),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.susu.skills.0.name", "일반 공격", "character.susu.skills.0.description", "basic_1"),
    createWwSkill("character.susu.skills.1.name", "공명 스킬", "character.susu.skills.1.description", "skill_1"),
    createWwSkill("character.susu.skills.2.name", "공명 회로", "character.susu.skills.2.description", "talent_1"),
    createWwSkill("character.susu.skills.3.name", "공명 해방", "character.susu.skills.3.description", "ultimate_1"),
    createWwSkill("character.susu.skills.4.name", "변주 스킬", "character.susu.skills.4.description", "intro_1"),
    createWwSkill("character.susu.skills.5.name", "반주 스킬", "character.susu.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.susu.additionalAbilities.0.name", description: "character.susu.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.susu.additionalAbilities.1.name", description: "character.susu.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.susu.eidolons.0.name", description: "character.susu.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.susu.eidolons.1.name", description: "character.susu.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.susu.eidolons.2.name", description: "character.susu.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.susu.eidolons.3.name", description: "character.susu.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.susu.eidolons.4.name", description: "character.susu.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.susu.eidolons.5.name", description: "character.susu.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    description: "character.susu.concertDissipation.description"
  },
  terms: [
    { name: "character.susu.terms.0.name", description: "character.susu.terms.0.description" }
  ],
  skillInput: {
    overview: "character.susu.skillInput.overview",
    inputs: [
      "character.susu.skillInput.inputs.0"
    ]
  }
};

export default susu;
