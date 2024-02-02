import { chain } from './app/lib/middlewares/chain';
import { withAuthMiddleware } from './app/lib/middlewares/middleware1';
import { withI18nMiddleware } from './app/lib/middlewares/middleware2';

export default chain([withAuthMiddleware, withI18nMiddleware]);

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|img|favicon.ico|logo.png|sw.js).*)',
	],
};
