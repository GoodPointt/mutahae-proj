export default function robots() {
	return {
		rules: [
			{
				userAgent: '*',
				// allow: '/',
				disallow: '/',
				// 	[
				// 	'/en/auth',
				// 	'/en/auth/login',
				// 	'/en/auth/register',
				// 	'/en/auth/recovery',
				// 	'/en/auth/google',
				// 	'/en/auth/facebook',
				// 	'/en/expired',
				// 	'/en/profile',
				// 	'/en/profile/favorites',
				// 	'/en/profile/history-of-ordres',
				// 	'/en/order',
				// 	'/he/auth',
				// 	'/he/auth/login',
				// 	'/he/auth/register',
				// 	'/he/auth/recovery',
				// 	'/he/auth/google',
				// 	'/he/auth/facebook',
				// 	'/he/expired',
				// 	'/he/profile',
				// 	'/he/profile/favorites',
				// 	'/he/profile/history-of-ordres',
				// 	'/he/order',
				// ],
			},
		],
		// sitemap: `${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
	};
}
