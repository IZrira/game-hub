import React, { useState } from 'react';
import { useLocation } from 'react-router';
import SEO from '../components/SEO';
import SearchModal from '../components/SearchModal';

/** A direct entry to the existing search dialog, not a second search engine. */
export default function SearchPage() {
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const query = new URLSearchParams(search).get('q') || '';
  return <main className="mx-auto max-w-5xl px-6 py-16 text-white">
    <SEO title="통합 검색" description="스타레일·명조·이환·애니모의 캐릭터, 장비와 공략을 검색하세요." url="/search" noindex />
    <h1 className="text-3xl font-bold">통합 검색</h1>
    <p className="mt-4 text-gray-400">캐릭터, 장비와 공략 이름으로 검색할 수 있습니다.</p>
    <button type="button" className="mt-6 rounded-xl border border-white/10 px-5 py-3" onClick={() => setIsOpen(true)}>검색창 열기</button>
    <SearchModal key={search} isOpen={isOpen} initialQuery={query} onClose={() => setIsOpen(false)} />
  </main>;
}
