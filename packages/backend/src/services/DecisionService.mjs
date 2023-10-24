function shouldChangeTires(weatherData) {
  const nextSevenDays = weatherData.list.slice(0, 7);
  const totalTemperature = nextSevenDays.reduce((sum, day) => sum + day.main.temp, 0);
  const averageTemperature = totalTemperature / nextSevenDays.length;

  if (averageTemperature < 7) {
    return 'Switch to winter tires';
  } else if (averageTemperature > 7) {
    return 'Switch to summer tires';
  } else {
    return 'No need to switch tires yet';
  }
}

export { shouldChangeTires };
