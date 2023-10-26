import axios from 'axios';

const OPENWEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const TELEGRAM_API_ENDPOINT = 'https://api.telegram.org/bot';
const TELEGRAM_API_KEY = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

export default async (req, res) => {
	// Assume you're using OpenWeatherMap API for this example
	try {
		const weatherData = await fetchWeatherForecast();
		const currentDecision = shouldChangeTires(weatherData);

		const lastBotMessage = await getLastBotMessage();

		if (currentDecision !== lastBotMessage.message || !lastBotMessage.alreadySentToday) {
			console.log('Sending Telegram notification');

			await sendTelegramNotification(currentDecision);
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

async function sendTelegramNotification(message) {
	try {
		await axios.post(`${TELEGRAM_API_ENDPOINT}${TELEGRAM_API_KEY}/sendMessage`, {
			chat_id: chatId,
			text: message
		});
	} catch (error) {
		console.error('Error sending Telegram notification:', error);
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