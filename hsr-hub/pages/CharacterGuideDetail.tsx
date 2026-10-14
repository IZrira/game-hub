import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronLeft, Info } from 'lucide-react';
import { HSR_CHARACTER_GUIDES } from '../data/guides';
import { CHARACTER_DB, LIGHTCONE_DB, RELIC_DB, ORNAMENT_DB } from '../../common-hub/data/games';
import { HSR_PARTIES } from '../data/parties';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { GuideLayout, GuideHero, GuideSummary, GuideVariantSelector } from '../../common-hub/components/guides/GuideLayout';
import { useTranslation } from 'react-i18next';
import { getHsrCharacterArtUrl } from '../../common-hub/utils/assetManager';
import { sanitizePublicGuideData } from '../../common-hub/utils/publicGuideLinks';
import { parseGuideOption, GuideBuildContent, GuideAnalysis, GuideViewTabs, GuideFooter } from '../../common-hub/components/guides/GuideContent';

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
    alternatives: typeof item === 'object' ? item.alternatives as string[] | undefined : undefined,
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
  const { t } = useTranslation();
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

  const parsedRelics = useMemo(() => {
    return (currentVariant?.bestRelics || []).map((r, idx) => parseItemWithNote(r, idx + 1));
  }, [currentVariant]);

  const parsedOrnaments = useMemo(() => {
    return (currentVariant?.bestOrnaments || []).map((o, idx) => parseItemWithNote(o, idx + 1));
  }, [currentVariant]);

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

      return { label, value, note, description: /사용\s*시|경우|참고|세팅|조건/.test(label) };
    });
  }, [currentVariant]);

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

  const mainOptions = [
    ['몸통', currentVariant?.mainStats.body],
    ['신발', currentVariant?.mainStats.boots],
    ['차원 구체', currentVariant?.mainStats.sphere],
    ['연결 매듭', currentVariant?.mainStats.rope],
  ].map(([label, stat]) => {
    const parsed = getStatValueAndNote(stat);
    return { label: String(label), values: parseGuideOption(parsed.value, true), note: parsed.note };
  });
  const primaryEquipment = [{ id: '추천 광추', title: '추천 광추', items: parsedLightCones.map(item => {
    const entry = LIGHTCONE_DB.find(candidate => candidate.name === item.cleanName);
    const image = entry ? encodeURI(`${BASE_IMAGE_URL}/광추/${entry.path.normalize('NFC')}/${(entry.fileName || entry.folderName).normalize('NFC')}.webp`) : '';
    return { name: t(item.cleanName), rank: item.rank, note: item.note ? t(item.note) : undefined, image, to: `/gallery/${gameId}/lightcone/${encodeURIComponent(item.cleanName)}` };
  }) }];
  const setEquipment = [
    { title: '터널 유물', items: parsedRelics.map(item => {
      const baseName = item.cleanName.replace(/\s*[24]세트/g, '').replace(/쫒/g, '쫓').trim();
      const entry = RELIC_DB.find(candidate => candidate.name === item.cleanName || candidate.name === baseName || normalizeName(candidate.name) === normalizeName(baseName));
      return { name: t(item.cleanName), rank: item.rank, note: item.note ? t(item.note) : undefined, image: getMainImageUrl(entry) || '', group: !entry && /2세트\s*\+/.test(item.cleanName), to: entry ? `/gallery/${gameId}/relic/${encodeURIComponent(entry.name)}` : undefined };
    }) },
    { title: '차원 장신구', items: parsedOrnaments.map(item => {
      const baseName = item.cleanName.replace(/\s*[24]세트/g, '').trim();
      const entry = ORNAMENT_DB.find(candidate => candidate.name === item.cleanName || candidate.name === baseName || normalizeName(candidate.name) === normalizeName(baseName));
      const alternatives = item.alternatives?.map(name => {
        const alternative = ORNAMENT_DB.find(candidate => candidate.name === name);
        return { name: t(name), image: getMainImageUrl(alternative) || '', to: alternative ? `/gallery/${gameId}/ornament/${encodeURIComponent(alternative.name)}` : undefined };
      });
      return { name: t(item.cleanName), rank: item.rank, note: item.note ? t(item.note) : undefined, image: getMainImageUrl(entry) || '', group: Boolean(alternatives?.length), alternatives, to: alternatives?.length ? undefined : `/gallery/${gameId}/ornament/${encodeURIComponent(entry?.name || baseName)}` };
    }) },
  ];
  const members = synergyCharacters.map(member => {
    const entry = CHARACTER_DB.find(candidate => normalizeName(t(candidate.name)) === normalizeName(t(member.name)) || normalizeName(candidate.folderName) === normalizeName(t(member.name)));
    return { name: t(member.name), image: entry ? getHsrCharacterArtUrl(entry.folderName, entry.isTrailblazer) : undefined, to: entry ? `/gallery/${gameId}/character/${entry.id}` : undefined, details: [member.role, member.description].filter(Boolean) };
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
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

      <PageHeader gameId={gameId} category={t('공략')} title={`${t(character.name)} 공략`} />
      <GuideLayout navigationKey={`${character.id}-${activeGuideView}-${selectedVariantIndex}`}>
        <GuideHero name={t(character.name)} image={heroImageUrl} backTo={`/gallery/${gameId}/character/${character.id}`} version={guide.patchVersion} updatedAt={lastUpdatedDate} tags={[t(character.path), t(character.attribute)]} />
        <GuideViewTabs value={publishedAnalysis ? activeGuideView : 'setup'} onChange={setActiveGuideView} analysisAvailable={Boolean(publishedAnalysis)} />
        {(!publishedAnalysis || activeGuideView === 'setup') && <>
          {guide.variants && guide.variants.length > 1 && <GuideVariantSelector label={t('세팅 선택')} options={guide.variants.map((variant, index) => ({ label: t(variant.name), value: String(index) }))} value={String(selectedVariantIndex)} onChange={value => setSelectedVariantIndex(Number(value))} description={t('선택한 세팅의 광추, 유물, 옵션과 목표 수치가 함께 표시됩니다.')} />}
          <GuideSummary items={[
            { label: t('추천 광추'), value: parsedLightCones[0] ? t(parsedLightCones[0].cleanName) : '', image: primaryEquipment[0].items[0]?.image },
            { label: t('터널 유물'), value: parsedRelics[0] ? t(parsedRelics[0].cleanName) : '', image: setEquipment[0].items[0]?.image },
            { label: t('차원 장신구'), value: parsedOrnaments[0] ? t(parsedOrnaments[0].cleanName) : '', image: setEquipment[1].items[0]?.image },
            { label: t('주옵션'), value: mainOptions.flatMap(item => item.values.map(option => ({ label: `${t(item.label)}${option.rank ? ` · ${option.rank}순위` : ''}`, value: t(option.value) }))) },
          ]} />
          <GuideBuildContent primary={primaryEquipment} sets={setEquipment} setsId="추천 장비" options={mainOptions} subStats={currentVariant?.subStats || []} targets={[{ label: '목표 스탯', items: parsedTargetStats.filter(item => !item.description) }, { label: '조건별 세팅', items: parsedTargetStats.filter(item => item.description) }].filter(group => group.items.length > 0)} skills={((currentVariant && 'skillPriority' in currentVariant ? currentVariant.skillPriority : undefined) || guide.skillPriority || []).map(name => ({ name }))} members={members} setupNote={currentVariant?.note} />
        </>}
        {publishedAnalysis && activeGuideView === 'analysis' && <GuideAnalysis data={{ summary: publishedAnalysis.summary, metadata: [{ label: '역할', value: publishedAnalysis.role }, { label: '분석 기준', value: publishedAnalysis.standard }, { label: '검토', value: publishedAnalysis.reviewedAt }, { label: '작성·검수', value: publishedAnalysis.reviewer }], strengths: publishedAnalysis.strengths, weaknesses: publishedAnalysis.weaknesses, teamPrinciple: publishedAnalysis.teamPrinciple, overview: publishedAnalysis.gameplay.overview, rotation: publishedAnalysis.gameplay.rotation, tips: publishedAnalysis.gameplay.tips }} />}
        <GuideFooter updatedAt={`${lastUpdatedDate} (v${guide.patchVersion || '1.0'})`} message="게임 내 정보를 바탕으로 작성한 가이드입니다. 업데이트에 따라 내용이 달라질 수 있습니다." />
      </GuideLayout>
    </div>
  );
};
export default CharacterGuideDetail;
