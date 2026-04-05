
import React, { useState, useEffect } from 'react';
// Fix: ITEM_DATABASE was missing, using ITEM_META and getAutoRarity instead
import { ITEM_META, getItemUrl, getAutoRarity } from '../data/items';

interface ItemIconProps {
  name: string;
  count?: string;
  onClick?: () => void;
  rarityOverride?: number;
  size?: 'sm' | 'md';
}

const RARITY_THEMES: Record<number, string> = {
  1: 'from-[#4d4d4d] to-[#333333] border-gray-400/20',
  2: 'from-[#3b5a41] to-[#25392a] border-green-500/30', // 초록색 (약탈의 본능 등)
  3: 'from-[#3b608a] to-[#1e3045] border-blue-500/30',  // 파란색 (신용 포인트, 변조된 야망 등)
  4: 'from-[#634e9e] to-[#3d2f63] border-purple-500/30', // 보라색 (짓밟힌 의지, 환영의 무쇠 등)
  5: 'from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]', // 노란색 (운명의 발자취 등)
};

const ItemIcon: React.FC<ItemIconProps> = ({ name, count, onClick, rarityOverride, size = 'md' }) => {
  // Fix: Replaced missing ITEM_DATABASE with ITEM_META and added getAutoRarity fallback
  const itemInfo = ITEM_META[name];
  const rarity = rarityOverride || itemInfo?.rarity || getAutoRarity(name);
  const [imgSrc, setImgSrc] = useState(getItemUrl(name));

  useEffect(() => {
    setImgSrc(getItemUrl(name));
  }, [name]);

  const handleError = () => {
    setImgSrc("https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/신용 포인트.webp");
  };

  const truncateMiddle = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const startLength = Math.ceil((maxLength - 1) / 2);
    const endLength = Math.floor((maxLength - 1) / 2);
    return text.slice(0, startLength) + '...' + text.slice(text.length - endLength);
  };

  const sizeClasses = {
    sm: {
      container: 'w-[70px] md:w-[80px]',
      box: 'w-14 h-14 md:w-16 md:h-16',
      text: 'text-[9px] md:text-[10px]',
      limit: 8
    },
    md: {
      container: 'w-[80px] md:w-[100px]',
      box: 'w-16 h-16 md:w-20 md:h-20',
      text: 'text-[9px] md:text-[11px]',
      limit: 10
    }
  };

  const currentSize = sizeClasses[size];
  const displayName = truncateMiddle(name, currentSize.limit);

  return (
    <div 
      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105 ${currentSize.container}`}
      onClick={onClick}
      title={name}
    >
      <div className={`
        relative ${currentSize.box} rounded-xl overflow-hidden border-2 
        bg-gradient-to-b transition-all duration-500
        group-hover:brightness-110 shadow-lg flex items-center justify-center
        ${RARITY_THEMES[rarity] || RARITY_THEMES[1]}
      `}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
        
        <img 
          src={imgSrc} 
          alt={name}
          width="150"
          height="150"
          style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
          className="w-full h-full object-contain p-1 relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
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

export default ItemIcon;
