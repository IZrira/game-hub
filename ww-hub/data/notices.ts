
export interface Notice {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'update' | 'event' | 'info';
}

export const WW_NOTICES: Notice[] = [
  {
    id: 'ww_upd_1',
    title: '명조: 워더링 웨이브 1.0 정식 출시 안내',
    date: '2024-05-23',
    content: '방랑자 여러분, 새로운 세상으로 오신 것을 환영합니다.',
    type: 'update'
  },
  {
    id: 'ww_evt_1',
    title: '사전 예약 보상 수령 안내',
    date: '2024-05-22',
    content: '사전 예약에 참여해주신 모든 분들께 감사드립니다.',
    type: 'event'
  }
];
