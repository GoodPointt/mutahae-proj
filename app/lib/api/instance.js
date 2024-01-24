import { cache } from 'react';
import { notFound } from 'next/navigation';

import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

const getHero = async lang => {
	try {
		const {
			data: {
				data: { attributes },
			},
		} = await instance.get(`/api/hero?locale=${lang}`);

		return attributes;
	} catch (e) {
		if (!e.data || e.data === undefined) {
			return notFound();
		}
	}
};

export const fetchHero = cache(getHero);

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

const getPosts = async lang => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/posts?locale=${lang}`);

		if (data.length === 0) return notFound();

		return data;
	} catch (e) {
		if (e.data === undefined) {
			return notFound();
		}
	}
};

export const fetchPosts = cache(getPosts);

const getMembers = async lang => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/members?locale=${lang}`);
		if (data.length === 0) return notFound();

		return data;
	} catch (e) {
		if (e.data === undefined) {
			return notFound();
		}
	}
};

export const fetchMembers = cache(getMembers);
