import React from 'react';
import { X } from 'lucide-react';
import { renderRichText } from '../data/formatter';

const WuwaWeaponModal = ({ weapon, isOpen, onClose }: any) => {
  if (!isOpen) return null;

  const RARITY_COLORS: any = {
    5: 'yellow-500',
    4: 'purple-500',
    3: 'blue-500',
    2: 'emerald-500',
    1: 'slate-500',
  };
  const rarityColor = RARITY_COLORS[weapon.rarity] || 'yellow-500';

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl h-[80vh] bg-[#0f0f0f] border border-white/10 rounded-[40px] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="p-8 border-b border-white/5 flex items-center gap-8 bg-white/[0.02]">
          <div className="w-32 h-32 bg-white/5 rounded-3xl p-4 shrink-0 shadow-inner">
            <img 
              src={`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/Weapons/${encodeURIComponent(weapon.name.normalize('NFC'))}.webp`}
              className="w-full h-full object-contain"
              alt={weapon.name}
            />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black bg-${rarityColor} text-white px-2 py-0.5 rounded tracking-tighter uppercase`}>{weapon.type}</span>
              <div className="flex gap-0.5">
                {[...Array(weapon.rarity)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full bg-${rarityColor}`} />
                ))}
              </div>
            </div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none">{weapon.name}</h2>
          </div>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {/* 스탯 정보 */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-[28px] border border-white/5 space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Base ATK</p>
              <p className="text-2xl font-black text-white italic">{weapon.stats.atk}</p>
            </div>
            <div className="bg-white/5 p-6 rounded-[28px] border border-white/5 space-y-1">
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{weapon.stats.subStatName}</p>
              <p className="text-2xl font-black text-brand-accent italic">{weapon.stats.subStatValue}</p>
            </div>
          </section>

          {/* 무기 스킬 (지능형 컬러 적용) */}
          <section className="space-y-4">
            <div className={`flex items-center gap-3 border-l-4 border-${rarityColor} pl-4`}>
              <h4 className="text-sm font-black italic text-white uppercase tracking-widest">{weapon.skill?.name ? weapon.skill.name.replace(/\*\*/g, '').trim() : ''}</h4>
              <span className="text-[10px] font-bold text-gray-400">RANK 1</span>
            </div>
            <div className={`bg-${rarityColor}/5 p-8 rounded-[32px] border border-${rarityColor}/10`}>
              <p className="text-gray-200 leading-relaxed font-medium text-base whitespace-pre-wrap italic">
                {renderRichText(weapon.skill.description)}
              </p>
            </div>
          </section>

          {/* 스토리 */}
          <section className="space-y-4 opacity-50 hover:opacity-100 transition-opacity">
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Archive Story</h4>
            <p className="text-xs text-gray-400 leading-loose italic">{weapon.description}</p>
          </section>
        </div>

        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default WuwaWeaponModal;