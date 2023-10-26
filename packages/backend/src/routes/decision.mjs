import express from 'express';
import { shouldChangeTires } from '../services/DecisionService.mjs';

const decisionRouter = express.Router();

decisionRouter.get('/checkTireCondition', async (req, res) => {
	try {
		const data = await shouldChangeTires(weatherData);
		res.json(data);
	} catch (error) {
		res.status(500).send('Failed to fetch weather data');
	}
});

export default decisionRouter;
