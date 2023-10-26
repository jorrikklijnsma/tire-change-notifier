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
				const messageUnix = new Date(update.channel_post.date * 1000);
				const dateOfToday = new Date();
				const messageDate = `${messageUnix.getDate()}-${messageUnix.getMonth()}-${messageUnix.getFullYear()}`;
				const dateOfTodayFormatted = `${dateOfToday.getDate()}-${dateOfToday.getMonth()}-${dateOfToday.getFullYear()}`;
				const message = update.channel_post.text;
				return { message, alreadySentToday: dateOfTodayFormatted === messageDate };
			});

		const latestMessage = messages[0];

		return latestMessage;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

export { getLastBotMessage };
