import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, ChevronDown, ChevronUp, Package, Info, BookOpen } from 'lucide-react';
import { WEAPON_DATA } from '../data/weapons';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import { renderRichText, formatDescriptionByRank } from '../data/formatter';
import { useTranslation } from 'react-i18next';

const WuwaWeaponDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const routeParam = params.lcName || params.weaponName || params.name || params.id || Object.values(params).pop() || '';
  const targetName = String(routeParam).normalize('NFC');
  const [rankIdx, setRankIdx] = useState<number>(0);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const weapon = WEAPON_DATA.find(w => w.name.normalize('NFC') === targetName);
  const theme = { primary: '#EAB308', secondary: '#FDE047' };

  if (!weapon) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="p-20 text-center text-white font-black uppercase italic opacity-20 tracking-widest text-2xl">
        Weapon not found. ({targetName})
      </div>
    </div>
  );

  const getIllustrationUrl = () => {
    return encodeURI(`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images/Weapons/${weapon.name.normalize('NFC')}.webp`);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12 font-sans selection:bg-brand-primary overflow-x-hidden">
      <SEO 
        title={`${weapon.name} 정보`} 
        description={`${weapon.name}의 상세 스탯, 무기 스킬, 스토리를 확인하세요.`}
        name={weapon.name}
        image={getIllustrationUrl()}
      />
      
      <PageHeader gameId="ww" category={t("무기")} title={t(weapon.name)} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-6">
        {/* Top Section: Image & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-8 items-start">
          
          {/* Left: Image with Overlay */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.2] flex items-center justify-center">
            <img 
              src={getIllustrationUrl()} 
              alt={weapon.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  {t('무기 종류')} : {t(weapon.type || '')}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg">
                  {t(weapon.name)}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: weapon.rarity }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Consolidated Controls and Info */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* 01. Compact Control & Stats Card */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
                {/* Resonance (Superimposition) Slider */}
                <div className="space-y-3 flex-grow relative pt-6 group/rslider">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black italic opacity-20" style={{ color: theme.primary }}>01</span>
                      <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-500">{t('중첩')}</h2>
                    </div>
                  </div>
                  {/* Floating Rank Label */}
                  <div 
                    className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-white text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg z-10"
                    style={{ 
                      left: `${(rankIdx / 4) * 100}%`,
                      boxShadow: `0 0 10px rgba(255,255,255,0.4)`
                    }}
                  >
                    R{rankIdx + 1}
                  </div>
                  <input 
                    type="range" min="0" max="4" value={rankIdx} 
                    onChange={(e) => setRankIdx(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-600 px-0.5 mt-1.5">
                    <span>1</span>
                    <span>5</span>
                  </div>
                </div>

                {/* Quick Link/Guide */}
                <div className="mt-4 md:mt-0">
                   <Link 
                     to={`/gallery/ww/guide/${weapon.name}`} 
                     className="flex items-center gap-2 px-6 py-2 bg-brand-primary text-white rounded-xl text-[10px] font-black shadow-lg hover:scale-105 transition-transform"
                   >
                     <BookOpen size={12} /> {t('무기 공략')}
                   </Link>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                <div className="space-y-0.5">
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t('기초 공격력')} (Lv.90)</div>
                  <div className="text-xl font-black tabular-nums tracking-tighter italic">{weapon.stats.atk}</div>
                </div>
                <div className="space-y-0.5 border-l border-white/5 px-4">
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t(weapon.stats.subStatName)}</div>
                  <div className="text-xl font-black tabular-nums tracking-tighter italic text-brand-accent">{weapon.stats.subStatValue}</div>
                </div>
              </div>
            </div>

            {/* 02. Skill Detail Section (REDUCED SIZE) */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow group/skill">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-black italic opacity-20 group-hover/skill:opacity-40 transition-opacity" style={{ color: theme.primary }}>02</span>
                <div className="flex items-center gap-3">
                   <ShieldCheck size={20} style={{ color: theme.primary }} />
                   <h2 className="text-xl font-black tracking-tighter italic uppercase text-white/90">{t(weapon.skill?.name || '')}</h2>
                </div>
              </div>
              
              <div className="text-gray-300 text-base md:text-lg leading-relaxed bg-white/[0.01] p-6 rounded-[25px] border border-white/5 shadow-inner min-h-[120px]">
                {renderRichText(formatDescriptionByRank(weapon.skill?.description || '', rankIdx + 1))}
              </div>
            </div>
            
            <AdPlaceholder type="leaderboard" className="mt-4 mb-2 scale-90 opacity-40" />
          </div>
        </div>

        {/* 03. Story Section (Toggle) - BOTTOM FULL WIDTH */}
        {weapon.description && (
          <div className="glass-card overflow-hidden rounded-[35px] border border-white/5 transition-all duration-300">
              <button 
                onClick={() => setIsStoryOpen(!isStoryOpen)}
                className="w-full p-8 flex items-center justify-between group/story hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="text-4xl font-black italic opacity-10" style={{ color: theme.primary }}>03</span>
                  <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 group-hover/story:text-white transition-colors">{t('무기 스토리')}</h2>
                </div>
                <div className={`p-3 rounded-full bg-white/5 border border-white/10 transition-transform duration-500 ${isStoryOpen ? 'rotate-180 bg-brand-primary/20 border-brand-primary/20' : ''}`} style={isStoryOpen ? { color: theme.primary } : {}}>
                  {isStoryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div className={`transition-all duration-700 ease-in-out ${isStoryOpen ? 'max-h-[2000px] opacity-100 pb-10' : 'max-h-0 opacity-0'}`}>
                <div className="px-8 border-t border-white/5 pt-8">
                  <div className="text-gray-400 text-base md:text-lg leading-relaxed italic whitespace-pre-line custom-scrollbar bg-black/20 p-8 rounded-[30px] border border-white/5 shadow-inner">
                      {t(weapon.description)}
                  </div>
                </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WuwaWeaponDetail;