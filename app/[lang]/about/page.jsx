import { fetchContacts } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';
import About from '@/app/ui/about/About';
import Contact from '@/app/ui/contact/Contact';
import Features from '@/app/ui/features/Features';
import Team from '@/app/ui/team/Team';

const AboutPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const {
    data: [{ attributes: contacts }],
  } = await fetchContacts(lang);
  
  return (
    <div>
      <About dictionary={dictionary} contacts={contacts} />
      <Features dictionary={dictionary.aboutUs.features} />
      <Team dictionary={dictionary.aboutUs.team} />
      <Contact dictionary={dictionary} />
    </div>
  );
};

export default AboutPage;
