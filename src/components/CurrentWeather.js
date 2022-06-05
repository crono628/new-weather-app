import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grow, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import IconSelector from './IconSelector';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const CurrentWeather = ({ forecast, loading }) => {
  const [date, setDate] = useState('');
  const [today, setToday] = useState({});
  const { current, name } = forecast;

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
      sunrise: `${sunrise.getHours()}:${sunrise.getMinutes()}`,
      sunset: `${sunset.getHours()}:${sunset.getMinutes()}`,
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
