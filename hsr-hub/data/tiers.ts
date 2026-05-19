export interface TierCharacter {
  id: string;
  name: string;
  folderName: string;
  role: string;
  change?: 'up' | 'down' | 'new' | 'stay';
  displayOrder?: number;
  isTrailblazer?: boolean;
}

export interface TierCategory {
  id: string;
  name: string;
  description: string;
}

export interface TierGroup {
  tier: string;
  label: string;
  color: string;
  characters: TierCharacter[];
}

export interface TierChangeLog {
  name: string;
  type: 'new' | 'up' | 'down' | 'stay' | 'rework';
  description: string;
}


export const HSR_TIER_CATEGORIES: TierCategory[] = [
  { id: 'chaos', name: '혼돈 12층', description: '와류 반영 O' },
  { id: 'fiction', name: '허구 이야기', description: '범위 공격 메타' },
  { id: 'shadow', name: '종말', description: '종말의 환영' },
  { id: 'divergent', name: '이상 중재', description: '차분화 우주' },
];

export const HSR_TIER_DATA: Record<string, TierGroup[]> = {
  "chaos": [
    {
      "tier": "E",
      "label": "E",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_개척자 (환락)",
          "name": "개척자 (환락)",
          "folderName": "개척자 (환락)",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100,
          "isTrailblazer": true
        },
        {
          "id": "char_에바네시아",
          "name": "에바네시아",
          "folderName": "에바네시아",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100
        },
        {
          "id": "char_경류",
          "name": "경류",
          "folderName": "경류",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_운리",
          "name": "운리",
          "folderName": "운리",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경원",
          "name": "경원",
          "folderName": "경원",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_브로냐",
          "name": "브로냐",
          "folderName": "브로냐",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_정운",
          "name": "정운",
          "folderName": "정운",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th (수렵)",
          "name": "Mar. 7th (수렵)",
          "folderName": "Mar. 7th (수렵)",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히메코",
          "name": "히메코",
          "folderName": "히메코",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_토파즈 & 복순이",
          "name": "토파즈 & 복순이",
          "folderName": "토파즈 & 복순이",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_Dr. 레이시오",
          "name": "Dr. 레이시오",
          "folderName": "Dr. 레이시오",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•음월",
          "name": "단항•음월",
          "folderName": "단항•음월",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아젠티",
          "name": "아젠티",
          "folderName": "아젠티",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_미샤",
          "name": "미샤",
          "folderName": "미샤",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_설의",
          "name": "설의",
          "folderName": "설의",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_한아",
          "name": "한아",
          "folderName": "한아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_계네빈",
          "name": "계네빈",
          "folderName": "계네빈",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_링스",
          "name": "링스",
          "folderName": "링스",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_루카",
          "name": "루카",
          "folderName": "루카",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어공",
          "name": "어공",
          "folderName": "어공",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_게파드",
          "name": "게파드",
          "folderName": "게파드",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_클라라",
          "name": "클라라",
          "folderName": "클라라",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_연경",
          "name": "연경",
          "folderName": "연경",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_백로",
          "name": "백로",
          "folderName": "백로",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th",
          "name": "Mar. 7th",
          "folderName": "Mar. 7th",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항",
          "name": "단항",
          "folderName": "단항",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아스타",
          "name": "아스타",
          "folderName": "아스타",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아를란",
          "name": "아를란",
          "folderName": "아를란",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_헤르타",
          "name": "헤르타",
          "folderName": "헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나타샤",
          "name": "나타샤",
          "folderName": "나타샤",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_삼포",
          "name": "삼포",
          "folderName": "삼포",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_후크",
          "name": "후크",
          "folderName": "후크",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_서벌",
          "name": "서벌",
          "folderName": "서벌",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_청작",
          "name": "청작",
          "folderName": "청작",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_소상",
          "name": "소상",
          "folderName": "소상",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        {
          "id": "char_스파키",
          "name": "스파키",
          "folderName": "스파키",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_은랑 LV.999",
          "name": "은랑 LV.999",
          "folderName": "은랑 LV.999",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100
        },
        {
          "id": "char_효광",
          "name": "효광",
          "folderName": "효광",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (기억)",
          "name": "개척자 (기억)",
          "folderName": "개척자 (기억)",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        {
          "id": "char_곽향",
          "name": "곽향",
          "folderName": "곽향",
          "role": "유지력",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_반디",
          "name": "반디",
          "folderName": "반디",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_에버나이트",
          "name": "에버나이트",
          "folderName": "에버나이트",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_애쉬베일",
          "name": "애쉬베일",
          "folderName": "애쉬베일",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카스토리스",
          "name": "카스토리스",
          "folderName": "카스토리스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_키레네",
          "name": "키레네",
          "folderName": "키레네",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히아킨",
          "name": "히아킨",
          "folderName": "히아킨",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히실렌스",
          "name": "히실렌스",
          "folderName": "히실렌스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        {
          "id": "char_달리아",
          "name": "달리아",
          "folderName": "달리아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아처",
          "name": "아처",
          "folderName": "아처",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_트리비",
          "name": "트리비",
          "folderName": "트리비",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_스파클",
          "name": "스파클",
          "folderName": "스파클",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•등황",
          "name": "단항•등황",
          "folderName": "단항•등황",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        {
          "id": "char_웰트",
          "name": "웰트",
          "folderName": "웰트",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_아낙사",
          "name": "아낙사",
          "folderName": "아낙사",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카프카",
          "name": "카프카",
          "folderName": "카프카",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블랙 스완",
          "name": "블랙 스완",
          "folderName": "블랙 스완",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_케리드라",
          "name": "케리드라",
          "folderName": "케리드라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_망귀인",
          "name": "망귀인",
          "folderName": "망귀인",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_제레",
          "name": "제레",
          "folderName": "제레",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        {
          "id": "char_파이논",
          "name": "파이논",
          "folderName": "파이논",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_사이퍼",
          "name": "사이퍼",
          "folderName": "사이퍼",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_선데이",
          "name": "선데이",
          "folderName": "선데이",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_완•매",
          "name": "완•매",
          "folderName": "완•매",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_영사",
          "name": "영사",
          "folderName": "영사",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부현",
          "name": "부현",
          "folderName": "부현",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        {
          "id": "char_마이데이",
          "name": "마이데이",
          "folderName": "마이데이",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아글라이아",
          "name": "아글라이아",
          "folderName": "아글라이아",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_은랑",
          "name": "은랑",
          "folderName": "은랑",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (화합)",
          "name": "개척자 (화합)",
          "folderName": "개척자 (화합)",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어벤츄린",
          "name": "어벤츄린",
          "folderName": "어벤츄린",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_갤러거",
          "name": "갤러거",
          "folderName": "갤러거",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        {
          "id": "char_라파",
          "name": "라파",
          "folderName": "라파",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부트힐",
          "name": "부트힐",
          "folderName": "부트힐",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_더 헤르타",
          "name": "더 헤르타",
          "folderName": "더 헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_세이버",
          "name": "세이버",
          "folderName": "세이버",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_로빈",
          "name": "로빈",
          "folderName": "로빈",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나찰",
          "name": "나찰",
          "folderName": "나찰",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        {
          "id": "char_비소",
          "name": "비소",
          "folderName": "비소",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아케론",
          "name": "아케론",
          "folderName": "아케론",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_제이드",
          "name": "제이드",
          "folderName": "제이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블레이드",
          "name": "블레이드",
          "folderName": "블레이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_초구",
          "name": "초구",
          "folderName": "초구",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_페라",
          "name": "페라",
          "folderName": "페라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_맥택",
          "name": "맥택",
          "folderName": "맥택",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    }
  ],
  "fiction": [
    {
      "tier": "F",
      "label": "F",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_삼포",
          "name": "삼포",
          "folderName": "삼포",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_비소",
          "name": "비소",
          "folderName": "비소",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_맥택",
          "name": "맥택",
          "folderName": "맥택",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th (수렵)",
          "name": "Mar. 7th (수렵)",
          "folderName": "Mar. 7th (수렵)",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부트힐",
          "name": "부트힐",
          "folderName": "부트힐",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_미샤",
          "name": "미샤",
          "folderName": "미샤",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Dr. 레이시오",
          "name": "Dr. 레이시오",
          "folderName": "Dr. 레이시오",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_설의",
          "name": "설의",
          "folderName": "설의",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_한아",
          "name": "한아",
          "folderName": "한아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_토파즈 & 복순이",
          "name": "토파즈 & 복순이",
          "folderName": "토파즈 & 복순이",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_링스",
          "name": "링스",
          "folderName": "링스",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•음월",
          "name": "단항•음월",
          "folderName": "단항•음월",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_루카",
          "name": "루카",
          "folderName": "루카",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어공",
          "name": "어공",
          "folderName": "어공",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아를란",
          "name": "아를란",
          "folderName": "아를란",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항",
          "name": "단항",
          "folderName": "단항",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_후크",
          "name": "후크",
          "folderName": "후크",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_청작",
          "name": "청작",
          "folderName": "청작",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_소상",
          "name": "소상",
          "folderName": "소상",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (파멸)",
          "name": "개척자 (파멸)",
          "folderName": "개척자 (파멸)",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_연경",
          "name": "연경",
          "folderName": "연경",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아스타",
          "name": "아스타",
          "folderName": "아스타",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th",
          "name": "Mar. 7th",
          "folderName": "Mar. 7th",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나타샤",
          "name": "나타샤",
          "folderName": "나타샤",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (보존)",
          "name": "개척자 (보존)",
          "folderName": "개척자 (보존)",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "E",
      "label": "E",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_아처",
          "name": "아처",
          "folderName": "아처",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_계네빈",
          "name": "계네빈",
          "folderName": "계네빈",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_클라라",
          "name": "클라라",
          "folderName": "클라라",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_백로",
          "name": "백로",
          "folderName": "백로",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_게파드",
          "name": "게파드",
          "folderName": "게파드",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        {
          "id": "char_은랑 LV.999",
          "name": "은랑 LV.999",
          "folderName": "은랑 LV.999",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100
        },
        {
          "id": "char_스파키",
          "name": "스파키",
          "folderName": "스파키",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_효광",
          "name": "효광",
          "folderName": "효광",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (기억)",
          "name": "개척자 (기억)",
          "folderName": "개척자 (기억)",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        {
          "id": "char_반디",
          "name": "반디",
          "folderName": "반디",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_곽향",
          "name": "곽향",
          "folderName": "곽향",
          "role": "유지력",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_카스토리스",
          "name": "카스토리스",
          "folderName": "카스토리스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히실렌스",
          "name": "히실렌스",
          "folderName": "히실렌스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_에버나이트",
          "name": "에버나이트",
          "folderName": "에버나이트",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_키레네",
          "name": "키레네",
          "folderName": "키레네",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히아킨",
          "name": "히아킨",
          "folderName": "히아킨",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카프카",
          "name": "카프카",
          "folderName": "카프카",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        {
          "id": "char_아낙사",
          "name": "아낙사",
          "folderName": "아낙사",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_트리비",
          "name": "트리비",
          "folderName": "트리비",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•등황",
          "name": "단항•등황",
          "folderName": "단항•등황",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_스파클",
          "name": "스파클",
          "folderName": "스파클",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블랙 스완",
          "name": "블랙 스완",
          "folderName": "블랙 스완",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        {
          "id": "char_영사",
          "name": "영사",
          "folderName": "영사",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_제이드",
          "name": "제이드",
          "folderName": "제이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_헤르타",
          "name": "헤르타",
          "folderName": "헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_웰트",
          "name": "웰트",
          "folderName": "웰트",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_달리아",
          "name": "달리아",
          "folderName": "달리아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_애쉬베일",
          "name": "애쉬베일",
          "folderName": "애쉬베일",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_더 헤르타",
          "name": "더 헤르타",
          "folderName": "더 헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_라파",
          "name": "라파",
          "folderName": "라파",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        {
          "id": "char_마이데이",
          "name": "마이데이",
          "folderName": "마이데이",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_파이논",
          "name": "파이논",
          "folderName": "파이논",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_사이퍼",
          "name": "사이퍼",
          "folderName": "사이퍼",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_케리드라",
          "name": "케리드라",
          "folderName": "케리드라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_갤러거",
          "name": "갤러거",
          "folderName": "갤러거",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_완•매",
          "name": "완•매",
          "folderName": "완•매",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아젠티",
          "name": "아젠티",
          "folderName": "아젠티",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_제레",
          "name": "제레",
          "folderName": "제레",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        {
          "id": "char_망귀인",
          "name": "망귀인",
          "folderName": "망귀인",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아글라이아",
          "name": "아글라이아",
          "folderName": "아글라이아",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_선데이",
          "name": "선데이",
          "folderName": "선데이",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_로빈",
          "name": "로빈",
          "folderName": "로빈",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아케론",
          "name": "아케론",
          "folderName": "아케론",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어벤츄린",
          "name": "어벤츄린",
          "folderName": "어벤츄린",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부현",
          "name": "부현",
          "folderName": "부현",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        {
          "id": "char_초구",
          "name": "초구",
          "folderName": "초구",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (화합)",
          "name": "개척자 (화합)",
          "folderName": "개척자 (화합)",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블레이드",
          "name": "블레이드",
          "folderName": "블레이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_은랑",
          "name": "은랑",
          "folderName": "은랑",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나찰",
          "name": "나찰",
          "folderName": "나찰",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히메코",
          "name": "히메코",
          "folderName": "히메코",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_서벌",
          "name": "서벌",
          "folderName": "서벌",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        {
          "id": "char_세이버",
          "name": "세이버",
          "folderName": "세이버",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_운리",
          "name": "운리",
          "folderName": "운리",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경류",
          "name": "경류",
          "folderName": "경류",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경원",
          "name": "경원",
          "folderName": "경원",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_브로냐",
          "name": "브로냐",
          "folderName": "브로냐",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_정운",
          "name": "정운",
          "folderName": "정운",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_페라",
          "name": "페라",
          "folderName": "페라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    }
  ],
  "shadow": [
    {
      "tier": "E",
      "label": "E",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_경류",
          "name": "경류",
          "folderName": "경류",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_운리",
          "name": "운리",
          "folderName": "운리",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경원",
          "name": "경원",
          "folderName": "경원",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_브로냐",
          "name": "브로냐",
          "folderName": "브로냐",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th (수렵)",
          "name": "Mar. 7th (수렵)",
          "folderName": "Mar. 7th (수렵)",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히메코",
          "name": "히메코",
          "folderName": "히메코",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_토파즈 & 복순이",
          "name": "토파즈 & 복순이",
          "folderName": "토파즈 & 복순이",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블레이드",
          "name": "블레이드",
          "folderName": "블레이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_페라",
          "name": "페라",
          "folderName": "페라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_맥택",
          "name": "맥택",
          "folderName": "맥택",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Dr. 레이시오",
          "name": "Dr. 레이시오",
          "folderName": "Dr. 레이시오",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•음월",
          "name": "단항•음월",
          "folderName": "단항•음월",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아젠티",
          "name": "아젠티",
          "folderName": "아젠티",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_미샤",
          "name": "미샤",
          "folderName": "미샤",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_설의",
          "name": "설의",
          "folderName": "설의",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_한아",
          "name": "한아",
          "folderName": "한아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_계네빈",
          "name": "계네빈",
          "folderName": "계네빈",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_링스",
          "name": "링스",
          "folderName": "링스",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_루카",
          "name": "루카",
          "folderName": "루카",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어공",
          "name": "어공",
          "folderName": "어공",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_게파드",
          "name": "게파드",
          "folderName": "게파드",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_클라라",
          "name": "클라라",
          "folderName": "클라라",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_연경",
          "name": "연경",
          "folderName": "연경",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_백로",
          "name": "백로",
          "folderName": "백로",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (파멸)",
          "name": "개척자 (파멸)",
          "folderName": "개척자 (파멸)",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (보존)",
          "name": "개척자 (보존)",
          "folderName": "개척자 (보존)",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th",
          "name": "Mar. 7th",
          "folderName": "Mar. 7th",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항",
          "name": "단항",
          "folderName": "단항",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아스타",
          "name": "아스타",
          "folderName": "아스타",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아를란",
          "name": "아를란",
          "folderName": "아를란",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_헤르타",
          "name": "헤르타",
          "folderName": "헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나타샤",
          "name": "나타샤",
          "folderName": "나타샤",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_삼포",
          "name": "삼포",
          "folderName": "삼포",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_후크",
          "name": "후크",
          "folderName": "후크",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_서벌",
          "name": "서벌",
          "folderName": "서벌",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_청작",
          "name": "청작",
          "folderName": "청작",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_소상",
          "name": "소상",
          "folderName": "소상",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        {
          "id": "char_곽향",
          "name": "곽향",
          "folderName": "곽향",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히아킨",
          "name": "히아킨",
          "folderName": "히아킨",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•등황",
          "name": "단항•등황",
          "folderName": "단항•등황",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_키레네",
          "name": "키레네",
          "folderName": "키레네",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카스토리스",
          "name": "카스토리스",
          "folderName": "카스토리스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_에버나이트",
          "name": "에버나이트",
          "folderName": "에버나이트",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (기억)",
          "name": "개척자 (기억)",
          "folderName": "개척자 (기억)",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_효광",
          "name": "효광",
          "folderName": "효광",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_은랑 LV.999",
          "name": "은랑 LV.999",
          "folderName": "은랑 LV.999",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100
        },
        {
          "id": "char_스파키",
          "name": "스파키",
          "folderName": "스파키",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        {
          "id": "char_블랙 스완",
          "name": "블랙 스완",
          "folderName": "블랙 스완",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_망귀인",
          "name": "망귀인",
          "folderName": "망귀인",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_달리아",
          "name": "달리아",
          "folderName": "달리아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카프카",
          "name": "카프카",
          "folderName": "카프카",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_애쉬베일",
          "name": "애쉬베일",
          "folderName": "애쉬베일",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히실렌스",
          "name": "히실렌스",
          "folderName": "히실렌스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_케리드라",
          "name": "케리드라",
          "folderName": "케리드라",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_아처",
          "name": "아처",
          "folderName": "아처",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_반디",
          "name": "반디",
          "folderName": "반디",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        {
          "id": "char_로빈",
          "name": "로빈",
          "folderName": "로빈",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_사이퍼",
          "name": "사이퍼",
          "folderName": "사이퍼",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_완•매",
          "name": "완•매",
          "folderName": "완•매",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아낙사",
          "name": "아낙사",
          "folderName": "아낙사",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_트리비",
          "name": "트리비",
          "folderName": "트리비",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_스파클",
          "name": "스파클",
          "folderName": "스파클",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_선데이",
          "name": "선데이",
          "folderName": "선데이",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        {
          "id": "char_아글라이아",
          "name": "아글라이아",
          "folderName": "아글라이아",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_마이데이",
          "name": "마이데이",
          "folderName": "마이데이",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_영사",
          "name": "영사",
          "folderName": "영사",
          "role": "유지력",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_파이논",
          "name": "파이논",
          "folderName": "파이논",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        {
          "id": "char_갤러거",
          "name": "갤러거",
          "folderName": "갤러거",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_더 헤르타",
          "name": "더 헤르타",
          "folderName": "더 헤르타",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_웰트",
          "name": "웰트",
          "folderName": "웰트",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_제레",
          "name": "제레",
          "folderName": "제레",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        {
          "id": "char_어벤츄린",
          "name": "어벤츄린",
          "folderName": "어벤츄린",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (화합)",
          "name": "개척자 (화합)",
          "folderName": "개척자 (화합)",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_비소",
          "name": "비소",
          "folderName": "비소",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_아케론",
          "name": "아케론",
          "folderName": "아케론",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        {
          "id": "char_제이드",
          "name": "제이드",
          "folderName": "제이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부트힐",
          "name": "부트힐",
          "folderName": "부트힐",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_정운",
          "name": "정운",
          "folderName": "정운",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_라파",
          "name": "라파",
          "folderName": "라파",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_세이버",
          "name": "세이버",
          "folderName": "세이버",
          "role": "메인 딜러",
          "change": "down",
          "displayOrder": 100
        },
        {
          "id": "char_은랑",
          "name": "은랑",
          "folderName": "은랑",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나찰",
          "name": "나찰",
          "folderName": "나찰",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        {
          "id": "char_초구",
          "name": "초구",
          "folderName": "초구",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부현",
          "name": "부현",
          "folderName": "부현",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    }
  ],
  "divergent": [
    {
      "tier": "E",
      "label": "E",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_블레이드",
          "name": "블레이드",
          "folderName": "블레이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경류",
          "name": "경류",
          "folderName": "경류",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th (수렵)",
          "name": "Mar. 7th (수렵)",
          "folderName": "Mar. 7th (수렵)",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_운리",
          "name": "운리",
          "folderName": "운리",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_정운",
          "name": "정운",
          "folderName": "정운",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_페라",
          "name": "페라",
          "folderName": "페라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#ffffff",
      "characters": [
        {
          "id": "char_Dr. 레이시오",
          "name": "Dr. 레이시오",
          "folderName": "Dr. 레이시오",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•음월",
          "name": "단항•음월",
          "folderName": "단항•음월",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아젠티",
          "name": "아젠티",
          "folderName": "아젠티",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_미샤",
          "name": "미샤",
          "folderName": "미샤",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_설의",
          "name": "설의",
          "folderName": "설의",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_한아",
          "name": "한아",
          "folderName": "한아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_계네빈",
          "name": "계네빈",
          "folderName": "계네빈",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_링스",
          "name": "링스",
          "folderName": "링스",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_루카",
          "name": "루카",
          "folderName": "루카",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어공",
          "name": "어공",
          "folderName": "어공",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_게파드",
          "name": "게파드",
          "folderName": "게파드",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_클라라",
          "name": "클라라",
          "folderName": "클라라",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_연경",
          "name": "연경",
          "folderName": "연경",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_백로",
          "name": "백로",
          "folderName": "백로",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (파멸)",
          "name": "개척자 (파멸)",
          "folderName": "개척자 (파멸)",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (보존)",
          "name": "개척자 (보존)",
          "folderName": "개척자 (보존)",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_Mar. 7th",
          "name": "Mar. 7th",
          "folderName": "Mar. 7th",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항",
          "name": "단항",
          "folderName": "단항",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아스타",
          "name": "아스타",
          "folderName": "아스타",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아를란",
          "name": "아를란",
          "folderName": "아를란",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_헤르타",
          "name": "헤르타",
          "folderName": "헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나타샤",
          "name": "나타샤",
          "folderName": "나타샤",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_삼포",
          "name": "삼포",
          "folderName": "삼포",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_후크",
          "name": "후크",
          "folderName": "후크",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히메코",
          "name": "히메코",
          "folderName": "히메코",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_경원",
          "name": "경원",
          "folderName": "경원",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_서벌",
          "name": "서벌",
          "folderName": "서벌",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_맥택",
          "name": "맥택",
          "folderName": "맥택",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_청작",
          "name": "청작",
          "folderName": "청작",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_소상",
          "name": "소상",
          "folderName": "소상",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        {
          "id": "char_은랑 LV.999",
          "name": "은랑 LV.999",
          "folderName": "은랑 LV.999",
          "role": "메인 딜러",
          "change": "new",
          "displayOrder": 100
        },
        {
          "id": "char_스파키",
          "name": "스파키",
          "folderName": "스파키",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_효광",
          "name": "효광",
          "folderName": "효광",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (기억)",
          "name": "개척자 (기억)",
          "folderName": "개척자 (기억)",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        {
          "id": "char_에버나이트",
          "name": "에버나이트",
          "folderName": "에버나이트",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_카스토리스",
          "name": "카스토리스",
          "folderName": "카스토리스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_키레네",
          "name": "키레네",
          "folderName": "키레네",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히아킨",
          "name": "히아킨",
          "folderName": "히아킨",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_반디",
          "name": "반디",
          "folderName": "반디",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_히실렌스",
          "name": "히실렌스",
          "folderName": "히실렌스",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_곽향",
          "name": "곽향",
          "folderName": "곽향",
          "role": "유지력",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        {
          "id": "char_카프카",
          "name": "카프카",
          "folderName": "카프카",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_달리아",
          "name": "달리아",
          "folderName": "달리아",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_스파클",
          "name": "스파클",
          "folderName": "스파클",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아처",
          "name": "아처",
          "folderName": "아처",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_단항•등황",
          "name": "단항•등황",
          "folderName": "단항•등황",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_트리비",
          "name": "트리비",
          "folderName": "트리비",
          "role": "서포터",
          "change": "down",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        {
          "id": "char_아낙사",
          "name": "아낙사",
          "folderName": "아낙사",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_애쉬베일",
          "name": "애쉬베일",
          "folderName": "애쉬베일",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_파이논",
          "name": "파이논",
          "folderName": "파이논",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_블랙 스완",
          "name": "블랙 스완",
          "folderName": "블랙 스완",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_완•매",
          "name": "완•매",
          "folderName": "완•매",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_케리드라",
          "name": "케리드라",
          "folderName": "케리드라",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        {
          "id": "char_영사",
          "name": "영사",
          "folderName": "영사",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_망귀인",
          "name": "망귀인",
          "folderName": "망귀인",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_선데이",
          "name": "선데이",
          "folderName": "선데이",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_웰트",
          "name": "웰트",
          "folderName": "웰트",
          "role": "서포터",
          "change": "up",
          "displayOrder": 100
        },
        {
          "id": "char_제레",
          "name": "제레",
          "folderName": "제레",
          "role": "메인 딜러",
          "change": "up",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        {
          "id": "char_마이데이",
          "name": "마이데이",
          "folderName": "마이데이",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_아글라이아",
          "name": "아글라이아",
          "folderName": "아글라이아",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_비소",
          "name": "비소",
          "folderName": "비소",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_더 헤르타",
          "name": "더 헤르타",
          "folderName": "더 헤르타",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_개척자 (화합)",
          "name": "개척자 (화합)",
          "folderName": "개척자 (화합)",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_어벤츄린",
          "name": "어벤츄린",
          "folderName": "어벤츄린",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_갤러거",
          "name": "갤러거",
          "folderName": "갤러거",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_로빈",
          "name": "로빈",
          "folderName": "로빈",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        {
          "id": "char_세이버",
          "name": "세이버",
          "folderName": "세이버",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_나찰",
          "name": "나찰",
          "folderName": "나찰",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_은랑",
          "name": "은랑",
          "folderName": "은랑",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_사이퍼",
          "name": "사이퍼",
          "folderName": "사이퍼",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_제이드",
          "name": "제이드",
          "folderName": "제이드",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_브로냐",
          "name": "브로냐",
          "folderName": "브로냐",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        {
          "id": "char_아케론",
          "name": "아케론",
          "folderName": "아케론",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_초구",
          "name": "초구",
          "folderName": "초구",
          "role": "서포터",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부현",
          "name": "부현",
          "folderName": "부현",
          "role": "유지력",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_토파즈 & 복순이",
          "name": "토파즈 & 복순이",
          "folderName": "토파즈 & 복순이",
          "role": "서브 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_라파",
          "name": "라파",
          "folderName": "라파",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        },
        {
          "id": "char_부트힐",
          "name": "부트힐",
          "folderName": "부트힐",
          "role": "메인 딜러",
          "change": "stay",
          "displayOrder": 100
        }
      ]
    }
  ]
};
