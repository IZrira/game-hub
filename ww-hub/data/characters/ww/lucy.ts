import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const lucy: WuwaCharacter = {
  id: "lucy",
  gameId: "ww",
  name: "character.lucy.name",
  folderName: "루시",
  attribute: "회절",
  weaponType: "권총",
  rarity: 5,
  affiliation: "라하이 로이",
  briefInfo: "character.lucy.briefInfo",
  metadata: {
    name: "character.lucy.name",
    brief: "character.lucy.briefInfo",
    element: "회절",
    weapon: "권총",
    rarity: 5,
  },
  releaseVersion: "3.4",
  languageNames: "🇰🇷 루시 / 🇺🇸 Lucy / 🇨🇳 露西 / 🇯🇵 ルーシー",
  voiceActors: "🇰🇷 김가령 / 🇺🇸 에미 로 / 🇨🇳 쏭정난 / 🇯🇵 유우키 아오이",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "강공격 피해", description: "비교적 높은 강공격 피해" },
    { label: "일반 공격 피해 부스트", description: "파티 내 특정 캐릭터의 일반 공격 피해 부스트 가능" },
    { label: "해킹 대응", description: "목표에게 해킹 피해를 입힐 수 있다" }
  ],
  baseStats: createWwBaseStats(
    [882, 34, 94, 10],
    [2294, 88, 241, 0],
    [3625, 143, 380, 0],
    [4369, 171, 457, 0],
    [5700, 225, 595, 0],
    [7031, 280, 734, 0],
    [8362, 334, 872, 0],
    [9694, 379, 1011, 0],
    [11025, 425, 1149, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 엑소스웜 성핵", 4, 2),
      createMaterial("중주파수 엑소스웜 성핵", 12, 3),
      createMaterial("고주파수 엑소스웜 성핵", 12, 4),
      createMaterial("전주파수 엑소스웜 성핵", 4, 5),
      createMaterial("악몽의 잔재", 46, 4),
      createMaterial("지난날의 환상", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 엑소스웜 성핵", 25, 2),
      createMaterial("중주파수 엑소스웜 성핵", 28, 3),
      createMaterial("고주파수 엑소스웜 성핵", 40, 4),
      createMaterial("전주파수 엑소스웜 성핵", 57, 5),
      createMaterial("기억 속 금빛", 26, 5),
      createMaterial("결손 응집 연소체", 25, 2),
      createMaterial("잔음 응집 연소체", 28, 3),
      createMaterial("잔향 응집 연소체", 55, 4),
      createMaterial("울림 응집 연소체", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.lucy.skills.0.name", "일반 공격", "character.lucy.skills.0.description", "basic_1"),
    createWwSkill("character.lucy.skills.1.name", "공명 스킬", "character.lucy.skills.1.description", "skill_1"),
    createWwSkill("character.lucy.skills.2.name", "공명 회로", "character.lucy.skills.2.description", "talent_1"),
    createWwSkill("character.lucy.skills.3.name", "공명 해방", "character.lucy.skills.3.description", "ultimate_1"),
    createWwSkill("character.lucy.skills.4.name", "변주 스킬", "character.lucy.skills.4.description", "intro_1"),
    createWwSkill("character.lucy.skills.5.name", "반주 스킬", "character.lucy.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.lucy.additionalAbilities.0.name", description: "character.lucy.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.lucy.additionalAbilities.1.name", description: "character.lucy.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.lucy.eidolons.0.name", description: "character.lucy.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.lucy.eidolons.1.name", description: "character.lucy.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.lucy.eidolons.2.name", description: "character.lucy.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.lucy.eidolons.3.name", description: "character.lucy.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.lucy.eidolons.4.name", description: "character.lucy.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.lucy.eidolons.5.name", description: "character.lucy.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 데이터 크래시",
    description: "character.lucy.concertDissipation.description"
  },
  terms: [
    { name: "character.lucy.terms.0.name", description: "character.lucy.terms.0.description" },
    { name: "character.lucy.terms.1.name", description: "character.lucy.terms.1.description" },
    { name: "character.lucy.terms.2.name", description: "character.lucy.terms.2.description" },
    { name: "character.lucy.terms.3.name", description: "character.lucy.terms.3.description" },
    { name: "character.lucy.terms.4.name", description: "character.lucy.terms.4.description" },
    { name: "character.lucy.terms.5.name", description: "character.lucy.terms.5.description" },
    { name: "character.lucy.terms.6.name", description: "character.lucy.terms.6.description" },
    { name: "character.lucy.terms.7.name", description: "character.lucy.terms.7.description" }
  ],
  skillInput: {
    hideGauge: true,
    overview: "character.lucy.skillInput.overview",
    inputs: [
      "character.lucy.skillInput.inputs.0",
      "character.lucy.skillInput.inputs.1",
      "character.lucy.skillInput.inputs.2"
    ]
  }
};

export default lucy;
