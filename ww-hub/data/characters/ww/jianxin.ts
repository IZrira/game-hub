import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const jianxin: WuwaCharacter = {
  id: "jianxin",
  gameId: "ww",
  name: "character.jianxin.name",
  folderName: "감심",
  attribute: "기류",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.jianxin.briefInfo",
  metadata: {
    name: "character.jianxin.name",
    brief: "character.jianxin.briefInfo",
    element: "기류",
    weapon: "권갑",
    rarity: 5,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 감심 / 🇺🇸 Jianxin / 🇨🇳 鉴心 / 🇯🇵 鉴心",
  voiceActors: "🇰🇷 이은조 / 🇺🇸 이오애나 킴북 / 🇨🇳 장위 / 🇯🇵 안자이 치카",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "공명 해방 피해 부스트", description: "파티 내 특정 캐릭터의 공명 해방 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [1129, 27, 92, 0],   // 1
    [2937, 70, 236, 0],  // 20
    [4641, 113, 371, 0], // 30
    [5592, 136, 447, 0], // 40
    [7296, 179, 583, 0], // 50
    [9000, 222, 718, 0], // 60
    [10704, 265, 854, 0],// 70
    [12408, 301, 989, 0],// 80
    [14113, 338, 1124, 0] // 90
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
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("끊임없는 파괴", 26, 5),
      createMaterial("음률의 배주", 25, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.jianxin.skills.0.name", "일반 공격", "character.jianxin.skills.0.description", "basic_1"),
    createWwSkill("character.jianxin.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.jianxin.skills.1.description", "skill_1"),
    createWwSkill("character.jianxin.skills.2.name", "공명 회로", "character.jianxin.skills.2.description", "talent_1"),
    createWwSkill("character.jianxin.skills.3.name", "공명 해방", "character.jianxin.skills.3.description", "ultimate_1"),
    createWwSkill("character.jianxin.skills.4.name", "변주 스킬", "character.jianxin.skills.4.description", "intro_1"),
    createWwSkill("character.jianxin.skills.5.name", "반주 스킬", "character.jianxin.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.jianxin.additionalAbilities.0.name", description: "character.jianxin.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.jianxin.additionalAbilities.1.name", description: "character.jianxin.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.jianxin.eidolons.0.name", description: "character.jianxin.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.jianxin.eidolons.1.name", description: "character.jianxin.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.jianxin.eidolons.2.name", description: "character.jianxin.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.jianxin.eidolons.3.name", description: "character.jianxin.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.jianxin.eidolons.4.name", description: "character.jianxin.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.jianxin.eidolons.5.name", description: "character.jianxin.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.jianxin.concertDissipation.name",
    description: "character.jianxin.concertDissipation.description"
  },
  terms: [
    { name: "character.jianxin.terms.0.name", description: "character.jianxin.terms.0.description" },
    { name: "character.jianxin.terms.1.name", description: "character.jianxin.terms.1.description" },
    { name: "character.jianxin.terms.2.name", description: "character.jianxin.terms.2.description" },
    { name: "character.jianxin.terms.3.name", description: "character.jianxin.terms.3.description" },
    { name: "character.jianxin.terms.4.name", description: "character.jianxin.terms.4.description" },
    { name: "character.jianxin.terms.5.name", description: "character.jianxin.terms.5.description" },
    { name: "character.jianxin.terms.6.name", description: "character.jianxin.terms.6.description" },
    { name: "character.jianxin.terms.7.name", description: "character.jianxin.terms.7.description" },
    { name: "character.jianxin.terms.8.name", description: "character.jianxin.terms.8.description" }
  ],
  skillInput: {
    overview: "character.jianxin.skillInput.overview",
    inputs: [
      "character.jianxin.skillInput.inputs.0",
      "character.jianxin.skillInput.inputs.1",
      "character.jianxin.skillInput.inputs.2",
      "character.jianxin.skillInput.inputs.3",
      "character.jianxin.skillInput.inputs.4",
      "character.jianxin.skillInput.inputs.5"
    ]
  }
};

export default jianxin;
