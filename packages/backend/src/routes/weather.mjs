import express from 'express';
import { fetchWeatherForecast } from '../services/weatherService.mjs';
import { shouldChangeTires } from '../services/DecisionService.mjs';

const weatherRouter = express.Router();

weatherRouter.get('/forecast', async (req, res) => {
  const location = req.query.location || 'Veenendaal';

  try {
    const weatherData = await fetchWeatherForecast(location);
    const needToChangeTires = shouldChangeTires(weatherData);

    const data = {
      weatherData,
      needToChangeTires
    };

    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default weatherRouter;
