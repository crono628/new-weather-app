import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import DailyForecast from './components/DailyForecast';
import { db } from './firebase';
import { CircularProgress } from '@mui/material';

const App = () => {
  const [weather, setWeather] = useState();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);

  const getWeather = async (input) => {
    setLoading(true);
    const GEOCODE_ZIPCODE = `http://api.openweathermap.org/geo/1.0/zip?zip=${input}&appid=53dcc962829731a4fa033950e8997254`;

    try {
      const geoCall = await (await fetch(GEOCODE_ZIPCODE)).json();
      const { lat, lon } = geoCall;
      const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;
      let weatherCall = await (await fetch(WEATHER_API)).json();
      setWeather([
        {
          currentWeather: weatherCall.current,
          dailyWeather: [...weatherCall.daily],
          hourlyWeather: [...weatherCall.hourly],
          timezoneOffset: weatherCall.timezone_offset,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(search);
  };

  return (
    <Container maxWidth="md">
      <Nav
        onChange={(e) => setSearch(e.target.value)}
        onZipSubmit={handleSubmit}
      />
      {loading && <LoadingCircle />}
      {loading === false && <DailyForecast weather={weather} />}
    </Container>
  );
};

function LoadingCircle() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default App;
