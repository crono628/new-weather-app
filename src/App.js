import { Box, Container } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import CurrentWeather from './components/CurrentWeather';
import { db } from './firebase';
import { CircularProgress } from '@mui/material';
import SelectLocation from './components/SelectLocation';
import DailyForecast from './components/DailyForecast';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(null);
  const [locations, setLocations] = useState([]);
  // const [choice, setChoice] = useState(locations[0]);

  useEffect(() => {}, [locations]);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const GEOCODE_NAME = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=10&appid=${API_KEY}`;
  const GEOCODE_ZIPCODE = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&appid=${API_KEY}`;

  const getWeather = async () => {
    setLoading(true);
    try {
      // if (isNaN(search)) {
      //   let nameResponse = await fetch(GEOCODE_NAME);
      //   if (nameResponse.ok) {
      //     let nameCode = await nameResponse.json();
      //     console.log('nameCode', nameCode);

      //     let { lat, lon, name, state } = nameCode;
      //     const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
      //     let weatherResponse = await fetch(WEATHER_API);
      //     let weatherCall = await weatherResponse.json();
      //     console.log(weatherCall);
      //     setWeather({
      //       name: name,
      //       state: state,
      //       current: weatherCall.current,
      //       daily: [...weatherCall.daily],
      //       hourly: [...weatherCall.hourly],
      //       timezoneOffset: weatherCall.timezone_offset,
      //     });
      //   }
      // } else {
      let geoResponse = await fetch(GEOCODE_ZIPCODE);
      if (geoResponse.ok) {
        let geoCode = await geoResponse.json();
        let { lat, lon, name, zip } = geoCode;
        const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;
        let weatherResponse = await fetch(WEATHER_API);
        let weatherCall = await weatherResponse.json();
        console.log(weatherCall);
        setWeather({
          name: name,
          zipcode: zip,
          current: weatherCall.current,
          daily: [...weatherCall.daily],
          hourly: [...weatherCall.hourly],
          timezoneOffset: weatherCall.timezone_offset,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
  };
  const handleLocations = async () => {
    try {
      if (isNaN(search)) {
        console.log('auto');

        let nameResponse = await fetch(GEOCODE_NAME);
        if (nameResponse.ok) {
          let nameCode = await nameResponse.json();
          console.log('nameCode', nameCode);
          let newLocations = nameCode.map((item) => ({
            label: `${item.name}, ${item.state}`,
          }));
          setLocations(newLocations);
        }
        console.log(locations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAutoComplete = (e) => {
    e.preventDefault();
    handleLocations();
  };
  return (
    <Container maxWidth="md">
      <Nav
        onChange={(e) => setSearch(e.target.value)}
        onZipSubmit={handleSubmit}
        loading={loading}
        town="fart"
      />
      {loading && <LoadingCircle />}
      {loading === false && (
        <CurrentWeather forecast={weather} loading={loading} />
      )}
      {loading === false &&
        weather.daily.map((day, index) => {
          if (index == 0) {
            return null;
          } else {
            return <DailyForecast forecast={day} loading={loading} />;
          }
        })}
      {/* <SelectLocation
        choice={choice}
        setChoice={(e, newChoice) => setChoice(newChoice)}
        inputValue={search}
        onChange={(e, newSearch) => setSearch(newSearch)}
        handleAutocomplete={handleAutoComplete}
        locations={locations}
      /> */}
    </Container>
  );
};

function LoadingCircle() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default App;
