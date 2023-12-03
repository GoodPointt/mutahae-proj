import Contact from '@/app/ui/contact/Contact';
import Reviews from '@/app/ui/reviews/Reviews';
import { getDictionary } from '@/app/lib/locales/dictionary';

const ReviewsPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Reviews />
      <Contact lang={lang} dictionary={dictionary} />
    </>
  );
};

export default ReviewsPage;
