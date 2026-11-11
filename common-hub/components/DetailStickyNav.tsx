import React, { useState, useEffect, useRef } from 'react';

export interface StickyNavTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface DetailStickyNavProps {
  tabs: StickyNavTab[];
  activeColor?: string;
  className?: string;
}

export const DetailStickyNav: React.FC<DetailStickyNavProps> = ({
  tabs,
  activeColor = '#7E30E1',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '');
  const navRef = useRef<HTMLDivElement>(null);
  const isClickScrolling = useRef(false);
  const activeId = useRef(activeTab);

  useEffect(() => {
    if (tabs.length === 0) return;

    let positions: { id: string; top: number }[] = [];
    const canObserveResize = typeof ResizeObserver !== 'undefined';
    const measurePositions = () => tabs.flatMap(tab => {
      const el = document.getElementById(tab.id);
      return el ? [{ id: tab.id, top: el.getBoundingClientRect().top + window.scrollY }] : [];
    });
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      // Preserve navigation correctness in older browsers without ResizeObserver.
      if (!canObserveResize) positions = measurePositions();

      const scrollPos = window.scrollY + 180;
      let currentId = tabs[0].id;

      for (const position of positions) {
        if (scrollPos >= position.top) currentId = position.id;
      }

      if (activeId.current !== currentId) {
        activeId.current = currentId;
        setActiveTab(currentId);
      }
    };

    // Measure only when layout changes, never on the continuous scroll path.
    const refreshPositions = () => {
      positions = measurePositions();
      handleScroll();
    };
    const observer = canObserveResize ? new ResizeObserver(refreshPositions) : null;
    observer?.observe(document.body);
    for (const tab of tabs) {
      const section = document.getElementById(tab.id);
      if (section) observer?.observe(section);
    }
    window.addEventListener('resize', refreshPositions, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    refreshPositions();

    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', refreshPositions);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabs]);

  const scrollToSection = (id: string) => {
    isClickScrolling.current = true;
    activeId.current = id;
    setActiveTab(id);

    const el = document.getElementById(id);
    if (el) {
      const topOffset = 100;
      const elPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);
  };

  if (tabs.length === 0) return null;

  return (
    <div
      ref={navRef}
      className={`sticky top-14 z-30 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-2.5 backdrop-blur-xl bg-black/60 border-b border-white/5 transition duration-300 ${className}`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition shrink-0 select-none ${
                isActive
                  ? 'text-black shadow-lg scale-105'
                  : 'text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/5'
              }`}
              style={isActive ? { backgroundColor: activeColor } : {}}
            >
              {tab.icon && <span className="opacity-80">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DetailStickyNav;
