import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Zap, 
  Star, 
  Info, 
  Sparkles,
  Layers,
  Box,
  TrendingUp,
  Clock,
  Crown,
  Target,
  Dna,
  ShieldCheck,
  MousePointer2,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  BookOpen
} from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../../common-hub/data/games';
import { HSR_PARTIES } from '../data/parties';
import SEO from '../../common-hub/components/SEO';
import TableOfContents from '../../common-hub/components/TableOfContents';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { useTranslation } from 'react-i18next';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const getMainImageUrl = (item: any) => {
  if (!item) return null;
  const typeMap: Record<string, string> = {
    '터널 유물': '유물',
    '차원 장신구': '차원 장신구',
    '광추': '광추'
  };
  const safeType = (typeMap[item.type] || item.type).normalize('NFC');
  const safeName = item.name.normalize('NFC');
  const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
  return encodeURI(url);
};

const SectionHeader: React.FC<{ num: string; title: string; theme: any }> = ({ num, title, theme }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-6 px-4">
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" 
        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}
      >
        {num}
      </div>
      <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">
        {t(title, { keySeparator: false, nsSeparator: false })}
      </h2>
    </div>
  );
};

const StatBoxPremium: React.FC<{ label: string; value: string; note?: string; theme: any; iconImage?: string }> = ({ label, value, note, theme, iconImage }) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(iconImage);
  
  useEffect(() => {
    setImgUrl(iconImage);
  }, [iconImage]);

  const processedValues = useMemo(() => {
    if (!value) return [];
    const splitValues = value.split(/\s+or\s+|\s*\/\s*/i);
    return splitValues.map(v => v.trim());
  }, [value]);

  const renderValue = (val: string) => {
    const parts = val.split(/(\d+(?:\.\d+)?%?)/g);
    return (
      <div className="flex items-center gap-1.5 justify-center">
        {parts.map((part, i) => {
          if (/^\d+(?:\.\d+)?%?$/.test(part)) {
            return <span key={i} className="text-xl font-black text-[#FFD600] tabular-nums leading-none">{part}</span>;
          }
          return part ? <span key={i} className="text-[11px] font-black text-gray-400 uppercase tracking-tight mt-1 whitespace-nowrap">{part}</span> : null;
        })}
      </div>
    );
  };

  const handleImgError = () => {
    setImgUrl(undefined);
  };

  return (
    <div className="group glass-card rounded-[32px] p-6 border border-white/5 hover:border-brand-primary/30 transition-all bg-gradient-to-br from-white/[0.05] to-transparent flex flex-col items-center text-center gap-4 h-full relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 blur-3xl rounded-full group-hover:bg-brand-primary/10 transition-colors" />
      
      {imgUrl ? (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/5 group-hover:border-brand-primary/20 relative z-10">
          <img 
            src={imgUrl} 
            alt={label} 
            className="w-full h-full object-contain" 
            onError={handleImgError}
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] flex items-center justify-center border border-white/5 relative z-10">
          <span className="text-gray-700 font-black text-xl uppercase opacity-20">{label.slice(0, 1)}</span>
        </div>
      )}
      
      <div className="space-y-3 w-full relative z-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{t(label, { keySeparator: false, nsSeparator: false })}</span>
          {note && <span className="text-[10px] font-bold text-brand-accent italic px-2 py-0.5 bg-brand-accent/10 rounded-full whitespace-nowrap">{t(note, { keySeparator: false, nsSeparator: false })}</span>}
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          {processedValues.map((v, i) => (
            <div key={i} className="relative w-full py-2.5 px-3 bg-white/[0.03] rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors overflow-hidden">
              {processedValues.length > 1 && (
                <div className={`absolute top-0 left-0 w-1 h-full ${i === 0 ? 'bg-brand-primary' : 'bg-gray-700'}`} />
              )}
              {renderValue(v)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PartyCardContent: React.FC<{ party: any; gameId: string | undefined }> = ({ party, gameId }) => {
  const { t } = useTranslation();
  const [hoveredMemberIdx, setHoveredMemberIdx] = useState<number | null>(null);

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {party.members.map((member: any, idx: number) => {
          const memberChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(member.name)) || normalizeName(c.folderName) === normalizeName(t(member.name)));
          const memberImg = memberChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(memberChar.folderName.normalize('NFC'))}/art01.webp` : '';
          
          return (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-6 group/member relative"
              onMouseEnter={() => setHoveredMemberIdx(idx)}
              onMouseLeave={() => setHoveredMemberIdx(null)}
            >
              <div className="relative w-32 h-32 md:w-36 md:h-36">
                 <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover/member:opacity-40 transition-opacity" />
                 <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-primary/50 transition-all duration-500 p-1 bg-black/40 shadow-2xl">
                    <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full scale-110 group-hover/member:scale-125 transition-transform duration-700" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-brand-accent uppercase tracking-widest opacity-0 group-hover/member:opacity-100 transition-all group-hover/member:-bottom-4 whitespace-nowrap z-10">
                   {t(member.role)}
                 </div>
              </div>
              <div className="text-center space-y-1">
                <div className="text-lg font-black text-white group-hover/member:text-brand-accent transition-colors whitespace-nowrap">{t(member.name)}</div>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap">{t(member.role)}</div>
              </div>

              {/* Substitutes Overlay */}
              {hoveredMemberIdx === idx && member.substitutes && member.substitutes.length > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 z-[100] animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
                  <div className="bg-[#121212]/95 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-w-[200px]">
                    <div className="flex items-center gap-2 mb-4 px-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                      <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest">대체 캐릭터</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                      {member.substitutes.map((sub: any, sIdx: number) => {
                        const subChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(sub.name)) || normalizeName(c.folderName) === normalizeName(t(sub.name)));
                        const subImg = subChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(subChar.folderName.normalize('NFC'))}/${sub.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}` : '';
                        return (
                          <div key={sIdx} className="flex flex-col items-center gap-2 group/sub">
                            <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden bg-black/40 p-1 group-hover/sub:border-brand-accent transition-all">
                              <img src={subImg} alt={sub.name} className="w-full h-full object-cover rounded-full group-hover/sub:scale-110 transition-transform" />
                            </div>
                            <span className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{t(sub.name)}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full">
                      <div className="w-4 h-4 bg-[#121212]/95 border-r border-b border-white/10 rotate-45 -translate-y-2" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t, i18n } = useTranslation();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredItem, setHoveredItem] = useState<{ name: string; description: string; type: string; } | null>(null);

  const resolvedKoName = useMemo(() => {
    if (!charName) return undefined;
    const searchName = normalizeName(charName);
    const found = CHARACTER_DB.find((c: any) => 
      c.id === charName || 
      normalizeName(c.folderName) === searchName || 
      normalizeName(t(c.name)) === searchName
    );
    return (found as any)?.folderName || (found as any)?.originalName || found?.name || charName;
  }, [charName, t]);

  const character = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    return CHARACTER_DB.find((c: any) => 
      c.id === charName || 
      normalizeName(c.folderName) === searchName || 
      normalizeName(t(c.name)) === searchName
    );
  }, [charName, resolvedKoName, t]);

  const theme = useMemo(() => {
    if (!character) return { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
    const ELEMENT_THEMES: Record<string, { primary: string, secondary: string, shadow: string }> = {
      '얼음': { primary: '#A1D9FF', secondary: '#3D8CFF', shadow: 'rgba(161, 217, 255, 0.4)' },
      '번개': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '물리': { primary: '#E5E5E5', secondary: '#A1A1A1', shadow: 'rgba(229, 229, 229, 0.4)' },
      '화염': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '바람': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '양자': { primary: '#8080FF', secondary: '#651FFF', shadow: 'rgba(128, 128, 255, 0.4)' },
      '허수': { primary: '#E6E600', secondary: '#FFD600', shadow: 'rgba(230, 214, 0, 0.4)' },
    };
    return ELEMENT_THEMES[character.attribute] || { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
  }, [character]);

  const guide = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    return HSR_CHARACTER_GUIDES.find(g => normalizeName(g.characterName) === searchName);
  }, [resolvedKoName]);

  const currentVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.variants && guide.variants.length > 0) {
      return guide.variants[selectedVariantIndex];
    }
    return {
      name: "기본",
      bestRelics: guide.bestRelics,
      bestOrnaments: guide.bestOrnaments,
      bestLightCones: guide.bestLightCones,
      mainStats: guide.mainStats,
      subStats: guide.subStats,
      targetStats: guide.targetStats,
    };
  }, [guide, selectedVariantIndex]);

  const recommendedParties = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    return HSR_PARTIES.filter(p => p.members.some(m => normalizeName(m.name) === searchName));
  }, [resolvedKoName]);

  const updateTooltipPosition = (x: number, y: number) => {
    const left = Math.min(x + 20, window.innerWidth - 340);
    const top = Math.min(y + 20, window.innerHeight - 200);
    mouseX.set(left);
    mouseY.set(top);
  };

  const handleMouseEnter = (e: React.MouseEvent, name: string, type: string, note?: string) => {
    if (!note) return;

    // Filter out simple rank notes like "1순위", "2순위", etc.
    const isJustRank = /^[1-9]순위$/.test(note.trim());
    if (isJustRank) return;

    // Set position first, so it's ready for the initial render
    updateTooltipPosition(e.clientX, e.clientY);
    setHoveredItem({ name, description: note, type: t(type) });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateTooltipPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  if (!guide || !character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-8">
        <Info size={40} className="text-gray-700 mb-6" />
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2">공략을 찾을 수 없습니다</h2>
        <p className="text-gray-500 mb-8">해당 캐릭터의 상세 공략 데이터가 아직 등록되지 않았습니다.</p>
        <Link to={`/gallery/${gameId}`} className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all">
          <ChevronLeft size={16} /> 도감으로 돌아가기
        </Link>
      </div>
    );
  }

  const cdnFolderName = character.folderName.normalize('NFC');
  const heroImageUrl = `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(cdnFolderName)}/${character.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`;

  const getStateIconUrl = (fileName: string) => {
    return `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/stats/${fileName}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO title={`${character?.name || charName} 세팅 가이드`} description={`${character?.name || charName}의 추천 광추, 유물, 파티 조합 등 종결 세팅 가이드를 확인하세요.`} image={heroImageUrl} />
      
      <AnimatePresence>
        {hoveredItem && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[100] pointer-events-none w-max max-w-[320px] p-4 bg-[#1a1a1a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl top-0 left-0"
              style={{ 
                x: mouseX,
                y: mouseY,
                willChange: 'transform'
              }}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest whitespace-nowrap block">{hoveredItem.type}</span>
                <h4 className="text-sm font-black text-white whitespace-nowrap">{t(hoveredItem.name)}</h4>
                <div className="h-px bg-white/5" />
                <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap">{t(hoveredItem.description)}</p>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      <PageHeader gameId={gameId} category={t("공략")} title={`${character?.name || charName} 가이드`} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-16 guide-content">
          {/* Hero Section */}
          <section className="relative p-12 md:p-16 rounded-[60px] bg-[#0c0c0c] border border-white/5 overflow-hidden group">
            <div 
              style={{ backgroundImage: `url(${heroImageUrl})`, filter: 'brightness(0.3) blur(20px)', opacity: 0.2 }} 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1.5 z-20">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                <Clock size={12} className="text-gray-500" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Update: {guide.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                <Sparkles size={12} className="text-brand-accent" />
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">v{guide.patchVersion}</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-[50px] border-4 border-white/10 overflow-hidden shadow-2xl relative z-10 bg-black/40">
                  <img src={heroImageUrl} alt={charName} className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              </div>
              <div className="text-center md:text-left space-y-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-gray-400">{t(character.path)}</span>
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.primary}20`, color: theme.secondary, border: `1px solid ${theme.primary}40` }}>{t(character.attribute)}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none whitespace-nowrap">
                  {character?.name || charName} <span className="text-brand-accent">가이드</span>
                </h1>
                <p className="text-gray-500 font-bold text-base md:text-lg border-l-4 border-brand-primary/40 pl-6">{t('최적의 성능을 위한 장비와 스탯 아카이브입니다.')}</p>
              </div>
            </div>
          </section>

          {/* 01 추천 광추 */}
          <section id="추천 광추" className="space-y-10">
            <SectionHeader num="01" title="추천 광추" theme={theme} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {(currentVariant?.bestLightCones || guide.bestLightCones).slice(0, 5).map((lcItem, i) => {
                const lcName = typeof lcItem === 'string' ? lcItem : (lcItem as any).name;
                const lcNote = typeof lcItem === 'string' ? undefined : (lcItem as any).note;
                const lc = LIGHTCONE_DB.find(l => l.name === lcName);
                const lcUrl = lc ? encodeURI(`${BASE_IMAGE_URL}/광추/${lc.path.normalize('NFC')}/${(lc.fileName || lc.folderName).normalize('NFC')}.webp`) : null;
                const isBest = i === 0;

                return (
                  <Link 
                    key={i} 
                    to={`/gallery/${gameId}/lightcone/${encodeURIComponent(lcName)}`}
                    onMouseEnter={(e) => handleMouseEnter(e, lcName, '추천 광추', lcNote)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`group glass-card rounded-[32px] border ${isBest ? 'border-brand-primary/50 shadow-[0_0_30px_rgba(126,48,225,0.2)]' : 'border-white/5'} p-4 flex flex-col items-center gap-4 hover:bg-white/[0.04] transition-all duration-500 hover:border-brand-primary/20 text-center relative overflow-hidden`}
                  >
                    {isBest && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-accent to-transparent z-20" />
                    )}
                    <div className={`w-full aspect-[3/4] rounded-2xl ${isBest ? 'bg-gradient-to-b from-brand-primary/20 to-black/60' : 'bg-black/40'} flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative shadow-inner`}>
                      {lcUrl ? <img src={lcUrl} alt={lcName} className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => (e.currentTarget.style.opacity = '0.3')} /> : <Box className="text-gray-700" />}
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-lg text-[9px] font-black ${isBest ? 'bg-brand-accent text-black' : 'bg-black/60 text-brand-accent'} uppercase tracking-widest z-10 shadow-lg`}>
                        {i + 1}순위
                      </div>
                    </div>
                    <div className="space-y-1.5 w-full">
                      <h4 className={`text-[11px] md:text-[12px] font-black ${isBest ? 'text-brand-accent' : 'text-white'} group-hover:text-brand-accent transition-colors truncate w-full text-center leading-tight tracking-tighter px-1`}>{t(lcName)}</h4>
                      {isBest && (
                        <div className="flex items-center justify-center gap-1">
                          <Crown size={10} className="text-brand-accent" />
                          <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">{t('추천 선택')}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 02 추천 장비 */}
          <section id="추천 장비" className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <SectionHeader num="02" title="추천 장비" theme={theme} />
              {guide.variants && guide.variants.length > 1 && (
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mx-4">
                  {guide.variants.map((v, idx) => (
                    <button key={idx} onClick={() => setSelectedVariantIndex(idx)} className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedVariantIndex === idx ? 'bg-brand-primary text-white shadow-xl' : 'text-gray-500 hover:text-gray-300'}`}>{v.name}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Layers size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('터널 유물')}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentVariant?.bestRelics.map((rItem, i) => {
                    const rName = typeof rItem === 'string' ? rItem : (rItem as any).name;
                    const rNote = typeof rItem === 'string' ? undefined : (rItem as any).note;
                    const relic = RELIC_DB.find(r => r.name === rName);
                    return (
                      <Link key={i} to={`/gallery/${gameId}/relic/${encodeURIComponent(rName)}`} onMouseEnter={(e) => handleMouseEnter(e, rName, '터널 유물', rNote)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform">
                          {relic ? <img src={getMainImageUrl(relic) || ''} className="w-full h-full object-contain" /> : <Layers className="text-gray-700" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors">{t(rName)}</span>
                          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{t(rNote || '추천')}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Box size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('차원 장신구')}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {currentVariant?.bestOrnaments.map((oItem, i) => {
                    const oName = typeof oItem === 'string' ? oItem : (oItem as any).name;
                    const oNote = typeof oItem === 'string' ? undefined : (oItem as any).note;
                    const ornament = ORNAMENT_DB.find(o => o.name === oName);
                    return (
                      <Link key={i} to={`/gallery/${gameId}/ornament/${encodeURIComponent(oName)}`} onMouseEnter={(e) => handleMouseEnter(e, oName, '차원 장신구', oNote)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform">
                          {ornament ? <img src={getMainImageUrl(ornament) || ''} className="w-full h-full object-contain" /> : <Box className="text-gray-700" />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors">{t(oName)}</span>
                          <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{t(oNote || '추천')}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 03 권장 스탯 */}
          <section id="권장 스텟" className="space-y-10">
            <SectionHeader num="03" title="권장 스텟" theme={theme} />
            <div className="flex flex-col gap-8">
              {/* Target Stats Section (Top) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent shadow-xl">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Target size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('목표 스탯')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentVariant?.targetStats.filter(s => s.label !== '참고' && (s.note?.length || 0) < 30).map((s, i) => (
                    <div 
                      key={i} 
                      onMouseEnter={(e) => handleMouseEnter(e, s.label, '목표 스탯', s.note)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-brand-primary/20 transition-all group relative"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-200 transition-colors whitespace-nowrap">{t(s.label)}</span>
                          {s.note && <Info size={12} className="text-brand-accent/60" />}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-2xl font-black text-brand-accent italic tabular-nums group-hover:scale-110 transition-transform whitespace-nowrap">{t(s.value)}</span>
                        <div className="w-12 h-1 bg-brand-primary/20 rounded-full mt-1 overflow-hidden">
                           <div className="w-full h-full bg-brand-accent/40 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Long Notes or '참고' Labels */}
                {currentVariant?.targetStats.filter(s => s.label === '참고' || (s.note?.length || 0) >= 30).map((s, i) => (
                  <div key={i} className="mt-4 p-6 bg-brand-primary/5 border border-brand-primary/20 rounded-[30px] flex items-start gap-4">
                    <AlertCircle className="text-brand-accent shrink-0 mt-1" size={20} />
                    <div className="space-y-1">
                      <div className="text-[10px] font-black text-brand-accent uppercase tracking-widest whitespace-nowrap">{t(s.label)}</div>
                      <div className="text-sm font-bold text-gray-300 leading-relaxed">{t(s.value)} {s.note && <span className="text-gray-500">| {t(s.note)}</span>}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main & Sub Stats Section (Bottom) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('주옵션 & 부옵션')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatBoxPremium label="몸통" value={currentVariant?.mainStats.body || ''} theme={theme} iconImage={getStateIconUrl('RelicBody.webp')} />
                  <StatBoxPremium label="신발" value={currentVariant?.mainStats.boots || ''} theme={theme} iconImage={getStateIconUrl('RelicFoot.webp')} />
                  <StatBoxPremium label="차원 구체" value={currentVariant?.mainStats.sphere || ''} theme={theme} iconImage={getStateIconUrl('RelicNeck.webp')} />
                  <StatBoxPremium label="연결 매듭" value={currentVariant?.mainStats.rope || ''} theme={theme} iconImage={getStateIconUrl('RelicGoods.webp')} />
                </div>
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <TrendingUp size={48} />
                  </div>
                  <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    부옵션 우선순위
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentVariant?.subStats.map((s, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-base font-bold text-gray-200 italic group hover:text-brand-accent transition-all hover:translate-y-[-2px] hover:shadow-lg whitespace-nowrap">
                        <span className="text-brand-accent mr-2 font-black"># {i + 1}</span>{t(s)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* 05 추천 파티 */}
          <section id="추천 파티" className="space-y-10">
            <SectionHeader num="05" title="추천 파티 구성" theme={theme} />
            <div className="grid grid-cols-1 gap-12">
              {recommendedParties.map((party, i) => (
                <div key={i} className="glass-card rounded-[50px] border border-white/5 overflow-visible group hover:border-brand-primary/20 transition-all duration-700 bg-gradient-to-br from-white/[0.02] to-transparent">
                  <PartyCardContent party={party} gameId={gameId} />
                  {party.description && (
                    <div className="px-10 pb-10">
                      <p className="text-xs text-gray-500 font-bold leading-relaxed italic border-l-2 border-brand-primary/30 pl-4">
                        "{t(party.description).replace(/\s*\([^)]*대체:[^)]*\)/g, '').replace(/\s*[^)]*대체:[^)]*/g, '').trim()}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar / TOC */}
        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-32 h-fit space-y-8">
          <TableOfContents selector=".guide-content" />
          <AdPlaceholder type="rectangle" />
        </aside>
      </div>
    </div>
  );
};

export default CharacterGuideDetail;
