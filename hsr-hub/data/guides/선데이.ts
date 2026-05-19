import { CharacterGuide } from './index';

export const 선데이Guide: CharacterGuide = {
    characterName: "선데이",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "치명타 피해", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "168 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "치명타 피해", value: "200% 이상" }
    ],
    bestLightCones: [
      "대지로 돌아온 비행",
      "아직 전투는 끝나지 않았다",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅 시" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: []
  };
