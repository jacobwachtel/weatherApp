require('dotenv').config();

document.getElementById('click').onclick = () => {
   let city = document.getElementById('city-input').value;
   searchCity(city);
};

const searchCity = (city) => {
   document.getElementById('city-input').value = '';
   document.getElementById('city-name').innerHTML = city;

   const URL = 'https://api.openweathermap.org/data/2.5/weather';
   let full_Url = `${URL}?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`;

   fetch(full_Url)
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         let { temp } = data.main;
         let { temp_max } = data.main;
         let { temp_min } = data.main;
         let { description } = data.weather[0];

         document.getElementById('temp').innerHTML = temp;
         document.getElementById('min-temp').innerHTML = temp_min;
         document.getElementById('max-temp').innerHTML = temp_max;
         document.getElementById('weather-type').innerHTML = description;
         getUnsplashPicture(city);
      })
      .catch((error) => {
         document.getElementById('weather-type').innerHTML =
            "I'm sorry, there seems to be a problem locating the weather for this city";
         if (error.response && error.response.status === 404) {
            console.clear();
         }
      });
};

const getUnsplashPicture = (city) => {
   const API_KEY = PICTURE_API_KEY;
   const URL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${API_KEY}`;

   fetch(URL)
      .then((response) => {
         return response.json();
      })
      .then((data) => {
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = data.results[getRandomPicture].urls.full;
         pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${img.src}`;
      })
      .catch((error) => {
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = 'https://unsplash.com/photos/8Ogfqvw15Rg';
         document.getElementById('city-name').innerHTML = 'City Not Found';
         pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${img.src}`;
      });
};
const getRandomPicture = () => {
   return Math.floor(Math.random() * 10) + 1;
};
