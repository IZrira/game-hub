import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { GuideLayout } from '../common-hub/components/guides/GuideLayout';

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it('measures the destination after collapsing mobile navigation and focuses its heading', async () => {
  const { container } = render(<GuideLayout><section><h2>목표 수치</h2><p>조건을 포함한 목표</p></section></GuideLayout>);
  const menu = container.querySelector('details')!;
  await waitFor(() => expect(menu.querySelector('a')).toBeTruthy());
  menu.open = true;
  const heading = screen.getByRole('heading', { name: '목표 수치' });
  vi.spyOn(heading, 'getBoundingClientRect').mockImplementation(() => new DOMRect(0, menu.open ? 800 : 520, 100, 30));
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  fireEvent.click(within(menu).getByRole('link', { name: /목표 수치/ }));
  expect(menu.open).toBe(false);
  expect(scroll).toHaveBeenCalledWith(expect.objectContaining({ top: 520 + window.scrollY - 136 }));
  expect(document.activeElement).toBe(heading);
  expect(window.location.hash).toBe(`#${heading.id}`);
});
