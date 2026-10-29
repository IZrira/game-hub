import { CharacterGuide } from './index';

export const 삼포Guide: CharacterGuide = {
    characterName: "삼포",
    lastUpdated: "2026-10-29",
    patchVersion: "4.0",
    bestRelics: ["깊은 감옥에 수감된 죄수", "밤낮의 경계를 나는 매"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "바람 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "3000" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["바람에 흩날리는 거짓말", "밤 인사와 잠든 얼굴", "사냥감의 시선", "땀방울처럼 빛나는 결심"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "113.08%", efficiency3: "110.20%", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "118.76%", efficiency3: "112.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "140.88%", efficiency3: "123.33%", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "149.42%", efficiency3: "133.20%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "170.92%", efficiency3: "157.58%", description: "성흔 효과" }
    ]
    ,analysis: {
      status: "published",
      summary: "풍화를 최대 5스택까지 쌓고 필살기로 적이 받는 지속 피해를 높이는 바람 공허 딜러다. 중첩을 빠르게 만들 때와 포인트를 돌려줄 때를 나누어 운용한다.",
      role: "풍화 딜러·지속 피해 증폭",
      standard: "E0 / S0 · E4 운용 별도 안내",
      reviewedAt: "2026-10-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "전투 스킬의 여러 타격으로 풍화 부여를 반복해서 시도한다. 적이 한 명이면 바운스가 모여 주력 목표의 중첩을 쌓기 쉽다.",
        "필살기의 지속 피해 받는 피해 증가는 삼포의 풍화뿐 아니라 동료의 지속 피해도 돕는다. 중첩 유지 중에는 일반 공격으로 포인트를 회복할 선택지도 있다."
      ],
      weaknesses: [
        "바운스의 추가 타격은 무작위 대상이다. 적이 많으면 지정한 보스에게 모든 타격과 풍화가 들어간다는 전제로 운용할 수 없다.",
        "풍화와 필살기 디버프는 기본 확률로 부여된다. 효과 명중이 부족하면 공격력만 높여도 중첩과 증폭 효과를 안정적으로 유지하기 어렵다."
      ],
      teamPrinciple: "카프카처럼 걸린 지속 피해를 즉시 발동하는 동료나 지속 피해를 함께 누적할 동료와 편성한다. 일반적인 치명타 딜러를 돕기 위해 넣기보다, 필살기의 지속 피해 증폭을 파티가 실제로 사용할 수 있는지 먼저 본다.",
      gameplay: {
        overview: "풍화가 부족한 적에게 전투 스킬을 쓰고, 필살기 디버프가 유지되는 동안 지속 피해를 집중한다. E4 전후에는 전투 스킬의 역할이 달라진다.",
        rotation: [
          "주력 적의 풍화 중첩을 확인하고, 부족하면 전투 스킬의 다단 공격으로 부여를 시도한다.",
          "적 턴의 지속 피해나 동료의 즉시 발동 공격 전에 필살기로 지속 피해 받는 피해 증가를 건다.",
          "풍화 유지 중에는 일반 공격으로 포인트를 번다. E4는 풍화 5스택 이상인 적에게 스킬로 즉시 피해를 노린다.",
          "새 적의 풍화와 디버프를 다시 확인한다. 필살기는 지속 피해 증폭이 필요한 구간에 맞춘다."
        ],
        tips: [
          "E0 전투 스킬은 E4처럼 풍화를 즉시 발동하지 않는다. E4 운용 설명을 모든 삼포에게 적용하지 않는다.",
          "필살기 디버프는 적이 받는 지속 피해를 높이는 효과다. 필살기 직후의 일반적인 직접 공격까지 같은 비율로 강해지는 것은 아니다.",
          "올가미 행적은 풍화 지속 시간을 늘린다. 해금 여부와 목표의 남은 턴을 확인하면 불필요한 전투 스킬 사용을 줄일 수 있다."
        ]
      }
    }
  };
