import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Plus, Trash2, Edit3, Copy, RefreshCw, Search, ArrowUp, ArrowDown,
  Sparkles, Check, X, Shield, Zap, Sword, ExternalLink, Filter, Download, Upload, AlertCircle, CheckCircle2
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  PartySlot, 
  UnifiedPartyData, 
  HSRPartyData, 
  WWPartyData, 
  NTEPartyData
} from '../types/party';
import HSR_CHARACTERS from '../../hsr-hub/data/generated/character-summary.json';
import { HSR_CHARACTER_VERSION_MAP, HSR_PARTIES } from '../../hsr-hub/data/parties/index';
import { WW_CHARACTERS } from '../../ww-hub/data/characters';
import { WW_PARTY_COMBINATIONS } from '../../ww-hub/data/parties';
import { NTE_CHARACTERS } from '../../nte-hub/data/index';
import { NTE_PARTY_COMBINATIONS } from '../../nte-hub/data/parties';

interface AdminPartyManagerProps {
  activeGame: 'hsr' | 'ww' | 'nte';
  getEncodedUrl: (folderOrChar: any) => string;
}

const CATEGORY_PRESETS: Record<string, string[]> = {
  HSR: ['추가 공격', '환락', '격파', '기억', '지속 피해', '단일', '범위', '하이퍼캐리'],
  WW: ['하이퍼캐리', '속성 콤보', '변주 연계', '광역 딜링', '보스전'],
  NTE: ['령 속성 시너지', '화 속성 시너지', '빛 속성', '암 속성', '혼 속성', '범용']
};

const ROLE_PRESETS: Record<string, string[]> = {
  HSR: ['메인 딜러', '서브 딜러', '서포터', '탱커·힐러'],
  WW: ['메인 딜러', '서브 딜러', '서포터', '생존'],
  NTE: ['메인 딜러', '서브 딜러', '서포터', '탱커·힐러']
};

const BREAKTHROUGH_PRESETS: Record<string, string[]> = {
  HSR: ['명함 (E0)', '1돌+ 권장', '2돌+ 권장', '2돌 필수', '4돌+', '6돌 (풀돌)'],
  WW: ['명함 (S0)', '1돌+ 권장', '2돌+ 권장', '3돌+', '6돌 (풀돌)'],
  NTE: ['명함', '1돌+ 권장', '2돌+ 권장', '풀돌']
};

const normalizeCharacterName = (value: string) => value.replace(/\s+/g, '').replace(/[·•]/g, '');
const HSR_VERSION_BY_NORMALIZED_NAME = new Map(
  Object.entries(HSR_CHARACTER_VERSION_MAP).map(([name, version]) => [normalizeCharacterName(name), version])
);

interface PickerCharacter { id: string; name: string; folderName: string; rarity: number; attribute?: string; path?: string }

// 슬롯·대체 캐릭터를 한 칸에서 검색해 바로 채우는 입력창. 일반 <input>이라
// 다음 칸으로 Tab이 그대로 넘어간다. 모달을 열지 않고도 바로 배치할 수 있다.
const CharacterPickerInput: React.FC<{
  value: string;
  characters: PickerCharacter[];
  getEncodedUrl: (char: any) => string;
  onPick: (char: PickerCharacter) => void;
  placeholder?: string;
  excludeNames?: string[];
  clearAfterPick?: boolean;
  tabIndex?: number;
}> = ({ value, characters, getEncodedUrl, onPick, placeholder, excludeNames, clearAfterPick, tabIndex }) => {
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);

  useEffect(() => { setText(value); }, [value]);

  const matches = React.useMemo(() => {
    const excluded = new Set((excludeNames || []).map(normalizeCharacterName));
    const needle = normalizeCharacterName(text.trim());
    return characters
      .filter(c => !excluded.has(normalizeCharacterName(c.name)))
      .filter(c => !needle || normalizeCharacterName(c.name).includes(needle))
      .slice(0, 8);
  }, [characters, text, excludeNames]);

  const pick = (char: PickerCharacter) => {
    onPick(char);
    setText(clearAfterPick ? '' : char.name);
    setOpen(false);
  };

  return (
    <div className="relative">
      <input
        value={text}
        tabIndex={tabIndex}
        onChange={(e) => { setText(e.target.value); setOpen(true); setHighlight(0); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => {
          if (!open) { if (e.key === 'ArrowDown') setOpen(true); return; }
          if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, matches.length - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)); }
          else if (e.key === 'Enter') { e.preventDefault(); if (matches[highlight]) pick(matches[highlight]); }
          else if (e.key === 'Escape') { setOpen(false); }
        }}
        placeholder={placeholder || '캐릭터 검색...'}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-bold text-white placeholder-gray-500 focus:border-amber-500/50 outline-none"
      />
      {open && matches.length > 0 && (
        <div className="absolute z-50 left-0 right-0 mt-1 bg-[#141414] border border-white/10 rounded-xl shadow-2xl max-h-56 overflow-y-auto">
          {matches.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => pick(c)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-bold transition-colors ${i === highlight ? 'bg-amber-500/15 text-amber-300' : 'text-gray-200 hover:bg-white/5'}`}
            >
              <img src={getEncodedUrl(c.folderName || c.name)} alt="" className="w-6 h-6 rounded object-cover shrink-0" />
              <span className="truncate">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminPartyManager: React.FC<AdminPartyManagerProps> = ({ activeGame, getEncodedUrl }) => {
  const gameKey: 'HSR' | 'WW' | 'NTE' = (activeGame.toUpperCase()) as 'HSR' | 'WW' | 'NTE';

  // 파티 목록 상태
  const [parties, setParties] = useState<UnifiedPartyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastTone, setToastTone] = useState<'success' | 'error'>('success');
  // True only after this game's rows were read from the DB; saving is blocked until then.
  const [dbLoaded, setDbLoaded] = useState(false);

  // 모달 상태
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingParty, setEditingParty] = useState<UnifiedPartyData | null>(null);

  // 캐릭터 선택 팝업 상태 (슬롯 선택 또는 대체 캐릭터 추가용)
  const [pickerState, setPickerState] = useState<{
    isOpen: boolean;
    targetSlotIndex: number | null;
    isSubstitute: boolean;
    substituteIndex?: number;
  }>({
    isOpen: false,
    targetSlotIndex: null,
    isSubstitute: false
  });
  const [pickerSearch, setPickerSearch] = useState('');
  const [pickerRarity, setPickerRarity] = useState<number | 'all'>('all');

  const sortPartiesForDisplay = (items: UnifiedPartyData[]): UnifiedPartyData[] => {
    const sorted = [...items];
    if (gameKey === 'HSR') {
      sorted.sort((a, b) => {
        const newestVersion = (party: UnifiedPartyData) => Math.max(
          1,
          ...party.slots.map(slot => HSR_VERSION_BY_NORMALIZED_NAME.get(normalizeCharacterName(slot.characterName)) || 1)
        );
        return newestVersion(b) - newestVersion(a) || a.order - b.order;
      });
    } else {
      sorted.sort((a, b) => a.order - b.order);
    }
    return sorted.map((party, index) => ({ ...party, order: index + 1 }));
  };

  const toRows = (items: UnifiedPartyData[]) => items.map((party, index) => ({
    game_id: activeGame.toLowerCase(),
    party_id: party.id,
    name: party.name,
    description: party.description,
    category: (party as any).category || (party as any).elementSynergy || '범용',
    element_synergy: (party as any).elementSynergy || (party as any).category || '범용',
    main_dps: party.mainDPS,
    tags: party.tags,
    pros: party.pros,
    cons: party.cons,
    members: party.slots,
    display_order: index + 1,
    updated_at: party.updatedAt || new Date().toISOString()
  }));

  // The admin DB is the only copy of the parties (the site builds from it), so a save either
  // lands there or is undone on screen. Replacing a game's rows is delete + insert; if the insert
  // fails, the rows from before the edit are put back so the game is never left empty.
  const persistParties = async (items: UnifiedPartyData[], successMessage?: string) => {
    if (!supabase || !dbLoaded) {
      showToast('DB를 읽지 못해 저장하지 않았습니다. 새로고침 후 다시 시도해 주세요.', 'error');
      return;
    }
    const previous = parties;
    const sorted = sortPartiesForDisplay(items);
    setParties(sorted);
    setLoading(true);
    try {
      const { error: deleteError } = await supabase
        .from('party_recommendations')
        .delete()
        .eq('game_id', activeGame.toLowerCase());
      if (deleteError) throw deleteError;
      const { error: insertError } = await supabase.from('party_recommendations').insert(toRows(sorted));
      if (insertError) {
        const { error: restoreError } = await supabase.from('party_recommendations').insert(toRows(previous));
        if (restoreError) console.error('Restoring the previous parties failed:', restoreError);
        throw insertError;
      }
      showToast(successMessage || '변경 사항을 DB에 저장했습니다.');
    } catch (error: any) {
      console.warn('Party save failed:', error);
      setParties(previous);
      showToast(`저장 실패: ${error?.message || '알 수 없는 오류'} · 변경 전 상태로 되돌렸습니다.`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // 토스트 알림 함수
  const showToast = (msg: string, tone: 'success' | 'error' = 'success') => {
    setToastMessage(msg);
    setToastTone(tone);
    setTimeout(() => setToastMessage(null), tone === 'error' ? 6000 : 3500);
  };

  // 활성 게임의 전체 캐릭터 목록 조회
  const availableCharacters = useMemo(() => {
    if (gameKey === 'WW') {
      return WW_CHARACTERS.map(c => ({
        id: c.id,
        name: c.name,
        folderName: c.folderName || c.name,
        rarity: c.rarity || 5,
        attribute: c.attribute || '',
        path: c.weaponType || '공명자'
      }));
    }
    if (gameKey === 'NTE') {
      return NTE_CHARACTERS.map(c => ({
        id: c.id,
        name: c.name,
        folderName: c.folderName || c.name,
        rarity: c.rarity || 5,
        attribute: c.attribute || '',
        path: c.class || '클래스'
      }));
    }
    return HSR_CHARACTERS.map(c => ({
      id: c.id,
      name: c.name,
      folderName: (c as any).folderName || c.name,
      rarity: c.rarity || 5,
      attribute: c.attribute || '',
      path: c.path || ''
    }));
  }, [gameKey]);

  // HSR 존재(Path)별 통상적인 포지션. 기존 파티에 한 번도 쓰인 적 없는 신규 캐릭터의
  // 포지션을 추정할 때만 2차 fallback으로 쓴다. 예외는 직접 고치면 된다.
  const HSR_PATH_DEFAULT_ROLE: Record<string, string> = {
    '파멸': '메인 딜러', '수렵': '메인 딜러', '지식': '메인 딜러', '환락': '메인 딜러',
    '공허': '서브 딜러',
    '화합': '서포터', '기억': '서포터',
    '보존': '탱커·힐러', '풍요': '탱커·힐러'
  };

  // 캐릭터별로 지금까지 저장된 파티들에서 가장 많이 맡았던 역할. 슬롯에 캐릭터를
  // 고르면 이 빈도를 기준으로 포지션을 자동으로 채운다.
  const roleFrequency = useMemo(() => {
    const freq = new Map<string, Record<string, number>>();
    const tally = (name: string | undefined, role: string | undefined) => {
      if (!name || !role) return;
      const key = normalizeCharacterName(name);
      const counts = freq.get(key) || {};
      counts[role] = (counts[role] || 0) + 1;
      freq.set(key, counts);
    };
    parties.forEach(party => {
      party.slots.forEach(slot => {
        tally(slot.characterName, slot.role);
        (slot.substitutes || []).forEach(sub => tally(sub.characterName, sub.role));
      });
    });
    return freq;
  }, [parties]);

  const guessRole = (char: { name: string; path?: string }): string => {
    const counts = roleFrequency.get(normalizeCharacterName(char.name));
    if (counts) {
      const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      if (best) return best[0];
    }
    if (gameKey === 'HSR' && char.path && HSR_PATH_DEFAULT_ROLE[char.path]) {
      return HSR_PATH_DEFAULT_ROLE[char.path];
    }
    return (ROLE_PRESETS[gameKey] || ['메인 딜러'])[0];
  };

  // 로컬 기본 내장 상수 데이터 변환 로더
  const getBuiltinParties = (): UnifiedPartyData[] => {
    if (gameKey === 'HSR') {
      return HSR_PARTIES.map((p, idx) => ({
        id: p.id || `hsr_party_${idx}`,
        game: 'HSR',
        name: p.name,
        description: p.description || '',
        category: p.category || '범용',
        mainDPS: p.mainDPS || '',
        tags: p.tags || [],
        order: idx + 1,
        updatedAt: new Date().toISOString(),
        slots: [
          p.members[0] ? { characterId: p.members[0].id, characterName: p.members[0].name, folderName: p.members[0].folderName, role: p.members[0].role, substitutes: p.members[0].substitutes?.map(s => ({ characterId: s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '메인 딜러' },
          p.members[1] ? { characterId: p.members[1].id, characterName: p.members[1].name, folderName: p.members[1].folderName, role: p.members[1].role, substitutes: p.members[1].substitutes?.map(s => ({ characterId: s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '서브 딜러' },
          p.members[2] ? { characterId: p.members[2].id, characterName: p.members[2].name, folderName: p.members[2].folderName, role: p.members[2].role, substitutes: p.members[2].substitutes?.map(s => ({ characterId: s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '서포터' },
          p.members[3] ? { characterId: p.members[3].id, characterName: p.members[3].name, folderName: p.members[3].folderName, role: p.members[3].role, substitutes: p.members[3].substitutes?.map(s => ({ characterId: s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '탱커·힐러' },
        ] as [PartySlot, PartySlot, PartySlot, PartySlot]
      }));
    }

    if (gameKey === 'WW') {
      return WW_PARTY_COMBINATIONS.map((p, idx) => ({
        id: p.id || `ww_party_${idx}`,
        game: 'WW',
        name: p.name,
        description: p.description || '',
        tags: [],
        pros: p.pros || [],
        cons: p.cons || [],
        order: idx + 1,
        updatedAt: new Date().toISOString(),
        slots: [
          p.members[0] ? { characterId: p.members[0].id, characterName: p.members[0].name, folderName: p.members[0].folderName, role: p.members[0].role } : { characterId: '', characterName: '', role: '메인 딜러' },
          p.members[1] ? { characterId: p.members[1].id, characterName: p.members[1].name, folderName: p.members[1].folderName, role: p.members[1].role } : { characterId: '', characterName: '', role: '서브 딜러' },
          p.members[2] ? { characterId: p.members[2].id, characterName: p.members[2].name, folderName: p.members[2].folderName, role: p.members[2].role } : { characterId: '', characterName: '', role: '서포터' },
        ] as [PartySlot, PartySlot, PartySlot]
      }));
    }

    return NTE_PARTY_COMBINATIONS.map((p, idx) => ({
      id: p.id || `nte_party_${idx}`,
      game: 'NTE',
      name: p.name,
      description: p.description || '',
      elementSynergy: p.category || '범용',
      mainDPS: p.mainDPS || '',
      tags: p.tags || [],
      pros: p.pros || [],
      cons: p.cons || [],
      order: idx + 1,
      updatedAt: new Date().toISOString(),
      slots: [
        p.members[0] ? { characterId: p.members[0].id, characterName: p.members[0].name, folderName: p.members[0].folderName, role: p.members[0].role, substitutes: p.members[0].substitutes?.map(s => ({ characterId: s.id || s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '메인 딜러' },
        p.members[1] ? { characterId: p.members[1].id, characterName: p.members[1].name, folderName: p.members[1].folderName, role: p.members[1].role, substitutes: p.members[1].substitutes?.map(s => ({ characterId: s.id || s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '서브 딜러' },
        p.members[2] ? { characterId: p.members[2].id, characterName: p.members[2].name, folderName: p.members[2].folderName, role: p.members[2].role, substitutes: p.members[2].substitutes?.map(s => ({ characterId: s.id || s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '서포터' },
        p.members[3] ? { characterId: p.members[3].id, characterName: p.members[3].name, folderName: p.members[3].folderName, role: p.members[3].role, substitutes: p.members[3].substitutes?.map(s => ({ characterId: s.id || s.name, characterName: s.name, folderName: s.folderName, role: s.role })) } : { characterId: '', characterName: '', role: '탱커·힐러' },
      ] as [PartySlot, PartySlot, PartySlot, PartySlot]
    }));
  };

  // 데이터 로드: DB를 읽는다. 읽지 못하면 빌드 때 사본을 보여 주되 저장은 막는다(빌드 뒤 수정분을 덮어쓰지 않도록).
  const loadParties = async () => {
    setLoading(true);
    setDbLoaded(false);
    let loaded: UnifiedPartyData[] | null = null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('party_recommendations')
          .select('*')
          .eq('game_id', activeGame)
          .order('display_order', { ascending: true });

        if (error) throw error;
        setDbLoaded(true);
        if (data && data.length > 0) {
          loaded = data.map((item: any) => ({
            id: item.party_id || item.id,
            game: gameKey,
            name: item.name,
            description: item.description || '',
            category: item.category || '범용',
            elementSynergy: item.element_synergy || item.category || '범용',
            mainDPS: item.main_dps || item.mainDPS || '',
            tags: item.tags || [],
            pros: item.pros || [],
            cons: item.cons || [],
            order: item.display_order ?? 100,
            updatedAt: item.updated_at || new Date().toISOString(),
            slots: item.members || item.slots || []
          })) as UnifiedPartyData[];
        }
      } catch (err: any) {
        console.warn('Supabase fetch failed, showing the build-time copy:', err);
        showToast(`DB를 읽지 못했습니다: ${err?.message || '알 수 없는 오류'} · 빌드 때 사본을 보여 주며 저장은 막아 둡니다.`, 'error');
      }
    }

    if (!loaded || loaded.length === 0) {
      loaded = getBuiltinParties();
    }

    setParties(sortPartiesForDisplay(loaded || []));
    setLoading(false);
  };

  useEffect(() => {
    loadParties();
  }, [activeGame]);

  // 필터링된 파티 목록
  const filteredParties = useMemo(() => {
    return parties.filter(p => {
      const category = (p as any).category || (p as any).elementSynergy || '전체';
      const matchesCategory = selectedCategory === '전체' || category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = p.name.toLowerCase().includes(query);
      const matchesDps = (p.mainDPS || '').toLowerCase().includes(query);
      const matchesDesc = (p.description || '').toLowerCase().includes(query);
      const matchesSlot = p.slots.some(slot => 
        slot.characterName.toLowerCase().includes(query) || 
        slot.substitutes?.some(sub => sub.characterName.toLowerCase().includes(query))
      );
      const matchesTag = p.tags?.some(tag => tag.toLowerCase().includes(query));

      return matchesCategory && (matchesName || matchesDps || matchesDesc || matchesSlot || matchesTag);
    });
  }, [parties, selectedCategory, searchQuery]);

  // ① 새 파티 생성 (슬롯 수 자동 동기화)
  const handleOpenNew = () => {
    const roles = ROLE_PRESETS[gameKey] || ['메인 딜러', '서브 딜러', '서포터', '탱커·힐러'];
    const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `${activeGame}_party_${Date.now()}`;

    if (gameKey === 'WW') {
      const newWWParty: WWPartyData = {
        id: newId,
        game: 'WW',
        name: '',
        description: '',
        tags: [],
        pros: [],
        cons: [],
        order: parties.length + 1,
        updatedAt: new Date().toISOString(),
        slots: [
          { characterId: '', characterName: '', role: roles[0] || '메인 딜러' },
          { characterId: '', characterName: '', role: roles[1] || '서브 딜러' },
          { characterId: '', characterName: '', role: roles[2] || '서포터' }
        ]
      };
      setEditingParty(newWWParty);
    } else if (gameKey === 'NTE') {
      const newNTEParty: NTEPartyData = {
        id: newId,
        game: 'NTE',
        name: '',
        description: '',
        elementSynergy: (CATEGORY_PRESETS.NTE || [])[0] || '범용',
        mainDPS: '',
        tags: [],
        pros: [],
        cons: [],
        order: parties.length + 1,
        updatedAt: new Date().toISOString(),
        slots: [
          { characterId: '', characterName: '', role: roles[0] || '메인 딜러' },
          { characterId: '', characterName: '', role: roles[1] || '서브 딜러' },
          { characterId: '', characterName: '', role: roles[2] || '서포터' },
          { characterId: '', characterName: '', role: roles[3] || '탱커·힐러' }
        ]
      };
      setEditingParty(newNTEParty);
    } else {
      const newHSRParty: HSRPartyData = {
        id: newId,
        game: 'HSR',
        name: '',
        description: '',
        category: (CATEGORY_PRESETS.HSR || [])[0] || '추가 공격',
        mainDPS: '',
        tags: [],
        order: parties.length + 1,
        updatedAt: new Date().toISOString(),
        slots: [
          { characterId: '', characterName: '', role: roles[0] || '메인 딜러' },
          { characterId: '', characterName: '', role: roles[1] || '서브 딜러' },
          { characterId: '', characterName: '', role: roles[2] || '서포터' },
          { characterId: '', characterName: '', role: roles[3] || '탱커·힐러' }
        ]
      };
      setEditingParty(newHSRParty);
    }

    setIsEditorOpen(true);
  };

  // 파티 수정 모달 열기
  const handleOpenEdit = (party: UnifiedPartyData) => {
    setEditingParty(JSON.parse(JSON.stringify(party)));
    setIsEditorOpen(true);
  };

  // ① 1-Click 파티 복제 (Duplicate with crypto.randomUUID() & (복사본))
  const handleDuplicate = async (party: UnifiedPartyData, index: number) => {
    const newId = (typeof crypto !== 'undefined' && crypto.randomUUID) 
      ? crypto.randomUUID() 
      : `${activeGame}_party_${Date.now()}`;

    const clone: UnifiedPartyData = {
      ...JSON.parse(JSON.stringify(party)),
      id: newId,
      name: `${party.name} (복사본)`,
      order: party.order + 0.5,
      updatedAt: new Date().toISOString()
    };

    const updated = [...parties];
    updated.splice(index + 1, 0, clone);
    // order 재정렬
    const reordered = updated.map((p, idx) => ({ ...p, order: idx + 1 }));
    await persistParties(reordered, `"${party.name}" 파티가 복제·자동 저장되었습니다.`);
  };

  // 파티 삭제
  const handleDelete = async (id: string) => {
    if (confirm('이 파티 조합을 삭제하시겠습니까?')) {
      const updated = parties.filter(p => p.id !== id).map((p, idx) => ({ ...p, order: idx + 1 }));
      await persistParties(updated, '파티가 삭제·자동 저장되었습니다.');
    }
  };

  // 파티 순서 변경
  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= parties.length) return;
    const updated = [...parties];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    const reordered = updated.map((p, idx) => ({ ...p, order: idx + 1 }));
    await persistParties(reordered, '파티 순서가 자동 저장되었습니다.');
  };

  // 파티 저장 (모달 내)
  const handleSaveParty = async () => {
    if (!editingParty || !editingParty.name.trim()) {
      alert('파티 이름을 입력해 주세요.');
      return;
    }
    const updatedParty = {
      ...editingParty,
      updatedAt: new Date().toISOString()
    };

    const exists = parties.some(p => p.id === updatedParty.id);
    const nextParties = exists
      ? parties.map(p => p.id === updatedParty.id ? updatedParty : p)
      : [updatedParty, ...parties];
    setIsEditorOpen(false);
    setEditingParty(null);
    await persistParties(nextParties, '파티가 자동 저장되었습니다.');
  };

  // 캐릭터 선택 모달 열기
  const openCharacterPicker = (slotIndex: number, isSubstitute: boolean = false, substituteIndex?: number) => {
    setPickerState({
      isOpen: true,
      targetSlotIndex: slotIndex,
      isSubstitute,
      substituteIndex
    });
    setPickerSearch('');
    setPickerRarity('all');
  };

  // 캐릭터 선택 적용 (중복 방지 로직 포함)
  const handleSelectCharacter = (char: any) => {
    if (!editingParty || pickerState.targetSlotIndex === null) return;
    const updated = JSON.parse(JSON.stringify(editingParty)) as UnifiedPartyData;
    const slotIdx = pickerState.targetSlotIndex;

    applyCharacterToSlot(updated, slotIdx, char, pickerState.isSubstitute, pickerState.substituteIndex);
    setEditingParty(updated);
    setPickerState({ isOpen: false, targetSlotIndex: null, isSubstitute: false });
  };

  // 슬롯(또는 대체 캐릭터)에 캐릭터를 배치하고, 지금까지 저장된 파티에서 그 캐릭터가
  // 가장 많이 맡은 포지션을 자동으로 채운다. 인라인 검색과 기존 선택 모달이 공유한다.
  const applyCharacterToSlot = (
    party: UnifiedPartyData,
    slotIdx: number,
    char: { id: string; name: string; folderName?: string; path?: string },
    isSubstitute: boolean,
    substituteIndex?: number
  ) => {
    const guessedRole = guessRole(char);
    if (isSubstitute) {
      if (!party.slots[slotIdx].substitutes) {
        party.slots[slotIdx].substitutes = [];
      }
      const newSub = {
        characterId: char.id,
        characterName: char.name,
        folderName: char.folderName || char.name,
        role: guessedRole
      };
      if (typeof substituteIndex === 'number') {
        party.slots[slotIdx].substitutes![substituteIndex] = newSub;
      } else {
        party.slots[slotIdx].substitutes!.push(newSub);
      }
    } else {
      party.slots[slotIdx] = {
        ...party.slots[slotIdx],
        characterId: char.id,
        characterName: char.name,
        folderName: char.folderName || char.name,
        role: guessedRole
      };
      // 메인 딜러로 추정된 슬롯을 mainDPS로 맞춘다 (슬롯 순서와 무관하게).
      if (guessedRole === '메인 딜러') {
        party.mainDPS = char.name;
      } else if (slotIdx === 0 && !party.mainDPS) {
        party.mainDPS = char.name;
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* 플로팅 토스트 알림 */}
      {toastMessage && (
        <div
          role={toastTone === 'error' ? 'alert' : 'status'}
          className={`fixed bottom-8 right-8 z-[300] max-w-md bg-black/90 border ${toastTone === 'error' ? 'border-red-500/50' : 'border-amber-500/40'} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-in slide-in-from-bottom-5`}
        >
          {toastTone === 'error'
            ? <AlertCircle size={20} className="shrink-0 text-red-400" />
            : <CheckCircle2 size={20} className="shrink-0 text-amber-500" />}
          <span className="text-xs font-black">{toastMessage}</span>
        </div>
      )}

      {/* 상단 컨트롤 바 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#111] p-8 rounded-3xl border border-white/5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                {gameKey === 'HSR' ? '붕괴: 스타레일' : gameKey === 'WW' ? '명조' : 'NTE'} 파티 추천 빌더
              </h2>
              <p className="text-xs text-gray-400 font-bold">
                슬롯 규격: <span className="text-amber-500 font-black">{gameKey === 'WW' ? '3인 고정' : '4인 고정'}</span> | 총 <span className="text-amber-500">{parties.length}</span>개 파티
              </p>
              {gameKey === 'HSR' && (
                <p className="text-[11px] font-bold text-emerald-400">자동 저장 · 파티 내 최신 캐릭터 버전순 정렬</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> 새 파티 만들기
          </button>
          <button
            onClick={() => loadParties()}
            disabled={loading}
            className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-2xl transition-all disabled:opacity-50"
            title="DB에서 다시 불러오기"
            aria-label="DB에서 다시 불러오기"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 카테고리 탭 & 검색바 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['전체', ...(CATEGORY_PRESETS[gameKey] || [])].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="파티명, 캐릭터, 태그 검색..."
            className="w-full bg-[#111] border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-amber-500/50 outline-none transition-all"
          />
        </div>
      </div>

      {/* 파티 목록 카드 그리드 */}
      <div className="grid grid-cols-1 gap-6">
        {filteredParties.map((party, pIdx) => {
          const category = (party as any).category || (party as any).elementSynergy || '범용';
          return (
            <div
              key={party.id || pIdx}
              className="group bg-[#111] border border-white/5 hover:border-amber-500/30 rounded-2xl p-6 lg:p-8 transition-colors duration-300 space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[11px] font-black uppercase tracking-wider">
                      {category}
                    </span>
                    {party.mainDPS && (
                      <span className="px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-400 text-[11px] font-bold">
                        Main DPS: {party.mainDPS}
                      </span>
                    )}
                    <h3 className="text-xl font-black text-white tracking-tight">{party.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">{party.description}</p>
                  {party.tags && party.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {party.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-white/5 rounded text-[11px] text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-center gap-2 shrink-0">
                  {gameKey !== 'HSR' && (
                    <>
                      <button
                        onClick={() => handleMove(pIdx, 'up')}
                        disabled={pIdx === 0}
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white disabled:opacity-20 transition-all"
                        title="위로 이동"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => handleMove(pIdx, 'down')}
                        disabled={pIdx === parties.length - 1}
                        className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white disabled:opacity-20 transition-all"
                        title="아래로 이동"
                      >
                        <ArrowDown size={14} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDuplicate(party, pIdx)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all"
                    title="1-Click 복제"
                  >
                    <Copy size={13} /> 복제
                  </button>
                  <button
                    onClick={() => handleOpenEdit(party)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-xl text-xs font-bold text-amber-500 transition-all"
                  >
                    <Edit3 size={13} /> 수정
                  </button>
                  <button
                    onClick={() => handleDelete(party.id)}
                    className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-xl transition-all"
                    title="삭제"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* 슬롯별 캐릭터 아바타 카드 열 (3인 또는 4인 자동 렌더링 + 돌파 추천 뱃지 표시) */}
              <div className={`grid grid-cols-2 ${party.slots.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                {party.slots.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 relative group/slot hover:border-amber-500/20 transition-all"
                  >
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                      {slot.characterName ? (
                        <img
                          src={getEncodedUrl(slot.folderName || slot.characterName)}
                          alt={slot.characterName}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const p = e.currentTarget.parentElement;
                            if (p) p.innerHTML = `<span class="text-xs font-black text-amber-500/80">${slot.characterName.slice(0, 2)}</span>`;
                          }}
                        />
                      ) : (
                        <span className="text-[11px] text-gray-500 font-bold">비어있음</span>
                      )}

                      {/* 돌파 추천 뱃지 (예: 1돌+, 2돌+) */}
                      {slot.breakthrough && slot.breakthrough !== '명함 (E0)' && slot.breakthrough !== '명함 (S0)' && slot.breakthrough !== '명함' && (
                        <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-amber-500 text-black text-[11px] font-black rounded-md shadow-md">
                          {slot.breakthrough}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white truncate max-w-[120px]">{slot.characterName || '미선택'}</p>
                      <div className="flex items-center justify-center gap-1 mt-0.5">
                        <span className="text-[11px] text-amber-500/80 font-bold uppercase tracking-wider">{slot.role}</span>
                        {slot.breakthrough && (
                          <span className="text-[11px] text-amber-400 font-black px-1 py-0.2 bg-amber-500/10 border border-amber-500/20 rounded">
                            {slot.breakthrough}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 대체 캐릭터 뱃지들 (돌파 추천 포함) */}
                    {slot.substitutes && slot.substitutes.length > 0 && (
                      <div className="w-full pt-2 border-t border-white/5 flex flex-wrap items-center justify-center gap-1.5">
                        <span className="text-[11px] text-gray-500 font-bold uppercase w-full">대체 캐릭터:</span>
                        {slot.substitutes.map((sub, subIdx) => (
                          <span
                            key={subIdx}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[11px] text-gray-300 font-medium truncate max-w-[110px] flex items-center gap-1"
                            title={sub.description || sub.breakthrough ? `${sub.characterName} (${sub.breakthrough || '명함'}): ${sub.description || ''}` : sub.characterName}
                          >
                            <span>{sub.characterName}</span>
                            {sub.breakthrough && (
                              <span className="text-amber-400 font-bold text-[11px]">({sub.breakthrough})</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredParties.length === 0 && (
          <div className="py-20 text-center bg-[#111] rounded-3xl border border-white/5 space-y-4">
            <Users size={48} className="mx-auto text-gray-600" />
            <p className="text-gray-400 font-bold text-sm">등록되거나 검색된 파티 추천 데이터가 없습니다.</p>
            <button
              onClick={handleOpenNew}
              className="px-6 py-2.5 bg-amber-500 text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-all"
            >
              첫 파티 생성하기
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🛠️ 파티 조합 편집 / 빌더 모달 */}
      {/* ========================================================================= */}
      {isEditorOpen && editingParty && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 space-y-8 shadow-2xl custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingParty.id ? '파티 조합 편집' : '새 파티 조합 구성'}
                  </h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    {gameKey} Party Configuration ({editingParty.slots.length}인 슬롯)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* 기본 메타 입력 폼 (이름 & 카테고리) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-widest text-amber-500">파티 이름 *</label>
                  {/* 특수기호 빠른 삽입 버튼 */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-gray-500 font-bold">특수기호:</span>
                    <button
                      type="button"
                      onClick={() => setEditingParty({ ...editingParty, name: (editingParty.name || '') + '•' })}
                      className="px-2 py-0.5 bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 border border-white/10 rounded-md text-xs font-bold text-gray-300 transition-all"
                      title="불릿(•) 기호 삽입"
                    >
                      •
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingParty({ ...editingParty, name: (editingParty.name || '') + '·' })}
                      className="px-2 py-0.5 bg-white/5 hover:bg-amber-500/20 hover:text-amber-400 border border-white/10 rounded-md text-xs font-bold text-gray-300 transition-all"
                      title="가운뎃점(·) 기호 삽입"
                    >
                      ·
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={editingParty.name}
                  onChange={(e) => setEditingParty({ ...editingParty, name: e.target.value })}
                  placeholder="예: 천야•블레이드 환락 추가타 파티"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                />

                {/* 슬롯 배치 캐릭터명 원클릭 삽입 칩 & 자동완성 버튼 */}
                <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                  {editingParty.slots.some(s => Boolean(s.characterName)) && (
                    <>
                      <span className="text-[11px] text-gray-500 font-bold">이름 삽입:</span>
                      {editingParty.slots
                        .filter(s => Boolean(s.characterName))
                        .map((slot, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => {
                              const currentName = editingParty.name || '';
                              const addition = currentName ? `${currentName} ${slot.characterName}` : slot.characterName;
                              setEditingParty({ ...editingParty, name: addition });
                              showToast(`"${slot.characterName}" 삽입됨`);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 rounded-lg text-[11px] font-bold text-gray-300 hover:text-amber-400 transition-all active:scale-95"
                            title="클릭하여 파티명에 삽입"
                          >
                            <Plus size={10} className="text-amber-500" />
                            <span>{slot.characterName}</span>
                          </button>
                        ))}
                    </>
                  )}

                  {/* 자동 파티명 추천 버튼 */}
                  {(editingParty.mainDPS || editingParty.slots[0]?.characterName) && (
                    <button
                      type="button"
                      onClick={() => {
                        const targetChar = editingParty.mainDPS || editingParty.slots[0]?.characterName || '';
                        const cat = (editingParty as any).category || (editingParty as any).elementSynergy || '';
                        const autoTitle = `${targetChar} ${cat} 파티`.trim();
                        setEditingParty({ ...editingParty, name: autoTitle });
                        showToast(`파티명이 "${autoTitle}"(으)로 자동완성되었습니다!`);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg text-[11px] font-black text-amber-400 transition-all active:scale-95 ml-auto"
                    >
                      <Sparkles size={11} /> 파티명 자동완성
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-amber-500">카테고리</label>
                <select
                  value={(editingParty as any).category || (editingParty as any).elementSynergy || ''}
                  onChange={(e) => {
                    if (gameKey === 'NTE') {
                      setEditingParty({ ...editingParty, elementSynergy: e.target.value } as NTEPartyData);
                    } else if (gameKey === 'HSR') {
                      setEditingParty({ ...editingParty, category: e.target.value } as HSRPartyData);
                    }
                  }}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                >
                  {(CATEGORY_PRESETS[gameKey] || []).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 1단계: 시각적 슬롯 캐릭터 빌더 (먼저 슬롯 배치) */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <Users size={18} className="text-amber-500" /> 1단계: 파티 슬롯 멤버 배치 ({editingParty.slots.length}인 고정)
                  </h4>
                  <p className="text-xs text-gray-400">각 슬롯을 클릭하여 캐릭터를 배치하세요.</p>
                </div>
              </div>

              <div className={`grid grid-cols-1 ${editingParty.slots.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                {editingParty.slots.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className="bg-black/50 border border-white/10 rounded-3xl p-5 space-y-4 relative flex flex-col justify-between group"
                  >
                    {/* 상단 슬롯 헤더 & 역할 선택 */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-black text-amber-500 uppercase tracking-widest">
                          Slot {sIdx + 1}
                        </span>
                      </div>

                      {/* 캐릭터 검색 입력 (Tab으로 다음 슬롯까지 바로 이동) */}
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center shrink-0">
                          {slot.characterName ? (
                            <img
                              src={getEncodedUrl(slot.folderName || slot.characterName)}
                              alt={slot.characterName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Plus size={16} className="text-gray-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CharacterPickerInput
                            value={slot.characterName}
                            characters={availableCharacters}
                            getEncodedUrl={getEncodedUrl}
                            placeholder={`슬롯 ${sIdx + 1} 캐릭터 검색...`}
                            tabIndex={sIdx + 1}
                            onPick={(char) => {
                              const updated = JSON.parse(JSON.stringify(editingParty)) as UnifiedPartyData;
                              applyCharacterToSlot(updated, sIdx, char, false);
                              setEditingParty(updated);
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => openCharacterPicker(sIdx, false)}
                          title="이미지로 찾아보기"
                          tabIndex={-1}
                          className="shrink-0 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-amber-400 transition-colors"
                        >
                          <Search size={14} />
                        </button>
                      </div>

                      {/* 슬롯 역할 및 돌파 추천 드롭다운 */}
                      <div className="pt-2 space-y-1.5">
                        <select
                          value={slot.role || ''}
                          onChange={(e) => {
                            const updatedSlots = [...editingParty.slots];
                            updatedSlots[sIdx].role = e.target.value;
                            setEditingParty({ ...editingParty, slots: updatedSlots as any });
                          }}
                          className="w-full bg-[#181818] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-center font-bold text-gray-300 focus:border-amber-500/50 outline-none"
                        >
                          {(ROLE_PRESETS[gameKey] || []).map(r => (
                            <option key={r} value={r}>{r}</option>
                          ))}
                        </select>

                        {/* 돌파 추천 드롭다운 */}
                        <div className="flex items-center gap-1">
                          <select
                            value={slot.breakthrough || ''}
                            onChange={(e) => {
                              const updatedSlots = [...editingParty.slots];
                              updatedSlots[sIdx].breakthrough = e.target.value;
                              setEditingParty({ ...editingParty, slots: updatedSlots as any });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-2 py-1 text-[11px] font-black text-amber-400 focus:border-amber-500/50 outline-none text-center"
                          >
                            <option value="">돌파 권장: 명함</option>
                            {(BREAKTHROUGH_PRESETS[gameKey] || []).map(b => (
                              <option key={b} value={b}>{b}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* 대체 캐릭터 (Substitutes) 관리 */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">대체 캐릭터</span>

                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 min-w-0">
                          <CharacterPickerInput
                            value=""
                            characters={availableCharacters}
                            getEncodedUrl={getEncodedUrl}
                            placeholder="대체 캐릭터 검색..."
                            clearAfterPick
                            excludeNames={[slot.characterName, ...((slot.substitutes || []).map(s => s.characterName))]}
                            onPick={(char) => {
                              const updated = JSON.parse(JSON.stringify(editingParty)) as UnifiedPartyData;
                              applyCharacterToSlot(updated, sIdx, char, true);
                              setEditingParty(updated);
                            }}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => openCharacterPicker(sIdx, true)}
                          title="이미지로 찾아보기"
                          tabIndex={-1}
                          className="shrink-0 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-amber-400 transition-colors"
                        >
                          <Search size={12} />
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(slot.substitutes || []).map((sub, subIdx) => (
                          <div
                            key={subIdx}
                            className="p-2 bg-white/5 border border-white/5 rounded-xl space-y-1 text-xs"
                          >
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-gray-200 font-bold truncate max-w-[95px]">{sub.characterName}</span>
                              <button
                                onClick={() => {
                                  const updatedSlots = [...editingParty.slots];
                                  updatedSlots[sIdx].substitutes!.splice(subIdx, 1);
                                  setEditingParty({ ...editingParty, slots: updatedSlots as any });
                                }}
                                className="text-gray-500 hover:text-rose-400 p-0.5"
                              >
                                <X size={12} />
                              </button>
                            </div>
                            {/* 대체 캐릭터 돌파 추천 셀렉터 */}
                            <select
                              value={sub.breakthrough || ''}
                              onChange={(e) => {
                                const updatedSlots = [...editingParty.slots];
                                updatedSlots[sIdx].substitutes![subIdx].breakthrough = e.target.value;
                                setEditingParty({ ...editingParty, slots: updatedSlots as any });
                              }}
                              className="w-full bg-black/60 border border-white/10 rounded-lg px-2 py-0.5 text-[11px] font-bold text-amber-400 outline-none"
                            >
                              <option value="">돌파: 명함</option>
                              <option value="1돌+">1돌+ 권장</option>
                              <option value="2돌+">2돌+ 권장</option>
                              <option value="2돌 필수">2돌 필수</option>
                              <option value="4돌+">4돌+</option>
                              <option value="풀돌">풀돌(6돌)</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2단계: 메인 딜러(Main DPS) 토글 선택 (배치된 캐릭터 중에서만 표시) */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <Sword size={18} className="text-rose-400" /> 2단계: 메인 딜러 (Main DPS) 지정
                  </h4>
                  <p className="text-xs text-gray-400">위에서 배치한 슬롯 캐릭터 중 메인 딜러를 클릭하여 선택하세요.</p>
                </div>
                {editingParty.mainDPS && (
                  <div className="px-3.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 text-xs font-black flex items-center gap-1.5">
                    <Sparkles size={13} /> 현재 메인 딜러: {editingParty.mainDPS}
                  </div>
                )}
              </div>

              {/* 슬롯에 배치된 캐릭터 목록으로만 토글 렌더링 */}
              {editingParty.slots.some(s => Boolean(s.characterName)) ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-1">
                  {editingParty.slots
                    .filter(s => Boolean(s.characterName))
                    .map((slot, sIdx) => {
                      const isSelected = editingParty.mainDPS === slot.characterName;
                      return (
                        <button
                          key={sIdx}
                          type="button"
                          onClick={() => setEditingParty({ 
                            ...editingParty, 
                            mainDPS: isSelected ? '' : slot.characterName 
                          })}
                          className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                            isSelected
                              ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/25 border-2 border-amber-300 scale-[1.02]'
                              : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-amber-500/30'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-black/60 shrink-0">
                            <img
                              src={getEncodedUrl(slot.folderName || slot.characterName)}
                              alt={slot.characterName}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </div>
                          <div className="truncate flex-1">
                            <p className="text-xs font-black truncate">{slot.characterName}</p>
                            <p className={`text-[11px] font-bold uppercase ${isSelected ? 'text-black/70' : 'text-gray-400'}`}>
                              {slot.role}
                            </p>
                          </div>
                          {isSelected ? (
                            <Check size={16} strokeWidth={3} className="text-black shrink-0" />
                          ) : (
                            <span className="text-[11px] text-gray-500 font-bold">선택</span>
                          )}
                        </button>
                      );
                    })}
                </div>
              ) : (
                <div className="p-6 bg-white/[0.02] border border-dashed border-white/10 rounded-2xl text-center space-y-1">
                  <p className="text-xs text-gray-400 font-bold">⚠️ 먼저 위의 1단계 파티 슬롯에서 캐릭터를 선택해 주세요.</p>
                  <p className="text-[11px] text-gray-500">배치된 캐릭터들이 이곳에 메인 딜러 후보로 자동 노출됩니다.</p>
                </div>
              )}
            </div>

            {/* 3단계: 파티 설명 및 태그 입력 */}
            <div className="space-y-4 pt-6 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-amber-500">파티 설명 및 운영법</label>
                <textarea
                  value={editingParty.description}
                  onChange={(e) => setEditingParty({ ...editingParty, description: e.target.value })}
                  rows={3}
                  placeholder="파티의 핵심 시너지, 스킬 사이클 및 추천 운영 방식을 간결히 작성해 주세요."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-amber-500/50 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-amber-500">태그 (쉼표로 구분)</label>
                <input
                  type="text"
                  value={(editingParty.tags || []).join(', ')}
                  onChange={(e) => setEditingParty({ 
                    ...editingParty, 
                    tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) 
                  })}
                  placeholder="예: 환락, 추가 공격, 속도 버프"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                />
              </div>
            </div>

            {/* 모달 하단 액션 버튼 */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
              <button
                onClick={() => setIsEditorOpen(false)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold text-gray-400 hover:text-white transition-all"
              >
                취소
              </button>
              <button
                onClick={handleSaveParty}
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 disabled:cursor-wait disabled:opacity-50"
              >
                {loading ? <RefreshCw size={16} className="animate-spin" /> : <Check size={16} strokeWidth={3} />}
                {loading ? '자동 저장 중' : '저장 및 즉시 반영'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎯 고속 캐릭터 선택 모달 (높이 고정 & 중복 선택 방지) */}
      {/* ========================================================================= */}
      {pickerState.isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-2xl h-[650px] max-h-[88vh] flex flex-col p-6 md:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
              <div>
                <h4 className="text-xl font-black text-white">
                  {pickerState.isSubstitute ? '대체 캐릭터 선택' : `슬롯 ${(pickerState.targetSlotIndex ?? 0) + 1} 캐릭터 선택`}
                </h4>
                <p className="text-xs text-gray-400">클릭하여 해당 슬롯에 즉시 배치합니다.</p>
              </div>
              <button
                onClick={() => setPickerState({ isOpen: false, targetSlotIndex: null, isSubstitute: false })}
                className="p-2 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            {/* 실시간 검색 및 등급 필터 (고정 영역) */}
            <div className="space-y-3 shrink-0">
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={pickerSearch}
                  onChange={(e) => setPickerSearch(e.target.value)}
                  placeholder="캐릭터 이름 검색..."
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-amber-500/50 outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPickerRarity('all')}
                  className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all ${pickerRarity === 'all' ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'}`}
                >
                  전체 등급
                </button>
                <button
                  onClick={() => setPickerRarity(5)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all ${pickerRarity === 5 ? 'bg-yellow-500 text-black' : 'bg-white/5 text-yellow-500/70'}`}
                >
                  5★ 전용
                </button>
                <button
                  onClick={() => setPickerRarity(4)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-black transition-all ${pickerRarity === 4 ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400/70'}`}
                >
                  4★ 전용
                </button>
              </div>
            </div>

            {/* 캐릭터 그리드 (높이 고정 스크롤 영역: 검색 시 크기 흔들림 방지) */}
            <div className="flex-1 min-h-0 overflow-y-auto pr-1 custom-scrollbar">
              {(() => {
                const filtered = availableCharacters.filter(c => {
                  const matchesSearch = c.name.toLowerCase().includes(pickerSearch.toLowerCase().trim());
                  const matchesRarity = pickerRarity === 'all' || c.rarity === pickerRarity;
                  
                  // 중복 방지 필터: 대체 캐릭터 선택 시 현재 슬롯 본체 및 이미 추가된 서브 캐릭터 제외
                  if (pickerState.isSubstitute && editingParty && pickerState.targetSlotIndex !== null) {
                    const currentSlot = editingParty.slots[pickerState.targetSlotIndex];
                    if (currentSlot.characterName === c.name) return false;
                    if (currentSlot.substitutes?.some(s => s.characterName === c.name)) return false;
                  }
                  
                  return matchesSearch && matchesRarity;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-gray-500">
                      <Search size={32} className="opacity-40" />
                      <p className="text-xs font-bold">검색 결과와 일치하는 캐릭터가 없습니다.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1">
                    {filtered.map(char => (
                      <button
                        key={char.id}
                        onClick={() => handleSelectCharacter(char)}
                        className="group bg-black/40 border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 rounded-2xl p-2.5 flex flex-col items-center gap-2 transition-colors"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center shrink-0">
                          <img
                            src={getEncodedUrl(char.folderName || char.name)}
                            alt={char.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              const p = e.currentTarget.parentElement;
                              if (p) p.innerHTML = `<span class="text-xs font-black text-amber-500">${char.name.slice(0, 2)}</span>`;
                            }}
                          />
                        </div>
                        <div className="text-center w-full">
                          <p className="text-xs font-black text-white truncate">{char.name}</p>
                          <p className="text-[11px] text-gray-400 truncate">{char.attribute || char.path}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartyManager;
