
import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Shield, 
  Zap, 
  Sword, 
  Star, 
  Info, 
  ArrowRight,
  Sparkles,
  Layers,
  Box,
  TrendingUp,
  Users,
  ArrowLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB, ARCHIVE_DATA } from '../../common-hub/data/games';
import { HSR_PARTIES } from '../data/parties';
import SEO from '../../common-hub/components/SEO';
import TableOfContents from '../../common-hub/components/TableOfContents';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';

const getMainImageUrl = (item: any) => {
  if (!item) return null;
  const safeType = item.type.normalize('NFC');
  const safeName = item.name.normalize('NFC');
  const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
  return encodeURI(url);
};

const CharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const navigate = useNavigate();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [eidolonTargetType, setEidolonTargetType] = useState<'1' | '3'>('1');
  const [isTwoPieceExpanded, setIsTwoPieceExpanded] = useState(false);

  const game = useMemo(() => ARCHIVE_DATA.games.find(g => g.id === gameId), [gameId]);
  const [selectedEidolonVariantIndex, setSelectedEidolonVariantIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<{
    name: string;
    description: string;
    type: string;
    x: number;
    y: number;
  } | null>(null);
  
  // charName은 이제 id(영문) 또는 한국어 이름 둘 다 올 수 있음
  // CHARACTER_DB에서 id로 찾아 originalName(한국어)을 가져온 뒤 가이드 조회
  const resolvedKoName = useMemo(() => {
    if (!charName) return undefined;
    const found = CHARACTER_DB.find((c: any) => c.id === charName || c.name === charName);
    return (found as any)?.originalName || found?.name || charName;
  }, [charName]);

  const guide = useMemo(() =>
    HSR_CHARACTER_GUIDES.find(g => g.characterName.normalize('NFC') === resolvedKoName?.normalize('NFC')),
    [resolvedKoName]
  );

  const currentVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.variants && guide.variants.length > 0) {
      return guide.variants[selectedVariantIndex];
    }
    return {
      name: "기본",
      bestRelics: guide.bestRelics,
      bestOrnaments: guide.bestOrnaments,
      mainStats: guide.mainStats,
      subStats: guide.subStats,
      targetStats: guide.targetStats,
    };
  }, [guide, selectedVariantIndex]);

  const currentEidolonVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.eidolonVariants && guide.eidolonVariants.length > 0) {
      return guide.eidolonVariants[selectedEidolonVariantIndex];
    }
    return {
      name: "기본",
      efficiency: guide.eidolonEfficiency,
    };
  }, [guide, selectedEidolonVariantIndex]);

  const parsedStats = useMemo(() => {
    const stats = currentVariant?.mainStats;
    if (!stats) return { primary: { body: { name: "" }, boots: { name: "" }, sphere: { name: "" }, rope: { name: "" } }, alternatives: [] };
    
    const parts: ('body' | 'boots' | 'sphere' | 'rope')[] = ['body', 'boots', 'sphere', 'rope'];
    const labels: Record<string, string> = {
      body: '몸통',
      boots: '신발',
      sphere: '차원 구체',
      rope: '연결 매듭'
    };
    
    const primary: any = {};
    const alternatives: { piece: string; options: { name: string; note?: string }[] }[] = [];
    
    parts.forEach(part => {
      const value = stats[part] || "";
      const options = value.split(/\s+or\s+/i).map(opt => {
        const match = opt.match(/(.*?)\s*\((.*?)\)/);
        if (match) {
          return { name: match[1].trim(), note: match[2].trim() };
        }
        return { name: opt.trim() };
      });
      
      primary[part] = options[0] || { name: "" };
      if (options.length > 1) {
        alternatives.push({
          piece: labels[part],
          options: options.slice(1)
        });
      }
    });
    
    return { primary, alternatives };
  }, [currentVariant]);

  const relicGroups = useMemo(() => {
    if (!currentVariant?.bestRelics) return { full: [], twoPiece: [] };
    
    const full: any[] = [];
    const twoPiece: any[] = [];
    
    currentVariant.bestRelics.forEach(item => {
      const name = typeof item === 'string' ? item : item.name;
      const note = typeof item === 'string' ? '' : (item.note || '');
      
      if (note.includes('2세트') || name.includes('2세트') || name.includes('2+2')) {
        twoPiece.push(item);
      } else {
        full.push(item);
      }
    });
    
    return { full, twoPiece };
  }, [currentVariant]);

  const character = useMemo(() =>
    CHARACTER_DB.find((c: any) => c.id === charName || c.name.normalize('NFC') === resolvedKoName?.normalize('NFC')),
    [charName, resolvedKoName]
  );

  const recommendedParties = useMemo(() =>
    HSR_PARTIES.filter(p => p.members.some(m => m.name.normalize('NFC') === resolvedKoName?.normalize('NFC'))),
    [resolvedKoName]
  );

  const handleMouseEnter = (e: React.MouseEvent, name: string, type: 'relic' | 'ornament' | 'lightcone', note?: string) => {
    if (!note || note.includes('순위')) return;

    let itemType = '';
    if (type === 'relic') itemType = '유물';
    else if (type === 'ornament') itemType = '차원 장신구';
    else if (type === 'lightcone') itemType = '광추';

    setHoveredItem({
      name,
      description: note,
      type: itemType,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (hoveredItem) {
      setHoveredItem({ ...hoveredItem, x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  if (!guide) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-8">
        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-gray-700 mb-6 border border-white/10">
          <Info size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Guide Not Found</h2>
        <p className="text-gray-500 mb-8">해당 캐릭터의 상세 공략 데이터가 아직 등록되지 않았습니다.</p>
        <Link 
          to={`/gallery/${gameId}`} 
          className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-sm transition-all hover:scale-105"
        >
          <ChevronLeft size={16} /> 도감으로 돌아가기
        </Link>
      </div>
    );
  }

  const themeColor = character?.attribute === '화염' ? '#FF4D4D' : 
                    character?.attribute === '얼음' ? '#3D8CFF' :
                    character?.attribute === '바람' ? '#00E676' :
                    character?.attribute === '번개' ? '#9D4DFF' :
                    character?.attribute === '양자' ? '#8080FF' :
                    character?.attribute === '허수' ? '#FFD600' :
                    character?.attribute === '물리' ? '#A1A1A1' : '#7E30E1';

  const isHunt = character?.path === '수렵';

  const seoImageUrl = character 
    ? (character.gameId === 'hsr' 
        ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(character.folderName.normalize('NFC'))}/${character.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
        : `${BASE_IMAGE_URL}/ww/characters/${encodeURIComponent(character.folderName.normalize('NFC'))}/art01.webp`)
    : undefined;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title={`${charName} 세팅 가이드`} 
        description={`${charName}의 추천 광추, 유물, 파티 조합 등 종결 세팅 가이드를 확인하세요.`}
        image={seoImageUrl}
      />
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-[100] pointer-events-none w-72 p-4 bg-[#1a1a1a] border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl"
            style={{ 
              left: Math.min(hoveredItem.x + 20, window.innerWidth - 300), 
              top: Math.min(hoveredItem.y + 20, window.innerHeight - 200) 
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{hoveredItem.type}</span>
              </div>
              <h4 className="text-sm font-black text-white">{hoveredItem.name}</h4>
              <div className="h-px bg-white/5" />
              <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap">{hoveredItem.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Header */}
      <PageHeader 
        gameId={gameId} 
        category="공략" 
        title={`${charName} 가이드`} 
      />

      <div className="max-w-[1400px] mx-auto px-8 pt-12 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12 content-area">
          {/* Hero Section */}
          <div className="relative p-12 rounded-[48px] bg-[#121212] border border-white/5 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-4 p-8 flex flex-col items-end gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              최종 업데이트: {guide.lastUpdated}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              패치 버전: {guide.patchVersion}
            </div>
          </div>

          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-brand-primary/50 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl shrink-0">
              {character ? (
                <img 
                  src={character.gameId === 'hsr' 
                    ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(character.folderName.normalize('NFC'))}/${character.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
                    : `${BASE_IMAGE_URL}/ww/characters/${encodeURIComponent(character.folderName.normalize('NFC'))}/art01.webp`
                  }
                  alt={charName}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/unknown.webp'; }}
                />
              ) : (
                <div className="w-full h-full bg-white/5" />
              )}
            </div>
            <div className="text-center md:text-left space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-1 bg-brand-primary/20 text-brand-accent text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-primary/30">
                  {character?.attribute}
                </span>
                <span className="px-3 py-1 bg-white/5 text-gray-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">
                  {character?.path}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
                {charName} <span className="text-brand-accent">Guide</span>
              </h1>
              <p className="text-gray-500 font-bold text-sm">최적의 성능을 위한 유물, 광추 및 스탯 세팅 가이드입니다.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* 1. 장비 및 스탯 세팅 */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Layers size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-xl font-black italic tracking-tight uppercase">장비 및 스탯 세팅</h3>
              </div>

              {guide.variants && guide.variants.length > 1 && (
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {guide.variants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedVariantIndex === idx 
                          ? 'bg-brand-primary text-white shadow-lg' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 space-y-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">추천 유물 세트</div>
                  <div className="flex flex-wrap gap-3">
                    {relicGroups.full.map((relicItem, i) => {
                      const relicName = typeof relicItem === 'string' ? relicItem : relicItem.name;
                      const relicNote = typeof relicItem === 'string' ? undefined : relicItem.note;
                      const relic = RELIC_DB.find(r => r.name === relicName);
                      
                      return (
                        <Link 
                          key={i} 
                          to={`/gallery/${gameId}/relic/${encodeURIComponent(relicName)}`}
                          onMouseEnter={(e) => handleMouseEnter(e, relicName, 'relic', relicNote)}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-primary/30 transition-all min-w-[200px]"
                        >
                          <div className="w-10 h-10 rounded-lg bg-black/40 p-1 flex items-center justify-center shrink-0">
                            {relic ? (
                              <img 
                                src={getMainImageUrl(relic)} 
                                alt={relicName} 
                                className="w-full h-full object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                              />
                            ) : (
                              <div className="w-full h-full bg-white/5 rounded" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-200 group-hover:text-brand-accent transition-colors whitespace-pre-wrap">{relicName}</span>
                            {relicNote && (
                              <div className="flex items-center gap-1 mt-1">
                                {relicNote.includes('순위') || relicNote.includes('SET') ? (
                                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{relicNote}</span>
                                ) : (
                                  <>
                                    <Info size={8} className="text-brand-accent" />
                                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">세부 사항</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {relicGroups.twoPiece.length > 0 && (
                    <div className="mt-4 p-4 bg-white/[0.02] rounded-2xl border border-dashed border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Layers size={14} className="text-brand-accent" />
                          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">2세트 조합 추천 (2+2)</span>
                        </div>
                        <button 
                          onClick={() => setIsTwoPieceExpanded(!isTwoPieceExpanded)}
                          className="p-1.5 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2 group"
                        >
                          <span className="text-[9px] font-black text-gray-500 group-hover:text-gray-300 uppercase tracking-widest">
                            {isTwoPieceExpanded ? '접기' : '펼치기'}
                          </span>
                          {isTwoPieceExpanded ? (
                            <ChevronUp size={14} className="text-gray-500 group-hover:text-gray-300" />
                          ) : (
                            <ChevronDown size={14} className="text-gray-500 group-hover:text-gray-300" />
                          )}
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {isTwoPieceExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-3 pt-2">
                              {relicGroups.twoPiece.map((relicItem, i) => {
                                const relicName = typeof relicItem === 'string' ? relicItem : relicItem.name;
                                const relicNote = typeof relicItem === 'string' ? undefined : relicItem.note;
                                
                                // Handle special strings like "속도 2세트 2개"
                                if (typeof relicItem === 'string' && (relicName.includes('2세트') && (relicName.includes('2개') || relicName.includes('+')))) {
                                  return (
                                    <div key={i} className="flex items-center gap-3 p-3 bg-brand-primary/5 rounded-xl border border-brand-primary/20 min-w-[200px]">
                                      <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center shrink-0">
                                        <Zap size={20} className="text-brand-accent" />
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-200">{relicName}</span>
                                        <span className="text-[8px] font-black text-brand-accent uppercase tracking-widest">자유로운 2+2 조합</span>
                                      </div>
                                    </div>
                                  );
                                }

                                const relic = RELIC_DB.find(r => r.name === relicName);
                                
                                return (
                                  <Link 
                                    key={i} 
                                    to={`/gallery/${gameId}/relic/${encodeURIComponent(relicName)}`}
                                    onMouseEnter={(e) => handleMouseEnter(e, relicName, 'relic', relicNote)}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-primary/30 transition-all min-w-[200px]"
                                  >
                                    <div className="w-10 h-10 rounded-lg bg-black/40 p-1 flex items-center justify-center shrink-0">
                                      {relic ? (
                                        <img 
                                          src={getMainImageUrl(relic)} 
                                          alt={relicName} 
                                          className="w-full h-full object-contain"
                                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                                        />
                                      ) : (
                                        <div className="w-full h-full bg-white/5 rounded" />
                                      )}
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-sm font-bold text-gray-200 group-hover:text-brand-accent transition-colors whitespace-pre-wrap">{relicName}</span>
                                      <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{relicNote || "2세트"}</span>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">추천 장신구 세트</div>
                  <div className="flex flex-wrap gap-3">
                    {currentVariant?.bestOrnaments.map((ornamentItem, i) => {
                      const ornamentName = typeof ornamentItem === 'string' ? ornamentItem : ornamentItem.name;
                      const ornamentNote = typeof ornamentItem === 'string' ? undefined : ornamentItem.note;
                      const ornament = ORNAMENT_DB.find(o => o.name === ornamentName);

                      return (
                        <Link 
                          key={i} 
                          to={`/gallery/${gameId}/ornament/${encodeURIComponent(ornamentName)}`}
                          onMouseEnter={(e) => handleMouseEnter(e, ornamentName, 'ornament', ornamentNote)}
                          onMouseMove={handleMouseMove}
                          onMouseLeave={handleMouseLeave}
                          className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5 group hover:border-brand-accent/30 transition-all min-w-[200px]"
                        >
                          <div className="w-10 h-10 rounded-lg bg-black/40 p-1 flex items-center justify-center shrink-0">
                            {ornament ? (
                              <img 
                                src={getMainImageUrl(ornament)} 
                                alt={ornamentName} 
                                className="w-full h-full object-contain"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                              />
                            ) : (
                              <div className="w-full h-full bg-white/5 rounded" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-200 group-hover:text-brand-accent transition-colors whitespace-pre-wrap">{ornamentName}</span>
                            {ornamentNote && (
                              <div className="flex items-center gap-1 mt-1">
                                {ornamentNote.includes('순위') || ornamentNote.includes('SET') ? (
                                  <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{ornamentNote}</span>
                                ) : (
                                  <>
                                    <Info size={8} className="text-brand-accent" />
                                    <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">세부 사항</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 space-y-6">
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">권장 주옵션</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <StatBox label="몸통 (Body)" value={parsedStats.primary.body} />
                    <StatBox label="신발 (Boots)" value={parsedStats.primary.boots} />
                    <StatBox label="차원 구체 (Sphere)" value={parsedStats.primary.sphere} />
                    <StatBox label="연결 매듭 (Rope)" value={parsedStats.primary.rope} />
                  </div>
                  
                  {parsedStats.alternatives.length > 0 && (
                    <div className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-1 h-3 bg-brand-primary rounded-full" />
                        <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">기타 선택지</div>
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {parsedStats.alternatives.map((alt, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-[11px]">
                            <span className="text-gray-500 font-black shrink-0 mt-0.5">{alt.piece}</span>
                            <div className="flex flex-wrap gap-1.5">
                              {alt.options.map((opt, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                  <span className="px-2 py-0.5 bg-white/5 rounded-lg text-gray-300 font-bold border border-white/5">
                                    {opt.name}
                                  </span>
                                  {opt.note && (
                                    <div className="flex items-center gap-1 px-1">
                                      <Info size={8} className="text-brand-accent" />
                                      <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{opt.note}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">권장 부옵션 우선순위</div>
                  <div className="flex flex-wrap gap-2">
                    {currentVariant?.subStats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                        <span className="text-[10px] font-black text-brand-accent">{i + 1}</span>
                        <span className="text-sm font-bold text-gray-200 whitespace-pre-wrap">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 2. 목표 스탯 & 성흔 효율 */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <TrendingUp size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-xl font-black italic tracking-tight uppercase">목표 스탯 및 성흔 효율</h3>
              </div>

              {guide.eidolonVariants && guide.eidolonVariants.length > 1 && (
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                  {guide.eidolonVariants.map((variant, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedEidolonVariantIndex(idx)}
                      className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedEidolonVariantIndex === idx 
                          ? 'bg-brand-primary text-white shadow-lg' 
                          : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 space-y-4">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">추천 목표 스탯</div>
                <div className="flex flex-wrap gap-4">
                  {currentVariant?.targetStats.filter(s => s.label !== "참고").map((stat, i) => (
                    <div key={i} className="flex-1 min-w-[240px] p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</span>
                        {stat.note && (
                          <span className="text-[9px] font-bold text-gray-400 leading-tight">{stat.note}</span>
                        )}
                      </div>
                      <span className="text-lg font-black text-brand-accent italic text-right whitespace-nowrap">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* 참고 사항 (Notes) 강조 표시 */}
                {currentVariant?.targetStats.filter(s => s.label === "참고").map((stat, idx) => (
                  <div key={idx} className="mt-4 p-5 rounded-3xl bg-brand-primary/5 border border-brand-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-primary" />
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <Info size={20} className="text-brand-accent" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-[0.2em]">참고 사항</span>
                        <p className={`font-bold text-gray-300 leading-relaxed ${stat.value.length > 30 ? 'text-xs' : 'text-sm'}`}>
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">성흔 돌파 효율</div>
                    {(!currentEidolonVariant?.labels || currentEidolonVariant.labels.length === 0) && (
                      <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                        <button
                          onClick={() => setEidolonTargetType('1')}
                          className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${
                            eidolonTargetType === '1' 
                              ? 'bg-brand-primary text-white shadow-lg' 
                              : 'text-gray-500 hover:text-gray-300'
                          }`}
                        >
                          {isHunt ? "효율" : "1인 개체"}
                        </button>
                        {!isHunt && (
                          <button
                            onClick={() => setEidolonTargetType('3')}
                            className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest transition-all ${
                              eidolonTargetType === '3' 
                                ? 'bg-brand-primary text-white shadow-lg' 
                                : 'text-gray-500 hover:text-gray-300'
                            }`}
                          >
                            3인 개체
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {guide.recommendedEidolon && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-full border border-brand-primary/20">
                      <Star size={12} className="text-brand-accent" />
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">추천 돌파:</span>
                      <span className="text-[11px] font-black text-brand-accent italic">{guide.recommendedEidolon}</span>
                    </div>
                  )}
                </div>
                <div className="overflow-x-auto rounded-2xl border border-white/5">
                  <table className="w-full text-left text-sm min-w-[800px]">
                    <thead className="bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      <tr>
                        <th className="px-4 py-3">성흔</th>
                        <th className="px-4 py-3">영향력</th>
                        {currentEidolonVariant?.labels && currentEidolonVariant.labels.length > 0 ? (
                          <>
                            {currentEidolonVariant.labels.map((label, idx) => (
                              <th key={idx} className="px-4 py-3 text-brand-accent">{label}</th>
                            ))}
                          </>
                        ) : (
                          <th className="px-4 py-3">
                            {eidolonTargetType === '1' ? (isHunt ? "효율" : "1인 개체") : "3인 개체"}
                          </th>
                        )}
                        <th className="px-4 py-3">상세 설명</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentEidolonVariant?.efficiency.map((e, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-4 font-black text-brand-accent italic">E{e.level}</td>
                          <td className="px-4 py-4">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                              e.impact === 'High' ? 'bg-red-500/20 text-red-400' :
                              e.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {e.impact === 'High' ? '높음' : e.impact === 'Medium' ? '보통' : '낮음'}
                            </span>
                          </td>
                          {currentEidolonVariant?.labels && currentEidolonVariant.labels.length > 0 ? (
                            <>
                              <td className="px-4 py-4 font-bold text-gray-200">{e.efficiency1}</td>
                              {currentEidolonVariant.labels.length > 1 && (
                                <td className="px-4 py-4 font-bold text-gray-200">{e.efficiency3}</td>
                              )}
                            </>
                          ) : (
                            <td className="px-4 py-4 font-bold text-gray-200">
                              {eidolonTargetType === '1' ? e.efficiency1 : e.efficiency3}
                            </td>
                          )}
                          <td className="px-4 py-4 text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">{e.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <AdPlaceholder type="leaderboard" className="mb-8" />
            {/* 3. 추천 광추 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Box size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-xl font-black italic tracking-tight uppercase">추천 광추</h3>
              </div>
              
              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5 flex flex-col gap-4">
                {(currentVariant?.bestLightCones || guide.bestLightCones).map((lcItem, i) => {
                  const lcName = typeof lcItem === 'string' ? lcItem : lcItem.name;
                  const lcNote = typeof lcItem === 'string' ? undefined : lcItem.note;
                  const lc = LIGHTCONE_DB.find(l => l.name === lcName);
                  const targetName = lc ? (lc.fileName || lc.folderName) : null;
                  const lcUrl = (lc && targetName) ? encodeURI(`${BASE_IMAGE_URL}/광추/${lc.path.normalize('NFC')}/${targetName.normalize('NFC')}.webp`) : null;

                  return (
                    <Link 
                      key={i} 
                      to={`/gallery/${gameId}/lightcone/${encodeURIComponent(lcName)}`}
                      onMouseEnter={(e) => handleMouseEnter(e, lcName, 'lightcone', lcNote)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-brand-primary/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded-lg bg-black/40 p-1 flex items-center justify-center shrink-0">
                          {lcUrl ? (
                            <img 
                              src={lcUrl} 
                              alt={lcName} 
                              className="w-full h-full object-contain"
                              onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/unknown.webp'; }}
                            />
                          ) : (
                            <div className="w-full h-full bg-white/5 rounded" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-brand-accent">{i + 1}순위</span>
                            {i === 0 && (
                              <span className="px-1.5 py-0.5 bg-brand-primary/20 text-brand-accent text-[8px] font-black rounded uppercase tracking-widest">추천</span>
                            )}
                            {lcNote && (
                              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white/5 text-gray-400 text-[8px] font-black rounded uppercase tracking-widest border border-white/10">
                                {lcNote.includes('순위') || lcNote.includes('SET') ? (
                                  <span className="text-brand-accent">{lcNote}</span>
                                ) : (
                                  <>
                                    <Info size={8} />
                                    세부 사항
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-bold text-gray-200 group-hover:text-brand-accent transition-colors whitespace-pre-wrap">{lcName}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 4. 행적 우선순위 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Sparkles size={20} className="text-brand-accent" />
                </div>
                <h3 className="text-xl font-black italic tracking-tight uppercase">행적 우선순위</h3>
              </div>
              
              <div className="p-6 rounded-3xl bg-[#121212] border border-white/5">
                <div className="flex flex-wrap items-center gap-3">
                  {(currentVariant?.skillPriority || guide.skillPriority).map((skill, i) => (
                    <React.Fragment key={i}>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center min-w-[100px]">
                        <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">{i + 1}단계</div>
                        <div className="text-sm font-bold text-white whitespace-pre-wrap">{skill}</div>
                      </div>
                      {i < guide.skillPriority.length - 1 && (
                        <ArrowRight size={16} className="text-gray-700 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. 추천 조합 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
              <Users size={20} className="text-brand-accent" />
            </div>
            <h3 className="text-xl font-black italic tracking-tight uppercase">추천 조합</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedParties.length > 0 ? (
              recommendedParties.map((party) => (
                <div key={party.id} className="p-8 rounded-[40px] bg-[#121212] border border-white/5 space-y-6 hover:border-brand-primary/30 transition-all group">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-black italic tracking-tight text-white group-hover:text-brand-accent transition-colors">{party.name}</h4>
                      <span className="px-3 py-1 bg-brand-primary/20 text-brand-accent text-[9px] font-black rounded-full uppercase tracking-widest">{party.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-bold leading-relaxed">{party.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    {party.members.map((member, idx) => (
                      <Link 
                        key={idx} 
                        to={`/gallery/${gameId}/character/${encodeURIComponent(member.name)}`}
                        className="flex flex-col items-center gap-2 group/member"
                      >
                        <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/40 group-hover/member:border-brand-accent/50 transition-all">
                          <img 
                            src={`${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(member.folderName.normalize('NFC'))}/${member.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover/member:scale-110 transition-transform duration-500"
                            onError={(e) => { (e.target as HTMLImageElement).src = `${BASE_IMAGE_URL}/items/unknown.webp`; }}
                          />
                        </div>
                        <span className="text-[10px] font-black text-gray-400 text-center truncate w-full group-hover/member:text-brand-accent transition-colors">{member.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full p-12 rounded-[40px] bg-[#121212] border border-dashed border-white/10 flex flex-col items-center justify-center text-gray-600">
                <Users size={40} className="mb-4 opacity-20" />
                <p className="font-black uppercase tracking-widest text-sm">추천 조합 데이터가 없습니다</p>
              </div>
            )}
          </div>
          
          <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
        </div>
      </div>
        <div className="hidden lg:flex flex-col gap-8 sticky top-24 h-fit">
          <TableOfContents selector=".content-area" />
          <AdPlaceholder type="skyscraper" />
        </div>
      </div>
    </div>
  );
};

const StatBox: React.FC<{ label: string; value: { name: string; note?: string } }> = ({ label, value }) => (
  <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
    <div className="flex items-center justify-between gap-4">
      <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest shrink-0">{label}</div>
      <div className="text-xs font-bold text-white text-right whitespace-pre-wrap">{value.name}</div>
    </div>
    {value.note && (
      <div className="flex items-center gap-1 mt-0.5 justify-end">
        <Info size={8} className="text-brand-accent" />
        <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">{value.note}</span>
      </div>
    )}
  </div>
);

export default CharacterGuideDetail;
