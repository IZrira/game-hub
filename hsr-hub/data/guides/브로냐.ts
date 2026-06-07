import { CharacterGuide } from './index';

export const 브로냐Guide: CharacterGuide = {
    characterName: "브로냐",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도 or 공격력",
      sphere: "바람 피해 or HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "속도", "효과 저항"],
    targetStats: [
      { label: "치명타 피해", value: "180% 이상" },
      { label: "속도", value: "134 이상" },
      { label: "속도", value: "160 이상" }
    ],
    bestLightCones: ["아직 전투는 끝나지 않았어", "누구의 소리인가?", "댄스! 댄스! 댄스!", "과거와 미래"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  };
