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
    ,
    analysis: {
      "status": "published",
      "summary": "적의 약점이 격파될 때마다 충전을 모아, 3pt가 차면 모든 적에게 추가 공격을 하는 화염 지식 딜러다. 약점 격파가 잦은 다수전에서 강하고, 공략에는 추가 공격 세팅과 슈퍼 격파 세팅이 있다.",
      "role": "광역 추가 공격 딜러 · 격파 서브 딜러",
      "standard": "E0 / S0",
      "reviewedAt": "2026-11-07",
      "reviewer": "RIRA 편집팀",
      "strengths": [
        "적의 약점이 격파될 때마다 충전을 얻고, 3pt가 차면 아군 공격 뒤 바로 모든 적에게 추가 공격을 한다. 전투 시작 시 충전 1pt를 갖고 시작한다.",
        "전투 스킬은 확산, 필살기는 광역이라 다수의 적을 함께 공격한다. 필살기로 적을 처치할 때마다 에너지를 5pt 더 회복한다.",
        "공격 뒤 50% 기본 확률로 연소를 걸고, 연소된 적에게는 전투 스킬 피해가 20% 더 오른다(추가 능력 작열)."
      ],
      "weaknesses": [
        "충전은 약점 격파로만 쌓인다. 화염 약점이 없거나 강인성이 높은 적 위주면 추가 공격이 드물다.",
        "HP가 80% 이상일 때만 치명타 확률이 15% 오른다(추가 능력 도표). 피격이 잦으면 이 보너스를 잃는다.",
        "단일 대상 피해는 낮은 편이라 보스전에 약하다."
      ],
      "teamPrinciple": "광역 공격이나 강인성 감소가 빠른 아군과 편성해 약점 격파를 자주 일으킨다. 슈퍼 격파 세팅에서는 격파 파티(망귀인·달리아·영사)와 함께 쓴다.",
      "gear": [
        {
          "kind": "lightcone",
          "name": "동트기 전",
          "note": "1순위",
          "reason": "치명타 피해 36%와 전투 스킬·필살기 피해 18%를 주고, 전투 스킬·필살기 뒤 [몽신]으로 다음 추가 공격 피해가 48% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "은하철도의 밤",
          "note": "2순위",
          "reason": "필드의 적 1기당 공격력이 9%씩 최대 45% 오르고, 약점이 격파될 때마다 1턴간 피해가 30% 오른다. 격파로 충전을 쌓는 히메코와 맞는다."
        },
        {
          "kind": "lightcone",
          "name": "천재들의 휴식",
          "note": "3순위",
          "reason": "공격력 16%를 주고, 적을 처치하면 3턴간 치명타 피해가 24% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "멈추지 않는 연산",
          "note": "4순위",
          "reason": "공격이 맞힌 적 1기마다 공격력이 4%씩 최대 5회 오르고, 3기 이상 맞히면 속도가 8% 오른다."
        },
        {
          "kind": "relic",
          "name": "재와 뼈마저 불사르는 대공",
          "note": "1순위",
          "reason": "추가 공격 피해 20%를 주고, 추가 공격의 피해 횟수마다 공격력이 쌓인다. 광역 추가 공격은 맞힌 적 수만큼 횟수가 늘어난다."
        },
        {
          "kind": "relic",
          "name": "곤충 재앙을 잠재우는 철기군",
          "note": "슈퍼 격파 세팅",
          "reason": "격파 특수효과 16%를 주고, 150%·250% 이상에서 격파·슈퍼 격파 피해가 방어력을 무시한다."
        },
        {
          "kind": "ornament",
          "name": "주인 없는 황폐한 별 츠가냐",
          "note": "1순위",
          "reason": "적이 처치될 때마다 치명타 피해가 4%씩 최대 10스택 오른다. 다수전 위주인 히메코와 맞는다."
        },
        {
          "kind": "ornament",
          "name": "질주하는 늑대의 도람 왕조",
          "note": "2순위",
          "reason": "아군이 추가 공격을 할 때마다 추가 공격 피해가 쌓이고, 5스택이면 치명타 피해가 25% 더 오른다."
        },
        {
          "kind": "ornament",
          "name": "회전을 멈춘 살소토",
          "note": "3순위",
          "reason": "치명타 확률 50% 이상이면 필살기·추가 공격 피해가 15% 오른다."
        },
        {
          "kind": "ornament",
          "name": "겁화 연등의 연마궁",
          "note": "슈퍼 격파 세팅 1순위",
          "reason": "속도 6%를 주고, 화염 약점을 가진 적을 명중하면 격파 특수효과가 40% 오른다. 효과는 적에게 화염 약점이 있을 때만 발동한다."
        }
      ],
      "gameplay": {
        "overview": "비술로 적이 받는 화염 피해를 올리고 시작해, 아군의 격파로 충전을 모아 추가 공격을 반복한다. 전투 스킬로 연소된 적을 공격하고, 필살기로 남은 적을 정리하며 에너지를 회복한다.",
        "rotation": [
          "비술로 만든 영역 안의 적과 전투에 들어가면 적이 받는 화염 피해가 2턴간 10% 오른다.",
          "전투 스킬로 주목표와 인접한 적을 공격하고 연소를 건다.",
          "아군 공격으로 약점이 격파되면 충전이 쌓이고, 3pt가 되면 추가 공격이 자동으로 발동한다.",
          "필살기로 모든 적을 공격해 처치한 적마다 에너지를 회복한다."
        ],
        "tips": [
          "충전은 최대 3pt이고, 추가 공격을 하면 전부 소모된다.",
          "공략의 슈퍼 격파 세팅은 격파 특수효과 250% 이상을 목표로 한다.",
          "연소된 적은 턴이 시작될 때마다 히메코 공격력 30%의 화염 지속 피해를 받는다."
        ]
      }
    }
  };
