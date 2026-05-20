import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const hiyuki: WuwaCharacter = {
  id: "hiyuki",
  gameId: "ww",
  name: "character.hiyuki.name",
  folderName: "히유키",
  attribute: "응결",
  weaponType: "직검",
  rarity: 5,
  affiliation: "타오르는 벚꽃의 무녀",
  briefInfo: "character.hiyuki.briefInfo",
  metadata: {
    name: "character.hiyuki.name",
    brief: "character.hiyuki.briefInfo",
    element: "응결",
    weapon: "직검",
    rarity: 5,
  },
  releaseVersion: "3.3",
  languageNames: "🇰🇷 히유키 / 🇺🇸 Hiyuki / 🇨🇳 绯雪 / 🇯🇵 緋雪",
  voiceActors: "🇰🇷 정혜원 / 🇺🇸 메이 맥 / 🇨🇳 리 찬페이 / 🇯🇵 토마츠 하루카",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "서리", description: "서리 효과 사용 가능" }
  ],
  baseStats: createWwBaseStats(
    [824, 37, 91, 10],
    [2143, 96, 233, 0],
    [3387, 155, 367, 0],
    [4081, 186, 442, 0],
    [5325, 245, 576, 0],
    [6569, 304, 710, 0],
    [7813, 363, 844, 0],
    [9056, 413, 978, 0],
    [10300, 463, 1112, 0]
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 엑소스웜 성핵", 4, 2),
      createMaterial("중주파수 엑소스웜 성핵", 12, 3),
      createMaterial("고주파수 엑소스웜 성핵", 12, 4),
      createMaterial("전주파수 엑소스웜 성핵", 4, 5),
      createMaterial("우리의 선택", 46, 4),
      createMaterial("붉은 은방울꽃", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 엑소스웜 성핵", 25, 2),
      createMaterial("중주파수 엑소스웜 성핵", 28, 3),
      createMaterial("고주파수 엑소스웜 성핵", 40, 4),
      createMaterial("전주파수 엑소스웜 성핵", 57, 5),
      createMaterial("되묻는 우리", 26, 4),
      createMaterial("손상 날개 편광체", 28, 2),
      createMaterial("한쪽 날개 편광체", 28, 3),
      createMaterial("여러 날개 편광체", 55, 4),
      createMaterial("중첩 날개 편광체", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.hiyuki.skills.0.name", "기본 공격", "character.hiyuki.skills.0.description", "basic_1"),
    createWwSkill("character.hiyuki.skills.1.name", "공명 스킬", "character.hiyuki.skills.1.description", "skill_1"),
    createWwSkill("character.hiyuki.skills.2.name", "공명 회로", "character.hiyuki.skills.2.description", "talent_1"),
    createWwSkill("character.hiyuki.skills.3.name", "공명 해방", "character.hiyuki.skills.3.description", "ultimate_1"),
    createWwSkill("character.hiyuki.skills.4.name", "변주 스킬", "character.hiyuki.skills.4.description", "intro_1"),
    createWwSkill("character.hiyuki.skills.5.name", "반주 스킬", "character.hiyuki.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.hiyuki.additionalAbilities.0.name", description: "character.hiyuki.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.hiyuki.additionalAbilities.1.name", description: "character.hiyuki.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.hiyuki.eidolons.0.name", description: "character.hiyuki.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.hiyuki.eidolons.1.name", description: "character.hiyuki.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.hiyuki.eidolons.2.name", description: "character.hiyuki.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.hiyuki.eidolons.3.name", description: "character.hiyuki.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.hiyuki.eidolons.4.name", description: "character.hiyuki.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.hiyuki.eidolons.5.name", description: "character.hiyuki.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.hiyuki.concertDissipation.name",
    description: "character.hiyuki.concertDissipation.description"
  },
  terms: [
    { name: "character.hiyuki.terms.0.name", description: "character.hiyuki.terms.0.description" },
    { name: "character.hiyuki.terms.1.name", description: "character.hiyuki.terms.1.description" },
    { name: "character.hiyuki.terms.2.name", description: "character.hiyuki.terms.2.description" },
    { name: "character.hiyuki.terms.3.name", description: "character.hiyuki.terms.3.description" },
    { name: "character.hiyuki.terms.4.name", description: "character.hiyuki.terms.4.description" },
    { name: "character.hiyuki.terms.5.name", description: "character.hiyuki.terms.5.description" },
    { name: "character.hiyuki.terms.6.name", description: "character.hiyuki.terms.6.description" },
    { name: "character.hiyuki.terms.7.name", description: "character.hiyuki.terms.7.description" },
    { name: "character.hiyuki.terms.8.name", description: "character.hiyuki.terms.8.description" },
    { name: "character.hiyuki.terms.9.name", description: "character.hiyuki.terms.9.description" }
  ],
  skillInput: {
    overview: "character.hiyuki.skillInput.overview",
    hideGauge: true,
    inputs: []
  }
};

export default hiyuki;
