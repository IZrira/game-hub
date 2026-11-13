import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { HSR_PARTIES, PartyCombination } from '../data/parties';
import { CHARACTER_DB } from '../../common-hub/data/games';
import GallerySidebar from '../../common-hub/components/GallerySidebar';
import PageHeader from '../../common-hub/components/PageHeader';
import PartyBrowser, { PartyCardData } from '../../common-hub/components/PartyBrowser';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../common-hub/lib/supabase';
import { getHsrCharacterPath } from '../utils/characterRoute';

const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/IZrira/riragameinfo/main/hsr images';
const HSR_ACCENT = '#7E30E1';
const CATEGORY_ORDER = ['범위', '단일', '추가 공격', '지속 피해', '격파', '기억', '환락', '하이퍼캐리'];

const normalizeName = (name: string) => {
  if (!name) return "";
  return name.replace(/\s+/g, '').replace(/[•·]/g, '').normalize('NFC');
};

const PartyRecommendations: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { t } = useTranslation();
  const [partiesList, setPartiesList] = useState<PartyCombination[]>(HSR_PARTIES);

  // 첫 화면은 빌드 때 받은 관리자 DB 사본으로 그리고, 빌드 뒤에 바뀐 내용은 DB에서 다시 읽어 반영한다.
  useEffect(() => {
    const fetchCloudParties = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('party_recommendations')
          .select('*')
          .eq('game_id', 'hsr')
          .order('display_order', { ascending: true });

        if (!error && data && data.length > 0) {
          const parsed: PartyCombination[] = data.map((item: any) => ({
            id: item.party_id || item.id,
            name: item.name,
            description: item.description || '',
            category: item.category || '기타',
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
              isTrailblazer: (m.characterName || m.name || '').includes('개척자'),
              substitutes: m.substitutes?.map((s: any) => ({
                name: s.characterName || s.name,
                folderName: s.folderName || s.characterName || s.name,
                breakthrough: s.breakthrough,
                description: s.description,
                role: s.role,
                isTrailblazer: (s.characterName || s.name || '').includes('개척자')
              }))
            }))
          }));
          setPartiesList(parsed);
        }
      } catch (err) {
        console.warn('Supabase cloud fetch failed (using the build-time party data):', err);
      }
    };

    fetchCloudParties();
  }, []);

  const charMap = useMemo(() => {
    const map = new Map<string, any>();
    CHARACTER_DB.forEach(c => {
      map.set(normalizeName(t(c.name)), c);
      map.set(normalizeName(c.folderName), c);
    });
    return map;
  }, [t]);

  const cards = useMemo<PartyCardData[]>(() => {
    const imageFor = (name: string, trailblazerArt: boolean) => {
      const char = charMap.get(normalizeName(t(name)));
      if (!char) return '';
      const file = trailblazerArt ? 'art01-01.webp' : 'art01.webp';
      return `${BASE_IMAGE_URL}/캐릭터/${encodeURIComponent(char.folderName.normalize('NFC'))}/${file}`;
    };
    // Detail URLs use the English id; a Korean name in the path is a 404.
    const href = (name: string) => getHsrCharacterPath(name);
    return partiesList.map(party => ({
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
        breakthrough: member.breakthrough,
        imageUrl: imageFor(member.name, false),
        href: href(member.name),
        substitutes: member.substitutes?.map(sub => ({
          name: sub.name,
          role: sub.role,
          breakthrough: sub.breakthrough,
          imageUrl: imageFor(sub.name, !!sub.isTrailblazer),
          href: href(sub.name),
        })),
      })),
    }));
  }, [partiesList, charMap, t]);

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-24 font-sans">
      <PageHeader gameId={gameId} category={t("파티")} title={t("추천 파티 조합")} />

      <div className="max-w-[1600px] mx-auto w-full px-4 md:px-8 pt-10 pb-24 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
        <aside className="hidden lg:block">
          <GallerySidebar />
        </aside>

        <div className="min-w-0 space-y-8">
          <header className="space-y-2 border-b border-white/5 pb-6">
            <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{t("추천 파티 조합")}</h1>
            <p className="max-w-2xl text-sm leading-relaxed text-gray-400">
              {t("메인 딜러의 성능을 극대화하는 최적의 파티 조합 가이드입니다. 캐릭터별 시너지를 고려한 최적의 구성을 확인하세요.")}
            </p>
          </header>

          <PartyBrowser parties={cards} slots={4} accent={HSR_ACCENT} categoryOrder={CATEGORY_ORDER} />
        </div>
      </div>
    </div>
  );
};

export default PartyRecommendations;
