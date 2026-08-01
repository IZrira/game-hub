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
  { id: '기본 공격', label: '일반 공격' },
  { id: '바이레일 스킬', label: '바이레일 스킬' },
  { id: '울티메이트', label: '울티메이트' },
  { id: '서포트 스킬', label: '서포트 스킬' },
  { id: '도시 스킬', label: '도시 스킬' },
  { id: '패시브 스킬', label: '패시브 스킬' }
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
  const [activeCategory, setActiveCategory] = useState('기본 공격');

  const CDN_BASE = `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images/skills/${safeEncodeURIComponent(char.name)}/`;

  const groupedSkills = useMemo(() => {
    const groups: Record<string, { skill: SkillDetail, filename: string }[]> = {
      '기본 공격': [], '바이레일 스킬': [], '울티메이트': [], '서포트 스킬': [], '도시 스킬': [], '패시브 스킬': []
    };

    char.skills?.forEach((skill: any) => {
      const type = skill.type || '패시브 스킬';
      let filename = `${skill.icon || type}.webp`;
      if (groups[type]) {
        groups[type].push({ skill, filename });
      }
    });
    return groups;
  }, [char.skills, char.name]);

  const activeSkills = groupedSkills[activeCategory] || [];

  return (
    <div className="w-full h-full p-4 lg:p-12 lg:pl-16 overflow-y-auto custom-scrollbar relative">
      <div className="max-w-4xl space-y-12 pb-24">
        
        {/* 스킬 섹션 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${theme.shadow}` }}>
              <Zap size={20} style={{ color: theme.primary }} />
            </div>
            <h2 className="text-2xl font-black text-white/90 italic tracking-tight">{t("스킬 정보")}</h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {SKILL_CATEGORIES_NTE.map(cat => {
              if (groupedSkills[cat.id]?.length === 0) return null;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-105' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
                  }`}
                  style={isActive ? { backgroundColor: theme.primary, color: '#000', boxShadow: `0 0 20px ${theme.shadow}` } : {}}
                >
                  {t(cat.label)}
                </button>
              );
            })}
          </div>

          <div className="grid gap-4">
            {activeSkills.map(({ skill, filename }, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={`${CDN_BASE}${filename}`}
                      alt={skill.name}
                      className="w-10 h-10 object-contain drop-shadow-md brightness-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-500 mb-1">{t(skill.tag || skill.type || '')}</div>
                    <h3 className="text-lg font-black text-white/90">{skill.name}</h3>
                  </div>
                </div>
                <div className="text-gray-300/90 text-[15px] leading-relaxed break-keep font-medium bg-black/20 p-5 rounded-xl border border-white/5">
                  {renderContent(skill.description)}
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
        {char.awakenings && char.awakenings.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6 mt-12">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10" style={{ boxShadow: `0 0 20px ${theme.shadow}` }}>
                <Sparkles size={20} style={{ color: theme.primary }} />
              </div>
              <h2 className="text-2xl font-black text-white/90 italic tracking-tight">{t("각성")}</h2>
            </div>
            
            <div className="grid gap-4">
              {char.awakenings.map((awakening: any, idx: number) => {
                // Extract level and title if formatted like "Level X: Title"
                const parts = awakening.description.split(/:(.+)/);
                const desc = parts.length > 1 ? parts[1].trim() : awakening.description;
                return (
                  <div key={idx} className="group flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center border border-white/20 relative overflow-hidden"
                           style={{ background: `linear-gradient(135deg, ${theme.primary}20, transparent)`, borderColor: `${theme.primary}50` }}>
                        <span className="text-xl font-black italic text-white z-10">{awakening.rank}</span>
                        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: `url(${CDN_BASE}${awakening.iconKey}.webp)` }} />
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

      </div>
    </div>
  );
}
