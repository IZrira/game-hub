import { CharacterGuide } from './index';

export const 맥택Guide: CharacterGuide = {
    characterName: "맥택",
    lastUpdated: "2026-09-29",
    patchVersion: "4.0",
    bestRelics: ["사수에 잠수한 선구자", "재와 뼈마저 불사르는 대공"],
    bestOrnaments: ["질주하는 늑대의 도람 왕조", "이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "번개 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "130%" },
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: ["고민, 그리고 행복", "순수 사유의 세례", "논검", "별바다 순항"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "106.95%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "120.01%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "130.45%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "153.80%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "155.18%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "167.21%", efficiency3: "-", description: "성흔 효과" }
    ],
    analysis: { status: "published", summary: "적을 사냥감으로 지정한 뒤 전장을 이탈하고 아군 공격에 맞춰 추가 공격하는 번개 수렵 서브 딜러다. 행동 게이지를 차지하지 않으면서 단일 대상 추가 공격 파티의 타격 수를 늘린다.", role: "추가 공격 서브 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["사냥감 상태에서 행동 서열을 비워 파티 행동을 방해하지 않는다.", "아군이 사냥감을 공격할 때 충전을 쌓아 강한 추가 공격을 반복한다.", "사냥감이 받는 추가 공격 피해를 높여 파티 전체와 시너지를 낸다."], weaknesses: ["사냥감이 빨리 처치되면 이탈 상태와 남은 충전이 종료된다.", "다수전에서 표식하지 않은 적에게 기여하기 어렵다.", "사냥감 지정에 스킬 포인트가 필요하고 재지정 시 흐름이 끊긴다."], teamPrinciple: "한 목표를 자주 공격하는 추가 공격 딜러와 조합하고, 가장 오래 살아남을 정예를 사냥감으로 지정한다.", gameplay: { overview: "스킬로 핵심 적을 사냥감으로 만들고 이탈한 뒤 아군의 공격으로 충전을 쌓는다. 사냥감이 쓰러지기 전 필살기와 추가 공격을 모두 회수한다.", rotation: ["전투 스킬로 정예를 사냥감으로 지정한다.", "아군이 같은 목표를 연속 공격한다.", "충전 조건마다 추가 공격을 발동한다.", "필살기를 버프 구간에 사용하고 사냥감 교체를 준비한다."], tips: ["잡몹에 사냥감을 사용하면 재지정 비용이 커진다.", "속도보다 공격력·치명타를 우선하는 세팅도 파티에 따라 가능하다.", "아군 공격 횟수가 많은 조합일수록 이탈 시간 대비 피해가 커진다."] } }
  };
