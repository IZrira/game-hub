export interface AniimoPartyMember {
  number: string;
  formKey: string;
  role: string;
  substitutes?: Array<{ number: string; formKey: string }>;
}

export interface AniimoPartyRecommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  members: AniimoPartyMember[];
  order: number;
  updatedAt?: string;
}

export const ANIIMO_PARTY_RECOMMENDATIONS: AniimoPartyRecommendation[] = [
  {
    id: 'balanced-starter',
    name: '범용 균형 파티',
    description: '딜·격파·회복·에너지 재생을 한 자리씩 배치한 기본형 추천 조합입니다.',
    category: '범용',
    tags: ['초보자', '역할 균형'],
    order: 1,
    members: [
      { number: '003', formKey: 'basic-form', role: '메인 딜러' },
      { number: '004', formKey: 'basic-form', role: '격파' },
      { number: '015', formKey: 'basic-form', role: '치유' },
      { number: '016', formKey: 'basic-form', role: '에너지 재생' },
    ],
  },
];

export const normalizeAniimoParty = (value: any): AniimoPartyRecommendation => ({
  id: String(value.party_id || value.id || crypto.randomUUID()),
  name: String(value.name || '새 추천 파티'),
  description: String(value.description || ''),
  category: String(value.category || '범용'),
  tags: Array.isArray(value.tags) ? value.tags.map(String) : [],
  members: (Array.isArray(value.members) ? value.members : []).slice(0, 4).map((member: any) => ({
    number: String(member.number || ''),
    formKey: String(member.formKey || member.form_key || 'basic-form'),
    role: String(member.role || ''),
    substitutes: Array.isArray(member.substitutes) ? member.substitutes.map((substitute: any) => ({
      number: String(substitute.number || ''),
      formKey: String(substitute.formKey || substitute.form_key || 'basic-form'),
    })) : [],
  })),
  order: Number(value.display_order ?? value.order ?? 100),
  updatedAt: value.updated_at || value.updatedAt,
});
