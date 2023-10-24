import axios from 'axios';

const TELEGRAM_API_ENDPOINT = '<YOUR_TOKEN>';

const API_ENDPOINT = 'https://api.telegram.org/bot';
const API_KEY = process.env.TELEGRAM_BOT_TOKEN;

async function sendTelegramNotification(chatId, message) {
  try {
    await axios.post(TELEGRAM_API_ENDPOINT + TELEGRAM_TOKEN + '/sendMessage', {
      chat_id: chatId,
      text: message
    });
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
  }
}

export { sendTelegramNotification };
