import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CDN_URL } from '@/common-hub/utils/assetManager';

export const CharacterPremiumCard = ({ char }: { char: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const imgPath = gameId === 'hsr'
    ? `${CDN_URL}/hsr images/캐릭터/${encodeURIComponent((char.folderName || char.name).normalize('NFC'))}/${char.isTrailblazer ? 'art01-01.webp' : 'art01.webp'}`
    : `${CDN_URL}/ww images/characters/${encodeURIComponent((char.folderName || char.name).normalize('NFC'))}/art01.webp`;

  return (
    <Link to={`/gallery/${gameId}/character/${char.id}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img src={imgPath} alt={t(char.name)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr images/items/unknown.webp`; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white font-bold text-sm leading-none mb-1">{t(char.name)}</p>
            <p className="text-[10px] text-gray-400 uppercase">{t(char.attribute)}</p>
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
  
  const imgPath = gameId === 'ww'
    ? `${CDN_URL}/ww images/Weapons/${encodeURIComponent((lc.name).normalize('NFC'))}.webp`
    : `${CDN_URL}/hsr images/광추/${encodeURIComponent((lc.path || '').normalize('NFC'))}/${encodeURIComponent((lc.fileName || lc.folderName || lc.name).normalize('NFC'))}.webp`;

  return (
    <Link to={`/gallery/${gameId}/${gameId === 'ww' ? 'weapon' : 'lightcone'}/${encodeURIComponent(lc.name)}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img src={imgPath} alt={t(lc.name)} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr images/items/unknown.webp`; }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <div className="flex justify-between items-end">
          <div className="min-w-0 pr-2">
            <p className="text-white font-bold text-sm leading-none mb-1 truncate">{t(lc.name)}</p>
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
  const imgPath = gameId === 'ww'
    ? `${CDN_URL}/ww images/echoes/${encodeURIComponent(relic.name.normalize('NFC'))}.webp`
    : `${CDN_URL}/hsr images/유물/${encodeURIComponent(relic.name.normalize('NFC'))}.webp`;

  return (
    <button onClick={onClick} className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left">
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(relic.name)} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr images/items/unknown.webp`; }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(relic.name)}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(relic.setEffect?.['2'] || relic.description || '')}</p>
      </div>
    </button>
  );
};

export const OrnamentPremiumCard = ({ ornament, onClick }: { ornament: any, onClick: () => void }) => {
  const { t } = useTranslation();
  const imgPath = `${CDN_URL}/hsr images/차원 장신구/${encodeURIComponent(ornament.name.normalize('NFC'))}.webp`;

  return (
    <button onClick={onClick} className="group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left">
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(ornament.name)} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr images/items/unknown.webp`; }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(ornament.name)}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(ornament.setEffect?.['2'] || ornament.description || '')}</p>
      </div>
    </button>
  );
};