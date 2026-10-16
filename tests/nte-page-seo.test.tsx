import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import CharacterDetailNTE from '../nte-hub/pages/CharacterDetail';
import NTEPartyRecommendations from '../nte-hub/pages/PartyRecommendations';
import { NTE_CHARACTER_DATA } from '../nte-hub/data/characterData';
import { NTE_PARTY_COMBINATIONS } from '../nte-hub/data/parties';

const seo = vi.hoisted(() => vi.fn());
vi.mock('../common-hub/components/SEO', () => ({ default: (props: unknown) => { seo(props); return null; } }));
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value }) }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../common-hub/components/GallerySidebar', () => ({ default: () => null }));
vi.mock('../common-hub/components/ItemIcon', () => ({ default: () => null }));
vi.mock('../common-hub/components/AdPlaceholder', () => ({ default: () => null }));
vi.mock('../common-hub/components/CharacterReviewBoard', () => ({ default: () => null }));
vi.mock('../common-hub/components/FeedbackReportModal', () => ({ default: () => null }));
vi.mock('../common-hub/components/ItemDetailModal', () => ({ default: () => null }));
vi.mock('../common-hub/components/SynergyDeck', () => ({ default: () => null }));
vi.mock('../nte-hub/components/NteEntityGraphSection', () => ({ default: () => null }));
vi.mock('../common-hub/lib/supabase', () => ({ supabase: null }));

afterEach(() => {
  cleanup();
  seo.mockClear();
  localStorage.clear();
});

describe('NTE page canonical inputs', () => {
  const character = NTE_CHARACTER_DATA.find(item => item.name === '감정사')!;
  const expectedCharacterUrl = `/gallery/nte/character/${encodeURIComponent(character.name)}`;

  it.each([
    ['name', encodeURIComponent(character.name)],
    ['legacy UUID', character.id],
  ])('keeps the name canonical and breadcrumb for a %s character route', (_label, identifier) => {
    render(<MemoryRouter initialEntries={[`/gallery/nte/character/${identifier}`]}><Routes>
      <Route path="/gallery/:gameId/character/:charName" element={<CharacterDetailNTE />} />
    </Routes></MemoryRouter>);

    const props = seo.mock.lastCall![0];
    expect(props.url).toBe(expectedCharacterUrl);
    expect(props.breadcrumbData.at(-1)).toEqual({ name: character.name, url: expectedCharacterUrl });
    expect(props.url).not.toContain(character.id);
  });

  it('gives the parties page its own canonical and current element terminology without changing party cards', () => {
    render(<MemoryRouter initialEntries={['/gallery/nte/parties']}><Routes>
      <Route path="/gallery/:gameId/parties" element={<NTEPartyRecommendations />} />
    </Routes></MemoryRouter>);

    const props = seo.mock.lastCall![0];
    expect(props.url).toBe('/gallery/nte/parties');
    expect(props.description).toBe('이환(NTE)의 빛·령·주·암·상·혼 속성을 활용한 4인 추천 파티와 에스퍼 사이클 조합을 확인하세요.');
    expect(screen.getAllByRole('heading', { level: 4 }).map(heading => heading.textContent)).toEqual(NTE_PARTY_COMBINATIONS.map(party => party.name));
  });

  it('stacks the sidebar above party content on mobile while retaining the desktop row layout', () => {
    const { container } = render(<MemoryRouter initialEntries={['/gallery/nte/parties']}><Routes>
      <Route path="/gallery/:gameId/parties" element={<NTEPartyRecommendations />} />
    </Routes></MemoryRouter>);

    const root = container.firstElementChild!;
    expect(root.classList.contains('flex')).toBe(true);
    expect(root.classList.contains('flex-col')).toBe(true);
    expect(root.classList.contains('lg:flex-row')).toBe(true);
    expect(root.querySelector('main')!.parentElement!.classList.contains('min-w-0')).toBe(true);
    expect(screen.getAllByRole('heading', { level: 4 }).map(heading => heading.textContent)).toEqual(NTE_PARTY_COMBINATIONS.map(party => party.name));
  });
});
