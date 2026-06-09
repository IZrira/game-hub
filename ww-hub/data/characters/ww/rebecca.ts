import { WuwaCharacter } from "../../../types";
import { createWwBaseStats, createMaterial, createWwSkill } from "../../dataFactory";

const rebecca: WuwaCharacter = {
  id: "rebecca",
  gameId: "ww",
  name: "character.rebecca.name",
  folderName: "레베카",
  attribute: "전도",
  weaponType: "권총",
  rarity: 5,
  affiliation: "라하이 로이",
  briefInfo: "character.rebecca.briefInfo",
  metadata: {
    name: "character.rebecca.name",
    brief: "character.rebecca.briefInfo",
    element: "전도",
    weapon: "권총",
    rarity: 5,
  },
  releaseVersion: "3.4",
  languageNames: "🇰🇷 레베카 / 🇺🇸 Rebecca / 🇨🇳 瑞贝卡 / 🇯🇵 レベッカ",
  voiceActors: "🇰🇷 박시윤 / 🇺🇸 알렉스 카사레스 / 🇨🇳 천장 / 🇯🇵 쿠로사와 토모요",
  roles: [
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "강공격 피해 부스트", description: "파티 내 특정 캐릭터의 강공격 피해 부스트 가능" },
    { label: "조화도 파괴 증폭", description: "파티 내 특정 캐릭터의 조화도 파괴 증폭을 증가시킬 수 있다" },
    { label: "해킹 대응", description: "목표에게 해킹 피해를 입힐 수 있다" }
  ],
  baseStats: createWwBaseStats(
    [928, 32, 96, 10],
    [2414, 83, 246, 0],
    [3814, 134, 388, 0],
    [4596, 161, 467, 0],
    [5997, 212, 608, 0],
    [7398, 263, 749, 0],
    [8799, 314, 891, 0],
    [10199, 357, 1032, 0],
    [11600, 400, 1173, 0]
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
      createMaterial("기억 속 금빛", 26, 4),
      createMaterial("결손 응집 연소체", 25, 2),
      createMaterial("잔음 응집 연소체", 28, 3),
      createMaterial("잔향 응집 연소체", 55, 4),
      createMaterial("울림 응집 연소체", 67, 5)
    ]
  },
  skills: [
    { name: "character.rebecca.skills.0.name", description: "character.rebecca.skills.0.description", tag: "기본 공격" },
    { name: "character.rebecca.skills.1.name", description: "character.rebecca.skills.1.description", tag: "공명 스킬" },
    { name: "character.rebecca.skills.2.name", description: "character.rebecca.skills.2.description", tag: "공명 회로" },
    { name: "character.rebecca.skills.3.name", description: "character.rebecca.skills.3.description", tag: "공명 해방" },
    { name: "character.rebecca.skills.4.name", description: "character.rebecca.skills.4.description", tag: "변주 스킬" },
    { name: "character.rebecca.skills.5.name", description: "character.rebecca.skills.5.description", tag: "반주 스킬" }
  ],
  additionalAbilities: [
    { name: "character.rebecca.additionalAbilities.0.name", description: "character.rebecca.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.rebecca.additionalAbilities.1.name", description: "character.rebecca.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.rebecca.eidolons.0.name", description: "character.rebecca.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.rebecca.eidolons.1.name", description: "character.rebecca.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.rebecca.eidolons.2.name", description: "character.rebecca.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.rebecca.eidolons.3.name", description: "character.rebecca.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.rebecca.eidolons.4.name", description: "character.rebecca.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.rebecca.eidolons.5.name", description: "character.rebecca.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "조화도 파괴 · 해킹 · 멜트다운",
    description: "character.rebecca.concertDissipation.description"
  },
  terms: [
    { name: "character.rebecca.terms.0.name", description: "character.rebecca.terms.0.description" },
    { name: "character.rebecca.terms.1.name", description: "character.rebecca.terms.1.description" },
    { name: "character.rebecca.terms.2.name", description: "character.rebecca.terms.2.description" },
    { name: "character.rebecca.terms.3.name", description: "character.rebecca.terms.3.description" },
    { name: "character.rebecca.terms.4.name", description: "character.rebecca.terms.4.description" },
    { name: "character.rebecca.terms.5.name", description: "character.rebecca.terms.5.description" },
    { name: "character.rebecca.terms.6.name", description: "character.rebecca.terms.6.description" },
    { name: "character.rebecca.terms.7.name", description: "character.rebecca.terms.7.description" },
    { name: "character.rebecca.terms.8.name", description: "character.rebecca.terms.8.description" }
  ],
  skillInput: {
    hideGauge: true,
    overview: "character.rebecca.skillInput.overview",
    inputs: [
      "character.rebecca.skillInput.inputs.0",
      "character.rebecca.skillInput.inputs.1",
      "character.rebecca.skillInput.inputs.2"
    ]
  }
};

export default rebecca;
