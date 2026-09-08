import { CharacterGuide } from './index';

export const 에버나이트Guide: CharacterGuide = {
    characterName: "에버나이트",
    lastUpdated: "2026-03-16",
    patchVersion: "3.6",
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["뭇별 경기장"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" }
    ],
    bestLightCones: ["긴 밤의 별빛에게", "시간을 황금으로 엮어", "꽃은 잊지 않는다"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
