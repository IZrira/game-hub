import { CharacterGuide } from './index';

export const 파이논물리Guide: CharacterGuide = {
    characterName: "파이논 (물리)",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["꿈을 엮는 요정의 낙원", "뭇별 경기장"],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력",
      sphere: "물리 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "치명타 확률", value: "100%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "어떤 에이언즈의 몰락", "대체할 수 없는 것", "과거의 핏자국"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "이와 같이 타오르는 여명",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "145%", efficiency3: "144%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "184%", efficiency3: "182%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "292%", efficiency3: "370%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "303%", efficiency3: "373%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "303%", efficiency3: "417%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "324%", efficiency3: "468%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "395%", efficiency3: "561%", description: "성흔 효과" }
        ]
      },
      {
        name: "어떤 에이언즈의 몰락",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "127%", efficiency3: "127%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "199%", efficiency3: "254%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "207%", efficiency3: "256%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "207%", efficiency3: "285%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "219%", efficiency3: "319%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "274%", efficiency3: "382%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "127%", efficiency3: "127%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "199%", efficiency3: "254%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "207%", efficiency3: "256%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "207%", efficiency3: "285%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "219%", efficiency3: "319%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "274%", efficiency3: "382%", description: "성흔 효과" }
    ]
  };
