import React, { useState, useEffect, useMemo } from 'react';
import { Shield, Users, FileText, Settings, Activity, Database, AlertTriangle, TrendingUp, Trophy, Search, LogOut, Sparkles, Trash2, Edit3, Save, ChevronRight, ExternalLink, LayoutGrid, ListChecks, PlusCircle, RefreshCw, Copy, Bell } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isAdmin } from '../lib/admin';
import { Navigate } from 'react-router-dom';
import { safeEncodeURIComponent } from '../utils/assetManager';
import HSR_CHARACTERS from '../../hsr-hub/data/characters.json';
import { HSR_TIER_DATA } from '../../hsr-hub/data/tiers';
import SEO from '../components/SEO';
import { getGameData } from '../data/dataManager';

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'characters' | 'tiers' | 'notices'>('home');
  const [activeGame, setActiveGame] = useState<'hsr' | 'ww' | 'nte' | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>('chaos');
  
  // 데이터 상태
  const [mgmtSearch, setMgmtSearch] = useState('');
  const [mgmtTiers, setMgmtTiers] = useState<any[]>([]);
  const [baseCharacters, setBaseCharacters] = useState<any[]>([]);
  const [mgmtNotices, setMgmtNotices] = useState<any[]>([]);
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);
  
  // 신규 공지사항 양식
  const [newNotice, setNewNotice] = useState({
    title: '',
    category: 'Notice',
    game_id: 'common',
    content: '',
    version: '',
    is_critical: false
  });

  // 컨텐츠 카테고리 동적 구성
  const getCategories = () => {
    if (activeGame === 'ww') {
      return [
        { id: 'tower', name: '역경의 탑' },
        { id: 'illusive', name: '죽음의 노래와 바닷속 폐허' },
        { id: 'hologram', name: '종말 매트릭스' }
      ];
    }
    if (activeGame === 'nte') {
      return [
        { id: 'endgame1', name: '엔드 컨텐츠 1' },
        { id: 'endgame2', name: '엔드 컨텐츠 2' }
      ];
    }
    return [
      { id: 'chaos', name: '혼돈' },
      { id: 'fiction', name: '허구' },
      { id: 'shadow', name: '종말' },
      { id: 'divergent', name: '이상' }
    ];
  };

  const CATEGORIES = getCategories();

  // 게임 변경 시 카테고리 초기화
  useEffect(() => {
    if (activeGame) {
      setActiveCategoryId(getCategories()[0].id);
    }
  }, [activeGame]);

  // 신규 캐릭터 양식
  const [newChar, setNewChar] = useState({
    name: '',
    folder_name: '',
    rarity: 5,
    attribute: '물리',
    path: '파멸',
    version: '3.1'
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user && isAdmin(user.id) && activeGame) {
      fetchBaseData();
      fetchTierData();
      fetchMgmtNotices();
    }
  }, [user, activeGame]);

  // autoSyncOnLoad removed as per unified dashboard strategy

  const normalizeName = (n: string) => n ? n.normalize('NFC').replace(/[\s•·().\-_*]/g, '').toLowerCase().trim() : '';

  // O(1) 조회를 위한 티어 맵 생성
  const tierMap = useMemo(() => {
    const map = new Map<string, any>();
    mgmtTiers.forEach(t => {
      const key = `${normalizeName(t.character_name)}_${t.category_id}`;
      map.set(key, t);
    });
    return map;
  }, [mgmtTiers]);

  const fetchBaseData = async () => {
    const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('name')
      .range(0, 2000);
    if (error) {
      console.error('Fetch error:', error);
      setBaseCharacters([]);
      return;
    }
    if (data) setBaseCharacters(data);
  };

  const fetchTierData = async () => {
    const { data } = await supabase
      .from('tier_lists')
      .select('*')
      .eq('game_id', activeGame)
      .range(0, 4000);
    if (data) setMgmtTiers(data);
  };

  const fetchMgmtNotices = async () => {
    const { data } = await supabase
      .from('notices')
      .select('*')
      .in('game_id', [activeGame, 'common'])
      .order('created_at', { ascending: false });
    if (data) setMgmtNotices(data);
  };

  const addNoticeToDB = async () => {
    if (!newNotice.title || !newNotice.content) {
      alert('제목과 내용은 필수입니다.');
      return;
    }

    const id = `notice-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    
    const { error } = await supabase.from('notices').insert([{
      id,
      title: newNotice.title,
      category: newNotice.category,
      game_id: newNotice.game_id,
      content: newNotice.content,
      version: newNotice.version || null,
      is_critical: newNotice.is_critical
    }]);

    if (error) {
      alert('공지사항 생성 실패: ' + error.message);
      return;
    }

    alert('공지사항이 등록되었습니다!');
    setNewNotice({ title: '', category: 'Notice', game_id: 'common', content: '', version: '', is_critical: false });
    fetchMgmtNotices();
  };

  const deleteNotice = async (id: string, title: string) => {
    if (!window.confirm(`'${title}' 공지사항을 삭제하시겠습니까?`)) return;
    await supabase.from('notices').delete().eq('id', id);
    fetchMgmtNotices();
  };

  const addCharacterToDB = async () => {
    if (!newChar.name || !newChar.folder_name) {
      alert('이름과 폴더명은 필수입니다.');
      return;
    }

    const charId = newChar.name.toLowerCase().replace(/\s+/g, '_');
    const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;
    
    const payload: any = {
      id: charId,
      name: newChar.name,
      folder_name: newChar.folder_name,
      rarity: newChar.rarity,
      attribute: newChar.attribute,
      version: newChar.version
    };
    
    if (activeGame === 'ww') {
      payload.weapon_type = newChar.path;
    } else {
      payload.path = newChar.path;
    }

    const { error: charError } = await supabase.from(tableName).insert([payload]);

    if (charError) {
      alert('캐릭터 생성 실패: ' + charError.message);
      return;
    }

    const tierEntries = CATEGORIES.map(cat => ({
      game_id: activeGame,
      category_id: cat.id,
      character_name: newChar.name,
      tier: '?',
      role: '메인 딜러',
      change: 'stay',
      display_order: 100
    }));

    await supabase.from('tier_lists').insert(tierEntries);

    alert('캐릭터 및 티어 정보 등록 완료!');
    setNewChar({ name: '', folder_name: '', rarity: 5, attribute: '물리', path: '파멸', version: '3.1' });
    fetchBaseData();
    fetchTierData();
  };

  const updateTierInfo = async (name: string, categoryId: string, updates: any) => {
    const targetNameNorm = normalizeName(name);
    const existing = mgmtTiers.find(t => normalizeName(t.character_name) === targetNameNorm && t.category_id === categoryId);
    
    if (existing) {
      await supabase.from('tier_lists').update(updates).match({ game_id: activeGame, category_id: categoryId, character_name: existing.character_name });
    } else {
      await supabase.from('tier_lists').insert([{ game_id: activeGame, category_id: categoryId, character_name: name, tier: '?', role: '메인 딜러', change: 'stay', display_order: 100, ...updates }]);
    }
    fetchTierData();
  };

  const deleteCharacter = async (id: string, name: string) => {
    if (!window.confirm(`'${name}' 캐릭터를 삭제하시겠습니까?`)) return;
    await supabase.from('tier_lists').delete().eq('character_name', name).eq('game_id', activeGame);
    const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;
    await supabase.from(tableName).delete().eq('id', id);
    fetchBaseData();
    fetchTierData();
  };

  const syncCharactersFromLocal = async () => {
    if (!window.confirm(`로컬 파일의 ${activeGame.toUpperCase()} 캐릭터 데이터를 DB로 전송하시겠습니까?`)) return;
    
    setLoading(true);
    try {
      let charTasks: any[] = [];
      const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;

      if (activeGame === 'hsr') {
        charTasks = HSR_CHARACTERS.map(c => ({
          id: c.id,
          name: c.name,
          folder_name: (c as any).folderName || c.name,
          rarity: c.rarity,
          attribute: c.attribute,
          path: c.path,
          version: c.version || '3.1'
        }));
      } else if (activeGame === 'ww') {
        const { CHARACTER_DB } = getGameData('ww');
        charTasks = CHARACTER_DB.map((c: any) => ({
          id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
          name: c.name,
          folder_name: c.folderName || c.name,
          rarity: c.rarity || 5,
          attribute: c.attribute || '회절',
          weapon_type: c.weaponType || '직검',
          version: c.releaseVersion || '1.0'
        }));
      } else {
        throw new Error('NTE local data sync is not implemented yet.');
      }

      const { error } = await supabase
        .from(tableName)
        .upsert(charTasks, { onConflict: 'id' });

      if (error) throw error;
      alert(`성공적으로 ${activeGame.toUpperCase()} 캐릭터 도감이 동기화되었습니다!`);
      fetchBaseData();
    } catch (err: any) {
      console.error('Sync Error:', err);
      alert('동기화 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const syncFromLocalData = async () => {
    if (activeGame !== 'hsr') {
      alert(`${activeGame.toUpperCase()} 티어표 로컬 동기화는 현재 지원되지 않으며, 인게임 데이터 또는 대시보드 UI에서 직접 관리해야 합니다.`);
      return;
    }
    
    if (!window.confirm('로컬 파일의 티어 데이터를 DB로 전송하시겠습니까?\n(이미 존재하는 데이터는 덮어씌워지거나 유지됩니다.)')) return;
    
    setLoading(true);
    try {
      const syncTasks: any[] = [];
      
      Object.entries(HSR_TIER_DATA).forEach(([catId, groups]) => {
        groups.forEach(group => {
          group.characters.forEach(char => {
            syncTasks.push({
              game_id: 'hsr',
              category_id: catId,
              character_name: char.name,
              tier: group.tier,
              role: char.role,
              change: char.change || 'stay',
              display_order: (char as any).displayOrder ?? 100
            });
          });
        });
      });

      // 대량 업서트 (Upsert)
      const { error } = await supabase
        .from('tier_lists')
        .upsert(syncTasks, { onConflict: 'game_id,category_id,character_name' });

      if (error) throw error;
      alert('성공적으로 동기화되었습니다!');
      fetchTierData();
    } catch (err: any) {
      console.error('Sync Error:', err);
      alert('동기화 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const syncNoticesFromLocal = async () => {
    alert('더 이상 로컬 파일을 통한 공지사항 동기화 기능을 지원하지 않습니다.');
  };

  const exportSQLToCode = async () => {
    try {
      const { data } = await supabase.from('tier_lists').select('*').eq('game_id', 'hsr');
      if (!data) return;

      const exportData: any = {};
      CATEGORIES.forEach(cat => { exportData[cat.id] = []; });

      const TIER_COLORS: Record<string, string> = {
        'OP': '#FF4D4D', 'SS': '#FF9F43', 'S+': '#1DD1A1', 'S': '#54A0FF',
        'A': '#A8A8A8', 'B': '#5F27CD', 'C': '#8395A7', 'D': '#485460'
      };

      data.forEach(row => {
        if (!exportData[row.category_id]) exportData[row.category_id] = [];
        let group = exportData[row.category_id].find((g: any) => g.tier === row.tier);
        if (!group) {
          group = { tier: row.tier, label: row.tier, color: TIER_COLORS[row.tier] || '#ffffff', characters: [] };
          exportData[row.category_id].push(group);
        }
        group.characters.push({
          id: `char_${row.character_name}`,
          name: row.character_name,
          folderName: baseCharacters.find(c => c.name === row.character_name)?.folder_name || row.character_name,
          role: row.role,
          change: row.change,
          displayOrder: row.display_order
        });
      });

      // 티어 순서 정렬
      const rankOrder = ['OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', '?'];
      Object.keys(exportData).forEach(catId => {
        exportData[catId].sort((a: any, b: any) => rankOrder.indexOf(a.tier) - rankOrder.indexOf(b.tier));
      });

      const codeString = `export const HSR_TIER_DATA: Record<string, TierGroup[]> = ${JSON.stringify(exportData, null, 2)};`;
      await navigator.clipboard.writeText(codeString);
      alert('SQL 데이터가 티어표 코드 형식으로 복사되었습니다!\n이 내용을 채팅창에 붙여넣어 저에게 전달해 주세요.');
    } catch (err: any) {
      alert('내보내기 실패: ' + err.message);
    }
  };

  const getEncodedUrl = (folder: string) => {
    if (!folder) return '';
    if (activeGame === 'ww') {
      return `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/skills/${safeEncodeURIComponent(folder.trim())}/${safeEncodeURIComponent(folder.trim())}.webp`;
    }
    return `https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/${activeGame}%20images/캐릭터/${safeEncodeURIComponent(folder.trim())}/art01.webp`;
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Activity className="animate-spin text-amber-500" size={48} /></div>;
  if (!isAdmin(user?.id)) return <Navigate to="/" replace />;

  const filteredChars = baseCharacters.filter(bc => bc.name.toLowerCase().includes(mgmtSearch.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#080808] text-white p-6 md:p-12 font-sans selection:bg-amber-500/30">
      <SEO title="관리자 대시보드" noindex={true} />
      <div className="max-w-[1600px] mx-auto space-y-10">
        {/* 헤더 섹션 */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#111] p-10 rounded-[48px] border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <Shield size={280} />
          </div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3 text-amber-500">
              <div className="p-2 bg-amber-500/10 rounded-lg"><Shield size={24} /></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">RIRA Advanced Admin</span>
            </div>
            <h1 className="text-5xl font-black italic tracking-tighter uppercase leading-none">Management Dashboard</h1>
            <p className="text-gray-500 font-bold flex items-center gap-2 mt-4">
              <Activity size={14} className="text-emerald-500" />
              시스템 관리자: <span className="text-amber-500/80">{user?.email}</span>
            </p>
            {activeGame && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-xs font-black tracking-widest mt-2 uppercase">
                현재 관리 중인 게임: {activeGame === 'hsr' ? '스타레일' : activeGame === 'ww' ? '명조' : 'NTE'}
              </div>
            )}
          </div>
          
          {/* 탭 네비게이션 */}
          <nav className="relative z-10 flex flex-wrap bg-black/40 p-2 rounded-3xl border border-white/5 backdrop-blur-xl">
            <button 
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === 'home' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutGrid size={18} /> 게임 선택
            </button>
            {activeGame && (
              <>
                <button 
                  onClick={() => setActiveTab('characters')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === 'characters' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                >
                  <Users size={18} /> 캐릭터 관리
                </button>
                <button 
                  onClick={() => setActiveTab('tiers')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === 'tiers' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                >
                  <Trophy size={18} /> 티어표 관리
                </button>
                <button 
                  onClick={() => setActiveTab('notices')}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-black transition-all ${activeTab === 'notices' ? 'bg-amber-500 text-black shadow-xl shadow-amber-500/20' : 'text-gray-500 hover:text-white'}`}
                >
                  <Bell size={18} /> 공지사항 관리
                </button>
              </>
            )}
          </nav>

          <button onClick={() => supabase.auth.signOut()} className="relative z-10 px-6 py-4 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-2xl text-rose-500 transition-all flex items-center gap-3 font-black text-xs uppercase tracking-widest active:scale-95">
            <LogOut size={18} /> Logout
          </button>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {activeTab === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              <button 
                onClick={() => { setActiveGame('hsr'); setActiveTab('characters'); }}
                className="group flex flex-col items-center justify-center gap-6 bg-[#111] border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 p-12 rounded-[40px] transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Database size={48} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Honkai: Star Rail</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">붕괴: 스타레일 관리</p>
                </div>
              </button>
              
              <button 
                onClick={() => { setActiveGame('ww'); setActiveTab('characters'); }}
                className="group flex flex-col items-center justify-center gap-6 bg-[#111] border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 p-12 rounded-[40px] transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <LayoutGrid size={48} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Wuthering Waves</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">명조 관리</p>
                </div>
              </button>

              <button 
                onClick={() => { setActiveGame('nte'); setActiveTab('characters'); }}
                className="group flex flex-col items-center justify-center gap-6 bg-[#111] border border-white/5 hover:border-amber-500/50 hover:bg-amber-500/5 p-12 rounded-[40px] transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Sparkles size={48} />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase text-white mb-2">Neverness to Everness</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">NTE 관리</p>
                </div>
              </button>
            </div>
          )}

          {activeTab !== 'home' && (
            <>
              {/* 공통 검색바 */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-[#111] p-6 rounded-[32px] border border-white/5 shadow-xl">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
              <input 
                type="text"
                placeholder="관리 대상 캐릭터 검색..."
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-amber-500/30 transition-all"
                value={mgmtSearch}
                onChange={(e) => setMgmtSearch(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-6 shrink-0">
              <div className="px-5 py-3 bg-white/[0.02] border border-white/5 rounded-2xl text-[11px] font-black text-gray-500 uppercase tracking-widest">
                Matches: <span className="text-amber-500 ml-2">{filteredChars.length}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-tighter">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Database Live
              </div>
            </div>
          </div>

          {activeTab === 'characters' && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* 캐릭터 목록 탭 */}
              <div className="xl:col-span-3 bg-[#111] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.02] text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        <th className="p-8">캐릭터 프로필</th>
                        <th className="p-8 text-center">속성</th>
                        <th className="p-8 text-center">{activeGame === 'ww' ? '무기' : '운명의 길'}</th>
                        <th className="p-8 text-center">버전</th>
                        <th className="p-8 text-right">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredChars.map(bc => (
                        <tr key={bc.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-8">
                            <div className="flex items-center gap-6">
                              <div className="relative w-16 h-16 shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <img 
                                  src={getEncodedUrl(bc.folder_name)} 
                                  className="w-full h-full rounded-2xl object-cover border border-white/10 bg-black"
                                  onError={(e) => {
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      e.currentTarget.style.display = 'none';
                                      parent.innerHTML = '<div class="w-full h-full bg-white/5 rounded-2xl flex items-center justify-center text-[8px] text-gray-700 font-black uppercase text-center p-2">No Img</div>';
                                    }
                                  }}
                                />
                                <a href={getEncodedUrl(bc.folder_name)} target="_blank" rel="noreferrer" className="absolute -top-1 -right-1 p-1 bg-black rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500"><ExternalLink size={10} /></a>
                              </div>
                              <div className="space-y-1">
                                <p className="text-lg font-black">{bc.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[9px] font-black text-amber-500/40 uppercase">Folder:</span>
                                  <input 
                                    className="text-[10px] font-bold text-gray-600 bg-transparent border-none p-0 focus:ring-0 w-48"
                                    value={bc.folder_name}
                                    onChange={async (e) => {
                                      await supabase.from('characters').update({ folder_name: e.target.value }).eq('id', bc.id);
                                      fetchBaseData();
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-8 text-center font-bold text-gray-400">{bc.attribute}</td>
                          <td className="p-8 text-center font-bold text-gray-400">{bc.path || bc.weapon_type}</td>
                          <td className="p-8 text-center">
                            <input 
                              className="w-16 text-center font-bold text-amber-500/60 tracking-widest bg-transparent border-b border-transparent hover:border-amber-500/30 focus:border-amber-500 focus:outline-none transition-all p-1"
                              value={bc.version}
                              onChange={async (e) => {
                                await supabase.from('characters').update({ version: e.target.value }).eq('id', bc.id);
                                fetchBaseData();
                              }}
                            />
                          </td>
                          <td className="p-8 text-right">
                            <button onClick={() => deleteCharacter(bc.id, bc.name)} className="p-4 bg-rose-500/10 hover:bg-rose-500/20 rounded-2xl text-rose-500/40 hover:text-rose-500 transition-all active:scale-90 border border-transparent hover:border-rose-500/20"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* 캐릭터 추가 사이드바 */}
              <div className="space-y-8">
                <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-[40px] p-10 space-y-8 sticky top-12 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500"><PlusCircle size={28} /></div>
                    <div>
                      <h2 className="text-xl font-black italic uppercase">신규 캐릭터 등록</h2>
                      <p className="text-[10px] text-amber-500/40 font-black uppercase tracking-widest mt-1">Add to master DB</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">이름</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.name} onChange={e => setNewChar({...newChar, name: e.target.value})} placeholder="캐릭터명" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">폴더명 (GitHub)</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.folder_name} onChange={e => setNewChar({...newChar, folder_name: e.target.value})} placeholder="정확한 폴더명" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-1">속성</label>
                        <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" value={newChar.attribute} onChange={e => setNewChar({...newChar, attribute: e.target.value})}>
                          {activeGame === 'ww'
                            ? ['기류', '전도', '회절', '인멸', '용융', '응결'].map(a => <option key={a} value={a} style={{ backgroundColor: '#111' }}>{a}</option>)
                            : ['물리', '화염', '얼음', '번개', '바람', '양자', '허수'].map(a => <option key={a} value={a} style={{ backgroundColor: '#111' }}>{a}</option>)
                          }
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-1">{activeGame === 'ww' ? '무기' : '운명'}</label>
                        <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" value={newChar.path} onChange={e => setNewChar({...newChar, path: e.target.value})}>
                          {activeGame === 'ww'
                            ? ['장검', '대검', '직검', '권갑', '증폭기', '권총'].map(p => <option key={p} value={p} style={{ backgroundColor: '#111' }}>{p}</option>)
                            : ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'].map(p => <option key={p} value={p} style={{ backgroundColor: '#111' }}>{p}</option>)
                          }
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">버전 (Version)</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.version} onChange={e => setNewChar({...newChar, version: e.target.value})} placeholder="예: 4.3" />
                    </div>
                    <button onClick={addCharacterToDB} className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3">
                      <Save size={18} /> DB에 저장하기
                    </button>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-1">TS 데이터 템플릿</label>
                        <button 
                          onClick={() => {
                            const id = newChar.name.toLowerCase().replace(/\s+/g, '_');
                            const template = `import { Character } from '../../../../common-hub/types';

const ${id}: Character = {
  id: "${id}",
  name: "${newChar.name}",
  folderName: "${newChar.folder_name}",
  gameId: "hsr",
  attribute: "${newChar.attribute}",
  path: "${newChar.path}",
  rarity: 5,
  affiliation: "Unknown",
  briefInfo: "프로필 정보를 입력하세요.",
  version: "2.0",
  releaseVersion: "2.0",
  languageNames: "🇰🇷 ${newChar.name} / 🇺🇸 Name / 🇨🇳 Name / 🇯🇵 Name",
  voiceActors: "🇰🇷 성우 / 🇺🇸 VA / 🇨🇳 VA / 🇯🇵 VA",
  metadata: {
    name: "${newChar.name}",
    language: "🇰🇷 ${newChar.name} / 🇺🇸 Name / 🇨🇳 Name / 🇯🇵 Name",
    element: "${newChar.attribute}",
    path: "${newChar.path}",
    rarity: 5,
    affiliation: "Unknown",
    cv: "🇰🇷 성우 / 🇺🇸 VA / 🇨🇳 VA / 🇯🇵 VA",
    releaseVersion: "2.0",
    brief: "프로필 정보를 입력하세요."
  },
  baseStats: {
    lv1: { "기초 HP": 0, "기초 공격력": 0, "기초 방어력": 0 },
    lv80: { "기초 HP": 0, "기초 공격력": 0, "기초 방어력": 0 },
    speed: 100,
    taunt: 100,
    energy: 100
  },
  materials_v2: { ascension: [], traces: [] },
  skills: [
    { name: "일반 공격", tag: "일반 공격", energyRegen: "20", toughnessDMG: "10", spRecovery: "+1", description: "설명", icon: "basic_atk_1" },
    { name: "전투 스킬", tag: "전투 스킬", energyRegen: "30", toughnessDMG: "20", spRecovery: "-1", description: "설명", icon: "skill_1" },
    { name: "필살기", tag: "필살기", energyRegen: "5", toughnessDMG: "30", description: "설명", icon: "ultimate_1" }
  ],
  eidolons: [
    { rank: "E01", name: "1성좌", description: "설명", icon: "eidolon_1" }
  ]
};

export default ${id};`;
                            navigator.clipboard.writeText(template);
                            alert('코드 템플릿이 복사되었습니다!');
                          }}
                          className="text-[9px] font-black text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                        >
                          <Copy size={10} /> 코드 복사하기
                        </button>
                      </div>
                      <div className="bg-black/60 rounded-2xl p-4 border border-white/5 h-48 overflow-y-auto custom-scrollbar">
                        <pre className="text-[9px] text-gray-500 font-mono leading-relaxed">
                          {`import { Character } from '../../../../common-hub/types';

const ${newChar.name.toLowerCase().replace(/\s+/g, '_') || 'char'}: Character = {
  id: "${newChar.name.toLowerCase().replace(/\s+/g, '_') || 'char'}",
  name: "${newChar.name}",
  folderName: "${newChar.folder_name}",
  attribute: "${newChar.attribute}",
  path: "${newChar.path}",
  rarity: 5,
  // ... 나머지 데이터`}
                        </pre>
                      </div>
                      <p className="text-[9px] text-gray-600 leading-tight">
                        * 복사한 코드를 hsr-hub/data/characters/hsr/ 폴더에 .ts 파일로 저장하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tiers' && (
            /* 티어표 통합 관리 탭 - 사용자 뷰와 동일한 구조 */
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* 상단 진단 및 동기화 도구 */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <Database className="text-amber-500" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">DB Status</p>
                    <p className="text-sm font-black text-white">로드된 티어 데이터: <span className="text-amber-500">{mgmtTiers.length}개</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button 
                    onClick={syncCharactersFromLocal}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-2xl text-[11px] font-black transition-all active:scale-95 text-emerald-500"
                  >
                    <Users size={14} />
                    도감 데이터 동기화
                  </button>
                  <button 
                    onClick={syncFromLocalData}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[11px] font-black transition-all active:scale-95 text-gray-300"
                  >
                    <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                    티어표 데이터 동기화
                  </button>
                  <button 
                    onClick={exportSQLToCode}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-2xl text-[11px] font-black transition-all active:scale-95 text-amber-500"
                  >
                    <FileText size={14} />
                    SQL 내보내기
                  </button>
                </div>
              </div>

              {/* 카테고리 선택부 */}
              <div className="bg-[#111] p-8 rounded-[40px] border border-white/5 shadow-xl">
                <div className="flex flex-wrap gap-4 justify-center">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setMgmtSearch(''); 
                        setActiveCategoryId(cat.id);
                      }}
                      className={`px-8 py-4 rounded-2xl text-xs font-black transition-all border flex items-center gap-3 ${
                        activeCategoryId === cat.id
                          ? 'bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20'
                          : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 티어별 그룹 렌더링 - '?' (미편성)을 가장 먼저 렌더링 */}
              {['?', 'OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', 'E', 'F'].map(tierRank => {
                const charsInTier = filteredChars.filter(bc => {
                  const key = `${normalizeName(bc.name)}_${activeCategoryId}`;
                  const tInfo = tierMap.get(key);
                  return (tInfo?.tier || '?') === tierRank;
                });

                if (charsInTier.length === 0 && tierRank !== '?') return null;

                return (
                  <div key={tierRank} className="bg-[#111] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                    <div className="w-full lg:w-32 flex flex-col items-center justify-center p-8 shrink-0 bg-white/[0.02] border-b lg:border-b-0 lg:border-r border-white/5">
                      <div className={`text-4xl font-black italic tracking-tighter ${tierRank === '?' ? 'text-gray-600' : 'text-amber-500'}`}>
                        {tierRank === '?' ? '미편성' : tierRank}
                      </div>
                    </div>
                    
                    <div className="flex-1 p-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {charsInTier.map(bc => {
                          const key = `${normalizeName(bc.name)}_${activeCategoryId}`;
                          const tInfo = tierMap.get(key);
                          
                          return (
                            <div key={bc.id} className="bg-black/40 rounded-3xl border border-white/5 p-4 space-y-4 hover:border-amber-500/30 transition-all group">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                  <img src={getEncodedUrl(bc.folder_name)} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-black truncate">{bc.name}</p>
                                  <p className="text-[9px] text-gray-600 font-bold uppercase">{bc.path || bc.weapon_type}</p>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <select 
                                  value={tInfo?.tier || '?'}
                                  onChange={(e) => updateTierInfo(bc.name, activeCategoryId, { tier: e.target.value })}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl text-[11px] font-black p-2 text-center focus:border-amber-500/50 outline-none appearance-none cursor-pointer"
                                >
                                  {['OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', 'E', 'F', '?'].map(t => <option key={t} value={t} style={{ backgroundColor: '#111' }}>{t}</option>)}
                                </select>

                                <div className="flex items-center gap-2">
                                  <select 
                                    value={tInfo?.change || 'stay'}
                                    onChange={(e) => updateTierInfo(bc.name, activeCategoryId, { change: e.target.value })}
                                    className={`flex-1 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black p-2 text-center outline-none appearance-none cursor-pointer uppercase ${tInfo?.change === 'up' ? 'text-emerald-500' : tInfo?.change === 'down' ? 'text-rose-500' : tInfo?.change === 'new' ? 'text-amber-500' : 'text-gray-500'}`}
                                  >
                                    {['stay', 'up', 'down', 'new'].map(c => <option key={c} value={c}>{c}</option>)}
                                  </select>
                                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                    <button 
                                      onClick={() => updateTierInfo(bc.name, activeCategoryId, { display_order: (tInfo?.display_order ?? 100) - 1 })}
                                      className="px-2 py-2 hover:bg-white/5 text-gray-500 transition-colors"
                                    >
                                      -
                                    </button>
                                    <input 
                                      type="number"
                                      className="w-10 bg-transparent border-none p-1 text-[10px] font-black text-center focus:ring-0 text-amber-500/80 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                      value={tInfo?.display_order ?? 100}
                                      onChange={(e) => updateTierInfo(bc.name, activeCategoryId, { display_order: parseInt(e.target.value) || 0 })}
                                    />
                                    <button 
                                      onClick={() => updateTierInfo(bc.name, activeCategoryId, { display_order: (tInfo?.display_order ?? 100) + 1 })}
                                      className="px-2 py-2 hover:bg-white/5 text-gray-500 transition-colors"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
              {/* 공지사항 추가 폼 (작성 부분을 위/왼쪽으로) */}
              <div className="space-y-8">
                <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-[40px] p-10 space-y-8 sticky top-12 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500"><PlusCircle size={28} /></div>
                    <div>
                      <h2 className="text-xl font-black italic uppercase">공지사항 작성</h2>
                      <p className="text-[10px] text-amber-500/40 font-black uppercase tracking-widest mt-1">Publish Notice</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">게임</label>
                      <select 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" 
                        value={newNotice.game_id} 
                        onChange={e => setNewNotice({...newNotice, game_id: e.target.value})}
                      >
                        <option value="common" style={{ backgroundColor: '#111' }}>공통 (전체)</option>
                        <option value="hsr" style={{ backgroundColor: '#111' }}>스타레일</option>
                        <option value="ww" style={{ backgroundColor: '#111' }}>명조</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">분류</label>
                      <select 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" 
                        value={newNotice.category} 
                        onChange={e => setNewNotice({...newNotice, category: e.target.value})}
                      >
                        <option value="Notice" style={{ backgroundColor: '#111' }}>일반 공지 (Notice)</option>
                        <option value="Update" style={{ backgroundColor: '#111' }}>업데이트 (Update)</option>
                        <option value="Event" style={{ backgroundColor: '#111' }}>이벤트 (Event)</option>
                        <option value="System" style={{ backgroundColor: '#111' }}>시스템 (System)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">제목</label>
                      <input 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" 
                        value={newNotice.title} 
                        onChange={e => setNewNotice({...newNotice, title: e.target.value})} 
                        placeholder="공지 제목" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase ml-1">내용 (Markdown 지원)</label>
                      <textarea 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all h-40 resize-none custom-scrollbar" 
                        value={newNotice.content} 
                        onChange={e => setNewNotice({...newNotice, content: e.target.value})} 
                        placeholder="마크다운 형식으로 내용을 입력하세요." 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase ml-1">버전 (선택)</label>
                        <input 
                          className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" 
                          value={newNotice.version} 
                          onChange={e => setNewNotice({...newNotice, version: e.target.value})} 
                          placeholder="ex) 1.0" 
                        />
                      </div>
                      <div className="space-y-2 flex flex-col justify-end">
                        <label className="flex items-center gap-3 bg-black/40 border border-white/5 rounded-2xl p-4 cursor-pointer hover:border-amber-500/30 transition-all h-[52px]">
                          <input 
                            type="checkbox" 
                            className="accent-amber-500 w-4 h-4"
                            checked={newNotice.is_critical}
                            onChange={e => setNewNotice({...newNotice, is_critical: e.target.checked})}
                          />
                          <span className="text-xs font-bold text-gray-300">필독 공지 설정</span>
                        </label>
                      </div>
                    </div>
                    
                    <button onClick={addNoticeToDB} className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3">
                      <Save size={18} /> 바로 등록하기
                    </button>
                  </div>
                </div>
              </div>

              {/* 공지사항 목록 (관리를 아래/오른쪽으로) */}
              <div className="xl:col-span-3 space-y-8">
                <div className="bg-[#111] rounded-[40px] border border-white/5 overflow-hidden shadow-2xl p-8">
                  <h2 className="text-xl font-black italic uppercase mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Bell className="text-amber-500" size={24} /> 등록된 공지사항 관리
                    </div>
                    <button 
                      onClick={syncNoticesFromLocal}
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black transition-all active:scale-95 text-gray-400"
                    >
                      <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                      로컬 공지 동기화
                    </button>
                  </h2>
                  <div className="space-y-4">
                    {mgmtNotices.map((notice) => (
                      <div 
                        key={notice.id} 
                        className={`bg-black/40 border rounded-3xl p-6 space-y-4 transition-all group cursor-pointer ${expandedNoticeId === notice.id ? 'border-amber-500/50 ring-1 ring-amber-500/20' : 'border-white/5 hover:border-amber-500/30'}`}
                        onClick={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-wider">
                                {notice.game_id}
                              </span>
                              <span className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full text-[10px] font-black uppercase">
                                {notice.category}
                              </span>
                              {notice.is_critical && (
                                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                                  <AlertTriangle size={10} /> 필독
                                </span>
                              )}
                              {notice.version && (
                                <span className="text-[10px] font-black text-gray-500 border border-white/10 px-2 py-1 rounded-full">v{notice.version}</span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold">{notice.title}</h3>
                            <p className="text-xs text-gray-500 font-mono">
                              {new Date(notice.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotice(notice.id, notice.title);
                              }}
                              className="p-4 bg-rose-500/10 hover:bg-rose-500/20 rounded-2xl text-rose-500/40 hover:text-rose-500 transition-all active:scale-90 border border-transparent hover:border-rose-500/20 shrink-0"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {expandedNoticeId === notice.id && (
                          <div className="pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300" onClick={e => e.stopPropagation()}>
                            <div className="bg-black/60 rounded-2xl p-6 border border-white/5 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Notice Content</span>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(notice.content);
                                    alert('내용이 클립보드에 복사되었습니다.');
                                  }}
                                  className="text-[9px] font-black text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                                >
                                  <Copy size={10} /> 내용 복사
                                </button>
                              </div>
                              <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
                                {notice.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {mgmtNotices.length === 0 && (
                      <div className="text-center py-12 text-gray-500 text-sm font-bold">등록된 공지사항이 없습니다.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
