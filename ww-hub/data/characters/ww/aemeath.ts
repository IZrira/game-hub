import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const aemeath: WuwaCharacter = {
  id: "aemeath",
  gameId: "ww",
  name: "character.aemeath.name",
  folderName: "에이메스",
  attribute: "용융",
  weaponType: "직검",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.aemeath.briefInfo",
  metadata: {
    name: "character.aemeath.name",
    brief: "character.aemeath.briefInfo",
    element: "용융",
    weapon: "직검",
    rarity: 5,
  },
  releaseVersion: "3.1",
  languageNames: "🇰🇷 에이메스 / 🇺🇸 Aemeath / 🇨🇳 爱弥斯 / 🇯🇵 エイメス",
  voiceActors: "🇰🇷 김하루 / 🇺🇸 카라 시어볼드 / 🇨🇳 왕야신 / 🇯🇵 사토 사토미",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "피해 부스트", description: "파티 내 특정 캐릭터의 피해 부스트 가능" },
    { label: "불꽃", description: "불꽃 효과 사용 가능" },
    { label: "조화 파동 대응", description: "목표에게 조화 파동 피해를 입힐 수 있다" }
  ],
  baseStats: createWwBaseStats(
    [882, 34, 94, 10],   // 1
    [2294, 88, 241, 0], // 20
    [3625, 143, 380, 0],// 30
    [4369, 171, 457, 0],// 40
    [5700, 225, 595, 0],// 50
    [7031, 280, 734, 0],// 60
    [8362, 334, 872, 0],// 70
    [9694, 379, 1011, 0],// 80
    [11025, 425, 1149, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 엑소스웜 성핵", 4, 2),
      createMaterial("중주파수 엑소스웜 성핵", 12, 3),
      createMaterial("고주파수 엑소스웜 성핵", 12, 4),
      createMaterial("전주파수 엑소스웜 성핵", 4, 5),
      createMaterial("우리의 선택", 46, 4),
      createMaterial("모스 엠버", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 엑소스웜 성핵", 25, 2),
      createMaterial("중주파수 엑소스웜 성핵", 28, 3),
      createMaterial("고주파수 엑소스웜 성핵", 40, 4),
      createMaterial("전주파수 엑소스웜 성핵", 57, 5),
      createMaterial("기억 속 금빛", 26, 4), 
      createMaterial("손상 날개 편광체", 28, 2),
      createMaterial("한쪽 날개 편광체", 28, 3),
      createMaterial("여러 날개 편광체", 55, 4),
      createMaterial("중첩 날개 편광체", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.aemeath.skills.0.name", "기본 공격", "character.aemeath.skills.0.description", "basic_1"),
    createWwSkill("character.aemeath.skills.1.name", "공명 스킬", "character.aemeath.skills.1.description", "skill_1"),
    createWwSkill("character.aemeath.skills.2.name", "공명 회로", "character.aemeath.skills.2.description", "talent_1"),
    createWwSkill("character.aemeath.skills.3.name", "공명 해방", "character.aemeath.skills.3.description", "ultimate_1"),
    createWwSkill("character.aemeath.skills.4.name", "변주 스킬", "character.aemeath.skills.4.description", "intro_1"),
    createWwSkill("character.aemeath.skills.5.name", "반주 스킬", "character.aemeath.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.aemeath.additionalAbilities.0.name", description: "character.aemeath.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.aemeath.additionalAbilities.1.name", description: "character.aemeath.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.aemeath.eidolons.0.name", description: "character.aemeath.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.aemeath.eidolons.1.name", description: "character.aemeath.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.aemeath.eidolons.2.name", description: "character.aemeath.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.aemeath.eidolons.3.name", description: "character.aemeath.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.aemeath.eidolons.4.name", description: "character.aemeath.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.aemeath.eidolons.5.name", description: "character.aemeath.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "불리지 못한 멜로디",
    description: "character.aemeath.concertDissipation.description"
  },
  terms: [
    { name: "character.aemeath.terms.0.name", description: "character.aemeath.terms.0.description" },
    { name: "character.aemeath.terms.1.name", description: "character.aemeath.terms.1.description" },
    { name: "character.aemeath.terms.2.name", description: "character.aemeath.terms.2.description" },
    { name: "character.aemeath.terms.3.name", description: "character.aemeath.terms.3.description" },
    { name: "character.aemeath.terms.4.name", description: "character.aemeath.terms.4.description" },
    { name: "character.aemeath.terms.5.name", description: "character.aemeath.terms.5.description" },
    { name: "character.aemeath.terms.6.name", description: "character.aemeath.terms.6.description" },
    { name: "character.aemeath.terms.7.name", description: "character.aemeath.terms.7.description" },
    { name: "character.aemeath.terms.8.name", description: "character.aemeath.terms.8.description" },
    { name: "character.aemeath.terms.9.name", description: "character.aemeath.terms.9.description" },
    { name: "character.aemeath.terms.10.name", description: "character.aemeath.terms.10.description" },
    { name: "character.aemeath.terms.11.name", description: "character.aemeath.terms.11.description" },
    { name: "character.aemeath.terms.12.name", description: "character.aemeath.terms.12.description" }
  ],
  skillInput: {
    overview: "character.aemeath.skillInput.overview",
    hideGauge: true,
    inputs: []
  }
};

export default aemeath;
