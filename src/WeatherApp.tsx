import React, { useState, useEffect } from 'react';
import WeatherSearch from './WeatherSearch';
import './WeatherApp.css';

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [background, setBackground] = useState<string>('start-bg'); 

  useEffect(() => {
    if (weatherData) {
      const weatherDescription = weatherData.current.weather_descriptions[0].toLowerCase();

      if (weatherDescription.includes('sunny')) {
        setBackground('sunny-bg');
      } else if (weatherDescription.includes('rain')) {
        setBackground('rainy-bg');
      } else if (weatherDescription.includes('cloud')) {
        setBackground('cloudy-bg');
      } else if (weatherDescription.includes('snow')) {
        setBackground('snowy-bg');
      } else {
        setBackground('start-bg');
      }
    }
  }, [weatherData]);

  return (
    <div className={`weather-app-container ${background}`}>
      <h1>Weather Forecast</h1>
      <WeatherSearch setWeatherData={setWeatherData} setLoading={setLoading} setError={setError} />

      {loading && <div className="loader"></div>}
      {error && <p className="error">{error}</p>}
      {!loading && !weatherData && !error && <p>Please search for a city.</p>}

      {weatherData && !loading && !error && (
        <div className="weather-result">
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>{weatherData.current.weather_descriptions[0]}</p>
          <img src={weatherData.current.weather_icons[0]} alt="weather icon" />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
