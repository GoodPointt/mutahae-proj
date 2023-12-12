import Contact from '@/app/ui/contact/Contact';
import Reviews from '@/app/ui/reviews/Reviews';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchReviews } from '@/app/lib/api/instance';

export const metadata = {
  title: 'Reviews',
};

const ReviewsPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  // eslint-disable-next-line no-undef
  const [contacts, reviews] = await Promise.all([
    fetchContacts(lang),
    fetchReviews(lang),
  ]);

  return (
    <>
      <Reviews lang={lang} dictionary={dictionary} reviews={reviews} />
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </>
  );
};

export default ReviewsPage;
