import React, { useState } from 'react';
import axios from 'axios';

interface WeatherSearchProps {
  setWeatherData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ setWeatherData, setLoading, setError }) => {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    if (!location) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://api.weatherstack.com/current`, {
        params: {
          access_key: '42e2613ad160a9b6a66a406e19cae99f',
          query: location,
        },
      });

      if (response.data.error) {
        setError("City not found. Please enter another city.");
        setWeatherData(null);
      } else {
        setWeatherData(response.data);
      }
    } catch (error) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-search">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="input-field"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>
  );
};

export default WeatherSearch;
