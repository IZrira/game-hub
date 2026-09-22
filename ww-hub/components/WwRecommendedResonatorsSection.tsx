import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { Users, ChevronRight, BookOpen } from 'lucide-react';
import { getGameData } from '../../common-hub/data/dataManager';
import { getCharacterArtPath } from '../../common-hub/utils/imageHelper';

interface WwRecommendedResonatorsSectionProps {
  itemType: 'weapon' | 'echo';
  itemName: string;
  theme?: { primary: string; secondary?: string };
}

const normalizeName = (s: string) => (s || '').replace(/\s+/g, '').toLowerCase();

export const WwRecommendedResonatorsSection: React.FC<WwRecommendedResonatorsSectionProps> = ({
  itemType,
  itemName,
  theme = { primary: '#EAB308' }
}) => {
  const { CHARACTER_DB, GUIDES } = useMemo(() => getGameData('ww'), []);

  const resonators = useMemo(() => {
    if (!itemName || !GUIDES || !Array.isArray(GUIDES)) return [];
    const targetNorm = normalizeName(itemName);
    const results: {
      charId: string;
      name: string;
      folderName?: string;
      attribute?: string;
      weaponType?: string;
      rarity?: number;
      rank?: number;
      note?: string;
    }[] = [];

    const seenChars = new Set<string>();

    GUIDES.forEach((guide: any) => {
      let matched = false;
      let matchedRank: number | undefined;
      let matchedNote: string | undefined;

      if (itemType === 'weapon') {
        const weaponList = Array.isArray(guide.weapons) ? guide.weapons : [];
        weaponList.forEach((w: any, idx: number) => {
          const wName = typeof w === 'string' ? w : w?.name;
          if (wName && normalizeName(wName) === targetNorm) {
            matched = true;
            matchedRank = typeof w === 'object' && w.rank ? w.rank : idx + 1;
            matchedNote = typeof w === 'object' ? w.note : undefined;
          }
        });
      } else if (itemType === 'echo') {
        const echoList = [
          ...(Array.isArray(guide.mainEchoes) ? guide.mainEchoes : []),
          ...(Array.isArray(guide.variants?.[0]?.mainEchoes) ? guide.variants[0].mainEchoes : [])
        ];

        echoList.forEach((e: any, idx: number) => {
          const eName = typeof e === 'string' ? e : e?.name;
          if (eName && normalizeName(eName) === targetNorm) {
            matched = true;
            matchedRank = idx + 1;
            matchedNote = typeof e === 'object' ? e.reason : undefined;
          }
        });
      }

      if (matched) {
        const cleanGuideId = guide.id?.replace(/_세팅_공략|_공략/g, '').trim();
        const charData = (CHARACTER_DB as any[])?.find(c =>
          c.id === guide.id ||
          c.name === guide.id ||
          c.id === cleanGuideId ||
          c.name === cleanGuideId ||
          normalizeName(c.name) === normalizeName(guide.name || '')
        );

        const charId = charData?.id || cleanGuideId || guide.id;
        const charName = charData?.name || guide.name || charId;

        if (!seenChars.has(charId)) {
          seenChars.add(charId);
          results.push({
            charId,
            name: charName,
            folderName: charData?.folderName || charData?.name,
            attribute: charData?.attribute,
            weaponType: charData?.weaponType,
            rarity: charData?.rarity || 5,
            rank: matchedRank,
            note: matchedNote
          });
        }
      }
    });

    return results.sort((a, b) => (a.rank || 99) - (b.rank || 99));
  }, [itemType, itemName, GUIDES, CHARACTER_DB]);

  if (resonators.length === 0) return null;

  return (
    <section className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-5">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-3">
          <Users size={18} style={{ color: theme.primary }} />
          <h3 className="text-base font-black uppercase tracking-widest text-white">
            추천 착용 공명자 ({resonators.length})
          </h3>
        </div>
        <span className="text-[11px] text-gray-400 font-semibold">
          공식 가이드 종결 세팅 기준
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {resonators.map(char => {
          const charImg = getCharacterArtPath('ww', char.folderName || char.name);

          return (
            <div
              key={char.charId}
              className="group flex flex-col justify-between p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
            >
              <Link
                to={`/gallery/ww/character/${encodeURIComponent(char.charId)}`}
                className="flex items-center gap-3.5"
              >
                <div className="relative h-14 w-14 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={charImg}
                    alt={char.name}
                    loading="lazy"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  {char.rank !== undefined && (
                    <span
                      className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-black text-black"
                      style={{ backgroundColor: theme.primary }}
                    >
                      {char.rank}순위
                    </span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    {char.rarity && (
                      <span className="text-[10px] text-yellow-400 font-black">
                        {'★'.repeat(char.rarity)}
                      </span>
                    )}
                    {char.attribute && (
                      <span className="text-[10px] text-gray-400 font-semibold">
                        · {char.attribute}
                      </span>
                    )}
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
              </Link>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/5">
                <Link
                  to={`/gallery/ww/character/${encodeURIComponent(char.charId)}/guide`}
                  className="flex items-center gap-1 text-[10px] font-bold text-gray-400 hover:text-brand-accent transition-colors"
                >
                  <BookOpen size={12} />
                  <span>세팅 공략</span>
                </Link>
                <Link
                  to={`/gallery/ww/character/${encodeURIComponent(char.charId)}`}
                  className="flex items-center gap-0.5 text-[10px] font-bold text-gray-400 group-hover:text-white transition-colors"
                >
                  <span>상세 정보</span>
                  <ChevronRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WwRecommendedResonatorsSection;
