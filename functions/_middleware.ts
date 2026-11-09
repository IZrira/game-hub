import { INDEXABLE_AND_APP_PATHS } from './generated-routes';
import { withSecurityHeaders } from './security-headers';

interface PagesFunctionContext {
  request: Request;
  next: () => Promise<Response>;
  env?: {
    ASSETS?: {
      fetch: (request: Request | string) => Promise<Response>;
    };
    [key: string]: any;
  };
}

// Legacy Aniimo Location 301 Permanent Redirects
// Keys are decoded canonical pathnames (no trailing slash)
const LEGACY_ANIIMO_REDIRECTS: Record<string, string> = {
  '/gallery/aniimo/location/스타폴-숲': '/gallery/aniimo/location/스테플-숲',
  '/gallery/aniimo/location/눈기슭-초원': '/gallery/aniimo/location/설산기슭-초원',
  '/gallery/aniimo/location/바다끝-구릉': '/gallery/aniimo/location/바다끝-구름',
  '/gallery/aniimo/location/초승달-만': '/gallery/aniimo/location/고래첨벙-해안',
  '/gallery/aniimo/location/석양-해원': '/gallery/aniimo/location/고래첨벙-해안',
  // HSR Trailblazer pages are published under the data file name, but older
  // links were built from the data id (see routeId in character-summary.json).
  '/gallery/hsr/character/trailblazer_fire': '/gallery/hsr/character/trailblazer_preservation',
  '/gallery/hsr/character/trailblazer_fire/guide': '/gallery/hsr/character/trailblazer_preservation/guide',
  '/gallery/hsr/character/trailblazer_physical': '/gallery/hsr/character/trailblazer_destruction',
  '/gallery/hsr/character/trailblazer_physical/guide': '/gallery/hsr/character/trailblazer_destruction/guide',
};

// Editorially withdrawn blog routes must not fall through to the SPA shell.
// A 410 response gives crawlers an explicit removal signal and prevents these
// old, unverified articles from being interpreted as duplicate home pages.
const WITHDRAWN_BLOG_PATHS = new Set([
  '/blog',
  '/blog/hsr-4-3-meta-analysis',
  '/blog/hsr-firefly-build-guide',
  '/blog/ww-shorekeeper-guide',
  '/blog/ww-jiyan-combat-guide',
  '/blog/hsr-acheron-analysis',
  '/blog/nte-starter-guide',
  '/blog/ww-changli-build-guide',
  '/blog/hsr-feixiao-fua-meta',
  '/blog/nte-party-building-synergy',
]);

function normalizePath(rawPathname: string): string {
  let decoded = rawPathname;
  try {
    decoded = decodeURI(rawPathname);
  } catch {
    decoded = rawPathname;
  }
  if (decoded.length > 1 && decoded.endsWith('/')) {
    decoded = decoded.replace(/\/+$/, '');
  }
  return decoded;
}

function isStaticAssetPath(pathname: string): boolean {
  return pathname.startsWith('/assets/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/manifest') ||
    pathname === '/robots.txt' ||
    pathname === '/favicon.ico' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/logo192.png' ||
    pathname === '/logo512.png' ||
    pathname.endsWith('.xml') ||
    pathname.endsWith('.txt') ||
    /\.[a-z0-9]{2,8}$/i.test(pathname);
}

function notFoundResponse(): Response {
  return new Response(
    '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>페이지를 찾을 수 없습니다 | RIRA ARCHIVE</title></head><body><main><h1>페이지를 찾을 수 없습니다</h1><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><p><a href="/">RIRA ARCHIVE 홈으로 이동</a></p></main></body></html>',
    {
      status: 404,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    }
  );
}

/**
 * Pages answers a request for a file it does not have with the SPA shell
 * (HTTP 200, text/html). For a hashed chunk from an earlier deploy that made
 * the browser or Google's renderer receive HTML as JavaScript, and the
 * `/assets/*.js` rule in _headers even marked it immutable. Report it as a
 * missing file instead.
 */
export function isShellServedForMissingFile(pathname: string, status: number, contentType: string | null): boolean {
  return status === 200 &&
    /\.[a-z0-9]{1,8}$/i.test(pathname) &&
    !/\.html?$/i.test(pathname) &&
    /\btext\/html\b/i.test(contentType || '');
}

function missingFileResponse(): Response {
  return new Response('Not found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

/** Return the clean canonical URL for legacy language-query requests. */
export function getLanguageCanonicalUrl(requestUrl: string): string | null {
  const url = new URL(requestUrl);
  if (!url.searchParams.has('lng')) return null;

  url.searchParams.delete('lng');
  url.searchParams.sort();
  url.protocol = 'https:';
  url.hostname = 'riragamehub.com';
  url.port = '';
  return url.toString();
}

const SUPPORTED_LANGUAGES = new Set(['ko', 'en', 'ja']);

/**
 * Legacy `?lng=` URLs were served with HTTP 200 and a canonical header, and Google
 * reported them as soft 404s. Redirect them to the clean URL instead, carrying a
 * non-default language choice in a preference cookie that the app reads on load.
 */
export function getLegacyLanguageRedirect(requestUrl: string): { location: string; cookie: string | null } | null {
  const url = new URL(requestUrl);
  if (!url.searchParams.has('lng')) return null;

  const language = url.searchParams.get('lng') || '';
  url.searchParams.delete('lng');
  url.searchParams.sort();
  const keepsLanguage = SUPPORTED_LANGUAGES.has(language) && language !== 'ko';
  return {
    location: `${url.pathname}${url.search}${url.hash}`,
    cookie: keepsLanguage ? `rira_lang=${language}; Path=/; Max-Age=31536000; SameSite=Lax; Secure` : null,
  };
}

function legacyLanguageRedirect(requestUrl: string): Response | null {
  const redirect = getLegacyLanguageRedirect(requestUrl);
  if (!redirect) return null;
  const headers = new Headers({ Location: redirect.location, 'Cache-Control': 'public, max-age=300' });
  if (redirect.cookie) headers.set('Set-Cookie', redirect.cookie);
  return new Response(null, { status: 301, headers });
}

// HTML and other unhashed files must be revalidated so a deploy is picked up at
// once. This used to be a global `/*` rule in public/_headers, but Pages merges
// matching rules, so hashed /assets JS and CSS were served with
// "no-cache, ..., immutable" and revalidated on every visit. Apply it here to
// static responses that are not already marked immutable instead.
function withRevalidation(response: Response): Response {
  const cacheControl = response.headers.get('Cache-Control') || '';
  if (/\bimmutable\b/i.test(cacheControl) || /(?:^|,)\s*(?:private|no-store|no-cache)\b/i.test(cacheControl)) return response;
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-cache, must-revalidate');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

const handleRequest = async (context: PagesFunctionContext): Promise<Response> => {
  const url = new URL(context.request.url);
  // Consolidate the former production domain while preserving each URL's path and query.
  if (url.hostname === 'rira-game-hub.pages.dev') {
    url.protocol = 'https:';
    url.hostname = 'riragamehub.com';
    url.port = '';
    return Response.redirect(url.toString(), 301);
  }
  const normalizedPath = normalizePath(url.pathname);

  if (!isStaticAssetPath(normalizedPath)) {
    const languageRedirect = legacyLanguageRedirect(url.toString());
    if (languageRedirect) return languageRedirect;
  }

  if (WITHDRAWN_BLOG_PATHS.has(normalizedPath)) {
    return new Response(
      '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>검수 종료된 공략 | RIRA ARCHIVE</title></head><body><main><h1>검수 종료된 공략</h1><p>이 콘텐츠는 편집 검수 기준에 따라 공개가 종료되었습니다.</p></main></body></html>',
      {
        status: 410,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=300',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }

  // 1. Single-hop legacy 301 redirects (handles both decoded & percent-encoded, with or without trailing slash)
  if (LEGACY_ANIIMO_REDIRECTS[normalizedPath]) {
    const destinationPath = LEGACY_ANIIMO_REDIRECTS[normalizedPath];
    const destinationUrl = new URL(encodeURI(destinationPath) + url.search + url.hash, url.origin);
    return Response.redirect(destinationUrl.toString(), 301);
  }

  // 2. Trailing Slash Normalization: /foo/ -> 301 -> /foo (except root '/')
  if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
    const cleanPath = url.pathname.replace(/\/+$/, '');
    const redirectUrl = new URL(cleanPath + url.search + url.hash, url.origin);
    return Response.redirect(redirectUrl.toString(), 301);
  }

  // Every public content route is generated alongside the sitemap. Reject an
  // unknown application path at the edge instead of serving the SPA shell with
  // HTTP 200, which search engines correctly classify as a soft 404.
  if (!isStaticAssetPath(normalizedPath) && !INDEXABLE_AND_APP_PATHS.has(normalizedPath)) {
    return notFoundResponse();
  }

  // 3. Forward request to downstream / static asset pipeline
  const response = await context.next();
  if (isShellServedForMissingFile(normalizedPath, response.status, response.headers.get('Content-Type'))) {
    return missingFileResponse();
  }

  // Replace inherited no-cache only for successful content-hashed assets.
  const immutableGuide = /^\/assets\/data\/(?:hsr|ww)\/guides\/[a-z0-9_-]+\.[a-f0-9]{12}\.json$/.test(normalizedPath);
  const immutableHsrCharacter = /^\/assets\/data\/hsr\/characters\/[a-z0-9_-]+\.[a-f0-9]{12}\.json$/.test(normalizedPath) ||
    /^\/assets\/data\/hsr\/lightcones\/[a-f0-9]{16}\.json$/.test(normalizedPath);
  const immutableArticle = /^\/assets\/data\/articles\/[a-z0-9_-]+\/[a-z0-9_-]+\.[a-f0-9]{12}\.json$/.test(normalizedPath);
  const immutableThumbnail = /^\/assets\/thumbnails\/ww\/[a-f0-9]{20}\.webp$/.test(normalizedPath);
  const expectedType = immutableGuide || immutableArticle || immutableHsrCharacter ? 'application/json' : immutableThumbnail ? 'image/webp' : undefined;
  const privateOrNoStore = /(?:^|,)\s*(?:private|no-store)\b/i.test(response.headers.get('Cache-Control') || '');
  if (expectedType && !privateOrNoStore && (response.status === 304 || (response.status === 200 && response.headers.get('Content-Type')?.includes(expectedType)))) {
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }

  // 4. Intercept Cloudflare Pages 308/301 directory index redirects to prevent redirect loop
  // When a static directory exists (e.g. dist/about/index.html), Cloudflare Pages asset server
  // defaults to redirecting /about to /about/ with 308. We intercept this and fetch the asset
  // directly so /about returns 200 OK without any redirect loop.
  if (response.status === 308 || response.status === 301) {
    const location = response.headers.get('Location') || response.headers.get('location');
    if (location && context.env?.ASSETS) {
      try {
        const locUrl = new URL(location, url.origin);
        const currClean = url.pathname.replace(/\/+$/, '');
        const locClean = locUrl.pathname.replace(/\/+$/, '');

        // If redirect is solely appending a trailing slash to the same pathname
        if (locClean === currClean && locUrl.pathname === currClean + '/' && url.pathname === currClean) {
          // Fetch the directory index asset directly via internal request with trailing slash
          const assetUrl = new URL(currClean + '/' + url.search, url.origin);
          const assetRes = await context.env.ASSETS.fetch(new Request(assetUrl.toString(), context.request));
          if (assetRes.status === 200) {
            return withRevalidation(assetRes);
          }

          // Fallback: try fetching .html file directly
          const htmlUrl = new URL(currClean + '.html' + url.search, url.origin);
          const htmlRes = await context.env.ASSETS.fetch(new Request(htmlUrl.toString(), context.request));
          if (htmlRes.status === 200) {
            return withRevalidation(htmlRes);
          }
        }
      } catch {
        // In case of any URL parsing issues, fall through to returning original response
      }
    }
  }

  return withRevalidation(response);
};

export const onRequest = async (context: PagesFunctionContext): Promise<Response> =>
  withSecurityHeaders(await handleRequest(context));
