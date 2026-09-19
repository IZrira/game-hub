import React from 'react';
import { Home, MapPin, PawPrint, Swords } from 'lucide-react';
import { NavLink } from 'react-router';

const items = [
  { label: '허브 홈', path: '/gallery/aniimo', icon: Home, end: true },
  { label: '애니모 도감', path: '/gallery/aniimo/characters', icon: PawPrint },
  { label: '원소 상성표', path: '/gallery/aniimo/type-chart', icon: Swords },
  { label: '지역별 도감', path: '/gallery/aniimo/locations', icon: MapPin },
];

export const AniimoSidebar: React.FC = () => <aside className="hidden space-y-12 lg:block"><div className="sticky top-20 space-y-3"><h2 className="mb-4 px-4 text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">MENU</h2><nav className="space-y-1">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex w-full items-center gap-5 rounded-2xl border px-5 py-4 transition-all ${isActive ? 'border-violet-400/20 bg-violet-400/10 text-violet-300' : 'border-transparent text-gray-400 hover:bg-white/[0.05]'}`}>{({ isActive }) => <><span className={`rounded-xl p-2.5 ${isActive ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/50' : 'bg-white/5'}`}><Icon size={14} /></span><span className="flex-1 text-left text-[14px] font-black tracking-tight">{label}</span></>}</NavLink>)}</nav></div></aside>;

export const AniimoMobileNav: React.FC = () => <nav aria-label="애니모 메뉴" className="overflow-x-auto border-b border-white/10 bg-[#0d0d0d] lg:hidden"><div className="mx-auto flex min-w-max gap-2 px-4 py-3">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black ${isActive ? 'border-violet-400/30 bg-violet-400/15 text-violet-200' : 'border-white/5 bg-white/[0.03] text-gray-400'}`}><Icon size={14} />{label}</NavLink>)}</div></nav>;

export default AniimoSidebar;
