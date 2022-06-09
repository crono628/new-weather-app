import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import CurrentWeather from './components/CurrentWeather';
import { Button, Typography } from '@mui/material';
import DailyForecast from './components/DailyForecast';
import HourlyForecast from './components/HourlyForecast';
import {
  geoLocation,
  getWeather,
  LoadingCircle,
} from './components/helpers/helpers';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);
  const [locations, setLocations] = useState([]);
  const [menu, setMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [choice, setChoice] = useState('');

  useEffect(() => {
    if (menu) {
      getWeather(choice.lat, choice.lon).then((data) => {
        setWeather({
          name: choice.name,
          state: choice.state,
          current: data.current,
          daily: [...data.daily],
          hourly: [...data.hourly],
          timezoneOffset: (data.timezone_offset / 60 / 60) * -1,
        });
      });
    }
    console.log('render', weather);
  }, [choice]);

  const handleSubmit = (e) => {
    setLoading(true);
    let locState;
    let locName;
    let node = e.currentTarget;
    e.preventDefault();
    geoLocation(search)
      .then((data) => {
        if (data.length > 1) {
          setLocations(data);
          setAnchorEl(node);
          setWeather([]);
          setMenu(true);
          setLoading(false);
          return;
        } else if (isNaN(search)) {
          locState = data[0].state;
          locName = data[0].name;
          return getWeather(data[0].lat, data[0].lon);
        } else {
          geoLocation(data.name)
            .then((item) => {
              locState = item[0].state;
              locName = item[0].name;
            })
            .catch((err) => console.log(err));
          return getWeather(data.lat, data.lon);
        }
      })
      .then((item) => {
        if (menu === false) {
          setWeather({
            name: locName,
            state: locState,
            current: item.current,
            daily: [...item.daily],
            hourly: [...item.hourly],
            timezoneOffset: (item.timezone_offset / 60 / 60) * -1,
          });
        }
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setWeather([]);
    setLocations([]);
    setMenu(false);
    setChoice('');
  };

  return (
    <Container maxWidth="md">
      <Nav
        onChange={handleChange}
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
