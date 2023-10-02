// Day and time  functionality
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

// display response data
function displayCurrent(response) {
  console.log(response.data.coordinates);
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
