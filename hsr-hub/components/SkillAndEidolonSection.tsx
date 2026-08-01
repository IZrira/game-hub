import React, { useState, useMemo } from 'react';
import { SkillDetail } from '../../common-hub/types';
import { HsrCharacter } from '../types';
import { ShieldAlert, PlusCircle, MinusCircle, Sparkles, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface SkillAndEidolonSectionProps {
  char: any;
  gender: 'm' | 'f';
  setGender: React.Dispatch<React.SetStateAction<'m' | 'f'>>;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => (string | React.ReactElement)[];
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
  gameId?: string;
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
  '물리 속성 피해 증가': 'physical_dmg.webp',
  
  // 영문 모드 속성 보너스 (English Fallback)
  'CRIT DMG': 'crit_dmg.webp', 'CRIT Rate': 'crit_rate.webp',
  'Lightning DMG Boost': 'lightning_dmg.webp', 'Fire DMG Boost': 'fire_dmg.webp',
  'Ice DMG Boost': 'ice_dmg.webp', 'Wind DMG Boost': 'wind_dmg.webp', 'ATK Boost': 'atk.webp',
  'Quantum DMG Boost': 'quantum_dmg.webp', 'Imaginary DMG Boost': 'imaginary_dmg.webp', 'Physical DMG Boost': 'physical_dmg.webp'
};

const SKILL_CATEGORIES_HSR = [
  { id: 'basic_atk', label: '일반 공격' },
  { id: 'skill', label: '전투 스킬' },
  { id: 'ultimate', label: '필살기' },
  { id: 'talent', label: '특성' },
  { id: 'elation_skill', label: '환락 스킬' },
  { id: 'technique', label: '비술' },
  { id: 'assist_skill', label: '지원 스킬' }
];

export default function SkillAndEidolonSection({ 
  char, 
  gender, 
  setGender, 
  theme, 
  renderContent, 
  setTooltip,
  gameId = 'hsr'
}: SkillAndEidolonSectionProps) { 
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('basic_atk');
  const [activeServantCategory, setActiveServantCategory] = useState(() => {
    if (char.skills?.some(s => s.tag?.includes('기억 정령 스킬'))) return 'memo_skill';
    if (char.skills?.some(s => s.tag?.includes('기억 정령 특성'))) return 'memo_talent';
    return 'memo_skill';
  });
  const categories = SKILL_CATEGORIES_HSR;

  const CDN_BASE = gameId === 'nte' 
    ? `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images/skills/${safeEncodeURIComponent(char.name)}/`
    : `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/skills/${safeEncodeURIComponent(char.folderName || char.name)}/`;
  const STAT_ICON_BASE = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/stats/";

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string }[]> = {
      basic_atk: [], skill: [], ultimate: [], talent: [], technique: [], elation_skill: [], assist_skill: [],
      memo_info: [], memo_skill: [], memo_talent: [],
      intro: [], outro: []
    };
    const counters: Record<string, number> = { 
      basic_atk: 0, skill: 0, ultimate: 0, talent: 0, technique: 0, elation_skill: 0, assist_skill: 0,
      memo_info: 0, memo_skill: 0, memo_talent: 0,
      intro: 0, outro: 0
    };

    char.skills?.forEach((skill) => {
      const tag = skill.tag || "";
      let type = 'talent';
      
      if (tag.includes('기억 정령 스킬') || tag.toLowerCase().includes('memokeeper skill')) type = 'memo_skill';
      else if (tag.includes('기억 정령 특성') || tag.toLowerCase().includes('memokeeper talent')) type = 'memo_talent';
      else if (tag.includes('기억 정령') || tag.toLowerCase().includes('memokeeper')) type = 'memo_info';
      else if (tag.includes('일반 공격') || tag.toLowerCase().includes('basic atk')) type = 'basic_atk';
      else if (tag.includes('전투 스킬') || tag.includes('공명 스킬') || tag.toLowerCase().includes('skill')) type = 'skill';
      else if (tag.includes('필살기') || tag.toLowerCase().includes('ultimate')) type = 'ultimate';
      else if (tag.includes('비술') || tag.toLowerCase().includes('technique')) type = 'technique';
      else if (tag.includes('환락 스킬') || tag.toLowerCase().includes('elation')) type = 'elation_skill';
      else if (tag.includes('지원 스킬') || tag.toLowerCase().includes('assist skill')) type = 'assist_skill';
      else if (tag.includes('특성') || tag.toLowerCase().includes('talent')) type = 'talent';

      let filename;
      if (skill.icon) {
        filename = `${skill.icon}.webp`;
      } else {
        if (!skill.name.includes('(강화)') || counters[type] === 0) {
          counters[type]++;
        }
        if (tag.includes('기억 정령')) {
             if (type === 'memo_skill') filename = `memo_skill_${counters[type]}.webp`;
             else if (type === 'memo_talent') filename = `memo_talent_${counters[type]}.webp`;
             else if (type === 'memo_info') filename = `memo_info_${counters[type]}.webp`;
             else filename = `memo_${type.replace('memo_', '')}_${counters[type]}.webp`;
        } else if (type === 'elation_skill') {
             filename = `elation_skill_${counters[type]}.webp`;
        } else if (type === 'assist_skill') {
             filename = `assist_skill_${counters[type]}.webp`;
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
  const hasServant = groupedSkills.memo_info.length > 0 || groupedSkills.memo_skill.length > 0 || groupedSkills.memo_talent.length > 0;

  const simplifyValue = (label: string, value: string) => {
    if (!value || value === "0") return null;
    if (label === '약점 격파' || label === 'Weakness Break') {
      return value
        .replace(/Weakness Break/gi, '')
        .replace(/약점 격파/g, '')
        .replace(/\(Single\)/gi, t('단일', { keySeparator: false, nsSeparator: false }))
        .replace(/\(AoE\)/gi, `/${t('범위', { keySeparator: false, nsSeparator: false })}`)
        .replace(/\(Blast\)/gi, `/${t('확산', { keySeparator: false, nsSeparator: false })}`)
        .replace(/\(Bounce\)/gi, `/${t('바운스', { keySeparator: false, nsSeparator: false })}`)
        .replace(/공격/g, '')
        .trim();
    }
    if (label === '에너지 회복' || label === 'Energy Regeneration') {
      return value
        .replace(/Energy Regeneration/gi, '')
        .replace(/Energy Regen/gi, '')
        .replace(/에너지 회복/g, '')
        .replace(/pt/g, '')
        .replace(/회복/g, '')
        .trim() + ' pt';
    }
    return value;
  };

  return (
    <div className="space-y-16">
      {/* 05 스킬 정보 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>05</div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">{t('스킬 정보', { keySeparator: false, nsSeparator: false })}</h2>
        </div>
        
        <div className="flex flex-col gap-10">
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {categories.filter(c => !['memo_skill', 'memo_talent'].includes(c.id)).map((cat) => groupedSkills[cat.id]?.length > 0 && (
              <button 
                key={cat.id} 
                onClick={() => setActiveCategory(cat.id)} 
                className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 ${activeCategory === cat.id ? 'bg-white/10 border-white/20 shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.3)] scale-105' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
              >
                <div className="w-10 h-10 flex items-center justify-center relative z-10">
                  <img 
                    src={`${CDN_BASE}${groupedSkills[cat.id][0].filename}`} 
                    className={`w-full h-full object-contain transition-all duration-500 ${activeCategory === cat.id ? 'scale-125 brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'opacity-40 group-hover:opacity-70 group-hover:scale-110'}`} 
                    alt={cat.label} 
                    loading="lazy"
                    decoding="async"
                    onError={(e) => (e.currentTarget.style.opacity = '0.3')} 
                  />
                </div>
                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{t(cat.label, { keySeparator: false, nsSeparator: false })}</span>
              </button>
            ))}
          </div>

          <div className="space-y-8">
            {activeSkills.map(({ skill, filename }, idx) => (
              <div key={idx} className="group glass-card rounded-[40px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
                 <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-[0.03] grayscale brightness-200 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                   <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain rotate-12" alt="" loading="lazy" decoding="async" />
                 </div>
                 <div className="bg-[#0c0c0c]/80 rounded-[38px] p-8 md:p-10 relative z-10 overflow-hidden">
                   <div className="flex flex-col md:flex-row items-start gap-8">
                      <div className="relative shrink-0">
                        <div className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center p-5 relative z-10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                           <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain brightness-110" alt={skill.name} loading="lazy" decoding="async" />
                        </div>
                      </div>
                      <div className="space-y-6 flex-1 min-w-0">
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                               <h4 className="text-3xl font-black text-white leading-none tracking-tight">{t(skill.name, { keySeparator: false, nsSeparator: false })}</h4>
                               <div className="flex flex-wrap items-center gap-2 pt-1">
                                  {skill.tag && <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{skill.tag.split('|').map(part => t(part.trim(), { keySeparator: false, nsSeparator: false })).join(' | ')}</span>}
                                  {skill.spRecovery && skill.spRecovery !== '0' && (
                                     <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border ${skill.spRecovery.includes('+') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                       {skill.spRecovery.includes('+') ? <PlusCircle size={12}/> : <MinusCircle size={12}/>} SP {skill.spRecovery}
                                     </div>
                                  )}
                               </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                               {simplifyValue('에너지 회복', skill.energyRegen || '') && (
                                 <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-inner">
                                   <Zap size={14} className="text-yellow-400" />
                                   <span className="text-sm font-black text-yellow-400 tabular-nums">{simplifyValue('에너지 회복', skill.energyRegen || '')}</span>
                                 </div>
                               )}
                               {simplifyValue('약점 격파', skill.toughnessDMG || '') && (
                                 <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-inner">
                                   <ShieldAlert size={14} className="text-brand-accent" />
                                   <span className="text-sm font-black text-brand-accent">{simplifyValue('약점 격파', skill.toughnessDMG || '')}</span>
                                 </div>
                               )}
                            </div>
                         </div>
                         <div className="text-gray-300 text-[17px] leading-[1.7] font-medium whitespace-pre-line pl-6 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
                            {renderContent(t(skill.description, { keySeparator: false, nsSeparator: false }))}
                         </div>
                      </div>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 기억 정령 (Optional) */}
      {hasServant && (
        <section className="space-y-10">
          <div className="flex items-center gap-6 px-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>06</div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">{t('기억 정령', { keySeparator: false, nsSeparator: false })}</h2>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {groupedSkills.memo_info.map(({ skill, filename }, idx) => (
              <div key={`info-${idx}`} className="glass-card rounded-[40px] border border-white/10 bg-black shadow-2xl overflow-hidden flex justify-center p-8 bg-gradient-to-b from-white/[0.02] to-transparent">
                 <img src={`${CDN_BASE}${filename}`} className="w-auto h-auto max-h-[400px] object-contain drop-shadow-2xl" alt={skill.name} loading="lazy" decoding="async" />
              </div>
            ))}

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {[{ id: 'memo_skill', label: '기억 정령 스킬' }, { id: 'memo_talent', label: '기억 정령 특성' }].map((cat) => groupedSkills[cat.id]?.length > 0 && (
                <button 
                  key={cat.id} 
                  onClick={() => setActiveServantCategory(cat.id)} 
                  className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 ${activeServantCategory === cat.id ? 'bg-white/10 border-white/20 shadow-[0_0_25px_rgba(var(--theme-primary-rgb),0.3)] scale-105' : 'bg-white/[0.03] border-white/5 hover:bg-white/5'}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center relative z-10">
                    <img 
                      src={`${CDN_BASE}${groupedSkills[cat.id][0].filename}`} 
                      className={`w-full h-full object-contain transition-all duration-500 ${activeServantCategory === cat.id ? 'scale-125 brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'opacity-40 group-hover:opacity-70 group-hover:scale-110'}`} 
                      alt={cat.label} 
                      loading="lazy"
                      decoding="async"
                      onError={(e) => (e.currentTarget.style.opacity = '0.3')} 
                    />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeServantCategory === cat.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>{t(cat.label, { keySeparator: false, nsSeparator: false })}</span>
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {activeServantSkills.map(({ skill, filename }, idx) => (
                <div key={idx} className="group glass-card rounded-[40px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
                   <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 opacity-[0.03] grayscale brightness-200 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                     <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain rotate-12" alt="" loading="lazy" decoding="async" />
                   </div>
                   <div className="bg-[#0c0c0c]/80 rounded-[38px] p-8 md:p-10 relative z-10 overflow-hidden">
                     <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="relative shrink-0">
                          <div className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center p-5 relative z-10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                             <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain brightness-110" alt={skill.name} loading="lazy" decoding="async" />
                          </div>
                        </div>
                        <div className="space-y-6 flex-1 min-w-0">
                           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                 <h4 className="text-3xl font-black text-white leading-none tracking-tight">{t(skill.name, { keySeparator: false, nsSeparator: false })}</h4>
                                 <div className="flex flex-wrap items-center gap-2 pt-1">
                                    {skill.tag && <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{skill.tag.split('|').map(part => t(part.trim(), { keySeparator: false, nsSeparator: false })).join(' | ')}</span>}
                                    {skill.spRecovery && skill.spRecovery !== '0' && (
                                       <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border ${skill.spRecovery.includes('+') ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                                         {skill.spRecovery.includes('+') ? <PlusCircle size={12}/> : <MinusCircle size={12}/>} SP {skill.spRecovery}
                                       </div>
                                    )}
                                 </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {simplifyValue('에너지 회복', skill.energyRegen || '') && (
                                   <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-inner">
                                     <Zap size={14} className="text-yellow-400" />
                                     <span className="text-sm font-black text-yellow-400 tabular-nums">{simplifyValue('에너지 회복', skill.energyRegen || '')}</span>
                                   </div>
                                 )}
                                 {simplifyValue('약점 격파', skill.toughnessDMG || '') && (
                                   <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] rounded-xl border border-white/5 shadow-inner">
                                     <ShieldAlert size={14} className="text-brand-accent" />
                                     <span className="text-sm font-black text-brand-accent">{simplifyValue('약점 격파', skill.toughnessDMG || '')}</span>
                                   </div>
                                 )}
                              </div>
                           </div>
                           <div className="text-gray-300 text-[17px] leading-[1.7] font-medium whitespace-pre-line pl-6 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
                              {renderContent(t(skill.description, { keySeparator: false, nsSeparator: false }))}
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07 추가 능력 & 속성 보너스 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{hasServant ? '07' : '06'}</div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">{t('추가 능력 & 속성 보너스', { keySeparator: false, nsSeparator: false })}</h2>
        </div>
        
        <div className="flex flex-col gap-6">
          {(char.additionalAbilities || char.bonusAbilities || []).map((ability, idx) => (
            <div key={idx} className="group glass-card rounded-[40px] border border-white/5 p-1 bg-gradient-to-br from-white/[0.05] to-transparent shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-white/20">
               <div className="bg-[#0c0c0c]/80 rounded-[38px] p-8 md:p-10 relative z-10">
                 <div className="flex flex-col md:flex-row items-start gap-8">
                    <div className="relative shrink-0">
                      <div className="w-24 h-24 rounded-3xl border border-white/10 flex items-center justify-center p-5 relative z-10 group-hover:border-white/30 transition-all duration-500 group-hover:scale-110">
                         <img src={`${CDN_BASE}${ability.icon ? `${ability.icon}.webp` : `bonus_${idx + 1}.webp`}`} className="w-full h-full object-contain brightness-110" alt={ability.name} loading="lazy" decoding="async" onError={(e) => e.currentTarget.style.opacity = '0.3'} />
                      </div>
                    </div>

                    <div className="space-y-6 flex-1 min-w-0">
                       <h4 className="text-3xl font-black text-white leading-none tracking-tight">{t(ability.name, { keySeparator: false, nsSeparator: false })}</h4>
                       <div className="text-gray-300 text-[17px] leading-[1.7] font-medium whitespace-pre-line pl-6 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
                          {renderContent(t(ability.description || '', { keySeparator: false, nsSeparator: false }))}
                       </div>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {(char.attributeBonuses || char.statBonuses || []).map((stat, i) => (
            <StatBox 
              key={i}
              icon={<img src={`${STAT_ICON_BASE}${STAT_ICON_MAP[stat.type] || 'atk.webp'}`} className="w-full h-full object-contain" alt={stat.type} loading="lazy" decoding="async" onError={(e) => e.currentTarget.src = `${STAT_ICON_BASE}atk.webp`} />}
              label={t(stat.type, { keySeparator: false, nsSeparator: false })}
              value={`+${stat.value}`}
              color="text-brand-accent"
            />
          ))}
        </div>
      </section>

      {/* 08 성흔 / 공명 체인 */}
      <section className="space-y-10">
        <div className="flex items-center gap-6 px-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{hasServant ? '08' : '07'}</div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">{t('성흔', { keySeparator: false, nsSeparator: false })}</h2>
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
                    <div className="relative w-full h-full rounded-full border border-white/10 flex items-center justify-center p-3 group-hover:border-brand-primary/50 overflow-hidden transition-all duration-500">
                      <img src={`${CDN_BASE}${filename}`} className="w-full h-full object-contain scale-[1.2] group-hover:scale-[1.5] transition-transform duration-700" alt={eidolon.name} loading="lazy" decoding="async" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                    </div>
                  </div>
                  
                  <div className="text-center z-10 relative w-full px-2">
                    <span className="inline-block text-[10px] font-black text-brand-primary px-2.5 py-0.5 rounded-lg bg-brand-primary/10 border border-brand-primary/20 mb-1.5">{eidolon.rank || `E${String(idx + 1).padStart(2, '0')}`}</span>
                    <h5 className="text-lg font-black text-white leading-tight group-hover:text-brand-accent transition-colors whitespace-nowrap overflow-hidden text-ellipsis">{t(eidolon.name, { keySeparator: false, nsSeparator: false })}</h5>
                  </div>
                </div>
                
                <div className="p-6 md:p-8 flex items-center flex-1 bg-black/10">
                  <div className="text-base md:text-lg text-gray-300 leading-relaxed font-medium whitespace-pre-line">
                    {renderContent(t(eidolon.description, { keySeparator: false, nsSeparator: false }))}
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
            return <span key={i} className="text-lg md:text-xl font-black text-[#FFD600] tabular-nums">{part}</span>;
          }
          return part ? <span key={i} className="text-[11px] font-black text-gray-500 uppercase tracking-tighter">{part}</span> : null;
        })}
      </div>
    );
  }, [value]);

  return (
    <div className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/[0.08] group/stat transition-all">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-xl bg-black/40 border border-white/5 group-hover/stat:scale-110 transition-transform">{icon}</div>
        <span className={`text-[11px] font-black uppercase tracking-widest ${color}`}>{label}</span>
      </div>
      <div className="tabular-nums">{displayValue}</div>
    </div>
  );
};
