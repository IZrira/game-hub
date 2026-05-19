import { WuwaCharacter } from "../../../types";
import { createWwBaseStats } from "../../dataFactory";

const yinlin: WuwaCharacter = {
  id: "yinlin",
  gameId: "ww",
  name: "character.yinlin.name",
  folderName: "음림",
  attribute: "전도",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.yinlin.briefInfo",
  metadata: {
    name: "character.yinlin.name",
    brief: "character.yinlin.briefInfo",
    element: "전도",
    weapon: "증폭기",
    rarity: 5,
  },
  baseStats: createWwBaseStats(
    [880, 32, 105, 0],   // 1
    [2289, 83, 269, 0],  // 20
    [3617, 134, 424, 0], // 30
    [4359, 161, 510, 0], // 40
    [5687, 212, 665, 0], // 50
    [7015, 263, 820, 0], // 60
    [8343, 314, 974, 0], // 70
    [9672, 357, 1129, 0],// 80
    [11000, 400, 1283, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      { name: "저주파수 의음 성핵", count: 4 },
      { name: "중주파수 의음 성핵", count: 12 },
      { name: "고주파수 의음 성핵", count: 12 },
      { name: "전주파수 의음 성핵", count: 4 },
      { name: "악의 이종 성핵", count: 46 },
      { name: "구름버섯", count: 60 }
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      { name: "저주파수 의음 성핵", count: 25 },
      { name: "중주파수 의음 성핵", count: 28 },
      { name: "고주파수 의음 성핵", count: 40 },
      { name: "전주파수 의음 성핵", count: 57 },
      { name: "무망의 깃털", count: 26 },
      { name: "렌토 와전류", count: 28 },
      { name: "아다지오 와전류", count: 28 },
      { name: "안단테 와전류", count: 55 },
      { name: "프레스토 와전류", count: 67 }
    ]
  },
  skills: [
    { name: "character.yinlin.skills.0.name", description: "character.yinlin.skills.0.description", tag: "기본 공격" },
    { name: "character.yinlin.skills.1.name", description: "character.yinlin.skills.1.description", tag: "공명 스킬" },
    { name: "character.yinlin.skills.2.name", description: "character.yinlin.skills.2.description", tag: "공명 회로" },
    { name: "character.yinlin.skills.3.name", description: "character.yinlin.skills.3.description", tag: "공명 해방" },
    { name: "character.yinlin.skills.4.name", description: "character.yinlin.skills.4.description", tag: "변주 스킬" },
    { name: "character.yinlin.skills.5.name", description: "character.yinlin.skills.5.description", tag: "반주 스킬" }
  ],
  additionalAbilities: [
    { name: "character.yinlin.additionalAbilities.0.name", description: "character.yinlin.additionalAbilities.0.description" },
    { name: "character.yinlin.additionalAbilities.1.name", description: "character.yinlin.additionalAbilities.1.description" }
  ],
  eidolons: [
    { rank: "1", name: "character.yinlin.eidolons.0.name", description: "character.yinlin.eidolons.0.description" },
    { rank: "2", name: "character.yinlin.eidolons.1.name", description: "character.yinlin.eidolons.1.description" },
    { rank: "3", name: "character.yinlin.eidolons.2.name", description: "character.yinlin.eidolons.2.description" },
    { rank: "4", name: "character.yinlin.eidolons.3.name", description: "character.yinlin.eidolons.3.description" },
    { rank: "5", name: "character.yinlin.eidolons.4.name", description: "character.yinlin.eidolons.4.description" },
    { rank: "6", name: "character.yinlin.eidolons.5.name", description: "character.yinlin.eidolons.5.description" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 증폭기",
    description: "character.yinlin.concertDissipation.description"
  },
  terms: [
    { name: "character.yinlin.terms.0.name", description: "character.yinlin.terms.0.description" },
    { name: "character.yinlin.terms.1.name", description: "character.yinlin.terms.1.description" },
    { name: "character.yinlin.terms.2.name", description: "character.yinlin.terms.2.description" }
  ],
  skillInput: {
    overview: "character.yinlin.skillInput.overview",
    inputs: [
      { description: "character.yinlin.skillInput.inputs.0" }
    ]
  },
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "공명 스킬 피해", description: "비교적 높은 공명 스킬 피해" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "전도 피해 부스트", description: "파티 내 특정 캐릭터의 전도 피해 부스트 가능" },
    { label: "공명 해방 피해 부스트", description: "파티 내 특정 캐릭터의 공명 해방 피해 부스트 가능" }
  ],
  releaseVersion: "1.0",
  voiceActors: "🇰🇷 강새봄 / 🇺🇸 나오미 맥도널드 / 🇨🇳 샤오롄사(小連殺) / 🇯🇵 코시미즈 아미",
  languageNames: "🇰🇷 음림 / 🇺🇸 Yinlin / 🇨🇳 吟霖 / 🇯🇵 吟霖"
};

export default yinlin;
