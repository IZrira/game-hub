import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const qiuyuan: WuwaCharacter = {
  id: "qiuyuan",
  gameId: "ww",
  name: "character.qiuyuan.name",
  folderName: "구원",
  attribute: "기류",
  weaponType: "직검",
  rarity: 5,
  affiliation: "명정",
  briefInfo: "character.qiuyuan.briefInfo",
  metadata: {
    name: "character.qiuyuan.name",
    brief: "character.qiuyuan.briefInfo",
    element: "기류",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "2.7",
  languageNames: "🇰🇷 구원 / 🇺🇸 Qiuyuan / 🇨🇳 仇远 / 🇯🇵 仇遠",
  voiceActors: "🇰🇷 김민주 / 🇺🇸 제러미 앵 존스 / 🇨🇳 Gan Ziqi / 🇯🇵 미키 신이치로",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "에코 어빌리티 피해 부스트", description: "파티 내 특정 캐릭터의 에코 어빌리티 피해를 부스트시킨다" }
  ],
  baseStats: createWwBaseStats(
    [979, 30, 98, 0],
    [2546, 78, 251, 0],
    [4024, 126, 396, 0],
    [4849, 151, 476, 0],
    [6327, 199, 621, 0],
    [7804, 247, 765, 0],
    [9282, 294, 909, 0],
    [10760, 335, 1054, 0],
    [12238, 375, 1198, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("잠언과 거짓말", 46, 4),
      createMaterial("인동국화", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("심해의 저주", 26, 4),
      createMaterial("비활성 금속 액적", 25, 3),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.qiuyuan.skills.0.name", "기본 공격", "character.qiuyuan.skills.0.description", "basic_1"),
    createWwSkill("character.qiuyuan.skills.1.name", "공명 스킬", "character.qiuyuan.skills.1.description", "skill_1"),
    createWwSkill("character.qiuyuan.skills.2.name", "공명 회로", "character.qiuyuan.skills.2.description", "talent_1"),
    createWwSkill("character.qiuyuan.skills.3.name", "공명 해방", "character.qiuyuan.skills.3.description", "ultimate_1"),
    createWwSkill("character.qiuyuan.skills.4.name", "변주 스킬", "character.qiuyuan.skills.4.description", "intro_1"),
    createWwSkill("character.qiuyuan.skills.5.name", "반주 스킬", "character.qiuyuan.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.qiuyuan.additionalAbilities.0.name", description: "character.qiuyuan.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.qiuyuan.additionalAbilities.1.name", description: "character.qiuyuan.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.qiuyuan.eidolons.0.name", description: "character.qiuyuan.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.qiuyuan.eidolons.1.name", description: "character.qiuyuan.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.qiuyuan.eidolons.2.name", description: "character.qiuyuan.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.qiuyuan.eidolons.3.name", description: "character.qiuyuan.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.qiuyuan.eidolons.4.name", description: "character.qiuyuan.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.qiuyuan.eidolons.5.name", description: "character.qiuyuan.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.qiuyuan.terms.3.description"
  },
  terms: [
    { name: "character.qiuyuan.terms.0.name", description: "character.qiuyuan.terms.0.description" },
    { name: "character.qiuyuan.terms.1.name", description: "character.qiuyuan.terms.1.description" },
    { name: "character.qiuyuan.terms.2.name", description: "character.qiuyuan.terms.2.description" },
    { name: "character.qiuyuan.terms.3.name", description: "character.qiuyuan.terms.3.description" }
  ],
  skillInput: {
    overview: "character.qiuyuan.skillInput.overview",
    inputs: [
      "character.qiuyuan.skillInput.inputs.0",
      "character.qiuyuan.skillInput.inputs.1",
      "character.qiuyuan.skillInput.inputs.2",
      "character.qiuyuan.skillInput.inputs.3",
      "character.qiuyuan.skillInput.inputs.4"
    ]
  }
};

export default qiuyuan;
