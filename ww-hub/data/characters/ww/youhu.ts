import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const youhu: WuwaCharacter = {
  id: "youhu",
  gameId: "ww",
  name: "character.youhu.name",
  folderName: "유호",
  attribute: "응결",
  weaponType: "권갑",
  rarity: 4,
  affiliation: "중주",
  briefInfo: "character.youhu.briefInfo",
  metadata: {
    name: "character.youhu.name",
    brief: "character.youhu.briefInfo",
    element: "응결",
    weapon: "권갑",
    rarity: 4,
  },
  releaseVersion: "1.3",
  languageNames: "🇰🇷 유호 / 🇺🇸 Youhu / 🇨🇳 釉瑚 / 🇯🇵 釉瑚",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 리어노라 헤이그 / 🇨🇳 류이레이 / 🇯🇵 토미타 미유",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" },
    { label: "공진 수치 파괴", description: "효과적으로 목표의 공진 수치 감소 가능" },
    { label: "협동 공격 피해 부스트", description: "파티 내 특정 캐릭터의 협동 공격 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [798, 21, 86, 0],
    [2076, 55, 221, 0],
    [3280, 88, 347, 0],
    [3953, 106, 418, 0],
    [5157, 139, 545, 0],
    [6362, 173, 671, 0],
    [7566, 206, 798, 0],
    [8770, 234, 925, 0],
    [9975, 263, 1051, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("고요한 위상", 46, 4),
      createMaterial("보라색 산호", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("비문 고종", 26, 5),
      createMaterial("음률의 배주", 28, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.youhu.skills.0.name", "일반 공격", "character.youhu.skills.0.description", "basic_1"),
    createWwSkill("character.youhu.skills.1.name", "공명 스킬", "character.youhu.skills.1.description", "skill_1"),
    createWwSkill("character.youhu.skills.2.name", "공명 회로", "character.youhu.skills.2.description", "talent_1"),
    createWwSkill("character.youhu.skills.3.name", "공명 해방", "character.youhu.skills.3.description", "ultimate_1"),
    createWwSkill("character.youhu.skills.4.name", "변주 스킬", "character.youhu.skills.4.description", "intro_1"),
    createWwSkill("character.youhu.skills.5.name", "반주 스킬", "character.youhu.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.youhu.additionalAbilities.0.name", description: "character.youhu.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.youhu.additionalAbilities.1.name", description: "character.youhu.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.youhu.eidolons.0.name", description: "character.youhu.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.youhu.eidolons.1.name", description: "character.youhu.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.youhu.eidolons.2.name", description: "character.youhu.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.youhu.eidolons.3.name", description: "character.youhu.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.youhu.eidolons.4.name", description: "character.youhu.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.youhu.eidolons.5.name", description: "character.youhu.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.youhu.concertDissipation.name",
    description: "character.youhu.concertDissipation.description"
  },
  terms: [
    { name: "character.youhu.terms.0.name", description: "character.youhu.terms.0.description" },
    { name: "character.youhu.terms.1.name", description: "character.youhu.terms.1.description" },
    { name: "character.youhu.terms.2.name", description: "character.youhu.terms.2.description" }
  ],
  skillInput: {
    overview: "character.youhu.skillInput.overview",
    inputs: [
      "character.youhu.skillInput.inputs.0",
      "character.youhu.skillInput.inputs.1",
      "character.youhu.skillInput.inputs.2"
    ]
  }
};

export default youhu;
