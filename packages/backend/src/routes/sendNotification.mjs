import express from 'express';
import { sendTelegramNotification } from '../services/SendTelegramNotificationService.mjs';

const notificationRouter = express.Router();

notificationRouter.get('/sendNotification', async (req, res) => {
	try {
		const data = await sendTelegramNotification();
		res.json(data);
	} catch (error) {
		res.status(500).send('Failed to fetch weather data');
	}
});

export default notificationRouter;
