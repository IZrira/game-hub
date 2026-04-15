import { CharacterGuide } from './index';

export const 클라라Guide: CharacterGuide = {
    characterName: "클라라",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["스트리트 격투왕", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "HP"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["대체할 수 없는 것", "어떤 에이언즈의 몰락", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  };
