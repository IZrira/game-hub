import { CharacterGuide } from './index';

export const 완매Guide: CharacterGuide = {
    characterName: "완·매",
    lastUpdated: "2026-03-16",
    patchVersion: "1.6",
    bestRelics: ["가상공간을 누비는 메신저", "유성을 쫓는 괴도"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "탈리아"],
    mainStats: {
      body: "HP or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "HP", "방어력"],
    targetStats: [
      { label: "격파 특수효과", value: "160% 이상" },
      { label: "격파 특수효과", value: "180% 이상" },
      { label: "속도", value: "134 이상" },
      { label: "속도", value: "145 이상" },
      { label: "속도", value: "160 이상" }
    ],
    bestLightCones: ["거울 속의 나", "기억 속의 모습", "댄스! 댄스! 댄스!", "아직 전투는 끝나지 않았어"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  };
