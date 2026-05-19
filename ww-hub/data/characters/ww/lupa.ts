import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const lupa: WuwaCharacter = {
  id: "lupa",
  gameId: "ww",
  name: "character.lupa.name",
  folderName: "루파",
  attribute: "용융",
  weaponType: "대검",
  rarity: 5,
  affiliation: "일곱 언덕",
  briefInfo: "character.lupa.briefInfo",
  metadata: {
    name: "character.lupa.name",
    brief: "character.lupa.briefInfo",
    element: "용융",
    weapon: "대검",
    rarity: 5,
  },
  releaseVersion: "2.4",
  languageNames: "🇰🇷 루파 / 🇺🇸 Lupa / 🇨🇳 露帕 / 🇯🇵 ル파",
  voiceActors: "🇰🇷 김예령 / 🇺🇸 카야 찬 / 🇨🇳 朔小兔 / 🇯🇵 타카하시 미나미",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "용융 피해 부스트", description: "파티 내 특정 캐릭터의 용융 피해 부스트 가능" },
    { label: "일반 공격 피해 부스트", description: "파티 내 특정 캐릭터의 일반 공격 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [953, 31, 97, 0],    // 1
    [2479, 81, 249, 0],   // 20
    [3917, 130, 392, 0],  // 30
    [4720, 156, 472, 0],  // 40
    [6159, 206, 614, 0],  // 50
    [7597, 255, 757, 0],  // 60
    [9036, 304, 900, 0],  // 70
    [10474, 346, 1043, 0],// 80
    [11913, 388, 1186, 0] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 포효 성핵", 4, 2),
      createMaterial("중주파수 포효 성핵", 12, 3),
      createMaterial("고주파수 포효 성핵", 12, 4),
      createMaterial("전주파수 포효 성핵", 4, 5),
      createMaterial("불후의 영광", 46, 4),
      createMaterial("블러드 바이버넘", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 포효 성핵", 25, 2),
      createMaterial("중주파수 포효 성핵", 28, 3),
      createMaterial("고주파수 포효 성핵", 40, 4),
      createMaterial("전주파수 포효 성핵", 57, 5),
      createMaterial("저편 세계의 눈빛", 26, 4),
      createMaterial("비명 이상 키메라 210", 28, 2),
      createMaterial("비명 이상 키메라 226", 28, 3),
      createMaterial("비명 이상 키메라 235", 55, 4),
      createMaterial("비명 이상 키메라 239", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.lupa.skills.0.name", "기본 공격", "character.lupa.skills.0.description", "basic_1"),
    createWwSkill("character.lupa.skills.1.name", "공명 스킬", "character.lupa.skills.1.description", "skill_1"),
    createWwSkill("character.lupa.skills.2.name", "공명 회로", "character.lupa.skills.2.description", "talent_1"),
    createWwSkill("character.lupa.skills.3.name", "공명 해방", "character.lupa.skills.3.description", "ultimate_1"),
    createWwSkill("character.lupa.skills.4.name", "변주 스킬", "character.lupa.skills.4.description", "intro_1"),
    createWwSkill("character.lupa.skills.5.name", "반주 스킬", "character.lupa.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.lupa.additionalAbilities.0.name", description: "character.lupa.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.lupa.additionalAbilities.1.name", description: "character.lupa.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.lupa.eidolons.0.name", description: "character.lupa.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.lupa.eidolons.1.name", description: "character.lupa.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.lupa.eidolons.2.name", description: "character.lupa.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.lupa.eidolons.3.name", description: "character.lupa.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.lupa.eidolons.4.name", description: "character.lupa.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.lupa.eidolons.5.name", description: "character.lupa.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.lupa.concertDissipation.name",
    description: "character.lupa.concertDissipation.description"
  },
  terms: [
    { name: "character.lupa.terms.0.name", description: "character.lupa.terms.0.description" },
    { name: "character.lupa.terms.1.name", description: "character.lupa.terms.1.description" },
    { name: "character.lupa.terms.2.name", description: "character.lupa.terms.2.description" },
    { name: "character.lupa.terms.3.name", description: "character.lupa.terms.3.description" },
    { name: "character.lupa.terms.4.name", description: "character.lupa.terms.4.description" }
  ],
  skillInput: {
    overview: "character.lupa.skillInput.overview",
    hideGauge: false,
    inputs: [
      "character.lupa.skillInput.inputs.0",
      "character.lupa.skillInput.inputs.1",
      "character.lupa.skillInput.inputs.2",
      "character.lupa.skillInput.inputs.3",
      "character.lupa.skillInput.inputs.4",
      "character.lupa.skillInput.inputs.5"
    ]
  }
};

export default lupa;
