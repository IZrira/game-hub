import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, ChevronDown, ChevronUp, Package, Info, BookOpen } from 'lucide-react';
import { WEAPON_DATA } from '../data/weapons';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import { renderRichText, formatDescriptionByRank } from '../data/formatter';
import { useTranslation } from 'react-i18next';
import { Compass, Zap, MapPin, History, Globe, Shield } from 'lucide-react';

const WuwaWeaponDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const routeParam = params.lcName || params.weaponName || params.name || params.id || Object.values(params).pop() || '';
  const targetName = String(routeParam).normalize('NFC');
  const [rankIdx, setRankIdx] = useState<number>(0);
  const [isStoryOpen, setIsStoryOpen] = useState(false);

  const weapon = WEAPON_DATA.find(w => w.name.normalize('NFC') === targetName);

  const getRarityTheme = (rarity: number) => {
    switch (rarity) {
      case 5: return { primary: '#EAB308', secondary: '#FDE047' };
      case 4: return { primary: '#A855F7', secondary: '#D8B4FE' };
      case 3: return { primary: '#3B82F6', secondary: '#93C5FD' };
      case 2: return { primary: '#10B981', secondary: '#6EE7B7' };
      case 1: return { primary: '#64748B', secondary: '#94A3B8' };
      default: return { primary: '#EAB308', secondary: '#FDE047' };
    }
  };
  const theme = getRarityTheme(weapon?.rarity || 5);

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
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12 font-sans selection:bg-brand-primary relative">
      <SEO 
        title={`${weapon.name} ${t('상세 정보 및 스탯 | 명조 아카이브')}`} 
        description={`${t('명조 (Wuthering Waves)')} ${weapon.rarity}${t('성')} ${t(weapon.type)} ${weapon.name}${t('의 상세 스탯, 무기 스킬, 획득처 및 스토리를 확인하세요.')}`}
        image={getIllustrationUrl()}
        url={`/gallery/ww/weapon/${weapon.name}`}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: '/gallery/ww' },
          { name: t('무기'), url: '/gallery/ww?menu=무기' },
          { name: weapon.name, url: `/gallery/ww/weapon/${weapon.name}` }
        ]}
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
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[20px] border-2 flex items-center justify-center font-black text-lg shadow-xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>01</div>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400 italic">{t('중첩')}</h2>
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
                     style={{ backgroundColor: theme.primary }}
                   >
                     <BookOpen size={12} /> {t('무기 공략')}
                   </Link>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatRow label={t("기초 공격력")} value={weapon.stats.atk} color={theme.primary} />
                <StatRow label={t(weapon.stats.subStatName)} value={weapon.stats.subStatValue} color={theme.primary} />
              </div>
            </div>

            {/* 02. Skill Detail Section */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow group/skill">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>02</div>
                <div className="flex flex-col border-l-4 border-white/10 pl-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{t('무기 스킬')}</span>
                  <h2 className="text-xl font-black tracking-tighter italic uppercase text-white/90 leading-none">{t(weapon.skill?.name || '')}</h2>
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
          <div className="space-y-8">
            <SectionHeader num="03" title={t('무기 스토리')} theme={theme} expanded={isStoryOpen} onToggle={() => setIsStoryOpen(!isStoryOpen)} />
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isStoryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="glass-card p-8 rounded-[35px] border border-white/5">
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

const SectionHeader: React.FC<{ 
  num: string; 
  title: string; 
  theme: { primary: string; secondary: string }; 
  expanded?: boolean; 
  onToggle?: () => void 
}> = ({ num, title, theme, expanded, onToggle }) => (
  <div className="flex items-center justify-between w-full group">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{num}</div>
      <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">{title}</h2>
    </div>
    {onToggle && (<button onClick={onToggle} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">{expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</button>)}
  </div>
);

const StatRow: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</span>
    </div>
    <div className="text-xl font-black tabular-nums text-white group-hover:scale-105 transition-transform">{value}</div>
  </div>
);

export default WuwaWeaponDetail;