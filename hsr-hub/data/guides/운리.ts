import { CharacterGuide } from './index';

export const 운리Guide: CharacterGuide = {
    characterName: "운리",
    lastUpdated: "2026-09-29",
    patchVersion: "3.0",
    bestRelics: [
      { name: "바람과 구름을 가르는 용맹함", note: "1순위" },
      { name: "스트리트 격투왕", note: "2순위" }
    ],
    bestOrnaments: [
      { name: "질주하는 늑대의 도람 왕조", note: "1순위" },
      { name: "회전을 멈춘 살소토", note: "2순위" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "공격력",
      sphere: "물리 피해",
      rope: "공격력"
    },
    subStats: ["치명타 확률", "치명타 피해", "공격력", "속도"],
    targetStats: [
      { label: "치명타 확률", value: "80% 이상" },
      { label: "치명타 피해", value: "120% 이상" },
      { label: "공격력", value: "3000 이상" }
    ],
    bestLightCones: [
      { name: "해 질 무렵 시작되는 춤", note: "1순위" },
      { name: "대체할 수 없는 것", note: "2순위" },
      { name: "어떤 에이언즈의 몰락", note: "3순위" }
    ],
    skillPriority: ["필살기", "특성", "전투 스킬", "일반 공격"],
    recommendedEidolon: "E1 / E6",
    eidolonEfficiency: [],
    analysis: { status: "published", summary: "적의 공격을 받아 즉시 반격하고 필살기의 막기로 강화 반격을 만드는 물리 파멸 딜러다. 적의 행동 직전에 필살기를 끼워 넣어 간파·멸을 확정하는 타이밍 운용이 핵심이다.", role: "피격 반격 메인 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀", strengths: ["피격마다 확산 반격과 에너지 회복이 발생해 적이 빠를수록 강하다.", "필살기의 도발과 치명타 피해 증가로 강력한 간파·멸을 만든다.", "전투 스킬에 자체 회복이 있어 반복 피격을 버티기 좋다."], weaknesses: ["공격하지 않거나 행동이 느린 적을 상대로 반격 횟수가 줄어든다.", "필살기 타이밍을 놓치면 약한 간파·참으로 소모될 수 있다.", "실드와 강한 군중 제어는 피격·반격 흐름과 에너지 수급을 방해할 수 있다."], teamPrinciple: "운리에게 적의 공격을 유도하고 치명타·공격력 버프를 제공하되, 적 행동을 과도하게 지연시키지 않는 생존·지원 캐릭터를 선택한다.", gameplay: { overview: "평소에는 스킬로 회복하며 반격 에너지를 모은다. 필살기는 적 행동 직전에 사용해 도발 대상의 공격을 받고 간파·멸을 발동하도록 한다.", rotation: ["전투 스킬로 체력을 회복하고 적을 공격한다.", "피격 반격으로 에너지를 120 이상 확보한다.", "적 행동 직전에 필살기로 막기와 도발을 건다.", "간파·멸 발동 후 다음 적 행동을 위해 에너지를 다시 모은다."], tips: ["필살기는 아군 턴이 많이 남았을 때 미리 쓰지 않는다.", "에너지를 최대 240까지 저장할 수 있어 적 행동에 맞춰 아껴도 된다.", "어그로 증가 광추나 효과는 반격 안정성을 높인다."] } }
  };
