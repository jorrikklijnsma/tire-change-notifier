import React from 'react';
import { FixedSizeList as List } from 'react-window';

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

    const Row = ({ index, style }) => (
        <div style={style} className="weather-item p-4 bg-white bg-opacity-40 rounded-xl backdrop-blur-md text-white flex justify-between items-center">
            <div>{averages[index].date}</div>
            <div>{averages[index].avgTemp}°C</div>
        </div>
    );

    return (
        <div className="weather-display mt-6">
            <List
                height={400}  // Adjust height as required
                itemCount={averages.length}
                itemSize={60}  // Adjust item size based on your design
                width={400}  // Adjust width as required
            >
                {Row}
            </List>
        </div>
    );
}

export default WeatherDisplay;