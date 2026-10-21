import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SearchPage from '../common-hub/pages/Search';

vi.mock('../common-hub/components/SEO', () => ({ default: (props: any) => <span data-testid="robots">{props.noindex ? 'noindex' : 'index'}</span> }));
vi.mock('../common-hub/components/SearchModal', () => ({ default: (props: any) => props.isOpen ? <div role="dialog"><input aria-label="검색어" defaultValue={props.initialQuery} /><button onClick={props.onClose}>닫기</button></div> : null }));
afterEach(cleanup);
it('opens the existing search with URL query, stays noindex, and can reopen after closing', () => {
  render(<MemoryRouter initialEntries={['/search?q=%EC%84%A4%EC%A7%80']}><SearchPage /></MemoryRouter>);
  expect((screen.getByRole('textbox', { name: '검색어' }) as HTMLInputElement).value).toBe('설지');
  expect(screen.getByTestId('robots').textContent).toBe('noindex');
  fireEvent.click(screen.getByRole('button', { name: '닫기' }));
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('통합 검색');
  fireEvent.click(screen.getByRole('button', { name: '검색창 열기' }));
  expect(screen.getByRole('dialog')).toBeTruthy();
});
