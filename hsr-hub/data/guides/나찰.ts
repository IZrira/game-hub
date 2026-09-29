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
    eidolonEfficiency: [], analysis: { status:"published", summary:"아군 체력 저하에 자동 회복하고 결계로 공격 시 회복을 제공하는 공격력 기반 허수 힐러다.", role:"스킬 포인트 절약 힐러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["자동 회복으로 턴 밖 위기 대응이 가능하다.","필살기로 적 전체 버프를 해제한다."], weaknesses:["최대 HP 증가나 피해 감소 지원은 없다.","결계가 없는 구간의 광역 회복이 약하다."], teamPrinciple:"공격 빈도가 높은 파티에서 결계 회복을 최대화한다.", gameplay:{overview:"자동 스킬과 필살기로 백화의 순간을 모아 결계를 연다.",tips:["자동 회복 재사용 대기를 확인한다.","적 강화 후 필살기로 해제한다."]}}
  };
