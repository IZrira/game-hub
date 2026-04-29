import { WuwaCharacter } from '../../../types';

const changli: WuwaCharacter = {
  id: "changli",
  gameId: "ww",
  name: "장리",
  folderName: "장리",
  attribute: "용융",
  weaponType: "직검",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "금주 영주의 스승이자 불사조의 힘을 다스리는 무사. 화려한 검술로 적을 압도한다.",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 장리 / 🇺🇸 Changli / 🇨🇳 长离 / 🇯🇵 長離",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 브리아나 닉커보커 / 🇨🇳 루이인 / 🇯🇵 사이토 치와",
  baseStats: {
    lv1: { "기초 HP": 435, "기초 공격력": 50, "기초 방어력": 37 },
    lv80: { "기초 HP": 10100, "기초 공격력": 445, "기초 방어력": 340 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    { name: "불사조의 날개짓", tag: "공명 스킬", description: "화염의 기운을 모아 적을 베어 넘긴다.", icon: "skill_1" }
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  eidolons: []
};

export default changli;
