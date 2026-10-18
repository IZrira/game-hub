import React from 'react';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router';
import HubIntro from '../common-hub/components/HubIntro';

afterEach(cleanup);
const Location = () => <output data-testid="location">{useLocation().pathname}{useLocation().search}</output>;
const setup = (searchPath = '/gallery/ww?menu=캐릭터') => render(<MemoryRouter><HubIntro title="명조" description="도감과 세팅" stats={[{ label: '캐릭터', value: 60 }]} searchPath={searchPath} searchLabel="캐릭터 이름 검색" links={[{ label: '도감', to: searchPath }]} /><Location /></MemoryRouter>);

describe('HubIntro search and shared rhythm', () => {
  it('renders a real heading, definition list and navigable shortcuts', () => {
    setup();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('명조');
    expect(screen.getByRole('definition').textContent).toBe('60');
    expect(screen.getByRole('link', { name: '도감' }).getAttribute('href')).toBe('/gallery/ww?menu=캐릭터');
  });
  it('preserves menu and encodes search as a single query value', () => {
    setup();
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: ' 기염 & menu=무기 ' } });
    fireEvent.submit(screen.getByRole('search'));
    const result = new URL(screen.getByTestId('location').textContent!, 'https://example.test');
    expect(result.searchParams.get('menu')).toBe('캐릭터');
    expect(result.searchParams.get('search')).toBe('기염 & menu=무기');
  });
  it('does not add empty search and supports a path without query params', () => {
    setup('/gallery/aniimo/characters');
    fireEvent.submit(screen.getByRole('search'));
    expect(screen.getByTestId('location').textContent).toBe('/gallery/aniimo/characters');
  });
});
