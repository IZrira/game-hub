import { CharacterGuide } from './index';

export const 카프카Guide: CharacterGuide = {
    characterName: "카프카",
    lastUpdated: "2026-03-15",
    patchVersion: "3.5",
    variants: [
      {
        name: "기본",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["효과 명중", "속도", "공격력"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      },
      {
        name: "4돌파 이상",
        bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
        bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
        mainStats: {
          body: "공격력 or 효과 명중",
          boots: "속도",
          sphere: "번개 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["공격력", "속도", "효과 명중"],
        targetStats: [
          { label: "속도", value: "167 이상" },
          { label: "효과 명중", value: "75%" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매", "깊은 감옥에 수감된 죄수"],
    bestOrnaments: ["바다에 잠긴 루샤카", "즐거움에 취한 바다의 일각", "창공 전선 그라모스", "범은하 상사"],
    mainStats: {
      body: "공격력 or 효과 명중",
      boots: "속도",
      sphere: "번개 피해 or 공격력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "공격력"],
    targetStats: [
      { label: "속도", value: "160 이상" },
      { label: "효과 명중", value: "75%" }
    ],
    bestLightCones: ["초보자 임무 시작 전", "필요한 건 기다림뿐", "바람에 흩날리는 거짓말", "그 무수한 봄날", "땀방울처럼 빛나는 결심"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"적에게 걸린 지속 피해를 즉시 발동해 턴을 기다리지 않고 피해를 정산하는 번개 공허 딜러다.", role:"지속 피해 기폭제", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["여러 종류의 지속 피해를 스킬과 필살기로 즉시 발동한다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["강한 지속 피해 동료가 없으면 개인 화력 한계가 낮다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"지속 피해를 먼저 부여한 뒤 카프카 스킬과 필살기로 반복 정산한다.", gameplay:{overview:"지속 피해를 먼저 부여한 뒤 카프카 스킬과 필살기로 반복 정산한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
