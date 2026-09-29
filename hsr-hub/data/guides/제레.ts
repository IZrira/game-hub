import { CharacterGuide } from './index';

export const 제레Guide: CharacterGuide = {
    characterName: "제레",
    lastUpdated: "2026-03-16",
    patchVersion: "4.0",
    variants: [
      {
        name: "전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "공격력 or 속도 (2돌파 이상 시 공격력, 명함 속도 122 이상 시 공격력)",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "210%" },
          { label: "공격력", value: "3400" }
        ]
      },
      {
        name: "비 전용 광추 세팅",
        bestRelics: ["별처럼 빛나는 천재", "거친 파도를 헤치는 선장", "지식의 바다에 빠진 학자"],
        bestOrnaments: ["뭇별 경기장", "창공 전선 그라모스", "회전을 멈춘 살소토"],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "속도 or 공격력",
          sphere: "양자 피해 or 공격력",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2700" }
        ]
      }
    ],
    bestRelics: ["별처럼 빛나는 천재"],
    bestOrnaments: ["뭇별 경기장"],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "양자 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "140%" }
    ],
    bestLightCones: ["야경 속에서", "깊게 든 단잠", "별바다 순항", "논검"],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E2 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "109.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Medium", efficiency1: "130.39%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Low", efficiency1: "142.09%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "146.50%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "182.28%", efficiency3: "-", description: "성흔 효과" }
    ]
    ,analysis: { status:"published", summary:"적 처치 시 재현 추가 턴을 얻어 단일 공격을 연속으로 이어가는 양자 수렵 딜러다.", role:"처치 연쇄 단일 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["잡몹 처치가 추가 행동과 피해 증가로 연결된다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["처치할 적이 없는 단일 고체력 전투에서는 재현 발동이 어렵다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"잡몹 체력을 조절해 재현을 발동한 뒤 강화 상태로 보스를 공격한다.", gameplay:{overview:"잡몹 체력을 조절해 재현을 발동한 뒤 강화 상태로 보스를 공격한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
