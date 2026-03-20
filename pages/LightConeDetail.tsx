import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Star, ShieldCheck, Info, ArrowLeft } from 'lucide-react';
import { ARCHIVE_DATA, LIGHTCONE_DB } from '../data/games';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';

const LightConeDetail: React.FC = () => {
  const { gameId, lcName } = useParams<{ gameId: string; lcName: string }>();
  const navigate = useNavigate();

  const game = useMemo(() => ARCHIVE_DATA.games.find(g => g.id === gameId), [gameId]);
  const lc = useMemo(() => LIGHTCONE_DB.find(l => l.name === lcName), [lcName]);

  const theme = { primary: '#EAB308', secondary: '#FDE047', shadow: 'rgba(234, 179, 8, 0.4)' };

  if (!lc) return <div className="p-20 text-center text-white font-black uppercase italic">Light Cone Registry Not Found</div>;

  const getIllustrationUrl = () => {
    const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';
    const targetName = lc.fileName || lc.folderName || lc.name;
    const url = `${BASE_IMAGE_URL}/광추/${lc.path.normalize('NFC')}/${targetName.normalize('NFC')}.webp`;
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

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible">
      {/* Page Header */}
      <PageHeader gameId={gameId} category="광추" title={lc.name} />

      <div className="max-w-[1200px] mx-auto px-6 pt-10 space-y-20">
        {/* Profile Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-12 items-start border-b border-white/5 pb-16">
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] aspect-[3/4.5] flex items-center justify-center p-4">
            <img 
              src={getIllustrationUrl()} 
              alt={lc.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" 
              style={{ 
                imageRendering: 'high-quality',
                transform: 'translateZ(0)'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          </div>
          <div className="space-y-8 pb-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border backdrop-blur-md" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, borderColor: `${theme.primary}40` }}>{lc.path}</span>
                  <span className="bg-white/5 text-gray-400 px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border border-white/10">광추</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-none whitespace-nowrap">{lc.name}</h1>
              <div className="flex gap-2">{Array.from({ length: lc.rarity }).map((_, i) => (<Star key={i} size={24} fill={theme.primary} style={{ color: theme.primary }} />))}</div>
            </div>
            
            {lc.story && (
              <div className="glass-card p-8 rounded-[35px] border border-white/5 max-w-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-3">
                        <Info size={20} style={{ color: theme.primary }} />
                        <h3 className="text-[12px] font-black text-white uppercase tracking-widest italic">Story</h3>
                    </div>
                </div>
                <div className="text-gray-300 text-lg leading-relaxed italic bg-black/30 p-8 rounded-[25px] border border-white/5 shadow-inner whitespace-pre-line">
                  {lc.story}
                </div>
              </div>
            )}
          </div>
        </div>

        <AdPlaceholder type="leaderboard" className="my-12" />
        <AdPlaceholder type="leaderboard" className="my-12" />

        {/* 01 Basic Stats */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>01</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">기본 스탯 (Lv. 80)</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-16 border-y border-white/10 text-center">
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">기초 HP</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 HP"] || '---'}</div>
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">기초 공격력</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 공격력"] || '---'}</div>
            </div>
            <div className="space-y-4">
              <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">기초 방어력</span>
              <div className="text-4xl font-black text-white">{lc.baseStats?.lv80?.["기초 방어력"] || '---'}</div>
            </div>
          </div>
        </section>

        <AdPlaceholder type="leaderboard" className="my-12" />

        {/* 02 Light Cone Skill */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>02</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">광추 능력</h2>
            </div>
          </div>
          
          {lc.skill ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{lc.skill.name} (1중첩)</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {renderDescription(lc.skill.description, 1)}
                </p>
              </div>
              <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} style={{ color: theme.primary }} />
                  <span className="text-xl font-black uppercase tracking-tighter italic" style={{ color: theme.primary }}>{lc.skill.name} (5중첩)</span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                  {renderDescription(lc.skill.description, 5)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">스킬 정보가 없습니다.</p>
          )}
        </section>

        <AdPlaceholder type="leaderboard" className="my-12" />

        {/* 03 Source */}
        {lc.source && (
          <section className="space-y-8">
            <div className="flex items-center gap-6">
              <span className="text-6xl md:text-8xl font-black italic tracking-tighter opacity-20" style={{ color: theme.primary }}>03</span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic">획득처</h2>
            </div>
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8 h-fit">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Info size={22} className="text-gray-500" />
                <span className="text-xl font-black uppercase tracking-tighter italic">획득처</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {lc.source}
              </p>
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default LightConeDetail;
