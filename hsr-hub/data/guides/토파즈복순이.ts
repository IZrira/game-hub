import { CharacterGuide } from './index';

export const 토파즈복순이Guide: CharacterGuide = {
    characterName: "토파즈 & 복순이",
    lastUpdated: "2026-03-17",
    patchVersion: "4.0",
    bestRelics: [
      { name: "재와 뼈마저 불사르는 대공", note: "1순위" },
      "사수에 잠수한 선구자"
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      "기묘한 나나 낙원",
      "이즈모 현세와 타카마 신국",
      "회전을 멈춘 살소토"
    ],
    mainStats: {
      body: "치명타 피해 or 치명타 확률",
      boots: "공격력 or 속도",
      sphere: "화염 피해 or 공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80%" },
      { label: "치명타 피해", value: "150%" },
      { label: "공격력", value: "2800" }
    ],
    variants: [
      {
        name: "추공 서포터 (권장)",
        bestRelics: ["재와 뼈마저 불사르는 대공"],
        bestOrnaments: ["질주하는 늑대의 도람 왕조"],
        mainStats: {
          body: "치명타 피해 or 치명타 확률",
          boots: "공격력 or 속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
        targetStats: [
          { label: "치명타 확률", value: "80% 이상" },
          { label: "치명타 피해", value: "150% 이상" },
          { label: "공격력", value: "2800 이상" }
        ]
      },
      {
        name: "디버퍼 세팅 (고속)",
        bestRelics: ["사수에 잠수한 선구자"],
        bestOrnaments: ["이즈모 현세와 타카마 신국"],
        mainStats: {
          body: "치명타 확률",
          boots: "속도",
          sphere: "화염 피해",
          rope: "공격력"
        },
        subStats: ["속도", "치명타 확률", "치명타 피해", "공격력"],
        targetStats: [
          { label: "속도", value: "143 / 160 이상" },
          { label: "치명타 확률", value: "80% 이상" }
        ]
      }
    ],
    bestLightCones: [
      { name: "고민, 그리고 행복", note: "1순위" },
      "논검",
      "별바다 순항"
    ],
    skillPriority: ["전투 스킬", "특성", "필살기", "일반 공격"],
    recommendedEidolon: "E1 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "-", description: "기본 성능" },
      { level: 1, impact: "Low", efficiency1: "115.18%", efficiency3: "-", description: "성흔 효과" },
      { level: 2, impact: "Low", efficiency1: "133.62%", efficiency3: "-", description: "성흔 효과" },
      { level: 3, impact: "Medium", efficiency1: "141.44%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 4, impact: "Medium", efficiency1: "213.39%", efficiency3: "-", description: "성흔 효과" },
      { level: 5, impact: "Medium", efficiency1: "229.29%", efficiency3: "-", description: "스킬 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "286.90%", efficiency3: "-", description: "성흔 효과" }
    ]
    ,
    analysis: {
      "status": "published",
      "summary": "적 하나에 [부채 증명]을 걸어 받는 추가 공격 피해를 50% 올리고, 소환물 복순이의 추가 공격으로 그 적을 공격하는 화염 수렵 캐릭터다. 아군이 추가 공격을 할 때마다 복순이의 행동이 당겨진다.",
      "role": "추가 공격 서포터 · 서브 딜러",
      "standard": "E0 / S0",
      "reviewedAt": "2026-11-07",
      "reviewer": "RIRA 편집팀",
      "strengths": [
        "[부채 증명]이 걸린 적은 받는 추가 공격 피해가 50% 오른다. 추가 공격 위주 파티의 피해를 함께 올린다.",
        "[부채 증명] 적이 아군의 추가 공격을 받으면 복순이의 행동 게이지가 50% 당겨진다. 추가 공격이 많을수록 복순이가 자주 움직인다.",
        "토파즈의 일반 공격과 전투 스킬 피해도 추가 공격으로 간주된다(추가 능력 당좌 대월). 추가 공격 관련 장비 효과를 모두 받는다."
      ],
      "weaknesses": [
        "[부채 증명]은 가장 최근에 건 적 하나에만 적용된다. 여러 적에게 피해를 나누기 어렵다.",
        "토파즈가 쓰러지면 복순이도 사라진다.",
        "추가 공격이 적은 파티에서는 복순이의 행동 당기기와 [부채 증명] 효과가 크게 줄어든다."
      ],
      "teamPrinciple": "추가 공격으로 피해를 내는 딜러와 함께 쓴다. 공략은 추가 공격 서포터 세팅(권장)과 디버퍼 세팅(고속) 두 가지를 제시한다.",
      "gear": [
        {
          "kind": "lightcone",
          "name": "고민, 그리고 행복",
          "note": "1순위",
          "reason": "치명타 확률 18%와 추가 공격 피해 30%를 주고, 추가 공격으로 적에게 [온순]을 걸어 아군 모두의 치명타 피해를 올린다."
        },
        {
          "kind": "lightcone",
          "name": "논검",
          "note": "2순위",
          "reason": "같은 적을 여러 번 명중하면 피해가 최대 5스택까지 오른다. [부채 증명] 적 하나를 계속 때리는 토파즈와 맞는다."
        },
        {
          "kind": "lightcone",
          "name": "별바다 순항",
          "note": "3순위",
          "reason": "치명타 확률 8%를 주고 HP 50% 이하인 적에게 치명타 확률이 더 오르며, 적 처치 뒤 공격력이 20% 오른다."
        },
        {
          "kind": "relic",
          "name": "재와 뼈마저 불사르는 대공",
          "note": "추가 공격 서포터 세팅",
          "reason": "추가 공격 피해 20%를 주고, 추가 공격의 피해 횟수마다 공격력이 쌓인다. 토파즈의 공격 대부분이 추가 공격 판정이다."
        },
        {
          "kind": "relic",
          "name": "사수에 잠수한 선구자",
          "note": "디버퍼 세팅",
          "reason": "디버프에 걸린 적에게 가하는 피해가 12% 오른다. [부채 증명]도 디버프다."
        },
        {
          "kind": "ornament",
          "name": "질주하는 늑대의 도람 왕조",
          "note": "추가 공격 서포터 세팅",
          "reason": "아군이 추가 공격을 할 때마다 [공훈]을 쌓아 추가 공격 피해가 5%씩 오르고, 5스택이면 치명타 피해가 25% 더 오른다."
        },
        {
          "kind": "ornament",
          "name": "이즈모 현세와 타카마 신국",
          "note": "디버퍼 세팅",
          "reason": "공격력 12%를 주고, 운명의 길이 같은 동료(수렵)가 있으면 치명타 확률이 12% 오른다."
        }
      ],
      "gameplay": {
        "overview": "전투 스킬로 [부채 증명]을 핵심 적에게 옮기고, 필살기로 복순이를 [폭증!] 상태로 만들어 피해를 몰아넣는다. 아군의 추가 공격이 복순이의 행동을 당겨 준다.",
        "rotation": [
          "비술을 쓰면 다음 전투에서 복순이의 첫 공격 뒤 토파즈가 에너지를 60pt 회복한다.",
          "전투 스킬로 처리할 적에게 [부채 증명]을 걸고 복순이가 공격하게 한다.",
          "필살기로 복순이를 [폭증!] 상태로 만들어 피해 배율과 치명타 피해를 올린다.",
          "아군의 추가 공격과 일반 공격·전투 스킬로 [부채 증명] 적을 때려 복순이의 행동을 당긴다."
        ],
        "tips": [
          "필드에 [부채 증명] 적이 없으면 아군 턴 시작이나 행동 시 토파즈가 무작위 적에게 다시 건다.",
          "[폭증!]은 복순이가 2회 공격하면 끝난다. 이 동안 공격할 때마다 토파즈가 에너지를 10pt 더 회복한다(추가 능력 기술적 조정).",
          "토파즈와 복순이는 화염 약점을 가진 적에게 피해가 15% 더 오른다(추가 능력 금융 불안)."
        ]
      }
    }
  };
