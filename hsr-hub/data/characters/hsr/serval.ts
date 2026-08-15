import { Character } from '../../../../common-hub/types';
import { createHsrBaseStats, createMaterial, createSkill } from '../../dataFactory';

const serval: Character = {
  id: "serval",
  gameId: "hsr",
  name: "서벌",
  folderName: "서벌",
  attribute: "번개",
  path: "지식",
  rarity: 4,
  affiliation: "벨로보그",
  briefInfo: "축성가 기술 부서의 연구원이었던 벨로보그의 엔지니어\n게파드•랜도의 누나지만 남동생과 전혀 다른 성격을 가졌다\n한파 이전에 있던 「로큰롤」이라는 고대 음악에 빠져있다",
  releaseVersion: "1.0",
  languageNames: "🇰🇷 서벌 / 🇺🇸 Serval / 🇨🇳 希露瓦 / 🇯🇵 セーバル",
  voiceActors: "🇰🇷 민아 / 🇺🇸 나탈리 반 시스틴 / 🇨🇳 무페이 / 🇯🇵 아이미",
  baseStats: createHsrBaseStats(
    [124, 243, 355, 466, 578, 690, 801, 912],
    [88, 173, 252, 331, 411, 490, 570, 649],
    [51, 99, 145, 191, 236, 282, 328, 374],
    104, 75, 100
  ),
  materials_v2: {
    ascension: [
      createMaterial("신용 포인트", "246,400", 3),
      createMaterial("과거 그림자의 번개 왕관", 50, 4),
      createMaterial("철위대 배지", 12, 2),
      createMaterial("철위대 표식", 13, 3),
      createMaterial("철위대 훈장", 12, 4)
    ],
    traces: [
      createMaterial("신용 포인트", "1,758,000", 3),
      createMaterial("운명의 발자취", 5, 5),
      createMaterial("수호자의 비원(悲願)", 12, 4),
      createMaterial("영감의 열쇠", 12, 2),
      createMaterial("계몽의 열쇠", 54, 3),
      createMaterial("지식의 열쇠", 105, 4),
      createMaterial("철위대 배지", 28, 2),
      createMaterial("철위대 표식", 42, 3),
      createMaterial("철위대 훈장", 42, 4)
    ]
  },
  skills: [
    createSkill("character.serval.skill.basic.name", "일반 공격 | 단일 공격", "에너지 회복 20", "약점 격파 단일 공격 10", "+1", "character.serval.skill.basic.desc", "basic_atk_1"),
    createSkill("character.serval.skill.skill.name", "전투 스킬 | 확산", "에너지 회복 30", "약점 격파 확산 20", "-1", "character.serval.skill.skill.desc", "skill_1"),
    createSkill("character.serval.skill.ult.name", "필살기 | 범위 공격", "에너지 회복 5", "약점 격파 범위 공격 20", "0", "character.serval.skill.ult.desc", "ultimate_1"),
    createSkill("character.serval.skill.talent.name", "특성 | 단일 공격", "0", "0", "0", "character.serval.skill.talent.desc", "talent_1"),
    createSkill("character.serval.skill.tech.name", "비술 | 단일 공격", "0", "약점 격파 단일 공격 20", "0", "character.serval.skill.tech.desc", "technique_1")
  ],
  additionalAbilities: [
    { name: "character.serval.bonus.1.name", description: "character.serval.bonus.1.desc", icon: "bonus_1" },
    { name: "character.serval.bonus.2.name", description: "character.serval.bonus.2.desc", icon: "bonus_2" },
    { name: "character.serval.bonus.3.name", description: "character.serval.bonus.3.desc", icon: "bonus_3" }
  ],
  attributeBonuses: [
    { type: "치명타 확률", value: "18.7%", icon: "crit_rate" },
    { type: "효과 명중", value: "18.0%", icon: "effect_hit_rate" },
    { type: "효과 저항", value: "10.0%", icon: "effect_res" }
  ],
  eidolons: [
    { rank: "E01", name: "character.serval.eidolon.1.name", description: "character.serval.eidolon.1.desc", icon: "eidolon_1" },
    { rank: "E02", name: "character.serval.eidolon.2.name", description: "character.serval.eidolon.2.desc", icon: "eidolon_2" },
    { rank: "E03", name: "character.serval.eidolon.3.name", description: "character.serval.eidolon.3.desc", icon: "eidolon_3" },
    { rank: "E04", name: "character.serval.eidolon.4.name", description: "character.serval.eidolon.4.desc", icon: "eidolon_4" },
    { rank: "E05", name: "character.serval.eidolon.5.name", description: "character.serval.eidolon.5.desc", icon: "eidolon_5" },
    { rank: "E06", name: "character.serval.eidolon.6.name", description: "character.serval.eidolon.6.desc", icon: "eidolon_6" }
  ],
  specialTerms: {
    "추가 피해": "special.additional_dmg.desc"
  }
};

export default serval;
