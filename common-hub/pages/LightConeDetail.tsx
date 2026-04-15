import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, ShieldCheck, Info, ArrowLeft } from 'lucide-react';
import { ARCHIVE_DATA, LIGHTCONE_DB } from '../data/games';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

const LightConeDetail: React.FC = () => {
  const { gameId, lcName } = useParams<{ gameId: string; lcName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const game = useMemo(() => ARCHIVE_DATA.games.find(g => g.id === gameId), [gameId]);
  const lc = useMemo(() => LIGHTCONE_DB.find(l => l.name === lcName), [lcName]);

  const theme = { primary: '#EAB308', secondary: '#FDE047', shadow: 'rgba(234, 179, 8, 0.4)' };

  if (!lc) return <div className="p-20 text-center text-white font-black uppercase italic">{t('Light Cone Registry Not Found')}</div>;

  const getIllustrationUrl = () => {
    const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
    const targetName = lc.fileName || lc.folderName || lc.name;
    
    const url = lc.gameId === 'ww'
      ? `${CDN_URL}/ww images/weapons/${targetName.normalize('NFC')}.webp`
      : `${CDN_URL}/hsr images/광추/${(lc.path || '').normalize('NFC')}/${targetName.normalize('NFC')}.webp`;
      
    return encodeURI(url);
  };

  const renderDescription = (description: string, level: 1 | 5) => {
    const regex = /(\d+(?:\.\d+)?%?)\s*\/\s*(\d+(?:\.\d+)?%?)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(description.substring(lastIndex, match.index));
      }
      const value = level === 1 ? match[1] : match[2];
      parts.push(
        <span key={match.index} className="font-black px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 mx-0.5" style={{ color: theme.primary }}>
          {value}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < description.length) {
      parts.push(description.substring(lastIndex));
    }

    return parts;
  };

  const mainStatName = lc.gameId === 'ww' ? '90레벨 기초 공격력' : '80레벨 기초 공격력';
  const mainStatValue = lc.gameId === 'ww' ? (lc as any).stats?.atk : lc.baseStats?.lv80?.["기초 공격력"];
  const subStatDesc = lc.gameId === 'ww' ? `, ${(lc as any).stats?.subStatName} 수치` : '';
  const skillName = lc.skill?.name ? ` 및 [${lc.skill.name}]의` : '';
  const gameName = lc.gameId === 'ww' ? '명조' : '붕괴: 스타레일';
  const term = lc.gameId === 'ww' ? '재련' : '중첩';
  const seoDescription = `${lc.name} 상세 가이드: ${mainStatName} ${mainStatValue || '???'}${subStatDesc}${skillName} ${term} 단계별 변화를 완벽 정리했습니다. ${gameName} 게이머를 위한 최신 데이터 시트.`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep">
      <SEO 
        title={`${lc.name} 상세 정보 & ${lc.gameId === 'ww' ? '재련' : '중첩'} 수치`} 
        description={seoDescription}
        name={lc.name}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/${lc.gameId === 'ww' ? 'weapon' : 'lightcone'}/${encodeURIComponent(lc.name)}`}
        gameCategory={lc.gameId === 'ww' ? '명조 (Wuthering Waves)' : '붕괴: 스타레일'}
        itemType={lc.gameId === 'ww' ? (lc as any).type : lc.path}
      />
      {/* Page Header */}
      <PageHeader gameId={gameId} category={lc.gameId === 'ww' ? t("무기") : t("광추")} title={t(lc.name)} />

      <div className="max-w-[1200px] mx-auto px-6 pt-10 space-y-20">
        {/* Profile Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-y-12 lg:gap-x-12 items-start border-b border-white/5 pb-16">
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] aspect-[3/4.5] flex items-center justify-center p-4 max-w-xl mx-auto lg:max-w-none w-full">
            <img 
              src={getIllustrationUrl()} 
              alt={`${lc.name} 아이콘`} 
              width="800"
              height="1200"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 text-transparent" 
              style={{ imageRendering: 'auto' }}
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>
          <div className="space-y-8 pb-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border backdrop-blur-md" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, borderColor: `${theme.primary}40` }}>{t(lc.path || (lc as any).type || '')}</span>
                  <span className="bg-white/5 text-gray-400 px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border border-white/10">{lc.gameId === 'ww' ? t('무기') : t('광추')}</span>
                </div>
              </div>
              
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white tracking-tighter italic leading-none whitespace-nowrap">{t(lc.name)}</h1>
              <div className="flex gap-2">{Array.from({ length: lc.rarity }).map((_, i) => (<Star key={i} size={24} fill={theme.primary} style={{ color: theme.primary }} />))}</div>
            </div>
            
            {lc.story && (
              <div className="glass-card p-8 rounded-[35px] border border-white/5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <Info size={20} style={{ color: theme.primary }} />
                        <h3 className="text-[12px] font-black text-white uppercase tracking-widest italic">{t('Story')}</h3>
                    </div>
                </div>
                <div className="text-gray-300 text-lg leading-relaxed italic bg-black/30 p-8 rounded-[25px] border border-white/5 shadow-inner whitespace-pre-line">
                  {t(lc.story || '')}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 01 Basic Stats */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>01</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">{t('기본 스탯 (Lv. 80)')}</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 border-y border-white/10 text-center">
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('기초 HP')}</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 HP"] || '---'}</div>
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('기초 공격력')}</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 공격력"] || '---'}</div>
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t('기초 방어력')}</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 방어력"] || '---'}</div>
            </div>
          </div>
        </section>

        {/* 02 Light Cone Skill */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>02</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">{t('광추 능력')}</h2>
            </div>
          </div>
          
          {lc.skill ? (
            <div className="grid grid-cols-1 gap-10">
              <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t(lc.skill.name || '')} ({t('1중첩')})</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {renderDescription(t(lc.skill.description || ''), 1)}
                </p>
              </div>
              <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} style={{ color: theme.primary }} />
                  <span className="text-xl font-black uppercase tracking-tighter italic" style={{ color: theme.primary }}>{t(lc.skill.name || '')} ({t('5중첩')})</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {renderDescription(t(lc.skill.description || ''), 5)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">{t('스킬 정보가 없습니다.')}</p>
          )}
        </section>

        {/* 03 Source */}
        {lc.source && (
          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>03</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">{t('획득처')}</h2>
            </div>
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8 h-fit">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Info size={22} className="text-gray-500" />
                <span className="text-xl font-black uppercase tracking-tighter italic">{t('획득처')}</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {t(lc.source || '')}
              </p>
            </div>
          </section>
        )}

        <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
      </div>
    </div>
  );
};

export default LightConeDetail;
