import { NextResponse } from 'next/server';

import { i18n } from '../locales/i18n.config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request) {
	const negotiatorHeaders = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	const locales = i18n.locales;
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	return matchLocale(languages, locales, i18n.defaultLocale);
}

// eslint-disable-next-line no-unused-vars
export function middleware(request) {}

export function withI18nMiddleware(middleware) {
	return async (request, event, response) => {
		// do i18n stuff
		const pathname = request.nextUrl.pathname;
		const search = request.nextUrl.search;

		const pathnameIsMissingLocale = i18n.locales.every(
			locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
		);

		// Redirect if there is no locale
		if (pathnameIsMissingLocale) {
			const locale = getLocale(request);

			return NextResponse.redirect(
				new URL(
					`/${locale}${pathname.startsWith('/') ? '' : '/'}${
						pathname + search
					}`,
					request.url
				)
			);
		}

		return middleware(request, event, response);
	};
}
