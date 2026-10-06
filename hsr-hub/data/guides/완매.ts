import { CharacterGuide } from './index';

export const 완매Guide: CharacterGuide = {
    characterName: "완•매",
    lastUpdated: "2026-03-16",
    patchVersion: "1.6",
    bestRelics: ["가상공간을 누비는 메신저", "유성을 쫓는 괴도"],
    bestOrnaments: ["불로인의 선주", "부러진 용골", "바다에 잠긴 루샤카", "탈리아"],
    mainStats: {
      body: "HP or 방어력",
      boots: "속도",
      sphere: "HP or 방어력",
      rope: "에너지 충전 효율 or 격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "HP", "방어력"],
    targetStats: [
      { label: "격파 특수효과", value: "160% 이상" },
      { label: "격파 특수효과", value: "180% 이상" },
      { label: "속도", value: "134 이상" },
      { label: "속도", value: "145 이상" },
      { label: "속도", value: "160 이상" }
    ],
    bestLightCones: ["거울 속 지난날의 나", "기억 속 모습", "댄스! 댄스! 댄스!", "아직 전투는 끝나지 않았다"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"격파 효율과 모든 속성 저항 관통을 제공하고 약점 격파 상태를 연장하는 범용 화합 서포터다.", role:"격파·범용 서포터", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["파티 전체 피해와 격파 효율을 동시에 높인다.","잔매로 적의 회복을 지연한다."], weaknesses:["스킬과 필살기 지속 턴 관리가 필요하다.","격파가 불가능한 구간에서는 일부 가치가 감소한다."], teamPrinciple:"격파 딜러뿐 아니라 이중 딜러 파티에서도 전원 버프를 활용한다.", gameplay:{overview:"스킬을 유지하고 핵심 격파 전에 필살기를 전개한다.",tips:["전투 스킬 3턴을 끊지 않는다.","필살기를 격파 직전에 사용한다."]}}
  };
