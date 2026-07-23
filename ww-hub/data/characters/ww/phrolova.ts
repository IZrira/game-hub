import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const phrolova: WuwaCharacter = {
  id: "phrolova",
  gameId: "ww",
  name: "character.phrolova.name",
  folderName: "플로로",
  attribute: "인멸",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "잔성회",
  briefInfo: "character.phrolova.briefInfo",
  metadata: {
    name: "character.phrolova.name",
    brief: "character.phrolova.briefInfo",
    element: "인멸",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "2.5",
  languageNames: "🇰🇷 플로로 / 🇺🇸 Phrolova / 🇨🇳 弗洛洛 / 🇯🇵 フロロ瓦",
  voiceActors: "🇰🇷 최하리 / 🇺🇸 레이 림 / 🇨🇳 장치 / 🇯🇵 후지타 사키",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" },
    { label: "인멸 피해 부스트", description: "파티 내 특정 캐릭터의 인멸 피해 부스트 가능" },
    { label: "강공격 피해 부스트", description: "파티 내 특정 캐릭터의 강공격 피해 부스트 가능" }
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
      createMaterial("잠언과 거짓말", 46, 4),
      createMaterial("「다음 생」", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("렌토 와전류", 25, 3),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 3),
      createMaterial("프레스토 와전류", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.phrolova.skills.0.name", "일반 공격", "character.phrolova.skills.0.description", "basic_1"),
    createWwSkill("character.phrolova.skills.1.name", "공명 스킬", "character.phrolova.skills.1.description", "skill_1"),
    createWwSkill("character.phrolova.skills.2.name", "공명 회로", "character.phrolova.skills.2.description", "talent_1"),
    createWwSkill("character.phrolova.skills.3.name", "공명 해방", "character.phrolova.skills.3.description", "ultimate_1"),
    createWwSkill("character.phrolova.skills.4.name", "변주 스킬", "character.phrolova.skills.4.description", "intro_1"),
    createWwSkill("character.phrolova.skills.5.name", "반주 스킬", "character.phrolova.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.phrolova.additionalAbilities.0.name", description: "character.phrolova.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.phrolova.additionalAbilities.1.name", description: "character.phrolova.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.phrolova.eidolons.0.name", description: "character.phrolova.eidolons.0.description", icon: "공명 체인1" },
    { rank: "R2", name: "character.phrolova.eidolons.1.name", description: "character.phrolova.eidolons.1.description", icon: "공명 체인2" },
    { rank: "R3", name: "character.phrolova.eidolons.2.name", description: "character.phrolova.eidolons.2.description", icon: "공명 체인3" },
    { rank: "R4", name: "character.phrolova.eidolons.3.name", description: "character.phrolova.eidolons.3.description", icon: "공명 체인4" },
    { rank: "R5", name: "character.phrolova.eidolons.4.name", description: "character.phrolova.eidolons.4.description", icon: "공명 체인5" },
    { rank: "R6", name: "character.phrolova.eidolons.5.name", description: "character.phrolova.eidolons.5.description", icon: "공명 체인6" }
  ],
  concertDissipation: {
    name: "character.phrolova.concertDissipation.name",
    description: "character.phrolova.concertDissipation.description"
  },
  terms: [
    { name: "character.phrolova.terms.0.name", description: "character.phrolova.terms.0.description" },
    { name: "character.phrolova.terms.1.name", description: "character.phrolova.terms.1.description" },
    { name: "character.phrolova.terms.2.name", description: "character.phrolova.terms.2.description" },
    { name: "character.phrolova.terms.3.name", description: "character.phrolova.terms.3.description" },
    { name: "character.phrolova.terms.4.name", description: "character.phrolova.terms.4.description" }
  ],
  skillInput: {
    overview: "character.phrolova.skillInput.overview",
    inputs: [
      "character.phrolova.skillInput.inputs.0",
      "character.phrolova.skillInput.inputs.1",
      "character.phrolova.skillInput.inputs.2",
      "character.phrolova.skillInput.inputs.3"
    ]
  }
};

export default phrolova;
