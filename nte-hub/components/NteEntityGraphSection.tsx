import React, { useMemo } from 'react';
import { Link } from 'react-router';
import { Sparkles, Shield, Award, ChevronRight, Users } from 'lucide-react';
import { NTE_ARCS } from '../data/arcs';
import { getRecommendedParties } from '../../common-hub/utils/synergyManager';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface NteEntityGraphSectionProps {
  character: any;
  theme: { primary: string; secondary?: string };
}

const normalizeName = (s: string) => (s || '').replace(/\s+/g, '').toLowerCase();

export const NteEntityGraphSection: React.FC<NteEntityGraphSectionProps> = ({ character, theme }) => {
  const dedicatedArcs = useMemo(() => {
    if (!character?.name) return [];
    const charNameNorm = normalizeName(character.name);
    const charIdNorm = normalizeName(character.id);

    return NTE_ARCS.filter(arc => {
      if (!arc.dedicatedChar) return false;
      const dNorm = normalizeName(arc.dedicatedChar);
      return dNorm === charNameNorm || dNorm === charIdNorm;
    });
  }, [character]);

  const recommendedParties = useMemo(() => {
    if (!character?.name && !character?.id) return [];
    return getRecommendedParties('nte', character.name || character.id);
  }, [character]);

  if (dedicatedArcs.length === 0 && recommendedParties.length === 0) {
    return null;
  }

  return (
    <section id="equipment" className="space-y-6 pt-4 scroll-mt-28">
      {/* Section Header */}
      <div className="flex items-center gap-3 border-b border-white/5 pb-4">
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
            {character.name} 장비 & 파티 시너지
          </h3>
          <p className="text-xs text-gray-400 font-medium">
            전용 아크 및 전투 포메이션 시너지
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dedicated Arcs */}
        {dedicatedArcs.length > 0 && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <Award size={18} style={{ color: theme.primary }} />
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  전용 / 추천 아크
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">
                시그니처 장비
              </span>
            </div>

            <div className="space-y-3">
              {dedicatedArcs.map((arc, idx) => {
                const arcImg = `${CDN_URL}/nte%20images/arcs/${safeEncodeURIComponent(arc.name)}.webp`;
                return (
                  <Link
                    key={idx}
                    to={`/gallery/nte/arc/${encodeURIComponent(arc.id || arc.name)}`}
                    className="group flex items-center gap-4 p-3.5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
                  >
                    <div className="relative h-14 w-14 shrink-0 rounded-xl bg-black/40 border border-white/10 p-1 overflow-hidden group-hover:scale-105 transition-transform">
                      <img
                        src={arcImg}
                        alt={arc.name}
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
                        {arc.rarityGrade || 'A'}급
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] text-yellow-400 font-black">
                          {arc.rarityGrade} 등급
                        </span>
                        {arc.type && (
                          <span className="text-[10px] text-gray-400 font-semibold">
                            · {arc.type}
                          </span>
                        )}
                      </div>
                      <h5 className="text-sm font-black text-white group-hover:text-brand-accent truncate transition-colors">
                        {arc.name}
                      </h5>
                      {arc.skill?.name && (
                        <p className="text-[11px] text-gray-400 truncate mt-0.5">
                          {arc.skill.name}
                        </p>
                      )}
                    </div>

                    <ChevronRight size={16} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Synergistic Party Members Overview */}
        {recommendedParties.length > 0 && (
          <div className="glass-card p-6 sm:p-8 rounded-[35px] border border-white/5 bg-black/20 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2.5">
                <Users size={18} style={{ color: theme.primary }} />
                <h4 className="text-sm font-black uppercase tracking-widest text-white">
                  추천 포메이션 ({recommendedParties[0]?.name || '핵심 파티'})
                </h4>
              </div>
              <span className="text-[11px] text-gray-400 font-semibold">
                포메이션 연계
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recommendedParties[0]?.members?.map((member, mIdx) => (
                <Link
                  key={mIdx}
                  to={`/gallery/nte/character/${encodeURIComponent(member.id || member.name)}`}
                  className="group flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-brand-primary/40 hover:bg-white/[0.06] transition-all"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black uppercase text-gray-400 block truncate">
                      {member.role || '팀원'}
                    </span>
                    <h5 className="text-xs font-black text-white group-hover:text-brand-accent truncate transition-colors">
                      {member.name}
                    </h5>
                  </div>
                  <ChevronRight size={14} className="text-gray-400 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NteEntityGraphSection;
