import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Home } from 'lucide-react';

// 게임 ID를 실제 한글 이름으로 매핑
const GAME_NAMES: Record<string, string> = {
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

  // 카테고리 기본 주소 생성 (예: /gallery/hsr?category=캐릭터)
  const defaultCategoryUrl = gameId && category ? `/gallery/${gameId}?category=${category}` : '/';

  return (
    <div className="bg-[#121212]/90 backdrop-blur-md border-b border-white/5 h-14 flex items-center px-4 md:px-8 sticky top-16 z-[100] justify-between">
      
      {/* 1. 뒤로 가기 버튼 */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors group px-2 py-1.5 -ml-2 rounded-lg hover:bg-white/5"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:block">이전으로</span>
      </button>

      {/* 2. 통일된 경로 표시 (Breadcrumbs) */}
      <nav className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-black text-gray-500 uppercase tracking-widest truncate">
        
        {/* 홈 */}
        <Link to="/" className="hover:text-brand-accent transition-colors flex items-center gap-1 shrink-0">
          <Home size={12} className="hidden sm:block" /> 메인
        </Link>
        <ChevronRight size={10} className="shrink-0" />

        {/* 게임 이름 (스타레일 / 명조) */}
        {gameId && (
          <>
            <Link to={`/gallery/${gameId}`} className="hover:text-brand-accent transition-colors shrink-0">
              {GAME_NAMES[gameId] || gameId}
            </Link>
            <ChevronRight size={10} className="shrink-0" />
          </>
        )}

        {/* 카테고리 (캐릭터, 광추, 티어표 등) */}
        {category && (
          <>
            <Link to={categoryUrl || defaultCategoryUrl} className="hover:text-brand-accent transition-colors shrink-0">
              {category}
            </Link>
            <ChevronRight size={10} className="shrink-0" />
          </>
        )}

        {/* 현재 페이지 이름 */}
        <span className="text-brand-accent truncate">{title}</span>
      </nav>
      
    </div>
  );
}
