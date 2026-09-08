import { CharacterGuide } from './index';

export const 키레네Guide: CharacterGuide = {
    characterName: "키레네",
    lastUpdated: "2026-03-16",
    patchVersion: "3.7",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "160%" }
    ],
    bestLightCones: ["그대는 나아가 노래하리니", "시간을 황금으로 엮어", "꽃은 잊지 않는다"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
