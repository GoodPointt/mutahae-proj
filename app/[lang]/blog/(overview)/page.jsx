import Contact from '@/app/ui/contact/Contact';
import Blog from '@/app/ui/blog/Blog';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchPosts } from '@/app/lib/api/instance';
import { Suspense } from 'react';
import SkeletonBlog from '@/app/ui/skeletons/SkeletonBlog';

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
      <Suspense fallback={<SkeletonBlog />}>
        <Blog lang={lang} dictionary={dictionary} posts={posts} />
      </Suspense>
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </>
  );
};

export default BlogPage;
