// Select DOM elements
let citySearch = document.querySelector(".weather_search");
let cityDisplay = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

// Input field selector
let cityInput = document.querySelector(".city_name");

// Get the actual country name
const getCountryName = (code) => {
  return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

// Get formatted date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000); // Convert seconds to milliseconds
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

// Default city for initial load
let city = "Ahmedabad";

// Search functionality
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user input
  const cityValue = cityInput.value.trim();
  if (cityValue) {
    city = cityValue;
    getWeatherData(); // Fetch new weather data
    cityInput.value = ""; // Clear the input field
  }
});

// Convert Kelvin to Celsius
const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1);

// Fetch weather data
const getWeatherData = async () => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=abb9101acfe39dc3f646539b8c6fc2dd`;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    // Destructure the data
    const { main, name, weather, wind, sys, dt } = data;

    // Update DOM elements
    cityDisplay.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="${weather[0].main} icon">`;

    w_temperature.innerHTML = `${kelvinToCelsius(main.temp)}&#176;C`;
    w_minTem.innerHTML = `Min: ${kelvinToCelsius(main.temp_min)}&#176;C`;
    w_maxTem.innerHTML = `Max: ${kelvinToCelsius(main.temp_max)}&#176;C`;

    w_feelsLike.innerHTML = `${kelvinToCelsius(main.feels_like)}&#176;C`;
    w_humidity.innerHTML = `${main.humidity.toFixed(0)}%`;
    w_wind.innerHTML = `${wind.speed.toFixed(1)} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

// Fetch data on page load
window.addEventListener("load", getWeatherData);
