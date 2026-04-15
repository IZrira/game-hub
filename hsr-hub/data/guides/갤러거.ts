import { CharacterGuide } from './index';

export const 갤러거Guide: CharacterGuide = {
    characterName: "갤러거",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      "태양과 번개의 여전사",
      { name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 파티 시" },
      { name: "유성을 쫓는 괴도", note: "슈퍼 격파 파티 시" }
    ],
    bestOrnaments: [
      { name: "겁화 연등의 연마궁", note: "1순위" },
      { name: "도적국 탈리아", note: "2순위" }
    ],
    mainStats: {
      body: "치유량 증가",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "HP"],
    targetStats: [
      { label: "격파 특수효과", value: "150% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "오직 향만이 변함없이", note: "1순위" },
      { name: "등가교환", note: "전부 에너지 충전 필요 시" },
      { name: "수술 후의 대화", note: "3순위" },
      "무엇이 진실인가",
      "내일의 내일이 올 때까지"
    ],
    skillPriority: ["특성", "전투 스킬", "일반 공격", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "100.43%", efficiency3: "100.33%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "104.01%", efficiency3: "103.88%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "105.17%", efficiency3: "105.20%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "132.13%", efficiency3: "132.02%", description: "성흔 효과" }
    ]
  };
