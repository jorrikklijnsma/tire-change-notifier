import '../../bootstrap.mjs';
import axios from 'axios';

const API_ENDPOINT = 'https://api.telegram.org/bot';
const API_KEY = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

async function getLastBotMessage() {
    const endpoint = `${API_ENDPOINT}${API_KEY}/getUpdates`;

    try {
        const response = await axios.get(endpoint,
            { params: { offset: -1 } }
            );
		const data = response.data.result;

        const messages = data.filter(update => update?.channel_post?.text && update?.channel_post?.chat?.id === parseInt(chatId)).map(update => update.channel_post.text);
        const latestMessage = JSON.parse(`"${messages[0]}"`);

        return latestMessage;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}


export { getLastBotMessage };
