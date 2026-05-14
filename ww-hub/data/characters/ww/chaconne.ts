import { WuwaCharacter } from "../../../types";
import { createWwBaseStats } from "../../dataFactory";

const chaconne: WuwaCharacter = {
  id: "chaconne",
  gameId: "ww",
  name: "character.chaconne.name",
  folderName: "샤콘",
  attribute: "기류",
  weaponType: "권총",
  rarity: 5,
  affiliation: "라군나",
  briefInfo: "character.chaconne.briefInfo",
  metadata: {
    name: "character.chaconne.name",
    brief: "character.chaconne.briefInfo",
    element: "기류",
    weapon: "권총",
    rarity: 5,
  },
  baseStats: createWwBaseStats(
    [979, 30, 98, 0],   // 1
    [2546, 78, 251, 0], // 20
    [4024, 126, 396, 0],// 30
    [4849, 151, 476, 0],// 40
    [6327, 199, 621, 0],// 50
    [7804, 247, 765, 0],// 60
    [9282, 294, 909, 0],// 70
    [10760, 335, 1054, 0],// 80
    [12238, 375, 1198, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      { name: "저주파수 침식 선형 구조물", count: 4 },
      { name: "중주파수 침식 선형 구조물", count: 12 },
      { name: "고주파수 침식 선형 구조물", count: 12 },
      { name: "전주파수 침식 선형 구조물", count: 4 },
      { name: "화염의 용뼈", count: 5 },
      { name: "「황금 양모」", count: 60 }
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      { name: "저주파수 침식 선형 구조물", count: 25 },
      { name: "중주파수 침식 선형 구조물", count: 28 },
      { name: "고주파수 침식 선형 구조물", count: 40 },
      { name: "전주파수 침식 선형 구조물", count: 57 },
      { name: "붓꽃이 만발하던 날", count: 26 },
      { name: "헤테로 결정화 연소", count: 25 },
      { name: "조추출 결정화 연소", count: 28 },
      { name: "정류 결정화 연소", count: 55 },
      { name: "고순도 결정화 연소", count: 67 }
    ]
  },
  skills: [
    { name: "character.chaconne.skills.0.name", description: "character.chaconne.skills.0.description", tag: "기본 공격" },
    { name: "character.chaconne.skills.1.name", description: "character.chaconne.skills.1.description", tag: "공명 스킬" },
    { name: "character.chaconne.skills.2.name", description: "character.chaconne.skills.2.description", tag: "공명 회로" },
    { name: "character.chaconne.skills.3.name", description: "character.chaconne.skills.3.description", tag: "공명 해방" },
    { name: "character.chaconne.skills.4.name", description: "character.chaconne.skills.4.description", tag: "변주 스킬" },
    { name: "character.chaconne.skills.5.name", description: "character.chaconne.skills.5.description", tag: "반주 스킬" }
  ],
  additionalAbilities: [
    { name: "character.chaconne.additionalAbilities.0.name", description: "character.chaconne.additionalAbilities.0.description" },
    { name: "character.chaconne.additionalAbilities.1.name", description: "character.chaconne.additionalAbilities.1.description" }
  ],
  eidolons: [
    { rank: "1", name: "character.chaconne.eidolons.0.name", description: "character.chaconne.eidolons.0.description" },
    { rank: "2", name: "character.chaconne.eidolons.1.name", description: "character.chaconne.eidolons.1.description" },
    { rank: "3", name: "character.chaconne.eidolons.2.name", description: "character.chaconne.eidolons.2.description" },
    { rank: "4", name: "character.chaconne.eidolons.3.name", description: "character.chaconne.eidolons.3.description" },
    { rank: "5", name: "character.chaconne.eidolons.4.name", description: "character.chaconne.eidolons.4.description" },
    { rank: "6", name: "character.chaconne.eidolons.5.name", description: "character.chaconne.eidolons.5.description" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 권총",
    description: "character.chaconne.concertDissipation.description"
  },
  terms: [
    { name: "character.chaconne.terms.0.name", description: "character.chaconne.terms.0.description" },
    { name: "character.chaconne.terms.1.name", description: "character.chaconne.terms.1.description" },
    { name: "character.chaconne.terms.2.name", description: "character.chaconne.terms.2.description" },
    { name: "character.chaconne.terms.3.name", description: "character.chaconne.terms.3.description" },
    { name: "character.chaconne.terms.4.name", description: "character.chaconne.terms.4.description" },
    { name: "character.chaconne.terms.5.name", description: "character.chaconne.terms.5.description" },
    { name: "character.chaconne.terms.6.name", description: "character.chaconne.terms.6.description" },
    { name: "character.chaconne.terms.7.name", description: "character.chaconne.terms.7.description" },
    { name: "character.chaconne.terms.8.name", description: "character.chaconne.terms.8.description" },
    { name: "character.chaconne.terms.9.name", description: "character.chaconne.terms.9.description" },
    { name: "character.chaconne.terms.10.name", description: "character.chaconne.terms.10.description" },
    { name: "character.chaconne.terms.11.name", description: "character.chaconne.terms.11.description" },
    { name: "character.chaconne.terms.12.name", description: "character.chaconne.terms.12.description" },
    { name: "character.chaconne.terms.13.name", description: "character.chaconne.terms.13.description" }
  ],
  skillInput: {
    overview: "character.chaconne.skillInput.overview",
    inputs: [
      { description: "character.chaconne.skillInput.inputs.0" },
      { description: "character.chaconne.skillInput.inputs.1" },
      { description: "character.chaconne.skillInput.inputs.2" },
      { description: "character.chaconne.skillInput.inputs.3" },
      { description: "character.chaconne.skillInput.inputs.4" }
    ]
  },
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "풍식", description: "풍식 효과 사용 가능" }
  ],
  releaseVersion: "2.3",
  voiceActors: "김예림 / 리베카 핸슨 / 예즈추 / 하세가와 이쿠미",
  languageNames: "샤콘 / Ciaccona / 夏空 / シャコンヌ"
};

export default chaconne;
