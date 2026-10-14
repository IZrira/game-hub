import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, ChevronDown, List, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { handleImageFallback } from '../../utils/assetManager';
import { isNotionUrl, sanitizePublicGuideText } from '../../utils/publicGuideLinks';
import './guide-layout.css';
import type { GuideEquipment } from './GuideContent';

interface Heading { id: string; text: string }

export function GuideLayout({ children, navigationKey = '' }: { children: React.ReactNode; navigationKey?: string }) {
  const content = useRef<HTMLDivElement>(null);
  const column = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const mobile = useRef<HTMLDetailsElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const root = content.current;
    if (!root) return;
    let frame = 0;
    const scan = () => {
      const next = Array.from(root.querySelectorAll('h2')).map((heading, index) => {
        if (!heading.id) heading.id = `guide-section-${index + 1}`;
        return { id: heading.id, text: heading.textContent?.trim() || '' };
      }).filter(heading => heading.text);
      setHeadings(previous => JSON.stringify(previous) === JSON.stringify(next) ? previous : next);
    };
    scan();
    const observer = new MutationObserver(() => { cancelAnimationFrame(frame); frame = requestAnimationFrame(scan); });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [navigationKey]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    headings.forEach(heading => { const node = document.getElementById(heading.id); if (node) observer.observe(node); });
    if (!headings.some(heading => heading.id === active)) setActive(headings[0]?.id || '');
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    let frame = 0;
    const position = () => {
      if (!column.current || !panel.current) return;
      if (innerWidth < 1024) { panel.current.style.position = ''; return; }
      const bounds = column.current.getBoundingClientRect();
      // Layout's horizontal clipping prevents native sticky from tracking the window.
      panel.current.style.position = 'fixed';
      panel.current.style.left = `${bounds.left}px`;
      panel.current.style.top = `${Math.min(Math.max(136, bounds.top), bounds.bottom - panel.current.offsetHeight)}px`;
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(position); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, [navigationKey, headings]);

  const moveTo = (event: React.MouseEvent, heading: Heading) => {
    event.preventDefault();
    const node = document.getElementById(heading.id);
    if (!node) return;
    // Collapse before measuring: closing the mobile menu changes section positions.
    if (mobile.current) mobile.current.open = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: node.getBoundingClientRect().top + scrollY - 136, behavior: reduced ? 'instant' : 'smooth' });
    node.tabIndex = -1;
    node.focus({ preventScroll: true });
    window.history.replaceState(window.history.state, '', `${location.pathname}${location.search}#${encodeURIComponent(heading.id)}`);
    setActive(heading.id);
  };
  const navigation = <nav aria-label="공략 섹션 이동" className="guide-navigation-list">{headings.map((heading, index) => <a key={heading.id} href={`#${encodeURIComponent(heading.id)}`} aria-current={active === heading.id ? 'location' : undefined} onClick={event => moveTo(event, heading)}><span>{String(index + 1).padStart(2, '0')}</span>{heading.text}<ArrowRight size={14} aria-hidden /></a>)}</nav>;

  return <div className="guide-page mx-auto max-w-[1440px] px-4 pb-16 pt-5 sm:px-6 lg:px-8">
    {headings.length > 0 && <details ref={mobile} className="guide-mobile-navigation mb-5 lg:hidden"><summary><List size={17} aria-hidden />빠른 이동<ChevronDown size={16} aria-hidden /></summary>{navigation}</details>}
    <div className="flex gap-8">
      <div ref={content} className="guide-content min-w-0 flex-1 space-y-8 sm:space-y-10">{children}</div>
      <aside ref={column} className="hidden w-60 shrink-0 lg:block" aria-label="공략 목차"><div ref={panel} className="w-60"><div className="guide-navigation-panel"><p className="mb-4 flex items-center gap-2 text-sm font-bold text-gray-200"><List size={16} aria-hidden />이 페이지</p>{navigation}</div></div></aside>
    </div>
  </div>;
}

export function GuideHero({ name, image, backTo, version, updatedAt, tags = [], description }: { name: string; image: string; backTo: string; version?: string; updatedAt?: string; tags?: string[]; description?: string }) {
  const { t } = useTranslation();
  const publicName = sanitizePublicGuideText(name);
  const publicVersion = version ? sanitizePublicGuideText(version).replace(/^v/i, '') : '';
  return <header className="guide-hero">
    <div className="flex min-w-0 items-center gap-4 sm:gap-5">
      {!isNotionUrl(image) && <img src={image} alt={publicName} onError={handleImageFallback} className="h-20 w-20 shrink-0 rounded-2xl border border-white/10 bg-black/30 object-cover object-top sm:h-24 sm:w-24" />}
      <div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-2">{tags.filter(Boolean).map((tag, index) => <span key={index} className="guide-tag">{sanitizePublicGuideText(tag)}</span>)}{publicVersion && <span className="guide-version">패치 {publicVersion}</span>}</div><h1 className="text-2xl font-black leading-tight tracking-tight sm:text-3xl">{publicName} <span className="font-semibold text-gray-400">공략</span></h1>{description && <p className="mt-2 text-sm leading-6 text-gray-300">{sanitizePublicGuideText(description)}</p>}{updatedAt && <p className="mt-2 text-xs font-medium text-gray-400">업데이트 {sanitizePublicGuideText(updatedAt)}</p>}</div>
    </div>
    {!isNotionUrl(backTo) && <Link to={backTo} className="guide-back-link"><ArrowLeft size={15} aria-hidden />{t('캐릭터 도감')}</Link>}
  </header>;
}

export function GuideSummary({ items }: { items: { label: string; value: string | { label?: string; value: string }[]; note?: string }[] }) {
  const shown = items.filter(item => Array.isArray(item.value) ? item.value.length > 0 : Boolean(item.value));
  return <section aria-label="추천 세팅 요약" className="guide-summary"><div className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-100"><Star size={15} className="text-violet-300" aria-hidden />추천 세팅 한눈에 보기</div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{shown.map((item, index) => <div key={index} className={`guide-summary-item ${index >= 2 ? 'col-span-2' : ''} ${shown.length === 4 && index === 3 ? 'sm:col-span-3' : 'sm:col-span-1'}`}><span className="mb-1 block text-xs font-semibold text-gray-400">{sanitizePublicGuideText(item.label)}</span>{Array.isArray(item.value) ? <ul className="guide-summary-values">{item.value.map((row, rowIndex) => <li key={rowIndex}>{row.label && <span>{sanitizePublicGuideText(row.label)}</span>}<strong>{sanitizePublicGuideText(row.value)}</strong></li>)}</ul> : <p className="break-words text-sm font-bold leading-6 text-white">{sanitizePublicGuideText(item.value)}</p>}{item.note && <p className="mt-1 text-xs leading-5 text-gray-300">{sanitizePublicGuideText(item.note)}</p>}</div>)}</div></section>;
}

export function GuideVariantSelector({ label, options, value, onChange, description }: { label: string; options: { label: string; value: string }[]; value: string; onChange: (value: string) => void; description?: string }) {
  const publicLabel = sanitizePublicGuideText(label);
  return <section className="guide-variant-selector" aria-label={publicLabel}><div className="mb-3"><p className="text-sm font-bold text-white">{publicLabel}</p>{description && <p className="mt-1 text-xs leading-5 text-gray-300">{sanitizePublicGuideText(description)}</p>}</div><div className="flex flex-wrap gap-2" role="group" aria-label={publicLabel}>{options.map(option => <button key={option.value} type="button" aria-pressed={value === option.value} onClick={() => onChange(option.value)} className="guide-choice">{sanitizePublicGuideText(option.label)}</button>)}</div></section>;
}

export function GuideSectionHeader({ num, title }: { num: string; title: string; theme?: unknown }) {
  const { t } = useTranslation();
  return <div className="guide-section-heading"><span aria-hidden>{num}</span><h2>{sanitizePublicGuideText(t(title, { keySeparator: false, nsSeparator: false }))}</h2></div>;
}

export function GuideEquipmentCard({ name, image, to, rank, note, badges, effects, alternatives }: GuideEquipment) {
  const body = <><div className="guide-equipment-heading"><div className="guide-equipment-image">{image && !isNotionUrl(image) && <img src={image} alt={sanitizePublicGuideText(name)} loading="lazy" onError={handleImageFallback} />}</div><div className="min-w-0 flex-1"><div className="mb-2 flex flex-wrap items-center gap-2">{rank !== undefined && <span className="guide-rank">{rank}순위</span>}{rank === 1 && <span className="text-xs font-semibold text-violet-200">우선 추천</span>}{badges?.map((badge, index) => <span key={index} className="guide-tag">{sanitizePublicGuideText(badge)}</span>)}</div><h4 className="guide-item-name">{sanitizePublicGuideText(name)}</h4>{to && !isNotionUrl(to) && <span className="mt-2 inline-flex items-center gap-1 text-xs text-gray-400">장비 정보<ArrowRight size={12} aria-hidden /></span>}</div></div>
    {note && <p className="guide-copy guide-equipment-note">{sanitizePublicGuideText(note)}</p>}
    {effects?.length ? <dl className="guide-equipment-effects">{effects.map((effect, index) => <div key={index}><dt className="guide-field-label">{sanitizePublicGuideText(effect.label)}</dt><dd className="guide-copy">{sanitizePublicGuideText(effect.value)}</dd></div>)}</dl> : null}
    {alternatives?.length ? <div className="guide-equipment-alternatives"><p className="guide-field-label">선택 가능한 세트</p><ul className="guide-value-list">{alternatives.map((item, index) => <li key={index}>{item.image && !isNotionUrl(item.image) && <img src={item.image} alt="" loading="lazy" onError={handleImageFallback} />}<span>{sanitizePublicGuideText(item.name)}</span></li>)}</ul></div> : null}
  </>;
  const className = `guide-equipment-card ${rank === 1 ? 'guide-equipment-best' : ''}`;
  return to && !isNotionUrl(to) ? <Link to={to} className={className}>{body}</Link> : <div className={className}>{body}</div>;
}
