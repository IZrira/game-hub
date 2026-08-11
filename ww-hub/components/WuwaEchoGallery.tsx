import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Layers, Activity as ActivityIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getGameData } from '../../common-hub/data/dataManager';
import { SONATA_SETS, WuwaEcho, SonataType } from '../types';
import { ItemDetail } from '../../common-hub/types';
import { ItemPremiumCard, RelicPremiumCard } from '../../common-hub/components/GalleryCards';
import { getItemMetaDB } from '../../common-hub/data/items';
import { ItemDetailModal } from '../../common-hub/components/GalleryModals';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

// 에코 도감 및 모달 내 공통 경로 설정
const getSonataIconUrl = (setName: string) => {
  return `${CDN_URL}/ww%20images/common/sonata/${safeEncodeURIComponent(setName)}.webp`;
};

const WuwaEchoGallery: React.FC = () => {
  const [activeSonata, setActiveSonata] = useState<string>('전체');
  const [activeCost, setActiveCost] = useState<number | '전체'>('전체');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState<ItemDetail | null>(null);

  const { ECHO_DB } = useMemo(() => getGameData('ww'), []);
  const ECHO_DATA = ECHO_DB || [];

  // 필터 로직: 세트 + 코스트 + 검색어
  const filteredEchoes = useMemo(() => {
    return ECHO_DATA
      .filter(echo => {
        const matchSearch = echo.name.toLowerCase().includes(search.toLowerCase());
        const matchSonata = activeSonata === '전체' || echo.sonataSets.includes(activeSonata as SonataType);
        const matchCost = activeCost === '전체' || echo.cost === activeCost;
        return matchSearch && matchSonata && matchCost;
      })
      .sort((a, b) => b.cost - a.cost);
  }, [activeSonata, activeCost, search]);

  const handleShowItemDetail = (itemName: string) => {
    const db = getItemMetaDB();
    const item = db[itemName];
    if (item) {
      setSelectedItem(item);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-[#121212] rounded-[48px] border border-white/5 p-10 shadow-2xl space-y-8">
        {/* 상단 헤더 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-8">
          <div className="space-y-2 w-full">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-brand-accent">에코 도감</h2>
            <p className="text-gray-400 font-bold text-sm flex items-center gap-2">
              <ActivityIcon size={14} /> 분석된 에코 개체: {ECHO_DATA.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col space-y-8">
          <div className="flex flex-col lg:flex-row items-end gap-6">
            {/* 도감 내 검색 (필터링 전용) */}
            <div className="relative w-full lg:w-72 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="명칭으로 필터링..." 
                className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* 코스트 필터 */}
            <div className="space-y-3 w-full">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">Cost Filter</span>
              <div className="flex flex-wrap gap-3">
                {['전체', 4, 3, 1].map(cost => (
                  <button
                    key={cost}
                    onClick={() => setActiveCost(cost as any)}
                    className={`h-11 min-w-[44px] px-6 rounded-xl text-xs font-black transition-all border flex items-center justify-center ${
                      activeCost === cost ? "bg-white text-black shadow-lg shadow-white/20" : "bg-white/[0.03] text-gray-400 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {cost === '전체' ? 'ALL COST' : `${cost} COST`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 세트 필터 */}
          <div className="space-y-3">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">Sonata Sets</span>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setActiveSonata('전체')}
                className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all border w-20 md:w-24 shrink-0 ${
                  activeSonata === '전체' ? "bg-brand-primary/20 border-brand-primary text-white" : "bg-white/[0.03] border-transparent opacity-60 hover:opacity-100"
                }`}
                title="전체"
              >
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center font-black text-[9px]">ALL</div>
                <span className="text-[9px] font-bold truncate w-full text-center px-1">전체</span>
              </button>
              {SONATA_SETS.map((set: SonataType) => (
                <button
                  key={set}
                  onClick={() => setActiveSonata(set)}
                  className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-all border w-20 md:w-24 shrink-0 ${
                    activeSonata === set ? "bg-brand-primary/20 border-brand-primary text-white shadow-lg shadow-brand-primary/20" : "bg-white/[0.03] border-transparent opacity-60 hover:opacity-100"
                  }`}
                  title={set}
                >
                  <img 
                    src={getSonataIconUrl(set)} 
                    alt={set} 
                    className="w-8 h-8 object-contain drop-shadow-md"
                  />
                  <span className="text-[9px] font-bold truncate w-full text-center px-1">{set}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 에코 리스트 그리드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-5 gap-y-10 bg-white/[0.01] p-10 rounded-[50px] border border-white/5 shadow-2xl min-h-[400px]">
        {filteredEchoes.map((echo) => (
          <EchoPremiumCard 
            key={echo.id} 
            echo={echo} 
            onClick={() => navigate(`/gallery/ww/echo/${echo.name}`)} 
          />
        ))}
      </div>


      <WuwaItemModalWrapper
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

const EchoPremiumCard = ({ echo, onClick }: { echo: WuwaEcho, onClick: () => void }) => {
  const { t } = useTranslation();
  const imgUrl = `${CDN_URL}/ww%20images/Echo/${safeEncodeURIComponent(echo.name)}.webp`;

  const getRarityStyles = (cost: number) => {
    switch (cost) {
      case 4: return { border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', accent: 'bg-yellow-500' };
      case 3: return { border: 'border-purple-500/20', bg: 'bg-purple-500/5', accent: 'bg-purple-500' };
      case 1: return { border: 'border-blue-500/20', bg: 'bg-blue-500/5', accent: 'bg-blue-500' };
      default: return { border: 'border-white/5', bg: 'bg-white/5', accent: 'bg-gray-500' };
    }
  };

  const styles = getRarityStyles(echo.cost);

  return (
    <button 
      onClick={onClick} 
      className={`group relative aspect-[1/1.2] rounded-xl overflow-hidden border ${styles.border} bg-[#121212] transition-all duration-300 hover:bg-[#1a1a1a] hover:border-white/20 active:scale-95 flex flex-col`}
    >
      {/* Subtle Rarity Glow (Top) */}
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.accent} opacity-40 group-hover:opacity-100 transition-opacity z-20`} />
      
      {/* Image Container */}
      <div className="flex-1 relative flex items-center justify-center p-3">
        <div className={`absolute inset-0 ${styles.bg} opacity-20 group-hover:opacity-40 transition-opacity`} />
        <div className="w-4/5 aspect-square relative z-10 transform transition-transform duration-500 group-hover:scale-110">
          <img 
            src={imgUrl} 
            alt={echo.name} 
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
            onError={(e) => {
              const target = e.currentTarget;
              const folderName = (echo as any).folderName;
              if (folderName && !target.src.includes(safeEncodeURIComponent(folderName))) {
                target.src = `${CDN_URL}/ww%20images/Echo/${safeEncodeURIComponent(folderName)}.webp`;
              }
            }}
          />
        </div>
        
        {/* Cost Tag (Top Right) */}
        <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5 bg-black/60 backdrop-blur-md rounded-md border border-white/10 opacity-60 group-hover:opacity-100 transition-opacity">
          <span className="text-[8px] font-black text-brand-accent">C{echo.cost}</span>
        </div>
      </div>

      {/* Info Section */}
      <div className="relative z-20 p-2 bg-[#0d0d0d] border-t border-white/5">
        <p className="text-gray-200 font-bold text-[10px] leading-tight truncate tracking-tight text-center group-hover:text-white transition-colors">
          {echo.name}
        </p>
      </div>
    </button>
  );
};

// ItemDetailModal 래퍼
const WuwaItemModalWrapper = ({ item, isOpen, onClose }: { item: ItemDetail | null, isOpen: boolean, onClose: () => void }) => {
  if (!item) return null;
  return <ItemDetailModal item={item} onClose={onClose} />;
};

export default WuwaEchoGallery;