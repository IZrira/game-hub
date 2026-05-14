import { WuwaCharacter } from '../../../types';
import { createMaterial, createWwSkill, createWwBaseStats } from '../../dataFactory';

const luuk: WuwaCharacter = {
  id: "luuk",
  gameId: "ww",
  name: "character.luuk.name",
  folderName: "루크 · 헤르센",
  attribute: "회절",
  weaponType: "권갑",
  rarity: 5,
  affiliation: "스타토치 아카데미",
  briefInfo: "character.luuk.briefInfo",
  metadata: {
    name: "character.luuk.name",
    brief: "character.luuk.briefInfo",
    element: "회절",
    weapon: "권갑",
    rarity: 5
  },
  releaseVersion: "3.1",
  languageNames: "🇰🇷 루크·헤르센 / 🇺🇸 Luuk Herssen / 🇨🇳 陆•赫斯 / 🇯🇵 リュー크・ヘルセン",
  voiceActors: "🇰🇷 민승우 / 🇺🇸 그리핀 벨라 / 🇨🇳 마정양 / 🇯🇵 타치바나 신노스케",
  roles: [
    { label: "메인 딜러", description: "비교적 강한 피해 부여 가능" },
    { label: "일반 공격 피해", description: "비교적 높은 일반 공격 피해" },
    { label: "조화 밀집 대응", description: "자신의 조화도 파괴 증폭에 근거하여 목표에게 입히는 최종 피해가 증가된다" }
  ],
  baseStats: createWwBaseStats(
    [824, 37, 91, 10],
    [2143, 96, 233, 10],
    [3387, 155, 367, 10],
    [4081, 186, 442, 10],
    [5325, 245, 576, 10],
    [6569, 304, 710, 10],
    [7813, 363, 844, 10],
    [9056, 413, 978, 10],
    [10300, 463, 1112, 10]
  ),
  materials_v2: {
    ascension: [
      createMaterial("클램 코인", "170,000", 3),
      createMaterial("파손된 엑소스웜 펜던트", 4, 2),
      createMaterial("허름한 엑소스웜 펜던트", 12, 3),
      createMaterial("흠집이 있는 엑소스웜 펜던트", 12, 4),
      createMaterial("완전한 엑소스웜 펜던트", 4, 5),
      createMaterial("태양을 노리는 손끝", 46, 4),
      createMaterial("에델슈네", 60, 3)
    ],
    traces: [
      createMaterial("클램 코인", "2,030,000", 3),
      createMaterial("파손된 엑소스웜 펜던트", 25, 2),
      createMaterial("허름한 엑소스웜 펜던트", 28, 3),
      createMaterial("흠집이 있는 엑소스웜 펜던트", 40, 4),
      createMaterial("완전한 엑소스웜 펜던트", 57, 5),
      createMaterial("기억 속 금빛", 26, 4),
      createMaterial("저주파수 비명 이상 결정 조각", 25, 2),
      createMaterial("중주파수 비명 이상 결정 조각", 28, 3),
      createMaterial("고주파수 비명 이상 결정 조각", 55, 4),
      createMaterial("전주파수 비명 이상 결정 조각", 67, 5)
    ]
  },
  skills: [
    createWwSkill("character.luuk.skills.0.name", "일반 공격", "character.luuk.skills.0.description", "basic_1"),
    createWwSkill("character.luuk.skills.1.name", "공명 스킬", "character.luuk.skills.1.description", "skill_1"),
    createWwSkill("character.luuk.skills.2.name", "공명 회로", "character.luuk.skills.2.description", "talent_1"),
    createWwSkill("character.luuk.skills.3.name", "공명 해방", "character.luuk.skills.3.description", "ultimate_1"),
    createWwSkill("character.luuk.skills.4.name", "변주 스킬", "character.luuk.skills.4.description", "intro_1"),
    createWwSkill("character.luuk.skills.5.name", "반주 스킬", "character.luuk.skills.5.description", "outro_1")
  ],
  additionalAbilities: [
    { name: "character.luuk.additionalAbilities.0.name", description: "character.luuk.additionalAbilities.0.description", icon: "bonus_1" },
    { name: "character.luuk.additionalAbilities.1.name", description: "character.luuk.additionalAbilities.1.description", icon: "bonus_2" }
  ],
  eidolons: [
    { rank: "R1", name: "character.luuk.eidolons.0.name", description: "character.luuk.eidolons.0.description", icon: "eidolon_1" },
    { rank: "R2", name: "character.luuk.eidolons.1.name", description: "character.luuk.eidolons.1.description", icon: "eidolon_2" },
    { rank: "R3", name: "character.luuk.eidolons.2.name", description: "character.luuk.eidolons.2.description", icon: "eidolon_3" },
    { rank: "R4", name: "character.luuk.eidolons.3.name", description: "character.luuk.eidolons.3.description", icon: "eidolon_4" },
    { rank: "R5", name: "character.luuk.eidolons.4.name", description: "character.luuk.eidolons.4.description", icon: "eidolon_5" },
    { rank: "R6", name: "character.luuk.eidolons.5.name", description: "character.luuk.eidolons.5.description", icon: "eidolon_6" }
  ],
  concertDissipation: {
    name: "character.luuk.concertDissipation.name",
    description: "character.luuk.concertDissipation.description"
  },
  terms: [
    { name: "character.luuk.terms.0.name", description: "character.luuk.terms.0.description" },
    { name: "character.luuk.terms.1.name", description: "character.luuk.terms.1.description" },
    { name: "character.luuk.terms.2.name", description: "character.luuk.terms.2.description" },
    { name: "character.luuk.terms.3.name", description: "character.luuk.terms.3.description" },
    { name: "character.luuk.terms.4.name", description: "character.luuk.terms.4.description" },
    { name: "character.luuk.terms.5.name", description: "character.luuk.terms.5.description" },
    { name: "character.luuk.terms.6.name", description: "character.luuk.terms.6.description" },
    { name: "character.luuk.terms.7.name", description: "character.luuk.terms.7.description" }
  ],
  skillInput: {
    overview: "character.luuk.skillInput.overview",
    inputs: [
      "character.luuk.skillInput.inputs.0",
      "character.luuk.skillInput.inputs.1",
      "character.luuk.skillInput.inputs.2",
      "character.luuk.skillInput.inputs.3",
      "character.luuk.skillInput.inputs.4"
    ]
  }
};

export default luuk;
