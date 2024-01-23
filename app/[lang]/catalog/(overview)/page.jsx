import Contact from '@/app/ui/contact/Contact';
import { Suspense } from 'react';
import SkeletonProductsGrid from '@/app/ui/skeletons/SkeletonProducts';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '@/app/lib/api/instance';
import ProductsGrid from '@/app/ui/productsGrid/ProductsGrid';

export const metadata = {
  title: 'Catalog',
  alternates: {
    canonical: '/catalog',
    languages: {
      en: '/en/catalog',
      he: '/he/catalog',
    },
  },
};

const CatalogPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const {
    header: { navItems },
  } = dictionary;

  // eslint-disable-next-line no-undef
  const [products, contacts] = await Promise.all([
    fetchProducts(lang),
    fetchContacts(lang),
  ]);

  return (
    <>
      <Suspense fallback={<SkeletonProductsGrid />}>
        <ProductsGrid
          products={products}
          lang={lang}
          heading={navItems[1].title}
        />
      </Suspense>
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </>
  );
};

export default CatalogPage;
