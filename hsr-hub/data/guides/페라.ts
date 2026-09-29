import { CharacterGuide } from './index';

export const 페라Guide: CharacterGuide = {
    characterName: "페라",
    lastUpdated: "2026-03-16",
    patchVersion: "3.3",
    bestRelics: ["밤낮의 경계를 나는 매", "가상공간을 누비는 메신저"],
    bestOrnaments: ["부러진 용골", "불로인의 선주", "바다에 잠긴 루샤카", "생명의 바커 공"],
    mainStats: {
      body: "HP or 효과 명중 or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율"
    },
    subStats: ["효과 명중", "속도", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "134 이상" },
      { label: "효과 명중", value: "67%" }
    ],
    bestLightCones: ["바람에 흩날리는 거짓말", "땀방울처럼 빛나는 결심", "초보자 임무 시작 전"],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonEfficiency: []
    ,analysis: { status:"published", summary:"스킬로 적 버프를 해제하고 필살기로 적 전체 방어력을 감소시키는 얼음 공허 서포터다.", role:"광역 방어 감소 디버퍼", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["낮은 비용으로 광역 방어 감소를 높은 가동률로 유지한다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["직접 피해와 생존 지원은 낮다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"딜러 공격 전에 필살기를 사용하고 필요한 적의 버프를 스킬로 제거한다.", gameplay:{overview:"딜러 공격 전에 필살기를 사용하고 필요한 적의 버프를 스킬로 제거한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
