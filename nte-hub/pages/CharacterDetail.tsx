import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Star, Sword, Shield, Zap, Sparkles, BookOpen, Layers, Target, Info, Calendar, Mic, Users, Feather } from 'lucide-react';
import { getGameData } from '../../common-hub/data/dataManager';
import { useTranslation } from 'react-i18next';
import SEO from '../../common-hub/components/SEO';
import PageHeader from '../../common-hub/components/PageHeader';
import { CDN_URL } from '../../common-hub/utils/assetManager';
import { CharacterReviewBoard } from '../../common-hub/components/CharacterReviewBoard';
import MarkdownRenderer from '../../common-hub/components/MarkdownRenderer';

const CharacterDetailNTE: React.FC = () => {
  const { charName } = useParams<{ charName: string }>();
  const gameId = 'nte';
  const { t } = useTranslation();
  
  const { CHARACTER_DB } = useMemo(() => getGameData(gameId), [gameId]);
  const character = useMemo(() => {
    return CHARACTER_DB.find((c: any) => c.id === charName || c.name === charName || c.originalName === charName);
  }, [charName, CHARACTER_DB]);

  const [activeSkin, setActiveSkin] = useState<string>('기본');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState('일반 공격');

  useEffect(() => {
    if (character?.skins?.length > 0) {
      setActiveSkin(character.skins[0]);
    } else {
      setActiveSkin('기본');
    }
  }, [character]);

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

  const handleSkinChange = (skin: string) => {
    if (skin === activeSkin) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSkin(skin);
      setIsAnimating(false);
    }, 200);
  };

  const safeName = character.name.replace(/: /g, '_').replace(/:/g, '_');
  const safeSkin = activeSkin.replace(/: /g, '_').replace(/:/g, '_');

  const currentImageUrl = activeSkin === '기본'
    ? `${CDN_URL}/nte images/characters/${safeName}/portrait.png`
    : `${CDN_URL}/nte images/skills/${safeName}/${safeSkin}.png`;

  const tabs = [
    { id: '일반 공격', label: '일반 공격', icon: Sword, content: character.basicAttack },
    { id: '도시 스킬', label: '도시 스킬', icon: Sparkles, content: character.citySkill },
    { id: '바이레일 스킬', label: '바이레일 스킬', icon: Zap, content: character.virailSkill },
    { id: '울티메이트', label: '울티메이트', icon: Target, content: character.ultimateSkill },
    { id: '서포트 스킬', label: '서포트 스킬', icon: Shield, content: character.supportSkill },
    { id: '패시브 1', label: '패시브 스킬 1', icon: BookOpen, content: character.passiveSkill1 },
    { id: '패시브 2', label: '패시브 스킬 2', icon: BookOpen, content: character.passiveSkill2 },
  ].filter(t => t.content);

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
        
        {/* Profile Section */}
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
          
          <div className="flex-1 space-y-6 w-full">
            <div className="space-y-2">
              <RarityStars />
              <h1 className="text-4xl font-black text-white">{character.name}</h1>
              <p className="text-gray-400">{character.briefInfo}</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Zap size={12}/> {t('이능력 속성')}</span>
                <span className="text-sm font-bold text-white">{character.attribute || '-'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Sword size={12}/> {t('아크')}</span>
                <span className="text-sm font-bold text-white">{character.arc || '-'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Users size={12}/> {t('소속')}</span>
                <span className="text-sm font-bold text-white">{character.affiliation || '-'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Calendar size={12}/> {t('생일')}</span>
                <span className="text-sm font-bold text-white">{character.birthday || '-'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Mic size={12}/> {t('성우')}</span>
                <span className="text-sm font-bold text-white truncate">{character.voiceActors || '-'}</span>
              </div>
              <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-gray-500 block uppercase tracking-widest mb-1 flex items-center gap-1"><Shield size={12}/> {t('전투 포지션')}</span>
                <div className="text-sm font-bold text-white flex flex-col">
                  {character.roles && character.roles.length > 0 ? (
                    character.roles.map((r: any, i: number) => <span key={i}>{typeof r === 'string' ? r : r.label}</span>)
                  ) : '-'}
                </div>
              </div>
            </div>
            
            {(character.content || character.locales) && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-gray-300 leading-relaxed text-sm">
                {character.content && <MarkdownRenderer content={character.content} />}
                {character.locales && (
                  <div className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-500">
                    <span className="font-bold">{t('언어별 표기')}:</span> {character.locales}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {tabs.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
              <Sparkles className="text-brand-primary" />
              {t('스킬 정보')}
            </h2>
            <div className="glass-card rounded-[32px] overflow-hidden flex flex-col md:flex-row border border-white/10">
              <div className="flex md:flex-col gap-2 p-4 border-b md:border-b-0 md:border-r border-white/10 bg-white/[0.02] overflow-x-auto w-full md:w-64 shrink-0 no-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                        activeTab === tab.id
                          ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30 shadow-lg shadow-brand-primary/10'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} />
                      {t(tab.label)}
                    </button>
                  );
                })}
              </div>
              <div className="p-6 md:p-8 flex-1 min-h-[300px]">
                {tabs.map((tab) => {
                  if (activeTab !== tab.id) return null;
                  return (
                    <div key={tab.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-2">
                           <img 
                            src={`${CDN_URL}/nte images/skills/${safeName}/${tab.id}.png`} 
                            alt={tab.label}
                            className="w-full h-full object-contain filter invert opacity-80"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white">{t(tab.label)}</h3>
                      </div>
                      <div className="text-gray-300 leading-relaxed skill-description">
                        <MarkdownRenderer content={tab.content} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Awakenings & Resonance */}
        {(character.awakenings || character.resonance) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {character.awakenings && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                  <Star className="text-brand-accent" />
                  {t('각성')}
                </h2>
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <MarkdownRenderer content={character.awakenings} />
                </div>
              </div>
            )}
            
            {character.resonance && (
              <div className="space-y-6">
                <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                  <Layers className="text-purple-400" />
                  {t('공명')}
                </h2>
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <MarkdownRenderer content={character.resonance} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Growth Stats & Materials */}
        {(character.growthStats || character.ascensionMaterials || character.skillMaterials) && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
              <Feather className="text-brand-primary" />
              {t('성장 정보')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {character.growthStats && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-2">{t('성장 스텟')}</h3>
                  <div className="text-sm text-gray-400 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
                    {character.growthStats}
                  </div>
                </div>
              )}
              {character.ascensionMaterials && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-2">{t('돌파 재료')}</h3>
                  <div className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {character.ascensionMaterials}
                  </div>
                </div>
              )}
              {character.skillMaterials && (
                <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold text-gray-200 border-b border-white/10 pb-2">{t('스킬 재료')}</h3>
                  <div className="text-sm text-gray-400 whitespace-pre-wrap leading-relaxed">
                    {character.skillMaterials}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <CharacterReviewBoard characterId={character.id || character.name || charName || ''} gameId={gameId} />
      </main>
    </div>
  );
};

export default CharacterDetailNTE;
