import { CharacterGuide } from './index';

export const 라파Guide: CharacterGuide = {
    characterName: "라파",
    lastUpdated: "2026-03-17",
    patchVersion: "3.8",
    bestRelics: ["곤충 재앙을 잠재우는 철기군"],
    bestOrnaments: ["겁화 연등의 연마궁"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "공격력", value: "3200 이상" }
    ],
    bestLightCones: ["인법첩·현란한 파마", "인내심만 있으면 돼", "밤의 인사와 잠든 얼굴"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-14 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "104.12%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "110.84%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "117.35%", efficiency3: "-", description: "(-14 SP) 성흔 효과" },
      { level: 5, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "123.32%", efficiency3: "-", description: "(-14 SP) 성흔 효과" }
    ]
  };
