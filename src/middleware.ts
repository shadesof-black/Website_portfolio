import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  // Content Security Policy (CSP)
  // Allows loading fonts from Google, images from Unsplash, and Spline embeds safely
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://*.spline.design;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://images.unsplash.com https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://img.icons8.com;
    font-src 'self' data:;
    connect-src 'self' blob: data: https://prod.spline.design https://*.spline.design https://unpkg.com;
    frame-src 'self' https://*.spline.design;
    worker-src 'self' blob:;
    child-src 'self' blob:;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self' mailto:;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt, sitemap.xml (SEO files)
     * - image formats (.svg, .png, .jpg, .jpeg, .gif, .webp, .ico)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
