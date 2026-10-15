import React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { Link, MemoryRouter, Route, Routes } from 'react-router';
import WuwaCharacterGuideDetail from '../ww-hub/pages/WuwaCharacterGuideDetail';
import characterSummary from '../ww-hub/data/generated/character-summary.json';
import sourceGuides from '../ww-hub/data/generated/guides.json';
import sourceAnalysis from '../ww-hub/data/guide-analysis.json';
import { mockGuideFetch } from './helpers/hsrGuideFetch';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/FeedbackReportModal', () => ({ default: () => null }));

beforeEach(() => vi.stubGlobal('fetch', mockGuideFetch()));
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

const renderGuide = (characterId: string) => render(
  <MemoryRouter initialEntries={[`/gallery/ww/character/${characterId}/guide`]}>
    <Link to="/gallery/ww/character/jiyan/guide">기염 공략으로 이동</Link>
    <Routes>
      <Route path="/gallery/:gameId/character/:charName/guide" element={<WuwaCharacterGuideDetail />} />
    </Routes>
  </MemoryRouter>
);

describe('WW guide navigation and selected build', () => {
  it.each([
    ['yangyang', '양양'],
    ['양양', '양양'],
    ['yangyang_magistrate', '양양 · 현령'],
    ['기염_세팅_공략', '기염']
  ])('keeps the correct guide for the existing alias %s', async (route, name) => {
    renderGuide(route);
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    expect(screen.getByRole('heading', { level: 1, name: `${name} 공략` })).toBeTruthy();
  });

  it('shows a missing guide without requesting unrelated data', () => {
    const fetchRuntime = mockGuideFetch();
    vi.stubGlobal('fetch', fetchRuntime);
    renderGuide('등록되지않은공략');
    expect(screen.getByRole('heading', { name: '공략을 찾을 수 없습니다' })).toBeTruthy();
    expect(fetchRuntime).not.toHaveBeenCalled();
  });

  it('retries a failed request without losing the original guide', async () => {
    const fetchRuntime = mockGuideFetch();
    fetchRuntime.mockResolvedValueOnce(new Response('', { status: 503 }));
    vi.stubGlobal('fetch', fetchRuntime);
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    try {
      renderGuide('camellya');
      await screen.findByRole('alert');
      fireEvent.click(screen.getByRole('button', { name: '다시 불러오기' }));
      expect(await screen.findByRole('region', { name: '추천 세팅 요약' })).toBeTruthy();
      expect(fetchRuntime).toHaveBeenCalledTimes(2);
    } finally { errorLog.mockRestore(); }
  });

  it('ignores a previous character response arriving after navigation', async () => {
    let finishPrevious!: (response: Response) => void;
    const pending = new Promise<Response>(resolve => { finishPrevious = resolve; });
    const fetchRuntime = mockGuideFetch();
    fetchRuntime.mockImplementationOnce(() => pending);
    vi.stubGlobal('fetch', fetchRuntime);
    renderGuide('camellya');
    await waitFor(() => expect(fetchRuntime).toHaveBeenCalledOnce());
    const previousUrl = String(fetchRuntime.mock.calls[0][0]);
    fireEvent.click(screen.getByRole('link', { name: '기염 공략으로 이동' }));
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const original = await mockGuideFetch()(previousUrl);
    await act(async () => { finishPrevious(original); });
    expect(screen.getByRole('heading', { name: '기염 공략', level: 1 })).toBeTruthy();
  });

  it.each(['rebecca', 'lucy', 'chisa', 'qiuyuan'])('preserves mixed-set conditions and echo explanations for %s', async characterId => {
    const source = sourceGuides.find(item => item.id === characterId)! as any;
    const original = JSON.stringify(source);
    const { container } = renderGuide(characterId);
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const selector = screen.getByRole('group', { name: '세팅 선택' });
    const buttons = within(selector).getAllByRole('button');
    for (const [index, variant] of source.variants.entries()) {
      fireEvent.click(buttons[index]);
      await waitFor(() => expect(buttons[index].getAttribute('aria-pressed')).toBe('true'));
      const sets = container.querySelector('[id="추천 에코"]')!;
      for (const item of variant.echoSets) {
        if (item.note) expect(sets.textContent).toContain(item.note);
      }
      for (const echo of variant.mainEchoes) {
        expect(sets.textContent).toContain(echo.name);
        expect(sets.textContent).toContain(echo.reason);
      }
      const stats = container.querySelector('[id="권장 스텟"]')!;
      for (const slot of variant.mainStats || source.mainStats) {
        for (const value of slot.stats) expect(stats.textContent).toContain(value);
        if (slot.note) expect(stats.textContent).toContain(slot.note);
      }
      if (variant.name.includes('+')) expect(sets.querySelector('.guide-equipment-alternatives')).toBeTruthy();
    }
    fireEvent.click(buttons[0]);
    await waitFor(() => expect(buttons[0].getAttribute('aria-pressed')).toBe('true'));
    if (characterId === 'rebecca' || characterId === 'lucy') {
      expect(container.querySelector('[id="추천 에코"]')?.textContent).toContain('2 Pieces × 2');
    }
    expect(JSON.stringify(source)).toBe(original);
  });

  it('links synergy cards to published character routes instead of source database IDs', async () => {
    const { container } = renderGuide('camellya');
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const synergy = container.querySelector('[id="시너지 캐릭터"]') as HTMLElement;
    expect(within(synergy).getByText('린네').closest('a')?.getAttribute('href')).toBe('/gallery/ww/character/linne');
    expect(within(synergy).getByText('로코코').closest('a')?.getAttribute('href')).toBe('/gallery/ww/character/rococo');
    for (const link of synergy.querySelectorAll('a')) {
      const routeId = decodeURIComponent(link.getAttribute('href')!.split('/').pop()!);
      expect(characterSummary.some(character => character.id === routeId)).toBe(true);
    }
  });

  it('switches the echo equipment summary together while retaining common weapon recommendations', async () => {
    const { container } = renderGuide('yinlin');
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    fireEvent.click(screen.getByRole('button', { name: '떠오르는 구름 5세트' }));
    const echoes = container.querySelector('[id="추천 에코"]') as HTMLElement;
    expect(within(echoes).getByText('떠오르는 구름 5세트')).toBeTruthy();
    expect(within(echoes).getByText('음험한 백로')).toBeTruthy();
    expect(within(echoes).queryByText('악몽 · 천둥의 비늘')).toBeNull();
    const summary = screen.getByRole('region', { name: '추천 세팅 요약' });
    expect(within(summary).getByText('떠오르는 구름 5세트')).toBeTruthy();
    expect(within(summary).getByText('음험한 백로')).toBeTruthy();
    expect(container.textContent).toContain('추천 무기·목표 수치·부옵션은 공통입니다.');
    const weapons = container.querySelector('[id="추천 무기"]') as HTMLElement;
    expect(within(weapons).getAllByText('꼭두각시의 손').length).toBeGreaterThan(0);
    expect(container.querySelector('a[href*="notion."]')).toBeNull();
  });

  it('preserves original targets, option conditions, skill order and detailed analysis', async () => {
    const originalGuide = sourceGuides.find(guide => guide.id === 'jiyan')!;
    const originalSnapshot = JSON.stringify(originalGuide);
    const { container } = renderGuide('jiyan');
    await screen.findByRole('region', { name: '추천 세팅 요약' });
    const stats = container.querySelector('[id="권장 스텟"]') as HTMLElement;
    for (const target of originalGuide.targetStats) {
      expect(within(stats).getByText(target.value)).toBeTruthy();
    }
    expect(stats.textContent).toContain('공명 효율을 부 옵션에서 맞출 수 없을 경우 주 옵션에서 챙긴다');
    const skillSection = container.querySelector('[id="스킬 육성 우선순위"]') as HTMLElement;
    const skills = within(skillSection).getAllByRole('listitem').map(node => node.querySelector('p')?.textContent);
    expect(skills).toEqual(originalGuide.skillPriority);
    fireEvent.click(screen.getByRole('button', { name: 'RIRA 분석 가이드' }));
    const analysis = container.querySelector('[id="RIRA 분석 가이드"]') as HTMLElement;
    expect(analysis.textContent).toContain(sourceAnalysis.jiyan.summary);
    for (const detail of [...sourceAnalysis.jiyan.strengths, ...sourceAnalysis.jiyan.weaknesses, ...sourceAnalysis.jiyan.rotation, ...sourceAnalysis.jiyan.tips]) {
      expect(analysis.textContent).toContain(detail);
    }
    expect(JSON.stringify(originalGuide)).toBe(originalSnapshot);
  });
});
