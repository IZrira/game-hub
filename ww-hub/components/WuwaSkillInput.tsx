import React from 'react';
import { useTranslation } from 'react-i18next';

const SKILL_THEME = {
  title: "text-[#a89969] font-black italic", 
  keycapImg: "inline-block w-6 h-6 object-contain align-middle mx-1 brightness-110 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
};

interface WuwaSkillInputProps {
  char: any;
  specialTerms?: Record<string, string>;
  setTooltip?: (tooltip: { text: string; x: number; y: number } | null) => void;
  theme?: { primary: string };
}

import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

const WuwaSkillInput: React.FC<WuwaSkillInputProps> = ({ char, specialTerms = {}, setTooltip, theme }) => {
  const { t } = useTranslation();
  const ICON_COMMON_BASE = `${CDN_URL}/ww%20images/common/position/`;
  
  const renderDescriptionWithIcons = (text: string) => {
    if (!text) return null;
    
    // Sort terms by length descending to match longest first
    const sortedKeys = Object.keys(specialTerms).sort((a, b) => b.length - a.length);
    const termsRegexStr = sortedKeys.length > 0 
      ? sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') 
      : '';

    // Matches: {{KEY_E/R/LSHIFT}}, {{MOUSE_L}}, [mouse left], [key e], [key r], [left shift], ==HIGHLIGHT==, **BOLD**, [image.webp], and special terms
    const combinedRegex = new RegExp(`({{KEY_(?:[eErR]|LSHIFT)}}|{{MOUSE_L}}|\\[[mM]ouse\\s+[lL]eft\\]|\\[[kK]ey\\s+[eErR]\\]|\\[[lL]eft\\s+[sS]hift\\]|==[^=]+==|\\*\\*[^\\*]+\\*\\*|\\[[^\\]]+\\.webp\\]${termsRegexStr ? '|' + termsRegexStr : ''})`, 'g');
    const parts = text.split(combinedRegex);
    
    return parts.map((part, index) => {
      if (!part) return null;

      const keyMatch = part.match(/{{KEY_([eErR]|LSHIFT)}}/i);
      const mouseMatch = part.match(/{{MOUSE_L}}/i);
      
      const manualMouseMatch = part.match(/\[\s*mouse\s+left\s*\]/i);
      const manualKeyMatch = part.match(/\[\s*key\s+([eErR])\s*\]/i);
      const manualShiftMatch = part.match(/\[\s*left\s+shift\s*\]/i);

      const highlightMatch = part.match(/==([^=]+)==/);
      const boldMatch = part.match(/\*\*([^\*]+)\*\*/);
      const imageMatch = part.match(/\[([^\]]+\.webp)\]/);
      
      if (keyMatch || manualKeyMatch || manualShiftMatch) {
        let fileName = '';
        let alt = '';
        if (keyMatch) {
          const rawKey = keyMatch[1].toUpperCase();
          const key = rawKey === 'LSHIFT' ? 'left shift' : `key ${rawKey}`;
          fileName = `${key.replace(' ', '%20')}.webp`;
          alt = key;
        } else if (manualKeyMatch) {
          const keyChar = manualKeyMatch[1].toUpperCase();
          fileName = `key%20${keyChar}.webp`;
          alt = `key ${keyChar}`;
        } else if (manualShiftMatch) {
          fileName = `left%20shift.webp`;
          alt = 'left shift';
        }
        
        return <img key={index} src={`${ICON_COMMON_BASE}${fileName}`} className={SKILL_THEME.keycapImg} alt={alt} />;
      }
      
      if (mouseMatch || manualMouseMatch) {
        const fileName = `mouse%20left.webp`;
        return <img key={index} src={`${ICON_COMMON_BASE}${fileName}`} className={SKILL_THEME.keycapImg} alt="mouse left" />;
      }

      if (imageMatch) {
        const imageName = imageMatch[1];
        const lowerName = imageName.toLowerCase();
        
        // Handle common icons specified in [filename.webp] format
        if (lowerName.includes('mouse') || lowerName.includes('key') || lowerName.includes('jump') || lowerName.includes('space') || lowerName.includes('shift')) {
          let fileName = imageName;
          let alt = imageName.replace('.webp', '');
          
          if (lowerName.includes('mouse left')) fileName = 'mouse_L.webp';
          else if (lowerName.includes('mouse right')) fileName = 'mouse_R.webp';
          else if (lowerName.includes('jump') || lowerName.includes('space')) fileName = 'key%20Space.webp';
          else if (lowerName.includes('key e')) fileName = 'key%20E.webp';
          else if (lowerName.includes('key r')) fileName = 'key%20R.webp';
          else if (lowerName.includes('shift')) fileName = 'key%20LSHIFT.webp';
          
          return <img key={index} src={`${ICON_COMMON_BASE}${fileName}`} className={SKILL_THEME.keycapImg} alt={alt} />;
        }

        return (
          <div key={index} className="my-6 bg-white/[0.02] p-4 rounded-[30px] border border-white/5 flex justify-center items-center overflow-hidden w-full text-center">
            <img 
              src={`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(char?.folderName)}/${safeEncodeURIComponent(imageName)}`}
              className="max-w-xl w-full h-auto object-contain rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-700"
              alt={imageName}
              onError={(e) => {
                (e.target as HTMLImageElement).src = `${CDN_URL}/ww%20images/common/skill_placeholder.webp`;
              }}
              loading="lazy"
              decoding="async"
            />
          </div>
        );
      }

      if (highlightMatch) {
        const keyword = highlightMatch[1];
        const hasTooltip = specialTerms[keyword];
        return (
          <span 
            key={index} 
            className={`text-[#fbbf24] font-bold mx-0.5 ${hasTooltip ? 'cursor-help border-b border-dashed border-[#fbbf24]/50' : ''}`}
            style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}
            onMouseEnter={hasTooltip && setTooltip ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setTooltip({ text: specialTerms[keyword], x: r.left + r.width / 2, y: r.bottom });
            } : undefined}
            onMouseLeave={hasTooltip && setTooltip ? () => setTooltip(null) : undefined}
          >
            {keyword}
          </span>
        );
      }

      if (boldMatch) {
        return <strong key={index} className="font-bold text-white">{boldMatch[1]}</strong>;
      }

      // Special terms without ==
      if (specialTerms[part]) {
        return (
          <span 
            key={index} 
            className="inline-flex border-b border-dashed cursor-help px-0.5 transition-colors" 
            style={{ 
              borderColor: 'rgba(255,255,255,0.3)' 
            }}
            onMouseEnter={setTooltip ? (e) => { 
              const r = e.currentTarget.getBoundingClientRect(); 
              setTooltip({ text: specialTerms[part], x: r.left + r.width / 2, y: r.bottom }); 
            } : undefined}
            onMouseLeave={setTooltip ? () => setTooltip(null) : undefined}
          >
            {part}
          </span>
        );
      }
      
      return part;
    });
  };

  const overviewText = t(char.skillInput?.overview || '');
  const inputList = char.skillInput?.inputs || [];
  const hasInlineImage = overviewText.includes('.webp');

  return (
    <div className="glass-card p-8 rounded-[40px] border border-white/10 bg-black/40 font-sans shadow-2xl relative overflow-hidden">
       {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent rounded-bl-[100px] pointer-events-none" />

      <h2 className="text-white text-xl font-black italic tracking-tighter uppercase mb-6 flex items-center gap-3">
        <div className="w-1.5 h-5 bg-brand-primary rounded-full" style={{ backgroundColor: '#a89969' }} />
        {t('스킬 입력 가이드')}
      </h2>

      {(!char.skillInput?.hideGauge && char?.folderName) && (
        <div className="mb-10 bg-white/[0.02] p-4 rounded-[30px] border border-white/5 flex justify-center items-center overflow-hidden">
          <img 
            src={`${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(char.folderName)}/공명 회로 게이지.webp`}
            className="w-full max-w-xl h-auto object-contain rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-700"
            alt={t('공명 회로 게이지')}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${CDN_URL}/ww%20images/common/skill_placeholder.webp`;
            }}
          />
        </div>
      )}


      {/* 2. 특징 및 설명 섹션 */}
      {overviewText && (
        <div className="space-y-8 mb-10">
          {(() => {
            const sections = overviewText.split(/\n\n(?=설명|특징|개요|조작 입력|특수 에너지|메커니즘 설명)/);
            return sections.map((section, idx) => {
              const lines = section.trim().split('\n\n');
              let title = '';
              let contentLines = lines;

              if (lines[0] === '특징') {
                title = t('특징');
                contentLines = lines.slice(1);
              } else if (lines[0] === '설명') {
                title = t('설명');
                contentLines = lines.slice(1);
              } else if (lines[0] === '개요') {
                title = t('개요');
                contentLines = lines.slice(1);
              } else if (lines[0] === '조작 입력') {
                title = t('조작 입력');
                contentLines = lines.slice(1);
              } else if (lines[0] === '메커니즘 설명') {
                title = t('메커니즘 설명');
                contentLines = lines.slice(1);
              } else if (lines[0] === '특수 에너지') {
                title = t('특수 에너지');
                contentLines = lines.slice(1);
              }


              if (contentLines.length === 0) return null;

              return (
                <div key={idx}>
                  {title && <h4 className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3">{title}</h4>}
                  <div className="space-y-4 text-gray-200 text-base leading-relaxed font-medium whitespace-pre-line">
                    {contentLines.map((para, i) => (
                      <div key={i}>{renderDescriptionWithIcons(para)}</div>
                    ))}
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}

      {/* 3. 입력 리스트 */}
      {inputList.length > 0 && (
        <div className="space-y-4">
          {/* A타입의 경우, overview에서 메커니즘 설명 등을 처리하므로 조작 입력 타이틀을 조건부로 렌더링 */}
          {!overviewText.includes('메커니즘 설명') && !overviewText.includes('특징') && (
            <h4 className="text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3">{t('조작 입력')}</h4>
          )}
          <div className="grid grid-cols-1 gap-3">
            {inputList
              .filter((input: any) => {
                const text = String(t(typeof input === 'string' ? input : input.description)).trim();
                return text.length > 0 && !text.startsWith('조작 입력') && !text.startsWith('메커니즘 설명') && !text.startsWith('설명') && !text.startsWith('특수 에너지');
              })
              .map((input: any, index: number) => {
                const rawText = String(t(typeof input === 'string' ? input : input.description));
                const processedText = rawText.startsWith('조작 입력\n\n') 
                  ? rawText.replace('조작 입력\n\n', '') 
                  : (rawText.startsWith('메커니즘 설명\n\n') ? rawText.replace('메커니즘 설명\n\n', '') : rawText);
                
                return (
                  <InputRow 
                    key={index} 
                    action={renderDescriptionWithIcons(processedText)} 
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

// --- 서브 컴포넌트 ---

const InputRow = ({ action }: { label?: string, action: React.ReactNode }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:border-white/10 transition-all group">
    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-brand-primary transition-colors" />
    <div className="flex flex-wrap items-center w-full">
      <span className="text-gray-300 text-sm font-medium whitespace-pre-line w-full">{action}</span>
    </div>
  </div>
);

export default WuwaSkillInput;
