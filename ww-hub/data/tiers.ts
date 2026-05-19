
export interface TierCharacter {
  id: string;
  name: string;
  folderName: string;
  role: '메인 딜러' | '서브 딜러' | '서포터' | '생존';
  change?: 'up' | 'down' | 'new' | 'stay';
}

export interface TierCategory {
  id: string;
  name: string;
  description: string;
}

export interface TierGroup {
  tier: string;
  label: string;
  color: string;
  characters: TierCharacter[];
}

export const WW_TIER_CATEGORIES: TierCategory[] = [
  { id: 'tower', name: '역경의 탑', description: '심층 구역 기준' },
  { id: 'hologram', name: '홀로그램', description: '전략적 대응 필요' },
];

export const WW_TIER_DATA: Record<string, TierGroup[]> = {
  'tower': [
    {
      "tier": "T0",
      "label": "T0",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_jiyan", "folderName": "기염", "role": "메인 딜러", "name": "기염", "change": "stay" }
      ]
    },
    {
      "tier": "T1",
      "label": "T1",
      "color": "#FF9F43",
      "characters": []
    }
  ],
  'hologram': [
    {
      "tier": "T0",
      "label": "T0",
      "color": "#FF4D4D",
      "characters": [
        { "id": "char_jiyan", "folderName": "기염", "role": "메인 딜러", "name": "기염", "change": "stay" }
      ]
    }
  ]
};
