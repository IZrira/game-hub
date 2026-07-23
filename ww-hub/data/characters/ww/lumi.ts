import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const lumi: WuwaCharacter = {
  id: "lumi",
  gameId: "ww",
  name: "character.lumi.name",
  folderName: "루미",
  attribute: "전도",
  weaponType: "대검",
  rarity: 4,
  affiliation: "무무물류",
  briefInfo: "character.lumi.briefInfo",
  metadata: {
    name: "character.lumi.name",
    brief: "character.lumi.briefInfo",
    element: "전도",
    weapon: "대검",
    rarity: 4
  },
  releaseVersion: "1.4",
  languageNames: "🇰🇷 루미 / 🇺🇸 LUMI / 🇨🇳 灯灯 / 🇯🇵 灯灯",
  voiceActors: "🇰🇷 정해은 / 🇺🇸 에밀리 카스 / 🇨🇳 징천 / 🇯🇵 스즈키 미노리",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "공명 스킬 피해 부스트", description: "파티 내 특정 캐릭터의 공명 스킬 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [680, 27, 72, 0],
    [1769, 70, 185, 0],
    [2795, 113, 291, 0],
    [3368, 136, 350, 0],
    [4395, 179, 456, 0],
    [5421, 222, 562, 0],
    [6447, 265, 668, 0],
    [7474, 301, 774, 0],
    [8500, 338, 880, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("번개의 성핵", 46, 4),
      createMaterial("검은 연꽃", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("사계의 단검", 26, 4),
      createMaterial("비명 이상 키메라 210", 25, 2),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.lumi.skills.0.name", "일반 공격", "character.lumi.skills.0.description", "basic_1"),
    createWwSkill("character.lumi.skills.1.name", "공명 스킬", "character.lumi.skills.1.description", "skill_1"),
    createWwSkill("character.lumi.skills.2.name", "공명 회로", "character.lumi.skills.2.description", "talent_1"),
    createWwSkill("character.lumi.skills.3.name", "공명 해방", "character.lumi.skills.3.description", "ultimate_1"),
    createWwSkill("character.lumi.skills.4.name", "변주 스킬", "character.lumi.skills.4.description", "intro_1"),
    createWwSkill("character.lumi.skills.5.name", "반주 스킬", "character.lumi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.lumi.additionalAbilities.0.name", description: "character.lumi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.lumi.additionalAbilities.1.name", description: "character.lumi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.lumi.eidolons.0.name", description: "character.lumi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.lumi.eidolons.1.name", description: "character.lumi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.lumi.eidolons.2.name", description: "character.lumi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.lumi.eidolons.3.name", description: "character.lumi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.lumi.eidolons.4.name", description: "character.lumi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.lumi.eidolons.5.name", description: "character.lumi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.lumi.concertDissipation.description"
  },
  skillInput: {
    overview: "character.lumi.skillInput.overview",
    inputs: [
      "character.lumi.skillInput.inputs.0",
      "character.lumi.skillInput.inputs.1",
      "character.lumi.skillInput.inputs.2"
    ]
  }
};

export default lumi;
