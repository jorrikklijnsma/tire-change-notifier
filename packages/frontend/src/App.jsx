import React from 'react';
import WeatherDisplay from './components/WeatherDisplay.jsx';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Tire Change Notifier</h1>
      </header>
      <main>
        <WeatherDisplay />
      </main>
    </div>
  );
}

export default App;
