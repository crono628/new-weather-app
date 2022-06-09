import { Box, CircularProgress } from '@mui/material';

function minutesDisplay(date) {
  let minutes = date.getMinutes().toString();
  if (minutes.length == 1) {
    return '0' + minutes;
  }
  return minutes;
}

function hourDisplay(date, offset) {
  let hours = date.getUTCHours().toString();
  hours -= offset;
  if (hours < 0) {
    hours += 24;
  }
  return hours;
}

function LoadingCircle() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

async function geoLocation(search) {
  const GEOCODE_NAME = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;
  const GEOCODE_ZIPCODE = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&appid=${API_KEY}`;
  let geoResponse;
  isNaN(search)
    ? (geoResponse = await fetch(GEOCODE_NAME))
    : (geoResponse = await fetch(GEOCODE_ZIPCODE));
  let geoJson = await geoResponse.json();
  return geoJson;
}

async function getWeather(lat, lon) {
  const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
  let weatherResponse = await fetch(WEATHER_API);
  let weatherJson = await weatherResponse.json();
  return weatherJson;
}

export { minutesDisplay, hourDisplay, LoadingCircle, geoLocation, getWeather };
