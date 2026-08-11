import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { ChevronRight, Star, ShieldCheck, Info, ArrowLeft, Package, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { ARCHIVE_DATA, LIGHTCONE_DB } from '../../common-hub/data/games';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import ItemIcon from '../../common-hub/components/ItemIcon';
import { useTranslation } from 'react-i18next';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

import { HsrLightCone } from '../types';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80];

const VERSION_UPDATES: Record<string, string> = {
  "1.0": "2023-04-26",
  "1.1": "2023-06-07",
  "1.2": "2023-07-19",
  "1.3": "2023-08-30",
  "1.4": "2023-10-11",
  "1.5": "2023-11-15",
  "1.6": "2023-12-27",
  "2.0": "2024-02-06",
  "2.1": "2024-03-27",
  "2.2": "2024-05-08",
  "2.3": "2024-06-19",
  "2.4": "2024-07-31",
  "2.5": "2024-09-10",
  "2.6": "2024-10-23",
  "2.7": "2024-12-04",
  "3.0": "2025-01-15",
  "3.1": "2025-03-05",
  "3.2": "2025-04-16",
  "3.3": "2025-05-28"
};

const LightConeDetail: React.FC = () => {
  const { gameId, lcName } = useParams<{ gameId: string; lcName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const game = useMemo(() => ARCHIVE_DATA.games.find(g => g.id === gameId), [gameId]);
  const lc = useMemo(() => LIGHTCONE_DB.find(l => l.name === lcName) as HsrLightCone | undefined, [lcName]);

  const [levelIdx, setLevelIdx] = React.useState(7); // Default to Lv. 80
  const [rankIdx, setRankIdx] = React.useState(0);   // Default to 1-Superimposition
  const [isStoryOpen, setIsStoryOpen] = React.useState(false);

  const lastUpdatedDate = lc ? (VERSION_UPDATES[lc.releaseVersion || '1.0'] || '2026-05-23') : '2026-05-23';

  const theme = { primary: '#EAB308', secondary: '#FDE047', shadow: 'rgba(234, 179, 8, 0.4)' };

  if (!lc) return <div className="p-20 text-center text-white font-black uppercase italic">{t('Light Cone Registry Not Found')}</div>;

  const getIllustrationUrl = () => {
    const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
    const targetName = lc.fileName || lc.folderName || lc.name || '';
    
    return (lc as any).gameId === 'ww'
      ? `${CDN_URL}/ww%20images/weapons/${safeEncodeURIComponent(targetName)}.webp`
      : `${CDN_URL}/hsr%20images/광추/${safeEncodeURIComponent(lc.path || '')}/${safeEncodeURIComponent(targetName)}.webp`;
  };

  const renderDescription = (lc: HsrLightCone, rankIdx: number) => {
    if (!lc.skill) return null;
    
    // 1. 새로운 descriptions 배열이 있는 경우
    if (lc.skill.descriptions && lc.skill.descriptions[rankIdx]) {
      const currentDesc = lc.skill.descriptions[rankIdx];
      const compareDesc = lc.skill.descriptions[rankIdx === 0 ? 4 : 0]; // 1단계와 5단계 비교
      
      const numberRegex = /([+-]?\d+(?:\.\d+)?%?|pt)/g;
      const targetTokens = currentDesc.match(numberRegex) || [];
      const compareTokens = compareDesc.match(numberRegex) || [];

      let tokenIdx = 0;
      return currentDesc.split(numberRegex).map((part, i) => {
        if (numberRegex.test(part)) {
          const currentVal = part;
          const otherVal = compareTokens[tokenIdx];
          const shouldHighlight = currentVal !== otherVal;
          tokenIdx++;

          if (shouldHighlight) {
            return (
              <span key={i} className="font-black px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 mx-0.5" style={{ color: theme.primary }}>
                {currentVal}
              </span>
            );
          }
          return currentVal;
        }
        return part;
      });
    }

    const description = lc.skill.description || '';
    // 2. 레거시 [1중첩] 및 [5중첩] 태그 처리
    if (description.includes('[1중첩]') && description.includes('[5중첩]')) {
      const parts = description.split(/\[1중첩\]|\[5중첩\]/);
      // 단순화를 위해 rankIdx가 0이면 앞부분, 그외엔 뒷부분 (또는 보간 필요시 로직 확장)
      const targetText = rankIdx === 0 ? parts[1] : parts[parts.length - 1];
      return targetText;
    }

    return description;
  };

  const getStatsForLevel = () => {
    if (!lc?.baseStats) return { hp: 0, atk: 0, def: 0 };
    const level = LEVEL_STEPS[levelIdx];
    const key = `lv${level}` as keyof typeof lc.baseStats;
    const stats = lc.baseStats[key];
    if (stats) {
      return {
        hp: stats["기초 HP"],
        atk: stats["기초 공격력"],
        def: stats["기초 방어력"]
      };
    }
    // Fallback to lv80 if specifically requested level missing
    const lv80 = (lc.baseStats as any).lv80;
    return {
        hp: lv80?.["기초 HP"] || 0,
        atk: lv80?.["기초 공격력"] || 0,
        def: lv80?.["기초 방어력"] || 0
    };
  };

  const currentStats = getStatsForLevel();
  const currentMaterials = lc?.ascensionMaterials?.find(m => m.level === LEVEL_STEPS[levelIdx])?.items || [];

  const skillName = lc.skill?.name ? ` 및 [${lc.skill.name}]의` : '';
  const seoDescription = `${lc.name} 상세 정보: 기초 공격력 ${lc.baseStats?.lv80?.["기초 공격력"] || '???'}${skillName} 중첩 단계별 변화를 완벽 정리했습니다. 붕괴: 스타레일 게이머를 위한 최신 데이터 시트.`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep">
      <SEO 
        title={`${lc.name} 상세 정보 & 중첩 수치`} 
        description={seoDescription}
        name={lc.name}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/lightcone/${encodeURIComponent(lc.name)}`}
        gameCategory={t('붕괴: 스타레일')}
        itemType={t(lc.path)}
        modifiedTime={lastUpdatedDate}
        ratingValue={lc.rarity}
        reviewCount={1}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('붕괴: 스타레일'), url: `/gallery/${gameId}` },
          { name: t('광추'), url: `/gallery/${gameId}?menu=광추` },
          { name: t(lc.name), url: `/gallery/${gameId}/lightcone/${encodeURIComponent(lc.name)}` }
        ]}
      />
      {/* Page Header */}
      <PageHeader gameId={gameId} category={t("광추")} title={t(lc.name)} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-6">
        {/* Top Section: Image & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-8 items-start">
          
          {/* Left: Image with Overlay */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.2] flex items-center justify-center">
            <img 
              src={getIllustrationUrl()} 
              alt={lc.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  {t('운명의 길')} : {t(lc.path || '')}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg">
                  {t(lc.name)}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: lc.rarity }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  ))}
                </div>
                {lc.releaseVersion && (
                  <div className="text-gray-400 font-bold tracking-widest text-[9px] uppercase italic opacity-40 px-2 py-1 border border-white/10 rounded-lg">
                    Ver {lc.releaseVersion}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Consolidated Controls and Info */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* 01. Compact Control & Stats Card */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              
              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/5 pb-6">
                {/* Level Slider */}
                <div className="space-y-3 relative group/lslider">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black italic opacity-20" style={{ color: theme.primary }}>01</span>
                      <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400">{t('레벨')}</h2>
                    </div>
                  </div>
                  <div className="relative pt-6">
                    {/* Floating Level Label */}
                    <div 
                      className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-brand-primary text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg"
                      style={{ 
                        left: `${(levelIdx / 7) * 100}%`,
                        backgroundColor: theme.primary,
                        boxShadow: `0 0 10px ${theme.primary}40`
                      }}
                    >
                      Lv.{LEVEL_STEPS[levelIdx]}
                    </div>
                    <input 
                      type="range" min="0" max="7" value={levelIdx} 
                      onChange={(e) => setLevelIdx(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
                      style={{ accentColor: theme.primary }}
                    />
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-400 px-0.5 mt-1.5">
                      <span>1</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>

                {/* Superimposition Slider */}
                <div className="space-y-3 border-l border-white/5 pl-0 md:pl-8 relative group/rslider">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black italic opacity-20" style={{ color: theme.primary }}>02</span>
                      <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-400">{t('중첩')}</h2>
                    </div>
                  </div>
                  <div className="relative pt-6">
                    {/* Floating Rank Label */}
                    <div 
                      className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-white text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg"
                      style={{ 
                        left: `${(rankIdx / 4) * 100}%`,
                        boxShadow: `0 0 10px rgba(255,255,255,0.4)`
                      }}
                    >
                      {rankIdx + 1}{t('중첩')}
                    </div>
                    <input 
                      type="range" min="0" max="4" value={rankIdx} 
                      onChange={(e) => setRankIdx(parseInt(e.target.value))}
                      className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: theme.primary }}
                    />
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-400 px-0.5 mt-1.5">
                      <span>1</span>
                      <span>5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-0.5">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('기초 HP')}</div>
                  <div className="text-xl font-black tabular-nums tracking-tighter italic">{currentStats.hp}</div>
                </div>
                <div className="space-y-0.5 border-x border-white/5 px-4">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('기초 공격력')}</div>
                  <div className="text-xl font-black tabular-nums tracking-tighter italic">{currentStats.atk}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('기초 방어력')}</div>
                  <div className="text-xl font-black tabular-nums tracking-tighter italic">{currentStats.def}</div>
                </div>
              </div>
            </div>

            {/* 02. Skill Detail Section (REDUCED SIZE) */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow group/skill">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black italic opacity-20 group-hover/skill:opacity-40 transition-opacity" style={{ color: theme.primary }}>03</span>
                <div className="flex items-center gap-3">
                   <ShieldCheck size={20} style={{ color: theme.primary }} />
                   <h2 className="text-xl font-black tracking-tighter italic uppercase text-white/90">{t(lc.skill?.name || '')}</h2>
                </div>
              </div>
              
              <div className="text-gray-300 text-base md:text-lg leading-relaxed bg-white/[0.01] p-6 rounded-[25px] border border-white/5 shadow-inner min-h-[120px]">
                {renderDescription(lc, rankIdx)}
              </div>
            </div>

            {/* 03. Materials Section */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-black/20">
               <div className="flex items-center gap-5 mb-6">
                  <span className="text-3xl font-black italic opacity-10" style={{ color: theme.primary }}>04</span>
                  <div className="flex items-center gap-2">
                    <Package size={16} style={{ color: theme.primary }} />
                    <h3 className="text-lg font-black uppercase tracking-widest text-gray-400">
                      Lv. {LEVEL_STEPS[levelIdx]} {t('필요 재료')}
                    </h3>
                  </div>
               </div>
               <div className="flex flex-wrap gap-6 px-4 justify-center">
                  {currentMaterials.length > 0 ? (
                    currentMaterials.map((m, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 group transition-transform hover:scale-105">
                        <ItemIcon name={m.name} count={m.count} />
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400 italic py-2 text-xs">
                      <Info size={14} />
                      <span>{t('재료 정보 없음')}</span>
                    </div>
                  )}
               </div>
            </div>
          </div>
        </div>

        {/* 04. Story Section (Toggle) - BOTTOM FULL WIDTH */}
        <div className="glass-card overflow-hidden rounded-[35px] border border-white/5 transition-all duration-300">
            <button 
              onClick={() => setIsStoryOpen(!isStoryOpen)}
              className="w-full p-8 flex items-center justify-between group/story hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl font-black italic opacity-10" style={{ color: theme.primary }}>05</span>
                <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 group-hover/story:text-white transition-colors">{t('스토리')}</h2>
              </div>
              <div className={`p-3 rounded-full bg-white/5 border border-white/10 transition-transform duration-500 ${isStoryOpen ? 'rotate-180 bg-brand-primary/20 border-brand-primary/20' : ''}`} style={isStoryOpen ? { color: theme.primary } : {}}>
                {isStoryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            
            <div className={`transition-all duration-700 ease-in-out ${isStoryOpen ? 'max-h-[2000px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
              <div className="px-8 border-t border-white/5 pt-8">
                <div className="text-gray-400 text-base md:text-lg leading-relaxed italic whitespace-pre-line custom-scrollbar bg-black/20 p-8 rounded-[30px] border border-white/5 shadow-inner">
                    {t(lc.story || '스토리 정보가 없습니다.').replace(/\*/g, '')}
                </div>
              </div>
            </div>
        </div>
        
        {/* E-E-A-T Authorship & Methodology Note */}
        <section className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 rounded-[35px] bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                <Users size={20} className="text-brand-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white uppercase tracking-widest">{t('Intelligence Source')}</h4>
                <p className="text-[11px] text-gray-400 font-medium">Authored by <span className="text-brand-accent font-black">Rira Archive Editorial Team</span></p>
              </div>
            </div>
            <div className="text-[10px] text-gray-400 max-w-md text-center md:text-right font-medium leading-relaxed">
              {t('이 분석 리포트는 최신 생성형 AI 기술을 활용한 데이터 프로세싱과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다.')}
            </div>
          </div>
          {lc && (
            <div className="mt-4 flex justify-end">
              <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                {t('최종 업데이트')} : {lastUpdatedDate} (v{lc.releaseVersion || '1.0'})
              </p>
            </div>
          )}
        </section>

        <AdPlaceholder type="leaderboard" className="mt-4 mb-2 scale-90 opacity-40" />
      </div>
    </div>
  );
};

export default LightConeDetail;
