import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { Gf2MobileNav, Gf2Sidebar, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { GF2_DOLLS, GF2_ELEMENTS, GF2_JOBS, gf2DollPath, gf2ElementIcon, gf2JobIcon, gf2Portrait } from '../utils/gf2Data';

const weaponType = (weapon: string) => weapon.split('/')[0].replace(/\s+/g, '').trim();
const WEAPONS = [...new Set(GF2_DOLLS.map(doll => weaponType(doll.weapon)).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
const RARITIES = ['정예', '표준'];
const SORTS = [{ value: 'release', label: '출시순' }, { value: 'latest', label: '최신순' }, { value: 'name', label: '이름순' }];

const FilterRow: React.FC<{ label: string; param: string; values: readonly string[]; icon?: (value: string) => string; current: string; onPick: (param: string, value: string) => void }> = ({ label, param, values, icon, current, onPick }) => <div className="grid gap-2 border-b border-white/5 py-3 sm:grid-cols-[72px_minmax(0,1fr)] sm:items-center">
  <span className="text-sm font-bold text-gray-400">{label}</span>
  <div className="flex flex-wrap gap-2" role="group" aria-label={`${label} 필터`}>
    {['', ...values].map(value => {
      const active = current === value;
      return <button key={value || 'all'} type="button" aria-pressed={active} onClick={() => onPick(param, value)} className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 ${active ? 'border-orange-400 bg-orange-400 text-black' : 'border-white/10 text-gray-300 hover:border-white/25 hover:text-white'}`}>
        {value && icon && <img src={icon(value)} alt="" width={20} height={20} referrerPolicy="no-referrer" />}{value || '전체'}
      </button>;
    })}
  </div>
</div>;

const DollsGF2: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const job = params.get('job') || '';
  const element = params.get('element') || '';
  const rarity = params.get('rarity') || '';
  const weapon = params.get('weapon') || '';
  const sort = params.get('sort') || 'release';

  const update = (key: string, value: string) => setParams(prev => {
    const next = new URLSearchParams(prev);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });

  const list = useMemo(() => {
    const query = search.trim();
    const filtered = GF2_DOLLS.filter(doll => (!query || doll.name.includes(query)) && (!job || doll.job === job) && (!element || doll.element === element) && (!rarity || doll.rarity === rarity) && (!weapon || weaponType(doll.weapon) === weapon));
    if (sort === 'latest') return [...filtered].reverse();
    if (sort === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    return filtered;
  }, [search, job, element, rarity, weapon, sort]);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="소녀전선2 인형 도감" url="/gallery/gf2/dolls" noindex />
    <PageHeader gameId="gf2" category="허브" categoryUrl="/gallery/gf2" title="인형 도감" />
    <Gf2MobileNav />
    <main className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-4 pb-24 pt-10 sm:px-6 md:px-8 lg:grid-cols-[240px_minmax(0,1fr)]">
      <Gf2Sidebar />
      <div className="min-w-0">
        <p role="note" className="mb-6 rounded-2xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>
        <h1 className="text-3xl font-black">인형 도감</h1>
        <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-gray-300">직업, 위상 속성, 레어도와 무기 종류로 인형을 찾을 수 있습니다. 카드를 누르면 스킬과 육성 정보로 이동합니다.</p>

        <label className="relative mt-6 block max-w-xl">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-gray-400" />
          <input type="search" value={search} onChange={event => update('search', event.target.value)} placeholder="인형 이름으로 검색" aria-label="인형 이름으로 검색" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-base text-white placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300" />
        </label>

        <div className="mt-4">
          <FilterRow label="레어도" param="rarity" values={RARITIES} current={rarity} onPick={update} />
          <FilterRow label="직업" param="job" values={GF2_JOBS} icon={gf2JobIcon} current={job} onPick={update} />
          <FilterRow label="속성" param="element" values={GF2_ELEMENTS} icon={gf2ElementIcon} current={element} onPick={update} />
          <FilterRow label="무기" param="weapon" values={WEAPONS} current={weapon} onPick={update} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-base font-bold text-gray-400" aria-live="polite"><span className="tabular-nums text-white">{list.length}</span>명</p>
          <select value={sort} onChange={event => update('sort', event.target.value === 'release' ? '' : event.target.value)} aria-label="정렬" className="h-11 rounded-xl border border-white/10 bg-[#121212] px-3 text-sm font-bold text-gray-200">
            {SORTS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        {list.length === 0 ? <p className="mt-10 rounded-xl border border-white/10 px-4 py-6 text-sm text-gray-300">조건에 맞는 인형이 없습니다. 필터를 하나씩 해제해 보세요.</p>
          : <ul className="mt-4 grid grid-cols-2 gap-2.5 xs:grid-cols-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">{list.map((doll, index) => <li key={doll.name}>
            <Link to={gf2DollPath(doll.name)} className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] transition duration-500 hover:border-orange-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
              <img src={gf2Portrait(doll)} alt={doll.name + " 일러스트"} loading={index < 4 ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 z-10 w-full p-3">
                <div className="flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="mb-1 truncate text-sm font-bold leading-none text-white drop-shadow-md">{doll.name}</h2>
                    <p className="text-xs text-gray-400">{doll.job} · {doll.element}</p>
                  </div>
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-xs font-black ${doll.rarity === '정예' ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'}`}>{doll.rarity}</span>
                </div>
              </div>
            </Link>
          </li>)}</ul>}
      </div>
    </main>
  </div>;
};

export default DollsGF2;
