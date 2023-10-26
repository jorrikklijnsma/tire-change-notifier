function shouldChangeTires(weatherData) {
	const entireForecast = weatherData.list;
	const earlyMorningTemps = entireForecast
		.filter((data) => {
			const hour = new Date(data.dt_txt).getHours();
			return hour >= 3 && hour <= 9;
		})
		.map((data) => data.main.temp);

	const middayTemps = entireForecast
		.filter((data) => {
			const hour = new Date(data.dt_txt).getHours();
			return hour === 12;
		})
		.map((data) => data.main.temp);

	const totalTemperature = entireForecast.reduce((sum, data) => sum + data.main.temp, 0);
	const averageTemperature = totalTemperature / entireForecast.length;

	const totalMorningTemperature = earlyMorningTemps.reduce((sum, temp) => sum + temp, 0);
	const averageMorningTemperature = totalMorningTemperature / earlyMorningTemps.length;

	const countColdMornings = earlyMorningTemps.filter((temp) => temp <= 6).length;
	const countWarmMiddays = middayTemps.filter((temp) => temp >= 15).length;

	if (averageTemperature <= 7) {
		return 'The overall average temperature for the coming days is below 7°C. Consider switching to winter tires.';
	} else if (averageMorningTemperature <= 6 || countColdMornings > earlyMorningTemps.length / 2) {
		return 'The temperature during early mornings is often dropping below 6°C. Especially if you drive during these hours, consider switching to winter tires.';
	} else if (earlyMorningTemps.some((temp) => temp <= 7)) {
		return 'Some early mornings have temperatures close to or below 7°C. Stay alert and monitor the trend.';
	} else if (averageTemperature > 7) {
		return 'The overall average temperature is above 7°C. Consider switching to summer tires.';
	} else if (countWarmMiddays >= middayTemps.length / 2) {
		return 'The temperature during midday is consistently rising above 15°C. Consider switching to summer tires.';
	} else {
		return 'No need to switch tires yet.';
	}
}

export { shouldChangeTires };
