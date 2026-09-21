import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router';
import SearchModal from './SearchModal';

interface GlobalSearchProps {
  className?: string;
  showText?: boolean;
}

export default function GlobalSearch({ className = '', showText = true }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 단축키 (Cmd+K 또는 Ctrl+K) 및 커스텀 이벤트 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-global-search', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-global-search', handleCustomOpen);
    };
  }, []);

  // URL을 바탕으로 active gameId 유추
  const getGameIdFromPath = (pathname: string): 'all' | 'hsr' | 'ww' | 'nte' | 'aniimo' => {
    if (pathname.includes('/aniimo')) return 'aniimo';
    if (pathname.includes('/ww')) return 'ww';
    if (pathname.includes('/nte')) return 'nte';
    if (pathname.includes('/hsr')) return 'hsr';
    return 'all';
  };

  const activeGameId = getGameIdFromPath(location.pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold group cursor-pointer ${className}`}
        title="통합 아카이브 검색 (⌘K / Ctrl+K)"
        aria-label="통합 아카이브 검색"
      >
        <Search size={15} className="text-brand-primary group-hover:scale-110 transition-transform shrink-0" />
        {showText && (
          <span className="hidden lg:inline text-[11px] font-bold text-gray-400 group-hover:text-gray-200">
            통합 검색
          </span>
        )}
        <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono text-gray-400 bg-white/10 rounded border border-white/5">
          ⌘K
        </kbd>
      </button>

      {/* 인텔리전스 검색 모달 */}
      <SearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        gameId={activeGameId}
      />
    </>
  );
}
