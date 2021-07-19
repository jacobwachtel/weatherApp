
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";


getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  
  let full_Url = `${URL}?q=${city}&units=imperial&appid=${API_KEY}`;
  const weatherPromise = fetch(full_Url);
  return weatherPromise.then((response) => {
    return response.json();
  });
  
}

searchCity = () => {
  const city = document.getElementById('city-input').value;
  document.getElementById('city-input').value = ""
  document.getElementById('city-name').innerHTML = city;
  
  getWeatherData(city)
  .then((response) =>{
    showWeatherData(response);
    //console.log(response);
  }).catch((error) => {
    console.log(error);
  })

}

showWeatherData = (weatherData) => {
  
  document.getElementById('temp').innerHTML = weatherData.main.temp;
  document.getElementById('min-temp').innerHTML = weatherData.main.temp_min;
  document.getElementById('max-temp').innerHTML = weatherData.main.temp_max;
  document.getElementById('weather-type').innerHTML = weatherData.weather[0].description;

}
