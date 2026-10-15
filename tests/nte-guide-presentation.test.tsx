import React from 'react';
import { build } from 'esbuild';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import CharacterGuideDetail from '../nte-hub/pages/CharacterGuideDetail';
import articles from '../common-hub/data/guideArticles.json';
import { parseNteCharacterGuide } from '../nte-hub/data/parseCharacterGuide';
import { NTE_CARTRIDGES } from '../nte-hub/data/cartridges';
import { mockGuideFetch } from './helpers/hsrGuideFetch';

vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
beforeEach(() => vi.stubGlobal('fetch', mockGuideFetch()));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const article = articles.find(item => item.gameId === 'nte' && item.title === '감정사 세팅 공략')!;
const original = JSON.stringify(article);
const source = parseNteCharacterGuide(article.content);
const renderGuide = (slug = article.slug) => render(
  <MemoryRouter initialEntries={[`/gallery/nte/guides/${slug}`]}>
    <Link to="/gallery/nte/guides/레이븐-build-guide">레이븐 공략 이동</Link>
    <Routes><Route path="/gallery/nte/guides/:slug" element={<CharacterGuideDetail />} /></Routes>
  </MemoryRouter>
);

describe('NTE guide selected console and conditions', () => {
  it('does not bundle all article bodies into the NTE setup page', async () => {
    const result = await build({ entryPoints: ['nte-hub/pages/CharacterGuideDetail.tsx'], bundle: true, packages: 'external', outdir: 'unused', write: false, metafile: true, logLevel: 'silent' });
    expect(Object.keys(result.metafile!.inputs).some(file => /guideArticles\.(json|ts)$/.test(file))).toBe(false);
  });
  it('does not request missing guides', () => {
    const fetcher = mockGuideFetch(); vi.stubGlobal('fetch', fetcher);
    renderGuide('missing');
    expect(screen.getByRole('heading', { name: '캐릭터 공략을 찾을 수 없습니다' })).toBeTruthy();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('retries a failed article without changing its selected character', async () => {
    const fetcher = mockGuideFetch();
    fetcher.mockResolvedValueOnce(new Response('', { status: 503 }));
    vi.stubGlobal('fetch', fetcher);
    renderGuide();
    await screen.findByRole('alert');
    fireEvent.click(screen.getByRole('button', { name: '다시 불러오기' }));
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0][0]).toBe(fetcher.mock.calls[1][0]);
    expect(screen.getByRole('heading', { level: 1, name: /감정사/ })).toBeTruthy();
  });

  it('resets console selection when moving to another character and requests only that article', async () => {
    const fetcher = mockGuideFetch(); vi.stubGlobal('fetch', fetcher);
    renderGuide();
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    fireEvent.click(screen.getByRole('button', { name: source.consoles[1].name }));
    fireEvent.click(screen.getByRole('link', { name: '레이븐 공략 이동' }));
    await screen.findByRole('heading', { level: 1, name: /레이븐/ });
    const next = articles.find(item => item.slug === '레이븐-build-guide')!;
    const initialConsole = parseNteCharacterGuide(next.content).consoles[0].name;
    expect(screen.getByRole('region', { name: '추천 세팅 요약' }).textContent).toContain(initialConsole);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls.every(([url]) => String(url).startsWith('/assets/data/articles/nte/'))).toBe(true);
  });

  it('changes the console summary and effects while preserving source options and separate target conditions', async () => {
    const { container } = renderGuide();
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const alternative = source.consoles[1];
    fireEvent.click(screen.getByRole('button', { name: alternative.name }));
    expect(within(screen.getByRole('region', { name: '추천 세팅 요약' })).getByText(alternative.name)).toBeTruthy();
    expect(screen.getByRole('heading', { name: alternative.name })).toBeTruthy();
    const cartridge = NTE_CARTRIDGES.find(item => item.name === alternative.name)!;
    expect(screen.getByText(cartridge.twoPieceEffect, { exact: true })).toBeTruthy();
    expect(screen.getByText(cartridge.fourPieceEffect, { exact: true })).toBeTruthy();
    const defaultTargets = screen.getByRole('heading', { name: source.statGroups[0].label }).parentElement!;
    const conditionalTargets = screen.getByRole('heading', { name: new RegExp(source.statGroups[1].label) }).parentElement!;
    expect(within(defaultTargets).getByText('40% 이상')).toBeTruthy();
    expect(within(defaultTargets).queryByText('45% 이상')).toBeNull();
    expect(within(conditionalTargets).getByText('45% 이상')).toBeTruthy();
    expect(within(conditionalTargets).getByText('조건별 목표')).toBeTruthy();
    for (const option of [...source.mainStats, ...source.subStats]) {
      expect(container.textContent).toContain(option);
    }
    expect(container.textContent).toContain('콘솔 설명과 세트 효과만 바뀝니다.');
    expect(JSON.stringify(article)).toBe(original);
  });

  it('shows awakening numbers in source priority order and each synergy character once', async () => {
    const { container } = renderGuide();
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const awakening = screen.getByRole('heading', { name: '각성 우선순위' }).closest('section')!;
    const cards = within(awakening).getAllByRole('listitem');
    expect(cards.map(card => within(card).getByText(/^각성 \d$/, { exact: true }).textContent)).toEqual(source.awakeningPriority.map(rank => `각성 ${rank}`));
    const party = screen.getByRole('heading', { name: '시너지 캐릭터' }).closest('section')!;
    expect(within(party).getAllByText('사키리', { exact: true })).toHaveLength(1);
    expect(source.party.filter(name => name === '사키리')).toHaveLength(2);
    expect(within(party).getAllByRole('link')).toHaveLength(new Set(source.party).size);
    expect(container.querySelector('a[href*="notion."]')).toBeNull();
    expect(JSON.stringify(article)).toBe(original);
  });
});
