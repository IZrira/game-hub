import { CharacterGuide } from './index';

export const 마이데이Guide: CharacterGuide = {
    characterName: "마이데이",
    lastUpdated: "2026-03-16",
    patchVersion: "3.1",
    bestRelics: ["지식의 바다에 빠진 학자", "장수를 원하는 제자"],
    bestOrnaments: ["고요한 습골지", "뭇별 경기장"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "허수 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "8000 이상" },
      { label: "치명타 확률", value: "52% 이하" }
    ],
    bestLightCones: ["피의 불꽃이여, 앞길을 태워라", "닿을 수 없는 저편", "비밀 맹세", "인사록•음률 사냥"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "피의 불꽃이여, 앞길을 태워라",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "138%", efficiency3: "138%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "145%", efficiency3: "173%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "171%", efficiency3: "205%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "185%", efficiency3: "222%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "216%", efficiency3: "260%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "218%", efficiency3: "261%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "278%", efficiency3: "348%", description: "성흔 효과" }
        ]
      },
      {
        name: "인사록•음률 사냥",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "105%", efficiency3: "125%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "124%", efficiency3: "148%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "134%", efficiency3: "161%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "156%", efficiency3: "188%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "158%", efficiency3: "189%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "200%", efficiency3: "250%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "105%", efficiency3: "125%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "124%", efficiency3: "148%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "134%", efficiency3: "161%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "156%", efficiency3: "188%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "158%", efficiency3: "189%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "200%", efficiency3: "250%", description: "성흔 효과" }
    ]
  };
