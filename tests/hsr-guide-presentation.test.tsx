import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import CharacterGuideDetail from '../hsr-hub/pages/CharacterGuideDetail';
import { HSR_CHARACTER_GUIDES } from '../hsr-hub/data/guides';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));

afterEach(cleanup);

const renderGuide = (characterName: string) => render(
  <MemoryRouter initialEntries={[`/gallery/hsr/character/${characterName}/guide`]}>
    <Link to="/gallery/hsr/character/아케론/guide">아케론 공략으로 이동</Link>
    <Routes>
      <Route path="/gallery/:gameId/character/:charName/guide" element={<CharacterGuideDetail />} />
    </Routes>
  </MemoryRouter>
);

describe('HSR guide selected build and analysis navigation', () => {
  it('switches relics, ornaments, main options and conditions together, preserving shared light cones', () => {
    const { container } = renderGuide('초구');
    const source = HSR_CHARACTER_GUIDES.find(guide => guide.characterName === '초구')!;
    const originalData = JSON.stringify(source);
    const summary = screen.getByRole('region', { name: '추천 세팅 요약' });
    expect(summary.textContent).toContain('밤낮의 경계를 나는 매');
    expect(summary.textContent).toContain('생명의 바커 공');
    expect(summary.textContent).toContain('HP or 화염 피해');

    fireEvent.click(screen.getByRole('button', { name: '지속 피해 세팅' }));
    expect(screen.getByRole('button', { name: '지속 피해 세팅' }).getAttribute('aria-pressed')).toBe('true');
    expect(summary.textContent).toContain('깊은 감옥에 수감된 죄수');
    expect(summary.textContent).toContain('즐거움에 취한 바다의 일각');
    expect(summary.textContent).toContain('화염 피해 or 공격력');
    expect(summary.textContent).not.toContain('HP or 화염 피해');

    const equipment = container.querySelector('[id="추천 장비"]') as HTMLElement;
    expect(within(equipment).getByText('깊은 감옥에 수감된 죄수')).toBeTruthy();
    expect(within(equipment).getByText('즐거움에 취한 바다의 일각')).toBeTruthy();
    expect(within(equipment).queryByText('밤낮의 경계를 나는 매')).toBeNull();
    const stats = container.querySelector('[id="권장 스텟"]') as HTMLElement;
    for (const value of ['143', '167', '178%', '초구 2돌 이상 추천']) {
      expect(within(stats).getByText(value)).toBeTruthy();
    }
    const lightCones = container.querySelector('[id="추천 광추"]') as HTMLElement;
    for (const name of ['그 무수한 봄날', '바람에 흩날리는 거짓말', '사냥감의 시선']) {
      expect(within(lightCones).getByText(name)).toBeTruthy();
    }
    expect(container.querySelector('a[href*="notion."]')).toBeNull();
    expect(JSON.stringify(source)).toBe(originalData);
  });

  it('preserves variant-specific target values and the source substat priority', () => {
    const { container } = renderGuide('카프카');
    const stats = container.querySelector('[id="권장 스텟"]') as HTMLElement;
    expect(within(stats).getByText('160 이상')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '4돌파 이상' }));
    expect(within(stats).queryByText('160 이상')).toBeNull();
    expect(within(stats).getByText('167 이상')).toBeTruthy();
    expect(within(stats).getByText('75%')).toBeTruthy();
    const priorities = within(stats).getByText('부옵션 우선순위').parentElement!.parentElement!;
    const sourceOrder = HSR_CHARACTER_GUIDES.find(guide => guide.characterName === '카프카')!.variants![1].subStats;
    const shownOrder = Array.from(priorities.querySelectorAll('span.text-sm')).map(span => span.textContent);
    expect(shownOrder).toEqual(sourceOrder);
  });

  it('refreshes section navigation after analysis switching and retains the selected setup', async () => {
    const { container } = renderGuide('초구');
    fireEvent.click(screen.getByRole('button', { name: '지속 피해 세팅' }));
    fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
    expect(container.querySelector('[id="추천 광추"]')).toBeNull();
    const analysis = HSR_CHARACTER_GUIDES.find(guide => guide.characterName === '초구')!.analysis!;
    expect(screen.getByText(analysis.summary)).toBeTruthy();
    await waitFor(() => {
      for (const navigation of screen.getAllByRole('navigation', { name: '공략 섹션 이동' })) {
        expect(within(navigation).getByRole('link', { name: /RIRA 분석/ })).toBeTruthy();
        expect(within(navigation).queryByRole('link', { name: /추천 장비/ })).toBeNull();
      }
    });
    fireEvent.click(screen.getByRole('button', { name: '세팅 가이드' }));
    expect(screen.getByRole('button', { name: '지속 피해 세팅' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('region', { name: '추천 세팅 요약' }).textContent).toContain('깊은 감옥에 수감된 죄수');
    await waitFor(() => {
      for (const navigation of screen.getAllByRole('navigation', { name: '공략 섹션 이동' })) {
        expect(within(navigation).getByRole('link', { name: /추천 장비/ })).toBeTruthy();
        expect(within(navigation).queryByRole('link', { name: /RIRA 분석/ })).toBeNull();
      }
    });
  });

  it('resets variant and view when navigating to another character and keeps target conditions with values', () => {
    const { container } = renderGuide('초구');
    fireEvent.click(screen.getByRole('button', { name: '지속 피해 세팅' }));
    fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
    fireEvent.click(screen.getByRole('link', { name: '아케론 공략으로 이동' }));
    expect(screen.getByRole('button', { name: '세팅 가이드' }).getAttribute('aria-pressed')).toBe('true');
    const stats = container.querySelector('[id="권장 스텟"]') as HTMLElement;
    const conditionalValues = within(stats).getAllByText('80% 이상');
    expect(conditionalValues.some(value => value.parentElement!.textContent?.includes('1돌파 시 -18% 적용'))).toBe(true);
    expect(within(stats).getByText('160% 이상')).toBeTruthy();
    expect(within(stats).getByText('4000 이상')).toBeTruthy();
    expect(screen.getByRole('region', { name: '추천 세팅 요약' }).textContent).toContain('흘러가는 강가를 따라');
    expect(screen.queryByRole('button', { name: '지속 피해 세팅' })).toBeNull();
  });

  it('can navigate from a missing guide to a published one without changing hook order', () => {
    renderGuide('존재하지 않는 캐릭터');
    expect(screen.getByRole('heading', { name: '공략을 찾을 수 없습니다' })).toBeTruthy();
    fireEvent.click(screen.getByRole('link', { name: '아케론 공략으로 이동' }));
    expect(screen.getByRole('region', { name: '추천 세팅 요약' }).textContent).toContain('흘러가는 강가를 따라');
    expect(screen.queryByRole('heading', { name: '공략을 찾을 수 없습니다' })).toBeNull();
  });
});
