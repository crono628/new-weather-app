import React, { useEffect, useState } from 'react';
import { Card, CardContent, Paper } from '@mui/material';
import { Box, Container } from '@mui/system';

const DailyForecast = ({ weather }) => {
  return (
    <Paper elevation={3} sx={{ backgroundColor: '#91cbf9' }}>
      <Box sx={{ padding: 4 }}>
        <Card>
          <CardContent>text</CardContent>
        </Card>
      </Box>
    </Paper>
  );
};

export default DailyForecast;
