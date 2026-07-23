import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const rover_havoc: WuwaCharacter = {
  id: "rover_havoc",
  gameId: "ww",
  name: "character.rover_havoc.name",
  folderName: "방랑자 · 인멸",
  attribute: "인멸",
  weaponType: "직검",
  rarity: 5,
  affiliation: "알 수 없음",
  briefInfo: "character.rover_havoc.briefInfo",
  isRover: true,
  metadata: {
    name: "character.rover_havoc.name",
    brief: "character.rover_havoc.briefInfo",
    element: "인멸",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "조수 임무 제1장 제6막 클리어 후 획득",
  languageNames: "🇰🇷 방랑자 · 인멸 / 🇺🇸 Rover (Havoc) / 🇨🇳 漂泊者 / 🇯🇵 漂泊者",
  voiceActors: "🇰🇷 김신우&송하림 / 🇺🇸 Chase Brown & Jane Jackson / 🇨🇳 Ma Yang & Zhang Ruoyu / 🇯🇵 Toshiki Masuda & Minami Tanaka",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" }
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
      createMaterial("신비한 암호", 46, 4),
      createMaterial("공작화", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("무망의 깃털", 26, 4),
      createMaterial("비활성 금속 액적", 25, 3),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.rover_havoc.skills.0.name", "기본 공격", "character.rover_havoc.skills.0.description", "skill_1"),
    createWwSkill("character.rover_havoc.skills.1.name", "공명 스킬", "character.rover_havoc.skills.1.description", "skill_2"),
    createWwSkill("character.rover_havoc.skills.2.name", "공명 회로", "character.rover_havoc.skills.2.description", "skill_3"),
    createWwSkill("character.rover_havoc.skills.3.name", "공명 해방", "character.rover_havoc.skills.3.description", "skill_4"),
    createWwSkill("character.rover_havoc.skills.4.name", "변주 스킬", "character.rover_havoc.skills.4.description", "skill_5"),
    createWwSkill("character.rover_havoc.skills.5.name", "반주 스킬", "character.rover_havoc.skills.5.description", "skill_6")
  ],
  additionalAbilities: [
    { name: "character.rover_havoc.additionalAbilities.0.name", description: "character.rover_havoc.additionalAbilities.0.description" },
    { name: "character.rover_havoc.additionalAbilities.1.name", description: "character.rover_havoc.additionalAbilities.1.description" }
  ],
  concertDissipation: {
    name: "character.rover_havoc.concertDissipation.name",
    description: "character.rover_havoc.concertDissipation.description"
  },
  eidolons: [
    { name: "character.rover_havoc.eidolons.0.name", description: "character.rover_havoc.eidolons.0.description" },
    { name: "character.rover_havoc.eidolons.1.name", description: "character.rover_havoc.eidolons.1.description" },
    { name: "character.rover_havoc.eidolons.2.name", description: "character.rover_havoc.eidolons.2.description" },
    { name: "character.rover_havoc.eidolons.3.name", description: "character.rover_havoc.eidolons.3.description" },
    { name: "character.rover_havoc.eidolons.4.name", description: "character.rover_havoc.eidolons.4.description" },
    { name: "character.rover_havoc.eidolons.5.name", description: "character.rover_havoc.eidolons.5.description" }
  ],
  terms: [
    { name: "character.rover_havoc.terms.0.name", description: "character.rover_havoc.terms.0.description" }
  ],
  skillInput: {
    overview: "character.rover_havoc.skillInput.overview",
    inputs: [
      "character.rover_havoc.skillInput.inputs.0",
      "character.rover_havoc.skillInput.inputs.1",
      "character.rover_havoc.skillInput.inputs.2"
    ]
  }
};

export default rover_havoc;
