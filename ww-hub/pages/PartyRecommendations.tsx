import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { Info } from 'lucide-react';
import { WW_PARTY_COMBINATIONS, PartyCombination } from '../data/parties';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import PartyBrowser, { PartyCardData } from '../../common-hub/components/PartyBrowser';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../common-hub/lib/supabase';
import { withAssetVersion, resolveRoverImageInfo } from '../../common-hub/utils/assetManager';

const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/ww images';
const WW_ACCENT = '#EAB308';

const getIconUrl = (member: { folderName?: string; name: string }) => {
  const folder = member.folderName || member.name;
  const roverInfo = resolveRoverImageInfo(folder);
  if (roverInfo) {
    return roverInfo.url;
  }
  return withAssetVersion(encodeURI(`${BASE_IMAGE_URL}/skills/${folder.normalize('NFC')}/${folder.normalize('NFC')}.webp`));
};

const PartyRecommendations: React.FC = () => {
  const { t } = useTranslation();
  const { gameId } = useParams<{ gameId: string }>();
  const [partiesList, setPartiesList] = useState<PartyCombination[]>(WW_PARTY_COMBINATIONS);

  // Supabase 실시간 동기화 & localStorage 즉시 로드
  useEffect(() => {
    // 1단계: localStorage 캐시 즉시 적용 (0ms 지연 없음)
    try {
      const local = localStorage.getItem('parties_WW');
      if (local) {
        const localParties = JSON.parse(local);
        if (Array.isArray(localParties) && localParties.length > 0) {
          const parsed: PartyCombination[] = localParties.map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description || '',
            mainDPS: item.mainDPS || '',
            tags: item.tags || [],
            pros: item.pros || [],
            cons: item.cons || [],
            members: (item.slots || []).map((m: any) => ({
              id: m.characterId || m.id,
              name: m.characterName || m.name,
              folderName: m.folderName || m.characterName || m.name,
              role: m.role || '서포터',
              breakthrough: m.breakthrough,
              description: m.description,
              substitutes: m.substitutes?.map((s: any) => ({
                name: s.characterName || s.name,
                folderName: s.folderName || s.characterName || s.name,
                breakthrough: s.breakthrough,
                description: s.description,
                role: s.role
              }))
            }))
          }));
          setPartiesList(parsed);
        }
      }
    } catch (e) {
      console.warn('Local storage party parse error:', e);
    }

    // 2단계: Supabase 클라우드 실시간 동기화 확인
    const fetchCloudParties = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('party_recommendations')
          .select('*')
          .eq('game_id', 'ww')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const parsed: PartyCombination[] = data.map((item: any) => ({
            id: item.party_id || item.id,
            name: item.name,
            description: item.description || '',
            mainDPS: item.main_dps || item.mainDPS || '',
            tags: item.tags || [],
            pros: item.pros || [],
            cons: item.cons || [],
            members: (item.members || []).map((m: any) => ({
              id: m.characterId || m.id,
              name: m.characterName || m.name,
              folderName: m.folderName || m.characterName || m.name,
              role: m.role || '서포터',
              breakthrough: m.breakthrough,
              description: m.description,
              substitutes: m.substitutes?.map((s: any) => ({
                name: s.characterName || s.name,
                folderName: s.folderName || s.characterName || s.name,
                breakthrough: s.breakthrough,
                description: s.description,
                role: s.role
              }))
            }))
          }));
          setPartiesList(parsed);
        }
      } catch (err) {
        console.warn('Supabase cloud fetch failed (using local/fallback data):', err);
      }
    };

    fetchCloudParties();
  }, []);

  const cards = useMemo<PartyCardData[]>(() => {
    const href = (name: string) => `/gallery/${gameId}/character/${encodeURIComponent(name)}`;
    return partiesList.map(party => ({
      id: party.id,
      name: party.name,
      mainDPS: party.members.find(member => member.role === '메인 딜러')?.name,
      description: party.description,
      pros: party.pros,
      cons: party.cons,
      members: party.members.map((member: any) => ({
        name: member.name,
        role: member.role,
        breakthrough: member.breakthrough,
        imageUrl: getIconUrl(member),
        href: href(member.name),
        substitutes: member.substitutes?.map((sub: any) => ({
          name: sub.name,
          role: sub.role,
          breakthrough: sub.breakthrough,
          imageUrl: getIconUrl(sub),
          href: href(sub.name),
        })),
      })),
    }));
  }, [partiesList, gameId]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24">
      <PageHeader gameId={gameId} category={t("파티")} title={t("추천 파티 조합")} />

      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <GallerySidebar />

        <div className="min-w-0 space-y-8">
          <header className="space-y-2 border-b border-white/5 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-white break-keep sm:text-4xl">
              {t('명조 추천 파티 조합')}
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
              명조: 워더링 웨이브의 최적 파티 조합 가이드입니다.
            </p>
            <details className="pt-2">
              <summary className="cursor-pointer py-2 text-sm font-bold text-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EAB308]">
                <Info className="mr-2 inline-block align-[-3px] text-gray-400" size={16} aria-hidden="true" />{t('파티 편성 안내')}
              </summary>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-gray-400">
                본 가이드는 추천 조합일 뿐이며, 상황에 따라 유동적으로 변경될 수 있습니다.
              </p>
            </details>
          </header>

          <PartyBrowser parties={cards} slots={3} accent={WW_ACCENT} />
        </div>
      </div>
    </div>
  );
};

export default PartyRecommendations;

