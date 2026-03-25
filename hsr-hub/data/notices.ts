
export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'event' | 'info';
}

export const HSR_NOTICES: Notice[] = [
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
