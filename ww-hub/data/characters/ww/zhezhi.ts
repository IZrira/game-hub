import { WuwaCharacter } from '../../../types';

const zhezhi: WuwaCharacter = {
  id: "zhezhi",
  gameId: "ww",
  name: "절지",
  folderName: "절지",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "그림을 그리는 예술가이자 전투에서도 붓을 휘두르는 지휘관. 먹의 힘으로 전장을 물들인다.",
  releaseVersion: "1.2",
  languageNames: "🇰🇷 절지 / 🇺🇸 Zhezhi / 🇨🇳 折枝 / 🇯🇵 折枝",
  voiceActors: "🇰🇷 김예림 / 🇺🇸 메이 창 / 🇨🇳 자오항 / 🇯🇵 미사키 쿠노",
  baseStats: {
    lv1: { "기초 HP": 410, "기초 공격력": 49, "기초 방어력": 34 },
    lv80: { "기초 HP": 9600, "기초 공격력": 435, "기초 방어력": 310 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    { name: "먹의 붓놀림", tag: "공명 스킬", description: "먹물을 뿌려 범위 내 적들에게 응결 피해를 가한다.", icon: "skill_1" }
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  eidolons: []
};

export default zhezhi;
