import {
  fetchContacts,
  fetchOneProduct,
  // fetchProducts,
} from '@/app/lib/api/instance';

import Contact from '@/app/ui/contact/Contact';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';
import { Suspense } from 'react';
import LoadingProduct from './loading';
import { getDictionary } from '@/app/lib/locales/dictionary';
import DeliveryInfo from '@/app/ui/deliveryInfo/DeliveryInfo';

//Prefetching first six items of collection to generate pages on server before visiting:

// export const generateStaticParams = async ({ params: { lang } }) => {
//   const products = await fetchProducts(lang);
//   if (products.length > 0) {
//     const productsIds = products.map(product => product.attributes.uid);
//     return productsIds.slice(0, 6);
//   }
// };

export const generateMetadata = async ({ params: { id, lang } }) => {
  const product = await fetchOneProduct(id, lang);

  return {
    title: product.title,
    alternates: {
      canonical: `/catalog/${id}`,
      languages: {
        en: `/en/catalog/${id}`,
        he: `/he/catalog/${id}`,
      },
    },
    description: product.descShort,
    openGraph: {
      images: [
        {
          url: product.imgUrl,
        },
      ],
    },
  };
};

const SingleProductPage = async ({ params: { id, lang } }) => {
  const dictionary = await getDictionary(lang);

  // eslint-disable-next-line no-undef
  const [product, contacts] = await Promise.all([
    fetchOneProduct(id, lang),
    fetchContacts(lang),
  ]);

  return (
    <>
      <Suspense fallback={<LoadingProduct dictionary={dictionary} />}>
        <SingleProduct
          product={product}
          dictionary={dictionary}
          contacts={contacts}
        />
      </Suspense>
      <DeliveryInfo dictionary={dictionary} />
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </>
  );
};

export default SingleProductPage;
