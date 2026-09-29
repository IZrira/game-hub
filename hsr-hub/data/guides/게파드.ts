import { CharacterGuide } from './index';

export const 게파드Guide: CharacterGuide = {
    characterName: "게파드",
    lastUpdated: "2026-03-14",
    patchVersion: "3.6",
    bestRelics: [
      { name: "별빛에 숨은 은둔자", note: "1순위" },
      { name: "정토 교황의 팔라딘", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "부러진 용골", note: "1순위" },
      "불로인의 선주",
      "바다에 잠긴 루샤카"
    ],
    mainStats: {
      body: "방어력 or 효과 명중",
      boots: "속도 or 방어력",
      sphere: "방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["방어력", "효과 저항", "효과 명중", "속도"],
    targetStats: [
      { label: "방어력", value: "3000 이상" },
      { label: "효과 저항", value: "70%" }
    ],
    bestLightCones: [
      { name: "언제나 여정이 평탄하기를", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "여생의 첫날", note: "3순위" },
      { name: "랜도의 선택", note: "어그로 필요 시" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"필살기로 파티 전체에 강한 실드를 제공하고 빙결로 적 행동을 막는 얼음 탱커다.", role:"광역 실드 탱커", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["높은 실드량과 자체 부활로 안정성이 높다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["필살기 전에는 파티 실드 공백이 생길 수 있다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"에너지 회복과 방어력을 확보해 실드를 끊기지 않게 한다.", gameplay:{overview:"에너지 회복과 방어력을 확보해 실드를 끊기지 않게 한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
