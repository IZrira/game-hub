import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const chisa: WuwaCharacter = {
  id: "chisa",
  gameId: "ww",
  name: "character.chisa.name",
  folderName: "치사",
  attribute: "인멸",
  weaponType: "대검",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.chisa.briefInfo",
  metadata: {
    name: "character.chisa.name",
    brief: "character.chisa.briefInfo",
    element: "인멸",
    weapon: "대검",
    rarity: 5
  },
  releaseVersion: "2.8",
  languageNames: "🇰🇷 치사 / 🇺🇸 Chisa / 🇨🇳 千咲 / 🇯🇵 千咲",
  voiceActors: "🇰🇷 이주은 / 🇺🇸 리더 루이 / 🇨🇳 장뤄위 / 🇯🇵 카네모토 Hisako",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "암흑", description: "암흑 효과 사용 가능" }
  ],
  baseStats: createWwBaseStats(
    [862, 35, 93, 0],
    [2242, 91, 239, 0],
    [3543, 147, 375, 0],
    [4270, 176, 452, 0],
    [5571, 232, 589, 0],
    [6872, 288, 726, 0],
    [8173, 344, 863, 0],
    [9474, 391, 1000, 0],
    [10775, 438, 1137, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 취합 성핵", 4, 2),
      createMaterial("중주파수 취합 성핵", 12, 3),
      createMaterial("고주파수 취합 성핵", 12, 4),
      createMaterial("전주파수 취합 성핵", 4, 5),
      createMaterial("심해에 남은 침식물", 46, 4),
      createMaterial("영원한 여름", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("붓꽃이 만발하던 날", 26, 5),
      createMaterial("비명 이상 키메라 210", 25, 2),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.chisa.skills.0.name", "일반 공격", "character.chisa.skills.0.description", "basic_1"),
    createWwSkill("character.chisa.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.chisa.skills.1.description", "skill_1"),
    createWwSkill("character.chisa.skills.2.name", "공명 회로", "character.chisa.skills.2.description", "talent_1"),
    createWwSkill("character.chisa.skills.3.name", "공명 해방", "character.chisa.skills.3.description", "ultimate_1"),
    createWwSkill("character.chisa.skills.4.name", "변주 스킬", "character.chisa.skills.4.description", "intro_1"),
    createWwSkill("character.chisa.skills.5.name", "반주 스킬", "character.chisa.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.chisa.additionalAbilities.0.name", description: "character.chisa.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.chisa.additionalAbilities.1.name", description: "character.chisa.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.chisa.eidolons.0.name", description: "character.chisa.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.chisa.eidolons.1.name", description: "character.chisa.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.chisa.eidolons.2.name", description: "character.chisa.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.chisa.eidolons.3.name", description: "character.chisa.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.chisa.eidolons.4.name", description: "character.chisa.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.chisa.eidolons.5.name", description: "character.chisa.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.chisa.concertDissipation.description"
  },
  terms: [
    { name: "character.chisa.terms.0.name", description: "character.chisa.terms.0.description" },
    { name: "character.chisa.terms.1.name", description: "character.chisa.terms.1.description" },
    { name: "character.chisa.terms.2.name", description: "character.chisa.terms.2.description" },
    { name: "character.chisa.terms.3.name", description: "character.chisa.terms.3.description" },
    { name: "character.chisa.terms.4.name", description: "character.chisa.terms.4.description" },
    { name: "character.chisa.terms.5.name", description: "character.chisa.terms.5.description" },
    { name: "character.chisa.terms.6.name", description: "character.chisa.terms.6.description" },
    { name: "character.chisa.terms.7.name", description: "character.chisa.terms.7.description" },
    { name: "character.chisa.terms.8.name", description: "character.chisa.terms.8.description" },
    { name: "character.chisa.terms.9.name", description: "character.chisa.terms.9.description" }
  ],
  skillInput: {
    overview: "character.chisa.skillInput.overview",
    inputs: [
      "character.chisa.skillInput.inputs.0",
      "character.chisa.skillInput.inputs.1",
      "character.chisa.skillInput.inputs.2",
      "character.chisa.skillInput.inputs.3",
      "character.chisa.skillInput.inputs.4",
      "character.chisa.skillInput.inputs.5"
    ]
  }
};

export default chisa;
