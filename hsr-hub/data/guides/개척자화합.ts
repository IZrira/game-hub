import { CharacterGuide } from './index';

export const 개척자화합Guide: CharacterGuide = {
    characterName: "개척자 (화합)",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    variants: [
      {
        name: "기본 세팅",
        bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저"],
        bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", "바다에 잠긴 루샤카"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "145 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      },
      {
        name: "고속 세팅",
        bestRelics: [{ name: "밤낮의 경계를 나는 매", note: "1순위" }, "꿈을 조작하는 시계공"],
        bestOrnaments: [{ name: "생명의 바커 공", note: "1순위" }, "도적국 탈리아", "겁화 연등의 연마궁"],
        mainStats: {
          body: "HP",
          boots: "속도",
          sphere: "HP",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
        targetStats: [
          { label: "속도", value: "160 이상" },
          { label: "격파 특수효과", value: "200% 이상" }
        ]
      }
    ],
    bestRelics: ["꿈을 조작하는 시계공", "유성을 쫓는 괴도", "가상공간을 누비는 메신저", { name: "밤낮의 경계를 나는 매", note: "고속 세팅 시 1순위" }],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁", { name: "생명의 바커 공", note: "고속 세팅 시 1순위" }, "바다에 잠긴 루샤카"],
    mainStats: {
      body: "HP",
      boots: "속도",
      sphere: "HP",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "효과 저항", "HP"],
    targetStats: [
      { label: "속도", value: "145 이상" },
      { label: "격파 특수효과", value: "200% 이상" }
    ],
    bestLightCones: [
      { name: "댄스! 댄스! 댄스!", note: "1순위" },
      { name: "거울 속 지난날의 나", note: "2순위" },
      "바람을 쫓을 때, 꽃은 잊지 않는다",
      "기억 속 모습"
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "계산 중..." }
    ]
    ,analysis: { status:"published", summary:"허수 약점 격파 후 슈퍼 격파 피해를 열어 주는 격파 파티의 핵심 지원 캐릭터다.", role:"슈퍼 격파 서포터", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["파티 전체가 강인성이 0인 적에게 슈퍼 격파를 가한다.","핵심 메커니즘이 명확해 파티 역할을 구분하기 쉽다."], weaknesses:["적을 격파하지 못하면 핵심 지원이 작동하지 않는다.","행동 순서와 자원 관리가 어긋나면 효율이 감소한다."], teamPrinciple:"격파 효율 지원과 조합해 적 강인성을 먼저 제거한다.", gameplay:{overview:"격파 효율 지원과 조합해 적 강인성을 먼저 제거한다.", rotation:["핵심 버프·표식 또는 자원을 먼저 준비한다.","주요 공격 구간에 필살기와 강화 행동을 집중한다."], tips:["핵심 상태의 지속 시간과 남은 자원을 매 턴 확인한다.","파티 버프가 적용된 구간에 가장 강한 행동을 배치한다."]}}
  };
