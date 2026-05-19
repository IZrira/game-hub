import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const danjin: WuwaCharacter = {
  id: "danjin",
  gameId: "ww",
  name: "character.danjin.name",
  folderName: "단근",
  attribute: "인멸",
  weaponType: "직검",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.danjin.briefInfo",
  metadata: {
    name: "character.danjin.name",
    brief: "character.danjin.briefInfo",
    element: "인멸",
    weapon: "직검",
    rarity: 4
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 단근 / 🇺🇸 Danjin / 🇨🇳 丹瑾 / 🇯🇵 丹瑾",
  voiceActors: "🇰🇷 이현진 / 🇺🇸 소피 커훈 / 🇨🇳 허우샤오페이 / 🇯🇵 오카사키 미호",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "인멸 피해 부스트", description: "파티 내 특정 캐릭터의 인멸 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [755, 21, 94, 0],
    [1964, 55, 241, 0],
    [3103, 88, 380, 0],
    [3740, 106, 457, 0],
    [4879, 139, 595, 0],
    [6019, 173, 734, 0],
    [7158, 206, 872, 0],
    [8298, 234, 1011, 0],
    [9438, 263, 1149, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("낡은 구속팔찌", 4, 2),
      createMaterial("보통 구속팔찌", 12, 3),
      createMaterial("개량 구속팔찌", 12, 4),
      createMaterial("특제 구속팔찌", 4, 5),
      createMaterial("분쟁의 성핵", 46, 4),
      createMaterial("개양귀비", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("낡은 구속팔찌", 25, 2),
      createMaterial("보통 구속팔찌", 28, 3),
      createMaterial("개량 구속팔찌", 40, 4),
      createMaterial("특제 구속팔찌", 57, 5),
      createMaterial("무망의 깃털", 26, 4),
      createMaterial("비활성 금속 액적", 25, 2),
      createMaterial("활성 금속 액적", 28, 3),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.danjin.skills.0.name", "일반 공격", "character.danjin.skills.0.description", "basic_1"),
    createWwSkill("character.danjin.skills.1.name", "공명 스킬", "character.danjin.skills.1.description", "skill_1"),
    createWwSkill("character.danjin.skills.2.name", "공명 회로", "character.danjin.skills.2.description", "talent_1"),
    createWwSkill("character.danjin.skills.3.name", "공명 해방", "character.danjin.skills.3.description", "ultimate_1"),
    createWwSkill("character.danjin.skills.4.name", "변주 스킬", "character.danjin.skills.4.description", "intro_1"),
    createWwSkill("character.danjin.skills.5.name", "반주 스킬", "character.danjin.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.danjin.additionalAbilities.0.name", description: "character.danjin.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.danjin.additionalAbilities.1.name", description: "character.danjin.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.danjin.eidolons.0.name", description: "character.danjin.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.danjin.eidolons.1.name", description: "character.danjin.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.danjin.eidolons.2.name", description: "character.danjin.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.danjin.eidolons.3.name", description: "character.danjin.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.danjin.eidolons.4.name", description: "character.danjin.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.danjin.eidolons.5.name", description: "character.danjin.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.danjin.concertDissipation.description"
  },
  terms: [
    { name: "character.danjin.terms.0.name", description: "character.danjin.terms.0.description" }
  ],
  skillInput: {
    overview: "character.danjin.skillInput.overview",
    inputs: [
      "character.danjin.skillInput.inputs.0",
      "character.danjin.skillInput.inputs.1",
      "character.danjin.skillInput.inputs.2"
    ]
  }
};

export default danjin;
