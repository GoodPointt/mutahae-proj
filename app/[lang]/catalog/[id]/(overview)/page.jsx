import { fetchOneProduct } from '@/app/lib/api/instance';
import Contact from '@/app/ui/contact/Contact';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';
import { Suspense } from 'react';
import LoadingProduct from './loading';

const SingleProductPage = async ({ params: { id, lang } }) => {
  const { data } = await fetchOneProduct(id, lang);
  const { attributes } = data[0];

  return (
    <>
      <Suspense fallback={<LoadingProduct />}>
        <SingleProduct product={attributes} />
      </Suspense>
      <Contact />
    </>
  );
};

export default SingleProductPage;