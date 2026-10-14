import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ChevronLeft, Info } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { GuideLayout, GuideHero, GuideSummary, GuideVariantSelector } from '../../common-hub/components/guides/GuideLayout';
import { sanitizePublicGuideData } from '../../common-hub/utils/publicGuideLinks';
import { parseGuideOption, GuideBuildContent, GuideAnalysis, GuideViewTabs, GuideFooter, type GuideMember, type GuideEquipmentGroup } from '../../common-hub/components/guides/GuideContent';
import FeedbackReportModal from '../../common-hub/components/FeedbackReportModal';
import { useTranslation } from 'react-i18next';
import { WW_ECHO_DATA } from '../data/echoData';
import { WW_GUIDE_CHARACTERS, WW_GUIDE_DATA } from '../data/guideData';
import characterSummary from '../data/generated/character-summary.json';
import guideAnalysis from '../data/guide-analysis.json';
import { withAssetVersion, resolveRoverImageInfo } from '../../common-hub/utils/assetManager';
import { SONATA_SETS } from '../types';
import { SONATA_EFFECTS } from '../data/sonataEffects';

const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images';

const getMatchingTwoPieceSets = (text: string): string[] => {
  if (!text) return [];
  const clean = text.trim();
  if (clean.includes('5세트') || clean.includes('3세트')) return [];

  const keywords: { keys: string[]; match: (s: (typeof SONATA_EFFECTS)[0]) => boolean }[] = [
    { keys: ['기류', 'Aero', 'aero'], match: (s) => Boolean(s.effect?.twoPiece?.includes('기류')) },
    { keys: ['전도', 'Electro', 'electro'], match: (s) => Boolean(s.effect?.twoPiece?.includes('전도')) },
    { keys: ['인멸', 'Havoc', 'havoc'], match: (s) => Boolean(s.effect?.twoPiece?.includes('인멸')) },
    { keys: ['용융', 'Fusion', 'fusion'], match: (s) => Boolean(s.effect?.twoPiece?.includes('용융')) },
    { keys: ['응결', 'Glacio', 'glacio'], match: (s) => Boolean(s.effect?.twoPiece?.includes('응결')) },
    { keys: ['회절', 'Spectro', 'spectro'], match: (s) => Boolean(s.effect?.twoPiece?.includes('회절')) },
    { keys: ['공격력', '공격', 'ATK', 'atk'], match: (s) => Boolean(s.effect?.twoPiece?.includes('공격력')) },
    { keys: ['공명 효율', '공명효율', '공명 에너지', 'Energy', 'ER', 'er'], match: (s) => Boolean(s.effect?.twoPiece?.includes('공명 효율')) },
    { keys: ['치료', '회복', 'Healing', 'healing'], match: (s) => Boolean(s.effect?.twoPiece?.includes('치료')) },
    { keys: ['공명 스킬', '공명스킬', 'Resonance Skill', 'Skill DMG'], match: (s) => Boolean(s.effect?.twoPiece?.includes('공명 스킬')) },
    { keys: ['HP', 'hp', '체력', '생명력'], match: (s) => Boolean(s.effect?.twoPiece?.includes('HP')) },
  ];

  for (const group of keywords) {
    if (group.keys.some(k => clean.includes(k))) {
      return SONATA_EFFECTS.filter(group.match).map(s => s.setName);
    }
  }

  const direct = SONATA_EFFECTS.find(s => clean.includes(s.setName));
  if (direct && direct.effect?.twoPiece) {
    const effectStr = direct.effect.twoPiece;
    return SONATA_EFFECTS.filter(s => s.effect?.twoPiece === effectStr).map(s => s.setName);
  }

  return [];
};

const SONATA_EFFECT_MAP: Record<string, string> = {
  '전도': '울려퍼지는 뇌음',
  '전도 피해': '울려퍼지는 뇌음',
  '기류': '스쳐가는 바람',
  '기류 피해': '스쳐가는 바람',
  '인멸': '빛을 삼키는 해',
  '인멸 피해': '빛을 삼키는 해',
  '용융': '솟구치는 용암',
  '용융 피해': '솟구치는 용암',
  '응결': '야밤의 서리',
  '응결 피해': '야밤의 서리',
  '회절': '빛나는 별',
  '회절 피해': '빛나는 별',
  '공격력': '끊임없는 잔향',
  '공명 효율': '떠오르는 구름',
  '공명효율': '떠오르는 구름',
  '치료': '찬란한 광휘',
  '치료 효과': '찬란한 광휘',
  '회복': '찬란한 광휘',
  '공명 스킬': '냉철한 결단',
  '스킬 피해': '냉철한 결단',
  'HP': '황천길을 밝히는 등불',
  '체력': '황천길을 밝히는 등불',
};

const resolveSonataInfo = (rawText: string) => {
  const text = (rawText || '').trim();
  const pieceMatch = text.match(/(\d+)세트/);
  const pieces = pieceMatch ? parseInt(pieceMatch[1], 10) : 0;

  let matchedSonata = SONATA_SETS.find(s => text.includes(s)) || '';

  let effectName = '';
  if (!matchedSonata) {
    for (const [kw, sonata] of Object.entries(SONATA_EFFECT_MAP)) {
      if (text.includes(kw)) {
        matchedSonata = sonata;
        effectName = text.replace(/\s?\d+세트/g, '').trim();
        break;
      }
    }
  }

  const baseName = matchedSonata || text.replace(/\s?\d+세트/g, '').trim();
  const imgUrl = matchedSonata 
    ? `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(matchedSonata.normalize('NFC'))}.webp` 
    : '';

  return {
    raw: text,
    sonataName: matchedSonata || baseName,
    effectName,
    pieces,
    cleanName: text,
    imgUrl
  };
};

const formatVariantTabName = (name: string) => {
  if (!name || !name.includes('+')) return name;
  const parts = name.split('+').map(p => p.trim()).filter(Boolean);
  const simplified = parts.map(part => {
    if (part.includes('꿈을 깨뜨리는 망령의 악몽')) {
      const m = part.match(/(\d+)세트/);
      return `망령의 악몽 (${m ? m[1] : '1'})`;
    }
    const statMatch = part.match(/(기류|전도|인멸|용융|응결|회절|공격력|공명\s*효율|체력|HP|치료).*?(\d+)세트/);
    if (statMatch) {
      return `${statMatch[1].trim()} (${statMatch[2]})`;
    }
    const sonata = part.match(/(.+?)\s*(\d+)세트/);
    if (sonata) {
      return `${sonata[1].trim()} (${sonata[2]})`;
    }
    return part;
  });

  const grouped: { base: string; text: string }[] = [];
  simplified.forEach(cur => {
    const prev = grouped[grouped.length - 1];
    const curBase = cur.replace(/\s*\(\d+.*?\)/, '');
    if (prev && prev.base === curBase) {
      const pNum = prev.text.match(/\((.*?)\)/)?.[1] || '2';
      const cNum = cur.match(/\((.*?)\)/)?.[1] || '2';
      prev.text = `${prev.base} (${pNum}+${cNum})`;
    } else {
      grouped.push({ base: curBase, text: cur });
    }
  });

  return grouped.map(g => g.text).join(' + ');
};

const normalizeName = (name: string) => {
  if (!name) return "";
  return name
    .replace(/_?세팅_?공략|_?공략|_?세팅/g, '')
    .replace(/[()（）\s]/g, '')
    .replace(/[•·]/g, '')
    .toLowerCase()
    .normalize('NFC');
};

const getCharacterImage = (folderName: string, isRover?: boolean) => {
  const roverInfo = resolveRoverImageInfo(folderName, undefined, 'f');
  if (roverInfo) {
    return roverInfo.url;
  }
  const safeFolder = encodeURIComponent((folderName || '').normalize('NFC'));
  return withAssetVersion(`${BASE_IMAGE_URL}/skills/${safeFolder}/${safeFolder}.webp`);
};

const getWeaponImage = (weaponName: string) => {
  return `${BASE_IMAGE_URL}/Weapons/${encodeURIComponent(weaponName.normalize('NFC'))}.webp`;
};

const getEchoImage = (echoName: string) => {
  return `${BASE_IMAGE_URL}/Echo/${encodeURIComponent(echoName.normalize('NFC'))}.webp`;
};

const WuwaCharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const { t } = useTranslation();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeGuideView, setActiveGuideView] = useState<'setup' | 'analysis'>('setup');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const CHARACTER_DB = WW_GUIDE_CHARACTERS;
  const ECHO_DB = WW_ECHO_DATA;
  const GUIDES = WW_GUIDE_DATA;

  const routeGuide = useMemo(() => {
    const cleanParam = (charName || '').replace(/_?세팅_?공략|_?공략|_?세팅/g, '').trim();
    const normalizedParam = normalizeName(cleanParam);

    const matchedGuide = GUIDES?.find((g: any) => {
      const cleanGuideId = (g.id || '').replace(/_세팅_공략|_공략/g, '').trim();
      return (
        g.id === charName ||
        cleanGuideId === cleanParam ||
        normalizeName(cleanGuideId) === normalizedParam ||
        normalizeName(g.name || '') === normalizedParam
      );
    });
    return matchedGuide ? sanitizePublicGuideData(matchedGuide) : undefined;
  }, [GUIDES, charName]);

  const character = useMemo(() => {
    const cleanParam = (charName || '').replace(/_?세팅_?공략|_?공략|_?세팅/g, '').trim();
    const directMatch = CHARACTER_DB.find((c: any) =>
      c.id === charName || 
      c.id === cleanParam ||
      c.name === charName ||
      c.name === cleanParam ||
      normalizeName(c.name) === normalizeName(charName || '') ||
      normalizeName(c.name) === normalizeName(cleanParam)
    );
    if (directMatch || !routeGuide) return directMatch;

    const routeCharacter = characterSummary.find((c: any) => c.id === routeGuide.id);
    const guideName = normalizeName(routeGuide.name || '');
    const routeCharacterName = normalizeName(routeCharacter?.name || '');
    const routeCharacterFolder = normalizeName(routeCharacter?.folderName || '');
    return CHARACTER_DB.find((c: any) =>
      normalizeName(c.name || '') === guideName ||
      normalizeName(c.folderName || '') === guideName ||
      (routeCharacterName && normalizeName(c.name || '') === routeCharacterName) ||
      (routeCharacterFolder && normalizeName(c.folderName || '') === routeCharacterFolder)
    );
  }, [CHARACTER_DB, charName, routeGuide]);

  const guide = useMemo(() => {
    if (routeGuide) return routeGuide;
    const matchedGuide = GUIDES?.find((g: any) => {
      const cleanGuideId = g.id?.replace(/_세팅_공략|_공략/g, '').trim();
      const charId = character?.id || charName;
      const charNameNormalized = normalizeName(character?.name || charName || '');
      const charFolderNormalized = normalizeName(character?.folderName || '');

      return (
        g.id === charId ||
        g.id === charName ||
        cleanGuideId === charId ||
        (cleanGuideId && (normalizeName(cleanGuideId) === charNameNormalized || normalizeName(cleanGuideId) === charFolderNormalized)) ||
        (g.name && (normalizeName(g.name) === charNameNormalized || normalizeName(g.name) === charFolderNormalized))
      );
    });
    return matchedGuide ? sanitizePublicGuideData(matchedGuide) : undefined;
  }, [GUIDES, charName, character, routeGuide]);

  const analysisData = guideAnalysis as Record<string, any>;
  const sourceAnalysis = analysisData[guide?.id || '']
    || analysisData[character?.id || '']
    || analysisData[charName || ''];
  const analysis = sourceAnalysis ? sanitizePublicGuideData(sourceAnalysis) : undefined;

  const synergyCharacters = useMemo(() => {
    if (!Array.isArray(guide?.synergyCharacters)) return [];
    const skillLabels = new Set([...(guide.skillPriority || []), '스킬 레벨 업 우선 순위']);
    return guide.synergyCharacters.filter((member: string) => !skillLabels.has(member));
  }, [guide]);

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

  useEffect(() => {
    setSelectedVariantIndex(0);
    setActiveGuideView('setup');
  }, [charName]);

  const mainStatsToDisplay = useMemo(() => {
    return currentVariant?.mainStats && currentVariant.mainStats.length > 0
      ? currentVariant.mainStats
      : guide?.mainStats || [];
  }, [currentVariant, guide]);

  const parsedWeapons = useMemo(() => {
    if (!guide?.weapons) return [];
    return guide.weapons.map((w: any) => {
      let weaponName = w.name || '';
      let weaponNote = w.note || '';
      if (!weaponNote && (weaponName.includes(':') || weaponName.includes('：'))) {
        const parts = weaponName.split(/[:：]/);
        weaponName = parts[0].trim();
        weaponNote = parts.slice(1).join(':').trim();
      }
      return {
        ...w,
        cleanName: weaponName,
        note: weaponNote,
      };
    });
  }, [guide]);

  const parsedEchoSetsData = useMemo(() => {
    if (!currentVariant?.echoSets) {
      return { isCombo: false, comboBadge: '', comboNote: '', comboParts: [], hasSplitCombo: false, threePieceSets: [], twoPieceSets: [], allSets: [] };
    }

    // 1. Check if current variant is a combo set (contains '+')
    const comboRaw = currentVariant.echoSets.find((s: any) => {
      const name = typeof s === 'string' ? s : (s?.name || '');
      return name.includes('+');
    }) || (currentVariant.name?.includes('+') ? currentVariant : null);

    if (comboRaw) {
      const rawFullName = typeof comboRaw === 'string' ? comboRaw : (comboRaw.name || currentVariant?.name || '');
      let setFullName = rawFullName;
      let setNote = typeof comboRaw === 'object' && comboRaw ? (comboRaw.note || '') : '';
      if (!setNote && (setFullName.includes(':') || setFullName.includes('：'))) {
        const parts = setFullName.split(/[:：]/);
        setFullName = parts[0].trim();
        setNote = parts.slice(1).join(':').trim();
      }

      const rawParts = setFullName.split('+').map((p: string) => p.trim()).filter(Boolean);
      const piecesList: number[] = [];
      const comboParts: any[] = [];

      rawParts.forEach((rawPart: string) => {
        const info = resolveSonataInfo(rawPart);
        const pieces = info.pieces || 2;
        piecesList.push(pieces);

        const isTwoPiece = pieces === 2 || /2세트|피해.*증가/.test(rawPart);
        const matchingSets = isTwoPiece ? getMatchingTwoPieceSets(rawPart) : [];

        // Check onePiece effect if present in SONATA_EFFECTS
        let effectDesc = '';
        if (pieces === 1 || info.sonataName.includes('망령의 악몽')) {
          const sEffect = SONATA_EFFECTS.find(s => s.setName === info.sonataName || s.setName.includes('망령의 악몽'));
          if (sEffect?.effect?.onePiece) {
            effectDesc = sEffect.effect.onePiece;
          }
        }

        // Merge duplicate pieces (e.g. "전도 피해 10% 증가 2세트" appearing twice)
        const existing = comboParts.find(p => p.cleanName === info.cleanName && p.sonataName === info.sonataName);
        if (existing) {
          existing.count = (existing.count || 1) + 1;
          existing.badgeText = `${existing.pieces} Pieces × ${existing.count}`;
        } else {
          comboParts.push({
            cleanName: info.cleanName,
            sonataName: info.sonataName,
            effectName: info.effectName,
            pieces: pieces,
            imgUrl: info.imgUrl,
            matchingSets,
            effectDesc,
            count: 1,
            badgeText: `${pieces} Piece${pieces > 1 ? 's' : ''}`,
          });
        }
      });

      const comboBadge = piecesList.join(' + ') + ' Pieces';

      return {
        isCombo: true,
        comboBadge,
        comboNote: setNote,
        comboParts,
        hasSplitCombo: false,
        threePieceSets: [],
        twoPieceSets: [],
        allSets: []
      };
    }

    // 2. Non-combo (standard 5-piece or isolated 3-piece/2-piece)
    const threePieceSets: any[] = [];
    const twoPieceSets: any[] = [];
    const allSets: any[] = [];

    currentVariant.echoSets.forEach((set: any, i: number) => {
      const rawFullName = typeof set === 'string'
        ? set
        : (set && typeof set.name === 'string' && set.name.trim() ? set.name : (currentVariant?.name || ''));
      let setFullName = rawFullName;
      let setNote = typeof set === 'object' && set ? (set.note || '') : '';
      if (!setNote && (setFullName.includes(':') || setFullName.includes('：'))) {
        const parts = setFullName.split(/[:：]/);
        setFullName = parts[0].trim();
        setNote = parts.slice(1).join(':').trim();
      }

      const rank = i + 1;
      const info = resolveSonataInfo(setFullName);
      const isTwoPiece = info.pieces === 2 || /2세트|피해.*증가/.test(setFullName);
      const matchingSets = isTwoPiece ? getMatchingTwoPieceSets(setFullName) : [];
      const item = {
        raw: set,
        cleanName: setFullName,
        setName: info.sonataName,
        sonataName: info.sonataName,
        effectName: info.effectName,
        pieces: info.pieces,
        imgUrl: info.imgUrl,
        matchingSets,
        note: setNote,
        rank,
      };
      if (info.pieces === 3) {
        threePieceSets.push(item);
      } else if (info.pieces === 2 || isTwoPiece) {
        twoPieceSets.push(item);
      } else {
        allSets.push(item);
      }
    });

    const hasSplitCombo = threePieceSets.length > 0 && twoPieceSets.length > 0;

    return {
      isCombo: false,
      comboBadge: '',
      comboNote: '',
      comboParts: [],
      hasSplitCombo,
      threePieceSets,
      twoPieceSets,
      allSets
    };
  }, [currentVariant]);

  const parsedMainEchoes = useMemo(() => {
    if (!currentVariant?.mainEchoes) return [];
    return currentVariant.mainEchoes.map((me: any) => {
      let echoName = me.name || '';
      let echoReason = me.reason || '';
      if (!echoReason && (echoName.includes(':') || echoName.includes('：'))) {
        const parts = echoName.split(/[:：]/);
        echoName = parts[0].trim();
        echoReason = parts.slice(1).join(':').trim();
      }
      const echoObj = ECHO_DB?.find((e: any) => 
        e.name === echoName || 
        normalizeName(e.name) === normalizeName(echoName) ||
        (e.folderName && normalizeName(e.folderName) === normalizeName(echoName))
      );

      return {
        ...me,
        cleanName: echoName,
        reason: echoReason,
        cost: echoObj?.cost ? Number(echoObj.cost) : undefined,
      };
    });
  }, [currentVariant, ECHO_DB]);

  if (!character || !guide) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center space-y-6">
        <Info size={40} className="text-gray-400 mb-6" />
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
  const characterRouteId = guide.id || charName || character.id;
  const primaryEchoSet = currentVariant?.echoSets?.[0];
  const primaryEchoSetName = typeof primaryEchoSet === 'string' ? primaryEchoSet : primaryEchoSet?.name;
  const sonataEquipment = (item: any) => {
    const matching = item.matchingSets?.length ? item.matchingSets : item.pieces === 2 ? getMatchingTwoPieceSets(item.cleanName) : [];
    return {
      name: t(item.cleanName), image: item.imgUrl || (matching[0] ? `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(matching[0].normalize('NFC'))}.webp` : ''), rank: item.rank, note: item.note ? t(item.note) : undefined,
      badges: [item.badgeText || (item.pieces ? `${item.pieces}세트` : '')].filter(Boolean),
      effects: [item.sonataName && item.sonataName !== item.cleanName ? { label: '화음 세트', value: t(item.sonataName) } : null, item.effectName ? { label: '효과', value: t(item.effectName) } : null, item.effectDesc ? { label: '세트 효과', value: t(item.effectDesc) } : null].filter(Boolean) as { label: string; value: string }[],
      alternatives: matching.map((name: string) => ({ name: t(name), image: `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(name.normalize('NFC'))}.webp` })),
    };
  };
  const primaryEquipment = [{ id: '추천 무기', title: '추천 무기', items: parsedWeapons.map((item: any) => ({ name: t(item.cleanName), rank: item.rank, note: item.note ? t(item.note) : undefined, image: getWeaponImage(item.cleanName), to: `/gallery/ww/weapon/${encodeURIComponent(item.cleanName)}` })) }];
  const setEquipment: GuideEquipmentGroup[] = parsedEchoSetsData.isCombo
    ? [{ title: '화음 세트 조합', note: [parsedEchoSetsData.comboBadge, parsedEchoSetsData.comboNote].filter(Boolean).join('\n'), items: parsedEchoSetsData.comboParts.map(sonataEquipment) }]
    : [
      { title: '3세트 화음', items: parsedEchoSetsData.threePieceSets.map(sonataEquipment) },
      { title: '2세트 화음', items: parsedEchoSetsData.twoPieceSets.map(sonataEquipment) },
      { title: '화음 세트', items: parsedEchoSetsData.allSets.map(sonataEquipment) },
    ].filter(group => group.items.length > 0);
  setEquipment.push({ title: '추천 메인 에코', items: parsedMainEchoes.map((item: any) => ({ name: t(item.cleanName), image: getEchoImage(item.cleanName), note: item.reason ? t(item.reason) : undefined, badges: item.cost === 3 ? ['3 COST'] : [] })) });
  const summaryItems = [
    { label: t('추천 무기'), value: parsedWeapons[0]?.cleanName ? t(parsedWeapons[0].cleanName) : '', image: primaryEquipment[0].items[0]?.image },
    { label: t('에코 세트'), value: parsedEchoSetsData.isCombo ? parsedEchoSetsData.comboParts.map((item: any) => ({ value: t(item.cleanName), image: sonataEquipment(item).image })) : primaryEchoSetName ? t(primaryEchoSetName.split(/[:：]/)[0].trim()) : '', image: parsedEchoSetsData.isCombo ? undefined : setEquipment[0]?.items[0]?.image },
    { label: t('메인 에코'), value: parsedMainEchoes[0]?.cleanName ? t(parsedMainEchoes[0].cleanName) : '', image: parsedMainEchoes[0] ? getEchoImage(parsedMainEchoes[0].cleanName) : undefined },
  ];
  const mainOptions = mainStatsToDisplay.map((item: any) => ({ label: `${item.cost} COST`, values: (item.stats || []).flatMap((value: string) => parseGuideOption(value, true)), note: item.note }));
  const targetValues = (guide.targetStats || []).map((item: any) => {
    const parts = String(item.value || '').split(/[:：]/);
    const extra = parts.slice(1).join(':').trim();
    return { label: item.label, value: parts[0].trim(), note: [item.note, extra].filter(Boolean).join('\n') || undefined };
  });
  const members: GuideMember[] = synergyCharacters.map((member: string) => {
    const parts = member.split(/[:：]/);
    let name = parts[0].trim();
    let note = parts.slice(1).join(':').trim();
    const findMember = (label: string) => CHARACTER_DB.find((candidate: any) => normalizeName(t(candidate.name)) === normalizeName(t(label)) || normalizeName(candidate.folderName) === normalizeName(t(label)) || (candidate.id && normalizeName(candidate.id) === normalizeName(t(label))));
    let entry = findMember(name);
    if (!entry) {
      const match = name.match(/^([^\(（]+)[\(（]([^\)）]+)[\)）]$/);
      if (match) {
        entry = findMember(match[1].trim());
        if (entry) { name = match[1].trim(); note = [note, match[2].trim()].filter(Boolean).join('\n'); }
      }
    }
    if (!entry && name === '카를롷타') { entry = CHARACTER_DB.find((candidate: any) => candidate.name?.includes('카를로타') || candidate.id === 'Carlotta' || candidate.folderName === 'Carlotta'); if (entry) name = '카를로타'; }
    if (!entry && (name === '루크' || name.includes('헤르센'))) { entry = CHARACTER_DB.find((candidate: any) => candidate.id === 'luuk' || candidate.folderName?.includes('헤르센') || candidate.name?.includes('헤르센')); if (entry) name = '루크 · 헤르센'; }
    if (!entry && name.includes('현령')) { entry = CHARACTER_DB.find((candidate: any) => candidate.id === 'yangyang_magistrate' || candidate.folderName?.includes('현령') || candidate.name?.includes('현령')); if (entry) name = '양양 · 현령'; }
    const routeId = characterSummary.find(candidate => candidate.id === entry?.id || normalizeName(candidate.name) === normalizeName(entry?.name || name) || normalizeName(candidate.folderName) === normalizeName(entry?.folderName || name))?.id;
    return { name: t(name), image: entry ? getCharacterImage(entry.folderName, entry.isRover) : undefined, to: routeId ? `/gallery/ww/character/${encodeURIComponent(routeId)}` : undefined, details: [entry?.roles?.[0]?.label, note].filter(Boolean).map((value: string) => t(value)) };
  });

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
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO 
        title={`명조 ${t(character.name)} 공략 | 종결 에코 세팅 · 무기 티어 순위 · 파티 조합 - 리라 아카이브`}
        description={`명조: 워더링 웨이브 ${t(character.name)}의 최신 종결 에코 세트(주옵션/부옵션 목표치), 추천 무기 1~4순위 랭킹, 스킬 레벨업 우선순위, 최적 파티 시너지 조합 완벽 공략 가이드.`}
        image={heroImageUrl}
        url={`/gallery/ww/character/${charName}/guide`}
        gameCategory={t('명조 (Wuthering Waves)')}
        itemType={t('세팅 가이드')}
        faqData={faqData}
        breadcrumbData={[
          { name: t('홈'), url: '/' },
          { name: t('명조 (Wuthering Waves)'), url: `/gallery/ww` },
          { name: t('캐릭터'), url: `/gallery/ww?menu=캐릭터` },
          { name: t(character.name), url: `/gallery/ww/character/${characterRouteId}` },
          { name: t('세팅 가이드'), url: `/gallery/ww/character/${characterRouteId}/guide` }
        ]}
      />
      


      <PageHeader gameId="ww" title={`${t(character.name)} 공략`} category="공략" />
      <GuideLayout navigationKey={`${characterRouteId}:${activeGuideView}:${selectedVariantIndex}`}>
        <GuideHero name={t(character.name)} image={heroImageUrl} backTo={`/gallery/ww/character/${characterRouteId}`} version={guide.patchVersion} tags={[character.weaponType, character.attribute].filter(Boolean).map((tag: string) => t(tag))} />
        <GuideViewTabs value={analysis ? activeGuideView : 'setup'} onChange={setActiveGuideView} analysisAvailable={Boolean(analysis)} />
        {(!analysis || activeGuideView === 'setup') && <>
          {guide.variants && guide.variants.length > 1 && <GuideVariantSelector label={t('세팅 선택')} options={guide.variants.map((variant: any, index: number) => ({ label: t(formatVariantTabName(variant.name)), value: String(index) }))} value={String(selectedVariantIndex)} onChange={value => setSelectedVariantIndex(Number(value))} description={t('선택한 세팅에 맞춰 에코 세트·메인 에코·주옵션을 함께 표시합니다. 추천 무기·목표 수치·부옵션은 공통입니다.')} />}
          <GuideSummary items={summaryItems} />
          <GuideBuildContent primary={primaryEquipment} sets={setEquipment} setsId="추천 에코" options={mainOptions} subStats={guide.subStats || []} targets={[{ label: '목표 스탯', items: targetValues }]} skills={(guide.skillPriority || []).map((name: string) => ({ name }))} members={guide.isUniversalSynergy ? [] : members} synergyNote={guide.isUniversalSynergy ? '회복 및 서포팅 능력이 뛰어나 특정 딜러에 국한되지 않습니다. 파티의 생존력과 전투 지속력을 높이기 위해 어떤 파티 조합이든 마지막 3번째 자리에 자유롭게 편성하여 활용할 수 있습니다.' : undefined} setupNote={currentVariant?.note} />
        </>}
        {analysis && activeGuideView === 'analysis' && <GuideAnalysis data={{ summary: analysis.summary, strengths: analysis.strengths, weaknesses: analysis.weaknesses, rotation: analysis.rotation, tips: analysis.tips }} />}
        <GuideFooter message="이 분석 리포트는 게임 데이터 분석과 전담 에디터의 정밀한 검토 및 인게임 테스트를 통해 완성되었습니다. 데이터의 정확성과 전술적 가치를 최우선으로 합니다." action={<button type="button" className="guide-back-link" onClick={() => setIsFeedbackModalOpen(true)}>{t('데이터 오류 제보')}</button>} />
        <FeedbackReportModal isOpen={isFeedbackModalOpen} onClose={() => setIsFeedbackModalOpen(false)} contextData={{ gameId, targetId: characterRouteId, targetName: character.name || charName, type: 'guide' }} />
      </GuideLayout>
    </div>
  );
};
export default WuwaCharacterGuideDetail;
