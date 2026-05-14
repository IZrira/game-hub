import React from 'react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

interface WuwaResonanceChainProps {
  char: any;
  theme: { primary: string; secondary: string; shadow: string };
  renderContent: (text: string) => React.ReactNode;
  setTooltip: (tooltip: { text: string; x: number; y: number } | null) => void;
}

const WuwaResonanceChain: React.FC<WuwaResonanceChainProps> = ({ char, theme, renderContent, setTooltip }) => {
  const { t } = useTranslation();

  if (!char.eidolons || char.eidolons.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6 px-4">
        <div className="w-12 h-12 rounded-[22px] border-2 flex items-center justify-center font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>07</div>
        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">{t('공명 체인')}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {char.eidolons.map((eidolon: any, index: number) => {
          const iconUrl = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(char.folderName)}/공명%20체인${index + 1}.webp`;
          
          return (
            <div 
              key={index} 
              className="glass-card group flex flex-col gap-5 p-8 rounded-[40px] border border-white/10 bg-black/40 hover:bg-white/[0.02] transition-all duration-500 shadow-xl overflow-hidden relative"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent rounded-bl-[100px] pointer-events-none" />
              
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-500 shadow-2xl relative">
                  <img 
                    src={iconUrl} 
                    className="w-full h-full object-contain brightness-110" 
                    alt={t(eidolon.name)} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/skill_placeholder.webp';
                    }}
                  />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-[10px] font-black text-white italic shadow-lg">
                    {eidolon.rank}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-black text-white tracking-tight group-hover:text-brand-accent transition-colors italic" style={{ color: theme.primary }}>
                    {t(eidolon.name)}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('공명 체인 노드')}</span>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 text-[15px] leading-relaxed font-medium whitespace-pre-line pl-6 border-l-2 border-white/10 group-hover:border-white/30 transition-colors">
                {renderContent(t(eidolon.description))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WuwaResonanceChain;
