import { CharacterGuide } from './index';

export const 블레이드Guide: CharacterGuide = {
    characterName: "블레이드",
    lastUpdated: "2026-03-16",
    patchVersion: "1.2",
    bestRelics: ["가상공간을 누비는 메신저", "장수를 원하는 제자"],
    bestOrnaments: ["회전을 멈춘 살소토", "경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or HP",
      sphere: "바람 피해",
      rope: "HP"
    },
    subStats: ["치명타 확률", "치명타 피해", "HP", "속도"],
    targetStats: [
      { label: "HP", value: "7000 이상" },
      { label: "치명타 확률", value: "70%" }
    ],
    bestLightCones: ["닿을 수 없는 저편", "어떤 에이언즈의 몰락", "비밀 맹세", "푸른 하늘 아래"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: []
  };
