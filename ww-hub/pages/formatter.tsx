import React from 'react';

export const renderRichText = (text: string) => {
  if (!text) return null;

  // 명조 데이터에 포함될 수 있는 <color=...> 태그를 지능형 컬러(brand-accent 등)로 변환
  const parts = text.split(/(<color=[^>]+>.*?<\/color>)/g);

  return (
    <>
      {parts.map((part, index) => {
        const colorMatch = part.match(/<color=([^>]+)>(.*?)<\/color>/);
        if (colorMatch) {
          const [, color, content] = colorMatch;
          return <span key={index} className="text-brand-accent font-bold">{content}</span>;
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

export const formatDescriptionByRank = (description: string, rank: number) => {
  if (!description) return "";

  // %가 있거나 없는 숫자/슬래시 조합을 모두 찾음 (예: 12.8%/16%/... 또는 8/10/12/...)
  const rankPattern = /([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)\/([\d.]+[%pt]*)/g;

  return description.replace(rankPattern, (match, ...args) => {
    let val = args[rank - 1];
    // 단위(%, pt 등)가 마지막 단계에만 적혀 있을 경우를 대비해 단위를 추출하여 붙여줍니다.
    const g5 = args[4];
    const unitMatch = g5.match(/[^\d.]+$/);
    if (unitMatch && !val.match(/[^\d.]+$/)) {
      val += unitMatch[0];
    }
    // 5개의 그룹 중 선택된 rank에 해당하는 수치만 반환 (강조 컬러 태그 포함)
    return `<color=highlight>${val}</color>`;
  });
};
