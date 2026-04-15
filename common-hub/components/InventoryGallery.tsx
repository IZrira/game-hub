
import React, { useEffect, useState, useMemo } from 'react';
import { Info, X, Star, Filter, Package, MapPin, Search } from 'lucide-react';
import { ITEM_META, FILTER_CATEGORIES, getAutoRarity, getItemUrl } from '../data/items';
import { useTranslation } from 'react-i18next';
import ItemDetailModal from './ItemDetailModal';

const getItemStyles = (rarity: number) => {
  const styles: Record<number, string> = {
    5: "from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    4: "from-[#634e9e] to-[#3d2f63] border-purple-500/30",
    3: "from-[#3b608a] to-[#1e3045] border-blue-500/30",
    2: "from-[#3b5a41] to-[#25392a] border-green-500/30",
  };
  return styles[rarity] || "from-[#4d4d4d] to-[#333333] border-gray-400/20";
};

interface InventoryGalleryProps {
  gameId?: string;
}

const InventoryGallery: React.FC<InventoryGalleryProps> = ({ gameId = 'hsr' }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const [items, setItems] = useState<{ name: string; url: string; rarity: number; desc: string; type: string; sources: string[]; gameId: string }[]>([]);
  const [loading, setLoading] = useState(true);
  
  // sessionStorage에서 초기값 불러오기
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('inventory_active_tab') || "전체");
  const [search, setSearch] = useState(() => sessionStorage.getItem('inventory_search_query') || "");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // 상태 변경 시 sessionStorage 저장
  useEffect(() => { sessionStorage.setItem('inventory_active_tab', activeTab); }, [activeTab]);
  useEffect(() => { sessionStorage.setItem('inventory_search_query', search); }, [search]);

  useEffect(() => {
    const loadItems = () => {
      try {
        const processed = Object.entries(ITEM_META).map(([name, meta]) => {
          const rarity = meta.rarity || getAutoRarity(name);
          const desc = meta.desc || "아카이브에 아직 상세 정보가 등록되지 않은 아이템입니다.";
          const type = meta.type || "미분류";
          const sources = meta.sources || ["게임 내 확인 필요"];
          const itemGameId = meta.gameId || 'hsr';
          return { 
            name, 
            url: getItemUrl(name, itemGameId), 
            rarity, 
            desc, 
            type, 
            sources,
            gameId: itemGameId
          };
        });
        processed.sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name));
        setItems(processed);
      } catch (error) {
        console.error("아이템 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // 약간의 지연을 주어 로딩 UI를 보여줌 (선택사항)
    const timer = setTimeout(() => {
      loadItems();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchGame = item.gameId === gameId;
      const matchTab = activeTab === "전체" || item.type === activeTab;
        
        let displayName = item.name;
        if (currentLang === 'en') {
          displayName = t(item.name);
        }
        
      const matchSearch = displayName.toLowerCase().includes(search.toLowerCase())
        || item.name.toLowerCase().includes(search.toLowerCase());
      return matchGame && matchTab && matchSearch;
    });
  }, [items, activeTab, search, gameId, currentLang, t]);

  // 모달용 영문 데이터 매핑
  const isEn = currentLang === 'en';

  if (loading) {
    return (
      <div className="w-full py-32 text-center animate-in fade-in duration-1000">
        <div className="inline-block w-12 h-12 border-[3px] border-brand-accent border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs italic">Syncing Inventory Archives...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <div className="flex flex-col gap-1 border-b border-white/5 pb-6 px-2">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">
              {t('인벤토리')} <span className="text-xs text-gray-600 font-bold not-italic uppercase tracking-normal">({filteredItems.length})</span>
            </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center px-2">
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder={t('명칭으로 필터링...')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 bg-white/[0.03] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-base text-white focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 font-bold shadow-inner transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide w-full">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`h-11 px-5 rounded-xl text-[11px] font-black transition-all whitespace-nowrap border flex items-center justify-center ${
                  activeTab === cat 
                  ? "bg-brand-accent border-brand-accent text-black shadow-lg shadow-brand-accent/20" 
                  : "bg-white/[0.03] border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
                }`}
              >
                {t(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-5 gap-y-10 bg-white/[0.01] p-10 rounded-[50px] border border-white/5 shadow-2xl min-h-[400px]">
          {filteredItems.map((item) => (
            <div key={item.name} onClick={() => setSelectedItem(item)} className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
              <div className={`relative isolate w-16 h-16 md:w-20 md:h-20 rounded-[22px] overflow-hidden border-2 bg-gradient-to-b transition-all duration-500 group-hover:brightness-110 shadow-lg flex items-center justify-center ${getItemStyles(item.rarity)}`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
                <img alt={item.name} className="w-full h-full object-contain p-2 relative z-10 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transform transition-transform duration-500 group-hover:scale-110 text-transparent" loading="lazy" src={item.url} />
              </div>
              <div className="w-full px-1 text-center">
                {(() => {
                  const rawDisplayName = t(item.name);
                  let listDisplayName = rawDisplayName;
                  // 영문(en) 아이템 명칭이 너무 길 경우 격자 레이아웃을 위해 생략(...) 처리
                  if (currentLang === 'en' && listDisplayName.length > 25) {
                    listDisplayName = listDisplayName.substring(0, 25) + '...';
                  }
                  return <span className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-tight group-hover:text-white transition-colors uppercase tracking-tight block truncate w-full" title={rawDisplayName}>{listDisplayName}</span>;
                })()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
          <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-xs italic">{t('No data yet.')}</p>
        </div>
      )}

      <ItemDetailModal 
        itemNameEn={selectedItem?.name || ''} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      <div className="p-10 text-center">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] italic">* Synchronization completed with GitHub Global Asset Registry.</p>
      </div>
    </div>
  );
};

export default InventoryGallery;
