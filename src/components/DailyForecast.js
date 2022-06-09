import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Fade,
  Grow,
  Paper,
  Slide,
  Typography,
} from '@mui/material';
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
    <Fade in={!loading} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
      <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
        <Box sx={{ px: 3, py: 1.5, my: 1 }}>
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
              <IconSelector code={forecast.weather[0].id} size="3rem" />
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Fade>
  );
};

export default DailyForecast;
