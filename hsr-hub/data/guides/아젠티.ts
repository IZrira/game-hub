import { CharacterGuide } from './index';

export const 아젠티Guide: CharacterGuide = {
    characterName: "아젠티",
    lastUpdated: "2026-03-16",
    patchVersion: "1.5",
    bestRelics: ["스트리트 격투왕"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "물리 피해",
      rope: "공격력 or 에너지 충전 효율"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["눈에 담긴 순간", "은하철도의 밤", "오늘도 평화로운 하루", "천재들의 휴식"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E1",
    eidolonEfficiency: [], analysis: { status:"published", summary:"적 수에 따라 에너지와 치명타를 쌓고 180 에너지 강화 필살기로 광역 피해를 내는 물리 지식 딜러다.", role:"필살기 광역 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["다수전에서 빠른 에너지 회복과 강한 광역 피해를 낸다.","필살기를 90 또는 180 에너지로 선택할 수 있다."], weaknesses:["단일전에서 에너지 수급이 느리다.","강화 필살기 의존도가 높다."], teamPrinciple:"에너지 지원과 행동 당기기로 180 필살기 회전을 줄인다.", gameplay:{overview:"잡몹 구간은 90, 정예 폭딜은 180 필살기를 사용한다.",tips:["상황에 따라 90 필살기로 웨이브를 정리한다.","강화 필살기 전 버프를 모두 준비한다."]}}
  };
