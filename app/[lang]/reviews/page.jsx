import Contact from '@/app/ui/contact/Contact';
import Reviews from '@/app/ui/reviews/Reviews';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const metadata = {
  title: 'Reviews',
};

const ReviewsPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Reviews lang={lang} dictionary={dictionary} />
      <Contact lang={lang} dictionary={dictionary} />
    </>
  );
};

export default ReviewsPage;
