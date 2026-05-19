import { CharacterGuide } from './index';

export const 백로Guide: CharacterGuide = {
    characterName: "백로",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항"],
    targetStats: [
      { label: "HP", value: "6000 이상" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["세월은 흐를 뿐", "수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
  };
