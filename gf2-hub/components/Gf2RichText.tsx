import React, { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from 'react';
import { X } from 'lucide-react';

/** 수치(%, 칸, 턴, 스택, 점, 회)를 강조한다. */
const NUMBER = '[+-]?\\d+(?:\\.\\d+)?(?:%|칸|턴|스택|점|회|기)';

interface TooltipState { term: string; text: string; rect: DOMRect; pinned: boolean }
interface TermContextValue {
  terms: Map<string, string>;
  pattern: RegExp | null;
  tooltipId: string;
  openTerm: string | null;
  pinnedTerm: string | null;
  show: (term: string, target: HTMLElement, pinned: boolean) => void;
  hide: (force?: boolean) => void;
}

const TermContext = createContext<TermContextValue | null>(null);
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** 인형 상세 페이지 안의 용어 툴팁을 한곳에서 관리한다(다른 허브와 같은 호버·탭 고정 방식). */
export const Gf2TermProvider: React.FC<{ terms: Array<{ term: string; description: string }>; children: React.ReactNode }> = ({ terms, children }) => {
  const tooltipId = useId();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const map = useMemo(() => new Map(terms.filter(entry => entry.term.length > 1).map(entry => [entry.term, entry.description])), [terms]);
  const pattern = useMemo(() => {
    const names = [...map.keys()].sort((a, b) => b.length - a.length).map(escape);
    return names.length ? new RegExp(`(${names.join('|')}|${NUMBER})`, 'g') : new RegExp(`(${NUMBER})`, 'g');
  }, [map]);

  const show = useCallback((term: string, target: HTMLElement, pinned: boolean) => {
    const text = map.get(term);
    if (!text) return;
    setTooltip(current => (current?.pinned && !pinned && current.term !== term ? current : { term, text, rect: target.getBoundingClientRect(), pinned }));
  }, [map]);
  const hide = useCallback((force = false) => setTooltip(current => (current && (force || !current.pinned) ? null : current)), []);

  useEffect(() => {
    if (!tooltip) return;
    const close = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
      if (event.type === 'pointerdown' && panelRef.current?.contains(event.target as Node)) return;
      if (event.type === 'pointerdown' && (event.target as HTMLElement).closest?.('[data-gf2-term]')) return;
      setTooltip(null);
    };
    const reposition = () => setTooltip(current => (current && !current.pinned ? null : current));
    document.addEventListener('keydown', close);
    document.addEventListener('pointerdown', close);
    window.addEventListener('scroll', reposition, { passive: true });
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('pointerdown', close);
      window.removeEventListener('scroll', reposition);
    };
  }, [tooltip]);

  const width = Math.min(420, (typeof window === 'undefined' ? 420 : window.innerWidth) - 32);
  const position = tooltip && (() => {
    const viewportWidth = window.innerWidth;
    const left = Math.max(16, Math.min(viewportWidth - width - 16, tooltip.rect.left + tooltip.rect.width / 2 - width / 2));
    const below = tooltip.rect.bottom + 8;
    const placeAbove = below + 200 > window.innerHeight && tooltip.rect.top > 240;
    return placeAbove ? { left, bottom: window.innerHeight - tooltip.rect.top + 8 } : { left, top: below };
  })();

  return <TermContext.Provider value={{ terms: map, pattern, tooltipId, openTerm: tooltip?.term ?? null, pinnedTerm: tooltip?.pinned ? tooltip.term : null, show, hide }}>
    {children}
    {tooltip && position && <div
      ref={panelRef}
      id={tooltipId}
      role="tooltip"
      className="fixed z-[1000] rounded-2xl border border-white/15 bg-[#16120f]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.75)] backdrop-blur-xl"
      style={{ ...position, width }}
      onMouseLeave={() => hide()}
    >
      <div className="mb-2 flex items-center justify-between gap-3 border-b border-white/10 pb-2">
        <span className="text-base font-bold text-orange-300">{tooltip.term}</span>
        {tooltip.pinned && <button type="button" onClick={() => hide(true)} aria-label="용어 설명 닫기" className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"><X size={14} aria-hidden /></button>}
      </div>
      <p className="max-h-[50vh] overflow-y-auto text-base leading-relaxed text-gray-100"><Gf2Text text={tooltip.text} terms={false} /></p>
    </div>}
  </TermContext.Provider>;
};

const Term: React.FC<{ term: string }> = ({ term }) => {
  const context = useContext(TermContext)!;
  const open = context.openTerm === term;
  return <button
    type="button"
    data-gf2-term
    aria-describedby={open ? context.tooltipId : undefined}
    aria-expanded={open}
    className="cursor-help rounded-sm border-b border-dashed border-orange-300/70 font-semibold text-white decoration-transparent outline-offset-2 hover:border-orange-200 hover:text-orange-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300"
    onMouseEnter={event => context.show(term, event.currentTarget, false)}
    onMouseLeave={() => context.hide()}
    onFocus={event => context.show(term, event.currentTarget, false)}
    onBlur={() => context.hide()}
    onClick={event => (context.pinnedTerm === term ? context.hide(true) : context.show(term, event.currentTarget, true))}
  >{term}</button>;
};

/** 본문 문자열: 수치는 강조색, 용어는 툴팁 버튼으로 바꾼다. */
export const Gf2Text: React.FC<{ text: string; terms?: boolean }> = ({ text, terms = true }) => {
  const context = useContext(TermContext);
  const pattern = terms && context?.pattern ? context.pattern : new RegExp(`(${NUMBER})`, 'g');
  return <>{text.split(pattern).map((part, index) => {
    if (index % 2 === 0) return part;
    if (terms && context?.terms.has(part)) return <Term key={index} term={part} />;
    return <span key={index} className="font-bold tabular-nums text-orange-300">{part}</span>;
  })}</>;
};
