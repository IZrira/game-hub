import { CharacterGuide } from './index';

export const 부현Guide: CharacterGuide = {
    characterName: "부현",
    lastUpdated: "2026-03-14",
    patchVersion: "3.4",
    bestRelics: [
      "태양과 번개의 여전사",
      { name: "장수를 원하는 제자", note: "2세트" },
      { name: "가상공간을 누비는 메신저", note: "2세트" },
      { name: "고행의 길에 다시 오른 사제", note: "2세트" },
      { name: "눈보라에 맞서는 철위대", note: "2세트" }
    ],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "꿈의 땅 페나코니", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도 or HP",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["HP", "속도", "효과 저항", "방어력"],
    targetStats: [
      { label: "HP", value: "8000" }
    ],
    bestLightCones: [
      { name: "그녀는 두 눈을 감았네", note: "1순위" },
      { name: "승리의 순간", note: "2순위" },
      { name: "기억의 소재", note: "3순위" },
      "여생의 첫날",
      { name: "랜도의 선택", note: "어그로 필요 시" },
      { name: "우주 시장 동향", note: "아케론 파티 사용 시" }
    ],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"피해 분담과 최대 HP·치명타 확률 지원으로 파티를 보호하는 양자 보존 캐릭터다.", role:"피해 분담 탱커", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["행렬이 유지되면 파티 급사를 안정적으로 방지한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["큰 연속 광역 피해는 부현에게 피해가 집중돼 위험하다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"행렬을 끊지 않고 특성 회복 횟수를 관리한다.", gameplay:{overview:"행렬을 끊지 않고 특성 회복 횟수를 관리한다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
