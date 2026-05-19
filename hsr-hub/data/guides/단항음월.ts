import { CharacterGuide } from './index';

export const 단항음월Guide: CharacterGuide = {
    characterName: "단항•음월",
    lastUpdated: "2026-03-13",
    patchVersion: "4.0",
    bestRelics: [
      { name: "망국을 애도하는 시인", note: "1순위" },
      { name: "황무지의 도적, 황야인", note: "2순위" },
      { name: "들이삭과 동행하는 거너", note: "3순위" }
    ],
    bestOrnaments: [
      "뭇별 경기장",
      "텐고쿠@라이브스트리밍",
      { name: "창공 전선 그라모스", note: "속도 135 기준" }
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력 or 속도",
      sphere: "허수 피해 or 공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3200 이상" }
    ],
    bestLightCones: [
      { name: "이와 같이 타오르는 여명", note: "1순위" },
      { name: "태양보다 밝게 빛나는 것", note: "2순위" },
      "대체할 수 없는 것",
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-13 SP)" },
      { level: 1, impact: "Medium", efficiency1: "112.92%", efficiency3: "114.47%", description: "(-13 SP)" },
      { level: 2, impact: "High", efficiency1: "169.38%", efficiency3: "171.71%", description: "(-17 SP)" },
      { level: 3, impact: "Medium", efficiency1: "184.67%", efficiency3: "187.31%", description: "(-17 SP)" },
      { level: 4, impact: "Medium", efficiency1: "201.18%", efficiency3: "200.77%", description: "(-17 SP)" },
      { level: 5, impact: "Medium", efficiency1: "208.76%", efficiency3: "209.05%", description: "(-17 SP)" },
      { level: 6, impact: "High", efficiency1: "243.29%", efficiency3: "243.22%", description: "(-17 SP)" }
    ]
  };
