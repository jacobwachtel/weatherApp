// fetches an object of pictures from Unsplash.com based on
// the city the user searches for. The sets the background
// image to that picture.

export const getUnsplashPicture = (city) => {
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
         let { results } = data;
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = results[getIndex()].urls.regular;
         pictureImg.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 5%, black 110%),
      url(${img.src}`;
      })

      // If error, I set the background to the same image as when
      // it first loaded. Who doesn't love a good beach picture?
      .catch((error) => {
         let img = new Image();
         let pictureImg = document.querySelector('.hero-img-containor');
         img.src = './assets/beach-unsplash.jpg';
         document.getElementById('city-name').innerHTML = 'City Not Found';
         pictureImg.style.backgroundImage = `linear-gradient(180deg, rgba(0, 0, 0, 0.1) 5%, black 110%),
      url(${img.src}`;
      });
};

// Gets a random number, becomes the index for results object above.
const getIndex = () => {
   return Math.floor(Math.random() * 5) + 1;
};
