import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Star, Package, Copy, CheckCircle2, Compass, Shield, Zap, Sparkles, User } from 'lucide-react';
import { getGameData } from '../../common-hub/data/dataManager';
import PageHeader from '../../common-hub/components/PageHeader';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import SEO from '../../common-hub/components/SEO';
import { useTranslation } from 'react-i18next';
import ItemIcon from '../../common-hub/components/ItemIcon';
import ItemDetailModal from '../../common-hub/components/ItemDetailModal';
import MarkdownRenderer from '../../common-hub/components/MarkdownRenderer';
import { renderRichText, formatDescriptionByRank, cleanSkillParagraphs } from '../../ww-hub/data/formatter';

const LEVEL_STEPS = [1, 20, 30, 40, 50, 60, 70, 80];

const NTEArcDetail: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams();
  const routeParam = params.lcName || params.weaponName || params.arcName || params.name || params.id || Object.values(params).pop() || '';
  const targetName = String(routeParam).normalize('NFC');
  
  const [rankIdx, setRankIdx] = useState<number>(0);
  const [levelIdx, setLevelIdx] = useState<number>(7); // 기본 80Lv (최대)
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const { WEAPON_DATA } = useMemo(() => getGameData('nte'), []);
  const arc = WEAPON_DATA.find((w: any) => 
    (w.name || '').normalize('NFC') === targetName || 
    w.id === targetName || 
    t(w.name || '').normalize('NFC') === targetName
  );

  const getRarityTheme = (rarity: number | string) => {
    const r = String(rarity).toUpperCase();
    if (r === '5' || r === 'S') return { primary: '#EAB308', secondary: '#FDE047', label: 'S' };
    if (r === '4' || r === 'A') return { primary: '#A855F7', secondary: '#D8B4FE', label: 'A' };
    return { primary: '#3B82F6', secondary: '#93C5FD', label: 'B' };
  };

  const theme = getRarityTheme(arc?.rarity || 'A');

  if (!arc) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="p-20 text-center text-white font-black uppercase italic opacity-20 tracking-widest text-2xl">
          Arc not found. ({targetName})
        </div>
      </div>
    );
  }

  const getIllustrationUrl = () => {
    return encodeURI(`https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte images/arcs/${t(arc.name).normalize('NFC')}.webp`);
  };

  // 현재 레벨의 스탯 계산
  const targetLevel = LEVEL_STEPS[levelIdx];
  const levelStat = arc.baseStats?.[targetLevel] || {
    atk: Math.round((arc.stats?.atk || 395) * (targetLevel / 80)),
    subStatName: arc.stats?.subStatName || '방어력',
    subStatValue: arc.stats?.subStatValue || '52.5%'
  };

  // 재료 목록
  const materialsList: { name: string; count: number }[] = arc.materials && arc.materials.length > 0
    ? arc.materials
    : (arc.ascensionMaterials ? arc.ascensionMaterials.split('\n').map((l: string) => {
        const parts = l.split(/x/i);
        return { name: parts[0].trim(), count: parseInt(parts[1]?.replace(/,/g, ''), 10) || 1 };
      }).filter((m: any) => m.name) : []);

  const handleCopyMaterials = () => {
    if (!arc) return;
    const materialsText = materialsList
      .map((m) => `${t(m.name)} x${m.count.toLocaleString()}`)
      .join('\n');
    
    const text = `[이환(NTE) - ${t(arc.name)} 돌파 재료 리스트]\n\n■ 필요 재료\n${materialsText}\n\n출처: RIRA ARCHIVE`;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pb-12 font-sans selection:bg-brand-primary relative">
      <SEO 
        title={`${t(arc.name)} ${t('상세 정보 및 스탯 | 이환(NTE) 아카이브')}`} 
        description={`${t('이환(Neverness to Everness)')} ${theme.label}${t('등급')} ${t(arc.type || '결합')} 아크 ${t(arc.name)}${t('의 상세 스탯, 스킬 메커니즘, 돌파 재료 및 아크 스토리를 확인하세요.')}`}
        image={getIllustrationUrl()}
        url={`/gallery/nte/weapon/${encodeURIComponent(arc.name)}`}
      />

      <ItemDetailModal 
        itemNameEn={selectedItem || ''} 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
      
      <PageHeader gameId="nte" category={t("아크")} title={t(arc.name)} />

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 mt-4 space-y-8">
        {/* 상단 섹션: 아크 비주얼 & 스탯 컨트롤 */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-8 items-start">
          
          {/* 좌측: 일러스트 카드 */}
          <div className="relative group rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-[#0f0f0f] aspect-[3/4.2] flex items-center justify-center">
            <img 
              src={getIllustrationUrl()} 
              alt={t(arc.name)} 
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000 p-6" 
              onError={(e) => {
                // 폴백 이미지
                e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte%20images/items/%EB%B9%84%ED%8B%80%20%EC%BD%94%EC%9D%B8.webp";
              }}
            />
            {/* 오버레이 그라데이션 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent pointer-events-none" />
            
            {/* 통합 정보 오버레이 */}
            <div className="absolute bottom-8 left-8 right-8 space-y-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-black uppercase text-[11px] tracking-widest" style={{ color: theme.primary }}>
                  <span>{t('종류')} : {t(arc.type || '결합')}</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight italic drop-shadow-lg flex items-center gap-4">
                  {t(arc.name)}
                </h1>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>
                    {theme.label} {t('등급')}
                  </span>
                  {arc.dedicatedChar && (
                    <span className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-brand-primary/20 text-brand-accent border border-brand-primary/40 flex items-center gap-1">
                      <User size={12} /> {arc.dedicatedChar.match(/\[(.*?)\]/)?.[1] || arc.dedicatedChar.replace(/\*\*/g, '').trim()} {t('전용')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 우측: 기본 스탯 및 아크 스킬 조작부 */}
          <div className="space-y-6 flex flex-col h-full">
            
            {/* 01. 성장 스탯 슬라이더 카드 */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent space-y-6">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
                <div className="space-y-3 flex-grow relative pt-6">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-[20px] border-2 flex items-center justify-center font-black text-lg shadow-xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>01</div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{t('성장 스탯')}</span>
                        <h2 className="text-2xl font-black uppercase tracking-widest text-white italic">{t('기초 능력치')}</h2>
                      </div>
                    </div>
                  </div>

                  {/* 플로팅 레벨 라벨 */}
                  <div 
                    className="absolute top-0 -translate-x-1/2 px-2.5 py-0.5 text-black font-black italic text-[11px] rounded-lg pointer-events-none transition-all duration-75 shadow-lg z-10"
                    style={{ 
                      left: `${(levelIdx / (LEVEL_STEPS.length - 1)) * 100}%`,
                      backgroundColor: theme.primary,
                      boxShadow: `0 0 12px ${theme.primary}60`
                    }}
                  >
                    Lv.{LEVEL_STEPS[levelIdx]}
                  </div>
                  <input 
                    type="range" min="0" max={LEVEL_STEPS.length - 1} value={levelIdx} 
                    onChange={(e) => setLevelIdx(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: theme.primary }}
                  />
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 px-0.5 mt-2">
                    {LEVEL_STEPS.map((lv, i) => (
                      <span key={i} className={i === levelIdx ? 'text-white font-bold' : ''}>Lv.{lv}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 스탯 값 그리드 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t('기초 공격력')}</span>
                  </div>
                  <div className="text-2xl font-black tabular-nums text-white">{levelStat.atk}</div>
                </div>

                <div className="flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-6 rounded-full" style={{ backgroundColor: theme.primary }} />
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{t(levelStat.subStatName || '방어력')}</span>
                  </div>
                  <div className="text-2xl font-black tabular-nums text-brand-accent">{levelStat.subStatValue}</div>
                </div>
              </div>
            </div>

            {/* 02. 아크 스킬 상세 및 중첩 효과 */}
            <div className="glass-card p-8 rounded-[35px] border border-white/5 flex-grow space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>02</div>
                <div className="flex flex-col border-l-4 border-white/10 pl-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">{t('아크 스킬')}</span>
                  <h2 className="text-2xl font-black tracking-tighter italic uppercase text-white leading-none">{t((arc.skill?.name || '아크 스킬').replace(/\*\*/g, '').trim())}</h2>
                </div>
              </div>

              {/* 중첩 단계 (R1 ~ R5) 슬라이더 */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative pt-8">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">{t('중첩 단계 (Superimposition)')}</h3>
                </div>
                {/* Floating Rank Label */}
                <div 
                  className="absolute top-2 -translate-x-1/2 px-2.5 py-0.5 bg-white text-black font-black italic text-[11px] rounded-lg pointer-events-none transition-all duration-75 shadow-lg z-10"
                  style={{ 
                    left: `${(rankIdx / 4) * 100}%`,
                    boxShadow: `0 0 10px rgba(255,255,255,0.4)`
                  }}
                >
                  R{rankIdx + 1}
                </div>
                <input 
                  type="range" min="0" max="4" value={rankIdx} 
                  onChange={(e) => setRankIdx(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-white/15 rounded-full appearance-none cursor-pointer"
                  style={{ accentColor: theme.primary }}
                />
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 px-0.5 mt-2">
                  <span>R1 (기본)</span>
                  <span>R2</span>
                  <span>R3</span>
                  <span>R4</span>
                  <span>R5 (최대)</span>
                </div>
              </div>
              
              {/* 스킬 설명 본문 */}
              <div className="flex flex-col justify-center text-gray-300 text-base md:text-lg leading-relaxed bg-white/[0.01] p-6 rounded-[25px] border border-white/5 shadow-inner min-h-[120px]">
                <div className="w-full space-y-3">
                  {cleanSkillParagraphs(arc.skill?.description || '').map((paragraph: string, pIdx: number) => (
                    <p key={pIdx} className="leading-relaxed">
                      {renderRichText(formatDescriptionByRank(paragraph, rankIdx + 1))}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
            <AdPlaceholder type="leaderboard" className="mt-2 opacity-40" />
          </div>
        </div>

        {/* 03. 돌파 재료 섹션 (인벤토리 및 ItemIcon 연동) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between w-full group">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>03</div>
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">{t("돌파 재료 (Breakthrough Materials)")}</h2>
            </div>
          </div>

          <div className="glass-card p-10 rounded-[45px] border border-white/5 space-y-8">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
               <div className="flex items-center gap-4">
                 <Package size={22} className="text-gray-400" />
                 <span className="text-xl font-black uppercase tracking-tighter italic">{t("1 ~ 80Lv 최종 돌파 필요 재료")}</span>
               </div>
               <button 
                 onClick={handleCopyMaterials} 
                 className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all"
               >
                 {isCopied ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                 {isCopied ? t('복사 완료!') : t('재료 리스트 복사')}
               </button>
             </div>

             <div className="flex flex-wrap justify-center gap-8 px-4">
                {materialsList.map((m, i) => (
                  <ItemIcon 
                    key={i} 
                    name={m.name} 
                    gameId="nte"
                    count={m.name === "비틀 코인" ? m.count.toLocaleString() : String(m.count)} 
                    onClick={() => setSelectedItem(m.name)} 
                  />
                ))}
             </div>
          </div>
        </div>

        {/* 04. 전용 효과 (있는 경우만 표시) */}
        {arc.dedicatedChar && (
          <div className="glass-card p-8 rounded-[35px] border border-white/5 space-y-4">
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <Sparkles size={22} style={{ color: theme.primary }} className="opacity-80" />
              <span className="text-xl font-black uppercase tracking-tighter italic">{t("전용 효과")}</span>
            </div>
            <div className="bg-white/[0.02] p-6 rounded-[22px] border border-white/5 text-gray-300 font-bold text-base">
              <span className="text-brand-accent font-black">
                {arc.dedicatedChar.replace(/\*\*/g, '').trim()}
              </span>
            </div>
          </div>
        )}

        {/* 아크 스토리 섹션 */}
        {(arc.description || arc.story || arc.weaponStory) && (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-xl shadow-2xl" style={{ backgroundColor: `${theme.primary}20`, color: theme.primary, borderColor: `${theme.primary}60` }}>04</div>
              <h2 className="text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-6 leading-none py-1">{t("아크 스토리 (Arc Lore)")}</h2>
            </div>
            <div className="glass-card p-8 rounded-[35px] border border-white/5">
              <div className="text-gray-300 text-base md:text-lg leading-relaxed italic bg-black/20 p-8 rounded-[25px] border border-white/5 shadow-inner">
                <div className="whitespace-pre-line">
                  {t((arc.description || arc.story || arc.weaponStory || '').replace(/\*\*/g, '').trim())}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NTEArcDetail;
