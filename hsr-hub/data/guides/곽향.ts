import { CharacterGuide } from './index';

export const 곽향Guide: CharacterGuide = {
    characterName: "곽향",
    lastUpdated: "2026-03-15",
    patchVersion: "3.4",
    bestRelics: ["태양과 번개의 여전사", "흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["바다에 잠긴 루샤카", "부러진 용골", "사색하는 거목", "불로인의 선주"],
    mainStats: {
      body: "치유량 증가",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "속도", value: "135 이상" },
      { label: "HP", value: "6000 이상" },
      { label: "효과 저항", value: "50% 이상" }
    ],
    bestLightCones: ["섬뜩한 밤", "수술 후의 대화", "같은 심정", { name: "알맞은 타이밍", note: "효과 저항 세팅 시" }, "내일의 내일이 올 때까지", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  };
