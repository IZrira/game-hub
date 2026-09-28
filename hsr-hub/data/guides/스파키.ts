import { CharacterGuide } from './index';

export const 스파키Guide: CharacterGuide = {
    characterName: "스파키",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    bestRelics: ["빛나는 공훈의 마법 소녀"],
    bestOrnaments: ["텐고쿠@라이브스트리밍", "이즈모 현세와 타카마 신국"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "180%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["눈부신 파키의 세상", "오늘의 행운", "슈룸 모험기"],
    skillPriority: ["환락 스킬", "특성", "일반 공격", "전투 스킬", "필살기"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "116.50%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "151.23%", efficiency3: "160.78%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "155.45%", efficiency3: "164.89%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "175.64%", efficiency3: "185.88%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "187.73%", efficiency3: "194.94%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "365.69%", efficiency3: "335.63%", description: "성흔 효과" }
    ],
    analysis: {
      status: "published",
      summary: "전투 스킬 포인트를 상호작용 함정과 킬링 포인트로 바꿔 강화 일반 공격과 다단 환락 스킬을 폭발시키는 확산형 환락 딜러다.",
      role: "환락 메인 딜러 / 파티 치명타 지원",
      standard: "E0 / S0, 치명타 확률 70%",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "상호작용 함정이 누적될수록 강화 일반 공격의 배율과 추가 환락 피해 횟수가 함께 증가한다.",
        "환락 스킬이 20회의 추가 타격을 제공해 다수전과 단일 잔여 목표 모두에 대응한다.",
        "보유 웃음 포인트에 따라 모든 아군의 치명타 피해를 높여 자신의 준비 구간에도 파티 기여가 남는다."
      ],
      weaknesses: [
        "강화 일반 공격을 크게 만들려면 전투 스킬 포인트를 연속 투입해야 해 파티의 포인트 수지가 중요하다.",
        "웃음 포인트와 킬링 포인트가 부족한 구간에는 공격 횟수와 지원 능력이 함께 낮아진다.",
        "공격력·치명타·속도를 모두 챙겨야 하며 느린 세팅은 행동 보조 캐릭터 의존도가 높다."
      ],
      teamPrinciple: "전투 스킬 포인트를 넉넉히 공급하는 동료와 웃음 포인트를 빠르게 쌓는 환락 서포터를 조합한다. 공격력 신발을 선택할 때는 행동 게이지 지원으로 실제 행동 수를 보완한다.",
      gameplay: {
        overview: "평상시에는 포인트를 확보하면서 필살기로 웃음 포인트를 모으고, 버프가 겹치는 구간에 전투 스킬을 반복해 상호작용 함정을 누적한 뒤 강화 일반 공격과 환락 스킬을 연속 사용한다.",
        rotation: [
          "서포터의 결계와 웃음 포인트 생성 효과를 먼저 전개한다.",
          "필살기로 웃음 포인트를 확보하고 파티 치명타 피해 버프를 높인다.",
          "전투 스킬을 필요한 만큼 반복해 상호작용 함정과 선물을 누적한다.",
          "강화 일반 공격 후 환락 스킬로 킬링 포인트를 보충하며 다음 사이클을 준비한다."
        ],
        tips: [
          "스킬을 무조건 20회 누르기보다 남은 전투 스킬 포인트와 적 체력을 보고 중단 지점을 정한다.",
          "환락 캐릭터 3명 조합에서는 필살기의 웃음 포인트와 킬링 포인트 획득량이 크게 증가한다.",
          "치명타 확률 70%는 시작점이며 실전 버프를 합산해 치명타 균형을 맞춘다."
        ]
      }
    }
  };
