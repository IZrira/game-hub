import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import WuwaCharacterGuideDetail from '../ww-hub/pages/WuwaCharacterGuideDetail';
import characterSummary from '../ww-hub/data/generated/character-summary.json';
import sourceGuides from '../ww-hub/data/generated/guides.json';
import sourceAnalysis from '../ww-hub/data/guide-analysis.json';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/FeedbackReportModal', () => ({ default: () => null }));

afterEach(cleanup);

const renderGuide = (characterId: string) => render(
  <MemoryRouter initialEntries={[`/gallery/ww/character/${characterId}/guide`]}>
    <Routes>
      <Route path="/gallery/:gameId/character/:charName/guide" element={<WuwaCharacterGuideDetail />} />
    </Routes>
  </MemoryRouter>
);

describe('WW guide navigation and selected build', () => {
  it.each(['rebecca', 'lucy', 'chisa', 'qiuyuan'])('preserves mixed-set conditions and echo explanations for %s', characterId => {
    const source = sourceGuides.find(item => item.id === characterId)! as any;
    const original = JSON.stringify(source);
    const { container } = renderGuide(characterId);
    const selector = screen.getByRole('group', { name: '세팅 선택' });
    const buttons = within(selector).getAllByRole('button');
    source.variants.forEach((variant: any, index: number) => {
      fireEvent.click(buttons[index]);
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
    });
    fireEvent.click(buttons[0]);
    if (characterId === 'rebecca' || characterId === 'lucy') {
      expect(container.querySelector('[id="추천 에코"]')?.textContent).toContain('2 Pieces × 2');
    }
    expect(JSON.stringify(source)).toBe(original);
  });

  it('links synergy cards to published character routes instead of source database IDs', () => {
    const { container } = renderGuide('camellya');
    const synergy = container.querySelector('[id="시너지 캐릭터"]') as HTMLElement;
    expect(within(synergy).getByText('린네').closest('a')?.getAttribute('href')).toBe('/gallery/ww/character/linne');
    expect(within(synergy).getByText('로코코').closest('a')?.getAttribute('href')).toBe('/gallery/ww/character/rococo');
    for (const link of synergy.querySelectorAll('a')) {
      const routeId = decodeURIComponent(link.getAttribute('href')!.split('/').pop()!);
      expect(characterSummary.some(character => character.id === routeId)).toBe(true);
    }
  });

  it('switches the echo equipment summary together while retaining common weapon recommendations', () => {
    const { container } = renderGuide('yinlin');
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

  it('preserves original targets, option conditions, skill order and detailed analysis', () => {
    const originalGuide = sourceGuides.find(guide => guide.id === 'jiyan')!;
    const originalSnapshot = JSON.stringify(originalGuide);
    const { container } = renderGuide('jiyan');
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
