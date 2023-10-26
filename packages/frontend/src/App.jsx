import React, { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay.jsx';
import LavaBackdrop from './components/LavaBackdrop.jsx';

function App() {
	const [forecast, setForecast] = useState([]);
	const [needToChangeTires, setNeedToChangeTires] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchWeather() {
			try {
				const response = await fetch('/api/forecast');
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
		<div className="bg-black">
			<LavaBackdrop />
			<div className="app flex flex-col items-center justify-between h-screen relative p-5">
				<div className="grid auto-cols-fr grid-cols-2 gap-2">
					<header className="backdrop-blur-md bg-opacity-20 bg-white rounded-xl p-6 shadow-lg">
						<h1 className="text-2xl text-white text-center">Tire Change Notifier</h1>
					</header>
					{!loading && !error && (
						<div className="flex flex-col items-center justify-center p-4 bg-white bg-opacity-20 rounded-xl backdrop-blur-md text-white shadow-lg">{needToChangeTires}</div>
					)}
				</div>

				{loading && <p>Loading...</p>}
				{error && <p>Error: {error}</p>}

				{!loading && !error && (
					<main className="grow-1">
						<WeatherDisplay forecast={forecast} />
					</main>
				)}
			</div>
		</div>
	);
}

export default App;
