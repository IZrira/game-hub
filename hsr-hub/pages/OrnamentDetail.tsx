import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, X, Shield, Star, ArrowLeft } from 'lucide-react';
import { ORNAMENT_DB } from '../../common-hub/data/games';
import PageHeader from '../../common-hub/components/PageHeader';
import SEO from '../../common-hub/components/SEO';
import AdPlaceholder from '../../common-hub/components/AdPlaceholder';
import { useTranslation } from 'react-i18next';
import { getGameData } from '../../common-hub/data/dataManager';
import { matchesSlug } from '../../common-hub/utils/urlUtils';

const OrnamentDetail: React.FC = () => {
  const { gameId, ornamentName } = useParams<{ gameId: string; ornamentName: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  
  // 다국어 텍스트 출력을 위해 현재 언어에 맞는 DB를 로드합니다.
  const { ORNAMENT_DB } = getGameData(i18n.language || 'ko');
  const ornament: any = ORNAMENT_DB.find((o: any) => 
    o.id === ornamentName || 
    o.name === ornamentName || 
    matchesSlug(o.name, ornamentName || '')
  );

  if (!ornament) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-black mb-4 uppercase italic">{t('Ornament Not Found')}</h1>
        <Link to={`/gallery/${gameId}`} className="text-brand-primary hover:underline font-bold">{t('Back to Gallery')}</Link>
      </div>
    );
  }

  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';
  
  // 이미지 로드를 위해 명시적으로 KO 데이터베이스를 참조합니다.
  const { ORNAMENT_DB: KO_ORNAMENT_DB } = getGameData('ko');
  const koOrnament = KO_ORNAMENT_DB.find((o: any) => o.id === ornament?.id) || ornament;

  const getMainImageUrl = () => {
    const safeType = (koOrnament.type || '차원 장신구').normalize('NFC');
    const safeName = koOrnament.name.normalize('NFC');
    const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
    return encodeURI(url);
  };

  const getPieceImageUrl = (pieceIndex: number) => {
    const safeType = (koOrnament.type || '차원 장신구').normalize('NFC');
    const piece = koOrnament.pieces[pieceIndex];
    const pieceName = typeof piece === 'string' ? piece : piece?.name;
    if (typeof pieceName !== 'string') return '';

    const safePieceName = pieceName.normalize('NFC');
    const url = `${BASE_IMAGE_URL}/${safeType}/${safePieceName}.webp`;
    return encodeURI(url);
  };

  const displayName = isEn && ornament.enName ? ornament.enName : t(ornament.name);
  const effect2 = isEn && ornament['en_2piece'] ? ornament['en_2piece'] : (ornament.setEffect?.['2piece'] || (ornament as any)['2piece']);

  const seoDescription = `${ornament.name} 세트 상세 가이드: 2세트 효과와 추천 착용 캐릭터 세팅을 완벽 정리했습니다. ${ornament.gameId === 'ww' ? '명조' : '붕괴: 스타레일'} 게이머를 위한 최신 데이터 시트.`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      <SEO 
        title={`${ornament.name} 상세 정보`}
        description={seoDescription}
        url={`/gallery/${gameId}/ornament/${encodeURIComponent(ornament.name)}`}
        image={getMainImageUrl()}
        gameCategory={ornament.gameId === 'ww' ? '명조 (Wuthering Waves)' : '붕괴: 스타레일'}
        itemType={ornament.gameId === 'ww' ? '에코' : '차원 장신구'}
      />
      {/* Page Header */}
    <PageHeader gameId={gameId} category={t("장신구")} title={displayName} />

      <div className="max-w-4xl mx-auto px-8 pt-8">
        <div className="bg-[#121212] rounded-[48px] border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-12 space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-[32px] bg-white/5 p-6 flex items-center justify-center shrink-0 relative group">
                <div className="absolute inset-0 bg-brand-accent/20 blur-3xl rounded-full opacity-50" />
                <img 
                  src={getMainImageUrl()}
                  alt={ornament.name}
                  className="w-full h-full object-contain relative z-10"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-brand-accent/20 text-brand-primary text-[12px] font-black rounded-full uppercase tracking-widest border border-brand-accent/30">
                  {t(ornament.type)}
                  </span>
                  <div className="flex gap-1 items-center bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} fill="#FFD600" className="text-[#FFD600]" />
                    ))}
                  </div>
                </div>
            <h1 className="text-5xl font-black italic tracking-tighter text-white">{displayName}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* 세부 파츠 */}
              <div className="space-y-6">
                <h4 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-accent" /> {t('세부 파츠')}
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  {ornament.pieces.map((piece: any, idx: number) => {
                  const pieceKoName = typeof piece === 'string' ? piece : piece?.name;
                  const displayPieceName = isEn && piece.enName ? piece.enName : t(pieceKoName);
                  if (typeof pieceKoName !== 'string') return null;
                    return (
                      <div key={idx} className="bg-white/5 rounded-3xl p-8 border border-white/5 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-all">
                        <div className="w-24 h-24 rounded-2xl bg-black/20 p-4">
                          <img 
                            src={getPieceImageUrl(idx)}
                          alt={pieceKoName}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                          />
                        </div>
                    <span className="text-[12px] font-bold text-gray-400 group-hover:text-white transition-colors">{displayPieceName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 세트 효과 */}
              <div className="space-y-6">
                <h4 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary" /> {t('세트 효과')}
                </h4>
                <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 space-y-3">
              <div className="text-[11px] font-black text-brand-accent uppercase tracking-widest">{t('2세트 효과')}</div>
              {effect2 && (
              <p className="text-gray-300 text-lg font-medium leading-relaxed italic">"{effect2}"</p>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default OrnamentDetail;
