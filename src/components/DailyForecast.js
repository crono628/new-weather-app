import React, { useEffect, useState } from 'react';
import { Card, CardContent, Paper } from '@mui/material';
import { Box, Container } from '@mui/system';

const DailyForecast = ({ weather }) => {
  // let currentWeather = weather.map((item) => item.currentWeather);
  const [forecast] = weather;
  const { currentWeather } = forecast;

  return (
    <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
      <Box sx={{ padding: 4 }}>
        <Card>
          <CardContent>{Math.round(currentWeather.temp)}</CardContent>
          {/* {console.log(forecast)} */}
        </Card>
      </Box>
    </Paper>
  );
};

export default DailyForecast;
