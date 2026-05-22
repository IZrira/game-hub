import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShieldCheck, ChevronDown, ChevronUp, Package, Info, Copy, CheckCircle2 } from 'lucide-react';
import { WEAPON_DATA } from '../data/weapons';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import { renderRichText, formatDescriptionByRank } from '../data/formatter';
import { useTranslation } from 'react-i18next';
import { Compass, Zap, MapPin, History, Globe, Shield } from 'lucide-react';
import ItemIcon from '../../common-hub/components/ItemIcon';
import ItemDetailModal from '../../common-hub/components/ItemDetailModal';

const LEVEL_STEPS = [1, 20, 40, 50, 60, 70, 80, 90];

const VERSION_UPDATES: Record<string, string> = {
  "1.0": "2024-05-23",
  "1.1": "2024-06-28",
  "1.2": "2024-08-15",
  "1.3": "2024-09-29",
  "1.4": "2024-11-14",
  "1.5": "2024-12-26",
  "2.0": "2025-01-02",
  "2.1": "2025-02-13",
  "2.2": "2025-03-27",
  "2.3": "2025-05-08",
  "2.4": "2025-06-19",
  "2.5": "2025-07-31",
  "2.6": "2025-10-12",
  "3.0": "2025-11-20",
  "3.1": "2026-01-01",
  "3.2": "2026-02-12",
  "3.3": "2026-05-23",
};


const ATK_SCALING_RATIOS: Record<number, number> = {
  1: 0.0800,
  20: 0.2078,
  40: 0.3952,
  50: 0.5162,
  60: 0.6371,
  70: 0.7581,
  80: 0.8790,
  90: 1.0000,
};

const SUBSTAT_SCALING_RATIOS: Record<number, number> = {
  1: 0.2222,
  20: 0.3882,
  40: 0.5631,
  50: 0.6505,
  60: 0.7379,
  70: 0.8253,
  80: 0.9128,
  90: 1.0000,
};

function getWwWeaponStatsForLevel(
  baseAtk: number,
  subStatValue: string,
  level: number,
  name?: string
) {
  if (name === "서린 불꽃" || name === "위조된 작은별") {
    const customStats: Record<number, { atk: number; sub: string }> = {
      1: { atk: 40, sub: "8%" },
      20: { atk: 104, sub: "14.2%" },
      40: { atk: 198, sub: "20.4%" },
      50: { atk: 259, sub: "23.5%" },
      60: { atk: 319, sub: "26.6%" },
      70: { atk: 379, sub: "29.7%" },
      80: { atk: 440, sub: "32.8%" },
      90: { atk: 500, sub: "36%" },
    };
    if (customStats[level]) {
      return {
        atk: customStats[level].atk,
        subStatValue: customStats[level].sub,
      };
    }
  }

  if (name === "별하늘 연산 측정기") {
    const customStats: Record<number, { atk: number; sub: string }> = {
      1: { atk: 33, sub: "17.1%" },
      20: { atk: 86, sub: "30.4%" },
      40: { atk: 163, sub: "43.7%" },
      50: { atk: 213, sub: "50.4%" },
      60: { atk: 263, sub: "57.0%" },
      70: { atk: 313, sub: "63.7%" },
      80: { atk: 363, sub: "70.3%" },
      90: { atk: 413, sub: "77.0%" },
    };
    if (customStats[level]) {
      return {
        atk: customStats[level].atk,
        subStatValue: customStats[level].sub,
      };
    }
  }

  if (name === "눈부신 빛") {
    const customStats: Record<number, { atk: number; sub: string }> = {
      1: { atk: 33, sub: "9%" },
      20: { atk: 86, sub: "16%" },
      40: { atk: 163, sub: "23%" },
      50: { atk: 213, sub: "26.5%" },
      60: { atk: 263, sub: "30%" },
      70: { atk: 313, sub: "33.5%" },
      80: { atk: 363, sub: "37%" },
      90: { atk: 413, sub: "40.5%" },
    };
    if (customStats[level]) {
      return {
        atk: customStats[level].atk,
        subStatValue: customStats[level].sub,
      };
    }
  }

  const atkRatio = ATK_SCALING_RATIOS[level] ?? 1.0;
  const subRatio = SUBSTAT_SCALING_RATIOS[level] ?? 1.0;

  const scaledAtk = Math.round(baseAtk * atkRatio);

  let scaledSubStatValue = subStatValue;
  if (subStatValue.endsWith('%')) {
    const numericPart = parseFloat(subStatValue.replace('%', ''));
    if (!isNaN(numericPart)) {
      const scaledVal = numericPart * subRatio;
      scaledSubStatValue = `${scaledVal.toFixed(1).replace(/\.0$/, '')}%`;
    }
  }

  return {
    atk: scaledAtk,
    subStatValue: scaledSubStatValue,
  };
}

function getWeaponForgerySeries(type: string): string[] {
  switch (type) {
    case "대검":
      return ["저주파수 비명 이상 결정 조각", "중주파수 비명 이상 결정 조각", "고주파수 비명 이상 결정 조각", "전주파수 비명 이상 결정 조각"];
    case "직검":
      return ["비활성 금속 액적", "활성 금속 액적", "분극 금속 액적", "이성질화 금속 액적"];
    case "권총":
      return ["헤테로 결정화 연소", "조추출 결정화 연소", "정류 결정화 연소", "고순도 결정화 연소"];
    case "증폭기":
      return ["긁어모은 현", "끊어진 현", "응고된 현", "노래하는 현"];
    case "권갑":
      return ["저주파수 절단된 결정", "중주파수 절단된 결정", "고주파수 절단된 결정", "전주파수 절단된 결정"];
    default:
      return ["비활성 금속 액적", "활성 금속 액적", "분극 금속 액적", "이성질화 금속 액적"];
  }
}

function getWeaponCommonDropSeries(name: string): string[] {
  if (name === "천년의 회류") {
    return ["저주파수 의음 성핵", "중주파수 의음 성핵", "고주파수 의음 성핵", "전주파수 의음 성핵"];
  }
  if (name === "레이저 변형" || name === "서린 불꽃" || name === "위조된 작은별") {
    return ["저주파수 엑소스웜 성핵", "중주파수 엑소스웜 성핵", "고주파수 엑소스웜 성핵", "전주파수 엑소스웜 성핵"];
  }
  if (name === "솟아오르는 화염") {
    return ["저주파수 포효 성핵", "중주파수 포효 성핵", "고주파수 포효 성핵", "전주파수 포효 성핵"];
  }
  if (name === "날카로운 봄" || name === "눈부신 빛") {
    return ["낡은 구속팔찌", "보통 구속팔찌", "개량 구속팔찌", "특제 구속팔찌"];
  }

  const commonSeriesList = [
    ["저주파수 의음 성핵", "중주파수 의음 성핵", "고주파수 의음 성핵", "전주파수 의음 성핵"],
    ["저주파수 포효 성핵", "중주파수 포효 성핵", "고주파수 포효 성핵", "전주파수 포효 성핵"],
    ["낡은 구속팔찌", "보통 구속팔찌", "개량 구속팔찌", "특제 구속팔찌"],
    ["침식의 마스크", "속박의 마스크", "왜곡의 마스크", "광기의 마스크"],
    ["저주파수 엑소스웜 성핵", "중주파수 엑소스웜 성핵", "고주파수 엑소스웜 성핵", "전주파수 엑소스웜 성핵"],
    ["저주파수 취합 성핵", "중주파수 취합 성핵", "고주파수 취합 성핵", "전주파수 취합 성핵"],
    ["저주파수 침식 선형 구조물", "중주파수 침식 선형 구조물", "고주파수 침식 선형 구조물", "전주파수 침식 선형 구조물"]
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % commonSeriesList.length;
  return commonSeriesList[index];
}

function getWeaponMaterials(rarity: number, type: string, name: string): { name: string; count: number }[] {
  if (name === "서린 불꽃" || name === "위조된 작은별") {
    return [
      { name: "클램 코인", count: 330000 },
      { name: "저주파수 엑소스웜 성핵", count: 6 },
      { name: "중주파수 엑소스웜 성핵", count: 6 },
      { name: "고주파수 엑소스웜 성핵", count: 10 },
      { name: "전주파수 엑소스웜 성핵", count: 12 },
      { name: "긁어모은 현", count: 6 },
      { name: "끊어진 현", count: 8 },
      { name: "응고된 현", count: 6 },
      { name: "노래하는 현", count: 20 }
    ];
  }

  if (name === "별하늘 연산 측정기") {
    return [
      { name: "클램 코인", count: 330000 },
      { name: "파손된 엑소스웜 펜던트", count: 6 },
      { name: "허름한 엑소스웜 펜던트", count: 6 },
      { name: "흠집이 있는 엑소스웜 펜던트", count: 10 },
      { name: "완전한 엑소스웜 펜던트", count: 12 },
      { name: "저주파수 절단된 결정", count: 6 },
      { name: "중주파수 절단된 결정", count: 8 },
      { name: "고주파수 절단된 결정", count: 6 },
      { name: "전주파수 절단된 결정", count: 20 }
    ];
  }

  if (name === "눈부신 빛") {
    return [
      { name: "클램 코인", count: 264000 },
      { name: "낡은 구속팔찌", count: 5 },
      { name: "보통 구속팔찌", count: 5 },
      { name: "개량 구속팔찌", count: 9 },
      { name: "특제 구속팔찌", count: 11 },
      { name: "렌토 와전류", count: 5 },
      { name: "아다지오 와전류", count: 7 },
      { name: "안단테 와전류", count: 5 },
      { name: "프레스토 와전류", count: 17 }
    ];
  }

  const forgerySeries = getWeaponForgerySeries(type);
  const commonSeries = getWeaponCommonDropSeries(name);

  let coin = 0;
  let config: { tier: number; count: number }[] = [];

  if (rarity === 5) {
    coin = 150000;
    config = [
      { tier: 0, count: 6 },
      { tier: 1, count: 6 },
      { tier: 2, count: 10 },
      { tier: 3, count: 12 }
    ];
  } else if (rarity === 4) {
    coin = 120000;
    config = [
      { tier: 0, count: 5 },
      { tier: 1, count: 5 },
      { tier: 2, count: 8 },
      { tier: 3, count: 10 }
    ];
  } else if (rarity === 3) {
    coin = 80000;
    config = [
      { tier: 0, count: 4 },
      { tier: 1, count: 4 },
      { tier: 2, count: 6 }
    ];
  } else if (rarity === 2) {
    coin = 40000;
    config = [
      { tier: 0, count: 2 },
      { tier: 1, count: 2 }
    ];
  } else {
    coin = 20000;
    config = [
      { tier: 0, count: 1 }
    ];
  }

  const list: { name: string; count: number }[] = [];
  list.push({ name: "클램 코인", count: coin });

  for (const c of config) {
    if (forgerySeries[c.tier]) {
      list.push({ name: forgerySeries[c.tier], count: c.count });
    }
  }

  for (const c of config) {
    if (commonSeries[c.tier]) {
      list.push({ name: commonSeries[c.tier], count: c.count });
    }
  }

  return list;
}

const WuwaWeaponDetail = () => {
  const { t } = useTranslation();
  const params = useParams();
  const routeParam = params.lcName || params.weaponName || params.name || params.id || Object.values(params).pop() || '';
  const targetName = String(routeParam).normalize('NFC');
  const [rankIdx, setRankIdx] = useState<number>(0);
  const [levelIdx, setLevelIdx] = useState<number>(7);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const weapon = WEAPON_DATA.find(w => w.name.normalize('NFC') === targetName);

  const lastUpdatedDate = weapon ? (VERSION_UPDATES[weapon.releaseVersion || '1.0'] || '2026-05-23') : '2026-05-23';

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

  const handleCopyMaterials = () => {
    if (!weapon) return;
    const materials = getWeaponMaterials(weapon.rarity, weapon.type, weapon.name);
    const materialsText = materials
      .map((m) => `${t(m.name)} x${m.count.toLocaleString()}`)
      .join(', ');
    
    const text = `[${t(weapon.name)} ${t('돌파 재료 리스트')}]\n\n■ ${t('돌파 재료')}\n${materialsText}\n\n출처: RIRA ARCHIVE`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error("클립보드 복사 실패:", err);
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text);
    }
  };

  const getRarityTheme = (rarity: number) => {
    switch (rarity) {
      case 5: return { primary: '#EAB308', secondary: '#FDE047' };
      case 4: return { primary: '#A855F7', secondary: '#D8B4FE' };
      case 3: return { primary: '#3B82F6', secondary: '#93C5FD' };
      case 2: return { primary: '#10B981', secondary: '#6EE7B7' };
      case 1: return { primary: '#64748B', secondary: '#94A3B8' };
      default: return { primary: '#EAB308', secondary: '#FDE047' };
    }
  };
  const theme = getRarityTheme(weapon?.rarity || 5);

  if (!weapon) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="p-20 text-center text-white font-black uppercase italic opacity-20 tracking-widest text-2xl">
        Weapon not found. ({targetName})
      </div>
    </div>
  );

  const getIllustrationUrl = () => {
    return encodeURI(`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images/Weapons/${weapon.name.normalize('NFC')}.webp`);
  };

  const currentStats = getWwWeaponStatsForLevel(weapon.stats.atk, weapon.stats.subStatValue, LEVEL_STEPS[levelIdx], weapon.name);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12 font-sans selection:bg-brand-primary relative">
      <SEO 
        title={`${weapon.name} ${t('상세 정보 및 스탯 | 명조 아카이브')}`} 
        description={`${t('명조 (Wuthering Waves)')} ${weapon.rarity}${t('성')} ${t(weapon.type)} ${weapon.name}${t('의 상세 스탯, 무기 스킬, 획득처 및 스토리를 확인하세요.')}`}
        image={getIllustrationUrl()}
        url={`/gallery/ww/weapon/${weapon.name}`}
        modifiedTime={lastUpdatedDate}
        ratingValue={weapon.rarity}
        reviewCount={1}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: '/gallery/ww' },
          { name: t('무기'), url: '/gallery/ww?menu=무기' },
          { name: weapon.name, url: `/gallery/ww/weapon/${weapon.name}` }
        ]}
      />

      <ItemDetailModal 
        itemNameEn={selectedItem || ''} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
      
      <PageHeader gameId="ww" category={t("무기")} title={t(weapon.name)} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-6">
        {/* Top Section: Image & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[550px_1fr] gap-8 items-start">
          
          {/* Left: Image with Overlay */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.2] flex items-center justify-center">
            <img 
              src={getIllustrationUrl()} 
              alt={weapon.name} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000" 
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  {t('무기 종류')} : {t(weapon.type || '')}
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg">
                  {t(weapon.name)}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: weapon.rarity }).map((_, i) => (
                    <Star key={i} size={18} fill={theme.primary} style={{ color: theme.primary }} className="drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Consolidated Controls and Info */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* 01. Compact Control & Stats Card */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
                {/* Level Slider */}
                <div className="space-y-3 flex-grow relative pt-6 group/lslider">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[20px] border-2 flex items-center justify-center font-black text-lg shadow-xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>01</div>
                      <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400 italic">{t('기본 스텟')}</h2>
                    </div>
                  </div>
                  {/* Floating Level Label */}
                  <div 
                    className="absolute top-0 -translate-x-1/2 px-2 py-0.5 bg-brand-primary text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg z-10"
                    style={{ 
                      left: `${(levelIdx / 7) * 100}%`,
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 10px ${theme.primary}40`
                    }}
                  >
                    Lv.{LEVEL_STEPS[levelIdx]}
                  </div>
                  <input 
                    type="range" min="0" max="7" value={levelIdx} 
                    onChange={(e) => setLevelIdx(parseInt(e.target.value))}
                    className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-brand-primary"
                    style={{ accentColor: theme.primary }}
                  />
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-600 px-0.5 mt-1.5">
                    <span>1</span>
                    <span>90</span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <StatRow label={t("기초 공격력")} value={currentStats.atk} color={theme.primary} />
                <StatRow label={t(weapon.stats.subStatName)} value={currentStats.subStatValue} color={theme.primary} />
              </div>
            </div>

            {/* 02. Skill Detail Section */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow group/skill">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>02</div>
                <div className="flex flex-col border-l-4 border-white/10 pl-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{t('무기 스킬')}</span>
                  <h2 className="text-xl font-black tracking-tighter italic uppercase text-white/90 leading-none">{t(weapon.skill?.name || '')}</h2>
                </div>
              </div>

              {/* Resonance (Superimposition) Slider */}
              <div className="mb-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative group/rslider pt-8">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">{t('중첩 단계')}</h3>
                  </div>
                </div>
                {/* Floating Rank Label */}
                <div 
                  className="absolute top-2 -translate-x-1/2 px-2 py-0.5 bg-white text-black font-black italic text-[10px] rounded pointer-events-none transition-all duration-75 shadow-lg z-10"
                  style={{ 
                    left: `${(rankIdx / 4) * 100}%`,
                    boxShadow: `0 0 10px rgba(255,255,255,0.4)`
                  }}
                >
                  R{rankIdx + 1}
                </div>
                <input 
                  type="range" min="0" max="4" value={rankIdx} 
                  onChange={(e) => setRankIdx(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/15 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: theme.primary }}
                />
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-gray-600 px-0.5 mt-1.5">
                  <span>1</span>
                  <span>5</span>
                </div>
              </div>
              
              <div className="text-gray-300 text-base md:text-lg leading-relaxed bg-white/[0.01] p-6 rounded-[25px] border border-white/5 shadow-inner min-h-[120px]">
                {renderRichText(formatDescriptionByRank(weapon.skill?.description || '', rankIdx + 1))}
              </div>
            </div>
            
            <AdPlaceholder type="leaderboard" className="mt-4 mb-2 scale-90 opacity-40" />
          </div>
        </div>

        {/* 03. Materials Section */}
        <div className="space-y-8">
          <SectionHeader num="03" title={t("돌파 재료")} theme={theme} />
          <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
               <div className="flex items-center gap-4">
                 <Package size={22} className="text-gray-500" />
                 <span className="text-xl font-black uppercase tracking-tighter italic">{t("돌파 재료")}</span>
               </div>
               <button 
                 onClick={handleCopyMaterials} 
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all"
               >
                 {isCopied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                 {isCopied ? t('복사 완료!') : t('재료 리스트 복사')}
               </button>
             </div>
             <div className="flex flex-wrap justify-center gap-8 px-4">
                {getWeaponMaterials(weapon.rarity, weapon.type, weapon.name).map((m, i) => (
                  <ItemIcon 
                    key={i} 
                    name={m.name} 
                    count={m.name === "클램 코인" ? m.count.toLocaleString() : String(m.count)} 
                    onClick={() => setSelectedItem(m.name)} 
                  />
                ))}
             </div>
          </div>
        </div>

        {/* 04. Story Section (Toggle) - BOTTOM FULL WIDTH */}
        {weapon.description && (
          <div className="space-y-8">
            <SectionHeader num="04" title={t('무기 스토리')} theme={theme} expanded={isStoryOpen} onToggle={() => setIsStoryOpen(!isStoryOpen)} />
            <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isStoryOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="glass-card p-8 rounded-[35px] border border-white/5">
                <div className="text-gray-400 text-base md:text-lg leading-relaxed italic whitespace-pre-line custom-scrollbar bg-black/20 p-8 rounded-[30px] border border-white/5 shadow-inner">
                    {t(weapon.description)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {weapon && (
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-6 mb-12 flex justify-end">
          <p className="text-[11px] font-bold text-gray-600 tracking-wider uppercase">
            {t('최종 업데이트')} : {lastUpdatedDate} (v{weapon.releaseVersion || '1.0'})
          </p>
        </div>
      )}
    </div>
  );
};

const SectionHeader: React.FC<{ 
  num: string; 
  title: string; 
  theme: { primary: string; secondary: string }; 
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

const StatRow: React.FC<{ label: string; value: string | number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">{label}</span>
    </div>
    <div className="text-xl font-black tabular-nums text-white group-hover:scale-105 transition-transform">{value}</div>
  </div>
);

export default WuwaWeaponDetail;