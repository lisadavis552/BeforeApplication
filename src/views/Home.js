import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Weather from '../components/Weather';

function Home() {
  const myAPI = process.env.REACT_APP_WEATHER_API_KEY;
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [error, setError] = useState('');
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [city, setCity] = useState('');

  const getCoords = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
          const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
              mode: 'json',
              lat: latitude,
              lon: longitude,
              appid: myAPI,
              units: 'metric',
            },
          });

          setTemperature(response.data.main.feels_like);
          setWeather(response.data.weather[0].description);
          setCity(response.data.name);
          setError('');
        } catch (err) {
          if (err.response?.status === 404) {
            setError(`Weather data for ${latitude}, ${longitude} could not be found!`);
          } else {
            setError('Could not retrieve weather data. Check your internet connection and API key.');
          }
        }
      },
      () => {
        setError('User denied geolocation access.');
      }
    );
  }, [myAPI]); // Ensures getCoords is recreated only if myAPI changes

  useEffect(() => {
    getCoords();
  }, [getCoords]); // Now it's correctly listed as a dependency

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div>
      {weather ? (
        <>
          <h2>You are currently in {city}</h2>
          <h3>Latitude: {latitude} | Longitude: {longitude}</h3>
          <Weather weather={weather} temp={temperature} />
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
}

export default Home;