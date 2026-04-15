
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
  Copy,
  CheckCircle2
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { GLOBAL_SPECIAL_TERMS } from '../../hsr-hub/data/terms';
import ItemIcon from '../components/ItemIcon';
import ItemDetailModal from '../components/ItemDetailModal';
import SkillAndEidolonSection from '../components/SkillAndEidolonSection';
import SEO from '../components/SEO';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';
import { getGameData } from '../data/dataManager';
import { useTranslation } from 'react-i18next';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80];

const Flag: React.FC<{ code: string }> = ({ code }) => (
  <img src={`https://flagcdn.com/w20/${code}.png`} alt={code} className="inline-block w-4 h-3 object-cover rounded-sm mr-1.5" />
);

const CharacterDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  
  const { CHARACTER_DB } = useMemo(() => getGameData(currentLang), [currentLang]);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(true);
  const [levelIdx, setLevelIdx] = useState(7);
  
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
      '얼음': { primary: '#A1D9FF', secondary: '#3D8CFF', shadow: 'rgba(161, 217, 255, 0.4)' },
      'Ice': { primary: '#A1D9FF', secondary: '#3D8CFF', shadow: 'rgba(161, 217, 255, 0.4)' },
      '번개': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      'Lightning': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      'Electro': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '물리': { primary: '#E5E5E5', secondary: '#A1A1A1', shadow: 'rgba(229, 229, 229, 0.4)' },
      'Physical': { primary: '#E5E5E5', secondary: '#A1A1A1', shadow: 'rgba(229, 229, 229, 0.4)' },
      '화염': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      'Fire': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      'Fusion': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '바람': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      'Wind': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      'Aero': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '양자': { primary: '#8080FF', secondary: '#651FFF', shadow: 'rgba(128, 128, 255, 0.4)' },
      'Quantum': { primary: '#8080FF', secondary: '#651FFF', shadow: 'rgba(128, 128, 255, 0.4)' },
      '허수': { primary: '#E6E600', secondary: '#FFD600', shadow: 'rgba(230, 214, 0, 0.4)' },
      'Imaginary': { primary: '#E6E600', secondary: '#FFD600', shadow: 'rgba(230, 214, 0, 0.4)' },
      '기류': { primary: '#00E676', secondary: '#00C853', shadow: 'rgba(0, 230, 118, 0.4)' },
      '전도': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '회절': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      'Spectro': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      '인멸': { primary: '#FF5252', secondary: '#D32F2F', shadow: 'rgba(255, 82, 82, 0.4)' },
      'Havoc': { primary: '#FF5252', secondary: '#D32F2F', shadow: 'rgba(255, 82, 82, 0.4)' },
      '용융': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '응결': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
      'Glacio': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
    };
    return ELEMENT_THEMES[char.attribute] || { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
  }, [char]);

  const specialTerms = useMemo(() => {
    if (!char) return GLOBAL_SPECIAL_TERMS;
    const terms = { ...(char.specialTerms || {}), ...GLOBAL_SPECIAL_TERMS };
    
    const allText = [
      char.briefInfo,
      ...(char.skills?.map((s: any) => s.description) || []),
      ...(char.eidolons?.map((e: any) => e.description) || []),
      ...(char.additionalAbilities?.map((a: any) => a.description) || []),
      ...(char.bonusAbilities?.map((a: any) => a.description) || [])
    ].join('\n');

    // Action Gauge Automation
    const gaugeRegex = /행동 게이지(?:가)?\s*\d+%?\s*증가/g;
    const gaugeMatches = allText.match(gaugeRegex);
    if (gaugeMatches) {
      gaugeMatches.forEach(match => {
        if (!terms[match]) {
          terms[match] = terms["행동 게이지 증가"] || "행동 게이지가 증가하여 행동 순서가 앞당겨진다.";
        }
      });
    }

    // Immediate Action Automation
    if (allText.includes("즉시 행동") && !terms["즉시 행동"]) {
        terms["즉시 행동"] = "행동 게이지가 100% 증가하여 즉시 턴을 획득한다.";
    }

    // Action Gauge Reduction Automation
    if (allText.includes("행동 게이지 감소") && !terms["행동 게이지 감소"]) {
        terms["행동 게이지 감소"] = "목표의 다음 행동 전 대기 간격을 연장한다.";
    }

    return terms;
  }, [char]);


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
    const processedText = text.replace(/\{F#([^}]*)\}=\{M#([^}]*)\}/g, (_, f, m) => gender === 'f' ? f : m);
    
    // Add protected terms that shouldn't be broken up (e.g., character names with numbers)
    const protectedTerms = ["Mar. 7th", "Mar. 7th (수렵)"]; 
    const sortedKeys = [...Object.keys(specialTerms), ...protectedTerms].sort((a, b) => b.length - a.length);
    
    // Construct regex
    const combinedRegex = new RegExp(`(${sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|[+-]?\\d+(?:\\.\\d+)?%?)`, 'g');
    
    return processedText.split(combinedRegex).map((part, i) => {
      // If part is in protectedTerms, it just falls through to plain text
      if (protectedTerms.includes(part)) return part;

      // Prioritize special terms (with tooltip)
      if (specialTerms[part]) {
        return (
          <span key={i} className="inline-flex border-b border-dashed cursor-help font-bold px-0.5" style={{ color: theme.primary, borderColor: `${theme.primary}80` }}
            onMouseEnter={(e) => { const r = e.currentTarget.getBoundingClientRect(); setTooltip({ text: specialTerms[part], x: r.left, y: r.top }); }}
            onMouseLeave={() => setTooltip(null)}>{part}</span>
        );
      }

      // Highlight numbers
      if (/^[+-]?\d+(?:\.\d+)?%?$/.test(part)) return <span key={i} className="font-black text-[#FFD600]">{part}</span>;
      
      return part;
    });
  };

  const getIllustrationUrl = () => {
    const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
    const base = char.gameId === 'hsr' 
      ? `${CDN_URL}/hsr images/캐릭터/${(char.folderName || char.name).normalize('NFC')}/`
      : `${CDN_URL}/ww images/characters/${(char.folderName || char.name).normalize('NFC')}/`;
    
    let fileName = 'art01.webp';
    if (char.isTrailblazer) {
      fileName = gender === 'f' ? "art01.webp" : "art01-01.webp";
    }
    
    const url = char.fixedUrl || `${base}${fileName}`;
    return encodeURI(url);
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

  const seoDescription = `${t(char.name)} ${t('상세 가이드: 최적의 유물,')} ${char.gameId === 'ww' ? t('무기') : t('광추')}, ${t('종결 스탯 및 육성 재료 세팅을 완벽 정리했습니다.')} ${char.gameId === 'ww' ? t('명조 (Wuthering Waves)') : t('붕괴: 스타레일')} ${t('게이머를 위한 최신 공략.')}`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep">
      <SEO 
        title={`${t(char.name)} ${t('캐릭터 공략 및 세팅 정보')}`} 
        description={seoDescription}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/character/${char.id}`}
        gameCategory={char.gameId === 'ww' ? t('명조 (Wuthering Waves)') : t('붕괴: 스타레일')}
        itemType={char.gameId === 'hsr' ? t(char.path) : t((char as any).weaponType)}
      />
      {/* Item Modal */}
      <ItemDetailModal 
        itemNameEn={selectedItem || ''} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />

      {/* Tooltip */}
      {tooltip && (
        <div className="fixed z-[100] max-w-[260px] bg-[#121212]/95 p-4 rounded-2xl border border-white/20 backdrop-blur-2xl shadow-2xl pointer-events-none"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y - 12}px`, transform: 'translateY(-100%)' }}>
          <p className="font-medium text-gray-200 text-xs leading-relaxed">{tooltip.text}</p>
        </div>
      )}

      {/* Page Header */}
      <PageHeader gameId={gameId} category={t("캐릭터")} title={t(char.name)} />

      <div className="max-w-[1200px] mx-auto px-6 pt-10 space-y-20">
        {/* Profile Header */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-y-12 lg:gap-x-12 items-start lg:items-end border-b border-white/5 pb-16">
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] max-w-xl mx-auto lg:max-w-none w-full aspect-[3/4.5]">
            <img 
              src={getIllustrationUrl()} 
              alt={char.name} 
              width="800"
              height="1200"
              style={{ imageRendering: 'auto' }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 text-transparent" 
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
          <div className="space-y-8 pb-4">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border backdrop-blur-md" style={{ backgroundColor: `${theme.primary}15`, color: theme.primary, borderColor: `${theme.primary}40` }}>{t(char.attribute)}</span>
                  <span className="bg-white/5 text-gray-400 px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border border-white/10">{char.gameId === 'hsr' ? t(char.path) : t(char.weaponType)}</span>
                </div>
                {/* AS Buff Toggle */}
                {rawChar?.hasASBuff && (
                  <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                    <button 
                      onClick={() => setIsASMode(false)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${!isASMode ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      <History size={12} /> {t('Original')}
                    </button>
                    <button 
                      onClick={() => setIsASMode(true)}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[11px] font-black transition-all ${isASMode ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-lg shadow-brand-primary/20' : 'text-gray-500 hover:text-gray-300'}`}
                    >
                      <RefreshCw size={12} className={isASMode ? "animate-spin-once" : ""} /> {t('AS Remake')}
                    </button>
                  </div>
                )}
              </div>
              
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-black text-white tracking-tighter italic leading-none">{t(char.name)}</h1>
              <div className="flex gap-2">{Array.from({ length: char.rarity }).map((_, i) => (<Star key={i} size={24} fill={theme.primary} style={{ color: theme.primary }} />))}</div>
            </div>
            
            <div className="glass-card p-8 rounded-[35px] border border-white/5 max-w-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
                  <div className="flex items-center gap-3">
                      <ShieldCheck size={20} style={{ color: theme.primary }} />
                      <h3 className="text-[12px] font-black text-white uppercase tracking-widest italic">{t("Combat Unit Profile")}</h3>
                  </div>
                  {char.isTrailblazer && (
                      <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                          <button onClick={() => setGender('m')} className={`px-6 py-2 rounded-lg text-[11px] font-black transition-all ${gender === 'm' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500'}`}>{t('남성')}</button>
                          <button onClick={() => setGender('f')} className={`px-6 py-2 rounded-lg text-[11px] font-black transition-all ${gender === 'f' ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500'}`}>{t('여성')}</button>
                      </div>
                  )}
              </div>
              <div className="text-gray-300 text-lg md:text-xl leading-relaxed italic bg-black/30 p-8 rounded-[25px] border border-white/5 shadow-inner whitespace-pre-line">
                {t(char.briefInfo || char.brief || '')}
              </div>

              {/* 캐릭터 공략 보기 버튼 추가 */}
              <Link 
                to={`/gallery/${gameId}/guide/${char.id}`}
                className="mt-8 inline-flex items-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-2xl font-black text-sm shadow-[0_20px_40px_rgba(var(--brand-primary),0.3)] hover:scale-105 transition-all group"
              >
                <BookOpen size={18} className="group-hover:rotate-12 transition-transform" />
                <span className="tracking-tight">{t(char.name)} {t('세팅 공략 보기')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 01 Metadata */}
        <section className="space-y-8">
          <SectionHeader num="01" title={t("캐릭터 메타데이터 & 기본 정보")} theme={theme} expanded={isMetadataExpanded} onToggle={() => setIsMetadataExpanded(!isMetadataExpanded)} />
          <div className={`overflow-hidden transition-all duration-500 ${isMetadataExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="glass-card rounded-[40px] border border-white/5 p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                <MetadataRow label={char.gameId === 'hsr' ? t("운명의 길") : t("무기 유형")} value={t(char.gameId === 'hsr' ? char.path : char.weaponType) || ''} />
                <MetadataRow label={t("소속")} value={t(char.affiliation || 'Unknown')} />
                <MetadataRow label={t("버전")} value={`v${char.releaseVersion || '1.0'}`} />
                <div className="space-y-4 py-6 border-b border-white/5">
                  <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest block">{t("Voice Registry")}</span>
                  <div className="flex flex-wrap gap-5 text-[15px] font-black text-gray-300">
                    {char.voiceActors?.split('/').map((n: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5"><Flag code={['kr', 'us', 'cn', 'jp'][i] || 'un'} /> {t(n.trim())}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Basic Stats */}
        <section className="space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <SectionHeader num="02" title={t("기본 스탯")} theme={theme} />
            <div className="glass-card p-8 rounded-[35px] border border-white/10 min-w-[340px]">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("Synchronized Level")}</span>
                <span className="font-black text-3xl italic" style={{ color: theme.primary }}>Lv. {currentLevel}</span>
              </div>
              <input 
                type="range" 
                id="level-slider"
                name="level-slider"
                min="0" 
                max="7" 
                value={levelIdx} 
                onChange={(e) => setLevelIdx(parseInt(e.target.value))} 
                className="w-full h-2.5 bg-white/10 rounded-full appearance-none cursor-pointer" 
                style={{ accentColor: theme.primary }} 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-10 py-16 border-y border-white/10 text-center">
            <StatCard label={t("기초 HP")} value={calculateStat('hp')} />
            <StatCard label={t("기초 공격력")} value={calculateStat('atk')} />
            <StatCard label={t("기초 방어력")} value={calculateStat('def')} />
            <StatCard label={t("속도")} value={char.baseStats?.speed || 0} />
            <StatCard label={t("도발")} value={char.baseStats?.taunt || 0} />
            <StatCard label={t("에너지")} value={char.baseStats?.energy || 0} />
          </div>
        </section>

        {/* 03 Materials */}
        <section className="space-y-8">
          <SectionHeader num="03" title={t("육성 재료")} theme={theme} />
          <div className="flex flex-col gap-10">
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
                 <div className="flex items-center gap-4"><Package size={22} className="text-gray-500" /><span className="text-xl font-black uppercase tracking-tighter italic">{t("승급 재료")}</span></div>
                 <button onClick={handleCopyMaterials} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all">
                   {isCopied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                   {isCopied ? t('복사 완료!') : t('재료 리스트 복사')}
                 </button>
               </div>
               <div className="flex flex-wrap justify-center gap-8">
                  {char.materials_v2?.ascension?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('No data yet.')}</p>}
               </div>
            </div>
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6"><Sparkles size={22} className="text-gray-500" /><span className="text-xl font-black uppercase tracking-tighter italic">{t("행적 재료")}</span></div>
               <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 -mx-10 px-10 scrollbar-hide items-start">
                  {char.materials_v2?.traces?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('No data yet.')}</p>}
                  <div className="w-8 shrink-0" />
               </div>
            </div>
          </div>
        </section>
        
        <SkillAndEidolonSection 
          char={char} 
          gender={gender} 
          setGender={setGender}
          theme={theme} 
          renderContent={renderTextWithHighlights} 
          setTooltip={setTooltip}
        />
        
        <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
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
      <h2 className="text-2xl md:text-3xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">{title}</h2>
    </div>
    {onToggle && (<button onClick={onToggle} className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all">{expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</button>)}
  </div>
);

const MetadataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-center justify-between py-8 border-b border-white/5 group hover:bg-white/[0.02] px-4 transition-colors">
    <span className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em]">{label}</span>
    <span className="text-2xl font-black text-gray-100 group-hover:text-white transition-colors">{value}</span>
  </div>
);

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="space-y-4 group">
    <div className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover:text-gray-400 transition-colors">{label}</div>
    <div className="text-3xl font-black tabular-nums text-white group-hover:text-brand-accent transition-all">{value}</div>
  </div>
);

export default CharacterDetail;
