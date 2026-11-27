import React from 'react';
import { Home, PawPrint, Sparkles, Users } from 'lucide-react';
import { NavLink } from 'react-router';

const items = [
  { label: '허브 홈', path: '/gallery/azur', icon: Home, end: true },
  { label: '캐릭터 도감', path: '/gallery/azur/characters', icon: Users, end: false },
  { label: '키보 도감', path: '/gallery/azur/kibo', icon: PawPrint, end: false },
  { label: '원소 상성', path: '/gallery/azur/elements', icon: Sparkles, end: false },
];

export const AzurSidebar: React.FC = () => <aside className="hidden lg:block">
  <div className="sticky top-[calc(5rem+var(--rira-page-header-height,0px))] space-y-3">
    <h2 className="mb-4 px-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">MENU</h2>
    <nav aria-label="아주르 프로밀리아 메뉴" className="space-y-1">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex w-full items-center gap-5 rounded-2xl border px-5 py-4 transition-colors ${isActive ? 'border-sky-400/20 bg-sky-400/10 text-sky-200' : 'border-transparent text-gray-400 hover:bg-white/[0.05]'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300`}>
      {({ isActive }) => <><span className={`rounded-xl p-2.5 ${isActive ? 'bg-sky-400 text-black' : 'bg-white/5'}`}><Icon size={14} aria-hidden="true" /></span><span className="flex-1 text-left text-sm font-black tracking-tight">{label}</span></>}
    </NavLink>)}</nav>
  </div>
</aside>;

export const AzurMobileNav: React.FC = () => <nav aria-label="아주르 프로밀리아 메뉴" className="overflow-x-auto border-b border-white/10 bg-[#0d0d0d] lg:hidden">
  <div className="mx-auto flex min-w-max gap-2 px-4 py-3">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex min-h-11 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black ${isActive ? 'border-sky-400/30 bg-sky-400/15 text-sky-100' : 'border-white/5 bg-white/[0.03] text-gray-400'}`}><Icon size={14} aria-hidden="true" />{label}</NavLink>)}</div>
</nav>;

/** 원소·직업 아이콘 + 글자. 아이콘이 없으면 글자만 남긴다. */
export const AzurTag: React.FC<{ icon: string; label: string; strong?: boolean }> = ({ icon, label, strong }) => <span className={`inline-flex items-center gap-1.5 ${strong ? 'text-base font-bold text-white' : 'text-sm font-semibold text-gray-200'}`}>
  <img src={icon} alt="" width={strong ? 24 : 18} height={strong ? 24 : 18} loading="lazy" referrerPolicy="no-referrer" className="shrink-0 object-contain" onError={event => { event.currentTarget.style.display = 'none'; }} />{label}
</span>;

export const AZUR_PRIVATE_NOTE = '준비 중인 허브입니다. 검색에 노출되지 않으며, 중국 CBT 자료 기준이라 정식 서비스와 다를 수 있습니다.';

export const AzurShell: React.FC<{ children: React.ReactNode }> = ({ children }) => <>
  <AzurMobileNav />
  <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
    <AzurSidebar />
    <div className="min-w-0 space-y-10">
      <p role="note" className="rounded-2xl border border-sky-400/20 bg-sky-400/5 px-4 py-3 text-sm text-sky-100">{AZUR_PRIVATE_NOTE}</p>
      {children}
    </div>
  </main>
</>;
