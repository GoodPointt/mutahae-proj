import { Grid } from '@chakra-ui/react';
import Contact from '@/app/ui/contact/Contact';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import ProductItem from '@/app/ui/productItem/ProductItem';
import { Suspense } from 'react';
import SkeletonProductsGrid from '@/app/ui/skeletons/SkeletonProducts';
// import { fetchProducts } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '@/app/lib/api/instance';
import CatalogDesc from '@/app/ui/catalogDesc/CatalogDesc';

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
  // const products = await fetchProducts(lang);
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
        <SectionWrapper
          heading={navItems[1].title}
          bg={'linear-gradient(to right, #434343 0%, black 100%)'}
        >
          <CatalogDesc dictionary={dictionary} />
          <Grid
            as={'ul'}
            maxW={'100%'}
            gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
            gridGap={10}
            m={'0 auto'}
            padding={0}
          >
            {products?.length > 0 &&
              products.map(({ attributes }) => {
                return (
                  <ProductItem
                    key={attributes.uid}
                    product={attributes}
                    lang={lang}
                  />
                );
              })}
          </Grid>
        </SectionWrapper>
      </Suspense>
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </>
  );
};

export default CatalogPage;
