import { CharacterGuide } from './index';

export const 히실렌스Guide: CharacterGuide = {
    characterName: "히실렌스",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    bestRelics: ["깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사", "우주 봉인 정거장"],
    mainStats: {
      body: "효과 명중",
      boots: "속도 or 공격력",
      sphere: "물리 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "효과 명중", value: "120% 이상" },
      { label: "속도", value: "134 이상" },
      { label: "속도", value: "168 이상" },
      { label: "공격력", value: "2400 이상" }
    ],
    bestLightCones: ["바다는 왜 노래하는가", "시간의 기억에 대한 재구성", "그 무수한 봄날", "사냥감의 시선", "밤 인사와 잠든 얼굴"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonVariants: [
      {
        name: "광추별 효율",
        labels: ["바다는 왜 노래하는가", "사냥감의 시선"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "126%", efficiency3: "126%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "209%", efficiency3: "215%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "228%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "273%", efficiency3: "281%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "284%", efficiency3: "291%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "369%", efficiency3: "380%", description: "성흔 효과" }
        ]
      },
      {
        name: "사냥감의 시선 기준",
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "100%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Low", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 2, impact: "Medium", efficiency1: "167%", efficiency3: "172%", description: "성흔 효과" },
          { level: 3, impact: "Medium", efficiency1: "182%", efficiency3: "188%", description: "스킬 레벨 상승" },
          { level: 4, impact: "Medium", efficiency1: "218%", efficiency3: "225%", description: "성흔 효과" },
          { level: 5, impact: "Medium", efficiency1: "227%", efficiency3: "234%", description: "스킬 레벨 상승" },
          { level: 6, impact: "High", efficiency1: "295%", efficiency3: "305%", description: "성흔 효과" }
        ]
      }
    ],
    eidolonEfficiency: [],
    analysis: {
      status: "published",
      summary: "네 종류 지속 피해를 빠르게 분산시키고 결계에서 방어력 감소와 지속 피해 재발동을 겹치는 범용 지속 피해 핵심 캐릭터다.",
      role: "지속 피해 디버퍼 / 서브 딜러",
      standard: "E0 / S0, 효과 명중 120% 이상",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: ["아군의 공격마다 풍화·열상·연소·감전을 우선적으로 다르게 부여해 죄수 세트 조건을 빠르게 채운다.", "결계가 적 공격력과 방어력을 낮추면서 지속 피해를 받을 때 물리 지속 피해를 추가한다.", "필살기 발동 시 적이 가진 모든 지속 피해를 즉시 결산해 턴을 기다리지 않고 피해를 낸다."],
      weaknesses: ["효과 명중 120%를 맞춰야 행적 피해 증가 상한과 안정적인 상태 부여를 함께 확보한다.", "결계의 추가 피해 발동 횟수 상한이 있어 공격 빈도가 지나치게 높으면 후반 공격은 이득을 받지 못한다.", "에너지 회복 매듭 의존도가 높아 필살기 결계가 비는 순간 파티의 공격·방어 성능이 함께 낮아진다."],
      teamPrinciple: "카프카처럼 지속 피해를 즉시 결산하거나 공격 횟수가 많은 캐릭터와 조합하고, 속도·에너지 지원으로 결계를 끊기지 않게 유지한다.",
      gameplay: {
        overview: "전투 시작 행적으로 첫 결계를 확보한 뒤 전투 스킬의 받는 피해 증가를 전체에 유지한다. 여러 지속 피해가 쌓인 직후 필살기를 사용해 즉시 결산하고 결계 지속 시간을 다시 연다.",
        rotation: ["비술로 여러 종류의 지속 피해를 부여하며 전투에 진입한다.", "전투 스킬로 모든 적의 받는 피해 증가를 유지한다.", "아군의 다단 공격으로 서로 다른 지속 피해를 확산한다.", "지속 피해가 충분히 쌓이면 필살기로 즉시 결산하고 결계를 갱신한다."],
        tips: ["효과 명중 120%를 우선 맞춘 뒤 속도 134 또는 168 구간 중 파티 순서에 맞는 목표를 선택한다.", "전투 시작 결계가 남아 있어도 지속 피해 즉시 결산이 필요하면 필살기를 아끼지 않는다.", "단일 공격 후에도 결계 피해가 발동하므로 행동 수가 많은 동료의 주목표를 핵심 적에 고정한다."]
      }
    }
  };
