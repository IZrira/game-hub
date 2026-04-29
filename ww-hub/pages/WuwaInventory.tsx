import React, { useState, useMemo } from 'react';
import WuwaFilter from './WuwaFilter'; 
import WuwaCard from '../components/WuwaCard'; 
import WuwaItemModal from '../components/WuwaItemModal';
import { WuwaItem, WuwaCategory } from '../types'; 
import { Search } from 'lucide-react';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { wuwaItems } from '../data/items';

const WuwaInventory: React.FC = () => {
  const [category, setCategory] = useState<WuwaCategory | '전체'>('전체');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<WuwaItem | null>(null);

  const filteredItems = useMemo(() => {
    return wuwaItems.filter(item => {
      const matchCategory = category === '전체' || item.category === category;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    }).map(item => ({
      ...item,
      img: `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/${encodeURIComponent((item.folderName || item.name).normalize('NFC'))}.webp`
    } as WuwaItem));
  }, [category, search]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="bg-[#121212] rounded-[48px] border border-white/5 p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">인벤토리 도감</h2>
            <p className="text-gray-600 font-bold text-sm">Total Items Detected: {wuwaItems.length}</p>
          </div>
          <div className="relative group w-full max-w-sm">
            <div className="absolute inset-0 bg-[#00FFCC]/20 blur-md rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700 z-10" size={16} />
            <input 
              type="text" 
              autoComplete="off"
              placeholder="아이템 이름 검색..." 
              className="relative w-full bg-[#121212] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#00FFCC] transition-colors placeholder-gray-600 shadow-inner font-bold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-500">
          <WuwaFilter selectedCategory={category} onSelect={setCategory} />
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-x-5 gap-y-10 bg-white/[0.01] p-10 rounded-[50px] border border-white/5 shadow-2xl min-h-[400px]">
        {filteredItems.map(item => (
          <WuwaCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-32 text-gray-600 font-mono text-sm tracking-widest border border-dashed border-white/10 rounded-[48px] bg-white/[0.02]">
          NO ITEMS FOUND IN THIS CATEGORY.
        </div>
      )}

      <WuwaItemModal 
        item={selectedItem} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      <div className="max-w-5xl mx-auto mt-16 mb-8">
        <AdPlaceholder type="leaderboard" />
      </div>
    </div>
  );
};

export default WuwaInventory;