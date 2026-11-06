import { CharacterGuide } from './index';

export const 제이드Guide: CharacterGuide = {
    characterName: "제이드",
    lastUpdated: "2026-09-29",
    patchVersion: "3.0",
    bestRelics: ["망국을 애도하는 시인", "별처럼 빛나는 천재", "재와 뼈마저 불사르는 대공", "바람과 구름을 가르는 용맹함", "지식의 바다에 빠진 학자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "주인 없는 황폐한 별 츠가냐", "질주하는 늑대의 도람 왕조", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률",
      boots: "공격력",
      sphere: "양자 피해 or 공격력",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "3500" }
    ],
    bestLightCones: ["값을 매길 수 없는 건 희망뿐", "동트기 전", "오늘도 평화로운 하루", "은하철도의 밤", "천재들의 휴식"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "147.31%", efficiency3: "107.31%", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "163.42%", efficiency3: "119.04%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "176.93%", efficiency3: "129.88%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "190.63%", efficiency3: "139.94%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "198.60%", efficiency3: "144.66%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "271.89%", efficiency3: "199.00%", description: "성흔 효과" }
    ],
    analysis: { status: "published", summary: "아군 한 명을 채무자로 지정해 속도와 추가 양자 피해를 부여하고, 적중한 적 수만큼 충전을 얻어 광역 추가 공격을 반복하는 지식 딜러다. 다수 대상을 자주 공격하는 동료가 핵심 엔진이다.", role: "광역 추가 공격 서브 딜러", standard: "E0 / S0", reviewedAt: "2026-11-06", reviewer: "RIRA 편집팀", strengths: ["채무자의 광역 공격으로 충전을 빠르게 쌓아 추가 공격을 반복한다.", "채무자에게 속도를 제공해 파티의 광역 공격 횟수도 늘린다.", "추가 공격을 반복하며 전당품 치명타 피해를 누적해 장기전에 강하다."], weaknesses: ["적 수가 적으면 충전 획득과 추가 공격 빈도가 크게 감소한다.", "채무자가 공격할 때 HP를 소모해 생존 지원이 필요하다.", "단일 보스전에서는 1돌파 전 성능이 다수전보다 크게 낮다."], teamPrinciple: "한 행동으로 여러 적을 때리는 캐릭터를 채무자로 지정하고, 광역 공격이 반복되는 허구 이야기형 전투에서 충전 8을 빠르게 순환시킨다.",
      gear: [
        {
          "kind": "lightcone",
          "name": "값을 매길 수 없는 건 희망뿐",
          "note": "1순위",
          "reason": "치명타 확률 16%를 주고, 치명타 피해가 120%를 넘는 20%마다 추가 공격 피해가 12%씩 오른다(최대 4스택). 일반 공격 뒤와 전투 시작 시 필살기·추가 공격이 방어력을 20% 무시한다."
        },
        {
          "kind": "lightcone",
          "name": "동트기 전",
          "note": "2순위",
          "reason": "치명타 피해 36%를 주고, 전투 스킬·필살기 뒤 [몽신]으로 다음 추가 공격 피해가 48% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "오늘도 평화로운 하루",
          "note": "3순위",
          "reason": "에너지 최대치 1pt당 가하는 피해가 0.2% 오른다(최대 160pt). 조건 없이 상시 적용된다."
        },
        {
          "kind": "lightcone",
          "name": "은하철도의 밤",
          "note": "4순위",
          "reason": "필드의 적 1기당 공격력이 9%씩 최대 45% 오른다. 다수전에서 충전을 쌓는 제이드와 쓰는 상황이 겹친다."
        },
        {
          "kind": "lightcone",
          "name": "천재들의 휴식",
          "note": "5순위",
          "reason": "공격력 16%를 주고, 적을 처치하면 3턴간 치명타 피해가 24% 오른다."
        },
        {
          "kind": "relic",
          "name": "망국을 애도하는 시인",
          "note": "1순위",
          "reason": "양자 속성 피해 10%를 준다. 속도가 8% 줄지만 전투 진입 전 속도가 110/95 미만이면 치명타 확률이 20%/32% 오른다. 제이드의 추가 공격은 충전으로 발동해 자신의 턴 수에 덜 의존한다."
        },
        {
          "kind": "relic",
          "name": "별처럼 빛나는 천재",
          "note": "2순위",
          "reason": "양자 속성 피해 10%와 방어력 10% 무시를 주고, 적이 양자 약점이면 10%를 더 무시한다."
        },
        {
          "kind": "relic",
          "name": "재와 뼈마저 불사르는 대공",
          "note": "3순위",
          "reason": "추가 공격 피해 20%를 주고, 추가 공격의 피해 횟수마다 공격력이 쌓인다."
        },
        {
          "kind": "relic",
          "name": "바람과 구름을 가르는 용맹함",
          "note": "4순위",
          "reason": "공격력 12%와 치명타 확률 6%를 주고, 추가 공격 뒤 1턴간 필살기 피해가 36% 오른다."
        },
        {
          "kind": "relic",
          "name": "지식의 바다에 빠진 학자",
          "note": "5순위",
          "reason": "치명타 확률 8%와 전투 스킬·필살기 피해 20%를 준다."
        },
        {
          "kind": "ornament",
          "name": "이즈모 현세와 타카마 신국",
          "note": "1순위",
          "reason": "공격력 12%를 주고, 운명의 길이 같은 동료(지식)가 있으면 치명타 확률이 12% 오른다. 지식 2인 파티에서 조건을 채운다."
        },
        {
          "kind": "ornament",
          "name": "주인 없는 황폐한 별 츠가냐",
          "note": "2순위",
          "reason": "치명타 확률 4%를 주고, 적이 처치될 때마다 치명타 피해가 4%씩 최대 10스택 오른다. 적이 많이 쓰러지는 다수전용이다."
        },
        {
          "kind": "ornament",
          "name": "질주하는 늑대의 도람 왕조",
          "note": "3순위",
          "reason": "아군이 추가 공격을 할 때마다 추가 공격 피해가 쌓이고, 5스택이면 치명타 피해가 25% 더 오른다."
        },
        {
          "kind": "ornament",
          "name": "회전을 멈춘 살소토",
          "note": "4순위",
          "reason": "치명타 확률 50% 이상이면 필살기·추가 공격 피해가 15% 오른다."
        }
      ], gameplay: { overview: "스킬로 광역 딜러를 채무자로 지정한 뒤 채무자의 행동과 제이드 공격으로 충전을 모은다. 8 충전 추가 공격과 전당품 중첩이 누적된 뒤 필살기를 사용해 강화 추가 공격을 준비한다.", rotation: ["가장 자주 광역 공격하는 아군을 채무자로 지정한다.", "채무자의 속도 증가를 활용해 다수 적을 반복 타격한다.", "충전 8마다 자동 추가 공격을 회수한다.", "필살기로 다음 추가 공격을 강화하고 중첩을 이어간다."], tips: ["채무자는 적중한 적 수가 많은 캐릭터가 최우선이다.", "채무자의 HP 소모를 감당할 광역 힐러를 배치한다.", "단일전에서는 E1 여부와 파티의 추가 공격 횟수를 먼저 고려한다."] } }
  };
