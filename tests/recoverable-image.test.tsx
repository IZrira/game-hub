import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import RecoverableImage from '../common-hub/components/RecoverableImage';
import ItemIcon from '../common-hub/components/ItemIcon';
vi.mock('react-i18next', () => ({ useTranslation: () => ({ t: (value: string) => value, i18n: { language: 'ko' } }) }));
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
const source = 'https://cdn.jsdelivr.net/gh/IZrira/riragameinfo@main/ww%20images/items/test.webp';
it('keeps WW material identity and count rather than substituting currency', () => {
  render(<ItemIcon name="고주파수 취합 성핵" gameId="ww" count={12} />);
  fireEvent.error(screen.getByAltText('고주파수 취합 성핵'));
  expect(screen.getByAltText('고주파수 취합 성핵').getAttribute('src')).toContain('fastly.jsdelivr.net');
  expect(screen.getByText('12')).toBeTruthy();
});
it('retries the same asset and stops at a local neutral placeholder', () => {
  render(<RecoverableImage src={source} alt="material" />);
  const img = () => screen.getByAltText('material');
  fireEvent.error(img());
  expect(img().getAttribute('src')).toBe(source.replace('cdn.jsdelivr.net', 'fastly.jsdelivr.net'));
  fireEvent.error(img());
  expect(img().getAttribute('src')).toContain('raw.githubusercontent.com/IZrira/riragameinfo/main/ww%20images/items/test.webp');
  fireEvent.error(img());
  expect(img().getAttribute('src')).toBe('/assets/unknown.webp');
  fireEvent.error(img());
  expect(img().getAttribute('src')).toBe('/assets/unknown.webp');
});
it('recovers stalled visible images, cancels the timer on success and unmount', () => {
  vi.useFakeTimers();
  const view = render(<RecoverableImage src={source} alt="material" loading="eager" />);
  act(() => vi.advanceTimersByTime(8000));
  expect(screen.getByAltText('material').getAttribute('src')).toContain('fastly.jsdelivr.net');
  fireEvent.load(screen.getByAltText('material'));
  act(() => vi.advanceTimersByTime(24000));
  expect(screen.getByAltText('material').getAttribute('src')).toContain('fastly.jsdelivr.net');
  view.unmount();
  expect(vi.getTimerCount()).toBe(0);
});
it('observes the replacement lazy image after a failure before viewport entry', () => {
  vi.useFakeTimers();
  const observed: Element[] = [];
  let enter!: IntersectionObserverCallback;
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback: IntersectionObserverCallback) { enter = callback; }
    observe(element: Element) { observed.push(element); }
    disconnect() {}
  });
  render(<RecoverableImage src={source} alt="material" loading="lazy" />);
  fireEvent.error(screen.getByAltText('material'));
  expect(observed.at(-1)).toBe(screen.getByAltText('material'));
  act(() => vi.advanceTimersByTime(8000));
  expect(screen.getByAltText('material').getAttribute('src')).toContain('fastly.jsdelivr.net');
  act(() => enter([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
  act(() => vi.advanceTimersByTime(8000));
  expect(screen.getByAltText('material').getAttribute('src')).toContain('raw.githubusercontent.com');
});
it('resets attempts on a new source and does not block surrounding interaction', () => {
  let clicks = 0;
  const { rerender } = render(<button onClick={() => clicks++}><RecoverableImage src={source} alt="material" /></button>);
  fireEvent.error(screen.getByAltText('material'));
  fireEvent.click(screen.getByRole('button'));
  expect(clicks).toBe(1);
  rerender(<RecoverableImage src={source + '?v=next'} alt="material" />);
  expect(screen.getByAltText('material').getAttribute('src')).toBe(source + '?v=next');
});
