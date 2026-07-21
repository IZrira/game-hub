import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const rover_electro: WuwaCharacter = {
  id: "rover_electro",
  gameId: "ww",
  name: "character.rover_electro.name",
  folderName: "방랑자 · 전도",
  attribute: "전도",
  weaponType: "직검",
  rarity: 5,
  affiliation: "알 수 없음",
  briefInfo: "character.rover_electro.briefInfo",
  isRover: true,
  metadata: {
    name: "character.rover_electro.name",
    brief: "character.rover_electro.briefInfo",
    element: "전도",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "2.4",
  languageNames: "🇰🇷 방랑자 · 전도 / 🇺🇸 Rover / 🇨🇳 漂泊者 / 🇯🇵 漂泊者",
  voiceActors: "🇰🇷 김신우&송하림 / 🇺🇸 Chase Brown & Jane Jackson / 🇨🇳 마양&장뤄위 / 🇯🇵 마스다 토시키&타나카 미나미",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" },
    { label: "풍식", description: "풍식 효과 사용 가능" }
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
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("신비한 암호", 5, 5),
      createMaterial("공작화", 60, 1)
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
    createWwSkill("character.rover_electro.skills.0.name", "기본 공격", "character.rover_electro.skills.0.description", "basic_1"),
    createWwSkill("character.rover_electro.skills.1.name", "공명 스킬", "character.rover_electro.skills.1.description", "skill_1"),
    createWwSkill("character.rover_electro.skills.2.name", "공명 회로", "character.rover_electro.skills.2.description", "talent_1"),
    createWwSkill("character.rover_electro.skills.3.name", "공명 해방", "character.rover_electro.skills.3.description", "ultimate_1"),
    createWwSkill("character.rover_electro.skills.4.name", "변주 스킬", "character.rover_electro.skills.4.description", "intro_1"),
    createWwSkill("character.rover_electro.skills.5.name", "반주 스킬", "character.rover_electro.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.rover_electro.additionalAbilities.0.name", description: "character.rover_electro.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.rover_electro.additionalAbilities.1.name", description: "character.rover_electro.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.rover_electro.eidolons.0.name", description: "character.rover_electro.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.rover_electro.eidolons.1.name", description: "character.rover_electro.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.rover_electro.eidolons.2.name", description: "character.rover_electro.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.rover_electro.eidolons.3.name", description: "character.rover_electro.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.rover_electro.eidolons.4.name", description: "character.rover_electro.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.rover_electro.eidolons.5.name", description: "character.rover_electro.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.rover_electro.concertDissipation.description"
  },
  terms: [
    { name: "character.rover_electro.terms.0.name", description: "character.rover_electro.terms.0.description" },
    { name: "character.rover_electro.terms.1.name", description: "character.rover_electro.terms.1.description" },
    { name: "character.rover_electro.terms.2.name", description: "character.rover_electro.terms.2.description" },
    { name: "character.rover_electro.terms.3.name", description: "character.rover_electro.terms.3.description" },
    { name: "character.rover_electro.terms.4.name", description: "character.rover_electro.terms.4.description" },
    { name: "character.rover_electro.terms.5.name", description: "character.rover_electro.terms.5.description" },
    { name: "character.rover_electro.terms.6.name", description: "character.rover_electro.terms.6.description" },
    { name: "character.rover_electro.terms.7.name", description: "character.rover_electro.terms.7.description" },
    { name: "character.rover_electro.terms.8.name", description: "character.rover_electro.terms.8.description" },
    { name: "character.rover_electro.terms.9.name", description: "character.rover_electro.terms.9.description" },
    { name: "character.rover_electro.terms.10.name", description: "character.rover_electro.terms.10.description" },
    { name: "character.rover_electro.terms.11.name", description: "character.rover_electro.terms.11.description" },
    { name: "character.rover_electro.terms.12.name", description: "character.rover_electro.terms.12.description" },
    { name: "character.rover_electro.terms.13.name", description: "character.rover_electro.terms.13.description" },
    { name: "character.rover_electro.terms.14.name", description: "character.rover_electro.terms.14.description" },
    { name: "character.rover_electro.terms.15.name", description: "character.rover_electro.terms.15.description" },
    { name: "character.rover_electro.terms.16.name", description: "character.rover_electro.terms.16.description" }
  ],
  skillInput: {
    overview: "character.rover_electro.skillInput.overview",
    inputs: [
      "character.rover_electro.skillInput.inputs.0",
      "character.rover_electro.skillInput.inputs.1",
      "character.rover_electro.skillInput.inputs.2",
      "character.rover_electro.skillInput.inputs.3"
    ]
  }
};

export default rover_electro;
