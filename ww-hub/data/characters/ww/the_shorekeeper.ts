import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill } from '../../dataFactory';

const the_shorekeeper: WuwaCharacter = {
  id: "the_shorekeeper",
  gameId: "ww",
  name: "character.the_shorekeeper.name",
  folderName: "파수인",
  attribute: "회절",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "검은 해안",
  briefInfo: "character.the_shorekeeper.briefInfo",
  metadata: {
    name: "character.the_shorekeeper.name",
    brief: "character.the_shorekeeper.briefInfo",
    element: "회절",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "1.3",
  languageNames: "🇰🇷 파수인 / 🇺🇸 The Shorekeeper / 🇨🇳 守岸人 / 🇯🇵 ショアキーパー",
  voiceActors: "🇰🇷 김보나 / 🇺🇸 스테퍼니 매키언 / 🇨🇳 탕야징 / 🇯🇵 스와 아야카",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" }
  ],
  baseStats: {
    lv1: { "기초 HP": 1337, "기초 공격력": 23, "기초 방어력": 90, "조화도 파괴 증폭": 0 },
    lv20: { "기초 HP": 3478, "기초 공격력": 60, "기초 방어력": 231, "조화도 파괴 증폭": 0 },
    lv30: { "기초 HP": 5496, "기초 공격력": 96, "기초 방어력": 363, "조화도 파괴 증폭": 0 },
    lv40: { "기초 HP": 6622, "기초 공격력": 116, "기초 방어력": 438, "조화도 파괴 증폭": 0 },
    lv50: { "기초 HP": 8640, "기초 공격력": 152, "기초 방어력": 570, "조화도 파괴 증폭": 0 },
    lv60: { "기초 HP": 10658, "기초 공격력": 189, "기초 방어력": 703, "조화도 파괴 증폭": 0 },
    lv70: { "기초 HP": 12676, "기초 공격력": 226, "기초 방어력": 835, "조화도 파괴 증폭": 0 },
    lv80: { "기초 HP": 14694, "기초 공격력": 257, "기초 방어력": 968, "조화도 파괴 증폭": 0 },
    lv90: { "기초 HP": 16713, "기초 공격력": 288, "기초 방어력": 1100, "조화도 파괴 증폭": 0 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("고요한 위상", 46, 4),
      createMaterial("신성", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("사계의 단검", 26, 4),
      createMaterial("렌토 와전류", 25, 3),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 3),
      createMaterial("프레스토 와전류", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.the_shorekeeper.skills.0.name", "일반 공격", "character.the_shorekeeper.skills.0.description", "basic_1"),
    createWwSkill("character.the_shorekeeper.skills.1.name", "공명 스킬", "character.the_shorekeeper.skills.1.description", "skill_1"),
    createWwSkill("character.the_shorekeeper.skills.2.name", "공명 회로", "character.the_shorekeeper.skills.2.description", "talent_1"),
    createWwSkill("character.the_shorekeeper.skills.3.name", "공명 해방", "character.the_shorekeeper.skills.3.description", "ultimate_1"),
    createWwSkill("character.the_shorekeeper.skills.4.name", "변주 스킬", "character.the_shorekeeper.skills.4.description", "intro_1"),
    createWwSkill("character.the_shorekeeper.skills.5.name", "반주 스킬", "character.the_shorekeeper.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.the_shorekeeper.additionalAbilities.0.name", description: "character.the_shorekeeper.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.the_shorekeeper.additionalAbilities.1.name", description: "character.the_shorekeeper.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.the_shorekeeper.eidolons.0.name", description: "character.the_shorekeeper.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.the_shorekeeper.eidolons.1.name", description: "character.the_shorekeeper.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.the_shorekeeper.eidolons.2.name", description: "character.the_shorekeeper.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.the_shorekeeper.eidolons.3.name", description: "character.the_shorekeeper.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.the_shorekeeper.eidolons.4.name", description: "character.the_shorekeeper.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.the_shorekeeper.eidolons.5.name", description: "character.the_shorekeeper.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 증폭기",
    description: "character.the_shorekeeper.concertDissipation.description"
  },
  terms: [
    { name: "character.the_shorekeeper.terms.0.name", description: "character.the_shorekeeper.terms.0.description" },
    { name: "character.the_shorekeeper.terms.1.name", description: "character.the_shorekeeper.terms.1.description" },
    { name: "character.the_shorekeeper.terms.2.name", description: "character.the_shorekeeper.terms.2.description" }
  ],
  skillInput: {
    overview: "character.the_shorekeeper.skillInput.overview",
    inputs: [
      "character.the_shorekeeper.skillInput.inputs.0",
      "character.the_shorekeeper.skillInput.inputs.1",
      "character.the_shorekeeper.skillInput.inputs.2",
      "character.the_shorekeeper.skillInput.inputs.3",
      "character.the_shorekeeper.skillInput.inputs.4"
    ]
  }
};

export default the_shorekeeper;
