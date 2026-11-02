import fs from 'node:fs';
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import PrivacyPolicy from '../common-hub/pages/PrivacyPolicy';

afterEach(() => {
  cleanup();
  delete (window as any).googlefc;
});

it('drops the self-made banner that treated continued browsing as consent', () => {
  expect(fs.existsSync('common-hub/components/CookieBanner.tsx')).toBe(false);
  expect(fs.readFileSync('common-hub/components/Layout.tsx', 'utf8')).not.toContain('CookieBanner');
});

it('reopens the Google consent message from the privacy policy', () => {
  render(<HelmetProvider><MemoryRouter><PrivacyPolicy /></MemoryRouter></HelmetProvider>);
  fireEvent.click(screen.getByRole('button', { name: /광고 동의 설정 변경/ }));

  const googlefc = (window as any).googlefc;
  expect(googlefc.callbackQueue).toHaveLength(1);
  googlefc.showRevocationMessage = vi.fn();
  googlefc.callbackQueue[0]();
  expect(googlefc.showRevocationMessage).toHaveBeenCalledOnce();
});

it('discloses login, comments, analytics and processors in the app and the prerendered policy', () => {
  for (const file of ['common-hub/pages/PrivacyPolicy.tsx', 'scripts/prerender-meta.js']) {
    const source = fs.readFileSync(file, 'utf8');
    for (const phrase of ['Google 또는 Discord로 로그인', '첨부 이미지', 'Cloudflare Web Analytics', 'Supabase', '동의 관리 플랫폼(CMP)', '작성자가 직접 삭제']) {
      expect(source, `${file}: ${phrase}`).toContain(phrase);
    }
  }
});
