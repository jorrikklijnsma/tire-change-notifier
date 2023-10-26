import React, { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay.jsx';

function App() {
	const [forecast, setForecast] = useState([]);
	const [needToChangeTires, setNeedToChangeTires] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchWeather() {
			try {
				const response = await fetch('/api/weather/forecast');
				const data = await response.json();
				setForecast(data.weatherData.list); // Assuming 'list' is the array of forecast data.
				setNeedToChangeTires(data.needToChangeTires);
			} catch (error) {
				console.error('Failed to fetch weather:', error);
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}

		fetchWeather();
	}, []);

	return (
		<div className="app flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
			<header className="backdrop-blur-md bg-opacity-40 bg-white rounded-xl p-6 shadow-lg">
				<h1 className="text-2xl text-white">Tire Change Notifier</h1>
			</header>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}

			{!loading && !error && (
				<>
          <div className="mt-6 p-4 bg-white bg-opacity-40 rounded-xl backdrop-blur-md text-white">
  {needToChangeTires}
</div>

					<main>
						<WeatherDisplay forecast={forecast} />
					</main>
				</>
			)}
		</div>
	);
}

export default App;
