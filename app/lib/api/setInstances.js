import axios from 'axios';

export const profileInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
