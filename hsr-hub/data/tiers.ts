export interface TierCharacter {
  id: string;
  name: string;
  folderName: string;
  isTrailblazer?: boolean;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '유지력';
  change?: 'up' | 'down' | 'new' | 'stay';
}

export interface TierChangeLog {
  name: string;
  type: 'up' | 'down' | 'new' | 'stay';
  description: string;
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

export const HSR_TIER_CATEGORIES: TierCategory[] = [
  { id: 'chaos', name: '혼돈 12층', description: '와류 반영 O' },
  { id: 'fiction', name: '허구 이야기', description: '범위 공격 메타' },
  { id: 'shadow', name: '종말', description: '종말의 환영' },
  { id: 'divergent', name: '이상 중재', description: '차분화 우주' },
];

export const HSR_TIER_DATA: Record<string, TierGroup[]> = {
  'chaos': [
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_스파키", "folderName": "스파키", "role": "메인 딜러", "name": "스파키", "change": "new" },
        { "id": "char_효광", "folderName": "효광", "role": "서포터", "name": "효광", "change": "new" },
        { "id": "char_개척자_기억", "folderName": "개척자 (기억)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (기억)", "change": "up" }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        { "id": "char_에버나이트", "folderName": "에버나이트", "role": "서브 딜러", "name": "에버나이트", "change": "stay" },
        { "id": "char_카스토리스", "folderName": "카스토리스", "role": "메인 딜러", "name": "카스토리스", "change": "stay" },
        { "id": "char_키레네", "folderName": "키레네", "role": "서포터", "name": "키레네", "change": "stay" },
        { "id": "char_히아킨", "folderName": "히아킨", "role": "유지력", "name": "히아킨", "change": "stay" },
        { "id": "char_히실렌스", "folderName": "히실렌스", "role": "메인 딜러", "name": "히실렌스", "change": "stay" }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        { "id": "char_반디", "folderName": "반디", "role": "메인 딜러", "name": "반디", "change": "stay" },
        { "id": "char_달리아", "folderName": "달리아", "role": "서포터", "name": "달리아", "change": "stay" },
        { "id": "char_트리비", "folderName": "트리비", "role": "서포터", "name": "트리비", "change": "stay" },
        { "id": "char_스파클", "folderName": "스파클", "role": "서포터", "name": "스파클", "change": "stay" },
        { "id": "char_아처", "folderName": "아처", "role": "메인 딜러", "name": "아처", "change": "stay" },
        { "id": "char_단항등황", "folderName": "단항•등황", "role": "유지력", "name": "단항•등황", "change": "stay" }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        { "id": "char_아낙사", "folderName": "아낙사", "role": "메인 딜러", "name": "아낙사", "change": "stay" },
        { "id": "char_카프카", "folderName": "카프카", "role": "메인 딜러", "name": "카프카", "change": "stay" },
        { "id": "char_블랙_스완", "folderName": "블랙 스완", "role": "서포터", "name": "블랙 스완", "change": "stay" },
        { "id": "char_케리드라", "folderName": "케리드라", "role": "서포터", "name": "케리드라", "change": "stay" },
        { "id": "char_망귀인", "folderName": "망귀인", "role": "서포터", "name": "망귀인", "change": "stay" },
        { "id": "char_곽향", "folderName": "곽향", "role": "유지력", "name": "곽향", "change": "stay" }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        { "id": "char_파이논", "folderName": "파이논", "role": "메인 딜러", "name": "파이논", "change": "stay" },
        { "id": "char_사이퍼", "folderName": "사이퍼", "role": "서브 딜러", "name": "사이퍼", "change": "stay" },
        { "id": "char_선데이", "folderName": "선데이", "role": "서포터", "name": "선데이", "change": "stay" },
        { "id": "char_완매", "folderName": "완•매", "role": "서포터", "name": "완•매", "change": "stay" },
        { "id": "char_영사", "folderName": "영사", "role": "유지력", "name": "영사", "change": "stay" },
        { "id": "char_부현", "folderName": "부현", "role": "유지력", "name": "부현", "change": "stay" }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        { "id": "char_마이데이", "folderName": "마이데이", "role": "메인 딜러", "name": "마이데이", "change": "stay" },
        { "id": "char_아글라이아", "folderName": "아글라이아", "role": "메인 딜러", "name": "아글라이아", "change": "stay" },
        { "id": "char_은랑", "folderName": "은랑", "role": "서포터", "name": "은랑", "change": "stay" },
        { "id": "char_개척자_화합", "folderName": "개척자 (화합)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (화합)", "change": "stay" },
        { "id": "char_어벤츄린", "folderName": "어벤츄린", "role": "유지력", "name": "어벤츄린", "change": "stay" },
        { "id": "char_갤러거", "folderName": "갤러거", "role": "유지력", "name": "갤러거", "change": "stay" }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        { "id": "char_라파", "folderName": "라파", "role": "메인 딜러", "name": "라파", "change": "stay" },
        { "id": "char_부트힐", "folderName": "부트힐", "role": "메인 딜러", "name": "부트힐", "change": "stay" },
        { "id": "char_더_헤르타", "folderName": "더 헤르타", "role": "메인 딜러", "name": "더 헤르타", "change": "stay" },
        { "id": "char_세이버", "folderName": "세이버", "role": "메인 딜러", "name": "세이버", "change": "stay" },
        { "id": "char_로빈", "folderName": "로빈", "role": "서포터", "name": "로빈", "change": "stay" },
        { "id": "char_나찰", "folderName": "나찰", "role": "유지력", "name": "나찰", "change": "stay" }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        { "id": "char_비소", "folderName": "비소", "role": "메인 딜러", "name": "비소", "change": "stay" },
        { "id": "char_아케론", "folderName": "아케론", "role": "메인 딜러", "name": "아케론", "change": "stay" },
        { "id": "char_제이드", "folderName": "제이드", "role": "메인 딜러", "name": "제이드", "change": "stay" },
        { "id": "char_블레이드", "folderName": "블레이드", "role": "메인 딜러", "name": "블레이드", "change": "stay" },
        { "id": "char_초구", "folderName": "초구", "role": "서포터", "name": "초구", "change": "stay" },
        { "id": "char_페라", "folderName": "페라", "role": "서포터", "name": "페라", "change": "stay" },
        { "id": "char_맥택", "folderName": "맥택", "role": "서브 딜러", "name": "맥택", "change": "stay" }
      ]
    },
    {
      "tier": "E",
      "label": "E",
      "color": "#2d3436",
      "characters": [
        { "id": "char_경류", "folderName": "경류", "role": "메인 딜러", "name": "경류", "change": "stay" },
        { "id": "char_운리", "folderName": "운리", "role": "메인 딜러", "name": "운리", "change": "stay" },
        { "id": "char_경원", "folderName": "경원", "role": "메인 딜러", "name": "경원", "change": "stay" },
        { "id": "char_브로냐", "folderName": "브로냐", "role": "서포터", "name": "브로냐", "change": "stay" },
        { "id": "char_정운", "folderName": "정운", "role": "서포터", "name": "정운", "change": "stay" },
        { "id": "char_Mar_7th_Hunt", "folderName": "Mar. 7th (수렵)", "role": "서브 딜러", "name": "Mar. 7th (수렵)", "change": "stay" },
        { "id": "char_히메코", "folderName": "히메코", "role": "메인 딜러", "name": "히메코", "change": "stay" },
        { "id": "char_토파즈_복순이", "folderName": "토파즈 & 복순이", "role": "서브 딜러", "name": "토파즈 & 복순이", "change": "stay" }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#1e272e",
      "characters": [
        { "id": "char_Dr_레이시오", "folderName": "Dr. 레이시오", "role": "메인 딜러", "name": "Dr. 레이시오", "change": "stay" },
        { "id": "char_단항음월", "folderName": "단항•음월", "role": "메인 딜러", "name": "단항•음월", "change": "stay" },
        { "id": "char_아젠티", "folderName": "아젠티", "role": "메인 딜러", "name": "아젠티", "change": "stay" },
        { "id": "char_미샤", "folderName": "미샤", "role": "메인 딜러", "name": "미샤", "change": "stay" },
        { "id": "char_설의", "folderName": "설의", "role": "메인 딜러", "name": "설의", "change": "stay" },
        { "id": "char_한아", "folderName": "한아", "role": "서포터", "name": "한아", "change": "stay" },
        { "id": "char_계네빈", "folderName": "계네빈", "role": "서브 딜러", "name": "계네빈", "change": "stay" },
        { "id": "char_링스", "folderName": "링스", "role": "유지력", "name": "링스", "change": "stay" },
        { "id": "char_루카", "folderName": "루카", "role": "서브 딜러", "name": "루카", "change": "stay" },
        { "id": "char_어공", "folderName": "어공", "role": "서포터", "name": "어공", "change": "stay" },
        { "id": "char_제레", "folderName": "제레", "role": "메인 딜러", "name": "제레", "change": "stay" },
        { "id": "char_게파드", "folderName": "게파드", "role": "유지력", "name": "게파드", "change": "stay" },
        { "id": "char_웰트", "folderName": "웰트", "role": "서포터", "name": "웰트", "change": "stay" },
        { "id": "char_클라라", "folderName": "클라라", "role": "메인 딜러", "name": "클라라", "change": "stay" },
        { "id": "char_연경", "folderName": "연경", "role": "메인 딜러", "name": "연경", "change": "stay" },
        { "id": "char_백로", "folderName": "백로", "role": "유지력", "name": "백로", "change": "stay" },
        { "id": "char_개척자_파멸", "folderName": "개척자 (파멸)", "role": "메인 딜러", "isTrailblazer": true, "name": "개척자 (파멸)", "change": "stay" },
        { "id": "char_개척자_보존", "folderName": "개척자 (보존)", "role": "유지력", "isTrailblazer": true, "name": "개척자 (보존)", "change": "stay" },
        { "id": "char_Mar_7th", "folderName": "Mar. 7th", "role": "유지력", "name": "Mar. 7th", "change": "stay" },
        { "id": "char_단항", "folderName": "단항", "role": "메인 딜러", "name": "단항", "change": "stay" },
        { "id": "char_아스타", "folderName": "아스타", "role": "서포터", "name": "아스타", "change": "stay" },
        { "id": "char_아를란", "folderName": "아를란", "role": "메인 딜러", "name": "아를란", "change": "stay" },
        { "id": "char_헤르타", "folderName": "헤르타", "role": "메인 딜러", "name": "헤르타", "change": "stay" },
        { "id": "char_나타샤", "folderName": "나타샤", "role": "유지력", "name": "나타샤", "change": "stay" },
        { "id": "char_삼포", "folderName": "삼포", "role": "서브 딜러", "name": "삼포", "change": "stay" },
        { "id": "char_후크", "folderName": "후크", "role": "메인 딜러", "name": "후크", "change": "stay" },
        { "id": "char_서벌", "folderName": "서벌", "role": "서브 딜러", "name": "서벌", "change": "stay" },
        { "id": "char_청작", "folderName": "청작", "role": "메인 딜러", "name": "청작", "change": "stay" },
        { "id": "char_소상", "folderName": "소상", "role": "메인 딜러", "name": "소상", "change": "stay" }
      ]
    }
  ],
  'fiction': [
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_스파키", "folderName": "스파키", "role": "메인 딜러", "name": "스파키", "change": "stay" },
        { "id": "char_효광", "folderName": "효광", "role": "서포터", "name": "효광", "change": "stay" },
        { "id": "char_개척자_기억", "folderName": "개척자 (기억)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (기억)", "change": "stay" }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        { "id": "char_카스토리스", "folderName": "카스토리스", "role": "메인 딜러", "name": "카스토리스", "change": "stay" },
        { "id": "char_히실렌스", "folderName": "히실렌스", "role": "메인 딜러", "name": "히실렌스", "change": "stay" },
        { "id": "char_에버나이트", "folderName": "에버나이트", "role": "서브 딜러", "name": "에버나이트", "change": "stay" },
        { "id": "char_키레네", "folderName": "키레네", "role": "서포터", "name": "키레네", "change": "stay" },
        { "id": "char_히아킨", "folderName": "히아킨", "role": "유지력", "name": "히아킨", "change": "stay" },
        { "id": "char_카프카", "folderName": "카프카", "role": "메인 딜러", "name": "카프카", "change": "stay" }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        { "id": "char_아낙사", "folderName": "아낙사", "role": "메인 딜러", "name": "아낙사", "change": "stay" },
        { "id": "char_트리비", "folderName": "트리비", "role": "서포터", "name": "트리비", "change": "stay" },
        { "id": "char_단항등황", "folderName": "단항•등황", "role": "유지력", "name": "단항•등황", "change": "stay" },
        { "id": "char_스파클", "folderName": "스파클", "role": "서포터", "name": "스파클", "change": "stay" },
        { "id": "char_블랙_스완", "folderName": "블랙 스완", "role": "서포터", "name": "블랙 스완", "change": "stay" },
        { "id": "char_곽향", "folderName": "곽향", "role": "유지력", "name": "곽향", "change": "stay" }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        { "id": "char_달리아", "folderName": "달리아", "role": "서포터", "name": "달리아", "change": "stay" },
        { "id": "char_더_헤르타", "folderName": "더 헤르타", "role": "메인 딜러", "name": "더 헤르타", "change": "stay" },
        { "id": "char_라파", "folderName": "라파", "role": "메인 딜러", "name": "라파", "change": "stay" },
        { "id": "char_영사", "folderName": "영사", "role": "유지력", "name": "영사", "change": "stay" },
        { "id": "char_제이드", "folderName": "제이드", "role": "메인 딜러", "name": "제이드", "change": "stay" },
        { "id": "char_헤르타", "folderName": "헤르타", "role": "메인 딜러", "name": "헤르타", "change": "stay" }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        { "id": "char_마이데이", "folderName": "마이데이", "role": "메인 딜러", "name": "마이데이", "change": "stay" },
        { "id": "char_파이논", "folderName": "파이논", "role": "메인 딜러", "name": "파이논", "change": "stay" },
        { "id": "char_사이퍼", "folderName": "사이퍼", "role": "서브 딜러", "name": "사이퍼", "change": "stay" },
        { "id": "char_케리드라", "folderName": "케리드라", "role": "서포터", "name": "케리드라", "change": "stay" },
        { "id": "char_반디", "folderName": "반디", "role": "메인 딜러", "name": "반디", "change": "stay" },
        { "id": "char_갤러거", "folderName": "갤러거", "role": "유지력", "name": "갤러거", "change": "stay" },
        { "id": "char_완매", "folderName": "완•매", "role": "서포터", "name": "완•매", "change": "stay" },
        { "id": "char_아젠티", "folderName": "아젠티", "role": "메인 딜러", "name": "아젠티", "change": "stay" }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        { "id": "char_망귀인", "folderName": "망귀인", "role": "서포터", "name": "망귀인", "change": "stay" },
        { "id": "char_아글라이아", "folderName": "아글라이아", "role": "메인 딜러", "name": "아글라이아", "change": "stay" },
        { "id": "char_선데이", "folderName": "선데이", "role": "서포터", "name": "선데이", "change": "stay" },
        { "id": "char_로빈", "folderName": "로빈", "role": "서포터", "name": "로빈", "change": "stay" },
        { "id": "char_아케론", "folderName": "아케론", "role": "메인 딜러", "name": "아케론", "change": "stay" },
        { "id": "char_어벤츄린", "folderName": "어벤츄린", "role": "유지력", "name": "어벤츄린", "change": "stay" },
        { "id": "char_부현", "folderName": "부현", "role": "유지력", "name": "부현", "change": "stay" }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        { "id": "char_초구", "folderName": "초구", "role": "서포터", "name": "초구", "change": "stay" },
        { "id": "char_개척자_화합", "folderName": "개척자 (화합)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (화합)", "change": "stay" },
        { "id": "char_블레이드", "folderName": "블레이드", "role": "메인 딜러", "name": "블레이드", "change": "stay" },
        { "id": "char_은랑", "folderName": "은랑", "role": "서포터", "name": "은랑", "change": "stay" },
        { "id": "char_나찰", "folderName": "나찰", "role": "유지력", "name": "나찰", "change": "stay" },
        { "id": "char_히메코", "folderName": "히메코", "role": "메인 딜러", "name": "히메코", "change": "stay" },
        { "id": "char_서벌", "folderName": "서벌", "role": "서브 딜러", "name": "서벌", "change": "stay" }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        { "id": "char_세이버", "folderName": "세이버", "role": "메인 딜러", "name": "세이버", "change": "stay" },
        { "id": "char_운리", "folderName": "운리", "role": "메인 딜러", "name": "운리", "change": "stay" },
        { "id": "char_경류", "folderName": "경류", "role": "메인 딜러", "name": "경류", "change": "stay" },
        { "id": "char_경원", "folderName": "경원", "role": "메인 딜러", "name": "경원", "change": "stay" },
        { "id": "char_브로냐", "folderName": "브로냐", "role": "서포터", "name": "브로냐", "change": "stay" },
        { "id": "char_정운", "folderName": "정운", "role": "서포터", "name": "정운", "change": "stay" },
        { "id": "char_페라", "folderName": "페라", "role": "서포터", "name": "페라", "change": "stay" }
      ]
    },
    {
      "tier": "E",
      "label": "E",
      "color": "#2d3436",
      "characters": [
        { "id": "char_아처", "folderName": "아처", "role": "메인 딜러", "name": "아처", "change": "stay" },
        { "id": "char_계네빈", "folderName": "계네빈", "role": "서브 딜러", "name": "계네빈", "change": "stay" },
        { "id": "char_클라라", "folderName": "클라라", "role": "메인 딜러", "name": "클라라", "change": "stay" },
        { "id": "char_백로", "folderName": "백로", "role": "유지력", "name": "백로", "change": "stay" },
        { "id": "char_게파드", "folderName": "게파드", "role": "유지력", "name": "게파드", "change": "stay" }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#1e272e",
      "characters": [
        { "id": "char_비소", "folderName": "비소", "role": "메인 딜러", "name": "비소", "change": "stay" },
        { "id": "char_맥택", "folderName": "맥택", "role": "서브 딜러", "name": "맥택", "change": "stay" },
        { "id": "char_Mar_7th_Hunt", "folderName": "Mar. 7th (수렵)", "role": "서브 딜러", "name": "Mar. 7th (수렵)", "change": "stay" },
        { "id": "char_부트힐", "folderName": "부트힐", "role": "메인 딜러", "name": "부트힐", "change": "stay" },
        { "id": "char_미샤", "folderName": "미샤", "role": "메인 딜러", "name": "미샤", "change": "stay" },
        { "id": "char_Dr_레이시오", "folderName": "Dr. 레이시오", "role": "메인 딜러", "name": "Dr. 레이시오", "change": "stay" },
        { "id": "char_설의", "folderName": "설의", "role": "메인 딜러", "name": "설의", "change": "stay" },
        { "id": "char_한아", "folderName": "한아", "role": "서포터", "name": "한아", "change": "stay" },
        { "id": "char_토파즈_복순이", "folderName": "토파즈 & 복순이", "role": "서브 딜러", "name": "토파즈 & 복순이", "change": "stay" },
        { "id": "char_링스", "folderName": "링스", "role": "유지력", "name": "링스", "change": "stay" },
        { "id": "char_단항음월", "folderName": "단항•음월", "role": "메인 딜러", "name": "단항•음월", "change": "stay" },
        { "id": "char_루카", "folderName": "루카", "role": "서브 딜러", "name": "루카", "change": "stay" },
        { "id": "char_어공", "folderName": "어공", "role": "서포터", "name": "어공", "change": "stay" },
        { "id": "char_아를란", "folderName": "아를란", "role": "메인 딜러", "name": "아를란", "change": "stay" },
        { "id": "char_단항", "folderName": "단항", "role": "메인 딜러", "name": "단항", "change": "stay" },
        { "id": "char_후크", "folderName": "후크", "role": "메인 딜러", "name": "후크", "change": "stay" },
        { "id": "char_청작", "folderName": "청작", "role": "메인 딜러", "name": "청작", "change": "stay" },
        { "id": "char_제레", "folderName": "제레", "role": "메인 딜러", "name": "제레", "change": "stay" },
        { "id": "char_소상", "folderName": "소상", "role": "메인 딜러", "name": "소상", "change": "stay" },
        { "id": "char_개척자_파멸", "folderName": "개척자 (파멸)", "role": "메인 딜러", "isTrailblazer": true, "name": "개척자 (파멸)", "change": "stay" },
        { "id": "char_연경", "folderName": "연경", "role": "메인 딜러", "name": "연경", "change": "stay" },
        { "id": "char_삼포", "folderName": "삼포", "role": "서브 딜러", "name": "삼포", "change": "stay" },
        { "id": "char_웰트", "folderName": "웰트", "role": "서포터", "name": "웰트", "change": "stay" },
        { "id": "char_아스타", "folderName": "아스타", "role": "서포터", "name": "아스타", "change": "stay" },
        { "id": "char_Mar_7th", "folderName": "Mar. 7th", "role": "유지력", "name": "Mar. 7th", "change": "stay" },
        { "id": "char_나타샤", "folderName": "나타샤", "role": "유지력", "name": "나타샤", "change": "stay" },
        { "id": "char_개척자_보존", "folderName": "개척자 (보존)", "role": "유지력", "isTrailblazer": true, "name": "개척자 (보존)", "change": "stay" }
      ]
    }
  ],
  'shadow': [
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_곽향", "folderName": "곽향", "role": "유지력", "name": "곽향", "change": "stay" },
        { "id": "char_히아킨", "folderName": "히아킨", "role": "유지력", "name": "히아킨", "change": "stay" },
        { "id": "char_단항등황", "folderName": "단항•등황", "role": "유지력", "name": "단항•등황", "change": "stay" },
        { "id": "char_트리비", "folderName": "트리비", "role": "서포터", "name": "트리비", "change": "stay" },
        { "id": "char_케리드라", "folderName": "케리드라", "role": "서포터", "name": "케리드라", "change": "stay" },
        { "id": "char_키레네", "folderName": "키레네", "role": "서포터", "name": "키레네", "change": "stay" },
        { "id": "char_반디", "folderName": "반디", "role": "메인 딜러", "name": "반디", "change": "stay" },
        { "id": "char_카스토리스", "folderName": "카스토리스", "role": "메인 딜러", "name": "카스토리스", "change": "stay" },
        { "id": "char_아낙사", "folderName": "아낙사", "role": "메인 딜러", "name": "아낙사", "change": "stay" },
        { "id": "char_파이논", "folderName": "파이논", "role": "메인 딜러", "name": "파이논", "change": "stay" },
        { "id": "char_아처", "folderName": "아처", "role": "메인 딜러", "name": "아처", "change": "stay" },
        { "id": "char_에버나이트", "folderName": "에버나이트", "role": "서브 딜러", "name": "에버나이트", "change": "stay" }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        { "id": "char_영사", "folderName": "영사", "role": "유지력", "name": "영사", "change": "stay" },
        { "id": "char_블랙_스완", "folderName": "블랙 스완", "role": "서포터", "name": "블랙 스완", "change": "stay" },
        { "id": "char_스파클", "folderName": "스파클", "role": "서포터", "name": "스파클", "change": "stay" },
        { "id": "char_선데이", "folderName": "선데이", "role": "서포터", "name": "선데이", "change": "stay" },
        { "id": "char_망귀인", "folderName": "망귀인", "role": "서포터", "name": "망귀인", "change": "stay" },
        { "id": "char_달리아", "folderName": "달리아", "role": "서포터", "name": "달리아", "change": "stay" },
        { "id": "char_카프카", "folderName": "카프카", "role": "메인 딜러", "name": "카프카", "change": "stay" },
        { "id": "char_부트힐", "folderName": "부트힐", "role": "메인 딜러", "name": "부트힐", "change": "stay" },
        { "id": "char_아글라이아", "folderName": "아글라이아", "role": "메인 딜러", "name": "아글라이아", "change": "stay" },
        { "id": "char_히실렌스", "folderName": "히실렌스", "role": "메인 딜러", "name": "히실렌스", "change": "stay" }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        { "id": "char_로빈", "folderName": "로빈", "role": "서포터", "name": "로빈", "change": "stay" },
        { "id": "char_정운", "folderName": "정운", "role": "서포터", "name": "정운", "change": "stay" },
        { "id": "char_개척자_화합", "folderName": "개척자 (화합)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (화합)", "change": "stay" },
        { "id": "char_개척자_기억", "folderName": "개척자 (기억)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (기억)", "change": "stay" },
        { "id": "char_사이퍼", "folderName": "사이퍼", "role": "서브 딜러", "name": "사이퍼", "change": "stay" },
        { "id": "char_아케론", "folderName": "아케론", "role": "메인 딜러", "name": "아케론", "change": "stay" },
        { "id": "char_비소", "folderName": "비소", "role": "메인 딜러", "name": "비소", "change": "stay" },
        { "id": "char_라파", "folderName": "라파", "role": "메인 딜러", "name": "라파", "change": "stay" },
        { "id": "char_더_헤르타", "folderName": "더 헤르타", "role": "메인 딜러", "name": "더 헤르타", "change": "stay" },
        { "id": "char_마이데이", "folderName": "마이데이", "role": "메인 딜러", "name": "마이데이", "change": "stay" },
        { "id": "char_세이버", "folderName": "세이버", "role": "메인 딜러", "name": "세이버", "change": "stay" }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        { "id": "char_완매", "folderName": "완•매", "role": "서포터", "name": "완•매", "change": "stay" }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        { "id": "char_갤러거", "folderName": "갤러거", "role": "유지력", "name": "갤러거", "change": "stay" }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        { "id": "char_어벤츄린", "folderName": "어벤츄린", "role": "유지력", "name": "어벤츄린", "change": "stay" }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        { "id": "char_제이드", "folderName": "제이드", "role": "메인 딜러", "name": "제이드", "change": "stay" }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": []
    },
    {
      "tier": "E",
      "label": "E",
      "color": "#2d3436",
      "characters": []
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#1e272e",
      "characters": []
    }
  ],
  'divergent': [
    {
      "tier": "OP",
      "label": "OP",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_스파키", "folderName": "스파키", "role": "메인 딜러", "name": "스파키", "change": "stay" },
        { "id": "char_효광", "folderName": "효광", "role": "서포터", "name": "효광", "change": "stay" },
        { "id": "char_개척자_기억", "folderName": "개척자 (기억)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (기억)", "change": "stay" }
      ]
    },
    {
      "tier": "SS",
      "label": "SS",
      "color": "#FF9F43",
      "characters": [
        { "id": "char_에버나이트", "folderName": "에버나이트", "role": "서브 딜러", "name": "에버나이트", "change": "stay" },
        { "id": "char_카스토리스", "folderName": "카스토리스", "role": "메인 딜러", "name": "카스토리스", "change": "stay" },
        { "id": "char_키레네", "folderName": "키레네", "role": "서포터", "name": "키레네", "change": "stay" },
        { "id": "char_히아킨", "folderName": "히아킨", "role": "유지력", "name": "히아킨", "change": "stay" },
        { "id": "char_반디", "folderName": "반디", "role": "메인 딜러", "name": "반디", "change": "stay" },
        { "id": "char_트리비", "folderName": "트리비", "role": "서포터", "name": "트리비", "change": "stay" },
        { "id": "char_히실렌스", "folderName": "히실렌스", "role": "메인 딜러", "name": "히실렌스", "change": "stay" }
      ]
    },
    {
      "tier": "S+",
      "label": "S+",
      "color": "#1DD1A1",
      "characters": [
        { "id": "char_카프카", "folderName": "카프카", "role": "메인 딜러", "name": "카프카", "change": "stay" },
        { "id": "char_달리아", "folderName": "달리아", "role": "서포터", "name": "달리아", "change": "stay" },
        { "id": "char_스파클", "folderName": "스파클", "role": "서포터", "name": "스파클", "change": "stay" },
        { "id": "char_아처", "folderName": "아처", "role": "메인 딜러", "name": "아처", "change": "stay" },
        { "id": "char_단항등황", "folderName": "단항•등황", "role": "유지력", "name": "단항•등황", "change": "stay" }
      ]
    },
    {
      "tier": "S",
      "label": "S",
      "color": "#54A0FF",
      "characters": [
        { "id": "char_아낙사", "folderName": "아낙사", "role": "메인 딜러", "name": "아낙사", "change": "stay" },
        { "id": "char_파이논", "folderName": "파이논", "role": "메인 딜러", "name": "파이논", "change": "stay" },
        { "id": "char_블랙_스완", "folderName": "블랙 스완", "role": "서포터", "name": "블랙 스완", "change": "stay" },
        { "id": "char_곽향", "folderName": "곽향", "role": "유지력", "name": "곽향", "change": "stay" },
        { "id": "char_완매", "folderName": "완•매", "role": "서포터", "name": "완•매", "change": "stay" },
        { "id": "char_케리드라", "folderName": "케리드라", "role": "서포터", "name": "케리드라", "change": "stay" }
      ]
    },
    {
      "tier": "A",
      "label": "A",
      "color": "#A8A8A8",
      "characters": [
        { "id": "char_라파", "folderName": "라파", "role": "메인 딜러", "name": "라파", "change": "stay" },
        { "id": "char_부트힐", "folderName": "부트힐", "role": "메인 딜러", "name": "부트힐", "change": "stay" },
        { "id": "char_영사", "folderName": "영사", "role": "유지력", "name": "영사", "change": "stay" },
        { "id": "char_망귀인", "folderName": "망귀인", "role": "서포터", "name": "망귀인", "change": "stay" },
        { "id": "char_갤러거", "folderName": "갤러거", "role": "유지력", "name": "갤러거", "change": "stay" },
        { "id": "char_선데이", "folderName": "선데이", "role": "서포터", "name": "선데이", "change": "stay" }
      ]
    },
    {
      "tier": "B",
      "label": "B",
      "color": "#5F27CD",
      "characters": [
        { "id": "char_마이데이", "folderName": "마이데이", "role": "메인 딜러", "name": "마이데이", "change": "stay" },
        { "id": "char_아글라이아", "folderName": "아글라이아", "role": "메인 딜러", "name": "아글라이아", "change": "stay" },
        { "id": "char_비소", "folderName": "비소", "role": "메인 딜러", "name": "비소", "change": "stay" },
        { "id": "char_더_헤르타", "folderName": "더 헤르타", "role": "메인 딜러", "name": "더 헤르타", "change": "stay" },
        { "id": "char_개척자_화합", "folderName": "개척자 (화합)", "role": "서포터", "isTrailblazer": true, "name": "개척자 (화합)", "change": "stay" },
        { "id": "char_어벤츄린", "folderName": "어벤츄린", "role": "유지력", "name": "어벤츄린", "change": "stay" }
      ]
    },
    {
      "tier": "C",
      "label": "C",
      "color": "#8395A7",
      "characters": [
        { "id": "char_세이버", "folderName": "세이버", "role": "메인 딜러", "name": "세이버", "change": "stay" },
        { "id": "char_로빈", "folderName": "로빈", "role": "서포터", "name": "로빈", "change": "stay" },
        { "id": "char_나찰", "folderName": "나찰", "role": "유지력", "name": "나찰", "change": "stay" },
        { "id": "char_은랑", "folderName": "은랑", "role": "서포터", "name": "은랑", "change": "stay" },
        { "id": "char_사이퍼", "folderName": "사이퍼", "role": "서브 딜러", "name": "사이퍼", "change": "stay" },
        { "id": "char_제이드", "folderName": "제이드", "role": "메인 딜러", "name": "제이드", "change": "stay" },
        { "id": "char_브로냐", "folderName": "브로냐", "role": "서포터", "name": "브로냐", "change": "stay" }
      ]
    },
    {
      "tier": "D",
      "label": "D",
      "color": "#485460",
      "characters": [
        { "id": "char_아케론", "folderName": "아케론", "role": "메인 딜러", "name": "아케론", "change": "stay" },
        { "id": "char_초구", "folderName": "초구", "role": "서포터", "name": "초구", "change": "stay" },
        { "id": "char_페라", "folderName": "페라", "role": "서포터", "name": "페라", "change": "stay" },
        { "id": "char_부현", "folderName": "부현", "role": "유지력", "name": "부현", "change": "stay" },
        { "id": "char_Mar_7th_Hunt", "folderName": "Mar. 7th (수렵)", "role": "서브 딜러", "name": "Mar. 7th (수렵)", "change": "stay" },
        { "id": "char_히메코", "folderName": "히메코", "role": "메인 딜러", "name": "히메코", "change": "stay" },
        { "id": "char_토파즈_복순이", "folderName": "토파즈 & 복순이", "role": "서브 딜러", "name": "토파즈 & 복순이", "change": "stay" }
      ]
    },
    {
      "tier": "E",
      "label": "E",
      "color": "#2d3436",
      "characters": [
        { "id": "char_블레이드", "folderName": "블레이드", "role": "메인 딜러", "name": "블레이드", "change": "stay" },
        { "id": "char_경류", "folderName": "경류", "role": "메인 딜러", "name": "경류", "change": "stay" },
        { "id": "char_운리", "folderName": "운리", "role": "메인 딜러", "name": "운리", "change": "stay" },
        { "id": "char_경원", "folderName": "경원", "role": "메인 딜러", "name": "경원", "change": "stay" },
        { "id": "char_정운", "folderName": "정운", "role": "서포터", "name": "정운", "change": "stay" },
        { "id": "char_서벌", "folderName": "서벌", "role": "서브 딜러", "name": "서벌", "change": "stay" },
        { "id": "char_맥택", "folderName": "맥택", "role": "서브 딜러", "name": "맥택", "change": "stay" }
      ]
    },
    {
      "tier": "F",
      "label": "F",
      "color": "#1e272e",
      "characters": [
        { "id": "char_Dr_레이시오", "folderName": "Dr. 레이시오", "role": "메인 딜러", "name": "Dr. 레이시오", "change": "stay" },
        { "id": "char_단항음월", "folderName": "단항•음월", "role": "메인 딜러", "name": "단항•음월", "change": "stay" },
        { "id": "char_아젠티", "folderName": "아젠티", "role": "메인 딜러", "name": "아젠티", "change": "stay" },
        { "id": "char_미샤", "folderName": "미샤", "role": "메인 딜러", "name": "미샤", "change": "stay" },
        { "id": "char_설의", "folderName": "설의", "role": "메인 딜러", "name": "설의", "change": "stay" },
        { "id": "char_한아", "folderName": "한아", "role": "서포터", "name": "한아", "change": "stay" },
        { "id": "char_계네빈", "folderName": "계네빈", "role": "서브 딜러", "name": "계네빈", "change": "stay" },
        { "id": "char_링스", "folderName": "링스", "role": "유지력", "name": "링스", "change": "stay" },
        { "id": "char_루카", "folderName": "루카", "role": "서브 딜러", "name": "루카", "change": "stay" },
        { "id": "char_어공", "folderName": "어공", "role": "서포터", "name": "어공", "change": "stay" },
        { "id": "char_제레", "folderName": "제레", "role": "메인 딜러", "name": "제레", "change": "stay" },
        { "id": "char_게파드", "folderName": "게파드", "role": "유지력", "name": "게파드", "change": "stay" },
        { "id": "char_웰트", "folderName": "웰트", "role": "서포터", "name": "웰트", "change": "stay" },
        { "id": "char_클라라", "folderName": "클라라", "role": "메인 딜러", "name": "클라라", "change": "stay" },
        { "id": "char_연경", "folderName": "연경", "role": "메인 딜러", "name": "연경", "change": "stay" },
        { "id": "char_백로", "folderName": "백로", "role": "유지력", "name": "백로", "change": "stay" },
        { "id": "char_개척자_파멸", "folderName": "개척자 (파멸)", "role": "메인 딜러", "isTrailblazer": true, "name": "개척자 (파멸)", "change": "stay" },
        { "id": "char_개척자_보존", "folderName": "개척자 (보존)", "role": "유지력", "isTrailblazer": true, "name": "개척자 (보존)", "change": "stay" },
        { "id": "char_Mar_7th", "folderName": "Mar. 7th", "role": "유지력", "name": "Mar. 7th", "change": "stay" },
        { "id": "char_단항", "folderName": "단항", "role": "메인 딜러", "name": "단항", "change": "stay" },
        { "id": "char_아스타", "folderName": "아스타", "role": "서포터", "name": "아스타", "change": "stay" },
        { "id": "char_아를란", "folderName": "아를란", "role": "메인 딜러", "name": "아를란", "change": "stay" },
        { "id": "char_헤르타", "folderName": "헤르타", "role": "메인 딜러", "name": "헤르타", "change": "stay" },
        { "id": "char_나타샤", "folderName": "나타샤", "role": "유지력", "name": "나타샤", "change": "stay" },
        { "id": "char_삼포", "folderName": "삼포", "role": "서브 딜러", "name": "삼포", "change": "stay" },
        { "id": "char_후크", "folderName": "후크", "role": "메인 딜러", "name": "후크", "change": "stay" },
        { "id": "char_청작", "folderName": "청작", "role": "메인 딜러", "name": "청작", "change": "stay" },
        { "id": "char_소상", "folderName": "소상", "role": "메인 딜러", "name": "소상", "change": "stay" }
      ]
    }
  ]
};


export const HSR_TIER_CHANGE_LOG: TierChangeLog[] = [
  { name: '히아킨', type: 'new', description: '신규 캐릭터 추가 (T0)' },
  { name: '개척자 (기억)', type: 'stay', description: '3.0 메타 분석 결과 T1 유지' },
  { name: '단항•음월', type: 'stay', description: '허수 약점 환경 변화로 인한 티어 재검토' },
  { name: '이상 중재', type: 'stay', description: '종말 티어표와 동일하게 동기화 완료' },
];
