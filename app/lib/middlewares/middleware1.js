import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { i18n } from '../locales/i18n.config';

const protectedPaths = ['/profile'];

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

export function withAuthMiddleware(middleware) {
	return async (request, event) => {
		const response = NextResponse.next();

		const token = cookies().get('jwt')?.value;

		const pathname = request.nextUrl.pathname;

		const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
			...i18n.locales,
		]);

		if (!token && protectedPathsWithLocale.includes(pathname)) {
			const signInUrl = new URL('/auth/login', request.url);

			return NextResponse.redirect(signInUrl);
		}

		if (pathname.includes('/auth') && token) {
			return NextResponse.redirect(new URL('/', request.url));
		}

		return middleware(request, event, response);
	};
}
