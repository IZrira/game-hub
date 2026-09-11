import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
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
  Users
} from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../../common-hub/data/games';
import { HSR_PARTIES } from '../data/parties';
import SEO from '../../common-hub/components/SEO';
import TableOfContents from '../../common-hub/components/TableOfContents';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { useTranslation } from 'react-i18next';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const getMainImageUrl = (item: any) => {
  if (!item) return null;
  const typeMap: Record<string, string> = {
    '터널 유물': '유물',
    '차원 장신구': '차원 장신구',
    '광추': '광추'
  };
  const safeType = (typeMap[item.type] || item.type).normalize('NFC');
  const safeName = item.name.normalize('NFC');
  const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
  return encodeURI(url);
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
  theme: any; 
  iconImage?: string;
}> = ({ label, value, theme, iconImage }) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(iconImage);
  
  useEffect(() => {
    setImgUrl(iconImage);
  }, [iconImage]);

  const processedValues = useMemo(() => {
    if (!value) return [];
    const splitValues = value.split(/\s+or\s+|\s*\/\s*/i);
    return splitValues.map(v => v.trim());
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

  const handleImgError = () => {
    setImgUrl(undefined);
  };

  return (
    <div className="group glass-card rounded-[32px] p-6 border border-white/5 hover:border-brand-primary/30 transition-all bg-gradient-to-br from-white/[0.05] to-transparent flex flex-col items-center text-center gap-4 h-full relative overflow-hidden">
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/5 blur-3xl rounded-full group-hover:bg-brand-primary/10 transition-colors" />
      
      {imgUrl ? (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl border border-white/5 group-hover:border-brand-primary/20 relative z-10">
          <img 
            src={imgUrl} 
            alt={label} 
            className="w-full h-full object-contain" 
            onError={handleImgError}
          />
        </div>
      ) : (
        <div className="w-16 h-16 bg-black/30 rounded-[24px] flex items-center justify-center border border-white/5 relative z-10">
          <span className="text-gray-400 font-black text-xl uppercase opacity-20">{label.slice(0, 1)}</span>
        </div>
      )}
      
      <div className="space-y-3 w-full relative z-10">
        <div className="flex flex-col items-center gap-1">
          <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">{t(label, { keySeparator: false, nsSeparator: false })}</span>
        </div>
        
        <div className="flex flex-col gap-2 w-full">
          {processedValues.map((v, i) => (
            <div key={i} className="relative w-full py-2.5 px-3 bg-white/[0.03] rounded-2xl border border-white/5 group-hover:bg-white/[0.05] transition-colors overflow-hidden">
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

const PartyCardContent: React.FC<{ party: any; gameId: string | undefined }> = ({ party, gameId }) => {
  const { t } = useTranslation();

  return (
    <div className="p-6 sm:p-8 md:p-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
        {party.members.map((member: any, idx: number) => {
          const memberChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(member.name)) || normalizeName(c.folderName) === normalizeName(t(member.name)));
          const memberImg = memberChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(memberChar.folderName.normalize('NFC'))}/art01.webp` : '';
          
          return (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-4 group/member relative bg-white/[0.02] border border-white/5 rounded-3xl p-4 sm:p-5 transition-all hover:border-brand-primary/20"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                 <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover/member:opacity-40 transition-opacity" />
                 <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-primary/50 transition-all duration-500 p-1 bg-black/40 shadow-2xl">
                    <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full scale-110 group-hover/member:scale-125 transition-transform duration-700" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-brand-accent uppercase tracking-widest whitespace-nowrap z-10">
                   {t(member.role)}
                 </div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-base sm:text-lg font-black text-white group-hover/member:text-brand-accent transition-colors whitespace-nowrap">{t(member.name)}</div>
                <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{t(member.role)}</div>
              </div>

              {/* 대체 캐릭터 (호버 없이 하단에 직접 배치) */}
              {member.substitutes && member.substitutes.length > 0 && (
                <div className="w-full pt-3 border-t border-white/5 flex flex-col items-center gap-2 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                    <span className="text-[10px] font-black text-brand-accent uppercase tracking-wider">
                      {t('대체 캐릭터')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {member.substitutes.map((sub: any, sIdx: number) => {
                      const subChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(sub.name)) || normalizeName(c.folderName) === normalizeName(t(sub.name)));
                      const subImg = subChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(subChar.folderName.normalize('NFC'))}/${sub.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}` : '';
                      return (
                        <div key={sIdx} className="flex flex-col items-center gap-1 group/sub">
                          <div className="w-11 h-11 rounded-2xl border border-white/10 overflow-hidden bg-black/40 p-0.5 group-hover/sub:border-brand-accent/50 transition-all shadow-md">
                            {subImg ? (
                              <img src={subImg} alt={sub.name} className="w-full h-full object-cover rounded-xl group-hover/sub:scale-110 transition-transform" onError={(e) => { e.currentTarget.style.opacity = '0.3'; }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 font-bold">{sub.name?.[0]}</div>
                            )}
                          </div>
                          <span className="text-[9px] font-bold text-gray-400 group-hover/sub:text-brand-accent transition-colors max-w-[56px] truncate text-center">
                            {t(sub.name)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const parseItemWithNote = (item: any, defaultRank: number) => {
  let rawName = typeof item === 'string' ? item : (item?.name || '');
  let rawNote = typeof item === 'object' ? item?.note : undefined;

  // If item string contains colon, e.g. "Name : Note"
  if ((rawName.includes(':') || rawName.includes('：')) && !rawNote) {
    const parts = rawName.split(/[:：]/);
    rawName = parts[0].trim();
    rawNote = parts.slice(1).join(':').trim();
  }

  let rank = defaultRank;
  let note = rawNote;
  if (rawNote) {
    const rankMatch = String(rawNote).match(/^(\d+)순위(?:\s*[:：]\s*(.*)|\s*\((.*)\)|\s*(.*))?$/);
    if (rankMatch) {
      rank = parseInt(rankMatch[1], 10);
      note = (rankMatch[2] ?? rankMatch[3] ?? rankMatch[4])?.trim() || '';
    }
  }
  if (note && note.startsWith('(') && note.endsWith(')')) {
    note = note.slice(1, -1).trim();
  }

  // Clean name by removing rank strings if any and fixing common typos
  const cleanName = rawName.replace(/\s*\d+순위.*$/, '').replace(/유성을\s*쫒는\s*괴도/g, '유성을 쫓는 괴도').trim();

  return {
    raw: item,
    cleanName,
    rank,
    note: note && note.length > 0 ? note : undefined
  };
};

const getStatValueAndNote = (stat: string | { value: string; note: string } | undefined) => {
  if (!stat) return { value: '', note: undefined };
  if (typeof stat === 'object') {
    let val = stat.value || '';
    let nt = stat.note;
    if ((val.includes(':') || val.includes('：')) && !nt) {
      const parts = val.split(/[:：]/);
      val = parts[0].trim();
      nt = parts.slice(1).join(':').trim();
    }
    return { value: val, note: nt };
  }
  if (stat.includes(':') || stat.includes('：')) {
    const parts = stat.split(/[:：]/);
    return { value: parts[0].trim(), note: parts.slice(1).join(':').trim() };
  }
  return { value: stat, note: undefined };
};

const CharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t, i18n } = useTranslation();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const resolvedKoName = useMemo(() => {
    if (!charName) return undefined;
    const searchName = normalizeName(charName);
    const found = CHARACTER_DB.find((c: any) => 
      c.id === charName || 
      normalizeName(c.folderName) === searchName || 
      normalizeName(t(c.name)) === searchName
    );
    return (found as any)?.folderName || (found as any)?.originalName || found?.name || charName;
  }, [charName, t]);

  const character = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    return CHARACTER_DB.find((c: any) => 
      c.id === charName || 
      normalizeName(c.folderName) === searchName || 
      normalizeName(t(c.name)) === searchName
    );
  }, [charName, resolvedKoName, t]);

  const theme = useMemo(() => {
    if (!character) return { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
    const ELEMENT_THEMES: Record<string, { primary: string, secondary: string, shadow: string }> = {
      '얼음': { primary: '#A1D9FF', secondary: '#3D8CFF', shadow: 'rgba(161, 217, 255, 0.4)' },
      '번개': { primary: '#D2A1FF', secondary: '#9D4DFF', shadow: 'rgba(210, 161, 255, 0.4)' },
      '물리': { primary: '#E5E5E5', secondary: '#A1A1A1', shadow: 'rgba(229, 229, 229, 0.4)' },
      '화염': { primary: '#FF8A8A', secondary: '#FF4D4D', shadow: 'rgba(255, 138, 138, 0.4)' },
      '바람': { primary: '#80FFB3', secondary: '#00E676', shadow: 'rgba(128, 255, 179, 0.4)' },
      '양자': { primary: '#8080FF', secondary: '#651FFF', shadow: 'rgba(128, 128, 255, 0.4)' },
      '허수': { primary: '#E6E600', secondary: '#FFD600', shadow: 'rgba(230, 214, 0, 0.4)' },
    };
    return ELEMENT_THEMES[character.attribute] || { primary: '#7E30E1', secondary: '#E26EE5', shadow: 'rgba(126, 48, 225, 0.4)' };
  }, [character]);

  const guide = useMemo(() => {
    if (!character) {
      const searchName = normalizeName(resolvedKoName || "");
      return HSR_CHARACTER_GUIDES.find(g => normalizeName(g.characterName) === searchName);
    }
    const searchName = normalizeName(character.name || character.folderName || resolvedKoName || "");
    return HSR_CHARACTER_GUIDES.find(g => 
      g.characterName === character.name ||
      g.characterName === character.folderName ||
      normalizeName(g.characterName) === searchName ||
      (character.id && normalizeName(g.characterName) === normalizeName(character.id))
    );
  }, [character, resolvedKoName]);

  const currentVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.variants && guide.variants.length > 0) {
      return guide.variants[selectedVariantIndex];
    }
    return {
      name: "기본",
      bestRelics: guide.bestRelics,
      bestOrnaments: guide.bestOrnaments,
      bestLightCones: guide.bestLightCones,
      mainStats: guide.mainStats,
      subStats: guide.subStats,
      targetStats: guide.targetStats,
    };
  }, [guide, selectedVariantIndex]);

  const recommendedParties = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    return HSR_PARTIES.filter(p => p.members.some(m => normalizeName(m.name) === searchName));
  }, [resolvedKoName]);

  const synergyCharacters = useMemo(() => {
    const searchName = normalizeName(resolvedKoName || "");
    const chars = new Map<string, any>();
    
    HSR_PARTIES.forEach(p => {
      if (p.members.some(m => normalizeName(m.name) === searchName)) {
        p.members.forEach(m => {
          if (normalizeName(m.name) !== searchName) {
            chars.set(normalizeName(m.name), m);
          }
          if (m.substitutes) {
            m.substitutes.forEach((sub: any) => {
              if (normalizeName(sub.name) !== searchName) {
                chars.set(normalizeName(sub.name), { ...sub, role: m.role });
              }
            });
          }
        });
      }
    });
    return Array.from(chars.values());
  }, [resolvedKoName]);

  const lastUpdatedDate = guide ? (guide.lastUpdated || '2026-05-23') : '2026-05-23';

  const parsedLightCones = useMemo(() => {
    const list = (currentVariant?.bestLightCones || guide?.bestLightCones || []).slice(0, 5);
    return list.map((lc, idx) => parseItemWithNote(lc, idx + 1));
  }, [currentVariant, guide]);

  const lightConesWithNotes = useMemo(() => {
    return parsedLightCones.filter(lc => Boolean(lc.note));
  }, [parsedLightCones]);

  const parsedRelics = useMemo(() => {
    return (currentVariant?.bestRelics || []).map((r, idx) => parseItemWithNote(r, idx + 1));
  }, [currentVariant]);

  const relicsWithNotes = useMemo(() => {
    return parsedRelics.filter(r => Boolean(r.note));
  }, [parsedRelics]);

  const parsedOrnaments = useMemo(() => {
    return (currentVariant?.bestOrnaments || []).map((o, idx) => parseItemWithNote(o, idx + 1));
  }, [currentVariant]);

  const ornamentsWithNotes = useMemo(() => {
    return parsedOrnaments.filter(o => Boolean(o.note));
  }, [parsedOrnaments]);

  const hasEquipmentNotes = Boolean(currentVariant?.note || relicsWithNotes.length > 0 || ornamentsWithNotes.length > 0);

  const parsedTargetStats = useMemo(() => {
    if (!currentVariant?.targetStats) return [];
    return currentVariant.targetStats.map((s: any) => {
      let label = s.label || '';
      let value = s.value || '';
      let note = s.note;

      if ((value.includes(':') || value.includes('：')) && !note) {
        const parts = value.split(/[:：]/);
        value = parts[0].trim();
        note = parts.slice(1).join(':').trim();
      } else if ((label.includes(':') || label.includes('：')) && !note) {
        const parts = label.split(/[:：]/);
        label = parts[0].trim();
        note = parts.slice(1).join(':').trim();
      }

      return { label, value, note };
    });
  }, [currentVariant]);

  const mainStatsWithNotes = useMemo(() => {
    if (!currentVariant?.mainStats) return [];
    const stats = [
      { label: '몸통', ...getStatValueAndNote(currentVariant.mainStats.body) },
      { label: '신발', ...getStatValueAndNote(currentVariant.mainStats.boots) },
      { label: '차원 구체', ...getStatValueAndNote(currentVariant.mainStats.sphere) },
      { label: '연결 매듭', ...getStatValueAndNote(currentVariant.mainStats.rope) },
    ];
    return stats.filter(s => Boolean(s.note));
  }, [currentVariant]);

  const targetStatsWithNotes = useMemo(() => {
    return parsedTargetStats.filter(s => Boolean(s.note) && s.label !== '참고');
  }, [parsedTargetStats]);

  const hasStatNotes = mainStatsWithNotes.length > 0 || targetStatsWithNotes.length > 0;

  if (!guide || !character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-8">
        <Info size={40} className="text-gray-400 mb-6" />
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2">공략을 찾을 수 없습니다</h2>
        <p className="text-gray-400 mb-8">해당 캐릭터의 상세 공략 데이터가 아직 등록되지 않았습니다.</p>
        <Link to={`/gallery/${gameId}`} className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all">
          <ChevronLeft size={16} /> 도감으로 돌아가기
        </Link>
      </div>
    );
  }

  const faqData = useMemo(() => {
    if (!guide || !character) return [];
    
    const charNameKo = character.name;
    const questions = [];

    // 1. 추천 광추 FAQ
    if (guide.bestLightCones && guide.bestLightCones.length > 0) {
      const firstLcName = typeof guide.bestLightCones[0] === 'string' 
        ? guide.bestLightCones[0] 
        : (guide.bestLightCones[0] as any).name;
      questions.push({
        question: `${charNameKo}의 추천 광추 세팅은 무엇인가요?`,
        answer: `${charNameKo}에게 가장 추천하는 광추는 "${firstLcName}"입니다. 그 외에도 ${guide.bestLightCones.slice(1, 4).map(lc => typeof lc === 'string' ? lc : (lc as any).name).join(', ')} 등을 활용할 수 있습니다.`
      });
    }

    // 2. 추천 유물/장신구 FAQ
    if (guide.bestRelics && guide.bestRelics.length > 0) {
      const firstRelicName = typeof guide.bestRelics[0] === 'string' 
        ? guide.bestRelics[0] 
        : (guide.bestRelics[0] as any).name;
      const firstOrnamentName = guide.bestOrnaments && guide.bestOrnaments.length > 0
        ? (typeof guide.bestOrnaments[0] === 'string' ? guide.bestOrnaments[0] : (guide.bestOrnaments[0] as any).name)
        : null;
      
      let answerText = `${charNameKo}의 추천 터널 유물 세팅은 "${firstRelicName}" 4세트입니다.`;
      if (firstOrnamentName) {
        answerText += ` 차원 장신구는 "${firstOrnamentName}" 2세트를 추천합니다.`;
      }
      questions.push({
        question: `${charNameKo}의 추천 유물 및 차원 장신구 세팅은 어떻게 되나요?`,
        answer: answerText
      });
    }

    // 3. 주요 속성 및 추천 부옵션 FAQ
    if (guide.mainStats || guide.subStats) {
      let statText = `${charNameKo}의 주요 권장 주옵션은 몸통(${getStatValueAndNote(guide.mainStats?.body).value || '공격력/치명타'}), 신발(${getStatValueAndNote(guide.mainStats?.boots).value || '속도'}), 구체(${getStatValueAndNote(guide.mainStats?.sphere).value || '속성 피해'}), 매듭(${getStatValueAndNote(guide.mainStats?.rope).value || '에너지 회복/공격력'})입니다.`;
      if (guide.subStats && guide.subStats.length > 0) {
        statText += ` 추천하는 핵심 부옵션 우선순위는 ${guide.subStats.slice(0, 4).join(', ')} 순입니다.`;
      }
      questions.push({
        question: `${charNameKo}의 추천 주옵션 및 부옵션 우선순위는 무엇인가요?`,
        answer: statText
      });
    }

    // 4. 추천 시너지 FAQ
    if (synergyCharacters && synergyCharacters.length > 0) {
      const synergyNames = synergyCharacters.slice(0, 5).map(m => m.name);
      questions.push({
        question: `${charNameKo}와(과) 잘 어울리는 추천 시너지 캐릭터는 누구인가요?`,
        answer: `${charNameKo}와(과) 조합하기 좋은 대표적인 캐릭터로는 ${synergyNames.join(', ')} 등이 널리 권장됩니다.`
      });
    }

    return questions;
  }, [guide, character, synergyCharacters]);

  const cdnFolderName = character.folderName.normalize('NFC');
  const heroImageUrl = `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(cdnFolderName)}/${character.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`;

  const getStateIconUrl = (fileName: string) => {
    return `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/common/stats/${fileName}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-24 font-sans">
      <SEO 
        title={`스타레일 ${character?.name || charName} 공략 | 종결 유물 세팅 · 추천 광추 순위 · 파티 조합 - 리라 아카이브`} 
        description={`붕괴: 스타레일 ${character?.name || charName}의 최신 추천 유물 및 차원 장신구, 종결 광추 랭킹, 주옵션/부옵션 목표 수치, 추천 파티 조합 완벽 공략 가이드.`} 
        image={heroImageUrl} 
        url={`/gallery/${gameId}/character/${character.id}/guide`}
        gameCategory={t('붕괴: 스타레일')}
        itemType={t('세팅 가이드')}
        modifiedTime={lastUpdatedDate}
        faqData={faqData}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('붕괴: 스타레일'), url: `/gallery/${gameId}` },
          { name: t('캐릭터'), url: `/gallery/${gameId}?menu=캐릭터` },
          { name: t(character.name), url: `/gallery/${gameId}/character/${character.id}` },
          { name: t('세팅 가이드'), url: `/gallery/${gameId}/character/${character.id}/guide` }
        ]}
      />

      <PageHeader gameId={gameId} category={t("공략")} title={`${character?.name || charName} 가이드`} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 sm:gap-12 justify-between">
        <div className="flex-1 w-full space-y-12 sm:space-y-16 guide-content">
          {/* 돌아가기 토글 버튼 */}
          <Link 
            to={`/gallery/${gameId}/character/${character.id}`}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-2xl text-xs sm:text-sm font-black text-gray-300 hover:text-white transition-all backdrop-blur-md group w-fit"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            {t('캐릭터 상세 정보로 돌아가기')}
          </Link>

          {/* Hero Section */}
          <section className="relative p-6 sm:p-10 md:p-16 rounded-[28px] sm:rounded-[44px] md:rounded-[60px] bg-[#0c0c0c] border border-white/5 overflow-hidden group">
            <div 
              style={{ backgroundImage: `url(${heroImageUrl})`, filter: 'brightness(0.3) blur(20px)', opacity: 0.2 }} 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute top-6 right-6 sm:top-10 sm:right-10 flex flex-col items-end gap-1.5 z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                <Clock size={12} className="text-gray-400" />
                <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest">Update: {guide.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                <Sparkles size={12} className="text-brand-accent" />
                <span className="text-[9px] sm:text-[10px] font-black text-brand-accent uppercase tracking-widest">v{guide.patchVersion}</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-12">
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-[28px] sm:rounded-[40px] md:rounded-[50px] border-4 border-white/10 overflow-hidden shadow-2xl relative z-10 bg-black/40">
                  <img src={heroImageUrl} alt={charName} className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              </div>
              <div className="text-center md:text-left space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-gray-400">{t(character.path)}</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.primary}20`, color: theme.secondary, border: `1px solid ${theme.primary}40` }}>{t(character.attribute)}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight">
                  {character?.name || charName} <span className="text-brand-accent">가이드</span>
                </h1>
                <p className="text-gray-400 font-bold text-xs sm:text-base md:text-lg border-l-4 border-brand-primary/40 pl-4 sm:pl-6">{t('최적의 성능을 위한 장비와 스탯 아카이브입니다.')}</p>
              </div>
            </div>
          </section>

          {/* 01 추천 광추 */}
          <section id="추천 광추" className="space-y-6">
            <SectionHeader num="01" title="추천 광추" theme={theme} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {parsedLightCones.map((lc, i) => {
                const lightCone = LIGHTCONE_DB.find(l => l.name === lc.cleanName);
                const lcUrl = lightCone ? encodeURI(`${BASE_IMAGE_URL}/광추/${lightCone.path.normalize('NFC')}/${(lightCone.fileName || lightCone.folderName).normalize('NFC')}.webp`) : null;
                const isBest = lc.rank === 1;

                return (
                  <Link 
                    key={i} 
                    to={`/gallery/${gameId}/lightcone/${encodeURIComponent(lc.cleanName)}`}
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
                      {lc.rank}순위
                    </div>
                    {isBest && (
                      <div className="absolute top-2 right-2 z-20 bg-black/40 p-1.5 rounded-full backdrop-blur-md border border-brand-accent/30 shadow-lg">
                        <Crown size={12} className="text-brand-accent" />
                      </div>
                    )}
                    <div className={`w-full aspect-[3/4] rounded-2xl ${isBest ? 'bg-gradient-to-b from-brand-primary/20 to-black/60' : 'bg-black/40'} flex items-center justify-center p-2 shrink-0 group-hover:scale-105 transition-transform overflow-hidden relative shadow-inner`}>
                      {lcUrl ? <img src={lcUrl} alt={lc.cleanName} className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => (e.currentTarget.style.opacity = '0.3')} /> : <Box className="text-gray-400" />}
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <h4 className={`text-[11px] md:text-[12px] font-black ${isBest ? 'text-brand-accent' : 'text-white'} group-hover:text-brand-accent transition-colors truncate w-full text-center leading-tight tracking-tighter px-1`}>{t(lc.cleanName)}</h4>
                      {isBest && (
                        <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">{t('추천 선택')}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 추천 광추 상세 분석 */}
            {lightConesWithNotes.length > 0 && (
              <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-4">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BookOpen size={20} className="text-brand-accent" />
                  <h4 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    {t('추천 광추 상세 분석')}
                  </h4>
                </div>
                <div className="space-y-3">
                  {lightConesWithNotes.map((lc: any, idx: number) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2 shrink-0 sm:w-48">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 ${lc.rank === 1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-300'}`}>
                          {lc.rank}순위
                        </span>
                        <span className="font-bold text-sm text-white truncate">{t(lc.cleanName)}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium flex-1 break-keep">
                        {t(lc.note)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 02 추천 장비 */}
          <section id="추천 장비" className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <SectionHeader num="02" title="추천 장비" theme={theme} />
              {guide.variants && guide.variants.length > 1 && (
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 mx-4">
                  {guide.variants.map((v, idx) => (
                    <button key={idx} onClick={() => setSelectedVariantIndex(idx)} className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedVariantIndex === idx ? 'bg-brand-primary text-white shadow-xl' : 'text-gray-400 hover:text-gray-300'}`}>{v.name}</button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Layers size={22} className="text-gray-400" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('터널 유물')}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {parsedRelics.map((relicItem, i) => {
                    const baseRelicName = relicItem.cleanName.replace(/\s*[24]세트/g, '').replace(/쫒/g, '쫓').trim();
                    const relic = RELIC_DB.find(r => 
                      r.name === relicItem.cleanName || 
                      r.name === baseRelicName || 
                      normalizeName(r.name) === normalizeName(baseRelicName)
                    );
                    const isFirst = relicItem.rank === 1;
                    return (
                      <Link 
                        key={i} 
                        to={`/gallery/${gameId}/relic/${encodeURIComponent(relic?.name || baseRelicName)}`} 
                        className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(126,48,225,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                      >
                        {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform relative z-10">
                            {relic ? <img src={getMainImageUrl(relic) || ''} className="w-full h-full object-contain" /> : <Layers className="text-gray-400" />}
                          </div>
                          <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors truncate">{t(relicItem.cleanName)}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                {relicItem.rank}순위
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Box size={22} className="text-gray-400" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('차원 장신구')}</span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {parsedOrnaments.map((ornamentItem, i) => {
                    const baseOrnName = ornamentItem.cleanName.replace(/\s*[24]세트/g, '').trim();
                    const ornament = ORNAMENT_DB.find(o => 
                      o.name === ornamentItem.cleanName || 
                      o.name === baseOrnName || 
                      normalizeName(o.name) === normalizeName(baseOrnName)
                    );
                    const isFirst = ornamentItem.rank === 1;
                    return (
                      <Link 
                        key={i} 
                        to={`/gallery/${gameId}/ornament/${encodeURIComponent(ornament?.name || baseOrnName)}`} 
                        className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(126,48,225,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                      >
                        {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform relative z-10">
                            {ornament ? <img src={getMainImageUrl(ornament) || ''} className="w-full h-full object-contain" /> : <Box className="text-gray-400" />}
                          </div>
                          <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                            <div className="flex items-center justify-between w-full">
                              <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors truncate">{t(ornamentItem.cleanName)}</span>
                              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                {ornamentItem.rank}순위
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 유물 & 차원 장신구 세팅 상세 분석 & 가이드 */}
            {hasEquipmentNotes && (
              <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BookOpen size={20} className="text-brand-accent" />
                  <h4 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                    {t('유물 & 차원 장신구 세팅 상세 분석')}
                  </h4>
                </div>

                {currentVariant?.note && (
                  <div className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-start gap-3">
                    <Sparkles size={18} className="text-brand-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs font-black text-brand-accent uppercase tracking-wider">
                        [{currentVariant.name}] {t('세팅 핵심 포인트')}
                      </span>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed">
                        {t(currentVariant.note)}
                      </p>
                    </div>
                  </div>
                )}

                {relicsWithNotes.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Layers size={14} className="text-brand-accent" />
                      {t('터널 유물 세부 가이드')}
                    </div>
                    <div className="space-y-2">
                      {relicsWithNotes.map((r: any, idx: number) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-2 shrink-0 sm:w-48">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 ${r.rank === 1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-300'}`}>
                              {r.rank}순위
                            </span>
                            <span className="font-bold text-sm text-white truncate">{t(r.cleanName)}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium flex-1 break-keep">
                            {t(r.note)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {ornamentsWithNotes.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      <Box size={14} className="text-brand-accent" />
                      {t('차원 장신구 세부 가이드')}
                    </div>
                    <div className="space-y-2">
                      {ornamentsWithNotes.map((o: any, idx: number) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                          <div className="flex items-center gap-2 shrink-0 sm:w-48">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 ${o.rank === 1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-300'}`}>
                              {o.rank}순위
                            </span>
                            <span className="font-bold text-sm text-white truncate">{t(o.cleanName)}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium flex-1 break-keep">
                            {t(o.note)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* 03 권장 스탯 */}
          <section id="권장 스텟" className="space-y-10">
            <SectionHeader num="03" title="권장 스텟" theme={theme} />
            <div className="flex flex-col gap-8">
              {/* Target Stats Section (Top) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent shadow-xl">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Target size={22} className="text-gray-400" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('목표 스탯')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {parsedTargetStats.filter(s => s.label !== '참고').map((s, i) => (
                    <div 
                      key={i} 
                      className="flex flex-col justify-between p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-brand-primary/20 transition-all group relative gap-3 h-full overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-200 transition-colors break-keep break-words">{t(s.label)}</span>
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <span className="text-lg font-black text-brand-accent italic tabular-nums break-keep break-words text-left">{t(s.value)}</span>
                        <div className="w-12 h-1 bg-brand-primary/20 rounded-full mt-2 overflow-hidden">
                           <div className="w-full h-full bg-brand-accent/40 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 목표 스탯 참고 사항 배너 */}
                {parsedTargetStats.filter(s => s.label === '참고').map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-start gap-3">
                    <Sparkles size={18} className="text-brand-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs font-black text-brand-accent uppercase tracking-wider">
                        [목표 스탯 참고 사항]
                      </span>
                      <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed break-keep">
                        {t(s.value)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Main & Sub Stats Section (Bottom) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-gray-400" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('주옵션 & 부옵션')}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(() => {
                    const bodyStat = getStatValueAndNote(currentVariant?.mainStats.body);
                    const bootsStat = getStatValueAndNote(currentVariant?.mainStats.boots);
                    const sphereStat = getStatValueAndNote(currentVariant?.mainStats.sphere);
                    const ropeStat = getStatValueAndNote(currentVariant?.mainStats.rope);
                    return (
                      <>
                        <StatBoxPremium label="몸통" value={bodyStat.value} theme={theme} iconImage={getStateIconUrl('RelicBody.webp')} />
                        <StatBoxPremium label="신발" value={bootsStat.value} theme={theme} iconImage={getStateIconUrl('RelicFoot.webp')} />
                        <StatBoxPremium label="차원 구체" value={sphereStat.value} theme={theme} iconImage={getStateIconUrl('RelicNeck.webp')} />
                        <StatBoxPremium label="연결 매듭" value={ropeStat.value} theme={theme} iconImage={getStateIconUrl('RelicGoods.webp')} />
                      </>
                    );
                  })()}
                </div>
                <div className="p-6 bg-white/[0.03] rounded-[32px] border border-white/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <TrendingUp size={48} />
                  </div>
                  <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
                    부옵션 우선순위
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentVariant?.subStats.map((s, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 text-base font-bold text-gray-200 italic group hover:text-brand-accent transition-all hover:translate-y-[-2px] hover:shadow-lg whitespace-nowrap">
                        <span className="text-brand-accent mr-2 font-black"># {i + 1}</span>{t(s)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 권장 스탯 상세 가이드 */}
              {hasStatNotes && (
                <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                    <BookOpen size={20} className="text-brand-accent" />
                    <h4 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
                      {t('권장 스탯 상세 가이드')}
                    </h4>
                  </div>

                  {mainStatsWithNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={14} className="text-brand-accent" />
                        {t('주옵션 세부 가이드')}
                      </div>
                      <div className="space-y-2">
                        {mainStatsWithNotes.map((stat: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 shrink-0 sm:w-48">
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 bg-brand-accent text-black">
                                {t(stat.label)}
                              </span>
                              <span className="font-bold text-sm text-white truncate">{t(stat.value)}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium flex-1 break-keep">
                              {t(stat.note)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {targetStatsWithNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs font-black text-gray-400 uppercase tracking-wider flex items-center gap-2">
                        <Target size={14} className="text-brand-accent" />
                        {t('목표 스탯 세부 가이드')}
                      </div>
                      <div className="space-y-2">
                        {targetStatsWithNotes.map((s: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-2 shrink-0 sm:w-48">
                              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0 bg-white/10 text-gray-300">
                                {t(s.label)}
                              </span>
                              <span className="font-bold text-sm text-white truncate">{t(s.value)}</span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium flex-1 break-keep">
                              {t(s.note)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>


          {/* 04 시너지 캐릭터 */}
          {synergyCharacters.length > 0 && (
            <section id="시너지 캐릭터" className="space-y-10">
              <SectionHeader num="04" title="추천 시너지 캐릭터" theme={theme} />
              <div className="glass-card rounded-[45px] p-10 md:p-12 border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
                <div className="flex flex-wrap gap-8">
                  {synergyCharacters.map((member, idx) => {
                    const memberChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(member.name)) || normalizeName(c.folderName) === normalizeName(t(member.name)));
                    const memberImg = memberChar ? `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(memberChar.folderName.normalize('NFC'))}/${memberChar.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}` : '';
                    
                    return (
                      <Link 
                        key={idx}
                        to={`/gallery/${gameId}/character/${memberChar?.id || member.name}`}
                        className="flex flex-col items-center gap-4 group/member w-[100px]"
                      >
                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                           <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover/member:opacity-100 transition-opacity" />
                           <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-accent transition-all duration-300 p-1 bg-black/40 shadow-xl">
                              <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full group-hover/member:scale-110 transition-transform duration-500" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                           </div>
                        </div>
                        <div className="text-center space-y-1">
                          <div className="text-sm font-black text-gray-300 group-hover/member:text-brand-accent transition-colors whitespace-nowrap">{t(member.name)}</div>
                          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">{t(member.role)}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* E-E-A-T Authorship & Methodology Note */}
          <section className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 rounded-[35px] bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Users size={20} className="text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white uppercase tracking-widest">{t('Intelligence Source')}</h4>
                  <p className="text-[11px] text-gray-400 font-medium">Authored by <span className="text-brand-accent font-black">Rira Archive Editorial Team</span></p>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 max-w-md text-center md:text-right font-medium leading-relaxed">
                {t('이 분석 리포트는 최신 생성형 AI 기술을 활용한 데이터 프로세싱과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다.')}
              </div>
            </div>
            {guide && (
              <div className="mt-4 flex justify-end">
                <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase">
                  {t('최종 업데이트')} : {lastUpdatedDate} (v{guide.patchVersion || '1.0'})
                </p>
              </div>
            )}
          </section>
        </div>

        {/* Sidebar / TOC */}
        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-32 h-fit space-y-8">
          <TableOfContents selector=".guide-content" />
          <AdPlaceholder type="rectangle" />
        </aside>
      </div>
    </div>
  );
};

export default CharacterGuideDetail;
