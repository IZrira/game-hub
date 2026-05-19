import { CharacterGuide } from './index';

export const 아케론Guide: CharacterGuide = {
    characterName: "아케론",
    lastUpdated: "2026-03-08",
    patchVersion: "3.8",
    bestRelics: ["사수에 잠수한 선구자"],
    bestOrnaments: ["이즈모 현세와 타카마 신국", "회전을 멈춘 살소토"],
    mainStats: {
      body: "치명타 확률\nor 치명타 피해",
      boots: "속도\nor 공격력",
      sphere: "공격력",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상", note: "1돌파 시 -18% 적용" },
      { label: "치명타 피해", value: "160% 이상" },
      { label: "공격력", value: "4000 이상" }
    ],
    bestLightCones: ["흘러가는 강가를 따라", "끝없는 춤"],
    skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
    recommendedEidolon: "E2 / E4 / E6",
    eidolonEfficiency: [
      { level: 0, impact: "Low", efficiency1: "100.00%", efficiency3: "100.00%", description: "기본 성능 (-7.4 SP)" },
      { level: 1, impact: "Medium", efficiency1: "111.77%", efficiency3: "113.53%", description: "치명타 확률 증가" },
      { level: 2, impact: "High", efficiency1: "123.38%", efficiency3: "129.82%", description: "공허 캐릭터 요구량 감소" },
      { level: 3, impact: "Medium", efficiency1: "129.42%", efficiency3: "137.06%", description: "필살기/일반 공격 레벨 상승" },
      { level: 4, impact: "High", efficiency1: "137.38%", efficiency3: "145.45%", description: "필살기 피해 취약 부여" },
      { level: 5, impact: "Medium", efficiency1: "142.16%", efficiency3: "149.18%", description: "전투 스킬/특성 레벨 상승" },
      { level: 6, impact: "High", efficiency1: "169.81%", efficiency3: "178.11%", description: "모든 공격이 필살기 피해로 간주" }
    ]
  };
