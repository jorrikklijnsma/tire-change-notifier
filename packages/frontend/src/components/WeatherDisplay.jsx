import React from 'react';

function WeatherDisplay({ forecast }) {
  console.log('WeatherDisplay forecast:', forecast);
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
