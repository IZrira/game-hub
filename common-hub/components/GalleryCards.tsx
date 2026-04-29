import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent } from '@/common-hub/utils/assetManager';
import { getItemUrl } from '@/common-hub/data/items';

export const CharacterPremiumCard = ({ char }: { char: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const folderName = char.folderName || char.name || '';
  const imgPath = gameId === 'hsr'
    ? `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(folderName)}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
    : `${CDN_URL}/ww%20images/characters/${safeEncodeURIComponent(folderName)}/art01.webp`;

  return (
    <Link to={`/gallery/${gameId}/character/${char.id}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img src={imgPath} alt={t(char.name || '')} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white font-bold text-sm leading-none mb-1">{t(char.name || '')}</p>
            <p className="text-[10px] text-gray-400 uppercase">{t(char.attribute || '')}</p>
          </div>
          {char.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5" />}
        </div>
      </div>
    </Link>
  );
};

export const LightConePremiumCard = ({ lc }: { lc: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  
  const lcName = lc.name || '';
  const fileName = lc.fileName || lc.folderName || lc.name || '';
  const imgPath = gameId === 'ww'
    ? `${CDN_URL}/ww%20images/Weapons/${safeEncodeURIComponent(lcName)}.webp`
    : `${CDN_URL}/hsr%20images/광추/${safeEncodeURIComponent(lc.path || '')}/${safeEncodeURIComponent(fileName)}.webp`;

  return (
    <Link to={`/gallery/${gameId}/${gameId === 'ww' ? 'weapon' : 'lightcone'}/${encodeURIComponent(lc.name || '')}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img src={imgPath} alt={t(lc.name || '')} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <div className="flex justify-between items-end">
          <div className="min-w-0 pr-2">
            <p className="text-white font-bold text-sm leading-none mb-1 truncate">{t(lc.name || '')}</p>
            <p className="text-[10px] text-yellow-500 uppercase truncate">{t(lc.path || lc.type || lc.weaponType || '')}</p>
          </div>
          {lc.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5 flex-shrink-0" />}
        </div>
      </div>
    </Link>
  );
};

export const RelicPremiumCard = ({ relic, onClick }: { relic: any, onClick: () => void }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const targetName = relic.name || '';
  const imgPath = gameId === 'hsr'
    ? `${CDN_URL}/hsr%20images/유물/${safeEncodeURIComponent(targetName)}.webp`
    : `${CDN_URL}/ww%20images/echoes/${safeEncodeURIComponent(targetName)}.webp`;

  return (
    <button onClick={onClick} className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left">
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(relic.name || '')} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(relic.name || '')}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(relic.setEffect?.['2'] || relic.description || '')}</p>
      </div>
    </button>
  );
};

export const ItemPremiumCard = ({ item, onClick }: { item: any, onClick: () => void }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  
  const itemName = item.name || '';
  const imgPath = getItemUrl(itemName, gameId);

  const getRarityStyles = (r: number) => {
    switch (r) {
      case 5: return { border: 'border-yellow-500/20', bg: 'bg-yellow-500/5', accent: 'bg-yellow-500' };
      case 4: return { border: 'border-purple-500/20', bg: 'bg-purple-500/5', accent: 'bg-purple-500' };
      case 3: return { border: 'border-blue-500/20', bg: 'bg-blue-500/5', accent: 'bg-blue-500' };
      case 2: return { border: 'border-green-500/20', bg: 'bg-green-500/5', accent: 'bg-green-500' };
      default: return { border: 'border-white/5', bg: 'bg-white/5', accent: 'bg-gray-500' };
    }
  };

  const styles = getRarityStyles(item.rarity);

  return (
    <button 
      onClick={onClick} 
      className={`group relative aspect-[1/1.2] rounded-xl overflow-hidden border ${styles.border} bg-[#121212] transition-all duration-300 hover:bg-[#1a1a1a] hover:border-white/20 active:scale-95 flex flex-col`}
    >
      {/* Subtle Rarity Glow (Top) */}
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
      
      {/* Image Container */}
      <div className="flex-1 relative flex items-center justify-center p-3">
        <div className={`absolute inset-0 ${styles.bg} opacity-20 group-hover:opacity-40 transition-opacity`} />
        <div className="w-4/5 aspect-square relative z-10 transform transition-transform duration-500 group-hover:scale-110">
          <img 
            src={imgPath} 
            alt={t(itemName)} 
            className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
          />
        </div>
        
        {/* Rarity Stars (Floating) */}
        <div className="absolute bottom-2 right-2 z-20 flex gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
          {Array.from({ length: item.rarity || 1 }).map((_, i) => (
            <Star key={i} size={6} className="text-yellow-500 fill-yellow-500" />
          ))}
        </div>
      </div>

      {/* Info Section: Ultra Clean */}
      <div className="relative z-20 p-2 bg-[#0d0d0d] border-t border-white/5">
        <p className="text-gray-200 font-bold text-[10px] leading-tight truncate tracking-tight text-center group-hover:text-white transition-colors">
          {t(itemName)}
        </p>
      </div>
    </button>
  );
};

export const GuidePremiumCard = ({ char, guide }: { char: any, guide: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const imgPath = `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(char.folderName || char.name || '')}/art01.webp`;

  return (
    <Link to={`/gallery/${gameId}/character/${char.id}/guide`} className="group relative aspect-video rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img src={imgPath} alt={t(char.name)} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <p className="text-white font-black text-lg leading-none mb-1 group-hover:text-brand-accent transition-colors">{t(char.name)} {t('공략')}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{guide.patchVersion || 'Latest'} {t('업데이트됨')}</p>
      </div>
    </Link>
  );
};

export const OrnamentPremiumCard = ({ ornament, onClick }: { ornament: any, onClick: () => void }) => {
  const { t } = useTranslation();
  const ornamentName = ornament.name || '';
  const imgPath = `${CDN_URL}/hsr%20images/차원%20장신구/${safeEncodeURIComponent(ornamentName)}.webp`;

  return (
    <button onClick={onClick} className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left">
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(ornament.name)} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(ornament.name)}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(ornament.setEffect?.['2'] || ornament.description || '')}</p>
      </div>
    </button>
  );
};