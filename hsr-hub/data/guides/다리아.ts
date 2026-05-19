import { CharacterGuide } from './index';

export const 다리아Guide: CharacterGuide = {
    characterName: "다리아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.8",
    bestRelics: ["가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "HP", "효과 저항"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: ["전용 광추", "거울 속의 나", "기억 속의 모습"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  };
