import { toPublicParty } from '../data/adminData';
import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { NTE_PARTY_COMBINATIONS, NTEPartyCombination } from '../data/parties';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import PartyBrowser, { PartyCardData } from '../../common-hub/components/PartyBrowser';
import SEO from '../../common-hub/components/SEO';
import { NTE_PARTY_SEO } from '../../common-hub/data/ntePartySeo.js';
import { getNteCharacterIconUrl } from '../../common-hub/utils/imageHelper';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../common-hub/lib/supabase';

const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/nte images';
const NTE_ACCENT = '#00D287';
const UNKNOWN_IMAGE = `${BASE_IMAGE_URL}/common/unknown.webp`;

const getIconUrl = (member: { folderName?: string; name: string }) => getNteCharacterIconUrl((member.folderName || member.name).normalize('NFC'));

const NTEPartyRecommendations: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const [parties, setParties] = useState<NTEPartyCombination[]>(NTE_PARTY_COMBINATIONS);

  useEffect(() => {
    let active = true;
    const loadParties = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('party_recommendations')
          .select('*').eq('game_id', 'nte').order('display_order', { ascending: true });
        if (error) throw error;
        if (active && data?.length) setParties(data.map(toPublicParty));
      } catch (error) {
        console.warn('Could not load remote NTE parties:', error);
      }
    };
    loadParties();
    return () => { active = false; };
  }, []);

  const cards = useMemo<PartyCardData[]>(() => {
    const href = (name: string) => `/gallery/${gameId}/character/${encodeURIComponent(name)}`;
    return parties.map(party => ({
      id: party.id,
      name: party.name,
      category: party.category,
      mainDPS: party.mainDPS,
      description: party.description,
      pros: party.pros,
      cons: party.cons,
      tags: party.tags,
      members: party.members.map(member => ({
        name: member.name,
        role: member.role,
        attribute: member.attribute,
        breakthrough: (member as any).breakthrough,
        imageUrl: getIconUrl(member),
        fallbackUrl: UNKNOWN_IMAGE,
        href: href(member.name),
        substitutes: member.substitutes?.map(sub => ({
          name: sub.name,
          role: sub.role,
          breakthrough: (sub as any).breakthrough,
          imageUrl: getIconUrl(sub),
          fallbackUrl: UNKNOWN_IMAGE,
          href: href(sub.name),
        })),
      })),
    }));
  }, [parties, gameId]);

  return (
    <div className="flex flex-col lg:flex-row bg-[#0a0a0a] min-h-screen text-gray-200">
      <SEO 
        title={t(NTE_PARTY_SEO.title)}
        description={t(NTE_PARTY_SEO.description)}
        url={NTE_PARTY_SEO.url}
        keywords="이환, Neverness to Everness, 파티 추천, 추천 조합, 구원 파티, 민트 파티, 6대 속성 시너지, 리라 아카이브"
      />
      <GallerySidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <PageHeader gameId={gameId || 'nte'} category={t("파티")} title={t("추천 파티 조합")} />

        <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-12 space-y-8">
          <header className="space-y-2 border-b border-white/5 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-white break-keep sm:text-4xl">
              {t(NTE_PARTY_SEO.heading)}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
              {t(NTE_PARTY_SEO.description)}
            </p>
          </header>

          <PartyBrowser parties={cards} slots={4} accent={NTE_ACCENT} categoryOrder={[]} searchPlaceholder={t("캐릭터, 속성, 파티명 검색...")} />
        </main>
      </div>
    </div>
  );
};

export default NTEPartyRecommendations;
