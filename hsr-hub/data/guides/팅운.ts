import { CharacterGuide } from './index';

export const 팅운Guide: CharacterGuide = {
    characterName: "팅운",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["가상공간을 누비는 메신저", "철위대 2세트 + 메신저 2세트"],
    bestOrnaments: ["바다에 잠긴 루샤카", "불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "공격력", value: "2600 이상" }
    ],
    bestLightCones: [
      "댄스! 댄스! 댄스!",
      "아직 전투는 끝나지 않았다",
      { name: "행성과의 만남", note: "번개 딜러와 사용 시" },
      "누락된 추억"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.50%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "107.80%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "110.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "118.50%", efficiency3: "-", description: "성흔 효과" }
    ]
  };
