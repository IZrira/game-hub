import { CharacterGuide } from './index';

export const 미샤Guide: CharacterGuide = {
    characterName: "미샤",
    lastUpdated: "2026-10-29",
    patchVersion: "4.0",
    bestRelics: ["지식의 바다에 빠진 학자", "혹한 밀림의 사냥꾼"],
    bestOrnaments: ["창공 전선 그라모스", "뭇별 경기장", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "2800 이상" }
    ],
    bestLightCones: ["이와 같이 타오르는 여명", "어떤 에이언즈의 몰락", "마음에 새긴 약속"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "(-12 SP) 기본 성능" },
      { level: 1, impact: "Low", efficiency1: "104.86%", efficiency3: "110.41%", description: "(-12 SP) 성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "114.68%", efficiency3: "120.74%", description: "(-12 SP) 성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "119.64%", efficiency3: "124.91%", description: "(-12 SP) 스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "125.49%", efficiency3: "129.85%", description: "(-12 SP) 성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "130.98%", efficiency3: "136.90%", description: "(-12 SP) 스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "142.19%", efficiency3: "146.35%", description: "(-12 SP) 성흔 효과" }
    ]
    ,analysis: {
      status: "published",
      summary: "아군의 전투 스킬 포인트 소비를 필살기 타수와 에너지로 바꾸는 얼음 딜러다. 적이 적을 때 바운스 피해를 집중하거나, 위험한 적의 행동 전에 빙결을 노리는 두 가지 용도로 운용한다.",
      role: "필살기 바운스 딜러",
      standard: "E0 / S0 · 추가 능력 해금 여부에 따라 빙결 성능 차이",
      reviewedAt: "2026-10-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "다른 아군이 전투 스킬 포인트를 소비해도 특성으로 타수와 에너지를 얻는다. 미샤가 매번 전투 스킬을 쓰지 않아도 필살기를 준비할 수 있다.",
        "적이 한 명이면 무작위 바운스도 그 적에게 집중된다. 보스만 남기는 식으로 공격 대상을 줄이면 필살기의 피해를 모으기 쉽다.",
        "빙결에 걸리는 적은 행동을 멈춘다. 추가 능력 릴리즈와 인터로크를 해금하면 첫 타격의 빙결 기본 확률과 필살기 중 효과 명중을 보완할 수 있다."
      ],
      weaknesses: [
        "첫 타격 뒤의 공격은 무작위다. 여러 적이 남아 있으면 우선 처치할 적에게 모든 타수를 집중시키기 어렵다.",
        "빙결은 확정 효과가 아니다. 효과 저항과 제어 저항·면역을 확인해야 하며, 빙결 실패를 전제로 생존 수단도 준비해야 한다.",
        "필살기 타수만 채우려고 동료의 불필요한 전투 스킬을 쓰면 포인트가 부족해진다. 파티의 주력 행동과 생존을 먼저 확보해야 한다."
      ],
      teamPrinciple: "전투 스킬을 자주 쓰는 동료는 미샤의 특성을 돕지만, 둘 다 포인트를 요구하면 충돌한다. 일반 공격으로 포인트를 벌어 줄 지원 캐릭터를 두고, 미샤가 주력 딜러인지 필살기 위주 보조 딜러인지 먼저 정한다.",
      gameplay: {
        overview: "필살기는 기본 3단에서 시작해 E0 기준 최대 10단까지 준비할 수 있다. 최대 타수를 기다릴지, 적의 위험한 행동 전에 빙결을 시도할지를 상황에 따라 선택한다.",
        rotation: [
          "전투 전 비술 영역 안의 적과 교전할 수 있다면 첫 필살기의 추가 타수를 확보한다.",
          "아군의 전투 스킬 소비로 타수를 쌓는다. 미샤도 스킬을 쓰되, 포인트가 부족하면 일반 공격을 고른다.",
          "에너지와 타수를 확인해 필살기를 쓴다. 첫 타격은 빙결로 행동을 막고 싶은 적에게 지정한다.",
          "필살기 후 타수는 기본 상태로 돌아간다. 동료의 포인트 소비로 다음 필살기를 준비한다."
        ],
        tips: [
          "최대 타수에 도달한 채 오래 기다리면 이후의 타수 증가를 활용하지 못한다. 다만 적의 행동 차단이나 다음 웨이브를 위한 보존이 더 유리할 수도 있다.",
          "빙결된 적을 공격할 때 치명타 피해를 얻는 추가 능력 트랜스미션은 해금 후에 적용된다. 제어가 통하지 않는 적에게 같은 이득을 전제하지 않는다.",
          "E1의 적 수에 따른 추가 타수, E2의 방어력 감소, E6의 포인트 회복은 E0 기본 효과가 아니다. 성흔을 가진 경우에만 운용에 반영한다."
        ]
      }
    }
  };
