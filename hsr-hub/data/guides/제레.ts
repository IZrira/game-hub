import { CharacterGuide } from './index';

export const 제레Guide: CharacterGuide = {
    characterName: "제레",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "공격력 or 속도 (2돌파 이상 시 공격력, 명함 속도 122 이상 시 공격력)",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "210%" },
          { label: "공격력", value: "3400" }
        ]
      },
      {
        name: "비 전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "속도 or 공격력",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2700" }
        ]
      }
    ],
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["야경 속에서", "깊게 든 단잠", "별바다 순항", "논검"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "109.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "130.39%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "146.50%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "182.28%", efficiency3: "-", description: "성흔 효과" }
    ],
    analysis: {
      status: "published",
      summary: "약한 적을 처치해 재현을 발동하고, 강화 상태의 추가 행동을 정예에게 연결하는 처치 설계형 딜러다. 단순히 보스만 공격하기보다 잡몹의 체력을 누구로 마무리할지 조절할수록 실제 화력이 높아진다.",
      role: "재현 연쇄형 양자 단일 딜러",
      standard: "E0 / S0",
      reviewedAt: "2026-10-08",
      reviewer: "RIRA 편집팀",
      strengths: [
        "적 처치 직후 재현으로 추가 행동을 얻어 잡몹 정리와 정예 공격을 한 흐름으로 연결한다.",
        "강화 상태의 피해 증가를 필살기와 전투 스킬에 집중하면 짧은 공격 구간의 폭발력이 높다.",
        "양자 약점 파티에서는 은랑의 약점 부여나 양자 지원 효과를 활용하기 쉽다."
      ],
      weaknesses: [
        "처치 가능한 적이 없는 단일 보스전에서는 재현 횟수가 줄어 핵심 장점을 살리기 어렵다.",
        "지원 캐릭터가 잡몹을 먼저 처치하면 재현 기회를 잃으므로 자동 전투와 공격 순서의 영향을 크게 받는다.",
        "추가 행동이 많아 버프 지속 턴을 빠르게 소모할 수 있어 지원기의 갱신 시점을 맞춰야 한다."
      ],
      teamPrinciple: "제레가 잡몹의 마지막 타격을 가져갈 수 있도록 광역 공격의 피해량을 조절하고, 재현이 발동한 뒤 정예에게 집중할 버프와 디버프를 준비한다. 행동 게이지 지원기는 제레의 추가 행동과 버프 지속 시간을 확인해 턴을 당겨야 한다.",
      gameplay: {
        overview: "전투 시작 전 지원기의 버프와 적 디버프를 준비하고, 제레의 전투 스킬로 처치 가능한 잡몹을 먼저 노린다. 재현이 발동하면 강화 상태를 유지한 채 정예에게 전투 스킬이나 필살기를 집중한다.",
        rotation: [
          "지원기의 버프와 방어력 감소를 먼저 적용한다.",
          "잡몹의 체력을 제레가 한 번에 마무리할 수 있는 범위로 조절한다.",
          "제레가 잡몹을 처치해 재현과 강화 상태를 확보한다.",
          "재현 행동에서 정예를 공격하고, 강화 상태가 남아 있을 때 필살기를 사용한다."
        ],
        tips: [
          "필살기로 적을 처치해도 재현을 발동할 수 있으므로 잡몹 마무리와 정예 폭딜 중 어느 쪽이 이득인지 판단한다.",
          "속도는 무조건 높이기보다 전용 광추 스택, 2돌파 효과, 지원기의 행동 게이지 증가를 함께 계산한다.",
          "재현이 나오지 않는 전투에서는 속도보다 치명타와 공격력 투자 효율이 더 높을 수 있다."
        ]
      }
    }
  };
