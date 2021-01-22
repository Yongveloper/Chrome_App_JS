'use strict';

const weatherDisplay = document.querySelector('.js-weather');
const weatherCondition = document.querySelector('.js-condition');

const API_KEY = '6f99c8f6d956d191d8cb05b5344c6f88';

const COORDS = 'coords';

function getWeaher(lat, lng) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then((response) => response.json())
    .then((json) => {
      const icon = json.weather[0].icon;
      const description = json.weather[0].description;
      const temperature = json.main.temp;
      const feeling = json.main.feels_like;
      const humidity = json.main.humidity;
      const place = json.name;
      weatherDisplay.innerText = `Temperature: ${temperature} °C
        Feels like: ${feeling} °C
        Humidity: ${humidity}%
        Location: ${place}`;
      weatherCondition.innerHTML = `
      <img src="http://openweathermap.org/img/wn/${icon}.png" alt="icon" />
      <div class="weather__discription">Condition: ${description}<div/>     
        `;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeaher(latitude, longitude);
}

function handleGeoError() {
  console.log('cant aceescs');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeaher(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
