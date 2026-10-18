import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Search } from 'lucide-react';

interface HubIntroProps {
  title: string;
  description: string;
  stats: Array<{ label: string; value: number }>;
  searchPath: string;
  searchLabel: string;
  links: Array<{ label: string; to: string }>;
}

/** Shared hub rhythm; each game supplies its own priorities and real destinations. */
export default function HubIntro({ title, description, stats, searchPath, searchLabel, links }: HubIntroProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  return <section className="space-y-5 border-b border-white/10 pb-6">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h1>
      <p className="text-sm leading-6 text-gray-400">{description}</p>
    </div>
    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
      {stats.map(stat => <div key={stat.label} className="flex items-baseline gap-2">
        <dt>{stat.label}</dt><dd className="text-sm font-bold tabular-nums text-white">{stat.value}</dd>
      </div>)}
    </dl>
    <form className="flex gap-2" role="search" aria-label={searchLabel} onSubmit={event => {
      event.preventDefault();
      const [pathname, rawParams = ''] = searchPath.split('?');
      const params = new URLSearchParams(rawParams);
      if (query.trim()) params.set('search', query.trim());
      navigate(`${pathname}${params.size ? `?${params}` : ''}`);
    }}>
      <label className="relative min-w-0 flex-1">
        <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-gray-400" />
        <input type="search" aria-label={searchLabel} placeholder={searchLabel} value={query} onChange={event => setQuery(event.target.value)} className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-sm text-white placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300" />
      </label>
      <button type="submit" className="h-12 shrink-0 rounded-xl border border-white/15 px-4 text-sm font-bold text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300">검색</button>
    </form>
    <nav aria-label={`${title} 바로가기`} className="flex flex-wrap gap-2">
      {links.map(link => <Link key={link.to} to={link.to} className="inline-flex min-h-11 items-center rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300">{link.label}</Link>)}
    </nav>
  </section>;
}
