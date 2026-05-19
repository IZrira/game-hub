import { CharacterGuide } from './index';

export const 연경Guide: CharacterGuide = {
    characterName: "연경",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "공격력", "속도", "치명타 확률"],
    targetStats: [
      { label: "치명타 확률", value: "20~30%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["깊게 든 단잠", "야경 속에서", "별바다 순항", "침묵만이 남을 뿐"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.80%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "110.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "114.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.60%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
