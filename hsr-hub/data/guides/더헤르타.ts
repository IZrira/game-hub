import { CharacterGuide } from './index';

export const 더헤르타Guide: CharacterGuide = {
    characterName: "더 헤르타",
    lastUpdated: "2026-03-17",
    patchVersion: "3.0",
    bestRelics: [
      { name: "지식의 바다에 빠진 학자", note: "1순위" },
      { name: "혹한 밀림의 사냥꾼", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "이즈모 현세와 타카마 신국", note: "1순위" },
      { name: "뭇별 경기장", note: "2순위" },
      "창공 전선 그라모스",
      "주인 없는 황폐한 별 츠가냐"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or 효과 명중",
      boots: "속도 or 공격력 (2돌파 이상 시 공격력)",
      sphere: "얼음 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["속도", "치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "80" },
      { label: "치명타 피해", value: "160" },
      { label: "공격력", value: "3300" }
    ],
    bestLightCones: [
      { name: "추궁할 수 없는 곳을 향해", note: "1순위" },
      { name: "오늘도 평화로운 하루", note: "2순위" },
      { name: "은하철도의 밤", note: "3순위" },
      "동트기 전"
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [],
    eidolonVariants: [
      {
        name: "1개체 (광추별 효율)",
        labels: ["추궁할 수 없는 곳을 향해", "오늘도 평화로운 하루"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "115.00%", efficiency3: "112.00%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "135.00%", efficiency3: "128.00%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "142.00%", efficiency3: "135.00%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "155.00%", efficiency3: "145.00%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "165.00%", efficiency3: "152.00%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "334.00%", efficiency3: "285.00%", description: "성흔 효과" }
        ]
      }
    ]
  };
