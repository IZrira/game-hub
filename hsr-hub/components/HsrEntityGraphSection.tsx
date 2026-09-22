import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { Sparkles, Shield, Award, ChevronRight, BookOpen } from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../../common-hub/data/games';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';
import type { HsrCharacter } from '../types';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

interface HsrEntityGraphSectionProps {
  character: HsrCharacter;
  theme: { primary: string; secondary: string; shadow: string };
}

export const HsrEntityGraphSection: React.FC<HsrEntityGraphSectionProps> = ({ character, theme }) => {
  const guide = useMemo(() => {
    return HSR_CHARACTER_GUIDES.find(
      g => g.characterName === character.name || g.characterName === character.folderName || g.characterName === character.id
    );
  }, [character]);

  const recommendedLightCones = useMemo(() => {
    if (!guide) return [];
    const list = [
      ...(Array.isArray(guide.bestLightCones) ? guide.bestLightCones : []),
      ...(Array.isArray(guide.variants?.[0]?.bestLightCones) ? guide.variants[0].bestLightCones : [])
    ];

    return list.map((item, idx) => {
      const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
      const note = typeof item === 'object' ? item?.note : undefined;
      const lcData = (LIGHTCONE_DB as any[]).find(l => l.name === name);
      const lcPath = lcData?.path || character.path || '';
      const lcFolder = lcData?.folderName || lcData?.fileName || name;
      const imageUrl = `${CDN_URL}/hsr%20images/광추/${safeEncodeURIComponent(lcPath)}/${safeEncodeURIComponent(lcFolder)}.webp`;

      return {
        name,
        note,
        rank: idx + 1,
        imageUrl,
        rarity: lcData?.rarity || 5
      };
    }).filter(lc => lc.name);
  }, [guide, character]);

  const recommendedRelics = useMemo(() => {
    if (!guide) return [];
    const list = [
      ...(Array.isArray(guide.bestRelics) ? guide.bestRelics : []),
      ...(Array.isArray(guide.variants?.[0]?.bestRelics) ? guide.variants[0].bestRelics : [])
    ];

    return list.map(item => {
      const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
      const note = typeof item === 'object' ? item?.note : undefined;
      const relicData = (RELIC_DB as any[]).find(r => r.name === name);
      const imageUrl = `${CDN_URL}/hsr%20images/유물/${safeEncodeURIComponent(name)}.webp`;
      return {
        name,
        note,
        imageUrl,
        twoPiece: relicData?.['2piece'],
        fourPiece: relicData?.['4piece']
      };
    }).filter(r => r.name);
  }, [guide]);

  const recommendedOrnaments = useMemo(() => {
    if (!guide) return [];
    const list = [
      ...(Array.isArray(guide.bestOrnaments) ? guide.bestOrnaments : []),
      ...(Array.isArray(guide.variants?.[0]?.bestOrnaments) ? guide.variants[0].bestOrnaments : [])
    ];

    return list.map(item => {
      const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
      const note = typeof item === 'object' ? item?.note : undefined;
      const ornData = (ORNAMENT_DB as any[]).find(o => o.name === name);
      const imageUrl = `${CDN_URL}/hsr%20images/차원%20장신구/${safeEncodeURIComponent(name)}.webp`;
      return {
        name,
        note,
        imageUrl,
        setEffect: ornData?.setEffect?.['2piece'] || ornData?.['2piece']
      };
    }).filter(o => o.name);
  }, [guide]);

  if (!guide && recommendedLightCones.length === 0 && recommendedRelics.length === 0) {
    return null;
  }

  return (
    <section id="equipment" className="space-y-8 scroll-mt-28">
      <div className="flex items-center justify-between w-full group">
        <div className="flex items-center gap-6">
          <div
            className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}
          >
            ✦
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">
              추천 세팅 &amp; 장비 연결 (Entity Graph)
            </h2>
            <p className="text-xs text-gray-400 pl-6 mt-1">
              {character.name}에게 최적화된 종결 광추, 유물 및 차원 장신구 데이터베이스 링크입니다.
            </p>
          </div>
        </div>

        <Link
          to={`/gallery/hsr/character/${encodeURIComponent(character.id)}/guide`}
          className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs font-black hover:border-brand-primary/40 hover:bg-white/10 transition-all group/btn"
          style={{ color: theme.primary }}
        >
          <BookOpen size={14} />
          <span>공략 가이드 전문</span>
          <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* 1. Recommended Light Cones */}
      {recommendedLightCones.length > 0 && (
        <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-5">
          <div className="flex items-center gap-3">
            <Award size={18} style={{ color: theme.primary }} />
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-300">
              추천 광추 순위
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedLightCones.slice(0, 4).map(lc => (
              <Link
                key={lc.name}
                to={`/gallery/hsr/lightcone/${encodeURIComponent(lc.name)}`}
                className="group relative flex flex-col p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-16 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                    <img
                      src={lc.imageUrl}
                      alt={lc.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className="px-2 py-0.5 rounded text-[9px] font-black text-black"
                        style={{ backgroundColor: theme.primary }}
                      >
                        {lc.rank}순위
                      </span>
                      <span className="text-[10px] text-amber-400 font-bold">
                        {'★'.repeat(lc.rarity)}
                      </span>
                    </div>
                    <h4 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                      {lc.name}
                    </h4>
                    {lc.note && (
                      <p className="mt-1 text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                        {lc.note}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 2. Recommended Relics & Ornaments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedRelics.length > 0 && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center gap-3">
              <Shield size={18} style={{ color: theme.primary }} />
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-300">
                추천 터널 유물
              </h3>
            </div>
            <div className="space-y-3">
              {recommendedRelics.slice(0, 3).map(relic => (
                <Link
                  key={relic.name}
                  to={`/gallery/hsr/relic/${encodeURIComponent(relic.name)}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 group-hover:scale-105 transition-transform">
                    <img
                      src={relic.imageUrl}
                      alt={relic.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                      {relic.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">
                      {relic.note || relic.fourPiece || relic.twoPiece || '유물 세트 효과 보기'}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {recommendedOrnaments.length > 0 && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center gap-3">
              <Sparkles size={18} style={{ color: theme.primary }} />
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-300">
                추천 차원 장신구
              </h3>
            </div>
            <div className="space-y-3">
              {recommendedOrnaments.slice(0, 3).map(orn => (
                <Link
                  key={orn.name}
                  to={`/gallery/hsr/ornament/${encodeURIComponent(orn.name)}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.05] transition-all"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 group-hover:scale-105 transition-transform">
                    <img
                      src={orn.imageUrl}
                      alt={orn.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                      {orn.name}
                    </h4>
                    <p className="text-[11px] text-gray-400 truncate">
                      {orn.note || orn.setEffect || '장신구 세트 효과 보기'}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden">
        <Link
          to={`/gallery/hsr/character/${encodeURIComponent(character.id)}/guide`}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-black text-brand-accent hover:bg-white/10 transition-all"
          style={{ color: theme.primary }}
        >
          <BookOpen size={14} />
          <span>{character.name} 종결 세팅 및 육성 공략 가이드 전문 보기</span>
        </Link>
      </div>
    </section>
  );
};

export default HsrEntityGraphSection;
