import { CharacterGuide } from './index';

export const 히아킨Guide: CharacterGuide = {
    characterName: "히아킨",
    lastUpdated: "2026-03-15",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "천지를 재창조한 구세주"],
    bestOrnaments: ["사색하는 거목", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "200 이상" },
      { label: "HP", value: "5000 이상" }
    ],
    bestLightCones: ["무지개가 영원히 하늘에 머물길", "기억은 영원히 막을 내리지 않는다", "이야기의 다음 페이지"],
    skillPriority: ["특성", "기억 정령 스킬", "필살기", "기억 정령 특성", "일반 공격"],
    eidolonEfficiency: []
  };
