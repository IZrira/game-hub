import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { renderRichText } from '../data/formatter';

const handlePlainCopy = (e: React.ClipboardEvent) => {
  const selection = window.getSelection()?.toString();
  if (selection) {
    e.clipboardData.setData('text/plain', selection);
    e.preventDefault();
  }
};

const WuwaWeaponModal = ({ weapon, isOpen, onClose }: any) => {
  const [isCopied, setIsCopied] = useState(false);
  if (!isOpen) return null;

  const handleCopyTitle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(weapon.name);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

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
      <div 
        onCopy={handlePlainCopy}
        className="relative w-full max-w-2xl h-[80vh] bg-[#0f0f0f] border border-white/10 rounded-[40px] overflow-hidden flex flex-col"
      >
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
            <div className="flex items-center gap-3 group/title">
              <h2 
                onCopy={(e) => {
                  const selection = window.getSelection()?.toString() || weapon.name;
                  e.clipboardData.setData('text/plain', selection);
                  e.preventDefault();
                }}
                className="text-4xl font-black tracking-tighter text-white uppercase leading-none select-text"
              >
                {weapon.name}
              </h2>
              <button
                type="button"
                onClick={handleCopyTitle}
                title="이름 복사 (일반 텍스트)"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center shrink-0"
              >
                {isCopied ? <Check size={18} className="text-green-400 animate-in zoom-in-50 duration-200" /> : <Copy size={18} className="opacity-70 group-hover/title:opacity-100 transition-opacity" />}
              </button>
            </div>
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