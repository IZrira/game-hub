import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';
import characterSummary from '../hsr-hub/data/generated/character-summary.json';

// Without Supabase the page uses bundled data; every character must still render
// (rated ones in their tier, the rest under 미편성) once loading finishes.
vi.mock('../common-hub/lib/supabase', () => ({ supabase: null }));
// The DOM test environment has no Web Animations, so canceled fades would surface
// as unhandled AbortErrors. Render motion elements as plain elements instead.
vi.mock('motion/react', async () => {
  const React = await import('react');
  const strip = ({ initial: _i, animate: _a, exit: _e, transition: _t, layout: _l, ...rest }: Record<string, unknown>) => rest;
  const motion = new Proxy({}, { get: (_target, tag: string) => (props: Record<string, unknown>) => React.createElement(tag, strip(props)) });
  return { motion, AnimatePresence: ({ children }: { children: React.ReactNode }) => children };
});

afterEach(cleanup);

it('renders every HSR character after loading instead of staying on the skeleton', async () => {
  const { default: TierList } = await import('../hsr-hub/pages/TierList');
  const { container } = render(
    <MemoryRouter initialEntries={['/gallery/hsr/tierlist']}>
      <Routes><Route path="/gallery/:gameId/tierlist" element={<TierList />} /></Routes>
    </MemoryRouter>
  );
  await waitFor(() => {
    expect(container.querySelectorAll('a[href^="/gallery/hsr/character/"]').length).toBe(characterSummary.length);
  }, { timeout: 5000 });
  expect(container.querySelectorAll('.animate-pulse').length).toBe(0);
});
