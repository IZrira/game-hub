import { CharacterGuide } from './index';

export const 나찰Guide: CharacterGuide = {
    characterName: "나찰",
    lastUpdated: "2026-03-16",
    patchVersion: "1.1",
    bestRelics: ["흔적을 남기지 않은 과객", "가상공간을 누비는 메신저"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or 공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["공격력", "속도", "효과 저항"],
    targetStats: [
      { label: "공격력", value: "3000 이상" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["관의 울림", "알맞은 타이밍", "수술 후의 대화", { name: "등가교환", note: "전부 에너지 충전 필요 시" }],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E2",
    eidolonEfficiency: []
  };
