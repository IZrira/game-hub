
export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'event' | 'info';
}

export const HSR_NOTICES: Notice[] = [
  {
    id: 'hsr_upd_4_1_ornaments',
    title: '붕괴: 스타레일 4.1 버전 신규 차원 장신구 추가 안내',
    date: '2026-04-04',
    content: '4.1 버전에 새롭게 추가된 차원 장신구 「0호 스테이지 펑크 로드」와 「천 개의 별이 모인 도시」의 세트 효과 및 상세 데이터가 도감에 업데이트되었습니다.',
    type: 'update'
  },
  {
    id: 'hsr_upd_4_1',
    title: '붕괴: 스타레일 4.1 버전 업데이트 및 아카이브 반영 안내',
    date: '2026-04-03',
    content: '4.1 버전 신규 수렵 캐릭터인 「애쉬베일」의 전체 데이터와 육성 재료 정보가 아카이브에 동기화되었습니다.',
    type: 'update'
  },
  {
    id: 'hsr_upd_4_0',
    title: '붕괴: 스타레일 4.0 버전 캐릭터 업데이트 안내',
    date: '2026-03-28',
    content: '4.0 버전의 신규 환락 캐릭터 「스파키」와 「효광」의 데이터가 추가되었습니다.',
    type: 'update'
  },
  {
    id: 'hsr_upd_1',
    title: '붕괴: 스타레일 2.1 버전 업데이트 안내',
    date: '2024-03-27',
    content: '새로운 지역 페나코니의 이야기가 계속됩니다.',
    type: 'update'
  },
  {
    id: 'hsr_evt_1',
    title: '별의 선물 이벤트 실시',
    date: '2024-03-20',
    content: '로그인만 해도 성옥을 드립니다.',
    type: 'event'
  }
];
