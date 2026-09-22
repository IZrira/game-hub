import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { Sparkles, Shield, Award, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { getGameData } from '../../common-hub/data/dataManager';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';
import type { WuwaCharacter } from '../types';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

interface WwEntityGraphSectionProps {
  character: WuwaCharacter;
  theme: { primary: string; secondary: string; shadow: string };
}

const normalizeName = (s: string) => (s || '').replace(/\s+/g, '').toLowerCase();

export const WwEntityGraphSection: React.FC<WwEntityGraphSectionProps> = ({ character, theme }) => {
  const { WEAPON_DB, ECHO_DB, GUIDES } = useMemo(() => getGameData('ww'), []);

  const guide = useMemo(() => {
    if (!GUIDES || !Array.isArray(GUIDES)) return null;
    const charId = character.id;
    const charName = character.name;
    const folderName = character.folderName;

    return GUIDES.find((g: any) => {
      const cleanGuideId = g.id?.replace(/_세팅_공략|_공략/g, '').trim();
      return (
        g.id === charId ||
        g.id === charName ||
        cleanGuideId === charId ||
        (cleanGuideId && (normalizeName(cleanGuideId) === normalizeName(charName) || normalizeName(cleanGuideId) === normalizeName(folderName || ''))) ||
        (g.name && (normalizeName(g.name) === normalizeName(charName) || normalizeName(g.name) === normalizeName(folderName || '')))
      );
    });
  }, [GUIDES, character]);

  const recommendedWeapons = useMemo(() => {
    if (!guide?.weapons || !Array.isArray(guide.weapons)) return [];
    return guide.weapons.slice(0, 4).map((w: any) => {
      const name = typeof w === 'string' ? w.trim() : w?.name?.trim();
      const rank = typeof w === 'object' ? w.rank : undefined;
      const note = typeof w === 'object' ? w.note : undefined;
      const weaponData = (WEAPON_DB as any[])?.find(dbW => dbW.name === name);
      const imageUrl = `${CDN_URL}/ww%20images/weapon/${safeEncodeURIComponent(name)}.webp`;

      return {
        name,
        rank: rank || 1,
        note,
        rarity: weaponData?.rarity || weaponData?.stars || 5,
        imageUrl,
        weaponType: weaponData?.type || character.weaponType || ''
      };
    }).filter((w: any) => w.name);
  }, [guide, WEAPON_DB, character]);

  const recommendedEchoes = useMemo(() => {
    if (!guide) return [];
    const mainList = Array.isArray(guide.mainEchoes) ? guide.mainEchoes : [];
    const variantEchoes = Array.isArray(guide.variants?.[0]?.mainEchoes) ? guide.variants[0].mainEchoes : [];
    const combined = [...mainList, ...variantEchoes];

    const seen = new Set<string>();
    const results: any[] = [];

    combined.forEach((e: any) => {
      const name = typeof e === 'string' ? e.trim() : e?.name?.trim();
      if (!name || seen.has(name)) return;
      seen.add(name);

      const echoData = (ECHO_DB as any[])?.find(dbE => dbE.name === name);
      const imageUrl = `${CDN_URL}/ww%20images/Echo/${safeEncodeURIComponent(name)}.webp`;
      results.push({
        name,
        reason: typeof e === 'object' ? e.reason : undefined,
        cost: echoData?.cost || 4,
        imageUrl
      });
    });

    return results.slice(0, 4);
  }, [guide, ECHO_DB]);

  const recommendedSonataSets = useMemo(() => {
    if (!guide) return [];
    const sets = [
      ...(Array.isArray(guide.echoSets) ? guide.echoSets : []),
      ...(Array.isArray(guide.variants?.[0]?.echoSets) ? guide.variants[0].echoSets : [])
    ];

    const seen = new Set<string>();
    const results: { raw: string; sonataName: string; note?: string; imageUrl: string }[] = [];

    sets.forEach((s: any) => {
      const raw = typeof s === 'string' ? s.trim() : s?.name?.trim();
      const note = typeof s === 'object' ? s?.note : undefined;
      if (!raw || seen.has(raw)) return;
      seen.add(raw);

      const sonataName = raw.replace(/\s?\d+세트/g, '').trim();
      const imageUrl = `${CDN_URL}/ww%20images/common/sonata/${safeEncodeURIComponent(sonataName)}.webp`;
      results.push({
        raw,
        sonataName,
        note,
        imageUrl
      });
    });

    return results.slice(0, 3);
  }, [guide]);

  if (recommendedWeapons.length === 0 && recommendedEchoes.length === 0) {
    return null;
  }

  return (
    <section id="equipment" className="space-y-6 pt-4">
      {/* Header with Direct Guide CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg"
            style={{
              backgroundColor: `${theme.primary}20`,
              borderColor: `${theme.primary}60`,
              color: theme.primary
            }}
          >
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">
              {character.name} 종결 장비 세팅
            </h3>
            <p className="text-xs text-gray-400 font-medium">
              공식 빌드 가이드와 연계된 종결 무기 및 에코 세팅
            </p>
          </div>
        </div>

        <Link
          to={`/gallery/ww/character/${encodeURIComponent(character.id)}/guide`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/30 text-xs font-black text-brand-accent hover:text-white transition-all shadow-sm group self-start sm:self-auto"
        >
          <BookOpen size={14} className="group-hover:scale-110 transition-transform" />
          <span>상세 육성 공략 보기</span>
          <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Grid: Recommended Weapons & Echoes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Weapons */}
        {recommendedWeapons.length > 0 && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <Award size={18} style={{ color: theme.primary }} />
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  추천 무기 순위
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">
                우선순위 추천
              </span>
            </div>

            <div className="space-y-3">
              {recommendedWeapons.map((weapon: any, idx: number) => (
                <Link
                  key={idx}
                  to={`/gallery/ww/weapon/${encodeURIComponent(weapon.name)}`}
                  className="group flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="relative h-14 w-14 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                    <img
                      src={weapon.imageUrl}
                      alt={weapon.name}
                      loading="lazy"
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span
                      className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-black text-black"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {weapon.rank}순위
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] text-yellow-400 font-black">
                        {'★'.repeat(weapon.rarity || 5)}
                      </span>
                      {weapon.weaponType && (
                        <span className="text-[10px] text-gray-400 font-semibold">
                          · {weapon.weaponType}
                        </span>
                      )}
                    </div>
                    <h5 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                      {weapon.name}
                    </h5>
                    {weapon.note && (
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {weapon.note}
                      </p>
                    )}
                  </div>

                  <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Echoes & Sonata Sets */}
        {(recommendedEchoes.length > 0 || recommendedSonataSets.length > 0) && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <Shield size={18} style={{ color: theme.secondary }} />
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  추천 주 에코 & 소나타 세트
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">
                종결 세팅 조합
              </span>
            </div>

            {/* Sonata Sets Pills */}
            {recommendedSonataSets.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  추천 소나타 효과
                </span>
                <div className="flex flex-wrap gap-2">
                  {recommendedSonataSets.map((sonata, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white"
                    >
                      <img
                        src={sonata.imageUrl}
                        alt={sonata.sonataName}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span>{sonata.raw}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Echoes List */}
            {recommendedEchoes.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  추천 주 에코
                </span>
                <div className="space-y-2.5">
                  {recommendedEchoes.map((echo: any, eIdx: number) => (
                    <Link
                      key={eIdx}
                      to={`/gallery/ww/echo/${encodeURIComponent(echo.name)}`}
                      className="group flex items-center gap-3.5 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
                    >
                      <div className="relative h-12 w-12 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                        <img
                          src={echo.imageUrl}
                          alt={echo.name}
                          loading="lazy"
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                        <span className="absolute bottom-0.5 right-1 text-[8px] font-black text-amber-400">
                          {echo.cost}C
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <h5 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                          {echo.name}
                        </h5>
                        <p className="text-[11px] text-gray-400 truncate">
                          {echo.reason || '에코 스킬 및 소나타 효과 보기'}
                        </p>
                      </div>

                      <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WwEntityGraphSection;
