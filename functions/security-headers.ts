// Pages _headers does not cover responses created by Functions. Keep these
// defaults aligned with the global public/_headers policy (checked in tests).
export const SECURITY_HEADERS: Readonly<Record<string, string>> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline' https://*.google.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://www.googletagmanager.com https://*.adtrafficquality.google https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://xwhtfrbrykedxgbdclyg.supabase.co https://*.supabase.co https://fonts.googleapis.com https://fonts.gstatic.com https://raw.githubusercontent.com https://cdn.jsdelivr.net https://*.google.com https://*.googlesyndication.com https://*.googleadservices.com https://*.doubleclick.net https://*.adtrafficquality.google https://cloudflareinsights.com https://*.cloudflareinsights.com; frame-src 'self' https://*.google.com https://*.googlesyndication.com https://*.doubleclick.net https://*.adtrafficquality.google https://*.googleadservices.com; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
};

export function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    // Preserve any route-specific policy; do not weaken downstream protections.
    if (!headers.has(name)) headers.set(name, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
