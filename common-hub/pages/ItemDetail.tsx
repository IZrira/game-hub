import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, Star, Package, Info, MapPin } from 'lucide-react';
import { getItemMeta, getAutoRarity, getItemUrl, REVERSE_ITEM_MAP } from '../data/items';
import { getGameData } from '../data/dataManager';

const getRarityTheme = (r: number) => {
  switch (r) {
    case 5: return { color: 'text-yellow-500', glow: 'bg-yellow-500/20', border: 'border-yellow-500/40', accent: 'shadow-[0_0_60px_rgba(234,179,8,0.2)]' };
    case 4: return { color: 'text-purple-500', glow: 'bg-purple-500/20', border: 'border-purple-500/40', accent: 'shadow-[0_0_60px_rgba(168,85,247,0.2)]' };
    case 3: return { color: 'text-blue-500', glow: 'bg-blue-500/20', border: 'border-blue-500/40', accent: 'shadow-[0_0_60px_rgba(59,130,246,0.2)]' };
    case 2: return { color: 'text-green-500', glow: 'bg-green-500/20', border: 'border-green-500/40', accent: 'shadow-[0_0_60px_rgba(34,197,94,0.2)]' };
    default: return { color: 'text-gray-500', glow: 'bg-gray-500/20', border: 'border-gray-500/40', accent: '' };
  }
};

export default function ItemDetail() {
  const { t, i18n } = useTranslation();
  const { gameId, itemName } = useParams<{ gameId: string; itemName: string }>();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gameData = getGameData(gameId);
  const db = gameData?.INVENTORY_DB || {};

  const koName = REVERSE_ITEM_MAP[itemName || ''] || itemName || '';
  const itemData = db[koName] || getItemMeta(koName);

  if (!itemData && !getItemMeta(koName)) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white font-bold mb-4">{t("아이템을 찾을 수 없습니다.")}</h1>
        <button 
          onClick={() => navigate(-1)} 
          className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          {t("돌아가기")}
        </button>
      </div>
    );
  }

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
  const url = itemData?.url || getItemUrl(koName, itemData?.gameId || gameId || 'hsr', itemData?.fileName);

  const theme = getRarityTheme(rarity);

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-32">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Top Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all mb-8"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all">
            <ChevronLeft size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">{t("BACK TO GALLERY")}</span>
        </button>

        <div className={`relative bg-[#0a0a0a] rounded-[40px] border ${theme.border} ${theme.accent} overflow-hidden shadow-2xl flex flex-col lg:flex-row`}>
          {/* Left Section: Visuals */}
          <div className={`w-full lg:w-5/12 relative bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] p-12 lg:p-20 flex items-center justify-center min-h-[400px] lg:min-h-[600px]`}>
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:20px_20px]" />
            <div className={`absolute inset-0 ${theme.glow} blur-[100px] opacity-40`} />
            
            <div className="relative z-10 w-full max-w-[300px] aspect-square flex items-center justify-center group">
              <div className={`absolute inset-0 border-2 ${theme.border} rounded-[48px] rotate-6 group-hover:rotate-12 transition-transform duration-700`} />
              <div className={`absolute inset-0 border border-white/5 rounded-[48px] -rotate-3 group-hover:-rotate-6 transition-transform duration-700`} />
              <img 
                src={url} 
                alt={koName} 
                className="relative z-10 w-3/4 h-3/4 object-contain filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Right Section: Details */}
          <div className="w-full lg:w-7/12 p-8 lg:p-16 flex flex-col space-y-10 bg-black/40 backdrop-blur-md">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full bg-white/5 border ${theme.border} text-[11px] font-black uppercase tracking-widest ${theme.color}`}>
                  {t(itemType)}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: rarity }).map((_, i) => (<Star key={i} size={14} className={`${theme.color} fill-current`} />))}
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-tight italic uppercase drop-shadow-lg">
                {rawDisplayName}
              </h1>
            </div>

            <div className="space-y-8 flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Info size={16} className="text-brand-accent" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{t("Archive Entry")}</span>
                </div>
                <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium whitespace-pre-wrap">
                    {description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <MapPin size={16} className="text-brand-primary" />
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">{t("Location Data")}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sources.map((source: string, idx: number) => (
                    <span key={idx} className="bg-white/[0.03] text-gray-300 px-5 py-2.5 rounded-2xl text-sm font-bold border border-white/10 hover:border-white/20 transition-all shadow-sm">
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-auto">
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] italic">
                Data synchronized with Galactic Network v4.1 • {gameId?.toUpperCase()} Registry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
