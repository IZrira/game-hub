import { normalizeAdminTierRows } from '../../nte-hub/data/adminData';
import { NTE_TIER_CATEGORIES } from '../../nte-hub/data/tiers';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Shield, Users, FileText, Settings, Activity, Database, AlertTriangle, TrendingUp, Trophy, Search, LogOut, Sparkles, Trash2, Edit3, Save, ChevronRight, ExternalLink, LayoutGrid, ListChecks, PlusCircle, RefreshCw, Copy, Bell, Loader2, X, CheckCircle2, RotateCcw, ChevronDown, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { isAdmin } from '../lib/admin';
import { useSearchParams } from 'react-router';
import { safeEncodeURIComponent } from '../utils/assetManager';
import SEO from '../components/SEO';
import { stripMarkdown } from '../utils/markdown';
import { toKstDate } from '../utils/kstDate';

const AdminNoticeEditor = React.lazy(() => import('../components/AdminNoticeEditor'));
const AdminPartyManager = React.lazy(() => import('../components/AdminPartyManager'));
const AdminAniimoManager = React.lazy(() => import('../components/AdminAniimoManager'));
const MarkdownRenderer = React.lazy(() => import('../components/MarkdownRenderer'));

const AdminSectionFallback = () => (
  <div className="flex min-h-48 items-center justify-center gap-3 text-gray-500">
    <Loader2 size={20} className="animate-spin text-brand-primary" />
    <span className="text-xs font-black uppercase tracking-[0.2em]">관리 도구 불러오는 중</span>
  </div>
);

type AdminSection = 'characters' | 'aniimo' | 'tiers' | 'parties' | 'notices';
type AdminGame = 'hsr' | 'ww' | 'nte' | 'aniimo' | null;

const SECTION_LABEL: Record<AdminSection, string> = {
  notices: '공지사항',
  characters: '캐릭터 관리',
  tiers: '티어표 관리',
  parties: '파티 추천 관리',
  aniimo: '애니모 도감 관리',
};
const GAME_LABEL: Record<'hsr' | 'ww' | 'nte', string> = { hsr: '스타레일', ww: '명조', nte: '이환(NTE)' };
const TIER_OPTIONS = ['OP', 'SS', 'S+', 'S', 'A', 'B', 'C', 'D', 'E', 'F', '?'];
const CHANGE_OPTIONS = ['stay', 'up', 'down', 'new'];

interface ToastItem { id: number; message: string; tone: 'success' | 'error' }
interface ConfirmRequest { message: string; onConfirm: () => void; tone?: 'default' | 'danger' }

const SidebarLink: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode; indent?: boolean }> = ({ active, onClick, icon, children, indent }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left ${indent ? 'ml-4' : ''} ${
      active ? 'bg-amber-500/15 text-amber-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span className="truncate">{children}</span>
  </button>
);

const SidebarGameGroup: React.FC<{ label: string; open: boolean; onToggle: () => void; children: React.ReactNode }> = ({ label, open, onToggle, children }) => (
  <div>
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-gray-300 transition-colors"
    >
      <span>{label}</span>
      <ChevronDown size={14} className={`transition-transform ${open ? '' : '-rotate-90'}`} />
    </button>
    {open && <div className="space-y-1 mb-2">{children}</div>}
  </div>
);

const loadManagedCharacterData = async (gameId: 'ww' | 'nte') => {
  if (gameId === 'ww') {
    const { default: characters } = await import('../../ww-hub/data/generated/character-summary.json');
    return characters;
  }

  const { default: characters } = await import('../../nte-hub/data/generated/character-summary.json');
  return characters;
};

const ADMIN_SECTIONS: AdminSection[] = ['characters', 'aniimo', 'tiers', 'parties', 'notices'];
const ADMIN_GAMES = ['hsr', 'ww', 'nte', 'aniimo'];

const AdminDashboard: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<AdminSection>(() => {
    const s = searchParams.get('section');
    return (s && ADMIN_SECTIONS.includes(s as AdminSection) ? s : 'notices') as AdminSection;
  });
  const [activeGame, setActiveGame] = useState<AdminGame>(() => {
    const g = searchParams.get('game');
    return (g && ADMIN_GAMES.includes(g) ? g : null) as AdminGame;
  });
  const [tierSearch, setTierSearch] = useState('');
  const [openGameGroup, setOpenGameGroup] = useState<'hsr' | 'ww' | 'nte' | null>(
    (activeGame === 'hsr' || activeGame === 'ww' || activeGame === 'nte') ? activeGame : 'hsr'
  );

  // 사이드바 이동: 섹션/게임 상태와 주소(URL)를 함께 갱신해 새로고침해도 위치가 유지된다.
  const goTo = (section: AdminSection, game: AdminGame) => {
    setActiveTab(section);
    setActiveGame(game);
    const next = new URLSearchParams();
    next.set('section', section);
    if (game) next.set('game', game);
    setSearchParams(next, { replace: false });
    if (game === 'hsr' || game === 'ww' || game === 'nte') setOpenGameGroup(game);
  };

  // 토스트 알림 (alert() 대체)
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toastIdRef = useRef(0);
  const showToast = (message: string, tone: 'success' | 'error' = 'success') => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), tone === 'error' ? 5000 : 3000);
  };

  // 확인 대화상자 (window.confirm() 대체, 삭제처럼 되돌릴 수 없는 작업만 사용)
  const [confirmRequest, setConfirmRequest] = useState<ConfirmRequest | null>(null);
  const requestConfirm = (message: string, onConfirm: () => void, tone: 'default' | 'danger' = 'default') => {
    setConfirmRequest({ message, onConfirm, tone });
  };

  // 데이터 상태
  const [mgmtSearch, setMgmtSearch] = useState('');
  const [mgmtTiers, setMgmtTiers] = useState<any[]>([]);
  const [baseCharacters, setBaseCharacters] = useState<any[]>([]);
  const [mgmtNotices, setMgmtNotices] = useState<any[]>([]);
  const [expandedNoticeId, setExpandedNoticeId] = useState<string | null>(null);
  const [noticeGameFilter, setNoticeGameFilter] = useState<'all' | 'common' | 'hsr' | 'ww' | 'nte' | 'aniimo'>('all');
  
  // 공지사항 편집 및 저장 상태
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [isSavingNotice, setIsSavingNotice] = useState(false);
  const [initialEditingNotice, setInitialEditingNotice] = useState<any>(null);
  const noticeFormRef = useRef<HTMLDivElement>(null);

  // 공지사항 입력 양식
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
    if (activeGame === 'aniimo') return [];
    if (activeGame === 'ww') {
      return [
        { id: 'tower', name: '역경의 탑' },
        { id: 'illusive', name: '죽음의 노래와 바닷속 폐허' },
        { id: 'hologram', name: '종말 매트릭스' }
      ];
    }
    if (activeGame === 'nte') {
      return NTE_TIER_CATEGORIES.map(({ id, name }) => ({ id, name }));
    }
    return [
      { id: 'chaos', name: '혼돈' },
      { id: 'fiction', name: '허구' },
      { id: 'shadow', name: '종말' },
      { id: 'divergent', name: '이상' }
    ];
  };

  const CATEGORIES = getCategories();

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
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      if (error) console.error('[Admin] 세션 조회 실패:', error);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 토큰 자동 갱신·다른 탭에서의 로그인/로그아웃을 반영한다.
    // getSession()을 새로고침 시 한 번만 확인하면, 그 직후 토큰 갱신이 실패하거나
    // 다른 탭에서 로그아웃했을 때 이 화면은 갱신 전 상태에 멈춰 있어 오히려 혼란을 준다.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user && isAdmin(user.id)) {
      fetchMgmtNotices();
    }
  }, [user]);

  useEffect(() => {
    if (user && isAdmin(user.id) && activeGame && activeGame !== 'aniimo') {
      fetchBaseData();
      fetchTierData();
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

  // 개발 환경 무결성 검증 (character lookup 실패, 중복 ID/캐릭터, 빈 ID 감지)
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || !baseCharacters.length || !mgmtTiers.length) return;
    
    const seenPerCategory = new Map<string, Set<string>>();
    mgmtTiers.forEach(t => {
      if (t.game_id !== activeGame) return;
      if (!t.character_name || t.character_name.trim() === '') {
        console.error(`[Admin Tier Integrity Error] 빈 character_name 발견 (category: "${t.category_id}")`, t);
      }
      
      const catKey = t.category_id;
      if (!seenPerCategory.has(catKey)) seenPerCategory.set(catKey, new Set());
      const set = seenPerCategory.get(catKey)!;
      const norm = normalizeName(t.character_name);
      if (set.has(norm)) {
        console.warn(`[Admin Tier Integrity Warning] 중복 캐릭터 "${t.character_name}" 발견 (category: "${catKey}")`, t);
      }
      set.add(norm);

      const matched = baseCharacters.find(bc => normalizeName(bc.name) === norm);
      if (!matched) {
        console.warn(`[Admin Tier Integrity Warning] 티어 데이터 "${t.character_name}" (category: "${catKey}")에 대응하는 마스터 캐릭터가 없습니다. fallback 캐릭터를 사용하지 않습니다.`, t);
      }
    });
  }, [baseCharacters, mgmtTiers, activeGame]);

  const fetchBaseData = async () => {
    let localChars: any[] = [];
    if (activeGame === 'aniimo') {
      setBaseCharacters([]);
      return;
    }
    if (activeGame === 'hsr') {
      const { default: HSR_CHARACTERS } = await import('../../hsr-hub/data/generated/character-summary.json');
      localChars = HSR_CHARACTERS.map(c => ({
        id: c.id,
        name: c.name,
        folder_name: (c as any).folderName || c.name,
        rarity: c.rarity,
        attribute: c.attribute,
        path: c.path,
        version: c.releaseVersion || '1.0'
      }));
    } else if (activeGame === 'ww') {
      const characters = await loadManagedCharacterData('ww');
      localChars = characters.map((c: any) => ({
        id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
        name: c.name,
        folder_name: c.folderName || c.name,
        rarity: c.rarity || 5,
        attribute: c.attribute || '회절',
        weapon_type: c.weaponType || '직검',
        version: c.releaseVersion || '1.0'
      }));
    } else if (activeGame === 'nte') {
      const characters = await loadManagedCharacterData('nte');
      localChars = characters.map((c: any) => ({
        id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
        name: c.name,
        folder_name: c.folderName || c.name,
        rarity: c.rarity || 5,
        attribute: c.attribute || '이능',
        path: c.arc || '결합',
        version: c.releaseVersion || '1.0'
      }));
    }

    const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order('name')
      .range(0, 2000);

    if (error || !data || data.length === 0) {
      setBaseCharacters(localChars);
      return;
    }

    const mergedMap = new Map<string, any>();
    localChars.forEach(c => {
      if (c.id) mergedMap.set(c.id, c);
    });

    const localNormMap = new Map<string, any>();
    localChars.forEach(c => {
      localNormMap.set(normalizeName(c.name), c);
    });

    data.forEach((c: any) => {
      const matchedLocal = (c.id && mergedMap.get(c.id)) || localNormMap.get(normalizeName(c.name));
      const charId = matchedLocal?.id || c.id || normalizeName(c.name);
      const canonicalFolder = matchedLocal?.folder_name || c.folder_name || c.name;
      const canonicalName = matchedLocal?.name || c.name;

      mergedMap.set(charId, {
        ...matchedLocal,
        ...c,
        id: charId,
        name: canonicalName,
        folder_name: canonicalFolder,
      });
    });

    setBaseCharacters(Array.from(mergedMap.values()));
  };

  const fetchTierData = async () => {
    if (activeGame === 'aniimo') {
      setMgmtTiers([]);
      return;
    }
    const { data } = await supabase
      .from('tier_lists')
      .select('*')
      .eq('game_id', activeGame)
      .range(0, 4000);
    if (data) setMgmtTiers(activeGame === 'nte' ? normalizeAdminTierRows(data) : data);
  };

  const fetchMgmtNotices = async () => {
    // 공지사항은 게임 구분 없이 전체를 관리한다.
    const { data } = await supabase
      .from('notices')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setMgmtNotices(data);
  };

  const isNoticeFormDirty = () => {
    if (editingNoticeId && initialEditingNotice) {
      return (
        newNotice.title !== initialEditingNotice.title ||
        newNotice.category !== initialEditingNotice.category ||
        newNotice.game_id !== initialEditingNotice.game_id ||
        newNotice.content !== initialEditingNotice.content ||
        (newNotice.version || '') !== (initialEditingNotice.version || '') ||
        Boolean(newNotice.is_critical) !== Boolean(initialEditingNotice.is_critical)
      );
    }
    return (
      newNotice.title.trim() !== '' ||
      newNotice.content.trim() !== '' ||
      newNotice.version.trim() !== '' ||
      newNotice.is_critical
    );
  };

  const startEditNotice = (notice: any) => {
    const apply = () => {
      const formData = {
        title: notice.title || '',
        category: notice.category || 'Notice',
        game_id: notice.game_id || 'common',
        content: notice.content || '',
        version: notice.version || '',
        is_critical: Boolean(notice.is_critical)
      };

      setEditingNoticeId(notice.id);
      setInitialEditingNotice(formData);
      setNewNotice(formData);

      // 스크롤 포커싱 (모바일 / 반응형 UX 대응)
      setTimeout(() => {
        noticeFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    };

    if (isNoticeFormDirty()) {
      requestConfirm('작성 중인 수정 사항이 저장되지 않았습니다. 다른 공지사항을 수정하시겠습니까?', apply);
      return;
    }
    apply();
  };

  const cancelEditNotice = () => {
    const apply = () => {
      setEditingNoticeId(null);
      setInitialEditingNotice(null);
      setNewNotice({ title: '', category: 'Notice', game_id: 'common', content: '', version: '', is_critical: false });
    };

    if (isNoticeFormDirty()) {
      requestConfirm('작성 중인 수정 사항이 저장되지 않았습니다. 수정을 취소하시겠습니까?', apply, 'danger');
      return;
    }
    apply();
  };

  const resetAllNoticeUpdatedTimestamps = () => {
    requestConfirm(
      '기존 모든 공지사항의 수정일시를 초기화하시겠습니까? 초기화 후에는 실제로 수정한 공지사항에만 수정일이 표시됩니다.',
      async () => {
        try {
          const { error } = await supabase
            .from('notices')
            .update({ updated_at: null })
            .neq('id', '');
          if (error) throw error;
          showToast('모든 공지사항의 수정일시가 초기화되었습니다. 이제 실제로 수정한 공지에만 수정일이 표시됩니다.');
          fetchMgmtNotices();
        } catch (err: any) {
          console.error('Reset updated_at error:', err);
          showToast('수정일시 초기화 실패: ' + (err?.message || '알 수 없는 오류'), 'error');
        }
      },
      'danger'
    );
  };

  const saveNoticeToDB = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) {
      showToast('제목과 내용은 필수입니다.', 'error');
      return;
    }

    setIsSavingNotice(true);

    try {
      if (editingNoticeId) {
        // 수정 모드: update 실행 (수정한 공지만 updated_at 갱신)
        const updatePayload: Record<string, any> = {
          title: newNotice.title.trim(),
          category: newNotice.category,
          game_id: newNotice.game_id,
          content: newNotice.content,
          version: newNotice.version.trim() || null,
          is_critical: newNotice.is_critical,
          updated_at: new Date().toISOString()
        };

        let { error } = await supabase
          .from('notices')
          .update(updatePayload)
          .eq('id', editingNoticeId);

        // 만약 Supabase에 updated_at 컬럼이 아직 없다면 updated_at 제외하고 재시도
        if (error && error.message && error.message.includes('updated_at')) {
          delete updatePayload.updated_at;
          const retryRes = await supabase
            .from('notices')
            .update(updatePayload)
            .eq('id', editingNoticeId);
          error = retryRes.error;
        }

        if (error) throw error;

        const updatedId = editingNoticeId;
        showToast('공지사항이 성공적으로 수정되었습니다.');
        setEditingNoticeId(null);
        setInitialEditingNotice(null);
        // 게임·분류는 유지하고 제목·본문만 비워, 같은 게임 공지를 이어 쓰기 쉽게 한다.
        setNewNotice(prev => ({ ...prev, title: '', content: '', version: '', is_critical: false }));

        await fetchMgmtNotices();
        // 수정된 공지 카드 자동 확장 (미리보기)
        setExpandedNoticeId(updatedId);
      } else {
        // 신규 등록 모드: insert 실행 (신규 등록 시에는 updated_at을 null로 저장)
        const id = `notice-${toKstDate(new Date().toISOString()).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        const insertPayload: Record<string, any> = {
          id,
          title: newNotice.title.trim(),
          category: newNotice.category,
          game_id: newNotice.game_id,
          content: newNotice.content,
          version: newNotice.version.trim() || null,
          is_critical: newNotice.is_critical,
          updated_at: null
        };

        let { error } = await supabase.from('notices').insert([insertPayload]);
        if (error && error.message && error.message.includes('updated_at')) {
          delete insertPayload.updated_at;
          const retryRes = await supabase.from('notices').insert([insertPayload]);
          error = retryRes.error;
        }

        if (error) throw error;

        showToast('공지사항이 등록되었습니다.');
        // 게임·분류는 유지하고 제목·본문만 비워, 같은 게임 공지를 이어 쓰기 쉽게 한다.
        setNewNotice(prev => ({ ...prev, title: '', content: '', version: '', is_critical: false }));
        await fetchMgmtNotices();
        setExpandedNoticeId(id);
      }
    } catch (err: any) {
      console.error('Notice Save Error:', err);
      showToast((editingNoticeId ? '공지사항 수정 실패: ' : '공지사항 생성 실패: ') + (err?.message || '알 수 없는 오류'), 'error');
    } finally {
      setIsSavingNotice(false);
    }
  };

  const deleteNotice = (id: string, title: string) => {
    requestConfirm(`'${title}' 공지사항을 삭제하시겠습니까?`, async () => {
      if (editingNoticeId === id) {
        setEditingNoticeId(null);
        setInitialEditingNotice(null);
        setNewNotice({ title: '', category: 'Notice', game_id: 'common', content: '', version: '', is_critical: false });
      }
      await supabase.from('notices').delete().eq('id', id);
      fetchMgmtNotices();
      showToast('공지사항이 삭제되었습니다.');
    }, 'danger');
  };

  const addCharacterToDB = async () => {
    if (!newChar.name || !newChar.folder_name) {
      showToast('이름과 폴더명은 필수입니다.', 'error');
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
      showToast('캐릭터 생성 실패: ' + charError.message, 'error');
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

    await supabase.from('tier_lists').upsert(tierEntries, { onConflict: 'game_id,category_id,character_name' });

    showToast('캐릭터 및 티어 정보 등록 완료.');
    setNewChar({ name: '', folder_name: '', rarity: 5, attribute: '물리', path: '파멸', version: '3.1' });
    fetchBaseData();
    fetchTierData();
  };

  const updateTierInfo = async (name: string, categoryId: string, updates: any) => {
    if (!activeGame) return;
    const targetNameNorm = normalizeName(name);
    const existing = mgmtTiers.find(t => normalizeName(t.character_name) === targetNameNorm && t.category_id === categoryId);
    const baseChar = baseCharacters.find(c => normalizeName(c.name) === targetNameNorm || c.name === name);
    const resolvedCharName = baseChar?.name || existing?.character_name || name;

    const payload = {
      game_id: activeGame,
      category_id: categoryId,
      character_name: resolvedCharName,
      tier: existing?.tier || '?',
      role: existing?.role || '메인 딜러',
      change: existing?.change || 'stay',
      display_order: existing?.display_order ?? 100,
      ...updates
    };

    // 낙관적 UI 업데이트 (지연 없는 즉각 반응)
    setMgmtTiers(prev => {
      const idx = prev.findIndex(t => t.game_id === activeGame && t.category_id === categoryId && (t.character_name === resolvedCharName || normalizeName(t.character_name) === targetNameNorm));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...updates, character_name: resolvedCharName };
        return next;
      } else {
        return [...prev, payload];
      }
    });

    try {
      if (existing && existing.character_name !== resolvedCharName) {
        // Clean up legacy symbol mismatch row if character_name has changed
        await supabase
          .from('tier_lists')
          .delete()
          .eq('game_id', activeGame)
          .eq('category_id', categoryId)
          .eq('character_name', existing.character_name);
      }

      const { error } = await supabase
        .from('tier_lists')
        .upsert(payload, { onConflict: 'game_id,category_id,character_name' });

      if (error) throw error;
      fetchTierData();
    } catch (err: any) {
      console.error('Update Tier Error:', err);
      showToast('티어 수정 실패: ' + (err?.message || '알 수 없는 오류'), 'error');
      fetchTierData();
    }
  };

  const deleteCharacter = (id: string, name: string) => {
    requestConfirm(`'${name}' 캐릭터를 삭제하시겠습니까?`, async () => {
      await supabase.from('tier_lists').delete().eq('character_name', name).eq('game_id', activeGame);
      const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;
      await supabase.from(tableName).delete().eq('id', id);
      fetchBaseData();
      fetchTierData();
      showToast('캐릭터가 삭제되었습니다.');
    }, 'danger');
  };

  const syncCharactersFromLocal = () => {
    requestConfirm(`로컬 파일의 ${activeGame.toUpperCase()} 캐릭터 데이터를 DB로 전송하시겠습니까?`, async () => {
    setLoading(true);
    try {
      let charTasks: any[] = [];
      const tableName = activeGame === 'hsr' ? 'characters' : `${activeGame}_characters`;

      if (activeGame === 'hsr') {
        const { default: HSR_CHARACTERS } = await import('../../hsr-hub/data/generated/character-summary.json');
        charTasks = HSR_CHARACTERS.map(c => ({
          id: c.id,
          name: c.name,
          folder_name: (c as any).folderName || c.name,
          rarity: c.rarity,
          attribute: c.attribute,
          path: c.path,
          version: c.releaseVersion || '1.0'
        }));
      } else if (activeGame === 'ww') {
        const characters = await loadManagedCharacterData('ww');
        charTasks = characters.map((c: any) => ({
          id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
          name: c.name,
          folder_name: c.folderName || c.name,
          rarity: c.rarity || 5,
          attribute: c.attribute || '회절',
          weapon_type: c.weaponType || '직검',
          version: c.releaseVersion || '1.0'
        }));
      } else if (activeGame === 'nte') {
        const characters = await loadManagedCharacterData('nte');
        charTasks = characters.map((c: any) => ({
          id: c.id || c.name.toLowerCase().replace(/\s+/g, '_'),
          name: c.name,
          folder_name: c.folderName || c.name,
          rarity: c.rarity || 5,
          attribute: c.attribute || '이능',
          path: c.arc || '결합',
          version: c.releaseVersion || '1.0'
        }));
      } else {
        throw new Error('Unknown active game mode.');
      }

      const { error } = await supabase
        .from(tableName)
        .upsert(charTasks, { onConflict: 'id' });

      if (error) throw error;
      showToast('캐릭터 동기화가 완료되었습니다.');
      fetchBaseData();
    } catch (err: any) {
      console.error('Sync Error:', err);
      showToast('오류가 발생했습니다: ' + (err.message || JSON.stringify(err)), 'error');
    } finally {
      setLoading(false);
    }
    });
  };

  const syncWwWeaponsFromLocal = () => {
    if (activeGame !== 'ww') return;
    requestConfirm(`로컬 파일의 WW 무기 데이터를 DB로 전송하시겠습니까?`, async () => {
    setLoading(true);
    try {
      const { default: weapons } = await import('../../ww-hub/data/generated/admin-weapons.json');
      const weaponTasks = weapons.map((w: any) => ({
        id: w.id || w.name.toLowerCase().replace(/\s+/g, '_'),
        name: w.name,
        rarity: w.rarity || 5,
        type: w.type || '직검',
        release_version: w.releaseVersion || '1.0',
        obtain: w.obtain || '',
        base_atk: w.stats?.atk || 0,
        sub_stat_name: w.stats?.subStatName || '',
        sub_stat_value: w.stats?.subStatValue || '',
        skill_name: w.skill?.name || '',
        skill_description: w.skill?.description || '',
        description: w.description || ''
      }));

      const { error } = await supabase
        .from('ww_weapons')
        .upsert(weaponTasks, { onConflict: 'id' });

      if (error) throw error;

      showToast('WW 무기 데이터 연동이 완료되었습니다.');
    } catch (err) {
      console.error('Weapon Sync Error:', err);
      showToast('무기 동기화 중 오류가 발생했습니다.', 'error');
    } finally {
      setLoading(false);
    }
    });
  };

  const getEncodedUrl = (folderOrChar: any) => {
    const folder = typeof folderOrChar === 'string' 
      ? folderOrChar 
      : (folderOrChar?.folder_name || folderOrChar?.folderName || folderOrChar?.name || '');
    if (!folder) return '';
    const safeFolder = folder.trim();
    const game = activeGame || 'hsr';

    if (game === 'ww') {
      let mappedFolder = safeFolder;
      const isRover = mappedFolder.startsWith('방랑자');
      if (isRover && mappedFolder === '방랑자 · 전도') {
        mappedFolder = '방랑자 · 회절';
      }
      const fileName = isRover ? `${mappedFolder}(여)` : mappedFolder;
      return `https://raw.githubusercontent.com/IZrira/riragameinfo/main/ww%20images/skills/${safeEncodeURIComponent(mappedFolder)}/${safeEncodeURIComponent(fileName)}.webp`;
    }
    if (game === 'nte') {
      const fileName = safeFolder === '감정사' ? '감정사_f' : safeFolder;
      return `https://raw.githubusercontent.com/IZrira/riragameinfo/main/nte%20images/skills/${safeEncodeURIComponent(safeFolder)}/${safeEncodeURIComponent(fileName)}.webp`;
    }
    return `https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr%20images/캐릭터/${safeEncodeURIComponent(safeFolder)}/art01.webp`;
  };

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center"><Activity className="animate-spin text-amber-500" size={48} /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <SEO title="관리자 로그인" noindex={true} />
        <div className="max-w-sm w-full bg-[#121212] border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <Shield className="mx-auto text-amber-500" size={32} />
          <h1 className="text-lg font-bold">로그인이 필요합니다</h1>
          <p className="text-sm text-gray-400">관리자 계정으로 로그인한 뒤 다시 시도해 주세요.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin(user.id)) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
        <SEO title="접근 권한 없음" noindex={true} />
        <div className="max-w-sm w-full bg-[#121212] border border-white/10 rounded-2xl p-8 text-center space-y-4">
          <AlertTriangle className="mx-auto text-rose-500" size={32} />
          <h1 className="text-lg font-bold">권한이 없습니다</h1>
          <p className="text-sm text-gray-400">이 계정은 관리자 권한이 없습니다. 다른 계정으로 로그인해 주세요.</p>
        </div>
      </div>
    );
  }

  const filteredChars = baseCharacters.filter(bc => bc.name.toLowerCase().includes(mgmtSearch.toLowerCase()));
  const tierFilteredChars = baseCharacters
    .filter(bc => bc.name.toLowerCase().includes(tierSearch.toLowerCase()))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

  const breadcrumb = activeGame === 'hsr' || activeGame === 'ww' || activeGame === 'nte'
    ? `${GAME_LABEL[activeGame]} › ${SECTION_LABEL[activeTab]}`
    : SECTION_LABEL[activeTab];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-amber-500/30 flex">
      <SEO title="관리자 대시보드" noindex={true} />

      {/* 사이드바 */}
      <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-white/5 bg-[#121212] flex flex-col">
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500"><Shield size={20} /></div>
          <span className="text-sm font-bold">RIRA 관리자</span>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <SidebarLink active={activeTab === 'notices'} onClick={() => goTo('notices', null)} icon={<Bell size={16} />}>
            공지사항
          </SidebarLink>

          <div className="pt-3" />
          <SidebarGameGroup label="스타레일" open={openGameGroup === 'hsr'} onToggle={() => setOpenGameGroup(openGameGroup === 'hsr' ? null : 'hsr')}>
            <SidebarLink indent active={activeGame === 'hsr' && activeTab === 'characters'} onClick={() => goTo('characters', 'hsr')} icon={<Users size={16} />}>캐릭터</SidebarLink>
            <SidebarLink indent active={activeGame === 'hsr' && activeTab === 'tiers'} onClick={() => goTo('tiers', 'hsr')} icon={<Trophy size={16} />}>티어표</SidebarLink>
            <SidebarLink indent active={activeGame === 'hsr' && activeTab === 'parties'} onClick={() => goTo('parties', 'hsr')} icon={<Sparkles size={16} />}>파티</SidebarLink>
          </SidebarGameGroup>

          <SidebarGameGroup label="명조" open={openGameGroup === 'ww'} onToggle={() => setOpenGameGroup(openGameGroup === 'ww' ? null : 'ww')}>
            <SidebarLink indent active={activeGame === 'ww' && activeTab === 'characters'} onClick={() => goTo('characters', 'ww')} icon={<Users size={16} />}>캐릭터</SidebarLink>
            <SidebarLink indent active={activeGame === 'ww' && activeTab === 'tiers'} onClick={() => goTo('tiers', 'ww')} icon={<Trophy size={16} />}>티어표</SidebarLink>
            <SidebarLink indent active={activeGame === 'ww' && activeTab === 'parties'} onClick={() => goTo('parties', 'ww')} icon={<Sparkles size={16} />}>파티</SidebarLink>
          </SidebarGameGroup>

          <SidebarGameGroup label="이환 (NTE)" open={openGameGroup === 'nte'} onToggle={() => setOpenGameGroup(openGameGroup === 'nte' ? null : 'nte')}>
            <SidebarLink indent active={activeGame === 'nte' && activeTab === 'characters'} onClick={() => goTo('characters', 'nte')} icon={<Users size={16} />}>캐릭터</SidebarLink>
            <SidebarLink indent active={activeGame === 'nte' && activeTab === 'tiers'} onClick={() => goTo('tiers', 'nte')} icon={<Trophy size={16} />}>티어표</SidebarLink>
            <SidebarLink indent active={activeGame === 'nte' && activeTab === 'parties'} onClick={() => goTo('parties', 'nte')} icon={<Sparkles size={16} />}>파티</SidebarLink>
          </SidebarGameGroup>

          <div className="pt-3" />
          <SidebarLink active={activeTab === 'aniimo'} onClick={() => goTo('aniimo', 'aniimo')} icon={<Sparkles size={16} />}>
            애니모 도감
          </SidebarLink>
        </nav>

        <div className="p-3 border-t border-white/5 space-y-2">
          <p className="px-3 text-xs text-gray-500 truncate">{user?.email}</p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* 본문 */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 px-6 md:px-8 py-4">
          <h1 className="text-sm font-bold text-gray-200">{breadcrumb}</h1>
        </header>

        <main className="p-6 md:p-8 space-y-6">

          {activeTab === 'aniimo' && (
            <React.Suspense fallback={<AdminSectionFallback />}>
              <AdminAniimoManager />
            </React.Suspense>
          )}

          {activeTab === 'characters' && (
            <>
              <div className="flex flex-col md:flex-row items-center gap-4 bg-[#121212] p-4 rounded-2xl border border-white/5">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="관리 대상 캐릭터 검색..."
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-11 pr-5 text-sm font-medium focus:outline-none focus:border-amber-500/40 transition-all"
                    value={mgmtSearch}
                    onChange={(e) => setMgmtSearch(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs font-bold text-gray-400">
                    일치: <span className="text-amber-500 ml-1">{filteredChars.length}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'characters' && (
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
              {/* 캐릭터 목록 탭 */}
              <div className="xl:col-span-3 bg-[#111] rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-white/[0.02] text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        <th className="p-8">캐릭터 프로필</th>
                        <th className="p-8 text-center">속성</th>
                        <th className="p-8 text-center">{activeGame === 'ww' ? '무기' : activeGame === 'nte' ? '클래스' : '운명의 길'}</th>
                        <th className="p-8 text-center">버전</th>
                        <th className="p-8 text-right">관리</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredChars.map(bc => (
                        <tr key={bc.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="p-8">
                            <div className="flex items-center gap-6">
                              <div className="relative w-16 h-16 shrink-0 bg-white/5 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                                <img 
                                  src={getEncodedUrl(bc)} 
                                  alt={bc.name}
                                  className="w-full h-full rounded-2xl object-cover bg-black"
                                  onError={(e) => {
                                    const originalUrl = e.currentTarget.src;
                                    if (originalUrl.includes('cdn.jsdelivr.net')) {
                                      e.currentTarget.src = originalUrl.replace('cdn.jsdelivr.net', 'fastly.jsdelivr.net');
                                      return;
                                    }
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<span class="text-xs text-amber-500/80 font-black">${bc.name.slice(0, 2)}</span>`;
                                    }
                                  }}
                                />
                                <a href={getEncodedUrl(bc)} target="_blank" rel="noreferrer" className="absolute -top-1 -right-1 p-1 bg-black rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500"><ExternalLink size={10} /></a>
                              </div>
                              <div className="space-y-1">
                                <p className="text-lg font-black">{bc.name}</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-black text-amber-500/40 uppercase">Folder:</span>
                                  <input 
                                    className="text-[11px] font-bold text-gray-400 bg-transparent border-none p-0 focus:ring-0 w-48"
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
                <div className="bg-amber-500/[0.03] border border-amber-500/20 rounded-3xl p-10 space-y-8 sticky top-12">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-amber-500/20 rounded-2xl text-amber-500"><PlusCircle size={28} /></div>
                    <div>
                      <h2 className="text-base font-bold">신규 캐릭터 등록</h2>
                      <p className="text-[11px] text-amber-500/40 font-black uppercase tracking-widest mt-1">Add to master DB</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">이름</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.name} onChange={e => setNewChar({...newChar, name: e.target.value})} placeholder="캐릭터명" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">폴더명 (GitHub)</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.folder_name} onChange={e => setNewChar({...newChar, folder_name: e.target.value})} placeholder="정확한 폴더명" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1">속성</label>
                        <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" value={newChar.attribute} onChange={e => setNewChar({...newChar, attribute: e.target.value})}>
                          {activeGame === 'ww'
                            ? ['기류', '전도', '회절', '인멸', '용융', '응결'].map(a => <option key={a} value={a} style={{ backgroundColor: '#111' }}>{a}</option>)
                            : activeGame === 'nte'
                            ? ['령', '혼', '빛', '상', '암', '주'].map(a => <option key={a} value={a} style={{ backgroundColor: '#111' }}>{a}</option>)
                            : ['물리', '화염', '얼음', '번개', '바람', '양자', '허수'].map(a => <option key={a} value={a} style={{ backgroundColor: '#111' }}>{a}</option>)
                          }
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1">{activeGame === 'ww' ? '무기' : activeGame === 'nte' ? '클래스' : '운명'}</label>
                        <select className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" value={newChar.path} onChange={e => setNewChar({...newChar, path: e.target.value})}>
                          {activeGame === 'ww'
                            ? ['장검', '대검', '직검', '권갑', '증폭기', '권총'].map(p => <option key={p} value={p} style={{ backgroundColor: '#111' }}>{p}</option>)
                            : activeGame === 'nte'
                            ? ['결합', '액체', '기체', '플라스마', '고체'].map(p => <option key={p} value={p} style={{ backgroundColor: '#111' }}>{p}</option>)
                            : ['파멸', '수렵', '지식', '화합', '공허', '보존', '풍요', '기억', '환락'].map(p => <option key={p} value={p} style={{ backgroundColor: '#111' }}>{p}</option>)
                          }
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">버전 (Version)</label>
                      <input className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" value={newChar.version} onChange={e => setNewChar({...newChar, version: e.target.value})} placeholder="예: 4.3" />
                    </div>
                    <button onClick={addCharacterToDB} className="w-full py-5 bg-amber-500 hover:bg-amber-400 text-black font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3">
                      <Save size={18} /> DB에 저장하기
                    </button>

                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-gray-400 ml-1">TS 데이터 템플릿</label>
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
                            showToast('코드 템플릿이 복사되었습니다.');
                          }}
                          className="text-[11px] font-black text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                        >
                          <Copy size={10} /> 코드 복사하기
                        </button>
                      </div>
                      <div className="bg-black/60 rounded-2xl p-4 border border-white/5 h-48 overflow-y-auto custom-scrollbar">
                        <pre className="text-[11px] text-gray-400 font-mono leading-relaxed">
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
                      <p className="text-[11px] text-gray-400 leading-tight">
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
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">DB Status</p>
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
                  {activeGame === 'ww' && (
                    <button 
                      onClick={syncWwWeaponsFromLocal}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-[11px] font-black transition-all active:scale-95 text-blue-500"
                    >
                      <Database size={14} />
                      WW 무기 동기화
                    </button>
                  )}
                </div>
              </div>

              {/* 캐릭터 검색 */}
              <div className="flex items-center gap-4 bg-[#121212] p-4 rounded-2xl border border-white/5">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="캐릭터 검색..."
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-11 pr-5 text-sm font-medium focus:outline-none focus:border-amber-500/40 transition-all"
                    value={tierSearch}
                    onChange={(e) => setTierSearch(e.target.value)}
                  />
                </div>
                <div className="px-4 py-2 bg-white/[0.03] border border-white/5 rounded-xl text-xs font-bold text-gray-400 shrink-0">
                  일치: <span className="text-amber-500 ml-1">{tierFilteredChars.length}</span>
                </div>
              </div>

              {/* 캐릭터 1명 = 1행, 콘텐츠별 티어를 한 줄에서 확인·수정 */}
              <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] text-xs font-bold text-gray-400">
                        <th className="p-4 whitespace-nowrap">캐릭터</th>
                        {CATEGORIES.map(cat => (
                          <th key={cat.id} className="p-4 text-center whitespace-nowrap border-l border-white/5">{cat.name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {tierFilteredChars.map(bc => (
                        <tr key={bc.id} className="hover:bg-white/[0.015] transition-colors">
                          <td className="p-3">
                            <div className="flex items-center gap-3 min-w-[180px]">
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-white/5 flex items-center justify-center">
                                <img
                                  src={getEncodedUrl(bc)}
                                  alt={bc.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    const originalUrl = e.currentTarget.src;
                                    if (originalUrl.includes('cdn.jsdelivr.net')) {
                                      e.currentTarget.src = originalUrl.replace('cdn.jsdelivr.net', 'fastly.jsdelivr.net');
                                      return;
                                    }
                                    e.currentTarget.style.display = 'none';
                                    const parent = e.currentTarget.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<span class="text-[11px] text-amber-500/80 font-black">${bc.name.slice(0, 2)}</span>`;
                                    }
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-bold truncate">{bc.name}</p>
                                <p className="text-[11px] text-gray-500">{bc.path || bc.weapon_type}</p>
                              </div>
                            </div>
                          </td>
                          {CATEGORIES.map(cat => {
                            const key = `${normalizeName(bc.name)}_${cat.id}`;
                            const tInfo = tierMap.get(key);
                            return (
                              <td key={cat.id} className="p-2 text-center border-l border-white/5">
                                <div className="flex flex-col items-center gap-1.5">
                                  <select
                                    value={tInfo?.tier || '?'}
                                    onChange={(e) => updateTierInfo(bc.name, cat.id, { tier: e.target.value })}
                                    className="w-16 bg-white/5 border border-white/10 rounded-lg text-xs font-black p-1.5 text-center focus:border-amber-500/50 outline-none appearance-none cursor-pointer"
                                  >
                                    {TIER_OPTIONS.map(t => <option key={t} value={t} style={{ backgroundColor: '#111' }}>{t}</option>)}
                                  </select>
                                  <div className="flex items-center gap-1">
                                    <select
                                      value={tInfo?.change || 'stay'}
                                      onChange={(e) => updateTierInfo(bc.name, cat.id, { change: e.target.value })}
                                      title="변동"
                                      className={`w-14 bg-white/5 border border-white/10 rounded-lg text-[11px] font-bold p-1 text-center outline-none appearance-none cursor-pointer ${tInfo?.change === 'up' ? 'text-emerald-500' : tInfo?.change === 'down' ? 'text-rose-500' : tInfo?.change === 'new' ? 'text-amber-500' : 'text-gray-400'}`}
                                    >
                                      {CHANGE_OPTIONS.map(c => <option key={c} value={c} style={{ backgroundColor: '#111' }}>{c}</option>)}
                                    </select>
                                    <input
                                      type="number"
                                      title="정렬 순서"
                                      className="w-10 bg-white/5 border border-white/10 rounded-lg p-1 text-[11px] font-bold text-center text-amber-500/80 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                      value={tInfo?.display_order ?? 100}
                                      onChange={(e) => updateTierInfo(bc.name, cat.id, { display_order: parseInt(e.target.value) || 0 })}
                                    />
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                      {tierFilteredChars.length === 0 && (
                        <tr>
                          <td colSpan={CATEGORIES.length + 1} className="p-12 text-center text-gray-400 text-sm font-bold">
                            검색된 캐릭터가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'parties' && activeGame && activeGame !== 'aniimo' && (
            <React.Suspense fallback={<AdminSectionFallback />}>
              <AdminPartyManager activeGame={activeGame} getEncodedUrl={getEncodedUrl} />
            </React.Suspense>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* 공지사항 추가/수정 폼 (좌측) */}
              <div className="space-y-8">
                <div
                  ref={noticeFormRef}
                  className={`border rounded-3xl p-8 md:p-10 space-y-8 sticky top-12 transition-colors duration-300 ${
                    editingNoticeId 
                      ? 'bg-amber-500/[0.06] border-amber-500/50 ring-2 ring-amber-500/20 shadow-amber-500/10' 
                      : 'bg-amber-500/[0.03] border-amber-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-2xl transition-colors ${editingNoticeId ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' : 'bg-amber-500/20 text-amber-500'}`}>
                        {editingNoticeId ? <Edit3 size={28} /> : <PlusCircle size={28} />}
                      </div>
                      <div>
                        <h2 className="text-base font-bold">
                          {editingNoticeId ? '공지사항 수정' : '공지사항 작성'}
                        </h2>
                        <p className="text-[11px] text-amber-500/60 font-black uppercase tracking-widest mt-1">
                          {editingNoticeId ? 'Edit Notice' : 'Publish Notice'}
                        </p>
                      </div>
                    </div>
                    {editingNoticeId && (
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-[11px] font-black uppercase">
                        수정 모드
                      </span>
                    )}
                  </div>

                  {editingNoticeId && (
                    <div className="flex items-center justify-between gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs font-bold text-amber-400">
                      <div className="flex items-center gap-2 truncate">
                        <Edit3 size={14} className="shrink-0" />
                        <span className="truncate">공지 ID: <span className="font-mono text-white">{editingNoticeId}</span></span>
                      </div>
                      <button 
                        type="button" 
                        onClick={cancelEditNotice}
                        disabled={isSavingNotice}
                        className="text-[11px] font-black underline hover:text-white shrink-0 text-gray-400"
                      >
                        수정 취소
                      </button>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">게임</label>
                      <select 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold focus:border-amber-500/50 appearance-none cursor-pointer" 
                        value={newNotice.game_id} 
                        onChange={e => setNewNotice({...newNotice, game_id: e.target.value})}
                      >
                        <option value="common" style={{ backgroundColor: '#111' }}>공통 (전체)</option>
                        <option value="hsr" style={{ backgroundColor: '#111' }}>스타레일</option>
                        <option value="ww" style={{ backgroundColor: '#111' }}>명조</option>
                        <option value="nte" style={{ backgroundColor: '#111' }}>이환(NTE)</option>
                        <option value="aniimo" style={{ backgroundColor: '#111' }}>애니모</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">분류</label>
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
                      <label className="text-xs font-bold text-gray-400 ml-1">제목</label>
                      <input 
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-sm font-bold focus:border-amber-500/50 transition-all" 
                        value={newNotice.title} 
                        onChange={e => setNewNotice({...newNotice, title: e.target.value})} 
                        placeholder="공지 제목" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">내용 (Markdown 지원)</label>
                      <React.Suspense fallback={<AdminSectionFallback />}>
                        <AdminNoticeEditor
                          initialContent={newNotice.content}
                          onChange={(content) => setNewNotice({...newNotice, content})}
                          placeholder="마크다운 형식으로 공지사항 내용을 작성하세요..."
                        />
                      </React.Suspense>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1">버전 (선택)</label>
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
                    
                    {editingNoticeId ? (
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <button 
                          type="button"
                          onClick={saveNoticeToDB} 
                          disabled={isSavingNotice}
                          className="w-full py-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3"
                        >
                          {isSavingNotice ? (
                            <>
                              <Loader2 size={18} className="animate-spin" />
                              <span>저장 중...</span>
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              <span>수정 완료</span>
                            </>
                          )}
                        </button>
                        <button 
                          type="button"
                          onClick={cancelEditNotice} 
                          disabled={isSavingNotice}
                          className="w-full py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-black rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          <X size={18} />
                          <span>취소</span>
                        </button>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={saveNoticeToDB} 
                        disabled={isSavingNotice}
                        className="w-full py-5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black rounded-2xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 flex items-center justify-center gap-3"
                      >
                        {isSavingNotice ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>등록 중...</span>
                          </>
                        ) : (
                          <>
                            <Save size={18} />
                            <span>바로 등록하기</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* 실시간 미리보기 (우측) */}
              <div className="space-y-4 sticky top-12 self-start">
                <div className="flex items-center gap-3 text-gray-400">
                  <Eye size={18} />
                  <h2 className="text-sm font-bold">실제 공지 모양 미리보기</h2>
                </div>
                <div className="bg-[#111] rounded-3xl border border-white/5 p-8 space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[11px] font-black uppercase tracking-wider">
                      {newNotice.game_id}
                    </span>
                    <span className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full text-[11px] font-black uppercase">
                      {newNotice.category}
                    </span>
                    {newNotice.is_critical && (
                      <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[11px] font-black uppercase flex items-center gap-1">
                        <AlertTriangle size={10} /> 필독
                      </span>
                    )}
                    {newNotice.version && (
                      <span className="text-[11px] font-black text-gray-400 border border-white/10 px-2 py-1 rounded-full">v{newNotice.version}</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{newNotice.title || <span className="text-gray-500">제목을 입력하면 여기에 표시됩니다</span>}</h3>
                  <div className="text-sm text-gray-300 leading-relaxed font-medium border-t border-white/5 pt-4">
                    {newNotice.content.trim() ? (
                      <React.Suspense fallback={<AdminSectionFallback />}>
                        <MarkdownRenderer content={newNotice.content} variant="notice" />
                      </React.Suspense>
                    ) : (
                      <span className="text-gray-500">내용을 입력하면 여기에 표시됩니다.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

              {/* 공지사항 목록 */}
              <div className="space-y-8">
                <div className="bg-[#111] rounded-3xl border border-white/5 overflow-hidden p-8">
                  <h2 className="text-base font-bold mb-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Bell className="text-amber-500" size={24} /> 등록된 공지사항 관리
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={resetAllNoticeUpdatedTimestamps}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 rounded-xl text-[11px] font-black transition-all active:scale-95 text-gray-400"
                        title="기존 공지들의 수정일시를 초기화하여, 이후 실제 수정한 공지에만 수정일이 표시되도록 정리합니다."
                      >
                        <RotateCcw size={12} />
                        기존 수정일시 초기화
                      </button>
                    </div>
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap mb-6">
                    {([
                      ['all', '전체'],
                      ['common', '공통'],
                      ['hsr', '스타레일'],
                      ['ww', '명조'],
                      ['nte', '이환(NTE)'],
                      ['aniimo', '애니모'],
                    ] as const).map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setNoticeGameFilter(value)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                          noticeGameFilter === value
                            ? 'bg-amber-500 border-amber-500 text-black'
                            : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {mgmtNotices.filter(n => noticeGameFilter === 'all' || n.game_id === noticeGameFilter).map((notice) => (
                      <div 
                        key={notice.id} 
                        className={`bg-black/40 border rounded-3xl p-6 space-y-4 transition-all group cursor-pointer ${
                          editingNoticeId === notice.id
                            ? 'border-amber-500 ring-2 ring-amber-500/30 bg-amber-500/[0.04]'
                            : expandedNoticeId === notice.id 
                              ? 'border-amber-500/50 ring-1 ring-amber-500/20' 
                              : 'border-white/5 hover:border-amber-500/30'
                        }`}
                        onClick={() => setExpandedNoticeId(expandedNoticeId === notice.id ? null : notice.id)}
                      >
                        <div className="flex items-start justify-between gap-6">
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[11px] font-black uppercase tracking-wider">
                                {notice.game_id}
                              </span>
                              <span className="px-3 py-1 bg-white/5 text-gray-300 border border-white/10 rounded-full text-[11px] font-black uppercase">
                                {notice.category}
                              </span>
                              {notice.is_critical && (
                                <span className="px-3 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full text-[11px] font-black uppercase flex items-center gap-1">
                                  <AlertTriangle size={10} /> 필독
                                </span>
                              )}
                              {notice.version && (
                                <span className="text-[11px] font-black text-gray-400 border border-white/10 px-2 py-1 rounded-full">v{notice.version}</span>
                              )}
                              {editingNoticeId === notice.id && (
                                <span className="px-3 py-1 bg-amber-500 text-black font-black text-[11px] rounded-full flex items-center gap-1 animate-pulse">
                                  <Edit3 size={10} /> 편집 중
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold">{notice.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
                              <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                              {notice.updated_at && notice.updated_at.split('T')[0] !== notice.created_at.split('T')[0] && (
                                <span className="text-[11px] text-amber-500/90 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                                  수정됨 ({new Date(notice.updated_at).toLocaleDateString()})
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditNotice(notice);
                              }}
                              className={`p-4 rounded-2xl transition-all active:scale-90 border shrink-0 ${
                                editingNoticeId === notice.id 
                                  ? 'bg-amber-500 text-black border-amber-500 shadow-lg shadow-amber-500/30' 
                                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-500/80 hover:text-amber-500 border-transparent hover:border-amber-500/20'
                              }`}
                              title="공지사항 수정"
                            >
                              <Edit3 size={18} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotice(notice.id, notice.title);
                              }}
                              className="p-4 bg-rose-500/10 hover:bg-rose-500/20 rounded-2xl text-rose-500/40 hover:text-rose-500 transition-all active:scale-90 border border-transparent hover:border-rose-500/20 shrink-0"
                              title="공지사항 삭제"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {expandedNoticeId === notice.id && (
                          <div className="pt-6 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-300" onClick={e => e.stopPropagation()}>
                            <div className="bg-black/60 rounded-2xl p-6 border border-white/5 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Notice Content</span>
                                <button 
                                  onClick={() => {
                                    navigator.clipboard.writeText(notice.content);
                                    showToast('내용이 클립보드에 복사되었습니다.');
                                  }}
                                  className="text-[11px] font-black text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                                >
                                  <Copy size={10} /> 내용 복사
                                </button>
                              </div>
                              <div className="text-sm text-gray-300 leading-relaxed font-medium">
                                <React.Suspense fallback={<AdminSectionFallback />}>
                                  <MarkdownRenderer content={notice.content} variant="notice" />
                                </React.Suspense>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {mgmtNotices.length === 0 && (
                      <div className="text-center py-12 text-gray-400 text-sm font-bold">등록된 공지사항이 없습니다.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            )}
        </main>
      </div>

      {/* 확인 대화상자 (삭제 등 되돌릴 수 없는 작업만) */}
      {confirmRequest && (
        <div
          className="fixed inset-0 z-[400] bg-black/60 flex items-center justify-center p-4"
          onClick={() => setConfirmRequest(null)}
        >
          <div
            className="bg-[#171717] border border-white/10 rounded-2xl p-6 max-w-sm w-full space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-gray-200 leading-relaxed">{confirmRequest.message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmRequest(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 transition-colors"
              >
                취소
              </button>
              <button
                onClick={() => { confirmRequest.onConfirm(); setConfirmRequest(null); }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                  confirmRequest.tone === 'danger' ? 'bg-rose-500 text-white hover:bg-rose-400' : 'bg-amber-500 text-black hover:bg-amber-400'
                }`}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 알림 */}
      <div className="fixed bottom-6 right-6 z-[400] space-y-2 max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.tone === 'error' ? 'alert' : 'status'}
            className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg border ${
              t.tone === 'error' ? 'bg-rose-500/15 border-rose-500/40 text-rose-200' : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
