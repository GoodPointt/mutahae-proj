import { getDictionary } from "@/app/lib/locales/dictionary";
import Contact from "@/app/ui/contact/Contact";

const ContactPage = async ({ params: { lang } }) => {
  const { page } = await getDictionary(lang);
  return (
    <div>
      <h1>{page.home.title}</h1>

      <Contact />
    </div>
  );
};

export default ContactPage;
