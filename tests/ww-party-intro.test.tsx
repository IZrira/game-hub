import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PartyRecommendations from '../ww-hub/pages/PartyRecommendations';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (text: string) => text }) }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/GallerySidebar', () => ({ default: () => null }));
vi.mock('../common-hub/lib/supabase', () => ({ supabase: null }));
afterEach(cleanup);

describe('WW party compact introduction', () => {
  it('keeps optional guidance available while exposing a Korean heading and party search', () => {
    render(<MemoryRouter initialEntries={['/gallery/ww/parties']}><Routes>
      <Route path="/gallery/:gameId/parties" element={<PartyRecommendations />} />
    </Routes></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('명조 추천 파티 조합');
    const guidance = screen.getByText('파티 편성 안내').closest('details');
    expect(guidance).not.toBeNull();
    expect(guidance!.hasAttribute('open')).toBe(false);
    expect(guidance!.textContent).toContain('본 가이드는 추천 조합일 뿐이며, 상황에 따라 유동적으로 변경될 수 있습니다.');
    expect(screen.getByPlaceholderText('파티명, 설명 검색...')).toBeTruthy();
    expect(screen.getByRole('heading', { name: '기염 하이퍼캐리' })).toBeTruthy();
  });
});
