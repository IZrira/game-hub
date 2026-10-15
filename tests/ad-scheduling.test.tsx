import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import AdPlaceholder from '../common-hub/components/AdPlaceholder';

afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });

it('does not schedule work for an unconfigured ad', () => {
  vi.useFakeTimers();
  const frame = vi.fn();
  vi.stubGlobal('requestAnimationFrame', frame);
  render(<AdPlaceholder type="responsive" />);
  vi.advanceTimersByTime(1000);
  expect(frame).not.toHaveBeenCalled();
});

it('waits for resizing instead of spinning frames for a hidden slot and disconnects on unmount', () => {
  vi.useFakeTimers();
  let resize: () => void = () => {};
  const disconnect = vi.fn();
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: () => void) { resize = callback; }
    observe() {}
    disconnect = disconnect;
  });
  const frame = vi.fn((callback: FrameRequestCallback) => { callback(0); return 1; });
  const cancel = vi.fn();
  vi.stubGlobal('requestAnimationFrame', frame);
  vi.stubGlobal('cancelAnimationFrame', cancel);
  const view = render(<AdPlaceholder type="responsive" slot="123456" />);
  vi.advanceTimersByTime(1000);
  expect(frame).toHaveBeenCalledTimes(1);
  resize();
  expect(frame).toHaveBeenCalledTimes(2);
  view.unmount();
  expect(disconnect).toHaveBeenCalledOnce();
  expect(cancel).toHaveBeenCalled();
});
