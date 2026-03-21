
import React, { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Hash, Search, ChevronLeft, Book, Info, ArrowLeft } from 'lucide-react';
import { GLOBAL_SPECIAL_TERMS } from '../data/terms';
import { CHARACTER_DB } from '../data/games';
import PageHeader from '../components/PageHeader';
import AdPlaceholder from '../components/AdPlaceholder';

const Terminology: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const allTerms = useMemo(() => {
    const termsMap = new Map<string, string>(Object.entries(GLOBAL_SPECIAL_TERMS));
    CHARACTER_DB.forEach(char => {
      if (char.specialTerms) {
        Object.entries(char.specialTerms).forEach(([term, desc]) => {
          if (!termsMap.has(term)) {
            termsMap.set(term, desc);
          }
        });
      }
    });
    return Array.from(termsMap.entries())
      .map(([term, desc]) => ({ term, desc }))
      .sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  const filteredTerms = allTerms.filter(t => 
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Page Header */}
      <PageHeader gameId={gameId} title="용어 사전 아카이브" />

      <main className="max-w-7xl mx-auto px-8 py-16 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-brand-accent">
              <Info size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.3em]">Terminology Database</span>
            </div>
            <h2 className="text-4xl font-black italic tracking-tight">모든 게임 용어 정리</h2>
            <p className="text-gray-500 max-w-2xl font-medium leading-relaxed">
              게임 내에서 사용되는 특수 용어, 상태 이상, 버프 및 시스템 관련 용어들을 한곳에 모았습니다. 
              검색 기능을 통해 원하는 정보를 빠르게 찾으실 수 있습니다.
            </p>
          </div>

          <div className="relative group w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="용어 또는 설명 검색..." 
              className="bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-brand-primary/50 w-full transition-all focus:bg-white/10 text-white placeholder:text-gray-600 font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerms.map((item, idx) => (
            <div key={idx} className="group flex flex-col p-8 rounded-[32px] bg-[#121212] border border-white/5 hover:border-brand-primary/30 hover:bg-white/[0.02] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Hash size={64} className="text-white" />
              </div>
              
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black text-brand-light group-hover:text-brand-accent transition-colors italic tracking-tight">
                  {item.term}
                </h3>
                <div className="w-8 h-1 bg-white/10 rounded-full group-hover:w-20 group-hover:bg-brand-primary transition-all duration-500" />
                <p className="text-gray-400 font-medium leading-relaxed text-[15px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
          {filteredTerms.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white/[0.02] rounded-[48px] border border-dashed border-white/5">
              <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-sm italic">일치하는 용어를 찾을 수 없습니다.</p>
            </div>
          )}
        </div>

        <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
      </main>

      <footer className="py-20 text-center border-t border-white/5">
        <p className="text-gray-700 text-[10px] font-black uppercase tracking-[0.5em] italic">
          &copy; RIRA GAME ARCHIVE - TERMINOLOGY SYSTEM V2.0
        </p>
      </footer>
    </div>
  );
};

export default Terminology;
