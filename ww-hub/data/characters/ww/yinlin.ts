import { WuwaCharacter } from '../../../types';

const yinlin: WuwaCharacter = {
  id: "yinlin",
  gameId: "ww",
  name: "음림",
  folderName: "음림",
  attribute: "전도",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "심판관 출신의 방랑자. 인형을 조종하여 전장을 휩쓰는 광역 딜러이다.",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 음림 / 🇺🇸 Yinlin / 🇨🇳 吟霖 / 🇯🇵 吟霖",
  voiceActors: "🇰🇷 박리나 / 🇺🇸 에밀리 구 / 🇨🇳 샤오옌 / 🇯🇵 코시미즈 아미",
  baseStats: {
    lv1: { "기초 HP": 420, "기초 공격력": 48, "기초 방어력": 35 },
    lv80: { "기초 HP": 9800, "기초 공격력": 410, "기초 방어력": 320 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    { name: "번개의 채찍", tag: "공명 스킬", description: "인형을 휘둘러 전도 피해를 가한다.", icon: "skill_1" }
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  eidolons: []
};

export default yinlin;
