import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const denia: WuwaCharacter = {
  id: "denia",
  gameId: "ww",
  name: "character.denia.name",
  folderName: "데니아",
  attribute: "용융",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.denia.briefInfo",
  metadata: {
    name: "character.denia.name",
    brief: "character.denia.briefInfo",
    element: "용융",
    weapon: "증폭기",
    rarity: 5,
  },
  releaseVersion: "3.3",
  languageNames: "🇰🇷 데니아 / 🇺🇸 Denia / 🇨🇳 达妮娅 / 🇯🇵 ダーニャ",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 조디 벨 코르테스 / 🇨🇳 거신위 / 🇯🇵 이토 미쿠",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "공명 해방 피해", description: "비교적 높은 공명 해방 피해" },
    { label: "견인", description: "일정 범위 내의 목표를 특정 위치로 견인 가능" },
    { label: "불꽃", description: "불꽃 효과 사용 가능" },
    { label: "조화도 파괴 증폭", description: "파티 내 특정 캐릭터의 조화도 파괴 증폭을 증가시킬 수 있다" },
    { label: "조화 밀집 대응", description: "자신의 조화도 파괴 증폭에 근거하여 목표에게 입히는 최종 피해가 증가한다" }
  ],
  baseStats: createWwBaseStats(
    [882, 34, 94, 10],   // 1
    [2294, 88, 241, 10], // 20
    [3625, 143, 380, 10],// 30
    [4369, 171, 457, 10],// 40
    [5700, 225, 595, 10],// 50
    [7031, 280, 734, 10],// 60
    [8362, 334, 872, 10],// 70
    [9694, 379, 1011, 10],// 80
    [11025, 425, 1149, 10] // 90
  ),
  materials_v2: {
    ascension: [
      { name: "클램 코인", count: 170000 },
      createMaterial("저주파수 메카 성핵", 4, 2),
      createMaterial("중주파수 메카 성핵", 12, 3),
      createMaterial("고주파수 메카 성핵", 12, 4),
      createMaterial("전주파수 메카 성핵", 4, 5),
      createMaterial("꺼지지 않는 심판", 46, 4),
      createMaterial("별의 꿈", 60, 1)
    ],
    traces: [
      { name: "클램 코인", count: 2030000 },
      createMaterial("저주파수 메카 성핵", 25, 2),
      createMaterial("중주파수 메카 성핵", 28, 3),
      createMaterial("고주파수 메카 성핵", 40, 4),
      createMaterial("전주파수 메카 성핵", 57, 5),
      createMaterial("되묻는 우리", 26, 5),
      createMaterial("긁어모은 현", 28, 2),
      createMaterial("끊어진 현", 28, 3),
      createMaterial("응고된 현", 55, 4),
      createMaterial("노래하는 현", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.denia.skills.0.name", "기본 공격", "character.denia.skills.0.description", "basic_1"),
    createWwSkill("character.denia.skills.1.name", "공명 스킬", "character.denia.skills.1.description", "skill_1"),
    createWwSkill("character.denia.skills.2.name", "공명 회로", "character.denia.skills.2.description", "talent_1"),
    createWwSkill("character.denia.skills.3.name", "공명 해방", "character.denia.skills.3.description", "ultimate_1"),
    createWwSkill("character.denia.skills.4.name", "변주 스킬", "character.denia.skills.4.description", "intro_1"),
    createWwSkill("character.denia.skills.5.name", "반주 스킬", "character.denia.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.denia.additionalAbilities.0.name", description: "character.denia.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.denia.additionalAbilities.1.name", description: "character.denia.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.denia.eidolons.0.name", description: "character.denia.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.denia.eidolons.1.name", description: "character.denia.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.denia.eidolons.2.name", description: "character.denia.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.denia.eidolons.3.name", description: "character.denia.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.denia.eidolons.4.name", description: "character.denia.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.denia.eidolons.5.name", description: "character.denia.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    description: "character.denia.concertDissipation.description"
  },
  terms: [
    { name: "character.denia.terms.0.name", description: "character.denia.terms.0.description" },
    { name: "character.denia.terms.1.name", description: "character.denia.terms.1.description" },
    { name: "character.denia.terms.2.name", description: "character.denia.terms.2.description" },
    { name: "character.denia.terms.3.name", description: "character.denia.terms.3.description" },
    { name: "character.denia.terms.4.name", description: "character.denia.terms.4.description" },
    { name: "character.denia.terms.5.name", description: "character.denia.terms.5.description" },
    { name: "character.denia.terms.6.name", description: "character.denia.terms.6.description" },
    { name: "character.denia.terms.7.name", description: "character.denia.terms.7.description" },
    { name: "character.denia.terms.8.name", description: "character.denia.terms.8.description" },
    { name: "character.denia.terms.9.name", description: "character.denia.terms.9.description" }
  ],
  skillInput: {
    overview: "character.denia.skillInput.overview",
    hideGauge: true,
    inputs: []
  }
};

export default denia;
