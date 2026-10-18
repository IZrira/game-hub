import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Gallery from '../aniimo-hub/pages/Gallery';
import Hub from '../aniimo-hub/pages/Hub';

vi.mock('../common-hub/components/SEO', () => ({ default: () => null }));
vi.mock('../common-hub/components/PageHeader', () => ({ default: () => null }));
vi.mock('../aniimo-hub/components/AniimoNavigation', () => ({ AniimoSidebar: () => null, AniimoMobileNav: () => null }));
afterEach(cleanup);

describe('Aniimo empty search recovery', () => {
  it('uses the hub search query without dropping comparison controls', () => {
    render(<MemoryRouter initialEntries={['/gallery/aniimo/characters?search=탄멍멍']}><Gallery /></MemoryRouter>);
    expect((screen.getByRole('textbox', { name: '이름 또는 도감 번호 검색' }) as HTMLInputElement).value).toBe('탄멍멍');
    const gallery = screen.getByRole('region', { name: '애니모 전체 도감' });
    expect(within(gallery).getAllByRole('article')).toHaveLength(1);
    expect(within(gallery).getByRole('button', { name: '비교하기' })).toBeTruthy();
  });

  it('keeps hub discovery distinct and preserves original routes and official link', () => {
    render(<MemoryRouter><Hub /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('애니모');
    expect(screen.getByRole('heading', { name: '진화와 형태 살펴보기' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: '서식지로 찾기' })).toBeTruthy();
    expect(screen.getByRole('link', { name: '비교할 애니모 선택' }).getAttribute('href')).toBe('/gallery/aniimo/characters');
    expect(screen.getByRole('link', { name: '애니모 공식 사이트' }).getAttribute('href')).toBe('https://www.aniimo.com/ko');
    const browse = screen.getByRole('region', { name: '애니모 찾아보기' });
    expect(within(browse).getAllByRole('img')).toHaveLength(4);
    expect(within(browse).getByRole('img', { name: '탄멍멍' }).getAttribute('src')).toContain('Wiki_Aniimo_10051.png');
  });

  it('places accessible name search before regional browsing without removing filters', () => {
    render(<MemoryRouter><Gallery /></MemoryRouter>);
    const input = screen.getByRole('textbox', { name: '이름 또는 도감 번호 검색' });
    const regions = screen.getByRole('heading', { name: '지역별 애니모' });
    expect(input.compareDocumentPosition(regions) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getAllByRole('combobox')).toHaveLength(4);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('애니모 도감·능력치 비교');
  });

  it('resets every search condition while keeping comparison selections', () => {
    render(<MemoryRouter><Gallery /></MemoryRouter>);
    const gallery = screen.getByRole('region', { name: '애니모 전체 도감' });
    const originalCount = within(gallery).getAllByRole('article').length;
    fireEvent.click(within(gallery).getAllByRole('button', { name: '비교하기' })[0]);
    const selects = screen.getAllByRole('combobox') as HTMLSelectElement[];
    for (const select of selects) fireEvent.change(select, { target: { value: select.options[1].value } });
    const locationButtons = screen.getAllByRole('button').filter(button => button.hasAttribute('aria-pressed'));
    fireEvent.click(locationButtons[1]);
    const input = screen.getByPlaceholderText('이름 또는 도감 번호 검색');
    fireEvent.change(input, { target: { value: 'zzzz-no-result' } });
    expect(screen.getByText('조건에 맞는 애니모가 없습니다.')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '검색 조건 초기화' }));
    expect((input as HTMLInputElement).value).toBe('');
    for (const select of selects) expect(select.value).toBe('전체');
    expect(locationButtons[0].getAttribute('aria-pressed')).toBe('true');
    expect(within(gallery).getAllByRole('article')).toHaveLength(originalCount);
    expect(screen.getByRole('heading', { name: '능력치 실시간 비교' })).toBeTruthy();
    expect(screen.queryByRole('button', { name: '검색 조건 초기화' })).toBeNull();
  });
});
