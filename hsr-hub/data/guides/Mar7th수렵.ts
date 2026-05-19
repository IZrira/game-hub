import { CharacterGuide } from './index';

export const Mar7th수렵Guide: CharacterGuide = {
    characterName: "Mar. 7th (수렵)",
    lastUpdated: "2026-03-15",
    patchVersion: "4.0",
    bestRelics: ["들이삭과 동행하는 거너"],
    bestOrnaments: ["뭇별 경기장", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "허수 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "120%" },
      { label: "공격력", value: "2400" }
    ],
    bestLightCones: ["야경 속에서", "논검", "고민, 그리고 행복", "별바다 순항"],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "102.45%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "105.36%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "114.91%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
