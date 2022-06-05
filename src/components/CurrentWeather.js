import React, { useEffect, useState } from 'react';
import { Card, CardContent, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import IconSelector from './IconSelector';

const centerStyles = {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
};

const CurrentWeather = ({ forecast }) => {
  const { current, daily, name } = forecast;

  return (
    <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
      <Box sx={{ p: 3 }}>
        <Card sx={centerStyles}>
          <CardContent>
            <Typography variant="h3">{name}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ px: 3, pb: 3 }}>
        <Card sx={centerStyles}>
          <CardContent>
            <IconSelector code={current.weather[0].id} />
            <Typography variant="h5">
              The current temperature in {name} is {Math.round(current.temp)}℉
            </Typography>
            <Typography variant="body1"></Typography>
          </CardContent>
        </Card>
      </Box>
    </Paper>
  );
};

export default CurrentWeather;
