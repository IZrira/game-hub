import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const mortefi: WuwaCharacter = {
  id: "mortefi",
  gameId: "ww",
  name: "character.mortefi.name",
  folderName: "모르테피",
  attribute: "용융",
  weaponType: "권총",
  rarity: 4,
  affiliation: "금주",
  briefInfo: "character.mortefi.briefInfo",
  metadata: {
    name: "character.mortefi.name",
    brief: "character.mortefi.briefInfo",
    element: "용융",
    weapon: "권총",
    rarity: 4,
  },
  releaseVersion: "1.0",
  languageNames: "🇰🇷 모르테피 / 🇺🇸 Mortefi / 🇨🇳 莫特斐 / 🇯🇵 モルトフィー",
  voiceActors: "🇰🇷 김다올 / 🇺🇸 조셉 메이 / 🇨🇳 류이자 / 🇯🇵 미우라 카츠유키",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "강공격 피해 부스트", description: "파티 내 특정 캐릭터의 강공격 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [802, 20, 93, 0],
    [2086, 52, 239, 0],
    [3297, 84, 375, 0],
    [3972, 101, 452, 0],
    [5183, 133, 589, 0],
    [6393, 164, 726, 0],
    [7604, 196, 863, 0],
    [8814, 223, 1000, 0],
    [10025, 250, 1137, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 의음 성핵", 4, 2),
      createMaterial("중주파수 의음 성핵", 12, 3),
      createMaterial("고주파수 의음 성핵", 12, 4),
      createMaterial("전주파수 의음 성핵", 4, 5),
      createMaterial("분노의 성핵", 46, 4),
      createMaterial("구름버섯", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 의음 성핵", 25, 2),
      createMaterial("중주파수 의음 성핵", 28, 3),
      createMaterial("고주파수 의음 성핵", 40, 4),
      createMaterial("전주파수 의음 성핵", 57, 5),
      createMaterial("비문 고종", 26, 4),
      createMaterial("헤테로 결정화 연소", 28, 2),
      createMaterial("조추출 결정화 연소", 28, 3),
      createMaterial("정류 결정화 연소", 55, 4),
      createMaterial("고순도 결정화 연소", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.mortefi.skills.0.name", "기본 공격", "character.mortefi.skills.0.description", "basic_1"),
    createWwSkill("character.mortefi.skills.1.name", "공명 스킬", "character.mortefi.skills.1.description", "skill_1"),
    createWwSkill("character.mortefi.skills.2.name", "공명 회로", "character.mortefi.skills.2.description", "talent_1"),
    createWwSkill("character.mortefi.skills.3.name", "공명 해방", "character.mortefi.skills.3.description", "ultimate_1"),
    createWwSkill("character.mortefi.skills.4.name", "변주 스킬", "character.mortefi.skills.4.description", "intro_1"),
    createWwSkill("character.mortefi.skills.5.name", "반주 스킬", "character.mortefi.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.mortefi.additionalAbilities.0.name", description: "character.mortefi.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.mortefi.additionalAbilities.1.name", description: "character.mortefi.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.mortefi.eidolons.0.name", description: "character.mortefi.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.mortefi.eidolons.1.name", description: "character.mortefi.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.mortefi.eidolons.2.name", description: "character.mortefi.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.mortefi.eidolons.3.name", description: "character.mortefi.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.mortefi.eidolons.4.name", description: "character.mortefi.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.mortefi.eidolons.5.name", description: "character.mortefi.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.mortefi.concertDissipation.name",
    description: "character.mortefi.concertDissipation.description"
  },
  terms: [
    { name: "character.mortefi.terms.0.name", description: "character.mortefi.terms.0.description" },
    { name: "character.mortefi.terms.1.name", description: "character.mortefi.terms.1.description" }
  ],
  skillInput: {
    overview: "character.mortefi.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.mortefi.skillInput.inputs.0"
    ]
  }
};

export default mortefi;
