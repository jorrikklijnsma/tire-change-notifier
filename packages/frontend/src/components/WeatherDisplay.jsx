import React from 'react';

function WeatherDisplay({ forecast }) {
	console.log('WeatherDisplay forecast:', forecast);
	return (
		<div className="weather-display">
			{forecast.map((item, index) => (
					<div key={index} className="weather-item mt-4 p-4 bg-white bg-opacity-40 rounded-xl backdrop-blur-md">
					<div>{item.dt_txt}</div> {/* Displaying date-time for simplicity. */}
					<div>{item.main.temp}°C</div>
				</div>
			))}
		</div>
	);
}

export default WeatherDisplay;
