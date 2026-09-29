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
    ,analysis: { status:"published", summary:"단일 지속 회복과 저비용 광역 필살기를 제공하는 물리 풍요 캐릭터다.", role:"기본 회복 힐러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["필살기 에너지 요구량이 낮고 단일 해제가 가능하다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["공격적 지원과 예방 능력이 부족하다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"위험한 아군에게 지속 회복을 걸고 광역 피해 뒤 필살기를 사용한다.", gameplay:{overview:"위험한 아군에게 지속 회복을 걸고 광역 피해 뒤 필살기를 사용한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
