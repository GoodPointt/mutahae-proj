import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

export const fetchProducts = async lang => {
  try {
    const { data } = await instance.get(`/api/products?locale=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchOneProduct = async (id, lang) => {
  try {
    const { data } = await instance.get(
      `/api/products?locale=${lang}&filters[uid][$eq]=${id}`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const createContact = async credentials => {
  try {
    const { data } = await instance.post(`/api/customers/`, {
      data: { ...credentials },
    });
    return data;
  } catch (e) {
    console.error(e);
  }
};
