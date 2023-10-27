import express from 'express';
import { fetchWeatherForecast } from '../services/weatherService.mjs';
import { shouldChangeTires } from '../services/DecisionService.mjs';
import { getLastBotMessage } from '../services/GetLatestTelegramMessage.mjs';
import { sendTelegramNotification } from '../services/SendTelegramNotificationService.mjs';

const weatherRouter = express.Router();

weatherRouter.get('/forecast', async (req, res) => {
	try {
		const weatherData = await fetchWeatherForecast();
		const currentDecision = shouldChangeTires(weatherData);

		const lastBotMessage = await getLastBotMessage();

		// if (currentDecision !== lastBotMessage.message || !lastBotMessage.alreadySentToday) {
		// console.log('Sending Telegram notification');

		// await sendTelegramNotification(currentDecision);
		// } else {
		// console.log('No need to send Telegram notification');
		// }

		const data = {
			weatherData,
			needToChangeTires: currentDecision
		};

		res.json(data);
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).send('Internal Server Error');
	}
});

export default weatherRouter;
