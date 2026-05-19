import { CharacterGuide } from './index';

export const 나타샤Guide: CharacterGuide = {
    characterName: "나타샤",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "가상공간을 누비는 메신저", "흔적을 남기지 않은 과객"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "사색하는 거목"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "속도", value: "135 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "효과 저항", value: "70% 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "세월은 흐를 뿐", "수술 후의 대화", "알맞은 타이밍", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  };
