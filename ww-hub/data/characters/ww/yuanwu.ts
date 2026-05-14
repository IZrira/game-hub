import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const yuanwu: WuwaCharacter = {
  id: "yuanwu",
  gameId: "ww",
  name: "character.yuanwu.name",
  folderName: "연무",
  attribute: "전도",
  weaponType: "권갑",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.yuanwu.briefInfo",
  metadata: {
    name: "character.yuanwu.name",
    brief: "character.yuanwu.briefInfo",
    element: "전도",
    weapon: "권갑",
    rarity: 4,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 연무 / 🇺🇸 Yuanwu / 🇨🇳 渊武 / 🇯🇵 渊武",
  voiceActors: "🇰🇷 박성태 / 🇺🇸 애덤 디글 / 🇨🇳 류베이천 / 🇯🇵 시로쿠마 히로시",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "공진 수치 파괴", description: "효과적으로 목표의 공진 수치 감소 가능" },
    { label: "경직 저항력", description: "파티 내 특정 캐릭터의 경직 저항력 향상 가능" }
  ],
  baseStats: createWwBaseStats(
    [682, 18, 134, 0],   // 1
    [1774, 47, 344, 0],  // 20
    [2803, 75, 541, 0],  // 30
    [3378, 91, 651, 0],  // 40
    [4407, 119, 849, 0], // 50
    [5437, 148, 1046, 0],// 60
    [6466, 177, 1243, 0],// 70
    [7496, 201, 1441, 0],// 80
    [8525, 225, 1638, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("벼락의 성핵", 46, 4),
      createMaterial("검은 연꽃", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("끊임없는 파괴", 26, 5),
      createMaterial("음률의 배주", 28, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.yuanwu.skills.0.name", "기본 공격", "character.yuanwu.skills.0.description", "basic_1"),
    createWwSkill("character.yuanwu.skills.1.name", "공명 스킬", "character.yuanwu.skills.1.description", "skill_1"),
    createWwSkill("character.yuanwu.skills.2.name", "공명 회로", "character.yuanwu.skills.2.description", "talent_1"),
    createWwSkill("character.yuanwu.skills.3.name", "공명 해방", "character.yuanwu.skills.3.description", "ultimate_1"),
    createWwSkill("character.yuanwu.skills.4.name", "변주 스킬", "character.yuanwu.skills.4.description", "intro_1"),
    createWwSkill("character.yuanwu.skills.5.name", "반주 스킬", "character.yuanwu.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.yuanwu.additionalAbilities.0.name", description: "character.yuanwu.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.yuanwu.additionalAbilities.1.name", description: "character.yuanwu.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.yuanwu.eidolons.0.name", description: "character.yuanwu.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.yuanwu.eidolons.1.name", description: "character.yuanwu.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.yuanwu.eidolons.2.name", description: "character.yuanwu.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.yuanwu.eidolons.3.name", description: "character.yuanwu.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.yuanwu.eidolons.4.name", description: "character.yuanwu.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.yuanwu.eidolons.5.name", description: "character.yuanwu.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 권갑",
    description: "character.yuanwu.concertDissipation.description"
  },
  terms: [
    { name: "character.yuanwu.terms.0.name", description: "character.yuanwu.terms.0.description" }
  ],
  skillInput: {
    overview: "character.yuanwu.skillInput.overview",
    inputs: [
      "character.yuanwu.skillInput.inputs.0"
    ]
  }
};

export default yuanwu;
