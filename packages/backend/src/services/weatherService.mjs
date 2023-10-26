import '../../bootstrap.mjs';
import axios from 'axios';

const API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = process.env.OPENWEATHER_API_KEY;

async function fetchWeatherForecast() {
	try {
		const response = await axios.get(API_ENDPOINT, {
			params: {
				lat: 52.5,
				lon: 5.75,
				appid: API_KEY,
				units: 'metric'
			}
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

export { fetchWeatherForecast };
