import { CharacterGuide } from './index';

export const 웰트Guide: CharacterGuide = {
    characterName: "웰트",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [{ name: "사수에 잠수한 선구자", note: "1순위" }, { name: "황무지의 도적, 황야인", note: "2순위" }],
    bestOrnaments: [{ name: "이즈모 현세와 타카마 신국", note: "1순위" }, "창공 전선 그라모스", "뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "허수 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "공격력", value: "2500 이상" },
      { label: "효과 명중", value: "40% 이상" }
    ],
    bestLightCones: [
      { name: "바람에 흩날리는 거짓말", note: "1순위" },
      { name: "흘러가는 강가를 따라", note: "2순위" },
      "계속 내리는 비",
      "밤 인사와 잠든 얼굴",
      "땀방울처럼 빛나는 결심"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2",
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"감속과 속박으로 적 행동을 늦추면서 다단 허수 피해를 가하는 공허 캐릭터다.", role:"행동 지연 디버퍼", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["필살기 속박으로 적 행동을 즉시 지연하고 받는 피해를 높인다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["행동 지연이 피격·반격 파티와 충돌할 수 있다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"적 행동을 늦춰 생존 부담을 줄이고 디버프 대상에게 추가 피해를 집중한다.", gameplay:{overview:"적 행동을 늦춰 생존 부담을 줄이고 디버프 대상에게 추가 피해를 집중한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
