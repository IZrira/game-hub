import { WuwaCharacter } from "../../../types";
import { createWwBaseStats } from "../../dataFactory";

const camellya: WuwaCharacter = {
  id: "camellya",
  gameId: "ww",
  name: "character.camellya.name",
  folderName: "카멜리아",
  attribute: "인멸",
  weaponType: "직검",
  rarity: 5,
  affiliation: "검은 해안",
  briefInfo: "character.camellya.briefInfo",
  metadata: {
    name: "character.camellya.name",
    brief: "character.camellya.briefInfo",
    element: "인멸",
    weapon: "직검",
    rarity: 5,
  },
  baseStats: createWwBaseStats(
    [826, 36, 95, 0],   // 1
    [2149, 94, 244, 0], // 20
    [3395, 151, 384, 0],// 30
    [4091, 181, 462, 0],// 40
    [5338, 239, 602, 0],// 50
    [6585, 296, 742, 0],// 60
    [7831, 353, 881, 0],// 70
    [9078, 402, 1021, 0],// 80
    [10325, 450, 1161, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      { name: "저주파수 의음 성핵", count: 4 },
      { name: "중주파수 의음 성핵", count: 12 },
      { name: "고주파수 의음 성핵", count: 12 },
      { name: "전주파수 의음 성핵", count: 4 },
      { name: "고요한 위상", count: 46 },
      { name: "신성", count: 60 }
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      { name: "저주파수 의음 성핵", count: 25 },
      { name: "중주파수 의음 성핵", count: 28 },
      { name: "고주파수 의음 성핵", count: 40 },
      { name: "전주파수 의음 성핵", count: 57 },
      { name: "무망의 깃털", count: 26 },
      { name: "비활성 금속 액적", count: 25 },
      { name: "활성 금속 액적", count: 28 },
      { name: "분극 금속 액적", count: 55 },
      { name: "이성질화 금속 액적", count: 67 }
    ]
  },
  skills: [
    { name: "character.camellya.skills.0.name", description: "character.camellya.skills.0.description", tag: "기본 공격" },
    { name: "character.camellya.skills.1.name", description: "character.camellya.skills.1.description", tag: "공명 스킬" },
    { name: "character.camellya.skills.2.name", description: "character.camellya.skills.2.description", tag: "공명 회로" },
    { name: "character.camellya.skills.3.name", description: "character.camellya.skills.3.description", tag: "공명 해방" },
    { name: "character.camellya.skills.4.name", description: "character.camellya.skills.4.description", tag: "변주 스킬" },
    { name: "character.camellya.skills.5.name", description: "character.camellya.skills.5.description", tag: "반주 스킬" }
  ],
  additionalAbilities: [
    { name: "character.camellya.additionalAbilities.0.name", description: "character.camellya.additionalAbilities.0.description" },
    { name: "character.camellya.additionalAbilities.1.name", description: "character.camellya.additionalAbilities.1.description" }
  ],
  eidolons: [
    { rank: "1", name: "character.camellya.eidolons.0.name", description: "character.camellya.eidolons.0.description" },
    { rank: "2", name: "character.camellya.eidolons.1.name", description: "character.camellya.eidolons.1.description" },
    { rank: "3", name: "character.camellya.eidolons.2.name", description: "character.camellya.eidolons.2.description" },
    { rank: "4", name: "character.camellya.eidolons.3.name", description: "character.camellya.eidolons.3.description" },
    { rank: "5", name: "character.camellya.eidolons.4.name", description: "character.camellya.eidolons.4.description" },
    { rank: "6", name: "character.camellya.eidolons.5.name", description: "character.camellya.eidolons.5.description" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.camellya.concertDissipation.description"
  },
  terms: [
    { name: "character.camellya.terms.0.name", description: "character.camellya.terms.0.description" }
  ],
  skillInput: {
    overview: "character.camellya.skillInput.overview",
    inputs: [
      { description: "character.camellya.skillInput.inputs.0" },
      { description: "character.camellya.skillInput.inputs.1" },
      { description: "character.camellya.skillInput.inputs.2" }
    ]
  },
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" }
  ],
  releaseVersion: "1.4",
  voiceActors: "유혜지 / 메이건 마틴 / 류쯔샤오 / 이세 마리야",
  languageNames: "카멜리아 / Camellya / 椿 / ツバキ"
};

export default camellya;
