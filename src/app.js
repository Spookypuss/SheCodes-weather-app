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

//format the forecast day
function formatDay(timestamp) {
  let date = new Date(timestamp *1000); // *1000 to convert from ms
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",];

    return days[day];
}

// Inject HTML and response data for forecast section
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
  if (index < 6 && index >0) {
  forecastHTML = forecastHTML + `
  <div class="col" id="weather-forecast-day"> 
    <div class="forecast-day">${formatDay(forecastDay.time)}</div>
    <img
        src="${forecastDay.condition.icon_url}"
        alt="${forecastDay.condition.description}"
        class="daily-icon day-one-icon"
      />
    <div class="forecast-temperatures">
        <span class="temp-max">${Math.round(forecastDay.temperature.maximum)}</span>° | <span class="temp-min">${Math.round(forecastDay.temperature.minimum)}</span>°</div>
  </div>
  `;
  }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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
  let temperature = Math.round(response.data.temperature.current); // gets current temperature and rounds to integer
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
