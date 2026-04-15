import { CharacterGuide } from './index';

export const 후크Guide: CharacterGuide = {
    characterName: "후크",
    lastUpdated: "2026-03-14",
    patchVersion: "3.0",
    bestRelics: [
      { name: "사수에 잠수한 선구자", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      "용암 단조의 화장(火匠)"
    ],
    bestOrnaments: [
      { name: "창공 전선 그라모스", note: "1순위" },
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "화염 피해",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: [
      { name: "어떤 에이언즈의 몰락", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      "과거의 핏자국",
      "두더지파가 환영해"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "108.09%", efficiency3: "109.46%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "108.09%", efficiency3: "120.48%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "111.86%", efficiency3: "123.88%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "124.55%", efficiency3: "137.86%", description: "성흔 효과" }
    ]
  };
