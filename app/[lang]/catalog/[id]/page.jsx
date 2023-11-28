import { getDictionary } from '@/app/lib/locales/dictionary';
import React from 'react';

const SingleProductPage = async ({ params: { id, lang } }) => {
  const { page } = await getDictionary(lang);
  // const product = await fetchProduct(id);
  return (
    <div>
      <h1>{page.home.title}</h1>
      SingleProductPgae
    </div>
  );
};

export default SingleProductPage;
