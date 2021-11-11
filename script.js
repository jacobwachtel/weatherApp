require('dotenv').config();

// Clicking the button sets everything in motion.
document.getElementById('click').onclick = () => {
   let city = document.getElementById('city-input').value;
   searchCity(city);
};

// Searches weather based on city input.
const searchCity = (city) => {
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

         document.getElementById('temp').innerHTML = temp;
         document.getElementById('min-temp').innerHTML = temp_min;
         document.getElementById('max-temp').innerHTML = temp_max;
         document.getElementById('weather-type').innerHTML = description;
         getUnsplashPicture(city);
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

// fetches an object of pictures from Unsplash.com based on
// the city the user searches for. The sets the background
// image to that picture.

const getUnsplashPicture = (city) => {
   const API_KEY = PICTURE_API_KEY;
   const URL = `https://api.unsplash.com/search/photos?query=${city}&client_id=${API_KEY}`;

   // fetch picture from unsplash
   fetch(URL)
      .then((response) => {
         return response.json();
      })

      // Gets the pictures (unsplash returns an object of 10 pictures). I
      // set the picture as a new background image.
      .then((data) => {
         console.log(data);
         let { results } = data;
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = results[getIndex()].urls.regular;
         pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${img.src}`;
      })

      // If error, I set the background to the same image as when
      // it first loaded. Who doesn't love a good beach picture?
      .catch((error) => {
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = './assets/beach-unsplash.jpg';
         document.getElementById('city-name').innerHTML = 'City Not Found';
         pictureImg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${img.src}`;
      });
};

// Gets a random number, becomes the index for results object above.
const getIndex = () => {
   return Math.floor(Math.random() * 5) + 1;
};
