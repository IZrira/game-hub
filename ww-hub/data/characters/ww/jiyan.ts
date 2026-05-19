import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill } from '../../dataFactory';

const jiyan: WuwaCharacter = {
  id: "jiyan",
  gameId: "ww",
  name: "character.jiyan.name",
  folderName: "기염",
  attribute: "기류",
  weaponType: "대검",
  rarity: 5,
  affiliation: "황룡 (금주)",
  briefInfo: "character.jiyan.briefInfo",
  metadata: {
    name: "character.jiyan.name",
    brief: "character.jiyan.briefInfo",
    element: "기류",
    weapon: "대검",
    rarity: 5
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 기염 / 🇺🇸 Jiyan / 🇨🇳 忌炎 / 🇯🇵 忌炎",
  voiceActors: "🇰🇷 남도형 / 🇺🇸 알렉스 조던 / 🇨🇳 쑨예 / 🇯🇵 오노 유우키",
  roles: [
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" }
  ],
  baseStats: {
    lv1: { "기초 HP": 839, "기초 공격력": 35, "기초 방어력": 97 },
    lv20: { "기초 HP": 2182, "기초 공격력": 91, "기초 방어력": 249 },
    lv30: { "기초 HP": 3449, "기초 공격력": 147, "기초 방어력": 392 },
    lv40: { "기초 HP": 4156, "기초 공격력": 176, "기초 방어력": 472 },
    lv50: { "기초 HP": 5422, "기초 공격력": 232, "기초 방어력": 614 },
    lv60: { "기초 HP": 6688, "기초 공격력": 288, "기초 방어력": 757 },
    lv70: { "기초 HP": 7955, "기초 공격력": 344, "기초 방어력": 900 },
    lv80: { "기초 HP": 9221, "기초 공격력": 391, "기초 방어력": 1043 },
    lv90: { "기초 HP": 10488, "기초 공격력": 438, "기초 방어력": 1186 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("울부짖는 바위주먹", 46, 4),
      createMaterial("공작화", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("비문 고종", 26, 4),
      createMaterial("비명 이상 키메라 210", 25, 3),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 3),
      createMaterial("비명 이상 키메라 239", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.jiyan.skills.0.name", "일반 공격", "character.jiyan.skills.0.description", "basic_1"),
    createWwSkill("character.jiyan.skills.1.name", "공명 스킬", "character.jiyan.skills.1.description", "skill_1"),
    createWwSkill("character.jiyan.skills.2.name", "공명 회로", "character.jiyan.skills.2.description", "talent_1"),
    createWwSkill("character.jiyan.skills.3.name", "공명 해방", "character.jiyan.skills.3.description", "ultimate_1"),
    createWwSkill("character.jiyan.skills.4.name", "변주 스킬", "character.jiyan.skills.4.description", "intro_1"),
    createWwSkill("character.jiyan.skills.5.name", "반주 스킬", "character.jiyan.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.jiyan.additionalAbilities.0.name", description: "character.jiyan.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.jiyan.additionalAbilities.1.name", description: "character.jiyan.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.jiyan.eidolons.0.name", description: "character.jiyan.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.jiyan.eidolons.1.name", description: "character.jiyan.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.jiyan.eidolons.2.name", description: "character.jiyan.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.jiyan.eidolons.3.name", description: "character.jiyan.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.jiyan.eidolons.4.name", description: "character.jiyan.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.jiyan.eidolons.5.name", description: "character.jiyan.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 대검",
    description: "character.jiyan.concertDissipation.description"
  },
  terms: [
    { name: "character.jiyan.terms.0.name", description: "character.jiyan.terms.0.description" },
    { name: "character.jiyan.terms.1.name", description: "character.jiyan.terms.1.description" }
  ],
  skillInput: {
    overview: "character.jiyan.skillInput.overview",
    inputs: [
      "character.jiyan.skillInput.inputs.0",
      "character.jiyan.skillInput.inputs.1",
      "character.jiyan.skillInput.inputs.2",
      "character.jiyan.skillInput.inputs.3",
      "character.jiyan.skillInput.inputs.4"
    ]
  }
};

export default jiyan;
