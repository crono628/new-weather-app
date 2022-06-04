import { Container } from '@mui/system';
import React, { useState } from 'react';
import Nav from './components/Nav';
import Weather from './components/Weather';
import { db } from './firebase';

const App = () => {
  const [location, setLocation] = useState(null);
  const [zip, setZip] = useState('');

  const getWeather = async (zipcode) => {
    const GEOCODE_ZIPCODE = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=53dcc962829731a4fa033950e8997254`;
    // const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;
    try {
      // let apiCall = await (await fetch(WEATHER_API)).json();
      let apiCall = await (await fetch(GEOCODE_ZIPCODE)).json();
      setLocation(apiCall);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(zip);
  };

  return (
    <Container maxWidth="md">
      <Nav
        onChange={(e) => setZip(e.target.value)}
        onZipSubmit={handleSubmit}
      />
      {location && <Weather location={location} />}
    </Container>
  );
};

export default App;
