import axios from 'axios';

const OPENWEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const TELEGRAM_API_ENDPOINT = 'https://api.telegram.org/bot';
const TELEGRAM_API_KEY = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export default async (req, res) => {
	try {
		const weatherData = await fetchWeatherForecast();
		const currentDecision = shouldChangeTires(weatherData);
		console.log('currentDecision', currentDecision);

		console.log('Fetching last pinned Telegram message');
		const lastPinnedMessage = await getLatestPinnedMessage();

		if (lastPinnedMessage) {
			console.log('lastBotMessage', lastPinnedMessage.message);
			console.log('alreadySentToday', lastPinnedMessage.alreadySentToday);

			// Unpin the previous message
			if (lastPinnedMessage) {
				await unpinTelegramMessage(lastPinnedMessage);
			}
		}

		if (currentDecision !== lastPinnedMessage?.message || !lastPinnedMessage?.alreadySentToday) {
			console.log('Sending Telegram notification');

			const noNotification = currentDecision === lastPinnedMessage?.message

			// Send the new message and pin it
			const messageId = await sendTelegramNotification(currentDecision, noNotification);
			if (messageId) {
				await pinTelegramMessage(messageId);
			}
		} else {
			console.log('No need to send Telegram notification');
		}

		const data = {
			weatherData,
			needToChangeTires: currentDecision
		};

		res.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).send('Internal Server Error');
	}
};

async function fetchWeatherForecast() {
	try {
		const response = await axios.get(OPENWEATHER_API_ENDPOINT, {
			params: {
				lat: 52.5,
				lon: 5.75,
				appid: OPENWEATHER_API_KEY,
				units: 'metric'
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

async function sendTelegramNotification(message, noNotification) {
	try {
		const response = await axios.post(`${TELEGRAM_API_ENDPOINT}${TELEGRAM_API_KEY}/sendMessage`, {
			chat_id: chatId,
			text: message,
			disable_notification: noNotification,
		});

		// Return the message_id from the response for further actions (like pinning)
		return response.data.result.message_id;
	} catch (error) {
		console.error('Error sending Telegram notification:', error);
		return null;
	}
}

async function getLatestPinnedMessage() {
	try {
		const response = await axios.get(`${TELEGRAM_API_ENDPOINT}${TELEGRAM_API_KEY}/getChat`, {
			params: {
				chat_id: chatId
			}
		});

		if (response.data.result.pinned_message) {
			const pinnedMassage = response.data.result.pinned_message

			const messageUnix = new Date(pinnedMassage.date * 1000).toISOString().slice(0, 10);
			const dateOfToday = new Date().toISOString().slice(0, 10);
			const messageText = pinnedMassage.text;

			console.log('message unix', messageUnix);
			console.log('message processed date', pinnedMassage.date);
			console.log('server date', dateOfToday);

			console.log('Fetching last Telegram message');
			return { message: messageText, alreadySentToday: dateOfToday === messageUnix };
		}
		return null;
	} catch (error) {
		console.error('Error fetching chat information:', error);
		return null;
	}
}

async function pinTelegramMessage(messageId) {
	try {
		await axios.post(`${TELEGRAM_API_ENDPOINT}${TELEGRAM_API_KEY}/pinChatMessage`, {
			chat_id: chatId,
			message_id: messageId,
			disable_notification: true // To avoid notifying all members about the pin
		});
	} catch (error) {
		console.error('Error pinning Telegram message:', error);
	}
}

async function unpinTelegramMessage(messageId) {
	try {
		await axios.post(`${TELEGRAM_API_ENDPOINT}${TELEGRAM_API_KEY}/unpinChatMessage`, {
			chat_id: chatId,
			message_id: messageId
		});
	} catch (error) {
		console.error('Error unpinning Telegram message:', error);
	}
}

function shouldChangeTires(weatherData) {
	const entireForecast = weatherData.list;
	const earlyMorningTemps = entireForecast
		.filter((data) => {
			const hour = new Date(data.dt_txt).getHours();
			return hour >= 3 && hour <= 9;
		})
		.map((data) => data.main.temp);

	const middayTemps = entireForecast
		.filter((data) => {
			const hour = new Date(data.dt_txt).getHours();
			return hour === 12;
		})
		.map((data) => data.main.temp);

	const totalTemperature = entireForecast.reduce((sum, data) => sum + data.main.temp, 0);
	const averageTemperature = totalTemperature / entireForecast.length;

	const totalMorningTemperature = earlyMorningTemps.reduce((sum, temp) => sum + temp, 0);
	const averageMorningTemperature = totalMorningTemperature / earlyMorningTemps.length;

	const countColdMornings = earlyMorningTemps.filter((temp) => temp <= 6).length;
	const countWarmMiddays = middayTemps.filter((temp) => temp >= 15).length;

	if (averageTemperature <= 7) {
		return 'The overall average temperature for the coming days is below 7°C. Consider switching to winter tires.';
	} else if (averageMorningTemperature <= 6 || countColdMornings > earlyMorningTemps.length / 2) {
		return 'The temperature during early mornings is often dropping below 6°C. Especially if you drive during these hours, consider switching to winter tires.';
	} else if (earlyMorningTemps.some((temp) => temp <= 7)) {
		return 'Some early mornings have temperatures close to or below 7°C. Stay alert and monitor the trend.';
	} else if (averageTemperature > 7) {
		return 'The overall average temperature is above 7°C. Consider switching to summer tires.';
	} else if (countWarmMiddays >= middayTemps.length / 2) {
		return 'The temperature during midday is consistently rising above 15°C. Consider switching to summer tires.';
	} else {
		return 'No need to switch tires yet.';
	}
}
