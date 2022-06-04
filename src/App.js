import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import DailyForecast from './components/DailyForecast';
import { db } from './firebase';
import { CircularProgress } from '@mui/material';

const App = () => {
  const [geocode, setGeocode] = useState(null);
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);

  useEffect(() => {}, [weather]);

  const getGeocodeInfo = async (input) => {
    const GEOCODE_ZIPCODE = `http://api.openweathermap.org/geo/1.0/zip?zip=${input}&appid=53dcc962829731a4fa033950e8997254`;
    try {
      let apiCall = await (await fetch(GEOCODE_ZIPCODE)).json();
      setGeocode(apiCall);
    } catch (error) {
      console.log(error);
    } finally {
      getComprehensiveWeather();
      console.log(weather);
    }
  };

  const getComprehensiveWeather = async () => {
    setLoading(true);
    if (geocode) {
      const { lat, lon } = geocode;
      const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;
      try {
        let apiCall = await (await fetch(WEATHER_API)).json();
        // console.log(apiCall);
        setWeather([
          {
            currentWeather: [apiCall.current],
            dailyWeather: [...apiCall.daily],
            hourlyWeather: [...apiCall.hourly],
            timezoneOffset: apiCall.timezone_offset,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getGeocodeInfo(search);
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
