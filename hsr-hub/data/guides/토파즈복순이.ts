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
  };
