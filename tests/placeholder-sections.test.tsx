import fs from 'node:fs';
import React from 'react';
import { afterEach, expect, it } from 'vitest';
import { cleanup, render, renderHook, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SynergyDeck from '../common-hub/components/SynergyDeck';
import { hasPublishableText } from '../common-hub/utils/placeholderText.js';
import { useHasRecommendedParties } from '../common-hub/hooks/useHasRecommendedParties';

afterEach(cleanup);

it.each(['추후 추가', '추후 업데이트', '준비 중입니다.', '**추후 추가**', '', '   ', undefined, null])(
  'treats %j as a placeholder that must not be published', value => {
    expect(hasPublishableText(value)).toBe(false);
  });

it('keeps real story text publishable', () => {
  expect(hasPublishableText('은하열차가 처음 출발하던 날의 기록.')).toBe(true);
});

it('renders nothing instead of a "데이터 준비중" party section', () => {
  const { container } = render(<MemoryRouter><SynergyDeck characterName="__no_party__" gameId="nte" /></MemoryRouter>);
  expect(container.textContent).toBe('');
});

it('reports parties only for characters that have them', async () => {
  const withParty = renderHook(() => useHasRecommendedParties('hsr', 'pearl'));
  const withoutParty = renderHook(() => useHasRecommendedParties('nte', '__no_party__'));
  await waitFor(() => expect(withParty.result.current).toBe(true));
  expect(withoutParty.result.current).toBe(false);
});

it('gates the party tab and section on registered parties in every character page', () => {
  for (const page of ['hsr-hub/pages/CharacterDetail.tsx', 'ww-hub/pages/CharacterDetail.tsx', 'nte-hub/pages/CharacterDetail.tsx']) {
    const source = fs.readFileSync(page, 'utf8');
    expect(source).toContain("...(hasParties ? [{ id: 'synergy', label: t('추천 파티') }] : [])");
    expect(source).toMatch(/\{hasParties && \(\s*<div id="synergy"/);
  }
});

it('omits placeholder lightcone stories from the app and prerendered pages', () => {
  expect(fs.readFileSync('hsr-hub/pages/LightConeDetail.tsx', 'utf8')).toContain('hasPublishableText(lc.story) && (');
  expect(fs.readFileSync('scripts/prerender-meta.js', 'utf8')).toContain('if (hasPublishableText(lc.story))');
});
