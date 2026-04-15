import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Package, Info, MapPin } from 'lucide-react';
import { getItemMeta, getAutoRarity, getItemUrl, REVERSE_ITEM_MAP } from '../data/items';
import { useTranslation } from 'react-i18next';

interface ItemDetailModalProps {
  itemNameEn: string; // 영문명 또는 국문명
  isOpen: boolean;
  onClose: () => void;
}

const getItemStyles = (rarity: number) => {
  const styles: Record<number, string> = {
    5: "from-[#9c7b3c] to-[#5e4a24] border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
    4: "from-[#634e9e] to-[#3d2f63] border-purple-500/30",
    3: "from-[#3b608a] to-[#1e3045] border-blue-500/30",
    2: "from-[#3b5a41] to-[#25392a] border-green-500/30",
  };
  return styles[rarity] || "from-[#4d4d4d] to-[#333333] border-gray-400/20";
};

export default function ItemDetailModal({ itemNameEn, isOpen, onClose }: ItemDetailModalProps) {
  const { t, i18n } = useTranslation();

  // 1. 역매핑을 통해 항상 기준이 되는 국문명(Key) 확보
  const koName = REVERSE_ITEM_MAP[itemNameEn] || itemNameEn;
  
  // 2. 중앙 레지스트리(INVENTORY_DB)에서 아이템 데이터 가져오기
  const itemData = getItemMeta(koName);

  // [디버깅] 아이템 데이터 로드 확인
  useEffect(() => {
    if (isOpen) {
      console.log('Synthesis Item Data [Debug]:', itemData);
    }
  }, [isOpen, itemData]);

  // 훅(Hook) 선언부 이후에 Early Return 배치 (Rules of Hooks 준수)
  if (!isOpen) return null;

  // 3. 글로벌 언어 설정에 따른 출력 텍스트 처리 (i18next t() 함수 단일 파이프라인)
  // (i18next가 마침표(.)나 콜론(:)을 객체/네임스페이스 탐색 구분자로 오인하지 않도록 nsSeparator, keySeparator 모두 false 강제 적용)
  const rawDisplayName = t(koName, { keySeparator: false, nsSeparator: false });
  
  const displayName = rawDisplayName;

  // en.json에 정의된 desc_접두어 키를 먼저 찾고, 없으면 한국어 원문(itemData.desc)을 키로 다시 찾으며, 최후의 경우 원문을 노출합니다.
  const description = itemData?.desc 
    ? t(`desc_${koName}`, { defaultValue: t(itemData.desc, { defaultValue: itemData.desc, keySeparator: false, nsSeparator: false }), keySeparator: false, nsSeparator: false }) 
    : t("아카이브에 아직 상세 정보가 등록되지 않은 아이템입니다.", { keySeparator: false, nsSeparator: false });
    
  const isEn = i18n.language.startsWith('en');
  const activeSources = (isEn && itemData?.enSources && itemData.enSources.length > 0) ? itemData.enSources : itemData?.sources;
  const sources = activeSources && activeSources.length > 0 
    ? activeSources.map((s: string) => t(`source_${s}`, { defaultValue: t(s, { defaultValue: s, keySeparator: false, nsSeparator: false }), keySeparator: false, nsSeparator: false })) 
    : [t("게임 내 확인 필요", { keySeparator: false, nsSeparator: false })];

  const rarity = itemData?.rarity || getAutoRarity(koName);
  const itemType = itemData?.type || "미분류";
  const url = getItemUrl(koName, itemData?.gameId || 'hsr');

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative glass-card max-w-lg w-full rounded-[40px] p-10 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-200">
         <div className="absolute top-0 right-0 p-6">
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"><X size={24} /></button>
         </div>
         <div className="flex flex-col items-center text-center space-y-8">
            <div className="relative group">
               <div className="absolute inset-0 opacity-40 blur-[60px]" style={{ backgroundColor: getItemStyles(rarity).includes('yellow') ? '#EAB308' : '#7E30E1' }} />
               <div className={`relative w-40 h-40 flex items-center justify-center rounded-[32px] overflow-hidden border-2 bg-gradient-to-b ${getItemStyles(rarity)}`}>
                  <img src={url} alt={koName} className="max-w-full max-h-full object-contain p-4 filter drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
               </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white break-words leading-tight w-full px-2" title={rawDisplayName}>{displayName}</h2>
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: rarity }).map((_, i) => (<Star key={i} size={18} fill="#EAB308" className="text-yellow-500" />))}
              </div>
            </div>
            <div className="w-full h-px bg-white/10" />
            <div className="space-y-6 w-full text-left">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Package size={14} className="text-brand-accent" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("Item Category")}</span></div>
                  <span className="text-xs font-black text-brand-accent uppercase bg-brand-accent/10 px-4 py-1.5 rounded-full border border-brand-accent/20">{t(itemType)}</span>
               </div>
               <div className="relative">
                  <div className="flex items-center gap-2 mb-3"><Info size={14} className="text-brand-primary" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("Archive Intel")}</span></div>
                 <div className="bg-white/[0.03] p-6 rounded-[30px] border border-white/5 shadow-inner">
                    <div className="max-h-[120px] overflow-y-auto scrollbar-hide pr-2">
                       <p className="text-gray-300 text-[14px] md:text-[15px] leading-relaxed font-medium italic break-words">
                          {description}
                       </p>
                    </div>
                 </div>
               </div>
               <div className="space-y-3">
                  <div className="flex items-center gap-2"><MapPin size={14} className="text-green-400" /><span className="text-[11px] font-black text-gray-500 uppercase tracking-[0.2em]">{t("Acquisition Sources")}</span></div>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((source: string, idx: number) => (<span key={idx} className="bg-white/5 text-gray-400 px-3 py-1.5 rounded-xl text-[11px] md:text-[12px] font-bold border border-white/10 line-clamp-2 break-words" title={source}>{source}</span>))}
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  , document.body);
}