import React from 'react';
import { createPortal } from 'react-dom';
import { X, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CDN_URL, safeEncodeURIComponent } from '@/common-hub/utils/assetManager';
import { getItemUrl } from '../data/items';
import { getGameData } from '../data/dataManager';

export const RelicDetailModal = ({ relic, onClose }: { relic: any, onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  if (!relic) return null;

  // 화면에 표시할 다국어 텍스트 분기
  const displayName = isEn && relic.enName ? relic.enName : t(relic.name);
  const effect2 = isEn && relic['en_2piece'] ? relic['en_2piece'] : (relic.setEffect?.['2piece'] || relic['2piece']);
  const effect4 = isEn && relic['en_4piece'] ? relic['en_4piece'] : (relic.setEffect?.['4piece'] || relic['4piece']);
  const effect5 = isEn && relic['en_5piece'] ? relic['en_5piece'] : (relic.setEffect?.['5piece'] || relic['5piece']);

  // 이미지는 무조건 한국어 기반
  const typeStr = relic.type === '터널 유물' ? '유물' : (relic.type || '유물');
  const imgPath = relic.gameId === 'ww'
    ? `${CDN_URL}/ww%20images/echoes/${safeEncodeURIComponent(relic.name)}.webp`
    : `${CDN_URL}/hsr%20images/${safeEncodeURIComponent(typeStr)}/${safeEncodeURIComponent(relic.name)}.webp`;

  const getPieceImageUrl = (idx: number) => {
    const piece = relic.pieces?.[idx];
    if (!piece) return '';
    const pieceName = typeof piece === 'string' ? piece : piece.name; // 한국어 이름 사용
    if (!pieceName || typeof pieceName !== 'string') return '';
    
    return `${CDN_URL}/hsr%20images/${safeEncodeURIComponent(typeStr)}/${safeEncodeURIComponent(pieceName)}.webp`;
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#121212] border border-white/10 rounded-[48px] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-20">
          <X size={28} />
        </button>
        
        <div className="space-y-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 bg-white/5 rounded-[32px] p-6 border border-white/10 shrink-0 relative group">
              <div className="absolute inset-0 bg-brand-primary/10 blur-2xl rounded-full opacity-50" />
              <img src={imgPath} alt={t(relic.name)} className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="text-center md:text-left space-y-3">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-brand-primary/20 text-brand-accent text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-primary/30">
                  {t(relic.type)}
                </span>
                <div className="flex gap-0.5 items-center bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={8} fill="#FFD600" className="text-[#FFD600]" />
                  ))}
                </div>
              </div>
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{displayName}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {/* 세부 파츠 */}
            {relic.pieces && relic.pieces.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> {t('세부 파츠')}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {relic.pieces.map((piece: any, idx: number) => {
                    const pieceKoName = typeof piece === 'string' ? piece : piece?.name;
                    const displayPieceName = isEn && piece.enName ? piece.enName : t(pieceKoName);
                    if (typeof pieceKoName !== 'string') return null;
                    return (
                      <div key={idx} className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center text-center gap-3 group hover:bg-white/10 transition-all">
                        <div className="w-16 h-16 rounded-xl bg-black/20 p-2">
                          <img 
                            src={getPieceImageUrl(idx)} 
                            alt={pieceKoName} 
                            className="w-full h-full object-contain" 
                            onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr%20images/items/relic_placeholder.webp`; }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 leading-tight group-hover:text-white transition-colors">{displayPieceName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 세트 효과 */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> {t('세트 효과')}
              </h4>
              <div className="grid grid-cols-1 gap-3">
              {effect2 && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-2">
                    <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{t('2세트 효과')}</div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed italic">"{effect2}"</p>
                  </div>
                )}
              {effect4 && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-2">
                    <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{t('4세트 효과')}</div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed italic">"{effect4}"</p>
                  </div>
                )}
                {relic.description && !relic.setEffect && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-2">
                    <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{t('효과')}</div>
                    <p className="text-gray-300 text-sm font-medium leading-relaxed italic">"{t(relic.description)}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};

export const ItemDetailModal = ({ item, onClose }: { item: any, onClose: () => void }) => {
  const { t } = useTranslation();
  if (!item) return null;

  const imgPath = getItemUrl(item.name, item.gameId);

  const getRarityColor = (r: number) => {
    switch (r) {
      case 5: return 'text-yellow-500 fill-yellow-500';
      case 4: return 'text-purple-500 fill-purple-500';
      case 3: return 'text-blue-500 fill-blue-500';
      case 2: return 'text-green-500 fill-green-500';
      default: return 'text-gray-500 fill-gray-500';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#121212] border border-white/10 rounded-[40px] p-8 max-w-lg w-full shadow-2xl animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-20">
          <X size={24} />
        </button>
        
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/5 rounded-2xl p-4 border border-white/10 shrink-0">
              <img src={imgPath} alt={t(item.name)} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr%20images/items/unknown.webp`; }} />
            </div>
            <div className="space-y-2">
              <div className="flex gap-0.5 items-center">
                {Array.from({ length: item.rarity || 2 }).map((_, i) => (
                  <Star key={i} size={10} className={getRarityColor(item.rarity)} />
                ))}
              </div>
              <h3 className="text-2xl font-black text-white italic tracking-tighter">{t(item.name)}</h3>
              <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">{t(item.type)}</p>
            </div>
          </div>

          <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-4">
            <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t('아이템 설명')}</div>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{t(item.desc || item.description || '설명이 없습니다.')}</p>
          </div>

          {item.sources && item.sources.length > 0 && (
            <div className="space-y-3">
              <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{t('획득처')}</div>
              <div className="flex flex-wrap gap-2">
                {item.sources.map((src: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[11px] text-gray-400">
                    {t(src)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  , document.body);
};

export const OrnamentDetailModal = ({ ornament, onClose }: { ornament: any, onClose: () => void }) => {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  if (!ornament) return null;

  // 이미지 로드를 위해 명시적으로 KO 데이터베이스를 참조합니다.
  const { ORNAMENT_DB: KO_ORNAMENT_DB } = getGameData('ko');
  const koOrnament = KO_ORNAMENT_DB.find((o: any) => o.id === ornament.id) || ornament;

  const typeStr = koOrnament.type || '차원 장신구';
  const imgPath = `${CDN_URL}/hsr%20images/${safeEncodeURIComponent(typeStr)}/${safeEncodeURIComponent(koOrnament.name)}.webp`;

  const getPieceImageUrl = (idx: number) => {
    const piece = koOrnament.pieces?.[idx];
    if (!piece) return '';
    const pieceName = typeof piece === 'string' ? piece : piece.name;
    if (!pieceName || typeof pieceName !== 'string') return '';

    return `${CDN_URL}/hsr%20images/${safeEncodeURIComponent(typeStr)}/${safeEncodeURIComponent(pieceName)}.webp`;
  };

  const displayName = isEn && ornament.enName ? ornament.enName : t(ornament.name);
  const effect2 = isEn && ornament['en_2piece'] ? ornament['en_2piece'] : (ornament.setEffect?.['2piece'] || ornament['2piece']);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-[#121212] border border-white/10 rounded-[48px] p-10 max-w-2xl w-full shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors z-20">
          <X size={28} />
        </button>

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 bg-white/5 rounded-[32px] p-6 border border-white/10 shrink-0 relative group">
              <div className="absolute inset-0 bg-brand-accent/10 blur-2xl rounded-full opacity-50" />
              <img src={imgPath} alt={t(ornament.name)} className="w-full h-full object-contain relative z-10" />
            </div>
            <div className="text-center md:text-left space-y-3">
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-brand-accent/20 text-brand-primary text-[10px] font-black rounded-full uppercase tracking-widest border border-brand-accent/30">
                  {t(ornament.type)}
                </span>
                <div className="flex gap-0.5 items-center bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={8} fill="#FFD600" className="text-[#FFD600]" />
                  ))}
                </div>
              </div>
              <h3 className="text-4xl font-black text-white italic tracking-tighter">{displayName}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-10">
            {/* 세부 파츠 */}
            {ornament.pieces && ornament.pieces.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent" /> {t('세부 파츠')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {ornament.pieces.map((piece: any, idx: number) => {
                    const pieceKoName = typeof piece === 'string' ? piece : piece?.name;
                    const displayPieceName = isEn && piece.enName ? piece.enName : t(pieceKoName);
                    if (typeof pieceKoName !== 'string') return null;
                    return (
                      <div key={idx} className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-all">
                        <div className="w-20 h-20 rounded-2xl bg-black/20 p-3">
                          <img 
                            src={getPieceImageUrl(idx)} 
                            alt={pieceKoName} 
                            className="w-full h-full object-contain" 
                            onError={(e) => { (e.target as HTMLImageElement).src = `${CDN_URL}/hsr%20images/items/relic_placeholder.webp`; }}
                          />
                        </div>
                        <span className="text-[11px] font-bold text-gray-400 group-hover:text-white transition-colors">{displayPieceName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 세트 효과 */}
            <div className="space-y-4">
              <h4 className="text-[11px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" /> {t('세트 효과')}
              </h4>
              <div className="grid grid-cols-1 gap-3">
              {effect2 && (
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/5 space-y-2">
                    <div className="text-[9px] font-black text-brand-accent uppercase tracking-widest">{t('2세트 효과')}</div>
                  <p className="text-gray-300 text-sm font-medium leading-relaxed italic">"{effect2}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  , document.body);
};