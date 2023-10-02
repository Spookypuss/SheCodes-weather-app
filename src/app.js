// Day and time functionality
let now = new Date();
let date = now.getDate();
let hours = String(now.getHours()).padStart(2, 0);
let minutes = String(now.getMinutes()).padStart(2, 0);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

// update day and time to display last update time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = String(date.getHours()).padStart(2, 0);
  let minutes = String(date.getMinutes()).padStart(2, 0);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

//how to set the day for forecasts
function getDays() {
let now = new Date();

let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun", //this is a total cheat!
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

let dayOne = days[now.getDay() + 1];
let dayTwo = days[now.getDay() + 2];
let dayThree = days[now.getDay() + 3];
let dayFour = days[now.getDay() + 4];
let dayFive = days[now.getDay() + 5];

let forecastDayOne = document.querySelector(".day-one");
forecastDayOne.innerHTML = dayOne;
let forecastDayTwo = document.querySelector(".day-two");
forecastDayTwo.innerHTML = dayTwo;
let forecastDayThree = document.querySelector(".day-three");
forecastDayThree.innerHTML = dayThree;
let forecastDayFour = document.querySelector(".day-four");
forecastDayFour.innerHTML = dayFour;
let forecastDayFive = document.querySelector(".day-five");
forecastDayFive.innerHTML = dayFive;

// if any are bigger than 6, then -6 from result
// make an array of forecast days and then 

}

//displays forecast data from response below (getForecast)
function displayForecast (response) {
  let dayOneDaytimeTemp = response.data.daily[0].temperature.day;
  let dayOneNighttimeTemp = response.data.daily[0].temperature.minimum;
  let dayTwoDaytimeTemp = response.data.daily[1].temperature.day;
  let dayTwoNighttimeTemp = response.data.daily[1].temperature.minimum;
  let dayThreeDaytimeTemp = response.data.daily[2].temperature.day;
  let dayThreeNighttimeTemp = response.data.daily[2].temperature.minimum;
  let dayFourDaytimeTemp = response.data.daily[3].temperature.day;
  let dayFourNighttimeTemp = response.data.daily[3].temperature.minimum;
  let dayFiveDaytimeTemp = response.data.daily[4].temperature.day;
  let dayFiveNighttimeTemp = response.data.daily[4].temperature.minimum;

  let dayOneDayTemp = document.querySelector(".day-1-day-temp");
  dayOneDayTemp.innerHTML = Math.round(dayOneDaytimeTemp);
  let dayOneNightTemp = document.querySelector(".day-1-night-temp");
  dayOneNightTemp.innerHTML = Math.round(dayOneNighttimeTemp);
  let dayTwoDayTemp = document.querySelector(".day-2-day-temp");
  dayTwoDayTemp.innerHTML = Math.round(dayTwoDaytimeTemp);
  let dayTwoNightTemp = document.querySelector(".day-2-night-temp");
  dayTwoNightTemp.innerHTML = Math.round(dayTwoNighttimeTemp);
  let dayThreeDayTemp = document.querySelector(".day-3-day-temp");
  dayThreeDayTemp.innerHTML = Math.round(dayThreeDaytimeTemp);
  let dayThreeNightTemp = document.querySelector(".day-3-night-temp");
  dayThreeNightTemp.innerHTML = Math.round(dayThreeNighttimeTemp);
  let dayFourDayTemp = document.querySelector(".day-4-day-temp");
  dayFourDayTemp.innerHTML = Math.round(dayFourDaytimeTemp);
  let dayFourNightTemp = document.querySelector(".day-4-night-temp");
  dayFourNightTemp.innerHTML = Math.round(dayFourNighttimeTemp);
  let dayFiveDayTemp = document.querySelector(".day-5-day-temp");
  dayFiveDayTemp.innerHTML = Math.round(dayFiveDaytimeTemp);
  let dayFiveNightTemp = document.querySelector(".day-5-night-temp");
  dayFiveNightTemp.innerHTML = Math.round(dayFiveNighttimeTemp);

  let dayOneIcon = document.querySelector(".day-one-icon");
  dayOneIcon.setAttribute("src", response.data.daily[0].condition.icon_url);
  dayOneIcon.setAttribute("alt", response.data.daily[0].condition.description);
  let dayTwoIcon = document.querySelector(".day-one-icon");
  dayTwoIcon.setAttribute("src", response.data.daily[1].condition.icon_url);
  dayTwoIcon.setAttribute("alt", response.data.daily[1].condition.description);
  let dayThreeIcon = document.querySelector(".day-one-icon");
  dayThreeIcon.setAttribute("src", response.data.daily[2].condition.icon_url);
  dayThreeIcon.setAttribute("alt", response.data.daily[2].condition.description);
  let dayFourIcon = document.querySelector(".day-one-icon");
  dayFourIcon.setAttribute("src", response.data.daily[3].condition.icon_url);
  dayFourIcon.setAttribute("alt", response.data.daily[3].condition.description);
  let dayFiveIcon = document.querySelector(".day-one-icon");
  dayFiveIcon.setAttribute("src", response.data.daily[4].condition.icon_url);
  dayFiveIcon.setAttribute("alt", response.data.daily[4].condition.description);
}

// fetch forecast data based on coordinates passed by current conditions response
function getForecast(coordinates) {
  
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  
  let apiKey = "acbbefb303a70144ef2f13t2a94oef9a";
  let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`; 
  
  axios.get(url).then(displayForecast)
}

// display response data for current conditions
function displayCurrent(response) {
  //console.log(response.data.coordinates);
  let location = document.querySelector("#location-heading");
  location.innerHTML = response.data.city;
  celciusTemperature = response.data.temperature.current; //updates celcius data (defined as null globally) to response data
  let temperature = Math.round(celciusTemperature); // gets current temperature and rounds to integer
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let description = document.querySelector("#current-description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = response.data.wind.speed;
  currentTime.innerHTML = formatDate(response.data.time * 1000);
  let currentIcon = document.querySelector(".current-icon");
  currentIcon.setAttribute("src", response.data.condition.icon_url);
  currentIcon.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

// search for a city
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input-text");
  let cityName = searchInput.value;
  cityName = cityName.trim();
  cityName = cityName.toLowerCase();

  let apiKey = "acbbefb303a70144ef2f13t2a94oef9a";
  let endpoint = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

  axios.get(endpoint).then(displayCurrent);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity); // add event listener to switch

// convert temperature to fahrenheit
function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

let celciusTemperature = null; //sets to null - updated to response data in displayCurrent function above

let fahrenheitLink = document.querySelector("#to-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

// switch back to celcius
function displayCelcius() {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celciusTemperature);
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celciusLink = document.querySelector("#to-celcius");
celciusLink.addEventListener("click", displayCelcius);

// dark mode toggle
function switchTheme() {
  if (theme.getAttribute("href") === "src/style.css") {
    theme.href = "src/style-dark.css"; // if theme is currently light, switch to dark
  } else {
    theme.href = "src/style.css"; // else switch to light theme
  }
}

let themeSwitch = document.querySelector("#flexSwitchCheckDefault");
let theme = document.querySelector("#theme-link");

themeSwitch.addEventListener("click", switchTheme);

getDays()//update day names for forecast days
