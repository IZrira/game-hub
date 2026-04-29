import { WuwaCharacter } from '../../../types';

const jinhsi: WuwaCharacter = {
  id: "jinhsi",
  gameId: "ww",
  name: "금희",
  folderName: "금희",
  attribute: "회절",
  weaponType: "대검",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "금주의 영주. 용의 힘을 다스려 강력한 회절 피해를 입힌다.",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 금희 / 🇺🇸 Jinhsi / 🇨🇳 今汐 / 🇯🇵 今汐",
  voiceActors: "🇰🇷 정재헌 / 🇺🇸 메건 필립스 / 🇨🇳 산신 / 🇯🇵 혼도 카에데",
  baseStats: {
    lv1: { "기초 HP": 440, "기초 공격력": 52, "기초 방어력": 38 },
    lv80: { "기초 HP": 10200, "기초 공격력": 460, "기초 방어력": 350 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    { name: "용의 승천", tag: "공명 스킬", description: "회절 에너지를 모아 폭발적인 피해를 가한다.", icon: "skill_1" }
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  eidolons: []
};

export default jinhsi;
