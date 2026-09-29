import { CharacterGuide } from './index';

export const 부트힐Guide: CharacterGuide = {
    characterName: "부트힐",
    lastUpdated: "2026-03-16",
    patchVersion: "2.2",
    bestRelics: ["곤충 재앙을 잠재우는 철기군", "유성을 쫓는 괴도"],
    bestOrnaments: ["도적국 탈리아", "겁화 연등의 연마궁"],
    mainStats: {
      body: "치명타 확률",
      boots: "속도",
      sphere: "물리 피해",
      rope: "격파 특수효과"
    },
    subStats: ["격파 특수효과", "속도", "공격력"],
    targetStats: [
      { label: "격파 특수효과", value: "250% 이상" },
      { label: "속도", value: "145 이상" }
    ],
    bestLightCones: ["두 번째 생명을 향해", "별바다 순항", "논검", "침묵만이"],
    skillPriority: ["특성", "전투 스킬", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E2 / E6",
    eidolonEfficiency: [], analysis: { status:"published", summary:"결투 대상을 격파해 포켓 어드밴티지를 쌓고 물리 격파 피해를 폭발시키는 단일 수렵 딜러다.", role:"단일 격파 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["약점 부여와 높은 격파 피해를 자체 보유한다.","격파 특수효과가 화력에 직접 연결된다."], weaknesses:["초반 포켓 어드밴티지 예열이 필요하다.","약점 잠금 적에게 취약하다."], teamPrinciple:"격파 효율·행동 지연 지원과 함께 결투 대상을 빠르게 격파한다.", gameplay:{overview:"잡몹으로 스택을 만든 뒤 정예에 결투와 필살기를 집중한다.",tips:["격파 가능한 적부터 결투한다.","속도와 격파 특수효과를 우선한다."]}}
  };
