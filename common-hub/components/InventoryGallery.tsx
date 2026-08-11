import React, { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { getItemMetaDB, FILTER_CATEGORIES, getItemUrl, getAutoRarity, categorizeItem } from '../data/items';
import { getGameData } from '../data/dataManager';
import { useTranslation } from 'react-i18next';
import { ItemPremiumCard } from './GalleryCards';

interface InventoryGalleryProps {
  gameId?: string;
  customCategories?: string[];
}

const InventoryGallery: React.FC<InventoryGalleryProps> = ({ gameId = 'hsr', customCategories }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const displayCategories = useMemo(() => {
    const base = customCategories || FILTER_CATEGORIES;
    const itemTypes = new Set(items.map(item => item.type).filter(Boolean));
    const merged = [...base];
    itemTypes.forEach(t => {
      if (!merged.includes(t) && t !== '미분류') {
        merged.push(t);
      }
    });
    return merged;
  }, [customCategories, items]);

  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem(`inventory_tab_${gameId}`) || "전체");
  const [search, setSearch] = useState(() => sessionStorage.getItem(`inventory_search_${gameId}`) || "");

  useEffect(() => { sessionStorage.setItem(`inventory_tab_${gameId}`, activeTab); }, [activeTab, gameId]);
  useEffect(() => { sessionStorage.setItem(`inventory_search_${gameId}`, search); }, [search, gameId]);

  useEffect(() => {
    const loadItems = () => {
      try {
        const gameData = getGameData(gameId);
        const db = gameData.INVENTORY_DB || {}; // 노션 연동 데이터가 합쳐진 DB 사용
        
        const processed = Object.entries(db).map(([name, meta]) => {
          const itemMeta = meta as any;
          const rarity = itemMeta.rarity || getAutoRarity(name);
          return {
            name,
            url: getItemUrl(name, itemMeta.gameId || gameId, itemMeta.fileName) || '',
            rarity,
            desc: itemMeta.desc || itemMeta.description || itemMeta.content || "상세 정보가 없습니다.",
            type: itemMeta.type || itemMeta.category || "미분류",
            sources: itemMeta.sources || (itemMeta.source ? (typeof itemMeta.source === 'string' ? itemMeta.source.split(',').map((s:string) => s.trim()) : itemMeta.source) : ["게임 내 확인"]),
            gameId: itemMeta.gameId || 'hsr',
            itemAttribute: itemMeta.itemAttribute // 남여 분리 등 특수 속성
          };
        });
        processed.sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name));
        setItems(processed);
      } catch (error) {
        console.error("아이템 로드 중 오류:", error);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchGame = !gameId || item.gameId === gameId;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      
      let matchTab = activeTab === "전체";
      if (!matchTab) {
        if (customCategories) {
          // 커스텀 카테고리가 있는 경우 (명조 등) 정확한 타입 매칭
          matchTab = item.type === activeTab;
        } else {
          // 공통 카테고리인 경우 대분류 매칭
          const mainCategory = categorizeItem(item.type);
          matchTab = mainCategory === activeTab;
        }
      }
      
      return matchGame && matchSearch && matchTab;
    });
  }, [items, search, activeTab, gameId, customCategories]);

  if (loading) {
    return (
      <div className="w-full py-32 text-center">
        <div className="inline-block w-12 h-12 border-[3px] border-brand-accent border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xs italic">Synchronizing Item DB...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      {/* Clean Header Section */}
      <div className="flex flex-col gap-8 pb-8 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-white uppercase italic">
              {t('Archive')} <span className="text-gray-400">Index</span>
            </h2>
            <p className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Status: Core Database Synchronized</p>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-4 items-center">
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder={t('Search database...')} 
              className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl py-2 pl-11 pr-4 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-white/20 transition-all font-bold" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {displayCategories.map(cat => {
              const isActive = activeTab === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                    isActive 
                      ? "bg-white text-black border-white" 
                      : "text-gray-400 border-white/5 hover:border-white/10 hover:text-gray-400"
                  }`}
                >
                  {t(cat === '전체' ? 'ALL' : cat)}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compact Content Section */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
          {filteredItems.map((item) => (
            <ItemPremiumCard 
              key={item.name} 
              item={{ ...item, rarity: item.rarity }} 
            />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center">
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] italic">
            {t('Registry empty.')}
          </p>
        </div>
      )}

      <div className="p-10 text-center">
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] italic">* GitHub Asset Registry Synchronization Active.</p>
      </div>
    </div>
  );
};

export default InventoryGallery;
