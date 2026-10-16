import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

vi.mock('../common-hub/context/AuthContext', () => ({
  useAuth: () => ({ user: { id: 'reporter-a' }, openLoginModal: vi.fn() }),
}));
vi.mock('../common-hub/lib/admin', () => ({ isAdmin: () => false }));
vi.mock('../common-hub/components/CommentForm', () => ({ default: () => null }));
vi.mock('../common-hub/components/CommentCard', () => ({
  default: ({ review }: { review: { report_count: number; user_has_reported: boolean } }) =>
    <div>reports:{review.report_count};mine:{String(review.user_has_reported)}</div>,
}));
vi.mock('../common-hub/lib/supabase', () => ({
  supabase: {
    from: (table: string) => {
      const query = {
        select: () => query,
        eq: () => query,
        order: async () => ({ data: [{ id: 'review-1', report_count: 4, created_at: '2026-01-01' }] }),
        in: async () => ({ data: table === 'comment_reports'
          ? [{ comment_id: 'review-1', user_id: 'reporter-a' }] : [] }),
      };
      return query;
    },
  },
}));
import { CharacterReviewBoard } from '../common-hub/components/CharacterReviewBoard';
afterEach(cleanup);

it('keeps the server aggregate when RLS returns only the current reporter row', async () => {
  render(<CharacterReviewBoard gameId="test" characterId="test" />);
  expect(await screen.findByText('reports:4;mine:true')).toBeTruthy();
});
