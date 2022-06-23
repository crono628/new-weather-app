import React from 'react';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';
import { Box } from '@mui/material';

const IconSelector = ({ code, size, night }) => {
  const iconStyles = {
    fontSize: `${size}`,
  };

  function handleIcon(num) {
    if (num < 300) {
      return <ThunderstormOutlinedIcon sx={iconStyles} />;
    } else if (num < 600) {
      return <ShowerOutlinedIcon sx={iconStyles} />;
    } else if (num < 700) {
      return <AcUnitOutlinedIcon sx={iconStyles} />;
    } else if (num < 800) {
      return <WaterOutlinedIcon sx={iconStyles} />;
    } else if (num === 800 && night) {
      return <Brightness2OutlinedIcon sx={iconStyles} />;
    } else if (num === 800) {
      return <WbSunnyOutlinedIcon sx={iconStyles} />;
    } else {
      return <CloudOutlinedIcon sx={iconStyles} />;
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
      {handleIcon(code)}
    </Box>
  );
};

export default IconSelector;
