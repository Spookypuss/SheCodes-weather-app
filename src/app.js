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

  //let currentTime = document.querySelector("#current-time");
  //currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

  return `${day}, ${hours}:${minutes}`;
}

function displayCurrent(response) {
  let location = document.querySelector("#location-heading");
  location.innerHTML = response.data.city;
  console.log(response.data);
  let temperature = Math.round(response.data.temperature.current); // gets current temperature and rounds to integer
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let description = document.querySelector("#current-description");
  description.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  currentTime.innerHTML = formatDate(response.data.time * 1000);
  let currentIcon = document.querySelector(".current-icon");
  currentIcon.setAttribute("src", response.data.condition.icon_url);
  currentIcon.setAttribute("alt", response.data.condition.description);
}

let apiKey = "acbbefb303a70144ef2f13t2a94oef9a";
let cityName = "Paris";
let endpoint = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;

axios.get(endpoint).then(displayCurrent); // how the hell do you call it?!
