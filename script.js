function refreshWeather(response) {
  let cityElement = document.querySelector(".weather-app-city");
  let detailsElement = document.querySelector(".weather-app-details");
  let temperatureElement = document.querySelector(".weather-app-temperature");
  let iconElement = document.querySelector(".weather-app-icon");

  // Extract weather data
  let city = response.data.city;
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000);
  let iconUrl = response.data.condition.icon_url;

  // Update the UI
  cityElement.innerHTML = city;
  detailsElement.innerHTML = `${formatDate(date)}, ${description}<br />
                              Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>`;
  temperatureElement.innerHTML = temperature;
  iconElement.innerHTML = `<img src="${iconUrl}" alt="${description}" class="weather-app-icon-img" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for midnight
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes} ${ampm}`;
}

function searchCity(city) {
  let apiKey = "c03f0dd4te97a42d502o44b067fbf26c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios
    .get(apiUrl)
    .then(refreshWeather)
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Could not retrieve weather data. Please check the city name and try again.");
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search-form-input");
  let cityName = searchInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name.");
    return;
  }

  searchCity(cityName);

  // Save the searched city as default
  localStorage.setItem("defaultCity", cityName);
}

// Load weather for the default city or Paris
let defaultCity = localStorage.getItem("defaultCity") || "Paris";
searchCity(defaultCity);

// Add event listener to the search form
let searchFormElement = document.querySelector(".search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
