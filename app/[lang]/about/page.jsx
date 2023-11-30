import About from "@/app/ui/about/About";
import Contact from "@/app/ui/contact/Contact";
import Features from "@/app/ui/features/Features";
import Team from "@/app/ui/team/Team";

const AboutPage = ({ params: { lang } }) => {
  return (
    <div>
      <About lang={lang} />
      <Features lang={lang} />
      <Team lang={lang} />
      <Contact lang={lang} />
    </div>
  );
};

export default AboutPage;
