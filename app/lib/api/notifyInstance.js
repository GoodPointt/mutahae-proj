import axios from 'axios';

export const notifyInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BOT_URL,
});

export const sendTgNotification = async message => {
	try {
		return await notifyInstance.post(`/notify`, message);
	} catch (e) {
		console.error('sendTgNotification', e);
	}
};
