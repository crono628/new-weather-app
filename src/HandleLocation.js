import React from 'react';

async function handleGeoLocation(search) {
  const GEOCODE_NAME = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`;
  const GEOCODE_ZIPCODE = `https://api.openweathermap.org/geo/1.0/zip?zip=${search}&appid=${API_KEY}`;
  const WEATHER_API = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=${API_KEY}`;

  try {
    let geoResponse = await fetch(
      isNan(search) ? GEOCODE_ZIPCODE : GEOCODE_NAME
    );
    let geoJson = await geoResponse.json();
    let { lat, lon, name, zip, state } = geoJson;
    return { lat, lon, name, zip, state };
  } catch (error) {
    console.log(error);
  }
}

export default handleGeoLocation;
