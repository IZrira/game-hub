import { CharacterGuide } from './index';

export const 연경Guide: CharacterGuide = {
    characterName: "연경",
    lastUpdated: "2026-03-17",
    patchVersion: "3.4",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["회전을 멈춘 살소토", "창공 전선 그라모스"],
    mainStats: {
      body: "치명타 피해",
      boots: "공격력 or 속도",
      sphere: "얼음 피해",
      rope: "공격력"
    },
    subStats: ["치명타 피해", "공격력", "속도", "치명타 확률"],
    targetStats: [
      { label: "치명타 확률", value: "20~30%" },
      { label: "치명타 피해", value: "200%" },
      { label: "공격력", value: "3000" }
    ],
    bestLightCones: ["깊게 든 단잠", "야경 속에서", "별바다 순항", "침묵만이"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Low", efficiency1: "102.80%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "110.50%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Low", efficiency1: "114.20%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "125.60%", efficiency3: "-", description: "성흔 효과" }
    ]
    ,
    analysis: {
      "status": "published",
      "summary": "전투 스킬로 [신검합일]을 얻어 치명타 확률·치명타 피해를 올리고, 공격 뒤 확률로 추가 공격과 빙결을 거는 얼음 단일 딜러다. 피격되면 [신검합일]이 풀리므로 맞지 않고 버티는 것이 화력의 전제다.",
      "role": "단일 치명타 딜러",
      "standard": "E0 / S0",
      "reviewedAt": "2026-11-07",
      "reviewer": "RIRA 편집팀",
      "strengths": [
        "[신검합일] 동안 치명타 확률 20%와 치명타 피해 30%가 오르고, 필살기는 치명타 확률 60%를 더한다. [신검합일] 상태에서 쓴 필살기는 치명타 피해도 50% 더 오른다.",
        "적을 공격하면 60% 고정 확률로 추가 공격을 하고, 65% 기본 확률로 빙결을 건다. 빙결된 적은 행동을 멈추고 턴마다 피해를 받는다.",
        "[신검합일] 동안 피격될 확률이 줄고 효과 저항이 20% 오른다(추가 능력 능공). 적의 약점이 얼음이면 공격마다 추가 피해가 붙는다(서리 칼날)."
      ],
      "weaknesses": [
        "피격되면 [신검합일]이 사라져 치명타 보너스를 잃는다. 실드나 도발로 연경이 맞지 않게 해야 한다.",
        "추가 공격은 확률 발동이라 피해가 고르지 않다.",
        "단일 대상 공격뿐이라 다수의 적을 정리하는 속도가 느리다."
      ],
      "teamPrinciple": "연경이 맞지 않도록 실드나 피해 감소를 주는 생존 캐릭터를 두고, 나머지 칸은 공격력·치명타 피해·행동 당기기를 주는 서포터로 채운다. 필살기 치명타 확률 덕분에 치명타 확률 목표는 낮게 잡는다.",
      "gear": [
        {
          "kind": "lightcone",
          "name": "깊게 든 단잠",
          "note": "1순위",
          "reason": "치명타 피해 30%를 주고, 일반 공격·전투 스킬이 치명타가 아니면 1턴간 치명타 확률이 36% 오른다(3턴마다 1회). 낮은 치명타 확률 목표와 맞는다."
        },
        {
          "kind": "lightcone",
          "name": "야경 속에서",
          "note": "2순위",
          "reason": "치명타 확률 18%를 주고, 속도가 100을 넘는 10pt마다 일반 공격·전투 스킬 피해와 필살기 치명타 피해가 오른다(최대 6스택)."
        },
        {
          "kind": "lightcone",
          "name": "별바다 순항",
          "note": "3순위",
          "reason": "치명타 확률 8%를 주고 HP 50% 이하인 적에게 치명타 확률이 더 오르며, 적을 처치하면 2턴간 공격력이 20% 오른다."
        },
        {
          "kind": "lightcone",
          "name": "침묵만이",
          "note": "4순위",
          "reason": "공격력 16%를 주고, 필드의 적이 2명 이하면 치명타 확률이 12% 오른다."
        },
        {
          "kind": "relic",
          "name": "사수에 잠수한 선구자",
          "note": "1순위",
          "reason": "디버프에 걸린 적에게 가하는 피해가 12% 오르고, 디버프 수에 따라 치명타 피해가 더 오른다. 빙결을 거는 연경은 디버프를 직접 부여해 효과가 두 배가 되는 순간이 있다."
        },
        {
          "kind": "ornament",
          "name": "회전을 멈춘 살소토",
          "note": "1순위",
          "reason": "치명타 확률 50% 이상이면 필살기·추가 공격 피해가 15% 오른다. 연경의 필살기와 특성 추가 공격에 모두 적용된다."
        },
        {
          "kind": "ornament",
          "name": "창공 전선 그라모스",
          "note": "2순위",
          "reason": "공격력 12%에 더해 속도 135/160 이상이면 가하는 피해가 12%/18% 오른다."
        }
      ],
      "gameplay": {
        "overview": "전투 스킬로 [신검합일]을 켜 둔 상태를 유지하며 공격하고, 필살기는 [신검합일]이 켜진 턴에 써서 치명타 확률·피해 보너스를 모두 받는다.",
        "rotation": [
          "비술을 쓰고 전투에 들어가면 HP 50% 이상인 적에게 2턴간 피해가 30% 오른다.",
          "전투 스킬로 피해를 주고 [신검합일]을 얻는다.",
          "[신검합일]이 유지되는 동안 필살기를 써서 치명타 확률 60%와 치명타 피해 50%를 함께 받는다.",
          "공격 뒤 추가 공격과 빙결이 발동하면 빙결된 적부터 정리한다."
        ],
        "tips": [
          "공략의 치명타 확률 목표가 20~30%로 낮은 것은 [신검합일]과 필살기가 치명타 확률을 크게 올려 주기 때문이다.",
          "치명타가 발동하면 2턴간 속도가 10% 오른다(추가 능력 신속).",
          "빙결된 적은 턴이 시작될 때마다 연경 공격력 50%의 얼음 피해를 받는다."
        ]
      }
    }
  };
