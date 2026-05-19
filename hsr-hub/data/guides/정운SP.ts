import { CharacterGuide } from './index';

export const 정운SPGuide: CharacterGuide = {
    characterName: "정운 (SP)",
    lastUpdated: "2026-03-16",
    patchVersion: "2.7",
    bestRelics: ["곤충 재앙을 잠재우는 철기군"],
    bestOrnaments: ["겁화 연등의 연마궁"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: ["먼 곳의 소리", "거울 속의 나", "기억 속의 모습"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  };
