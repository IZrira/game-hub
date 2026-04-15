import { CharacterGuide } from './index';

export const 부트힐Guide: CharacterGuide = {
    characterName: "부트힐",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: ["두 번째 삶을 향해", "별바다 순항", "논검", "강항의 기약"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  };
