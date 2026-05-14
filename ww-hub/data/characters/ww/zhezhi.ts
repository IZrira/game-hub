import { WuwaCharacter } from '../../../types';
import { createWwBaseStats, createWwSkill } from '../../dataFactory';

const zhezhi: WuwaCharacter = {
  id: "zhezhi",
  gameId: "ww",
  name: "character.zhezhi.name",
  folderName: "절지",
  attribute: "응결",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.zhezhi.briefInfo",
  metadata: {
    name: "character.zhezhi.name",
    brief: "character.zhezhi.briefInfo",
    element: "응결",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "1.2",
  languageNames: "🇰🇷 절지 / 🇺🇸 Zhezhi / 🇨🇳 折枝 / 🇯🇵 折枝",
  voiceActors: "🇰🇷 김예림 / 🇺🇸 메이 창 / 🇨🇳 자오항 / 🇯🇵 미사키 쿠노",
  baseStats: createWwBaseStats([410, 49, 34], [9600, 435, 310]),
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    createWwSkill("character.zhezhi.skills.0.name", "공명 스킬", "character.zhezhi.skills.0.description", "skill_1")
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  concertDissipation: {
    name: "조화도 파괴 · 증폭기",
    description: "character.zhezhi.concertDissipation.description"
  },
  eidolons: []
};

export default zhezhi;
