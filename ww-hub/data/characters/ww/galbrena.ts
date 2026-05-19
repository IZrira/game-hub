import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const galbrena: WuwaCharacter = {
  id: "galbrena",
  gameId: "ww",
  name: "character.galbrena.name",
  folderName: "갈브레나",
  attribute: "용융",
  weaponType: "권총",
  rarity: 5,
  affiliation: "검은 해안",
  briefInfo: "character.galbrena.briefInfo",
  metadata: {
    name: "character.galbrena.name",
    brief: "character.galbrena.briefInfo",
    element: "용융",
    weapon: "권총",
    rarity: 5,
  },
  releaseVersion: "2.7",
  languageNames: "🇰🇷 갈브레나 / 🇺🇸 Galbrena / 🇨🇳 嘉贝莉娜 / 🇯🇵 ガルブレーナ",
  voiceActors: "🇰🇷 이다슬&이장원 / 🇺🇸 데보라 와일드&토비 윌리엄스 / 🇨🇳 장 원지에&첸 하오이탄 / 🇯🇵 쇼지 우메카&야마모토 카네히라",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" }
  ],
  baseStats: createWwBaseStats(
    [824, 37, 91, 10],   // 1
    [2143, 96, 233, 0], // 20
    [3387, 155, 367, 0],// 30
    [4081, 186, 442, 0],// 40
    [5325, 245, 576, 0],// 50
    [6569, 304, 710, 0],// 60
    [7813, 363, 844, 0],// 70
    [9056, 413, 978, 0],// 80
    [10300, 463, 1112, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 침식 선형 구조물", 4, 2),
      createMaterial("중주파수 침식 선형 구조물", 12, 3),
      createMaterial("고주파수 침식 선형 구조물", 12, 4),
      createMaterial("전주파수 침식 선형 구조물", 4, 5),
      createMaterial("오염된 꼭두각시 왕관", 46, 4),
      createMaterial("돌장미", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 침식 선형 구조물", 25, 2),
      createMaterial("중주파수 침식 선형 구조물", 28, 3),
      createMaterial("고주파수 침식 선형 구조물", 40, 4),
      createMaterial("전주파수 침식 선형 구조물", 57, 5),
      createMaterial("심해의 저주", 26, 4), 
      createMaterial("헤테로 결정화 연소", 28, 2),
      createMaterial("조추출 결정화 연소", 28, 3),
      createMaterial("정류 결정화 연소", 55, 4),
      createMaterial("고순도 결정화 연소", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.galbrena.skills.0.name", "기본 공격", "character.galbrena.skills.0.description", "basic_1"),
    createWwSkill("character.galbrena.skills.1.name", "공명 스킬", "character.galbrena.skills.1.description", "skill_1"),
    createWwSkill("character.galbrena.skills.2.name", "공명 회로", "character.galbrena.skills.2.description", "talent_1"),
    createWwSkill("character.galbrena.skills.3.name", "공명 해방", "character.galbrena.skills.3.description", "ultimate_1"),
    createWwSkill("character.galbrena.skills.4.name", "변주 스킬", "character.galbrena.skills.4.description", "intro_1"),
    createWwSkill("character.galbrena.skills.5.name", "반주 스킬", "character.galbrena.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.galbrena.additionalAbilities.0.name", description: "character.galbrena.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.galbrena.additionalAbilities.1.name", description: "character.galbrena.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.galbrena.eidolons.0.name", description: "character.galbrena.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.galbrena.eidolons.1.name", description: "character.galbrena.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.galbrena.eidolons.2.name", description: "character.galbrena.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.galbrena.eidolons.3.name", description: "character.galbrena.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.galbrena.eidolons.4.name", description: "character.galbrena.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.galbrena.eidolons.5.name", description: "character.galbrena.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.galbrena.concertDissipation.name",
    description: "character.galbrena.concertDissipation.description"
  },
  terms: [
    { name: "character.galbrena.terms.0.name", description: "character.galbrena.terms.0.description" },
    { name: "character.galbrena.terms.1.name", description: "character.galbrena.terms.1.description" },
    { name: "character.galbrena.terms.2.name", description: "character.galbrena.terms.2.description" },
    { name: "character.galbrena.terms.3.name", description: "character.galbrena.terms.3.description" },
    { name: "character.galbrena.terms.4.name", description: "character.galbrena.terms.4.description" },
    { name: "character.galbrena.terms.5.name", description: "character.galbrena.terms.5.description" },
    { name: "character.galbrena.terms.6.name", description: "character.galbrena.terms.6.description" },
    { name: "character.galbrena.terms.7.name", description: "character.galbrena.terms.7.description" }
  ],
  skillInput: {
    overview: "character.galbrena.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.galbrena.skillInput.inputs.0",
      "character.galbrena.skillInput.inputs.1",
      "character.galbrena.skillInput.inputs.2"
    ]
  }
};

export default galbrena;
