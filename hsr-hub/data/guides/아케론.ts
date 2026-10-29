import { CharacterGuide } from './index';

export const 아케론Guide: CharacterGuide = {
    characterName: "아케론",
    lastUpdated: "2026-10-29",
    patchVersion: "3.8",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률\nor 치명타 피해",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상", note: "1돌파 시 -18% 적용" },
      { label: "치명타 피해", value: "160% 이상" },
      { label: "공격력", value: "4000 이상" }
    ],
    bestLightCones: ["흘러가는 강가를 따라", "끝없는 춤"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-7.4 SP)" },
      { level: 1, impact: "Medium", efficiency1: "111.77%", efficiency3: "113.53%", description: "치명타 확률 증가" },
      { level: 2, impact: "High", efficiency1: "123.38%", efficiency3: "129.82%", description: "공허 캐릭터 요구량 감소" },
      { level: 3, impact: "Medium", efficiency1: "129.42%", efficiency3: "137.06%", description: "필살기/일반 공격 레벨 상승" },
      { level: 4, impact: "High", efficiency1: "137.38%", efficiency3: "145.45%", description: "필살기 피해 취약 부여" },
      { level: 5, impact: "Medium", efficiency1: "142.16%", efficiency3: "149.18%", description: "전투 스킬/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "169.81%", efficiency3: "178.11%", description: "모든 공격이 필살기 피해로 간주" }
    ]
    ,analysis: {
      status: "published",
      summary: "에너지 대신 꿈 조각을 모아 필살기를 사용하는 번개 딜러다. 동료가 디버프를 얼마나 자주 부여하는지가 필살기 회전을 좌우한다.",
      role: "디버프 연계 필살기 딜러",
      standard: "E0 / S0",
      reviewedAt: "2026-10-29",
      reviewer: "RIRA 편집팀",
      strengths: [
        "동료의 디버프 행동도 꿈 조각 획득에 기여한다. 방어력 감소 등으로 필살기 피해를 돕는 행동이 다음 필살기 준비까지 겸한다.",
        "필살기는 번개 약점이 없는 적의 강인성도 깎는다. 눈물 베기 대상과 전체 공격을 함께 활용해 주요 적과 주변 적을 동시에 압박할 수 있다."
      ],
      weaknesses: [
        "디버프를 유지하기만 하고 새로 부여하지 않으면 꿈 조각이 자동으로 쌓이지 않는다. 디버프 적중 실패나 동료의 행동 지연도 회전에 영향을 준다.",
        "명함에서 나락 행적의 최대 강화를 받으려면 아케론 외 공허 동료 둘이 필요하다. 화합 동료를 넣을 때는 이 강화와 디버프 행동을 포기하는 만큼 얻는 이득을 비교해야 한다."
      ],
      teamPrinciple: "공허 동료 둘을 기준으로 디버프 부여 빈도, 방어·저항 약화, 포인트 수급을 나눠 맡긴다. 생존 담당도 디버프를 부여할 수 있다면 추가 꿈 조각 획득에 기여하지만, 생존을 희생해 강제로 맞추지는 않는다.",
      gameplay: {
        overview: "디버프를 부여해 꿈 조각을 모으고, 주요 적에 약화 효과가 남아 있을 때 필살기를 사용한다. 필살기 충전과 피해 준비가 같은 동료 행동으로 이어지도록 설계한다.",
        rotation: [
          "전투 시작 시 행적으로 얻는 꿈 조각을 확인하고, 동료의 디버프를 주력 목표에 부여한다.",
          "아케론은 전투 스킬, 동료는 디버프 부여·갱신으로 꿈 조각을 모은다.",
          "꿈 조각 9개와 적의 약화를 확인해 필살기를 쓴다. 눈물 베기는 아즈사카가 쌓인 적을 고른다.",
          "필살기 후 다음 디버프 행동부터 다시 충전한다. 오래 대기해 초과 저장분까지 낭비하지 않는다."
        ],
        tips: [
          "한 번의 스킬로 여러 적에게 여러 디버프를 걸어도, 특성의 꿈 조각 획득은 그 스킬당 한 번이다. 디버프 개수와 충전 횟수를 같은 것으로 계산하지 않는다.",
          "일반적인 에너지 회복을 꿈 조각 회복으로 계산하지 않는다. 에너지 지원 동료를 고를 때는 아케론에게 제공하는 다른 효과를 따로 확인한다.",
          "2돌파에서 공허 동료 요구 수가 줄어드는 효과는 명함에 적용되지 않는다. 필살기의 약점 무시는 강인성 감소에 관한 효과이며 적의 속성 저항을 모두 없애는 효과도 아니다."
        ]
      }
    }
  };
