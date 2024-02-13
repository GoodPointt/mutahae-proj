import { cache } from 'react';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

const getProducts = async (
	lang,
	sortBy = 'createdAt',
	sortOrder = 'desc',
	page = 1
) => {
	try {
		const {
			data: { data, meta },
		} = await instance.get(
			`api/goods?locale=${lang}&populate=img&sort[0]=${sortBy}:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=9`
		);
		if (data.length === 0) {
			return { data: [], total: 0 };
		}

		return { data, total: meta.pagination.total };
	} catch (e) {
		if (e.data === undefined) {
			return [];
		}
	}
};

export const fetchProducts = cache(getProducts);

const getProductsByCategorie = async (
	lang,
	sortBy,
	sortOrder,
	page = 1,
	uid
) => {
	try {
		const {
			data: { data, meta },
		} = await instance.get(
			`api/goods?locale=${lang}&populate=deep&filters[categories][uid][$eq]=${uid}&sort[0]=${sortBy}:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=9`
		);
		if (data.length === 0) {
			return notFound();
		}

		return { data, total: meta.pagination.total };
	} catch (e) {
		if (e.data === undefined) {
			return console.error('not category');
		}
	}
};

export const fetchgetProductsByCategorie = cache(getProductsByCategorie);

const getProductBySubCategorie = async (
	lang,
	page,
	sortBy,
	sortOrder,
	category,
	sub_category
) => {
	try {
		const {
			data: { data, meta },
		} = await instance.get(
			`api/goods?locale=${lang}&populate=deep&filters[0][categories][uid][$eq]=${category}&filters[1][sub_categories][uid][$eq]=${sub_category}&sort[0]=${sortBy}:${sortOrder}&pagination[page]=${page}&pagination[pageSize]=9`
		);

		if (data.length === 0) {
			return notFound();
		}

		return { data, total: meta.pagination.total };
	} catch (e) {
		if (e.data === undefined) {
			return console.error('not sub_category');
		}
	}
	revalidatePath(`/${lang}/catalog`);
};

export const fetchProductBySubCategorie = cache(getProductBySubCategorie);

const getOneProduct = async (id, lang) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/goods?locale=${lang}&populate[0]=img&populate[1]=localizations&filters[uid][$eq]=${id}`
		);

		if (data.length === 0) {
			return notFound();
		}

		return data[0];
	} catch (e) {
		if (e.data === undefined) {
			return notFound();
		}
	}
};

export const fetchOneProduct = cache(getOneProduct);

const getListCategoriesAndSubCategories = async lang => {
	try {
		const {
			data: { data },
		} = await instance.get(`/api/categories?populate=deep,3&locale=${lang}`);

		if (data.length === 0) {
			return;
		}

		return data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(error.status);
			console.error(error.response);
		} else {
			console.error(error);
		}
	}
};

export const fetchListCategoriesAndSubCategories = cache(
	getListCategoriesAndSubCategories
);

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

const getCities = async () => {
	try {
		const response = await instance.get(
			`/api/cities?populate[0]=zone&populate[1]=localizations&sort[0]=cityName:asc`
		);

		if (!response) return;

		const arrCities = response.data.data;

		if (arrCities.length === 0) return;

		return arrCities;
	} catch (e) {
		console.error(e);
	}
};

export const fetchCities = cache(getCities);

const getProductsByQuery = async (value, lang) => {
	try {
		const {
			data: { data },
		} = await instance.get(
			`/api/goods?locale=${lang}&filters[$or][0][title][$containsi]=${value}&filters[$or][1][wood][$containsi]=${value}&filters[$or][2][sub_categories][title][$containsi]=${value}&populate[0]=img&populate[1]=sub_categories&populate[2]=categories&sort[0]=title:asc`
		);

		if (data.length === 0) {
			return [];
		}

		return data;
	} catch (e) {
		console.error(e);
	}
};

export const fetchProductsByQuery = cache(getProductsByQuery);
