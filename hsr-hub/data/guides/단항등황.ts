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
    ]
  };
