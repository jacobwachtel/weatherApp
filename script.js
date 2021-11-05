require('dotenv').config();


const search = document.getElementById('click');

search.onclick = () => {
   searchCity();
};

const getWeatherData = (city) => {
   const URL = 'https://api.openweathermap.org/data/2.5/weather';

   let full_Url = `${URL}?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`;
   const weatherPromise = fetch(full_Url);
   return weatherPromise.then((response) => {
      // console.log(response.json());
      return response.json();
   });
};

const searchCity = async () => {
   const city = document.getElementById('city-input').value;
   document.getElementById('city-input').value = '';
   document.getElementById('city-name').innerHTML = city;
   setBackgroundImage(city);
   await getWeatherData(city)
      .then((response) => {
         // console.log(response);
         showWeatherData(response);
         //console.log(response);
      })
      .catch((error) => {
         document.getElementById('weather-type').innerHTML =
            "I'm sorry, there seems to be a problem locating the weather for this city";
         if (error.response && error.response.status === 404) {
            console.clear();
         }
      });
};

const showWeatherData = (weatherData) => {
   // console.log(weatherData);
   document.getElementById('temp').innerHTML = weatherData.main.temp;
   document.getElementById('min-temp').innerHTML = weatherData.main.temp_min;
   document.getElementById('max-temp').innerHTML = weatherData.main.temp_max;
   document.getElementById('weather-type').innerHTML =
      weatherData.weather[0].description;
};

const getUnsplashPicture = (city) => {
   const API_KEY = PICTURE_API_KEY;
   const URL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${API_KEY}`;

   const picturePromise = fetch(URL);
   // console.log(picturePromise);
   return picturePromise.then((response) => {
      // console.log(response.json());
      return response.json();
   });
};

function setBackgroundImage(city) {
   // const city = document.getElementById('city-input').value;
   getUnsplashPicture(city)
      .then((response) => {
         setBackgroundImageHTML(response);
      })
      .catch((err) => {
         backgroundImageError(err);
      });
}

//
function setBackgroundImageHTML(imageData) {
   let img = new Image();
   let pictureImg = document.querySelector('.hero-img-containor');
   img.src = imageData.results[getRandomInt()].urls.full;
   // console.log(img.src);
   pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${img.src}`;
}

function toggleLoader() {
   const body = document.body;
   body.classList.toggle('loaded');
}

const backgroundImageError = () => {
   let img = new Image();
   let pictureImg = document.querySelector('.hero-img-containor');
   img.src = 'https://unsplash.com/photos/8Ogfqvw15Rg';
   document.getElementById('city-name').innerHTML = 'City Not Found';
   img.onload = function () {
      toggleLoader();
   };
   pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url(${img.src}`;
   // pictureImg.style.backgroundImage = `url(${img.src}`;
};

const getRandomInt = () => {
   return Math.floor(Math.random() * 10) + 1;
};
