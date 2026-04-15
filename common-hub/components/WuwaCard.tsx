import React from 'react';
import { WuwaEcho } from '../types';
import { WuwaItem } from './ww';

interface Props {
  item: WuwaEcho | WuwaItem;
  onClick: () => void;
}

const WuwaCard: React.FC<Props> = ({ item, onClick }) => {
  const isEcho = 'cost' in item;
  
  let imageSrc = '';
  if (isEcho) {
    const ECHO_IMAGE_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/Echo/';
    imageSrc = `${ECHO_IMAGE_BASE}${encodeURIComponent(item.name.normalize('NFC'))}.webp`;
  } else {
    imageSrc = (item as any).img || `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/${encodeURIComponent(((item as WuwaItem).folderName || item.name).normalize('NFC'))}.webp`;
  }

  // 코스트별/등급별 뱃지 색상
  const COST_BADGE_COLORS: Record<number, string> = {
    5: 'bg-yellow-500',
    4: 'bg-yellow-500',
    3: 'bg-purple-500',
    2: 'bg-green-500',
    1: 'bg-blue-500',
  };

  // 아이템 등급별 배경
  const ITEM_BG_COLORS: Record<number, string> = {
    5: 'bg-gradient-to-b from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
    4: 'bg-gradient-to-b from-[#634e9e] to-[#3d2f63] border-purple-500/30',
    3: 'bg-gradient-to-b from-[#3b608a] to-[#1e3045] border-blue-500/30',
    2: 'bg-gradient-to-b from-[#3b5a41] to-[#25392a] border-green-500/30',
    1: 'bg-gradient-to-b from-[#4d4d4d] to-[#333333] border-gray-400/20',
  };

  const badgeValue = isEcho ? (item as WuwaEcho).cost : (item as WuwaItem).rarity;
  const badgeColor = COST_BADGE_COLORS[badgeValue] || 'bg-gray-500';
  const bgStyle = isEcho ? '' : ITEM_BG_COLORS[(item as WuwaItem).rarity];

  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95" onClick={onClick}>
      {/* 카드 본체 */}
      <div 
        className={`relative isolate w-16 h-16 md:w-20 md:h-20 border-2 rounded-[22px] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-lg group-hover:brightness-110 ${bgStyle || 'bg-[#1a1a1a] border-white/10'}`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
        {/* 에코 이미지 (가득 채우기) */}
        <img 
          src={imageSrc} 
          alt={item.name}
          loading="lazy"
          width="200"
          height="200"
          style={{ imageRendering: 'auto' }}
          className="w-full h-full object-contain p-2 relative z-10 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transform transition-transform duration-500 group-hover:scale-110 text-transparent"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/unknown.webp';
          }}
        />

        {/* 우측 상단 코스트/등급 뱃지 */}
        <div className={`absolute top-1 right-1 w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[8px] md:text-[9px] font-black text-white shadow-md z-30 ${badgeColor}`}>
          {badgeValue}
        </div>
      </div>

      {/* 카드 외부 이름 */}
      <div className="w-full px-1 text-center">
        <span className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-tight group-hover:text-white transition-colors uppercase tracking-tight block truncate w-full" title={item.name}>
          {item.name}
        </span>
      </div>
    </div>
  );
};

export default WuwaCard;
