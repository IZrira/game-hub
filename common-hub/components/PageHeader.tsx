import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { ChevronRight, ArrowLeft, Home, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// 게임 ID → i18n 키 매핑 (t()로 번역됨)
const GAME_NAME_KEYS: Record<string, string> = {
  hsr: '스타레일',
  ww: '명조',
};

interface PageHeaderProps {
  gameId?: string;
  category?: string;      // 예: '캐릭터', '광추', '티어표' 등
  categoryUrl?: string;   // 카테고리 클릭 시 이동할 커스텀 주소 (선택)
  title: string;          // 예: '아케론', '종합 티어표'
}

export default function PageHeader({ gameId, category, categoryUrl, title }: PageHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const currentUrl = location.pathname + location.search;
  
  const [isFavorite, setIsFavorite] = useState(false);

  const [isSticky, setIsSticky] = useState(() => {
    const saved = localStorage.getItem('rira_header_sticky');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('rira_favorites') || '[]');
    setIsFavorite(favs.some((f: any) => f.url === currentUrl));
  }, [currentUrl]);

  const toggleSticky = () => {
    const newVal = !isSticky;
    setIsSticky(newVal);
    localStorage.setItem('rira_header_sticky', JSON.stringify(newVal));
  };

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('rira_favorites') || '[]');
    if (isFavorite) {
      favs = favs.filter((f: any) => f.url !== currentUrl);
    } else {
      favs.push({ title: `${t(GAME_NAME_KEYS[gameId || 'hsr'])} - ${t(title)}`, url: currentUrl });
    }
    localStorage.setItem('rira_favorites', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  // 카테고리 기본 주소 생성 (예: /gallery/hsr?menu=캐릭터)
  const defaultCategoryUrl = gameId && category ? `/gallery/${gameId}?menu=${category}` : '/';

  return (
    <div className={`bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 h-14 flex items-center px-4 md:px-8 z-[40] shadow-2xl justify-between w-full transition-all duration-300 ${
      isSticky ? 'sticky top-16' : 'relative'
    }`}>
      
      {/* Left Group: Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 overflow-hidden mr-4">
        {/* 1. 뒤로 가기 버튼 */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors group px-2 py-1.5 -ml-2 rounded-lg hover:bg-white/5 shrink-0"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block">{t('이전으로')}</span>
        </button>

        <div className="w-px h-4 bg-white/10 mx-1 hidden sm:block" />

        {/* 2. 통일된 경로 표시 (Breadcrumbs) */}
        <nav className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest truncate">
          
          {/* 홈 */}
          <Link to="/" className="hover:text-brand-accent transition-colors flex items-center gap-1 shrink-0">
            <Home size={12} className="hidden sm:block" /> {t('메인')}
          </Link>
          <ChevronRight size={10} className="shrink-0" />

          {/* 게임 이름 (스타레일 / 명조) */}
          {gameId && (
            <>
              <Link to={`/gallery/${gameId}?menu=홈`} className="hover:text-brand-accent transition-colors shrink-0">
                {t(GAME_NAME_KEYS[gameId] || gameId)}
              </Link>
              <ChevronRight size={10} className="shrink-0" />
            </>
          )}

          {/* 카테고리 (캐릭터, 광추, 티어표 등) */}
          {category && (
            <>
              <Link to={categoryUrl || defaultCategoryUrl} className="hover:text-brand-accent transition-colors shrink-0">
                {t(category)}
              </Link>
              <ChevronRight size={10} className="shrink-0" />
            </>
          )}

          {/* 현재 페이지 이름 */}
          <span className="text-brand-accent truncate">{t(title)}</span>
        </nav>
      </div>
      
      {/* Right Group: Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* 3. 고정 토글 버튼 */}
        <button 
          onClick={toggleSticky} 
          className={`p-2 rounded-xl transition-all group border ${
            isSticky ? 'bg-brand-primary/10 border-brand-primary/30 text-brand-primary shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.2)]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white hover:bg-white/10'
          }`}
          title={isSticky ? t('고정 해제') : t('상단 고정')}
        >
          <Star size={16} className={`transition-transform duration-300 ${isSticky ? 'rotate-45' : ''}`} />
        </button>

        {/* 4. 즐겨찾기 별 표시 */}
        <button 
          onClick={toggleFavorite} 
          className={`p-2 rounded-xl transition-all group border ${
            isFavorite ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-yellow-500/50 hover:bg-white/10'
          }`}
        >
          <Star size={16} className={`${isFavorite ? 'fill-yellow-500' : ''}`} />
        </button>
      </div>

    </div>
  );
}
