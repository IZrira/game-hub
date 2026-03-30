import React from 'react';
import { WuwaItem } from '../components/ww';

interface Props {
  item: WuwaItem;
}

const rarityColors: Record<number, string> = {
  5: 'border-yellow-500/50 shadow-yellow-500/20 text-yellow-500',
  4: 'border-purple-500/50 shadow-purple-500/20 text-purple-500',
  3: 'border-blue-500/50 shadow-blue-500/20 text-blue-500',
  2: 'border-green-500/50 shadow-green-500/20 text-green-500',
  1: 'border-gray-500/50 shadow-gray-500/20 text-gray-400',
};

const WuwaCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-[#0B0E14] border border-white/10 rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:-translate-y-1 hover:border-[#00FFCC]/50 hover:shadow-[0_8px_24px_rgba(0,255,204,0.15)] group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className={`w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center border shadow-lg transition-colors ${rarityColors[item.rarity] || rarityColors[1]}`}>
        <span className="text-xl font-black">{item.rarity}★</span>
      </div>
      
      <div className="text-center space-y-1.5 relative z-10 w-full">
        <h3 className="text-xs sm:text-sm font-bold text-white truncate px-1 group-hover:text-[#00FFCC] transition-colors" title={item.name}>
          {item.name}
        </h3>
        <p className="text-[10px] text-gray-500 font-medium bg-white/5 rounded px-2 py-0.5 inline-block truncate max-w-full">
          {item.category}
        </p>
      </div>
    </div>
  );
};

export default WuwaCard;