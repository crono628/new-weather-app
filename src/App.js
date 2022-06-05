import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import CurrentWeather from './components/CurrentWeather';
import { db } from './firebase';
import { CircularProgress } from '@mui/material';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);

  const getWeather = async (input) => {
    setLoading(true);
    const GEOCODE_ZIPCODE = `https://api.openweathermap.org/geo/1.0/zip?zip=${input}&appid=53dcc962829731a4fa033950e8997254`;

    try {
      let geoResponse = await fetch(GEOCODE_ZIPCODE);
      if (geoResponse.ok) {
        let geoCode = await geoResponse.json();
        let { lat, lon, name, zip } = geoCode;
        let WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;
        let weatherResponse = await fetch(WEATHER_API);
        let weatherCall = await weatherResponse.json();
        console.log(weatherCall);
        setWeather({
          name: name,
          zipcode: zip,
          current: weatherCall.current,
          daily: [...weatherCall.daily],
          hourly: [...weatherCall.hourly],
          timezoneOffset: weatherCall.timezone_offset,
        });
      }
      console.log('called');
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1400);
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
        loading={loading}
        town="fart"
      />
      {loading && <LoadingCircle />}
      {loading === false && (
        <CurrentWeather forecast={weather} loading={loading} />
      )}
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
