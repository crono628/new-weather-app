import React from 'react';
import ThunderstormOutlinedIcon from '@mui/icons-material/ThunderstormOutlined';
import ShowerOutlinedIcon from '@mui/icons-material/ShowerOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import WaterOutlinedIcon from '@mui/icons-material/WaterOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import Brightness2OutlinedIcon from '@mui/icons-material/Brightness2Outlined';

const IconSelector = ({ code, night }) => {
  const iconStyles = {
    fontSize: '3rem',
  };
  console.log(code);

  function handleIcon(num) {
    if (code < 300) {
      return <ThunderstormOutlinedIcon sx={iconStyles} />;
    } else if (code < 600) {
      return <ShowerOutlinedIcon sx={iconStyles} />;
    } else if (code < 700) {
      return <AcUnitOutlinedIcon sx={iconStyles} />;
    } else if (code < 800) {
      return <WaterOutlinedIcon sx={iconStyles} />;
    } else if (code == 800 && night) {
      return <Brightness2OutlinedIcon sx={iconStyles} />;
    } else if (code == 800) {
      return <WbSunnyOutlinedIcon sx={iconStyles} />;
    } else {
      return <CloudOutlinedIcon sx={iconStyles} />;
    }
  }

  return <>{handleIcon(code)}</>;
};

export default IconSelector;
