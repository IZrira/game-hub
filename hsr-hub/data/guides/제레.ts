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
  };
