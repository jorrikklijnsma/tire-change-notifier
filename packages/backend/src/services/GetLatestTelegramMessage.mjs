import '../../bootstrap.mjs';
import axios from 'axios';

const API_ENDPOINT = 'https://api.telegram.org/bot';
const API_KEY = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

async function getLastBotMessage() {
	const endpoint = `${API_ENDPOINT}${API_KEY}/getUpdates`;

	try {
		const response = await axios.get(endpoint, { params: { offset: -1 } });
		const data = response.data.result;

		const messages = data
			.filter((update) => update?.channel_post?.text && update?.channel_post?.chat?.id === parseInt(chatId))
			.map((update) => {
				const messageUnix = new Date(update.channel_post.date * 1000).toISOString().slice(0, 10);
				const dateOfToday = new Date().toISOString().slice(0, 10);
				const message = update.channel_post.text;

				console.log('message unix', messageUnix);
				console.log('message processed date', update.channel_post.date);
				console.log('server date', dateOfToday);

				return { message: message, alreadySentToday: dateOfToday === messageUnix };
			});

		const latestMessage = messages[0];
		console.log('Fetching last Telegram message');

		return latestMessage;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

export { getLastBotMessage };
