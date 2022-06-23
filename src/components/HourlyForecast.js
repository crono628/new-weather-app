import React, { useState } from 'react';
import { Card, CardContent, Fade, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import IconSelector from './IconSelector';
import { hourDisplay, minutesDisplay } from './helpers/helpers';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const HourlyForecast = ({ forecast, loading, offset }) => {
  const [time] = useState(
    `${hourDisplay(new Date(forecast.dt * 1000), offset)}:${minutesDisplay(
      new Date(forecast.dt * 1000)
    )}`
  );

  return (
    <Fade in={!loading} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
      <Paper elevation={3} sx={{ backgroundColor: '#91cbf9', mb: 1.5, mr: 1 }}>
        <Box sx={{ p: 1 }}>
          <Card sx={centerStyles}>
            <CardContent>
              <Typography variant="caption">{time}</Typography>
              <IconSelector code={forecast.weather[0].id} size="1rem" />
              <Typography variant="body1">
                {Math.round(forecast.temp)}°
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Fade>
  );
};

export default HourlyForecast;
