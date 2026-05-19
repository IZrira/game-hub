
const fs = require('fs');

const tiersData = fs.readFileSync('data/tiers.ts', 'utf8');

const userList = {
  "OP": ["스파키", "효광", "개척자 (기억)"],
  "SS": ["에버나이트", "카스토리스", "키레네", "히아킨", "반디", "트리비", "히실렌스"],
  "S+": ["카프카", "달리아", "스파클", "아처", "단항•등황"],
  "S": ["아낙사", "파이논", "블랙 스완", "곽향", "완•매", "케리드라"],
  "A": ["라파", "부트힐", "영사", "망귀인", "갤러거", "선데이"],
  "B": ["마이데이", "아글라이아", "비소", "더 헤르타", "개척자 (화합)", "어벤츄린"],
  "C": ["세이버", "로빈", "나찰", "은랑", "사이퍼", "제이드", "브로냐"],
  "D": ["아케론", "초구", "페라", "부현", "Mar. 7th (수렵)", "히메코", "토파즈 & 복순이"],
  "E": ["블레이드", "경류", "운리", "경원", "정운", "서벌", "맥택"],
  "F": ["Dr. 레이시오", "단항•음월", "아젠티", "미샤", "설의", "한아", "계네빈", "링스", "루카", "어공", "제레", "게파드", "웰트", "클라라", "연경", "백로", "개척자 (파멸)", "개척자 (보존)", "Mar. 7th", "단항", "아스타", "아를란", "헤르타", "나타샤", "삼포", "후크", "청작", "소상"]
};

// Normalize names for matching
const normalize = (name) => name.replace(/\s+/g, '').replace(/•/g, '').replace(/\./g, '').replace(/&/g, '').replace(/\(/g, '').replace(/\)/g, '');

const charMap = {};
// Extract all character objects from tiers.ts
const charRegex = /\{ "id": "char_[^"]+", "folderName": "[^"]+", "role": "[^"]+", (?:isTrailblazer: true, )?"name": "([^"]+)"(?:, "change": "[^"]+")? \}/g;
let match;
while ((match = charRegex.exec(tiersData)) !== null) {
  const name = match[1];
  const objStr = match[0];
  const normalized = normalize(name);
  if (!charMap[normalized]) {
    // Clean up the object string to be a standard stay object
    const cleaned = objStr.replace(/"change": "[^"]+"/, '"change": "stay"');
    if (!cleaned.includes('"change":')) {
        charMap[normalized] = cleaned.replace(' }', ', "change": "stay" }');
    } else {
        charMap[normalized] = cleaned;
    }
  }
}

// Special cases for names that might not match exactly
const specialMatches = {
  "개척자기억": "개척자기억",
  "개척자화합": "개척자화합",
  "개척자파멸": "개척자파멸",
  "개척자보존": "개척자보존",
  "Mar7th수렵": "Mar7th수렵",
  "Mar7th": "Mar7th",
  "Dr레이시오": "Dr레이시오",
  "토파즈복순이": "토파즈복순이",
  "완매": "완매",
  "단항등황": "단항등황",
  "단항음월": "단항음월"
};

const result = [];
for (const [tier, names] of Object.entries(userList)) {
  const tierObj = {
    tier: tier,
    label: tier,
    color: "", // Will fill later
    characters: []
  };
  
  // Set colors
  switch(tier) {
    case "OP": tierObj.color = "#FF4D4D"; break;
    case "SS": tierObj.color = "#FF9F43"; break;
    case "S+": tierObj.color = "#1DD1A1"; break;
    case "S": tierObj.color = "#54A0FF"; break;
    case "A": tierObj.color = "#A8A8A8"; break;
    case "B": tierObj.color = "#5F27CD"; break;
    case "C": tierObj.color = "#8395A7"; break;
    case "D": tierObj.color = "#485460"; break;
    case "E": tierObj.color = "#2d3436"; break;
    case "F": tierObj.color = "#1e272e"; break;
  }

  for (const name of names) {
    const normalized = normalize(name);
    if (charMap[normalized]) {
      tierObj.characters.push(JSON.parse(charMap[normalized]));
    } else {
      console.log(`Missing character: ${name} (${normalized})`);
    }
  }
  result.push(tierObj);
}

console.log(JSON.stringify(result, null, 2));
