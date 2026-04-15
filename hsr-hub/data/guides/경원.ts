import { CharacterGuide } from './index';

export const 경원Guide: CharacterGuide = {
    characterName: "경원",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["회전을 멈춘 살소토", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["동트기 전", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
