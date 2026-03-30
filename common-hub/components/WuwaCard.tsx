import React, { useState, useEffect } from 'react';
import { WuwaItem } from './ww';

interface Props {
  item: WuwaItem;
  count?: string;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const RARITY_THEMES: Record<number, string> = {
  1: 'from-[#4d4d4d] to-[#333333] border-gray-400/20',
  2: 'from-[#3b5a41] to-[#25392a] border-green-500/30',
  3: 'from-[#3b608a] to-[#1e3045] border-blue-500/30',
  4: 'from-[#634e9e] to-[#3d2f63] border-purple-500/30',
  5: 'from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
};

const WuwaCard: React.FC<Props> = ({ item, count, onClick, size = 'md' }) => {
  // ✅ 요청하신 규칙: 앞부분은 동일하고 hsr images -> ww images/items 로 변경
  // jsDelivr CDN을 사용하며, 띄어쓰기는 %20으로 처리합니다.
  const BASE_URL = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/";

  // ✅ 한글 자소 분리 방지 (NFC) 및 파일명 인코딩
  const targetName = item.folderName || item.name;
  const encodedFileName = encodeURIComponent(targetName.normalize('NFC'));
  
  // 최종 완성된 이미지 주소 (.webp 확정)
  const imageSrc = `${BASE_URL}${encodedFileName}.webp`;

  const [currentImageSrc, setCurrentImageSrc] = useState(imageSrc);

  useEffect(() => {
    const newSrc = `${BASE_URL}${encodeURIComponent((item.folderName || item.name).normalize('NFC'))}.webp`;
    setCurrentImageSrc(newSrc);
  }, [item.name, item.folderName]);

  const handleError = () => {
    // 로드 실패 시 콘솔에 404 주소 출력 (디버깅용)
    console.error(`[명조 이미지 404] 경로 확인: ${currentImageSrc}`);
    // 실패 시 스타레일의 unknown 이미지로 대체 (기존 코드 유지)
    setCurrentImageSrc("https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/unknown.webp");
  };

  const truncateMiddle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const startLength = Math.ceil((maxLength - 1) / 2);
    const endLength = Math.floor((maxLength - 1) / 2);
    return text.slice(0, startLength) + '...' + text.slice(text.length - endLength);
  };

  const sizeClasses = {
    sm: { container: 'w-[70px] md:w-[80px]', box: 'w-14 h-14 md:w-16 md:h-16', text: 'text-[9px] md:text-[10px]', limit: 8 },
    md: { container: 'w-[80px] md:w-[100px]', box: 'w-16 h-16 md:w-20 md:h-20', text: 'text-[9px] md:text-[11px]', limit: 10 }
  };

  const currentSize = sizeClasses[size];
  const displayName = truncateMiddle(item.name, currentSize.limit);

  return (
    <div 
      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105 ${currentSize.container}`}
      onClick={onClick}
      title={item.name}
    >
      <div className={`
        relative ${currentSize.box} rounded-xl overflow-hidden border-2 
        bg-gradient-to-b transition-all duration-500
        group-hover:brightness-110 shadow-lg flex items-center justify-center
        ${RARITY_THEMES[item.rarity] || RARITY_THEMES[1]}
      `}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
        
        <img 
          src={currentImageSrc} 
          alt={item.name}
          className="w-full h-full object-contain p-1 relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={handleError}
        />

        {count && (
          <div className="absolute bottom-0 right-0 left-0 bg-black/80 backdrop-blur-sm px-1.5 py-0.5 text-[9px] md:text-[10px] font-black text-white text-right z-30 border-t border-white/10 font-mono tracking-tighter">
            {count}
          </div>
        )}
      </div>
      
      <div className="w-full px-1 text-center">
        <span className={`${currentSize.text} text-gray-500 font-bold leading-none whitespace-nowrap group-hover:text-brand-accent transition-colors uppercase tracking-tight block`}>
          {displayName}
        </span>
      </div>
    </div>
  );
};

export default WuwaCard;