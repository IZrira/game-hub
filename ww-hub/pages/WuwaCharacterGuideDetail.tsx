import React, { useMemo, useState, useEffect } from 'react';
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
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import FeedbackReportModal from '../../common-hub/components/FeedbackReportModal';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../../common-hub/data/dataManager';
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
  value?: string; 
  stats?: string[];
  note?: string; 
  theme: any; 
  iconImage?: string;
}> = ({ label, value, stats, note, theme, iconImage }) => {
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(iconImage);
  
  useEffect(() => {
    setImgUrl(iconImage);
  }, [iconImage]);

  const processedValues = useMemo(() => {
    if (stats && Array.isArray(stats) && stats.length > 0) {
      return stats;
    }
    if (!value) return [];
    return value.split(/\s+or\s+|\s*\/\s*/i).map(v => v.trim());
  }, [stats, value]);

  return (
    <div 
      className="group glass-card rounded-[28px] p-5 sm:p-6 border border-white/10 hover:border-white/25 transition-all bg-gradient-to-b from-white/[0.05] to-white/[0.02] flex flex-col items-center text-center gap-4 h-full relative overflow-hidden shadow-lg"
    >
      {imgUrl ? (
        <div className="w-14 h-14 bg-black/40 rounded-2xl p-2.5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-md border border-white/10 relative z-10">
          <img 
            src={imgUrl} 
            alt={label} 
            className="w-full h-full object-contain filter drop-shadow-md" 
            onError={() => setImgUrl(undefined)}
          />
        </div>
      ) : (
        <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center border border-white/10 relative z-10 shadow-inner">
          <div className="flex flex-col items-center justify-center">
            {label.includes('4 Cost') && <Crown size={22} className="text-white" />}
            {label.includes('3 Cost') && <Swords size={22} className="text-white" />}
            {label.includes('1 Cost') && <Box size={22} className="text-white" />}
            {!label.includes('Cost') && <span className="text-white font-black text-lg uppercase opacity-40">{label.slice(0, 1)}</span>}
          </div>
        </div>
      )}
      
      <div className="space-y-3 w-full relative z-10 flex flex-col items-center">
        {/* 파츠 라벨 (4 Cost, 3 Cost, 1 Cost) 가시성 대폭 강화 */}
        <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm font-black text-white uppercase tracking-wider whitespace-nowrap shadow-sm">
          {t(label, { keySeparator: false, nsSeparator: false })}
        </span>
        
        {/* 추천 주옵션 값 가시성 강화 */}
        <div className="flex flex-col gap-2 w-full">
          {processedValues.map((v, i) => {
            const isFirstChoice = i === 0;
            const colonIdx = v.indexOf(':') !== -1 ? v.indexOf(':') : v.indexOf('：');
            const statName = colonIdx !== -1 ? v.substring(0, colonIdx).trim() : v;

            return (
              <div 
                key={i} 
                className={`relative w-full py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  isFirstChoice 
                    ? 'bg-brand-primary/15 border border-brand-accent/35 shadow-[0_0_12px_rgba(74,222,128,0.1)]' 
                    : 'bg-white/[0.04] hover:bg-white/[0.07] border border-white/10'
                }`}
              >
                <span className="text-sm sm:text-base font-bold text-white tracking-tight break-keep text-center leading-snug">
                  {t(statName)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const WuwaCharacterGuideDetail: React.FC = () => {
  const { gameId, charName } = useParams<{ gameId: string; charName: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const { CHARACTER_DB, WEAPON_DB, ECHO_DB, GUIDES } = useMemo(() => getGameData('ww'), []);

  const character = useMemo(() => {
    const cleanParam = (charName || '').replace(/_?세팅_?공략|_?공략|_?세팅/g, '').trim();
    return CHARACTER_DB.find((c: any) => 
      c.id === charName || 
      c.id === cleanParam ||
      c.name === charName ||
      c.name === cleanParam ||
      normalizeName(c.name) === normalizeName(charName || '') ||
      normalizeName(c.name) === normalizeName(cleanParam)
    );
  }, [CHARACTER_DB, charName]);

  const guide = useMemo(() => {
    return GUIDES?.find((g: any) => {
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

  const mainStatsToDisplay = useMemo(() => {
    return currentVariant?.mainStats && currentVariant.mainStats.length > 0
      ? currentVariant.mainStats
      : guide?.mainStats || [];
  }, [currentVariant, guide]);

  const mainStatsNotes = useMemo(() => {
    const notes: { cost: number | string; statName: string; noteText: string }[] = [];
    if (!mainStatsToDisplay || !Array.isArray(mainStatsToDisplay)) return notes;

    mainStatsToDisplay.forEach((ms: any) => {
      if (!ms.stats || !Array.isArray(ms.stats)) return;
      ms.stats.forEach((s: string) => {
        const colonIdx = s.indexOf(':') !== -1 ? s.indexOf(':') : s.indexOf('：');
        if (colonIdx !== -1) {
          const statName = s.substring(0, colonIdx).trim();
          const noteText = s.substring(colonIdx + 1).trim();
          if (statName && noteText) {
            notes.push({
              cost: ms.cost,
              statName,
              noteText
            });
          }
        }
      });
    });

    return notes;
  }, [mainStatsToDisplay]);

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

  const weaponsWithNotes = useMemo(() => {
    return parsedWeapons.filter((w: any) => Boolean(w.note));
  }, [parsedWeapons]);

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

  const echoSetsWithNotes = useMemo(() => {
    if (parsedEchoSetsData.isCombo) {
      return parsedEchoSetsData.comboNote ? [{ cleanName: '화음 세트 조합', note: parsedEchoSetsData.comboNote }] : [];
    }
    const list = [
      ...parsedEchoSetsData.threePieceSets,
      ...parsedEchoSetsData.twoPieceSets,
      ...parsedEchoSetsData.allSets
    ];
    const seen = new Set();
    return list.filter((s: any) => {
      if (!s.note) return false;
      const key = `${s.cleanName}_${s.note}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [parsedEchoSetsData]);

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

  const hasEchoNotes = Boolean(currentVariant?.note || echoSetsWithNotes.length > 0);

  const mainStatsList = useMemo(() => {
    return currentVariant?.mainStats && currentVariant.mainStats.length > 0
      ? currentVariant.mainStats
      : guide?.mainStats || [];
  }, [currentVariant, guide]);

  const mainStatsWithNotes = useMemo(() => {
    return mainStatsList
      .filter((ms: any) => Boolean(ms.note))
      .map((ms: any) => ({
        label: `${ms.cost} Cost`,
        value: ms.stats ? ms.stats.join(' or ') : '',
        note: ms.note
      }));
  }, [mainStatsList]);

  const targetStatsWithNotes = useMemo(() => {
    return (guide?.targetStats || []).filter((s: any) => Boolean(s.note));
  }, [guide]);

  const hasStatNotes = mainStatsWithNotes.length > 0 || targetStatsWithNotes.length > 0;

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
          { name: t(character.name), url: `/gallery/ww/character/${character.id}` },
          { name: t('세팅 가이드'), url: `/gallery/ww/character/${character.id}/guide` }
        ]}
      />
      


      <PageHeader 
        gameId="ww"
        title={`${t(character.name)} 가이드`} 
        category="공략" 
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 pt-8 flex flex-col lg:flex-row gap-8 sm:gap-12 justify-between">
        <div className="flex-1 w-full space-y-12 sm:space-y-16 guide-content">
          
          <Link 
            to={`/gallery/ww/character/${character.id}`}
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
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                <Sparkles size={12} className="text-brand-accent" />
                <span className="text-[9px] sm:text-[10px] font-black text-brand-accent uppercase tracking-widest">{lastUpdatedDate}</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-12">
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-[28px] sm:rounded-[40px] md:rounded-[50px] border-4 border-white/10 overflow-hidden shadow-2xl relative z-10 bg-black/40">
                  <img src={heroImageUrl} alt={character.name} className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700" />
                </div>
                <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full opacity-30 animate-pulse" />
              </div>
              <div className="text-center md:text-left space-y-4 sm:space-y-6">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3">
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] bg-white/5 border border-white/10 text-gray-400">{t(character.weaponType || '')}</span>
                  <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em]" style={{ backgroundColor: `${theme.primary}20`, color: theme.secondary, border: `1px solid ${theme.primary}40` }}>{t(character.attribute)}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">
                  {t(character.name)} <span className="text-brand-accent">가이드</span>
                </h1>
                <p className="text-gray-500 font-bold text-xs sm:text-base md:text-lg border-l-4 border-brand-primary/40 pl-4 sm:pl-6">{t('최적의 성능을 위한 무기와 에코 세팅 데이터입니다.')}</p>
              </div>
            </div>
          </section>

          {/* 01 추천 무기 */}
          <section id="추천 무기" className="space-y-6">
            <SectionHeader num="01" title="추천 무기" theme={theme} />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {parsedWeapons.map((w: any, i: number) => {
                const weaponUrl = getWeaponImage(w.cleanName);
                const isBest = w.rank === 1;

                return (
                  <Link 
                    key={i} 
                    to={`/gallery/ww/weapon/${encodeURIComponent(w.cleanName)}`}
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
                      <img src={weaponUrl} alt={w.cleanName} className="w-full h-full object-contain drop-shadow-2xl" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                    </div>
                    <div className="flex flex-col items-center gap-1.5 w-full">
                      <h4 className="text-[11px] md:text-[12px] font-black text-white group-hover:text-brand-accent transition-colors truncate w-full text-center leading-tight tracking-tighter px-1">{t(w.cleanName)}</h4>
                      {isBest && (
                        <span className="text-[9px] font-black text-brand-accent uppercase tracking-[0.2em]">{t('추천 선택')}</span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* 추천 무기 상세 분석 & 가이드 */}
            {weaponsWithNotes.length > 0 && (
              <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                      <BookOpen size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                        {t('추천 무기 상세 분석')}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {weaponsWithNotes.map((w: any, idx: number) => {
                    const isRank1 = w.rank === 1;
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col gap-3 p-5 sm:p-6 rounded-2xl transition-all border-l-4 shadow-sm group ${
                          isRank1 
                            ? 'bg-brand-primary/[0.08] border border-brand-primary/30 border-l-brand-accent shadow-[0_0_15px_rgba(74,222,128,0.1)]' 
                            : 'bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 border-l-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <span className={`px-2.5 py-1 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 ${
                            isRank1 ? 'bg-brand-accent text-black' : 'bg-white/10 text-gray-200 border border-white/10'
                          }`}>
                            {w.rank}순위
                          </span>
                          <span className="font-black text-base sm:text-lg text-white group-hover:text-brand-accent transition-colors">
                            {t(w.cleanName)}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-white/5">
                          <p className="text-sm sm:text-base text-gray-300 font-medium leading-relaxed break-keep">
                            {t(w.note)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* 02 추천 에코 (장비) */}
          <section id="추천 에코" className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <SectionHeader num="02" title="추천 에코 세트" theme={theme} />
              {guide.variants && guide.variants.length > 1 && (
                <div className="flex flex-wrap bg-white/5 p-1.5 rounded-2xl border border-white/10 mx-4 shrink-0">
                  {guide.variants.map((v: any, idx: number) => {
                    const primarySetFullName = typeof v.echoSets?.[0] === 'string'
                      ? v.echoSets[0]
                      : (v.echoSets?.[0]?.name || v.name || '');
                    const primaryPart = (primarySetFullName || '').split('+')[0].trim();
                    const sonataInfo = resolveSonataInfo(primaryPart);
                    const setImgUrl = sonataInfo.imgUrl;
                    
                    return (
                      <button 
                        key={idx} 
                        onClick={() => setSelectedVariantIndex(idx)} 
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedVariantIndex === idx ? 'bg-brand-primary text-white shadow-xl' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                      >
                        {setImgUrl && (
                          <img src={setImgUrl} alt={sonataInfo.sonataName} className={`w-4 h-4 object-contain ${selectedVariantIndex !== idx && 'opacity-60 grayscale'}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
                        )}
                        {t(formatVariantTabName(v.name))}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-8">
              {parsedEchoSetsData.isCombo ? (
                <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <Layers size={22} className="text-brand-accent" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">{t('화음 세트 조합')}</span>
                    </div>
                    <span className="px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-accent border border-brand-primary/20">
                      {parsedEchoSetsData.comboBadge}
                    </span>
                  </div>

                  {/* 세팅 전체 설명/노트가 있으면 1회만 깔끔하게 표시 */}
                  {parsedEchoSetsData.comboNote && (
                    <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
                      <Sparkles size={18} className="text-brand-accent shrink-0 mt-0.5" />
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-medium break-keep">
                        {t(parsedEchoSetsData.comboNote)}
                      </p>
                    </div>
                  )}

                  {/* 조합 세트 파츠 그리드 */}
                  <div className={`grid gap-4 ${
                    parsedEchoSetsData.comboParts.length === 1 
                      ? 'grid-cols-1' 
                      : parsedEchoSetsData.comboParts.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2' 
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {parsedEchoSetsData.comboParts.map((part: any, i: number) => {
                      const isFirst = i === 0;
                      return (
                        <div 
                          key={i} 
                          className={`flex flex-col gap-4 p-5 sm:p-6 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                        >
                          {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                              {part.imgUrl ? (
                                <img src={part.imgUrl} alt={part.sonataName || part.cleanName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                              ) : (
                                <Box size={24} className="text-gray-400" />
                              )}
                            </div>
                            <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                              <div className="flex items-center justify-between w-full">
                                <span className="text-base sm:text-lg font-bold text-gray-200 group-hover:text-brand-accent transition-colors break-keep">{t(part.cleanName)}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-brand-primary/20 text-brand-accent border border-brand-accent/30'}`}>
                                  {part.badgeText}
                                </span>
                              </div>
                              {part.sonataName && (
                                <span className="text-xs text-gray-400 font-medium truncate">
                                  소나타: {t(part.sonataName)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* 고유 효과 설명 (예: 1세트 효과 등) */}
                          {part.effectDesc && (
                            <div className="pt-2.5 border-t border-white/5">
                              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium break-keep">
                                {t(part.effectDesc)}
                              </p>
                            </div>
                          )}

                          {/* 해당 2세트 효과를 제공하는 소나타 리스트 */}
                          {part.matchingSets && part.matchingSets.length > 0 && (
                            <div className="pt-3 border-t border-white/5 space-y-2">
                              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                                <span className="flex items-center gap-1.5 text-gray-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                                  {t('해당 2세트 효과 보유 화음')} ({part.matchingSets.length}종)
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {part.matchingSets.map((setName: string) => {
                                  const iconUrl = `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(setName.normalize('NFC'))}.webp`;
                                  return (
                                    <div 
                                      key={setName}
                                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-black/40 border border-white/5 hover:border-brand-accent/40 transition-all group/sonata"
                                    >
                                      <div className="w-5 h-5 rounded-md bg-white/5 p-0.5 shrink-0 flex items-center justify-center">
                                        <img 
                                          src={iconUrl} 
                                          alt={setName} 
                                          className="w-full h-full object-contain" 
                                          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                        />
                                      </div>
                                      <span className="text-xs text-gray-300 font-medium truncate group-hover/sonata:text-brand-accent transition-colors">
                                        {t(setName)}
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
              ) : (
                <>
                  {/* 3세트 + 2세트 스플릿 조합인 경우 2줄 배치 (세로 정렬) */}
                  {parsedEchoSetsData.threePieceSets.length > 0 && parsedEchoSetsData.twoPieceSets.length > 0 ? (
                <div className="grid grid-cols-1 gap-8">
                  {/* 3세트 화음 카드 */}
                  <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-4">
                        <Layers size={22} className="text-brand-accent" />
                        <span className="text-xl font-black uppercase tracking-tighter italic">{t('3세트 화음')}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-accent border border-brand-primary/20">
                        3 Pieces
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {parsedEchoSetsData.threePieceSets.map((set: any, i: number) => {
                        const isFirst = i === 0;
                        return (
                          <div 
                            key={i} 
                            className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                          >
                            {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-110 transition-transform">
                                {set.imgUrl ? (
                                  <img src={set.imgUrl} alt={set.sonataName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                  <Layers size={24} className="text-gray-400" />
                                )}
                              </div>
                              <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-lg sm:text-xl font-black text-white group-hover:text-brand-accent transition-colors break-keep">{t(set.cleanName)}</span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                    {set.rank}순위
                                  </span>
                                </div>
                              </div>
                            </div>
                            {set.note && (
                              <div className="pt-3 border-t border-white/10">
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium break-keep">
                                  {t(set.note)}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2세트 화음 카드 */}
                  <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                      <div className="flex items-center gap-4">
                        <Box size={22} className="text-purple-400" />
                        <span className="text-xl font-black uppercase tracking-tighter italic">{t('2세트 화음')}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        2 Pieces
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {parsedEchoSetsData.twoPieceSets.map((set: any, i: number) => {
                        const isFirst = i === 0;
                        const matchingSets: string[] = set.matchingSets && set.matchingSets.length > 0 
                          ? set.matchingSets 
                          : getMatchingTwoPieceSets(set.cleanName || set.sonataName);
                        const mainImgUrl = set.imgUrl || (matchingSets.length > 0 ? `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(matchingSets[0].normalize('NFC'))}.webp` : '');
                        return (
                          <div 
                            key={i} 
                            className={`flex flex-col gap-4 p-5 sm:p-6 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                          >
                            {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                            
                            {/* 대표 세트 / 효과 정보 */}
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                                {mainImgUrl ? (
                                  <img src={mainImgUrl} alt={set.sonataName || set.cleanName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                ) : (
                                  <Box size={24} className="text-gray-400" />
                                )}
                              </div>
                              <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-lg sm:text-xl font-black text-white group-hover:text-brand-accent transition-colors break-keep">{t(set.cleanName)}</span>
                                  <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                    {set.rank}순위
                                  </span>
                                </div>
                                {matchingSets.length > 1 && (
                                  <span className="text-xs text-purple-300/90 font-medium">
                                    {t('선택 가능한 화음 세트')} {matchingSets.length}종
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* 화음 세트 이유/설명 */}
                            {set.note && (
                              <div className="pt-3 border-t border-white/10">
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium break-keep">
                                  {t(set.note)}
                                </p>
                              </div>
                            )}

                            {/* 해당 2세트 효과를 제공하는 모든 화음 세트 (아이콘 + 세트 이름) */}
                            {matchingSets.length > 0 && (
                              <div className="pt-3 border-t border-white/5 space-y-2.5">
                                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                                  <span className="flex items-center gap-1.5 text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                                    {t('해당 2세트 효과 보유 화음')} ({matchingSets.length}종)
                                  </span>
                                  <span className="text-[10px] text-gray-500 font-medium">
                                    {matchingSets.length > 1 ? t('아래 화음 중 2세트 자유 선택') : t('해당 화음 2세트 장착 시 적용')}
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                                  {matchingSets.map((setName: string) => {
                                    const iconUrl = `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(setName.normalize('NFC'))}.webp`;
                                    return (
                                      <div 
                                        key={setName}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-accent/40 hover:bg-white/[0.04] transition-all group/sonata"
                                      >
                                        <div className="w-6 h-6 rounded-lg bg-white/5 p-0.5 shrink-0 flex items-center justify-center border border-white/10 group-hover/sonata:border-brand-accent/40 transition-colors">
                                          <img 
                                            src={iconUrl} 
                                            alt={setName} 
                                            className="w-full h-full object-contain" 
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                          />
                                        </div>
                                        <span className="text-xs text-gray-200 font-semibold truncate group-hover/sonata:text-brand-accent transition-colors">
                                          {t(setName)}
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
                </div>
              ) : (
                <>
                  {/* 3세트만 있는 경우 */}
                  {parsedEchoSetsData.threePieceSets.length > 0 && (
                    <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                      <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                          <Layers size={22} className="text-brand-accent" />
                          <span className="text-xl font-black uppercase tracking-tighter italic">{t('3세트 화음')}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-accent border border-brand-primary/20">
                          3 Pieces
                        </span>
                      </div>
                      <div className={`grid gap-4 ${parsedEchoSetsData.threePieceSets.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {parsedEchoSetsData.threePieceSets.map((set: any, i: number) => {
                          const isFirst = i === 0;
                          return (
                            <div 
                              key={i} 
                              className={`flex flex-col gap-3.5 p-5 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                            >
                              {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                              <div className="flex items-center gap-4 w-full">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-110 transition-transform">
                                  {set.imgUrl ? (
                                    <img src={set.imgUrl} alt={set.sonataName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                  ) : (
                                    <Layers size={24} className="text-gray-400" />
                                  )}
                                </div>
                                <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-base font-bold text-gray-200 group-hover:text-brand-accent transition-colors break-keep">{t(set.cleanName)}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                      {set.rank}순위
                                    </span>
                                  </div>
                                  {set.sonataName && (
                                    <span className="text-xs text-gray-400 font-medium truncate">
                                      소나타: {t(set.sonataName)}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {set.note && (
                                <div className="pt-2.5 border-t border-white/5">
                                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium break-keep">
                                    {t(set.note)}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2세트만 있는 경우 (2+2 세트 등) */}
                  {parsedEchoSetsData.twoPieceSets.length > 0 && (
                    <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                      <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <div className="flex items-center gap-4">
                          <Box size={22} className="text-purple-400" />
                          <span className="text-xl font-black uppercase tracking-tighter italic">{t('2세트 화음')}</span>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          2 Pieces
                        </span>
                      </div>
                      <div className={`grid gap-4 ${parsedEchoSetsData.twoPieceSets.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                        {parsedEchoSetsData.twoPieceSets.map((set: any, i: number) => {
                          const isFirst = i === 0;
                          const matchingSets: string[] = set.matchingSets && set.matchingSets.length > 0 
                            ? set.matchingSets 
                            : getMatchingTwoPieceSets(set.cleanName || set.sonataName);
                          const mainImgUrl = set.imgUrl || (matchingSets.length > 0 ? `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(matchingSets[0].normalize('NFC'))}.webp` : '');
                          return (
                            <div 
                              key={i} 
                              className={`flex flex-col gap-4 p-5 sm:p-6 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                            >
                              {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                              
                              {/* 대표 세트 / 효과 정보 */}
                              <div className="flex items-center gap-4 w-full">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                                  {mainImgUrl ? (
                                    <img src={mainImgUrl} alt={set.sonataName || set.cleanName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                                  ) : (
                                    <Box size={24} className="text-gray-400" />
                                  )}
                                </div>
                                <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                                  <div className="flex items-center justify-between w-full">
                                    <span className="text-base sm:text-lg font-bold text-gray-200 group-hover:text-brand-accent transition-colors break-keep">{t(set.cleanName)}</span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                      {set.rank}순위
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {matchingSets.length > 1 ? (
                                      <span className="text-xs text-purple-300/90 font-medium">
                                        {t('선택 가능한 화음 세트')} {matchingSets.length}종
                                      </span>
                                    ) : (
                                      set.sonataName && (
                                        <span className="text-xs text-gray-400 font-medium truncate">
                                          소나타: {t(set.sonataName)}
                                        </span>
                                      )
                                    )}
                                    {set.effectName && matchingSets.length <= 1 && (
                                      <span className="text-[11px] text-brand-accent/80 font-semibold shrink-0">
                                        ({t(set.effectName)})
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* 화음 세트 이유/설명 */}
                              {set.note && (
                                <div className="pt-2.5 border-t border-white/5">
                                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium break-keep">
                                    {t(set.note)}
                                  </p>
                                </div>
                              )}

                              {/* 해당 2세트 효과를 제공하는 모든 화음 세트 (아이콘 + 세트 이름) */}
                              {matchingSets.length > 0 && (
                                <div className="pt-3 border-t border-white/5 space-y-2.5">
                                  <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                                    <span className="flex items-center gap-1.5 text-gray-300">
                                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                                      {t('해당 2세트 효과 보유 화음')} ({matchingSets.length}종)
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-medium">
                                      {matchingSets.length > 1 ? t('아래 화음 중 2세트 자유 선택') : t('해당 화음 2세트 장착 시 적용')}
                                    </span>
                                  </div>
                                  <div className={`grid gap-2 ${parsedEchoSetsData.twoPieceSets.length === 1 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
                                    {matchingSets.map((setName: string) => {
                                      const iconUrl = `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(setName.normalize('NFC'))}.webp`;
                                      return (
                                        <div 
                                          key={setName}
                                          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-accent/40 hover:bg-white/[0.04] transition-all group/sonata"
                                        >
                                          <div className="w-6 h-6 rounded-lg bg-white/5 p-0.5 shrink-0 flex items-center justify-center border border-white/10 group-hover/sonata:border-brand-accent/40 transition-colors">
                                            <img 
                                              src={iconUrl} 
                                              alt={setName} 
                                              className="w-full h-full object-contain" 
                                              onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                            />
                                          </div>
                                          <span className="text-xs text-gray-200 font-semibold truncate group-hover/sonata:text-brand-accent transition-colors">
                                            {t(setName)}
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
                  )}
                </>
              )}

              {/* 5세트 (단일 세팅) 카드 */}
              {parsedEchoSetsData.allSets.length > 0 && (
                <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.04] to-transparent">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                      <Layers size={22} className="text-gray-500" />
                      <span className="text-xl font-black uppercase tracking-tighter italic">{t('화음 세트')}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-brand-primary/10 text-brand-accent border border-brand-primary/20">
                      5 Pieces
                    </span>
                  </div>
                  <div className={`grid gap-4 ${
                    parsedEchoSetsData.allSets.length === 1 
                      ? 'grid-cols-1' 
                      : parsedEchoSetsData.allSets.length === 2 
                        ? 'grid-cols-1 md:grid-cols-2' 
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {parsedEchoSetsData.allSets.map((set: any, i: number) => {
                      const isFirst = i === 0;
                      const matchingSets: string[] = set.matchingSets || (set.pieces === 2 ? getMatchingTwoPieceSets(set.cleanName || set.sonataName) : []);
                      return (
                        <div 
                          key={i} 
                          className={`flex flex-col gap-4 p-5 sm:p-6 rounded-3xl transition-all group overflow-hidden relative cursor-default ${isFirst ? 'bg-brand-primary/10 border-2 border-brand-primary/50 shadow-[0_0_20px_rgba(74,222,128,0.15)] z-10' : 'bg-white/5 border border-white/5 hover:border-brand-primary/30'}`}
                        >
                          {isFirst && <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent" />}
                          <div className="flex items-center gap-4 w-full">
                            <div className="w-12 h-12 rounded-full border border-white/10 bg-black/40 flex items-center justify-center shrink-0 p-1">
                              {set.imgUrl && <img src={set.imgUrl} alt={set.sonataName} className="w-full h-full object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                            </div>
                            <div className="flex flex-col gap-1 w-full z-10 min-w-0">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <span className="text-lg sm:text-xl font-black text-white group-hover:text-brand-accent transition-colors break-keep">{t(set.cleanName || '에코 세트')}</span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 ${isFirst ? 'bg-brand-accent text-black' : 'bg-black/50 text-gray-400'}`}>
                                  {set.rank}순위
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* 화음 세트 이유/설명 */}
                          {set.note && (
                            <div className="pt-3 border-t border-white/10">
                              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium break-keep">
                                {t(set.note)}
                              </p>
                            </div>
                          )}

                          {matchingSets.length > 0 && (
                            <div className="pt-3 border-t border-white/5 space-y-2.5">
                              <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                                <span className="flex items-center gap-1.5 text-gray-300">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
                                  {t('해당 2세트 효과 화음 세트')} ({matchingSets.length}종)
                                </span>
                              </div>
                              <div className={`grid gap-2 ${parsedEchoSetsData.allSets.length === 1 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
                                {matchingSets.map((setName: string) => {
                                  const iconUrl = `${BASE_IMAGE_URL}/common/sonata/${encodeURIComponent(setName.normalize('NFC'))}.webp`;
                                  return (
                                    <div 
                                      key={setName}
                                      className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-accent/40 hover:bg-white/[0.04] transition-all group/sonata"
                                    >
                                      <div className="w-6 h-6 rounded-lg bg-white/5 p-0.5 shrink-0 flex items-center justify-center border border-white/10 group-hover/sonata:border-brand-accent/40 transition-colors">
                                        <img 
                                          src={iconUrl} 
                                          alt={setName} 
                                          className="w-full h-full object-contain" 
                                          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                                        />
                                      </div>
                                      <span className="text-xs text-gray-200 font-semibold truncate group-hover/sonata:text-brand-accent transition-colors">
                                        {t(setName)}
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
              )}
            </>
          )}

              <div className="glass-card rounded-[45px] p-10 border border-brand-primary/20 bg-brand-primary/[0.02] space-y-8 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl group-hover:bg-brand-primary/20 transition-colors duration-700" />
                <div className="flex items-center gap-4 border-b border-white/5 pb-6 relative z-10">
                  <Target size={22} className="text-brand-primary" />
                  <span className="text-xl font-black uppercase tracking-tighter italic">{t('추천 메인 에코')}</span>
                </div>
                <div className="flex flex-col gap-8 relative z-10">
                  {parsedMainEchoes.map((me: any, idx: number) => {
                    const echoUrl = getEchoImage(me.cleanName);

                    return (
                      <div 
                        key={idx} 
                        className="flex flex-col md:flex-row items-center gap-8 bg-black/20 p-6 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all cursor-default group/echo relative overflow-hidden"
                      >
                        <div className="w-24 h-24 rounded-full border border-brand-primary/30 p-2 bg-black/40 shrink-0 group-hover/echo:border-brand-accent transition-colors">
                          <img src={echoUrl} alt={me.cleanName} className="w-full h-full object-cover rounded-full group-hover/echo:scale-105 transition-transform" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                        </div>
                        <div className="space-y-4 text-center md:text-left flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                            <h4 className="text-xl sm:text-2xl font-black text-white group-hover/echo:text-brand-accent transition-colors">{t(me.cleanName)}</h4>
                            {me.cost === 3 && (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-black tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.2)] whitespace-nowrap">
                                3 COST
                              </span>
                            )}
                          </div>
                          {me.reason && (
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium break-keep">
                              {t(me.reason)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 세팅 핵심 포인트 (변형별 상세 노트가 있을 경우에만 표시) */}
              {currentVariant?.note && (
                <div className="p-5 rounded-3xl bg-brand-primary/10 border border-brand-primary/20 flex items-start gap-3.5 shadow-md">
                  <Sparkles size={20} className="text-brand-accent shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="text-xs sm:text-sm font-black text-brand-accent uppercase tracking-wider">
                      [{currentVariant.name}] {t('세팅 핵심 포인트')}
                    </span>
                    <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                      {t(currentVariant.note)}
                    </p>
                  </div>
                </div>
              )}
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
                      className="flex flex-col justify-between p-5 bg-white/[0.04] hover:bg-white/[0.08] rounded-2xl border border-white/10 hover:border-white/20 transition-all group relative gap-3 h-full overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider group-hover:text-white transition-colors break-keep break-words">{t(s.label)}</span>
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <span className="text-xl sm:text-2xl font-black text-white italic tabular-nums break-keep break-words text-left">{t(s.value)}</span>
                        <div className="w-12 h-1 bg-white/20 rounded-full mt-2 overflow-hidden">
                          <div className="w-full h-full bg-white/60" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main & Sub Stats Section (Bottom) */}
              <div className="glass-card rounded-[45px] p-10 border border-white/5 space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                  <ShieldCheck size={22} className="text-white" />
                  <span className="text-xl font-black uppercase tracking-tighter italic text-white">{t('에코 주옵션 & 부옵션')}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                  {mainStatsToDisplay.map((ms: any, i: number) => (
                    <StatBoxPremium 
                      key={i} 
                      label={`${ms.cost} Cost`} 
                      stats={ms.stats}
                      theme={theme} 
                    />
                  ))}
                </div>

                {/* 주옵션 세부 조건 / 도움말: 아예 아래로 빼서 별도 배치 */}
                {mainStatsNotes.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-2.5">
                    {mainStatsNotes.map((note, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <Info size={16} className="text-brand-accent shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <span className="font-bold text-white mr-1.5">
                            [{note.cost} Cost {t(note.statName)}]
                          </span>
                          <span className="text-gray-300 font-medium">
                            {t(note.noteText)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-6 sm:p-7 bg-white/[0.03] rounded-[28px] border border-white/10 relative overflow-hidden space-y-4">
                  <div className="text-xs sm:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp size={16} className="text-white" />
                    <span>{t('부옵션 우선순위')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {guide.subStats.map((s: string, i: number) => {
                      const isFirst = i === 0;
                      return (
                        <div 
                          key={i} 
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-sm ${
                            isFirst 
                              ? 'bg-brand-primary/15 border border-brand-accent/40 shadow-[0_0_15px_rgba(74,222,128,0.15)]' 
                              : 'bg-white/[0.06] hover:bg-white/[0.1] border border-white/15'
                          }`}
                        >
                          <span className={`px-2 py-0.5 rounded-md text-xs font-black ${
                            isFirst ? 'bg-brand-accent text-black' : 'bg-white/15 text-white'
                          }`}>
                            #{i + 1}
                          </span>
                          <span className="text-sm sm:text-base font-bold text-white whitespace-nowrap">
                            {t(s)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 권장 스탯 상세 가이드 */}
              {hasStatNotes && (
                <div className="glass-card rounded-[36px] p-6 sm:p-8 border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent space-y-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/15 shrink-0">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                          {t('권장 스탯 상세 가이드')}
                        </h4>
                        <span className="text-xs text-gray-400 font-medium">에코 주옵션 및 목표 스탯 세부 운용 팁</span>
                      </div>
                    </div>
                  </div>

                  {mainStatsWithNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck size={16} className="text-white" />
                        {t('에코 주옵션 세부 가이드')}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {mainStatsWithNotes.map((stat: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all border-l-4 border-l-brand-accent shadow-sm group">
                            <div className="flex items-center gap-2.5 shrink-0 sm:w-[200px] md:w-[240px]">
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

                  {targetStatsWithNotes.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-xs sm:text-sm font-black text-gray-300 uppercase tracking-wider flex items-center gap-2">
                        <Target size={16} className="text-white" />
                        {t('목표 스탯 세부 가이드')}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {targetStatsWithNotes.map((s: any, idx: number) => (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-brand-primary/30 transition-all border-l-4 border-l-brand-accent shadow-sm group">
                            <div className="flex items-center gap-2.5 shrink-0 sm:w-[200px] md:w-[240px]">
                              <span className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-black tracking-wide bg-brand-primary/20 text-white border border-brand-accent/30 shrink-0 shadow-sm whitespace-nowrap">
                                {t(s.label)}
                              </span>
                              <span className="font-bold text-sm sm:text-base text-white tracking-tight tabular-nums">{t(s.value)}</span>
                            </div>
                            <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed flex-1 break-keep">
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

          {/* 04 스킬 육성 우선순위 */}
          <section id="스킬 육성 우선순위" className="space-y-6">
            <SectionHeader num="04" title="스킬 육성 우선순위" theme={theme} />
            
            <div className="glass-card rounded-[45px] p-8 sm:p-10 border border-white/5 space-y-6 bg-gradient-to-br from-white/[0.03] to-transparent">
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                {guide.skillPriority.map((skill: string, idx: number) => (
                  <React.Fragment key={idx}>
                    <div className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 rounded-2xl text-sm sm:text-base font-bold text-white shadow-sm transition-all">
                      {t(skill)}
                    </div>
                    {idx < guide.skillPriority.length - 1 && <ChevronRight size={18} className="text-gray-400" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* 05 시너지 캐릭터 */}
          {(guide.isUniversalSynergy || (guide.synergyCharacters && guide.synergyCharacters.length > 0)) && (
            <section id="시너지 캐릭터" className="space-y-6">
              <SectionHeader num="05" title="시너지 캐릭터" theme={theme} />

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
                <div className="flex flex-wrap gap-8 items-center">
                  {guide.synergyCharacters.map((member: string, idx: number) => {
                    let memberName = member;
                    let memberNote = '';

                    // 1. Colon splitting
                    if (memberName.includes(':') || memberName.includes('：')) {
                      const parts = memberName.split(/[:：]/);
                      memberName = parts[0].trim();
                      memberNote = parts.slice(1).join(':').trim();
                    }

                    // 2. Direct character match (e.g. '방랑자 (인멸)')
                    let memberChar = CHARACTER_DB.find((c: any) => 
                      normalizeName(t(c.name)) === normalizeName(t(memberName)) || 
                      normalizeName(c.folderName) === normalizeName(t(memberName)) ||
                      (c.id && normalizeName(c.id) === normalizeName(t(memberName)))
                    );

                    // 3. Parentheses splitting if not matched directly (e.g. '페비(메인 딜러)')
                    if (!memberChar) {
                      const parenMatch = memberName.match(/^([^\(（]+)[\(（]([^\)）]+)[\)）]$/);
                      if (parenMatch) {
                        const strippedName = parenMatch[1].trim();
                        const extractedNote = parenMatch[2].trim();
                        const charCandidate = CHARACTER_DB.find((c: any) => 
                          normalizeName(t(c.name)) === normalizeName(t(strippedName)) || 
                          normalizeName(c.folderName) === normalizeName(t(strippedName))
                        );
                        if (charCandidate) {
                          memberChar = charCandidate;
                          memberName = strippedName;
                          memberNote = memberNote ? `${memberNote} (${extractedNote})` : extractedNote;
                        }
                      }
                    }

                    // 4. Typo & Alias correction (e.g. 카를롷타, 루크, 현령 등)
                    if (!memberChar) {
                      if (memberName === '카를롷타') {
                        memberChar = CHARACTER_DB.find((c: any) => c.name?.includes('카를로타') || c.id === 'Carlotta' || c.folderName === 'Carlotta');
                        if (memberChar) memberName = '카를로타';
                      } else if (memberName === '루크' || memberName.includes('헤르센')) {
                        memberChar = CHARACTER_DB.find((c: any) => c.id === 'luuk' || c.folderName?.includes('헤르센') || c.name?.includes('헤르센'));
                        if (memberChar) memberName = '루크 · 헤르센';
                      } else if (memberName === '현령' || memberName.includes('현령')) {
                        memberChar = CHARACTER_DB.find((c: any) => c.id === 'yangyang_magistrate' || c.folderName?.includes('현령') || c.name?.includes('현령'));
                        if (memberChar) memberName = '양양 · 현령';
                      }
                    }

                    // 5. Generic description chip if not a character
                    const isGenericText = !memberChar && memberName.length > 7 && (
                      memberName.includes('자리') || memberName.includes('사용') || memberName.includes('추천') || memberName.includes('가능')
                    );

                    if (isGenericText) {
                      return (
                        <div key={idx} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300">
                          <Info size={14} className="text-brand-accent shrink-0" />
                          <span>{t(memberName)}</span>
                        </div>
                      );
                    }

                    const memberImg = memberChar 
                      ? getCharacterImage(memberChar.folderName, memberChar.isRover) 
                      : getCharacterImage(memberName, memberName.includes('방랑자'));
                    
                    return (
                      <Link 
                        key={idx}
                        to={`/gallery/ww/character/${memberChar?.id || memberName}`}
                        className="flex flex-col items-center gap-4 group/member w-[100px] relative"
                      >
                        <div className="relative w-20 h-20 md:w-24 md:h-24">
                           <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl opacity-0 group-hover/member:opacity-100 transition-opacity" />
                           <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden group-hover/member:border-brand-accent transition-all duration-300 p-1 bg-black/40 shadow-xl">
                              <img src={memberImg} alt={memberName} className="w-full h-full object-cover rounded-full group-hover/member:scale-110 transition-transform duration-500" onError={(e) => (e.currentTarget.style.opacity = '0.3')} />
                           </div>
                        </div>
                        <div className="text-center space-y-1 w-full">
                          <div className="text-sm font-black text-gray-300 group-hover/member:text-brand-accent transition-colors truncate px-1">{t(memberName)}</div>
                          {memberChar?.roles?.[0] ? (
                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">{t(memberChar.roles[0].label)}</div>
                          ) : memberNote ? (
                            <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest truncate">{t(memberNote)}</div>
                          ) : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
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
                  <p className="text-[11px] text-gray-500 font-medium">Authored by <span className="text-brand-accent font-black">Rira Archive Editorial Team</span></p>
                </div>
              </div>
              <div className="text-[10px] text-gray-400 max-w-md text-center md:text-right font-medium leading-relaxed">
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

        {/* Sidebar */}
        <aside className="hidden lg:block w-[320px] shrink-0 sticky top-32 h-fit space-y-8">
          <AdPlaceholder type="rectangle" />
        </aside>
      </div>
    </div>
  );
};

export default WuwaCharacterGuideDetail;
