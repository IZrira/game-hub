import { CharacterGuide } from './index';

export const 아낙사Guide: CharacterGuide = {
    characterName: "아낙사",
    lastUpdated: "2026-03-16",
    patchVersion: "3.2",
    bestRelics: ["양자 4세트"],
    bestOrnaments: ["경기장"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["전용 광추", "야경 속에서"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
