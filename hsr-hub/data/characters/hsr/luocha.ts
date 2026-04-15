
import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const luocha: Character = {
  id: "luocha",
  name: "나찰",
  folderName: "나찰",
  gameId: "hsr",
  attribute: "허수",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 의술이 뛰어난 화외 행상",
  version: "1.1",
  releaseVersion: "1.1",
  languageNames: "🇰🇷 나찰 / 🇺🇸 Luocha / 🇨🇳 罗刹 / 🇯🇵 羅刹",
  voiceActors: "🇰🇷 신용우 / 🇺🇸 크레이그 리 토머스 / 🇨🇳 자오루 / 🇯🇵 이시다 아키라",
  metadata: {
    name: "나찰",
    language: "🇰🇷 나찰 / 🇺🇸 Luocha / 🇨🇳 罗刹 / 🇯🇵 羅刹",
    element: "허수",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 신용우 / 🇺🇸 크레이그 리 토머스 / 🇨🇳 자오루 / 🇯🇵 이시다 아키라",
    releaseVersion: "1.1",
    brief: "늘 관을 지니고 다니는 하늘 밖의 바다에서 온 의술이 뛰어난 화외 행상"
  },
  baseStats: createHsrBaseStats(
    [174, 340, 497, 653, 810, 967, 1124, 1281],
    [103, 201, 293, 386, 479, 571, 664, 757],
    [50, 97, 141, 186, 230, 275, 319, 364],
    101, 100, 100
  ),
  materials_v2: {
    ascension: [
      createMaterial("material.credit", "308,000", 3),
      createMaterial("material.golden_crown_of_the_past_shadow", "65", 4),
      createMaterial("material.artifexs_module", "15", 2),
      createMaterial("material.artifexs_cogwheel", "15", 3),
      createMaterial("material.artifexs_gyreheart", "15", 4)
    ],
    traces: [
      createMaterial("material.credit", "3,000,000", 3),
      createMaterial("material.tracks_of_destiny", "8", 5),
      createMaterial("material.guardians_lament", "12", 4),
      createMaterial("material.seed_of_abundance", "18", 2),
      createMaterial("material.sprout_of_life", "69", 3),
      createMaterial("material.flower_of_eternity", "139", 4),
      createMaterial("material.artifexs_module", "41", 2),
      createMaterial("material.artifexs_cogwheel", "56", 3),
      createMaterial("material.artifexs_gyreheart", "58", 4)
    ]
  },
  skills: [
    createSkill("character.luocha.skill.basic.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "character.luocha.skill.basic.desc", "basic_atk_1"),
    createSkill("character.luocha.skill.skill.name", "전투 스킬 | 회복", "에너지 회복 30", "0", "-1", "character.luocha.skill.skill.desc", "skill_1"),
    createSkill("character.luocha.skill.ult.name", "필살기 | 범위 공격", "에너지 회복 5", "약점 격파 범위 20", "0", "character.luocha.skill.ult.desc", "ultimate_1"),
    createSkill("character.luocha.skill.talent.name", "특성 | 회복", "0", "0", "0", "character.luocha.skill.talent.desc", "talent_1"),
    createSkill("character.luocha.skill.technique.name", "비술 | 강화", "0", "0", "0", "character.luocha.skill.technique.desc", "technique_1")
  ],
  additionalAbilities: [
    { name: "character.luocha.ability.1.name", description: "character.luocha.ability.1.desc", icon: "bonus_1" },
    { name: "character.luocha.ability.2.name", description: "character.luocha.ability.2.desc", icon: "bonus_2" },
    { name: "character.luocha.ability.3.name", description: "character.luocha.ability.3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "공격력", value: "28%", icon: "atk" },
    { type: "HP", value: "18%", icon: "hp" },
    { type: "방어력", value: "12.5%", icon: "def" }
  ],
  eidolons: [
    { rank: "E01", name: "character.luocha.eidolon.1.name", description: "character.luocha.eidolon.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "character.luocha.eidolon.2.name", description: "character.luocha.eidolon.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "character.luocha.eidolon.3.name", description: "character.luocha.eidolon.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "character.luocha.eidolon.4.name", description: "character.luocha.eidolon.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "character.luocha.eidolon.5.name", description: "character.luocha.eidolon.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "character.luocha.eidolon.6.name", description: "character.luocha.eidolon.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "term.fixed_chance": "term.fixed_chance.desc",
    "term.abyss_flower": "term.abyss_flower.desc",
    "term.field": "term.field.desc"
  }
};

export default luocha;
