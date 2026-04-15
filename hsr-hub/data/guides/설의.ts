import { CharacterGuide } from './index';

export const 설의Guide: CharacterGuide = {
    characterName: "설의",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "별처럼 빛나는 천재", note: "1순위" },
      "곤충 재앙을 잠재우는 철기군",
      "유성을 쫓는 괴도"
    ],
    bestOrnaments: [
      { name: "도적국 탈리아", note: "1순위" },
      "우주 봉인 정거장",
      "회전을 멈춘 살소토",
      { name: "창공 전선 그라모스", note: "속도 135 기준" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "양자 피해 or 공격력",
      rope: "격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "마음에 새긴 약속", note: "1순위" },
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "(-5.6 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "104.20%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "112.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "116.22%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.79%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" }
    ]
  };
