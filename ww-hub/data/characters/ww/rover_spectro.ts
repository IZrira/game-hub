import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill } from '../../dataFactory';

const rover_spectro: WuwaCharacter = {
  id: "rover_spectro",
  gameId: "ww",
  name: "character.rover_spectro.name",
  folderName: "방랑자 · 회절",
  attribute: "회절",
  weaponType: "직검",
  rarity: 5,
  affiliation: "알 수 없음",
  briefInfo: "character.rover_spectro.briefInfo",
  isRover: true,
  metadata: {
    name: "character.rover_spectro.name",
    brief: "character.rover_spectro.briefInfo",
    element: "회절",
    weapon: "직검",
    rarity: 5
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 방랑자 · 회절 / 🇺🇸 Rover / 🇨🇳 漂泊者 / 🇯🇵 漂泊者",
  voiceActors: "🇰🇷 김신우&송하림 / 🇺🇸 체이스 브라운&제인 잭슨 / 🇨🇳 마양&장뤄위 / 🇯🇵 마스다 토시키&타나카 미나미",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "정체", description: "일정 범위 내에서 목표의 행동 속도 낮추기 가능" },
    { label: "광학", description: "광학 효과 사용 가능" }
  ],
  baseStats: {
    lv1: { "기초 HP": 912, "기초 공격력": 30, "기초 방어력": 112, "조화도 파괴 증폭": 0 },
    lv20: { "기초 HP": 2372, "기초 공격력": 78, "기초 방어력": 287, "조화도 파괴 증폭": 0 },
    lv30: { "기초 HP": 3749, "기초 공격력": 126, "기초 방어력": 452, "조화도 파괴 증폭": 0 },
    lv40: { "기초 HP": 4517, "기초 공격력": 151, "기초 방어력": 544, "조화도 파괴 증폭": 0 },
    lv50: { "기초 HP": 5894, "기초 공격력": 199, "기초 방어력": 709, "조화도 파괴 증폭": 0 },
    lv60: { "기초 HP": 7270, "기초 공격력": 247, "기초 방어력": 874, "조화도 파괴 증폭": 0 },
    lv70: { "기초 HP": 8647, "기초 공격력": 294, "기초 방어력": 1039, "조화도 파괴 증폭": 0 },
    lv80: { "기초 HP": 10023, "기초 공격력": 335, "기초 방어력": 1204, "조화도 파괴 증폭": 0 },
    lv90: { "기초 HP": 11400, "기초 공격력": 375, "기초 방어력": 1369, "조화도 파괴 증폭": 0 },
    speed: 100,
    taunt: 0,
    energy: 0
  },
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("신비한 암호", 5, 5),
      createMaterial("공작화", 60, 1)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("끊임없는 파괴", 26, 4),
      createMaterial("비활성 금속 액적", 25, 4),
      createMaterial("활성 금속 액적", 28, 4),
      createMaterial("분극 금속 액적", 55, 4),
      createMaterial("이성질화 금속 액적", 67, 4)
    ]
  },
  skills: [
    createWwSkill("character.rover_spectro.skills.0.name", "일반 공격", "character.rover_spectro.skills.0.description", "basic_1"),
    createWwSkill("character.rover_spectro.skills.1.name", "공명 스킬", "character.rover_spectro.skills.1.description", "skill_1"),
    createWwSkill("character.rover_spectro.skills.2.name", "공명 회로", "character.rover_spectro.skills.2.description", "talent_1"),
    createWwSkill("character.rover_spectro.skills.3.name", "공명 해방", "character.rover_spectro.skills.3.description", "ultimate_1"),
    createWwSkill("character.rover_spectro.skills.4.name", "변주 스킬", "character.rover_spectro.skills.4.description", "intro_1"),
    createWwSkill("character.rover_spectro.skills.5.name", "반주 스킬", "character.rover_spectro.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.rover_spectro.additionalAbilities.0.name", description: "character.rover_spectro.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.rover_spectro.additionalAbilities.1.name", description: "character.rover_spectro.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.rover_spectro.eidolons.0.name", description: "character.rover_spectro.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.rover_spectro.eidolons.1.name", description: "character.rover_spectro.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.rover_spectro.eidolons.2.name", description: "character.rover_spectro.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.rover_spectro.eidolons.3.name", description: "character.rover_spectro.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.rover_spectro.eidolons.4.name", description: "character.rover_spectro.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.rover_spectro.eidolons.5.name", description: "character.rover_spectro.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 직검",
    description: "character.rover_spectro.concertDissipation.description"
  },
  terms: [
    { name: "character.rover_spectro.terms.0.name", description: "character.rover_spectro.terms.0.description" },
    { name: "character.rover_spectro.terms.1.name", description: "character.rover_spectro.terms.1.description" }
  ],
  skillInput: {
    overview: "character.rover_spectro.skillInput.overview",
    inputs: [
      "character.rover_spectro.skillInput.inputs.0",
      "character.rover_spectro.skillInput.inputs.1",
      "character.rover_spectro.skillInput.inputs.2",
      "character.rover_spectro.skillInput.inputs.3"
    ]
  }
};

export default rover_spectro;
