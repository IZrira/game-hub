import { Character } from '../../../../common-hub/types';

const cypher: Character = {
  id: "cypher",
  name: "사이퍼",
  folderName: "사이퍼",
  gameId: "hsr",
  attribute: "양자",
  path: "공허",
  rarity: 5,
  affiliation: "앰포리어스",
  briefInfo: "사라진 도적의 도시 도로스, 300의 의적이 날뛰고 있다.\n발 빠른 도둑 별 사이퍼라, 「계략」의 불씨를 희롱하는 황금의 후예여, 도망쳐라. 그대의 거짓말이 바람과 함께 이 세상 곳곳에 불기를——\n「훗, 날 속이려고? 어림도 없지!」",
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
    affiliation: "앰포리어스",
    cv: "🇰🇷 미정 / 🇺🇸 미정 / 🇨🇳 미정 / 🇯🇵 미정",
    releaseVersion: "3.3",
    brief: "사라진 도적의 도시 도로스, 300의 의적이 날뛰고 있다.\n발 빠른 도둑 별 사이퍼라, 「계략」의 불씨를 희롱하는 황금의 후예여, 도망쳐라. 그대의 거짓말이 바람과 함께 이 세상 곳곳에 불기를——\n「훗, 날 속이려고? 어림도 없지!」"
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
