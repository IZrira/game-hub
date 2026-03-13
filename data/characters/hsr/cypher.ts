import { Character } from '../../types';

const cypher: Character = {
  id: "cypher",
  name: "사이퍼",
  folderName: "사이퍼",
  gameId: "hsr",
  attribute: "양자",
  path: "공허",
  rarity: 5,
  affiliation: "기억의 정원",
  briefInfo: "기억의 정원 소속의 신비로운 인물. 적의 약점을 파고들어 치명적인 디버프를 부여하거나, 스스로 강력한 피해를 입히는 서브 딜러로 활약한다.",
  version: "3.3",
  releaseVersion: "3.3",
  languageNames: "🇰🇷 사이퍼 / 🇺🇸 Cypher",
  voiceActors: "🇰🇷 미정 / 🇺🇸 미정 / 🇨🇳 미정 / 🇯🇵 미정",
  metadata: {
    name: "사이퍼",
    language: "🇰🇷 사이퍼 / 🇺🇸 Cypher",
    element: "양자",
    path: "공허",
    rarity: 5,
    affiliation: "기억의 정원",
    cv: "🇰🇷 미정 / 🇺🇸 미정 / 🇨🇳 미정 / 🇯🇵 미정",
    releaseVersion: "3.3",
    brief: "기억의 정원 소속의 신비로운 인물. 적의 약점을 파고들어 치명적인 디버프를 부여하거나, 스스로 강력한 피해를 입히는 서브 딜러로 활약한다."
  },
  baseStats: {
    lv1: { "기초 HP": 150, "기초 공격력": 80, "기초 방어력": 50 },
    lv80: { "기초 HP": 1100, "기초 공격력": 650, "기초 방어력": 450 },
    speed: 105,
    taunt: 100,
    energy: 120
  },
  materials_v2: {
    ascension: [],
    traces: []
  },
  skills: [
    {
      name: "일반 공격",
      tag: "일반 공격",
      description: "지정된 단일 적에게 사이퍼 공격력의 일정 비율만큼 양자 속성 피해를 준다.",
      icon: "basic_atk_1"
    },
    {
      name: "전투 스킬",
      tag: "전투 스킬",
      description: "지정된 단일 적에게 양자 속성 피해를 주고, 높은 확률로 특수 디버프를 부여한다.",
      icon: "skill_1"
    },
    {
      name: "필살기",
      tag: "필살기",
      description: "모든 적에게 강력한 양자 속성 피해를 주고, 부여된 디버프의 효과를 강화한다.",
      icon: "ultimate_1"
    },
    {
      name: "특성",
      tag: "특성",
      description: "적이 디버프 상태일 때 사이퍼가 가하는 피해가 증가하며, 특정 조건 만족 시 추가 공격을 발동한다.",
      icon: "talent_1"
    }
  ],
  additionalAbilities: [],
  attributeBonuses: [],
  eidolons: []
};

export default cypher;
