import { PartyCombination } from './index';

export const dotParties: PartyCombination[] = [
  {
    id: 'party_hisilence_dot_1',
    name: '히실렌스 지속 피해 파티 (1순위)',
    description: '히실렌스의 지속 피해 능력을 카프카와 블랙 스완으로 보조하는 조합입니다.',
    mainDPS: '히실렌스',
    category: '지속 피해',
    members: [
      { id: 'char_히실렌스', name: '히실렌스', role: '메인 딜러', folderName: '히실렌스' },
      { id: 'char_카프카', name: '카프카', role: '메인 딜러', folderName: '카프카' },
      { 
        id: 'char_블랙_스완', 
        name: '블랙 스완', 
        role: '서포터', 
        folderName: '블랙 스완',
        substitutes: [
          { name: '완•매', role: '서포터', folderName: '완•매' },
          { name: '키레네', role: '서포터', folderName: '키레네' },
          { name: '로빈', role: '서포터', folderName: '로빈' }
        ]
      },
      { 
        id: 'char_단항등황', 
        name: '단항•등황', 
        role: '탱커/힐러', 
        folderName: '단항•등황',
        substitutes: [
          { name: '곽향', role: '힐러', folderName: '곽향' },
          { name: '히아킨', role: '힐러', folderName: '히아킨' },
          { name: '어벤츄린', role: '탱커', folderName: '어벤츄린' },
          { name: '갤러거', role: '힐러', folderName: '갤러거' },
          { name: '나찰', role: '힐러', folderName: '나찰' }
        ]
      }
    ],
    tags: ['히실렌스', '지속피해', '카프카']
  }
];
