import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const linne: WuwaCharacter = {
  id: "linne",
  gameId: "ww",
  name: "character.linne.name",
  folderName: "린네",
  attribute: "회절",
  weaponType: "권총",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.linne.briefInfo",
  metadata: {
    name: "character.linne.name",
    brief: "character.linne.briefInfo",
    element: "회절",
    weapon: "권총",
    rarity: 5
  },
  releaseVersion: "3.0",
  languageNames: "🇰🇷 린네 / 🇺🇸 Linne / 🇨🇳 琳妮 / 🇯🇵 リンネ",
  voiceActors: "🇰🇷 최현지 / 🇺🇸 엘시 러브록 / 🇨🇳 주징 / 🇯🇵 이노우에 마리나",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" },
    { label: "공명 해방 피해 부스트", description: "파티 내 특정 캐릭터의 공명 해방 피해 부스트 가능" },
    { label: "조화 파동 대응", description: "목표에게 조화 파동 피해를 입힐 수 있다" },
    { label: "조화도 파괴 증폭", description: "파티 내 특정 캐릭터의 조화도 파괴 증폭을 증가시킬 수 있다" },
    { label: "조화 밀집 대응", description: "자신의 조화도 파괴 증폭에 근거하여 목표에게 입히는 최종 피해가 증가된다" }
  ],
  baseStats: createWwBaseStats(
    [979, 30, 98, 10],
    [2546, 78, 251, 10],
    [4024, 126, 396, 10],
    [4849, 151, 476, 10],
    [6327, 198, 576, 10],
    [7804, 247, 765, 10],
    [9282, 294, 909, 10],
    [10760, 335, 1054, 10],
    [12238, 375, 1198, 10]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 엑소스웜 성핵", 4, 2),
      createMaterial("중주파수 엑소스웜 성핵", 12, 3),
      createMaterial("고주파수 엑소스웜 성핵", 12, 4),
      createMaterial("전주파수 엑소스웜 성핵", 4, 5),
      createMaterial("태양을 노리는 손끝", 46, 4),
      createMaterial("서리꽃", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 엑소스웜 성핵", 25, 2),
      createMaterial("중주파수 엑소스웜 성핵", 28, 3),
      createMaterial("고주파수 엑소스웜 성핵", 40, 4),
      createMaterial("전주파수 엑소스웜 성핵", 57, 5),
      createMaterial("무망의 깃털", 26, 5),
      createMaterial("결손 응집 연소체", 25, 2),
      createMaterial("잔음 응집 연소체", 28, 3),
      createMaterial("잔향 응집 연소체", 55, 4),
      createMaterial("울림 응집 연소체", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.linne.skills.0.name", "일반 공격", "character.linne.skills.0.description", "basic_1"),
    createWwSkill("character.linne.skills.1.name", "공명 스킬", "character.linne.skills.1.description", "skill_1"),
    createWwSkill("character.linne.skills.2.name", "공명 회로", "character.linne.skills.2.description", "talent_1"),
    createWwSkill("character.linne.skills.3.name", "공명 해방", "character.linne.skills.3.description", "ultimate_1"),
    createWwSkill("character.linne.skills.4.name", "변주 스킬", "character.linne.skills.4.description", "intro_1"),
    createWwSkill("character.linne.skills.5.name", "반주 스킬", "character.linne.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.linne.additionalAbilities.0.name", description: "character.linne.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.linne.additionalAbilities.1.name", description: "character.linne.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.linne.eidolons.0.name", description: "character.linne.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.linne.eidolons.1.name", description: "character.linne.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.linne.eidolons.2.name", description: "character.linne.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.linne.eidolons.3.name", description: "character.linne.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.linne.eidolons.4.name", description: "character.linne.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.linne.eidolons.5.name", description: "character.linne.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.linne.concertDissipation.name",
    description: "character.linne.concertDissipation.description"
  },
  terms: [
    { name: "character.linne.terms.0.name", description: "character.linne.terms.0.description" },
    { name: "character.linne.terms.1.name", description: "character.linne.terms.1.description" },
    { name: "character.linne.terms.2.name", description: "character.linne.terms.2.description" },
    { name: "character.linne.terms.3.name", description: "character.linne.terms.3.description" },
    { name: "character.linne.terms.4.name", description: "character.linne.terms.4.description" },
    { name: "character.linne.terms.5.name", description: "character.linne.terms.5.description" },
    { name: "character.linne.terms.6.name", description: "character.linne.terms.6.description" },
    { name: "character.linne.terms.7.name", description: "character.linne.terms.7.description" },
    { name: "character.linne.terms.8.name", description: "character.linne.terms.8.description" },
    { name: "character.linne.terms.9.name", description: "character.linne.terms.9.description" },
    { name: "character.linne.terms.10.name", description: "character.linne.terms.10.description" }
  ],
  skillInput: {
    hideGauge: true,
    overview: "character.linne.skillInput.overview",
    inputs: [
      "character.linne.skillInput.inputs.0",
      "character.linne.skillInput.inputs.1",
      "character.linne.skillInput.inputs.2",
      "character.linne.skillInput.inputs.3",
      "character.linne.skillInput.inputs.4",
      "character.linne.skillInput.inputs.5"
    ]
  }
};

export default linne;
