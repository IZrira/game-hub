import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const mornye: WuwaCharacter = {
  id: "mornye",
  gameId: "ww",
  name: "character.mornye.name",
  folderName: "모니에",
  attribute: "용융",
  weaponType: "대검",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.mornye.briefInfo",
  metadata: {
    name: "character.mornye.name",
    brief: "character.mornye.briefInfo",
    element: "용융",
    weapon: "대검",
    rarity: 5
  },
  releaseVersion: "3.0",
  languageNames: "🇰🇷 모니에 / 🇺🇸 Mornye / 🇨🇳 莫宁 / 🇯🇵 모니에",
  voiceActors: "🇰🇷 오로아 / 🇺🇸 미셸 폭스 / 🇨🇳 통신주 / 🇯🇵 이와미 마나카",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" },
    { label: "조화 파동 대응", description: "목표에게 조화 파동 피해를 입힐 수 있다" },
    { label: "부조화 수치 누적 효율", description: "파티 내 특정 캐릭터의 부조화 수치 누적 효율을 증가시킬 수 있다" },
    { label: "조화 밀집 대응", description: "자신의 조화도 파괴 증폭에 근거하여 목표에게 입히는 최종 피해가 증가된다" }
  ],
  baseStats: createWwBaseStats(
    [1230, 23, 111, 10],
    [3199, 60, 285, 0],
    [5056, 96, 448, 0],
    [6092, 116, 540, 0],
    [7949, 152, 703, 0],
    [9805, 189, 866, 0],
    [11662, 226, 1030, 0],
    [13518, 257, 1193, 0],
    [15375, 288, 1357, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 메카 성핵", 4, 2),
      createMaterial("중주파수 메카 성핵", 12, 3),
      createMaterial("고주파수 메카 성핵", 12, 4),
      createMaterial("전주파수 메카 성핵", 4, 5),
      createMaterial("꺼지지 않는 심판", 46, 4),
      createMaterial("쌍둥이 포자", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 메카 성핵", 25, 2),
      createMaterial("중주파수 메카 성핵", 28, 3),
      createMaterial("고주파수 메카 성핵", 40, 4),
      createMaterial("전주파수 메카 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("저주파수 절단된 결정", 28, 2),
      createMaterial("중주파수 절단된 결정", 28, 3),
      createMaterial("고주파수 절단된 결정", 55, 4),
      createMaterial("전주파수 절단된 결정", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.mornye.skills.0.name", "일반 공격", "character.mornye.skills.0.description", "basic_1"),
    createWwSkill("character.mornye.skills.1.name", "공명 스킬", "character.mornye.skills.1.description", "skill_1"),
    createWwSkill("character.mornye.skills.2.name", "공명 회로", "character.mornye.skills.2.description", "talent_1"),
    createWwSkill("character.mornye.skills.3.name", "공명 해방", "character.mornye.skills.3.description", "ultimate_1"),
    createWwSkill("character.mornye.skills.4.name", "변주 스킬", "character.mornye.skills.4.description", "intro_1"),
    createWwSkill("character.mornye.skills.5.name", "반주 스킬", "character.mornye.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.mornye.additionalAbilities.0.name", description: "character.mornye.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.mornye.additionalAbilities.1.name", description: "character.mornye.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.mornye.eidolons.0.name", description: "character.mornye.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.mornye.eidolons.1.name", description: "character.mornye.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.mornye.eidolons.2.name", description: "character.mornye.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.mornye.eidolons.3.name", description: "character.mornye.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.mornye.eidolons.4.name", description: "character.mornye.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.mornye.eidolons.5.name", description: "character.mornye.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.mornye.concertDissipation.name",
    description: "character.mornye.concertDissipation.description"
  },
  terms: [
    { name: "character.mornye.terms.0.name", description: "character.mornye.terms.0.description" },
    { name: "character.mornye.terms.1.name", description: "character.mornye.terms.1.description" },
    { name: "character.mornye.terms.2.name", description: "character.mornye.terms.2.description" },
    { name: "character.mornye.terms.3.name", description: "character.mornye.terms.3.description" },
    { name: "character.mornye.terms.4.name", description: "character.mornye.terms.4.description" },
    { name: "character.mornye.terms.5.name", description: "character.mornye.terms.5.description" },
    { name: "character.mornye.terms.6.name", description: "character.mornye.terms.6.description" },
    { name: "character.mornye.terms.7.name", description: "character.mornye.terms.7.description" },
    { name: "character.mornye.terms.8.name", description: "character.mornye.terms.8.description" },
    { name: "character.mornye.terms.9.name", description: "character.mornye.terms.9.description" }
  ],
  skillInput: {
    hideGauge: true,
    overview: "character.mornye.skillInput.overview",
    inputs: []
  }

};

export default mornye;
