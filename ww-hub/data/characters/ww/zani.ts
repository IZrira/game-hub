import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill } from '../../dataFactory';

const zani: WuwaCharacter = {
  id: "zani",
  gameId: "ww",
  name: "character.zani.name",
  folderName: "젠니",
  attribute: "회절",
  weaponType: "대검",
  rarity: 5,
  affiliation: "몬텔리 가문",
  briefInfo: "character.zani.briefInfo",
  metadata: {
    name: "character.zani.name",
    brief: "character.zani.briefInfo",
    element: "회절",
    weapon: "대검",
    rarity: 5
  },
  releaseVersion: "2.3",
  languageNames: "🇰🇷 젠니 / 🇺🇸 Zani / 🇨🇳 赞妮 / 🇯🇵 ザンニー",
  voiceActors: "🇰🇷 이주은 / 🇺🇸 리더 루이 / 🇨🇳 장뤄위 / 🇯🇵 카네모토 히사코",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "회절 피해 부스트", description: "파티 내 특정 캐릭터의 회절 피해 부스트 가능" },
    { label: "광학", description: "광학 효과 사용 가능" }
  ],
  baseStats: {
    lv1: { "기초 HP": 862, "기초 공격력": 35, "기초 방어력": 93, "조화도 파괴 증폭": 0 },
    lv20: { "기초 HP": 2242, "기초 공격력": 91, "기초 방어력": 239, "조화도 파괴 증폭": 0 },
    lv30: { "기초 HP": 3543, "기초 공격력": 147, "기초 방어력": 375, "조화도 파괴 증폭": 0 },
    lv40: { "기초 HP": 4270, "기초 공격력": 176, "기초 방어력": 452, "조화도 파괴 증폭": 0 },
    lv50: { "기초 HP": 5571, "기초 공격력": 232, "기초 방어력": 589, "조화도 파괴 증폭": 0 },
    lv60: { "기초 HP": 6872, "기초 공격력": 288, "기초 방어력": 726, "조화도 파괴 증폭": 0 },
    lv70: { "기초 HP": 8173, "기초 공격력": 344, "기초 방어력": 863, "조화도 파괴 증폭": 0 },
    lv80: { "기초 HP": 9474, "기초 공격력": 391, "기초 방어력": 1000, "조화도 파괴 증폭": 0 },
    lv90: { "기초 HP": 10775, "기초 공격력": 438, "기초 방어력": 1137, "조화도 파괴 증폭": 0 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 취합 성핵", 4, 2),
      createMaterial("중주파수 취합 성핵", 12, 3),
      createMaterial("고주파수 취합 성핵", 12, 4),
      createMaterial("전주파수 취합 성핵", 4, 5),
      createMaterial("백금 기계의 심장", 46, 4),
      createMaterial("검창포꽃", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("음률의 배주", 25, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.zani.skills.0.name", "일반 공격", "character.zani.skills.0.description", "basic_1"),
    createWwSkill("character.zani.skills.1.name", "공명 스킬 | 공명 어빌리티", "character.zani.skills.1.description", "skill_1"),
    createWwSkill("character.zani.skills.2.name", "공명 회로", "character.zani.skills.2.description", "talent_1"),
    createWwSkill("character.zani.skills.3.name", "공명 해방", "character.zani.skills.3.description", "ultimate_1"),
    createWwSkill("character.zani.skills.4.name", "변주 스킬", "character.zani.skills.4.description", "intro_1"),
    createWwSkill("character.zani.skills.5.name", "반주 스킬", "character.zani.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.zani.additionalAbilities.0.name", description: "character.zani.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.zani.additionalAbilities.1.name", description: "character.zani.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.zani.eidolons.0.name", description: "character.zani.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.zani.eidolons.1.name", description: "character.zani.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.zani.eidolons.2.name", description: "character.zani.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.zani.eidolons.3.name", description: "character.zani.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.zani.eidolons.4.name", description: "character.zani.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.zani.eidolons.5.name", description: "character.zani.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.zani.concertDissipation.description"
  },
  terms: [
    { name: "character.zani.terms.0.name", description: "character.zani.terms.0.description" },
    { name: "character.zani.terms.1.name", description: "character.zani.terms.1.description" },
    { name: "character.zani.terms.2.name", description: "character.zani.terms.2.description" },
    { name: "character.zani.terms.3.name", description: "character.zani.terms.3.description" },
    { name: "character.zani.terms.4.name", description: "character.zani.terms.4.description" },
    { name: "character.zani.terms.5.name", description: "character.zani.terms.5.description" },
    { name: "character.zani.terms.6.name", description: "character.zani.terms.6.description" },
    { name: "character.zani.terms.7.name", description: "character.zani.terms.7.description" }
  ],
  skillInput: {
    overview: "character.zani.skillInput.overview",
    inputs: [
      "character.zani.skillInput.inputs.0",
      "character.zani.skillInput.inputs.1",
      "character.zani.skillInput.inputs.2",
      "character.zani.skillInput.inputs.3",
      "character.zani.skillInput.inputs.4",
      "character.zani.skillInput.inputs.5",
      "character.zani.skillInput.inputs.6",
      "character.zani.skillInput.inputs.7",
      "character.zani.skillInput.inputs.8",
      "character.zani.skillInput.inputs.9",
      "character.zani.skillInput.inputs.10",
      "character.zani.skillInput.inputs.11"
    ]
  }
};

export default zani;
