import { CharacterGuide } from './index';

export const 히메코노바Guide: CharacterGuide = {
  characterName: "히메코·노바",
  lastUpdated: "2026-07-29",
  patchVersion: "4.4",
  variants: [
    {
      name: "판결(선데이, 단항·등황), 섬멸(웰트, Mar. 7th) 공용 세팅",
      bestRelics: [
        { name: "별을 갈망하는 항법사 아집", note: "1순위" },
        { name: "지식의 바다에 빠진 학자", note: "2순위" }
      ],
      bestOrnaments: [
        { name: "추락한 별의 출항지", note: "1순위" },
        { name: "기묘한 나나 낙원", note: "2순위 (단항·등황 파티 필수)" }
      ],
      bestLightCones: [
        { name: "별이 밤하늘을 밝힐 때", note: "1순위" },
        { name: "추궁할 수 없는 곳을 향해", note: "2순위" },
        { name: "천재들의 휴식", note: "3순위" }
      ],
      skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
      mainStats: {
        body: "치명타 확률",
        boots: "속도 or 공격력 (스파클 사용 시 공격력 필수)",
        sphere: "공격력",
        rope: "공격력"
      },
      subStats: ["치명타 확률", "공격력", "치명타 피해", "속도"],
      targetStats: [
        { label: "공격력", value: "3500+" },
        { label: "속도", value: "134+", note: "스파클(매+댄댄댄 168+) 사용 시 속도 세팅 X" },
        { label: "치명타 확률", value: "100% 이하", note: "선데이(속도 160+) 사용 시 치확 -20% 보정" }
      ]
    }
  ],
  // 공통 설정
  bestRelics: ["별을 갈망하는 항법사 아집"],
  bestOrnaments: ["추락한 별의 출항지"],
  bestLightCones: ["별이 밤하늘을 밝힐 때", "추궁할 수 없는 곳을 향해"],
  mainStats: {
    body: "치명타 확률",
    boots: "속도 or 공격력",
    sphere: "공격력",
    rope: "공격력"
  },
  subStats: ["치명타 확률", "공격력", "치명타 피해", "속도"],
  targetStats: [
    { label: "공격력", value: "3500+" },
    { label: "속도", value: "134+" },
    { label: "치명타 확률", value: "100% 이하" }
  ],
  skillPriority: ["필살기", "전투 스킬", "특성", "일반 공격"],
  eidolonEfficiency: []
};
