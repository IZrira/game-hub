import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { AzurShell } from '../components/AzurNavigation';
import { AZUR_KIBO, azurKiboImage } from '../utils/azurData';
import type { AzurKibo } from '../types';

/** 이색·특수 그림이 있으면 버튼으로 바꿔 본다. */
const KiboCard: React.FC<{ kibo: AzurKibo }> = ({ kibo }) => {
  const [variant, setVariant] = useState(0);
  const current = kibo.variants[variant] || kibo.variants[0];
  return <li className="flex flex-col rounded-2xl border border-white/10 bg-[#121212] p-3">
    <div className="aspect-square rounded-xl bg-gradient-to-b from-[#13202a] to-[#0d0d0d] p-2">
      <img src={azurKiboImage(current.file)} alt={`${kibo.name} ${current.label}`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-contain" />
    </div>
    <p className="mt-3 text-xs font-bold tabular-nums text-sky-300">No.{String(kibo.no).padStart(3, '0')}</p>
    <h2 className="mt-0.5 truncate text-base font-black" title={kibo.name}>{kibo.name}</h2>
    {kibo.variants.length > 1 && <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`${kibo.name} 그림 선택`}>{kibo.variants.map((option, index) => <button key={option.file} type="button" aria-pressed={variant === index} onClick={() => setVariant(index)} className={`min-h-8 rounded-full border px-3 text-xs font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300 ${variant === index ? 'border-sky-400 bg-sky-400 text-black' : 'border-white/10 text-gray-300 hover:text-white'}`}>{option.label}</button>)}</div>}
  </li>;
};

const KiboAzur: React.FC = () => {
  const [search, setSearch] = useState('');
  const list = useMemo(() => AZUR_KIBO.filter(kibo => !search.trim() || kibo.name.includes(search.trim()) || String(kibo.no) === search.trim()), [search]);
  return <div className="min-h-[100dvh] bg-[#0a0a0a] text-white">
    <SEO title="아주르 프로밀리아 키보 도감" url="/gallery/azur/kibo" noindex />
    <PageHeader gameId="azur" category="허브" categoryUrl="/gallery/azur" title="키보 도감" />
    <AzurShell>
      <div>
        <h1 className="text-3xl font-black">키보 도감</h1>
        <p className="mt-2 max-w-[66ch] text-base leading-relaxed text-gray-300">도감 번호 순서입니다. 중국 CBT 기준이라 한국어 이름이 정해지지 않은 키보는 중국어 이름으로 적었습니다. 이색·특수 개체가 있는 키보는 버튼으로 그림을 바꿔 볼 수 있습니다.</p>
        <label className="relative mt-6 block max-w-xl">
          <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-gray-400" />
          <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="키보 이름이나 번호로 검색" aria-label="키보 이름이나 번호로 검색" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-3 text-base text-white placeholder:text-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300" />
        </label>
        <p className="mt-5 text-base font-bold text-gray-400" aria-live="polite"><span className="tabular-nums text-white">{list.length}</span>종</p>
        {list.length === 0 ? <p className="mt-6 rounded-xl border border-white/10 px-4 py-6 text-base text-gray-300">검색 결과가 없습니다.</p>
          : <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">{list.map(kibo => <KiboCard key={kibo.no} kibo={kibo} />)}</ul>}
      </div>
    </AzurShell>
  </div>;
};

export default KiboAzur;
