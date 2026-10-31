import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import legacyData from '../aniimo-hub/data/aniimo.json';
import type { AniimoEntry, AniimoEvolutionNode } from '../aniimo-hub/types';
import { findAniimoEvolutionEntry, getAniimoId, isSameAniimo } from '../aniimo-hub/utils/identity';
import { getAniimoEnglishName } from '../aniimo-hub/utils/evolutionStage';
import { getEvolutionCondition } from '../aniimo-hub/data/evolutionConditions';

vi.mock('../aniimo-hub/data/aniimo-summary.json', async () => {
  const { default: data } = await import('../aniimo-hub/data/aniimo.json');
  const original = data[0];
  return { default: [original, {
    ...original, id: 'wave-archipelago-001', regionId: '300301', regionName: '웨이브 군도',
    name: '쉘코랄', forms: original.forms.map(form => ({ ...form, stats: { ...form.stats, hp: 83 } })),
  }] };
});
vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../aniimo-hub/components/AniimoNavigation', () => ({ AniimoSidebar: () => null, AniimoMobileNav: () => null }));

import Gallery from '../aniimo-hub/pages/Gallery';
import { AniimoEvolutionTree } from '../aniimo-hub/components/AniimoEvolutionTree';
import CharacterDetail from '../aniimo-hub/pages/CharacterDetail';

afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('region-local Aniimo numbers', () => {
  const legacy = legacyData[0] as AniimoEntry;
  const wave: AniimoEntry = { ...legacy, id: 'wave-archipelago-001', name: '쉘코랄', regionId: '300301' };

  it('preserves legacy runtime IDs and separates a new official No.001', () => {
    expect(getAniimoId(legacy)).toBe('001');
    expect(getAniimoId(wave)).toBe('wave-archipelago-001');
    expect(isSameAniimo(legacy, wave)).toBe(false);
    const waveNode = { number: '001', name: '쉘코랄', regionId: '300301' } as AniimoEvolutionNode;
    expect(findAniimoEvolutionEntry([legacy, wave], waveNode, '300301')).toBe(wave);
    expect(findAniimoEvolutionEntry([legacy], waveNode, '300301')).toBeUndefined();
    const crossRegionNode = { ...waveNode, id: '001', name: legacy.name, regionId: undefined };
    expect(findAniimoEvolutionEntry([legacy, wave], crossRegionNode, '300301')).toBe(legacy);
  });

  it('keeps missing official evolution targets visible without inventing a character link', () => {
    const node = { stage: '성장기', imageUrl: null, number: null, name: null, formKey: null, formLabel: null } as AniimoEvolutionNode;
    render(<MemoryRouter><AniimoEvolutionTree currentName="웨이비핀" regionId="300301" nodes={[node]} /></MemoryRouter>);
    expect(screen.getAllByText('미확인').length).toBeGreaterThan(0);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('loads the new entry from a separate runtime file and keeps the official number', async () => {
    const fetchDetail = vi.fn().mockResolvedValue({ ok: true, json: async () => wave });
    vi.stubGlobal('fetch', fetchDetail);
    render(<MemoryRouter initialEntries={['/gallery/aniimo/character/쉘코랄']}><Routes><Route path="/gallery/aniimo/character/:charName" element={<CharacterDetail />} /></Routes></MemoryRouter>);
    expect(await screen.findByRole('heading', { level: 1, name: '쉘코랄' })).toBeTruthy();
    expect(fetchDetail.mock.calls[0][0]).toBe('/assets/data/aniimo/wave-archipelago-001.json');
    expect(screen.queryByRole('heading', { level: 1, name: legacy.name })).toBeNull();
  });

  it('rejects a stale legacy detail response rather than displaying the wrong No.001', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => legacy }));
    render(<MemoryRouter initialEntries={['/gallery/aniimo/character/쉘코랄']}><Routes><Route path="/gallery/aniimo/character/:charName" element={<CharacterDetail />} /></Routes></MemoryRouter>);
    expect(await screen.findByText('상세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.')).toBeTruthy();
    expect(screen.queryByRole('heading', { level: 1, name: legacy.name })).toBeNull();
  });

  it('never attaches a legacy English name or evolution requirement to the new number', () => {
    expect(getAniimoEnglishName(legacy)).toBe('Emberpup');
    expect(getAniimoEnglishName(wave)).toBeUndefined();
    expect(getEvolutionCondition('002', 'basic-form')).toBeTruthy();
    expect(getEvolutionCondition('002', 'basic-form', '300301')).toBeUndefined();
  });

  it('compares both No.001 entries independently and retains selection after region filtering', () => {
    render(<MemoryRouter><Gallery /></MemoryRouter>);
    const cards = within(screen.getByRole('region', { name: '애니모 전체 도감' })).getAllByRole('article');
    expect(cards).toHaveLength(2);
    for (const card of cards) fireEvent.click(within(card).getByRole('button', { name: '비교하기' }));
    const comparison = screen.getByRole('table');
    expect(within(comparison).getByText(legacy.name)).toBeTruthy();
    expect(within(comparison).getByText('쉘코랄')).toBeTruthy();
    fireEvent.click(within(screen.getByRole('group', { name: '도감 지역 선택' })).getByRole('button', { name: '웨이브 군도' }));
    const filtered = within(screen.getByRole('region', { name: '애니모 전체 도감' })).getAllByRole('article');
    expect(filtered).toHaveLength(1);
    expect(within(filtered[0]).getByRole('heading', { name: '쉘코랄' })).toBeTruthy();
    expect(within(comparison).getByText(legacy.name)).toBeTruthy();
    fireEvent.click(within(comparison).getAllByRole('button', { name: '제거' })[1]);
    expect(within(comparison).queryByText('쉘코랄')).toBeNull();
    expect(within(comparison).getByText(legacy.name)).toBeTruthy();
  });
});
