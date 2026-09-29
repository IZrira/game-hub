import { CharacterGuide } from './index';

export const 개척자기억Guide: CharacterGuide = {
    characterName: "개척자 (기억)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.6",
    variants: [
      {
        name: "카스토리스 파티 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율 or HP"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "HP", value: "5000 이상" }
        ]
      },
      {
        name: "범용 세팅",
        bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
        bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치명타 피해",
          boots: "속도",
          sphere: "HP or 얼음 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "치명타 피해", "HP"],
        targetStats: [
          { label: "속도", value: "143 이상" },
          { label: "치명타 피해", value: "150% 이상" }
        ]
      }
    ],
    bestRelics: ["천지를 재창조한 구세주", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["영원의 땅 앰포리어스", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP or 치명타 피해",
      boots: "속도",
      sphere: "HP or 얼음 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "치명타 피해", "HP"],
    targetStats: [
      { label: "속도", value: "143 이상" },
      { label: "HP", value: "5000 이상" },
      { label: "치명타 피해", value: "150% 이상" }
    ],
    bestLightCones: [
      { name: "이 순간처럼 영원한 사랑", note: "1순위" },
      { name: "무지개가 영원히 하늘에 머물길", note: "2순위" },
      { name: "핑크빛 내일을 향해", note: "3순위" },
      "기억은 영원히 막을 내리지 않는다"
    ],
    skillPriority: ["필살기", "특성", "일반 공격", "전투 스킬"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [],
    analysis: {
      status: "published",
      summary: "미미의 충전을 아군 에너지 회복으로 채워 핵심 딜러를 즉시 행동시키고, 그 공격에 확정 피해를 덧붙이는 무료 행동 보조 서포터다.",
      role: "기억 서포터 / 행동 게이지 지원",
      standard: "E6, 속도 143 이상",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: ["미미 충전 100%에서 단일 아군의 행동 게이지를 100% 증가시켜 즉시 행동을 제공한다.", "미미의 응원이 대상 피해에 확정 피해를 추가해 배율이 큰 단발 공격과 다단 공격 모두 지원한다.", "미미 치명타 피해에 비례한 파티 치명타 피해 증가로 행동 보조 전에도 상시 기여한다."],
      weaknesses: ["미미의 핵심 지원은 충전 100%가 필요해 에너지 회복이 적은 파티에서는 발동이 늦다.", "지원 대상과 미미의 행동 순서를 잘못 맞추면 행동 증가가 자연 턴 직전에 들어가 가치가 떨어진다.", "카스토리스 전용 HP 세팅과 범용 치명타 피해 세팅의 목적이 달라 파티 변경 시 장비 조정이 필요하다."],
      teamPrinciple: "에너지를 자주 회복하는 파티에서 미미 충전을 빠르게 채우고, 한 번의 추가 행동 가치가 큰 메인 딜러에게 미미의 응원을 집중한다.",
      gameplay: {
        overview: "첫 전투 스킬로 미미를 소환하고 아군의 에너지 회복을 통해 충전을 채운다. 100% 직전에는 주력 딜러의 현재 행동 게이지를 확인하고 자연 턴 직후 미미의 응원으로 다시 행동시키는 것이 이상적이다.",
        rotation: ["비술과 첫 전투 스킬로 미미를 빠르게 소환한다.", "아군 필살기와 에너지 회복으로 미미 충전을 100%까지 올린다.", "주력 딜러가 행동한 직후 미미의 응원으로 다시 행동시킨다.", "필살기로 서사시를 얻고 강화 일반 공격으로 미미 충전을 보조한다."],
        tips: ["카스토리스 파티는 HP 5000 이상을 우선해 미미 생존과 전용 시너지를 확보한다.", "범용 파티는 치명타 피해 150% 이상으로 파티 치명타 피해 버프를 높인다.", "미미의 응원 대상이 에너지 최대치 100을 초과하면 확정 피해 배율도 증가한다."]
      }
    }
  };
