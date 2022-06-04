import React, { useEffect } from 'react';
import { Paper } from '@mui/material';

const Weather = ({ location }) => {
  const { lat, lon, name } = location;
  const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=53dcc962829731a4fa033950e8997254`;
  useEffect(() => {
    getMoreWeather(lat, lon);
  });
  const getMoreWeather = async (lat, lon) => {
    try {
      let apiCall = await (await fetch(WEATHER_API)).json();
      console.log(apiCall);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
      {lat}
      {lon}
      {name}
    </Paper>
  );
};

export default Weather;
