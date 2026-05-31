import { CharacterGuide } from './index';

export const 개척자환락Guide: CharacterGuide = {
    characterName: "개척자 (환락)",
    lastUpdated: "2026-05-30",
    patchVersion: "4.2",
    bestRelics: [
      { name: "천명에 응해 먼 길을 떠난 점술가", note: "점술가 파티에 2명 인 경우 중복 불가능" },
      { name: "밤낮의 경계를 나는 매", note: "속도 160 이상, 바커 공 조합 시 157 이상" }
    ],
    bestOrnaments: [
      { name: "바다에 잠긴 루샤카", note: "공격력 효율이 높은 환락 딜러와 사용 시" },
      { name: "생명의 바커 공", note: "공격력 효율이 낮은 환락 딜러와 사용 시" }
    ],
    mainStats: {
      body: "치명타 확률 or 치명타 피해",
      boots: "속도",
      sphere: "공격력",
      rope: "에너지 회복 효율"
    },
    subStats: ["속도", "공격력", "치명타 확률", "치명타 피해"],
    targetStats: [
      { label: "속도", value: "160 이상", note: "2라운드 4행동" },
      { label: "속도", value: "167 이상", note: "1라운드 3행동 (매+바커공 조합 시 157 이상)" },
      { label: "속도", value: "174 이상", note: "1웨이브 1라운드 3행동" },
      { label: "공격력", value: "2200 이하" }
    ],
    bestLightCones: [
      "넘치는 환락의 축복",
      "그녀가 보기로 결심했을 때",
      "슈룸 모험기"
    ],
    skillPriority: ["필살기", "환락 스킬", "전투 스킬", "특성", "일반 공격"],
    eidolonEfficiency: []
  };
