import express from 'express';
import { fetchWeatherForecast } from '../services/weatherService.mjs';

const weatherRouter = express.Router();

weatherRouter.get('/forecast', async (req, res) => {
  const location = req.query.location || 'Veenendaal';
  
  try {
    const data = await fetchWeatherForecast(location);
    res.json(data);
  } catch (error) {
    res.status(500).send('Failed to fetch weather data');
  }
});

export default weatherRouter;
