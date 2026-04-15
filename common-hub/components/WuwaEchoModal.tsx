import React, { useState } from 'react';
import { X, Shield, Box, Info, Zap } from 'lucide-react';
import { WuwaEcho, SonataType } from '../types';
import { renderRichText, ELEMENT_COLORS } from '../../ww-hub/data/formatter.tsx';
import { SONATA_EFFECTS } from '../../ww-hub/data/sonataEffects';
import { WW_ITEM_META as ITEM_META } from '../../ww-hub/data/items';

const WuwaEchoModal = ({ echo, isOpen, onClose, onShowItemDetail }: any) => {
  // 모달 열릴 때 항상 'ability' 탭이 먼저 보이도록 초기값 고정
  const [activeTab, setActiveTab] = useState<'ability' | 'enemy'>('ability');
  const [hoveredSet, setHoveredSet] = useState<string | null>(null);

  if (!isOpen || !echo) return null;

  const ECHO_IMAGE_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/Echo/';
  const ITEM_IMAGE_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/';
  const SONATA_ICON_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/sonata/';

  return (
    // z-index를 9998으로 설정하여 일반 아이템 모달(9999) 뒤에 뜨면서도 경로바보다는 최상단에 노출되도록 배치
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl h-[80vh] bg-[#0f0f0f] border border-white/10 rounded-[40px] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* 상단 헤더 */}
        <div className="p-8 border-b border-white/5 flex items-center gap-6 shrink-0 bg-white/[0.02]">
          <div className="w-24 h-24 bg-white/5 rounded-3xl p-3 shrink-0">
            <img 
              src={`${ECHO_IMAGE_BASE}${encodeURIComponent(echo.name.normalize('NFC'))}.webp`} 
              alt={echo.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">{echo.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-black text-brand-accent border border-brand-accent/30 px-2 py-0.5 rounded">COST {echo.cost}</span>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{(echo as any).enemyInfo?.grade}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white"><X size={24} /></button>
        </div>

        {/* 탭 버튼 */}
        <div className="flex p-2 bg-white/[0.01] border-b border-white/5 shrink-0">
          <button onClick={() => setActiveTab('ability')} className={`flex-1 py-3 rounded-2xl text-[11px] font-black tracking-widest ${activeTab === 'ability' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>ECHO ABILITY</button>
          <button onClick={() => setActiveTab('enemy')} className={`flex-1 py-3 rounded-2xl text-[11px] font-black tracking-widest ${activeTab === 'enemy' ? 'bg-brand-accent text-white' : 'text-gray-500'}`}>ENEMY INTEL</button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          {activeTab === 'ability' ? (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* 세트 정보 및 호버 효과 */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Sonata Synergy</h4>
                <div className="flex flex-wrap gap-3">
                  {(echo as any).sonataSets.map((setName: any) => (
                    <div 
                      key={setName}
                      onMouseEnter={() => setHoveredSet(setName)}
                      onMouseLeave={() => setHoveredSet(null)}
                      className="relative group flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 cursor-help"
                    >
                      <img src={`${SONATA_ICON_BASE}${encodeURIComponent(setName.normalize('NFC'))}.webp`} className="w-6 h-6" alt={setName} />
                      <span className="text-[11px] font-black text-gray-300">{setName}</span>
                      
                      {/* 세트 효과 툴팁 팝업 */}
                      {hoveredSet === setName && (
                        <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-[#1a1a1a] border border-white/20 rounded-2xl shadow-2xl z-[200] animate-in zoom-in-95">
                          <p className="text-[10px] font-black text-brand-accent mb-2 uppercase tracking-widest">{setName} 세트 효과</p>
                          <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                            {SONATA_EFFECTS.find(s => s.setName === setName)?.effect.twoPiece}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 어빌리티 원문 설명 (CD 상단 삭제) */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <Zap size={14} className="text-brand-accent"/> Ability Description
                </h4>
                <div className="bg-white/5 p-6 md:p-8 rounded-[32px] border border-white/5 shadow-inner">
                  {/* break-words: 긴 수치가 영역을 벗어나지 않게 함
                     leading-relaxed: 행간을 넓혀 가독성 확보
                     min-h-[100px]: 내용이 적어도 최소 높이 유지
                  */}
                  <p className="text-gray-300 leading-relaxed font-medium text-sm md:text-base whitespace-pre-wrap italic break-words">
                    {renderRichText(echo.description)}
                  </p>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in duration-300">
              {/* 저항 캡슐 */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Resistance Matrix</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries((echo as any).enemyInfo?.resistances || {}).map(([attr, val]) => (
                    <div key={attr} className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/5 bg-white/[0.03]">
                      <img src={`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/stats/${attr}%20피해%20저항.webp`} className="w-5 h-5" alt={attr} />
                      <div className="flex justify-between w-full items-center">
                        <span className="text-[11px] font-black tracking-tight" style={{ color: ELEMENT_COLORS[attr] }}>{attr} 피해 저항</span>
                        <span className="text-[12px] font-black text-white">{val as number}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 드랍 아이템 (인벤토리 스타일 + 등급 + 에코 예외 처리) */}
              <section className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Drop Materials</h4>
                <div className="flex flex-wrap gap-4">
                  {(echo as any).enemyInfo?.drops.map((itemName: string) => {
                    const rarity = (ITEM_META as any)[itemName]?.rarity || 1;
                    // 아이템 이름이 에코 이름과 같거나 '반디의 군세'처럼 에코인 경우 Echo 경로 사용
                    const isEchoItem = itemName === echo.name || itemName.includes('군세') || itemName.includes('로봇');
                    const imgUrl = isEchoItem 
                      ? `${ECHO_IMAGE_BASE}${encodeURIComponent(itemName.normalize('NFC'))}.webp`
                      : `${ITEM_IMAGE_BASE}${encodeURIComponent(itemName.normalize('NFC'))}.webp`;

                    return (
                      <button 
                        key={itemName}
                        onClick={() => onShowItemDetail(itemName)}
                        className="relative group w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-brand-primary/50 transition-all"
                      >
                        <img src={imgUrl} className="w-full h-full object-contain p-2" alt={itemName} />
                        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: getRarityColor(rarity) }} />
                        <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-bold text-white text-center p-1">상세 정보</span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 등급별 컬러 헬퍼
const getRarityColor = (rarity: number) => {
  const colors: any = { 1: '#9ca3af', 2: '#4ade80', 3: '#60a5fa', 4: '#a78bfa', 5: '#fbbf24' };
  return colors[rarity] || colors[1];
};

export default WuwaEchoModal;