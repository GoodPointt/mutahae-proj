import { fetchOneProduct } from '@/app/lib/api/instance';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';

const SingleProductPage = async ({ params: { id, lang } }) => {
  const { data } = await fetchOneProduct(id, lang);
  const { attributes } = data[0];

  return <SingleProduct product={attributes} />;
};

export default SingleProductPage;
