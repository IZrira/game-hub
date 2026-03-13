
import React, { useEffect, useState, useMemo } from 'react';
import { Info, X, Star, Filter, Package, Zap, MapPin, Search } from 'lucide-react';
import { ITEM_META, FILTER_CATEGORIES, getAutoRarity, getItemUrl } from '../data/items';

const getItemStyles = (rarity: number) => {
  const styles: Record<number, string> = {
    5: "from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    4: "from-[#634e9e] to-[#3d2f63] border-purple-500/30",
    3: "from-[#3b608a] to-[#1e3045] border-blue-500/30",
    2: "from-[#3b5a41] to-[#25392a] border-green-500/30",
  };
  return styles[rarity] || "from-[#4d4d4d] to-[#333333] border-gray-400/20";
};

const InventoryGallery: React.FC = () => {
  const [items, setItems] = useState<{ name: string; url: string; rarity: number; desc: string; type: string; sources: string[] }[]>([]);
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
          return { 
            name, 
            url: getItemUrl(name), 
            rarity, 
            desc, 
            type, 
            sources 
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
      const matchTab = activeTab === "전체" || item.type === activeTab;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [items, activeTab, search]);

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black text-brand-accent italic flex items-center gap-4">
              인벤토리 <span className="text-xs text-gray-600 font-bold not-italic uppercase tracking-normal">({filteredItems.length} 항목)</span>
            </h2>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={16} />
            <input 
              type="text" 
              id="inventory-search"
              name="inventory-search"
              placeholder="아이템 명칭 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-primary/50 w-full md:w-80 transition-all focus:bg-white/10 text-white placeholder:text-gray-600 font-bold"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pb-6 border-b border-white/5 overflow-x-auto scrollbar-hide">
          {FILTER_CATEGORIES.map(cat => (
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
            <div key={item.name} onClick={() => setSelectedItem(item)} className="flex flex-col items-center gap-3 group cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95">
              <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-[22px] overflow-hidden border-2 bg-gradient-to-b transition-all duration-500 group-hover:brightness-110 shadow-lg flex items-center justify-center ${getItemStyles(item.rarity)}`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-white pointer-events-none z-20" />
                <img alt={item.name} className="w-full h-full object-contain p-2 relative z-10 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transform transition-transform duration-500 group-hover:scale-110" loading="lazy" src={item.url} />
              </div>
              <div className="w-full px-1 text-center">
                <span className="text-[10px] md:text-[11px] text-gray-500 font-bold leading-tight group-hover:text-white transition-colors uppercase tracking-tight block overflow-hidden text-ellipsis line-clamp-2 min-h-[2.5em]">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white/5 rounded-[40px] border border-dashed border-white/10">
          <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-xs italic">검색 결과에 해당하는 아이템이 없습니다.</p>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setSelectedItem(null)} />
          <div className="relative glass-card max-w-lg w-full rounded-[40px] p-10 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="absolute top-0 right-0 p-6">
                <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"><X size={24} /></button>
             </div>
             <div className="flex flex-col items-center text-center space-y-8">
                <div className="relative group">
                   <div className="absolute inset-0 opacity-40 blur-[60px]" style={{ backgroundColor: getItemStyles(selectedItem.rarity).includes('yellow') ? '#EAB308' : '#7E30E1' }} />
                   <div className="w-40 h-40 flex items-center justify-center relative z-10">
                      <img src={selectedItem.url} alt={selectedItem.name} className="max-w-full max-h-full object-contain p-4 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
                   </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black tracking-tight text-white">{selectedItem.name}</h2>
                  <div className="flex justify-center gap-1.5">
                    {Array.from({ length: selectedItem.rarity }).map((_, i) => (<Star key={i} size={18} fill="#EAB308" className="text-yellow-500" />))}
                  </div>
                </div>
                <div className="w-full h-px bg-white/10" />
                <div className="space-y-6 w-full text-left">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><Package size={14} className="text-brand-accent" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Item Category</span></div>
                      <span className="text-xs font-black text-brand-accent uppercase bg-brand-accent/10 px-4 py-1.5 rounded-full border border-brand-accent/20">{selectedItem.type}</span>
                   </div>
                   <div className="relative">
                      <div className="flex items-center gap-2 mb-3"><Info size={14} className="text-brand-primary" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Archive Intel</span></div>
                      <p className="text-gray-300 text-[15px] leading-relaxed font-medium bg-white/[0.03] p-6 rounded-[30px] border border-white/5 shadow-inner italic">{selectedItem.desc}</p>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-2"><MapPin size={14} className="text-green-400" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">Acquisition Sources</span></div>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.sources.map((source: string, idx: number) => (<span key={idx} className="bg-white/5 text-gray-400 px-3 py-1.5 rounded-xl text-[12px] font-bold border border-white/10">{source}</span>))}
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
      <div className="p-10 text-center">
        <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] italic">* Synchronization completed with GitHub Global Asset Registry.</p>
      </div>
    </div>
  );
};

export default InventoryGallery;
