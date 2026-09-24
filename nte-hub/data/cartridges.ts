export interface NTECartridge {
  id: string;
  name: string;
  twoPieceEffect: string;
  fourPieceEffect: string;
  effectType: string;
  blocks: string[];
  sourceUrl: string;
}

const SOURCE_BASE_URL = 'https://gamewith.ai/nte/ko/cartridge';

export const NTE_CARTRIDGES: NTECartridge[] = [
  {
    id: 'lost-radiance',
    name: '잃어버린 빛',
    twoPieceEffect: '빛속성 이능력 피해 +10%',
    fourPieceEffect: '착용자가 「울티메이트」 시전 후 주는 피해가 공격 대상 방어력의 25%를 무시한다. 20초간 지속되며 중첩되지 않는다.',
    effectType: '빛속성 피해',
    blocks: ['II형(가로)', 'III형(┗)', 'III형(┓)', 'IV형(세로)'],
    sourceUrl: `${SOURCE_BASE_URL}/lost-radiance`,
  },
  {
    id: 'fireflies-and-the-forest',
    name: '숲속 반딧불의 마음',
    twoPieceEffect: '령속성 이능력 피해 +10%',
    fourPieceEffect: '파티원이 근처의 적에게 령속성 이능력 피해를 줄 때마다 착용자의 치명 피해가 8% 증가한다. 최대 7중첩, 중첩당 10초간 지속되며 갱신된다. 필드 밖에서도 유지된다.',
    effectType: '령속성 피해',
    blocks: ['II형(가로)', 'III형(세로)', 'III형(┗)', 'IV형(N)'],
    sourceUrl: `${SOURCE_BASE_URL}/fireflies-and-the-forest`,
  },
  {
    id: 'crimson-twin-butterflies',
    name: '진홍: 쌍둥이 나비',
    twoPieceEffect: '주속성 이능력 피해 +10%',
    fourPieceEffect: '근처의 적이 주속성 피해를 받을 때마다 착용자의 공격력이 6% 증가한다. 최대 6중첩, 중첩당 10초간 지속되며 갱신된다. 필드 밖에서도 유지된다.',
    effectType: '주속성 피해',
    blocks: ['II형(세로)', 'III형(가로)', 'III형(┛)', 'IV형(S)'],
    sourceUrl: `${SOURCE_BASE_URL}/crimson-twin-butterflies`,
  },
  {
    id: 'diabolos',
    name: '디아볼로스',
    twoPieceEffect: '암속성 이능력 피해 +10%',
    fourPieceEffect: '적의 암속성 이능력 저항을 12% 무시한다. 착용자가 「노바」 또는 「스코치」 반응 발동에 참여하면 20초 동안 암속성 저항 무시 비율이 24%로 변경된다.',
    effectType: '암속성 피해',
    blocks: ['II형(세로)', 'III형(┏)', 'III형(┛)', 'IV형(가로)'],
    sourceUrl: `${SOURCE_BASE_URL}/diabolos`,
  },
  {
    id: 'devil-s-blood-curse',
    name: '악마의 피: 저주',
    twoPieceEffect: '혼속성 이능력 피해 +10%',
    fourPieceEffect: '주는 피해가 18% 증가한다. 「노바」 또는 「스테인」 상태의 유닛을 공격할 때 피해 증가 효과가 36%로 상승한다.',
    effectType: '혼속성 피해',
    blocks: ['II형(세로)', 'III형(세로)', 'III형(┏)', 'IV형(N)'],
    sourceUrl: `${SOURCE_BASE_URL}/devil-s-blood-curse`,
  },
  {
    id: 'street-boxer',
    name: '스트리트 복서',
    twoPieceEffect: '상속성 이능력 피해 +10%',
    fourPieceEffect: '치명 확률이 14% 증가한다. 아군 파티원이 「레모라」 또는 「스테인」을 발동하면 20초 동안 치명 확률이 추가로 14% 증가한다.',
    effectType: '상속성 피해',
    blocks: ['II형(가로)', 'III형(가로)', 'III형(┓)', 'IV형(S)'],
    sourceUrl: `${SOURCE_BASE_URL}/street-boxer`,
  },
  {
    id: 'kingdom-s-guard',
    name: '왕국 수호자',
    twoPieceEffect: '방어력 +15%',
    fourPieceEffect: '착용자의 방어막 효과가 20% 증가한다.',
    effectType: '방어',
    blocks: ['III형(가로)', 'III형(세로)', 'III형(┓)', 'III형(┛)'],
    sourceUrl: `${SOURCE_BASE_URL}/kingdom-s-guard`,
  },
  {
    id: 'shadow-creed',
    name: '그림자 신조',
    twoPieceEffect: '공격력 +10%',
    fourPieceEffect: '착용자가 「바이레일 스킬」을 발동한 후 20초 동안 공격력이 25% 증가한다.',
    effectType: '공격력',
    blocks: ['II형(가로)', 'II형(세로)', 'IV형(가로)', 'IV형(N)'],
    sourceUrl: `${SOURCE_BASE_URL}/shadow-creed`,
  },
  {
    id: 'thea-s-night-tavern',
    name: '티아의 심야 선술집',
    twoPieceEffect: 'HP +10%',
    fourPieceEffect: '착용자의 회복 효율이 20% 증가한다.',
    effectType: '회복',
    blocks: ['III형(가로)', 'III형(세로)', 'III형(┗)', 'III형(┏)'],
    sourceUrl: `${SOURCE_BASE_URL}/thea-s-night-tavern`,
  },
  {
    id: 'tiny-big-adventure',
    name: '작은 대모험',
    twoPieceEffect: 'HP +10%',
    fourPieceEffect: '착용자의 HP가 감소할 때마다 HP 상한이 4% 증가한다. 최대 10중첩, 중첩당 10초간 지속되며 「울티메이트」 시전 시 즉시 10중첩을 획득한다.',
    effectType: 'HP',
    blocks: ['II형(가로)', 'II형(세로)', 'IV형(가로)', 'IV형(S)'],
    sourceUrl: `${SOURCE_BASE_URL}/tiny-big-adventure`,
  },
  {
    id: 'speedy-hedgehog',
    name: '음속 블루 고슴도치',
    twoPieceEffect: '에너지 충전 효율 +12%',
    fourPieceEffect: '착용자가 「울티메이트」를 시전하면 20초 동안 전체 파티원의 공격력이 15% 증가한다. 이 효과는 중첩되지 않는다.',
    effectType: '에너지 충전',
    blocks: ['III형(┗)', 'III형(┏)', 'III형(┓)', 'III형(┛)'],
    sourceUrl: `${SOURCE_BASE_URL}/speedy-hedgehog`,
  },
  {
    id: 'quiet-manor',
    name: '고요한 산장',
    twoPieceEffect: '정신 피해 +10%',
    fourPieceEffect: '착용자가 일반 공격으로 주는 정신 피해가 12% 증가한다. 최대 3중첩, 중첩당 6초간 지속된다.',
    effectType: '정신 피해',
    blocks: ['II형(가로)', 'II형(세로)', 'IV형(세로)', 'IV형(N)'],
    sourceUrl: `${SOURCE_BASE_URL}/quiet-manor`,
  },
];

export const NTE_CARTRIDGE_EFFECT_TYPES = Array.from(
  new Set(NTE_CARTRIDGES.map((cartridge) => cartridge.effectType)),
);
