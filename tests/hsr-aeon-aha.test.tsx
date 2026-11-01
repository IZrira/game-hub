import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import aha from '../hsr-hub/data/characters/hsr/aeon_aha';
import { CHARACTER_DATA } from '../hsr-hub/data/characters';
import SkillAndEidolonSection from '../hsr-hub/components/SkillAndEidolonSection';
import guideManifest from '../hsr-hub/data/generated/guide-runtime-manifest.json';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
afterEach(cleanup);

describe('user-supplied Aeon Aha character', () => {
  it('registers exactly once ahead of 4.6 without replacing an existing character', () => {
    expect(CHARACTER_DATA.filter(character => character.id === 'aeon_aha')).toHaveLength(1);
    expect(CHARACTER_DATA[0]).toBe(aha);
    expect(CHARACTER_DATA).toHaveLength(94);
    expect(aha.name).toBe('에이언즈★아하');
    expect(aha.releaseVersion).toBe('4.7');
    expect(aha.attribute).toBe('양자');
    expect(aha.path).toBe('환락');
    expect(aha.updatedAt).toBe('2026-11-01');
    expect((guideManifest as Record<string, string>)['aeon_aha']).toBeUndefined();
  });

  it('uses the explicitly confirmed HP/ATK/DEF ordering and preserves base speed/resource', () => {
    expect(aha.baseStats?.lv1).toEqual({ '기초 HP': 143, '기초 공격력': 92, '기초 방어력': 69 });
    expect(aha.baseStats?.lv80).toEqual({ '기초 HP': 1046, '기초 공격력': 679, '기초 방어력': 509 });
    expect(aha.baseStats?.speed).toBe(94);
    expect(aha.baseStats?.taunt).toBe(100);
    expect(aha.baseStats?.energy).toBe(8);
    const elation = aha.skills?.find(skill => skill.name === '만월, 신이 있는 시간');
    expect(elation?.toughnessDMG).toBe('약점 격파 범위 10');
    expect([undefined, '', '0']).toContain(elation?.energyRegen);
  });

  it('preserves supplied skills, full six eidolons, materials and unique terms', () => {
    expect(aha.skills).toHaveLength(9);
    expect(aha.skills?.filter(skill => skill.tag?.startsWith('특성'))).toHaveLength(3);
    expect(aha.bonusAbilities).toHaveLength(3);
    expect(aha.eidolons).toHaveLength(6);
    expect(aha.eidolons?.[1].description).toContain('은랑 LV.999');
    expect(aha.eidolons?.[1].description).toContain('환락 개척자');
    expect(aha.eidolons?.[1].description).toContain('60%');
    expect(aha.materials_v2?.ascension).toHaveLength(5);
    expect(aha.materials_v2?.traces).toHaveLength(9);
    expect(aha.specialTerms?.['환락 채무']).toContain('HP 최대치를 점유');
    expect(JSON.stringify(aha)).not.toMatch(/https?:\/\/|<u>|\*\*/);
  });

  it('shows the exclusive effect separately without requesting an invented icon', () => {
    render(<SkillAndEidolonSection char={aha} gender="f" setGender={vi.fn()} theme={{ primary: '#a855f7', secondary: '#c084fc', shadow: '#000' }} renderContent={text => [text]} setTooltip={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: '전용 효과' }));
    expect(screen.getByText('언제나 아하 타임')).toBeTruthy();
    expect(screen.getByText(/기본 속도가 80/)).toBeTruthy();
    expect([...document.querySelectorAll('img')].some(img => img.getAttribute('src')?.includes('exclusive_effect'))).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: /^특성/ }));
    expect(screen.getByText('아하정전')).toBeTruthy();
    expect([...document.querySelectorAll('img')].some(img => /talent_[23]\.webp/.test(img.getAttribute('src') || ''))).toBe(false);
    expect(screen.getByRole('heading', { name: '성혼' })).toBeTruthy();
  });
});
