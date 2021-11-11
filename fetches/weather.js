import { getUnsplashPicture as picture } from './unsplash.js';

// Searches weather based on city input.

export const searchCity = (city) => {
   document.getElementById('city-input').value = '';
   document.getElementById('city-name').innerHTML = city;

   const URL = 'https://api.openweathermap.org/data/2.5/weather';
   let full_Url = `${URL}?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`;

   // fetches weather data from Openweatherapi
   fetch(full_Url)
      .then((response) => {
         return response.json();
      })

      // Gets weather data, destructures, and sets inner html to
      // current weather
      .then((data) => {
         let { temp } = data.main;
         let { temp_max } = data.main;
         let { temp_min } = data.main;
         let { description } = data.weather[0];

         // changeTemperature(temp, temp_max, temp_min)
         document.getElementById('temp').innerHTML = Math.round(temp);
         document.getElementById('min-temp').innerHTML = Math.round(temp_min);
         document.getElementById('max-temp').innerHTML = Math.round(temp_max);
         document.getElementById('weather-type').innerHTML = description;

         picture(city);
      })

      // If error, lets the user know city is not found. I clear the console
      // to help preserve API key
      .catch((error) => {
         document.getElementById('weather-type').innerHTML =
            'Weather not found.';
         if (error.response && error.response.status === 404) {
            console.clear();
         }
      });
};
