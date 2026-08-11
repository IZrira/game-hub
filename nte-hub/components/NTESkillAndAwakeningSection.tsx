import React, { useState, useMemo } from 'react';
import { SkillDetail } from '../../common-hub/types';
import { ShieldAlert, PlusCircle, MinusCircle, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface NTESkillAndAwakeningSectionProps {
  char: any;
  gender: 'm' | 'f';
  setGender: React.Dispatch<React.SetStateAction<'m' | 'f'>>;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => (string | React.ReactElement)[];
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
}

const SKILL_CATEGORIES_NTE = [
  { id: '도시 스킬', label: '도시 스킬' },
  { id: '기본 공격', label: '일반 공격' },
  { id: '바이레일 스킬', label: '바이레일 스킬' },
  { id: '울티메이트', label: '울티메이트' },
  { id: '서포트 스킬', label: '서포트 스킬' },
  { id: '패시브 스킬1', label: '패시브 스킬1' },
  { id: '패시브 스킬2', label: '패시브 스킬2' },
  { id: '특성', label: '특성' }
];

export default function NTESkillAndAwakeningSection({ 
  char, 
  gender, 
  setGender, 
  theme, 
  renderContent, 
  setTooltip
}: NTESkillAndAwakeningSectionProps) { 
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('도시 스킬');

  const CDN_BASE = `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte%20images/skills/${safeEncodeURIComponent(char.folderName || char.name)}/`;

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string }[]> = {
      '도시 스킬': [], '기본 공격': [], '바이레일 스킬': [], '울티메이트': [], '서포트 스킬': [], '패시브 스킬1': [], '패시브 스킬2': [], '특성': [], '공명': []
    };

    char.skills?.forEach((skill: any) => {
      const type = skill.type || '패시브 스킬1';
      let filename = `${safeEncodeURIComponent(skill.icon || type)}.webp`;
      if (groups[type]) {
        groups[type].push({ skill, filename });
      }
    });
    return groups;
  }, [char.skills, char.name]);

  const activeSkills = groupedSkills[activeCategory] || [];

  return (
    <div className="space-y-16">
        
        {/* 스킬 섹션 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${theme.shadow}` }}>
              <Zap size={20} style={{ color: theme.primary }} />
            </div>
            <h2 className="text-2xl font-black text-white/90 italic tracking-tight">{t("스킬 정보")}</h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            {SKILL_CATEGORIES_NTE.map(cat => {
              if (groupedSkills[cat.id]?.length === 0) return null;
              const isActive = activeCategory === cat.id;
              const categorySkills = groupedSkills[cat.id];
              const iconFilename = categorySkills && categorySkills.length > 0
                ? categorySkills[0].filename
                : `${safeEncodeURIComponent(cat.label)}.webp`;
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 ${
                    isActive 
                      ? 'bg-white/10 border-white/20 scale-105' 
                      : 'bg-white/[0.03] border-white/5 hover:bg-white/5'
                  }`}
                  style={isActive ? { boxShadow: `0 0 25px ${theme.shadow}` } : {}}
                >
                  <div className="w-10 h-10 flex items-center justify-center relative z-10">
                    <img 
                      src={`${CDN_BASE}${iconFilename}`} 
                      className={`w-full h-full object-contain transition-all duration-500 ${isActive ? 'scale-125 brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'opacity-40 group-hover:opacity-70 group-hover:scale-110'}`} 
                      alt={cat.label} 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        if (e.currentTarget.src.endsWith('.webp')) {
                          e.currentTarget.src = e.currentTarget.src.replace('.webp', '.png');
                        } else {
                          e.currentTarget.style.display = 'none';
                        }
                      }} 
                    />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {t(cat.label)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4">
            {activeSkills.map(({ skill, filename }, idx) => (
              <div key={idx} className="group glass-card rounded-[40px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
                 <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-[0.03] grayscale brightness-200 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                   <img 
                     src={`${CDN_BASE}${filename}`} 
                     className="w-full h-full object-contain rotate-12" 
                     alt="" 
                     loading="lazy" 
                     decoding="async"
                     onError={(e) => {
                       if (e.currentTarget.src.endsWith('.webp')) {
                         e.currentTarget.src = e.currentTarget.src.replace('.webp', '.png');
                       }
                     }}
                   />
                 </div>
                 <div className="bg-[#0c0c0c]/80 rounded-[38px] p-8 md:p-10 relative z-10 overflow-hidden">
                   <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="relative shrink-0">
                        <div className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center p-5 relative z-10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                           <img 
                             src={`${CDN_BASE}${filename}`} 
                             className="w-full h-full object-contain brightness-110" 
                             alt={skill.name} 
                             loading="lazy" 
                             decoding="async" 
                             onError={(e) => { 
                               if (e.currentTarget.src.endsWith('.webp')) {
                                 e.currentTarget.src = e.currentTarget.src.replace('.webp', '.png');
                               } else {
                                 e.currentTarget.style.display = 'none'; 
                               }
                             }}
                           />
                        </div>
                      </div>
                      <div className="space-y-6 flex-1 min-w-0">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-2">
                               <h4 className="text-3xl font-black text-white leading-none tracking-tight">{skill.name}</h4>
                               <div className="flex flex-wrap items-center gap-2 pt-1">
                                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{t(skill.tag || skill.type || '')}</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-base md:text-lg text-gray-300 leading-relaxed break-keep font-medium bg-black/20 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap">
                            {renderContent(skill.description)}
                         </div>
                      </div>
                   </div>
                 </div>
              </div>
            ))}
            {activeSkills.length === 0 && (
              <div className="p-8 text-center text-gray-500 font-medium bg-white/[0.01] rounded-2xl border border-white/5">
                {t("해당 분류의 스킬 정보가 없습니다.")}
              </div>
            )}
          </div>
        </section>

        {/* 각성 섹션 */}
      {char.eidolons && char.eidolons.length > 0 && (
        <section className="pt-8 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${theme.shadow}` }}>
              <Sparkles size={20} style={{ color: theme.primary }} />
            </div>
            <h2 className="text-2xl font-black text-white/90 italic tracking-tight">{t("각성")}</h2>
          </div>
            
            <div className="grid gap-4">
              {char.eidolons.map((awakening: any, idx: number) => {
                const desc = awakening.description;
                return (
                  <div key={idx} className="group flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/20 relative overflow-hidden"
                           style={{ background: `linear-gradient(135deg, ${theme.primary}20, transparent)`, borderColor: `${theme.primary}50` }}>
                        <span className="text-xl font-black italic text-white z-10">{awakening.rank}</span>
                        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${CDN_BASE}${safeEncodeURIComponent(awakening.iconKey)}.webp)` }} />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-white/90 mb-2">{awakening.name}</h3>
                      <div className="text-sm font-medium text-gray-400 leading-relaxed break-keep">
                        {renderContent(desc)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 공명 섹션 */}
        {groupedSkills['공명']?.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 mt-12">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${theme.shadow}` }}>
                <Zap size={20} style={{ color: theme.primary }} />
              </div>
              <h2 className="text-2xl font-black text-white/90 italic tracking-tight">{t("공명")}</h2>
            </div>
            
            <div className="grid gap-4">
              {groupedSkills['공명'].map(({ skill }, idx) => (
                <div key={idx} className="group glass-card rounded-[30px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.02] to-transparent shadow-xl relative overflow-hidden transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]">
                   <div className="bg-[#0c0c0c]/60 rounded-[28px] p-6 md:p-8 relative z-10 overflow-hidden">
                     <div className="space-y-5">
                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
                          <div className="space-y-1">
                             <h4 className="text-2xl font-black text-white leading-none tracking-tight">{skill.name}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-3 py-1.5 rounded-lg border border-brand-primary/20">{t('공명')} {idx + 1}</span>
                          </div>
                       </div>
                       <div className="text-base md:text-lg text-gray-300 leading-relaxed break-keep font-medium whitespace-pre-wrap">
                          {renderContent(skill.description)}
                       </div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}
    </div>
  );
}
