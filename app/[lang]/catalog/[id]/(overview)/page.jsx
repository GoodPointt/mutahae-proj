import {
  fetchContacts,
  fetchOneProduct,
  fetchProducts,
} from '@/app/lib/api/instance';

import Contact from '@/app/ui/contact/Contact';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';
import { Suspense } from 'react';
import LoadingProduct from './loading';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const generateStaticParams = async ({ params: { lang } }) => {
  const products = await fetchProducts(lang);
  if (products.length > 0) {
    const productsIds = products.map(product => product.attributes.uid);
    return productsIds.slice(0, 6);
  }
};

export const generateMetadata = async ({ params: { id, lang } }) => {
  const product = await fetchOneProduct(id, lang);

  return {
    title: product.title,
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
  const {
    data: [{ attributes: contacts }],
  } = await fetchContacts(lang);
  const dictionary = await getDictionary(lang);

  const product = await fetchOneProduct(id, lang);

  return (
    <>
      <Suspense fallback={<LoadingProduct />}>
        <SingleProduct
          product={product}
          dictionary={dictionary}
          contacts={contacts}
        />
      </Suspense>
      <Contact lang={lang} dictionary={dictionary} />
    </>
  );
};

export default SingleProductPage;
