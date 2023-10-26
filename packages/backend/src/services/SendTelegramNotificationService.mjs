import '../../bootstrap.mjs';
import axios from 'axios';

const API_ENDPOINT = 'https://api.telegram.org/bot';
const API_KEY = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

async function sendTelegramNotification(message) {
  try {
    await axios.post(`${API_ENDPOINT}${API_KEY}/sendMessage`, {
      chat_id: chatId,
      text: message
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

export { sendTelegramNotification };
