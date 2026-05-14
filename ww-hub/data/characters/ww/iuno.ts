import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const iuno: WuwaCharacter = {
  id: "iuno",
  gameId: "ww",
  name: "character.iuno.name",
  folderName: "유노",
  attribute: "기류",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "일곱 언덕",
  briefInfo: "character.iuno.briefInfo",
  metadata: {
    name: "character.iuno.name",
    brief: "character.iuno.briefInfo",
    element: "기류",
    weapon: "권갑",
    rarity: 5
  },
  releaseVersion: "2.6",
  languageNames: "🇰🇷 유노 / 🇺🇸 Iuno / 🇨🇳 尤诺 / 🇯🇵 ユー노",
  voiceActors: "🇰🇷 윤은서 / 🇺🇸 엘라 보이스 / 🇨🇳 장잉준 / 🇯🇵 Lynn",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "강공격 피해 부스트", description: "파티 내 특정 캐릭터의 강공격 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [842, 36, 92, 0],
    [2190, 94, 236, 0],
    [4171, 181, 447, 0],
    [4849, 151, 476, 0],
    [5441, 239, 583, 0],
    [6712, 296, 718, 0],
    [7983, 353, 854, 0],
    [9254, 402, 989, 0],
    [10525, 450, 1124, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 취합 성핵", 4, 2),
      createMaterial("중주파수 취합 성핵", 12, 3),
      createMaterial("고주파수 취합 성핵", 12, 4),
      createMaterial("전주파수 취합 성핵", 4, 5),
      createMaterial("심해에 남은 침식물", 46, 4),
      createMaterial("달맞이꽃", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("음률의 배주", 25, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.iuno.skills.0.name", "일반 공격", "character.iuno.skills.0.description", "basic_1"),
    createWwSkill("character.iuno.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.iuno.skills.1.description", "skill_1"),
    createWwSkill("character.iuno.skills.2.name", "공명 회로", "character.iuno.skills.2.description", "talent_1"),
    createWwSkill("character.iuno.skills.3.name", "공명 해방", "character.iuno.skills.3.description", "ultimate_1"),
    createWwSkill("character.iuno.skills.4.name", "변주 스킬", "character.iuno.skills.4.description", "intro_1"),
    createWwSkill("character.iuno.skills.5.name", "반주 스킬", "character.iuno.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.iuno.additionalAbilities.0.name", description: "character.iuno.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.iuno.additionalAbilities.1.name", description: "character.iuno.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.iuno.eidolons.0.name", description: "character.iuno.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.iuno.eidolons.1.name", description: "character.iuno.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.iuno.eidolons.2.name", description: "character.iuno.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.iuno.eidolons.3.name", description: "character.iuno.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.iuno.eidolons.4.name", description: "character.iuno.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.iuno.eidolons.5.name", description: "character.iuno.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.iuno.concertDissipation.name",
    description: "character.iuno.concertDissipation.description"
  },
  terms: [
    { name: "character.iuno.terms.0.name", description: "character.iuno.terms.0.description" },
    { name: "character.iuno.terms.1.name", description: "character.iuno.terms.1.description" },
    { name: "character.iuno.terms.2.name", description: "character.iuno.terms.2.description" },
    { name: "character.iuno.terms.3.name", description: "character.iuno.terms.3.description" },
    { name: "character.iuno.terms.4.name", description: "character.iuno.terms.4.description" },
    { name: "character.iuno.terms.5.name", description: "character.iuno.terms.5.description" },
    { name: "character.iuno.terms.6.name", description: "character.iuno.terms.6.description" },
    { name: "character.iuno.terms.7.name", description: "character.iuno.terms.7.description" },
    { name: "character.iuno.terms.8.name", description: "character.iuno.terms.8.description" },
    { name: "character.iuno.terms.9.name", description: "character.iuno.terms.9.description" },
    { name: "character.iuno.terms.10.name", description: "character.iuno.terms.10.description" },
    { name: "character.iuno.terms.11.name", description: "character.iuno.terms.11.description" },
    { name: "character.iuno.terms.12.name", description: "character.iuno.terms.12.description" },
    { name: "character.iuno.terms.13.name", description: "character.iuno.terms.13.description" },
    { name: "character.iuno.terms.14.name", description: "character.iuno.terms.14.description" },
    { name: "character.iuno.terms.15.name", description: "character.iuno.terms.15.description" },
    { name: "character.iuno.terms.16.name", description: "character.iuno.terms.16.description" },
    { name: "character.iuno.terms.17.name", description: "character.iuno.terms.17.description" },
    { name: "character.iuno.terms.18.name", description: "character.iuno.terms.18.description" }
  ],
  skillInput: {
    overview: "character.iuno.skillInput.overview",
    inputs: [
      "character.iuno.skillInput.inputs.0",
      "character.iuno.skillInput.inputs.1",
      "character.iuno.skillInput.inputs.2"
    ]
  }
};

export default iuno;
