import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Layers } from 'lucide-react';
import { WEAPON_DATA } from '../data/weapons';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import { renderRichText, formatDescriptionByRank } from './formatter';

const WuwaWeaponDetail = () => {
  const params = useParams();
  const routeParam = params.lcName || params.weaponName || params.name || params.id || Object.values(params).pop() || '';
  const targetName = String(routeParam).normalize('NFC');
  const [rank, setRank] = useState<number>(1);

  const weapon = WEAPON_DATA.find(w => w.name.normalize('NFC') === targetName);
  
  const theme = { primary: '#EAB308', secondary: '#FDE047', shadow: 'rgba(234, 179, 8, 0.4)' };

  if (!weapon) return <div className="p-20 text-center text-white font-black uppercase italic">Weapon not found. ({targetName})</div>;

  const getIllustrationUrl = () => {
    return encodeURI(`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww images/Weapons/${weapon.name.normalize('NFC')}.webp`);
  };

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] text-white pb-24 font-sans selection:bg-brand-primary">
      <SEO 
        title={`${weapon.name} 정보`} 
        description={`${weapon.name}의 상세 스탯, 무기 스킬, 스토리를 확인하세요.`}
        name={weapon.name}
        image={getIllustrationUrl()}
      />
      <PageHeader gameId="ww" category="무기" title={weapon.name} />

      {/* 메인 컨테이너 그리드 */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20 items-start">
          
          {/* [LEFT] 비주얼 섹션 (5/12 차지) */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 space-y-12 max-w-xl mx-auto lg:max-w-none w-full">
            <div className="aspect-square bg-white/[0.02] border border-white/5 rounded-[60px] p-12 relative overflow-hidden shadow-inner group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src={getIllustrationUrl()} 
              alt={`${weapon.name} 아이콘`}
              width="800"
              height="800"
              style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-700" 
            />
          </div>

            {/* 스토리 그리드: 흐리게 처리하여 정보 위계를 낮춤 */}
            {weapon.description && (
              <div className="px-4 space-y-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Weapon Story</h4>
                <p className="text-sm leading-relaxed italic break-keep text-gray-400 whitespace-pre-line">{weapon.description}</p>
              </div>
            )}
          </aside>

          {/* [RIGHT] 정보 섹션 (7/12 차지) */}
          <main className="lg:col-span-7 space-y-16 break-keep">
            {/* 타이틀 및 핵심 스탯 그리드 (2열) */}
            <section className="space-y-10 border-b border-white/5 pb-16">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="px-5 py-1.5 rounded-xl text-[11px] font-black uppercase border backdrop-blur-md bg-brand-primary/15 text-brand-primary border-brand-primary/40">{weapon.type}</span>
                  <div className="flex gap-1.5 items-center bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                    {Array.from({ length: weapon.rarity }).map((_, i) => (<Star key={i} size={14} fill={theme.primary} style={{ color: theme.primary }} />))}
                  </div>
                </div>
              </div>
              
              <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black italic tracking-tighter uppercase leading-none">{weapon.name}</h2>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-2 hover:bg-white/10 transition-colors">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Base ATK (Lv.90)</p>
                  <p className="text-4xl font-black italic text-white">{weapon.stats.atk}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-2 hover:bg-white/10 transition-colors">
                  <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{weapon.stats.subStatName}</p>
                  <p className="text-4xl font-black text-brand-accent italic">{weapon.stats.subStatValue}</p>
                </div>
              </div>
            </section>

            {/* 재련 정보 섹션 (강조 그리드) */}
            {weapon.skill && (
              <section className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-l-4 border-brand-primary pl-6">
                  <h3 className="text-xl font-black uppercase tracking-widest italic flex flex-col gap-1">
                    <span className="text-[10px] text-gray-500 tracking-[0.3em]">Resonance Effect</span>
                    {weapon.skill.name}
                  </h3>
                  
                  {/* 1~5중첩 선택 스위치 */}
                  <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shrink-0">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => setRank(v)}
                        className={`h-11 min-w-[44px] px-4 rounded-xl text-xs font-black transition-all flex items-center justify-center ${rank === v ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}
                      >
                        R{v}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#111] border border-white/10 rounded-[48px] p-10 md:p-14 shadow-2xl relative overflow-hidden group hover:border-brand-primary/30 transition-colors duration-500">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                    <Layers size={120} />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 rounded-[48px] blur-xl opacity-0 group-hover:opacity-100 transition duration-1000" />
                  
                  <div className="relative z-10 text-xl md:text-2xl leading-relaxed font-medium italic text-gray-200 whitespace-pre-line break-keep">
                    {renderRichText(formatDescriptionByRank(weapon.skill.description, rank))}
                  </div>
                </div>
              </section>
            )}

            <AdPlaceholder type="leaderboard" className="mt-16 mb-8" />
          </main>
        </div>
      </div>
    </div>
  );
};

export default WuwaWeaponDetail;