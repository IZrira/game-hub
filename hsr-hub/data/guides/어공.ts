import { CharacterGuide } from './index';

export const 어공Guide: CharacterGuide = {
    characterName: "어공",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "가상공간을 누비는 메신저", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 확률",
      boots: "속도 or HP",
      sphere: "HP or 허수 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "딜러 속도의 + 1" }
    ],
    bestLightCones: [
      { name: "기억 속 모습", note: "1순위" },
      { name: "아직 전투는 끝나지 않았다", note: "2순위" },
      "맞물린 톱니"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
  };
