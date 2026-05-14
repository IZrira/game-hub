import { WuwaCharacter } from '../../../types';
import { createWwBaseStats, createWwSkill } from '../../dataFactory';

const changli: WuwaCharacter = {
  id: "changli",
  gameId: "ww",
  name: "character.changli.name",
  folderName: "장리",
  attribute: "용융",
  weaponType: "직검",
  rarity: 5,
  affiliation: "금주",
  briefInfo: "character.changli.briefInfo",
  metadata: {
    name: "character.changli.name",
    brief: "character.changli.briefInfo",
    element: "용융",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "1.1",
  languageNames: "🇰🇷 장리 / 🇺🇸 Changli / 🇨🇳 长离 / 🇯🇵 長離",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 브리아나 닉커보커 / 🇨🇳 루이인 / 🇯🇵 사이토 치와",
  baseStats: createWwBaseStats([435, 50, 37], [10100, 445, 340]),
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    createWwSkill("character.changli.skills.0.name", "공명 스킬", "character.changli.skills.0.description", "skill_1")
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.changli.concertDissipation.description"
  },
  eidolons: []
};

export default changli;
