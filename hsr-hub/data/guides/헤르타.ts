import { CharacterGuide } from './index';

export const 헤르타Guide: CharacterGuide = {
    characterName: "헤르타",
    lastUpdated: "2026-03-14",
    patchVersion: "4.0",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      "혹한 밀림의 사냥꾼"
    ],
    bestOrnaments: [
      { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
      { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
      "회전을 멈춘 살소토",
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "85%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "2500" }
    ],
    bestLightCones: [
      { name: "동트기 전", note: "1순위" },
      { name: "은하철도의 밤", note: "2순위" },
      { name: "천재들의 휴식", note: "3순위" },
      "멈추지 않는 연산"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "111.40%", efficiency3: "111.38%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "117.22%", efficiency3: "115.97%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "117.22%", efficiency3: "117.87%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "122.26%", efficiency3: "123.07%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "128.76%", efficiency3: "129.03%", description: "성흔 효과" }
    ]
  };
