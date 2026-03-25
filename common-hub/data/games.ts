
import { ArchiveData, Character, LightCone, Relic, Ornament } from '../types';
import { CHARACTER_DATA } from '../../hsr-hub/data/characters';
import { SORTED_LIGHTCONE_DATA } from '../../hsr-hub/data/lightcones';
import { RELIC_DATA } from '../../hsr-hub/data/relics';
import { ORNAMENT_DATA } from '../../hsr-hub/data/ornaments';
import { WEAPON_DATA } from '../../ww-hub/data/weapons';
import { ECHO_DATA } from '../../ww-hub/data/echoes';
import { WW_CHARACTERS } from '../../ww-hub/data/characters';

export const CHARACTER_DB: Character[] = [
  ...CHARACTER_DATA.map(c => ({ ...c, gameId: c.gameId || 'hsr' })),
  ...WW_CHARACTERS.map(c => ({ ...c, gameId: c.gameId || 'ww' }))
];
export const LIGHTCONE_DB: LightCone[] = [
  ...SORTED_LIGHTCONE_DATA.map(lc => ({ ...lc, gameId: lc.gameId || 'hsr' })),
  ...WEAPON_DATA.map(w => ({ ...w, gameId: w.gameId || 'ww' }))
];
export const RELIC_DB: Relic[] = [
  ...RELIC_DATA.map(r => ({ ...r, gameId: r.gameId || 'hsr' })),
  ...ECHO_DATA.map(e => ({ ...e, gameId: e.gameId || 'ww' }))
];
export const ORNAMENT_DB: Ornament[] = ORNAMENT_DATA.map(o => ({ ...o, gameId: o.gameId || 'hsr' }));

export const ARCHIVE_DATA: ArchiveData = {
  games: [
    {
      id: 'hsr',
      title: '붕괴: 스타레일',
      subTitle: 'Honkai: Star Rail Archive',
      bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/hsr_main.webp',
      posts: [
        {
          id: 'hsr-1',
          title: '선데이(Sunday) 완전 공략 가이드',
          category: '캐릭터',
          thumbnail: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/posts/sunday_guide.webp',
          excerpt: '질서의 화합 사도, 선데이의 스킬 메커니즘과 추천 조합을 분석합니다.',
          author: 'Rira',
          date: '2024-05-20',
          keywords: ['선데이', '캐릭터', '공략', '화합'],
          content: `<h1>선데이 캐릭터 분석</h1><p>선데이는 강력한 서포터로 설계되었습니다.</p><h2>핵심 메커니즘</h2><p>그의 필살기는 아군의 에너지 회복과 피해 증가를 동시에 제공합니다.</p><img src="https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/posts/sunday_skill.webp" alt="Sunday Skills" /><h2>추천 광추</h2><p>전용 광추인 '나의 뜻은 영원하리'가 가장 효율이 좋습니다.</p>`
        }
      ]
    },
    {
      id: 'ww',
      title: '명조: 워더링 웨이브',
      subTitle: 'Wuthering Waves Archive',
      bannerImage: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/banners/ww_main.webp',
      posts: [
        {
          id: 'ww-1',
          title: '기염(Jiyan) 심층 분석 가이드',
          category: '캐릭터',
          thumbnail: 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/hsr images/posts/jiyan_guide.webp',
          excerpt: '밤샘의 용 기염의 딜 메커니즘과 에코 세팅을 정리합니다.',
          author: 'Rira',
          date: '2024-05-22',
          keywords: ['기염', '명조', '캐릭터', '공략'],
          content: `<h1>기염 캐릭터 분석</h1><p>기염은 강력한 기류 속성 딜러입니다.</p><h2>핵심 스킬</h2><p>강공격 중심의 딜사이클을 보유하고 있습니다.</p>`
        }
      ]
    }
  ]
};
