import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const verina: WuwaCharacter = {
  id: "verina",
  gameId: "ww",
  name: "character.verina.name",
  folderName: "벨리나",
  attribute: "회절",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.verina.briefInfo",
  metadata: {
    name: "character.verina.name",
    brief: "character.verina.briefInfo",
    element: "회절",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 벨리나 / 🇺🇸 Verina / 🇨🇳 维里奈 / 🇯🇵 ヴェリーナ",
  voiceActors: "🇰🇷 강새봄 / 🇺🇸 헤더 니콜 / 🇨🇳 자오솽 / 🇯🇵 사사하라 유우",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [1139, 27, 90, 0],
    [2963, 70, 231, 0],
    [4682, 113, 363, 0],
    [5642, 136, 438, 0],
    [7361, 179, 570, 0],
    [9080, 222, 703, 0],
    [10799, 265, 835, 0],
    [12518, 301, 968, 0],
    [14238, 338, 1100, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("애가의 성핵", 46, 4),
      createMaterial("개양귀비", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("비문 고종", 26, 4),
      createMaterial("렌토 와전류", 25, 3),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 3),
      createMaterial("프레스토 와전류", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.verina.skills.0.name", "일반 공격", "character.verina.skills.0.description", "basic_1"),
    createWwSkill("character.verina.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.verina.skills.1.description", "skill_1"),
    createWwSkill("character.verina.skills.2.name", "공명 회로", "character.verina.skills.2.description", "talent_1"),
    createWwSkill("character.verina.skills.3.name", "공명 해방", "character.verina.skills.3.description", "ultimate_1"),
    createWwSkill("character.verina.skills.4.name", "변주 스킬", "character.verina.skills.4.description", "intro_1"),
    createWwSkill("character.verina.skills.5.name", "반주 스킬", "character.verina.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.verina.additionalAbilities.0.name", description: "character.verina.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.verina.additionalAbilities.1.name", description: "character.verina.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.verina.eidolons.0.name", description: "character.verina.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.verina.eidolons.1.name", description: "character.verina.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.verina.eidolons.2.name", description: "character.verina.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.verina.eidolons.3.name", description: "character.verina.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.verina.eidolons.4.name", description: "character.verina.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.verina.eidolons.5.name", description: "character.verina.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 증폭기",
    description: "character.verina.concertDissipation.description"
  },
  terms: [
    { name: "character.verina.terms.0.name", description: "character.verina.terms.0.description" },
    { name: "character.verina.terms.1.name", description: "character.verina.terms.1.description" }
  ],
  skillInput: {
    overview: "character.verina.skillInput.overview",
    inputs: [
      "character.verina.skillInput.inputs.0",
      "character.verina.skillInput.inputs.1"
    ]
  }
};

export default verina;
