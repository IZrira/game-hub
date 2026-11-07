import { CharacterGuide } from './index';

export const 후크Guide: CharacterGuide = {
    characterName: "후크",
    lastUpdated: "2026-03-14",
    patchVersion: "3.0",
    bestRelics: [
      { name: "사수에 잠수한 선구자", note: "1순위" },
      { name: "지식의 바다에 빠진 학자", note: "2순위" },
      "용암 단조의 화장(火匠)"
    ],
    bestOrnaments: [
      { name: "창공 전선 그라모스", note: "1순위" },
      "뭇별 경기장"
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도 or 공격력",
      sphere: "화염 피해",
      rope: "에너지 충전 효율 or 공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
    targetStats: [
      { label: "치명타 확률", value: "70%" },
      { label: "치명타 피해", value: "140%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: [
      { name: "어떤 에이언즈의 몰락", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      "과거의 핏자국",
      "두더지파가 환영해"
    ],
    skillPriority: ["전투 스킬", "필살기", "특성", "일반 공격"],
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "102.09%", efficiency3: "102.96%", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "108.09%", efficiency3: "109.46%", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "108.09%", efficiency3: "120.48%", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "111.86%", efficiency3: "123.88%", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "124.55%", efficiency3: "137.86%", description: "성흔 효과" }
    ]
    ,
    analysis: {
      "status": "published",
      "summary": "전투 스킬로 연소를 걸고, 연소된 적을 공격할 때마다 추가 화염 피해와 에너지를 얻는 화염 파멸 딜러다. 필살기 뒤 다음 전투 스킬이 확산형으로 강화된다.",
      "role": "연소 활용 단일·확산 딜러",
      "standard": "E0 / S0",
      "reviewedAt": "2026-11-07",
      "reviewer": "RIRA 편집팀",
      "strengths": [
        "연소 상태의 적을 공격하면 추가로 후크 공격력 100%의 화염 피해를 주고 에너지를 5pt 더 회복한다(특성).",
        "필살기 뒤 다음 전투 스킬이 주목표와 인접한 적까지 공격한다. 필살기 뒤 행동 게이지도 20% 당겨진다(추가 능력 불장난).",
        "특성이 발동할 때마다 HP를 5% 회복해(추가 능력 천진난만) 스스로 조금씩 버틴다."
      ],
      "weaknesses": [
        "연소가 걸려 있어야 특성 피해와 에너지가 나온다. 연소가 끊기면 화력이 줄어든다.",
        "연소는 100% 기본 확률로 걸리지만 2턴만 지속돼 전투 스킬로 계속 갱신해야 한다.",
        "광역 피해 수단이 강화 전투 스킬뿐이라 다수전 정리 속도가 느리다."
      ],
      "teamPrinciple": "단일 대상 딜러로 쓰며, 공격력·치명타를 주는 서포터와 생존 캐릭터를 함께 둔다. 연소를 유지하는 것만으로 특성 조건이 채워진다.",
      "gear": [
        {
          "kind": "lightcone",
          "name": "어떤 에이언즈의 몰락",
          "note": "1순위",
          "reason": "공격할 때마다 공격력이 8%씩 최대 32%까지 쌓이고, 약점 격파 뒤 2턴간 피해가 12% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "대체할 수 없는 것",
          "note": "2순위",
          "reason": "공격력 24%를 주고, 적을 처치하거나 피격되면 HP를 회복하고 가하는 피해가 24% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "과거의 핏자국",
          "note": "3순위",
          "reason": "치명타 확률 12%와 전투 스킬·필살기 피해 24%를 준다. 후크의 주력 행동 두 가지에 모두 적용된다."
        },
        {
          "kind": "lightcone",
          "name": "두더지파가 환영해",
          "note": "4순위",
          "reason": "일반 공격·전투 스킬·필살기로 적을 공격할 때마다 공격력이 12%씩 최대 3스택 오른다."
        },
        {
          "kind": "relic",
          "name": "사수에 잠수한 선구자",
          "note": "1순위",
          "reason": "디버프에 걸린 적에게 가하는 피해가 12% 오른다. 연소도 디버프라 후크가 직접 거는 순간 치명타 효과가 두 배가 된다."
        },
        {
          "kind": "relic",
          "name": "지식의 바다에 빠진 학자",
          "note": "2순위",
          "reason": "치명타 확률 8%와 전투 스킬·필살기 피해 20%를 주고, 필살기 뒤 다음 전투 스킬 피해가 25% 더 오른다. 필살기 뒤 강화되는 전투 스킬과 맞는다."
        },
        {
          "kind": "relic",
          "name": "용암 단조의 화장(火匠)",
          "note": "3순위",
          "reason": "화염 속성 피해 10%와 전투 스킬 피해 12%를 주고, 필살기 뒤 다음 공격의 화염 피해가 12% 오른다."
        },
        {
          "kind": "ornament",
          "name": "창공 전선 그라모스",
          "note": "1순위",
          "reason": "공격력 12%에 더해 속도 135/160 이상이면 가하는 피해가 12%/18% 오른다."
        },
        {
          "kind": "ornament",
          "name": "뭇별 경기장",
          "note": "2순위",
          "reason": "치명타 확률 70% 이상이면 일반 공격·전투 스킬 피해가 20% 오른다. 공략의 치명타 확률 목표 70%와 맞는다."
        }
      ],
      "gameplay": {
        "overview": "비술로 모든 적에게 연소를 걸고 시작한 뒤, 전투 스킬로 연소를 갱신하며 특성 추가 피해를 쌓는다. 필살기 뒤에는 강화된 전투 스킬로 주변 적까지 공격한다.",
        "rotation": [
          "비술로 적을 공격해 전투에 들어가면 모든 적이 3턴간 연소 상태로 시작한다.",
          "전투 스킬로 연소를 걸거나 갱신하며 특성 추가 피해를 낸다.",
          "필살기로 큰 단일 피해를 주고 행동 게이지를 당긴다.",
          "강화된 전투 스킬로 주목표와 인접한 적을 함께 공격한다."
        ],
        "tips": [
          "연소된 적은 턴이 시작될 때마다 후크 공격력 65%의 화염 지속 피해를 받는다.",
          "제어류 디버프에 저항할 확률이 35% 오른다(추가 능력 이해).",
          "필살기 뒤 에너지도 5pt 더 회복한다(추가 능력 불장난)."
        ]
      }
    }
  };
