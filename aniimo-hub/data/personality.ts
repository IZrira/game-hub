import type { AniimoForm, AniimoSkill } from '../types';

export const PERSONALITY_TRAITS = [
  { axis: 'E / I', code: 'E', name: '애착', combat: '공격 2% · 무력화 2%', use: '공격과 무력화를 함께 올리는 전투형 선택' },
  { axis: 'E / I', code: 'I', name: '낯가림', combat: '에너지 회복 4%', use: '스킬 순환과 에너지 수급이 중요한 경우' },
  { axis: 'S / N', code: 'S', name: '현실', combat: '피해 4%', use: '조건 없이 안정적인 피해 증가' },
  { axis: 'S / N', code: 'N', name: '영감', combat: '치명타율 5%', use: '스킬·특성에 치명타 연계가 있는 경우' },
  { axis: 'T / F', code: 'T', name: '냉정', combat: '물리 방어 6%', use: '물리 피해가 위협적인 콘텐츠' },
  { axis: 'T / F', code: 'F', name: '배려', combat: '마법 방어 6%', use: '마법 피해가 위협적인 콘텐츠' },
  { axis: 'J / P', code: 'J', name: '순종', combat: 'HP 4%', use: '회복량·보호막·전체 생존력을 높일 때' },
  { axis: 'J / P', code: 'P', name: '배려', combat: '피해 감소 4%', use: '받는 피해를 직접 줄이고 싶을 때' },
] as const;

export const PERSONALITY_PRESETS = [
  { id: 'damage', label: '일반 딜러', code: 'ESTJ', summary: '공격·피해·물리 방어·HP를 고르게 챙기는 범용 조합입니다.' },
  { id: 'critical', label: '치명타 딜러', code: 'ENTJ', summary: '스킬이나 특성에 치명타 관련 효과가 있을 때 N을 선택합니다.' },
  { id: 'break', label: '무력화', code: 'ISTP', summary: '에너지 순환과 안정적인 피해, 물리 방어와 피해 감소를 중시합니다.' },
  { id: 'cycle', label: '에너지·지원', code: 'ISTJ', summary: '에너지 회복과 안정적인 생존을 우선하는 지원형 기준입니다.' },
] as const;

const skillText = (skills: AniimoSkill[]) => skills.map(skill => `${skill.name} ${skill.description}`).join(' ');

export const getRecommendedPersonality = (form: AniimoForm) => {
  const position = form.positions[0] || '서포터';
  const hasCriticalSynergy = /치명타|크리티컬/i.test(skillText([...form.traits, ...form.combatSkills, ...form.uniqueSkills]));
  const first = position === '딜' ? 'E' : 'I';
  const second = hasCriticalSynergy ? 'N' : 'S';
  const fourth = position === '격파' ? 'P' : 'J';
  const code = `${first}${second}T${fourth}`;
  const reason = [
    position === '딜' ? '딜 포지션이라 공격·무력화를 올리는 E를 선택' : `${position} 포지션이라 에너지 순환을 돕는 I를 선택`,
    hasCriticalSynergy ? '현재 형태의 스킬·특성에 치명타 연계가 있어 N을 선택' : '치명타 전용 연계가 없어 안정적인 피해 증가 S를 선택',
    position === '격파' ? '격파 운용 중 생존을 위해 피해 감소 P를 선택' : '범용 생존력을 높이는 HP 증가 J를 선택',
  ];

  return { code, position, hasCriticalSynergy, reason, traits: code.split('').map(letter => PERSONALITY_TRAITS.find(trait => trait.code === letter)!) };
};
