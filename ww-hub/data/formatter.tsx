import React from 'react';

export const ELEMENT_COLORS: Record<string, string> = {
  '응결': '#3D8CFF',
  '용융': '#FF4D4D',
  '전도': '#B14DFF',
  '기류': '#4DFF94',
  '회절': '#FFD600',
  '인멸': '#FF4DB1',
  '물리': '#E5E7EB',
};

export const renderRichText = (text: string) => {
  if (!text) return "";

  const elementKeywords = Object.keys(ELEMENT_COLORS).join('|');
  
  // [핵심 수정] 정규식의 속성명 매칭을 엄격하게 제한
  // (?:속성명)\s*(?:피해 보너스|피해) -> 속성명 뒤에 반드시 피해/피해 보너스가 붙어야 함
  // [\d./+%]+ -> 수치 덩어리
  const regex = new RegExp(`((?:${elementKeywords})\\s*(?:피해 보너스|피해)|[\\d./+%]+)`, 'g');
  const tokens = text.split(regex);

  return tokens.map((part, i) => {
    if (!part) return null;

    // A. 엄격한 속성 문구 매칭 (예: "전도 피해"만 통과, "전도 레이저"는 탈락)
    const attrMatch = Object.keys(ELEMENT_COLORS).find(attr => 
      part.includes(attr) && (part.includes('피해') || part.includes('피해 보너스'))
    );
    
    if (attrMatch) {
      return <span key={i} className="font-bold" style={{ color: ELEMENT_COLORS[attrMatch] }}>{part}</span>;
    }

    // B. 수치 덩어리 (숫자와 특수기호 조합)
    if (/[\d]/.test(part) && /[%/+]/.test(part)) {
      let matchedColor = '#9CA3AF'; // 기본 회색
      
      // 전방 탐색: 뒤에 엄격하게 "속성 피해" 문구가 오는지 확인
      for (let j = 1; j <= 10; j++) {
        const nextToken = tokens[i + j];
        if (!nextToken) continue;

        const foundAttr = Object.keys(ELEMENT_COLORS).find(attr => 
          nextToken.includes(attr) && (nextToken.includes('피해') || nextToken.includes('피해 보너스'))
        );

        if (foundAttr) {
          matchedColor = ELEMENT_COLORS[foundAttr];
          break;
        }

        // 일반 단어가 나오면 문맥 차단
        if (/[가-힣]{2,}/.test(nextToken) && !/의|과|와|및/.test(nextToken)) break;
      }
      return <span key={i} className="font-bold" style={{ color: matchedColor }}>{part}</span>;
    }

    // C. 나머지 일반 텍스트 (전도 레이저, 10회, 1pt, 협주 에너지 등)
    return <span key={i} className="text-gray-300">{part}</span>;
  });
};

export const formatDescriptionByRank = (description: string, rank: number) => {
  // 슬래시(/)로 구분된 5단계 수치 패턴을 찾습니다. (pt 등 단위 포함)
  const rankPattern = /([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)/g;

  return description.replace(rankPattern, (match, g1, g2, g3, g4, g5) => {
    const args = [g1, g2, g3, g4, g5];
    let val = args[rank - 1];
    // 단위(%, pt 등)가 마지막 단계에만 적혀 있을 경우를 대비해 단위를 추출하여 붙여줍니다.
    const unitMatch = g5.match(/[^\d.]+$/);
    if (unitMatch && !val.match(/[^\d.]+$/)) {
      val += unitMatch[0];
    }
    return val;
  });
};