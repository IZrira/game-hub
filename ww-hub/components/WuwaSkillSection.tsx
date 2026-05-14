import React, { useState, useMemo } from 'react';
import { SkillDetail } from '../../common-hub/types';
import { WuwaCharacter } from '../types';
import { Shield, Sparkles, Zap, Sword, Activity, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface WuwaSkillSectionProps {
  char: WuwaCharacter;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => (string | React.ReactElement)[];
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
  concertDissipation?: { name: string, description: string };
}

const PlusCircle: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
);

const SKILL_CATEGORIES_WW = [
  { id: 'basic_atk', label: '기본 공격', icon: <Sword size={20} /> },
  { id: 'skill', label: '공명 스킬', icon: <Zap size={20} /> },
  { id: 'talent', label: '공명 회로', icon: <Activity size={20} /> },
  { id: 'bonus', label: '고유 스킬', icon: <PlusCircle size={20} /> },
  { id: 'ultimate', label: '공명 해방', icon: <Flame size={20} /> },
  { id: 'intro', label: '변주 스킬', icon: <Sparkles size={20} /> },
  { id: 'outro', label: '반주 스킬', icon: <Sparkles size={20} /> },
  { id: 'dissipation', label: '조화도 파괴', icon: <Shield size={20} /> }
];

const WuwaSkillSection: React.FC<WuwaSkillSectionProps> = ({ char, theme, renderContent, setTooltip, concertDissipation }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('basic_atk');
  
  const ICON_BASE = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(char.folderName || '')}/`;

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string, label?: string }[]> = {
      basic_atk: [], skill: [], ultimate: [], talent: [], intro: [], outro: [], bonus: [], dissipation: []
    };
    
    // 1. Basic Skills
    char.skills?.forEach((skill) => {
      const tag = skill.tag || "";
      let type = 'talent';
      
      if (tag.includes('기본 공격') || tag.includes('일반 공격') || tag.toLowerCase().includes('basic atk')) type = 'basic_atk';
      else if (tag.includes('공명 스킬') || tag.includes('공명 어빌리티') || tag.toLowerCase().includes('skill')) type = 'skill';
      else if (tag.includes('공명 해방') || tag.toLowerCase().includes('ultimate')) type = 'ultimate';
      else if (tag.includes('공명 회로') || tag.toLowerCase().includes('talent')) type = 'talent';
      else if (tag.includes('변주 스킬') || tag.toLowerCase().includes('intro')) type = 'intro';
      else if (tag.includes('반주 스킬') || tag.toLowerCase().includes('outro')) type = 'outro';

      const catLabel = SKILL_CATEGORIES_WW.find(c => c.id === type)?.label || '공명 회로';
      const filename = type === 'basic_atk' ? '기본 공격.webp' : `${catLabel}.webp`;
      groups[type].push({ skill, filename });
    });

    // 2. Additional Abilities (Inherent Skills)
    char.additionalAbilities?.forEach((ability, idx) => {
      const label = `고유 스킬${idx + 1}`;
      groups['bonus'].push({
        skill: { name: ability.name, description: ability.description, tag: label },
        filename: `${label}.webp`
      });
    });

    // 3. Concert Dissipation
    if (concertDissipation) {
      groups['dissipation'].push({
        skill: { name: concertDissipation.name, description: concertDissipation.description, tag: '조화도 파괴' },
        filename: `조화도 파괴.webp`
      });
    }

    return groups;
  }, [char.skills, char.additionalAbilities, concertDissipation, t]);

  const activeSkills = groupedSkills[activeCategory] || [];

  return (
    <div className="space-y-16">
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>06</div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">{t('스킬 정보')}</h2>
        </div>
        
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {SKILL_CATEGORIES_WW.map((cat) => groupedSkills[cat.id]?.length > 0 && (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)} 
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 ${activeCategory === cat.id ? 'bg-white/10 border-white/20 shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.3)] scale-105' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
              >
                <div className="w-10 h-10 flex items-center justify-center relative z-10">
                  <img 
                    src={`${ICON_BASE}${safeEncodeURIComponent(cat.id === 'basic_atk' ? '기본 공격' : (cat.id === 'bonus' ? '고유 스킬1' : cat.label))}.webp`} 
                    className={`w-full h-full object-contain transition-all duration-500 ${activeCategory === cat.id ? 'scale-125 brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'opacity-40 group-hover:opacity-70 group-hover:scale-110'}`} 
                    alt={t(cat.label)} 
                    onError={(e) => (e.currentTarget.style.opacity = '0.1')} 
                  />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{t(cat.label)}</span>
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {activeSkills.map(({ skill, filename }: any, idx) => (
              <div key={idx} className="group glass-card rounded-[40px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
                 <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-[0.03] grayscale brightness-200 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                   <img src={`${ICON_BASE}${safeEncodeURIComponent(filename.replace('.webp', ''))}.webp`} className="w-full h-full object-contain rotate-12" alt="" loading="lazy" decoding="async" />
                 </div>
                 <div className="bg-[#0c0c0c]/80 rounded-[38px] p-8 md:p-10 relative z-10 overflow-hidden">
                   <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="relative shrink-0">
                         <div className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center p-5 relative z-10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                            <img 
                              src={`${ICON_BASE}${safeEncodeURIComponent(filename.replace('.webp', ''))}.webp`} 
                              className="w-full h-full object-contain" 
                              alt={t(skill.name)} 
                              onError={(e) => (e.currentTarget.style.opacity = '0.3')}
                            />
                         </div>
                      </div>
                      <div className="space-y-6 flex-1 min-w-0">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                               <h4 className="text-3xl font-black text-white leading-none tracking-tight">{t(skill.name)}</h4>
                               <div className="flex flex-wrap items-center gap-2 pt-1">
                                  {skill.tag && <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/5 px-2.5 py-1 rounded-lg border border-brand-primary/20">{skill.tag.split('|').map(part => t(part.trim())).join(' | ')}</span>}
                               </div>
                            </div>
                         </div>
                         <div className="text-gray-300 text-[17px] leading-[1.7] font-medium whitespace-pre-line pl-6 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
                            {renderContent(t(skill.description))}
                         </div>
                      </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default WuwaSkillSection;
