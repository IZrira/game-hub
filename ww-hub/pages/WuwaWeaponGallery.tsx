import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { getGameData } from '../../common-hub/data/dataManager';
import { WuwaWeapon } from './weapon';
import WuwaWeaponCard from './WuwaWeaponCard';

import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { useTranslation } from 'react-i18next';

const WuwaWeaponGallery = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('전체');
  const [selectedRarity, setSelectedRarity] = useState<number | '전체'>('전체');

  // 통합 getGameData를 사용해 중복 제거 및 노션 데이터 반영
  const { WEAPON_DATA } = useMemo(() => getGameData('ww'), []);

  const filteredWeapons = useMemo(() => {
    const filtered = (WEAPON_DATA as unknown as WuwaWeapon[]).filter(w => {
      const matchSearch = w.name.includes(search);
      const matchType = selectedType === '전체' || w.type === selectedType;
      const matchRarity = selectedRarity === '전체' || w.rarity === selectedRarity;
      return matchSearch && matchType && matchRarity;
    });

    return filtered.sort((a, b) => {
      // 1. 버전 내림차순 정렬
      const vA = parseFloat(a.releaseVersion) || 0;
      const vB = parseFloat(b.releaseVersion) || 0;
      if (vA !== vB) return vB - vA;

      // 2. 3.4 버전 특수 정렬 (프리즈 프레임 -> 스컬 스래셔 -> 스펙트럴 트리거)
      if (a.releaseVersion === '3.4' && b.releaseVersion === '3.4') {
        const order = ['프리즈 프레임', '스컬 스래셔', '스펙트럴 트리거'];
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
      }

      // 3. 성급 내림차순 정렬
      if (a.rarity !== b.rarity) return b.rarity - a.rarity;

      // 4. 이름 오름차순 정렬
      return a.name.localeCompare(b.name, 'ko-KR');
    });
  }, [search, selectedType, selectedRarity, WEAPON_DATA]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO title="무기 도감 | 명조 아카이브" description="명조: 워더링 웨이브의 무기 정보를 확인하세요." />
      <PageHeader gameId="ww" category={t("무기")} title={t("무기 도감")} />
      
      {/* 1. 헤더 영역 그리드 */}
      <header className="max-w-[1440px] mx-auto px-6 md:px-12 pt-10 pb-12 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 w-full md:w-auto">
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Archive: Weapons</h1>
          <div className="flex flex-wrap gap-2">
            {['전체', '직검', '대검', '권총', '권갑', '증폭기'].map(t => (
              <button 
                key={t}
                onClick={() => setSelectedType(t)}
                className={`h-11 px-5 rounded-full text-[11px] font-black transition-all min-w-[44px] flex items-center justify-center ${selectedType === t ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors" size={18} />
          <input 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="무기 명칭 검색..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white font-bold focus:border-brand-primary outline-none transition-all"
          />
        </div>
      </div>
      </header>

      {/* 2. 메인 카드 그리드 (핵심 최적화) */}
      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {filteredWeapons.map(weapon => (
          <WuwaWeaponCard key={weapon.id} weapon={weapon} onClick={() => navigate(`/gallery/ww/weapon/${encodeURIComponent(weapon.name)}`)} />
        ))}
      </div>
      </main>
    </div>
  );
};

export default WuwaWeaponGallery;