import axios from 'axios';
import { cache } from 'react';
import { notFound } from 'next/navigation';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

const getProducts = async lang => {
  try {
    const {
      data: { data },
    } = await instance.get(`/api/products?locale=${lang}`);
    if (data.length === 0) {
      return notFound();
    }
    return data;
  } catch (e) {
    if (e.data === undefined) {
      return notFound();
    }
  }
};

export const fetchProducts = cache(getProducts);

const getOneProduct = async (id, lang) => {
  try {
    const {
      data: { data },
    } = await instance.get(
      `/api/products?locale=${lang}&filters[uid][$eq]=${id}`
    );
    if (data.length === 0) {
      return notFound();
    }
    const [{ attributes: product }] = data;
    return product;
  } catch (e) {
    if (e.data === undefined) {
      return notFound();
    }
  }
};

export const fetchOneProduct = cache(getOneProduct);

export const getContacts = async lang => {
  try {
    const {
      data: { data },
    } = await instance.get(`/api/contacts?locale=${lang}`);
    if (data.length === 0) return notFound();

    const [{ attributes }] = data;

    return attributes;
  } catch (e) {
    if (e.data === undefined) {
      return notFound();
    }
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
    const {
      data: { data },
    } = await instance.get(`/api/reviews?locale=${lang}`);

    if (data.length === 0) return notFound();

    return data;
  } catch (e) {
    if (e.data === undefined) {
      return notFound();
    }
  }
};

export const fetchReviews = cache(getReviews);

const getMembers = async lang => {
  try {
    const { data } = await instance.get(`/api/members?locale=${lang}`);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const fetchMembers = cache(getMembers);
