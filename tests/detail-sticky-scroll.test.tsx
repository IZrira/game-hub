import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import DetailStickyNav from '../common-hub/components/DetailStickyNav';

afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('detail navigation scroll work', () => {
  it('keeps tracking dynamic positions without ResizeObserver support', () => {
    vi.stubGlobal('ResizeObserver', undefined);
    vi.stubGlobal('scrollY', 0);
    const view = render(<section id="legacy"/>);
    let top = 1000;
    vi.spyOn(document.getElementById('legacy')!, 'getBoundingClientRect').mockImplementation(() => ({top: top-window.scrollY} as DOMRect));
    view.rerender(<><section id="legacy"/><DetailStickyNav tabs={[{id:'first',label:'First'},{id:'legacy',label:'Legacy'}]}/></>);
    expect(screen.getByRole('button', {name:'First'}).className).toContain('text-black');
    top = 100;
    fireEvent.scroll(window);
    expect(screen.getByRole('button', {name:'Legacy'}).className).toContain('text-black');
  });

  it('uses cached section positions while scrolling and refreshes after layout changes', () => {
    let notifyResize: () => void = () => {};
    vi.stubGlobal('ResizeObserver', class {
      constructor(callback: () => void) { notifyResize = callback; }
      observe() {}
      disconnect() {}
    });
    vi.stubGlobal('scrollY', 0);
    const view = render(<><section id="one"/><section id="two"/></>);
    const firstTop = vi.fn(() => 0);
    let secondPosition = 1000;
    const secondTop = vi.fn(() => secondPosition);
    Object.defineProperty(document.getElementById('one'), 'offsetTop', { get: firstTop });
    Object.defineProperty(document.getElementById('two'), 'offsetTop', { get: secondTop });
    const firstRect = vi.spyOn(document.getElementById('one')!, 'getBoundingClientRect').mockImplementation(() => ({top: -window.scrollY} as DOMRect));
    const secondRect = vi.spyOn(document.getElementById('two')!, 'getBoundingClientRect').mockImplementation(() => ({top: secondPosition-window.scrollY} as DOMRect));
    view.rerender(<><section id="one"/><section id="two"/><DetailStickyNav tabs={[{id:'one',label:'One'},{id:'two',label:'Two'}]}/></>);
    firstTop.mockClear(); secondTop.mockClear();
    firstRect.mockClear(); secondRect.mockClear();
    vi.stubGlobal('scrollY', 900);
    for (let i = 0; i < 20; i++) fireEvent.scroll(window);
    expect(firstTop).not.toHaveBeenCalled();
    expect(secondTop).not.toHaveBeenCalled();
    expect(firstRect).not.toHaveBeenCalled();
    expect(secondRect).not.toHaveBeenCalled();
    expect(screen.getByRole('button', {name:'Two'}).className).toContain('text-black');
    secondPosition = 2000;
    act(() => notifyResize());
    expect(screen.getByRole('button', {name:'One'}).className).toContain('text-black');
  });
});
