import { CharacterGuide } from './index';

export const 맥택Guide: CharacterGuide = {
    characterName: "맥택",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["사수에 잠수한 선구자", "재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["질주하는 늑대의 도람 왕조", "이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "130%" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["고민, 그리고 행복", "순수 사유의 세례", "논검", "별바다 순항"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.95%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "120.01%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "130.45%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "153.80%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "155.18%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "167.21%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
