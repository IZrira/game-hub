import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import HsrGuide from '../hsr-hub/pages/CharacterGuideDetail';
import WwGuide from '../ww-hub/pages/WuwaCharacterGuideDetail';
import NteGuide from '../nte-hub/pages/CharacterGuideDetail';
import sourceGuides from '../ww-hub/data/generated/guides.json';
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


describe('recommendation readability and original data', () => {
  it.each(cases)('$game summary icons match the displayed equipment', entry => {
    const { container } = renderCase(entry);
    const icons = Array.from(container.querySelectorAll<HTMLImageElement>('.guide-summary-icon'));
    expect(icons.length).toBeGreaterThanOrEqual(2);
    const equipment = Array.from(container.querySelectorAll('.guide-equipment-card'));
    icons.forEach(icon => {
      const name = icon.parentElement!.textContent!.trim();
      const card = equipment.find(card => card.querySelector('h4')?.textContent === name);
      expect(card, name).toBeTruthy();
      expect(icon.getAttribute('src')).toBe(card!.querySelector('img')?.getAttribute('src'));
    });
  });

  it('separates the screenshot WW option explanation and preserves its COST association', () => {
    const source = sourceGuides.find(item => item.id === 'jingran')!;
    const before = JSON.stringify(source);
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/jingran/guide' });
    const options = container.querySelector('.guide-option-grid')!;
    expect(options.textContent).toContain('크리티컬 피해');
    expect(options.textContent).not.toContain('2개 사용 후');
    const explanation = screen.getByRole('heading', { name: '선택 조건·설명' }).closest('section')!;
    expect(within(explanation).getByRole('heading', { name: '4 COST — 크리티컬 피해' })).toBeTruthy();
    expect(explanation.textContent).toContain('크리티컬 피해 2개 사용 후 크리티컬 100% 가까이 세팅 시 추천');
    expect(JSON.stringify(source)).toBe(before);
  });

  it('renders NTE or alternatives in original order and keeps descriptions out of option names', () => {
    const article = articles.find(item => item.title === '구원 세팅 공략')!;
    const before = JSON.stringify(article);
    const source = parseNteCharacterGuide(article.content);
    const { container } = renderCase({ ...cases[2], path: `/gallery/nte/guides/${article.slug}` });
    const rows = Array.from(container.querySelectorAll('.guide-option-card .guide-value-list li'));
    expect(rows.map(row => row.querySelector('.guide-rank')?.textContent)).toEqual(['1순위', '2순위']);
    const names = source.mainStats[0].split(/\s+or\s+/i);
    names.forEach((name, index) => expect(rows[index].textContent).toBe(`${index + 1}순위${name}`));
    expect(JSON.stringify(article)).toBe(before);
  });
});
