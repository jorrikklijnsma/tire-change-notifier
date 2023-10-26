import React from 'react';

function WeatherDisplay({ forecast }) {
    // Group weather data by day
    const groupedByDay = forecast.reduce((acc, curr) => {
        const date = curr.dt_txt.split(' ')[0];  // Extract just the day
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {});

    // Calculate average temperature for each day
    const averages = Object.keys(groupedByDay).map(date => {
        const temps = groupedByDay[date].map(item => item.main.temp);
        const avgTemp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
        return { date, avgTemp: avgTemp.toFixed(2) };
    });

    return (
        <div className="weather-display grid gap-4 mt-6">
            {averages.map((item, index) => (
                <div key={index} className="weather-item p-4 bg-white bg-opacity-40 rounded-xl backdrop-blur-md text-white flex justify-between items-center  shadow-lg">
                    <div>{item.date}</div>
                    <div>{item.avgTemp}°C</div>
                </div>
            ))}
        </div>
    );
}

export default WeatherDisplay;