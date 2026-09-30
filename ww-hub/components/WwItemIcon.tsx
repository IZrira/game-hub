import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface WwItemIconProps {
  name: string;
  count?: string | number;
  onClick?: () => void;
}

const RARITY_THEMES: Record<number, string> = {
  1: 'from-[#4d4d4d] to-[#333333] border-gray-400/20',
  2: 'from-[#3b5a41] to-[#25392a] border-green-500/30',
  3: 'from-[#3b608a] to-[#1e3045] border-blue-500/30',
  4: 'from-[#634e9e] to-[#3d2f63] border-purple-500/30',
  5: 'from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
};

const getItemUrl = (name: string) => {
  const fileName = name.normalize('NFC').replace(/: /g, '_').replace(/:/g, '_').replace(/[?<>]/g, '');
  return `${CDN_URL}/ww%20images/items/${safeEncodeURIComponent(fileName)}.webp`;
};

const getItemRarity = (name: string) => {
  if (name === '클램 코인') return 3;
  if (/^(전주파수|이성질화|노래하는|특제|중첩)/.test(name)) return 5;
  if (/^(고주파수|분극|응고된|개량|여러)/.test(name)) return 4;
  if (/^(중주파수|활성|끊어진|보통|한쪽)/.test(name)) return 3;
  if (/^(저주파수|비활성|긁어모은|낡은|손상)/.test(name)) return 2;
  return 3;
};

const WwItemIcon: React.FC<WwItemIconProps> = ({ name, count, onClick }) => {
  const { t } = useTranslation();
  const rarity = getItemRarity(name);
  const [imageUrl, setImageUrl] = useState(() => getItemUrl(name));
  const translatedName = t(name, { keySeparator: false });
  const displayName = useMemo(() => translatedName.length > 10
    ? `${translatedName.slice(0, 5)}...${translatedName.slice(-4)}`
    : translatedName, [translatedName]);

  useEffect(() => setImageUrl(getItemUrl(name)), [name]);

  return (
    <div
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={`${translatedName} ${count ? `${count}개` : ''}`}
      onClick={onClick}
      onKeyDown={event => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onClick();
        }
      }}
      className="flex w-[80px] md:w-[100px] flex-col items-center gap-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      title={name}
    >
      <div className={`relative isolate w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-xl border-2 bg-gradient-to-b shadow-lg ${RARITY_THEMES[rarity] || RARITY_THEMES[3]}`}>
        <img
          src={imageUrl}
          alt={translatedName}
          loading="lazy"
          decoding="async"
          className="relative z-10 h-full w-full object-contain p-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          onError={() => setImageUrl(`${CDN_URL}/ww%20images/items/%ED%81%B4%EB%9E%A8%20%EC%BD%94%EC%9D%B8.webp`)}
        />
        {count !== undefined && (
          <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/85 px-2 py-1 text-right text-[11px] md:text-[13px] font-black text-white">
            {count}
          </div>
        )}
      </div>
      <span className="block w-full truncate px-1 text-center text-[9px] md:text-[11px] font-bold text-gray-400" title={translatedName}>
        {displayName}
      </span>
    </div>
  );
};

export default WwItemIcon;
