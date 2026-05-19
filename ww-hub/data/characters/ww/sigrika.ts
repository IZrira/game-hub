import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const sigrika: WuwaCharacter = {
  id: "sigrika",
  gameId: "ww",
  name: "character.sigrika.name",
  folderName: "시그리카",
  attribute: "기류",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "로야족",
  briefInfo: "character.sigrika.briefInfo",
  metadata: {
    name: "character.sigrika.name",
    brief: "character.sigrika.briefInfo",
    element: "기류",
    weapon: "권갑",
    rarity: 5
  },
  releaseVersion: "3.2",
  languageNames: "🇰🇷 시그리카 / 🇺🇸 Sigrika / 🇨🇳 西格莉卡 / 🇯🇵 シグ리카",
  voiceActors: "🇰🇷 장예나 / 🇺🇸 마야 린드 / 🇨🇳 첸천 / 🇯🇵 아카사키 치나츠",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "에코 어빌리티 피해", description: "에코 어빌리티 피해 비교적 높음" }
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
      createMaterial("파손된 엑소스웜 펜던트", 4, 2),
      createMaterial("허름한 엑소스웜 펜던트", 12, 3),
      createMaterial("흠집이 있는 엑소스웜 펜던트", 12, 4),
      createMaterial("완전한 엑소스웜 펜던트", 4, 5),
      createMaterial("고요한 위상", 46, 4),
      createMaterial("아르티메틱 셸", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("파손된 엑소스웜 펜던트", 25, 2),
      createMaterial("허름한 엑소스웜 펜던트", 28, 3),
      createMaterial("흠집이 있는 엑소스웜 펜던트", 40, 4),
      createMaterial("완전한 엑소스웜 펜던트", 57, 5),
      createMaterial("저주파수 비명 이상 결정 조각", 25, 2),
      createMaterial("중주파수 비명 이상 결정 조각", 28, 3),
      createMaterial("고주파수 비명 이상 결정 조각", 40, 4),
      createMaterial("전주파수 비명 이상 결정 조각", 57, 5),
      createMaterial("기억 속 금빛", 26, 4),
      createMaterial("음률의 배주", 25, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.sigrika.skills.0.name", "일반 공격", "character.sigrika.skills.0.description", "basic_1"),
    createWwSkill("character.sigrika.skills.1.name", "공명 스킬", "character.sigrika.skills.1.description", "skill_1"),
    createWwSkill("character.sigrika.skills.2.name", "공명 회로", "character.sigrika.skills.2.description", "talent_1"),
    createWwSkill("character.sigrika.skills.3.name", "공명 해방", "character.sigrika.skills.3.description", "ultimate_1"),
    createWwSkill("character.sigrika.skills.4.name", "변주 스킬", "character.sigrika.skills.4.description", "intro_1"),
    createWwSkill("character.sigrika.skills.5.name", "반주 스킬", "character.sigrika.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.sigrika.additionalAbilities.0.name", description: "character.sigrika.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.sigrika.additionalAbilities.1.name", description: "character.sigrika.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.sigrika.eidolons.0.name", description: "character.sigrika.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.sigrika.eidolons.1.name", description: "character.sigrika.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.sigrika.eidolons.2.name", description: "character.sigrika.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.sigrika.eidolons.3.name", description: "character.sigrika.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.sigrika.eidolons.4.name", description: "character.sigrika.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.sigrika.eidolons.5.name", description: "character.sigrika.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.sigrika.concertDissipation.name",
    description: "character.sigrika.concertDissipation.description"
  },
  terms: [
    { name: "character.sigrika.terms.0.name", description: "character.sigrika.terms.0.description" },
    { name: "character.sigrika.terms.1.name", description: "character.sigrika.terms.1.description" },
    { name: "character.sigrika.terms.2.name", description: "character.sigrika.terms.2.description" },
    { name: "character.sigrika.terms.3.name", description: "character.sigrika.terms.3.description" },
    { name: "character.sigrika.terms.4.name", description: "character.sigrika.terms.4.description" },
    { name: "character.sigrika.terms.5.name", description: "character.sigrika.terms.5.description" },
    { name: "character.sigrika.terms.6.name", description: "character.sigrika.terms.6.description" },
    { name: "character.sigrika.terms.7.name", description: "character.sigrika.terms.7.description" },
    { name: "character.sigrika.terms.8.name", description: "character.sigrika.terms.8.description" }
  ],
  skillInput: {
    hideGauge: true,
    overview: "character.sigrika.skillInput.overview",
    inputs: []
  }

};

export default sigrika;
