import { CharacterGuide } from './index';

export const 선데이Guide: CharacterGuide = {
    characterName: "선데이",
    lastUpdated: "2026-09-29",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["고행의 길에 다시 오른 사제"],
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
          { label: "속도", value: "168 이상" }
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
      "아직 전투는 끝나지 않았다",
      { name: "댄스! 댄스! 댄스!", note: "고속 세팅 시" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [],
    analysis: { status: "published", summary: "단일 딜러와 소환물을 동시에 즉시 행동시키며 피해·치명타·에너지를 지원하는 하이퍼캐리형 화합 캐릭터다. 딜러보다 바로 앞에서 행동하도록 속도를 맞추는 것이 핵심이다.", role: "행동 지원 / 소환물 특화 버퍼", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["딜러와 소환물을 함께 즉시 행동시켜 소환물 파티의 행동 가치를 크게 높인다.", "치명타 확률·치명타 피해·가하는 피해와 에너지를 한 대상에게 집중 지원한다.", "은혜 입은 자에게 스킬 사용 시 포인트를 돌려받아 반복 지원 부담이 낮다."], weaknesses: ["지원 대상이 한 명이라 이중 딜러 파티에서는 버프 분배가 어렵다.", "딜러와의 속도 순서가 어긋나면 즉시 행동 효과로 행동 게이지를 낭비한다.", "필살기 대상을 바꾸면 기존 은혜 입은 자 효과가 해제된다."], teamPrinciple: "핵심 딜러 한 명을 정하고 선데이를 그 딜러보다 약간 빠르게 맞춘다. 소환물 딜러라면 스킬의 추가 피해 증가까지 온전히 활용한다.", gameplay: { overview: "필살기로 주 딜러를 은혜 입은 자로 만든 뒤, 딜러 직전에 스킬을 사용해 본체와 소환물의 행동을 당긴다. 디버프 해제가 필요한 턴에는 스킬을 남겨 안정성까지 확보한다.", rotation: ["주 딜러보다 먼저 행동해 전투 스킬을 사용한다.", "필살기로 에너지와 치명타 피해를 공급한다.", "딜러 행동 직후 다시 스킬로 즉시 행동을 만든다.", "은혜 입은 자 3턴과 스킬 버프를 끊기지 않게 갱신한다."], tips: ["저속 세팅은 딜러보다 1가량 빠른 속도를 목표로 한다.", "소환물 딜러는 스킬 피해 증가량이 더 크므로 우선도가 높다.", "필살기의 최소 에너지 회복 40을 고려해 에너지 부족 구간에 사용한다."] } }
  };
