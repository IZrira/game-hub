import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const taoqi: WuwaCharacter = {
  id: "taoqi",
  gameId: "ww",
  name: "character.taoqi.name",
  folderName: "도기",
  attribute: "인멸",
  weaponType: "대검",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.taoqi.briefInfo",
  metadata: {
    name: "character.taoqi.name",
    brief: "character.taoqi.briefInfo",
    element: "인멸",
    weapon: "대검",
    rarity: 4
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 도기 / 🇺🇸 Taoqi / 🇨🇳 桃祈 / 🇯🇵 桃祈",
  voiceActors: "🇰🇷 이새아 / 🇺🇸 클레어 루이스 코널리 / 🇨🇳 키요 / 🇯🇵 요우미야 히나",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "공명 스킬 피해 부스트", description: "파티 내 특정 캐릭터의 공명 스킬 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [716, 18, 128, 0],
    [1862, 47, 328, 0],
    [2943, 75, 517, 0],
    [3546, 91, 622, 0],
    [4627, 119, 811, 0],
    [5708, 148, 999, 0],
    [6789, 177, 1188, 0],
    [7869, 201, 1376, 0],
    [8950, 225, 1564, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("파괴의 깃털", 46, 4),
      createMaterial("붓꽃", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("무망의 깃털", 26, 4),
      createMaterial("비명 이상 키메라 210", 25, 3),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.taoqi.skills.0.name", "일반 공격", "character.taoqi.skills.0.description", "basic_1"),
    createWwSkill("character.taoqi.skills.1.name", "공명 스킬", "character.taoqi.skills.1.description", "skill_1"),
    createWwSkill("character.taoqi.skills.2.name", "공명 회로", "character.taoqi.skills.2.description", "talent_1"),
    createWwSkill("character.taoqi.skills.3.name", "공명 해방", "character.taoqi.skills.3.description", "ultimate_1"),
    createWwSkill("character.taoqi.skills.4.name", "변주 스킬", "character.taoqi.skills.4.description", "intro_1"),
    createWwSkill("character.taoqi.skills.5.name", "반주 스킬", "character.taoqi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.taoqi.additionalAbilities.0.name", description: "character.taoqi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.taoqi.additionalAbilities.1.name", description: "character.taoqi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.taoqi.eidolons.0.name", description: "character.taoqi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.taoqi.eidolons.1.name", description: "character.taoqi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.taoqi.eidolons.2.name", description: "character.taoqi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.taoqi.eidolons.3.name", description: "character.taoqi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.taoqi.eidolons.4.name", description: "character.taoqi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.taoqi.eidolons.5.name", description: "character.taoqi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.taoqi.concertDissipation.description"
  },
  skillInput: {
    overview: "character.taoqi.skillInput.overview",
    inputs: [
      "character.taoqi.skillInput.inputs.0",
      "character.taoqi.skillInput.inputs.1"
    ]
  }
};

export default taoqi;
