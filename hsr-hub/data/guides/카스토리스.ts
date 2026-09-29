import { CharacterGuide } from './index';

export const 카스토리스Guide: CharacterGuide = {
    characterName: "카스토리스",
    lastUpdated: "2026-09-29",
    patchVersion: "3.6",
    bestRelics: ["망국을 애도하는 시인"],
    bestOrnaments: ["고요한 습골지", { name: "꿈을 엮는 요정의 낙원", note: "기억 파티 조합 시" }, "기묘한 나나 낙원"],
    mainStats: {
      body: "HP or 치명타 피해 or 치명타 확률",
      boots: "HP",
      sphere: "HP or 양자 피해 (히아킨 1돌파 이상 시 양자 피해)",
      rope: "HP"
    },
    subStats: ["치명타 피해", "치명타 확률", "HP"],
    targetStats: [
      { label: "HP", value: "8000 이상" },
      { label: "속도", value: "95 미만" }
    ],
    bestLightCones: [
      "이별이 더 아름답도록",
      "꽃은 잊지 않는다",
      "땀은 많이, 눈물은 적게"
    ],
    skillPriority: ["기억 정령 스킬", "기억 정령 특성", "필살기", "특성", "전투 스킬", "일반 공격"],
    eidolonVariants: [
      {
        name: "목표 1개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "151%", efficiency3: "123%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "209%", efficiency3: "169%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "224%", efficiency3: "180%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "238%", efficiency3: "192%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "353%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      },
      {
        name: "목표 3개 (광추별 효율)",
        labels: ["이별이 더 아름답도록", "땀은 많이, 눈물은 적게"],
        efficiency: [
          { level: 0, impact: "Low", efficiency1: "123%", efficiency3: "100%", description: "기본 성능" },
          { level: 1, impact: "Medium", efficiency1: "149%", efficiency3: "121%", description: "성흔 효과" },
          { level: 2, impact: "High", efficiency1: "230%", efficiency3: "187%", description: "성흔 효과" },
          { level: 3, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "행적 레벨 증가" },
          { level: 4, impact: "Low", efficiency1: "240%", efficiency3: "194%", description: "성흔 효과" },
          { level: 5, impact: "Low", efficiency1: "262%", efficiency3: "212%", description: "행적 레벨 증가" },
          { level: 6, impact: "High", efficiency1: "350%", efficiency3: "283%", description: "최종 돌파 효과" }
        ]
      }
    ],
    eidolonEfficiency: [],
    analysis: {
      status: "published", summary: "파티의 HP 손실과 치유를 새로운 꽃술로 바꿔 죽음의 용을 소환하는 양자 기억 딜러다. 용이 머무는 짧은 시간에 HP를 연속 소모해 강화 숨결과 퇴장 바운스를 최대화한다.",
      role: "HP 소모형 기억 메인 딜러", standard: "E0 / S0", reviewedAt: "2026-09-29", reviewer: "RIRA 편집팀",
      strengths: ["공격력 대신 HP를 피해 기반으로 사용해 높은 생존 능력치가 곧 화력으로 이어진다.", "죽음의 용 소환 시 적의 모든 속성 저항을 감소시키고 광역 피해를 반복한다.", "달의 고치로 전투당 한 번 치명적인 피해를 유예해 파티 복구 기회를 만든다."],
      weaknesses: ["파티 전체 HP를 반복 소모하므로 안정적인 광역 치유가 없으면 위험하다.", "죽음의 용이 없는 예열 구간과 소환 구간의 화력 차이가 크다.", "저속 세팅은 행동 순서와 버프 지속 시간을 잘못 맞추면 용 소환 창을 낭비하기 쉽다."],
      teamPrinciple: "광역 치유와 최대 HP 지원을 제공하는 힐러를 우선하고, HP 소모·회복 빈도를 높여 꽃술을 채운 뒤 용의 3턴 동안 지원 버프를 집중한다.",
      gameplay: { overview: "전투 스킬로 파티 HP를 꽃술과 피해 증가로 전환하고 치유로 다시 꽃술을 보충한다. 필살기가 열리면 버프를 먼저 준비한 후 죽음의 용을 소환하고, 용의 HP를 숨결에 사용해 마지막 퇴장 공격까지 연결한다.", rotation: ["전투 스킬로 파티 HP를 소모해 꽃술과 피해 증가를 쌓는다.", "광역 치유로 파티를 복구하면서 추가 꽃술을 확보한다.", "지원 버프 후 필살기로 죽음의 용과 저승 경계를 전개한다.", "용의 숨결을 반복하고 퇴장 바운스와 회복까지 회수한다."], tips: ["꽃술은 HP 손실과 치유 양쪽에서 쌓이므로 힐러의 행동 순서를 카스토리스 뒤에 둔다.", "용이 필드에 있을 때의 HP 손실은 용의 HP로 전환되므로 소환 전후 자원 규칙을 구분한다.", "속도 95 미만 세팅에서는 파티 버프가 용의 전체 행동 구간을 덮는지 확인한다."] }
    }
  };
