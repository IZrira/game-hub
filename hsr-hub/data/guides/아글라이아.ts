import { CharacterGuide } from './index';

export const 아글라이아Guide: CharacterGuide = {
    characterName: "아글라이아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.0",
    bestRelics: ["번개 4세트"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["전용 광추", "순수 사유의 세례"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
