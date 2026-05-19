import { CharacterGuide } from './index';

export const 스파키Guide: CharacterGuide = {
    characterName: "스파키",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["빛나는 공훈의 마법 소녀"],
    bestOrnaments: ["텐고쿠@라이브스트리밍", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["눈부신 파키의 세상", "오늘의 행운", "슈룸 모험기"],
    skillPriority: ["환락 스킬", "특성", "일반 공격", "전투 스킬", "필살기"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "116.50%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "151.23%", efficiency3: "160.78%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "155.45%", efficiency3: "164.89%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "175.64%", efficiency3: "185.88%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "187.73%", efficiency3: "194.94%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "365.69%", efficiency3: "335.63%", description: "성흔 효과" }
    ]
  };
