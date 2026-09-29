import { CharacterGuide } from './index';

export const 스파클Guide: CharacterGuide = {
    characterName: "스파클",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제", "가상공간을 누비는 메신저"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "치명타 피해", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 방어력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해"],
        targetStats: [
          { label: "속도", value: "167 이상" }
        ]
      }
    ],
    bestRelics: ["고행의 길에 다시 오른 사제"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "치명타 피해",
      boots: "속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "치명타 피해", value: "200% 이상" }
    ],
    bestLightCones: [
      "대지로 돌아온 비행",
      "속세에서의 유희",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅 시" },
      "아직 전투는 끝나지 않았다"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"스킬 포인트 최대치와 회복량을 늘리고 단일 아군 행동을 당기며 치명타 피해를 지원하는 화합 캐릭터다.", role:"스킬 포인트·행동 지원", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["포인트 소비가 큰 딜러의 연속 행동을 안정화한다.","고유 자원을 파티 행동과 연계하면 안정적인 기여를 한다."], weaknesses:["행동 당기기가 50%라 속도 조율에 따라 가치가 달라진다.","핵심 상태가 비는 구간에는 성능이 크게 낮아진다."], teamPrinciple:"스파클을 고속으로 세팅해 저속 딜러를 반복 당긴다.", gameplay:{overview:"스파클을 고속으로 세팅해 저속 딜러를 반복 당긴다.", rotation:["전투 초반 핵심 자원과 상태를 준비한다.","지원 효과가 겹친 구간에 강화 행동을 사용한다."], tips:["자원 상한에 도달해 낭비되지 않게 확인한다.","적 수와 약점에 따라 주 공격 대상을 조정한다."]}}
  };
