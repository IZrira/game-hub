import React from 'react';
import { Home, MapPin, PawPrint, Swords } from 'lucide-react';
import { NavLink } from 'react-router';

const items = [
  { label: '허브 홈', path: '/gallery/aniimo', icon: Home, end: true },
  { label: '애니모 도감', path: '/gallery/aniimo/characters', icon: PawPrint },
  { label: '원소 상성표', path: '/gallery/aniimo/type-chart', icon: Swords },
  { label: '지역별 도감', path: '/gallery/aniimo/locations', icon: MapPin },
];

const itemClass = ({ isActive }: { isActive: boolean }) => `flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-black transition ${isActive ? 'border-violet-400/30 bg-violet-400/15 text-violet-200' : 'border-transparent text-gray-400 hover:bg-white/5 hover:text-white'}`;

export const AniimoSidebar: React.FC = () => <aside className="hidden lg:block"><div className="sticky top-36 rounded-3xl border border-white/10 bg-[#121212] p-3"><p className="px-4 pb-3 pt-2 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">Aniimo Menu</p><nav className="space-y-1">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={itemClass}><Icon size={16} />{label}</NavLink>)}</nav></div></aside>;

export const AniimoMobileNav: React.FC = () => <nav aria-label="애니모 메뉴" className="overflow-x-auto border-b border-white/10 bg-[#0d0d0d] lg:hidden"><div className="mx-auto flex min-w-max gap-2 px-4 py-3">{items.map(({ label, path, icon: Icon, end }) => <NavLink key={path} to={path} end={end} className={({ isActive }) => `flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black ${isActive ? 'border-violet-400/30 bg-violet-400/15 text-violet-200' : 'border-white/5 bg-white/[0.03] text-gray-400'}`}><Icon size={14} />{label}</NavLink>)}</div></nav>;

export default AniimoSidebar;
