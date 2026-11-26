import React from 'react';
import { Home, Users } from 'lucide-react';
import { NavLink } from 'react-router';

const items = [
  { label: '허브 홈', path: '/gallery/gf2', icon: Home, end: true },
  { label: '인형 도감', path: '/gallery/gf2/dolls', icon: Users, end: false },
];

export const Gf2Sidebar: React.FC = () => <aside className="hidden lg:block">
  <div className="sticky top-[calc(5rem+var(--rira-page-header-height,0px))] space-y-3">
    <h2 className="mb-4 px-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">MENU</h2>
    <nav aria-label="소녀전선2 메뉴" className="space-y-1">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex w-full items-center gap-5 rounded-2xl border px-5 py-4 transition-colors ${isActive ? 'border-orange-400/20 bg-orange-400/10 text-orange-200' : 'border-transparent text-gray-400 hover:bg-white/[0.05]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300`}>
      {({ isActive }) => <><span className={`rounded-xl p-2.5 ${isActive ? 'bg-orange-500 text-black' : 'bg-white/5'}`}><Icon size={14} aria-hidden="true" /></span><span className="flex-1 text-left text-sm font-black tracking-tight">{label}</span></>}
    </NavLink>)}</nav>
  </div>
</aside>;

export const Gf2MobileNav: React.FC = () => <nav aria-label="소녀전선2 메뉴" className="overflow-x-auto border-b border-white/10 bg-[#0d0d0d] lg:hidden">
  <div className="mx-auto flex min-w-max gap-2 px-4 py-3">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black ${isActive ? 'border-orange-400/30 bg-orange-400/15 text-orange-100' : 'border-white/5 bg-white/[0.03] text-gray-400'}`}><Icon size={14} aria-hidden="true" />{label}</NavLink>)}</div>
</nav>;

/** 직업·속성·탄종 아이콘 + 글자. 색만으로 구분하지 않도록 항상 글자를 함께 쓴다. */
export const Gf2Tag: React.FC<{ icon: string; label: string; strong?: boolean }> = ({ icon, label, strong }) => <span className={`inline-flex items-center gap-1.5 ${strong ? 'text-base font-bold text-white' : 'text-sm font-semibold text-gray-200'}`}>
  <img src={icon} alt="" width={strong ? 24 : 18} height={strong ? 24 : 18} loading="lazy" referrerPolicy="no-referrer" className="shrink-0 object-contain" onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />{label}
</span>;

export const GF2_PRIVATE_NOTE = '준비 중인 허브입니다. 검색에 노출되지 않으며 내용은 계속 보완됩니다.';
