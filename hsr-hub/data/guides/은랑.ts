import { CharacterGuide } from './index';

export const 은랑Guide: CharacterGuide = {
    characterName: "은랑",
    lastUpdated: "2026-03-16",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["밤낮의 경계를 나는 매", "고행의 길에 다시 오른 사제"],
        bestOrnaments: ["바다에 잠긴 루샤카", "생명의 바커 공"],
        mainStats: {
          body: "효과 명중 or 치명타 확률",
          boots: "속도",
          sphere: "양자 피해 or 공격력",
          rope: "에너지 충전 효율"
        },
        subStats: ["속도", "효과 명중", "HP", "방어력"],
        targetStats: [
          { label: "속도", value: "167 이상" },
          { label: "효과 명중", value: "67%" }
        ]
      },
      {
        name: "2돌파 서브 딜러 세팅",
        bestRelics: ["별처럼 빛나는 천재"],
        bestOrnaments: ["창공 전선 그라모스"],
        mainStats: {
          body: "치명타 확률 or 효과 명중",
          boots: "속도",
          sphere: "양자 피해 or 공격력",
          rope: "에너지 충전 효율 or 공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "100%" },
          { label: "속도", value: "134 이상" },
          { label: "효과 명중", value: "67%" }
        ]
      }
    ],
    bestRelics: ["밤낮의 경계를 나는 매"],
    bestOrnaments: ["바다에 잠긴 루샤카"],
    mainStats: {
      body: "효과 명중",
      boots: "속도",
      sphere: "양자 피해",
      rope: "에너지 충전 효율"
    },
    subStats: ["속도", "효과 명중", "HP", "방어력"],
    targetStats: [
      { label: "속도", value: "167 이상" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: [
      "바람에 흩날리는 거짓말",
      "땀방울처럼 빛나는 결심",
      "휴일의 목욕탕 대모험",
      { name: "계속 내리는 비", note: "2돌파 서브 딜러 세팅 시" },
      "초보자 임무 시작 전"
    ],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"적에게 아군 속성 약점을 부여하고 방어력·공격력·속도를 감소시키는 양자 디버퍼다.", role:"약점 부여 디버퍼", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["파티 속성에 맞춘 약점을 만들어 비약점 전투를 가능하게 한다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["다속성 파티에서는 원하는 약점이 확정되지 않는다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"파티 속성을 최소화해 약점 부여 확률을 통제한다.", gameplay:{overview:"파티 속성을 최소화해 약점 부여 확률을 통제한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
