import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Command, CornerDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 단축키 (Cmd+K 또는 Ctrl+K) 감지
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 모달 열릴 때 input에 자동 포커스 및 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery(''); // 닫힐 때 검색어 초기화
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    // 예: 검색 시 결과 페이지로 이동하거나 갤러리에 쿼리스트링 전달
    navigate(`/gallery/hsr?search=${encodeURIComponent(query)}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* 헤더 등에 들어갈 검색 버튼 (선택 사항) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
      >
        <Search size={16} />
        <span className="text-sm font-medium">검색...</span>
        <div className="flex items-center gap-1 text-[10px] bg-black/40 px-1.5 py-0.5 rounded-md border border-white/5">
          <Command size={10} /> K
        </div>
      </button>

      {/* 검색 모달 오버레이 */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
            {/* 뒷배경 블러 */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* 검색창 컨테이너 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl bg-[#121212] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSearch} className="flex items-center px-6 py-4 border-b border-white/5 relative group">
                <Search size={24} className="text-brand-accent mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="캐릭터, 광추, 유물 검색..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-xl font-bold text-white placeholder:text-gray-600"
                />
                <button type="button" onClick={() => setIsOpen(false)} className="p-2 text-gray-500 hover:text-white transition-colors bg-white/5 rounded-xl ml-4">
                  <X size={20} />
                </button>
              </form>

              {/* 검색어 추천/결과 영역 (목업) */}
              <div className="p-4 max-h-[50vh] overflow-y-auto">
                {query ? (
                  <div className="p-4 flex items-center justify-between hover:bg-white/5 rounded-2xl cursor-pointer text-gray-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <Search size={16} />
                      <span className="font-bold">"{query}" 전체 검색</span>
                    </div>
                    <CornerDownLeft size={16} className="text-gray-600" />
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-gray-600 font-bold text-sm">
                    검색어를 입력해주세요.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
