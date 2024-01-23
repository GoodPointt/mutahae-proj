import { NextResponse } from 'next/server';

import { i18n } from './app/lib/locales/i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  if (
    [
      //SEO
      '/sitemap.xml',
      '/robots.txt',
      '/opengraph-image.png',
      // LOGOS
      '/logo-small.png',
      '/logo.png',
      '/manifest.json',
      '/he.svg',
      '/gb.svg',
      '/favicon.ico',
      '/apple-touch-icon.png',
      '/favicon-32x32.png',
      '/favicon-16x16.png',
      '/safari-pinned-tab.svg',
      //BGS
      '/hero-bg.jpg',
      '/about-background.jpg',
      '/crooked-line.png',
      '/reviews-background.jpg',
      //TEAM
      '/member.png',
      '/team-sam.jpg',
      '/team-simon.jpg',
      '/team-tamara.jpg',
      //PRODUCTS
      '/product.png',
      '/blur-product.jpg',
      //Reviews
      '/customerPlaceholder.jpg',
    ].includes(pathname)
  )
    return;

  const pathnameIsMissingLocale = i18n.locales.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
};
