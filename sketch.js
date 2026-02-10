
const imageElement = document.querySelector("img");
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("search");
const temp_Element = document.querySelector("#weather-temp h1");
const temp_modeToggle = document.getElementById("tempModeToggle");
const slider = document.querySelector(".slider");
let searching = false;

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
    if (temp_modeToggle.checked) {
        temp_Element.textContent = `${data.current.temp_f}°F`;
    } else {    
        temp_Element.textContent = `${data.current.temp_c}°C`;}
    console.log(data);
    return data;
}

searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    searching = true;
    fetchWeatherData(city);
});

temp_modeToggle.addEventListener("change", () => {
    slider.classList.toggle("checked", temp_modeToggle.checked);
    if (!searching) {   
        return;
    }
    const city = cityInput.value;
    fetchWeatherData(city);
});