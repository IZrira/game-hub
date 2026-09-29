import { CharacterGuide } from './index';

export const 개척자보존Guide: CharacterGuide = {
    characterName: "개척자 (보존)",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "정토 교황의 팔라딘", note: "1순위" }],
    bestOrnaments: [{ name: "부러진 용골", note: "1순위" }, "불로인의 선주", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도",
      sphere: "방어력",
      rope: "방어력"
    },
    subStats: ["방어력", "효과 명중", "속도", "HP"],
    targetStats: [
      { label: "방어력", value: "2500 이상" },
      { label: "효과 저항", value: "70%" },
      { label: "속도", value: "135 이상" }
    ],
    bestLightCones: [
      { name: "승리의 순간", note: "1순위" },
      { name: "랜도의 선택", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"도발과 실드로 아군을 보호하고 피격 시 반격하는 화염 보존 캐릭터다.", role:"도발 탱커", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["적 공격을 자신에게 모아 파티 피해를 줄인다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["광역 공격 대응 실드량은 제한적이다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"방어력을 높이고 위험한 적에게 도발을 유지한다.", gameplay:{overview:"방어력을 높이고 위험한 적에게 도발을 유지한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
