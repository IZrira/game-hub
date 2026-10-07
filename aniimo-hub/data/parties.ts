import partyRecommendations from './parties.json';

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

export const ANIIMO_PARTY_RECOMMENDATIONS = partyRecommendations as AniimoPartyRecommendation[];

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
