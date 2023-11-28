import Contact from '@/app/ui/contact/Contact';
import Reviews from '@/app/ui/reviews/Reviews';
import { getDictionary } from '@/app/lib/locales/dictionary';

const ReviewsPage = async ({ params: { lang } }) => {
  const { page } = await getDictionary(lang);

  return (
    <div>
      <h1>{page.home.title}</h1>

      <Reviews />
      <Contact />
    </div>
  );
};

export default ReviewsPage;
