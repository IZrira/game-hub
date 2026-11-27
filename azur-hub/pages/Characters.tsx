import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Search } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AzurShell } from '../components/AzurNavigation';
import { AZUR_CHARACTERS, AZUR_ELEMENTS, AZUR_JOBS, azurCharacterPath, azurElementIcon, azurJobIcon, azurPortrait, isFilled } from '../utils/azurData';

const FilterRow: React.FC<{ label: string; param: string; values: readonly string[]; icon?: (value: string) => string; current: string; onPick: (param: string, value: string) => void }> = ({ label, param, values, icon, current, onPick }) => <div className="grid gap-2 border-b border-white/5 py-3 sm:grid-cols-[72px_minmax(0,1fr)] sm:items-center">
  <span className="text-sm font-bold text-gray-400">{label}</span>
  <div className="flex flex-wrap gap-2" role="group" aria-label={`${label} 필터`}>
    {['', ...values].map(value => {
      const active = current === value;
      return <button key={value || 'all'} type="button" aria-pressed={active} onClick={() => onPick(param, value)} className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${active ? 'border-sky-400 bg-sky-400 text-black' : 'border-white/10 text-gray-300 hover:border-white/25 hover:text-white'}`}>
        {value && icon && <img src={icon(value)} alt="" width={20} height={20} referrerPolicy="no-referrer" />}{value || '전체'}
      </button>;
    })}
  </div>
</div>;

/** 일러스트가 아직 없는 캐릭터는 이름 첫 글자를 보여 준다. */
const Portrait: React.FC<{ name: string; eager: boolean }> = ({ name, eager }) => {
  const [failed, setFailed] = useState(false);
  return failed ? <span aria-hidden className="absolute inset-0 grid place-items-center bg-gradient-to-b from-[#13202a] to-[#0a0a0a] text-4xl font-black text-sky-200/40">{name.slice(0, 1)}</span>
    : <img src={azurPortrait(name)} alt={`${name} 일러스트`} loading={eager ? 'eager' : 'lazy'} decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} className="absolute inset-0 h-full w-full object-cover object-top transition duration-700 group-hover:scale-110" />;
};

const CharactersAzur: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const search = params.get('search') || '';
  const job = params.get('job') || '';
  const element = params.get('element') || '';
  const update = (key: string, value: string) => setParams(prev => {
    const next = new URLSearchParams(prev);
    if (value) next.set(key, value); else next.delete(key);
    return next;
  }, { replace: true });

  const list = useMemo(() => AZUR_CHARACTERS.filter(character => (!search.trim() || character.name.includes(search.trim())) && (!job || character.job === job) && (!element || character.elements.includes(element))), [search, job, element]);

  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="아주르 프로밀리아 캐릭터 도감" url="/gallery/azur/characters" noindex />
    <PageHeader gameId="azur" category="허브" categoryUrl="/gallery/azur" title="캐릭터 도감" />
    <AzurShell>
      <div>
        <h1 className="text-3xl font-black">캐릭터 도감</h1>
        <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-gray-300">공식 캐릭터 게시판에 공개된 순서대로 정리했습니다. 「정리 전」 캐릭터는 이름만 등록되어 있으며 차례로 채워 갑니다.</p>

        <label className="relative mt-6 block max-w-xl">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-gray-400" />
          <input type="search" value={search} onChange={event => update('search', event.target.value)} placeholder="캐릭터 이름으로 검색" aria-label="캐릭터 이름으로 검색" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-base text-white placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300" />
        </label>
        <div className="mt-4">
          <FilterRow label="직업" param="job" values={AZUR_JOBS} icon={azurJobIcon} current={job} onPick={update} />
          <FilterRow label="원소" param="element" values={AZUR_ELEMENTS} icon={azurElementIcon} current={element} onPick={update} />
        </div>
        <p className="mt-5 text-base font-bold text-gray-400" aria-live="polite"><span className="tabular-nums text-white">{list.length}</span>명</p>

        {list.length === 0 ? <p className="mt-6 rounded-xl border border-white/10 px-4 py-6 text-base text-gray-300">조건에 맞는 캐릭터가 없습니다. 아직 직업·원소가 정리되지 않은 캐릭터는 필터에 잡히지 않습니다.</p>
          : <ul className="mt-4 grid grid-cols-2 gap-2.5 xs:grid-cols-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">{list.map((character, index) => {
            const ready = isFilled(character);
            return <li key={character.name}>
              <Link to={azurCharacterPath(character.name)} className="group relative block aspect-[3/4] overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] transition duration-500 hover:border-sky-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300">
                <Portrait name={character.name} eager={index < 4} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 w-full p-3">
                  <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <h2 className="mb-1 truncate text-sm font-bold leading-none text-white drop-shadow-md">{character.name}</h2>
                      <p className="text-xs text-gray-400">{ready ? [character.job, ...character.elements].join(' · ') : '정리 전'}</p>
                    </div>
                    {character.rarity && <span className="shrink-0 rounded bg-sky-500/20 px-1.5 py-0.5 text-xs font-black text-sky-200">{character.rarity}</span>}
                  </div>
                </div>
              </Link>
            </li>;
          })}</ul>}
      </div>
    </AzurShell>
  </div>;
};

export default CharactersAzur;
