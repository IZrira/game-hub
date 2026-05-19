import { CharacterGuide } from './index';

export const 달리아Guide: CharacterGuide = {
    characterName: "달리아",
    lastUpdated: "2026-03-16",
    patchVersion: "3.8",
    bestRelics: [
      "곤충 재앙을 잠재우는 철기군", 
      "유성을 쫓는 괴도", 
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "태양과 번개의 여전사", note: "2세트" },
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "2세트" }
    ],
    bestOrnaments: ["겁화 연등의 연마궁", "도적국 탈리아", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "효과 명중 or HP",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["속도", "효과 명중", "격파 특수효과"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "효과 명중", value: "67%" },
      { label: "HP", value: "4000 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: ["그녀의 불꽃을 잊지 말라", "바람에 흩날리는 거짓말", "먼 길 끝의 귀로", "땀방울처럼 빛나는 결심", "휴일의 목욕탕 대모험"],
    skillPriority: ["특성", "필살기", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
  };
