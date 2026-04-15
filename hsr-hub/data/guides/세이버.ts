import { CharacterGuide } from './index';

export const 세이버Guide: CharacterGuide = {
    characterName: "세이버",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: [
      { name: "거친 파도를 헤치는 선장", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "회전을 멈춘 살소토", note: "1순위" },
      "창공 전선 그라모스",
      "우주 봉인 정거장",
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "물리 피해 증가",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 미만" },
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "2600" }
    ],
    bestLightCones: [
      { name: "보답 없는 왕관", note: "1순위" },
      { name: "어떤 에이언즈의 몰락", note: "2순위" },
      { name: "과거의 핏자국", note: "3순위" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "112.00%", efficiency3: "115.00%", description: "성흔 효과" },
      { level: 2, impact: "High", efficiency1: "125.00%", efficiency3: "128.00%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "132.00%", efficiency3: "135.00%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "138.00%", efficiency3: "142.00%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "145.00%", efficiency3: "150.00%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "168.00%", efficiency3: "175.00%", description: "성흔 효과" }
    ]
  };
