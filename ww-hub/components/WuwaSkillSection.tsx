import React, { useState, useMemo } from 'react';
import { SkillDetail } from '../../common-hub/types';
import { WuwaCharacter } from '../types';
import { ShieldAlert, PlusCircle, MinusCircle, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface WuwaSkillSectionProps {
  char: WuwaCharacter;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => (string | React.ReactElement)[];
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
}

const SKILL_CATEGORIES_WW = [
  { id: 'basic_atk', label: '일반 공격' },
  { id: 'skill', label: '공명 스킬' },
  { id: 'ultimate', label: '공명 해방' },
  { id: 'talent', label: '공명 회로' },
  { id: 'intro', label: '변주 스킬' },
  { id: 'outro', label: '반주 스킬' }
];

const WuwaSkillSection: React.FC<WuwaSkillSectionProps> = ({ char, theme, renderContent, setTooltip }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('basic_atk');
  
  const CDN_BASE = `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images/characters/${encodeURIComponent(char.folderName)}/skills/`;

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string }[]> = {
      basic_atk: [], skill: [], ultimate: [], talent: [], intro: [], outro: []
    };
    
    char.skills?.forEach((skill) => {
      const tag = skill.tag || "";
      let type = 'talent';
      
      if (tag.includes('일반 공격') || tag.toLowerCase().includes('basic atk')) type = 'basic_atk';
      else if (tag.includes('공명 스킬') || tag.toLowerCase().includes('skill')) type = 'skill';
      else if (tag.includes('공명 해방') || tag.toLowerCase().includes('ultimate')) type = 'ultimate';
      else if (tag.includes('공명 회로') || tag.toLowerCase().includes('talent')) type = 'talent';
      else if (tag.includes('변주 스킬') || tag.toLowerCase().includes('intro')) type = 'intro';
      else if (tag.includes('반주 스킬') || tag.toLowerCase().includes('outro')) type = 'outro';

      const filename = skill.icon ? `${skill.icon}.webp` : `${type}.webp`;
      groups[type].push({ skill, filename });
    });
    return groups;
  }, [char.skills]);

  const activeSkills = groupedSkills[activeCategory] || [];

  return (
    <div className="space-y-16">
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>04</div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">{t('스킬 정보')}</h2>
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center md:justify-start">
          {SKILL_CATEGORIES_WW.map((cat) => groupedSkills[cat.id]?.length > 0 && (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)} 
              className={`group flex flex-col items-center px-10 py-6 rounded-[35px] border transition-all duration-500 ${activeCategory === cat.id ? 'bg-white/10 border-brand-primary/60 shadow-2xl scale-105' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={`${CDN_BASE}${groupedSkills[cat.id][0].filename}`} 
                  className={`w-14 h-14 object-contain transition-transform duration-700 ${activeCategory === cat.id ? 'scale-150 brightness-110' : 'group-hover:scale-125'}`} 
                  alt={cat.label} 
                  onError={(e) => (e.currentTarget.style.opacity = '0.3')} 
                />
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-brand-accent' : 'text-gray-600'}`}>{t(cat.label)}</span>
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {activeSkills.map(({ skill, filename }, idx) => (
            <div key={idx} className="glass-card rounded-[40px] border border-white/10 p-8 bg-black/40 shadow-xl relative overflow-hidden">
               <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4">
                     <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain" alt={skill.name} />
                  </div>
                  <div className="space-y-4 flex-1 min-w-0">
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white leading-none">{t(skill.name)}</h4>
                        <div className="flex flex-wrap items-center gap-2">
                           {skill.tag && <span className="text-xs font-bold text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 rounded">{skill.tag.split('|').map(part => t(part.trim())).join(' | ')}</span>}
                        </div>
                     </div>
                     <div className="text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line pl-4 border-l-2 border-white/10">
                        {renderContent(t(skill.description))}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default WuwaSkillSection;
