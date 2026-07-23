import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const phoebe: WuwaCharacter = {
  id: "phoebe",
  gameId: "ww",
  name: "character.phoebe.name",
  folderName: "페비",
  attribute: "회절",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "깊은 바다 수도회",
  briefInfo: "character.phoebe.briefInfo",
  metadata: {
    name: "character.phoebe.name",
    brief: "character.phoebe.briefInfo",
    element: "회절",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "2.1",
  languageNames: "🇰🇷 페비 / 🇺🇸 Phoebe / 🇨🇳 菲比 / 🇯🇵 フィービー",
  voiceActors: "🇰🇷 이보용 / 🇺🇸 리베카 라챈스 / 🇨🇳 부정운 / 🇯🇵 혼도 카에데",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "광학", description: "광학 효과 사용 가능" }
  ],
  baseStats: createWwBaseStats(
    [866, 33, 103, 0],
    [2253, 86, 264, 0],
    [3560, 138, 416, 0],
    [4289, 166, 501, 0],
    [5597, 219, 652, 0],
    [6904, 271, 804, 0],
    [8211, 324, 956, 0],
    [9518, 368, 1107, 0],
    [10825, 413, 1259, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("속죄의 소라", 46, 4),
      createMaterial("폭죽 봉선화", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("사계의 단검", 26, 4),
      createMaterial("렌토 와전류", 25, 3),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 3),
      createMaterial("프레스토 와전류", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.phoebe.skills.0.name", "일반 공격", "character.phoebe.skills.0.description", "basic_1"),
    createWwSkill("character.phoebe.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.phoebe.skills.1.description", "skill_1"),
    createWwSkill("character.phoebe.skills.2.name", "공명 회로", "character.phoebe.skills.2.description", "talent_1"),
    createWwSkill("character.phoebe.skills.3.name", "공명 해방", "character.phoebe.skills.3.description", "ultimate_1"),
    createWwSkill("character.phoebe.skills.4.name", "변주 스킬", "character.phoebe.skills.4.description", "intro_1"),
    createWwSkill("character.phoebe.skills.5.name", "반주 스킬", "character.phoebe.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.phoebe.additionalAbilities.0.name", description: "character.phoebe.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.phoebe.additionalAbilities.1.name", description: "character.phoebe.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.phoebe.eidolons.0.name", description: "character.phoebe.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.phoebe.eidolons.1.name", description: "character.phoebe.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.phoebe.eidolons.2.name", description: "character.phoebe.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.phoebe.eidolons.3.name", description: "character.phoebe.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.phoebe.eidolons.4.name", description: "character.phoebe.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.phoebe.eidolons.5.name", description: "character.phoebe.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 증폭기",
    description: "character.phoebe.concertDissipation.description"
  },
  terms: [
    { name: "character.phoebe.terms.0.name", description: "character.phoebe.terms.0.description" },
    { name: "character.phoebe.terms.1.name", description: "character.phoebe.terms.1.description" },
    { name: "character.phoebe.terms.2.name", description: "character.phoebe.terms.2.description" },
    { name: "character.phoebe.terms.3.name", description: "character.phoebe.terms.3.description" }
  ],
  skillInput: {
    overview: "character.phoebe.skillInput.overview",
    inputs: [
      "character.phoebe.skillInput.inputs.0",
      "character.phoebe.skillInput.inputs.1"
    ]
  }
};

export default phoebe;
