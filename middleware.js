import { NextResponse } from 'next/server';

import { i18n } from './i18n.config';

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
      // LOGOS
      '/icon.png',
      '/logo-small.png',
      '/logo.png',
      '/manifest.json',
      '/product.png',
      '/he.svg',
      '/gb.svg',
      //BGS
      '/hero-bg.jpg',
      '/about-background.jpg',
      '/crooked-line.png',
      '/reviews-background.jpg',
      //TEAM
      '/team-sam.jpg',
      '/team-simon.jpg',
      '/team-tamara.jpg',
      //PRODUCTS
      '/mdp.jpg',
      '/melamine.jpg',
      '/oak.jpg',
      '/pine.jpg',
      '/plywood.jpg',
      '/veneer.jpg',
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
