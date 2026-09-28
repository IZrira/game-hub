import { CharacterGuide } from './index';

export const 애쉬베일Guide: CharacterGuide = {
    characterName: "애쉬베일",
    lastUpdated: "2026-04-06",
    patchVersion: "4.1",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "사수에 잠수한 선구자", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "천 개의 별이 모인 도시", note: "서브딜" },
      { name: "질주하는 늑대의 도람 왕조", note: "메인딜" },
      { name: "이즈모 현세와 타카마 신국", note: "다른 수렵 캐릭터와 파티 시" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "번개 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "공격력", value: "3400 이상" },
      { label: "치명타 확률", value: "70% 이상" }
    ],
    bestLightCones: [
      { name: "거짓말의 종막", note: "1순위" },
      "순수 사유의 세례",
      "고민, 그리고 행복",
      "별바다 순항",
      "그 종착지에서 다시 만나자"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능 (1 Target DPS 기준)" },
      { level: 1, impact: "Medium", efficiency1: "130.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "162.38%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "170.34%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.99%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "205.88%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "315.99%", efficiency3: "-", description: "성흔 효과" }
    ],
    analysis: {
      status: "published",
      summary: "미끼 하나에 파티 공격을 집중시켜 방어력 감소와 연속 추가 공격을 동시에 얻고, 탐닉을 필살기 마무리 화력으로 환전하는 단일 보스 특화 딜러다.",
      role: "추가 공격 메인 딜러 / 단일 디버퍼",
      standard: "E0 / S0, 속도 134 이상",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "미끼가 존재하는 동안 모든 적의 방어력을 낮춰 자신의 피해뿐 아니라 파티 전체 피해를 지원한다.",
        "동료가 미끼를 공격할 때 추가 공격과 에너지 회복이 발생해 공격 빈도가 높은 조합과 잘 맞는다.",
        "필살기가 강화 추가 공격과 탐닉 추가타를 연결해 단일 목표를 빠르게 정리한다."
      ],
      weaknesses: [
        "미끼 대상이 바뀌거나 너무 빨리 처치되면 충전과 탐닉 누적 흐름이 끊길 수 있다.",
        "충전은 최대 3pt라 동료의 공격이 몰리기 전에 소비 순서를 관리하지 않으면 발동 기회를 잃는다.",
        "다수의 적에게 피해가 분산되는 콘텐츠에서는 단일 집중 장점이 줄어든다."
      ],
      teamPrinciple: "추가 공격 또는 잦은 행동으로 미끼를 반복 타격하는 동료를 배치하고, 치명타 피해 지원을 중복 활용할 수 있는 추가 공격 딜러와 조합한다.",
      gameplay: {
        overview: "가장 오래 살아남을 핵심 적을 미끼로 고정한 뒤 동료들의 공격으로 충전과 탐닉을 쌓는다. 필살기는 탐닉이 충분하고 다음 대상까지 연쇄 처치할 수 있는 시점에 사용한다.",
        rotation: [
          "전투 스킬로 핵심 적을 미끼로 지정해 방어력 감소를 활성화한다.",
          "동료의 공격을 미끼에 집중해 특성 추가 공격과 에너지를 확보한다.",
          "충전이 비기 전에 애쉬베일의 행동과 필살기 순서를 조정한다.",
          "탐닉이 4의 배수로 충분히 쌓인 구간에 필살기로 강화 추가 공격을 폭발시킨다."
        ],
        tips: [
          "약한 적을 미끼로 잡으면 준비 전에 처치될 수 있으므로 보스나 정예를 우선한다.",
          "전투 스킬은 이미 미끼인 대상을 공격하면 포인트를 되돌려받아 반복 사용 부담이 낮다.",
          "치명타 확률 70% 이후에는 추가 공격 피해를 키우는 치명타 피해와 공격력을 균형 있게 올린다."
        ]
      }
    }
  };
