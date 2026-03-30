import React from 'react';
import { WuwaItem } from './ww';
import { X } from 'lucide-react';

interface Props {
  item: WuwaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const RARITY_COLORS: Record<number, string> = {
  1: 'text-gray-400',
  2: 'text-green-400',
  3: 'text-blue-400',
  4: 'text-purple-400',
  5: 'text-yellow-500',
};

const WuwaItemModal: React.FC<Props> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item) return null;

  // CDN 이미지 경로 생성 (앞서 성공한 규칙 적용)
  const BASE_URL = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/";
  const targetName = item.folderName || item.name;
  const imageSrc = `${BASE_URL}${encodeURIComponent(targetName.normalize('NFC'))}.webp`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* 배경 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 모달 본체 (스타레일 스타일 유리창) */}
      <div className="relative w-full max-w-lg bg-[#1a1a1a]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* 상단 헤더: 이름 및 닫기 버튼 */}
        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5">
          <div className="space-y-1">
            <h3 className={`text-2xl font-black italic tracking-tighter ${RARITY_COLORS[item.rarity]}`}>
              {item.name}
            </h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              {item.category} | Rarity {item.rarity}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* 중앙 콘텐츠: 이미지 및 설명 */}
        <div className="p-8 space-y-8">
          {/* 아이템 대형 이미지 영역 */}
          <div className="flex justify-center py-4">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <div className={`absolute inset-0 blur-3xl opacity-20 ${item.rarity >= 4 ? 'bg-yellow-500' : 'bg-blue-500'}`} />
              <img 
                src={imageSrc} 
                alt={item.name} 
                className="w-full h-full object-contain relative z-10 filter drop-shadow-2xl"
              />
            </div>
          </div>

          {/* 아이템 설명 및 효과 */}
          <div className="space-y-6">
            <section className="space-y-2">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Item Description</h4>
              <p className="text-gray-300 leading-relaxed font-medium text-sm md:text-base whitespace-pre-wrap">
                {item.description || "아이템 설명 정보가 존재하지 않습니다."}
              </p>
            </section>

            {/* 획득 경로 (Source) */}
            <section className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[10px] font-black text-[#00FFCC] uppercase tracking-[0.2em]">Obtain Method</h4>
              <div className="flex flex-wrap gap-2">
                {item.source ? item.source.split(',').map((src, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-gray-400">
                    {src.trim()}
                  </span>
                )) : (
                  <span className="text-xs text-gray-600 italic">획득 경로를 탐색 중입니다...</span>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* 하단 푸터: 장식 요소 */}
        <div className="h-2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </div>
  );
};

export default WuwaItemModal;