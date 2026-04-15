import { CharacterGuide } from './index';

export const 효광Guide: CharacterGuide = {
    characterName: "효광",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "1순위" }
    ],
    bestOrnaments: [
      "바다에 잠긴 루샤카",
      "사색하는 거목"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "160 / 180 / 200" },
      { label: "치명타 확률", value: "100%" },
      { label: "치명타 피해", value: "100%" }
    ],
    bestLightCones: [
      { name: "그녀가 보기로 결심했을 때", note: "1순위" },
      "슈룸 모험기"
    ],
    skillPriority: ["환락 스킬", "전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "데이터 분석 진행 중" }
    ]
  };
