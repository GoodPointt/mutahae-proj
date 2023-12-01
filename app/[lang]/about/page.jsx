import { getDictionary } from "@/app/lib/locales/dictionary";
import About from "@/app/ui/about/About";
import Contact from "@/app/ui/contact/Contact";
import Features from "@/app/ui/features/Features";
import Team from "@/app/ui/team/Team";

const AboutPage = async ({ params: { lang } }) => {
  const {
    aboutUs: { main, features, team },
  } = await getDictionary(lang);
  return (
    <div>
      <About dictionary={main} />
      <Features dictionary={features} />
      <Team dictionary={team} />
      <Contact dictionary={lang} />
    </div>
  );
};

export default AboutPage;
