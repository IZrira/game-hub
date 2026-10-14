import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { 
  ChevronLeft, 
  Zap, 
  Info, 
  Sparkles,
  Layers,
  Box,
  TrendingUp,
  Target,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Users
} from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../../common-hub/data/games';
import { HSR_PARTIES } from '../data/parties';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { GuideLayout, GuideHero, GuideSummary, GuideVariantSelector, GuideEquipmentCard, GuideSectionHeader as SectionHeader } from '../../common-hub/components/guides/GuideLayout';
import { useTranslation } from 'react-i18next';
import { getHsrCharacterArtUrl, handleImageFallback } from '../../common-hub/utils/assetManager';
import { sanitizePublicGuideData } from '../../common-hub/utils/publicGuideLinks';

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

  const handleImgError = () => {
    setImgUrl(undefined);
  };

  return (
    <div className="group glass-card min-w-0 rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-white/25 transition-all bg-gradient-to-b from-white/[0.05] to-white/[0.02] flex flex-col items-center text-center gap-3 h-full relative overflow-hidden">
      {imgUrl ? (
        <div className="w-11 h-11 bg-black/40 rounded-xl p-2 flex items-center justify-center border border-white/10 relative z-10">
          <img 
            src={imgUrl} 
            alt={label} 
            className="w-full h-full object-contain" 
            onError={handleImgError}
          />
        </div>
      ) : (
        <div className="w-11 h-11 bg-black/40 rounded-xl flex items-center justify-center border border-white/10 relative z-10">
          <span className="text-white font-black text-lg uppercase opacity-40">{label.slice(0, 1)}</span>
        </div>
      )}
      
      <div className="space-y-3 w-full relative z-10 flex flex-col items-center">
        {/* 파츠 라벨 (몸통, 신발, 차원 구체, 연결 매듭) 가시성 대폭 강화 */}
        <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-black text-white uppercase tracking-wider whitespace-nowrap shadow-sm">
          {t(label, { keySeparator: false, nsSeparator: false })}
        </span>
        
        {/* 추천 주옵션 값 가시성 강화 */}
        <div className="flex flex-col gap-2 w-full">
          {processedValues.map((v, i) => {
            const isFirstChoice = i === 0;
            const colonIdx = v.indexOf(':') !== -1 ? v.indexOf(':') : v.indexOf('：');
            let statName = v;
            let noteText = '';
            if (colonIdx !== -1) {
              statName = v.substring(0, colonIdx).trim();
              noteText = v.substring(colonIdx + 1).trim();
            }

            return (
              <div 
                key={i} 
                className={`relative w-full py-2.5 px-3 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
                  isFirstChoice 
                    ? 'bg-brand-primary/15 border border-brand-accent/35 shadow-[0_0_12px_rgba(126,48,225,0.08)]' 
                    : 'bg-white/[0.04] hover:bg-white/[0.07] border border-white/10'
                }`}
              >
                <div className="flex min-w-0 max-w-full flex-wrap items-center justify-center gap-1.5">
                  {processedValues.length > 1 && (
                    <span className={`text-xs font-black px-1.5 py-0.5 rounded shrink-0 ${
                      isFirstChoice ? 'bg-brand-accent text-black' : 'bg-white/15 text-white'
                    }`}>
                      #{i + 1}
                    </span>
                  )}
                  <span className="min-w-0 max-w-full text-sm sm:text-base font-bold text-white tracking-tight break-words text-center leading-snug">
                    {t(statName)}
                  </span>
                </div>
                {noteText && (
                  <div className="w-full pt-1.5 mt-0.5 border-t border-white/10 flex flex-col items-center">
                    <span className="text-xs text-gray-300 font-normal leading-relaxed text-center break-keep">
                      {t(noteText)}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
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
          const memberImg = memberChar ? getHsrCharacterArtUrl(memberChar.folderName, memberChar.isTrailblazer) : '';
          
          return (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-4 group/member relative bg-white/[0.02] border border-white/10 rounded-3xl p-4 sm:p-5 transition-all hover:border-brand-primary/20"
            >
              <div className="relative w-24 h-24 sm:w-28 sm:h-28">
                 <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/20 to-transparent rounded-full blur-2xl opacity-0 group-hover/member:opacity-40 transition-opacity" />
                 <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-primary/50 transition-all duration-500 p-1 bg-black/40 shadow-2xl">
                    <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full scale-110 group-hover/member:scale-125 transition-transform duration-700" onError={handleImageFallback} />
                 </div>
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-black text-brand-accent uppercase tracking-widest whitespace-nowrap z-10">
                   {t(member.role)}
                 </div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-base sm:text-lg font-black text-white group-hover/member:text-brand-accent transition-colors break-words">{t(member.name)}</div>
                <div className="text-xs font-bold text-gray-300 tracking-wide break-words">{t(member.role)}</div>
              </div>

              {/* 대체 캐릭터 (호버 없이 하단에 직접 배치) */}
              {member.substitutes && member.substitutes.length > 0 && (
                <div className="w-full pt-3 border-t border-white/5 flex flex-col items-center gap-2 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                    <span className="text-xs font-black text-brand-accent uppercase tracking-wider">
                      {t('대체 캐릭터')}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {member.substitutes.map((sub: any, sIdx: number) => {
                      const subChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(sub.name)) || normalizeName(c.folderName) === normalizeName(t(sub.name)));
                      const subImg = subChar ? getHsrCharacterArtUrl(subChar.folderName, subChar.isTrailblazer || sub.isTrailblazer) : '';
                      return (
                        <div key={sIdx} className="flex flex-col items-center gap-1 group/sub">
                          <div className="w-11 h-11 rounded-2xl border border-white/10 overflow-hidden bg-black/40 p-0.5 group-hover/sub:border-brand-accent/50 transition-all shadow-md">
                            {subImg ? (
                              <img src={subImg} alt={sub.name} className="w-full h-full object-cover rounded-xl group-hover/sub:scale-110 transition-transform" onError={handleImageFallback} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-bold">{sub.name?.[0]}</div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-gray-300 group-hover/sub:text-brand-accent transition-colors max-w-[56px] break-words text-center">
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
  const [activeGuideView, setActiveGuideView] = useState<'setup' | 'analysis'>('setup');

  useEffect(() => {
    setSelectedVariantIndex(0);
    setActiveGuideView('setup');
  }, [charName]);

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
      return sanitizePublicGuideData(HSR_CHARACTER_GUIDES.find(g => normalizeName(g.characterName) === searchName));
    }
    const searchName = normalizeName(character.name || character.folderName || resolvedKoName || "");
    return sanitizePublicGuideData(HSR_CHARACTER_GUIDES.find(g =>
      g.characterName === character.name ||
      g.characterName === character.folderName ||
      normalizeName(g.characterName) === searchName ||
      (character.id && normalizeName(g.characterName) === normalizeName(character.id))
    ));
  }, [character, resolvedKoName]);

  const currentVariant = useMemo(() => {
    if (!guide) return null;
    if (guide.variants && guide.variants.length > 0) {
      return guide.variants[selectedVariantIndex] || guide.variants[0];
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

    guide?.synergyCharacters?.forEach(member => {
      const normalizedMemberName = normalizeName(typeof member === 'string' ? member : member.name);
      const memberData = typeof member === 'string'
        ? { name: member, role: '추천 캐릭터' }
        : member;
      if (normalizedMemberName && normalizedMemberName !== searchName) {
        chars.set(normalizedMemberName, memberData);
      }
    });
    
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
  }, [guide, resolvedKoName]);

  const lastUpdatedDate = guide ? (guide.lastUpdated || '2026-05-23') : '2026-05-23';
  const publishedAnalysis = guide?.analysis?.status === 'published' ? guide.analysis : undefined;

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

  const isStandardStatLabel = (label: string) => {
    if (!label) return false;
    const clean = label.trim();
    if (/사용\s*시|버프\s*시|참고|세팅|조합|한정|필수|주의|추천|기준|파티/.test(clean)) return false;

    const validStatKeywords = [
      '공격력', '속도', 'HP', '생명력', '방어력', 
      '치명타 확률', '치명타 피해', '격파 특수효과', '효과 명중', '효과 저항', 
      '에너지 충전 효율', '에너지 회복 효율', '치유량 보너스', '치유량',
      '물리', '화염', '얼음', '번개', '바람', '양자', '허수', '속성 피해', '피해 증가'
    ];

    return validStatKeywords.some(k => clean.includes(k));
  };

  const targetStatCards = useMemo(() => {
    return parsedTargetStats.filter((s: any) => isStandardStatLabel(s.label));
  }, [parsedTargetStats]);

  const targetStatDetails = useMemo(() => {
    const details: { label: string; valueBadge?: string; description: string }[] = [];

    parsedTargetStats.forEach((s: any) => {
      const isStandard = isStandardStatLabel(s.label);

      if (isStandard) {
        if (s.note) {
          details.push({
            label: s.label,
            valueBadge: s.value,
            description: s.note,
          });
        }
      } else {
        const labelText = s.label === '참고' ? '참고 사항' : s.label;
        const desc = s.note ? `${s.value} (${s.note})` : s.value;
        details.push({
          label: labelText,
          description: desc,
        });
      }
    });

    return details;
  }, [parsedTargetStats]);

  const hasStatNotes = mainStatsWithNotes.length > 0 || targetStatDetails.length > 0;

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

  if (!guide || !character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white p-8">
        <Info size={40} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-black uppercase tracking-widest mb-2">공략을 찾을 수 없습니다</h2>
        <p className="text-gray-300 mb-8">해당 캐릭터의 상세 공략 데이터가 아직 등록되지 않았습니다.</p>
        <Link to={`/gallery/${gameId}`} className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-xl font-black text-sm hover:scale-105 transition-all">
          <ChevronLeft size={16} /> 도감으로 돌아가기
        </Link>
      </div>
    );
  }

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

      <GuideLayout navigationKey={`${character.id}-${activeGuideView}-${selectedVariantIndex}`}>
          <GuideHero
            name={t(character.name)}
            image={heroImageUrl}
            backTo={`/gallery/${gameId}/character/${character.id}`}
            version={guide.patchVersion}
            updatedAt={lastUpdatedDate}
            tags={[t(character.path), t(character.attribute)]}
          />

          {publishedAnalysis && (
            <nav aria-label="공략 종류 선택" className="grid grid-cols-2 gap-2 p-2 rounded-2xl bg-white/[0.03] border border-white/10">
              <button
                type="button"
                aria-pressed={activeGuideView === 'setup'}
                onClick={() => setActiveGuideView('setup')}
                className={`px-4 sm:px-5 py-3 rounded-xl border text-sm font-black transition-all ${activeGuideView === 'setup' ? 'bg-brand-primary/25 border-brand-accent/40 text-brand-accent shadow-[0_0_20px_rgba(126,48,225,0.15)]' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-gray-300 hover:text-white'}`}
              >
                세팅 가이드
              </button>
              <button
                type="button"
                aria-pressed={activeGuideView === 'analysis'}
                onClick={() => setActiveGuideView('analysis')}
                className={`px-4 sm:px-5 py-3 rounded-xl border text-sm font-black transition-all ${activeGuideView === 'analysis' ? 'bg-brand-primary/25 border-brand-accent/40 text-brand-accent shadow-[0_0_20px_rgba(126,48,225,0.15)]' : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/10 text-gray-300 hover:text-white'}`}
              >
                RIRA 분석 가이드
              </button>
            </nav>
          )}

          {(!publishedAnalysis || activeGuideView === 'setup') && (
            <>
          {guide.variants && guide.variants.length > 1 && (
            <GuideVariantSelector
              label={t('세팅 선택')}
              options={guide.variants.map((variant, index) => ({ label: t(variant.name), value: String(index) }))}
              value={String(selectedVariantIndex)}
              onChange={(value) => setSelectedVariantIndex(Number(value))}
              description={t('선택한 세팅의 광추, 유물, 옵션과 목표 수치가 함께 표시됩니다.')}
            />
          )}
          <GuideSummary items={[
            { label: t('추천 광추'), value: parsedLightCones[0] ? t(parsedLightCones[0].cleanName) : '' },
            { label: t('터널 유물'), value: parsedRelics[0] ? t(parsedRelics[0].cleanName) : '' },
            { label: t('차원 장신구'), value: parsedOrnaments[0] ? t(parsedOrnaments[0].cleanName) : '' },
            { label: t('주옵션'), value: [
              { label: '몸통', stat: currentVariant?.mainStats.body },
              { label: '신발', stat: currentVariant?.mainStats.boots },
              { label: '차원 구체', stat: currentVariant?.mainStats.sphere },
              { label: '연결 매듭', stat: currentVariant?.mainStats.rope },
            ].filter((item) => item.stat).map((item) => `${t(item.label)} ${t(getStatValueAndNote(item.stat).value)}`).join(' · ') },
          ].filter((item) => item.value)} />
          {/* 01 추천 광추 */}
          <section id="추천 광추" className="space-y-6">
            <SectionHeader num="01" title="추천 광추" theme={theme} />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {parsedLightCones.map((lc, i) => {
                const lightCone = LIGHTCONE_DB.find(l => l.name === lc.cleanName);
                const lcUrl = lightCone ? encodeURI(`${BASE_IMAGE_URL}/광추/${lightCone.path.normalize('NFC')}/${(lightCone.fileName || lightCone.folderName).normalize('NFC')}.webp`) : null;
                return (
                  <GuideEquipmentCard
                    key={i}
                    name={t(lc.cleanName)}
                    image={lcUrl || ''}
                    to={`/gallery/${gameId}/lightcone/${encodeURIComponent(lc.cleanName)}`}
                    rank={lc.rank}
                  />
                );
              })}
            </div>

            {/* 추천 광추 상세 분석 */}
            {lightConesWithNotes.length > 0 && (
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        {t('추천 광추 상세 분석')}
                      </h4>
                      <span className="text-xs text-gray-300 font-medium">광추별 추천 이유 및 운용 팁</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {lightConesWithNotes.map((lc: any, idx: number) => {
                    const isRank1 = lc.rank === 1;
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 p-4 sm:p-5 rounded-2xl transition-all border-l-4 shadow-sm group ${
                          isRank1 
                            ? 'bg-brand-primary/[0.08] border border-brand-primary/30 border-l-brand-accent shadow-[0_0_15px_rgba(126,48,225,0.1)]' 
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 border-l-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 shrink-0 lg:w-[260px]">
                          <span className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 ${
                            isRank1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-200 border border-white/10'
                          }`}>
                            {lc.rank}순위
                          </span>
                          <span className="font-bold text-sm sm:text-base text-white break-words">{t(lc.cleanName)}</span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
                          {t(lc.note)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* 02 추천 장비 */}
          <section id="추천 장비" className="space-y-5 sm:space-y-6">
            <SectionHeader num="02" title="추천 장비" theme={theme} />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Layers size={22} className="text-gray-300" />
                  <span className="text-xl font-bold tracking-tight">{t('터널 유물')}</span>
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
                        className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(126,48,225,0.15)] z-10' : 'bg-white/5 border border-white/10 hover:border-brand-primary/30'}`}
                      >
                        {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform relative z-10">
                            {relic ? <img src={getMainImageUrl(relic) || ''} className="w-full h-full object-contain" /> : <Layers className="text-gray-300" />}
                          </div>
                          <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                            <div className="flex items-start justify-between gap-3 w-full">
                              <span className="min-w-0 flex-1 text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors break-words">{t(relicItem.cleanName)}</span>
                              <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-300'}`}>
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

              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Box size={22} className="text-gray-300" />
                  <span className="text-xl font-bold tracking-tight">{t('차원 장신구')}</span>
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
                        className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(126,48,225,0.15)] z-10' : 'bg-white/5 border border-white/10 hover:border-brand-primary/30'}`}
                      >
                        {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-14 h-14 rounded-2xl bg-black/40 p-2 shrink-0 group-hover:scale-110 transition-transform relative z-10">
                            {ornament ? <img src={getMainImageUrl(ornament) || ''} className="w-full h-full object-contain" /> : <Box className="text-gray-300" />}
                          </div>
                          <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                            <div className="flex items-start justify-between gap-3 w-full">
                              <span className="min-w-0 flex-1 text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors break-words">{t(ornamentItem.cleanName)}</span>
                              <span className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-300'}`}>
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
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        {t('유물 & 차원 장신구 세팅 상세 분석')}
                      </h4>
                      <span className="text-xs text-gray-300 font-medium">추천 장비 순위별 상세 효과 및 운용 팁</span>
                    </div>
                  </div>
                </div>

                {currentVariant?.note && (
                  <div className="p-5 rounded-2xl bg-brand-primary/10 border border-brand-primary/25 flex items-start gap-3.5 border-l-4 border-l-brand-accent shadow-sm">
                    <Sparkles size={20} className="text-brand-accent shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                        [{currentVariant.name}] {t('세팅 핵심 포인트')}
                      </span>
                      <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                        {t(currentVariant.note)}
                      </p>
                    </div>
                  </div>
                )}

                {relicsWithNotes.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Layers size={16} className="text-white" />
                      {t('터널 유물 세부 가이드')}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {relicsWithNotes.map((r: any, idx: number) => {
                        const isRank1 = r.rank === 1;
                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 p-4 sm:p-5 rounded-2xl transition-all border-l-4 shadow-sm group ${
                              isRank1 
                                ? 'bg-brand-primary/[0.08] border border-brand-primary/30 border-l-brand-accent shadow-[0_0_15px_rgba(126,48,225,0.1)]' 
                                : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 border-l-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 shrink-0 lg:w-[320px]">
                              <span className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 ${
                                isRank1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-200 border border-white/10'
                              }`}>
                                {r.rank}순위
                              </span>
                              <span className="font-bold text-sm sm:text-base text-white break-words">{t(r.cleanName)}</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
                              {t(r.note)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {ornamentsWithNotes.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                      <Box size={16} className="text-white" />
                      {t('차원 장신구 세부 가이드')}
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {ornamentsWithNotes.map((o: any, idx: number) => {
                        const isRank1 = o.rank === 1;
                        return (
                          <div 
                            key={idx} 
                            className={`flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 p-4 sm:p-5 rounded-2xl transition-all border-l-4 shadow-sm group ${
                              isRank1 
                                ? 'bg-brand-primary/[0.08] border border-brand-primary/30 border-l-brand-accent shadow-[0_0_15px_rgba(126,48,225,0.1)]' 
                                : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 border-l-white/20'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 shrink-0 lg:w-[320px]">
                              <span className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 ${
                                isRank1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-200 border border-white/10'
                              }`}>
                                {o.rank}순위
                              </span>
                              <span className="font-bold text-sm sm:text-base text-white break-words">{t(o.cleanName)}</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
                              {t(o.note)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* 03 권장 스탯 */}
          <section id="권장 스텟" className="space-y-5 sm:space-y-6">
            <SectionHeader num="03" title="권장 스텟" theme={theme} />
            <div className="flex flex-col gap-8">
              {/* Main and Sub Stats */}
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-white" />
                  <span className="text-xl font-bold tracking-tight text-white">{t('주옵션 & 부옵션')}</span>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
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
                <div className="p-6 sm:p-7 bg-white/[0.03] rounded-[28px] border border-white/10 relative overflow-hidden space-y-4">
                  <div className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={16} className="text-white" />
                    <span>{t('부옵션 우선순위')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {currentVariant?.subStats.map((s, i) => {
                      const isFirst = i === 0;
                      return (
                        <div 
                          key={i} 
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-sm ${
                            isFirst 
                              ? 'bg-brand-primary/15 border border-brand-accent/40 shadow-[0_0_15px_rgba(126,48,225,0.15)]' 
                              : 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/15'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded-md text-xs font-black ${
                            isFirst ? 'bg-brand-accent text-black' : 'bg-white/15 text-white'
                          }`}>
                            #{i + 1}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white break-words">
                            {t(s)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Target Stats and Conditions */}
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent shadow-xl">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <Target size={22} className="text-gray-300" />
                  <span className="text-xl font-bold tracking-tight">{t('목표 스탯')}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {targetStatCards.map((s, i) => (
                    <div
                      key={i}
                      className="flex flex-col justify-between p-5 bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl border border-white/10 hover:border-white/20 transition-all group relative gap-3 h-full overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors break-keep break-words">{t(s.label)}</span>
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <span className="text-xl sm:text-2xl font-bold text-white tabular-nums break-keep break-words text-left">{t(s.value)}</span>
                        {s.note && <p className="mt-2 text-sm text-gray-300 leading-relaxed">{t(s.note)}</p>}
                        <div className="w-12 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                           <div className="w-full h-full bg-white/60" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 권장 스탯 상세 가이드 */}
              {hasStatNotes && (
                <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                          {t('권장 스탯 상세 가이드')}
                        </h4>
                        <span className="text-xs text-gray-300 font-medium">세팅 추천 수치 및 조건별 가이드</span>
                      </div>
                    </div>
                  </div>

                  {mainStatsWithNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={16} className="text-white" />
                        {t('주옵션 세부 가이드')}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {mainStatsWithNotes.map((stat: any, idx: number) => (
                          <div key={idx} className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all border-l-4 border-l-brand-accent shadow-sm group">
                            <div className="flex items-center gap-2.5 shrink-0 lg:w-[240px]">
                              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wide bg-brand-accent text-black shrink-0 shadow-sm">
                                {t(stat.label)}
                              </span>
                              <span className="font-bold text-sm sm:text-base text-white tracking-tight">{t(stat.value)}</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
                              {t(stat.note)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {targetStatDetails.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <Target size={16} className="text-white" />
                        {t('목표 스탯 세부 가이드')}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {targetStatDetails.map((item: any, idx: number) => (
                          <div key={idx} className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all border-l-4 border-l-brand-accent shadow-sm group">
                            <div className="flex items-center gap-2.5 shrink-0 lg:w-[240px]">
                              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wide bg-brand-primary/20 text-white border border-brand-accent/30 shrink-0 shadow-sm whitespace-nowrap">
                                {t(item.label)}
                              </span>
                              {item.valueBadge && (
                                <span className="font-bold text-sm sm:text-base text-white tracking-tight tabular-nums">{t(item.valueBadge)}</span>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
                              {t(item.description)}
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
            <section id="시너지 캐릭터" className="space-y-5 sm:space-y-6">
              <SectionHeader num="04" title="추천 시너지 캐릭터" theme={theme} />
              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent shadow-2xl">
                <div className="flex flex-wrap gap-8">
                  {synergyCharacters.map((member, idx) => {
                    const memberChar = CHARACTER_DB.find(c => normalizeName(t(c.name)) === normalizeName(t(member.name)) || normalizeName(c.folderName) === normalizeName(t(member.name)));
                    const memberImg = memberChar ? getHsrCharacterArtUrl(memberChar.folderName, memberChar.isTrailblazer) : '';
                    
                    return (
                      <Link 
                        key={idx}
                        to={`/gallery/${gameId}/character/${memberChar?.id || member.name}`}
                        className="flex flex-col items-center gap-4 group/member w-[100px]"
                      >
                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                           <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover/member:opacity-100 transition-opacity" />
                           <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-accent transition-all duration-300 p-1 bg-black/40 shadow-xl">
                              <img src={memberImg} alt={member.name} className="w-full h-full object-cover rounded-full group-hover/member:scale-110 transition-transform duration-500" onError={handleImageFallback} />
                           </div>
                        </div>
                        <div className="text-center space-y-1">
                          <div className="text-sm font-black text-gray-300 group-hover/member:text-brand-accent transition-colors break-words">{t(member.name)}</div>
                          <div className="text-xs font-bold text-gray-300 tracking-wide break-words">{t(member.role)}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
            </>
          )}

          {publishedAnalysis && activeGuideView === 'analysis' && (
            <section id="rira-analysis" className="space-y-8 scroll-mt-32">
              <SectionHeader num="R" title="RIRA 분석" theme={theme} />

              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-brand-primary/25 bg-gradient-to-br from-brand-primary/10 via-white/[0.03] to-transparent space-y-6 shadow-2xl">
                <div className="flex flex-wrap gap-2 text-xs font-black tracking-wider">
                  <span className="px-3 py-1.5 rounded-full bg-brand-primary/20 text-brand-accent border border-brand-accent/25">{publishedAnalysis.role}</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.06] text-gray-300 border border-white/10">분석 기준 {publishedAnalysis.standard}</span>
                  <span className="px-3 py-1.5 rounded-full bg-white/[0.06] text-gray-300 border border-white/10">검토 {publishedAnalysis.reviewedAt}</span>
                </div>
                <div>
                  <p className="text-xs font-black text-brand-accent uppercase tracking-[0.2em] mb-3">RIRA 한줄평</p>
                  <p className="text-lg sm:text-xl font-bold text-white leading-relaxed break-keep">{publishedAnalysis.summary}</p>
                </div>
                <p className="text-xs text-gray-300">작성·검수: {publishedAnalysis.reviewer}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-3xl p-5 sm:p-7 border border-emerald-400/20 bg-emerald-400/[0.04] space-y-5">
                  <h3 className="flex items-center gap-3 text-xl font-black text-white"><CheckCircle2 size={21} className="text-emerald-400" /> 장점</h3>
                  <ul className="space-y-3">
                    {publishedAnalysis.strengths.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm sm:text-base text-gray-200 leading-relaxed"><span className="text-emerald-400 font-black">+</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card rounded-3xl p-5 sm:p-7 border border-amber-400/20 bg-amber-400/[0.04] space-y-5">
                  <h3 className="flex items-center gap-3 text-xl font-black text-white"><AlertCircle size={21} className="text-amber-400" /> 주의점</h3>
                  <ul className="space-y-3">
                    {publishedAnalysis.weaknesses.map((item, index) => (
                      <li key={index} className="flex gap-3 text-sm sm:text-base text-gray-200 leading-relaxed"><span className="text-amber-400 font-black">-</span><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {publishedAnalysis.teamPrinciple && (
                <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-white/[0.03] space-y-3">
                  <h3 className="flex items-center gap-3 text-xl font-black text-white"><Users size={21} className="text-brand-accent" /> 파티 구성 원리</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed break-keep">{publishedAnalysis.teamPrinciple}</p>
                </div>
              )}

              <div className="glass-card rounded-3xl p-5 sm:p-7 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-7">
                <div>
                  <h3 className="flex items-center gap-3 text-xl font-black text-white mb-3"><Zap size={21} className="text-brand-accent" /> 기본 운용법</h3>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed break-keep">{publishedAnalysis.gameplay.overview}</p>
                </div>
                {publishedAnalysis.gameplay.rotation && publishedAnalysis.gameplay.rotation.length > 0 && (
                  <ol className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {publishedAnalysis.gameplay.rotation.map((step, index) => (
                      <li key={index} className="flex gap-4 p-4 rounded-2xl bg-black/25 border border-white/10 text-sm text-gray-200 leading-relaxed">
                        <span className="shrink-0 w-7 h-7 rounded-full bg-brand-primary/20 border border-brand-accent/30 text-brand-accent font-black flex items-center justify-center">{index + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">운용 핵심</h4>
                  {publishedAnalysis.gameplay.tips.map((tip, index) => (
                    <p key={index} className="flex gap-3 text-sm sm:text-base text-gray-300 leading-relaxed"><span className="text-brand-accent">•</span><span>{tip}</span></p>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* E-E-A-T Authorship & Methodology Note */}
          <section className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 rounded-[35px] bg-white/[0.02] border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center border border-brand-primary/20">
                  <Users size={20} className="text-brand-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-white">{t('데이터 출처')}</h4>
                  <p className="text-xs text-gray-300 font-medium">{t('작성·검수')}: <span className="text-brand-accent font-black">RIRA ARCHIVE</span></p>
                </div>
              </div>
              <div className="text-xs text-gray-300 max-w-md text-center md:text-right font-medium leading-relaxed">
                {t('이 분석 리포트는 최신 생성형 AI 기술을 활용한 데이터 프로세싱과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다.')}
              </div>
            </div>
            {guide && (
              <div className="mt-4 flex justify-end">
                <p className="text-xs font-bold text-gray-300 tracking-wider uppercase">
                  {t('최종 업데이트')} : {lastUpdatedDate} (v{guide.patchVersion || '1.0'})
                </p>
              </div>
            )}
          </section>
      </GuideLayout>
    </div>
  );
};

export default CharacterGuideDetail;
