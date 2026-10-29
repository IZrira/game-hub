import { CharacterGuide } from './index';

export const 반디Guide: CharacterGuide = {
    characterName: "반디",
    lastUpdated: "2026-10-29",
    patchVersion: "3.8",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["겁화 연등의 연마궁", "도적국 탈리아"],
    mainStats: {
      body: "공격력",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "공격력", value: "2500" },
      { label: "속도", value: "156 이상", note: "종결 167+" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "꿈은 어디로 돌아가야 하는가", "어떤 에이언즈의 몰락", "마음에 새긴 약속"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-13.2 SP)" },
      { level: 1, impact: "High", efficiency1: "108.40%", efficiency3: "107.95%", description: "SP 소모 감소 (-4.4 SP)" },
      { level: 2, impact: "High", efficiency1: "153.99%", efficiency3: "151.16%", description: "화력 대폭 상승 (-4.4 SP)" },
      { level: 3, impact: "Medium", efficiency1: "154.52%", efficiency3: "151.65%", description: "스킬 레벨 상승 (-4.4 SP)" },
      { level: 4, impact: "Low", efficiency1: "154.52%", efficiency3: "151.65%", description: "효과 저항 상승 (-4.4 SP)" },
      { level: 5, impact: "Medium", efficiency1: "160.10%", efficiency3: "157.13%", description: "필살기/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "246.33%", efficiency3: "239.82%", description: "종결 돌파 (-4.4 SP)" }
    ]
    ,analysis: {
      status: "published",
      summary: "필살기로 완전연소에 진입한 뒤 적의 강인성을 먼저 깎고, 격파된 적에게 강화 전투 스킬을 반복하는 슈퍼 격파 딜러다.",
      role: "슈퍼 격파 메인 딜러",
      standard: "E0 / S0",
      reviewedAt: "2026-10-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "강화 전투 스킬로 화염 약점을 부여하므로, 원래 화염 약점이 없는 주요 적도 격파 대상으로 삼을 수 있다.",
        "완전연소의 속도·격파 효율 강화가 강인성 소모와 후속 슈퍼 격파에 함께 기여한다. 공격력을 격파 특수효과로 바꾸는 행적도 있어 두 능력치를 함께 활용한다."
      ],
      weaknesses: [
        "완전연소는 카운트다운이 끝나면 해제된다. 강화 시간이 끝나기 전에 적을 격파하지 못하면 주력 공격 구간을 충분히 쓰기 어렵다.",
        "명함에서는 강화 전투 스킬도 포인트를 소모한다. 동료까지 스킬을 연속 사용하면 반디의 강화 행동을 일반 공격으로 바꿔야 할 수 있다."
      ],
      teamPrinciple: "격파·슈퍼 격파를 지원할 동료와 포인트를 공급할 동료를 함께 고른다. 단순 공격력 버프보다 격파된 적에게 강화 스킬을 여러 번 넣을 수 있는 구성을 우선한다.",
      gameplay: {
        overview: "에너지 준비, 완전연소 진입, 적 격파, 강화 스킬 반복 순서로 운용한다. 속도 목표도 필살기 전 표시값만 보지 말고 완전연소 중 확보할 행동 횟수를 기준으로 판단한다.",
        rotation: [
          "지원 효과와 포인트를 준비한다. 일반 상태의 스킬로 에너지를 채우되, HP 소모 뒤 적의 공격에 주의한다.",
          "필살기로 즉시 행동한다. 강화 스킬로 주요 적에게 화염 약점을 부여하고 강인성을 깎는다.",
          "격파한 적에게 강화 스킬을 이어 간다. 카운트다운 전에 남은 행동과 포인트를 확인한다.",
          "완전연소 종료 후 에너지를 다시 채운다. 강화 상태에서는 필살기를 재사용할 수 없다."
        ],
        tips: [
          "슈퍼 격파 행적은 약점 격파 상태의 적을 공격할 때 적용된다. 화염 약점을 부여한 것과 강인성을 모두 깎아 격파한 것을 구분한다.",
          "포인트가 부족할 때 강화 일반 공격은 대안이지만, 강화 전투 스킬과 강인성 감소량·공격 범위가 다르다. 동료의 스킬 소비부터 줄일 수 있는지 확인한다.",
          "1돌파의 강화 스킬 포인트 소모 제거를 명함 운용에 적용하지 않는다. 공격·격파 지원과 별개로 명함 파티는 포인트 수지를 먼저 맞춘다."
        ]
      }
    }
  };
