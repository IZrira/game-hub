import { CharacterGuide } from './index';

export const 비소Guide: CharacterGuide = {
    characterName: "비소",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "바람과 구름을 가르는 용맹함", note: "1순위" },
      { name: "재와 뼈마저 불사르는 대공", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "이즈모 현세와 타카마 신국", note: "2순위" },
      "회전을 멈춘 살소토"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "속도 or 공격력",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "치명타 확률", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150% ~ 160%" },
      { label: "공격력", value: "2500 ~ 3000" }
    ],
    bestLightCones: [
      { name: "정복하고 사냥하리", note: "1순위" },
      { name: "순수 사유의 세례", note: "2순위" },
      { name: "고민, 그리고 행복", note: "3순위" },
      "논검",
      "별바다 순항"
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "125.80%", efficiency3: "125.80%", description: "성흔 효과" },
      { level: 2, impact: "High", efficiency1: "170.65%", efficiency3: "170.65%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "182.83%", efficiency3: "182.83%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.80%", efficiency3: "190.80%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "198.76%", efficiency3: "198.76%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "274.01%", efficiency3: "274.01%", description: "성흔 효과" }
    ]
  };
