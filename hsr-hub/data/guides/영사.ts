import { CharacterGuide } from './index';

export const 영사Guide: CharacterGuide = {
    characterName: "영사",
    lastUpdated: "2026-09-29",
    patchVersion: "3.6",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["곤충 재앙을 잠재우는 철기군", "태양과 번개의 여전사"],
        bestOrnaments: ["겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "치유량 증가 or 공격력",
          boots: "속도",
          sphere: "공격력",
          rope: "에너지 충전 효율 or 격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "139 이상" },
          { label: "격파 특수효과", value: "130% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: ["밤낮의 경계를 나는 매"],
        bestOrnaments: ["생명의 바커 공"],
        mainStats: {
          body: "치유량 증가",
          boots: "속도 or HP",
          sphere: "HP",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "HP", "효과 저항", "방어력"],
        targetStats: [
          { label: "속도", value: "160 이상" }
        ]
      }
    ],
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "밤낮의 경계를 나는 매", "태양과 번개의 여전사"],
    bestOrnaments: ["겁화 연등의 연마궁", "생명의 바커 공", "바다에 잠긴 루샤카"],
    mainStats: {
      body: "치유량 증가 or 공격력",
      boots: "속도",
      sphere: "공격력 or HP",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "139 이상" },
      { label: "격파 특수효과", value: "130% 이상" }
    ],
    bestLightCones: ["오직 향만이 변함없이", { name: "등가교환", note: "전부 에너지 충전 필요 시" }, "수술 후의 대화", "무엇이 진실인가", { name: "관의 울림", note: "고속 세팅 1순위" }],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: [],
    analysis: { status: "published", summary: "부원의 광역 추가 공격으로 회복·해제·강인성 감소를 동시에 수행하는 화염 풍요 캐릭터다. 필살기의 감취로 적이 받는 격파 피해를 높여 격파 파티의 생존과 화력을 함께 책임진다.", role: "격파 힐러 / 광역 추가 공격", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["부원이 광역 공격과 회복, 디버프 해제를 한 행동에 수행한다.", "필살기로 받는 격파 피해를 증가시키고 부원을 즉시 행동시킨다.", "아군 체력이 낮아지면 부원이 행동 횟수 소모 없이 긴급 회복한다."], weaknesses: ["부원의 남은 행동 횟수를 갱신하지 않으면 소환물이 사라진다.", "공격력·격파 특수효과·속도와 치유 능력치를 함께 요구한다.", "단일 대상에서는 광역 추가 공격의 강인성 감소 효율이 낮아진다."], teamPrinciple: "격파 딜러와 편성해 감취가 유지되는 동안 약점 격파와 슈퍼 격파를 집중하고, 스킬로 부원 행동 횟수를 관리한다.", gameplay: { overview: "스킬로 부원을 소환·연장하고 필살기로 감취와 부원 즉시 행동을 만든다. 위험 구간에는 부원의 긴급 회복 재사용 대기와 해제 가능 여부를 확인한다.", rotation: ["비술 또는 스킬로 부원을 준비한다.", "부원 행동 횟수가 줄면 스킬로 3회를 보충한다.", "격파 직전에 필살기로 감취를 적용한다.", "부원 추가 공격과 딜러의 격파 공격을 집중한다."], tips: ["감취 2턴 안에 핵심 격파 피해를 몰아 넣는다.", "일반 공격의 추가 에너지 회복으로 스킬 포인트를 절약할 수 있다.", "긴급 회복은 2턴 재사용 대기이므로 연속 큰 피해에 주의한다."] } }
  };
