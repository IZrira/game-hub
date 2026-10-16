import React, { StrictMode } from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'ko' } }) }));
afterEach(() => cleanup());

it('keeps a direct restricted entry noindex through the static-to-React handoff', async () => {
  document.head.innerHTML = `<title>제한된 페이지</title><meta name="robots" content="noindex, nofollow">
    <meta name="google-site-verification" content="test-ownership"><meta http-equiv="Content-Security-Policy" content="default-src 'self'">`;
  const { default: SEO } = await import('../common-hub/components/SEO');
  render(<StrictMode><MemoryRouter initialEntries={['/admin']}><SEO title="관리자" noindex /></MemoryRouter></StrictMode>);
  await waitFor(() => expect(document.title).toBe('관리자 | RIRA ARCHIVE'));
  expect(document.head.querySelectorAll('title')).toHaveLength(1);
  expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
  expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex, nofollow');
  expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(0);
  expect(document.head.querySelectorAll('meta[name="google-site-verification"], meta[http-equiv="Content-Security-Policy"]')).toHaveLength(2);
});
