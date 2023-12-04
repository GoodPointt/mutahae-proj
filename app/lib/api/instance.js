import axios from 'axios';
import { cache } from 'react';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

const getProducts = async lang => {
  try {
    const { data } = await instance.get(`/api/products?locale=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchProducts = cache(getProducts);

const getOneProducts = async (id, lang) => {
  try {
    const { data } = await instance.get(
      `/api/products?locale=${lang}&filters[uid][$eq]=${id}`
    );
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchOneProduct = cache(getOneProducts);

export const getContacts = async lang => {
  try {
    const { data } = await instance.get(`/api/contacts?locale=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchContacts = cache(getContacts);

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

const getReviews = async lang => {
  try {
    const { data } = await instance.get(`/api/reviews?locale=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchReviews = cache(getReviews);
