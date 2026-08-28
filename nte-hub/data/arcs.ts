export interface NTEArcMaterial {
  name: string;
  count: number;
}

export interface NTEArcStatLevel {
  atk: number;
  subStatName: string;
  subStatValue: string;
}

export interface NTEArc {
  id: string;
  name: string;
  rarity: number; // 5: S, 4: A, 3: B
  rarityGrade: 'S' | 'A' | 'B';
  type: '결합' | '고체' | '액체' | '기체' | '플라즈마' | string;
  releaseVersion?: string;
  obtain?: string;
  dedicatedChar?: string;
  stats: {
    atk: number;
    subStatName: string;
    subStatValue: string;
  };
  baseStats?: Record<number, NTEArcStatLevel>;
  growthStats?: string;
  skill: {
    name: string;
    description: string;
  };
  ascensionMaterials?: string;
  materials?: NTEArcMaterial[];
  description?: string;
  isNotion?: boolean;
}

export const NTE_ARCS: NTEArc[] = [
  {
    id: 'nte_arc_mulmangsan',
    name: '물망산',
    rarity: 4,
    rarityGrade: 'A',
    type: '결합',
    releaseVersion: '1.0',
    obtain: '소환 및 아크 합성',
    dedicatedChar: '',
    stats: {
      atk: 395,
      subStatName: '방어력',
      subStatValue: '52.5%'
    },
    baseStats: {
      1: { atk: 25, subStatName: '방어력', subStatValue: '21%' },
      20: { atk: 106, subStatName: '방어력', subStatValue: '26.25%' },
      30: { atk: 157, subStatName: '방어력', subStatValue: '31.5%' },
      40: { atk: 208, subStatName: '방어력', subStatValue: '36.75%' },
      50: { atk: 259, subStatName: '방어력', subStatValue: '42%' },
      60: { atk: 310, subStatName: '방어력', subStatValue: '47.25%' },
      70: { atk: 362, subStatName: '방어력', subStatValue: '52.5%' },
      80: { atk: 395, subStatName: '방어력', subStatValue: '52.5%' }
    },
    growthStats: `1 : 공격력 25/ 방어력 21%
20 : 공격력 106 / 방어력 26.25%
30 : 공격력 157 / 방어력 31.5%
40 : 공격력 208 / 방어력 36.75%
50 : 공격력 259 / 방어력 42%
60 : 공격력 310 / 방어력 47.25%
70 : 공격력 362 / 방어력 52.5%
80 : 공격력 395 / 방어력 52.5%`,
    skill: {
      name: '「레인맨」',
      description: `HP+10%/12%/14%/16%/18%
착용자의 HP가 50%보다 높은 경우,
자신의 방어막이
10%/12%/14%/16%/18% 강화된다.`
    },
    ascensionMaterials: `비틀 코인x336,000
흐릿한 숫자 부호x11
미해독 숫자 부호x15
뒤틀린 숫자 부호x15
철 사과씨x11
은 사과씨x15
금 사과씨x15`,
    materials: [
      { name: '비틀 코인', count: 336000 },
      { name: '흐릿한 숫자 부호', count: 11 },
      { name: '미해독 숫자 부호', count: 15 },
      { name: '뒤틀린 숫자 부호', count: 15 },
      { name: '철 사과씨', count: 11 },
      { name: '은 사과씨', count: 15 },
      { name: '금 사과씨', count: 15 }
    ],
    description: '잘 자고, 일기예보 확인하는 거 잊지 마. 밥 잘 챙겨 먹고, 우산도 잊지 마!'
  }
];
