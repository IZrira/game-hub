import React, { useEffect, useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { wuwaItems } from '../../ww-hub/data/items'; // 명조 아이템 데이터 가져오기
import { ECHO_DATA } from '../../ww-hub/data/echoes'; // 명조 에코 데이터 가져오기
import { WuwaItem } from './ww'; // WuwaItem 타입 가져오기
import WuwaCard from './WuwaCard'; // WuwaCard 컴포넌트 가져오기
import WuwaItemModal from './WuwaItemModal'; // WuwaItemModal 컴포넌트 가져오기

// 명조 아이템 카테고리 필터 목록
const WUWA_FILTER_CATEGORIES = [
  "전체",
  "요리",
  "돌파 재료",
  "특수 화폐",
  "소모품",
  "재료",
  "무기 및 스킬 재료"
];

const WuwaInventory: React.FC = () => {
  const [items, setItems] = useState<WuwaItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // sessionStorage에서 초기값 불러오기 (명조 인벤토리 전용 키 사용)
  const [activeTab, setActiveTab] = useState(() => sessionStorage.getItem('ww_inventory_active_tab') || "전체");
  const [search, setSearch] = useState(() => sessionStorage.getItem('ww_inventory_search_query') || "");
  const [selectedItem, setSelectedItem] = useState<WuwaItem | null>(null);

  // 상태 변경 시 sessionStorage 저장
  useEffect(() => { sessionStorage.setItem('ww_inventory_active_tab', activeTab); }, [activeTab]);
  useEffect(() => { sessionStorage.setItem('ww_inventory_search_query', search); }, [search]);

  useEffect(() => {
    const loadItems = () => {
      try {
        // wuwaItems 데이터만 사용 (에코 제외)
        const processedItems = wuwaItems.map(item => ({ 
          ...item,
          img: `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/${encodeURIComponent((item.folderName || item.name).normalize('NFC'))}.webp`
        } as WuwaItem));
        
        // 정렬: rarity(내림차순)
        processedItems.sort((a, b) => {
          return b.rarity - a.rarity || a.name.localeCompare(b.name);
        });
        
        setItems(processedItems);
      } catch (error) {
        console.error("명조 아이템 목록을 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // 로딩 UI를 보여주기 위한 약간의 지연
    const timer = setTimeout(() => {
      loadItems();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;

      if (activeTab === "전체") return true;
      
      return item.category === activeTab;
    });
  }, [items, activeTab, search]);

  if (loading) {
    return (
      <div className="w-full py-32 text-center animate-in fade-in duration-1000">
        <div className="inline-block w-12 h-12 border-[3px] border-brand-accent border-t-transparent rounded-full animate-spin mb-6"></div>
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-xs italic">Syncing Wuthering Waves Inventory Archives...</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-brand-accent italic flex items-center gap-4">
              명조 인벤토리 <span className="text-xs text-gray-600 font-bold not-italic uppercase tracking-normal">({filteredItems.length} 항목)</span>
            </h2>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={16} />
            <input 
              type="text" 
              id="ww-inventory-search"
              name="ww-inventory-search"
              placeholder="아이템 명칭 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-primary/50 w-full md:w-80 transition-all focus:bg-white/10 text-white placeholder:text-gray-600 font-bold"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5 overflow-x-auto scrollbar-hide">
          {WUWA_FILTER_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-[11px] font-black transition-all whitespace-nowrap border ${
                activeTab === cat 
                ? "bg-brand-accent border-brand-accent text-black shadow-[0_0_20px_rgba(226,110,229,0.3)]" 
                : "bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-5 gap-y-10 bg-white/[0.01] p-10 rounded-[50px] border border-white/5 shadow-2xl min-h-[400px]">
          {filteredItems.map((item) => (
            <WuwaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
          <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-xs italic">검색 결과에 해당하는 아이템이 없습니다.</p>
        </div>
      )}

      <WuwaItemModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      <div className="p-10 text-center">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] italic">* Synchronization completed with GitHub Global Asset Registry.</p>
      </div>
    </div>
  );
};

export default WuwaInventory;
