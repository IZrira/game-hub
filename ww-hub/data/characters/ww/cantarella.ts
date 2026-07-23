import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill , createWwBaseStats } from '../../dataFactory';

const cantarella: WuwaCharacter = {
  id: "cantarella",
  gameId: "ww",
  name: "character.cantarella.name",
  folderName: "칸타렐라",
  attribute: "인멸",
  weaponType: "증폭기",
  rarity: 5,
  affiliation: "피살리아 가문",
  briefInfo: "character.cantarella.briefInfo",
  metadata: {
    name: "character.cantarella.name",
    brief: "character.cantarella.briefInfo",
    element: "인멸",
    weapon: "증폭기",
    rarity: 5
  },
  releaseVersion: "2.2",
  languageNames: "🇰🇷 칸타렐라 / 🇺🇸 Cantarella / 🇨🇳 坎特蕾拉 / 🇯🇵 カンタレラ",
  voiceActors: "🇰🇷 김율 / 🇺🇸 알렉산드라 겔프 / 🇨🇳 소미 / 🇯🇵 나카하라 마이",
  roles: [
    { label: "생존 치료", description: "파티의 생존력 향상" },
    { label: "빠른 협주", description: "짧은 시간에 비교적 높은 협주 효율 보유" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "협동 공격", description: "비교적 강한 협동 공격 능력 보유" },
    { label: "인멸 피해 부스트", description: "파티 내 특정 캐릭터의 인멸 피해 부스트 가능" },
    { label: "공명 스킬 피해 부스트", description: "파티 내 특정 캐릭터의 공명 스킬 피해 부스트 가능" }
  ],
  baseStats: createWwBaseStats(
    [928, 32, 90, 0],
    [2414, 83, 231, 0],
    [3814, 134, 363, 0],
    [4596, 161, 438, 0],
    [5997, 212, 570, 0],
    [7398, 263, 703, 0],
    [8799, 314, 835, 0],
    [10199, 357, 968, 0],
    [11600, 400, 1100, 0]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("저주파수 취합 성핵", 4, 2),
      createMaterial("중주파수 취합 성핵", 12, 3),
      createMaterial("고주파수 취합 성핵", 12, 4),
      createMaterial("전주파수 취합 성핵", 4, 5),
      createMaterial("속죄의 소라", 46, 4),
      createMaterial("부유 바다꽃", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("저주파수 취합 성핵", 25, 2),
      createMaterial("중주파수 취합 성핵", 28, 3),
      createMaterial("고주파수 취합 성핵", 40, 4),
      createMaterial("전주파수 취합 성핵", 57, 5),
      createMaterial("붓꽃이 만발하던 날", 26, 4),
      createMaterial("렌토 와전류", 25, 3),
      createMaterial("아다지오 와전류", 28, 3),
      createMaterial("안단테 와전류", 55, 3),
      createMaterial("프레스토 와전류", 67, 3)
    ]
  },
  skills: [
    createWwSkill("character.cantarella.skills.0.name", "일반 공격", "character.cantarella.skills.0.description", "basic_1"),
    createWwSkill("character.cantarella.skills.1.name", "공명 스킬", "character.cantarella.skills.1.description", "skill_1"),
    createWwSkill("character.cantarella.skills.2.name", "공명 회로", "character.cantarella.skills.2.description", "talent_1"),
    createWwSkill("character.cantarella.skills.3.name", "공명 해방", "character.cantarella.skills.3.description", "ultimate_1"),
    createWwSkill("character.cantarella.skills.4.name", "변주 스킬", "character.cantarella.skills.4.description", "intro_1"),
    createWwSkill("character.cantarella.skills.5.name", "반주 스킬", "character.cantarella.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.cantarella.additionalAbilities.0.name", description: "character.cantarella.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.cantarella.additionalAbilities.1.name", description: "character.cantarella.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.cantarella.eidolons.0.name", description: "character.cantarella.eidolons.0.description", icon: "공명 체인1" },
    { rank: "R2", name: "character.cantarella.eidolons.1.name", description: "character.cantarella.eidolons.1.description", icon: "공명 체인2" },
    { rank: "R3", name: "character.cantarella.eidolons.2.name", description: "character.cantarella.eidolons.2.description", icon: "공명 체인3" },
    { rank: "R4", name: "character.cantarella.eidolons.3.name", description: "character.cantarella.eidolons.3.description", icon: "공명 체인4" },
    { rank: "R5", name: "character.cantarella.eidolons.4.name", description: "character.cantarella.eidolons.4.description", icon: "공명 체인5" },
    { rank: "R6", name: "character.cantarella.eidolons.5.name", description: "character.cantarella.eidolons.5.description", icon: "공명 체인6" }
  ],
  concertDissipation: {
    name: "character.cantarella.concertDissipation.name",
    description: "character.cantarella.concertDissipation.description"
  },
  terms: [
    { name: "character.cantarella.terms.0.name", description: "character.cantarella.terms.0.description" }
  ],
  skillInput: {
    overview: "character.cantarella.skillInput.overview",
    inputs: [
      "character.cantarella.skillInput.inputs.0",
      "character.cantarella.skillInput.inputs.1",
      "character.cantarella.skillInput.inputs.2"
    ]
  }
};

export default cantarella;
