import React from 'react';

export const ELEMENT_COLORS: Record<string, string> = {
  '기류': '#4ade80',
  '응결': '#60a5fa',
  '전도': '#a78bfa',
  '용융': '#fb7185',
  '회절': '#fde047',
  '인멸': '#F472B6',
  '물리': '#E5E7EB',
};

export const renderRichText = (text: string) => {
  if (!text) return "";

  const elementKeywords = Object.keys(ELEMENT_COLORS).join('|');
  
  // [핵심 수정] 정규식의 속성명 매칭을 엄격하게 제한 + {icon:xxx} 태그 지원
  // [\d./+%]+ -> 수치 덩어리
  const ICON_COMMON_BASE = `https://raw.githubusercontent.com/IZrira/riragameinfo/main/ww%20images/common/position/`;
  const regex = new RegExp(`({{YELLOW_START}}.*?{{YELLOW_END}}|{{KEY_(?:[eErR]|LSHIFT)}}|{{MOUSE_L}}|\\[[mM]ouse\\s+[lL]eft\\]|\\[[kK]ey\\s+[eErR]\\]|\\[[lL]eft\\s+[sS]hift\\]|\\[[^\\]]+\\.webp\\]|{icon:[^}]+}|(?:${elementKeywords})\\s*(?:피해)(?!\\s*보너스)|[\\d./+%]+)`, 'g');
  const tokens = text.split(regex);

  return tokens.map((part, i) => {
    if (!part) return null;

    const yellowMatch = part.match(/{{YELLOW_START}}(.*?){{YELLOW_END}}/);
    const iconMatch = part.match(/\{icon:([^}]+)\}/);
    const manualMouseMatch = part.match(/\[\s*mouse\s+left\s*\]/i);
    const manualKeyMatch = part.match(/\[\s*key\s+([eErR])\s*\]/i);
    const manualShiftMatch = part.match(/\[\s*left\s+shift\s*\]/i);
    const keyMatch = part.match(/{{KEY_([eErR]|LSHIFT)}}/i);
    const mouseMatch = part.match(/{{MOUSE_L}}/i);
    const imageMatch = part.match(/\[([^\]]+\.webp)\]/);

    if (yellowMatch) {
      return <span key={i} className="text-[#EAB308] font-black">{yellowMatch[1]}</span>;
    }

    if (iconMatch || manualMouseMatch || manualKeyMatch || manualShiftMatch || keyMatch || mouseMatch || imageMatch) {
      let fileName = '';
      let alt = '';

      if (iconMatch) {
        fileName = `${iconMatch[1]}.png`; // Legacy support
        alt = iconMatch[1];
        return (
          <img 
            key={i} 
            src={`/assets/icons/${fileName}`} 
            className="inline-icon" 
            alt={alt}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        );
      } else if (imageMatch) {
        const imageName = imageMatch[1];
        const lowerName = imageName.toLowerCase();
        if (lowerName.includes('mouse') || lowerName.includes('key') || lowerName.includes('shift')) {
          if (lowerName.includes('mouse left')) fileName = 'mouse%20left.webp';
          else if (lowerName.includes('key e')) fileName = 'key%20E.webp';
          else if (lowerName.includes('key r')) fileName = 'key%20R.webp';
          else if (lowerName.includes('left shift') || lowerName.includes('lshift')) fileName = 'left%20shift.webp';
          else fileName = imageName.replace(' ', '%20');
          alt = imageName.replace('.webp', '');
        } else {
          return null; 
        }
      } else if (manualMouseMatch || mouseMatch) {
        fileName = `mouse%20left.webp`;
        alt = "mouse left";
      } else if (manualKeyMatch || keyMatch) {
        const rawKey = (keyMatch ? keyMatch[1] : manualKeyMatch![1]).toUpperCase();
        const key = rawKey === 'LSHIFT' ? 'left shift' : `key ${rawKey}`;
        fileName = `${key.replace(' ', '%20')}.webp`;
        alt = key;
      } else if (manualShiftMatch) {
        fileName = `left%20shift.webp`;
        alt = 'left shift';
      }

      return (
        <img 
          key={i} 
          src={`${ICON_COMMON_BASE}${fileName}`} 
          className="inline-block w-5 h-5 object-contain align-middle mx-0.5 brightness-110" 
          alt={alt}
        />
      );
    }

    // B. 엄격한 속성 문구 매칭 (예: "전도 피해"만 통과, "전도 레이저"는 탈락)
    const attrMatch = Object.keys(ELEMENT_COLORS).find(attr => 
      part.includes(attr) && part.includes('피해') && !part.includes('보너스')
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
          nextToken.includes(attr) && nextToken.includes('피해') && !nextToken.includes('보너스')
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
  // 1. 명시적인 중첩 구분자가 있는 경우 (예: [1중첩], [R1], @중첩1 등)
  // 해당 구분자를 기준으로 텍스트를 쪼갭니다.
  const rankSplitRegex = /(?:\[\s*[1-5]\s*중첩\s*\]|\[\s*R[1-5]\s*\]|@\s*중첩\s*[1-5])/i;
  const parts = description.split(rankSplitRegex).map(p => p.trim()).filter(p => p.length > 0);
  
  if (parts.length >= 5) {
    // 5단계로 명확히 나뉘어진 경우 해당 랭크의 텍스트 반환
    return parts[rank - 1] || parts[0];
  }

  // 2. 구분자가 없는 경우 전체 텍스트를 유지한 채 슬래시(/)로 구분된 5단계 수치 패턴만 치환합니다.
  const rankPattern = /([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)/g;

  return description.replace(rankPattern, (match, g1, g2, g3, g4, g5) => {
    const args = [g1, g2, g3, g4, g5];
    let val = args[rank - 1];
    // 단위(%, pt 등)가 마지막 단계에만 적혀 있을 경우를 대비해 단위를 추출하여 붙여줍니다.
    const unitMatch = g5.match(/[^\d.]+$/);
    if (unitMatch && !val.match(/[^\d.]+$/)) {
      val += unitMatch[0];
    }
    return `{{YELLOW_START}}${val}{{YELLOW_END}}`;
  });
};