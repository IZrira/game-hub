import React, { useState, useMemo } from 'react';
import { Search, Layers, Activity } from 'lucide-react';
import { ECHO_DATA } from '../../ww-hub/data/echoes';
import { SONATA_SETS, WuwaEcho, SonataType } from '../types';
import WuwaCard from './WuwaCard';
import WuwaEchoModal from './WuwaEchoModal'; // 에코 전용 모달
import { wuwaItems } from '../../ww-hub/data/items';
import { WuwaItem } from './ww';
import WuwaItemModal from './WuwaItemModal';

// 에코 도감 및 모달 내 공통 경로 설정
const SONATA_BASE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/sonata/';

// 실제 사용 시 (NFC 정규화 포함)
const getSonataIconUrl = (setName: string) => {
  const encodedName = encodeURIComponent(setName.normalize('NFC'));
  return `${SONATA_BASE_URL}${encodedName}.webp`;
};

const WuwaEchoGallery: React.FC = () => {
  const [activeSonata, setActiveSonata] = useState<string>('전체');
  const [activeCost, setActiveCost] = useState<number | '전체'>('전체');
  const [search, setSearch] = useState('');
  const [selectedEcho, setSelectedEcho] = useState<WuwaEcho | null>(null);
  const [selectedItem, setSelectedItem] = useState<WuwaItem | null>(null);

  // 필터 로직: 세트 + 코스트 + 검색어
  const filteredEchoes = useMemo(() => {
    return ECHO_DATA.filter(echo => {
      const matchSearch = echo.name.toLowerCase().includes(search.toLowerCase());
      const matchSonata = activeSonata === '전체' || echo.sonataSets.includes(activeSonata as SonataType);
      const matchCost = activeCost === '전체' || echo.cost === activeCost;
      return matchSearch && matchSonata && matchCost;
    });
  }, [activeSonata, activeCost, search]);

  const handleShowItemDetail = (itemName: string) => {
    const item = wuwaItems.find(i => i.name === itemName);
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
            <p className="text-gray-600 font-bold text-sm flex items-center gap-2">
              <Activity size={14} /> 분석된 에코 개체: {ECHO_DATA.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
          {/* 도감 내 검색 (필터링 전용) */}
          <div className="relative w-full xl:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="명칭으로 필터링..." 
              className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full space-y-6">
            {/* 코스트 필터 */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">Cost Filter</span>
              <div className="flex flex-wrap gap-3">
                {['전체', 4, 3, 1].map(cost => (
                  <button
                    key={cost}
                    onClick={() => setActiveCost(cost as any)}
                    className={`h-11 min-w-[44px] px-6 rounded-xl text-xs font-black transition-all border flex items-center justify-center ${
                      activeCost === cost ? "bg-white text-black shadow-lg shadow-white/20" : "bg-white/[0.03] text-gray-500 border-white/5 hover:bg-white/10"
                    }`}
                  >
                    {cost === '전체' ? 'ALL COST' : `${cost} COST`}
                  </button>
                ))}
              </div>
            </div>

            {/* 세트 필터 */}
            <div className="space-y-3">
              <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest flex items-center gap-2">Sonata Sets</span>
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
                {SONATA_SETS.map(set => (
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
      </div>

      {/* 에코 리스트 그리드 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-5 gap-y-10 bg-white/[0.01] p-10 rounded-[50px] border border-white/5 shadow-2xl min-h-[400px]">
        {filteredEchoes.map((echo) => (
          <WuwaCard key={echo.id} item={echo} onClick={() => setSelectedEcho(echo)} />
        ))}
      </div>

      <WuwaEchoModal 
        echo={selectedEcho} 
        isOpen={!!selectedEcho} 
        onClose={() => setSelectedEcho(null)}
        onShowItemDetail={handleShowItemDetail}
      />

      <WuwaItemModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
};

export default WuwaEchoGallery;