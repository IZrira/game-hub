import { CharacterGuide } from './index';

export const 아젠티Guide: CharacterGuide = {
    characterName: "아젠티",
    lastUpdated: "2026-03-16",
    patchVersion: "1.5",
    bestRelics: ["스트리트 격투왕"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "물리 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["눈부신 태양보다 밝게", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1",
    eidolonEfficiency: []
  };
