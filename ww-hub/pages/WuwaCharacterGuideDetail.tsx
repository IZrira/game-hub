import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion, AnimatePresence, useMotionValue } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Zap, 
  Star, 
  Info, 
  Sparkles,
  Layers,
  Box,
  TrendingUp,
  Clock,
  Crown,
  Target,
  Dna,
  ShieldCheck,
  MousePointer2,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users,
  Swords,
  Activity,
  Infinity,
  MessageSquareWarning
} from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import TableOfContents from '../../common-hub/components/TableOfContents';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import FeedbackReportModal from '../../common-hub/components/FeedbackReportModal';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../../common-hub/data/dataManager';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images';

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const getCharacterImage = (folderName: string, isRover?: boolean) => {
  let mappedFolderName = folderName;
  if (isRover && mappedFolderName === '방랑자 · 전도') {
    mappedFolderName = '방랑자 · 회절';
  }
  const safeFolder = encodeURIComponent(mappedFolderName.normalize('NFC'));
  if (isRover) {
    return `${BASE_IMAGE_URL}/skills/${safeFolder}/${encodeURIComponent(mappedFolderName.normalize('NFC') + '(여)')}.webp`;
  }
  return `${BASE_IMAGE_URL}/skills/${safeFolder}/${safeFolder}.webp`;
};

const getWeaponImage = (weaponName: string) => {
  return `${BASE_IMAGE_URL}/Weapons/${encodeURIComponent(weaponName.normalize('NFC'))}.webp`;
};

const getEchoImage = (echoName: string) => {
  return `${BASE_IMAGE_URL}/Echo/${encodeURIComponent(echoName.normalize('NFC'))}.webp`;
};

const SectionHeader: React.FC<{ num: string; title: string; theme: any }> = ({ num, title, theme }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-6 px-4">
      <div 
        className="flex items-center justify-center w-12 h-12 rounded-[22px] border-2 font-black text-lg shadow-lg" 
        style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}
      >
        {num}
      </div>
      <h2 className="text-2xl font-black text-white tracking-tight uppercase border-l-4 border-white/10 pl-6 leading-none py-1.5 italic">
        {t(title, { keySeparator: false, nsSeparator: false })}
      </h2>
    </div>
  );
};

const StatBoxPremium: React.FC<{ 
  label: string; 
  value: string; 
  note?: string; 
  theme: any; 
  iconImage?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave?: () => void;
}> = ({ label, value, note, theme, iconImage, onMouseEnter, onMouseMove, onMouseLeave }) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(iconImage);
  
  useEffect(() => {
    setImgUrl(iconImage);
  }, [iconImage]);

  const processedValues = useMemo(() => {
    if (!value) return [];
    return value.split(/\s+or\s+|\s*\/\s*/i).map(v => v.trim());
  }, [value]);

  const renderValue = (val: string) => {
    const parts = val.split(/(\d+(?:\.\d+)?%?)/g);
    return (
      <div className="flex items-center gap-1.5 justify-center">
        {parts.map((part, i) => {
          if (/^\d+(?:\.\d+)?%?$/.test(part)) {
            return <span key={i} className="text-xl font-black text-[#FFD600] tabular-nums leading-none">{part}</span>;
          }
          return part ? <span key={i} className="text-[11px] font-black text-gray-400 uppercase tracking-tight mt-1 whitespace-nowrap">{part}</span> : null;
        })}
      </div>
    );
  };

  return (
    <div 
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group glass-card rounded-[32px] p-6 border border-white/5 hover:border-brand-primary/30 transition-all bg-gradient-to-br from-white/[0.05] to-transparent flex flex-col items-center text-center gap-4 h-full relative overflow-hidden"
    >
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 blur-3xl rounded-full group-hover:bg-brand-primary/10 transition-colors" />
      
      {imgUrl ? (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/5 group-hover:border-brand-primary/20 relative z-10">
          <img 
            src={imgUrl} 
            alt={label} 
            className="w-full h-full object-contain filter drop-shadow-md" 
            onError={() => setImgUrl(undefined)}
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] flex items-center justify-center border border-white/5 relative z-10 shadow-inner group-hover:border-brand-primary/30 transition-colors">
          <div className="flex flex-col items-center justify-center">
            {label.includes('4 Cost') && <Crown size={24} className="text-[#FFD600] drop-shadow-[0_0_8px_rgba(255,214,0,0.5)]" />}
            {label.includes('3 Cost') && <Swords size={24} className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />}
            {label.includes('1 Cost') && <Box size={24} className="text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />}
            {!label.includes('Cost') && <span className="text-gray-600 font-black text-xl uppercase opacity-40">{label.slice(0, 1)}</span>}
          </div>
        </div>
      )}
      
      <div className="space-y-3 w-full relative z-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest whitespace-nowrap">{t(label, { keySeparator: false, nsSeparator: false })}</span>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          {processedValues.map((v, i) => (
            <div key={i} className="relative w-full py-2.5 px-3 bg-white/[0.03] rounded-2xl border border-white/5 group-hover:bg-white/[0.08] transition-colors overflow-hidden">
              {processedValues.length > 1 && (
                <div className={`absolute top-0 left-0 w-1 h-full ${i === 0 ? 'bg-brand-primary' : 'bg-gray-700'}`} />
              )}
              {renderValue(v)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const WuwaCharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tooltipRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredItem, setHoveredItem] = useState<{ name: string; description: string; type: string; } | null>(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const { CHARACTER_DB, WEAPON_DB, ECHO_DB, GUIDES } = useMemo(() => getGameData('ww'), []);

  const character = useMemo(() => {
    return CHARACTER_DB.find((c: any) => c.id === charName || normalizeName(c.name) === normalizeName(charName || ''));
  }, [CHARACTER_DB, charName]);

  const guide = useMemo(() => {
    return GUIDES?.find((g: any) => g.id === charName || g.id === character?.id);
  }, [GUIDES, charName, character]);

  const currentVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.variants && guide.variants.length > 0) {
      return guide.variants[selectedVariantIndex];
    }
    return {
      name: "기본",
      echoSets: guide.echoSets,
      mainEchoes: guide.mainEchoes || (guide.mainEcho ? [guide.mainEcho] : []),
    };
  }, [guide, selectedVariantIndex]);

  const theme = useMemo(() => {
    if (!character) return { primary: '#4ADE80', secondary: '#22C55E', shadow: 'rgba(74, 222, 128, 0.4)' };
    const ELEMENT_THEMES: Record<string, { primary: string, secondary: string, shadow: string }> = {
      '기류': { primary: '#00E676', secondary: '#00C853', shadow: 'rgba(0, 230, 118, 0.4)' },
      'Aero': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '전도': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      'Electro': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '회절': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      'Spectro': { primary: '#FFF176', secondary: '#FBC02D', shadow: 'rgba(255, 241, 118, 0.4)' },
      '인멸': { primary: '#F472B6', secondary: '#EC4899', shadow: 'rgba(244, 114, 182, 0.4)' },
      'Havoc': { primary: '#F472B6', secondary: '#EC4899', shadow: 'rgba(244, 114, 182, 0.4)' },
      '용융': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      'Fusion': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '응결': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
      'Glacio': { primary: '#3D8CFF', secondary: '#1E88E5', shadow: 'rgba(61, 140, 255, 0.4)' },
    };
    return ELEMENT_THEMES[character?.attribute] || { primary: '#4ADE80', secondary: '#22C55E', shadow: 'rgba(74, 222, 128, 0.4)' };
  }, [character]);

  const updateTooltipPosition = (x: number, y: number) => {
    const left = Math.min(x + 20, window.innerWidth - 340);
    const top = Math.min(y + 20, window.innerHeight - 200);
    mouseX.set(left);
    mouseY.set(top);
  };

  const handleMouseEnter = (e: React.MouseEvent, name: string, type: string, note?: string) => {
    if (!note) return;
    const isJustRank = /^[1-9]순위$/.test(note.trim());
    if (isJustRank) return;

    updateTooltipPosition(e.clientX, e.clientY);
    setHoveredItem({ name, description: note, type: t(type) });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateTooltipPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  if (!character || !guide) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center space-y-6">
        <Info size={40} className="text-gray-700 mb-6" />
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black tracking-widest uppercase">공략을 찾을 수 없습니다</h2>
          <p className="text-sm text-gray-500 mb-8">해당 캐릭터의 상세 공략 데이터가 아직 등록되지 않았습니다.</p>
        </div>
        <Link to={`/gallery/ww`} className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all">
          <ChevronLeft size={16} /> 도감으로 돌아가기
        </Link>
      </div>
    );
  }

  const heroImageUrl = getCharacterImage(character.folderName, character.isRover);
  const lastUpdatedDate = guide.patchVersion ? `v${guide.patchVersion}` : '2026-05-23';

  const faqData = [
    {
      question: `${character.name}의 추천 무기는 무엇인가요?`,
      answer: `${character.name}에게 가장 추천하는 무기는 "${guide.weapons[0]?.name}"입니다. 그 외에도 ${guide.weapons.slice(1, 4).map((w: any) => w.name).join(', ')} 등을 활용할 수 있습니다.`
    },
    {
      question: `${character.name}의 추천 에코 세트는 무엇인가요?`,
      answer: `${character.name}의 추천 에코 세트는 "${currentVariant?.echoSets?.[0]?.name}"입니다. 메인 에코로는 "${currentVariant?.mainEchoes?.[0]?.name}"을 추천합니다.`
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title={`${t(character.name)} 세팅 가이드`}
        description={`${t(character.name)}의 추천 무기, 에코, 파티 조합 등 종결 세팅 가이드를 확인하세요.`}
        image={heroImageUrl}
        url={`/gallery/ww/character/${charName}/guide`}
        gameCategory={t('명조 (Wuthering Waves)')}
        itemType={t('세팅 가이드')}
        faqData={faqData}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: `/gallery/ww` },
          { name: t('캐릭터'), url: `/gallery/ww?menu=캐릭터` },
          { name: t(character.name), url: `/gallery/ww/character/${character.id}` },
          { name: t('세팅 가이드'), url: `/gallery/ww/character/${character.id}/guide` }
        ]}
      />
      
      <AnimatePresence>
        {hoveredItem && (
            <motion.div
              ref={tooltipRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="fixed z-[100] pointer-events-none w-max max-w-[320px] p-4 bg-[#1a1a1a]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl top-0 left-0"
              style={{ 
                x: mouseX,
                y: mouseY,
                willChange: 'transform'
              }}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest whitespace-nowrap block">{hoveredItem.type}</span>
                <h4 className="text-sm font-black text-white whitespace-nowrap">{t(hoveredItem.name)}</h4>
                <div className="h-px bg-white/5" />
                <p className="text-[11px] text-gray-400 leading-relaxed whitespace-pre-wrap">{t(hoveredItem.description)}</p>
              </div>
            </motion.div>
        )}
      </AnimatePresence>

      <PageHeader 
        gameId="ww"
        title={`${t(character.name)} 가이드`} 
        category="공략" 
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-12 justify-between">
        <div className="flex-1 w-full space-y-16 guide-content">
          
          <Link 
            to={`/gallery/ww/character/${character.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-sm font-black text-gray-300 hover:text-white transition-all backdrop-blur-md group w-fit"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t('캐릭터 상세 정보로 돌아가기')}
          </Link>

          {/* Hero Section */}
          <section className="relative p-12 md:p-16 rounded-[60px] bg-[#0c0c0c] border border-white/5 overflow-hidden group">
            <div 
              style={{ backgroundImage: `url(${heroImageUrl})`, filter: 'brightness(0.3) blur(20px)', opacity: 0.2 }} 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-10 right-10 flex flex-col items-end gap-1.5 z-20">
              <div className="flex items-center gap-2 px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                <Sparkles size={12} className="text-brand-accent" />
                <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">{lastUpdatedDate}</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
              <div className="relative shrink-0">
                <div className="w-40 h-40 rounded-[50px] border-4 border-white/10 overflow-hidden shadow-2xl relative z-10 bg-black/40">
                  <img src={heroImageUrl} alt={character.name} className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              </div>
              <div className="text-center md:text-left space-y-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-gray-400">{t(character.weaponType || '')}</span>
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.primary}20`, color: theme.secondary, border: `1px solid ${theme.primary}40` }}>{t(character.attribute)}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none whitespace-nowrap">
                  {t(character.name)} <span className="text-brand-accent">가이드</span>
                </h1>
                <p className="text-gray-500 font-bold text-base md:text-lg border-l-4 border-brand-primary/40 pl-6">{t('최적의 성능을 위한 무기와 에코 세팅 데이터입니다.')}</p>
              </div>
            </div>
          </section>

          {/* 01 추천 무기 */}
          <section id="추천 무기" className="space-y-10">
            <SectionHeader num="01" title="추천 무기" theme={theme} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {guide.weapons.map((w: any, i: number) => {
                const weaponUrl = getWeaponImage(w.name);
                const isBest = w.rank === 1;

                return (
                  <Link 
                    key={i} 
                    to={`/gallery/ww/weapon/${encodeURIComponent(w.name)}`}
                    onMouseEnter={(e) => handleMouseEnter(e, w.name, '추천 무기', w.note)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={`group glass-card rounded-[32px] p-4 pt-6 flex flex-col items-center gap-4 hover:bg-white/[0.04] transition-all duration-500 text-center relative overflow-hidden ${
                      isBest 
                        ? 'border-2 border-brand-accent shadow-[0_0_50px_rgba(255,214,0,0.15)] hover:shadow-[0_0_80px_rgba(255,214,0,0.3)] scale-[1.02] hover:scale-105 z-10 bg-brand-primary/5' 
                        : 'border border-white/5 hover:border-brand-primary/30'
                    }`}
                  >
                    {isBest && (
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-brand-accent to-transparent z-20" />
                    )}
                    <div className={`absolute top-0 left-0 z-20 px-3 py-1.5 rounded-br-[20px] text-[10px] font-black ${isBest ? 'bg-brand-accent text-black shadow-lg' : 'bg-white/10 text-gray-300 backdrop-blur-md'} uppercase tracking-widest`}>
                      {w.rank}순위
                    </div>
                    {isBest && (
                      <div className="absolute top-2 right-2 z-20 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-brand-accent/30 shadow-lg">
                        <Crown size={12} className="text-brand-accent" />
                      </div>
                    )}
                    <div className={`w-full aspect-[3/4] rounded-2xl ${isBest ? 'bg-gradient-to-b from-brand-primary/20 to-black/60' : 'bg-black/40'} flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative shadow-inner`}>
                      <img src={weaponUrl} alt={w.name} className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <h4 className={`text-[11px] md:text-[12px] font-black ${isBest ? 'text-brand-accent' : 'text-white'} group-hover:text-brand-accent transition-colors truncate w-full text-center leading-tight tracking-tighter px-1`}>{t(w.name)}</h4>
                      {isBest && (
                        <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">{t('추천 선택')}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 02 추천 에코 (장비) */}
          <section id="추천 에코" className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <SectionHeader num="02" title="추천 에코 세트" theme={theme} />
              {guide.variants && guide.variants.length > 1 && (
                <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/10 mx-4 shrink-0">
                  {guide.variants.map((v: any, idx: number) => {
                    const primarySetFullName = v.echoSets && v.echoSets[0] ? (v.echoSets[0].name || v.echoSets[0]) : '';
                    const primarySetName = typeof primarySetFullName === 'string' ? primarySetFullName.replace(/\s?\d+세트/g, '').trim() : '';
                    const setImgUrl = primarySetName ? `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(primarySetName.normalize('NFC'))}.webp` : '';
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedVariantIndex(idx)} 
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedVariantIndex === idx ? 'bg-brand-primary text-white shadow-xl' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                      >
                        {setImgUrl && (
                          <img src={setImgUrl} alt={primarySetName} className={`w-4 h-4 object-contain ${selectedVariantIndex !== idx && 'opacity-60 grayscale'}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
                        )}
                        {v.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8">
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Layers size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('화음 세트')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentVariant?.echoSets.map((set: any, i: number) => {
                    const isFirst = i === 0;
                    const setFullName = set.name || set; // 객체이거나 문자열일 경우 처리
                    const note = set.note || '';
                    const setName = setFullName.replace(/\s?\d+세트/g, '').trim();
                    const setImgUrl = `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(setName.normalize('NFC'))}.webp`;

                    return (
                      <div key={i} onMouseEnter={(e) => handleMouseEnter(e, setFullName, '에코 세트', note)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`flex items-center gap-4 p-4 rounded-3xl transition-all group overflow-hidden relative ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}>
                        {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1">
                          <img src={setImgUrl} alt={setName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                        </div>
                        <div className="flex flex-col gap-1 w-full z-10">
                          <div className="flex items-center justify-between w-full">
                            <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors">{t(setFullName)}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                              {i + 1}순위
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-[45px] p-10 border border-brand-primary/20 bg-brand-primary/[0.02] space-y-8 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors duration-700" />
                <div className="flex items-center gap-4 border-b border-white/5 pb-6 relative z-10">
                  <Target size={22} className="text-brand-primary" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('추천 메인 에코')}</span>
                </div>
                <div className="flex flex-col gap-8 relative z-10">
                  {currentVariant?.mainEchoes.map((me: any, idx: number) => (
                    <div key={idx} className="flex flex-col md:flex-row items-center gap-8 bg-black/20 p-6 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-colors">
                      <div className="w-24 h-24 rounded-full border border-brand-primary/30 p-2 bg-black/40 shrink-0">
                        <img src={getEchoImage(me.name)} alt={me.name} className="w-full h-full object-cover rounded-full" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                      </div>
                      <div className="space-y-4 text-center md:text-left">
                        <h4 className="text-xl font-black text-white">{t(me.name)}</h4>
                        {me.reason && <p className="text-sm text-gray-400 leading-relaxed font-medium">{t(me.reason)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 03 권장 스탯 */}
          <section id="권장 스텟" className="space-y-10">
            <SectionHeader num="03" title="권장 스텟" theme={theme} />
            <div className="flex flex-col gap-8">
              {/* Target Stats Section (Top) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent shadow-xl">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Target size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('목표 스탯')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {guide.targetStats.map((s: any, i: number) => (
                    <div 
                      key={i} 
                      className="flex items-center justify-between p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-brand-primary/20 transition-all group relative flex-col gap-2"
                    >
                      <div className="flex items-center gap-1.5 w-full justify-center">
                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-200 transition-colors whitespace-nowrap">{t(s.label)}</span>
                      </div>
                      <div className="flex flex-col items-center w-full">
                        <span className="text-lg font-black text-brand-accent italic tabular-nums whitespace-nowrap">{t(s.value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main & Sub Stats Section (Bottom) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-gray-500" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('에코 주옵션 & 부옵션')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(currentVariant?.mainStats && currentVariant.mainStats.length > 0 ? currentVariant.mainStats : guide.mainStats).map((ms: any, i: number) => (
                    <StatBoxPremium 
                      key={i} 
                      label={`${ms.cost} Cost`} 
                      value={ms.stats.map((x: string) => t(x)).join(' or ')} 
                      theme={theme} 
                      note={ms.note}
                      onMouseEnter={(e) => handleMouseEnter(e, `${ms.cost} Cost 주옵션`, '주옵션', ms.note)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <TrendingUp size={48} />
                  </div>
                  <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    {t('부옵션 우선순위')}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {guide.subStats.map((s: string, i: number) => (
                      <span key={i} className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-base font-bold text-gray-200 italic group hover:text-brand-accent transition-all hover:translate-y-[-2px] hover:shadow-lg whitespace-nowrap">
                        <span className="text-brand-accent mr-2 font-black"># {i + 1}</span>{t(s)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 04 스킬 및 시너지 */}
          <section id="스킬 및 시너지" className="space-y-10">
            <SectionHeader num="04" title="스킬 및 시너지 캐릭터" theme={theme} />
            
            <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent mb-8">
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Activity size={22} className="text-gray-500" />
                <span className="text-xl font-black uppercase tracking-tighter italic">{t('스킬 레벨업 우선순위')}</span>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                {guide.skillPriority.map((skill: string, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="px-6 py-3 bg-brand-primary/10 border border-brand-primary/30 rounded-2xl text-sm font-black text-brand-accent">
                      {t(skill)}
                    </div>
                    {idx < guide.skillPriority.length - 1 && <ChevronRight size={20} className="text-gray-600" />}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {guide.isUniversalSynergy ? (
              <div className="glass-card rounded-[45px] p-10 md:p-12 border border-brand-primary/20 bg-brand-primary/[0.02] shadow-2xl flex flex-col md:flex-row items-center gap-8 group overflow-hidden relative">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors duration-700" />
                <div className="w-20 h-20 rounded-3xl bg-black/40 flex items-center justify-center border border-brand-primary/30 shrink-0 shadow-[0_0_30px_rgba(74,222,128,0.15)] group-hover:scale-110 transition-transform duration-500 z-10">
                  <Infinity size={40} className="text-brand-accent" />
                </div>
                <div className="space-y-3 text-center md:text-left z-10">
                  <h4 className="text-xl font-black text-white flex items-center justify-center md:justify-start gap-2">
                    <span className="text-brand-accent">✨</span> {t('범용 파티 시너지')}
                  </h4>
                  <p className="text-[15px] font-medium text-gray-400 leading-relaxed max-w-2xl">
                    {t('회복 및 서포팅 능력이 뛰어나 특정 딜러에 국한되지 않습니다. 파티의 생존력과 전투 지속력을 높이기 위해 ')}
                    <strong className="text-brand-accent font-black">{t('어떤 파티 조합이든 마지막 3번째 자리에 자유롭게 편성')}</strong>
                    {t('하여 활용할 수 있습니다.')}
                  </p>
                </div>
              </div>
            ) : guide.synergyCharacters && guide.synergyCharacters.length > 0 ? (
              <div className="glass-card rounded-[45px] p-10 md:p-12 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
                <div className="flex flex-wrap gap-8">
                  {guide.synergyCharacters.map((member: string, idx: number) => {
                    const memberChar = CHARACTER_DB.find((c: any) => normalizeName(t(c.name)) === normalizeName(t(member)) || normalizeName(c.folderName) === normalizeName(t(member)));
                    const memberImg = memberChar ? getCharacterImage(memberChar.folderName, memberChar.isRover) : '';
                    
                    return (
                      <Link 
                        key={idx}
                        to={`/gallery/ww/character/${memberChar?.id || member}`}
                        className="flex flex-col items-center gap-4 group/member w-[100px]"
                      >
                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                           <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover/member:opacity-100 transition-opacity" />
                           <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-accent transition-all duration-300 p-1 bg-black/40 shadow-xl">
                              <img src={memberImg} alt={member} className="w-full h-full object-cover rounded-full group-hover/member:scale-110 transition-transform duration-500" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                           </div>
                        </div>
                        <div className="text-center space-y-1">
                          <div className="text-sm font-black text-gray-300 group-hover/member:text-brand-accent transition-colors whitespace-nowrap">{t(member)}</div>
                          {memberChar?.roles?.[0] && (
                            <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">{t(memberChar.roles[0].label)}</div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </section>

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
                {t('이 분석 리포트는 게임 데이터 분석과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다.')}
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                onClick={() => setIsFeedbackModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 hover:border-brand-primary/50 transition-all uppercase tracking-widest"
              >
                <MessageSquareWarning size={14} />
                {t('데이터 오류 제보')}
              </button>
            </div>
          </section>
        </div>

        <FeedbackReportModal 
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          contextData={{
            gameId,
            targetId: character?.id || charName,
            targetName: character?.name || charName,
            type: 'guide'
          }}
        />

        {/* Sidebar / TOC */}
        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-32 h-fit space-y-8">
          <TableOfContents selector=".guide-content" />
          <AdPlaceholder type="rectangle" />
        </aside>
      </div>
    </div>
  );
};

export default WuwaCharacterGuideDetail;
