import React from 'react';
import { WuwaCategory } from '../components/ww';

interface Props {
  selectedCategory: WuwaCategory | '전체';
  onSelect: (category: WuwaCategory | '전체') => void;
}

const categories: (WuwaCategory | '전체')[] = [
  '전체', '공명자 돌파 재료', '공명자 경험치 재료', '무기 경험치 재료',
  '스킬 업그레이드 재료', '무기 및 스킬 재료', '재료', '소모품',
  '특수 화폐', '튜닝 관련 아이템', '에코 육성 재료', '돌파 재료', '무기 제작 재료', '요리'
];

const WuwaFilter: React.FC<Props> = ({ selectedCategory, onSelect }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border
              ${selectedCategory === cat 
                ? 'bg-[#00FFCC] text-black border-[#00FFCC] shadow-lg shadow-[#00FFCC]/20' 
                : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WuwaFilter;