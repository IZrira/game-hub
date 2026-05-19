import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Shield, Box, Info, Zap } from 'lucide-react';
import { WuwaEcho, SonataType } from '../types';
import { renderRichText, ELEMENT_COLORS } from '../data/formatter';
import { SONATA_EFFECTS } from '../data/sonataEffects';
import { getItemUrl, getItemMetaDB } from '../../common-hub/data/items';
import { ECHO_DATA } from '../data/echoes';
import { CDN_URL } from '../../common-hub/utils/assetManager';

// 등급별 컬러 헬퍼
const getRarityColor = (rarity: number) => {
  const colors: any = { 1: '#9ca3af', 2: '#4ade80', 3: '#60a5fa', 4: '#a78bfa', 5: '#fbbf24' };
  return colors[rarity] || colors[1];
};

export const WuwaEchoModal = ({ echo, isOpen, onClose, onShowItemDetail, onSelectSonata }: any) => {
  // 모달 열릴 때 항상 'ability' 탭이 먼저 보이도록 초기값 고정
  const [activeTab, setActiveTab] = useState<'ability' | 'enemy'>('ability');
  
  // 팬텀(이상) 에코 이미지 토글 상태
  const isPhantom = !!echo?.hasPhantom;
  const [showPhantom, setShowPhantom] = useState(false); // 기본은 원본 이미지

  // 에코 변경 시 토글 초기화
  useEffect(() => {
    setShowPhantom(false);
  }, [echo?.id]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getRarityStars = (cost: number) => {
    const starCount = cost === 4 ? 5 : cost === 3 ? 4 : 3;
    return starCount;
  };

  if (!isOpen || !echo) return null;

  const ECHO_IMAGE_BASE = `${CDN_URL}/ww%20images/Echo/`;
  const SONATA_ICON_BASE = `${CDN_URL}/ww%20images/common/sonata/`;

    return createPortal(
      <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-[48px] p-10 shadow-2xl animate-in zoom-in-95 max-h-[90vh] flex flex-col">
          <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-20">
            <X size={28} />
          </button>

          <div className="space-y-8 flex flex-col">
            {/* 상단 헤더: HSR 스타일 가로 레이아웃 */}
            <div className="flex flex-col md:flex-row items-center gap-10 shrink-0">
              <div className="w-40 h-40 bg-white/5 rounded-[32px] p-6 border border-white/10 shrink-0 relative group">
                <div className="absolute inset-0 bg-brand-accent/10 blur-2xl rounded-full opacity-50" />
                <img 
                  src={`${ECHO_IMAGE_BASE}${encodeURIComponent((isPhantom && showPhantom ? '이상 · ' + echo.name : echo.name).normalize('NFC'))}.webp`} 
                  alt={echo.name} 
                  className="w-full h-full object-contain relative z-10"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const folderName = (echo as any).folderName;
                    if (folderName && !target.src.includes(encodeURIComponent(folderName))) {
                      target.src = `${ECHO_IMAGE_BASE}${encodeURIComponent(folderName.normalize('NFC'))}.webp`;
                    }
                  }}
                />
              </div>
              <div className="text-center md:text-left space-y-4 flex-1">
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="px-3 py-1 bg-brand-accent/20 text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-accent/30">
                    COST {echo.cost}
                  </span>
                  <span className="px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">
                    {(echo as any).enemyInfo?.grade}
                  </span>
                  <div className="flex gap-0.5 items-center bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    {Array.from({ length: getRarityStars(echo.cost) }).map((_, i) => (
                      <Zap key={i} size={8} fill="#FFD600" className="text-[#FFD600]" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">{echo.name}</h3>
                  {isPhantom && (
                    <button 
                      onClick={() => setShowPhantom(!showPhantom)}
                      className={`text-[10px] font-black px-3 py-1 rounded-full transition-all border ${showPhantom ? 'bg-brand-primary text-white border-brand-primary shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.4)]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-white'}`}
                    >
                      {showPhantom ? '팬텀 외형 ON' : '원본 외형 ON'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 탭 버튼: HSR 스타일 언더라인 탭 */}
            <div className="flex gap-8 border-b border-white/5 shrink-0 px-2">
              <button 
                onClick={() => setActiveTab('ability')} 
                className={`pb-4 text-[12px] font-black tracking-widest transition-all relative ${activeTab === 'ability' ? 'text-brand-accent' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ECHO ABILITY
                {activeTab === 'ability' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-in fade-in slide-in-from-left-2" />}
              </button>
              <button 
                onClick={() => setActiveTab('enemy')} 
                className={`pb-4 text-[12px] font-black tracking-widest transition-all relative ${activeTab === 'enemy' ? 'text-brand-accent' : 'text-gray-500 hover:text-gray-300'}`}
              >
                ENEMY INTEL
                {activeTab === 'enemy' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-accent animate-in fade-in slide-in-from-left-2" />}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-10 custom-scrollbar">
            {activeTab === 'ability' ? (
              <div className="space-y-10 animate-in fade-in duration-300">
                {/* 세트 정보 및 호버 효과 */}
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Sonata Synergy</h4>
                  <div className="flex flex-wrap gap-3">
                    {(echo as any).sonataSets.map((setName: any) => (
                      <div 
                        key={setName}
                        onClick={() => onSelectSonata?.(setName)}
                        className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 cursor-pointer hover:bg-brand-primary/10 hover:border-brand-primary/50 transition-all"
                      >
                        <img src={`${SONATA_ICON_BASE}${encodeURIComponent(setName.normalize('NFC'))}.webp`} className="w-5 h-5" alt={setName} />
                        <span className="text-[11px] font-bold text-gray-300">{setName}</span>
                      </div>
                    ))}
                  </div>
                </section>
  
                {/* 어빌리티 원문 설명 */}
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Zap size={14} className="text-brand-accent"/> Ability Description
                  </h4>
                  <div className="bg-white/5 p-6 md:p-8 rounded-[32px] border border-white/5 shadow-inner">
                    <p className="text-gray-300 leading-relaxed font-medium text-sm md:text-base whitespace-pre-wrap italic break-words">
                      {renderRichText(echo.description)}
                    </p>
                  </div>
                </section>

                {/* 소나타 세트 효과 상세 (툴팁 대신 하단 배치) */}
                <section className="space-y-6 pt-4 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                    <Shield size={14} className="text-brand-accent"/> Sonata Synergy Effects
                  </h4>
                  <div className="space-y-4">
                    {(echo as any).sonataSets.map((setName: any) => {
                      const effect = SONATA_EFFECTS.find(s => s.setName === setName)?.effect;
                      if (!effect) return null;
                      return (
                        <div key={setName} className="bg-white/[0.02] border border-white/5 rounded-[24px] p-6 space-y-4">
                          <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                            <img src={`${SONATA_ICON_BASE}${encodeURIComponent(setName.normalize('NFC'))}.webp`} className="w-6 h-6" alt={setName} />
                            <span className="text-sm font-black text-brand-accent">{setName}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {effect.twoPiece && (
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-brand-primary uppercase tracking-tighter">2-Piece Set Effect</p>
                                <p className="text-[13px] text-gray-300 leading-snug font-medium">{effect.twoPiece}</p>
                              </div>
                            )}
                            {effect.threePiece && (
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-brand-primary uppercase tracking-tighter">3-Piece Set Effect</p>
                                <p className="text-[13px] text-gray-300 leading-snug font-medium">{effect.threePiece}</p>
                              </div>
                            )}
                            {effect.fivePiece && (
                              <div className="space-y-1">
                                <p className="text-[9px] font-black text-brand-primary uppercase tracking-tighter">5-Piece Set Effect</p>
                                <p className="text-[13px] text-gray-300 leading-snug font-medium whitespace-pre-wrap">{effect.fivePiece}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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
  
                {/* 드랍 아이템 */}
                <section className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Drop Materials</h4>
                  <div className="flex flex-wrap gap-4">
                    {(echo as any).enemyInfo?.drops.map((itemName: string) => {
                      const db = getItemMetaDB();
                      const item = db[itemName];
                      const rarity = item?.rarity || 1;
                      
                      const isEchoItem = ECHO_DATA.some(e => e.name === itemName);
                      const imgUrl = isEchoItem 
                        ? `${ECHO_IMAGE_BASE}${encodeURIComponent(itemName.normalize('NFC'))}.webp`
                        : getItemUrl(itemName, 'ww');
    
                      return (
                        <button 
                          key={itemName}
                          onClick={() => onShowItemDetail(itemName)}
                          className="relative group w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:border-brand-primary/50 transition-all"
                        >
                          <img src={imgUrl || ''} className="w-full h-full object-contain p-2" alt={itemName} />
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
      </div>,
      document.body
    );
};