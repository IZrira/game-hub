import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Plus, Trash2, Edit3, Copy, Save, RefreshCw, Search, ArrowUp, ArrowDown, 
  Sparkles, Check, X, Shield, Zap, Sword, ExternalLink, Filter, Code, Download, Upload, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { 
  PartySlot, 
  UnifiedPartyData, 
  HSRPartyData, 
  WWPartyData, 
  NTEPartyData, 
  exportPartyToTSCode 
} from '../types/party';
import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';
import { HSR_PARTIES } from '../../hsr-hub/data/parties/index';
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

export const AdminPartyManager: React.FC<AdminPartyManagerProps> = ({ activeGame, getEncodedUrl }) => {
  const gameKey: 'HSR' | 'WW' | 'NTE' = (activeGame.toUpperCase()) as 'HSR' | 'WW' | 'NTE';

  // 파티 목록 상태
  const [parties, setParties] = useState<UnifiedPartyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  // 토스트 알림 함수
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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

  // 데이터 로드: 1) Supabase -> 2) localStorage -> 3) Built-in Constants
  const loadParties = async () => {
    setLoading(true);
    let loaded: UnifiedPartyData[] | null = null;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('party_recommendations')
          .select('*')
          .eq('game_id', activeGame)
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
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
      } catch (err) {
        console.warn('Supabase fetch failed, falling back:', err);
      }
    }

    if (!loaded) {
      const cached = localStorage.getItem(`parties_${gameKey}`);
      if (cached) {
        try {
          loaded = JSON.parse(cached);
        } catch (e) {
          console.error('Failed to parse cached parties:', e);
        }
      }
    }

    if (!loaded || loaded.length === 0) {
      loaded = getBuiltinParties();
    }

    setParties(loaded || []);
    setLoading(false);
  };

  useEffect(() => {
    loadParties();
  }, [activeGame]);

  // parties 상태 변경 시 localStorage 자동 캐싱
  useEffect(() => {
    if (parties.length > 0) {
      localStorage.setItem(`parties_${gameKey}`, JSON.stringify(parties));
    }
  }, [parties, gameKey]);

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
  const handleDuplicate = (party: UnifiedPartyData, index: number) => {
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
    setParties(reordered);
    showToast(`"${party.name}" 파티가 성공적으로 복제되었습니다!`);
  };

  // 파티 삭제
  const handleDelete = (id: string) => {
    if (confirm('이 파티 조합을 삭제하시겠습니까?')) {
      const updated = parties.filter(p => p.id !== id).map((p, idx) => ({ ...p, order: idx + 1 }));
      setParties(updated);
      showToast('파티가 삭제되었습니다.');
    }
  };

  // 파티 순서 변경
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= parties.length) return;
    const updated = [...parties];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    const reordered = updated.map((p, idx) => ({ ...p, order: idx + 1 }));
    setParties(reordered);
  };

  // 파티 저장 (모달 내)
  const handleSaveParty = () => {
    if (!editingParty || !editingParty.name.trim()) {
      alert('파티 이름을 입력해 주세요.');
      return;
    }
    const updatedParty = {
      ...editingParty,
      updatedAt: new Date().toISOString()
    };

    const exists = parties.some(p => p.id === updatedParty.id);
    if (exists) {
      setParties(parties.map(p => p.id === updatedParty.id ? updatedParty : p));
    } else {
      setParties([updatedParty, ...parties]);
    }
    setIsEditorOpen(false);
    setEditingParty(null);
    showToast('파티 설정이 저장되었습니다.');
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

    if (pickerState.isSubstitute) {
      if (!updated.slots[slotIdx].substitutes) {
        updated.slots[slotIdx].substitutes = [];
      }
      const newSub = {
        characterId: char.id,
        characterName: char.name,
        folderName: char.folderName || char.name,
        role: updated.slots[slotIdx].role
      };
      if (typeof pickerState.substituteIndex === 'number') {
        updated.slots[slotIdx].substitutes![pickerState.substituteIndex] = newSub;
      } else {
        updated.slots[slotIdx].substitutes!.push(newSub);
      }
    } else {
      updated.slots[slotIdx] = {
        ...updated.slots[slotIdx],
        characterId: char.id,
        characterName: char.name,
        folderName: char.folderName || char.name
      };
      // 슬롯 1인 경우 자동으로 mainDPS 설정
      if (slotIdx === 0 && !updated.mainDPS) {
        updated.mainDPS = char.name;
      }
    }

    setEditingParty(updated);
    setPickerState({ isOpen: false, targetSlotIndex: null, isSubstitute: false });
  };

  // ② TypeScript 코드 내보내기 템플릿 엔진
  const handleExportCode = async () => {
    const code = exportPartyToTSCode(gameKey, parties);
    try {
      await navigator.clipboard.writeText(code);
      showToast(`[${gameKey}] 파티 데이터(${parties.length}개)가 TypeScript 코드로 복사되었습니다!`);
    } catch (err: any) {
      alert('클립보드 복사 실패: ' + err.message);
    }
  };

  // ③ Supabase 동기화 저장
  const handleSyncToSupabase = async () => {
    if (!supabase) {
      alert('Supabase 클라이언트가 설정되지 않았습니다. 로컬 브라우저 캐시에 저장되었습니다.');
      return;
    }
    try {
      setLoading(true);
      await supabase.from('party_recommendations').delete().eq('game_id', activeGame);
      
      const payload = parties.map((p, idx) => ({
        game_id: activeGame,
        party_id: p.id,
        name: p.name,
        description: p.description,
        category: (p as any).category || (p as any).elementSynergy || '범용',
        element_synergy: (p as any).elementSynergy || (p as any).category || '범용',
        main_dps: p.mainDPS,
        tags: p.tags,
        pros: p.pros,
        cons: p.cons,
        members: p.slots,
        display_order: idx + 1,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('party_recommendations').insert(payload);
      if (error) throw error;
      showToast(`[${gameKey}] ${parties.length}개의 파티가 Supabase 클라우드에 동기화되었습니다!`);
    } catch (err: any) {
      console.warn('Supabase sync error:', err);
      showToast(`로컬 저장 완료 (클라우드 테이블 부재: [코드 내보내기] 지원)`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* 플로팅 토스트 알림 */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-[300] bg-black/90 border border-amber-500/40 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={20} className="text-amber-500" />
          <span className="text-xs font-black">{toastMessage}</span>
        </div>
      )}

      {/* 상단 컨트롤 바 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#111] p-8 rounded-[36px] border border-white/5 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                {gameKey === 'HSR' ? '붕괴: 스타레일' : gameKey === 'WW' ? '명조' : 'NTE'} 파티 추천 빌더
              </h2>
              <p className="text-xs text-gray-400 font-bold">
                슬롯 규격: <span className="text-amber-500 font-black">{gameKey === 'WW' ? '3인 고정' : '4인 고정'}</span> | 총 <span className="text-amber-500">{parties.length}</span>개 파티
              </p>
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
            onClick={handleExportCode}
            className="flex items-center gap-2 px-5 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95"
          >
            <Code size={16} className="text-amber-500" /> 코드 내보내기
          </button>
          <button
            onClick={handleSyncToSupabase}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-2xl transition-all active:scale-95 disabled:opacity-50"
          >
            <Save size={16} /> 클라우드 동기화
          </button>
          <button
            onClick={() => {
              if (confirm('기존 코드 기본 프리셋으로 되돌리시겠습니까?')) {
                setParties(getBuiltinParties());
                showToast('기본 프리셋으로 복원되었습니다.');
              }
            }}
            className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-2xl transition-all"
            title="기본 프리셋으로 초기화"
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
              className="group bg-[#111] border border-white/5 hover:border-amber-500/30 rounded-[32px] p-6 lg:p-8 transition-all duration-300 shadow-xl space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[10px] font-black uppercase tracking-wider">
                      {category}
                    </span>
                    {party.mainDPS && (
                      <span className="px-2.5 py-0.5 bg-rose-500/10 border border-rose-500/20 rounded-md text-rose-400 text-[10px] font-bold">
                        Main DPS: {party.mainDPS}
                      </span>
                    )}
                    <h3 className="text-xl font-black text-white tracking-tight">{party.name}</h3>
                  </div>
                  <p className="text-xs text-gray-400 max-w-3xl leading-relaxed">{party.description}</p>
                  {party.tags && party.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {party.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-center gap-2 shrink-0">
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

              {/* 슬롯별 캐릭터 아바타 카드 열 (3인 또는 4인 자동 렌더링) */}
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
                        <span className="text-[10px] text-gray-500 font-bold">비어있음</span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-black text-white truncate max-w-[120px]">{slot.characterName || '미선택'}</p>
                      <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wider">{slot.role}</p>
                    </div>

                    {/* 대체 캐릭터 뱃지들 */}
                    {slot.substitutes && slot.substitutes.length > 0 && (
                      <div className="w-full pt-2 border-t border-white/5 flex flex-wrap items-center justify-center gap-1.5">
                        <span className="text-[8px] text-gray-500 font-bold uppercase w-full">대체:</span>
                        {slot.substitutes.map((sub, subIdx) => (
                          <span
                            key={subIdx}
                            className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] text-gray-300 font-medium truncate max-w-[90px]"
                          >
                            {sub.characterName}
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
          <div className="py-20 text-center bg-[#111] rounded-[36px] border border-white/5 space-y-4">
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
          <div className="bg-[#121212] border border-white/10 rounded-[36px] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 md:p-10 space-y-8 shadow-2xl custom-scrollbar">
            <div className="flex items-center justify-between border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white">
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

            {/* 기본 메타 입력 폼 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">파티 이름 *</label>
                <input
                  type="text"
                  value={editingParty.name}
                  onChange={(e) => setEditingParty({ ...editingParty, name: e.target.value })}
                  placeholder="예: 어벤츄린•웨이브 환락 추가타 파티"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">카테고리</label>
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

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">파티 설명 및 운영법</label>
                <textarea
                  value={editingParty.description}
                  onChange={(e) => setEditingParty({ ...editingParty, description: e.target.value })}
                  rows={3}
                  placeholder="파티의 핵심 시너지, 스킬 사이클 및 추천 운영 방식을 간결히 작성해 주세요."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-amber-500/50 outline-none"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
                    <Sword size={12} className="text-rose-400" /> 메인 딜러 (Main DPS) 선택
                  </label>
                  {editingParty.mainDPS && (
                    <span className="text-[10px] text-gray-400">
                      선택됨: <span className="text-amber-400 font-black">{editingParty.mainDPS}</span>
                    </span>
                  )}
                </div>

                {/* 슬롯 배치된 캐릭터 빠른 토글 칩 */}
                {editingParty.slots.some(s => s.characterName) && (
                  <div className="space-y-1.5">
                    <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">
                      슬롯 캐릭터에서 빠른 지정 (클릭하여 토글):
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
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
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                                isSelected
                                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25 scale-105 border border-amber-400'
                                  : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-amber-500/30'
                              }`}
                            >
                              <div className="w-5 h-5 rounded-lg overflow-hidden border border-white/10 bg-black/50 shrink-0">
                                <img
                                  src={getEncodedUrl(slot.folderName || slot.characterName)}
                                  alt={slot.characterName}
                                  className="w-full h-full object-cover"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              </div>
                              <span>{slot.characterName}</span>
                              {isSelected && <Check size={12} strokeWidth={3} />}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                )}

                {/* 전체 캐릭터 드롭다운 선택기 */}
                <div className="pt-1">
                  <select
                    value={editingParty.mainDPS || ''}
                    onChange={(e) => setEditingParty({ ...editingParty, mainDPS: e.target.value })}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none cursor-pointer"
                  >
                    <option value="">-- 전체 캐릭터 목록에서 선택 --</option>
                    <optgroup label="5★ 캐릭터">
                      {availableCharacters
                        .filter(c => c.rarity === 5)
                        .map(c => (
                          <option key={c.id} value={c.name} style={{ backgroundColor: '#111' }}>
                            ★5 {c.name} ({c.attribute || c.path})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="4★ 캐릭터">
                      {availableCharacters
                        .filter(c => c.rarity === 4)
                        .map(c => (
                          <option key={c.id} value={c.name} style={{ backgroundColor: '#111' }}>
                            ★4 {c.name} ({c.attribute || c.path})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">태그 (쉼표로 구분)</label>
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

            {/* 시각적 슬롯 캐릭터 빌더 (3인 또는 4인 슬롯 규격 자동 스위칭) */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Users size={16} className="text-amber-500" /> 파티 슬롯 멤버 구성 ({editingParty.slots.length}인 고정)
                </h4>
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
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                          Slot {sIdx + 1}
                        </span>
                      </div>

                      {/* 캐릭터 아바타 & 선택 버튼 */}
                      <button
                        onClick={() => openCharacterPicker(sIdx, false)}
                        className="w-full flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/40 rounded-2xl transition-all"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center relative shadow-inner">
                          {slot.characterName ? (
                            <img
                              src={getEncodedUrl(slot.folderName || slot.characterName)}
                              alt={slot.characterName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Plus size={24} className="text-gray-500" />
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-white truncate max-w-[120px]">
                            {slot.characterName || '캐릭터 선택'}
                          </p>
                          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider block mt-0.5">
                            클릭하여 변경
                          </span>
                        </div>
                      </button>

                      {/* 슬롯 역할 드롭다운 */}
                      <div className="pt-2">
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
                      </div>
                    </div>

                    {/* 대체 캐릭터 (Substitutes) 관리 */}
                    <div className="pt-3 border-t border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">대체 캐릭터</span>
                        <button
                          onClick={() => openCharacterPicker(sIdx, true)}
                          className="text-[9px] font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1"
                        >
                          <Plus size={10} /> 추가
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {(slot.substitutes || []).map((sub, subIdx) => (
                          <div
                            key={subIdx}
                            className="flex items-center justify-between gap-2 px-2.5 py-1 bg-white/5 rounded-lg text-xs"
                          >
                            <span className="text-gray-300 font-medium truncate max-w-[90px]">{sub.characterName}</span>
                            <button
                              onClick={() => {
                                const updatedSlots = [...editingParty.slots];
                                updatedSlots[sIdx].substitutes!.splice(subIdx, 1);
                                setEditingParty({ ...editingParty, slots: updatedSlots as any });
                              }}
                              className="text-gray-500 hover:text-rose-400"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
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
                className="flex items-center gap-2 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              >
                <Check size={16} strokeWidth={3} /> 파티 저장 완료
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🎯 고속 캐릭터 선택 모달 (중복 선택 방지 필터 탑재) */}
      {/* ========================================================================= */}
      {pickerState.isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="bg-[#141414] border border-white/10 rounded-[36px] w-full max-w-2xl max-h-[85vh] flex flex-col p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
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

            {/* 실시간 검색 및 등급 필터 */}
            <div className="space-y-3">
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
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${pickerRarity === 'all' ? 'bg-amber-500 text-black' : 'bg-white/5 text-gray-400'}`}
                >
                  전체 등급
                </button>
                <button
                  onClick={() => setPickerRarity(5)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${pickerRarity === 5 ? 'bg-yellow-500 text-black' : 'bg-white/5 text-yellow-500/70'}`}
                >
                  5★ 전용
                </button>
                <button
                  onClick={() => setPickerRarity(4)}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black transition-all ${pickerRarity === 4 ? 'bg-purple-500 text-white' : 'bg-white/5 text-purple-400/70'}`}
                >
                  4★ 전용
                </button>
              </div>
            </div>

            {/* 캐릭터 그리드 (대체 캐릭터 추가 시 본체 캐릭터 및 기존 대체 캐릭터 중복 방지 필터) */}
            <div className="flex-1 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1 custom-scrollbar">
              {availableCharacters
                .filter(c => {
                  const matchesSearch = c.name.toLowerCase().includes(pickerSearch.toLowerCase().trim());
                  const matchesRarity = pickerRarity === 'all' || c.rarity === pickerRarity;
                  
                  // 중복 방지 필터: 대체 캐릭터 선택 시 현재 슬롯 본체 및 이미 추가된 서브 캐릭터 제외
                  if (pickerState.isSubstitute && editingParty && pickerState.targetSlotIndex !== null) {
                    const currentSlot = editingParty.slots[pickerState.targetSlotIndex];
                    if (currentSlot.characterName === c.name) return false;
                    if (currentSlot.substitutes?.some(s => s.characterName === c.name)) return false;
                  }
                  
                  return matchesSearch && matchesRarity;
                })
                .map(char => (
                  <button
                    key={char.id}
                    onClick={() => handleSelectCharacter(char)}
                    className="group bg-black/40 border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 rounded-2xl p-2.5 flex flex-col items-center gap-2 transition-all hover:scale-105"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-white/10 bg-black/80 flex items-center justify-center">
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
                      <p className="text-[8px] text-gray-400 truncate">{char.attribute || char.path}</p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartyManager;
