import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const zhezhi: WuwaCharacter = {
  id: "zhezhi",
  gameId: "ww",
  name: "character.zhezhi.name",
  folderName: "절지",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.zhezhi.briefInfo",
  metadata: {
    name: "character.zhezhi.name",
    brief: "character.zhezhi.briefInfo",
    element: "응결",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "1.2",
  languageNames: "🇰🇷 절지 / 🇺🇸 Zhezhi / 🇨🇳 折枝 / 🇯🇵 折枝",
  voiceActors: "🇰🇷 김하루 / 🇺🇸 신페이 첸 / 🇨🇳 먀오쯔 / 🇯🇵 마키노 유이",
    roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "공명 해방 차지", description: "파티 내 특정 캐릭터의 공명 에너지 회복 가능" },
    { label: "응결 피해 부스트", description: "파티 내 특정 캐릭터의 응결 피해 부스트 가능" },
    { label: "공명 스킬 피해 부스트", description: "파티 내 특정 캐릭터의 공명 스킬 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [980, 30, 98, 0],
    [2549, 78, 251, 0],
    [4028, 126, 396, 0],
    [4854, 151, 476, 0],
    [6333, 199, 621, 0],
    [7812, 247, 765, 0],
    [9292, 294, 909, 0],
    [10771, 335, 1054, 0],
    [12250, 375, 1198, 0]
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
    createWwSkill("character.zhezhi.skills.0.name", "일반 공격", "character.zhezhi.skills.0.description", "basic_1"),
    createWwSkill("character.zhezhi.skills.1.name", "공명 스킬", "character.zhezhi.skills.1.description", "skill_1"),
    createWwSkill("character.zhezhi.skills.2.name", "공명 회로", "character.zhezhi.skills.2.description", "talent_1"),
    createWwSkill("character.zhezhi.skills.3.name", "공명 해방", "character.zhezhi.skills.3.description", "ultimate_1"),
    createWwSkill("character.zhezhi.skills.4.name", "변주 스킬", "character.zhezhi.skills.4.description", "intro_1"),
    createWwSkill("character.zhezhi.skills.5.name", "반주 스킬", "character.zhezhi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.zhezhi.additionalAbilities.0.name", description: "character.zhezhi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.zhezhi.additionalAbilities.1.name", description: "character.zhezhi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.zhezhi.eidolons.0.name", description: "character.zhezhi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.zhezhi.eidolons.1.name", description: "character.zhezhi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.zhezhi.eidolons.2.name", description: "character.zhezhi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.zhezhi.eidolons.3.name", description: "character.zhezhi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.zhezhi.eidolons.4.name", description: "character.zhezhi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.zhezhi.eidolons.5.name", description: "character.zhezhi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.zhezhi.concertDissipation.name",
    description: "character.zhezhi.concertDissipation.description"
  },
    terms: [
    { name: "character.zhezhi.terms.0.name", description: "character.zhezhi.terms.0.description" },
    { name: "character.zhezhi.terms.1.name", description: "character.zhezhi.terms.1.description" },
    { name: "character.zhezhi.terms.2.name", description: "character.zhezhi.terms.2.description" }
  ],
    skillInput: {
    overview: "character.zhezhi.skillInput.overview",
    inputs: [
      "character.zhezhi.skillInput.inputs.0"
    ]
  }
};

export default zhezhi;
