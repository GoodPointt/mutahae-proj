import { Grid } from '@chakra-ui/react';
import Contact from '@/app/ui/contact/Contact';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import ProductItem from '@/app/ui/productItem/ProductItem';
import { products } from '@/app/lib/data';
import { getDictionary } from '@/app/lib/locales/dictionary';

const CatalogPage = async ({ params: { lang } }) => {
  const { page } = await getDictionary(lang);
  // const products = await fetchProducts(lang);
  // console.log(
  //   `https://strapi-admin-panel.onrender.com/api/cases?locale=${lang}`
  // );

  return (
    <SectionWrapper isHeading>
      <Grid
        as={'ul'}
        maxW={'100%'}
        gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
        gridGap={10}
        m={'0 auto'}
        padding={0}
      >
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </Grid>
      <Contact />
    </SectionWrapper>
  );
};

export default CatalogPage;
