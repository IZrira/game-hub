import { CharacterGuide } from './index';

export const 히메코Guide: CharacterGuide = {
    characterName: "히메코",
    lastUpdated: "2026-03-14",
    patchVersion: "4.0",
    variants: [
      {
        name: "기본",
        bestRelics: [{ name: "재와 뼈마저 불사르는 대공", note: "1순위" }],
        bestOrnaments: [
          { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
          { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
          "회전을 멈춘 살소토"
        ],
        mainStats: {
          body: "치명타 확률 or 치명타 피해",
          boots: "공격력 or 속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력"],
        targetStats: [
          { label: "치명타 확률", value: "85%" },
          { label: "치명타 피해", value: "140%" },
          { label: "공격력", value: "2800" }
        ]
      },
      {
        name: "슈퍼 격파",
        bestRelics: [{ name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 세팅" }],
        bestOrnaments: [{ name: "겁화 연등의 연마궁", note: "슈퍼 격파 세팅 1순위" }],
        mainStats: {
          body: "부 옵션 좋은 것",
          boots: "속도 or 공격력",
          sphere: "부 옵션 좋은 것",
          rope: "격파 특수효과"
        },
        subStats: ["격파 특수효과", "속도"],
        targetStats: [
          { label: "속도", value: "134 이상" },
          { label: "격파 특수효과", value: "250% 이상" },
          { label: "공격력", value: "2500 이상" }
        ]
      }
    ],
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      { name: "곤충 재앙을 잠재우는 철기군", note: "슈퍼 격파 세팅" }
    ],
    bestOrnaments: [
      { name: "주인 없는 황폐한 별 츠가냐", note: "1순위" },
      { name: "질주하는 늑대의 도람 왕조", note: "2순위" },
      "회전을 멈춘 살소토",
      { name: "겁화 연등의 연마궁", note: "슈퍼 격파 세팅 1순위" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력 or 속도",
      sphere: "화염 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "85%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "2800" }
    ],
    bestLightCones: [
      { name: "동트기 전", note: "1순위" },
      { name: "은하철도의 밤", note: "2순위" },
      { name: "천재들의 휴식", note: "3순위" },
      "멈추지 않는 연산"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "108.77%", efficiency3: "113.77%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "113.24%", efficiency3: "118.37%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "119.51%", efficiency3: "122.35%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "119.51%", efficiency3: "122.35%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "123.71%", efficiency3: "129.31%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "143.89%", efficiency3: "136.44%", description: "성흔 효과" }
    ]
    ,analysis: { status:"published", summary:"적 약점 격파 횟수를 충전해 광역 추가 공격을 발동하는 화염 지식 딜러다.", role:"격파 연계 광역 딜러", standard:"E0 / S0", reviewedAt:"2026-09-29", reviewer:"RIRA 편집팀", strengths:["다수 적의 약점을 연속 격파하면 추가 공격을 반복한다.","조건을 충족하면 파티 내 역할이 분명하다."], weaknesses:["단일 적이나 약점 잠금 구간에서는 충전이 느리다.","적 구성과 행동 순서에 따라 실전 편차가 생긴다."], teamPrinciple:"광역 강인성 감소 캐릭터와 여러 적을 차례로 격파한다.", gameplay:{overview:"광역 강인성 감소 캐릭터와 여러 적을 차례로 격파한다.", rotation:["핵심 표식·버프 또는 디버프를 먼저 적용한다.","조건이 완성되면 필살기와 주력 공격을 집중한다."], tips:["핵심 효과가 끊기기 전에 갱신한다.","다음 웨이브의 적 구성까지 고려해 자원을 남긴다."]}}
  };
