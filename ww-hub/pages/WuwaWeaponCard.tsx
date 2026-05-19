import React from 'react';
import { CDN_URL, safeEncodeURIComponent } from '../../common-hub/utils/assetManager';

const WuwaWeaponCard = ({ weapon, onClick }: any) => {
  const IMG_BASE = `${CDN_URL}/ww%20images/Weapons/`;
  
  const RARITY_GRADIENTS: any = {
    5: 'from-yellow-500/20 to-yellow-900/40 border-yellow-500/30',
    4: 'from-purple-500/20 to-purple-900/40 border-purple-500/30',
    3: 'from-blue-500/20 to-blue-900/40 border-blue-500/30',
    2: 'from-emerald-500/20 to-emerald-900/40 border-emerald-500/30',
    1: 'from-slate-500/20 to-slate-900/40 border-slate-500/30',
  };

  return (
    <div onClick={onClick} className="group cursor-pointer space-y-3">
      <div className={`aspect-square rounded-[32px] border bg-gradient-to-br ${RARITY_GRADIENTS[weapon.rarity]} overflow-hidden relative transition-all group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]`}>
        <img 
          src={`${IMG_BASE}${safeEncodeURIComponent(weapon.name)}.webp`}
          loading="lazy"
          width="400"
          height="400"
          style={{ imageRendering: 'auto', transform: 'translateZ(0)' }}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:rotate-3"
          alt={weapon.name}
        />
        <div className="absolute top-4 left-4 flex gap-0.5">
          {[...Array(weapon.rarity)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_5px_white]" />
          ))}
        </div>
      </div>
      <div className="text-center px-2">
        <h4 className="text-white font-black text-sm truncate uppercase tracking-tighter">{weapon.name}</h4>
        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{weapon.type}</p>
      </div>
    </div>
  );
};

export default WuwaWeaponCard;