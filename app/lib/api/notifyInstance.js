import axios from 'axios';

export const notifyInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BOT_URL,
});

export const sendTgNotification = async message => {
	try {
		const { data } = await notifyInstance.post(`/notify`, message);

		return data;
	} catch (e) {
		console.error(e);
	}
};
