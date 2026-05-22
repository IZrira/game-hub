import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const baizhi: WuwaCharacter = {
  id: "baizhi",
  gameId: "ww",
  name: "character.baizhi.name",
  folderName: "설지",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.baizhi.briefInfo",
  metadata: {
    name: "character.baizhi.name",
    brief: "character.baizhi.briefInfo",
    element: "응결",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 설지 / 🇺🇸 Baizhi / 🇨🇳 白芷 / 🇯🇵 白芷",
  voiceActors: "🇰🇷 성예원 / 🇺🇸 서맨사 데이킨 / 🇨🇳 천팅팅 / 🇯🇵 세토 아사미",
    roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [1025, 17, 82, 0],
    [2666, 44, 210, 0],
    [4213, 71, 331, 0],
    [5077, 86, 399, 0],
    [6624, 113, 519, 0],
    [8171, 140, 640, 0],
    [9718, 167, 761, 0],
    [11265, 190, 882, 0],
    [12813, 213, 1002, 0]
  ),
    materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("음향의 성핵", 46, 4),
      createMaterial("등롱초", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("비문 고종", 26, 5),
      createMaterial("렌토 와전류", 28, 2),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 4),
      createMaterial("프레스토 와전류", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.baizhi.skills.0.name", "일반 공격", "character.baizhi.skills.0.description", "basic_1"),
    createWwSkill("character.baizhi.skills.1.name", "공명 스킬", "character.baizhi.skills.1.description", "skill_1"),
    createWwSkill("character.baizhi.skills.2.name", "공명 회로", "character.baizhi.skills.2.description", "talent_1"),
    createWwSkill("character.baizhi.skills.3.name", "공명 해방", "character.baizhi.skills.3.description", "ultimate_1"),
    createWwSkill("character.baizhi.skills.4.name", "변주 스킬", "character.baizhi.skills.4.description", "intro_1"),
    createWwSkill("character.baizhi.skills.5.name", "반주 스킬", "character.baizhi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.baizhi.additionalAbilities.0.name", description: "character.baizhi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.baizhi.additionalAbilities.1.name", description: "character.baizhi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.baizhi.eidolons.0.name", description: "character.baizhi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.baizhi.eidolons.1.name", description: "character.baizhi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.baizhi.eidolons.2.name", description: "character.baizhi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.baizhi.eidolons.3.name", description: "character.baizhi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.baizhi.eidolons.4.name", description: "character.baizhi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.baizhi.eidolons.5.name", description: "character.baizhi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.baizhi.concertDissipation.name",
    description: "character.baizhi.concertDissipation.description"
  },
    terms: [
    { name: "character.baizhi.terms.0.name", description: "character.baizhi.terms.0.description" },
    { name: "character.baizhi.terms.1.name", description: "character.baizhi.terms.1.description" },
    { name: "character.baizhi.terms.2.name", description: "character.baizhi.terms.2.description" }
  ],
    skillInput: {
    overview: "character.baizhi.skillInput.overview",
    inputs: [
      "character.baizhi.skillInput.inputs.0",
      "character.baizhi.skillInput.inputs.1"
    ]
  }
};

export default baizhi;
