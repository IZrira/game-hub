import { CharacterGuide } from './index';

export const 청작Guide: CharacterGuide = {
    characterName: "청작",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["경기장", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  };
