import { CharacterGuide } from './index';

export const 링스Guide: CharacterGuide = {
    characterName: "링스",
    lastUpdated: "2026-03-16",
    patchVersion: "1.3",
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
      { label: "HP", value: "5000 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "따듯한 밤은 길지 않고"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E4 / E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"최대 HP 증가와 지속 회복을 제공하며 필살기로 파티 전체 디버프를 해제하는 양자 힐러다.", role:"광역 해제 힐러", standard:"E6 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["필살기로 전원 회복과 전원 해제를 동시에 한다.","파멸·보존 대상의 어그로와 최대 HP를 높인다."], weaknesses:["즉시 단일 회복량이 제한적이다.","어그로 증가가 원치 않는 대상에는 위험하다."], teamPrinciple:"피격을 원하는 반격·HP 소모 딜러에게 스킬을 사용한다.", gameplay:{overview:"지속 회복을 유지하고 광역 디버프 직후 필살기로 해제한다.",tips:["필살기를 해제용으로 남긴다.","스킬 대상의 어그로 변화를 고려한다."]}}
  };
