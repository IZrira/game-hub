import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Package, Info, MapPin } from 'lucide-react';
import { getItemMeta, getAutoRarity, getItemUrl, REVERSE_ITEM_MAP, getCleanItemName } from '../data/items';
import { useTranslation } from 'react-i18next';

interface ItemDetailModalProps {
  itemNameEn: string; // 영문명 또는 국문명
  isOpen: boolean;
  onClose: () => void;
  item?: any; // 동적 데이터 우선 사용
  gameId?: string;
}

const getItemStyles = (rarity: number) => {
  const styles: Record<number, string> = {
    5: "from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    4: "from-[#634e9e] to-[#3d2f63] border-purple-500/30",
    3: "from-[#3b608a] to-[#1e3045] border-blue-500/30",
    2: "from-[#3b5a41] to-[#25392a] border-green-500/30",
  };
  return styles[rarity] || "from-[#4d4d4d] to-[#333333] border-gray-400/20";
};

export default function ItemDetailModal({ itemNameEn, isOpen, onClose, item, gameId }: ItemDetailModalProps) {
  const { t, i18n } = useTranslation();

  const koName = item?.name || REVERSE_ITEM_MAP[itemNameEn] || itemNameEn;
  const staticData = getItemMeta(koName);
  
  // item prop이 있으면 그것을 최우선으로, 없으면 staticData 사용
  const itemData = item || staticData;

  if (!isOpen) return null;

  const rawDisplayName = t(koName, { keySeparator: false, nsSeparator: false });
  const description = itemData?.desc || itemData?.description || itemData?.content
    ? t(`desc_${koName}`, { defaultValue: t(itemData.desc || itemData.description || itemData.content, { defaultValue: itemData.desc || itemData.description || itemData.content, keySeparator: false, nsSeparator: false }), keySeparator: false, nsSeparator: false }) 
    : t("아카이브에 아직 상세 정보가 등록되지 않은 아이템입니다.", { keySeparator: false, nsSeparator: false });
    
  const isEn = i18n.language.startsWith('en');
  const activeSources = (isEn && itemData?.enSources && itemData.enSources.length > 0) ? itemData.enSources : itemData?.sources;
  const sources = activeSources && activeSources.length > 0 
    ? activeSources.map((s: string) => t(`source_${s}`, { defaultValue: t(s, { defaultValue: s, keySeparator: false, nsSeparator: false }), keySeparator: false, nsSeparator: false })) 
    : [t("게임 내 확인 필요", { keySeparator: false, nsSeparator: false })];

  const rarity = itemData?.rarity || getAutoRarity(koName);
  const itemType = itemData?.type || "미분류";
  
  const resolvedGameId = gameId || itemData?.gameId || 'hsr';
  // item.url이 미리 생성되어 있으면 사용하고, 아니면 getItemUrl 호출 (fileName 포함)
  const url = itemData?.url || getItemUrl(koName, resolvedGameId, itemData?.fileName);

  const getRarityTheme = (r: number) => {
    switch (r) {
      case 5: return { color: 'text-yellow-500', glow: 'bg-yellow-500/20', border: 'border-yellow-500/40', accent: 'shadow-[0_0_40px_rgba(234,179,8,0.3)]' };
      case 4: return { color: 'text-purple-500', glow: 'bg-purple-500/20', border: 'border-purple-500/40', accent: 'shadow-[0_0_40px_rgba(168,85,247,0.3)]' };
      case 3: return { color: 'text-blue-500', glow: 'bg-blue-500/20', border: 'border-blue-500/40', accent: 'shadow-[0_0_40px_rgba(59,130,246,0.3)]' };
      case 2: return { color: 'text-green-500', glow: 'bg-green-500/20', border: 'border-green-500/40', accent: 'shadow-[0_0_40px_rgba(34,197,94,0.3)]' };
      default: return { color: 'text-gray-400', glow: 'bg-gray-500/20', border: 'border-gray-500/40', accent: '' };
    }
  };

  const theme = getRarityTheme(rarity);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (resolvedGameId === 'nte') {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte%20images/items/%EB%B9%84%ED%8B%80%20%EC%BD%94%EC%9D%B8.webp"; // 비틀 코인
    } else if (resolvedGameId === 'ww') {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/%ED%81%B4%EB%A0%88%EB%94%A7.webp"; // 클레딧
    } else {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/%EC%8B%A0%EC%9A%A9%20%ED%8F%AC%EC%9D%B8%ED%8A%B8.webp"; // 신용 포인트
    }
  };

  const isGenderSplit = itemData?.itemAttribute?.includes('남여 분리') || itemData?.itemAttribute?.includes('남녀 분리') || 
    ['행복한 「에이본」 가족', '프로필-「비일상적인 복장」', '프로필-그래피티 타임', '프로필-헌터는 휴가 중', '프로필-환상의 콤비'].includes(koName);
  
  let imgPathM = '';
  let imgPathF = '';
  if (isGenderSplit && url) {
    imgPathM = url.replace(/\.(png|webp)$/, '_m.$1');
    imgPathF = url.replace(/\.(png|webp)$/, '_f.$1');
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />
      
      <div className={`relative w-full max-w-2xl bg-[#0a0a0a] rounded-[40px] border ${theme.border} ${theme.accent} overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row shadow-2xl`}>
        {/* Left Section: Visuals */}
        <div className={`w-full md:w-1/2 relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] p-12 flex items-center justify-center`}>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
          <div className={`absolute inset-0 ${theme.glow} blur-[80px] opacity-40`} />
          
          <div className="relative z-10 w-full aspect-square flex items-center justify-center group">
            <div className={`absolute inset-0 border-2 ${theme.border} rounded-[48px] rotate-6 group-hover:rotate-12 transition-transform duration-700`} />
            <div className={`absolute inset-0 border border-white/5 rounded-[48px] -rotate-3 group-hover:-rotate-6 transition-transform duration-700`} />
            {isGenderSplit && imgPathM && imgPathF ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center gap-4 p-4 transform group-hover:scale-105 transition-transform duration-700">
                <img 
                  src={imgPathM} 
                  alt={`${koName} (남)`} 
                  className="w-1/2 h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                  onError={handleError}
                />
                <img 
                  src={imgPathF} 
                  alt={`${koName} (여)`} 
                  className="w-1/2 h-full object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
                  onError={handleError}
                />
              </div>
            ) : (
              <img 
                src={url} 
                alt={koName} 
                className="relative z-10 w-3/4 h-3/4 object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transform group-hover:scale-110 transition-transform duration-700" 
                onError={handleError}
              />
            )}
          </div>
        </div>

        {/* Right Section: Details */}
        <div className="w-full md:w-1/2 p-10 flex flex-col space-y-8 bg-black/40 backdrop-blur-md">
          <div className="absolute top-6 right-6 z-30">
            <button onClick={onClose} className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all">
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full bg-white/5 border ${theme.border} text-[10px] font-black uppercase tracking-widest ${theme.color}`}>
                {t(itemType)}
              </span>
              <div className="flex gap-0.5">
                {Array.from({ length: rarity }).map((_, i) => (<Star key={i} size={10} className={`${theme.color} fill-current`} />))}
              </div>
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white leading-none italic uppercase">{getCleanItemName(rawDisplayName)}</h2>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-brand-accent" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Archive Entry")}</span>
              </div>
              <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  {description}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-primary" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Location Data")}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sources.map((source: string, idx: number) => (
                  <span key={idx} className="bg-white/[0.03] text-gray-400 px-3.5 py-1.5 rounded-xl text-[11px] font-bold border border-white/10 hover:border-white/20 transition-all cursor-default">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] italic">
              Data synchronized with Galactic Network v4.1
            </p>
          </div>
        </div>
      </div>
    </div>
  , document.body);
}