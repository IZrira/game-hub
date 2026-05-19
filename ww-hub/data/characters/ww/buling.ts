import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const buling: WuwaCharacter = {
  id: "buling",
  gameId: "ww",
  name: "character.buling.name",
  folderName: "복링",
  attribute: "전도",
  weaponType: "증폭기",
  rarity: 4,
  affiliation: "검은 해안",
  briefInfo: "character.buling.briefInfo",
  metadata: {
    name: "character.buling.name",
    brief: "character.buling.briefInfo",
    element: "전도",
    weapon: "증폭기",
    rarity: 4,
  },
  releaseVersion: "2.8",
  languageNames: "🇰🇷 복링 / 🇺🇸 Buling / 🇨🇳 卜灵 / 🇯🇵 卜灵",
  voiceActors: "🇰🇷 이유리 / 🇺🇸 리베카 요 / 🇨🇳 충충 / 🇯🇵 이시카와 유이",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" },
    { label: "전자", description: "전자 효과 사용 가능" }
  ],
  baseStats: createWwBaseStats(
    [850, 18, 103, 0],   // 1
    [2211, 47, 264, 0],  // 20
    [3494, 75, 416, 0],  // 30
    [4210, 91, 501, 0],  // 40
    [5493, 119, 652, 0], // 50
    [6776, 148, 804, 0], // 60
    [8059, 177, 956, 0], // 70
    [9342, 201, 1107, 0], // 80
    [10625, 225, 1259, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("오염된 꼭두각시 왕관", 46, 4),
      createMaterial("공작화", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("심해의 저주", 26, 5),
      createMaterial("렌토 와전류", 28, 2),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 4),
      createMaterial("프레스토 와전류", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.buling.skills.0.name", "일반 공격", "character.buling.skills.0.description", "basic_1"),
    createWwSkill("character.buling.skills.1.name", "공명 스킬", "character.buling.skills.1.description", "skill_1"),
    createWwSkill("character.buling.skills.2.name", "공명 회로", "character.buling.skills.2.description", "talent_1"),
    createWwSkill("character.buling.skills.3.name", "공명 해방", "character.buling.skills.3.description", "ultimate_1"),
    createWwSkill("character.buling.skills.4.name", "변주 스킬", "character.buling.skills.4.description", "intro_1"),
    createWwSkill("character.buling.skills.5.name", "반주 스킬", "character.buling.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.buling.additionalAbilities.0.name", description: "character.buling.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.buling.additionalAbilities.1.name", description: "character.buling.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.buling.eidolons.0.name", description: "character.buling.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.buling.eidolons.1.name", description: "character.buling.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.buling.eidolons.2.name", description: "character.buling.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.buling.eidolons.3.name", description: "character.buling.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.buling.eidolons.4.name", description: "character.buling.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.buling.eidolons.5.name", description: "character.buling.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    description: "character.buling.concertDissipation.description"
  },
  terms: [
    { name: "character.buling.terms.0.name", description: "character.buling.terms.0.description" },
    { name: "character.buling.terms.1.name", description: "character.buling.terms.1.description" },
    { name: "character.buling.terms.2.name", description: "character.buling.terms.2.description" },
    { name: "character.buling.terms.3.name", description: "character.buling.terms.3.description" },
    { name: "character.buling.terms.4.name", description: "character.buling.terms.4.description" }
  ],
  skillInput: {
    overview: "character.buling.skillInput.overview",
    hideGauge: true,
    inputs: []
  }
};

export default buling;
