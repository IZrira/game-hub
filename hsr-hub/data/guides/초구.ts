import { CharacterGuide } from './index';

export const 초구Guide: CharacterGuide = {
    characterName: "초구",
    lastUpdated: "2026-09-29",
    patchVersion: "3.3",
    variants: [
      {
        name: "디버퍼 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저"],
        bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "HP or 화염 피해",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "143" },
          { label: "속도", value: "167" },
          { label: "효과 명중", value: "178%" }
        ]
      },
      {
        name: "지속 피해 세팅",
        bestRelics: ["깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["즐거움에 취한 바다의 일각"],
        mainStats: {
          body: "효과 명중",
          boots: "속도",
          sphere: "화염 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "공격력"],
        targetStats: [
          { label: "속도", value: "143" },
          { label: "속도", value: "167" },
          { label: "효과 명중", value: "178%" },
          { label: "참고", value: "초구 2돌 이상 추천" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["생명의 바커 공", "바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "HP or 화염 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 명중"],
    targetStats: [
      { label: "속도", value: "143" },
      { label: "속도", value: "167" },
      { label: "효과 명중", value: "178%" }
    ],
    bestLightCones: ["그 무수한 봄날", "바람에 흩날리는 거짓말", "사냥감의 시선"],
    skillPriority: ["특성", "필살기", "전투 스킬", "일반 공격"],
    eidolonEfficiency: [],
    analysis: { status: "published", summary: "적에게 아궁이의 불꽃을 중첩해 받는 피해와 필살기 피해를 높이는 화염 공허 서포터다. 필살기 결계로 새로 등장하는 적에게도 중첩을 확산해 웨이브가 바뀌어도 디버프를 빠르게 구축한다.", role: "받는 피해 증가 디버퍼 / 지속 피해 서브 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["아궁이의 불꽃으로 범용 받는 피해 증가를 누적한다.", "결계가 적 행동마다 화염 지속 피해를 부여해 필살기 중심 파티와 지속 피해 파티에 모두 기여한다.", "웨이브 진입 적에게 중첩을 맞춰 디버프 예열을 줄인다."], weaknesses: ["높은 효과 명중 목표 때문에 속도와 생존 능력치를 챙기기 어렵다.", "결계가 꺼지면 새 적에 대한 중첩 확산과 필살기 피해 지원이 중단된다.", "지속 피해 딜러로 쓰려면 2돌파 의존도가 높다."], teamPrinciple: "필살기 피해 비중이 높은 딜러 또는 지속 피해 딜러와 편성하고, 결계 지속 중 적의 주요 행동과 파티 폭딜을 모두 포함시킨다.", gameplay: { overview: "스킬로 아궁이의 불꽃을 쌓고 에너지가 차면 필살기로 적 전체 중첩을 맞춘다. 이후 빠른 속도로 일반 공격과 스킬을 섞어 결계 공백을 최소화한다.", rotation: ["전투 스킬로 핵심 적에게 중첩을 시작한다.", "필살기로 적 전체 중첩을 평준화하고 결계를 연다.", "딜러의 필살기를 결계 안에서 사용한다.", "에너지와 중첩 지속 시간을 확인하며 다음 결계를 준비한다."], tips: ["효과 명중 178% 목표는 광추와 행적 조건을 포함해 계산한다.", "필살기 딜러보다 먼저 결계를 설치한다.", "2돌 미만에서는 개인 지속 피해보다 디버프 유지에 집중한다."] } }
  };
