import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Plus, Trash2, Edit3, Copy, Save, RefreshCw, Search, ArrowUp, ArrowDown, 
  Sparkles, Check, X, Shield, Zap, Sword, ExternalLink, Filter, Code, Download, Upload, AlertCircle 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { safeEncodeURIComponent } from '../utils/assetManager';
import { CHARACTER_DATA as HSR_CHARACTERS } from '../../hsr-hub/data/characters';
import { HSR_PARTIES } from '../../hsr-hub/data/parties/index';
import { WW_CHARACTERS } from '../../ww-hub/data/characters';
import { WW_PARTY_COMBINATIONS } from '../../ww-hub/data/parties';
import { NTE_CHARACTERS } from '../../nte-hub/data/index';
import { NTE_PARTY_COMBINATIONS } from '../../nte-hub/data/parties';

interface PartyMemberData {
  id: string;
  name: string;
  role: string;
  folderName: string;
  attribute?: string;
  isTrailblazer?: boolean;
  isRover?: boolean;
  substitutes?: {
    id?: string;
    name: string;
    folderName: string;
    role?: string;
    isTrailblazer?: boolean;
    isRover?: boolean;
  }[];
}

interface PartyData {
  id: string;
  name: string;
  description: string;
  category?: string;
  mainDPS?: string;
  tags?: string[];
  pros?: string[];
  cons?: string[];
  members: PartyMemberData[];
}

interface AdminPartyManagerProps {
  activeGame: 'hsr' | 'ww' | 'nte';
  getEncodedUrl: (folderOrChar: any) => string;
}

const CATEGORY_PRESETS: Record<string, string[]> = {
  hsr: ['추가 공격', '환락', '격파', '기억', '지속 피해', '단일', '범위', '하이퍼캐리'],
  ww: ['하이퍼캐리', '속성 콤보', '변주 연계', '광역 딜링', '보스전'],
  nte: ['령 속성 시너지', '화 속성 시너지', '빛 속성', '암 속성', '혼 속성', '범용']
};

const ROLE_PRESETS: Record<string, string[]> = {
  hsr: ['메인 딜러', '서브 딜러', '서포터', '탱커/힐러'],
  ww: ['메인 딜러', '서브 딜러', '서포터', '생존'],
  nte: ['메인 딜러', '서브 딜러', '서포터', '탱커/힐러']
};

export const AdminPartyManager: React.FC<AdminPartyManagerProps> = ({ activeGame, getEncodedUrl }) => {
  // 전체 게임별 파티 목록 상태
  const [parties, setParties] = useState<PartyData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // 모달 상태
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingParty, setEditingParty] = useState<PartyData | null>(null);

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

  // 활성 게임의 전체 캐릭터 목록 조회
  const availableCharacters = useMemo(() => {
    if (activeGame === 'ww') {
      return WW_CHARACTERS.map(c => ({
        id: c.id,
        name: c.name,
        folderName: c.folderName || c.name,
        rarity: c.rarity || 5,
        attribute: c.attribute || '',
        path: c.weaponType || '공명자'
      }));
    }
    if (activeGame === 'nte') {
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
  }, [activeGame]);

  // 로컬 기본 데이터 로드
  const loadLocalParties = () => {
    let localData: PartyData[] = [];
    if (activeGame === 'hsr') {
      localData = JSON.parse(JSON.stringify(HSR_PARTIES));
    } else if (activeGame === 'ww') {
      localData = JSON.parse(JSON.stringify(WW_PARTY_COMBINATIONS));
    } else if (activeGame === 'nte') {
      localData = JSON.parse(JSON.stringify(NTE_PARTY_COMBINATIONS));
    }
    setParties(localData);
  };

  // 초기 데이터 로드 (Supabase 우선, 없으면 로컬)
  useEffect(() => {
    const fetchParties = async () => {
      setLoading(true);
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('party_recommendations')
            .select('*')
            .eq('game_id', activeGame);

          if (!error && data && data.length > 0) {
            const parsed = data.map((item: any) => ({
              id: item.party_id || item.id,
              name: item.name,
              description: item.description || '',
              category: item.category || '',
              mainDPS: item.main_dps || item.mainDPS || '',
              tags: item.tags || [],
              pros: item.pros || [],
              cons: item.cons || [],
              members: item.members || []
            }));
            setParties(parsed);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Supabase party fetch fallback to local:', err);
      }
      loadLocalParties();
      setLoading(false);
    };

    fetchParties();
  }, [activeGame]);

  // 필터링된 파티 목록
  const filteredParties = useMemo(() => {
    return parties.filter(p => {
      const matchesCategory = selectedCategory === '전체' || p.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesName = p.name.toLowerCase().includes(query);
      const matchesDps = (p.mainDPS || '').toLowerCase().includes(query);
      const matchesDesc = (p.description || '').toLowerCase().includes(query);
      const matchesMember = p.members.some(m => 
        m.name.toLowerCase().includes(query) || 
        m.substitutes?.some(s => s.name.toLowerCase().includes(query))
      );
      const matchesTag = p.tags?.some(t => t.toLowerCase().includes(query));

      return matchesCategory && (matchesName || matchesDps || matchesDesc || matchesMember || matchesTag);
    });
  }, [parties, selectedCategory, searchQuery]);

  // 새 파티 생성 모달 열기
  const handleOpenNew = () => {
    const defaultSlotsCount = activeGame === 'ww' ? 3 : 4;
    const roles = ROLE_PRESETS[activeGame] || ['메인 딜러', '서브 딜러', '서포터', '탱커/힐러'];
    const initialMembers: PartyMemberData[] = Array.from({ length: defaultSlotsCount }).map((_, idx) => ({
      id: '',
      name: '',
      role: roles[idx] || '서포터',
      folderName: '',
      substitutes: []
    }));

    setEditingParty({
      id: `party_${Date.now()}`,
      name: '',
      description: '',
      category: (CATEGORY_PRESETS[activeGame] || [])[0] || '범용',
      mainDPS: '',
      tags: [],
      pros: [],
      cons: [],
      members: initialMembers
    });
    setIsEditorOpen(true);
  };

  // 파티 수정 모달 열기
  const handleOpenEdit = (party: PartyData) => {
    setEditingParty(JSON.parse(JSON.stringify(party)));
    setIsEditorOpen(true);
  };

  // 1-Click 파티 복제
  const handleDuplicate = (party: PartyData) => {
    const clone: PartyData = {
      ...JSON.parse(JSON.stringify(party)),
      id: `party_${Date.now()}`,
      name: `${party.name} (사본)`
    };
    setParties([clone, ...parties]);
  };

  // 파티 삭제
  const handleDelete = (id: string) => {
    if (confirm('이 파티 조합을 삭제하시겠습니까?')) {
      setParties(parties.filter(p => p.id !== id));
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
    setParties(updated);
  };

  // 파티 저장 (모달 내)
  const handleSaveParty = () => {
    if (!editingParty || !editingParty.name.trim()) {
      alert('파티 이름을 입력해 주세요.');
      return;
    }
    const exists = parties.some(p => p.id === editingParty.id);
    if (exists) {
      setParties(parties.map(p => p.id === editingParty.id ? editingParty : p));
    } else {
      setParties([editingParty, ...parties]);
    }
    setIsEditorOpen(false);
    setEditingParty(null);
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

  // 캐릭터 선택 적용
  const handleSelectCharacter = (char: any) => {
    if (!editingParty || pickerState.targetSlotIndex === null) return;
    const updated = JSON.parse(JSON.stringify(editingParty)) as PartyData;
    const slotIdx = pickerState.targetSlotIndex;

    if (pickerState.isSubstitute) {
      if (!updated.members[slotIdx].substitutes) {
        updated.members[slotIdx].substitutes = [];
      }
      const newSub = {
        id: char.id,
        name: char.name,
        folderName: char.folderName || char.name,
        role: updated.members[slotIdx].role,
        isTrailblazer: char.name.includes('개척자'),
        isRover: char.name.includes('방랑자')
      };
      if (typeof pickerState.substituteIndex === 'number') {
        updated.members[slotIdx].substitutes![pickerState.substituteIndex] = newSub;
      } else {
        updated.members[slotIdx].substitutes!.push(newSub);
      }
    } else {
      updated.members[slotIdx] = {
        ...updated.members[slotIdx],
        id: char.id,
        name: char.name,
        folderName: char.folderName || char.name,
        attribute: char.attribute,
        isTrailblazer: char.name.includes('개척자'),
        isRover: char.name.includes('방랑자')
      };
      // 첫 번째 슬롯인 경우 자동으로 mainDPS 설정
      if (slotIdx === 0 && !updated.mainDPS) {
        updated.mainDPS = char.name;
      }
    }

    setEditingParty(updated);
    setPickerState({ isOpen: false, targetSlotIndex: null, isSubstitute: false });
  };

  // 코드 내보내기 (TypeScript 형식 복사)
  const handleExportCode = async () => {
    let varName = 'HSR_PARTIES';
    if (activeGame === 'ww') varName = 'WW_PARTY_COMBINATIONS';
    if (activeGame === 'nte') varName = 'NTE_PARTY_COMBINATIONS';

    const code = `export const ${varName}: PartyCombination[] = ${JSON.stringify(parties, null, 2)};`;
    try {
      await navigator.clipboard.writeText(code);
      alert(`[${activeGame.toUpperCase()}] 파티 데이터(${parties.length}개)가 TypeScript 코드로 클립보드에 복사되었습니다!\n파일에 직접 붙여넣거나 저에게 전달해 주시면 됩니다.`);
    } catch (err: any) {
      alert('클립보드 복사 실패: ' + err.message);
    }
  };

  // Supabase 동기화 저장
  const handleSyncToSupabase = async () => {
    if (!supabase) {
      alert('Supabase 클라이언트가 초기화되지 않았습니다.');
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
        category: p.category,
        main_dps: p.mainDPS,
        tags: p.tags,
        pros: p.pros,
        cons: p.cons,
        members: p.members,
        display_order: idx + 1
      }));

      const { error } = await supabase.from('party_recommendations').insert(payload);
      if (error) {
        throw error;
      }
      alert(`[${activeGame.toUpperCase()}] ${parties.length}개의 파티 데이터가 Supabase 클라우드에 성공적으로 동기화되었습니다!`);
    } catch (err: any) {
      alert('Supabase 동기화 알림: ' + err.message + '\n(테이블이 없는 경우 [코드 내보내기]를 이용해 즉시 반영하실 수 있습니다.)');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 상단 컨트롤 바 */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#111] p-8 rounded-[36px] border border-white/5 shadow-2xl">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
              <Users size={22} />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                {activeGame === 'hsr' ? '붕괴: 스타레일' : activeGame === 'ww' ? '명조' : 'NTE'} 파티 추천 빌더
              </h2>
              <p className="text-xs text-gray-400 font-bold">
                총 <span className="text-amber-500">{parties.length}</span>개의 파티 조합 구성됨
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
                loadLocalParties();
              }
            }}
            className="p-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white rounded-2xl transition-all"
            title="기본 데이터 다시 불러오기"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* 카테고리 탭 & 검색바 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['전체', ...(CATEGORY_PRESETS[activeGame] || [])].map(cat => (
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
        {filteredParties.map((party, pIdx) => (
          <div
            key={party.id || pIdx}
            className="group bg-[#111] border border-white/5 hover:border-amber-500/30 rounded-[32px] p-6 lg:p-8 transition-all duration-300 shadow-xl space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-500 text-[10px] font-black uppercase tracking-wider">
                    {party.category || '범용'}
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
                  onClick={() => handleDuplicate(party)}
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

            {/* 슬롯별 캐릭터 아바타 카드 열 */}
            <div className={`grid grid-cols-2 ${party.members.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
              {party.members.map((member, mIdx) => (
                <div
                  key={mIdx}
                  className="bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center text-center space-y-3 relative group/slot hover:border-amber-500/20 transition-all"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                    {member.name ? (
                      <img
                        src={getEncodedUrl(member.folderName || member.name)}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const p = e.currentTarget.parentElement;
                          if (p) p.innerHTML = `<span class="text-xs font-black text-amber-500/80">${member.name.slice(0, 2)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-gray-500 font-bold">비어있음</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white truncate max-w-[120px]">{member.name || '미선택'}</p>
                    <p className="text-[10px] text-amber-500/80 font-bold uppercase tracking-wider">{member.role}</p>
                  </div>

                  {/* 대체 캐릭터 뱃지들 */}
                  {member.substitutes && member.substitutes.length > 0 && (
                    <div className="w-full pt-2 border-t border-white/5 flex flex-wrap items-center justify-center gap-1.5">
                      <span className="text-[8px] text-gray-500 font-bold uppercase w-full">대체:</span>
                      {member.substitutes.map((sub, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[9px] text-gray-300 font-medium truncate max-w-[90px]"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

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
                    {activeGame.toUpperCase()} Party Configuration
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
                  value={editingParty.category || ''}
                  onChange={(e) => setEditingParty({ ...editingParty, category: e.target.value })}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                >
                  {(CATEGORY_PRESETS[activeGame] || []).map(cat => (
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

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">메인 딜러 (Main DPS)</label>
                <input
                  type="text"
                  value={editingParty.mainDPS || ''}
                  onChange={(e) => setEditingParty({ ...editingParty, mainDPS: e.target.value })}
                  placeholder="예: 어벤츄린•웨이브"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white focus:border-amber-500/50 outline-none"
                />
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

            {/* 시각적 슬롯 캐릭터 빌더 */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <Users size={16} className="text-amber-500" /> 파티 슬롯 멤버 구성 ({editingParty.members.length}인)
                </h4>
                <div className="flex items-center gap-2">
                  {editingParty.members.length < 4 && (
                    <button
                      onClick={() => {
                        const roles = ROLE_PRESETS[activeGame] || ['서포터'];
                        setEditingParty({
                          ...editingParty,
                          members: [...editingParty.members, { id: '', name: '', role: roles[0], folderName: '', substitutes: [] }]
                        });
                      }}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-amber-500 rounded-lg text-xs font-bold transition-all"
                    >
                      + 슬롯 추가
                    </button>
                  )}
                </div>
              </div>

              <div className={`grid grid-cols-1 ${editingParty.members.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'} gap-4`}>
                {editingParty.members.map((slot, sIdx) => (
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
                        {editingParty.members.length > 3 && (
                          <button
                            onClick={() => {
                              const updated = [...editingParty.members];
                              updated.splice(sIdx, 1);
                              setEditingParty({ ...editingParty, members: updated });
                            }}
                            className="text-gray-500 hover:text-rose-400 p-1"
                            title="슬롯 제거"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>

                      {/* 캐릭터 아바타 & 선택 버튼 */}
                      <button
                        onClick={() => openCharacterPicker(sIdx, false)}
                        className="w-full flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/40 rounded-2xl transition-all"
                      >
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex items-center justify-center relative shadow-inner">
                          {slot.name ? (
                            <img
                              src={getEncodedUrl(slot.folderName || slot.name)}
                              alt={slot.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Plus size={24} className="text-gray-500" />
                          )}
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-white truncate max-w-[120px]">
                            {slot.name || '캐릭터 선택'}
                          </p>
                          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider block mt-0.5">
                            클릭하여 변경
                          </span>
                        </div>
                      </button>

                      {/* 슬롯 역할 드롭다운 */}
                      <div className="pt-2">
                        <select
                          value={slot.role}
                          onChange={(e) => {
                            const updated = [...editingParty.members];
                            updated[sIdx].role = e.target.value;
                            setEditingParty({ ...editingParty, members: updated });
                          }}
                          className="w-full bg-[#181818] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-center font-bold text-gray-300 focus:border-amber-500/50 outline-none"
                        >
                          {(ROLE_PRESETS[activeGame] || []).map(r => (
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
                            <span className="text-gray-300 font-medium truncate max-w-[90px]">{sub.name}</span>
                            <button
                              onClick={() => {
                                const updated = [...editingParty.members];
                                updated[sIdx].substitutes!.splice(subIdx, 1);
                                setEditingParty({ ...editingParty, members: updated });
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
      {/* 🎯 고속 캐릭터 선택 모달 (Character Picker Modal) */}
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

            {/* 실시간 검색 및 필터 */}
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

              {/* 희귀도 필터 버튼 */}
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

            {/* 캐릭터 그리드 */}
            <div className="flex-1 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 p-1 custom-scrollbar">
              {availableCharacters
                .filter(c => {
                  const matchesSearch = c.name.toLowerCase().includes(pickerSearch.toLowerCase().trim());
                  const matchesRarity = pickerRarity === 'all' || c.rarity === pickerRarity;
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
