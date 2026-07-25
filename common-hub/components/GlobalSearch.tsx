import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useLocation } from 'react-router';
import SearchModal from './SearchModal';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 단축키 (Cmd+K 또는 Ctrl+K) 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Mac(metaKey)과 Windows(ctrlKey) 모두 대응
      // 2. K 키인지 확인 (대소문자 구분 없이 안전하게 처리)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        // 3. 브라우저 기본 검색창 열기 방지 (매우 중요)
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // URL을 바탕으로 gameId 유추 (메인 화면일 시 기본값 hsr 사용)
  const gameId = location.pathname.includes('/ww') ? 'ww' : 'hsr';

  return (
    <>
      {/* 헤더 등에 들어갈 검색 버튼 (선택 사항) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all group"
        title="통합 검색 (⌘K)"
      >
        <Search size={18} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* 실제 작동하는 인텔리전스 검색 모달 호출 */}
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} gameId={gameId} />
    </>
  );
}
