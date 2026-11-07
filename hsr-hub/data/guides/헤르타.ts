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
    ,
    analysis: {
      "status": "published",
      "summary": "아군의 공격으로 적의 HP가 50% 이하로 떨어질 때마다 광역 추가 공격을 하는 얼음 지식 딜러다. 전투 스킬과 필살기 모두 광역이라 다수의 적을 정리하는 전투에 맞는다.",
      "role": "광역 추가 공격 딜러",
      "standard": "E0 / S0",
      "reviewedAt": "2026-11-07",
      "reviewer": "RIRA 편집팀",
      "strengths": [
        "어느 아군의 공격이든 적의 HP를 50% 이하로 만들면 헤르타가 즉시 모든 적에게 추가 공격을 한다. 적이 많을수록 발동 기회가 많다.",
        "전투 스킬은 모든 적을 공격하고, HP 50% 이상인 적에게 피해가 20% 더 오른다.",
        "필살기도 광역이고, 빙결된 적에게는 피해가 20% 더 오른다(추가 능력 빙결)."
      ],
      "weaknesses": [
        "추가 공격은 적마다 HP가 50% 아래로 내려가는 순간에만 발동한다. 적이 적거나 체력이 높은 단일 보스전에서는 발동이 드물다.",
        "단일 대상 화력이 낮아 보스전에는 맞지 않는다.",
        "생존 수단이 없어 별도의 생존 캐릭터가 필요하다."
      ],
      "teamPrinciple": "광역 공격이 많은 아군과 편성해 여러 적의 HP를 동시에 50% 아래로 떨어뜨린다. 다수전 위주의 콘텐츠에서 쓴다.",
      "gear": [
        {
          "kind": "lightcone",
          "name": "동트기 전",
          "note": "1순위",
          "reason": "치명타 피해 36%와 전투 스킬·필살기 피해 18%를 준다. 전투 스킬·필살기 뒤 얻는 [몽신]으로 다음 추가 공격 피해가 48% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "은하철도의 밤",
          "note": "2순위",
          "reason": "필드의 적 1기당 공격력이 9%씩 최대 45% 오른다. 다수전 위주인 헤르타와 맞는다."
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
          "reason": "공격력 8%를 주고, 공격이 맞힌 적 1기마다 공격력이 4%씩 최대 5회 오른다. 3기 이상 맞히면 속도도 8% 오른다."
        },
        {
          "kind": "relic",
          "name": "재와 뼈마저 불사르는 대공",
          "note": "1순위",
          "reason": "추가 공격 피해 20%를 주고, 추가 공격의 피해 횟수마다 공격력이 6%씩 쌓인다. 광역 추가 공격은 맞힌 적 수만큼 횟수가 늘어난다."
        },
        {
          "kind": "relic",
          "name": "지식의 바다에 빠진 학자",
          "note": "2순위",
          "reason": "치명타 확률 8%와 전투 스킬·필살기 피해 20%를 준다."
        },
        {
          "kind": "relic",
          "name": "혹한 밀림의 사냥꾼",
          "note": "3순위",
          "reason": "얼음 속성 피해 10%와 필살기 발동 시 2턴간 치명타 피해 25%를 준다."
        },
        {
          "kind": "ornament",
          "name": "주인 없는 황폐한 별 츠가냐",
          "note": "1순위",
          "reason": "적이 처치될 때마다 치명타 피해가 4%씩 최대 10스택 오른다. 적이 많이 쓰러지는 다수전용이다."
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
          "name": "뭇별 경기장",
          "note": "4순위",
          "reason": "치명타 확률 70% 이상이면 일반 공격·전투 스킬 피해가 20% 오른다."
        }
      ],
      "gameplay": {
        "overview": "전투 스킬과 필살기로 적 전체의 체력을 깎아 추가 공격 조건을 만들고, 아군의 광역 공격과 겹쳐 추가 공격을 연달아 발동시킨다.",
        "rotation": [
          "비술을 쓰면 다음 전투 시작 시 3턴간 공격력이 40% 오른다.",
          "전투 스킬로 모든 적을 공격해 HP를 50% 아래로 끌어내린다.",
          "적의 HP가 50% 이하가 되면 특성 추가 공격이 자동으로 발동한다.",
          "필살기로 남은 적을 한 번에 정리한다."
        ],
        "tips": [
          "전투 스킬로 HP 50% 이상인 적을 공격하면 효과 명중이 25% 오른다(추가 능력 효율).",
          "추가 공격은 적마다 HP 50% 아래로 내려가는 순간 발동하므로, 적이 많은 웨이브에서 피해가 커진다.",
          "제어류 디버프에 저항할 확률이 35% 오른다(추가 능력 인형)."
        ]
      }
    }
  };
