import { CharacterGuide } from './index';

export const 아글라이아Guide: CharacterGuide = {
    characterName: "아글라이아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.0",
    bestRelics: ["뇌전을 울리는 밴드"],
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
    bestLightCones: ["시간을 황금으로 엮어", "기억은 영원히 막을 내리지 않는다", "꽃은 잊지 않는다"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
