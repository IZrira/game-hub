
export interface PartyMember {
  id: string;
  name: string;
  folderName: string;
  role: string;
}

export interface PartyCombination {
  id: string;
  name: string;
  description: string;
  members: PartyMember[];
  pros: string[];
  cons: string[];
}

export const WW_PARTY_COMBINATIONS: PartyCombination[] = [
  {
    id: 'jiyan_hyper',
    name: '기염 하이퍼캐리',
    description: '기염의 광역 딜링을 극대화하는 조합입니다.',
    members: [
      { id: 'jiyan', name: '기염', folderName: '기염', role: '메인 딜러' },
      { id: 'mortefi', name: '모르테피', folderName: '모르테피', role: '서브 딜러' },
      { id: 'verina', name: '벨리나', folderName: '벨리나', role: '서포터' }
    ],
    pros: ['강력한 광역 딜링', '안정적인 에너지 수급'],
    cons: ['기염의 의존도가 높음']
  }
];
