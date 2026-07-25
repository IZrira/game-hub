import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { CDN_URL } from '../../common-hub/utils/assetManager';

const CharacterDetailNTE: React.FC = () => {
  const { charName } = useParams<{ charName: string }>();
  const gameId = 'nte';
  const { t } = useTranslation();
  
  const { CHARACTER_DB } = useMemo(() => getGameData(gameId), [gameId]);
  const character = useMemo(() => {
    return CHARACTER_DB.find((c: any) => c.name === charName || c.originalName === charName);
  }, [charName, CHARACTER_DB]);

  if (!character) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">{t('캐릭터를 찾을 수 없습니다')}</h2>
          <Link to={`/gallery/${gameId}`} className="text-brand-primary hover:text-brand-accent transition-colors">
            {t('도감으로 돌아가기')}
          </Link>
        </div>
      </div>
    );
  }

  const RarityStars = () => (
    <div className="flex gap-1">
      {Array.from({ length: character.rarity || 5 }).map((_, i) => (
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );

  const [activeSkin, setActiveSkin] = useState<string>('기본');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (character?.skins?.length > 0) {
      setActiveSkin(character.skins[0]);
    } else {
      setActiveSkin('기본');
    }
  }, [character]);

  const handleSkinChange = (skin: string) => {
    if (skin === activeSkin) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSkin(skin);
      setIsAnimating(false);
    }, 200); // 200ms fade transition
  };

  const safeName = character.name.replace(/: /g, '_').replace(/:/g, '_');
  const safeSkin = activeSkin.replace(/: /g, '_').replace(/:/g, '_');

  const currentImageUrl = activeSkin === '기본'
    ? `${CDN_URL}/nte images/characters/${safeName}/portrait.png`
    : `${CDN_URL}/nte images/skills/${safeName}/${safeSkin}.png`;

  return (
    <div className="min-h-[100dvh] bg-[#0a0a0a] flex flex-col font-sans">
      <SEO 
        title={`${character.name} - 이환 아카이브`} 
        description={character.briefInfo || `${character.name}의 상세 데이터`}
        url={`/gallery/${gameId}/character/${character.name}`}
        image={`${CDN_URL}/nte images/characters/${safeName}/portrait.png`}
        noindex={true}
      />
      
      <PageHeader gameId={gameId} title={character.name} />
      
      <main className="max-w-[1200px] mx-auto w-full px-4 pt-8 pb-24 space-y-12 relative z-10">
        <Link to={`/gallery/${gameId}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={16} />
          <span>{t('도감으로 돌아가기')}</span>
        </Link>
        
        <div className="glass-card p-8 rounded-[32px] flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-full md:w-1/3 aspect-[3/4] bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group">
            <img 
              src={currentImageUrl}
              alt={`${character.name} ${activeSkin}`}
              className={`w-full h-full object-cover transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
              onError={(e) => {
                e.currentTarget.src = `${CDN_URL}/nte images/characters/${safeName}/portrait.png`;
              }}
            />
            {character.skins && character.skins.length > 0 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl z-10 transition-transform duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                {character.skins.map((skin: string) => (
                  <button
                    key={skin}
                    onClick={() => handleSkinChange(skin)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      activeSkin === skin
                        ? 'bg-white text-black shadow-lg scale-105'
                        : 'text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    {skin}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <RarityStars />
              <h1 className="text-4xl font-black text-white">{character.name}</h1>
              <p className="text-gray-400">{character.briefInfo}</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1">{t('속성')}</span>
                <span className="text-sm font-bold text-white">{character.attribute}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1">{t('무기')}</span>
                <span className="text-sm font-bold text-white">{character.weaponType}</span>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-gray-300 leading-relaxed">
              {character.content || t('상세 설명이 준비 중입니다.')}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CharacterDetailNTE;
