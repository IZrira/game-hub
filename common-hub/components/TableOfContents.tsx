import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ selector = '.prose' }: { selector?: string }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // 1. 지정된 영역(selector) 안의 h2, h3 태그를 모두 찾습니다.
    const elements = Array.from(document.querySelectorAll(`${selector} h2, ${selector} h3`));
    
    const newHeadings = elements.map((elem, index) => {
      // 태그에 id가 없다면 텍스트를 기반으로 자동 생성해줍니다.
      if (!elem.id) {
        elem.id = `heading-${index}`;
      }
      return {
        id: elem.id,
        text: elem.textContent || '',
        level: Number(elem.tagName.substring(1)), // h2 -> 2, h3 -> 3
      };
    });
    
    setHeadings(newHeadings);

    // 2. 스크롤 스파이 (IntersectionObserver) 세팅
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } // 화면 중앙쯤 왔을 때 활성화
    );

    elements.forEach((elem) => observer.observe(elem));

    return () => observer.disconnect();
  }, [selector]);

  // 클릭 시 해당 위치로 부드럽게 스크롤
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100; // 헤더 높이(100px)만큼 띄우기
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="w-64 hidden lg:block shrink-0">
      <div className="p-6 bg-[#121212] border border-white/5 rounded-3xl shadow-xl flex flex-col max-h-[45vh]">
        <div className="flex items-center gap-2 mb-4 text-brand-primary shrink-0">
          <List size={18} />
          <h3 className="font-black uppercase tracking-widest text-[11px]">On this page</h3>
        </div>
        
        <nav className="space-y-3 overflow-y-auto pr-2 pb-2">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => handleClick(heading.id)}
              className={`block w-full text-left transition-all duration-300 font-bold text-sm ${
                heading.level === 3 ? 'pl-4 text-[12px]' : '' // h3는 들여쓰기
              } ${
                activeId === heading.id
                  ? 'text-brand-accent translate-x-1' // 활성화 시 색상 변경 및 살짝 우측 이동
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
