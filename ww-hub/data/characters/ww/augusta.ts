import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const augusta: WuwaCharacter = {
  id: "augusta",
  gameId: "ww",
  name: "character.augusta.name",
  folderName: "아우구스타",
  attribute: "전도",
  weaponType: "대검",
  rarity: 5,
  affiliation: "일곱 언덕",
  briefInfo: "character.augusta.briefInfo",
  metadata: {
    name: "character.augusta.name",
    brief: "character.augusta.briefInfo",
    element: "전도",
    weapon: "대검",
    rarity: 5
  },
  releaseVersion: "2.6",
  languageNames: "🇰🇷 아우구스타 / 🇺🇸 Augusta / 🇨🇳 奥古斯塔 / 🇯🇵 オーガ스타",
  voiceActors: "🇰🇷 이지현 / 🇺🇸 알릭스 윌튼 리건 / 🇨🇳 무쉐팅 / 🇯🇵 히카사 요코",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [824, 37, 91, 0],
    [2143, 96, 233, 0],
    [3387, 155, 367, 0],
    [4081, 186, 442, 0],
    [5325, 245, 576, 0],
    [6569, 304, 710, 0],
    [7813, 363, 844, 0],
    [9056, 413, 978, 0],
    [10300, 463, 1112, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 4, 2),
      createMaterial("중주파수 침식 선형 구조물", 12, 3),
      createMaterial("고주파수 침식 선형 구조물", 12, 4),
      createMaterial("전주파수 침식 선형 구조물", 4, 5),
      createMaterial("오염된 꼭두각시 왕관", 46, 4),
      createMaterial("빛나는 금잔", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 25, 2),
      createMaterial("중주파수 침식 선형 구조물", 28, 3),
      createMaterial("고주파수 침식 선형 구조물", 40, 4),
      createMaterial("전주파수 침식 선형 구조물", 57, 5),
      createMaterial("붓꽃이 만발하던 날", 26, 4),
      createMaterial("비명 이상 키메라 210", 28, 2),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.augusta.skills.0.name", "기본 공격", "character.augusta.skills.0.description", "basic_1"),
    createWwSkill("character.augusta.skills.1.name", "공명 스킬", "character.augusta.skills.1.description", "skill_1"),
    createWwSkill("character.augusta.skills.2.name", "공명 회로", "character.augusta.skills.2.description", "talent_1"),
    createWwSkill("character.augusta.skills.3.name", "공명 해방", "character.augusta.skills.3.description", "ultimate_1"),
    createWwSkill("character.augusta.skills.4.name", "변주 스킬", "character.augusta.skills.4.description", "intro_1"),
    createWwSkill("character.augusta.skills.5.name", "반주 스킬", "character.augusta.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.augusta.additionalAbilities.0.name", description: "character.augusta.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.augusta.additionalAbilities.1.name", description: "character.augusta.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.augusta.eidolons.0.name", description: "character.augusta.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.augusta.eidolons.1.name", description: "character.augusta.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.augusta.eidolons.2.name", description: "character.augusta.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.augusta.eidolons.3.name", description: "character.augusta.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.augusta.eidolons.4.name", description: "character.augusta.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.augusta.eidolons.5.name", description: "character.augusta.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.augusta.terms.6.description"
  },
  terms: [
    { name: "character.augusta.terms.0.name", description: "character.augusta.terms.0.description" },
    { name: "character.augusta.terms.1.name", description: "character.augusta.terms.1.description" },
    { name: "character.augusta.terms.2.name", description: "character.augusta.terms.2.description" },
    { name: "character.augusta.terms.3.name", description: "character.augusta.terms.3.description" },
    { name: "character.augusta.terms.4.name", description: "character.augusta.terms.4.description" },
    { name: "character.augusta.terms.5.name", description: "character.augusta.terms.5.description" },
    { name: "character.augusta.terms.6.name", description: "character.augusta.terms.6.description" }
  ],
  skillInput: {
    overview: "character.augusta.skillInput.overview",
    inputs: [
      "character.augusta.skillInput.inputs.0",
      "character.augusta.skillInput.inputs.1",
      "character.augusta.skillInput.inputs.2"
    ]
  }
};

export default augusta;
