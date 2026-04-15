import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const huohuo: Character = {
  id: "huohuo",
  name: "character.huohuo.name",
  folderName: "곽향",
  gameId: "hsr",
  attribute: "바람",
  path: "풍요",
  rarity: 5,
  affiliation: "선주 「나부」",
  briefInfo: "character.huohuo.brief",
  version: "1.5",
  releaseVersion: "1.5",
  languageNames: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
  voiceActors: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
  metadata: {
    name: "character.huohuo.name",
    language: "🇰🇷 곽향 / 🇺🇸 Huohuo / 🇨🇳 藿藿 / 🇯🇵 フォフォ",
    element: "바람",
    path: "풍요",
    rarity: 5,
    affiliation: "선주 「나부」",
    cv: "🇰🇷 김채린 / 🇺🇸  메건 시프먼 / 🇨🇳 커즈레이 / 🇯🇵 나가나와 마리아",
    releaseVersion: "1.5",
    brief: "character.huohuo.brief"
  },
  baseStats: createHsrBaseStats(
    [185, 360, 527, 693, 859, 1026, 1192, 1358],
    [82, 160, 233, 307, 381, 454, 528, 602],
    [69, 135, 198, 260, 322, 385, 447, 509],
    98, 100, 140
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "308,000", 3),
      createMaterial("천인의 유해", 65, 4),
      createMaterial("영생의 새싹", 15, 2),
      createMaterial("영생의 꽃", 15, 3),
      createMaterial("영생의 가지", 15, 4)
    ],
    traces: [
      createMaterial("신용 포인트", "3,000,000", 3),
      createMaterial("운명의 발자취", 8, 5),
      createMaterial("무한한 가짜의 여한", 12, 4),
      createMaterial("풍요의 씨앗", 18, 2),
      createMaterial("생명의 새싹", 69, 3),
      createMaterial("영원의 꽃", 139, 4),
      createMaterial("영생의 새싹", 41, 2),
      createMaterial("영생의 꽃", 56, 3),
      createMaterial("영생의 가지", 58, 4)
    ]
  },
  skills: [
    createSkill("character.huohuo.skill.basic.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "character.huohuo.skill.basic.desc", "basic_atk_1"),
    createSkill("character.huohuo.skill.skill.name", "전투 스킬 | 회복", "에너지 회복 30", "0", "-1", "character.huohuo.skill.skill.desc", "skill_1"),
    createSkill("character.huohuo.skill.ult.name", "필살기 | 회복", "에너지 회복 5", "0", "0", "character.huohuo.skill.ult.desc", "ultimate_1"),
    createSkill("character.huohuo.skill.talent.name", "특성 | 회복", "0", "0", "0", "character.huohuo.skill.talent.desc", "talent_1"),
    createSkill("character.huohuo.skill.tech.name", "비술 | 회복", "0", "0", "0", "character.huohuo.skill.tech.desc", "technique_1")
  ],
  additionalAbilities: [
    { name: "character.huohuo.bonus.1.name", description: "character.huohuo.bonus.1.desc", icon: "bonus_1" },
    { name: "character.huohuo.bonus.2.name", description: "character.huohuo.bonus.2.desc", icon: "bonus_2" },
    { name: "character.huohuo.bonus.3.name", description: "character.huohuo.bonus.3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "HP", value: "28%", icon: "hp" },
    { type: "효과 저항", value: "18%", icon: "res" },
    { type: "속도", value: "5", icon: "spd" }
  ],
  eidolons: [
    { rank: "E01", name: "character.huohuo.eidolon.1.name", description: "character.huohuo.eidolon.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "character.huohuo.eidolon.2.name", description: "character.huohuo.eidolon.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "character.huohuo.eidolon.3.name", description: "character.huohuo.eidolon.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "character.huohuo.eidolon.4.name", description: "character.huohuo.eidolon.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "character.huohuo.eidolon.5.name", description: "character.huohuo.eidolon.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "character.huohuo.eidolon.6.name", description: "character.huohuo.eidolon.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "기본 확률": "special.base_chance.desc",
    "제어류 디버프": "special.control_debuff.desc",
    "[양명]": "character.huohuo.special.yangming.desc",
    "[백산]": "character.huohuo.special.baishan.desc"
  }
};

export default huohuo;
