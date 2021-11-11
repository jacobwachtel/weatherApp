// require('dotenv').config();

import { searchCity } from './fetches/weather.js';

// Searches weather based on city input.
document.getElementById('click').onclick = () => {
   let city = document.getElementById('city-input').value;
   document.getElementById('temp-switch').checked = false;
   searchCity(city);
};

let cb = document.querySelector('input[name=temp-switch]');
cb.addEventListener('change', function () {
   let temp = document.getElementById('temp').innerHTML;
   let temp_min = document.getElementById('min-temp').innerHTML;
   let temp_max = document.getElementById('max-temp').innerHTML;

   let f = Math.round(changeTempF(temp));
   let fMin = Math.round(changeTempF(temp_min));
   let fMax = Math.round(changeTempF(temp_max));

   let c = Math.round(changeTempC(temp));
   let cMin = Math.round(changeTempC(temp_min));
   let cMax = Math.round(changeTempC(temp_max));
   if (this.checked) {
      document.getElementById('temp').innerHTML = c;
      document.getElementById('min-temp').innerHTML = cMin;
      document.getElementById('max-temp').innerHTML = cMax;
   } else {
      document.getElementById('temp').innerHTML = f;
      document.getElementById('min-temp').innerHTML = fMin;
      document.getElementById('max-temp').innerHTML = fMax;
   }
});

// Farhenheit to Celsius
const changeTempC = (temp) => {
   return (temp - 32) * (5 / 9);
};

const changeTempF = (temp) => {
   return temp * (9 / 5) + 32;
};
