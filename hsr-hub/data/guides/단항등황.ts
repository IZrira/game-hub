import { CharacterGuide } from './index';

export const 단항등황Guide: CharacterGuide = {
    characterName: "단항•등황",
    lastUpdated: "2026-03-13",
    patchVersion: "3.6",
    variants: [
      {
        name: "기본",
        bestRelics: [
          { name: "별빛에 숨은 은둔자", note: "1순위" },
          { name: "고행의 길에 다시 오른 사제", note: "2순위" }
        ],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도 or 공격력",
          sphere: "공격력",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["속도", "공격력"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "참고", value: "파이논 파티 신발/매듭 공격력 권장" }
        ]
      },
      {
        name: "지속 피해 세팅",
        bestRelics: [
          { name: "별빛에 숨은 은둔자", note: "1순위" },
          { name: "고행의 길에 다시 오른 사제", note: "2순위" }
        ],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "공격력"],
        targetStats: [
          { label: "효과 명중", value: "75%" },
          { label: "속도", value: "134 이상" }
        ]
      }
    ],
    bestRelics: [
      { name: "별빛에 숨은 은둔자", note: "1순위" },
      { name: "고행의 길에 다시 오른 사제", note: "2순위" }
    ],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도 or 공격력",
      sphere: "공격력",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["속도", "공격력"],
    targetStats: [
      { label: "속도", value: "134 이상" }
    ],
    bestLightCones: [
      { name: "끝없는 산과 강을 거치더라도", note: "1순위" },
      { name: "언제나 여정이 평탄하기를", note: "2순위" },
      { name: "우주 시장 동향", note: "아케론 파티 사용 시" }
    ],
    skillPriority: ["일반 공격", "전투 스킬", "특성", "필살기"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 2, impact: "Medium", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" },
      { level: 6, impact: "High", efficiency1: "계산 중", efficiency3: "계산 중", description: "데이터 분석 진행 중" }
    ],
    analysis: {
      status: "published",
      summary: "공격력이 실드량과 전우의 공격력 버프로 동시에 환산되고, 용령이 실드 갱신·해제·추가 피해를 반복하는 공격형 보존 서포터다.",
      role: "공격력 기반 실드 서포터 / 전우 강화",
      standard: "E0 / S0, 속도 134 이상",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: ["누적 가능한 파티 실드를 전투 스킬과 필살기, 용령 행동으로 반복 제공한다.", "전우의 공격력을 자신의 공격력에 비례해 높이고 용령이 전우 속성의 추가 피해를 가한다.", "용령이 행동할 때 모든 아군의 디버프를 해제해 방어와 상태 이상 대응을 함께 수행한다."],
      weaknesses: ["전우를 바꾸면 기존 딜러와의 용령 연계가 끊기므로 자동 지정이나 잦은 대상 변경에 주의해야 한다.", "방어력이 아니라 공격력을 실드 계수로 사용해 생존 세팅과 공격 지원 사이의 균형이 필요하다.", "필살기 전에는 용령의 직접 피해 비중이 낮아 에너지 순환이 느리면 공격 기여가 줄어든다."],
      teamPrinciple: "공격력 효율이 높고 자주 공격해 단항•등황의 에너지와 용령 행동을 당길 수 있는 메인 딜러를 전우로 지정한다. 파이논 조합은 느린 공격력 세팅, 일반 조합은 속도 134 이상을 기준으로 한다.",
      gameplay: {
        overview: "비술 또는 첫 전투 스킬로 주력 딜러를 전우로 지정한다. 전우의 잦은 공격으로 용령 행동과 에너지를 앞당기고, 필살기로 실드가 충분히 남아 있을 때도 강화 용령 횟수를 확보한다.",
        rotation: ["전투 시작 전에 실제 메인 딜러가 전우를 보유하도록 캐릭터를 맞춘다.", "전투 스킬로 파티 실드와 전우 공격력 버프를 갱신한다.", "전우의 공격으로 에너지를 회복하고 용령 행동을 앞당긴다.", "필살기로 강화 용령과 추가 실드를 확보한 뒤 전우의 핵심 공격을 진행한다."],
        tips: ["실드는 최대 전투 스킬 실드량의 300%까지 중첩되므로 남은 실드가 있어도 갱신 가치가 있다.", "파이논 파티에서는 공격력 신발과 매듭으로 실드·버프량을 높이고 행동 순서를 따로 맞춘다.", "지속 피해 조합에서만 효과 명중 몸통과 75% 목표를 사용하고 범용 세팅에 섞지 않는다."]
      }
    }
  };
