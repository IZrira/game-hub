import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import HsrGuide from '../hsr-hub/pages/CharacterGuideDetail';
import WwGuide from '../ww-hub/pages/WuwaCharacterGuideDetail';
import NteGuide from '../nte-hub/pages/CharacterGuideDetail';
import { HSR_CHARACTER_GUIDES } from '../hsr-hub/data/guides';
import sourceGuides from '../ww-hub/data/generated/guides.json';
import articles from '../common-hub/data/guideArticles.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';
import { mockHsrGuideFetch } from './helpers/hsrGuideFetch';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/FeedbackReportModal', () => ({ default: () => null }));
beforeEach(() => vi.stubGlobal('fetch', mockHsrGuideFetch()));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const cases = [
  { game: 'HSR', path: '/gallery/hsr/character/acheron/guide', route: '/gallery/:gameId/character/:charName/guide', component: HsrGuide },
  { game: 'WW', path: '/gallery/ww/character/camellya/guide', route: '/gallery/:gameId/character/:charName/guide', component: WwGuide },
  { game: 'NTE', path: '/gallery/nte/guides/레이븐-build-guide', route: '/gallery/nte/guides/:slug', component: NteGuide },
];
const renderCase = (entry: typeof cases[number]) => render(<MemoryRouter initialEntries={[entry.path]}><Routes><Route path={entry.route} element={<entry.component />} /></Routes></MemoryRouter>);

describe('shared guide body contract', () => {
  it.each(cases)('$game uses the same section order and card structures', async entry => {
    const { container } = renderCase(entry);
    await screen.findByRole('region', { name: '추천 세팅 요약' });
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

  it('renders HSR summary options as separate rows and retains their slot association', async () => {
    renderCase(cases[0]);
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const rows = within(screen.getByRole('region', { name: '추천 세팅 요약' })).getAllByRole('listitem');
    expect(rows.length).toBeGreaterThanOrEqual(4);
    ['몸통', '신발', '차원 구체', '연결 매듭'].forEach(label => expect(rows.some(row => row.textContent?.startsWith(label))).toBe(true));
    expect(rows.some(row => row.textContent?.includes(' or '))).toBe(false);
  });

  it('does not add an empty analysis view when source analysis is unavailable', async () => {
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/yinlin/guide' });
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    fireEvent.click(screen.getByRole('button', { name: '떠오르는 구름 5세트' }));
    // Keep the same frame, but never open analysis without source content.
    expect((screen.getByRole('button', { name: 'RIRA 분석 가이드' }) as HTMLButtonElement).disabled).toBe(true);
    expect(container.querySelector('[data-guide-section="analysis"]')).toBeNull();
    expect(screen.getByRole('button', { name: '떠오르는 구름 5세트' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('switches published WW analysis through the shared view controls', async () => {
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/jiyan/guide' });
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    expect(container.querySelector('.guide-view-tabs')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
    expect(container.querySelector('[data-guide-section="equipment"]')).toBeNull();
    expect(container.querySelector('[data-guide-section="analysis"] .guide-panel')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '세팅 가이드' }));
    expect(container.querySelector('[data-guide-section="equipment"]')).toBeTruthy();
  });
});


describe('recommendation readability and original data', () => {
  it.each(cases)('$game summary icons match the displayed equipment', async entry => {
    const { container } = renderCase(entry);
    await screen.findByRole('region', { name: '추천 세팅 요약' });
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

  it('separates the screenshot WW option explanation and preserves its COST association', async () => {
    const source = sourceGuides.find(item => item.id === 'jingran')!;
    const before = JSON.stringify(source);
    const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/jingran/guide' });
    await screen.findByRole('region', { name: '추천 세팅 요약' });
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


describe('HSR and WW ranked option alternatives', () => {
  it('ranks HSR options and summary in source order for the selected variant', async () => {
    const source = HSR_CHARACTER_GUIDES.find(item => item.characterName === '초구')!;
    const original = JSON.stringify(source);
    const { container } = renderCase({ ...cases[0], path: '/gallery/hsr/character/초구/guide' });
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const check = (values: string[]) => {
      const card = Array.from(container.querySelectorAll('.guide-option-card')).find(card => card.querySelector('h4')?.textContent === '차원 구체')!;
      const rows = Array.from(card.querySelectorAll('li'));
      expect(rows.map(row => row.textContent)).toEqual(values.map((value, index) => `${index + 1}순위${value}`));
    };
    check(['HP', '화염 피해']);
    fireEvent.click(screen.getByRole('button', { name: '지속 피해 세팅' }));
    check(['화염 피해', '공격력']);
    expect(JSON.stringify(source)).toBe(original);
  });

  it('ranks WW option alternatives while retaining the explanation verbatim', async () => {
    const source = sourceGuides.find(item => item.id === 'jingran')! as any;
    const slot = (source.variants?.[0]?.mainStats || source.mainStats)[0];
    const original = slot.stats;
    try {
      slot.stats = ['크리티컬 or 크리티컬 피해 : 조건 충족 시 공격력 or 피해 보너스 선택'];
      const fetchRuntime = mockHsrGuideFetch();
      vi.stubGlobal('fetch', vi.fn(async (url: string) => {
        const data = await (await fetchRuntime(url)).json();
        return new Response(JSON.stringify({ ...data, guide: source }));
      }));
      const { container } = renderCase({ ...cases[1], path: '/gallery/ww/character/jingran/guide' });
      await screen.findByRole('region', { name: '추천 세팅 요약' });
      const rows = Array.from(container.querySelectorAll('.guide-option-card')[0].querySelectorAll('li'));
      expect(rows.map(row => row.textContent)).toEqual(['1순위크리티컬', '2순위크리티컬 피해']);
      const notes = container.querySelector('.guide-option-notes')!;
      expect(notes.textContent).toContain('조건 충족 시 공격력 or 피해 보너스 선택');
      expect(container.querySelector('.guide-option-grid')!.textContent).not.toContain('조건 충족');
    } finally {
      slot.stats = original;
    }
  });
});


it.each([{ route: 'camellya', sourceId: 'camellya' }, { route: '3be95fae-3dc7-809a-848d-cf54b30c697b', sourceId: 'jingran' }])('ranks actual WW array options for $route without changing source data', async ({ route, sourceId }) => {
  const source = sourceGuides.find(item => item.id === sourceId)! as any;
  const snapshot = JSON.stringify(source);
  const { container } = renderCase({ ...cases[1], path: `/gallery/ww/character/${route}/guide` });
  await screen.findByRole('region', { name: '추천 세팅 요약' });
  const slots = source.variants?.[0]?.mainStats || source.mainStats;
  const cards = Array.from(container.querySelectorAll('.guide-option-card'));
  expect(cards).toHaveLength(slots.length);
  slots.forEach((slot: any, index: number) => {
    const rows = Array.from(cards[index].querySelectorAll('li'));
    expect(rows).toHaveLength(slot.stats.length);
    rows.forEach((row, rank) => {
      expect(row.querySelector('.guide-rank')?.textContent).toBe(slot.stats.length > 1 ? `${rank + 1}순위` : undefined);
      expect(row.textContent).toContain(slot.stats[rank].split(/[:：]/)[0].trim());
    });
  });
  expect(JSON.stringify(source)).toBe(snapshot);
});


it('separates HSR conditional setup prose from numeric target cards', async () => {
  const source = HSR_CHARACTER_GUIDES.find(item => item.characterName.replace(/[•·]/g, '') === '히메코노바')!;
  const snapshot = JSON.stringify(source);
  const { container } = renderCase({ ...cases[0], path: '/gallery/hsr/character/히메코노바/guide' });
  await screen.findByRole('region', { name: '추천 세팅 요약' });
  const numeric = screen.getByRole('heading', { name: '목표 스탯' }).closest('section')!;
  const conditional = screen.getByRole('heading', { name: '조건별 세팅' }).closest('section')!;
  expect(numeric.querySelectorAll('.guide-target-value')).toHaveLength(3);
  expect(conditional.querySelector('.guide-target-value')).toBeNull();
  expect(conditional.querySelectorAll('.guide-target-descriptions .guide-copy')).toHaveLength(2);
  expect(conditional.textContent).toContain('선데이의 속도 160 이상, 치명타 확률 -20%');
  expect(conditional.textContent).toContain('스파클 속도 매+댄댄댄 조합으로 속도 168 이상, 속도 세팅 X');
  expect(container.textContent).toContain('선데이 사용 시 치명타 확률 -20%');
  expect(JSON.stringify(source)).toBe(snapshot);
});


it('keeps Phainon physical recommendations and removes the invalid wind build from setup and analysis', async () => {
  const source = HSR_CHARACTER_GUIDES.find(item => item.characterName === '파이논')!;
  expect(source.variants?.map(item => item.name)).toEqual(['물리 세팅']);
  expect(source.variants?.[0].mainStats).toEqual(source.mainStats);
  expect(JSON.stringify(source)).not.toContain('바람');
  const { container } = renderCase({ ...cases[0], path: '/gallery/hsr/character/파이논/guide' });
  await screen.findByRole('region', { name: '추천 세팅 요약' });
  expect(screen.queryByRole('button', { name: '바람 세팅' })).toBeNull();
  expect(container.textContent).toContain('물리 피해');
  expect(container.textContent).toContain('꿈을 엮는 요정의 낙원');
  fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
  expect(container.textContent).not.toContain('바람');
});


it('renders Cyrene speed ornaments as equal alternatives under one ranked group', async () => {
  const source = HSR_CHARACTER_GUIDES.find(item => item.characterName === '키레네')!;
  const snapshot = JSON.stringify(source);
  renderCase({ ...cases[0], path: '/gallery/hsr/character/키레네/guide' });
  await screen.findByRole('region', { name: '추천 세팅 요약' });
  const card = screen.getByRole('heading', { name: '속도 증가 장신구', level: 4 }).closest('.guide-equipment-card')!;
  expect(card.tagName).toBe('DIV');
  expect(card.querySelector('.guide-equipment-image')).toBeNull();
  expect(card.querySelectorAll('.guide-rank')).toHaveLength(1);
  expect(card.querySelector('.guide-rank')?.textContent).toBe('2순위');
  const links = within(card as HTMLElement).getAllByRole('link');
  expect(links.map(link => link.textContent)).toEqual(['겁화 연등의 연마궁', '사색하는 거목']);
  expect(card.textContent).not.toContain('바커');
  const relicGroup = screen.getByRole('heading', { name: '속도 2세트 + 속도 2세트', level: 4 }).closest('.guide-equipment-card')!;
  expect(relicGroup.tagName).toBe('DIV');
  expect(relicGroup.querySelector('.guide-equipment-image')).toBeNull();
  expect(relicGroup.textContent).toContain('속도 200 이상 세팅 시 해당 세트가 강제된다.');
  expect(screen.getByRole('heading', { name: '영원의 땅 앰포리어스', level: 4 })).toBeTruthy();
  links.forEach(link => {
    expect(link.getAttribute('href')).not.toContain(encodeURIComponent('속도 증가 장신구'));
    expect(link.querySelector('img')?.getAttribute('src')).toContain('.webp');
  });
  expect(within(card as HTMLElement).getAllByText('고속 세팅을 해야하는 키레네 특성 상 우선적으로 맞춰야 한다')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: '메인 딜러 세팅 : 6돌파 이상 권장' }));
  expect(screen.queryByRole('heading', { name: '속도 증가 장신구' })).toBeNull();
  expect(screen.getByRole('heading', { name: '고요한 습골지', level: 4 })).toBeTruthy();
  expect(JSON.stringify(source)).toBe(snapshot);
});
