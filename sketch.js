
const imageElement = document.querySelector("img");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("search");

async function getAPIKey() {
    const response = await fetch("API-key.json");
    const data = await response.json();
    return data.key;
}

async function fetchWeatherData(city) {
    const API_KEY = await getAPIKey();
    response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`);
    data = await response.json();
    imageElement.src = data.current.condition.icon;
    console.log(data);
    return data;
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    fetchWeatherData(city);
});
  