import { CharacterGuide } from './index';

export const 트리비Guide: CharacterGuide = {
    characterName: "트리비",
    lastUpdated: "2026-09-29",
    patchVersion: "3.1",
    variants: [
      {
        name: "저속 세팅",
        bestRelics: ["망국을 애도하는 시인"],
        bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", "생명의 바커 공"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "95 미만" },
          { label: "HP", value: "6000 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "망국을 애도하는 시인"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "고요한 습골지", "바다에 잠긴 루샤카"],
        bestLightCones: [{ name: "댄스! 댄스! 댄스!", note: "1순위" }, "시간이 한 송이 꽃이라면", "맞물린 톱니"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률 or HP",
          boots: "속도",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["치명타 피해", "치명타 확률", "HP"],
        targetStats: [
          { label: "속도", value: "141 이상" },
          { label: "치명타 확률", value: "60" },
          { label: "치명타 피해", value: "120" }
        ]
      }
    ],
    bestRelics: ["망국을 애도하는 시인", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["고요한 습골지", "바다에 잠긴 루샤카", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }],
    mainStats: {
      body: "치명타 피해 or 치명타 확률 or HP",
      boots: "HP or 속도",
      sphere: "HP",
      rope: "에너지 충전 효율"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "속도", value: "95 미만" },
      { label: "속도", value: "141 이상" },
      { label: "HP", value: "6000 이상" }
    ],
    bestLightCones: [
      { name: "시간이 한 송이 꽃이라면", note: "1순위" },
      { name: "댄스! 댄스! 댄스!", note: "2순위 (고속 세팅 시 1순위)" },
      { name: "맞물린 톱니", note: "3순위" }
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonVariants: [
      {
        name: "1개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "322%", efficiency3: "231%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "360%", efficiency3: "259%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "398%", efficiency3: "286%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "409%", efficiency3: "294%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "529%", efficiency3: "380%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "3개체 (광추별 효율)",
        labels: ["시간이 한 송이 꽃이라면", "댄스! 댄스! 댄스!"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "139%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "173%", efficiency3: "124%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "241%", efficiency3: "173%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "269%", efficiency3: "193%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "297%", efficiency3: "214%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "306%", efficiency3: "220%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "425%", efficiency3: "305%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: [],
    analysis: {
      status: "published", summary: "전투 스킬의 속성 저항 관통과 필살기 영역의 받는 피해 증가를 제공하는 HP 기반 범용 화합 서포터다. 다른 아군의 필살기마다 추가 공격을 발동해 다수전에서 지원과 피해를 함께 누적한다.",
      role: "범용 피해 서포터 / 추가 공격 서브 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀",
      strengths: ["전투 스킬 하나로 모든 아군에게 모든 속성 저항 관통을 제공한다.", "필살기 영역에서 적이 받는 피해를 높이고 아군 타격마다 추가 피해를 발생시킨다.", "각 아군의 필살기에 반응하는 광역 추가 공격으로 적이 많을수록 높은 기여를 한다."],
      weaknesses: ["필살기 영역이 꺼지면 받는 피해 증가와 추가 피해가 동시에 사라진다.", "저속과 고속 세팅의 장비·행동 순서가 크게 달라 중간 속도는 목적이 불분명해질 수 있다.", "아군 필살기 사용 횟수가 적거나 단일 대상 전투에서는 개인 피해 기여가 낮아진다."],
      teamPrinciple: "필살기를 자주 사용하는 딜러 또는 광역 공격 횟수가 많은 파티와 조합하고, 저속 세팅은 긴 버프 지속을, 고속 세팅은 빠른 필살기 회전과 행동 당기기를 목표로 한다.",
      gameplay: { overview: "전투 스킬의 신성한 계시를 끊기지 않게 유지하고, 아군이 필살기를 연속 사용할 직전에 트리비 필살기로 영역을 연다. 각 캐릭터별 추가 공격은 트리비 필살기 후 초기화되므로 순서를 고정한다.", rotation: ["전투 스킬로 파티 저항 관통을 활성화한다.", "딜러들의 필살기와 에너지가 준비될 때까지 포인트를 관리한다.", "트리비 필살기로 영역을 먼저 전개한다.", "다른 아군의 필살기를 한 명씩 사용해 각각의 추가 공격을 회수한다."], tips: ["저속 95 미만과 고속 141 이상 중 한 방향을 명확히 선택한다.", "트리비 필살기를 아군 필살기보다 먼저 사용해야 추가 공격 횟수를 새로 확보한다.", "영역 지속 턴은 트리비 기준이므로 행동 당기기가 지속 시간을 과도하게 소모하지 않는지 본다."] }
    }
  };
