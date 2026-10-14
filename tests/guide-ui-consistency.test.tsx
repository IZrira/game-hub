import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import HsrGuide from '../hsr-hub/pages/CharacterGuideDetail';
import WwGuide from '../ww-hub/pages/WuwaCharacterGuideDetail';
import NteGuide from '../nte-hub/pages/CharacterGuideDetail';
import articles from '../common-hub/data/guideArticles.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/FeedbackReportModal', () => ({ default: () => null }));
afterEach(cleanup);

const cases = [
  { game: 'HSR', path: '/gallery/hsr/character/acheron/guide', route: '/gallery/:gameId/character/:charName/guide', component: HsrGuide },
  { game: 'WW', path: '/gallery/ww/character/camellya/guide', route: '/gallery/:gameId/character/:charName/guide', component: WwGuide },
  { game: 'NTE', path: '/gallery/nte/guides/레이븐-build-guide', route: '/gallery/nte/guides/:slug', component: NteGuide },
];
const renderCase = (entry: typeof cases[number]) => render(<MemoryRouter initialEntries={[entry.path]}><Routes><Route path={entry.route} element={<entry.component />} /></Routes></MemoryRouter>);

describe('shared guide body contract', () => {
  it.each(cases)('$game uses the same section order and card structures', entry => {
    const { container } = renderCase(entry);
    const sections = Array.from(container.querySelectorAll('[data-guide-section]'));
    expect(sections.map(section => section.getAttribute('data-guide-section'))).toEqual(['equipment', 'sets', 'stats', 'priorities', 'synergy']);
    expect(sections.map(section => section.querySelector('h2')?.textContent)).toEqual(['추천 장비', '세트 세팅', '옵션과 목표 수치', '육성 우선순위', '시너지 캐릭터']);
    for (const kind of ['equipment', 'sets']) {
      const section = sections.find(node => node.getAttribute('data-guide-section') === kind)!;
      expect(section.querySelector('.guide-panel .guide-equipment-grid .guide-equipment-card .guide-equipment-heading')).toBeTruthy();
    }
    expect(container.querySelector('.guide-option-grid .guide-option-card .guide-value-list')).toBeTruthy();
    expect(container.querySelector('.guide-target-grid .guide-target-card .guide-target-value')).toBeTruthy();
    expect(container.querySelector('.guide-priority-list .guide-priority-card')).toBeTruthy();
    expect(container.querySelector('.guide-member-grid .guide-member-card .guide-member-text')).toBeTruthy();
    expect(container.querySelector('.guide-view-tabs')?.children).toHaveLength(2);
  });

  it('renders each NTE summary target in its own list row instead of one joined sentence', () => {
    const { container } = renderCase(cases[2]);
    const article = articles.find(item => item.title === '레이븐 세팅 공략')!;
    const original = parseNteCharacterGuide(article.content).statGroups[0].items;
    const summary = screen.getByRole('region', { name: '추천 세팅 요약' });
    const rows = within(summary).getAllByRole('listitem');
    expect(rows).toHaveLength(original.length);
    original.forEach((item, index) => {
      expect(within(rows[index]).getByText(item.label)).toBeTruthy();
      expect(within(rows[index]).getByText(item.value)).toBeTruthy();
    });
    expect(container.querySelector('.guide-summary-values')?.textContent).not.toContain(' · ');
  });

  it('renders HSR summary options as separate rows and retains their slot association', () => {
    renderCase(cases[0]);
    const rows = within(screen.getByRole('region', { name: '추천 세팅 요약' })).getAllByRole('listitem');
    expect(rows).toHaveLength(4);
    ['몸통', '신발', '차원 구체', '연결 매듭'].forEach((label, index) => expect(within(rows[index]).getByText(label)).toBeTruthy());
  });

  it('does not add an empty analysis view when source analysis is unavailable', () => {
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/yinlin/guide' });
    fireEvent.click(screen.getByRole('button', { name: '떠오르는 구름 5세트' }));
    // Keep the same frame, but never open analysis without source content.
    expect((screen.getByRole('button', { name: 'RIRA 분석 가이드' }) as HTMLButtonElement).disabled).toBe(true);
    expect(container.querySelector('[data-guide-section="analysis"]')).toBeNull();
    expect(screen.getByRole('button', { name: '떠오르는 구름 5세트' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('switches published WW analysis through the shared view controls', () => {
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/jiyan/guide' });
    expect(container.querySelector('.guide-view-tabs')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
    expect(container.querySelector('[data-guide-section="equipment"]')).toBeNull();
    expect(container.querySelector('[data-guide-section="analysis"] .guide-panel')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '세팅 가이드' }));
    expect(container.querySelector('[data-guide-section="equipment"]')).toBeTruthy();
  });
});
