// @vitest-environment-options {"settings":{"disableCSSFileLoading":true,"disableJavaScriptFileLoading":true,"handleDisabledFileLoadingAsSuccess":true}}
import React, { StrictMode } from 'react';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Link, MemoryRouter, useLocation } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';
import { capturePrerenderSeoHead } from '../common-hub/utils/prerenderSeoHead';

vi.mock('react-i18next', () => ({ useTranslation: () => ({ i18n: { language: 'ko' } }) }));
afterEach(() => cleanup());

it('hands initial metadata to React once, preserving security and resources across SPA and noindex transitions', async () => {
  document.head.innerHTML = `
    <meta charset="UTF-8"><meta name="viewport" content="width=device-width">
    <meta name="google-site-verification" content="test-ownership">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
    <link rel="preload" as="style" href="/fonts.css"><script async src="/ads-loader.js"></script>
    <title>정적 파티 제목</title><meta name="description" content="정적 설명">
    <meta name="robots" content="index, follow"><meta property="og:url" content="https://riragamehub.com/gallery/nte/parties">
    <link rel="canonical" href="https://riragamehub.com/gallery/nte/parties">
    <script type="application/ld+json">{"name":"정적 구조화 데이터"}</script>`;
  // Import after static head exists, exactly as a direct production entry loads the SEO module.
  const { default: SEO } = await import('../common-hub/components/SEO');
  const payload = '</script><img data-payload="bad">\u2028\u2029';
  function RouteMetadata({ ready }: { ready: boolean }) {
    const location = useLocation();
    return <>
      <Link to="/about?lng=en&b=2&a=1">소개</Link>
      <Link to="/admin">관리자</Link>
      <Link to="/gallery/hsr?lng=ko">스타레일</Link>
      {ready && <SEO title={`앱 ${location.pathname}`} noindex={location.pathname === '/admin'}
        faqData={[{ question: '질문', answer: payload }]} />}
    </>;
  }
  const view = (ready: boolean) => <StrictMode><MemoryRouter initialEntries={['/gallery/nte/parties?lng=en']}>
    <RouteMetadata ready={ready} />
  </MemoryRouter></StrictMode>;
  const page = render(view(false));
  expect(document.title).toBe('정적 파티 제목');
  expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
  page.rerender(view(true));
  await waitFor(() => expect(document.title).toBe('앱 /gallery/nte/parties | RIRA ARCHIVE'));

  const assertHead = (canonical: string | null, noindex = false) => {
    expect(document.head.querySelectorAll('title')).toHaveLength(1);
    const canonicals = document.head.querySelectorAll('link[rel="canonical"]');
    expect(canonicals).toHaveLength(canonical ? 1 : 0);
    if (canonical) expect(canonicals[0].getAttribute('href')).toBe(canonical);
    expect(document.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content'))
      .toContain(noindex ? 'noindex' : 'index, follow');
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(noindex ? 0 : 1);
    expect(document.head.querySelectorAll('meta[property="og:url"]')).toHaveLength(noindex ? 0 : 1);
    expect(document.head.querySelector('meta[name="google-site-verification"]')?.getAttribute('content')).toBe('test-ownership');
    expect(document.head.querySelectorAll('meta[http-equiv="Content-Security-Policy"]')).toHaveLength(1);
    expect(document.head.querySelectorAll('meta[charset], meta[name="viewport"], link[rel="preload"], script[src="/ads-loader.js"]')).toHaveLength(4);
  };
  assertHead('https://riragamehub.com/gallery/nte/parties');
  expect(document.head.textContent).not.toContain('정적 구조화 데이터');
  const json = [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map(script => script.textContent || '').find(text => text.includes('FAQPage'))!;
  expect(json).not.toContain('</script>');
  expect(JSON.parse(json)[1].mainEntity[0].acceptedAnswer.text).toBe(payload);
  expect(document.querySelector('[data-payload]')).toBeNull();

  fireEvent.click(screen.getByRole('link', { name: '소개' }));
  await waitFor(() => expect(document.title).toBe('앱 /about | RIRA ARCHIVE'));
  assertHead('https://riragamehub.com/about?a=1&b=2');
  fireEvent.click(screen.getByRole('link', { name: '관리자' }));
  await waitFor(() => expect(document.title).toBe('앱 /admin | RIRA ARCHIVE'));
  assertHead(null, true);
  fireEvent.click(screen.getByRole('link', { name: '스타레일' }));
  await waitFor(() => expect(document.title).toBe('앱 /gallery/hsr | RIRA ARCHIVE'));
  assertHead('https://riragamehub.com/gallery/hsr');
  await act(async () => page.unmount());
  expect(document.head.querySelectorAll('meta[name="google-site-verification"]')).toHaveLength(1);
});

it('only removes captured static page metadata, never later metadata or resource/security tags', () => {
  const head = document.createElement('head');
  head.innerHTML = `<title>정적</title><link rel="canonical" href="/old"><meta property="og:title" content="old">
    <meta name="twitter:title" content="old"><meta property="article:modified_time" content="2026-10-16">
    <meta name="robots" content="noindex"><meta name="google-site-verification" content="keep">
    <meta http-equiv="Content-Security-Policy" content="keep"><link rel="stylesheet" href="/keep.css">
    <script src="/keep.js"></script><script type="application/ld+json">{}</script>`;
  const release = capturePrerenderSeoHead(head);
  const liveTitle = document.createElement('title');
  liveTitle.textContent = '앱';
  head.append(liveTitle);
  release();
  release();
  expect(head.querySelectorAll('title')).toHaveLength(1);
  expect(head.querySelector('title')).toBe(liveTitle);
  expect(head.querySelectorAll('link[rel="canonical"], meta[property^="og:"], meta[property^="article:"], meta[name^="twitter:"], meta[name="robots"], script[type="application/ld+json"]')).toHaveLength(0);
  expect(head.querySelectorAll('meta[name="google-site-verification"], meta[http-equiv], link[rel="stylesheet"], script[src]')).toHaveLength(4);
});
