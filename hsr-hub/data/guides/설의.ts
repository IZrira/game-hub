import { CharacterGuide } from './index';

export const 설의Guide: CharacterGuide = {
    characterName: "설의",
    lastUpdated: "2026-10-29",
    patchVersion: "4.0",
    bestRelics: [
      { name: "별처럼 빛나는 천재", note: "1순위" },
      "곤충 재앙을 잠재우는 철기군",
      "유성을 쫓는 괴도"
    ],
    bestOrnaments: [
      { name: "도적국 탈리아", note: "1순위" },
      "우주 봉인 정거장",
      "회전을 멈춘 살소토",
      { name: "창공 전선 그라모스", note: "속도 135 기준" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "양자 피해 or 공격력",
      rope: "격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "격파 특수효과", value: "200% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: [
      { name: "마음에 새긴 약속", note: "1순위" },
      "어떤 에이언즈의 몰락"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "(-5.6 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "104.20%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "112.78%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "116.22%", efficiency3: "-", description: "(-5.6 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.79%", efficiency3: "-", description: "(-5.6 SP) 성흔 효과" }
    ]
    ,analysis: {
      status: "published",
      summary: "적의 강인성을 깎아 업보를 모으고, 업보가 차면 추가 공격을 발동하는 양자 파멸 딜러다. 격파 특수효과가 일반 피해 증가로도 전환되므로 강인성 소모와 직접 공격을 함께 설계한다.",
      role: "강인성 소모·추가 공격 딜러",
      standard: "E0 / S0 · E2·E6 차이 안내",
      reviewedAt: "2026-10-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "필살기는 약점 속성과 무관하게 강인성을 소모한다. 양자 약점이 없는 적에게도 업보를 모을 수단이 되지만, 적의 강인성 잠금까지 무시하는 효과는 아니다.",
        "예지 장치를 해금하면 격파 특수효과가 가하는 피해 증가에도 쓰인다. 격파 특수효과 매듭을 쓰면서 공격력과 치명타를 함께 챙기는 이유다."
      ],
      weaknesses: [
        "이미 격파됐거나 강인성이 잠긴 적만 남으면 강인성 소모로 얻는 업보가 끊긴다. 추가 공격 횟수를 적의 상태와 무관하게 고정해서 계산하면 안 된다.",
        "E0의 일반 공격·전투 스킬·추가 공격은 필살기처럼 약점을 무시하지 않는다. 양자 약점이 없으면 평상시 업보 수급을 동료에게 더 의존한다."
      ],
      teamPrinciple: "동료가 적의 실제 약점에 맞춰 강인성을 깎을 수 있는지 먼저 확인한다. 설의의 포인트를 지원하면서 강인성 소모에 참여할 동료가 좋으며, 아군의 강인성 소모와 설의 자신의 강인성 소모는 업보 계산 방식이 다르다.",
      gameplay: {
        overview: "적의 남은 강인성과 현재 업보를 함께 본다. 필살기를 격파 후에 낭비하지 않고, 강인성이 남은 목표를 골라 추가 공격으로 연결하는 것이 핵심이다.",
        rotation: [
          "양자 약점과 인접 적의 강인성을 확인한 뒤 전투 스킬로 강인성을 깎아 업보를 모은다.",
          "동료도 약점에 맞춰 강인성을 깎는다. 동료 공격은 타격 수만큼 업보를 주는 방식이 아니다.",
          "필살기는 강인성이 남은 주요 적에게 쓴다. 실제 강인성 소모가 피해 증가와 업보 수급에 기여한다.",
          "업보가 차면 추가 공격이 발동한다. 다음 공격은 강인성이 남은 적을 골라 수급을 이어 간다."
        ],
        tips: [
          "E2부터 추가 공격도 약점 속성을 무시하고 강인성을 깎는다. E0 기준 설명과 구분한다.",
          "E6는 추가 공격에 필요한 업보 상한을 8에서 6으로 줄인다. E6 영상을 보고 E0에서 같은 발동 횟수를 기대하지 않는다.",
          "예지 장치의 피해 증가 전환은 해금 후 적용된다. 도적국 탈리아의 속도 조건도 확인하되, 목표 속도를 맞추려고 치명타와 공격력을 무조건 포기하지 않는다."
        ]
      }
    }
  };
