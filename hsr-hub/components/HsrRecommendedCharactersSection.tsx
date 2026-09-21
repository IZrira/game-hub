import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { Users, ChevronRight, Sparkles } from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB } from '../../common-hub/data/games';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';

interface HsrRecommendedCharactersSectionProps {
  itemType: 'lightcone' | 'relic' | 'ornament';
  itemName: string;
  theme?: { primary: string };
}

export const HsrRecommendedCharactersSection: React.FC<HsrRecommendedCharactersSectionProps> = ({
  itemType,
  itemName,
  theme = { primary: '#EAB308' }
}) => {
  const characters = useMemo(() => {
    if (!itemName) return [];
    const results: Array<{
      charId: string;
      name: string;
      rarity: number;
      attribute: string;
      path: string;
      folderName?: string;
      rank?: number;
      note?: string;
    }> = [];

    HSR_CHARACTER_GUIDES.forEach(g => {
      const charName = g.characterName;
      const char = (CHARACTER_DB as any[]).find(c => c.name === charName || c.id === charName || c.folderName === charName);
      if (!char) return;

      let matched = false;
      let matchedRank: number | undefined;
      let matchedNote: string | undefined;

      if (itemType === 'lightcone') {
        const lcs = [
          ...(Array.isArray(g.bestLightCones) ? g.bestLightCones : []),
          ...(Array.isArray(g.variants?.[0]?.bestLightCones) ? g.variants[0].bestLightCones : [])
        ];
        lcs.forEach((item, idx) => {
          const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
          if (name === itemName.trim()) {
            matched = true;
            matchedRank = idx + 1;
            matchedNote = typeof item === 'object' ? item?.note : undefined;
          }
        });
      } else if (itemType === 'relic') {
        const relics = [
          ...(Array.isArray(g.bestRelics) ? g.bestRelics : []),
          ...(Array.isArray(g.variants?.[0]?.bestRelics) ? g.variants[0].bestRelics : [])
        ];
        relics.forEach(item => {
          const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
          if (name === itemName.trim()) {
            matched = true;
            matchedNote = typeof item === 'object' ? item?.note : undefined;
          }
        });
      } else if (itemType === 'ornament') {
        const ornaments = [
          ...(Array.isArray(g.bestOrnaments) ? g.bestOrnaments : []),
          ...(Array.isArray(g.variants?.[0]?.bestOrnaments) ? g.variants[0].bestOrnaments : [])
        ];
        ornaments.forEach(item => {
          const name = typeof item === 'string' ? item.trim() : item?.name?.trim();
          if (name === itemName.trim()) {
            matched = true;
            matchedNote = typeof item === 'object' ? item?.note : undefined;
          }
        });
      }

      if (matched && !results.some(r => r.charId === char.id)) {
        results.push({
          charId: char.id,
          name: char.name,
          rarity: char.rarity || 5,
          attribute: char.attribute || '',
          path: char.path || '',
          folderName: char.folderName,
          rank: matchedRank,
          note: matchedNote
        });
      }
    });

    return results.sort((a, b) => (a.rank || 99) - (b.rank || 99));
  }, [itemType, itemName]);

  if (characters.length === 0) return null;

  return (
    <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users size={18} style={{ color: theme.primary }} />
          <h3 className="text-base font-black uppercase tracking-widest text-white">
            추천 착용 캐릭터 ({characters.length})
          </h3>
        </div>
        <span className="text-[11px] text-gray-400 font-semibold">
          공식 가이드 종결 세팅 기준
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {characters.map(char => {
          const folder = char.folderName || char.name;
          const imageUrl = `${CDN_URL}/hsr%20images/%EC%BA%90%EB%A6%AD%ED%84%B0/${safeEncodeURIComponent(folder)}/art01.webp`;

          return (
            <Link
              key={char.charId}
              to={`/gallery/hsr/character/${encodeURIComponent(char.charId)}`}
              className="group flex items-center gap-3.5 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
            >
              <div className="relative h-14 w-14 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                <img
                  src={imageUrl}
                  alt={char.name}
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
                  {char.rank !== undefined && (
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-black text-black"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {char.rank}순위
                    </span>
                  )}
                  <span className="text-[10px] text-gray-400 font-semibold">
                    {char.attribute} · {char.path}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                  {char.name}
                </h4>
                {char.note && (
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">
                    {char.note}
                  </p>
                )}
              </div>

              <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HsrRecommendedCharactersSection;
