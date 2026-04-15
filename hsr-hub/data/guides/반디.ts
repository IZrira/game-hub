import { CharacterGuide } from './index';

export const 반디Guide: CharacterGuide = {
    characterName: "반디",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["겁화 연등의 연마궁", "도적국 탈리아"],
    mainStats: {
      body: "공격력",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "공격력", value: "2500" },
      { label: "속도", value: "156 이상", note: "종결 167+" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "꿈은 어디로 돌아가야 하는가", "어떤 에이언즈의 몰락", "마음에 새긴 약속"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-13.2 SP)" },
      { level: 1, impact: "High", efficiency1: "108.40%", efficiency3: "107.95%", description: "SP 소모 감소 (-4.4 SP)" },
      { level: 2, impact: "High", efficiency1: "153.99%", efficiency3: "151.16%", description: "화력 대폭 상승 (-4.4 SP)" },
      { level: 3, impact: "Medium", efficiency1: "154.52%", efficiency3: "151.65%", description: "스킬 레벨 상승 (-4.4 SP)" },
      { level: 4, impact: "Low", efficiency1: "154.52%", efficiency3: "151.65%", description: "효과 저항 상승 (-4.4 SP)" },
      { level: 5, impact: "Medium", efficiency1: "160.10%", efficiency3: "157.13%", description: "필살기/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "246.33%", efficiency3: "239.82%", description: "종결 돌파 (-4.4 SP)" }
    ]
  };
