import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import LazyImage from '../../common-hub/components/LazyImage';
import { Gf2MobileNav, Gf2Sidebar, Gf2Tag, GF2_PRIVATE_NOTE } from '../components/Gf2Navigation';
import { GF2_DOLLS, GF2_ELEMENTS, GF2_JOBS, gf2DollPath, gf2ElementIcon, gf2JobIcon, gf2Portrait } from '../utils/gf2Data';

const weaponType = (weapon: string) => weapon.split('/')[0].replace(/\s+/g, '').trim();
const WEAPONS = [...new Set(GF2_DOLLS.map(doll => weaponType(doll.weapon)).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'ko'));
const RARITIES = ['정예', '표준'];
const SORTS = [{ value: 'release', label: '출시순' }, { value: 'latest', label: '최신순' }, { value: 'name', label: '이름순' }];

const FilterRow: React.FC<{ label: string; param: string; values: readonly string[]; icon?: (value: string) => string; current: string; onPick: (param: string, value: string) => void }> = ({ label, param, values, icon, current, onPick }) => <div className="grid gap-2 border-b border-white/5 py-3 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-center">
  <span className="text-xs font-bold text-gray-400">{label}</span>
  <div className="flex flex-wrap gap-2" role="group" aria-label={`${label} 필터`}>
    {['', ...values].map(value => {
      const active = current === value;
      return <button key={value || 'all'} type="button" aria-pressed={active} onClick={() => onPick(param, value)} className={`inline-flex min-h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 ${active ? 'border-orange-400 bg-orange-400 text-black' : 'border-white/10 text-gray-300 hover:border-white/25 hover:text-white'}`}>
        {value && icon && <img src={icon(value)} alt="" width={16} height={16} referrerPolicy="no-referrer" />}{value || '전체'}
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
        <p role="note" className="mb-6 rounded-xl border border-orange-400/20 bg-orange-400/5 px-4 py-3 text-sm text-orange-100">{GF2_PRIVATE_NOTE}</p>
        <h1 className="text-3xl font-black">인형 도감</h1>
        <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-gray-300">직업, 위상 속성, 레어도와 무기 종류로 인형을 찾을 수 있습니다. 카드를 누르면 스킬과 육성 정보로 이동합니다.</p>

        <label className="relative mt-6 block max-w-xl">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-gray-400" />
          <input type="search" value={search} onChange={event => update('search', event.target.value)} placeholder="인형 이름으로 검색" aria-label="인형 이름으로 검색" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-sm text-white placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300" />
        </label>

        <div className="mt-4">
          <FilterRow label="레어도" param="rarity" values={RARITIES} current={rarity} onPick={update} />
          <FilterRow label="직업" param="job" values={GF2_JOBS} icon={gf2JobIcon} current={job} onPick={update} />
          <FilterRow label="속성" param="element" values={GF2_ELEMENTS} icon={gf2ElementIcon} current={element} onPick={update} />
          <FilterRow label="무기" param="weapon" values={WEAPONS} current={weapon} onPick={update} />
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-bold text-gray-400" aria-live="polite"><span className="tabular-nums text-white">{list.length}</span>명</p>
          <select value={sort} onChange={event => update('sort', event.target.value === 'release' ? '' : event.target.value)} aria-label="정렬" className="h-9 rounded-lg border border-white/10 bg-[#121212] px-3 text-xs font-bold text-gray-300">
            {SORTS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        {list.length === 0 ? <p className="mt-10 rounded-xl border border-white/10 px-4 py-6 text-sm text-gray-300">조건에 맞는 인형이 없습니다. 필터를 하나씩 해제해 보세요.</p>
          : <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:gap-4">{list.map((doll, index) => <li key={doll.name}>
            <Link to={gf2DollPath(doll.name)} className="block overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition-colors hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-300">
              <div className="relative">
                <LazyImage src={gf2Portrait(doll)} alt="" loading={index < 8 ? 'eager' : 'lazy'} containerClassName="aspect-[3/4] bg-[#0f0f0f]" className="h-full w-full object-cover object-top" referrerPolicy="no-referrer" />
                <span className={`absolute left-2 top-2 rounded-md border bg-black/80 px-1.5 py-0.5 text-[11px] font-bold ${doll.rarity === '정예' ? 'border-orange-400/40 text-orange-300' : 'border-white/15 text-gray-300'}`}>{doll.rarity}</span>
              </div>
              <div className="space-y-1.5 px-3 pb-3 pt-2.5">
                <h2 className="text-base font-black">{doll.name}</h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1"><Gf2Tag icon={gf2JobIcon(doll.job)} label={doll.job} /><Gf2Tag icon={gf2ElementIcon(doll.element)} label={doll.element} /></div>
              </div>
            </Link>
          </li>)}</ul>}
      </div>
    </main>
  </div>;
};

export default DollsGF2;
