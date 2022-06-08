import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import CurrentWeather from './components/CurrentWeather';
import { Button, Typography } from '@mui/material';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import { LoadingCircle } from './components/helpers/helpers';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);
  const [locations, setLocations] = useState([]);
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [choice, setChoice] = useState();

  useEffect(() => {
    if (menu) {
      handleLocations();
    }
  }, [choice]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const GEOCODE_NAME = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;
  const GEOCODE_ZIPCODE = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&appid=${API_KEY}`;

  const getWeather = async () => {
    setLoading(true);
    try {
      let geoResponse = await fetch(GEOCODE_ZIPCODE);
      if (geoResponse.ok) {
        let geoJson = await geoResponse.json();
        let { lat, lon, name, zip } = geoJson;
        const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
        let weatherResponse = await fetch(WEATHER_API);
        let weatherJson = await weatherResponse.json();
        console.log(geoJson);
        setWeather({
          name: name,
          zipcode: zip,
          current: weatherJson.current,
          daily: [...weatherJson.daily],
          hourly: [...weatherJson.hourly],
          timezoneOffset: (weatherJson.timezone_offset / 60 / 60) * -1,
        });
      }
      // }
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1400);
  };

  const chooseLocation = async () => {
    try {
      if (isNaN(search) && menu) {
      }
      if (isNaN(search)) {
        let nameResponse = await fetch(GEOCODE_NAME);
        if (nameResponse.ok) {
          let nameCode = await nameResponse.json();
          console.log('nameCode', nameCode);
          let { lat, lon, name, state } = nameCode;
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
          let weatherResponse = await fetch(WEATHER_API);
          let weatherCall = await weatherResponse.json();
          console.log(weatherCall);
          setWeather({
            name: name,
            state: state,
            current: weatherCall.current,
            daily: [...weatherCall.daily],
            hourly: [...weatherCall.hourly],
            timezoneOffset: weatherCall.timezone_offset,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLocations();
    setAnchorEl(e.currentTarget);
  };

  const wordSearch = async () => {
    try {
      if (isNaN(search) && menu) {
        const { lat, lon, name, state } = choice;
        const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
        let weatherResponse = await fetch(WEATHER_API);
        let weatherJson = await weatherResponse.json();
        setWeather({
          name: name,
          state: state,
          current: weatherJson.current,
          daily: [...weatherJson.daily],
          hourly: [...weatherJson.hourly],
          timezoneOffset: (weatherJson.timezone_offset / 60 / 60) * -1,
        });
        console.log(choice);
        setMenu(false);
      } else if (isNaN(search)) {
        let nameResponse = await fetch(GEOCODE_NAME);
        if (nameResponse.ok) {
          let nameJson = await nameResponse.json();
          console.log('nameCode', nameJson);
          setLocations(nameJson);
          if (nameJson.length > 1) {
            setMenu(true);
            return;
          }
          const { lat, lon, name, state } = nameJson[0];
          const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
          let weatherResponse = await fetch(WEATHER_API);
          let weatherJson = await weatherResponse.json();
          setWeather({
            name: name,
            state: state,
            current: weatherJson.current,
            daily: [...weatherJson.daily],
            hourly: [...weatherJson.hourly],
            timezoneOffset: (weatherJson.timezone_offset / 60 / 60) * -1,
          });
          setAnchorEl(null);
        }
      } else {
        console.log('uhhh');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocations = async () => {
    setLoading(true);
    if (isNaN(search)) {
      wordSearch();
    } else {
      console.log('zip');
    }
    // try {
    // if (isNaN(search) && anchorEl === null) {
    //   let nameResponse = await fetch(GEOCODE_NAME);
    //   if (nameResponse.ok) {
    //     let nameJson = await nameResponse.json();
    //     console.log('nameCode', nameJson);
    //     setLocations(nameJson);
    //     if (nameJson.length > 1) {
    //       return;
    //     }
    //     const { lat, lon, name, state } = nameJson[0];
    //     const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
    //     let weatherResponse = await fetch(WEATHER_API);
    //     let weatherJson = await weatherResponse.json();
    //     setWeather({
    //       name: name,
    //       state: state,
    //       current: weatherJson.current,
    //       daily: [...weatherJson.daily],
    //       hourly: [...weatherJson.hourly],
    //       timezoneOffset: (weatherJson.timezone_offset / 60 / 60) * -1,
    //     });
    //     setAnchorEl(null);
    //   }
    // }
    // } catch (error) {
    //   console.log(error);
    // }
    setTimeout(() => {
      setLoading(false);
    }, 1100);
  };

  return (
    <Container maxWidth="md">
      <Nav
        onChange={(e) => setSearch(e.target.value)}
        onZipSubmit={handleSubmit}
        locations={locations}
        anchorEl={anchorEl}
        onMenuClose={(e) => {
          setAnchorEl(null);
          setChoice(locations[e.target.value]);
        }}
      />
      {weather.length === 0 ? null : (
        <>
          {loading && <LoadingCircle />}
          {loading === false && (
            <CurrentWeather forecast={weather} loading={loading} />
          )}
          {loading === false && (
            <>
              <Box sx={{ display: 'flex', overflowX: 'scroll', mt: 3 }}>
                {weather.hourly.map((hour, index) =>
                  index === 0 ? null : index > 24 ? null : (
                    <HourlyForecast
                      key={hour.dt}
                      forecast={hour}
                      offset={weather.timezoneOffset}
                    />
                  )
                )}
              </Box>
              <Typography fontSize="0.7rem">
                Scroll for hourly forecast →
              </Typography>
            </>
          )}
          {loading === false && (
            <Box>
              {weather.daily.map((day, index) =>
                index === 0 ? null : (
                  <DailyForecast
                    key={day.dt}
                    sx={{ mt: 3 }}
                    forecast={day}
                    loading={loading}
                  />
                )
              )}
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
