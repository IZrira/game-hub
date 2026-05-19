import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const cartethyia: WuwaCharacter = {
  id: "cartethyia",
  gameId: "ww",
  name: "character.cartethyia.name",
  folderName: "카르티시아",
  attribute: "기류",
  weaponType: "직검",
  rarity: 5,
  affiliation: "라군나",
  briefInfo: "character.cartethyia.briefInfo",
  metadata: {
    name: "character.cartethyia.name",
    brief: "character.cartethyia.briefInfo",
    element: "기류",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "2.4",
  languageNames: "🇰🇷 카르티시아 / 🇺🇸 Cartethyia / 🇨🇳 卡提希娅 / 🇯🇵 カル테지아",
  voiceActors: "🇰🇷 배하경 / 🇺🇸 Amanda Elizabeth Rischel / 🇨🇳 윈허췌이 / 🇯🇵 아사카와 유우",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "기류 피해 부스트", description: "파티 내 특정 캐릭터의 기류 피해 부스트 가능" },
    { label: "풍식", description: "풍식 효과 사용 가능" }
  ],
  baseStats: createWwBaseStats(
    [1184, 25, 50, 0],
    [3080, 65, 128, 0],
    [4867, 105, 202, 0],
    [5864, 126, 243, 0],
    [7652, 166, 317, 0],
    [9439, 206, 390, 0],
    [11226, 245, 464, 0],
    [13013, 279, 538, 0],
    [14800, 313, 611, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 4, 2),
      createMaterial("중주파수 침식 선형 구조물", 12, 3),
      createMaterial("고주파수 침식 선형 구조물", 12, 4),
      createMaterial("전주파수 침식 선형 구조물", 4, 5),
      createMaterial("불후의 영광", 46, 4),
      createMaterial("아이리스", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 25, 2),
      createMaterial("중주파수 침식 선형 구조물", 28, 3),
      createMaterial("고주파수 침식 선형 구조물", 40, 4),
      createMaterial("전주파수 침식 선형 구조물", 57, 5),
      createMaterial("붓꽃이 만발하던 날", 26, 4),
      createMaterial("비활성 금속 액적", 25, 3),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.cartethyia.skills.0.name", "기본 공격", "character.cartethyia.skills.0.description", "basic_1"),
    createWwSkill("character.cartethyia.skills.1.name", "공명 스킬", "character.cartethyia.skills.1.description", "skill_1"),
    createWwSkill("character.cartethyia.skills.2.name", "공명 회로", "character.cartethyia.skills.2.description", "talent_1"),
    createWwSkill("character.cartethyia.skills.3.name", "공명 해방", "character.cartethyia.skills.3.description", "ultimate_1"),
    createWwSkill("character.cartethyia.skills.4.name", "변주 스킬", "character.cartethyia.skills.4.description", "intro_1"),
    createWwSkill("character.cartethyia.skills.5.name", "반주 스킬", "character.cartethyia.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.cartethyia.additionalAbilities.0.name", description: "character.cartethyia.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.cartethyia.additionalAbilities.1.name", description: "character.cartethyia.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.cartethyia.eidolons.0.name", description: "character.cartethyia.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.cartethyia.eidolons.1.name", description: "character.cartethyia.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.cartethyia.eidolons.2.name", description: "character.cartethyia.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.cartethyia.eidolons.3.name", description: "character.cartethyia.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.cartethyia.eidolons.4.name", description: "character.cartethyia.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.cartethyia.eidolons.5.name", description: "character.cartethyia.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.cartethyia.terms.7.description"
  },
  terms: [
    { name: "character.cartethyia.terms.0.name", description: "character.cartethyia.terms.0.description" },
    { name: "character.cartethyia.terms.1.name", description: "character.cartethyia.terms.1.description" },
    { name: "character.cartethyia.terms.2.name", description: "character.cartethyia.terms.2.description" },
    { name: "character.cartethyia.terms.3.name", description: "character.cartethyia.terms.3.description" },
    { name: "character.cartethyia.terms.4.name", description: "character.cartethyia.terms.4.description" },
    { name: "character.cartethyia.terms.5.name", description: "character.cartethyia.terms.5.description" },
    { name: "character.cartethyia.terms.6.name", description: "character.cartethyia.terms.6.description" },
    { name: "character.cartethyia.terms.7.name", description: "character.cartethyia.terms.7.description" },
    { name: "character.cartethyia.terms.8.name", description: "character.cartethyia.terms.8.description" },
    { name: "character.cartethyia.terms.9.name", description: "character.cartethyia.terms.9.description" },
    { name: "character.cartethyia.terms.10.name", description: "character.cartethyia.terms.10.description" },
    { name: "character.cartethyia.terms.11.name", description: "character.cartethyia.terms.11.description" },
    { name: "character.cartethyia.terms.12.name", description: "character.cartethyia.terms.12.description" },
    { name: "character.cartethyia.terms.13.name", description: "character.cartethyia.terms.13.description" },
    { name: "character.cartethyia.terms.14.name", description: "character.cartethyia.terms.14.description" },
    { name: "character.cartethyia.terms.15.name", description: "character.cartethyia.terms.15.description" },
    { name: "character.cartethyia.terms.16.name", description: "character.cartethyia.terms.16.description" }
  ],
  skillInput: {
    overview: "character.cartethyia.skillInput.overview",
    inputs: [
      "character.cartethyia.skillInput.inputs.0",
      "character.cartethyia.skillInput.inputs.1",
      "character.cartethyia.skillInput.inputs.2",
      "character.cartethyia.skillInput.inputs.3",
      "character.cartethyia.skillInput.inputs.4"
    ]
  }
};

export default cartethyia;
