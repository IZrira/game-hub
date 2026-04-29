
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
import ItemIcon from '../../common-hub/components/ItemIcon';
import ItemDetailModal from '../../common-hub/components/ItemDetailModal';
import WuwaSkillSection from '../components/WuwaSkillSection';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import { WuwaCharacter } from '../types';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80];

const Flag: React.FC<{ code: string }> = ({ code }) => (
  <img src={`https://flagcdn.com/w20/${code}.png`} alt={code} className="inline-block w-4 h-3 object-cover rounded-sm mr-1.5" />
);

const CharacterDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  
  const { CHARACTER_DB } = useMemo(() => getGameData(currentLang), [currentLang]);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(false); // Default collapsed
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);   // New: Profile toggle
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
      '기류': { primary: '#00E676', secondary: '#00C853', shadow: 'rgba(0, 230, 118, 0.4)' },
      'Aero': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '전도': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      'Electro': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '회절': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      'Spectro': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      '인멸': { primary: '#FF5252', secondary: '#D32F2F', shadow: 'rgba(255, 82, 82, 0.4)' },
      'Havoc': { primary: '#FF5252', secondary: '#D32F2F', shadow: 'rgba(255, 82, 82, 0.4)' },
      '융융': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      'Fusion': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '응결': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
      'Glacio': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
    };
    return ELEMENT_THEMES[char.attribute] || { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
  }, [char]);

  const specialTerms = useMemo(() => {
    return {};
  }, []);


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
    const base = `${CDN_URL}/ww images/characters/${(char.folderName || char.name).normalize('NFC')}/`;
    
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

  const seoDescription = `${t(char.name)} ${t('상세 가이드: 최적의 세팅 정보를 완벽 정리했습니다.')} ${t('명조 (Wuthering Waves)')} ${t('게이머를 위한 최신 공략.')}`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep">
      <SEO 
        title={`${t(char.name)} ${t('캐릭터 공략 및 세팅 정보')}`} 
        description={seoDescription}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/character/${char.id}`}
        gameCategory={t('명조 (Wuthering Waves)')}
        itemType={t((char as any).weaponType)}
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

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-6">
        {/* Profile Header: Image & Consolidated Info */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-8 items-start border-b border-white/5 pb-8">
          
          {/* Left: Image with Integrated Info Overlay */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.5]">
            <img 
              src={getIllustrationUrl()} 
              alt={char.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  {t((char as any).weaponType || '')} | {t(char.attribute)}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg">
                  {t(char.name)}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: char.rarity }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_12px_rgba(var(--theme-primary-rgb),0.6)]" />
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
            
            {/* 01. Active Controls (Gender / Links) */}
            <div className="flex flex-wrap items-center gap-3 px-2">
              {char.isTrailblazer && (
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button onClick={() => setGender('m')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'm' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>{t('남성')}</button>
                  <button onClick={() => setGender('f')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'f' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>{t('여성')}</button>
                </div>
              )}
              <Link to={`/gallery/${gameId}/character/${char.id}/guide`} className="flex items-center gap-3 bg-brand-primary text-white px-6 py-2 rounded-xl text-[10px] font-black shadow-lg hover:scale-105 transition-transform group">
                <BookOpen size={12} className="group-hover:rotate-12 transition-transform" />
                <span className="tracking-tight">{t('공략 바로가기')}</span>
              </Link>
              
              <div className="flex items-center gap-2 ml-auto">
                 <button onClick={handleShare} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"><Share2 size={14} /></button>
                 <button onClick={handleDownloadImage} className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"><Download size={14} /></button>
              </div>
            </div>

            {/* 02. Level Slider & Visual Stats Card */}
            <div className="glass-card p-6 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black italic opacity-20" style={{ color: theme.primary }}>01</span>
                  <h2 className="text-[11px] font-black uppercase tracking-widest text-gray-500">{t('성장')}</h2>
                </div>
                <div className="flex flex-col gap-1.5 min-w-[280px] relative pt-6">
                  {/* Floating Level Label */}
                  <div 
                    className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-brand-primary text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg"
                    style={{ 
                      left: `${(levelIdx / 7) * 100}%`,
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 10px ${theme.primary}40`
                    }}
                  >
                    Lv.{currentLevel}
                  </div>
                  <input type="range" min="0" max="7" value={levelIdx} onChange={(e) => setLevelIdx(parseInt(e.target.value))} className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer" style={{ accentColor: theme.primary }} />
                  <div className="flex justify-between text-[9px] font-black uppercase text-gray-400 px-0.5">
                    <span>1</span>
                    <span>80</span>
                  </div>
                </div>
              </div>

              {/* Grid Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard label={t("기초 HP")} value={calculateStat('hp')} />
                <StatCard label={t("기초 공격력")} value={calculateStat('atk')} />
                <StatCard label={t("기초 방어력")} value={calculateStat('def')} />
                <StatCard label={t("속도")} value={char.baseStats?.speed || 0} />
                <StatCard label={t("도발")} value={char.baseStats?.taunt || 0} />
                <StatCard label={t("에너지")} value={char.baseStats?.energy || 0} />
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

        {/* 01 Metadata */}
        <section className="space-y-8">
          <SectionHeader num="01" title={t("캐릭터 메타데이터 & 기본 정보")} theme={theme} expanded={isMetadataExpanded} onToggle={() => setIsMetadataExpanded(!isMetadataExpanded)} />
          <div className={`overflow-hidden transition-all duration-500 ${isMetadataExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="glass-card rounded-[40px] border border-white/5 p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
                <MetadataRow label={t("무기 유형")} value={t((char as any).weaponType) || ''} />
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
            <div className="glass-card p-8 rounded-[35px] border border-white/10 min-w-[340px] relative pt-12">
              <div className="absolute top-4 left-8 right-8 flex items-center justify-between pointer-events-none">
                 <span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("Synchronized Level")}</span>
              </div>
              {/* Floating Level Label */}
              <div 
                className="absolute top-8 -translate-x-1/2 px-3 py-1 bg-brand-primary text-black font-black italic text-xs rounded pointer-events-none transition-all duration-75 shadow-lg z-10"
                style={{ 
                  left: `${8 + (levelIdx / 7) * (100 - 16)}%`, // Padding compensated
                  backgroundColor: theme.primary,
                  boxShadow: `0 0 15px ${theme.primary}60`
                }}
              >
                Lv.{currentLevel}
              </div>
              <input 
                type="range" 
                id="level-slider"
                name="level-slider"
                min="0" 
                max="7" 
                value={levelIdx} 
                onChange={(e) => setLevelIdx(parseInt(e.target.value))} 
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer" 
                style={{ accentColor: theme.primary }} 
              />
              <div className="flex justify-between text-[10px] font-black text-gray-600 mt-2 px-1">
                <span>1</span>
                <span>80</span>
              </div>
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
               <div className="flex flex-wrap justify-center gap-8 px-4">
                  {char.materials_v2?.ascension?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('No data yet.')}</p>}
               </div>
            </div>
            <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
               <div className="flex items-center gap-4 border-b border-white/5 pb-6"><Sparkles size={22} className="text-gray-500" /><span className="text-xl font-black uppercase tracking-tighter italic">{t("행적 재료")}</span></div>
               <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 -mx-10 px-10 scrollbar-hide items-start">
                  {char.materials_v2?.traces?.map((m: any, i: number) => (<ItemIcon key={i} name={m.name} count={m.count} onClick={() => setSelectedItem(m.name)} />)) || <p className="text-gray-700 italic">{t('No data yet.')}</p>}
               </div>
            </div>
          </div>
        </section>
        
        <WuwaSkillSection 
          char={char} 
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
