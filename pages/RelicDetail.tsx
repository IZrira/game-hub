import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, X, Shield, Star, ArrowLeft } from 'lucide-react';
import { RELIC_DB } from '../data/games';
import PageHeader from '../components/PageHeader';

const RelicDetail: React.FC = () => {
  const { gameId, relicName } = useParams<{ gameId: string; relicName: string }>();
  const navigate = useNavigate();
  const relic = RELIC_DB.find(r => r.name === relicName);

  if (!relic) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-black mb-4 uppercase italic">Relic Not Found</h1>
        <Link to={`/gallery/${gameId}`} className="text-brand-primary hover:underline font-bold">Back to Gallery</Link>
      </div>
    );
  }

  const BASE_IMAGE_URL = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images';
  
  const getMainImageUrl = (item: any) => {
    const safeType = item.type.normalize('NFC');
    const safeName = item.name.normalize('NFC');
    const url = `${BASE_IMAGE_URL}/${safeType}/${safeName}.webp`;
    return encodeURI(url);
  };

  const getPieceImageUrl = (item: any, pieceIndex: number) => {
    const safeType = item.type.normalize('NFC');
    const safePieceName = item.pieces[pieceIndex].normalize('NFC');
    const url = `${BASE_IMAGE_URL}/${safeType}/${safePieceName}.webp`;
    return encodeURI(url);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      {/* Page Header */}
      <PageHeader gameId={gameId} category="유물" title={relic.name} />

      <div className="max-w-4xl mx-auto px-8 pt-16">
        <div className="bg-[#121212] rounded-[48px] border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-12 space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-48 h-48 rounded-[32px] bg-white/5 p-6 flex items-center justify-center shrink-0 relative group">
                <div className="absolute inset-0 bg-brand-primary/20 blur-3xl rounded-full opacity-50" />
                <img 
                  src={getMainImageUrl(relic)}
                  alt={relic.name}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="px-4 py-1.5 bg-brand-primary/20 text-brand-accent text-[12px] font-black rounded-full uppercase tracking-widest border border-brand-primary/30">
                    {relic.type}
                  </span>
                  <div className="flex gap-1 items-center bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={10} fill="#FFD600" className="text-[#FFD600]" />
                    ))}
                  </div>
                </div>
                <h1 className="text-5xl font-black italic tracking-tighter text-white">{relic.name}</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {/* 세부 파츠 */}
              <div className="space-y-6">
                <h4 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-accent" /> 세부 파츠
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {relic.pieces.map((piece: string, idx: number) => (
                    <div key={idx} className="bg-white/5 rounded-3xl p-6 border border-white/5 flex flex-col items-center text-center gap-4 group hover:bg-white/10 transition-all">
                      <div className="w-20 h-20 rounded-2xl bg-black/20 p-3">
                        <img 
                          src={getPieceImageUrl(relic, idx)}
                          alt={piece}
                          className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/items/relic_placeholder.webp'; }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-gray-400 leading-tight group-hover:text-white transition-colors">{piece}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 세트 효과 */}
              <div className="space-y-6">
                <h4 className="text-[12px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary" /> 세트 효과
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 space-y-3">
                    <div className="text-[11px] font-black text-brand-accent uppercase tracking-widest">2세트 효과</div>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed italic">"{relic.setEffect['2piece']}"</p>
                  </div>
                  <div className="bg-white/5 rounded-[32px] p-8 border border-white/5 space-y-3">
                    <div className="text-[11px] font-black text-brand-accent uppercase tracking-widest">4세트 효과</div>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed italic">"{relic.setEffect['4piece']}"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelicDetail;
