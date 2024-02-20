import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { i18n } from '../locales/i18n.config';

const protectedPaths = ['/profile', '/profile/favorites'];

function getProtectedRoutes(protectedPaths, locales) {
	let protectedPathsWithLocale = [...protectedPaths];

	protectedPaths.forEach(route => {
		locales.forEach(
			locale =>
				(protectedPathsWithLocale = [
					...protectedPathsWithLocale,
					`/${locale}${route}`,
				])
		);
	});

	return protectedPathsWithLocale;
}

export const getLocaleFromPathname = pathname => {
	if (pathname.startsWith('/he')) {
		return pathname.substring(0, 3);
	} else if (pathname.startsWith('/en')) {
		return pathname.substring(0, 3);
	} else {
		return null;
	}
};

export function withAuthMiddleware(middleware) {
	return async (request, event) => {
		const response = NextResponse.next();

		const token = cookies().get('jwt')?.value;

		const pathname = request.nextUrl.pathname;
		const localeFromPath = getLocaleFromPathname(pathname);

		const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
			...i18n.locales,
		]);

		const search = request.nextUrl.search;
		if (token && search.includes('?expired=true')) {
			response.cookies.delete('jwt');
			response.cookies.delete('userId');

			return response;
		}

		if (!token && protectedPathsWithLocale.includes(pathname)) {
			const signInUrl = new URL(`${localeFromPath}/auth/login`, request.url);

			return NextResponse.redirect(signInUrl);
		}

		if (pathname.includes('/auth') && token) {
			return NextResponse.redirect(new URL(`${localeFromPath}/`, request.url));
		}

		return middleware(request, event, response);
	};
}
