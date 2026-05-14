
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  X,
  Package,
  Sparkles,
  MapPin,
  Info,
  RefreshCw,
  History,
  BookOpen,
  Share2,
  Download,
  CheckCircle2,
  Zap,
  Compass,
  Globe,
  Shield,
  Copy,
  Users
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import ItemIcon from '../../common-hub/components/ItemIcon';
import ItemDetailModal from '../../common-hub/components/ItemDetailModal';
import WuwaSkillSection from '../components/WuwaSkillSection';
import WuwaSkillInput from '../components/WuwaSkillInput';
import WuwaResonanceChain from '../components/WuwaResonanceChain';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import { WuwaCharacter } from '../types';
import { ELEMENT_COLORS } from '../data/formatter';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80, 90];

const Flag: React.FC<{ code: string }> = ({ code }) => (
  <img src={`https://flagcdn.com/w20/${code}.png`} alt={code} className="inline-block w-4 h-3 object-cover rounded-sm mr-1.5" />
);

const CharacterDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  
  const { CHARACTER_DB } = useMemo(() => getGameData(gameId || 'ww'), [gameId]);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false); // Default collapsed
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);   // New: Profile toggle
  const [levelIdx, setLevelIdx] = useState(8);
  
  const [gender, setGender] = useState<'m' | 'f'>('f');
  
  const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const characterCardRef = useRef<HTMLDivElement>(null);

  const rawChar = useMemo(() => CHARACTER_DB.find((c: any) => c.id === charName || c.name === charName || c.originalName === charName), [CHARACTER_DB, charName]);

  // AS Mode State
  const [isASMode, setIsASMode] = useState(false);

  useEffect(() => {
    if (rawChar?.hasASBuff) {
      setIsASMode(true);
    } else {
      setIsASMode(false);
    }
  }, [rawChar]);

  // Derived Character Data based on Mode
  const char = useMemo(() => {
    if (!rawChar) return null;
    if (isASMode && rawChar.asBuffData) {
      return {
        ...rawChar,
        skills: rawChar.asBuffData.skills || rawChar.skills,
        baseStats: rawChar.asBuffData.baseStats || rawChar.baseStats,
        additionalAbilities: rawChar.asBuffData.additionalAbilities || rawChar.additionalAbilities || rawChar.bonusAbilities,
        eidolons: rawChar.asBuffData.eidolons || rawChar.eidolons,
      };
    }
    return rawChar;
  }, [rawChar, isASMode]);

  const theme = useMemo(() => {
    if (!char) return { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
    const ELEMENT_THEMES: Record<string, { primary: string, secondary: string, shadow: string }> = {
      '기류': { primary: '#00E676', secondary: '#00C853', shadow: 'rgba(0, 230, 118, 0.4)' },
      'Aero': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '전도': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      'Electro': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '회절': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      'Spectro': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      '인멸': { primary: '#F472B6', secondary: '#EC4899', shadow: 'rgba(244, 114, 182, 0.4)' },
      'Havoc': { primary: '#F472B6', secondary: '#EC4899', shadow: 'rgba(244, 114, 182, 0.4)' },
      '융융': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      'Fusion': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '응결': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
      'Glacio': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
    };
    return ELEMENT_THEMES[char.attribute] || { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
  }, [char]);

  const specialTerms = useMemo(() => {
    const terms: Record<string, string> = {};
    if (!char) return terms;
    
    // Common WW terms (always present)
    const commonKeys = [
      'ww.common.terms.dissipation',
      'ww.common.terms.vibration',
      'ww.common.terms.dissipation_skill',
      'ww.common.terms.dissipation_loss'
    ];
    commonKeys.forEach(key => {
      const name = t(`${key}.name`);
      if (name !== `${key}.name`) {
        terms[name] = t(`${key}.description`);
        // Also add version without brackets for easier matching if needed
        const cleanName = name.replace(/[「」]/g, '');
        if (cleanName !== name) {
          terms[cleanName] = t(`${key}.description`);
        }
      }
    });

    // Custom terminology dictionary
    char.terms?.forEach((termObj: any) => {
      if (termObj.name) {
        const name = t(termObj.name);
        terms[name] = t(termObj.description);
        const cleanName = name.replace(/[「」]/g, '');
        if (cleanName !== name) {
          terms[cleanName] = t(termObj.description);
        }
      }
    });
    
    return terms;
  }, [char, t]);


  const ICON_COMMON_BASE = `${CDN_URL}/ww%20images/common/position/`;

  if (!char) return <div className="p-20 text-center text-white font-black uppercase italic">{t('Character Registry Not Found')}</div>;

  const currentLevel = LEVEL_STEPS[levelIdx];

  const calculateStat = (statType: 'hp' | 'atk' | 'def'): string | number => {
    const labelMap: Record<string, string> = { hp: t('기초 HP'), atk: t('기초 공격력'), def: t('기초 방어력') };
    const label = labelMap[statType];
    const lvKey = `lv${currentLevel}` as keyof typeof char.baseStats;
    const lvData = char.baseStats?.[lvKey] as Record<string, number> | undefined;
    if (lvData && lvData[label]) return lvData[label];
    return '---';
  };

  const renderTextWithHighlights = (text: string) => {
    if (!text) return [];
    // Handle gender placeholders
    const processedText = text.replace(/\{F#([^}]*)\}=\{M#([^}]*)\}/g, (_, f, m) => gender === 'f' ? f : m);
    
    // Add protected terms that shouldn't be broken up
    const protectedTerms = ["Mar. 7th", "Mar. 7th (수렵)"]; 
    const sortedKeys = [...Object.keys(specialTerms), ...protectedTerms].sort((a, b) => b.length - a.length);
    const elementKeywords = Object.keys(ELEMENT_COLORS).join('|');
    const highlightRegexStr = '==[^=]+==';
    const sortedKeysRegex = sortedKeys.length > 0 
      ? sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') 
      : '';
    
    const combinedRegex = new RegExp(`({{KEY_(?:[eErR]|LSHIFT)}}|{{MOUSE_L}}|\\[[mM]ouse\\s+[lL]eft\\]|\\[[kK]ey\\s+[eErR]\\]|\\[[lL]eft\\s+[sS]hift\\]|\\[[^\\]]+\\.webp\\]|{icon:[^}]+}|(?:${elementKeywords})\\s*(?:피해)(?!\\s*보너스)|${highlightRegexStr}${sortedKeysRegex ? '|' + sortedKeysRegex : ''}|[+-]?\\d+(?:\\.\\d+)?%?)`, 'g');

    return processedText.split('\n').map((line, lineIndex) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <br key={lineIndex} />;

      // Check if the entire line is a title (wrapped entirely in any number of asterisks)
      const titleMatch = trimmedLine.match(/^[*]+([^*]+)[*]+$/);
      if (titleMatch) {
        const titleText = titleMatch[1].trim();
        return (
          <div key={lineIndex} className="inline-block w-full mt-5 mb-1">
            <span className="text-[18px]" style={{ 
              color: '#a89969', 
              fontWeight: 900, 
              letterSpacing: '-0.05em' 
            }}>
              {titleText}
            </span>
          </div>
        );
      }

      // For normal lines, strip leftover asterisks that might overlap with custom highlights
      const cleanLine = line.replace(/\*/g, '');

      const inlineNodes = cleanLine.split(combinedRegex).map((part, i) => {
        // 1. Icon matches
        const iconMatch = part?.match(/\{icon:([^}]+)\}/);
        const manualMouseMatch = part?.match(/\[\s*mouse\s+left\s*\]/i);
        const manualKeyMatch = part?.match(/\[\s*key\s+([er])\s*\]/i);
        const manualShiftMatch = part?.match(/\[\s*left\s+shift\s*\]/i);
        const keyMatch = part?.match(/{{KEY_([er]|LSHIFT)}}/i);
        const mouseMatch = part?.match(/{{MOUSE_L}}/i);
        const imageMatch = part?.match(/\[([^\]]+\.webp)\]/);

        if (iconMatch || manualMouseMatch || manualKeyMatch || manualShiftMatch || keyMatch || mouseMatch || imageMatch) {
          let fileName = '';
          let alt = '';

          if (iconMatch) {
            return <img key={i} src={`/assets/icons/${iconMatch[1]}.png`} className="inline-icon" alt={iconMatch[1]} onError={(e) => (e.currentTarget.style.display = 'none')} />;
          } else if (imageMatch) {
            const imageName = imageMatch[1];
            const lowerName = imageName.toLowerCase();
            if (lowerName.includes('mouse') || lowerName.includes('key') || lowerName.includes('shift')) {
              if (lowerName.includes('mouse left')) fileName = 'mouse%20left.webp';
              else if (lowerName.includes('key e')) fileName = 'key%20E.webp';
              else if (lowerName.includes('key r')) fileName = 'key%20R.webp';
              else if (lowerName.includes('left shift') || lowerName.includes('lshift')) fileName = 'left%20shift.webp';
              else fileName = imageName.replace(' ', '%20');
              alt = imageName.replace('.webp', '');
            } else {
              return null; 
            }
          } else if (manualMouseMatch || mouseMatch) {
            fileName = `mouse%20left.webp`;
            alt = "mouse left";
          } else if (manualKeyMatch || keyMatch) {
            const rawKey = (keyMatch ? keyMatch[1] : manualKeyMatch![1]).toUpperCase();
            const key = rawKey === 'LSHIFT' ? 'left shift' : `key ${rawKey}`;
            fileName = `${key.replace(' ', '%20')}.webp`;
            alt = key;
          } else if (manualShiftMatch) {
            fileName = `left%20shift.webp`;
            alt = 'left shift';
          }

          return (
            <img 
              key={i} 
              src={`${ICON_COMMON_BASE}${fileName}`} 
              className="inline-block w-5 h-5 object-contain align-middle mx-0.5 brightness-110" 
              alt={alt}
            />
          );
        }

        // 2. Protected terms
        if (part && protectedTerms.includes(part)) return part;

        // 3. Element highlight
        if (part) {
          const attrMatch = Object.keys(ELEMENT_COLORS).find(attr => part.includes(attr) && part.includes('피해') && !part.includes('보너스'));
          if (attrMatch) return <span key={i} className="font-bold" style={{ color: ELEMENT_COLORS[attrMatch] }}>{part}</span>;
        }

        // 4. Manual highlight (==keyword==)
        if (part && part.startsWith('==') && part.endsWith('==')) {
          const keyword = part.slice(2, -2);
          const hasTooltip = specialTerms[keyword];

          return (
            <span 
              key={i} 
              className={`inline-block font-bold transition-all duration-300 ${hasTooltip ? 'cursor-help border-b border-dashed' : ''}`}
              style={{ 
                color: '#fbbf24', 
                textShadow: '0 0 10px rgba(251, 191, 36, 0.4)',
                borderColor: hasTooltip ? 'rgba(251, 191, 36, 0.5)' : 'transparent'
              }}
              onMouseEnter={hasTooltip ? (e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setTooltip({ text: specialTerms[keyword], x: r.left + r.width / 2, y: r.bottom });
              } : undefined}
              onMouseLeave={hasTooltip ? () => setTooltip(null) : undefined}
            >
              {keyword}
            </span>
          );
        }

        // 5. Special terms with tooltip
        if (part && specialTerms[part]) {
          return (
            <span key={i} className="inline-flex border-b border-dashed cursor-help px-0.5" style={{ borderColor: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={(e) => { 
                const r = e.currentTarget.getBoundingClientRect(); 
                setTooltip({ text: specialTerms[part], x: r.left + r.width / 2, y: r.bottom }); 
              }}
              onMouseLeave={() => setTooltip(null)}>{part}</span>
          );
        }

        // 6. Numbers
        if (part && /^[+-]?\d+(?:\.\d+)?%?$/.test(part)) return <span key={i} className="font-black text-[#FFD600]">{part}</span>;

        return part;
      });

      return <div key={lineIndex} className="mb-0.5">{inlineNodes}</div>;
    });
  };

  const getIllustrationUrl = () => {
    const folder = char.folderName || t(char.name);
    
    if (char.isRover) {
      const folderName = char.folderName || `방랑자 · ${char.attribute}`;
      const genderSuffix = gender === 'f' ? '(여)' : '(남)';
      const fileName = `${folderName}${genderSuffix}.webp`;
      return `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(folderName)}/${safeEncodeURIComponent(fileName)}`;
    }
    
    const base = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(folder)}/`;
    const fileName = `${safeEncodeURIComponent(folder)}.webp`;
    
    return char.fixedUrl || `${base}${fileName}`;
  };

  // 1. 웹 공유 API (Native Share)
  const handleShare = async () => {
    const shareData = {
      title: `${t(char.name)} | RIRA ARCHIVE`,
      text: `${t(char.name)} ${t('캐릭터의 상세 공략과 데이터를 확인해보세요!')}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) { console.log('공유 취소됨:', err); }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('링크가 클립보드에 복사되었습니다.'));
    }
  };

  // 2. 빌드 카드 이미지 생성 (HTML to Image)
  const handleDownloadImage = async () => {
    if (!characterCardRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(characterCardRef.current, { quality: 0.95, backgroundColor: '#121212' });
      const link = document.createElement('a');
      link.download = `${char.name}_RIRA_ARCHIVE.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('이미지 캡처 오류:', err);
    }
  };

  // 4. 구형 브라우저/HTTP 환경 대응용 함수
  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Fallback 복사 실패:", err);
    }
    document.body.removeChild(textArea);
  };

  // 4. 재료 리스트 클립보드 복사 (Data Export)
  const handleCopyMaterials = () => {
    // 1. 데이터 존재 여부 정밀 체크
    if (!char || !char.materials_v2) {
      console.error("복사할 재료 데이터가 없습니다.", char);
      alert(t('재료 데이터가 등록되지 않은 캐릭터입니다.'));
      return;
    }

    const asc = char.materials_v2.ascension?.map((m: any) => `${t(m.name)} x${m.count}`).join(', ') || t('정보 없음');
    const trc = char.materials_v2.traces?.map((m: any) => `${t(m.name)} x${m.count}`).join(', ') || t('정보 없음');
    
    const text = `[${t(char.name)} ${t('육성 재료 리스트')}]\n\n■ ${t('승급 재료')}\n${asc}\n\n■ ${t('행적 재료')}\n${trc}\n\n출처: RIRA ARCHIVE`;

    // 2. 최신 navigator.clipboard 시도
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error("클립보드 복사 실패:", err);
          fallbackCopyText(text); // 실패 시 구형 방식으로 전환
        });
    } else {
      // 3. 비보안(HTTP) 환경을 위한 구형 복사 방식
      fallbackCopyText(text);
    }
  };

  const seoDescription = `${t('명조 (Wuthering Waves)')} ${t(char.attribute)} ${t('속성')} ${t((char as any).weaponType)} ${t('캐릭터')} ${t(char.name)} ${t('상세 가이드: 최적의 세팅 정보를 완벽 정리했습니다.')}`;

  const faqData = useMemo(() => {
    if (!char) return [];
    return [
      {
        question: `${t(char.name)} ${t('의 주력 스탯과 속성은 무엇인가요?')}`,
        answer: `${t(char.name)}${t('은(는)')} ${t(char.attribute)} ${t('속성의')} ${t((char as any).weaponType)} ${t('캐릭터입니다.')}`
      },
      {
        question: `${t(char.name)} ${t('의 돌파를 위해 필요한 주요 재료는 무엇인가요?')}`,
        answer: `${t(char.name)}${t('의 돌파를 위해서는')} ${char.materials_v2?.ascension?.slice(0, 3).map((m: any) => t(m.name)).join(', ')} ${t('등이 필요합니다.')}`
      }
    ];
  }, [char, t]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep relative">
      <SEO 
        title={`${t(char.name)} ${t('캐릭터 공략 및 세팅 정보')}`} 
        description={seoDescription}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/character/${char.id}`}
        gameCategory={t('명조 (Wuthering Waves)')}
        itemType={t((char as any).weaponType)}
        faqData={faqData}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: `/gallery/${gameId}` },
          { name: t('캐릭터'), url: `/gallery/${gameId}?menu=캐릭터` },
          { name: t(char.name), url: `/gallery/${gameId}/character/${char.id}` }
        ]}
      />
      {/* Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-[1000] max-w-[600px] w-max bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl pointer-events-none transform -translate-x-1/2 translate-y-4"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/90 border-t border-l border-white/10 rotate-45" />
          <div className="text-white/90 text-[14px] leading-[1.65] whitespace-pre-line relative z-10 font-medium">
            {typeof tooltip.text === 'string' ? renderTextWithHighlights(tooltip.text) : tooltip.text}
          </div>
        </div>
      )}
      {/* Item Modal */}
      <ItemDetailModal 
        itemNameEn={selectedItem || ''} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />



      {/* Page Header */}
      <PageHeader gameId={gameId} category={t("캐릭터")} title={t(char.name)} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-6">
        {/* Profile Header: Image & Consolidated Info */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 items-start border-b border-white/5 pb-8">
          
          {/* Left: Image with Integrated Info Overlay */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.5]">
            <img 
              src={getIllustrationUrl()} 
              alt={`${t(char.name)} - ${t('리라 아카이브 캐릭터 정보 및 세팅 가이드')}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              fetchPriority="high"
              decoding="async"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  <img src={`${ICON_COMMON_BASE}${safeEncodeURIComponent(char.attribute)}.webp`} className="w-3.5 h-3.5 object-contain" alt="" />
                  {t((char as any).weaponType || '')} | {t(char.attribute)}
                </div>
                <div className="flex items-end justify-between gap-4">
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg">
                    {t(char.name)}
                  </h1>
                  <Link 
                    to={`/gallery/${gameId}/character/${char.id}/guide`} 
                    className="mb-1 flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-white rounded-2xl text-[10px] font-black shadow-[0_0_20px_rgba(var(--theme-primary-rgb),0.4)] hover:scale-105 transition-all active:scale-95 border border-white/20 whitespace-nowrap"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <BookOpen size={14} /> {t('상세 공략')}
                  </Link>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: char.rarity }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.6)]" />
                  ))}
                </div>
                <div className="text-gray-400 font-bold tracking-widest text-[9px] uppercase italic opacity-40 px-2 py-0.5 border border-white/10 rounded-lg">
                   Ver {char.releaseVersion || '1.0'}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Consolidated Controls and Summary */}
          <div className="space-y-6 h-full flex flex-col">
            
            {/* 01. Active Controls (Gender / Share) */}
            <div className="flex flex-wrap items-center gap-3 px-2">
              {char.isRover && (
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button onClick={() => setGender('m')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'm' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500'}`} style={gender === 'm' ? { backgroundColor: theme.primary } : {}}>{t('남성')}</button>
                  <button onClick={() => setGender('f')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'f' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500'}`} style={gender === 'f' ? { backgroundColor: theme.primary } : {}}>{t('여성')}</button>
                </div>
              )}
              
              <div className="flex items-center gap-2 ml-auto">
                 <button onClick={handleShare} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors" title={t('공유하기')}><Share2 size={14} /></button>
                 <button onClick={handleDownloadImage} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors" title={t('이미지 저장')}><Download size={14} /></button>
              </div>
            </div>

            {/* 02. Level Slider & Visual Stats Card */}
            <div className="glass-card p-6 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-[20px] border-2 flex items-center justify-center font-black text-lg shadow-xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>01</div>
                  <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400 italic">{t('기본 스텟')}</h2>
                </div>
                <div className="flex flex-col gap-1.5 flex-1 max-w-md relative pt-6">
                  {/* Floating Level Label */}
                  <div 
                    className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-brand-primary text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg"
                    style={{ 
                      left: `${(levelIdx / 8) * 100}%`,
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 10px ${theme.primary}40`
                    }}
                  >
                    Lv.{currentLevel}
                  </div>
                  <input type="range" min="0" max="8" value={levelIdx} onChange={(e) => setLevelIdx(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer" style={{ accentColor: theme.primary }} />
                  <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 px-0.5">
                    <span>1</span>
                    <span>90</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <StatRow label={t("기초 HP")} value={calculateStat('hp')} color={theme.primary} />
                <StatRow label={t("기초 공격력")} value={calculateStat('atk')} color={theme.primary} />
                <StatRow label={t("기초 방어력")} value={calculateStat('def')} color={theme.primary} />
              </div>
            </div>

            {/* 03. Profile/Story Section (Toggle) */}
            <div className="glass-card overflow-hidden rounded-[35px] border border-white/5 bg-[#0f0f0f]/40">
              <button 
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="w-full p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                   <span className="text-3xl font-black italic opacity-10" style={{ color: theme.primary }}>02</span>
                   <h2 className="text-lg font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{t('캐릭터 소개')}</h2>
                </div>
                <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${isProfileExpanded ? 'rotate-180 border-brand-primary' : ''}`}>
                   <ChevronDown size={18} />
                </div>
              </button>
              <div className={`transition-all duration-500 ${isProfileExpanded ? 'max-h-[1000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 border-t border-white/5 pt-6">
                  <div className="text-gray-400 text-base leading-relaxed italic bg-black/20 p-6 rounded-[25px] border border-white/5 shadow-inner whitespace-pre-line">
                    {t(char.briefInfo || char.brief || '프로필 정보가 등록되지 않았습니다.')}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 03 Metadata */}
        <section className="space-y-8">
          <SectionHeader 
            num="03" 
            title={t("캐릭터 프로필 & 성우 정보")} 
            theme={theme} 
            expanded={isMetadataExpanded} 
            onToggle={() => setIsMetadataExpanded(!isMetadataExpanded)} 
          />
          <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isMetadataExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-6">
              {/* Metadata Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetadataCard label={t("무기 유형")} value={t((char as any).weaponType) || ''} icon={<Compass size={20} />} theme={theme} />
                <MetadataCard label={t("전투 속성")} value={t(char.attribute)} icon={<Zap size={20} />} theme={theme} />
                <MetadataCard label={t("소속 세력")} value={t(char.affiliation || 'Unknown')} icon={<MapPin size={20} />} theme={theme} />
                <MetadataCard label={t("출시 버전")} value={`v${char.releaseVersion || '1.0'}`} icon={<History size={20} />} theme={theme} />
              </div>
              

              {/* Voice Actors Card */}
              <div className="glass-card rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <Globe size={18} className="text-gray-500" />
                  <h3 className="text-[11px] font-black uppercase tracking-widest text-gray-400">{t("성우 정보 리스트")}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {char.voiceActors?.split('/').map((n: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.06] transition-all">
                      <div className="flex items-center gap-3">
                        <Flag code={['kr', 'us', 'cn', 'jp'][i] || 'un'} />
                        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{['KR', 'EN', 'CN', 'JP'][i]}</span>
                      </div>
                      <span className="text-lg font-black text-gray-200 group-hover:text-white">{t(n.trim())}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 Battle Roles (Moved from Profile) */}
        {char.roles && char.roles.length > 0 && (
          <section className="space-y-8">
            <div className="flex items-center gap-6 px-4">
              <div className="w-12 h-12 rounded-[22px] border-2 flex items-center justify-center font-black text-lg shadow-lg" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>04</div>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5">{t('전투 역할')}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {char.roles.map((role: any, idx: number) => {
                const ICON_BASE = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/common/position/';
                return (
                  <div key={idx} className="glass-card group flex flex-col gap-4 p-8 rounded-[40px] border border-white/10 bg-black/40 hover:bg-white/[0.02] transition-all duration-500 shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/[0.02] to-transparent rounded-bl-[100px] pointer-events-none" />
                    <div className="w-16 h-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                       <img 
                         src={`${ICON_BASE}${encodeURIComponent(t(role.label))}.webp`} 
                         className="w-full h-full object-contain brightness-110" 
                         alt={t(role.label)} 
                         onError={(e) => (e.currentTarget.style.opacity = '0.3')}
                       />
                    </div>
                    <div className="space-y-1 relative z-10">
                      <span className="text-brand-primary font-black text-lg italic uppercase tracking-tighter">{t(role.label)}</span>
                      <p className="text-gray-400 text-sm leading-relaxed font-medium">{t(role.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 05 Materials */}
        <section className="space-y-8">
          <SectionHeader num="05" title={t("육성 재료")} theme={theme} />
          <div className="flex flex-col gap-10">
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                 <div className="flex items-center gap-4">
                   <Package size={22} className="text-gray-500" />
                   <span className="text-xl font-black uppercase tracking-tighter italic">{t("돌파 재료")}</span>
                 </div>
                 <button onClick={handleCopyMaterials} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                   {isCopied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                   {isCopied ? t('복사 완료!') : t('재료 리스트 복사')}
                 </button>
               </div>
               <div className="flex flex-wrap justify-center gap-8 px-4">
                  {char.materials_v2?.ascension?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('데이터가 없습니다.')}</p>}

               </div>
            </div>
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                 <Sparkles size={22} className="text-gray-500" />
                 <span className="text-2xl font-black uppercase tracking-tighter italic">{t("행적 재료")}</span>
               </div>
               <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 -mx-10 px-10 scrollbar-hide items-start justify-center">
                  {char.materials_v2?.traces?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('데이터가 없습니다.')}</p>}
                  <div className="w-8 shrink-0" />
               </div>
            </div>
          </div>
        </section>

        <WuwaSkillInput 
          char={char} 
          specialTerms={specialTerms} 
          setTooltip={setTooltip} 
          theme={theme}
        />

        <WuwaSkillSection 
          char={char} 
          theme={theme} 
          renderContent={renderTextWithHighlights} 
          setTooltip={setTooltip}
          concertDissipation={char.concertDissipation}
        />

        <WuwaResonanceChain
          char={char}
          theme={theme}
          renderContent={renderTextWithHighlights}
          setTooltip={setTooltip}
        />


        

        {/* E-E-A-T Authorship & Methodology Note */}
        <section className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 rounded-[35px] bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                <Users size={20} className="text-brand-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white uppercase tracking-widest">{t('Intelligence Source')}</h4>
                <p className="text-[11px] text-gray-500 font-medium">Authored by <span className="text-brand-accent font-black">Rira Archive Editorial Team</span></p>
              </div>
            </div>
            <div className="text-[10px] text-gray-600 max-w-md text-center md:text-right font-medium leading-relaxed">
              {t('이 분석 리포트는 최신 생성형 AI 기술을 활용한 데이터 프로세싱과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다.')}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ 
  num: string; 
  title: string; 
  theme: { primary: string; secondary: string; shadow: string }; 
  expanded?: boolean; 
  onToggle?: () => void 
}> = ({ num, title, theme, expanded, onToggle }) => (
  <div className="flex items-center justify-between w-full group">
    <div className="flex items-center gap-6">
      <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>{num}</div>
      <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">{title}</h2>
    </div>
    {onToggle && (<button onClick={onToggle} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">{expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</button>)}
  </div>
);

const MetadataCard: React.FC<{ 
  label: string; 
  value: string; 
  icon: React.ReactNode; 
  theme: { primary: string } 
}> = ({ label, value, icon, theme }) => (
  <div className="glass-card p-6 rounded-[30px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent group hover:from-white/[0.05] transition-all duration-500">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 group-hover:scale-110 group-hover:text-white transition-all duration-500" style={{ color: theme.primary }}>
        {icon}
      </div>
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
    <div className="text-xl font-black text-white tracking-tight group-hover:translate-x-1 transition-transform duration-500">{value}</div>
  </div>
);

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="space-y-4 group">
    <div className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{label}</div>
    <div className="text-3xl font-black tabular-nums text-white group-hover:text-brand-accent transition-all">{value}</div>
  </div>
);

const StatRow: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</span>
    </div>
    <div className="text-xl font-black tabular-nums text-white group-hover:scale-105 transition-transform">{value}</div>
  </div>
);

export default CharacterDetail;
