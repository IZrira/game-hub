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
    ,analysis: { status:"published", summary:"회복·해제와 함께 필살기로 파티 공격력과 에너지를 지원하는 바람 힐러다.", role:"에너지 지원 힐러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["지속 해제와 파티 에너지 회복을 동시에 제공한다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["스킬 포인트 소비와 공포 제거 유지가 필요하다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"전투 스킬로 공포 제거를 유지하고 파티 필살기 전에 자신의 필살기를 사용한다.", gameplay:{overview:"전투 스킬로 공포 제거를 유지하고 파티 필살기 전에 자신의 필살기를 사용한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
