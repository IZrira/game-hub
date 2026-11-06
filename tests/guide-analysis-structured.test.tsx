import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { GuideAnalysis, rotationAction } from '../common-hub/components/guides/GuideContent';
import { renderNteGuideAnalysis } from '../scripts/lib/nte-guide-analysis.js';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
afterEach(cleanup);

describe('structured RIRA analysis', () => {
  it('labels a step with its earliest action word and ignores NTE terms that contain WW words', () => {
    expect(rotationAction('「풍미 변주」로 일반 공격을 원거리 모드로 둔다.')).toBe('일반 공격');
    expect(rotationAction('바이레일 스킬을 쓴 뒤 교대한다.')).toBe('바이레일');
    expect(rotationAction('다른 캐릭터로 교대한다.')).toBe('교대');
    expect(rotationAction('「악몽」 중첩을 쌓는 과정을 반복한다.')).toBeUndefined();
  });

  it('renders teams, gear and target tiers only when they are present', () => {
    render(<MemoryRouter><GuideAnalysis data={{
      summary: '요약',
      rotation: ['울티메이트를 쓴다.'],
      teams: [{ label: '스테인', slots: [[{ name: '아카네 린', to: '/a' }], [{ name: '사키리' }, { name: '하니엘' }]] }],
      gear: [{ name: '달의 대척점', note: '전용 · 1순위', reason: '바이레일 스킬 피해 증가' }],
      targets: { columns: ['치명 확률'], rows: [{ label: '기본', values: ['45%'] }] },
    }} /></MemoryRouter>);
    const team = screen.getByRole('heading', { name: '추천 파티' }).closest('section')!;
    expect(within(team).getByRole('link', { name: '아카네 린' }).getAttribute('href')).toBe('/a');
    expect(within(team).getByText('또는')).toBeTruthy();
    expect(screen.getByText('울티메이트', { selector: '.guide-step-action' })).toBeTruthy();
    expect(screen.getByText('바이레일 스킬 피해 증가')).toBeTruthy();
    expect(screen.getByRole('columnheader', { name: '치명 확률' })).toBeTruthy();
    expect(screen.getByRole('rowheader', { name: '기본' })).toBeTruthy();

    cleanup();
    render(<MemoryRouter><GuideAnalysis data={{ summary: '요약' }} /></MemoryRouter>);
    expect(screen.queryByRole('heading', { name: '추천 파티' })).toBeNull();
    expect(screen.queryByRole('heading', { name: '장비 선택 근거' })).toBeNull();
    expect(screen.queryByRole('heading', { name: '육성 목표' })).toBeNull();
  });

  it('prerenders the structured fields as escaped text', () => {
    const html = renderNteGuideAnalysis({
      status: 'published', role: 'r', standard: 's', reviewedAt: 'd', summary: 'x', strengths: [], weaknesses: [], teamPrinciple: 't',
      gameplay: { overview: 'o', rotation: ['a'], tips: [] },
      teams: [{ label: '<b>', slots: [['사키리', '하니엘']] }],
      gear: [{ kind: 'arc', name: '마지막 장미', note: '전용', reason: '<img>' }],
      targets: { columns: ['공격력'], rows: [{ label: '기본', values: ['2100'] }] },
    }, (value: string) => String(value).replace(/</g, '&lt;').replace(/>/g, '&gt;'));
    expect(html).toContain('사키리 또는 하니엘');
    expect(html).toContain('마지막 장미 (전용): &lt;img&gt;');
    expect(html).toContain('기본: 공격력 2100');
    expect(html).not.toContain('<img>');
    expect(html).not.toContain('<b>');
  });
});
