
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router';
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
  CheckCircle2,
  Compass,
  Zap,
  Globe,
  Users,
  MessageSquareWarning
} from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import { GLOBAL_SPECIAL_TERMS } from '../../hsr-hub/data/terms';
import ItemIcon from '../../common-hub/components/ItemIcon';
import ItemDetailModal from '../../common-hub/components/ItemDetailModal';
import { CharacterReviewBoard } from '../../common-hub/components/CharacterReviewBoard';
import FeedbackReportModal from '../../common-hub/components/FeedbackReportModal';
import SkillAndEidolonSection from '../../hsr-hub/components/SkillAndEidolonSection';
import SEO, { CommentData } from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import { safeEncodeURIComponent, CDN_URL } from '../../common-hub/utils/assetManager';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80];

const VERSION_UPDATES: Record<string, string> = {
  "1.0": "2023-04-26",
  "1.1": "2023-06-07",
  "1.2": "2023-07-19",
  "1.3": "2023-08-30",
  "1.4": "2023-10-11",
  "1.5": "2023-11-15",
  "1.6": "2023-12-27",
  "2.0": "2024-02-06",
  "2.1": "2024-03-27",
  "2.2": "2024-05-08",
  "2.3": "2024-06-19",
  "2.4": "2024-07-31",
  "2.5": "2024-09-10",
  "2.6": "2024-10-23",
  "2.7": "2024-12-04",
  "3.0": "2025-01-15",
  "3.1": "2025-03-05",
  "3.2": "2025-04-16",
  "3.3": "2025-05-28"
};

const Flag: React.FC<{ code: string }> = ({ code }) => (
  <img src={`https://flagcdn.com/w20/${code}.png`} alt={code} className="inline-block w-4 h-3 object-cover rounded-sm mr-1.5" />
);

const CharacterDetailNTE: React.FC = () => {
  const { charName } = useParams<{ charName: string }>();
  const gameId = 'nte';
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'ko';
  
  const { CHARACTER_DB } = useMemo(() => getGameData(currentLang), [currentLang]);
  const [isMetadataExpanded, setIsMetadataExpanded] = useState(true); // Default expanded
  const [isProfileExpanded, setIsProfileExpanded] = useState(true);   // Default expanded
  const [levelIdx, setLevelIdx] = useState(7);
  
  const [gender, setGender] = useState<'m' | 'f'>('f');
  
  const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number } | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
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

  // 연관 캐릭터 추천 (Internal Linking)
  const relatedCharacters = useMemo(() => {
    if (!rawChar) return [];
    return CHARACTER_DB.filter((c: any) => 
      c.id !== rawChar.id && 
      (c.path === rawChar.path || c.attribute === rawChar.attribute)
    ).slice(0, 4);
  }, [rawChar, CHARACTER_DB]);

  // Derived Character Data based on Mode
  const char = useMemo(() => {
    if (!rawChar) return null;
    
    const getSkillIcon = (text: string, defaultIcon: string) => {
      if (!text) return defaultIcon;
      // Extract custom skill name if it follows the format "Skill Name : Description" or "Skill Name: Description"
      const match = text.match(/^([^\:\n]+)\s*\:/);
      if (match) {
        return match[1].trim();
      }
      return defaultIcon;
    };

    // Convert NTE skills to structured array for SkillAndEidolonSection
    const skills = [];
    if (rawChar.basicAttack) skills.push({ id: 'basic', name: '일반 공격', type: '기본 공격', description: rawChar.basicAttack, tag: '일반 공격', icon: '일반 공격' });
    if (rawChar.citySkill) skills.push({ id: 'city', name: '도시 스킬', type: '도시 스킬', description: rawChar.citySkill, tag: '도시 스킬', icon: '도시 스킬' });
    if (rawChar.virailSkill) skills.push({ id: 'virail', name: '바이레일 스킬', type: '바이레일 스킬', description: rawChar.virailSkill, tag: '바이레일 스킬', icon: '바이레일 스킬' });
    if (rawChar.ultimateSkill) skills.push({ id: 'ultimate', name: '울티메이트', type: '울티메이트', description: rawChar.ultimateSkill, tag: '울티메이트', icon: '울티메이트' });
    if (rawChar.supportSkill) skills.push({ id: 'support', name: '서포트 스킬', type: '서포트 스킬', description: rawChar.supportSkill, tag: '서포트 스킬', icon: '서포트 스킬' });
    if (rawChar.passiveSkill1) skills.push({ id: 'passive1', name: '패시브 스킬 1', type: '패시브 스킬', description: rawChar.passiveSkill1, tag: '패시브 스킬 1', icon: getSkillIcon(rawChar.passiveSkill1, '패시브 스킬 1') });
    if (rawChar.passiveSkill2) skills.push({ id: 'passive2', name: '패시브 스킬 2', type: '패시브 스킬', description: rawChar.passiveSkill2, tag: '패시브 스킬 2', icon: getSkillIcon(rawChar.passiveSkill2, '패시브 스킬 2') });

    const eidolons = [];
    if (rawChar.awakenings) {
      // Split by "1.", "2.", etc. or "각성 1", "각성 2", etc.
      const parts = rawChar.awakenings.split(/(?:^|\n)(?:[1-6]\.|각성\s*[1-6][\s\:\.]*)/).filter((p: string) => p.trim());
      if (parts.length > 1) {
        parts.forEach((part: string, index: number) => {
          eidolons.push({ 
            id: `awakenings_${index+1}`, 
            rank: index + 1, 
            name: `각성 ${index + 1}`, 
            description: part.trim(), 
            iconKey: `각성${index + 1}` 
          });
        });
      } else {
        eidolons.push({ id: 'awakenings', rank: 1, name: '각성', description: rawChar.awakenings, iconKey: '각성1' });
      }
    }
    if (rawChar.resonance) eidolons.push({ id: 'resonance', rank: eidolons.length + 1, name: '공명', description: rawChar.resonance, iconKey: '공명' });

    // Parse growth stats for HSR level slider
    const parsedBaseStats: any = {};
    if (rawChar.growthStats) {
      const lines = rawChar.growthStats.split('\n');
      for (const line of lines) {
        const match = line.match(/(\d+)\s*:\s*([\d,]+)\s+([\d,]+)\s+([\d,]+)/);
        if (match) {
          parsedBaseStats[`lv${match[1]}`] = {
            "기초 HP": parseInt(match[2].replace(/,/g, '')),
            "기초 공격력": parseInt(match[3].replace(/,/g, '')),
            "기초 방어력": parseInt(match[4].replace(/,/g, ''))
          };
        }
      }
    }

    return { 
      ...rawChar,
      skills,
      eidolons,
      baseStats: Object.keys(parsedBaseStats).length > 0 ? parsedBaseStats : null,
      materials_v2: {
        ascension: rawChar.ascensionMaterials ? [{ name: rawChar.ascensionMaterials }] : [],
        traces: rawChar.skillMaterials ? [{ name: rawChar.skillMaterials }] : []
      }
    };
  }, [rawChar]);

  const lastUpdatedDate = char ? (VERSION_UPDATES[char.releaseVersion || '1.0'] || '2026-05-23') : '2026-05-23';

  const theme = useMemo(() => {
    if (!char) return { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
    const ELEMENT_THEMES: Record<string, { primary: string, secondary: string, shadow: string }> = {
      '번개': { primary: '#b485ff', secondary: '#8946ff', shadow: 'rgba(180, 133, 255, 0.4)' },
      '물리': { primary: '#a3a6ad', secondary: '#75787f', shadow: 'rgba(163, 166, 173, 0.4)' },
      '화염': { primary: '#ff6252', secondary: '#d93a2b', shadow: 'rgba(255, 98, 82, 0.4)' },
      '얼음': { primary: '#52b0ff', secondary: '#2b8ad9', shadow: 'rgba(82, 176, 255, 0.4)' },
      '바람': { primary: '#44d7a8', secondary: '#23a37b', shadow: 'rgba(68, 215, 168, 0.4)' },
      '양자': { primary: '#7064d7', secondary: '#483c9c', shadow: 'rgba(112, 100, 215, 0.4)' },
      '허수': { primary: '#e3d266', secondary: '#b8a63c', shadow: 'rgba(227, 210, 102, 0.4)' },
      '기류': { primary: '#44d7a8', secondary: '#23a37b', shadow: 'rgba(68, 215, 168, 0.4)' },
      '전도': { primary: '#b485ff', secondary: '#8946ff', shadow: 'rgba(180, 133, 255, 0.4)' },
      '회절': { primary: '#e3d266', secondary: '#b8a63c', shadow: 'rgba(227, 210, 102, 0.4)' },
      '인멸': { primary: '#7064d7', secondary: '#483c9c', shadow: 'rgba(112, 100, 215, 0.4)' },
      '용융': { primary: '#ff6252', secondary: '#d93a2b', shadow: 'rgba(255, 98, 82, 0.4)' },
      '응결': { primary: '#52b0ff', secondary: '#2b8ad9', shadow: 'rgba(82, 176, 255, 0.4)' },
      'Fire': { primary: '#ff6252', secondary: '#d93a2b', shadow: 'rgba(255, 98, 82, 0.4)' },
      'Ice': { primary: '#52b0ff', secondary: '#2b8ad9', shadow: 'rgba(82, 176, 255, 0.4)' },
      'Wind': { primary: '#44d7a8', secondary: '#23a37b', shadow: 'rgba(68, 215, 168, 0.4)' },
      'Lightning': { primary: '#b485ff', secondary: '#8946ff', shadow: 'rgba(180, 133, 255, 0.4)' },
      'Physical': { primary: '#a3a6ad', secondary: '#75787f', shadow: 'rgba(163, 166, 173, 0.4)' },
      'Quantum': { primary: '#7064d7', secondary: '#483c9c', shadow: 'rgba(112, 100, 215, 0.4)' },
      'Imaginary': { primary: '#e3d266', secondary: '#b8a63c', shadow: 'rgba(227, 210, 102, 0.4)' },
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
    const noHtmlText = text.replace(/<[^>]*>/g, '');
    const processedText = noHtmlText.replace(/\{F#([^}]*)\}=\{M#([^}]*)\}/g, (_, f, m) => gender === 'f' ? f : m);
    
    // Add protected terms that shouldn't be broken up (e.g., character names with numbers)
    const protectedTerms = ["Mar. 7th", "Mar. 7th (수렵)"]; 
    const sortedKeys = [...Object.keys(specialTerms), ...protectedTerms].sort((a, b) => b.length - a.length);
    
    // Construct regex
    const combinedRegex = new RegExp(`({icon:[^}]+}|${sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')}|[+-]?\\d+(?:\\.\\d+)?%?)`, 'g');
    
    return processedText.split(combinedRegex).map((part, i) => {
      // 0. 아이콘 태그 매칭 ({icon:mouse_left})
      const iconMatch = part.match(/\{icon:([^}]+)\}/);
      if (iconMatch) {
        const iconName = iconMatch[1];
        return (
          <img 
            key={i} 
            src={`/assets/icons/${iconName}.png`} 
            className="inline-icon" 
            alt={iconName}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        );
      }

      // 1. If part is in protectedTerms, it just falls through to plain text
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
    const folderName = char.folderName || char.name || '';
    
    let fileName = 'art01.webp';
    if (char.isTrailblazer) {
      fileName = gender === 'f' ? "art01.webp" : "art01-01.webp";
    } else if (isASMode && char.hasASBuff) {
      // AS 전용 일러스트 (파일명 규칙: art01_as.webp)
      fileName = 'art01_as.webp';
    }
    
    if (char.fixedUrl) return char.fixedUrl;
    
    return `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(folderName)}/${fileName}`;
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

    const asc = char.materials_v2.ascension?.map((m: any) => `${t(m.name)} x${typeof m.count === 'number' ? m.count.toLocaleString() : m.count}`).join(', ') || t('정보 없음');
    const trc = char.materials_v2.traces?.map((m: any) => `${t(m.name)} x${typeof m.count === 'number' ? m.count.toLocaleString() : m.count}`).join(', ') || t('정보 없음');
    
    const text = `[${t(char.name)} ${t('육성 재료 리스트')}]\n\n■ ${t('돌파 재료')}\n${asc}\n\n■ ${t('행적 재료')}\n${trc}\n\n출처: RIRA ARCHIVE`;

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

  const seoDescription = useMemo(() => {
    const name = t(char.name);
    const longTailKeywords = [
      `${name} 종결 광추 대체`,
      `${name} 조합 유물 스탯`,
      `${name} 파티 시너지 덱 추천`,
      `${name} 성능 평가 티어`,
      `${name} 돌파 효율 우선순위`
    ];
    const seed = char.id.charCodeAt(0) + char.id.charCodeAt(char.id.length - 1);
    const k1 = longTailKeywords[seed % longTailKeywords.length];
    const k2 = longTailKeywords[(seed + 1) % longTailKeywords.length];
    return `${name} 상세 가이드 및 공략. ${k1}, ${k2} 등 최적의 세팅을 완벽 정리했습니다. 붕괴: 스타레일 최신 메타 분석.`;
  }, [char, t]);

  const faqData = useMemo(() => {
    if (!char) return [];
    const questions = [
      {
        question: `${t(char.name)} ${t('의 전투 속성과 운명의 길은 무엇인가요?')}`,
        answer: `${t(char.name)}${t('은(는)')} ${t('붕괴: 스타레일의')} ${t(char.attribute)} ${t('속성 및')} ${t(char.arc)} ${t('운명의 길 캐릭터입니다.')}`
      }
    ];

    if (char.materials_v2?.ascension && char.materials_v2.ascension.length > 0) {
      questions.push({
        question: `${t(char.name)} ${t('의 돌파를 위해 필요한 주요 재료는 무엇인가요?')}`,
        answer: `${t(char.name)}${t('의 캐릭터 돌파를 위해서는')} ${char.materials_v2.ascension.slice(0, 3).map((m: any) => t(m.name)).join(', ')} ${t('등의 육성 재료가 필요합니다.')}`
      });
    }

    if (char.baseStats) {
      // Calculate specifically at max level (80) for SEO accuracy
      const lvKey = 'lv80';
      const lvData = char.baseStats?.[lvKey] as Record<string, number> | undefined;
      const maxHp = lvData ? lvData[t('기초 HP')] : '---';
      const maxAtk = lvData ? lvData[t('기초 공격력')] : '---';
      const maxDef = lvData ? lvData[t('기초 방어력')] : '---';

      questions.push({
        question: `${t(char.name)} ${t('의 기본 기초 스탯(공격력, 방어력, HP)은 어떻게 되나요?')}`,
        answer: `${t(char.name)}${t('의 80레벨 기준 기초 HP는')} ${maxHp}, ${t('기초 공격력은')} ${maxAtk}, ${t('기초 방어력은')} ${maxDef}${t('입니다.')}`
      });
    }

    return questions;
  }, [char, t]);

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] pb-24 font-sans selection:bg-brand-primary text-white overflow-visible break-keep">
      <SEO 
        title={`${t(char.name)} ${t('캐릭터 공략 및 세팅 정보')}`} 
        description={seoDescription}
        image={getIllustrationUrl()}
        url={`/gallery/${gameId}/character/${char.id}`}
        gameCategory={t('붕괴: 스타레일')}
        itemType={t(char.arc)}
        modifiedTime={lastUpdatedDate}
        faqData={faqData}
        ratingValue={char.rarity}
        reviewCount={1}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('붕괴: 스타레일'), url: `/gallery/${gameId}` },
          { name: t('캐릭터'), url: `/gallery/${gameId}?menu=캐릭터` },
          { name: t(char.name), url: `/gallery/${gameId}/character/${char.id}` }
        ]}
        commentsData={commentsData}
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
              alt={`${t(char.name)} - ${t('리라 아카이브 캐릭터 정보 및 세팅 가이드')}`} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              fetchPriority="high"
              decoding="async"
              onError={(e) => {
                const CDN_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main';
                if (e.currentTarget.src.includes('art01_as.webp')) {
                  e.currentTarget.src = e.currentTarget.src.replace('art01_as.webp', 'art01.webp');
                } else if (char.isTrailblazer && !e.currentTarget.src.includes('%EA%B0%9C%EC%B2%99%EC%9E%90/')) {
                  // 개척자 이미지 로드 실패 시 공통 폴더('개척자')에서 시도
                  const baseFolderName = safeEncodeURIComponent('개척자');
                  const currentFileName = gender === 'f' ? "art01.webp" : "art01-01.webp";
                  e.currentTarget.src = `${CDN_URL}/nte images/icons/${char.attribute}.png/${currentFileName}`;
                }
              }}
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
            
            {/* Integrated Info Overlay (Bottom-Left) */}
            <div className="absolute bottom-8 left-8 right-8 space-y-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-brand-primary font-black uppercase text-[10px] tracking-widest opacity-80" style={{ color: theme.primary }}>
                  {t('아크')} : {t(char.arc)} | {t(char.attribute)}
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
            
            {/* 01. Active Controls (AS Mode / Gender) */}
            <div className="flex flex-wrap items-center gap-3 px-2">
              {rawChar?.hasASBuff && (
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button onClick={() => setIsASMode(false)} className={`px-4 py-1 rounded-lg text-[9px] font-black transition-all ${!isASMode ? 'bg-white/10 text-white' : 'text-gray-500'}`}>{t('Original')}</button>
                  <button onClick={() => setIsASMode(true)} className={`px-4 py-1 rounded-lg text-[9px] font-black transition-all ${isASMode ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500'}`}>{t('AS Remake')}</button>
                </div>
              )}
              {char.isTrailblazer && (
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 shadow-inner">
                  <button onClick={() => setGender('m')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'm' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>{t('남성')}</button>
                  <button onClick={() => setGender('f')} className={`px-5 py-1 rounded-lg text-[9px] font-black transition-all ${gender === 'f' ? 'bg-brand-primary text-white' : 'text-gray-500'}`}>{t('여성')}</button>
                </div>
              )}
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

              {/* Vertical Stats List */}
              <div className="flex flex-col gap-2.5">
                <StatRow label={t("기초 HP")} value={calculateStat('hp')} color={theme.primary} />
                <StatRow label={t("기초 공격력")} value={calculateStat('atk')} color={theme.primary} />
                <StatRow label={t("기초 방어력")} value={calculateStat('def')} color={theme.primary} />
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">{t("속도")}</span>
                    <span className="text-xl font-black text-white tabular-nums">{char.baseStats?.speed || 0}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">{t("도발")}</span>
                    <span className="text-xl font-black text-white tabular-nums">{char.baseStats?.taunt || 0}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">{t("에너지")}</span>
                    <span className="text-xl font-black text-white tabular-nums">{char.baseStats?.energy || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 03. Profile/Story Section (Toggle) */}
            <div className="glass-card overflow-hidden rounded-[35px] border border-white/5 bg-[#0f0f0f]/40">
              <button 
                onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                className="w-full p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-[20px] border-2 flex items-center justify-center font-black text-lg shadow-xl transition-transform group-hover:scale-110" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>02</div>
                   <h2 className="text-2xl font-black uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors italic">{t('캐릭터 소개')}</h2>
                </div>
                <div className={`p-2 rounded-full border border-white/10 transition-transform duration-500 ${isProfileExpanded ? 'rotate-180 border-brand-primary' : ''}`}>
                   <ChevronDown size={18} />
                </div>
              </button>
              <div className={`transition-all duration-500 ${isProfileExpanded ? 'max-h-[1000px] opacity-100 pb-8' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 border-t border-white/5 pt-6">
                  <div className="text-gray-400 text-base leading-relaxed italic bg-black/20 p-6 rounded-[25px] border border-white/5 shadow-inner whitespace-pre-line">
                    {t(char.autoDescription || char.briefInfo || char.brief || '프로필 정보가 등록되지 않았습니다.')}
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
                <MetadataCard label={t("아크")} value={t(char.arc)} icon={<Compass size={20} />} theme={theme} />
                <MetadataCard label={t('이능력 속성')} value={t(char.attribute)} icon={<Zap size={20} />} theme={theme} />
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

        {/* 04 Materials */}
        <section className="space-y-8">
          <SectionHeader num="04" title={t("육성 재료")} theme={theme} />
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
        
        <SkillAndEidolonSection 
            char={char} 
            gender={gender}
            setGender={setGender}
            theme={theme}
            renderContent={renderTextWithHighlights} 
            setTooltip={setTooltip}
            gameId="nte"
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
          {char && (
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button 
                onClick={() => setIsFeedbackModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 hover:border-brand-primary/50 transition-all uppercase tracking-widest"
              >
                <MessageSquareWarning size={14} />
                {t('데이터 오류 제보')}
              </button>
              <p className="text-[11px] font-bold text-gray-600 tracking-wider uppercase">
                {t('최종 업데이트')} : {lastUpdatedDate} (v{char.releaseVersion || '1.0'})
              </p>
            </div>
          )}

          {/* Review Board (Comments) */}
          <CharacterReviewBoard 
            characterId={char?.id || charName || ''} 
            gameId={gameId || 'hsr'} 
            onCommentsLoaded={setCommentsData}
          />

          {/* Internal Linking: Related Characters */}
          {relatedCharacters.length > 0 && (
            <section className="mt-12 pt-8 border-t border-white/5">
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase flex items-center gap-2 mb-6">
                Related Characters
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300 not-italic">
                  {t('추천')}
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedCharacters.map((rel: any) => (
                  <Link 
                    key={rel.id} 
                    to={`/gallery/${gameId}/character/${rel.id}`}
                    className="flex flex-col items-center p-4 rounded-[20px] bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all hover:scale-[1.02] group"
                  >
                    <img 
                      src={`${CDN_URL}/nte images/characters/${rel.id}/portrait.png`}
                      alt={t(rel.name)}
                      className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-transparent group-hover:border-brand-primary/50 transition-colors"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/default_banner.webp' }}
                    />
                    <span className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{t(rel.name)}</span>
                    <span className="text-xs font-medium text-gray-500">{t(rel.arc)}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>

        <FeedbackReportModal 
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
          contextData={{
            gameId,
            targetId: char?.id || charName,
            targetName: char?.name || charName,
            type: 'character'
          }}
        />
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

export default CharacterDetailNTE;
