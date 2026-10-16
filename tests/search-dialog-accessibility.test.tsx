import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import GlobalSearch from '../common-hub/components/GlobalSearch';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value, i18n: { language: 'ko' } }) }));
afterEach(() => { cleanup(); localStorage.clear(); });

function setup() {
  render(<MemoryRouter><button>다른 시작 위치</button><GlobalSearch /></MemoryRouter>);
  return screen.getByRole('button', { name: '통합 아카이브 검색' });
}

describe('global search modal keyboard lifecycle', () => {
  it('names the dialog and input, traps both Tab edges and rejects outside focus', async () => {
    const trigger = setup();
    trigger.focus();
    fireEvent.click(trigger);
    const input = await screen.findByRole('textbox', { name: '검색어' });
    const dialog = screen.getByRole('dialog', { name: '통합 아카이브 검색' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(document.activeElement).toBe(input);
    const buttons = within(dialog).getAllByRole('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    first.focus();
    fireEvent.keyDown(first, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
    fireEvent.keyDown(last, { key: 'Tab' });
    expect(document.activeElement).toBe(first);
    trigger.focus();
    expect(dialog.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(input, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('');
  });

  it.each(['ctrlKey', 'metaKey'] as const)('returns to the %s shortcut origin after close', async modifier => {
    setup();
    const origin = screen.getByRole('button', { name: '다른 시작 위치' });
    origin.focus();
    fireEvent.keyDown(origin, { key: 'k', [modifier]: true });
    await screen.findByRole('textbox', { name: '검색어' });
    fireEvent.click(screen.getByRole('button', { name: 'Close search' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(origin);
  });

  it('keeps the original shortcut origin when opened again and supports custom open events', async () => {
    setup();
    const origin = screen.getByRole('button', { name: '다른 시작 위치' });
    origin.focus();
    fireEvent(window, new Event('open-global-search'));
    const input = await screen.findByRole('textbox', { name: '검색어' });
    fireEvent.keyDown(input, { key: 'k', ctrlKey: true });
    fireEvent.keyDown(input, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(origin);
  });

  it('returns to a visible search trigger when the menu opener has been removed', async () => {
    const trigger = setup();
    trigger.parentElement!.style.display = 'none';
    const mobileSearch = document.createElement('button');
    mobileSearch.setAttribute('data-global-search-trigger', '');
    const menuSearch = document.createElement('button');
    document.body.append(mobileSearch, menuSearch);
    try {
      menuSearch.focus();
      fireEvent(window, new Event('open-global-search'));
      await screen.findByRole('textbox', { name: '검색어' });
      menuSearch.remove();
      fireEvent.keyDown(window, { key: 'Escape' });
      await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
      expect(document.activeElement).toBe(mobileSearch);
    } finally { mobileSearch.remove(); menuSearch.remove(); }
  });
});
