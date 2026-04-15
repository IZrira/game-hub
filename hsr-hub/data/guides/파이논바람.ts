import { CharacterGuide } from './index';

export const 파이논바람Guide: CharacterGuide = {
    characterName: "파이논 (바람)",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스", "우주 봉인 정거장", "뭇별 경기장"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "바람 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 미만" },
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "2600" }
    ],
    bestLightCones: ["보답 없는 왕관", "어떤 에이언즈의 몰락", "과거의 핏자국"],
    skillPriority: ["필살기", "전투 스킬", "일반 공격", "특성"],
    recommendedEidolon: "E2 / E6",
    eidolonVariants: [
      {
        name: "보답 없는 왕관",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "116%", efficiency3: "116%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "136%", efficiency3: "136%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "155%", efficiency3: "161%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "166%", efficiency3: "171%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "190%", efficiency3: "195%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "198%", efficiency3: "205%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "266%", efficiency3: "265%", description: "성흔 효과" }
        ]
      },
      {
        name: "어떤 에이언즈의 몰락",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "116%", efficiency3: "118%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "132%", efficiency3: "140%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "145%", efficiency3: "149%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "165%", efficiency3: "169%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "172%", efficiency3: "178%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "233%", efficiency3: "231%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "116%", efficiency3: "118%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "132%", efficiency3: "140%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "145%", efficiency3: "149%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "165%", efficiency3: "169%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "172%", efficiency3: "178%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "233%", efficiency3: "231%", description: "성흔 효과" }
    ]
  };
