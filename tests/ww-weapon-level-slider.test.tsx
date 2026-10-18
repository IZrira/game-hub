import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import WuwaWeaponDetail from '../ww-hub/pages/WuwaWeaponDetail';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (text: string) => text }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/AdPlaceholder', () => ({ default: () => null }));
vi.mock('../ww-hub/components/WwItemIcon', () => ({ default: () => null }));
vi.mock('../common-hub/components/MarkdownRenderer', () => ({ default: () => null }));

afterEach(cleanup);

describe('WW weapon level slider', () => {
  it('starts at Lv.70 and shows exact source values when moving the low-rarity slider', () => {
    render(<MemoryRouter initialEntries={['/gallery/ww/weapon/태초의 권갑']}><Routes>
      <Route path="/gallery/ww/weapon/:weaponName" element={<WuwaWeaponDetail />} />
    </Routes></MemoryRouter>);
    const slider = screen.getByRole('slider', { name: '무기 레벨' });
    expect(slider.getAttribute('max')).toBe('5');
    expect(slider.getAttribute('aria-valuetext')).toBe('Lv.70');
    expect(screen.getByText('209')).toBeTruthy();
    expect(screen.getByText('12.3%')).toBeTruthy();
    expect(screen.queryByText('Lv.90')).toBeNull();
    fireEvent.change(slider, { target: { value: '0' } });
    expect(slider.getAttribute('aria-valuetext')).toBe('Lv.1');
    expect(screen.getByText('22')).toBeTruthy();
    expect(screen.getByText('3.3%')).toBeTruthy();
    fireEvent.change(slider, { target: { value: '3' } });
    expect(slider.getAttribute('aria-valuetext')).toBe('Lv.50');
    expect(screen.getByText('142')).toBeTruthy();
    expect(screen.getByText('9.7%')).toBeTruthy();
  });
});
