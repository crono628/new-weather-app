import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grow, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import IconSelector from './IconSelector';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const DailyForecast = ({ forecast, loading }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    let theDate = new Date(forecast.dt * 1000);
    setDate(
      `${theDate.getMonth() + 1}/${theDate.getDate()}/${theDate.getFullYear()}`
    );
  }, []);

  return (
    <Grow easing="" in={!loading} timeout={1100}>
      <Paper elevation={3} sx={{ backgroundColor: '#91cbf9', mt: 3 }}>
        <Box sx={{ p: 3 }}>
          <Card sx={centerStyles}>
            <CardContent>
              <Typography variant="body1">{date}</Typography>
              <Typography variant="body1">
                High: {Math.round(forecast.temp.max)}° Low:{' '}
                {Math.round(forecast.temp.min)}°
              </Typography>
              <Typography variant="body1">
                {forecast.weather[0].description}
              </Typography>
            </CardContent>
            <CardContent>
              <IconSelector code={forecast.weather[0].id} />
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Grow>
  );
};

export default DailyForecast;
