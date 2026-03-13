import React, { useState, useMemo } from 'react';
import { Character, SkillDetail } from '../types';
import { ShieldAlert, PlusCircle, MinusCircle, Sparkles, Zap } from 'lucide-react';

interface SkillAndEidolonSectionProps {
  char: Character;
  gender: 'm' | 'f';
  setGender: React.Dispatch<React.SetStateAction<'m' | 'f'>>;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => (string | React.ReactElement)[];
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
}

const STAT_ICON_MAP: Record<string, string> = {
  'HP': 'hp.webp', '공격력': 'atk.webp', '방어력': 'def.webp',
  '효과 저항': 'effect_res.webp', '치명타 확률': 'crit_rate.webp',
  '치명타 피해': 'crit_dmg.webp', '효과 적중': 'effect_hit_rate.webp', '효과 명중': 'effect_hit_rate.webp',
  '격파 특수 효과': 'break_effect.webp', '격파 특수효과': 'break_effect.webp', '속도': 'spd.webp',
  '환락 수치': 'elation.webp',
  '번개 속성 피해 증가': 'lightning_dmg.webp', '화염 속성 피해 증가': 'fire_dmg.webp',
  '얼음 속성 피해 증가': 'ice_dmg.webp', '바람 속성 피해 증가': 'wind_dmg.webp',
  '양자 속성 피해 증가': 'quantum_dmg.webp', '허수 속성 피해 증가': 'imaginary_dmg.webp',
  '물리 속성 피해 증가': 'physical_dmg.webp'
};

const SKILL_CATEGORIES_HSR = [
  { id: 'basic_atk', label: '일반 공격' },
  { id: 'skill', label: '전투 스킬' },
  { id: 'ultimate', label: '필살기' },
  { id: 'talent', label: '특성' },
  { id: 'elation_skill', label: '환락 스킬' },
  { id: 'technique', label: '비술' }
];

const SkillAndEidolonSection: React.FC<SkillAndEidolonSectionProps> = ({ char, theme, renderContent, gender, setGender, setTooltip }) => {
  const [activeCategory, setActiveCategory] = useState('basic_atk');
  const [activeServantCategory, setActiveServantCategory] = useState(() => {
    if (char.skills?.some(s => s.tag?.includes('기억 정령 스킬'))) return 'servant_skill';
    if (char.skills?.some(s => s.tag?.includes('기억 정령 특성'))) return 'servant_talent';
    return 'servant_skill';
  });
  const categories = SKILL_CATEGORIES_HSR;

  const CDN_BASE = `https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/skills/${encodeURIComponent(char.folderName)}/`;
  const STAT_ICON_BASE = "https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/common/stats/";

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string }[]> = {
      basic_atk: [], skill: [], ultimate: [], talent: [], technique: [], elation_skill: [],
      servant_info: [], servant_skill: [], servant_talent: []
    };
    const counters: Record<string, number> = { 
      basic_atk: 0, skill: 0, ultimate: 0, talent: 0, technique: 0, elation_skill: 0,
      servant_info: 0, servant_skill: 0, servant_talent: 0
    };

    char.skills?.forEach((skill) => {
      const tag = skill.tag || "";
      let type = 'talent';
      
      if (tag.includes('기억 정령 스킬')) type = 'servant_skill';
      else if (tag.includes('기억 정령 특성')) type = 'servant_talent';
      else if (tag.includes('기억 정령')) type = 'servant_info';
      else if (tag.includes('일반 공격')) type = 'basic_atk';
      else if (tag.includes('전투 스킬')) type = 'skill';
      else if (tag.includes('필살기')) type = 'ultimate';
      else if (tag.includes('비술')) type = 'technique';
      else if (tag.includes('환락 스킬')) type = 'elation_skill';
      else if (tag.includes('특성')) type = 'talent';

      let filename;
      if (skill.icon) {
        filename = `${skill.icon}.webp`;
      } else {
        if (!skill.name.includes('(강화)') || counters[type] === 0) {
          counters[type]++;
        }
        // Special handling for 'memo' mapping
        if (tag.includes('기억 정령')) {
             filename = `memo_${type.replace('servant_', '')}_${counters[type]}.webp`;
             // Fallback to standard naming if needed, but user asked for 'memo' mapping
             // Actually, looking at the user request: "기억 졍령 매핑 memo"
             // And the previous request: "매핑은 memo_skill_2_1.webp으로 하며..."
             // It seems they want the default filenames for Memory Spirit skills to start with 'memo_'
             
             // Let's adjust the default filename generation logic for these types
             if (type === 'servant_skill') filename = `memo_skill_${counters[type]}.webp`;
             else if (type === 'servant_talent') filename = `memo_talent_${counters[type]}.webp`;
             else if (type === 'servant_info') filename = `memo_info_${counters[type]}.webp`;
        } else if (type === 'elation_skill') {
             filename = `elation_skill_${counters[type]}.webp`;
        } else {
             filename = `${type}_${counters[type]}.webp`;
        }
      }
      
      groups[type].push({ skill, filename });
    });
    return groups;
  }, [char.skills, char.folderName]);

  const activeSkills = groupedSkills[activeCategory] || [];
  const activeServantSkills = groupedSkills[activeServantCategory] || [];
  const hasServant = groupedSkills.servant_info.length > 0 || groupedSkills.servant_skill.length > 0 || groupedSkills.servant_talent.length > 0;

  const simplifyValue = (label: string, value: string) => {
    if (!value || value === "0") return null;
    if (label === '약점 격파') {
      return value
        .replace(/약점 격파/g, '')
        .replace(/공격/g, '')
        .replace(/단일/g, '단일')
        .replace(/확산/g, '/확산')
        .replace(/범위/g, '/범위')
        .trim();
    }
    if (label === '에너지 회복') {
      return value
        .replace(/에너지 회복/g, '')
        .replace(/pt/g, '')
        .replace(/회복/g, '')
        .trim() + ' pt';
    }
    return value;
  };

  return (
    <div className="space-y-16">
      {/* 04 스킬 정보 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>04</div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">스킬 정보</h2>
        </div>
        
        <div className="flex flex-col gap-8">
          {/* Main Skills Tabs */}
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {categories.filter(c => !['servant_skill', 'servant_talent'].includes(c.id)).map((cat) => groupedSkills[cat.id]?.length > 0 && (
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
                <span className={`text-xs font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-brand-accent' : 'text-gray-600'}`}>{cat.label}</span>
              </button>
            ))}
          </div>
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
                        <h4 className="text-2xl font-black text-white leading-none">{skill.name}</h4>
                        <div className="flex flex-wrap items-center gap-2">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 rounded">{skill.tag}</span>
                           {skill.spRecovery && skill.spRecovery !== '0' && (
                              <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-black border ${skill.spRecovery.includes('+') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                {skill.spRecovery.includes('+') ? <PlusCircle size={12}/> : <MinusCircle size={12}/>} SP {skill.spRecovery}
                              </div>
                           )}
                        </div>
                     </div>
                     
                     <div className="text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line pl-4 border-l-2 border-white/10">
                        {renderContent(skill.description)}
                     </div>

                     <div className="flex flex-wrap gap-3 pt-2">
                        {simplifyValue('에너지 회복', skill.energyRegen || '') && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
                            <Zap size={14} className="text-yellow-400" />
                            <span className="text-sm font-bold text-yellow-400">{simplifyValue('에너지 회복', skill.energyRegen || '')}</span>
                          </div>
                        )}
                        {simplifyValue('약점 격파', skill.toughnessDMG || '') && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
                            <ShieldAlert size={14} className="text-brand-accent" />
                            <span className="text-sm font-bold text-brand-accent">{simplifyValue('약점 격파', skill.toughnessDMG || '')}</span>
                          </div>
                        )}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 기억 정령 (Optional) */}
      {hasServant && (
        <section className="space-y-10">
          <div className="flex items-center gap-6 px-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>05</div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">기억 정령</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Servant Info */}
            {groupedSkills.servant_info.map(({ skill, filename }, idx) => (
              <div key={`info-${idx}`} className="glass-card rounded-[30px] border border-white/10 bg-black shadow-2xl overflow-hidden flex justify-center">
                 <img src={`${CDN_BASE}${filename}`} className="w-auto h-auto max-h-[300px] object-contain" alt={skill.name} />
              </div>
            ))}

            {/* Servant Skills Tabs */}
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {[{ id: 'servant_skill', label: '기억 정령 스킬' }, { id: 'servant_talent', label: '기억 정령 특성' }].map((cat) => groupedSkills[cat.id]?.length > 0 && (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveServantCategory(cat.id)} 
                  className={`group flex flex-col items-center px-10 py-6 rounded-[35px] border transition-all duration-500 ${activeServantCategory === cat.id ? 'bg-white/10 border-brand-primary/60 shadow-2xl scale-105' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-4 overflow-hidden">
                    <img 
                      src={`${CDN_BASE}${groupedSkills[cat.id][0].filename}`} 
                      className={`w-14 h-14 object-contain transition-transform duration-700 ${activeServantCategory === cat.id ? 'scale-150 brightness-110' : 'group-hover:scale-125'}`} 
                      alt={cat.label} 
                      onError={(e) => (e.currentTarget.style.opacity = '0.3')} 
                    />
                  </div>
                  <span className={`text-xs font-black uppercase tracking-widest ${activeServantCategory === cat.id ? 'text-brand-accent' : 'text-gray-600'}`}>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Servant Skill Detail */}
            {activeServantSkills.map(({ skill, filename }, idx) => (
              <div key={idx} className="glass-card rounded-[40px] border border-white/10 p-8 bg-black/40 shadow-xl relative overflow-hidden">
                 <div className="flex flex-col md:flex-row items-start gap-6">
                    <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4">
                       <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain" alt={skill.name} />
                    </div>
                    <div className="space-y-4 flex-1 min-w-0">
                       <div className="space-y-2">
                          <h4 className="text-2xl font-black text-white leading-none">{skill.name}</h4>
                          <div className="flex flex-wrap items-center gap-2">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider border border-white/10 px-2 py-1 rounded">{skill.tag}</span>
                             {skill.spRecovery && skill.spRecovery !== '0' && (
                                <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-black border ${skill.spRecovery.includes('+') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                  {skill.spRecovery.includes('+') ? <PlusCircle size={12}/> : <MinusCircle size={12}/>} SP {skill.spRecovery}
                                </div>
                             )}
                          </div>
                       </div>
                       
                       <div className="text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line pl-4 border-l-2 border-white/10">
                          {renderContent(skill.description)}
                       </div>

                       <div className="flex flex-wrap gap-3 pt-2">
                          {simplifyValue('에너지 회복', skill.energyRegen || '') && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
                              <Zap size={14} className="text-yellow-400" />
                              <span className="text-sm font-bold text-yellow-400">{simplifyValue('에너지 회복', skill.energyRegen || '')}</span>
                            </div>
                          )}
                          {simplifyValue('약점 격파', skill.toughnessDMG || '') && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 rounded-lg border border-white/5">
                              <ShieldAlert size={14} className="text-brand-accent" />
                              <span className="text-sm font-bold text-brand-accent">{simplifyValue('약점 격파', skill.toughnessDMG || '')}</span>
                            </div>
                          )}
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 06 추가 능력 & 속성 보너스 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{hasServant ? '06' : '05'}</div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">추가 능력 & 속성 보너스</h2>
        </div>
        
        <div className="flex flex-col gap-6">
          {(char.additionalAbilities || char.bonusAbilities || []).map((ability, idx) => (
            <div key={idx} className="glass-card rounded-[40px] border border-white/10 p-8 bg-black/40 shadow-xl relative overflow-hidden">
               <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-20 h-20 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-4">
                     <img src={`${CDN_BASE}${ability.icon ? `${ability.icon}.webp` : `bonus_${idx + 1}.webp`}`} className="w-full h-full object-contain" alt={ability.name} onError={(e) => e.currentTarget.style.opacity = '0.3'} />
                  </div>
                  <div className="space-y-4 flex-1 min-w-0">
                     <div className="space-y-2">
                        <h4 className="text-2xl font-black text-white leading-none">{ability.name}</h4>
                     </div>
                     
                     <div className="text-gray-300 text-lg leading-relaxed font-medium whitespace-pre-line pl-4 border-l-2 border-white/10">
                        {renderContent(ability.description || '')}
                     </div>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {(char.attributeBonuses || char.statBonuses || []).map((stat, i) => (
            <div key={i} className="group glass-card rounded-[35px] border border-white/10 p-6 flex flex-col items-center gap-4 hover:border-brand-primary/40 transition-all bg-black/40 shadow-lg">
              <div className="w-14 h-14 rounded-[20px] bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                <img src={`${STAT_ICON_BASE}${STAT_ICON_MAP[stat.type] || 'atk.webp'}`} className="w-full h-full object-contain" alt={stat.type} onError={(e) => e.currentTarget.src = `${STAT_ICON_BASE}atk.webp`} />
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl font-black text-white tabular-nums">+{stat.value}</div>
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 성흔 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{hasServant ? '07' : '06'}</div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">성흔</h2>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {char.eidolons?.map((eidolon: any, idx) => {
            const iconKey = char.isTrailblazer 
              ? ((gender === 'f' ? eidolon.icon_f : eidolon.icon_m) || eidolon.icon)
              : eidolon.icon;
            const filename = iconKey ? `${iconKey}.webp` : `eidolon_${idx + 1}.webp`;
            
            return (
              <div key={idx} className="group flex flex-col md:flex-row glass-card rounded-[40px] border border-white/5 hover:bg-white/[0.04] shadow-xl overflow-hidden transition-all duration-300">
                <div className="p-6 md:w-[360px] shrink-0 flex flex-col items-center justify-center gap-4 relative overflow-hidden border-b md:border-b-0 md:border-r border-white/5 bg-black/20">
                  <span className="absolute top-0 right-0 text-[100px] font-black text-white/[0.02] leading-none -mr-4 -mt-4 select-none">{String(idx + 1).padStart(2, '0')}</span>
                  
                  <div className="relative w-24 h-24 z-10">
                    <div className="absolute inset-0 rounded-full blur-[30px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ backgroundColor: theme.primary }} />
                    <div className="relative w-full h-full rounded-full bg-black/60 border border-white/10 flex items-center justify-center p-3 shadow-lg group-hover:border-brand-primary/50 overflow-hidden transition-colors duration-300">
                      <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain scale-[1.2] group-hover:scale-[1.3] transition-transform duration-700" alt={eidolon.name} onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                    </div>
                  </div>
                  
                  <div className="text-center z-10 relative w-full px-2">
                    <span className="inline-block text-[10px] font-black text-brand-primary px-2.5 py-0.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 mb-1.5">{eidolon.rank || `E${String(idx + 1).padStart(2, '0')}`}</span>
                    <h5 className="text-lg font-black text-white leading-tight group-hover:text-brand-accent transition-colors whitespace-nowrap overflow-hidden text-ellipsis">{eidolon.name}</h5>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex items-center flex-1 bg-black/10">
                  <div className="text-base md:text-lg text-gray-300 leading-relaxed font-medium whitespace-pre-line">
                    {renderContent(eidolon.description)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const StatBox: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => {
  const displayValue = useMemo(() => {
    if (!value) return null;
    const parts = value.split(/(\d+(?:\.\d+)?%?)/g);
    return (
      <div className="flex items-center justify-end gap-1.5">
        {parts.map((part, i) => {
          if (/^\d+(?:\.\d+)?%?$/.test(part)) {
            return <span key={i} className="text-xl md:text-2xl font-black text-[#FFD600] tabular-nums">{part}</span>;
          }
          return part ? <span key={i} className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">{part}</span> : null;
        })}
      </div>
    );
  }, [value]);

  return (
    <div className="w-full flex items-center justify-between gap-4 px-5 py-4 bg-white/5 rounded-[22px] border border-white/10 hover:bg-white/[0.08] group/stat transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-black/40 border border-white/5 group-hover/stat:scale-110 transition-transform">{icon}</div>
        <span className={`text-[13px] font-black uppercase tracking-widest ${color}`}>{label}</span>
      </div>
      <div className="tabular-nums">{displayValue}</div>
    </div>
  );
};

export default SkillAndEidolonSection;