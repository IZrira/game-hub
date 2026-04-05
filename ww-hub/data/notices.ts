
export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'event' | 'info';
}

export const WW_NOTICES: Notice[] = [
  {
    id: 'ww_upd_260405',
    title: '명조 갤러리 UI 테마 개편 및 성능 최적화 적용',
    date: '2026-04-05',
    content: '명조 아카이브 갤러리의 카드 및 모달 UI에 신규 무드보드 테마가 일괄 적용되었습니다. 또한 대량의 에코 및 무기 이미지를 더 빠르게 불러올 수 있도록 렌더링 성능이 대폭 개선되었습니다.',
    type: 'update'
  },
  {
    id: 'ww_upd_260404',
    title: '명조 무기 도감 전면 개편 및 상세 페이지 업데이트',
    date: '2026-04-04',
    content: '명조 무기 도감의 상세 페이지가 스타레일 광추와 동일한 레이아웃으로 새롭게 개편되었습니다. 공명 랭크(재련)에 따른 수치 동적 변화 및 상세 스토리를 보다 직관적으로 확인할 수 있습니다.',
    type: 'update'
  },
  {
    id: 'ww_upd_260401',
    title: '캐릭터 전적 검색 및 빌드 카드 공유 기능 업데이트',
    date: '2026-04-01',
    content: '명조 캐릭터의 상세 공략, 빌드 카드 캡처 및 네이티브 공유 기능이 추가되어 더욱 편리하게 세팅을 공유할 수 있습니다.',
    type: 'update'
  },
  {
    id: 'ww_sys_260326',
    title: '명조(WW) 인벤토리 시스템 및 아이템 필터링 카테고리 추가',
    date: '2026-03-26',
    content: '명조 아카이브 내 인벤토리 시스템이 새롭게 구축되었으며, 소재 및 에코 등 아이템 필터링 기능이 세분화되었습니다.',
    type: 'info'
  },
  {
    id: 'ww_upd_1',
    title: '명조: 워더링 웨이브 1.0 정식 출시 안내',
    date: '2024-05-23',
    content: '방랑자 여러분, 새로운 세상으로 오신 것을 환영합니다.',
    type: 'update'
  }
];
