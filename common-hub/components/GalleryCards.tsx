import React from 'react';
import { Link, useParams } from 'react-router';
import { Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent, handleImageFallback } from '@/common-hub/utils/assetManager';
import { getItemUrl, getCleanItemName } from '@/common-hub/data/items';
import { slugify } from '@/common-hub/utils/urlUtils';

export const CharacterPremiumCard = ({ char, index = 0 }: { char: any, index?: number }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const folderName = char.folderName || char.name || '';
  
  let imgPath = "";
  if (gameId === 'hsr') {
    const fileName = char.isTrailblazer ? (index % 2 === 0 ? 'art01.webp' : 'art01-01.webp') : 'art01.webp';
    imgPath = `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(folderName)}/${fileName}`;
  } else if (gameId === 'nte') {
    const targetName = char.folderName || t(char.name);
    const fileName = char.fileName || targetName;
    if (char.isTrailblazer) {
      const genderSuffix = index % 2 === 0 ? '_f' : '_m';
      imgPath = `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(targetName)}/${safeEncodeURIComponent(fileName)}${genderSuffix}.webp`;
    } else {
      imgPath = `${CDN_URL}/nte%20images/skills/${safeEncodeURIComponent(targetName)}/${safeEncodeURIComponent(fileName)}.webp`;
    }
  } else {
    if (char.isRover) {
      let baseFolderName = char.folderName || `방랑자 · ${char.attribute}`;
      if (baseFolderName === '방랑자 · 전도') baseFolderName = '방랑자 · 회절';
      const genderSuffix = index % 2 === 0 ? '(여)' : '(남)';
      const fileName = `${baseFolderName}${genderSuffix}.webp`;
      imgPath = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(baseFolderName)}/${safeEncodeURIComponent(fileName)}`;
    } else {
      const targetName = char.folderName || t(char.name);
      imgPath = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(targetName)}/${safeEncodeURIComponent(targetName)}.webp`;
    }
  }

  return (
    <Link to={`/gallery/${gameId}/character/${char.id}`} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all duration-500">
      <img 
        src={imgPath} 
        alt={`${t(char.name || '')} - ${t('리라 아카이브 캐릭터 정보 및 세팅 가이드')}`} 
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 will-change-transform" 
        style={{ 
          imageRendering: '-webkit-optimize-contrast',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
        }}
        loading="lazy" 
        onError={(e) => {
          if (char.isTrailblazer && !e.currentTarget.src.includes('%EA%B0%9C%EC%B2%99%EC%9E%90/')) {
            const baseFolderName = safeEncodeURIComponent('개척자');
            const fileName = e.currentTarget.src.includes('art01-01.webp') ? 'art01-01.webp' : 'art01.webp';
            e.currentTarget.src = `${CDN_URL}/hsr%20images/캐릭터/${baseFolderName}/${fileName}`;
            return;
          }
          handleImageFallback(e);
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-3 w-full z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white font-bold text-sm leading-none mb-1 drop-shadow-md">{t(char.name || '')}</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t(char.attribute || '')}</p>
          </div>
          {gameId === 'nte' ? (
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${char.rarity === 5 ? 'bg-yellow-500/20 text-yellow-500' : char.rarity === 4 ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {char.rarity === 5 ? 'S' : char.rarity === 4 ? 'A' : 'B'}
            </span>
          ) : (
            char.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5" />
          )}
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
  let imgPath = "";
  if (gameId === 'ww') {
    imgPath = `${CDN_URL}/ww%20images/Weapons/${safeEncodeURIComponent(lcName)}.webp`;
  } else if (gameId === 'nte') {
    imgPath = `${CDN_URL}/nte%20images/arcs/${safeEncodeURIComponent(lcName)}.webp`;
  } else {
    imgPath = `${CDN_URL}/hsr%20images/광추/${safeEncodeURIComponent(lc.path || '')}/${safeEncodeURIComponent(fileName)}.webp`;
  }

  const targetUrl = gameId === 'ww' 
    ? `/gallery/ww/weapon/${encodeURIComponent(lc.name || '')}` 
    : (gameId === 'nte' 
      ? `/gallery/nte/weapon/${encodeURIComponent(lc.name || '')}` 
      : `/gallery/hsr/lightcone/${encodeURIComponent(lc.name || '')}`);

  return (
    <Link to={targetUrl} className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img 
        src={imgPath} 
        alt={`${t(lc.name || '')} - ${t('상세 데이터 및 효과 정보')}`} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        loading="lazy" 
        onError={handleImageFallback}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <div className="flex justify-between items-end">
          <div className="min-w-0 pr-2">
            <p className="text-white font-bold text-sm leading-none mb-1 truncate">{t(lc.name || '')}</p>
            <p className="text-[10px] text-yellow-500 uppercase truncate">{t(lc.path || lc.type || lc.weaponType || '')}</p>
          </div>
          {gameId === 'nte' ? (
            <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${lc.rarity === 5 ? 'bg-yellow-500/20 text-yellow-500' : lc.rarity === 4 ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {lc.rarity === 5 ? 'S' : lc.rarity === 4 ? 'A' : 'B'}
            </span>
          ) : (
            lc.rarity === 5 && <Star size={10} className="text-yellow-500 fill-yellow-500 mb-0.5 flex-shrink-0" />
          )}
        </div>
      </div>
    </Link>
  );
};

export const RelicPremiumCard = ({ relic, onClick }: { relic: any, onClick?: () => void }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const targetName = relic.name || '';
  const imgPath = gameId === 'hsr'
    ? `${CDN_URL}/hsr%20images/유물/${safeEncodeURIComponent(targetName)}.webp`
    : `${CDN_URL}/ww%20images/Echo/${safeEncodeURIComponent(targetName)}.webp`;

  const content = (
    <>
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(relic.name || '')} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" onError={handleImageFallback} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(relic.name || '')}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(relic['2piece'] || relic.setEffect?.['2piece'] || relic.setEffect?.['2'] || relic.description || '')}</p>
      </div>
    </>
  );

  const className = "group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left";

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to={`/gallery/${gameId}/relic/${slugify(targetName)}`} className={className}>
      {content}
    </Link>
  );
};

export const ItemPremiumCard = ({ item }: { item: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  
  const itemName = item.name || '';
  const imgPath = item.url || getItemUrl(itemName, gameId);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const fallbackGameId = item.gameId || gameId || 'hsr';
    if (fallbackGameId === 'nte') {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/nte%20images/items/%EB%B9%84%ED%8B%80%20%EC%BD%94%EC%9D%B8.webp";
    } else if (fallbackGameId === 'ww') {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/%ED%81%B4%EB%A0%88%EB%94%A7.webp";
    } else {
      e.currentTarget.src = "https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr%20images/items/%EC%8B%A0%EC%9A%A9%20%ED%8F%AC%EC%9D%B8%ED%8A%B8.webp";
    }
  };

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

  const isGenderSplit = item.itemAttribute?.includes('남여 분리') || item.itemAttribute?.includes('남녀 분리') || 
    ['행복한 「에이본」 가족', '프로필-「비일상적인 복장」', '프로필-그래피티 타임', '프로필-헌터는 휴가 중', '프로필-환상의 콤비'].includes(itemName);
  let imgPathM = '';
  let imgPathF = '';
  if (isGenderSplit && imgPath) {
    imgPathM = imgPath.replace(/\.(png|webp)$/, '_m.$1');
    imgPathF = imgPath.replace(/\.(png|webp)$/, '_f.$1');
  }

  return (
    <Link 
      to={`/gallery/${gameId}/item/${encodeURIComponent(itemName)}`}
      className={`group relative aspect-[1/1.2] rounded-xl overflow-hidden border ${styles.border} bg-[#121212] transition-all duration-300 hover:bg-[#1a1a1a] hover:border-white/20 active:scale-95 flex flex-col`}
    >
      {/* Subtle Rarity Glow (Top) */}
      <div className={`absolute top-0 left-0 w-full h-1 ${styles.accent} opacity-40 group-hover:opacity-100 transition-opacity`} />
      
      {/* Image Container */}
      <div className="flex-1 relative flex items-center justify-center p-3">
        <div className={`absolute inset-0 ${styles.bg} opacity-20 group-hover:opacity-40 transition-opacity`} />
        <div className="w-4/5 aspect-square relative z-10 transform transition-transform duration-500 group-hover:scale-110 flex items-center justify-center gap-1">
          {isGenderSplit && imgPathM && imgPathF ? (
            <>
              <img 
                src={imgPathM} 
                alt={`${t(itemName)} (M)`} 
                className="w-1/2 h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                onError={handleError}
              />
              <img 
                src={imgPathF} 
                alt={`${t(itemName)} (F)`} 
                className="w-1/2 h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                onError={handleError}
              />
            </>
          ) : (
            <img 
              src={imgPath || ''} 
              alt={t(itemName)} 
              className="w-full h-full object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
              onError={handleError}
            />
          )}
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
          {t(getCleanItemName(itemName))}
        </p>
      </div>
    </Link>
  );
};

export const GuidePremiumCard = ({ char, guide }: { char: any, guide: any }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  
  let imgPath = "";
  if (gameId === 'hsr') {
    imgPath = `${CDN_URL}/hsr%20images/캐릭터/${safeEncodeURIComponent(char.folderName || char.name || '')}/art01.webp`;
  } else {
    // 명조 캐릭터 이미지 매핑
    const folder = char.folderName || char.name || '';
    if (char.isRover) {
      const baseFolder = folder === '방랑자 · 전도' ? '방랑자 · 회절' : folder;
      imgPath = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(baseFolder)}/${safeEncodeURIComponent(baseFolder + '(여)')}.webp`;
    } else {
      imgPath = `${CDN_URL}/ww%20images/skills/${safeEncodeURIComponent(folder)}/${safeEncodeURIComponent(folder)}.webp`;
    }
  }

  let objectPos = gameId === 'ww' ? 'center 25%' : 'center 20%';
  if (char.id === 'baizhi') objectPos = 'center 30%'; // 설지의 얼굴을 더 위로 끌어올림

  return (
    <Link to={`/gallery/${gameId}/character/${char.id}/guide`} className="group relative aspect-video rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-brand-primary/50 transition-all">
      <img 
        src={imgPath} 
        alt={t(char.name)} 
        style={{ objectPosition: objectPos }}
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" 
        loading="lazy" 
        onError={handleImageFallback}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <p className="text-white font-black text-lg leading-none mb-1 group-hover:text-brand-accent transition-colors">{t(char.name)} {t('공략')}</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{guide.patchVersion || 'Latest'} {t('업데이트됨')}</p>
      </div>
    </Link>
  );
};

export const OrnamentPremiumCard = ({ ornament, onClick }: { ornament: any, onClick?: () => void }) => {
  const { t } = useTranslation();
  const { gameId } = useParams();
  const ornamentName = ornament.name || '';
  const imgPath = `${CDN_URL}/hsr%20images/차원%20장신구/${safeEncodeURIComponent(ornamentName)}.webp`;

  const effectText = ornament.setEffect?.['2piece'] || ornament.setEffect?.['2'] || ornament['2piece'] || ornament.description || '';

  const content = (
    <>
      <div className="w-16 h-16 shrink-0 bg-black/50 rounded-xl p-2 border border-white/5">
        <img src={imgPath} alt={t(ornament.name)} className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform" loading="lazy" onError={handleImageFallback} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-black text-sm truncate">{t(ornament.name || '')}</h4>
        <p className="text-gray-400 text-xs truncate mt-1">{t(effectText)}</p>
      </div>
    </>
  );

  const className = "group relative flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all w-full text-left";

  if (onClick) {
    return (
      <button onClick={onClick} className={className}>
        {content}
      </button>
    );
  }

  return (
    <Link to={`/gallery/${gameId}/ornament/${slugify(ornamentName)}`} className={className}>
      {content}
    </Link>
  );
};