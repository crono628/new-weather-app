import { Container } from '@mui/system';
import React, { useRef } from 'react';
import Nav from './components/Nav';
import Weather from './components/Weather';

const App = () => {
  const zipRef = useRef();

  const getWeather = async (lat, lon) => {
    try {
      const weather = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid={f5636b705a5ab5ba228670eab9d9b8da}`
      );
      console.log(weather);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Nav zipRef={zipRef} />
      <Weather />
    </Container>
  );
};

export default App;
