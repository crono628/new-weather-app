import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grow, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import IconSelector from './IconSelector';
import { hourDisplay, minutesDisplay } from './helpers/helpers';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const CurrentWeather = ({ forecast, loading }) => {
  const [date, setDate] = useState('');
  const [today, setToday] = useState({});
  const { current, daily, name, timezoneOffset } = forecast;

  useEffect(() => {
    let todaysDate = new Date(current.dt * 1000);
    let sunrise = new Date(current.sunrise * 1000);
    let sunset = new Date(current.sunset * 1000);
    setDate(
      `${
        todaysDate.getMonth() + 1
      }/${todaysDate.getDate()}/${todaysDate.getFullYear()}`
    );
    setToday({
      sunrise: `${hourDisplay(sunrise, timezoneOffset)}:${minutesDisplay(
        sunrise
      )}`,
      sunset: `${hourDisplay(sunset, timezoneOffset)}:${minutesDisplay(
        sunset
      )}`,
    });
  }, [forecast]);

  return (
    <Grow easing="" in={!loading} timeout={1100}>
      <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
        <Box sx={{ p: 3 }}>
          <Card sx={centerStyles}>
            <CardContent>
              <Typography variant="body1">{date}</Typography>
              <Typography variant="h5">{name}</Typography>
              <Typography sx={{ ml: 3 }} variant="h2">
                {Math.round(current.temp)}°
              </Typography>
              <Typography variant="body1">
                High: {Math.round(daily[0].temp.max)}° Low:{' '}
                {Math.round(daily[0].temp.min)}°
              </Typography>
              <Typography variant="h5">
                {current.weather[0].description}
              </Typography>
              <IconSelector code={current.weather[0].id} />
              <Typography variant="body1">Sunrise: {today.sunrise}</Typography>
              <Typography>Sunset: {today.sunset}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Grow>
  );
};

export default CurrentWeather;
