import React, { useState, useEffect } from 'react';

function WeatherDisplay() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      console.log('Fetching weather...');

      try {
        const response = await fetch('/api/weather/forecast');
        const data = await response.json();
        setForecast(data.list);  // Assuming 'list' is the array of forecast data.
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="weather-display">
      {forecast.map((item, index) => (
        <div key={index} className="weather-item">
          <div>{item.dt_txt}</div>  {/* Displaying date-time for simplicity. */}
          <div>{item.main.temp}°C</div>
        </div>
      ))}
    </div>
  );
}

export default WeatherDisplay;
