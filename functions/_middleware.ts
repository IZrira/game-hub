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
};

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

export const onRequest = async (context: PagesFunctionContext): Promise<Response> => {
  const url = new URL(context.request.url);
  const normalizedPath = normalizePath(url.pathname);

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

  // 3. Forward request to downstream / static asset pipeline
  const response = await context.next();

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
            return assetRes;
          }

          // Fallback: try fetching .html file directly
          const htmlUrl = new URL(currClean + '.html' + url.search, url.origin);
          const htmlRes = await context.env.ASSETS.fetch(new Request(htmlUrl.toString(), context.request));
          if (htmlRes.status === 200) {
            return htmlRes;
          }
        }
      } catch {
        // In case of any URL parsing issues, fall through to returning original response
      }
    }
  }

  return response;
};
