import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill } from '../../dataFactory';

const rococo: WuwaCharacter = {
  id: "rococo",
  gameId: "ww",
  name: "character.rococo.name",
  folderName: "로코코",
  attribute: "인멸",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "우인 극단",
  briefInfo: "character.rococo.briefInfo",
  metadata: {
    name: "character.rococo.name",
    brief: "character.rococo.briefInfo",
    element: "인멸",
    weapon: "권갑",
    rarity: 5
  },
  releaseVersion: "2.0",
  languageNames: "🇰🇷 로코코 / 🇺🇸 Roccia / 🇨🇳 洛可可 / 🇯🇵 ロ코코",
  voiceActors: "🇰🇷 장미 / 🇺🇸 홀리 얼 / 🇨🇳 沈话桑 / 🇯🇵 코하라 코노미",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "인멸 피해 부스트", description: "파티 내 특정 캐릭터의 인멸 피해 부스트 가능" },
    { label: "일반 공격 피해 부스트", description: "파티 내 특정 캐릭터의 일반 공격 피해 부스트 가능" }
  ],
  baseStats: {
    lv1: { "기초 HP": 980, "기초 공격력": 30, "기초 방어력": 98 },
    lv20: { "기초 HP": 2549, "기초 공격력": 78, "기초 방어력": 251 },
    lv30: { "기초 HP": 4028, "기초 공격력": 126, "기초 방어력": 396 },
    lv40: { "기초 HP": 4854, "기초 공격력": 151, "기초 방어력": 476 },
    lv50: { "기초 HP": 6333, "기초 공격력": 199, "기초 방어력": 621 },
    lv60: { "기초 HP": 7812, "기초 공격력": 247, "기초 방어력": 765 },
    lv70: { "기초 HP": 9292, "기초 공격력": 294, "기초 방어력": 909 },
    lv80: { "기초 HP": 10771, "기초 공격력": 335, "기초 방어력": 1054 },
    lv90: { "기초 HP": 12250, "기초 공격력": 375, "기초 방어력": 1198 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 4, 2),
      createMaterial("중주파수 침식 선형 구조물", 12, 3),
      createMaterial("고주파수 침식 선형 구조물", 12, 4),
      createMaterial("전주파수 침식 선형 구조물", 4, 5),
      createMaterial("속죄의 소라", 46, 4),
      createMaterial("폭죽 봉선화", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 침식 선형 구조물", 25, 2),
      createMaterial("중주파수 침식 선형 구조물", 28, 3),
      createMaterial("고주파수 침식 선형 구조물", 40, 4),
      createMaterial("전주파수 침식 선형 구조물", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("음률의 배주", 25, 2),
      createMaterial("음률의 새싹", 28, 3),
      createMaterial("음률의 새잎", 55, 4),
      createMaterial("음률의 꽃망울", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.rococo.skills.0.name", "일반 공격", "character.rococo.skills.0.description", "basic_1"),
    createWwSkill("character.rococo.skills.1.name", "공명 스킬", "character.rococo.skills.1.description", "skill_1"),
    createWwSkill("character.rococo.skills.2.name", "공명 회로", "character.rococo.skills.2.description", "talent_1"),
    createWwSkill("character.rococo.skills.3.name", "공명 해방", "character.rococo.skills.3.description", "ultimate_1"),
    createWwSkill("character.rococo.skills.4.name", "변주 스킬", "character.rococo.skills.4.description", "intro_1"),
    createWwSkill("character.rococo.skills.5.name", "반주 스킬", "character.rococo.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.rococo.additionalAbilities.0.name", description: "character.rococo.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.rococo.additionalAbilities.1.name", description: "character.rococo.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.rococo.eidolons.0.name", description: "character.rococo.eidolons.0.description", icon: "공명 체인1" },
    { rank: "R2", name: "character.rococo.eidolons.1.name", description: "character.rococo.eidolons.1.description", icon: "공명 체인2" },
    { rank: "R3", name: "character.rococo.eidolons.2.name", description: "character.rococo.eidolons.2.description", icon: "공명 체인3" },
    { rank: "R4", name: "character.rococo.eidolons.3.name", description: "character.rococo.eidolons.3.description", icon: "공명 체인4" },
    { rank: "R5", name: "character.rococo.eidolons.4.name", description: "character.rococo.eidolons.4.description", icon: "공명 체인5" },
    { rank: "R6", name: "character.rococo.eidolons.5.name", description: "character.rococo.eidolons.5.description", icon: "공명 체인6" }
  ],
  concertDissipation: {
    name: "character.rococo.concertDissipation.name",
    description: "character.rococo.concertDissipation.description"
  },
  terms: [
    { name: "character.rococo.terms.0.name", description: "character.rococo.terms.0.description" },
    { name: "character.rococo.terms.1.name", description: "character.rococo.terms.1.description" }
  ],
  skillInput: {
    overview: "character.rococo.skillInput.overview",
    inputs: [
      "character.rococo.skillInput.inputs.0",
      "character.rococo.skillInput.inputs.1"
    ]
  }
};

export default rococo;
