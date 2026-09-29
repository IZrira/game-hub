import { CharacterGuide } from './index';

export const 망귀인Guide: CharacterGuide = {
    characterName: "망귀인",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["곤충 재앙을 잠재우는 철기군"],
        bestOrnaments: ["겁화 연등의 연마궁"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "격파 특수효과"
        },
        subStats: ["속도", "격파 특수효과", "공격력"],
        targetStats: [
          { label: "속도", value: "145 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["가상공간을 누비는 메신저"],
        bestOrnaments: ["바다에 잠긴 루샤카"],
        mainStats: {
          body: "공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "격파 특수효과"
        },
        subStats: ["속도", "격파 특수효과", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "220% 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "가상공간을 누비는 메신저"],
    bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "공격력",
      boots: "속도",
      sphere: "공격력",
      rope: "격파 특수효과"
    },
    subStats: ["속도", "격파 특수효과", "공격력"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: [
      { name: "먼 길 끝의 귀로", note: "1순위" },
      { name: "시간의 기억에 대한 재구성", note: "2순위" },
      { name: "사냥감의 시선", note: "3순위" }
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [],
    analysis: {
      status: "published",
      summary: "여우의 기도로 약점이 없는 적도 깎게 만들고 시조의 불빛으로 두 번째 격파를 열어 격파 딜러의 유효 공격 구간을 늘리는 공허 서포터다.",
      role: "격파 서포터 / 방어력 감소",
      standard: "E0 / S0, 격파 특수효과 200% 이상",
      reviewedAt: "2026-09-29",
      reviewer: "RIRA 편집팀",
      strengths: ["여우의 기도 대상이 약점을 무시하고 강인성을 감소시키며 공격할 때 적 방어력도 낮춘다.", "적에게 추가 강인성인 시조의 불빛을 부여해 한 번 더 격파 피해를 발생시킨다.", "약점 격파 상태의 적을 공격하면 강인성 감소량을 슈퍼 격파 피해로 전환한다."],
      weaknesses: ["여우의 기도는 가장 최근 대상 한 명에게만 적용되어 다중 격파 딜러 조합에서는 지원이 분산되지 않는다.", "격파 특수효과 220% 행적 조건과 높은 속도를 동시에 맞추려면 유물 부옵션 요구량이 높다.", "필살기는 약점 무시 강인성 감소가 장점이지만 직접 피해 비중은 낮아 사용 타이밍이 격파 구간에 묶인다."],
      teamPrinciple: "실제 강인성 감소량이 큰 격파 메인 딜러 한 명에게 여우의 기도를 고정하고, 약점 격파 지연과 슈퍼 격파를 함께 활용할 동료를 배치한다.",
      gameplay: {
        overview: "첫 전투 스킬로 주력 딜러에게 여우의 기도를 부여하고 강화 일반 공격으로 포인트를 회수한다. 시조의 불빛까지 모두 소진할 수 있도록 필살기와 딜러의 강인성 공격을 같은 구간에 배치한다.",
        rotation: ["비술로 행동 게이지 증가와 방어력 감소를 확보한다.", "전투 스킬로 메인 격파 딜러에게 여우의 기도를 부여한다.", "강화 일반 공격으로 포인트를 회복하며 방어력 감소 지속 시간을 유지한다.", "필살기로 약점을 무시해 강인성을 깎고 시조의 불빛 격파까지 연결한다."],
        tips: ["기본 세팅은 속도 145와 격파 200%를 먼저 맞추고 220% 도달 가능 여부를 확인한다.", "160 고속 세팅은 파티 행동 수가 중요한 경우에만 선택하며 격파 수치 손실을 비교한다.", "기도 대상이 바뀌면 이전 딜러의 약점 무시 효과가 사라지므로 자동 전투 대상을 점검한다."]
      }
    }
  };
