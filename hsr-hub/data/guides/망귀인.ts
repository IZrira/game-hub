import { CharacterGuide } from './index';

export const 망귀인Guide: CharacterGuide = {
    characterName: "망귀인",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
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
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["가상공간을 누비는 메신저"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "격파 특수효과"
        },
        subStats: ["속도", "격파 특수효과", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "220% 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "가상공간을 누비는 메신저"],
    bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
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
    bestLightCones: [
      { name: "먼 곳의 소리", note: "1순위" },
      { name: "거울 속의 나", note: "2순위" },
      { name: "기억 속의 모습", note: "3순위" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  };
