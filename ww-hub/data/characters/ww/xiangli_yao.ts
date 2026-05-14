import { WuwaCharacter } from "../../../types";
import { createWwBaseStats } from "../../dataFactory";

const xiangliYao: WuwaCharacter = {
  id: "xiangli_yao",
  gameId: "ww",
  name: "character.xiangli_yao.name",
  folderName: "상리요",
  attribute: "전도",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.xiangli_yao.briefInfo",
  metadata: {
    name: "character.xiangli_yao.name",
    brief: "character.xiangli_yao.briefInfo",
    element: "전도",
    weapon: "권갑",
    rarity: 5,
  },
  baseStats: createWwBaseStats(
    [850, 34, 100, 0],   // 1
    [2211, 88, 257, 0],  // 20
    [3494, 143, 404, 0], // 30
    [4210, 171, 486, 0], // 40
    [5493, 225, 633, 0], // 50
    [6776, 280, 781, 0], // 60
    [8059, 334, 928, 0], // 70
    [9342, 379, 1075, 0],// 80
    [10625, 425, 1222, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      { name: "저주파수 의음 성핵", count: 4 },
      { name: "중주파수 의음 성핵", count: 12 },
      { name: "고주파수 의음 성핵", count: 12 },
      { name: "전주파수 의음 성핵", count: 4 },
      { name: "벼락의 성핵", count: 46 },
      { name: "보라색 산호", count: 60 }
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      { name: "저주파수 의음 성핵", count: 25 },
      { name: "중주파수 의음 성핵", count: 28 },
      { name: "고주파수 의음 성핵", count: 40 },
      { name: "전주파수 의음 성핵", count: 57 },
      { name: "끊임없는 파괴", count: 26 },
      { name: "음률의 배주", count: 28 },
      { name: "음률의 새싹", count: 28 },
      { name: "음률의 새잎", count: 55 },
      { name: "음률의 꽃망울", count: 67 }
    ]
  },
  skills: [
    { name: "character.xiangli_yao.skills.0.name", description: "character.xiangli_yao.skills.0.description", tag: "일반 공격" },
    { name: "character.xiangli_yao.skills.1.name", description: "character.xiangli_yao.skills.1.description", tag: "공명 스킬" },
    { name: "character.xiangli_yao.skills.2.name", description: "character.xiangli_yao.skills.2.description", tag: "공명 회로" },
    { name: "character.xiangli_yao.skills.3.name", description: "character.xiangli_yao.skills.3.description", tag: "공명 해방" },
    { name: "character.xiangli_yao.skills.4.name", description: "character.xiangli_yao.skills.4.description", tag: "변주 스킬" },
    { name: "character.xiangli_yao.skills.5.name", description: "character.xiangli_yao.skills.5.description", tag: "반주 스킬" }
  ],
  additionalAbilities: [
    { name: "character.xiangli_yao.additionalAbilities.0.name", description: "character.xiangli_yao.additionalAbilities.0.description" },
    { name: "character.xiangli_yao.additionalAbilities.1.name", description: "character.xiangli_yao.additionalAbilities.1.description" }
  ],
  eidolons: [
    { rank: "1", name: "character.xiangli_yao.eidolons.0.name", description: "character.xiangli_yao.eidolons.0.description" },
    { rank: "2", name: "character.xiangli_yao.eidolons.1.name", description: "character.xiangli_yao.eidolons.1.description" },
    { rank: "3", name: "character.xiangli_yao.eidolons.2.name", description: "character.xiangli_yao.eidolons.2.description" },
    { rank: "4", name: "character.xiangli_yao.eidolons.3.name", description: "character.xiangli_yao.eidolons.3.description" },
    { rank: "5", name: "character.xiangli_yao.eidolons.4.name", description: "character.xiangli_yao.eidolons.4.description" },
    { rank: "6", name: "character.xiangli_yao.eidolons.5.name", description: "character.xiangli_yao.eidolons.5.description" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 권갑",
    description: "character.xiangli_yao.concertDissipation.description"
  },
  terms: [
    { name: "character.xiangli_yao.terms.0.name", description: "character.xiangli_yao.terms.0.description" },
    { name: "character.xiangli_yao.terms.1.name", description: "character.xiangli_yao.terms.1.description" }
  ],
    skillInput: {
      overview: "character.xiangli_yao.skillInput.overview",
      hideGauge: true,
      inputs: [
        { description: "character.xiangli_yao.skillInput.inputs.0" },
        { description: "character.xiangli_yao.skillInput.inputs.1" },
        { description: "character.xiangli_yao.skillInput.inputs.2" }
      ]
    },
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" }
  ],
  releaseVersion: "1.2",
  voiceActors: "정의진 / 숀 멘덤 / 반마 / 코바야시 치아키",
  languageNames: "상리요 / Xiangli Yao / 相里要 / 相里要"
};

export default xiangliYao;
