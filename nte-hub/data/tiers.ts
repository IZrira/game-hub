export interface NTETierCharacter {
  id: string;
  name: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '탱커/힐러';
  attribute: '령' | '혼' | '음' | '양' | '공' | '상' | string;
  change?: 'up' | 'down' | 'new' | 'stay';
  note?: string;
}

export interface NTETierGroup {
  tier: 'S+' | 'S' | 'A+' | 'A' | 'B';
  description: string;
  color: string;
  characters: NTETierCharacter[];
}

export interface NTETierCategory {
  id: 'overall' | 'distortion' | 'overworld';
  name: string;
  description: string;
  tiers: NTETierGroup[];
}

export const NTE_TIER_CATEGORIES: NTETierCategory[] = [
  {
    id: 'overall',
    name: '종합 메타 티어 (Overall Meta)',
    description: '헤테로 시티 콘텐츠 전반에서의 범용성, 속성 시너지, 바이레일 스킬 계수 종합 평가',
    tiers: [
      {
        tier: 'S+',
        description: '메타를 지배하는 대체 불가능한 0순위 핵심 에스퍼',
        color: '#f59e0b',
        characters: [
          { id: 'nte-zhanhong', name: '잔홍', role: '메인 딜러', attribute: '혼', change: 'stay', note: '환상 상태 폭딜 및 방어력 관통' },
          { id: 'nte-guwon', name: '구원', role: '메인 딜러', attribute: '령', change: 'stay', note: '령 속성 메인 폭딜러' },
          { id: 'nte-lacrimosa', name: '라크리모사', role: '탱커/힐러', attribute: '음', change: 'stay', note: '절대 생존 실드 및 아군 회복' },
          { id: 'nte-hotori', name: '호토리', role: '서포터', attribute: '양', change: 'up', note: '에스퍼 사이클 충전 및 속성 저항 관통' }
        ]
      },
      {
        tier: 'S',
        description: '최상급의 화력과 유틸리티를 갖춘 1티어 에스퍼',
        color: '#8b5cf6',
        characters: [
          { id: 'nte-shinku', name: '신쿠', role: '메인 딜러', attribute: '상', change: 'stay', note: '시공간 왜곡 및 광역 폭격' },
          { id: 'nte-chaos', name: '카오스', role: '메인 딜러', attribute: '공', change: 'stay', note: '공간 분쇄 지속 딜러' },
          { id: 'nte-mint', name: '민트', role: '서브 딜러', attribute: '령', change: 'stay', note: '고속 령 속성 연계' },
          { id: 'nte-daffodil', name: '다포딜', role: '탱커/힐러', attribute: '양', change: 'stay', note: '지속 힐 및 상태이상 정화' }
        ]
      },
      {
        tier: 'A+',
        description: '특정 파티 조합에서 뛰어난 성능을 발휘하는 우수 에스퍼',
        color: '#3b82f6',
        characters: [
          { id: 'nte-adler', name: '아들러', role: '서브 딜러', attribute: '상', change: 'stay', note: '상태이상 디버프 지원' },
          { id: 'nte-cheese', name: '치즈', role: '서포터', attribute: '양', change: 'stay', note: '아군 버프 및 유틸 지원' },
          { id: 'nte-edgar', name: '에드가', role: '서브 딜러', attribute: '혼', change: 'stay', note: '화염 도트 연계' },
          { id: 'nte-haniel', name: '하니엘', role: '서포터', attribute: '공', change: 'stay', note: '군중 제어 및 몹몰이' },
          { id: 'nte-nanali', name: '나나리', role: '서브 딜러', attribute: '상', change: 'stay', note: '변형 아크 활용 특화' }
        ]
      },
      {
        tier: 'A',
        description: '안정적인 성능을 보여주는 육성 가치 높은 에스퍼',
        color: '#10b981',
        characters: [
          { id: 'nte-amber', name: '엠버', role: '서브 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-bell', name: '벨', role: '서포터', attribute: '음', change: 'stay' },
          { id: 'nte-roberta', name: '로베르타', role: '탱커/힐러', attribute: '상', change: 'stay' },
          { id: 'nte-serena', name: '세레나', role: '서브 딜러', attribute: '혼', change: 'stay' }
        ]
      },
      {
        tier: 'B',
        description: '초반 스토리 진행 및 서브 파티용 에스퍼',
        color: '#6b7280',
        characters: [
          { id: 'nte-zero', name: '제로', role: '메인 딜러', attribute: '공', change: 'stay' },
          { id: 'nte-kin', name: '킨', role: '서브 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-wendy', name: '웬디', role: '서포터', attribute: '령', change: 'stay' },
          { id: 'nte-laura', name: '로라', role: '탱커/힐러', attribute: '양', change: 'stay' }
        ]
      }
    ]
  },
  {
    id: 'distortion',
    name: '왜곡 토벌전 특화 (Distortion Boss)',
    description: '단일 보스의 강력한 패턴을 파훼하고 순간 폭딜을 넣는 토벌전 최적화 티어',
    tiers: [
      {
        tier: 'S+',
        description: '단일 보스 타격 및 실드 생존 최상위 딜러/서포터',
        color: '#f59e0b',
        characters: [
          { id: 'nte-zhanhong', name: '잔홍', role: '메인 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-lacrimosa', name: '라크리모사', role: '탱커/힐러', attribute: '음', change: 'stay' },
          { id: 'nte-guwon', name: '구원', role: '메인 딜러', attribute: '령', change: 'stay' }
        ]
      },
      {
        tier: 'S',
        description: '보스전 약점 격파 및 버프 유지력 우수',
        color: '#8b5cf6',
        characters: [
          { id: 'nte-hotori', name: '호토리', role: '서포터', attribute: '양', change: 'stay' },
          { id: 'nte-shinku', name: '신쿠', role: '메인 딜러', attribute: '상', change: 'stay' },
          { id: 'nte-mint', name: '민트', role: '서브 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-daffodil', name: '다포딜', role: '탱커/힐러', attribute: '양', change: 'stay' }
        ]
      },
      {
        tier: 'A+',
        description: '안정적인 보조 딜링 및 디버프 지원',
        color: '#3b82f6',
        characters: [
          { id: 'nte-chaos', name: '카오스', role: '메인 딜러', attribute: '공', change: 'stay' },
          { id: 'nte-adler', name: '아들러', role: '서브 딜러', attribute: '상', change: 'stay' },
          { id: 'nte-cheese', name: '치즈', role: '서포터', attribute: '양', change: 'stay' },
          { id: 'nte-edgar', name: '에드가', role: '서브 딜러', attribute: '혼', change: 'stay' }
        ]
      },
      {
        tier: 'A',
        description: '표준적인 단일 타격 에스퍼',
        color: '#10b981',
        characters: [
          { id: 'nte-haniel', name: '하니엘', role: '서포터', attribute: '공', change: 'stay' },
          { id: 'nte-nanali', name: '나나리', role: '서브 딜러', attribute: '상', change: 'stay' },
          { id: 'nte-amber', name: '엠버', role: '서브 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-bell', name: '벨', role: '서포터', attribute: '음', change: 'stay' }
        ]
      },
      {
        tier: 'B',
        description: '보스전 기믹 대응 제한적',
        color: '#6b7280',
        characters: [
          { id: 'nte-zero', name: '제로', role: '메인 딜러', attribute: '공', change: 'stay' },
          { id: 'nte-kin', name: '킨', role: '서브 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-wendy', name: '웬디', role: '서포터', attribute: '령', change: 'stay' },
          { id: 'nte-laura', name: '로라', role: '탱커/힐러', attribute: '양', change: 'stay' },
          { id: 'nte-roberta', name: '로베르타', role: '탱커/힐러', attribute: '상', change: 'stay' },
          { id: 'nte-serena', name: '세레나', role: '서브 딜러', attribute: '혼', change: 'stay' }
        ]
      }
    ]
  },
  {
    id: 'overworld',
    name: '도시 탐색 & 필드 (Urban Overworld)',
    description: '헤테로 시티 필드 탐험, 몹몰이, 기동성 및 도시 스킬 효율 평가',
    tiers: [
      {
        tier: 'S+',
        description: '넓은 광역 공격 및 도시 기동성 최상위 에스퍼',
        color: '#f59e0b',
        characters: [
          { id: 'nte-shinku', name: '신쿠', role: '메인 딜러', attribute: '상', change: 'stay', note: '초광역 시공간 왜곡' },
          { id: 'nte-haniel', name: '하니엘', role: '서포터', attribute: '공', change: 'stay', note: '최강의 몹몰이 스킬' },
          { id: 'nte-nanali', name: '나나리', role: '서브 딜러', attribute: '상', change: 'stay', note: '스킨 변형 및 빠른 필드 정리' }
        ]
      },
      {
        tier: 'S',
        description: '빠른 필드 정리 및 이동 편의성 우수',
        color: '#8b5cf6',
        characters: [
          { id: 'nte-zhanhong', name: '잔홍', role: '메인 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-guwon', name: '구원', role: '메인 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-chaos', name: '카오스', role: '메인 딜러', attribute: '공', change: 'stay' },
          { id: 'nte-hotori', name: '호토리', role: '서포터', attribute: '양', change: 'stay' }
        ]
      },
      {
        tier: 'A+',
        description: '준수한 범위 타격 및 속성 연계',
        color: '#3b82f6',
        characters: [
          { id: 'nte-mint', name: '민트', role: '서브 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-adler', name: '아들러', role: '서브 딜러', attribute: '상', change: 'stay' },
          { id: 'nte-cheese', name: '치즈', role: '서포터', attribute: '양', change: 'stay' },
          { id: 'nte-lacrimosa', name: '라크리모사', role: '탱커/힐러', attribute: '음', change: 'stay' }
        ]
      },
      {
        tier: 'A',
        description: '필드 전투 무난한 성능',
        color: '#10b981',
        characters: [
          { id: 'nte-edgar', name: '에드가', role: '서브 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-daffodil', name: '다포딜', role: '탱커/힐러', attribute: '양', change: 'stay' },
          { id: 'nte-amber', name: '엠버', role: '서브 딜러', attribute: '령', change: 'stay' },
          { id: 'nte-bell', name: '벨', role: '서포터', attribute: '음', change: 'stay' }
        ]
      },
      {
        tier: 'B',
        description: '일반적인 필드 에스퍼',
        color: '#6b7280',
        characters: [
          { id: 'nte-zero', name: '제로', role: '메인 딜러', attribute: '공', change: 'stay' },
          { id: 'nte-kin', name: '킨', role: '서브 딜러', attribute: '혼', change: 'stay' },
          { id: 'nte-wendy', name: '웬디', role: '서포터', attribute: '령', change: 'stay' },
          { id: 'nte-laura', name: '로라', role: '탱커/힐러', attribute: '양', change: 'stay' },
          { id: 'nte-roberta', name: '로베르타', role: '탱커/힐러', attribute: '상', change: 'stay' },
          { id: 'nte-serena', name: '세레나', role: '서브 딜러', attribute: '혼', change: 'stay' }
        ]
      }
    ]
  }
];
