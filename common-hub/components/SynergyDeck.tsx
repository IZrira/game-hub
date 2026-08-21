import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'react-router';
import LazyImage from './LazyImage';
import * as htmlToImage from 'html-to-image';
import { 
  getRecommendedParties, 
  getElementGlowMapping, 
  calculateSubstitutes, 
  UnifiedPartyMember, 
  UnifiedParty 
} from '../utils/synergyManager';
import { getCharacterArtPath } from '../utils/imageHelper';
import { ChevronDown, ChevronUp, Users, Sparkles, CheckCircle2, AlertCircle, Share2, Camera, Link as LinkIcon, Check } from 'lucide-react';

export interface SynergyDeckProps {
  characterName: string;
  gameId: 'hsr' | 'ww' | 'nte';
  theme?: {
    primary: string;
    secondary: string;
    shadow?: string;
  };
  sectionNum?: string;
  className?: string;
}

const SectionHeader: React.FC<{ 
  num: string; 
  title: string; 
  theme?: { primary: string; secondary?: string; shadow?: string }; 
}> = ({ num, title, theme }) => {
  const primaryColor = theme?.primary || '#00D287';
  return (
    <div className="flex items-center justify-between w-full mb-5">
      <div className="flex items-center gap-3 md:gap-4">
        <div 
          className="w-12 h-12 md:w-14 md:h-14 rounded-[22px] border-2 flex items-center justify-center font-black text-lg md:text-xl shadow-2xl transition-transform hover:scale-105" 
          style={{ 
            backgroundColor: `${primaryColor}20`, 
            color: primaryColor, 
            borderColor: `${primaryColor}60` 
          }}
        >
          {num}
        </div>
        <h2 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase border-l-4 border-white/10 pl-4 md:pl-6 leading-none py-1">
          {title}
        </h2>
      </div>
    </div>
  );
};

export const SynergyDeck: React.FC<SynergyDeckProps> = ({
  characterName,
  gameId,
  theme,
  sectionNum,
  className = ''
}) => {
  const parties: UnifiedParty[] = useMemo(() => {
    return getRecommendedParties(gameId, characterName);
  }, [gameId, characterName]);

  const [activePartyIndex, setActivePartyIndex] = useState(0);
  const [expandedSubstitutes, setExpandedSubstitutes] = useState<Record<string, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const partyCardRef = useRef<HTMLDivElement>(null);

  const activeParty = parties[activePartyIndex] || parties[0];

  const glow = useMemo(() => {
    return getElementGlowMapping(gameId, activeParty?.category || theme?.primary);
  }, [gameId, activeParty, theme]);

  const handleCopyPartyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('party', String(activePartyIndex));
    navigator.clipboard.writeText(url.toString());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleExportPartyImage = async () => {
    if (!partyCardRef.current || isExportingImage) return;
    try {
      setIsExportingImage(true);
      const dataUrl = await htmlToImage.toPng(partyCardRef.current, {
        quality: 0.95,
        backgroundColor: '#0c0c0e',
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `${characterName}_${activeParty.name}_파티조합_RIRA.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('파티 이미지 저장 오류:', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  const toggleSubstituteDrawer = (memberId: string) => {
    setExpandedSubstitutes(prev => ({
      ...prev,
      [memberId]: !prev[memberId]
    }));
  };

  const getRoleBadgeStyle = (role: string) => {
    const lowerRole = role.toLowerCase();
    if (role.includes('서브 딜러') || lowerRole.includes('sub')) {
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    }
    if (role.includes('메인 딜러') || role.includes('딜러') || lowerRole.includes('main') || lowerRole.includes('dps')) {
      return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
    }
    if (role.includes('서포터') || role.includes('버퍼') || role.includes('디버퍼') || lowerRole.includes('support') || lowerRole.includes('buffer')) {
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
    if (role.includes('힐러') || role.includes('탱커') || role.includes('생존') || lowerRole.includes('healer') || lowerRole.includes('tank') || lowerRole.includes('sustain')) {
      return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
    }
    return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
  };

  const defaultNum = sectionNum || (gameId === 'ww' ? '06' : '05');

  if (!parties || parties.length === 0) {
    return (
      <section className={`w-full mt-12 ${className}`}>
        <SectionHeader num="08" title="추천 파티 조합" theme={theme} />
        <div className="bg-[#0f0f0f]/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[35px] py-12 flex flex-col items-center justify-center gap-3">
          <AlertCircle size={32} className="text-gray-500 opacity-50" />
          <span className="text-sm font-bold text-gray-400 tracking-wider">데이터 준비중입니다</span>
        </div>
      </section>
    );
  }

  const isThreeMemberGrid = gameId === 'ww' || activeParty.members.length === 3;

  return (
    <section className={`w-full mt-8 relative ${className}`}>
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-[100px] opacity-20 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: theme?.primary || glow.primary }}
      />

      <SectionHeader num={defaultNum} title="추천 파티 조합" theme={theme} />

      <div ref={partyCardRef} className="bg-[#0f0f0f]/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[28px] p-5 md:p-6 relative overflow-hidden">
        
        {/* Header & Share Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-white/10 pb-4">
          {/* Multi-party selection tabs */}
          {parties.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {parties.map((party, idx) => {
                const isActive = idx === activePartyIndex;
                return (
                  <button
                    key={party.id || idx}
                    onClick={() => setActivePartyIndex(idx)}
                    className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 border flex items-center gap-2 ${
                      isActive 
                        ? 'bg-white/15 text-white border-white/30 shadow-lg scale-[1.02]' 
                        : 'bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-gray-200'
                    }`}
                    style={{
                      borderColor: isActive ? (theme?.primary || glow.borderGlow) : undefined,
                      boxShadow: isActive ? `0 0 15px ${glow.glowColor}` : undefined
                    }}
                  >
                    <Sparkles size={14} className={isActive ? 'text-amber-300' : 'text-gray-400'} />
                    {party.name}
                  </button>
                );
              })}
            </div>
          ) : <div />}

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPartyLink}
              title="파티 조합 링크 복사"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all active:scale-95"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <LinkIcon size={14} />}
              <span>{copiedLink ? '복사 완료!' : 'URL 공유'}</span>
            </button>

            <button
              onClick={handleExportPartyImage}
              disabled={isExportingImage}
              title="파티 조합 카드 이미지로 저장"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <Camera size={14} />
              <span>{isExportingImage ? '생성 중...' : '이미지 저장'}</span>
            </button>
          </div>
        </div>

        {/* Active Party Description Banner */}
        <div className="mb-6 bg-white/[0.03] border border-white/10 rounded-2xl p-4 md:p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users size={18} style={{ color: theme?.primary || glow.primary }} />
            <h3 className="text-lg font-bold text-white tracking-tight">{activeParty.name}</h3>
            {activeParty.category && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-gray-300 border border-white/10">
                {activeParty.category}
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
            {activeParty.description}
          </p>

          {/* Tags */}
          {activeParty.tags && activeParty.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
              {activeParty.tags.map((tag, i) => (
                <span key={i} className="text-[10px] font-medium text-gray-400 bg-white/5 px-2 py-0.5 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Pros & Cons if available */}
          {(activeParty.pros || activeParty.cons) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/5 text-xs">
              {activeParty.pros && activeParty.pros.length > 0 && (
                <div className="space-y-1">
                  {activeParty.pros.map((pro, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle2 size={13} className="shrink-0" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeParty.cons && activeParty.cons.length > 0 && (
                <div className="space-y-1">
                  {activeParty.cons.map((con, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-rose-400">
                      <AlertCircle size={13} className="shrink-0" />
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Member Grid */}
        <div className={`grid gap-4 ${isThreeMemberGrid ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
          {activeParty.members.map((member: UnifiedPartyMember, idx: number) => {
            const substitutes = calculateSubstitutes(member, gameId);
            const isDrawerOpen = !!expandedSubstitutes[member.id];
            const artPath = getCharacterArtPath(gameId, member.folderName, 'art01');

            return (
              <div 
                key={member.id || idx}
                className={`group relative bg-[#121212]/60 hover:bg-[#181818]/90 border rounded-[20px] p-3 flex flex-col justify-between transition-all duration-300 ${
                  member.isMainTarget 
                    ? 'border-amber-400/80 shadow-[0_0_20px_rgba(251,191,36,0.25)] ring-1 ring-amber-400/50' 
                    : 'border-white/10 hover:border-white/20 shadow-lg'
                }`}
              >
                {/* Main Target Highlight Badge */}
                {member.isMainTarget && (
                  <div className="absolute top-2 right-2 z-10 bg-amber-400 text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-md">
                    현재 캐릭터
                  </div>
                )}

                {/* Member Portrait */}
                <Link 
                  to={`/gallery/${gameId}/character/${encodeURIComponent(member.folderName)}`}
                  className="relative w-full aspect-[3/4] rounded-[14px] overflow-hidden mb-2.5 bg-black/40 border border-white/5 block group-hover:border-white/20 transition-colors"
                >
                  <LazyImage 
                    src={artPath}
                    alt={`${member.name} 포트레이트`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  
                  {/* Name overlay */}
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-sm font-black text-white drop-shadow-md block truncate">
                      {member.name}
                    </span>
                    {member.attribute && (
                      <span className="text-[10px] text-gray-300 block font-medium">
                        {member.attribute} 속성
                      </span>
                    )}
                  </div>
                </Link>

                {/* Role Badge */}
                <div className="mb-2">
                  <span className={`inline-block w-full text-center px-2.5 py-1 rounded-xl text-[11px] font-bold border backdrop-blur-md ${getRoleBadgeStyle(member.role)}`}>
                    {member.role}
                  </span>
                </div>

                {/* Substitutes Button & Drawer */}
                {substitutes.length > 0 && !member.isMainTarget && (
                  <div className="mt-1">
                    <button
                      onClick={() => toggleSubstituteDrawer(member.id)}
                      className="w-full py-1.5 px-2.5 text-[11px] font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all flex items-center justify-center gap-1"
                    >
                      {isDrawerOpen ? (
                        <>
                          <span>닫기</span>
                          <ChevronUp size={12} />
                        </>
                      ) : (
                        <>
                          <span>+ 대체 {substitutes.length}명</span>
                          <ChevronDown size={12} />
                        </>
                      )}
                    </button>

                    {/* Expandable Substitute Drawer */}
                    {isDrawerOpen && (
                      <div className="mt-2 p-2.5 bg-black/60 border border-white/10 rounded-xl space-y-2 animate-fadeIn">
                        <div className="text-[10px] font-bold text-gray-400 border-b border-white/10 pb-1">
                          대체 추천 캐릭터
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {substitutes.map((sub, sIdx) => {
                            const subArtPath = getCharacterArtPath(gameId, sub.folderName, 'art01');
                            return (
                              <Link 
                                key={sIdx} 
                                to={`/gallery/${gameId}/character/${encodeURIComponent(sub.folderName)}`}
                                className="flex items-center gap-1.5 bg-white/5 pr-2 rounded-full border border-white/10 overflow-hidden hover:bg-white/20 transition-all hover:scale-105"
                              >
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-black/40 shrink-0">
                                  <LazyImage 
                                    src={subArtPath} 
                                    alt={sub.name}
                                    className="w-full h-full object-cover object-top" 
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-gray-200">{sub.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SynergyDeck;
