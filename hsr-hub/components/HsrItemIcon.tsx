import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import enTranslation from '../../common-hub/en.json';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface HsrItemIconProps {
  name: string;
  count?: string | number;
  onClick?: () => void;
  rarityOverride?: number;
  size?: 'sm' | 'md';
}

const RARITY_THEMES: Record<number, string> = {
  1: 'from-[#4d4d4d] to-[#333333] border-gray-400/20',
  2: 'from-[#3b5a41] to-[#25392a] border-green-500/30',
  3: 'from-[#3b608a] to-[#1e3045] border-blue-500/30',
  4: 'from-[#634e9e] to-[#3d2f63] border-purple-500/30',
  5: 'from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
};

const REVERSE_ITEM_NAMES = Object.entries(enTranslation).reduce<Record<string, string>>((result, [ko, en]) => {
  result[String(en)] = ko;
  return result;
}, {});

const normalizeItemName = (name: string) => {
  const normalized = (name || '').normalize('NFC').replace(/\u00A0/g, ' ');
  return REVERSE_ITEM_NAMES[normalized] || normalized;
};

const getHsrItemUrl = (name: string) => {
  const fileName = normalizeItemName(name).replace(/: /g, '_').replace(/:/g, '_').replace(/[?<>]/g, '');
  return `${CDN_URL}/hsr%20images/items/${safeEncodeURIComponent(fileName)}.webp`;
};

const HsrItemIcon: React.FC<HsrItemIconProps> = ({ name, count, onClick, rarityOverride = 3, size = 'md' }) => {
  const { t } = useTranslation();
  const [imageUrl, setImageUrl] = useState(() => getHsrItemUrl(name));
  const cleanName = normalizeItemName(name).replace(/[\s_\-]*[\(\[]?[1-5]성[\)\]]?$/, '').trim();
  const translatedName = t(cleanName, { keySeparator: false });

  useEffect(() => {
    setImageUrl(getHsrItemUrl(name));
  }, [name]);

  const sizeConfig = size === 'sm'
    ? { container: 'w-[70px] md:w-[80px]', box: 'w-14 h-14 md:w-16 md:h-16', text: 'text-[9px] md:text-[10px]', limit: 8 }
    : { container: 'w-[80px] md:w-[100px]', box: 'w-16 h-16 md:w-20 md:h-20', text: 'text-[9px] md:text-[11px]', limit: 10 };
  const displayName = useMemo(() => {
    if (translatedName.length <= sizeConfig.limit) return translatedName;
    const startLength = Math.ceil((sizeConfig.limit - 1) / 2);
    const endLength = Math.floor((sizeConfig.limit - 1) / 2);
    return `${translatedName.slice(0, startLength)}...${translatedName.slice(-endLength)}`;
  }, [translatedName, sizeConfig.limit]);

  return (
    <div
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${translatedName} ${count ? `${count}개` : ''}`}
      onKeyDown={event => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
      className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl ${sizeConfig.container}`}
      onClick={onClick}
      title={name}
    >
      <div className={`relative isolate ${sizeConfig.box} rounded-xl overflow-hidden border-2 bg-gradient-to-b transition-all duration-500 group-hover:brightness-110 shadow-lg flex items-center justify-center ${RARITY_THEMES[rarityOverride] || RARITY_THEMES[3]}`}>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
        <img
          src={imageUrl}
          alt={translatedName}
          width="150"
          height="150"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain p-1 relative z-10 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageUrl(`${CDN_URL}/hsr%20images/items/%EC%8B%A0%EC%9A%A9%20%ED%8F%AC%EC%9D%B8%ED%8A%B8.webp`)}
        />
        {count !== undefined && count !== null && (
          <div className="absolute bottom-0 right-0 left-0 bg-black/85 backdrop-blur-md px-2 py-1 text-[11px] md:text-[13px] font-black text-white text-right z-30 border-t border-white/10 font-sans tabular-nums tracking-tight">
            {typeof count === 'number' ? count.toLocaleString() : count}
          </div>
        )}
      </div>
      <div className="w-full px-1 text-center">
        <span className={`${sizeConfig.text} text-gray-400 font-bold leading-none whitespace-nowrap group-hover:text-brand-accent transition-colors uppercase tracking-tight block truncate w-full`} title={translatedName}>
          {displayName}
        </span>
      </div>
    </div>
  );
};

export default HsrItemIcon;
