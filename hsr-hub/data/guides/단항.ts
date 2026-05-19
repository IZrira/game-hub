import { CharacterGuide } from './index';

export const 단항Guide: CharacterGuide = {
    characterName: "단항",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["밤낮의 경계를 누비는 매"],
    bestOrnaments: ["회전을 멈춘 살소토", "경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "바람 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "120%" }
    ],
    bestLightCones: ["야경 속에서", "별바다 순항", "논검", "침묵만이 남을 뿐"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: []
  };
