import { CharacterGuide } from './index';

export const 소상Guide: CharacterGuide = {
    characterName: "소상",
    lastUpdated: "2026-03-16",
    patchVersion: "1.0",
    bestRelics: ["스트리트 격투왕", "유성을 쫓는 괴도"],
    bestOrnaments: ["회전을 멈춘 살소토", "도적국 탈리아"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "물리 피해",
      rope: "공격력 or 격파 특수효과"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도", "격파 특수효과"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "속도", value: "134" }
    ],
    bestLightCones: ["야경 속에서", "별바다 순항", "논검", "침묵만이"],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [], analysis:{status:"published",summary:"격파된 적에게 검세 추가 피해와 행동 가속을 얻는 물리 수렵 딜러다.",role:"격파 연계 단일 딜러",standard:"E6 / S0",reviewedAt:"2026-09-29",reviewer:"RIRA 편집팀",strengths:["격파 대상에게 높은 단일 화력을 낸다."],weaknesses:["비격파 상태에서는 성능이 낮다."],teamPrinciple:"강인성 감소 지원과 함께 운용한다.",gameplay:{overview:"적을 격파한 뒤 필살기와 스킬을 연속 사용한다.",tips:["검세 확률을 격파 상태에서 활용한다."]}}
  };
