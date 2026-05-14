import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Home as HomeIcon, Shield, Zap, Info, Box, Star } from 'lucide-react';
import { ECHO_DATA } from '../data/echoes';
import { SONATA_EFFECTS } from '../data/sonataEffects';
import { renderRichText, ELEMENT_COLORS } from '../data/formatter';
import { CDN_URL } from '../../common-hub/utils/assetManager';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { getItemUrl, getItemMetaDB } from '../../common-hub/data/items';
import { ItemDetailModal } from '../../common-hub/components/GalleryModals';
import { ItemDetail } from '../../common-hub/types';
import { useTranslation } from 'react-i18next';

export const WuwaEchoDetail = () => {
  const { t } = useTranslation();
  const { echoName } = useParams<{ echoName: string }>();
  const navigate = useNavigate();
  const [showPhantom, setShowPhantom] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemDetail | null>(null);

  const echo = useMemo(() => {
    return ECHO_DATA.find(e => e.name === echoName);
  }, [echoName]);

  if (!echo) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center space-y-6 text-white">
        <h2 className="text-2xl font-black text-gray-500 uppercase tracking-widest">Echo Not Found</h2>
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-brand-primary font-bold hover:underline">
          <Zap size={18} /> Go Back to Gallery
        </button>
      </div>
    );
  }

  const ECHO_IMAGE_BASE = `${CDN_URL}/ww%20images/Echo/`;
  const SONATA_ICON_BASE = `${CDN_URL}/ww%20images/common/sonata/`;
  const isPhantom = !!echo.hasPhantom;

  const handleShowItemDetail = (itemName: string) => {
    const db = getItemMetaDB();
    const item = db[itemName];
    if (item) setSelectedItem(item);
  };

  const theme = { primary: '#EAB308', secondary: '#FDE047' };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans relative">
      <SEO 
        title={`${echo.name} ${t('에코 상세 정보 및 소나타 효과 | 명조 아카이브')}`} 
        description={`${t('명조 (Wuthering Waves)')} ${t('에코')} ${echo.name}${t('의 스킬 효과, 코스트, 소나타 세트 효과 및 획득처 정보를 확인하세요.')}`}
        image={`${ECHO_IMAGE_BASE}${encodeURIComponent(echo.name.normalize('NFC'))}.webp`}
        url={`/gallery/ww/echo/${echo.name}`}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: '/gallery/ww' },
          { name: t('에코'), url: '/gallery/ww?menu=에코' },
          { name: echo.name, url: `/gallery/ww/echo/${echo.name}` }
        ]}
      />
      
      {/* Dynamic Background Art (Blur Effect) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: `url(${ECHO_IMAGE_BASE}${encodeURIComponent(echo.name.normalize('NFC'))}.webp)`,
          backgroundSize: '70%',
          backgroundPosition: 'right top',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(100px)',
        }}
      />

      <PageHeader gameId="ww" category={t("에코")} title={echo.name} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-8 relative z-10">
        {/* Top Section: Image & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-8 items-start">
          
          {/* Left: Large Image Card */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.2] flex items-center justify-center">
            <img 
              src={`${ECHO_IMAGE_BASE}${encodeURIComponent((isPhantom && showPhantom ? '이상 · ' + echo.name : echo.name).normalize('NFC'))}.webp`} 
              alt={echo.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 p-12" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  COST {echo.cost} • {(echo as any).enemyInfo?.grade}
                </div>
                {(() => {
                  const displayName = isPhantom && showPhantom ? `이상 · ${echo.name}` : echo.name;
                  const nameLen = displayName.length;
                  const fontSizeClass = 
                    nameLen > 20 ? 'text-xl md:text-3xl' :
                    nameLen > 15 ? 'text-2xl md:text-4xl' :
                    nameLen > 10 ? 'text-3xl md:text-5xl' : 
                    nameLen > 7 ? 'text-4xl md:text-6xl' : 
                    'text-5xl md:text-7xl';
                  
                  return (
                    <h1 className={`font-black text-white tracking-tighter leading-tight italic drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis ${fontSizeClass}`}>
                      {displayName}
                    </h1>
                  );
                })()}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  ))}
                </div>
                {isPhantom && (
                  <button 
                    onClick={() => setShowPhantom(!showPhantom)}
                    className="px-4 py-1.5 rounded-xl text-[10px] font-black border bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                  >
                    {showPhantom ? 'Original View' : 'Phantom View'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Consolidated Controls and Info */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* 01. Ability Section */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow group/skill">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black italic opacity-20 group-hover/skill:opacity-40 transition-opacity" style={{ color: theme.primary }}>01</span>
                <div className="flex items-center gap-3">
                   <Zap size={20} style={{ color: theme.primary }} />
                   <h2 className="text-xl font-black tracking-tighter italic uppercase text-white/90">Echo Ability</h2>
                </div>
              </div>
              
              <div className="text-gray-300 text-base md:text-lg leading-relaxed bg-white/[0.01] p-8 rounded-[25px] border border-white/5 shadow-inner min-h-[120px]">
                {renderRichText(echo.description)}
              </div>
            </div>

            {/* 02. Attribute Resistance Card */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-black italic opacity-20" style={{ color: theme.primary }}>02</span>
                <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-500">{t('속성 저항')}</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries((echo as any).enemyInfo?.resistances || {}).slice(0, 8).map(([attr, val]) => (
                  <div key={attr} className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/5 group/stat hover:border-brand-accent/50 transition-all">
                    <img src={`${CDN_URL}/ww%20images/common/stats/${attr}%20피해%20저항.webp`} className="w-6 h-6 opacity-80 group-hover/stat:scale-110 transition-transform" alt={attr} />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-gray-500 uppercase leading-none mb-1">{attr}</span>
                      <span className="text-sm font-black text-white italic leading-none">{val as number}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 03. Sonata Sets Section (Full Width Below) */}
        <section className="glass-card p-10 rounded-[40px] border border-white/5 bg-black/20">
            <div className="flex items-center gap-5 mb-8">
              <span className="text-4xl font-black italic opacity-10" style={{ color: theme.primary }}>03</span>
              <div className="flex items-center gap-3">
                <Shield size={20} style={{ color: theme.primary }} />
                <h3 className="text-xl font-black uppercase tracking-widest text-gray-400">Sonata Synergy Matrix</h3>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(echo as any).sonataSets.map((setName: any) => {
                const effect = SONATA_EFFECTS.find(s => s.setName === setName)?.effect;
                if (!effect) return null;
                return (
                  <div key={setName} className="p-10 rounded-[40px] bg-white/[0.03] border border-white/10 space-y-8 hover:bg-white/[0.05] transition-all group/sonata">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover/sonata:scale-110 transition-transform shadow-inner">
                        <img src={`${SONATA_ICON_BASE}${encodeURIComponent(setName.normalize('NFC'))}.webp`} className="w-10 h-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]" alt={setName} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-brand-accent italic tracking-tighter uppercase leading-none">{setName}</span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] pt-1">Resonance Synergy</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-8 pl-4 border-l-2 border-white/5">
                      {effect.twoPiece && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] bg-brand-primary/20 px-3 py-1 rounded-full border border-brand-primary/30">2-Piece</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-brand-primary/40 to-transparent" />
                          </div>
                          <p className="text-[15px] text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">{effect.twoPiece}</p>
                        </div>
                      )}
                      {effect.threePiece && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">3-Piece</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/40 to-transparent" />
                          </div>
                          <p className="text-[15px] text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">{effect.threePiece}</p>
                        </div>
                      )}
                      {effect.fivePiece && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] bg-brand-accent/20 px-3 py-1 rounded-full border border-brand-accent/30">5-Piece</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-brand-accent/40 to-transparent" />
                          </div>
                          <p className="text-[15px] text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">{effect.fivePiece}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
        </section>

        {/* 04. Acquisition Section (Full Width) */}
        <section className="glass-card p-10 rounded-[40px] border border-white/5">
          <div className="flex items-center gap-5 mb-8">
            <span className="text-4xl font-black italic opacity-10" style={{ color: theme.primary }}>04</span>
            <div className="flex items-center gap-3">
              <Box size={20} className="text-gray-400" />
              <h4 className="text-xl font-black uppercase tracking-widest text-gray-300">Acquisition Sources</h4>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            {(echo as any).enemyInfo?.drops.map((itemName: string) => {
              const isEchoItem = ECHO_DATA.some(e => e.name === itemName);
              const imgUrl = isEchoItem 
                ? `${ECHO_IMAGE_BASE}${encodeURIComponent(itemName.normalize('NFC'))}.webp`
                : getItemUrl(itemName, 'ww');
              
              return (
                <button 
                  key={itemName}
                  onClick={() => {
                    if (isEchoItem) {
                      navigate(`/gallery/ww/echo/${itemName}`);
                      window.scrollTo(0, 0);
                    } else {
                      handleShowItemDetail(itemName);
                    }
                  }}
                  className="group flex flex-col items-center gap-3 transition-transform hover:scale-105"
                >
                  <div className="w-20 h-20 bg-white/5 rounded-[24px] p-4 flex items-center justify-center border border-white/10 group-hover:border-brand-primary/50 transition-all shadow-xl">
                    <img 
                      src={imgUrl || ''} 
                      className={`w-full h-full object-contain ${isEchoItem ? 'scale-110' : ''}`} 
                      alt={itemName} 
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-white transition-colors">{itemName}</span>
                </button>
              );
            })}
          </div>
        </section>

        <AdPlaceholder type="leaderboard" className="mt-8 mb-4 scale-90 opacity-40" />
      </div>

      <ItemDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </div>
  );
};

export default WuwaEchoDetail;
