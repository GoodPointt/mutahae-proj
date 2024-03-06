import { Suspense } from 'react';

import Blog from '@/app/ui/blog/Blog';
import Contact from '@/app/ui/contact/Contact';
import SkeletonBlog from '@/app/ui/skeletons/SkeletonBlog';

import { fetchContacts, fetchPosts } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const metadata = {
	title: 'Blog',
	alternates: {
		canonical: '/blog',
		languages: {
			en: '/en/blog',
			he: '/he/blog',
		},
	},
};

const BlogPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);
	// eslint-disable-next-line no-undef
	const [contacts, posts] = await Promise.all([
		fetchContacts(lang),
		fetchPosts(lang),
	]);

	return (
		<>
			<Suspense fallback={<SkeletonBlog lang={lang} />}>
				<Blog lang={lang} dictionary={dictionary} posts={posts} />
				<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
			</Suspense>
		</>
	);
};

export default BlogPage;
