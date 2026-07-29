import { CharacterGuide } from './index';

export const 토오사카린Guide: CharacterGuide = {
  characterName: "토오사카 린",
  lastUpdated: "2026-07-29",
  patchVersion: "4.4",
  variants: [
    {
      name: "연계 딜러 및 하이퍼캐리 세팅",
      bestRelics: [
        { name: "지식의 바다에 빠진 학자", note: "1순위" },
        { name: "별처럼 빛나는 천재", note: "2순위" }
      ],
      bestOrnaments: [
        { name: "천 개의 별이 모인 도시", note: "1순위" },
        { name: "텐고쿠@라이브스트리밍", note: "2순위 (하이퍼캐리 한정)" }
      ],
      bestLightCones: [
        { name: "고요히 빛나는 불티", note: "1순위" },
        { name: "추궁할 수 없는 곳을 향해", note: "2순위" },
        { name: "오늘도 평화로운 하루", note: "3순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률 or 치명타 피해",
        boots: "속도 or 공격력",
        sphere: "양자 속성 피해",
        rope: "공격력"
      },
      subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
      targetStats: [
        { label: "공격력", value: "3000+" },
        { label: "속도", value: "134+" },
        { label: "치명타 확률 (스파클 광추)", value: "+10%", note: "스파클 전용 광추 사용 시 치명타 확률 10% 계산 필수" },
        { label: "속도 (린 버프)", value: "+20.4", note: "린의 속도 버프 시 20.4 계산 필수" }
      ]
    },
    {
      name: "아처 파티 서포터 세팅",
      bestRelics: [
        { name: "밤낮의 경계를 나는 매", note: "1순위" }
      ],
      bestOrnaments: [
        { name: "천 개의 별이 모인 도시", note: "1순위" },
        { name: "꿈의 땅 페나코니", note: "2순위 (양자 파티원 필요)" },
        { name: "바다에 잠긴 루샤카", note: "2순위 (에너지 회복 효율 및 공격력 제공, 자리 배치 필수)" }
      ],
      bestLightCones: [
        { name: "고요히 빛나는 불티", note: "1순위" },
        { name: "추궁할 수 없는 곳을 향해", note: "2순위" },
        { name: "오늘도 평화로운 하루", note: "3순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률 or 치명타 피해",
        boots: "속도",
        sphere: "양자 속성 피해",
        rope: "에너지 회복 효율 or 공격력"
      },
      subStats: ["치명타 확률", "치명타 피해", "속도"],
      targetStats: [
        { label: "속도", value: "스파클+1", note: "스파클 속도 +1 이상 필수" },
        { label: "치명타 확률 (스파클 광추)", value: "+10%", note: "스파클 전용 광추 사용 시 치명타 확률 10% 계산 필수" },
        { label: "속도 (고속 스파클 기준)", value: "고속 스파클 속도+1", note: "린의 속도 버프(20.4) 포함 계산 필수" }
      ]
    }
  ],
  // Default shared stats (Required by type)
  bestRelics: ["지식의 바다에 빠진 학자"],
  bestOrnaments: ["천 개의 별이 모인 도시"],
  bestLightCones: ["고요히 빛나는 불티", "추궁할 수 없는 곳을 향해", "오늘도 평화로운 하루"],
  skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
  mainStats: {
    body: "치명타 확률 or 치명타 피해",
    boots: "속도 or 공격력",
    sphere: "양자 속성 피해",
    rope: "공격력"
  },
  subStats: ["치명타 확률", "치명타 피해", "속도", "공격력"],
  targetStats: [
    { label: "공격력", value: "3000+" },
    { label: "속도", value: "134+" }
  ],
  eidolonEfficiency: []
};
