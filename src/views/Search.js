import { useState } from 'react';
import axios from 'axios';
import Error from '../components/Error';
import Weather from '../components/Weather';

function Search() {
  const myAPI = 'REPLACE WITH YOUR OWN API KEY!!!!!!!!!!!!!!!';
  const [weather, setWeather] = useState('');
  const [temperature, setTemperature] = useState('');
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  function handleSearchQuery(e) {
    e.preventDefault();
    setQuery(e.target.value);
    setWeather("");
    setError("");
  }

  async function searchWeather(e) {
    e.preventDefault();
    var response;

    try {
      response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
        params: {
          mode: "json",
          q: query,
          appid: myAPI
        }
      });
      setTemperature(response.data.main.feels_like);
      setWeather(response.data.weather[0].description);
    } catch (error) {
      if (error.response.status === 404) {
        setError(`Weather data for ${query.toUpperCase()} could not be found!`);
      } else {
        setError("The weather data could not be retrieved. Please try again later and make sure you are connected to the internet  and your API key is valid!");
      }
    }
  }

  if (weather) {
    return (
      <div>
        <input value={query} name="query" onChange={handleSearchQuery} />
        <button onClick={searchWeather}> Search</button>
        <br />
        <Weather weather={weather} temp={temperature} />
      </div>
    );
  } else if (error) {
    return (
      <div>
        <input value={query} name="query" onChange={handleSearchQuery} />
        <button onClick={searchWeather}> Search</button>
        <Error error={error} />
      </div>
    );
  } else {
    return (
      <div>
        <input value={query} name="query" onChange={handleSearchQuery} />
        <button onClick={searchWeather}> Search</button>
      </div>
    );
  }
}

export default Search;
