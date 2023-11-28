import About from '@/app/ui/about/About';
import Contact from '@/app/ui/contact/Contact';
import Features from '@/app/ui/features/Features';
import Team from '@/app/ui/team/Team';
import { getDictionary } from '@/app/lib/locales/dictionary';

const AboutPage = async ({ params: { lang } }) => {
  const { page } = await getDictionary(lang);
  return (
    <div>
      <h1>{page.home.title}</h1>
      <About />
      <Features />
      <Team />
      <Contact />
    </div>
  );
};

export default AboutPage;
